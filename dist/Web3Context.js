"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Web3Wallet_1 = __importDefault(require("./Web3Wallet"));
const ExternalAPIs_1 = __importDefault(require("./apis/ExternalAPIs"));
class Web3Context {
    constructor() {
        this.wallet = new Web3Wallet_1.default();
        this.extAPIs = new ExternalAPIs_1.default();
    }
}
exports.default = Web3Context;
