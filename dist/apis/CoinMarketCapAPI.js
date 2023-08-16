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
class CoinMarketCapAPI {
    // Example:
    // apiKey = 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d4677'
    getData(apiKey) {
        let response = null;
        console.debug("get data from coinmarketcap", 1);
        new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.debug("get data from coinmarketcap", 2);
                response = yield axios_1.default.get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
                    headers: {
                        'X-CMC_PRO_API_KEY': apiKey,
                    },
                });
                //response = await axios.get('https://apibotplanet.com/api/prices/days/260eff46-df25-4824-a47a-7d66a5c81dd3');
                console.debug("get data from coinmarketcap", 3, response);
            }
            catch (ex) {
                console.debug("get data from coinmarketcap", 4, ex);
                response = null;
                console.debug("Error in CoinMarketCap API. getData", ex);
                reject(ex);
            }
            if (response) {
                // success
                console.debug("get data from coinmarketcap", 5, response.data);
                const json = response.data;
                console.debug(json);
                resolve(json);
            }
        }));
    }
}
exports.default = CoinMarketCapAPI;
