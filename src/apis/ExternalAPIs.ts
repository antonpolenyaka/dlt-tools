import CoinGeckoAPI from "./CoinGeckoAPI";
import CoinMarketCapAPI from "./CoinMarketCapAPI";
import EthGasStationAPI from "./EthGasStationAPI";

export default class ExternalAPIs {
    coinMarketCap: CoinMarketCapAPI;
    coingecko: CoinGeckoAPI;
    ethGasStation: EthGasStationAPI;

    constructor() {
        this.coinMarketCap = new CoinMarketCapAPI();
        this.coingecko = new CoinGeckoAPI();
        this.ethGasStation = new EthGasStationAPI();
    }
}