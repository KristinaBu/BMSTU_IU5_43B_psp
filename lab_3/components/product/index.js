export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
        <div class="card mb-3" style="width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    ${data.photo_400_orig ? `<img src="${data.photo_400_orig}" class="img-fluid" alt="картинка">` : ''}
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        ${data.first_name && data.last_name ? `<h5 class="card-title">${data.first_name} ${data.last_name}</h5>` : ''}
                        ${data.city && data.city.title ? `<p class="card-text">Город: ${data.city.title}</p>` : ''}
                        ${data.about ? `<p class="card-text">Обо мне: ${data.about}</p>` : ''}
                        ${data.status ? `<p class="card-text">Статус: ${data.status}</p>` : ''}
                        ${data.online !== undefined ? `<p class="card-text">Онлайн: ${data.online === 1 ? 'Да' : 'Нет'}</p>` : ''}
                    </div>
                </div>
            </div>
        </div>
        `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}