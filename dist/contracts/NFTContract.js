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
class NFTContract extends BaseContract_1.default {
    constructor(contractAddress_, provider_, signer_, abi_) {
        super(contractAddress_, provider_, signer_, abi_);
        this.getOwner = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.contract.owner.staticCallResult();
            const owner = result[0];
            console.debug("NFTContract.getOwner", owner);
            return owner;
        });
    }
}
exports.default = NFTContract;
