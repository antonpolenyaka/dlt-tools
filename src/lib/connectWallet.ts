const UserRejectedTxCode = 4001;
const UserDoesntHaveThisNetwork = 4902;

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


export async function connect(): Promise<string | undefined> {
    let account: string | undefined;
    if (window.ethereum) {
        const accounts = await window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .catch((err: any) => {
                if (err.code === UserRejectedTxCode) {
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            });
        await checkChainId();
        account = accounts[0];
    }
    return account;
}


// Check what blockchain we are connected, is is different - try to swap to other network.
// If not exist - try to add to the wallet.
export async function checkChainId(): Promise<boolean> {
    let result: boolean;
    try {
        let chainId = await window.ethereum.request({ method: "net_version" });
        // ETH 0x1
        if (chainId !== "0x1") {
            result = await switchChain();
        } else {
            console.log("Correct network are choosed");
            result = true;
        }
    } catch (error: any) {
        console.warn(`An error occurred while checking the network. please change it manually, error code: ${error.code}`);
        result = false;
    }
    return result;

}

export async function switchChain(): Promise<boolean> {
    let result: boolean = true;
    // ETH Testnet 0x02, ETH 0x1
    await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }]
    }).catch(async (error: any) => {
        if (error.code === UserDoesntHaveThisNetwork) {
            result = await addChain();
        } else if (error.code === UserRejectedTxCode) {
            console.warn(`We tryed to change network to ETH but user reject this`);
            result = false;
        }
    });
    return result;
}

export async function addChain(): Promise<boolean> {
    let result: boolean = true;
    await window.ethereum.request({
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
    }).catch((addError: any) => {
        console.log(`We tryed to add ETH network but it was unsuccessfule :( Error text: ${addError}`)
        result = false;
    });
    return result;
}