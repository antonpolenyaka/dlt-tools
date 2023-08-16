export default class TokenMarketInfo {
    lastUpdatedAt: number | undefined;
    priceUsd: number | undefined;
    price24hChange: number | undefined;
    usd24hChange: number | undefined;
    usd24hVol: number | undefined;
    usdMarketCap: number | undefined;
    estimadedHolders: number | undefined;

    constructor() {
        this.lastUpdatedAt = undefined;
        this.priceUsd = undefined;
        this.usd24hChange = undefined;
        this.usd24hVol = undefined;
        this.usdMarketCap = undefined;
        this.estimadedHolders = undefined;
        this.price24hChange = undefined;
    }

    getDateFormated(): string | undefined {
        let result: string | undefined = undefined;
        if (this.lastUpdatedAt !== undefined) {
            let dateFormat = new Date(this.lastUpdatedAt * 1000);
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true };
            result = dateFormat.toLocaleDateString('en-us', options);
        }
        return result;
    }
}