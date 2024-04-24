import {BackButtonComponent} from "../../components/back-button";
import {MainPage} from "../main";


import {ProductComponent} from "../../components/product";
import {urls} from "../../modules/urls";
import {ajax} from "../../modules/ajax";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    getData() {
        ajax.post(urls.getUserInfo(this.id), (data) => {
            this.renderData(data.response)
        })
    }

    renderData(data) {
        const product = new ProductComponent(this.pageRoot)
        product.render(data) // передать data напрямую, без использования [0]
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML(data) {
        return (
            `
            <div class="card mb-3" style="width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${data.photo_400_orig}" class="img-fluid" alt="картинка">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
                        </div>
                    </div>
                </div>
            </div>
        `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    render() {
        this.parent.innerHTML = ''
       //  const html = this.getHTML()
        // this.parent.insertAdjacentHTML('beforeend', html)

        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))

        this.getData()
    }
}