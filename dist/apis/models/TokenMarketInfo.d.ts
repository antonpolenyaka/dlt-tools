export default class TokenMarketInfo {
    lastUpdatedAt: number | undefined;
    priceUsd: number | undefined;
    price24hChange: number | undefined;
    usd24hChange: number | undefined;
    usd24hVol: number | undefined;
    usdMarketCap: number | undefined;
    estimadedHolders: number | undefined;
    constructor();
    getDateFormated(): string | undefined;
}
