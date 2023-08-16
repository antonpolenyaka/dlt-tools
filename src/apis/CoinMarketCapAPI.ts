import axios from 'axios';

export default class CoinMarketCapAPI {

    // Example:
    // apiKey = 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d4677'
    getData(apiKey: string) {
        let response: any = null;
        console.debug("get data from coinmarketcap", 1);
        new Promise(async (resolve, reject) => {
            try {
                console.debug("get data from coinmarketcap", 2);
                response = await axios.get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
                    headers: {
                        'X-CMC_PRO_API_KEY': apiKey,
                    },
                });
                //response = await axios.get('https://apibotplanet.com/api/prices/days/260eff46-df25-4824-a47a-7d66a5c81dd3');
                console.debug("get data from coinmarketcap", 3, response);
            } catch (ex) {
                console.debug("get data from coinmarketcap", 4, ex);
                response = null;
                console.debug("Error in CoinMarketCap API. getData", ex);
                reject(ex);
            }
            if (response) {
                // success
                console.debug("get data from coinmarketcap", 5, response.data);
                const json = response.data;
                console.debug(json);
                resolve(json);
            }
        });
    }
}