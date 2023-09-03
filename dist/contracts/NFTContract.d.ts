import { BrowserProvider, JsonRpcSigner } from "ethers";
import BaseContract from "./BaseContract";
declare class NFTContract extends BaseContract {
    constructor(contractAddress_: string, provider_: BrowserProvider, signer_: JsonRpcSigner, abi_: any);
    getOwner: () => Promise<string>;
}
export default NFTContract;
