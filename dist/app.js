// // script.js
// const steps = document.querySelectorAll(".step");
// const stepsActive = document.querySelectorAll(".step.active");
// const details = document.querySelectorAll(".step-detail")
// const prevButton = document.getElementById("prev");
// const nextButton = document.getElementById("next");

// let currentStep = 0;

// /**
//  * Main functions
//  */
// prevButton.addEventListener("click", () => {
//     if (currentStep > 0) {
//         currentStep--;
//         updateStepper();
//     }
// });

// nextButton.addEventListener("click", () => {
//     if (currentStep < steps.length - 1) {
//         currentStep++;
//         updateStepper();
//     }
// });

// function updateStepper() {
//     updateSteps();
//     updateStepDetails();
//     updateButtons();
// }

// updateStepper();


// /**
//  * Helper functions
//  */
// function updateSteps() {
//     steps.forEach((step, index) => {
//         step.classList.toggle("active", index === currentStep);
//         if(step.classList.contains('active')) {
//             step.style.background = '#98c8fc';
//             step.style.color = '#fff';
//             step.style.borderColor = '#98c8fc';
//         } else {
//             // Reset styles for non-active steps (optional)
//             step.style.background = '';
//             step.style.color = '';
//             step.style.borderColor = '';
//         }
//     });
// }



// function updateStepDetails() {
//     details.forEach((detail, index) => {
//         if(detail.classList.contains('active')) {
//             detail.style.background = '#98c8fc';
//             detail.style.color = '#fff';
//             detail.style.borderColor = '#98c8fc';
//         } else {
//             // Reset styles for non-active steps (optional)
//             detail.style.background = '';
//             detail.style.color = '';
//             detail.style.borderColor = '';
//         }
//     })
// }

// function updateButtons() {
//     prevButton.disabled = currentStep === 0;
//     nextButton.disabled = currentStep === steps.length - 1;
//     if (currentStep >= steps.length - 2) {
//         nextButton.innerHTML = "Finish";
//     } else {
//         nextButton.innerHTML = "Next";
//     }
// }