import { BrowserProvider, Contract, JsonRpcSigner, Result } from "ethers";

class BaseContract {
    abi: any;
    address: string;
    contract: any;
    contractSigned: any;
    provider: BrowserProvider;
    signer: JsonRpcSigner;

    constructor(contractAddress_: string, provider_: BrowserProvider, signer_: JsonRpcSigner, abi_: any) {
        this.address = contractAddress_;
        this.abi = abi_;
        this.contract = new Contract(contractAddress_, abi_, provider_);
        this.provider = provider_;
        this.signer = signer_;
        this.contractSigned = new Contract(contractAddress_, abi_, signer_);
    }
}

export default BaseContract;