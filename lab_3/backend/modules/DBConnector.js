const fs = require('fs');
const path = require('path');

/**
 * Класс для работы с файлами в папке db

 */
class DBConnector {
    constructor(filename) {
        this.filename = filename;
    }

    /**
     *  Функция берет файл из папки db и возвращает его содержимое
     * @returns {string}
     */
    readFile() {
        return fs.readFileSync(path.join(process.cwd(), 'db', this.filename), "utf8");
    }

    /**
     * Функция записывает данные в файл в папке db
     * @param data - данные, которые нужно записать, формат - строка
     */
    writeFile(data) {
        fs.writeFileSync(path.join(process.cwd(), 'db', this.filename), data, "utf8");
    }
}

module.exports = {
    DBConnector,
};