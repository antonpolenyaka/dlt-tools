import { BrowserProvider, JsonRpcProvider, JsonRpcSigner, Wallet } from "ethers";
import IEVMChainData from "../IEVMChainData";
declare class BaseContract {
    abi: any;
    address: string;
    contract: any;
    contractSigned: any;
    provider: BrowserProvider | JsonRpcProvider;
    signer: JsonRpcSigner | Wallet;
    chainData: IEVMChainData;
    constructor(contractAddress_: string, provider_: BrowserProvider | JsonRpcProvider, signer_: JsonRpcSigner | Wallet, abi_: any, chainData_: IEVMChainData);
}
export default BaseContract;
