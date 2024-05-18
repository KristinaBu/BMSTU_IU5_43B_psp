const {DBConnector} = require('../../modules/DBConnector');

/**
 * Класс singleton, то есть объект данного класса будет создан только один раз
 * и при последующих вызовах будет возвращаться уже созданный объект, доступ к кго полям и методам
 * есть только у самого класса, а не у его инстансов
 */
class StocksRepository {
    static db = new DBConnector('stocks.json');

    /**
     * Чтение данных из файла
     * @returns {any} - данные из файла в формате JSON
     */
    static read() {
        const file = this.db.readFile();

        return JSON.parse(file);
    }

    /**
     * Запись данных в файл
     * @param json
     */
    static write(json) {
        this.db.writeFile(JSON.stringify(json));
    }
}

module.exports = {
    StocksRepository,
}