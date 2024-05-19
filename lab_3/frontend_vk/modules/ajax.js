/*class Ajax {
    post(url, callback) {
        let xhr = new XMLHttpRequest()
        xhr.open('POST', url)
        xhr.send()

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                const data = JSON.parse(xhr.response)
                callback(data)
            }
        }
    }
}
*/

/*
class Ajax {
    // метод get для получения данных
    async get(url) {
        try {
            // фетч это асинхронная функция, которая возвращает промис
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // преобразуем ответ в json
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation: ', error);
        }
    }
}


//export const ajax = new Ajax();

*/

/*
class Ajax {
    async post(url, data = {}) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'Origin': 'http://localhost:63342' // Замените на ваш домен
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation: ', error);
        }
    }
}

export const ajax = new Ajax();*/
