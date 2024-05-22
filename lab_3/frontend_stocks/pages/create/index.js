import {MainPage} from "../main";
import {BackButtonComponent} from "../../components/back-button";
import {urls} from "../../modules/urls.js";
import {ajax} from "../../modules/ajax.js";
import {ajax_meteo} from "../../modules/ajax_meteo.js";

export class CreateProductPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('create-product-page')
    }

    getHTML() {
        return (
            `
            <div id="create-product-page">
                <form id="create-product-form">
                    <div class="mb-3">
                        <label for="product-title" class="form-label">Заголовок</label>
                        <input type="text" class="form-control" id="product-title" required>
                    </div>
                    <div class="mb-3">
                        <label for="product-text" class="form-label">Основной текст</label>
                        <input type="text" class="form-control" id="product-text" required>
                    </div>
                    <div class="mb-3">
                        <label for="product-src" class="form-label">URL изображения</label>
                        <input type="text" class="form-control" id="product-src" required>
                    </div>
                    <button type="submit" class="btn btn-primary" style="margin-bottom: 20px">Создать</button>
                </form>
            </div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }
/*
    //  метод будет вызван при отправке формы
    handleSubmit(e) {
        e.preventDefault()

        // Запрашиваем метеоданные
        ajax_meteo.get(urls.getMeteoData())
            .then(dataFetch => {
                // Извлекаем нужные данные
                const title = Date(dataFetch.data[0].coordinates[0].dates[0].date).toLocaleString()
                const text = dataFetch.data[0].coordinates[0].dates[0].value;
                const src = "data:image/jpeg;base64,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";

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
    }*/

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)


        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))

        document.getElementById('create-product-form').addEventListener('submit', this.handleSubmit.bind(this))
    }
}