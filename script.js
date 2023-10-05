
const shoesData = [
        { name: "Nike Air Max", price: 120, size: 10, color: "Red" },
        { name: "Adidas Ultraboost", price: 150, size: 9, color: "Black" },
        { name: "Vans Old Skool", price: 60, size: 8, color: "White" },
        { name: "Converse Chuck Taylor", price: 80, size: 11, color: "Blue" },
        { name: "New Balance 574", price: 100, size: 10, color: "Green" },
        { name: "Puma Suede", price: 70, size: 9, color: "Black" }
];

function renderShoesList(shoes) {
        const shoesList = document.getElementById("shoes-list");
        shoesList.innerHTML = "";

        shoes.forEach((shoe) => {
                const shoeItem = document.createElement("div");
                shoeItem.classList.add("shoe-item");
                shoeItem.innerHTML = `
                <h2>${shoe.name}</h2>
                <p>Price: $${shoe.price}</p>
                <p>Size: ${shoe.size}</p>
                <p>Color: ${shoe.color}</p>
            `;
                shoesList.appendChild(shoeItem);
        });
}

function filterShoesByName(searchText) {
        return shoesData.filter((shoe) =>
                shoe.name.toLowerCase().includes(searchText.toLowerCase())
        );
}

renderShoesList(shoesData);

document.getElementById("search-button").addEventListener("click", () => {
        const searchInput = document.getElementById("search-input");
        const searchText = searchInput.value.trim();
        const filteredShoes = filterShoesByName(searchText);
        renderShoesList(filteredShoes);
});

document.getElementById("clear-button").addEventListener("click", () => {
        const searchInput = document.getElementById("search-input");
        searchInput.value = "";
        renderShoesList(shoesData);
});
