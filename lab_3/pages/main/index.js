import {ButtonComponent} from "../../components/button/index.js";
import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";


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
        return [
            {
                id: 1,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCow3PQqsUrDHkH6yf2aQt9jKFh02CxXBqc3ageziEXA&s",
                title: "Дизайн",
                text: "Сложность 1"
            },
            {
                id: 2,
                src: "https://mobile.photoprocenter.ru/files/201503021708115974_0.jpg",
                title: "Дизайн",
                text: "Сложность 2"
            },
            {
                id: 3,
                src: "https://images.satu.kz/142470648_fon-bumazhnyj-superior.jpg",
                title: "Дизайн",
                text: "Сложность 3"
            },
        ]
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

        const data = this.getData()
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
            productCard.initializePopover()
        })
    }
}