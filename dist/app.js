document.addEventListener("DOMContentLoaded", () => {

    /**
     * Stepper functionality
     */
    const pages = document.querySelectorAll(".pages");
    const stepperCircles = document.querySelectorAll(".stepper__item_circle");
    const desktopSteps = document.querySelectorAll(".side_stepper_item");
    let currentStep = 2;

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

    // Handle clicks
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

        const change = event.target.closest("#change");
        if (change) {
            currentStep = 1;
            updatePages();
        }
    });

    // Initial stepper and page setup
    updatePages();

});

// Add event listener to the parent container (event delegation)
const addOnTypes = document.querySelector('.add-on-types');

addOnTypes.addEventListener('click', (event) => {
    // Check if the clicked element is an add-on type div
    const clickedDiv = event.target.closest('.add-on-type');
    
    if (clickedDiv) {
        const checkbox = clickedDiv.querySelector('.checkbox'); // Get the checkbox within the clicked div
        
        // Toggle the checkbox state and the background color
        checkbox.checked = !checkbox.checked;
        
        // Toggle background color
        if (checkbox.checked) {
            clickedDiv.classList.add('bg-slate-100');  // Light background color
            clickedDiv.classList.add('border-blue-400');  // Light background color
        } else {
            clickedDiv.classList.remove('bg-slate-100');  // Remove background color
            clickedDiv.classList.remove('border-blue-400');  // Remove background color
        }
    }
});
