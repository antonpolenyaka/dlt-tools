"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const TokenMarketInfo_1 = __importDefault(require("./models/TokenMarketInfo"));
const MarketChartInfo_1 = __importDefault(require("./models/MarketChartInfo"));
const MarketChartPoint_1 = __importDefault(require("./models/MarketChartPoint"));
const blockchainUtils_1 = require("../blockchain/blockchainUtils");
class CoinGeckoAPI {
    constructor() {
        // Example: coinId = 'paradox-metaverse'
        //          apiKey = 'CG-vB2KLASxnNXAyR9pRaFDxb77';
        //          circulatingSupply = 12700000
        this.getMarketChartPRO = (from, to, coinId, apiKey) => __awaiter(this, void 0, void 0, function* () {
            let result = undefined;
            let response = null;
            console.debug("Get market chart from coingecko", 1);
            try {
                console.debug("Get market chart from coingecko", 2);
                const requestUrl = `https://pro-api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=usd&from=${from}&to=${to}&x_cg_pro_api_key=${apiKey}`;
                console.debug("Request url", requestUrl);
                response = yield axios_1.default.get(requestUrl);
                console.debug("Get market chart from coingecko", 3, response);
            }
            catch (ex) {
                response = null;
                console.error("Error in coingecko API. getMarketChartPRO", 4, ex);
            }
            if (response) {
                // success
                const json = response.data['prices'];
                result = new MarketChartInfo_1.default();
                json.forEach((point) => {
                    const x = point[0]; // date (unix timestamp)
                    const y = parseFloat((0, blockchainUtils_1.prettyBN)(point[1], 5)); // value, to show cut to only 5 decimal to show
                    result === null || result === void 0 ? void 0 : result.data.push(new MarketChartPoint_1.default(x, y));
                });
                console.debug("Get market chart from coingecko", 5, json, result);
            }
            return result;
        });
        // Example: coinId = 'paradox-metaverse'
        //          apiKey = 'CG-vB2KLASxnNXAyR9pRaFDxb77';
        //          circulatingSupply = 12700000
        this.getSimplePrice = (coinId, apiKey, circulatingSupply) => __awaiter(this, void 0, void 0, function* () {
            let result = undefined;
            let response = null;
            console.debug("Get data from coingecko", 1);
            try {
                console.debug("get data from coingecko", 2);
                const requestUrl = 'https://pro-api.coingecko.com/api/v3/simple/price?'
                    + `ids=${coinId}`
                    + '&vs_currencies=usd'
                    + '&include_market_cap=true'
                    + '&include_24hr_vol=true'
                    + '&include_24hr_change=true'
                    + '&include_last_updated_at=true'
                    + '&precision=full'
                    + `&x_cg_pro_api_key=${apiKey}`;
                response = yield axios_1.default.get(requestUrl);
                console.debug("get data from coingecko", 3, response);
            }
            catch (ex) {
                response = null;
                console.error("Error in coingecko API. getData", 4, ex);
            }
            if (response) {
                // success
                // Data example:
                // paradox-metaverse: 
                //     last_updated_at: 1678711695
                //     usd: 0.010153877817979972
                //     usd_24h_change: -34.07483333816284
                //     usd_24h_vol: 728496.5212655764
                //     usd_market_cap: 0
                const json = response.data;
                result = new TokenMarketInfo_1.default();
                result.lastUpdatedAt = json[coinId].last_updated_at;
                result.priceUsd = json[coinId].usd;
                result.usd24hChange = json[coinId].usd_24h_change;
                result.usd24hVol = json[coinId].usd_24h_vol;
                result.usdMarketCap = json[coinId].usd_market_cap;
                if (result.usdMarketCap !== undefined && result.usdMarketCap === 0 && result.priceUsd !== undefined) {
                    // The CMC team has not verified the project's Market Cap. 
                    // However, according to the project, its self-reported CS is 12,700,000 PARADOX 
                    // with a self-reported market cap of $125,472.
                    result.usdMarketCap = circulatingSupply * result.priceUsd;
                }
                if (result.price24hChange === undefined && result.priceUsd !== undefined && result.usd24hChange !== undefined) {
                    const priceBefore = result.priceUsd / (100 + result.usd24hChange) * 100;
                    console.debug("CoinGecko priceBefore", priceBefore);
                    const priceNow = result.priceUsd;
                    console.debug("CoinGecko priceNow", priceNow);
                    let diffPrice = priceNow - priceBefore;
                    console.debug("CoinGecko diffPrice", diffPrice);
                    result.price24hChange = diffPrice;
                }
                console.debug("Get data from coingecko", 5, response.data, result);
            }
            return result;
        });
    }
}
exports.default = CoinGeckoAPI;
