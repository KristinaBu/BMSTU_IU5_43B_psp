const {StocksRepository} = require('./StocksRespository');

/**
 * Все методы класса являются статическими, так как класс не хранит состояния
 * то есть нет необходимости создавать экземпляр класса
 * Он просто обрабатывает данные
 */
class StockDAO {
    constructor(id, src, title, text) {
        this.id = id;
        this.src = src;
        this.title = title;
        this.text = text;
    }

    static generateNewId(stocks) {
        // массив акций пуст, возвращаем 1
        if (stocks.length === 0) {
            return 1;
        }

        // смотрим по последнему id
        const lastStockId = stocks[stocks.length - 1].id;
        return lastStockId + 1;
    }

    static _validateId(id) {
        const numberId = Number.parseInt(id);
        if (Number.isNaN(numberId)) {
            throw new Error('invalidate id');
        }
    }

    static _validate(stock) {
        if (
            stock.id === undefined ||
            stock.src === undefined ||
            stock.title === undefined ||
            stock.text === undefined
        ) {
            throw new Error('invalidate stock data');
        }

        this._validateId(stock.id);
    }

    /**
     * Функция возвращает все акции
     * @returns {*} - объект класса StockDAO
     */
    static find() {
        const stocks = StocksRepository.read();

        return stocks.map(({id, src, title, text}) => {
            return new this(id, src, title, text);
        });
    }

    static findById(id) {
        this._validateId(id);

        const stocks = StocksRepository.read();
        const stock = stocks.find((s) => s.id === id);

        return new this(stock.id, stock.src, stock.title, stock.text);
    }

    static insert(stock) {
        // временная неоптимизация :D
        const stocks = StocksRepository.read();
        stock.id = this.generateNewId(stocks);
        this._validate(stock);


        StocksRepository.write([...stocks, stock]);

        return new this(stock.id, stock.src, stock.title, stock.text);
    }

    static delete(id) {
        this._validateId(id);

        const stocks = StocksRepository.read();
        const filteredStocks = stocks.filter((s) => s.id !== id);

        StocksRepository.write(filteredStocks);

        return filteredStocks.map(({id, src, title, text}) => {
            return new this(id, src, title, text);
        });
    }

    toJSON() {
        return {
            id: this.id,
            src: this.src,
            title: this.title,
            text: this.text,
        }
    }
}

module.exports = {
    StockDAO,
}