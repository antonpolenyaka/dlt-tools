import { BrowserProvider, JsonRpcSigner } from "ethers";
declare class BaseContract {
    abi: any;
    address: string;
    contract: any;
    contractSigned: any;
    provider: BrowserProvider;
    signer: JsonRpcSigner;
    constructor(contractAddress_: string, provider_: BrowserProvider, signer_: JsonRpcSigner, abi_: any);
}
export default BaseContract;
