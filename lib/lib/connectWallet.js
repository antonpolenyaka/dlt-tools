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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addChain = exports.switchChain = exports.checkChainId = exports.connect = exports.detectEthereumProvider = void 0;
const UserRejectedTxCode = 4001;
const UserDoesntHaveThisNetwork = 4902;
function detectEthereumProvider({ mustBeMetaMask = false, silent = false, timeout = 3000, } = {}) {
    _validateInputs();
    let handled = false;
    return new Promise((resolve) => {
        if (window.ethereum) {
            handleEthereum();
        }
        else {
            window.addEventListener('ethereum#initialized', handleEthereum, { once: true });
            setTimeout(() => {
                handleEthereum();
            }, timeout);
        }
        function handleEthereum() {
            if (handled) {
                return;
            }
            handled = true;
            window.removeEventListener("ethereum#initialized", handleEthereum);
            const { ethereum } = window;
            if (ethereum && (!mustBeMetaMask || ethereum.isMetaMask)) {
                resolve(ethereum);
            }
            else {
                const message = mustBeMetaMask && ethereum
                    ? "Non-MetaMask window.ethereum detected."
                    : "Unable to detect window.ethereum.";
                !silent && console.error("@metamask/detect-provider:", message);
                resolve(null);
            }
        }
    });
    function _validateInputs() {
        if (typeof mustBeMetaMask !== 'boolean') {
            throw new Error(`Expected option 'mustBeMetaMask' to be a boolean.`);
        }
        if (typeof silent !== 'boolean') {
            throw new Error(`Expected option 'silent' to be a boolean.`);
        }
        if (typeof timeout !== 'number') {
            throw new Error(`Expected option 'timeout' to be a number.`);
        }
    }
}
exports.detectEthereumProvider = detectEthereumProvider;
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        let account;
        if (window.ethereum) {
            const accounts = yield window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .catch((err) => {
                if (err.code === UserRejectedTxCode) {
                    console.log('Please connect to MetaMask.');
                }
                else {
                    console.error(err);
                }
            });
            yield checkChainId();
            account = accounts[0];
        }
        return account;
    });
}
exports.connect = connect;
// Check what blockchain we are connected, is is different - try to swap to other network.
// If not exist - try to add to the wallet.
function checkChainId() {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        try {
            let chainId = yield window.ethereum.request({ method: "net_version" });
            // ETH 0x1
            if (chainId !== "0x1") {
                result = yield switchChain();
            }
            else {
                console.log("Correct network are choosed");
                result = true;
            }
        }
        catch (error) {
            console.warn(`An error occurred while checking the network. please change it manually, error code: ${error.code}`);
            result = false;
        }
        return result;
    });
}
exports.checkChainId = checkChainId;
function switchChain() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = true;
        // ETH Testnet 0x02, ETH 0x1
        yield window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }]
        }).catch((error) => __awaiter(this, void 0, void 0, function* () {
            if (error.code === UserDoesntHaveThisNetwork) {
                result = yield addChain();
            }
            else if (error.code === UserRejectedTxCode) {
                console.warn(`We tryed to change network to ETH but user reject this`);
                result = false;
            }
        }));
        return result;
    });
}
exports.switchChain = switchChain;
function addChain() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = true;
        yield window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
                {
                    chainId: '0x1',
                    chainName: 'Ethereum Mainnet',
                    nativeCurrency: {
                        name: 'ETH',
                        symbol: 'ETH',
                        decimals: 18
                    },
                    rpcUrls: ['https://eth.llamarpc.com/'],
                    blockExplorerUrls: ['https://etherscan.io'],
                }
            ],
        }).catch((addError) => {
            console.log(`We tryed to add ETH network but it was unsuccessfule :( Error text: ${addError}`);
            result = false;
        });
        return result;
    });
}
exports.addChain = addChain;
