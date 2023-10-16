const shoesData = [
        { name: "Nike Air Max", price: 120, size: 10, color: "Red" },
        { name: "Adidas Ultraboost", price: 150, size: 9, color: "Black" },
        { name: "Vans Old Skool", price: 60, size: 8, color: "White" },
        { name: "Converse Chuck Taylor", price: 80, size: 11, color: "Blue" },
        { name: "New Balance 574", price: 100, size: 10, color: "Green" },
        { name: "Puma Suede", price: 70, size: 9, color: "Black" }
];

let filteredShoes = shoesData;

function renderShoesList(shoes) {
        const shoesList = document.getElementById("shoes-list");
        shoesList.innerHTML = "";

        shoes.forEach((shoe, index) => {
                const shoeItem = document.createElement("div");
                shoeItem.classList.add("shoe-item");
                shoeItem.innerHTML = `
                <h2>${shoe.name}</h2>
                <p>Price: $${shoe.price}</p>
                <p>Size: ${shoe.size}</p>
                <p>Color: ${shoe.color}</p>
                <button class="edit-shoe" data-index="${index}">Edit</button>
            `;

                shoeItem.querySelector(".edit-shoe").addEventListener("click", () => {
                        populateEditForm(filteredShoes[index], index);
                });

                shoesList.appendChild(shoeItem);
        });
}


function filterShoesByName(searchText) {
        filteredShoes = shoesData.filter((shoe) =>
                shoe.name.toLowerCase().includes(searchText.toLowerCase())
        );
        renderShoesList(filteredShoes);
}

function calculateTotalPrice(shoes) {
        return shoes.reduce((total, shoe) => total + shoe.price, 0);
}

renderShoesList(shoesData);

document.getElementById("search-button").addEventListener("click", () => {
        const searchInput = document.getElementById("search-input");
        const searchText = searchInput.value.trim();
        filterShoesByName(searchText);
});

document.getElementById("clear-button").addEventListener("click", () => {
        const searchInput = document.getElementById("search-input");
        searchInput.value = "";
        filteredShoes = shoesData;
        renderShoesList(filteredShoes);
});

document.getElementById("sort-checkbox").addEventListener("change", () => {
        const sortCheckbox = document.getElementById("sort-checkbox");
        const sortedShoes = sortCheckbox.checked
                ? [...filteredShoes].sort((a, b) => a.price - b.price)
                : filteredShoes;
        renderShoesList(sortedShoes);
});

document.getElementById("count-button").addEventListener("click", () => {
        const totalPrice = calculateTotalPrice(filteredShoes);
        const totalPriceValue = document.getElementById("total-price-value");
        totalPriceValue.textContent = totalPrice + " $";
});

// CREATE

const createButton = document.getElementById("create-button");
const createForm = document.getElementById("create-form");

createButton.addEventListener("click", () => {
        createForm.style.display = "block";
});

function resetCreateForm() {
        document.getElementById("new-shoe-name").value = "";
        document.getElementById("new-shoe-price").value = "";
        document.getElementById("new-shoe-size").value = "";
        document.getElementById("new-shoe-color").value = "";
        document.getElementById("create-form").style.display = "none";
}

createButton.addEventListener("click", () => {
        resetCreateForm();
        createForm.style.display = "block";
});

document.getElementById("save-shoe").addEventListener("click", () => {
        const nameInput = document.getElementById("new-shoe-name");
        const priceInput = document.getElementById("new-shoe-price");
        const sizeInput = document.getElementById("new-shoe-size");
        const colorInput = document.getElementById("new-shoe-color");

        if (!nameInput.value || !priceInput.value || !sizeInput.value || !colorInput.value) {
                openValidationModal("All fields are required.");
                return;
        }

        const price = parseFloat(priceInput.value);
        const size = parseFloat(sizeInput.value);

        if (isNaN(price) || price <= 0 || isNaN(size) || size <= 0) {
                openValidationModal("Price and size must be valid numbers greater than 0.");
                return;
        }

        const newShoe = {
                name: nameInput.value,
                price,
                size,
                color: colorInput.value,
        };

        filteredShoes.push(newShoe);

        renderShoesList(filteredShoes);

        resetCreateForm();
});

document.getElementById("cancel-shoe").addEventListener("click", () => {
        resetCreateForm();
});

// EDIT

const editButtons = document.querySelectorAll(".edit-shoe");

editButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
                populateEditForm(filteredShoes[index], index);
        });
});

document.getElementById("cancel-edited-shoe").addEventListener("click", () => {
        resetEditForm();
});

function populateEditForm(shoe, index) {
        const editForm = document.getElementById("edit-form");

        document.getElementById("edit-shoe-name").value = shoe.name;
        document.getElementById("edit-shoe-price").value = shoe.price;
        document.getElementById("edit-shoe-size").value = shoe.size;
        document.getElementById("edit-shoe-color").value = shoe.color;

        editForm.style.display = "block";

        document.getElementById("save-edited-shoe").addEventListener("click", () => {
                const nameInput = document.getElementById("edit-shoe-name");
                const priceInput = document.getElementById("edit-shoe-price");
                const sizeInput = document.getElementById("edit-shoe-size");
                const colorInput = document.getElementById("edit-shoe-color");

                if (!nameInput.value || !priceInput.value || !sizeInput.value || !colorInput.value) {
                        openValidationModal("All fields are required.");
                        return;
                }

                const price = parseFloat(priceInput.value);
                const size = parseFloat(sizeInput.value);

                if (isNaN(price) || price <= 0 || isNaN(size) || size <= 0) {
                        openValidationModal("Price and size must be valid numbers greater than 0.");
                        return;
                }

                const editedShoe = {
                        name: nameInput.value,
                        price,
                        size,
                        color: colorInput.value,
                };

                filteredShoes[index] = editedShoe;

                renderShoesList(filteredShoes);

                resetEditForm();
        });
}

function resetEditForm() {
        document.getElementById("edit-shoe-name").value = "";
        document.getElementById("edit-shoe-price").value = "";
        document.getElementById("edit-shoe-size").value = "";
        document.getElementById("edit-shoe-color").value = "";
        document.getElementById("edit-form").style.display = "none";
}

// MODAL VALIDATION

const validationModal = document.getElementById("validation-modal");
const validationMessage = document.getElementById("validation-message");
const validationModalClose = document.getElementById("validation-modal-close");

function openValidationModal(message) {
        validationMessage.textContent = message;
        validationModal.style.display = "block";
}

validationModalClose.addEventListener("click", () => {
        validationModal.style.display = "none";
});
