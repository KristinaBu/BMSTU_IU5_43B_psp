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
/*
    getData() {
        ajax.post(urls.getGroupMembers(groupId, this.sort), (data) => {
            this.renderData(data.response.items)
        })
    }*/

/*    async getData() {
        const data = await ajax.post(urls.getGroupMembers(groupId, this.sort));
        this.renderData(data.response.json().body);
        // this.renderData(data.response.items);
    }*/

    getData(){
        // а тут this это объект класса MainPage
        ajax.get(urls.getGroupMembers(groupId, this.sort)).then(data => {
            // items - это массив объектов пользователей
            this.renderData(data.response.items)
        }).catch(error => {
            console.error('There was a problem with the fetch operation: ', error);
        });
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
        // перед рендером очищаем контейнер
        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = '';

        // отфильтровать элементы, оставив только женский пол
        const femaleItems = items.filter(item => item.sex === 1);

        femaleItems.forEach((item) => {
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