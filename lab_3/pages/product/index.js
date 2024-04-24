import {BackButtonComponent} from "../../components/back-button";
import {MainPage} from "../main";


import {ProductComponent} from "../../components/product";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    getData() {
        return {
                id: 1,
                src: "https://smart-estet.ru/datas/users/1-1680492539_8771e66d-8dd9-4e1a-a0c2-ad53e803b50d.jpeg",
                title: `Версия ${this.id} в разработке...`,
                text: "Дизайн",
                counter_: 0
            }

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




        const data = this.getData()
        const stock = new ProductComponent(this.pageRoot)
        stock.render(data)

        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))



        document.getElementById("next-button").addEventListener("click", this.clickNext.bind(this));
    }
}