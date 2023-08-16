"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TokenMarketInfo {
    constructor() {
        this.lastUpdatedAt = undefined;
        this.priceUsd = undefined;
        this.usd24hChange = undefined;
        this.usd24hVol = undefined;
        this.usdMarketCap = undefined;
        this.estimadedHolders = undefined;
        this.price24hChange = undefined;
    }
    getDateFormated() {
        let result = undefined;
        if (this.lastUpdatedAt !== undefined) {
            let dateFormat = new Date(this.lastUpdatedAt * 1000);
            const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true };
            result = dateFormat.toLocaleDateString('en-us', options);
        }
        return result;
    }
}
exports.default = TokenMarketInfo;
