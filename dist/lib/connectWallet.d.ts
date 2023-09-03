import IEVMChainData from "../IEVMChainData";
declare global {
    interface Window {
        ethereum: any;
    }
}
export declare function detectEthereumProvider({ mustBeMetaMask, silent, timeout, }?: {
    mustBeMetaMask?: boolean | undefined;
    silent?: boolean | undefined;
    timeout?: number | undefined;
}): Promise<unknown>;
export declare function reconnect(chainData: IEVMChainData): Promise<string | undefined>;
export declare function connect(chainData: IEVMChainData): Promise<string | undefined>;
export declare function checkChainId(chainData: IEVMChainData): Promise<boolean>;
export declare function switchChain(chainData: IEVMChainData): Promise<boolean>;
export declare function addChain(chainData: IEVMChainData): Promise<boolean>;
