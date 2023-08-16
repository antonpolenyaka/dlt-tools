export default class GasPriceInfo {
    average: number | undefined;
    fast: number | undefined;
    standart: number | undefined;
    slow: number | undefined;

    constructor() {
        this.average = undefined;
        this.fast = undefined;
        this.standart = undefined;
        this.slow = undefined;
    }
}