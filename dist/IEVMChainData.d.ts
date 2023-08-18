import INativeCurrency from "./INativeCurrency";
export default interface IEVMChainData {
    chainId: string;
    chainName: string;
    nativeCurrency: INativeCurrency;
    rpcUrls: string;
    blockExplorerUrls: string;
}
