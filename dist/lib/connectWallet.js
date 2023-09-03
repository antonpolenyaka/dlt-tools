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
exports.addChain = exports.switchChain = exports.checkChainId = exports.connect = exports.reconnect = exports.detectEthereumProvider = void 0;
const USER_REJECTED_TX_CODE = 4001;
const USER_DOESNT_HAVE_THIS_NETWORK = 4902;
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
function reconnect(chainData) {
    return __awaiter(this, void 0, void 0, function* () {
        let account;
        if (window.ethereum) {
            const accounts = yield window.ethereum
                .request({ method: 'eth_accounts' })
                .catch((err) => {
                if (err.code === USER_DOESNT_HAVE_THIS_NETWORK) {
                    console.log('Please connect to MetaMask.');
                }
                else {
                    console.error(err);
                }
            });
            yield checkChainId(chainData);
            account = accounts[0];
        }
        return account;
    });
}
exports.reconnect = reconnect;
function connect(chainData) {
    return __awaiter(this, void 0, void 0, function* () {
        let account;
        if (window.ethereum) {
            const accounts = yield window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .catch((err) => {
                if (err.code === USER_DOESNT_HAVE_THIS_NETWORK) {
                    console.log('Please connect to MetaMask.');
                }
                else {
                    console.error(err);
                }
            });
            yield checkChainId(chainData);
            account = accounts[0];
        }
        return account;
    });
}
exports.connect = connect;
// Check what blockchain we are connected, is is different - try to swap to other network.
// If not exist - try to add to the wallet.
function checkChainId(chainData) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        try {
            let chainId = yield window.ethereum.request({ method: "net_version" });
            // ETH 0x1
            if (chainId !== chainData.chainId) {
                result = yield switchChain(chainData);
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
function switchChain(chainData) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = true;
        yield window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: chainData.chainId }]
        }).catch((error) => __awaiter(this, void 0, void 0, function* () {
            if (error.code === USER_DOESNT_HAVE_THIS_NETWORK) {
                result = yield addChain(chainData);
            }
            else if (error.code === USER_REJECTED_TX_CODE) {
                console.warn(`We tryed to change network to ${chainData.chainId} but user reject this`);
                result = false;
            }
        }));
        return result;
    });
}
exports.switchChain = switchChain;
function addChain(chainData) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = true;
        yield window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
                {
                    chainId: chainData.chainId,
                    chainName: chainData.chainName,
                    nativeCurrency: {
                        name: chainData.nativeCurrency.name,
                        symbol: chainData.nativeCurrency.symbol,
                        decimals: chainData.nativeCurrency.decimals
                    },
                    rpcUrls: [chainData.rpcUrls],
                    blockExplorerUrls: [chainData.blockExplorerUrls],
                }
            ],
        }).catch((addError) => {
            console.log(`We tryed to add network but it was unsuccessfule :( Error text: ${addError}`);
            result = false;
        });
        return result;
    });
}
exports.addChain = addChain;
