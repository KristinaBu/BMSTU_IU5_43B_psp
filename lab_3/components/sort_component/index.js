export class SortComponent {
    constructor(parent, onSortChanged) {
        this.parent = parent;
        this.onSortChanged = onSortChanged;
    }

    render() {
        const html = `
            <select id="sort-select">
                <option value="female">Женский</option>
            </select>
        `;
        this.parent.insertAdjacentHTML('beforeend', html);
        document.getElementById('sort-select').addEventListener('change', (e) => {
            this.onSortChanged(e.target.value);
        });
    }
}