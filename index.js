const categories = [
    { id: 'all', label: 'All' },
    { id: 'image', label: 'Image' },
    { id: 'animation', label: 'Animation' },
    { id: 'sfx', label: 'SFX' },
    { id: 'video', label: 'Video' },
    { id: 'music', label: 'Music' },
];

const assets = [
    {
        id: 'animation',
        title: 'Coding Sticker Animation',
        category: 'animation',
        author: 'Forge Inc.',
        source: 'coding.png',
        credit: 'Animation by Forge Inc. Created in 2026.',
        description: 'A clean coding animation for use like working or fixing',
        tags: ['fixing', 'working', 'coding'],
        type: 'Sticker Animation',
    },
];

const categoryList = document.getElementById('categoryList');
const assetGrid = document.getElementById('assetGrid');
const currentCategoryTitle = document.getElementById('currentCategoryTitle');
const assetCountText = document.getElementById('assetCountText');
const searchInput = document.getElementById('searchInput');

let selectedCategory = 'all';
let searchTerm = '';

function createCategoryButtons() {
    categories.forEach(category => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `category-button ${category.id === selectedCategory ? 'active' : ''}`;
        button.textContent = category.label;
        button.dataset.category = category.id;
        button.addEventListener('click', () => {
            selectedCategory = category.id;
            updateCategoryButtons();
            renderAssets();
        });
        categoryList.appendChild(button);
    });
}

function updateCategoryButtons() {
    const buttons = categoryList.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.toggle('active', button.dataset.category === selectedCategory);
    });
}

function getFilteredAssets() {
    return assets.filter(asset => {
        const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
        const lowerSearch = searchTerm.trim().toLowerCase();
        if (!lowerSearch) return matchesCategory;

        const matchesSearch = [asset.title, asset.author, asset.description, asset.tags.join(' ')].some(value =>
            value.toLowerCase().includes(lowerSearch)
        );
        return matchesCategory && matchesSearch;
    });
}

function renderAssets() {
    const filteredAssets = getFilteredAssets();
    assetGrid.innerHTML = '';
    currentCategoryTitle.textContent = selectedCategory === 'all'
        ? 'All categories'
        : categories.find(category => category.id === selectedCategory)?.label || 'Assets';
    assetCountText.textContent = `${filteredAssets.length} asset${filteredAssets.length === 1 ? '' : 's'} available`;

    if (filteredAssets.length === 0) {
        assetGrid.innerHTML = '<p class="asset-description">No assets match your filter. Try a different category or search term.</p>';
        return;
    }

    filteredAssets.forEach(asset => {
        const card = document.createElement('article');
        card.className = 'asset-card';
        card.innerHTML = `
            <div>
                <p class="badge">${asset.type}</p>
                <h3 class="asset-title">${asset.title}</h3>
                <p class="asset-meta">${asset.description}</p>
            </div>
            <div class="asset-tags">
                ${asset.tags.map(tag => `<span class="asset-tag">${tag}</span>`).join('')}
            </div>
            <div class="asset-footer">
                <div>
                    <p class="asset-small"><strong>Author:</strong> ${asset.author}</p>
                    <p class="asset-small"><strong>Credit:</strong> ${asset.credit}</p>
                </div>
                <a class="link-button" href="${asset.source}" target="_blank" rel="noreferrer noopener">View source</a>
            </div>
        `;
        assetGrid.appendChild(card);
    });
}

function init() {
    createCategoryButtons();
    renderAssets();
    searchInput.addEventListener('input', event => {
        searchTerm = event.target.value;
        renderAssets();
    });
}

document.addEventListener('DOMContentLoaded', init);
