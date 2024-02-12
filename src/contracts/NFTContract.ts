import {
  BrowserProvider,
  ContractTransactionResponse,
  JsonRpcProvider,
  JsonRpcSigner,
  Result,
  Wallet,
} from "ethers";
import BaseContract from "./BaseContract";
import IEVMChainData from "../IEVMChainData";
import { checkChainId } from "../lib/connectWallet";

class NFTContract extends BaseContract {
  constructor(
    contractAddress_: string,
    provider_: BrowserProvider | JsonRpcProvider,
    signer_: JsonRpcSigner | Wallet,
    abi_: any,
    chainData_: IEVMChainData
  ) {
    super(contractAddress_, provider_, signer_, abi_, chainData_);
  }

  getOwner = async (): Promise<string> => {
    const result: Result = await this.contract.owner.staticCallResult();
    const owner = result[0];
    console.debug("NFTContract.getOwner", owner);
    return owner;
  };

  /// Count all NFTs assigned to an owner
  /// owner_: An address for whom to query the balance
  /// Return: The number of NFTs owned by `_owner`, possibly zero
  ///
  /// function balanceOf(address _owner) external view returns (uint256);
  balanceOf = async (owner_: string): Promise<bigint> => {
    try {
      const result: Result = await this.contract.balanceOf.staticCallResult(
        owner_
      );
      const balance = result[0];
      console.debug("RONFTTimeSharingContract.balanceOf", balance);
      return balance;
    } catch (err) {
      console.error("RONFTTimeSharingContract.balanceOf", owner_, err);
      return BigInt(0);
    }
  };

  /// Find the owner of an NFT
  /// tokenId_: The identifier for an NFT
  /// Return: The address of the owner of the NFT
  ///
  /// function ownerOf(uint256 _tokenId) external view returns (address);
  ownerOf = async (tokenId_: bigint): Promise<string> => {
    const result: Result = await this.contract.ownerOf.staticCallResult(
      tokenId_
    );
    const owner = result[0];
    console.debug("NFTTimeSharing.ownerOf", owner);
    return owner;
  };

  /// Transfers the ownership of an NFT from one address to another address
  /// from_: The current owner of the NFT
  /// to_: The new owner
  /// tokenId_: The NFT to transfer
  /// data_: Additional data with no specified format, sent in call to `to_`
  ///
  /// function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
  safeTransferFromData = async (
    from_: string,
    to_: string,
    tokenId_: bigint,
    data_: Uint8Array
  ): Promise<boolean> => {
    const chainOk: boolean = await checkChainId(this.chainData);
    let result: boolean;
    if (chainOk) {
      const tx: ContractTransactionResponse =
        await this.contractSigned.safeTransferFrom.send(
          from_,
          to_,
          tokenId_,
          data_
        );
      console.debug("NFTTimeSharing.safeTransferFromData. Hash: ", tx.hash);
      await tx.wait();
      result = true;
    } else {
      console.error("NFTTimeSharing.safeTransferFromData: incorrect chain");
      result = false;
    }
    return result;
  };

  /// Transfers the ownership of an NFT from one address to another address
  /// from_: The current owner of the NFT
  /// to_: The new owner
  /// tokenId_: The NFT to transfer
  ///
  /// function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
  safeTransferFrom = async (
    from_: string,
    to_: string,
    tokenId_: bigint
  ): Promise<boolean> => {
    const chainOk: boolean = await checkChainId(this.chainData);
    let result: boolean;
    if (chainOk) {
      const tx: ContractTransactionResponse =
        await this.contractSigned.safeTransferFrom.send(from_, to_, tokenId_);
      console.debug("NFTTimeSharing.safeTransferFrom. Hash: ", tx.hash);
      await tx.wait();
      result = true;
    } else {
      console.error("NFTTimeSharing.safeTransferFrom: incorrect chain");
      result = false;
    }
    return result;
  };

