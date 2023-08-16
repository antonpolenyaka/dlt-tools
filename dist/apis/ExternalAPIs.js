"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CoinGeckoAPI_1 = __importDefault(require("./CoinGeckoAPI"));
const CoinMarketCapAPI_1 = __importDefault(require("./CoinMarketCapAPI"));
const EthGasStationAPI_1 = __importDefault(require("./EthGasStationAPI"));
class ExternalAPIs {
    constructor() {
        this.coinMarketCap = new CoinMarketCapAPI_1.default();
        this.coingecko = new CoinGeckoAPI_1.default();
        this.ethGasStation = new EthGasStationAPI_1.default();
    }
}
exports.default = ExternalAPIs;
