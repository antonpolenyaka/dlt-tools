import { BrowserProvider, JsonRpcSigner } from "ethers";
export default class NFTContract {
    abi: any;
    address: string;
    contract: any;
    contractSigned: any;
    provider: BrowserProvider;
    signer: JsonRpcSigner;
    constructor(contractAddress_: string, provider_: BrowserProvider, signer_: JsonRpcSigner, abi_: any);
    getOwner: () => Promise<string>;
}
