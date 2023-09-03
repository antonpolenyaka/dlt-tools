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
const Web3Wallet_1 = __importDefault(require("./Web3Wallet"));
const ExternalAPIs_1 = __importDefault(require("./apis/ExternalAPIs"));
class Web3Context {
    constructor(chainData_) {
        this.chainData = chainData_;
        this.extAPIs = new ExternalAPIs_1.default();
        this.wallet = new Web3Wallet_1.default(chainData_);
    }
    static GetContext(chainData_) {
        return __awaiter(this, void 0, void 0, function* () {
            let context = undefined;
            if (typeof window !== 'undefined') {
                if (window.web3Context instanceof Web3Context) {
                    console.debug("Web3Context: Get old context");
                    context = window.web3Context;
                    yield context.wallet.reconnect();
                }
                else {
                    console.debug("Web3Context: A new context must be created, since the object was lost");
                    window.web3Context = new Web3Context(chainData_);
                    context = window.web3Context;
                    yield context.wallet.reconnect();
                }
            }
            else {
                console.debug("Web3Context: No window identified");
            }
            return context;
        });
    }
}
exports.default = Web3Context;
