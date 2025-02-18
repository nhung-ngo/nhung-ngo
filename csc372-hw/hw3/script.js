document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll("#menu img");
    const dishDetails = document.getElementById("dish-details");
    const dishName = document.getElementById("dish-name");
    const dishDescription = document.getElementById("dish-description");
    const dishPrice = document.getElementById("dish-price");

    images.forEach(image => {
        image.addEventListener("click", function () {
        
            images.forEach(img => {
                img.classList.remove("selected");
                img.style.width = "100px";  
                img.style.height = "100px";
            });

            
            this.classList.add("selected");
            this.style.width = "150px";  
            this.style.height = "150px";

            
            dishName.textContent = this.getAttribute("data-name");
            dishDescription.textContent = this.getAttribute("data-description");
            dishPrice.textContent = "Price: " + this.getAttribute("data-price");

            
            dishDetails.classList.add("visible");
        });
    });
});
