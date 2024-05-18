import {ProductComponent} from "../../components/product";
import {BackButtonComponent} from "../../components/back-button";
import {MainPage} from "../main";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    /*getData() {
        ajax.post(urls.getUserInfo(this.id), (data) => {
            this.renderData(data.response)
        })
    }*/

/*    async getData() {
        const data = await ajax.post(urls.getUserInfo(this.id));
        this.renderData(data.response);
    }*/

    getData() {
        // теперь тут используем метод get. this id - это id пользователя
        ajax.get(urls.getUserInfo(this.id)).then(data => {
            // передаем в renderData только response из полученного объекта
            this.renderData(data.response);
        }).catch(error => {
            console.error('There was a problem with the fetch operation: ', error);
        });
    }

    renderData(item) {
        const product = new ProductComponent(this.pageRoot)
        product.render(item[0])
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (
            `
                <div id="product-page"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))

        this.getData()
    }
}