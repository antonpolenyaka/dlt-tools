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
const connectWallet_1 = require("./lib/connectWallet");
const ethers_1 = require("ethers");
const events_1 = __importDefault(require("events"));
const blockchainUtils_1 = require("./blockchain/blockchainUtils");
class Web3Wallet {
    constructor(chainData_) {
        this.isConnected = false;
        this.address = undefined;
        this.shortAddress = undefined;
        this.provider = undefined;
        this.eventEmitter = new events_1.default();
        this.signer = undefined;
        this.chainData = chainData_;
    }
    reconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.isConnected = false;
                if (this.chainData !== undefined) {
                    const userAccount = yield (0, connectWallet_1.connect)(this.chainData);
                    console.log("reconnect userAccount", userAccount);
                    if (userAccount !== undefined) {
                        this.isConnected = true;
                        this.address = userAccount;
                        this.shortAddress = (0, blockchainUtils_1.toShortAddress)(userAccount);
                        this.isConnected = true;
                        this.provider = new ethers_1.ethers.BrowserProvider(window.ethereum);
                        this.signer = yield this.provider.getSigner();
                        this.eventEmitter.emit("onConnectedChanged", this.isConnected, this.address, this.shortAddress);
                        // Detect if wallet is changed
                        window.ethereum.on("accountsChanged", (accounts) => {
                            if (accounts[0] === undefined) {
                                this.disconnect();
                            }
                            else {
                                this.address = accounts[0];
                                this.shortAddress = (0, blockchainUtils_1.toShortAddress)(accounts[0]);
                                this.eventEmitter.emit("onAddressChanged", this.isConnected, this.address, this.shortAddress);
                            }
                        });
                    }
                }
            }
            catch (exception) {
                console.error("Web3Wallet catched exception", exception);
            }
            return this.isConnected;
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.chainData === undefined) {
                    return this.isConnected;
                }
                const userAccount = yield (0, connectWallet_1.connect)(this.chainData);
                if (userAccount === undefined) {
                    return this.isConnected;
                }
                this.address = userAccount;
                this.shortAddress = (0, blockchainUtils_1.toShortAddress)(userAccount);
                this.isConnected = true;
                this.provider = new ethers_1.ethers.BrowserProvider(window.ethereum);
                this.signer = yield this.provider.getSigner();
                this.eventEmitter.emit("onConnectedChanged", this.isConnected, this.address, this.shortAddress);
                // Detect if wallet is changed
                window.ethereum.on("accountsChanged", (accounts) => {
                    // Time to reload your interface with accounts[0]!
                    console.log("Account in web3 wallet is changed to " + accounts, 1, typeof accounts);
                    console.log("Account in web3 wallet is changed to " + accounts[0], 2, typeof accounts[0]);
                    if (accounts[0] === undefined) {
                        this.disconnect();
                    }
                    else {
                        this.address = accounts[0];
                        this.shortAddress =
                            accounts[0].substring(0, 5) + "..." + accounts[0].slice(-4);
                        this.eventEmitter.emit("onAddressChanged", this.isConnected, this.address, this.shortAddress);
                    }
                });
            }
            catch (exception) {
                console.error("catched exception", exception);
            }
            return this.isConnected;
        });
    }
    setAddress() { }
    disconnect() {
        this.address = undefined;
        this.shortAddress = undefined;
        this.isConnected = false;
        this.provider = undefined;
        this.eventEmitter.emit("onConnectedChanged", this.isConnected, this.address, this.shortAddress);
        return this.isConnected;
    }
}
exports.default = Web3Wallet;
