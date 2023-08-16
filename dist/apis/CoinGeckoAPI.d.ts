import TokenMarketInfo from './models/TokenMarketInfo';
import MarketChartInfo from './models/MarketChartInfo';
export default class CoinGeckoAPI {
    getMarketChartPRO: (from: number, to: number, coinId: string, apiKey: string) => Promise<MarketChartInfo | undefined>;
    getSimplePrice: (coinId: string, apiKey: string, circulatingSupply: number) => Promise<TokenMarketInfo | undefined>;
}
