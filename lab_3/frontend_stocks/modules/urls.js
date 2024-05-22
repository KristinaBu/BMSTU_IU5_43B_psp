import {getCurrentTime} from "../utils/edit_urls.js";

class Urls {
    constructor() {
        this.url = 'http://localhost:8000'
    }

    getStocks() {
        return `${this.url}/stocks`;
    }

    getStockById(id) {
        return `${this.url}/stocks/${id}`;
    }

    addStock() {
        return `${this.url}/stocks`;
    }

    deleteStock(id) {
        return `${this.url}/stocks/${id}`;
    }

    getMeteoData(){
        const currentTime = getCurrentTime();
        return `https://api.meteomatics.com/${currentTime}/t_2m:C/55.625578,37.6063916/json`;
    }

    getMeteoPicture(){
        const currentTime = getCurrentTime();
        return `https://api.meteomatics.com/${currentTime}/t_2m:C/82.0586232,-180_41.1850968,180:700x350/png?model=mix`;
    }

    getToken(){
        return "'https://login.meteomatics.com/api/v1/token'";
    }
}

export const urls = new Urls()