import IEVMChainData from './IEVMChainData';
import IWeb3Context from './IWeb3Context';
import Web3Wallet from './Web3Wallet';
import ExternalAPIs from './apis/ExternalAPIs';

declare global {
    interface Window {
        web3Context: Web3Context;
    }
}

class Web3Context implements IWeb3Context {
    wallet: Web3Wallet;
    extAPIs: ExternalAPIs;
    chainData: IEVMChainData;

    constructor(chainData_: IEVMChainData) {
        this.chainData = chainData_;
        this.extAPIs = new ExternalAPIs();
        this.wallet = new Web3Wallet(chainData_);
    }

    public static async GetContext(chainData_: IEVMChainData): Promise<IWeb3Context | undefined> {
        let context: IWeb3Context | undefined = undefined;

        if (typeof window !== 'undefined') {
            if (window.web3Context instanceof Web3Context) {
                console.debug("Web3Context: Get old context");
                context = window.web3Context;
                await context.wallet.reconnect();
            } else {
                console.debug("Web3Context: A new context must be created, since the object was lost");
                window.web3Context = new Web3Context(chainData_);
                context = window.web3Context;
                await context.wallet.reconnect();
            }
        } else {
            console.debug("Web3Context: No window identified");
        }

        return context;
    }
}

export default Web3Context;