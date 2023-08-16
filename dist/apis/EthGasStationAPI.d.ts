import GasPriceInfo from './models/GasPriceInfo';
export default class EthGasStationAPI {
    getPrices: () => Promise<GasPriceInfo | undefined>;
}
