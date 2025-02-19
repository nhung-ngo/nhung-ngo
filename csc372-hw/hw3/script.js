document.addEventListener("DOMContentLoaded", function () {
    const restaurants = document.querySelectorAll(".restaurant-container");

    restaurants.forEach(restaurant => {
        const images = restaurant.querySelectorAll(".menu-container img");
        const dishDetails = restaurant.querySelector(".dish-details");
        const dishName = dishDetails.querySelector(".dish-name");
        const dishDescription = dishDetails.querySelector(".dish-description");
        const dishPrice = dishDetails.querySelector(".dish-price");

        images.forEach(image => {
            image.addEventListener("click", function () {
                
                images.forEach(img => {
                    img.classList.remove("selected");
                    img.style.width = "120px";  
                    img.style.height = "120px";
                });

                
                this.classList.add("selected");
                this.style.width = "150px";  
                this.style.height = "150px";

                
                dishName.textContent = this.getAttribute("data-name");
                dishDescription.textContent = this.getAttribute("data-description");
                dishPrice.innerHTML = ` ${this.getAttribute("data-price")}`;

                
                dishDetails.classList.remove("hidden");
            });
        });
    });
});
