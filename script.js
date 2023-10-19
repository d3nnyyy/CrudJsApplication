const apiURL = 'http://localhost:8080/api/shoes';
let filteredShoes = [];

function renderShoesList(shoes) {
        const shoesList = document.getElementById("shoes-list");
        shoesList.innerHTML = "";

        shoes.forEach((shoe) => {

                const shoeItem = document.createElement("div");
                shoeItem.classList.add("shoe-item");
                shoeItem.dataset.shoeId = shoe.id;

                shoeItem.innerHTML = `
                        <h2>${shoe.name}</h2>
                        <p>Price: $${shoe.price}</p>
                        <p>Size: ${shoe.size}</p>
                        <p>Color: ${shoe.color}</p>
                        <button class="edit-shoe" data-shoe-id="${shoe.id}">Edit</button>
                        `;

                shoeItem.querySelector(".edit-shoe").addEventListener("click", () => {
                        const shoeId = shoeItem.dataset.shoeId;
                        populateEditForm(shoeId);
                });

                shoesList.appendChild(shoeItem);
        });
}

function fetchShoes() {
        axios.get(apiURL)
                .then((response) => {
                        filteredShoes = response.data;
                        renderShoesList(filteredShoes);
                })
                .catch((error) => {
                        console.error('Error fetching shoes:', error);
                });
}

function createShoe(newShoe) {
        axios.post(apiURL, newShoe)
                .then((response) => {
                        // Handle success
                        console.log('Shoe created:', response.data);
                        fetchShoes(); // Refresh the shoe list
                })
                .catch((error) => {
                        // Handle error
                        console.error('Error creating shoe:', error);
                });
}

function updateShoe(index, editedShoe) {
        console.log(index, editedShoe)
        const shoeId = filteredShoes[index - 1].id;
        axios.put(`${apiURL}/${shoeId}`, editedShoe)
                .then((response) => {
                        // Handle success
                        console.log('Shoe updated:', response.data);
                        fetchShoes(); // Refresh the shoe list
                })
                .catch((error) => {
                        // Handle error
                        console.error('Error updating shoe:', error);
                });
}

function deleteShoe(index) {
        const shoeId = filteredShoes[index].id;
        axios.delete(`${apiURL}/${shoeId}`)
                .then(() => {
                        // Handle success
                        console.log('Shoe deleted');
                        fetchShoes(); // Refresh the shoe list
                })
                .catch((error) => {
                        // Handle error
                        console.error('Error deleting shoe:', error);
                });
}

function filterShoesByName(searchText) {
        filteredShoes = filteredShoes.filter((shoe) =>
                shoe.name.toLowerCase().includes(searchText.toLowerCase())
        );
        renderShoesList(filteredShoes);
}

function calculateTotalPrice(shoes) {
        return shoes.reduce((total, shoe) => total + shoe.price, 0);
}

document.getElementById("search-button").addEventListener("click", () => {
        const searchInput = document.getElementById("search-input");
        const searchText = searchInput.value.trim();
        filterShoesByName(searchText);
});

document.getElementById("clear-button").addEventListener("click", () => {
        const searchInput = document.getElementById("search-input");
        searchInput.value = "";
        fetchShoes();
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
        createForm.style.display = "none";
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

        createShoe(newShoe);
        resetCreateForm();
});

document.getElementById("cancel-shoe").addEventListener("click", () => {
        resetCreateForm();
});

// EDIT

document.getElementById("shoes-list").addEventListener("click", (event) => {
        if (event.target.classList.contains("edit-shoe")) {
                const shoeId = event.target.getAttribute("data-shoe-id");
                populateEditForm(shoeId);
                document.getElementById("save-edited-shoe").setAttribute("data-shoe-id", shoeId);
        }
});


document.getElementById("cancel-edited-shoe").addEventListener("click", () => {
        resetEditForm();
});

function populateEditForm(shoeId) {

        var intShoeId = parseInt(shoeId);

        const editForm = document.getElementById("edit-form");
        const shoe = filteredShoes.find((shoe) => shoe.id === intShoeId);
        console.log(shoe)

        document.getElementById("edit-shoe-name").value = shoe.name;
        document.getElementById("edit-shoe-price").value = shoe.price;
        document.getElementById("edit-shoe-size").value = shoe.size;
        document.getElementById("edit-shoe-color").value = shoe.color;

        editForm.style.display = "block"
};

document.getElementById("save-edited-shoe").addEventListener("click", () => {
        const nameInput = document.getElementById("edit-shoe-name");
        const priceInput = document.getElementById("edit-shoe-price");
        const sizeInput = document.getElementById("edit-shoe-size");
        const colorInput = document.getElementById("edit-shoe-color");

        const shoeId = document.getElementById("save-edited-shoe").getAttribute("data-shoe-id")
        console.log(shoeId)


        if (!nameInput.value || !priceInput.value || !sizeInput.value || !colorInput.value) {
                openValidationModal("All fields are required.");
                return;
        }

        const price = parseInt(priceInput.value);
        const size = parseInt(sizeInput.value);

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

        const intShoeId = parseInt(shoeId);
        updateShoe(intShoeId, editedShoe);

        resetEditForm();
});

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

// Initial fetch of shoes from the API
fetchShoes();
