import axios from 'axios';
import GasPriceInfo from './models/GasPriceInfo';

export default class EthGasStationAPI {

    getPrices = async (): Promise<GasPriceInfo | undefined> => {
        let result: GasPriceInfo | undefined = undefined;
        let response: any = null;
        console.debug("Get data from EthGasStation", 1);
        try {
            console.debug("get data from EthGasStation", 2);
            response = await axios.get('https://ethgasstation.info/api/ethgasAPI.json');
            console.debug("get data from EthGasStation", 3, response);
        } catch (ex) {
            response = null;
            console.error("Error in EthGasStation API. getData", 4, ex);
        }
        if (response) {
            // success
            const json = response.data;
            result = new GasPriceInfo();
            result.fast = json.fast;
            result.average = json.average;
            result.slow = json.safeLow;
            result.standart = json.average;
            console.debug("Get data from EthGasStation", 5, response.data, result);
        }
        return result;
    }
}