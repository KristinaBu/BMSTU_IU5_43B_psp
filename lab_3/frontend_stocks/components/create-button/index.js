import {MainPage} from "../../pages/main";
import {ajax_meteo} from "../../modules/ajax_meteo.js";
import {urls} from "../../modules/urls.js";
import {ajax} from "../../modules/ajax.js";
import {BackButtonComponent} from "../back-button";

export class CreateButtonComponent {
    constructor(parent, clickHandler) {
        this.parent = parent;
        this.clickHandler = clickHandler;
    }

    getHTML() {
        return (
            `
        <button id="create-button" class="btn btn-primary" style="width: 100px; height: 100px;">Добавить карточку</button>
        `
        )
    }

    //  метод будет вызван при отправке формы
    handleSubmit(e) {
        e.preventDefault()

        // Запрашиваем метеоданные
        ajax_meteo.get(urls.getMeteoData())
            .then(dataFetch => {

                // Извлекаем нужные данные
                const title = Date(dataFetch.data[0].coordinates[0].dates[0].date).toLocaleString()
                const text = dataFetch.data[0].coordinates[0].dates[0].value;
                const src = urls.getMeteoPicture()
                const postData = { title, text, src };

                // Отправляем POST-запрос на сервер
                ajax.post(urls.addStock(), postData)
                    .then(response => {
                        if (response && response.success) {
                            // сервер вернул успех, обратно на главную страницу
                            const mainPage = new MainPage(this.parent)
                            mainPage.render()
                            console.log('Card created successfully');
                        } else {
                            console.log('Error creating card:');
                        }
                    });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation: ', error);
            });

    }


    render() {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        document.getElementById('create-button').addEventListener('click', this.handleSubmit.bind(this))

    }
}