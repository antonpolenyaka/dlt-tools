import IEVMChainData from './IEVMChainData';
import IWeb3Context from './IWeb3Context';
import Web3Wallet from './Web3Wallet';
import ExternalAPIs from './apis/ExternalAPIs';
declare global {
    interface Window {
        web3Context: Web3Context;
    }
}
declare class Web3Context implements IWeb3Context {
    wallet: Web3Wallet;
    extAPIs: ExternalAPIs;
    chainData: IEVMChainData;
    constructor(chainData_: IEVMChainData);
    static GetContext(chainData_: IEVMChainData): Promise<IWeb3Context | undefined>;
}
export default Web3Context;
