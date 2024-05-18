export class CreateButtonComponent {
    constructor(parent, clickHandler) {
        this.parent = parent;
        this.clickHandler = clickHandler;
    }

    getHTML() {
        return (
            `
            <button id="create-button" class="btn btn-primary">Create Product</button>
            `
        )
    }

    render() {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        document.getElementById('create-button').addEventListener('click', this.clickHandler)
    }
}