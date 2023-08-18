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
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
class NFTContract {
    constructor(contractAddress_, provider_, signer_, abi_) {
        this.getOwner = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.contract.owner.staticCallResult();
            const owner = result[0];
            console.debug("NFTContract.getOwner", owner);
            return owner;
        });
        this.address = contractAddress_;
        this.abi = abi_;
        this.contract = new ethers_1.Contract(contractAddress_, abi_, provider_);
        this.provider = provider_;
        this.signer = signer_;
        this.contractSigned = new ethers_1.Contract(contractAddress_, abi_, signer_);
    }
}
exports.default = NFTContract;
