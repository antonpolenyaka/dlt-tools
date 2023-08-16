import MarketChartPoint from "./MarketChartPoint";

export default class MarketChartInfo {
    name: string;
    data: MarketChartPoint[];

    constructor() {
        this.name = 'Price';
        this.data = [];
    }
}