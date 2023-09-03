import { BrowserProvider, JsonRpcSigner, Result } from "ethers";
import BaseContract from "./BaseContract";

class NFTContract extends BaseContract {

    constructor(contractAddress_: string, provider_: BrowserProvider, signer_: JsonRpcSigner, abi_: any) {
        super(contractAddress_, provider_, signer_, abi_);
    }

    getOwner = async (): Promise<string> => {
        const result: Result = await this.contract.owner.staticCallResult();
        const owner = result[0];
        console.debug("NFTContract.getOwner", owner);
        return owner;
    }
}

export default NFTContract;