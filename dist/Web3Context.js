"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Web3Wallet_1 = __importDefault(require("./Web3Wallet"));
const ExternalAPIs_1 = __importDefault(require("./apis/ExternalAPIs"));
class Web3Context {
    constructor(chainData_) {
        this.chainData = chainData_;
        this.extAPIs = new ExternalAPIs_1.default();
        this.wallet = new Web3Wallet_1.default(chainData_);
    }
    reconnect() {
        this.wallet.reconnect();
    }
    static GetContext(chainData_) {
        let context = undefined;
        if (typeof window !== 'undefined') {
            if (window.web3Context instanceof Web3Context) {
                context = window.web3Context;
            }
            else {
                window.web3Context = new Web3Context(chainData_);
                context = window.web3Context;
                context.reconnect();
            }
        }
        return context;
    }
}
exports.default = Web3Context;
