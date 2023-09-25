let totalIncome = 0;

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

// Close income & budget modal
document.getElementById('income-budget-back-button').addEventListener('click', function () {
    closeModal(document.getElementById('income-budget-modal'));
});

// Check income vs. budget & display spends modal
document.getElementById('income-budget-next-button').addEventListener('click', function (event) {
    event.preventDefault();

    let incomeInputs = document.getElementsByClassName('income-input');

    // Check income inputs
    for (let incomeInput of incomeInputs) {
        const incomeValue = parseFloat(incomeInput.value);

        // Check if the input is a valid number and greater than or equal to 0
        if (isNaN(incomeValue) || incomeValue < 0) {
            alert('Please enter a valid positive number for income.');
            return; // Stop processing if the input is invalid 
        }

        totalIncome += incomeValue;
    }

    let budgetInputs = document.getElementsByClassName('budget-input');
    let totalBudget = 0;

    // Check budget inputs
    for (let budgetInput of budgetInputs) {
        const budgetValue = parseFloat(budgetInput.value);

        // Check if the input is a valid number and greater than or equal to 0
        if (isNaN(budgetValue) || budgetValue < 0) {
            alert('Please enter a valid positive number for the budget.');
            return; // Stop processing if the input is invalid 
        }

        totalBudget += budgetValue;
    }

    // Check if the budget is greater than the income
    if (totalBudget > totalIncome) {
        alert('Your budget exceeds your income. Please adjust your budget.');
    } else {
        // If the income is larger or equal, open the next modal
        displayModal(document.getElementById('spends-modal'));
    }
});

// Close spends modal
document.getElementById('spends-back-button').addEventListener('click', function () {
    closeModal(document.getElementById('spends-modal'));
});

// Check spends inputs & display results modal
document.getElementById('spends-next-button').addEventListener('click', function (event) {
    event.preventDefault();

    let spendsInputs = document.getElementsByClassName('spends-input');
    let allSpendsInputsValid = true;
    let totalSpends = 0;

    // Check spends inputs
    for (let spendsInput of spendsInputs) {
        const spendsValue = parseFloat(spendsInput.value);

        // Check if the input is a valid number and greater than or equal to 0
        if (isNaN(spendsValue) || spendsValue < 0) {
            alert('Please enter a valid positive number for spends.');
            allSpendsInputsValid = false;
            break; // Stop processing if the input is invalid 
        }

        totalSpends += spendsValue;
    }

    if (allSpendsInputsValid) {
        let totalBudget = 0;

        function showResults(totalIncome) {
            let budgetInputs = document.getElementsByClassName('budget-input');
            let results = document.getElementsByClassName('results');
            let spendPercentages = [];

            for (let i = 0; i < results.length; i++) {
                totalBudget += parseFloat(budgetInputs[i].value);
                results[i].innerHTML = budgetInputs[i].value - spendsInputs[i].value;

                // Calculate spend percentage for each category
                const spendPercentage = (parseFloat(spendsInputs[i].value) / parseFloat(totalIncome)) * 100;
                spendPercentages.push(spendPercentage);
                console.log(spendPercentage);
            }

            // Call the function to update the pie chart
            updatePieChart(spendPercentages);
        }
        showResults(totalIncome);
        displayModal(document.getElementById('results-modal'));
    }
});

/**
 * Updates the results pie chart
 */
function updatePieChart(spendPercentages) {
    var categories = ['Rent / Mortgage', 'Transport / Vehicle', 'Food', 'Utilities', 'Loan Repayments', 'Savings', 'Other'];
    var barColors = [
        "#BE9FE1",
        "#C9B6E4",
        "#E1CCEC",
        "#CBEDD5",
        "#97DECE",
        "#62B6B7",
        "#439A97"
    ];

    new Chart("results-graph", {
        type: "bar",
        data: {
            labels: categories,
            datasets: [{
                backgroundColor: barColors,
                data: spendPercentages
            }]
        },
        options: {
            legend: { display: false },
            maintainAspectRatio: false,
            responsive: true,
            width: 300,
            height: 1000,
            title: {
                display: true,
                text: "My Spends % Per Category",
                fontSize: 16
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontSize: 14
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontSize: 16
                    }
                }]
            }
        }
    });
}

// Close results modal
document.getElementById('results-back-button').addEventListener('click', function () {
    closeModal(document.getElementById('results-modal'));
});