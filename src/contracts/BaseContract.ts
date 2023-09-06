import { BrowserProvider, Contract, JsonRpcSigner, Result } from "ethers";
import IEVMChainData from "../IEVMChainData";
import Blockchain from "../Blockchain";

class BaseContract {
  abi: any;
  address: string;
  contract: any;
  contractSigned: any;
  provider: BrowserProvider;
  signer: JsonRpcSigner;
  chainData: IEVMChainData;

  constructor(
    contractAddress_: string,
    provider_: BrowserProvider,
    signer_: JsonRpcSigner,
    abi_: any,
    chainData_: IEVMChainData
  ) {
    this.address = contractAddress_;
    this.abi = abi_;
    this.contract = new Contract(contractAddress_, abi_, provider_);
    this.provider = provider_;
    this.signer = signer_;
    this.contractSigned = new Contract(contractAddress_, abi_, signer_);
    this.chainData = chainData_;
  }
}

export default BaseContract;
