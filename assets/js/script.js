let incomeBudgetModal = document.getElementById('income-budget-modal');
let incomeBudgetBackButton = document.getElementById('income-budget-back-button');
let incomeBudgetNextButton = document.getElementById('income-budget-next-button');
let spendsModal = document.getElementById('spends-modal');
let spendsBackButton = document.getElementById('spends-back-button');
let spendsNextButton = document.getElementById('spends-next-button');
let resultsModal = document.getElementById('results-modal');
let resultsBackButton = document.getElementById('results-back-button');

let payPeriodDropdown = document.getElementById('pay-period');

// Display income & budget modal
document.addEventListener('DOMContentLoaded', function () {
    let goButton = document.getElementById('go-button');

    goButton.addEventListener('click', function () {
        displayModal(incomeBudgetModal);
    });
})

// Close income & budget modal
incomeBudgetBackButton.addEventListener('click', function () {
    closeModal(incomeBudgetModal);
});

// Display spends modal
incomeBudgetNextButton.addEventListener('click', function () {
    displayModal(spendsModal);
})

// Close spends modal
spendsBackButton.addEventListener('click', function () {
    closeModal(spendsModal);
});

// Display results modal
spendsNextButton.addEventListener('click', function () {
    displayModal(resultsModal);
})

// Close results modal
resultsBackButton.addEventListener('click', function () {
    closeModal(resultsModal);
});

/**
 * Shows / displays the model passed as the parameter
 */
function displayModal(modalName) {
    modalName.showModal();
}

/**
 * Closes the model passed as the parameter
 */
function closeModal(modalName) {
    modalName.close();
}

// Listen for changes in the pay period dropdown
payPeriodDropdown.addEventListener('change', function () {
    let selectedPayPeriod = payPeriodDropdown.value;
    let incomeTitle = document.getElementById('income-title');
    let budgetTitle = document.getElementById('budget-title');
    let spendsTitle = document.getElementById('spends-title');
    let resultsTitle = document.getElementById('results-title');

    // Update the modal titles based on the selected pay period
    if (selectedPayPeriod === 'weekly') {
        incomeTitle.textContent = 'My Weekly Income';
        budgetTitle.textContent = 'My Weekly Budget';
        spendsTitle.textContent = 'My Weekly Spends';
        resultsTitle.textContent = 'My Weekly Results';
    } else if (selectedPayPeriod === 'fortnightly') {
        incomeTitle.textContent = 'My Fortnightly Income';
        budgetTitle.textContent = 'My Fortnightly Budget';
        spendsTitle.textContent = 'My Fortnightly Spends';
        resultsTitle.textContent = 'My Fortnightly Results';
    } else if (selectedPayPeriod === 'monthly') {
        incomeTitle.textContent = 'My Monthly Income';
        budgetTitle.textContent = 'My Monthly Budget';
        spendsTitle.textContent = 'My Monthly Spends';
        resultsTitle.textContent = 'My Monthly Results';
    }
});