import IEVMChainData from './IEVMChainData';
import IWeb3Context from './IWeb3Context';
import Web3Wallet from './Web3Wallet';
import ExternalAPIs from './apis/ExternalAPIs';

declare global {
    interface Window {
        web3Context: Web3Context;
    }
}

export default class Web3Context implements IWeb3Context {
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
                context = window.web3Context;
            } else {
                window.web3Context = new Web3Context(chainData_);
                context = window.web3Context;
                await context.wallet.connect();
            }
        }

        return context;
    }
}