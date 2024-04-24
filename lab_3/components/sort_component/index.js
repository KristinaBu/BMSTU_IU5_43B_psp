export class SortComponent {
    constructor(parent, onSortChanged) {
        this.parent = parent;
        this.onSortChanged = onSortChanged;
    }

    render() {
        const html = `

            <select id="sort-select">
                <option value="id_asc">ID (по возрастанию)</option>
                <option value="id_desc">ID (по убыванию)</option>
                // добавьте другие опции сортировки по желанию
            </select>
        `;
        this.parent.insertAdjacentHTML('beforeend', html);
        document.getElementById('sort-select').addEventListener('change', (e) => {
            this.onSortChanged(e.target.value);
        });
    }
}