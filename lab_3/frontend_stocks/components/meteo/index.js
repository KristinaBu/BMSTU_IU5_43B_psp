export class MeteoComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        const meteoData = data.data[0].coordinates[0].dates[0].value;

        return (
            `
            <div class="card mb-3" style="width: 540px;">
                <h5 class="card-title">${meteoData}</h5>
            </div>
        `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}