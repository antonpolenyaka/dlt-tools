"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseContract_1 = __importDefault(require("./BaseContract"));
const connectWallet_1 = require("../lib/connectWallet");
class NFTContract extends BaseContract_1.default {
    constructor(contractAddress_, provider_, signer_, abi_, chainData_) {
        super(contractAddress_, provider_, signer_, abi_, chainData_);
        this.getOwner = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.contract.owner.staticCallResult();
            const owner = result[0];
            console.debug("NFTContract.getOwner", owner);
            return owner;
        });
        /// Count all NFTs assigned to an owner
        /// owner_: An address for whom to query the balance
        /// Return: The number of NFTs owned by `_owner`, possibly zero
        ///
        /// function balanceOf(address _owner) external view returns (uint256);
        this.balanceOf = (owner_) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.contract.balanceOf.staticCallResult(owner_);
                const balance = result[0];
                console.debug("RONFTTimeSharingContract.balanceOf", balance);
                return balance;
            }
            catch (err) {
                console.error("RONFTTimeSharingContract.balanceOf", owner_, err);
                return BigInt(0);
            }
        });
        /// Find the owner of an NFT
        /// tokenId_: The identifier for an NFT
        /// Return: The address of the owner of the NFT
        ///
        /// function ownerOf(uint256 _tokenId) external view returns (address);
        this.ownerOf = (tokenId_) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.contract.ownerOf.staticCallResult(tokenId_);
            const owner = result[0];
            console.debug("NFTTimeSharing.ownerOf", owner);
            return owner;
        });
        /// Transfers the ownership of an NFT from one address to another address
        /// from_: The current owner of the NFT
        /// to_: The new owner
        /// tokenId_: The NFT to transfer
        /// data_: Additional data with no specified format, sent in call to `to_`
        ///
        /// function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
        this.safeTransferFromData = (from_, to_, tokenId_, data_) => __awaiter(this, void 0, void 0, function* () {
            const chainOk = yield (0, connectWallet_1.checkChainId)(this.chainData);
            let result;
            if (chainOk) {
                const tx = yield this.contractSigned.safeTransferFrom.send(from_, to_, tokenId_, data_);
                console.debug("NFTTimeSharing.safeTransferFromData. Hash: ", tx.hash);
                yield tx.wait();
                result = true;
            }
            else {
                console.error("NFTTimeSharing.safeTransferFromData: incorrect chain");
                result = false;
            }
            return result;
        });
        /// Transfers the ownership of an NFT from one address to another address
        /// from_: The current owner of the NFT
        /// to_: The new owner
        /// tokenId_: The NFT to transfer
        ///
        /// function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
        this.safeTransferFrom = (from_, to_, tokenId_) => __awaiter(this, void 0, void 0, function* () {
            const chainOk = yield (0, connectWallet_1.checkChainId)(this.chainData);
            let result;
            if (chainOk) {
                const tx = yield this.contractSigned.safeTransferFrom.send(from_, to_, tokenId_);
                console.debug("NFTTimeSharing.safeTransferFrom. Hash: ", tx.hash);
                yield tx.wait();
                result = true;
            }
            else {
                console.error("NFTTimeSharing.safeTransferFrom: incorrect chain");
                result = false;
            }
            return result;
        });
        /// Transfer ownership of an NFT -- THE CALLER IS RESPONSIBLE
        ///  TO CONFIRM THAT `_to` IS CAPABLE OF RECEIVING NFTS OR ELSE
        ///  THEY MAY BE PERMANENTLY LOST
        /// from_: The current owner of the NFT
        /// to_: The new owner
        /// tokenId_: The NFT to transfer
        ///
        /// function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
        this.transferFrom = (from_, to_, tokenId_) => __awaiter(this, void 0, void 0, function* () {
            const chainOk = yield (0, connectWallet_1.checkChainId)(this.chainData);
            let result;
            if (chainOk) {
                const tx = yield this.contractSigned.transferFrom.send(from_, to_, tokenId_);
                console.debug("NFTTimeSharing.transferFrom. Hash: ", tx.hash);
                yield tx.wait();
                result = true;
            }
            else {
                console.error("NFTTimeSharing.transferFrom: incorrect chain");
                result = false;
            }
            return result;
        });
        /// Change or reaffirm the approved address for an NFT
        /// approved_: The new approved NFT controller
        /// tokenId_: The NFT to approve
        ///
        /// function approve(address _approved, uint256 _tokenId) external payable;
        this.approve = (approved_, tokenId_) => __awaiter(this, void 0, void 0, function* () {
            const chainOk = yield (0, connectWallet_1.checkChainId)(this.chainData);
            let result;
            if (chainOk) {
                const tx = yield this.contractSigned.approve.send(approved_, tokenId_);
                console.debug("NFTTimeSharing.approve. Hash: ", tx.hash);
                yield tx.wait();
                result = true;
            }
            else {
                console.error("NFTTimeSharing.approve: incorrect chain");
                result = false;
            }
            return result;
        });
        /// Enable or disable approval for a third party ("operator") to manage
        ///  all of `msg.sender`'s assets
        /// operator_: Address to add to the set of authorized operators
        /// approved_: True if the operator is approved, false to revoke approval
        ///
        /// function setApprovalForAll(address _operator, bool _approved) external;
        this.setApprovalForAll = (operator_, approved_) => __awaiter(this, void 0, void 0, function* () {
            const chainOk = yield (0, connectWallet_1.checkChainId)(this.chainData);
            let result;
            if (chainOk) {
                const tx = yield this.contractSigned.setApprovalForAll.send(operator_, approved_);
                console.debug("NFTTimeSharing.setApprovalForAll. Hash: ", tx.hash);
                yield tx.wait();
                result = true;
            }
            else {
                console.error("NFTTimeSharing.setApprovalForAll: incorrect chain");
                result = false;
            }
            return result;
        });
        /// Get the approved address for a single NFT
        /// tokenId_: The NFT to find the approved address for
        /// Return: The approved address for this NFT, or the zero address if there is none
        ///
        /// function getApproved(uint256 _tokenId) external view returns (address);
        this.getApproved = (tokenId_) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.contract.getApproved.staticCallResult(tokenId_);
            const approved = result[0];
            console.debug("NFTTimeSharing.getApproved", approved);
            return approved;
        });
        /// Query if an address is an authorized operator for another address
        /// owner_: The address that owns the NFTs
        /// operator_: The address that acts on behalf of the owner
        /// Return: True if `_operator` is an approved operator for `_owner`, false otherwise
        ///
        /// function isApprovedForAll(address _owner, address _operator) external view returns (bool);
        this.isApprovedForAll = (owner_, operator_) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.contract.isApprovedForAll.staticCallResult(owner_, operator_);
            const isApproved = result[0];
            console.debug("NFTTimeSharing.isApprovedForAll", isApproved);
            return isApproved;
        });
    }
}
exports.default = NFTContract;