  /// Transfer ownership of an NFT -- THE CALLER IS RESPONSIBLE
  ///  TO CONFIRM THAT `_to` IS CAPABLE OF RECEIVING NFTS OR ELSE
  ///  THEY MAY BE PERMANENTLY LOST
  /// from_: The current owner of the NFT
  /// to_: The new owner
  /// tokenId_: The NFT to transfer
  ///
  /// function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
  transferFrom = async (
    from_: string,
    to_: string,
    tokenId_: bigint
  ): Promise<boolean> => {
    const chainOk: boolean = await checkChainId(this.chainData);

    let result: boolean;
    if (chainOk) {
      const tx: ContractTransactionResponse =
        await this.contractSigned.transferFrom.send(from_, to_, tokenId_);
      console.debug("NFTTimeSharing.transferFrom. Hash: ", tx.hash);
      await tx.wait();
      result = true;
    } else {
      console.error("NFTTimeSharing.transferFrom: incorrect chain");
      result = false;
    }
    return result;
  };

  /// Change or reaffirm the approved address for an NFT
  /// approved_: The new approved NFT controller
  /// tokenId_: The NFT to approve
  ///
  /// function approve(address _approved, uint256 _tokenId) external payable;
  approve = async (approved_: string, tokenId_: bigint): Promise<boolean> => {
    const chainOk: boolean = await checkChainId(this.chainData);
    let result: boolean;
    if (chainOk) {
      const tx: ContractTransactionResponse =
        await this.contractSigned.approve.send(approved_, tokenId_);
      console.debug("NFTTimeSharing.approve. Hash: ", tx.hash);
      await tx.wait();
      result = true;
    } else {
      console.error("NFTTimeSharing.approve: incorrect chain");
      result = false;
    }
    return result;
  };

  /// Enable or disable approval for a third party ("operator") to manage
  ///  all of `msg.sender`'s assets
  /// operator_: Address to add to the set of authorized operators
  /// approved_: True if the operator is approved, false to revoke approval
  ///
  /// function setApprovalForAll(address _operator, bool _approved) external;
  setApprovalForAll = async (
    operator_: string,
    approved_: boolean
  ): Promise<boolean> => {
    const chainOk: boolean = await checkChainId(this.chainData);
    let result: boolean;
    if (chainOk) {
      const tx: ContractTransactionResponse =
        await this.contractSigned.setApprovalForAll.send(operator_, approved_);
      console.debug("NFTTimeSharing.setApprovalForAll. Hash: ", tx.hash);
      await tx.wait();
      result = true;
    } else {
      console.error("NFTTimeSharing.setApprovalForAll: incorrect chain");
      result = false;
    }
    return result;
  };

  /// Get the approved address for a single NFT
  /// tokenId_: The NFT to find the approved address for
  /// Return: The approved address for this NFT, or the zero address if there is none
  ///
  /// function getApproved(uint256 _tokenId) external view returns (address);
  getApproved = async (tokenId_: bigint): Promise<string> => {
    const result: Result = await this.contract.getApproved.staticCallResult(
      tokenId_
    );
    const approved = result[0];
    console.debug("NFTTimeSharing.getApproved", approved);
    return approved;
  };

  /// Query if an address is an authorized operator for another address
  /// owner_: The address that owns the NFTs
  /// operator_: The address that acts on behalf of the owner
  /// Return: True if `_operator` is an approved operator for `_owner`, false otherwise
  ///
  /// function isApprovedForAll(address _owner, address _operator) external view returns (bool);
  isApprovedForAll = async (
    owner_: string,
    operator_: string
  ): Promise<boolean> => {
    const result: Result =
      await this.contract.isApprovedForAll.staticCallResult(owner_, operator_);
    const isApproved = result[0];
    console.debug("NFTTimeSharing.isApprovedForAll", isApproved);
    return isApproved;
  };
}

export default NFTContract;
