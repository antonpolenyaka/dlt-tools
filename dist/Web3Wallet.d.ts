/// <reference types="node" />
import { BrowserProvider, JsonRpcSigner } from "ethers";
import EventEmitter from "events";
import IEVMChainData from "./IEVMChainData";
export default class Web3Wallet {
    isConnected: boolean;
    address: string | undefined;
    shortAddress: string | undefined;
    provider: BrowserProvider | undefined;
    eventEmitter: EventEmitter;
    signer: JsonRpcSigner | undefined;
    chainData: IEVMChainData | undefined;
    constructor(chainData_: IEVMChainData);
    reconnect(): Promise<boolean>;
    connect(): Promise<boolean>;
    setAddress(): void;
    disconnect(): boolean;
}
