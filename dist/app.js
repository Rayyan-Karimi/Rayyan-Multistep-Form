document.addEventListener("DOMContentLoaded", () => {

    const steps = document.querySelectorAll(".steps");
    const form1 = document.querySelector(".form-1");
    const stepperCircles = document.querySelectorAll(".stepper_circle");
    const desktopStepperCircles = document.querySelectorAll(".desktop_stepper_circle");
    let currentStep = 3;
    let isYearly = false;
    let selectedPlan = {};
    let selectedAddOns = [];


    form1.addEventListener("submit", e => {
        // e.preventDefault()
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();

        if (!name || !email || !phone) {
            return false;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const phonePattern = /^\+?[0-9]{1,4}[-\s]?[0-9]{1,15}$/;

        if (!emailPattern.test(email)) {
            return false;
        }

        if (!phonePattern.test(phone)) {
            return false;
        }

        currentStep++;
        updateSteps()

        return true;


    })



    document.body.addEventListener("click", (event) => {

        console.log('Yoou clicked.')
        if (event.target.classList.contains("custom-button")) {
            return;
        }
        // #1
        // event.stopPropagation()

        const toggleButton = event.target.closest('#toggle');

        if (toggleButton) {
            const circle = toggleButton.querySelector('#circle'); // Select the circle inside the toggle
            isYearly = !isYearly;
            circle.classList.toggle('translate-x-6');
            // Call a function to handle the plan display logic if needed
            updatePlanDisplay(isYearly);
            // Empty the cart
            selectedPlan = {}
            selectedAddOns = []
            document.querySelectorAll('.plan-type').forEach((plan) => {
                plan.classList.remove('border-blue-500')
                plan.classList.add('border-slate-100')
            })
            document.querySelectorAll('.add-on-type').forEach((addOnType) => {
                addOnType.querySelectorAll('.checkbox').forEach((checkbox) => {
                    checkbox.checked = false;
                    addOnType.classList.remove('bg-slate-100', 'border-blue-400');
                })
            })
            updateStep4()
            console.log("selectedAddOns", selectedAddOns, "selectedPlan", selectedPlan)
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

        const addOnType = event.target.closest(".add-on-type");

        if (addOnType) {
            const checkbox = addOnType.querySelector('.checkbox');
            checkbox.checked = !checkbox.checked;
            const addonName = addOnType.dataset.addon;
            const addonPrice = parseInt(addOnType.dataset.price, 10);

            // Update the selectedAddOns array
            if (checkbox.checked) {
                selectedAddOns.push({ name: addonName, price: addonPrice });
                addOnType.classList.add('bg-slate-100', 'border-blue-400');
            } else {
                selectedAddOns = selectedAddOns.filter(addon => addon.name !== addonName);
                addOnType.classList.remove('bg-slate-100', 'border-blue-400');
            }

        }

        // console.log("event target", event.target)
        // console.log("previously selected plan:", selectedPlan)
        const planType = event.target.closest('.plan-type')
        // console.log("current targeted plan", planType)

        // console.log(selectedPlan.price, ", ", planType.dataset.price)
        if (planType && (selectedPlan.price != planType.dataset.price)) {
            console.log('in')
            selectedPlan = {
                name: planType.dataset.plan,
                price: parseInt(planType.dataset.price, 10),
                duration: planType.dataset.duration
            }

            document.querySelectorAll('.plan-type').forEach((plan) => {
                plan.classList.remove('border-blue-500')
                plan.classList.add('border-slate-100')
            })
            planType.classList.add('border-blue-500')
            planType.classList.remove('border-slate-100')
        } else if (planType && (selectedPlan.price == planType.dataset.price)) {
            // console.log("Same plan selected")
            console.log('in for reclick')
            selectedPlan = {}
            planType.classList.remove('border-blue-500')
            planType.classList.add('border-slate-100')
        }
        console.log("selected plan:", selectedPlan)


        const nextButton = event.target.closest(".next");
        const prevButton = event.target.closest(".prev");
        if (nextButton) {
            // console.log("Anitya");
            // const a=document.querySelector("#name").value;
            // console.log(a);
            if (currentStep < steps.length - 1) {
                currentStep++;
                updateSteps();
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
            updateSteps();
        }
    });

    function updateSteps() {
        console.log(currentStep)
        steps.forEach((step, index) => {
            step.classList.toggle("hidden", index !== currentStep);
        });

        // If Step-4 is active, update its content
        if (currentStep === 3) { // Assuming Step-4 is the fourth page (index 3)
            updateStep4();
        }

        // Update stepper for mobile and desktop
        stepperCircles.forEach((circle, index) => {
            // console.log("stepper circle index", index)
            circle.classList.toggle("text-white", index !== currentStep)
            circle.classList.toggle("border-2", index !== currentStep)
            circle.classList.toggle("bg-blue-300", index === currentStep)
            circle.classList.toggle("bg-transparent", index !== currentStep)
        });

        desktopStepperCircles.forEach((circle, index) => {
            // console.log("desktop stepper circle index", index)
            circle.classList.toggle("text-white", index !== currentStep)
            circle.classList.toggle("border-2", index !== currentStep)
            circle.classList.toggle("bg-blue-300", index === currentStep)
            circle.classList.toggle("bg-transparent", index !== currentStep)
        });
    }

    function updateStep4() {

        const confirmationInfoDiv = document.querySelector("#step-4 .info");
        const planDetailsDiv = document.querySelector("#step-4 .plan-details");
        const totalsDiv = document.querySelector("#step-4 .total");

        let addOnsHtml = ``;
        let totalAddOnsPrice = 0;
        console.log("selectedAddOns", selectedAddOns, "selectedPlan", selectedPlan)

        if (selectedAddOns.length === 0 && Object.keys(selectedPlan).length === 0) {
            // confirmationInfoDiv.innerHTML = "";
            emptyCart()
            planDetailsDiv.innerHTML = "";
            totalsDiv.innerHTML = "";
        }

        selectedAddOns.forEach(addon => {
            const price = addon.price;
            const duration = isYearly ? "/yr" : "/mo";
            addOnsHtml += `
                <div class="flex justify-between">
                    <div class="detail">${addon.name}</div>
                    <div class="detail">+$${price}${duration}</div>
                </div>
            `;
            totalAddOnsPrice += price;
        });

        if (Object.keys(selectedPlan).length !== 0) {
            const planPrice = selectedPlan.price;
            const totalPrice = planPrice + totalAddOnsPrice;
            const planDuration = isYearly ? "/yr" : "/mo";

            // Update plan details
            if (planDetailsDiv) {
                planDetailsDiv.innerHTML = `
                <div>
                    <div class="detail font-semibold">${selectedPlan.name} (${isYearly ? "Yearly" : "Monthly"})</div>
                    <a href="#" id="change" class="underline border-none">Change</a>
                </div>
                <div class="font-semibold">$${planPrice}${planDuration}</div>
            `;
            }
            // Update add-ons details
            if (confirmationInfoDiv) {
                confirmationInfoDiv.innerHTML = `
                <div class="plan-details justify-between items-center flex">
                    ${planDetailsDiv.innerHTML}
                </div>
                <hr>
                ${addOnsHtml}
            `;
            }
            // Update total
            if (totalsDiv) {
                totalsDiv.innerHTML = `
                <p>Total (per ${isYearly ? "year" : "month"})</p>
                <p class="font-bold text-blue-700">$${totalPrice}${planDuration}</p>
            `;
            }
            document.querySelector("#step-4 .next").disabled = false;
            document.querySelector("#step-4 .next").classList.toggle('bg-blue-500');
            document.querySelector("#step-4 .next").classList.toggle('bg-gray-500');
        } else {
            emptyCart()
        }

        function emptyCart() {
            planDetailsDiv.innerHTML = `
                <div>
                    <div class="detail font-semibold">No plans selected</div>
                    <a href="#" id="change" class="underline border-none">Change</a>
                </div>
                <div class="font-semibold">Please select plans you may like.</div>
            `;
            document.querySelector("#step-4 .next").disabled = true;
            document.querySelector("#step-4 .next").classList.toggle('bg-blue-500');
            document.querySelector("#step-4 .next").classList.toggle('bg-gray-500');
        }

    }

    // Initial stepper and page setup
    updateSteps();

});



