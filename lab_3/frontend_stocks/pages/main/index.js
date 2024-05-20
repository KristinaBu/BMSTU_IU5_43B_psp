
import {ProductPage} from "../product";
import {CreateButtonComponent} from "../../components/create-button";
import {CreateProductPage} from "../create";
import {urls} from "../../modules/urls.js";
import {ajax} from "../../modules/ajax.js";
import {ProductCardComponent} from "../../components/product-card";


export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }


    get pageRoot() {
        return document.getElementById('main-page')
    }

    getHTML() {
        return (
            `
            <div id="main-page" class="d-flex flex-wrap"><div/>
        `
        )
    }


    getData() {
        ajax.get(urls.getStocks())
            .then(data => {
                this.renderData(data)
            })
    }


    async deleteStock(event) {
        const id = event.target.dataset.id;
        try {
            const response = await ajax.delete(urls.deleteStock(id));
            if (!response.ok || !response) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation: ', error);
        }
        // релоад страницы, чтоб не вручную
        location.reload();
    }


    renderData(items) {
        this.pageRoot.innerHTML = '';

        const createButton = new CreateButtonComponent(this.pageRoot, this.clickCreate.bind(this))
        createButton.render()

        items.forEach((item) => {
            const card = new ProductCardComponent(this.pageRoot);
            card.render(item, this.clickCard.bind(this), this.deleteStock.bind(this));
        });
    }

    clickCreate() {
        const createProductPage = new CreateProductPage(this.parent)
        createProductPage.render()
    }

    clickCard(e) {
        const cardId = e.target.dataset.id

        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }


    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)


        this.getData()
    }
}