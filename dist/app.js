document.addEventListener("DOMContentLoaded", () => {
    const pages = document.querySelectorAll(".pages");
    const stepperCircles = document.querySelectorAll(".stepper__item_circle");
    const desktopSteps = document.querySelectorAll(".side_stepper_item");
    let currentStep = 0;

    // Function to update visibility of pages
    function updatePages() {
        pages.forEach((page, index) => {
            if (index === currentStep) {
                page.classList.remove("hidden");
            } else {
                page.classList.add("hidden");
            }
        });

        // Update stepper for mobile
        stepperCircles.forEach((item, index) => {
            if (index === currentStep) {
                item.classList.add("bg-blue-200", "text-black", "border-blue-200");
                item.classList.remove("bg-transparent");
            } else {
                item.classList.remove("bg-blue-200", "text-black", "border-blue-200");
                item.classList.add("bg-transparent");
            }
        });

        // Update stepper for desktop
        desktopSteps.forEach((item, index) => {
            const circle = item.querySelector(".stepper__item_circle");
            if (index === currentStep) {
                circle.classList.add("bg-blue-200", "text-black", "border-blue-200");
                circle.classList.remove("bg-transparent");
            } else {
                circle.classList.remove("bg-blue-200", "text-black", "border-blue-200");
                circle.classList.add("bg-transparent");
            }
        });
    }

    // Handle navigation clicks
    document.body.addEventListener("click", (event) => {
        const nextButton = event.target.closest(".next");
        const prevButton = event.target.closest(".prev");

        if (nextButton) {
            if (currentStep < pages.length - 1) {
                currentStep++;
                updatePages();
            }
        } else if (prevButton) {
            if (currentStep > 0) {
                currentStep--;
                updatePages();
            }
        }
    });

    // Initial setup
    updatePages();
});
