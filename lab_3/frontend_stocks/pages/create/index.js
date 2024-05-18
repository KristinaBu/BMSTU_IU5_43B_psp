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

    handleSubmit(e) {
        e.preventDefault()

        const title = document.getElementById('product-title').value
        const text = document.getElementById('product-text').value
        const src = document.getElementById('product-src').value

        // Here you can handle the new product data, for example, send it to the server
        console.log({ title, text, src })
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        document.getElementById('create-product-form').addEventListener('submit', this.handleSubmit.bind(this))
    }
}