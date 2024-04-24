
import {ProductPage} from "../product";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {groupId} from "../../modules/consts.js";
import {ProductComponent} from "../../components/product";


export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    /**
     * Возвращает корневой элемент страницы
     * @returns {HTMLElement}
     */
    get pageRoot() {
        return document.getElementById('main-page')
    }

    /**
     * Возвращает HTML подписчика сообщества. Использует данные пользователя
     * @param {Object} data - данные пользователя
     * @returns {string}
     */
    getHTML(data) {
        return (
            `
            <div class="card" style="width: 300px;">
                <img class="card-img-top" src="${data.photo_400_orig}" alt="картинка">
                <div class="card-body">
                    <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Нажми на меня</button>
                </div>
            </div>
        `
        )
    }

    /**
     * Получает данные о пользователях через API и рендерит их на страницу
     */
    getData() {
        ajax.post(urls.getGroupMembers(groupId), (data) => {
            this.renderData(data.response.items)
        })
    }

    /*
    renderData(items) {
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }
*/

    /**
     * Рендерит данные на страницу
     * @param items - массив объектов, которые содержат информацию о пользователях
     */
    renderData(items) {
        // цикл по всем элементам массива items - это массив объектов, которые содержат информацию о пользователях
        items.forEach((item) => {
            // Создать новый экземпляр класса ProductComponent - компонент, который отвечает за отображение карточки
            const product = new ProductComponent(this.pageRoot)
            const html = this.getHTML(item)
            // тут вставляется html-код карточки в корневой элемент страницы. Корневой элемент страницы - это div с id="main-page"
            this.parent.insertAdjacentHTML('beforeend', html)
            product.render(item)

            // тут добавляется обработчик события на кнопку, которая находится в карточке
            const cardButton = document.getElementById(`click-card-${item.id}`)
            // bind - это метод, который позволяет передать контекст в функцию, которая будет вызвана при событии, то есть this внутри функции будет указывать на экземпляр класса MainPage
            // если бы не было bind, то this внутри функции clickCard указывал бы на кнопку, на которая была нажата
            cardButton.addEventListener('click', this.clickCard.bind(this))
        })
    }

    /**
     * Обработчик события на кнопку карточки
     * @param {MouseEvent} e - событие клика на кнопку
     */
    clickCard(e) {
        // e.target - это элемент, на котором было совершено событие, то есть кнопка
        const cardId = e.target.dataset.id
        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        //const html = this.getHTML()
        //this.parent.insertAdjacentHTML('beforeend', html)

        this.getData()
    }
}