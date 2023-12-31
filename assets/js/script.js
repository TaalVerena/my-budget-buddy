let totalIncome = 0;
const totalBudget = 0;
let totalSpends = 0;
// Used to identify modal elements on the index page
const indexPageIdentifier = document.getElementById('go-button');

let myChart;

//  If statement to avoid error when element is not present
if (indexPageIdentifier) {
    // Display income & budget modal
    document.addEventListener('DOMContentLoaded', function () {
        const goButton = document.getElementById('go-button');
        const incomeBudgetModal = document.getElementById('income-budget-modal');

        goButton.addEventListener('click', function () {
            displayModal(incomeBudgetModal);
        });
    });
}

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

//  If statement to avoid error when element is not present
if (indexPageIdentifier) {
    // Listen for a change in the pay period & call the updateModalTitles function
    document.getElementById('pay-period').addEventListener('change', function () {
        const selectedPayPeriod = this.value;
        updateModalTitles(selectedPayPeriod);
    });
}

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

//  If statement to avoid error when element is not present
if (indexPageIdentifier) {
    // Update currency spans based on currency selected
    document.getElementById('currency').addEventListener('change', function () {
        const currencySpans = document.getElementsByClassName('currency-selected');
        const selectedCurrency = this.value;

        for (let i = 0; i < currencySpans.length; i++) {
            currencySpans[i].innerHTML = selectedCurrency;
        }
    });
}

//  If statement to avoid error when element is not present
if (indexPageIdentifier) {
    // Close income & budget modal
    document.getElementById('income-budget-back-button').addEventListener('click', function () {
        closeModal(document.getElementById('income-budget-modal'));
    });
}

//  If statement to avoid error when element is not present
if (indexPageIdentifier) {
    // Check income vs. budget & display spends modal
    document.getElementById('income-budget-next-button').addEventListener('click', function (event) {
        event.preventDefault();
        totalIncome = 0;

        const incomeInputs = document.getElementsByClassName('income-input');

        // Check income inputs
        for (let incomeInput of incomeInputs) {
            const incomeValue = parseFloat(incomeInput.value);

            // Check if the input is a valid number and greater than or equal to 0
            if (isNaN(incomeValue) || incomeValue < 0) {
                alert('Please enter a valid positive number equal to or greater than 0 for each income category.');
                return; // Stop processing if the input is invalid 
            }

            totalIncome += incomeValue;
        }

        document.getElementById('total-income').textContent = totalIncome.toFixed(2);

        const budgetInputs = document.getElementsByClassName('budget-input');
        let totalBudget = 0;

        // Check budget inputs
        for (let budgetInput of budgetInputs) {
            const budgetValue = parseFloat(budgetInput.value);

            // Check if the input is a valid number and greater than or equal to 0
            if (isNaN(budgetValue) || budgetValue < 0) {
                alert('Please enter a valid positive number equal to or greater than 0 for each budget category.');
                return; // Stop processing if the input is invalid 
            }

            totalBudget += budgetValue;
        }

        document.getElementById('total-budget').textContent = totalBudget.toFixed(2);

        // Check if the budget is greater than the income
        if (totalBudget > totalIncome) {
            alert('Your budget exceeds your income. Please adjust your budget.');
        } else {
            // If the income is larger or equal, open the spends modal
            displayModal(document.getElementById('spends-modal'));
        }
    });
}

//  If statement to avoid error when element is not present
if (indexPageIdentifier) {
    // Close spends modal
    document.getElementById('spends-back-button').addEventListener('click', function () {
        closeModal(document.getElementById('spends-modal'));
    });
}

//  If statement to avoid error when element is not present
if (indexPageIdentifier) {
    // Check spends inputs & display results modal
    document.getElementById('spends-next-button').addEventListener('click', function (event) {
        event.preventDefault();

        totalSpends = 0;

        const spendsInputs = document.getElementsByClassName('spends-input');
        let allSpendsInputsValid = true;

        // Check spends inputs
        for (let spendsInput of spendsInputs) {
            const spendsValue = parseFloat(spendsInput.value);

            // Check if the input is a valid number and greater than or equal to 0
            if (isNaN(spendsValue) || spendsValue < 0) {
                alert('Please enter a valid positive number equal to or greater than 0 for each spends category.');
                allSpendsInputsValid = false;
                break; // Stop processing if the input is invalid 
            }

            totalSpends += spendsValue;
        }

        document.getElementById('total-spends').textContent = totalSpends.toFixed(2);

        if (allSpendsInputsValid) {
            const totalSavings = document.getElementById('total-savings');
            let savingsCalculation = parseFloat(totalIncome) - parseFloat(totalSpends);
            totalSavings.innerHTML = parseFloat(savingsCalculation).toFixed(2);
            let totalBudget = 0;

            /**
             * Displays the result for each budget vs spend input & calculates spend %
             */
            function showResults(totalIncome) {
                const budgetInputs = document.getElementsByClassName('budget-input');
                const results = document.getElementsByClassName('results');
                const overOrUnder = document.getElementsByClassName('over-or-under');

                const spendPercentages = [];

                for (let i = 0; i < results.length; i++) {
                    totalBudget += parseFloat(budgetInputs[i].value);
                    results[i].innerHTML = parseFloat(budgetInputs[i].value) - parseFloat(spendsInputs[i].value);

                    if (parseFloat(results[i].innerHTML) === 0) {
                        overOrUnder[i].innerHTML = "On Track";
                        overOrUnder[i].style.color = '#738CBF';
                        overOrUnder[i].style.fontWeight = 'bold';
                    } else if (parseFloat(results[i].innerHTML) > 0) {
                        overOrUnder[i].innerHTML = "Under";
                        overOrUnder[i].style.color = 'green';
                        overOrUnder[i].style.fontWeight = 'bold';
                    } else {
                        results[i].innerHTML *= -1;
                        overOrUnder[i].innerHTML = "Over";
                        overOrUnder[i].style.color = 'red';
                        overOrUnder[i].style.fontWeight = 'bold';
                    }

                    // Calculate spend percentage for each category in relation to income
                    const spendPercentage = (parseFloat(spendsInputs[i].value) / parseFloat(totalIncome)) * 100;
                    spendPercentages.push(spendPercentage);
                }

                // Call the function to update the bar graph
                updateBarGraph(spendPercentages);
            }
            showResults(totalIncome);
            displayModal(document.getElementById('results-modal'));
        }
    });
}

/**
 * Updates the results bar graph
 */
function updateBarGraph(spendPercentages) {

    // Destroy the previous chart if it exists
    if (myChart != undefined) {
        myChart.destroy();
    }

    const categories = ['Rent', 'Transport', 'Food', 'Utilities', 'Loan', 'Other'];
    const barColors = [
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

//  If statement to avoid error when element is not present
if (indexPageIdentifier) {
    // Close results modal
    document.getElementById('results-back-button').addEventListener('click', function () {
        closeModal(document.getElementById('results-modal'));
    });
}