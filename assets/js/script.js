// Display income & budget modal
document.addEventListener('DOMContentLoaded', function () {
    const goButton = document.getElementById('go-button');
    const incomeBudgetModal = document.getElementById('income-budget-modal');

    goButton.addEventListener('click', function () {
        displayModal(incomeBudgetModal);
    });
});

/**
 * Shows / displays the modal passed as the parameter
 */
function displayModal(modalName) {
    modalName.showModal();
}

/**
 * Closes the modal passed as the parameter
 */
function closeModal(modalName) {
    modalName.close();
}

// Close income & budget modal
document.getElementById('income-budget-back-button').addEventListener('click', function () {
    closeModal(document.getElementById('income-budget-modal'));
});

// Check income vs. budget & display spends modal
document.getElementById('income-budget-next-button').addEventListener('click', function () {
    let incomeInputs = document.getElementsByClassName('income-input');
    let totalIncome = 0;

    for (let incomeInput of incomeInputs) {
        totalIncome += parseFloat(incomeInput.value);
    };

    let budgetInputs = document.getElementsByClassName('budget-input');
    let totalBudget = 0;

    for (let budgetInput of budgetInputs) {
        totalBudget += parseFloat(budgetInput.value);
    };

    console.log(totalIncome);
    console.log(totalBudget);
    
    displayModal(document.getElementById('spends-modal'));
});

    

// Close spends modal
document.getElementById('spends-back-button').addEventListener('click', function () {
    closeModal(document.getElementById('spends-modal'));
});

// Display results modal
document.getElementById('spends-next-button').addEventListener('click', function () {
    displayModal(document.getElementById('results-modal'));
});

// Close results modal
document.getElementById('results-back-button').addEventListener('click', function () {
    closeModal(document.getElementById('results-modal'));
});

// Listen for a change in the pay period & call the updateModalTitles function
document.getElementById('pay-period').addEventListener('change', function () {
    const selectedPayPeriod = this.value;
    updateModalTitles(selectedPayPeriod);
});

/**
 * Update modal titles based on pay period selected
 */
function updateModalTitles(selectedPayPeriod) {
    const incomeTitle = document.getElementById('income-title');
    const budgetTitle = document.getElementById('budget-title');
    const spendsTitle = document.getElementById('spends-title');
    const resultsTitle = document.getElementById('results-title');

    let titlePrefix = '';

    if (selectedPayPeriod === 'weekly') {
        titlePrefix = 'My Weekly ';
    } else if (selectedPayPeriod === 'fortnightly') {
        titlePrefix = 'My Fortnightly ';
    } else if (selectedPayPeriod === 'monthly') {
        titlePrefix = 'My Monthly ';
    }

    incomeTitle.textContent = titlePrefix + 'Income';
    budgetTitle.textContent = titlePrefix + 'Budget';
    spendsTitle.textContent = titlePrefix + 'Spends';
    resultsTitle.textContent = titlePrefix + 'Results';
}

// Update currency spans based on currency selected
document.getElementById('currency').addEventListener('change', function () {
    const currencySpans = document.getElementsByClassName('currency-selected');
    const selectedCurrency = this.value;

    for (let i = 0; i < currencySpans.length; i++) {
        currencySpans[i].innerHTML = selectedCurrency;
    }
});