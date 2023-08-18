import IEVMChainData from './IEVMChainData';
import IWeb3Context from './IWeb3Context';
import Web3Wallet from './Web3Wallet';
import ExternalAPIs from './apis/ExternalAPIs';

export default class Web3Context implements IWeb3Context {
    wallet: Web3Wallet;
    extAPIs: ExternalAPIs;
    chainData: IEVMChainData;

    constructor(chainData_: IEVMChainData) {
        this.chainData = chainData_;
        this.extAPIs = new ExternalAPIs();
        this.wallet = new Web3Wallet(chainData_);
    }
}