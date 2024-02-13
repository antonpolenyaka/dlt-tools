import { BrowserProvider, JsonRpcProvider, JsonRpcSigner, Wallet } from "ethers";
import BaseContract from "./BaseContract";
import IEVMChainData from "../IEVMChainData";
declare class NFTContract extends BaseContract {
    constructor(contractAddress_: string, provider_: BrowserProvider | JsonRpcProvider, signer_: JsonRpcSigner | Wallet, abi_: any, chainData_: IEVMChainData);
    getOwner: () => Promise<string>;
    balanceOf: (owner_: string) => Promise<bigint>;
    ownerOf: (tokenId_: bigint) => Promise<string>;
    safeTransferFromData: (from_: string, to_: string, tokenId_: bigint, data_: Uint8Array) => Promise<boolean>;
    safeTransferFrom: (from_: string, to_: string, tokenId_: bigint) => Promise<boolean>;
    transferFrom: (from_: string, to_: string, tokenId_: bigint) => Promise<boolean>;
    approve: (approved_: string, tokenId_: bigint) => Promise<boolean>;
    setApprovalForAll: (operator_: string, approved_: boolean) => Promise<boolean>;
    getApproved: (tokenId_: bigint) => Promise<string>;
    isApprovedForAll: (owner_: string, operator_: string) => Promise<boolean>;
}
export default NFTContract;
