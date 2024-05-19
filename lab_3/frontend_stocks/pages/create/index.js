import {MainPage} from "../main";
import {BackButtonComponent} from "../../components/back-button";
import {urls} from "../../modules/urls.js";
import {ajax} from "../../modules/ajax.js";

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
                        <label for="product-title" class="form-label">Title</label>
                        <input type="text" class="form-control" id="product-title" required>
                    </div>
                    <div class="mb-3">
                        <label for="product-text" class="form-label">Text</label>
                        <input type="text" class="form-control" id="product-text" required>
                    </div>
                    <div class="mb-3">
                        <label for="product-src" class="form-label">Image URL</label>
                        <input type="text" class="form-control" id="product-src" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Create</button>
                </form>
            </div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    //  метод будет вызван при отправке формы
    handleSubmit(e) {
        e.preventDefault()

        const title = document.getElementById('product-title').value
        const text = document.getElementById('product-text').value
        const src = document.getElementById('product-src').value

        const data = { title, text, src };

        //  POST-запрос на сервер
        ajax.post(urls.addStock(), data)
            .then(response => {
                if (response && response.success) {
                    //  сервер вернул успех,  обратно на главную страницу
                    const mainPage = new MainPage(this.parent)
                    mainPage.render()
                    console.log('Card created successfully');
                } else {
                    console.log('Error creating card:');
                }
            });
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)


        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))

        document.getElementById('create-product-form').addEventListener('submit', this.handleSubmit.bind(this))
    }
}