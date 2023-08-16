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
const GasPriceInfo_1 = __importDefault(require("./models/GasPriceInfo"));
class EthGasStationAPI {
    constructor() {
        this.getPrices = () => __awaiter(this, void 0, void 0, function* () {
            let result = undefined;
            let response = null;
            console.debug("Get data from EthGasStation", 1);
            try {
                console.debug("get data from EthGasStation", 2);
                response = yield axios_1.default.get('https://ethgasstation.info/api/ethgasAPI.json');
                console.debug("get data from EthGasStation", 3, response);
            }
            catch (ex) {
                response = null;
                console.error("Error in EthGasStation API. getData", 4, ex);
            }
            if (response) {
                // success
                const json = response.data;
                result = new GasPriceInfo_1.default();
                result.fast = json.fast;
                result.average = json.average;
                result.slow = json.safeLow;
                result.standart = json.average;
                console.debug("Get data from EthGasStation", 5, response.data, result);
            }
            return result;
        });
    }
}
exports.default = EthGasStationAPI;
