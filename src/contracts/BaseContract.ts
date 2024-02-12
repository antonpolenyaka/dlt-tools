import {
  BrowserProvider,
  Contract,
  JsonRpcProvider,
  JsonRpcSigner,
  Wallet,
} from "ethers";
import IEVMChainData from "../IEVMChainData";

class BaseContract {
  abi: any;
  address: string;
  contract: any;
  contractSigned: any;
  provider: BrowserProvider | JsonRpcProvider;
  signer: JsonRpcSigner | Wallet;
  chainData: IEVMChainData;

  constructor(
    contractAddress_: string,
    provider_: BrowserProvider | JsonRpcProvider,
    signer_: JsonRpcSigner | Wallet,
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
