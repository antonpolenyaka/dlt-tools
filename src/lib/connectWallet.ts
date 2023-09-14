import IEVMChainData from "../IEVMChainData";

const USER_REJECTED_TX_CODE = 4001;
const USER_DOESNT_HAVE_THIS_NETWORK = 4902;

declare global {
    interface Window { ethereum: any; }
}

export function detectEthereumProvider({ mustBeMetaMask = false, silent = false, timeout = 3000, } = {}) {
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
            } else {
                const message =
                    mustBeMetaMask && ethereum
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

export async function reconnect(chainData: IEVMChainData): Promise<string | undefined> {
    let account: string | undefined;
    if (window.ethereum) {
        const accounts = await window.ethereum
            .request({ method: 'eth_accounts' })
            .catch((err: any) => {
                if (err.code === USER_DOESNT_HAVE_THIS_NETWORK) {
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            });
        await checkChainId(chainData);
        account = accounts[0];
    }
    return account;
}

export async function connect(chainData: IEVMChainData): Promise<string | undefined> {
    let account: string | undefined;
    if (window.ethereum) {
        const accounts = await window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .catch((err: any) => {
                if (err.code === USER_DOESNT_HAVE_THIS_NETWORK) {
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            });
        await checkChainId(chainData);
        account = accounts[0];
    }
    return account;
}


// Check what blockchain we are connected, is is different - try to swap to other network.
// If not exist - try to add to the wallet.
export async function checkChainId(chainData: IEVMChainData): Promise<boolean> {
    let result: boolean;
    try {
        let chainId = await window.ethereum.request({ method: "net_version" });
        // ETH 0x1
        if (chainId !== chainData.chainId) {
            result = await switchChain(chainData);
        } else {
            console.debug("Correct network are choosed");
            result = true;
        }
    } catch (error: any) {
        console.warn(`An error occurred while checking the network. please change it manually, error code: ${error.code}`);
        result = false;
    }
    return result;

}

export async function switchChain(chainData: IEVMChainData): Promise<boolean> {
    let result: boolean = true;    
    await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainData.chainId }]
    }).catch(async (error: any) => {
        if (error.code === USER_DOESNT_HAVE_THIS_NETWORK) {
            result = await addChain(chainData);
        } else if (error.code === USER_REJECTED_TX_CODE) {
            console.warn(`We tryed to change network to ${chainData.chainId} but user reject this`);
            result = false;
        }
    });
    return result;
}

export async function addChain(chainData: IEVMChainData): Promise<boolean> {
    let result: boolean = true;
    await window.ethereum.request({
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
    }).catch((addError: any) => {
        console.log(`We tryed to add network but it was unsuccessfule :( Error text: ${addError}`)
        result = false;
    });
    return result;
}