/// <reference types="node" />
import { BrowserProvider, JsonRpcSigner } from "ethers";
import EventEmitter from "events";
import IEVMChainData from "./IEVMChainData";
declare class Web3Wallet {
    isConnected: boolean;
    address: string | undefined;
    shortAddress: string | undefined;
    provider: BrowserProvider | undefined;
    eventEmitter: EventEmitter;
    signer: JsonRpcSigner | undefined;
    chainData: IEVMChainData | undefined;
    constructor(chainData_: IEVMChainData);
    initializeConnection(userAccount: string): Promise<void>;
    reconnect(): Promise<boolean>;
    connect(): Promise<boolean>;
    disconnect(): boolean;
}
export default Web3Wallet;
