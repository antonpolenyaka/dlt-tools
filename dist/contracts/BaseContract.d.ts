import { BrowserProvider, JsonRpcSigner } from "ethers";
import IEVMChainData from "../IEVMChainData";
declare class BaseContract {
    abi: any;
    address: string;
    contract: any;
    contractSigned: any;
    provider: BrowserProvider;
    signer: JsonRpcSigner;
    chainData: IEVMChainData;
    constructor(contractAddress_: string, provider_: BrowserProvider, signer_: JsonRpcSigner, abi_: any, chainData_: IEVMChainData);
}
export default BaseContract;
