let totalPrice = 0;
const mealList = document.getElementById("meal-list");
const totalPriceElement = document.getElementById("total-price");

function addToMealPlan(name, price) {
    // Create a new meal list item
    const listItem = document.createElement("li");
    listItem.textContent = `${name} - $${price.toFixed(2)}`;
    
    // Add remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = function () {
        mealList.removeChild(listItem);
        totalPrice -= price;
        updateTotal();
    };

    listItem.appendChild(removeButton);
    mealList.appendChild(listItem);

    // Update total price
    totalPrice += price;
    updateTotal();
}

function updateTotal() {
    totalPriceElement.textContent = totalPrice.toFixed(2);
}
