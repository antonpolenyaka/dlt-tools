"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EVMChainData {
    constructor(chainId_, chainName_, nativeCurrency_, rpcUrls_, blockExplorerUrls_) {
        this.chainId = chainId_;
        this.chainName = chainName_;
        this.nativeCurrency = nativeCurrency_;
        this.rpcUrls = rpcUrls_;
        this.blockExplorerUrls = blockExplorerUrls_;
    }
}
exports.default = EVMChainData;
