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
    initializeConnection(userAccount) {
        return __awaiter(this, void 0, void 0, function* () {
            console.debug("Set isConnected to true");
            this.isConnected = true;
            this.address = userAccount;
            this.shortAddress = (0, blockchainUtils_1.toShortAddress)(userAccount);
            this.provider = new ethers_1.ethers.BrowserProvider(window.ethereum);
            this.signer = yield this.provider.getSigner();
            this.eventEmitter.emit("onConnectedChanged", this.isConnected, this.address, this.shortAddress);
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
        });
    }
    reconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.isConnected = false;
                if (this.chainData !== undefined) {
                    // Check if is metamask and UI is unlocked (if is locked, we don't have any account connected)
                    let isUnlocked = true;
                    let providerIsConnected = false;
                    if (window.ethereum) {
                        providerIsConnected = window.ethereum.isConnected();
                        if (window.ethereum._metamask) {
                            isUnlocked = yield window.ethereum._metamask.isUnlocked();
                        }
                    }
                    // Check if is locked, we don't try to do anything to reconnect
                    if (isUnlocked === true && providerIsConnected === true) {
                        // Case if we have unlocked web3 wallet and connect to provider
                        const userAccount = yield (0, connectWallet_1.reconnect)(this.chainData);
                        console.debug("Web3Wallet userAccount", userAccount);
                        if (userAccount !== undefined) {
                            yield this.initializeConnection(userAccount);
                        }
                    }
                }
            }
            catch (exception) {
                console.error("Web3Wallet catched exception in reconnect", exception);
            }
            return this.isConnected;
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.debug("Web3Wallet connect start");
                this.isConnected = false;
                if (this.chainData !== undefined) {
                    const userAccount = yield (0, connectWallet_1.connect)(this.chainData);
                    console.debug("Web3Wallet userAccount", userAccount);
                    if (userAccount !== undefined) {
                        yield this.initializeConnection(userAccount);
                    }
                    else {
                        console.error("Web3Wallet userAccount is undefined");
                    }
                }
                else {
                    console.error("Web3Wallet chainData is undefined");
                }
            }
            catch (exception) {
                console.error("Web3Wallet catched exception in connect", exception);
            }
            finally {
                console.debug("Web3Wallet connect end");
            }
            return this.isConnected;
        });
    }
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
