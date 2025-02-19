document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".category-title").forEach(button => {
        button.addEventListener("click", function () {
            const yearList = this.nextElementSibling;
            const isOpen = this.getAttribute("aria-expanded") === "true";
            
            this.setAttribute("aria-expanded", !isOpen);
            yearList.style.display = isOpen ? "none" : "block";
        });
    });
});
