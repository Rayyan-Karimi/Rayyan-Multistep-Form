document.addEventListener("DOMContentLoaded", () => {

    const steps = document.querySelectorAll(".steps");
    const form1 = document.querySelector(".form-1");
    const stepperCircles = document.querySelectorAll(".stepper_circle");
    const desktopStepperCircles = document.querySelectorAll(".desktop_stepper_circle");
    let currentStep = 0
    let isYearly = false
    let selectedPlan = {}
    let selectedAddOns = []

    form1.addEventListener("submit", (e) => {
        console.log("clicked submit button");
        e.preventDefault();

        const name = document.querySelector("#name");
        const email = document.querySelector("#email");
        const phone = document.querySelector("#phone");

        let isValid = true;

        // Validate Name
        if (!name.value.trim()) {
            isValid = false;
            name.classList.add('border-red-500', 'border');
            document.querySelector('#name-error').classList.remove('hidden');
        } else {
            name.classList.remove('border-red-500', 'border');
            document.querySelector('#name-error').classList.add('hidden');
        }

        // Validate Email (required field)
        if (!email.value.trim()) {
            isValid = false;
            email.classList.add('border-red-500', 'border');
            document.querySelector('#email-error').classList.remove('hidden');
        } else {
            email.classList.remove('border-red-500', 'border');
            document.querySelector('#email-error').classList.add('hidden');
            // Validate Email format
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailPattern.test(email.value)) {
                isValid = false;
                email.classList.add('border-red-500', 'border');
                document.querySelector('#email-invalid').classList.remove('hidden');
            } else {
                email.classList.remove('border-red-500', 'border');
                document.querySelector('#email-invalid').classList.add('hidden');
            }
        }

        // Validate Phone (required field)
        if (!phone.value.trim()) {
            isValid = false;
            phone.classList.add('border-red-500', 'border');
            document.querySelector('#phone-error').classList.remove('hidden');
        } else {
            phone.classList.remove('border-red-500', 'border');
            document.querySelector('#phone-error').classList.add('hidden');
            // Validate Phone format
            const phonePattern = /^\+?[0-9]{1,4}[-\s]?[0-9]{1,15}$/;
            if (!phonePattern.test(phone.value)) {
                isValid = false;
                phone.classList.add('border-red-500', 'border');
                document.querySelector('#phone-invalid').classList.remove('hidden');
            } else {
                phone.classList.remove('border-red-500', 'border');
                document.querySelector('#phone-invalid').classList.add('hidden');
            }
        }

        console.log("Form submitted, updating steps...", currentStep);

        if (isValid) {
            currentStep++;
            updateSteps();
        }

        console.log("Form submitted, moving to next step...", currentStep);
        return false;
    })

    document.body.addEventListener("click", (event) => {
        console.log('You have clicked.')

        if (event.target.classList.contains("custom-button")) {
            return;
        } // @FIXME: This is to remove event delegation on first page.

        const toggleButton = event.target.closest('#toggle');
        if (toggleButton) {
            toggle()
        }
        function toggle() {
            const circle = document.querySelector('#circle');
            isYearly = !isYearly;
            circle.classList.toggle('translate-x-6');
            emptyPlan()
            emptyAddons()
            updatePlanDisplay(isYearly);
        }

        function emptyPlan() {
            selectedPlan = {}
            document.querySelectorAll('.plan-type').forEach((plan) => {
                plan.classList.remove('border-blue-500')
                plan.classList.add('border-slate-100')
            })
        }

        function emptyAddons() {
            selectedAddOns = [];
            const addons = document.querySelectorAll('.add-on-type')
            addons.forEach(addon => {
                const checkbox = addon.querySelector('.checkbox')
                // if (addon.checked) {
                checkbox.checked = false
                addon.classList.add('border-slate-100')
                addon.classList.remove('bg-slate-100', 'border-blue-400')// @FIXME: This is a hack to remove the border.
                // }
            })
        }

        function updatePlanDisplay(isAnnual) {
            document.querySelector('#annual').classList.toggle('font-semibold', isAnnual);
            document.querySelector('#monthly').classList.toggle('font-semibold', !isAnnual);

            document.querySelectorAll(".monthly-plan-type").forEach(plan => {
                plan.classList.toggle("hidden", isAnnual);
            });
            document.querySelectorAll(".yearly-plan-type").forEach(plan => {
                plan.classList.toggle("hidden", !isAnnual);
            });
            document.querySelectorAll(".monthly-extras").forEach(extra => {
                extra.classList.toggle("hidden", isAnnual);
            });
            document.querySelectorAll(".yearly-extras").forEach(extra => {
                extra.classList.toggle("hidden", !isAnnual);
            });
        }

        const planType = event.target.closest('.plan-type')
        if (planType && (selectedPlan.price != planType.dataset.price)) {
            // Changing plan
            document.querySelectorAll('.plan-type').forEach((plan) => {
                plan.classList.remove('border-blue-500')
                plan.classList.add('border-slate-100')
            })
            selectedPlan = {
                name: planType.dataset.plan,
                price: parseInt(planType.dataset.price, 10),
                duration: planType.dataset.duration
            }
            planType.classList.add('border-blue-500')
            planType.classList.remove('border-slate-100')
            emptyAddons()
        } else if (planType && (selectedPlan.price == planType.dataset.price)) {
            // Deselecting plan
            selectedPlan = {}
            planType.classList.remove('border-blue-500')
            planType.classList.add('border-slate-100')
            emptyAddons()
        }
        // console.log("selected plan", selectedPlan)
        // console.log("selectedAddOns", selectedAddOns)
        if (currentStep === 1 && Object.keys(selectedPlan).length === 0) {
            const nextBtn = document.querySelector("#step-2 .next")
            nextBtn.disabled = true;
        } else if (currentStep === 1 && Object.keys(selectedPlan).length > 0) {
            const nextBtn = document.querySelector("#step-2 .next")
            nextBtn.disabled = false;
        }

        const addonType = event.target.closest(".add-on-type");

        if (addonType) {
            const checkbox = addonType.querySelector('.checkbox');
            checkbox.checked = !checkbox.checked;
            const addonName = addonType.dataset.addon; // @FIXME: find addons logic
            const addonPrice = parseInt(addonType.dataset.price, 10);
            const addonDuration = addonType.dataset.duration;

            // Update the selectedAddOns array
            if (checkbox.checked) {
                selectedAddOns.push({ name: addonName, price: addonPrice, duration: addonDuration });
                addonType.classList.remove('border-slate-100')
                addonType.classList.add('bg-slate-100', 'border-blue-400');
            } else {
                selectedAddOns = selectedAddOns.filter(addon => addon.name !== addonName);
                addonType.classList.add('border-slate-100')
                addonType.classList.remove('bg-slate-100', 'border-blue-400');
            }
        }


        const nextButton = event.target.closest(".next");
        const prevButton = event.target.closest(".prev");
        if (nextButton) {
            if (currentStep < steps.length - 1) {
                console.log('next button clicked, earlier it was:', currentStep)
                currentStep++;
                updateSteps();
                console.log('incremented on click', currentStep)
            }
            console.log("current step:", currentStep, "is yearly:", isYearly)
        } else if (prevButton) {
            if (currentStep > 0) {
                currentStep--;
                updateSteps();
            }
        }
        const change = event.target.closest("#change");
        if (change) {
            currentStep = 1;
            toggle()
            toggle()
            updateSteps();
        }
    });

    function updateSteps() {
        steps.forEach((step, index) => {
            step.classList.toggle("hidden", index !== currentStep);
        });

        if (currentStep === 3) {
            console.log("page is now on 4")
            updateStep4()
        }

        // Update stepper for mobile and desktop
        stepperCircles.forEach((circle, index) => {
            circle.classList.toggle("text-white", index !== currentStep)
            circle.classList.toggle("border-2", index !== currentStep)
            circle.classList.toggle("bg-blue-300", index === currentStep)
            circle.classList.toggle("bg-transparent", index !== currentStep)
        });

        desktopStepperCircles.forEach((circle, index) => {
            circle.classList.toggle("text-white", index !== currentStep)
            circle.classList.toggle("border-2", index !== currentStep)
            circle.classList.toggle("bg-blue-300", index === currentStep)
            circle.classList.toggle("bg-transparent", index !== currentStep)
        });
    }
    function updateStep4() {
        console.log("Selected plan", selectedPlan, "Selected add on-s", selectedAddOns)
        const planDetails = document.querySelector('.plan-details')
        const addonsContainer = document.querySelector('.addons-container')
        let totalPrice = 0
        if (selectedPlan) {
            planDetails.innerHTML = `
        <div>
            <div class="font-semibold">${selectedPlan.name} (${isYearly ? "Yearly" : "Monthly"})</div>
            <a href="#" id="change" class="underline border-none">Change</a>
        </div>
        <div class="font-semibold">$${selectedPlan.price}/${selectedPlan.duration}</div>
        `
            totalPrice += selectedPlan.price;
        }

        addonsContainer.innerHTML = ``
        let selectedAddonsHtml = '';
        if (selectedAddOns.length > 0) {
            planDetails.insertAdjacentHTML("beforeend", `<hr>`)
            selectedAddOns.forEach((addon) => {
                let currentAddonName = addon.name, currentAddonPrice = addon.price, currentAddonDuration = addon.duration;
                selectedAddonsHtml += `
                <div class = "flex justify-between">
                    <div>${currentAddonName}</div>
                    <div>$${currentAddonPrice}/${currentAddonDuration}</div>
                </div>
                `
                console.log(selectedAddonsHtml)
                totalPrice += currentAddonPrice
            })
            addonsContainer.innerHTML = selectedAddonsHtml
            console.log(addonsContainer)
        }

        const totalsDiv = document.querySelector('.total')
        totalsDiv.innerHTML = `
            <p>Total (per ${isYearly ? "year" : "month"})</p>
            <p class="font-bold text-blue-700">$${totalPrice}/${selectedPlan.duration}</p>
        `;



    }

    updateSteps();
});



