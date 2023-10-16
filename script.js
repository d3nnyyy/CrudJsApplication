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

const createButton = document.getElementById("create-button");
const createForm = document.getElementById("create-form");
const editButtons = document.querySelectorAll(".edit-shoe");

createButton.addEventListener("click", () => {
        createForm.style.display = "block";
});

editButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
                // Assuming you have a function to populate the edit form with shoe data
                // Here, I'm using the index attribute to identify the shoe being edited
                populateEditForm(filteredShoes[index], index);
        });
});

function populateEditForm(shoe, index) {
        const editForm = document.getElementById("create-form");
        // Populate the edit form fields with shoe data
        // Example: document.getElementById("new-shoe-name").value = shoe.name;

        // Show the edit form
        editForm.style.display = "block";

        // Add an event listener to save the edited data
        document.getElementById("save-shoe").addEventListener("click", () => {
                // Update the shoe data in the filteredShoes array
                filteredShoes[index] = {
                        name: document.getElementById("new-shoe-name").value,
                        price: parseFloat(document.getElementById("new-shoe-price").value),
                        size: parseFloat(document.getElementById("new-shoe-size").value),
                        color: document.getElementById("new-shoe-color").value,
                };

                // Re-render the shoes list
                renderShoesList(filteredShoes);

                // Hide the edit form
                editForm.style.display = "none";
        });
}

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

editButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
                // Populate the edit form with the selected shoe's data
                populateEditForm(filteredShoes[index], index);
        });
});

const validationModal = document.getElementById("validation-modal");
const validationMessage = document.getElementById("validation-message");
const validationModalClose = document.getElementById("validation-modal-close");

// Function to open the validation modal with a message
function openValidationModal(message) {
        validationMessage.textContent = message;
        validationModal.style.display = "block";
}

// Close the validation modal when the close button is clicked
validationModalClose.addEventListener("click", () => {
        validationModal.style.display = "none";
});

// Update the "Save" button event listener to use the validation modal
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

        // If validation passes, add the new shoe and close the create form
        const newShoe = {
                name: nameInput.value,
                price,
                size,
                color: colorInput.value,
        };

        // Add the new shoe to the filteredShoes array
        filteredShoes.push(newShoe);

        // Re-render the shoes list
        renderShoesList(filteredShoes);

        // Reset and hide the create form
        resetCreateForm();
});
