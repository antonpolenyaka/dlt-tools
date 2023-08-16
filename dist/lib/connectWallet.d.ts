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
export declare function connect(): Promise<string | undefined>;
export declare function checkChainId(): Promise<boolean>;
export declare function switchChain(): Promise<boolean>;
export declare function addChain(): Promise<boolean>;
