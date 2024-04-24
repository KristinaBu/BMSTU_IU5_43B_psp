import {ButtonComponent} from "../../components/button";
import {ProductCardComponent} from "../../components/product-card";
import {ProductPage} from "../product";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {groupId} from "../../modules/consts.js";
import {SortComponent} from "../../components/sort_component";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.sort = 'id_asc';
    }

    getData() {
        ajax.post(urls.getGroupMembers(groupId, this.sort), (data) => {
            this.renderData(data.response.items)
        })
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const sortContainer = document.getElementById('sort-container');
        const sortComponent = new SortComponent(sortContainer, (sort) => {
            this.sort = sort;
            this.getData();
        });
        sortComponent.render();

        this.getData()
    }

    renderData(items) {
        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = '';
        items.forEach((item) => {
            const productCard = new ProductCardComponent(productContainer)
            productCard.render(item, this.clickCard.bind(this))
        })
    }

    clickCard(e) {
        const cardId = e.target.dataset.id

        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }


    getHTML() {
        return (
            `
        <div id="main-page" class="d-flex flex-wrap">
            <div id="sort-container"></div>
            <div id="product-container"></div>
        </div>
        `
        )
    }

}