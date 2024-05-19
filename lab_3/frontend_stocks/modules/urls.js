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
}

export const urls = new Urls()