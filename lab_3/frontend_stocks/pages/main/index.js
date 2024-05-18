import {ProductCardComponent} from "../../components/product-card";
import {ProductPage} from "../product";
import {CreateButtonComponent} from "../../components/create-button";
import {CreateProductPage} from "../create";


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

        const createButton = new CreateButtonComponent(this.pageRoot, this.clickCreate.bind(this))
        createButton.render()

        const data = this.getData()
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
            productCard.initializePopover()
        })
    }
}