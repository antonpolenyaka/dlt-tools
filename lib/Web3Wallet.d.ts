/// <reference types="node" />
import { BrowserProvider, JsonRpcSigner } from "ethers";
import EventEmitter from 'events';
export default class Web3Wallet {
    isConnected: boolean;
    address: string | undefined;
    shortAddress: string | undefined;
    provider: BrowserProvider | undefined;
    eventEmitter: EventEmitter;
    signer: JsonRpcSigner | undefined;
    constructor();
    connect(): Promise<boolean>;
    setAddress(): void;
    disconnect(): boolean;
}
