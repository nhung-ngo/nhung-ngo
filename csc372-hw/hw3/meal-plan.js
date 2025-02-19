document.addEventListener("DOMContentLoaded", function () {
    const dishList = document.querySelectorAll("#dish-list li button");
    const mealList = document.getElementById("meal-list");
    const totalPriceElement = document.getElementById("total-price");

    let totalPrice = 0;
    let mealPlan = {}; 

   
    function addToMealPlan(dishName, price) {
        
        if (mealPlan[dishName]) {
            mealPlan[dishName].quantity++;
        } else {
            mealPlan[dishName] = { price: price, quantity: 1 };
        }

        totalPrice += price;

        updateMealPlanUI();
    }

    function removeFromMealPlan(dishName) {
        if (mealPlan[dishName]) {
            totalPrice -= mealPlan[dishName].price; 
            mealPlan[dishName].quantity--;

            if (mealPlan[dishName].quantity === 0) {
                delete mealPlan[dishName]; 
            }

            updateMealPlanUI();
        }
    }

    
    function updateMealPlanUI() {
        mealList.innerHTML = "";

        for (const dish in mealPlan) {
            const listItem = document.createElement("li");

            
            const dishText = document.createTextNode(
                dish + " - $" + mealPlan[dish].price.toFixed(2) + " (x" + mealPlan[dish].quantity + ") "
            );

            
            const removeButton = document.createElement("button");
            removeButton.className = "remove-btn";
            removeButton.setAttribute("data-name", dish);
            removeButton.textContent = "Remove";

            
            removeButton.addEventListener("click", function () {
                removeFromMealPlan(dish);
            });

            
            listItem.appendChild(dishText);
            listItem.appendChild(removeButton);

            
            mealList.appendChild(listItem);
        }

       
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    
    dishList.forEach(button => {
        button.addEventListener("click", function () {
            const parentLi = this.parentElement;
            const dishName = parentLi.getAttribute("data-name");
            const dishPrice = parseFloat(parentLi.getAttribute("data-price"));
            addToMealPlan(dishName, dishPrice);
        });
    });
});
