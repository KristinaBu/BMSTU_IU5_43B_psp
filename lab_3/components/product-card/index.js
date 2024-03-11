

export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
            <div class="card" style="width: 300px;">
                <img class="card-img-top" src="${data.src}" alt="картинка">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    
                    <a tabindex="0" class="btn btn-lg btn-info" role="button" data-bs-toggle="popover" style="margin-top: 20px" data-bs-trigger="focus" 
                        title="Важно!!!" data-bs-content="Важные данные">
                        Информация</a>
                        
                        <button type="button" class="btn btn-primary position-relative" id="click-card-${data.id}" 
                        data-id="${data.id}" > Нажатия 
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> 
                            ${data.counter}
                        <span class="visually-hidden">непрочитанные сообщения</span> </span> </button>
                    
                        
                </div>
                <button type="button" class="btn btn-secondary" id="reset-card-${data.id}" data-id="${data.id}" > Сбросить счетчик </button>
            </div>
        `
        )
    }
    addListeners(data, listener) {
        const button = document.getElementById(`click-card-${data.id}`);
        button.addEventListener("click", (e) => {
            // Увеличиваем счетчик и сохраняем его в localStorage
            data.counter = parseInt(localStorage.getItem(`counter-${data.id}`) || "0") + 1;
            localStorage.setItem(`counter-${data.id}`, data.counter);

            const counterElement = button.querySelector('.badge');
            counterElement.textContent = data.counter;
            listener(e);
        });

        const resetButton = document.getElementById(`reset-card-${data.id}`);
        resetButton.addEventListener("click", () => {
            // Сбрасываем счетчик и сохраняем его в localStorage
            data.counter = 0;
            localStorage.setItem(`counter-${data.id}`, data.counter);

            const counterElement = document.querySelector('#click-card-${data.id} .badge');
            counterElement.textContent = data.counter;
        });

    }

    render(data, listener) {
        // Загружаем счетчик из localStorage перед рендерингом
        data.counter = parseInt(localStorage.getItem(`counter-${data.id}`) || "0");

        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }



    initializePopover() {
        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
        var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl)
        })
    }

}