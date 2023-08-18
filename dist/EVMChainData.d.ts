import IEVMChainData from './IEVMChainData';
import NativeCurrency from './NativeCurrency';
export default class EVMChainData implements IEVMChainData {
    chainId: string;
    chainName: string;
    nativeCurrency: NativeCurrency;
    rpcUrls: string;
    blockExplorerUrls: string;
    constructor(chainId_: string, chainName_: string, nativeCurrency_: NativeCurrency, rpcUrls_: string, blockExplorerUrls_: string);
}
