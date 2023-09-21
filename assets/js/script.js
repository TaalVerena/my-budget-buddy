let incomeBudgetModal = document.getElementById('income-budget-modal');
let incomeBudgetBackButton = document.getElementById('income-budget-back-button');
let incomeBudgetNextButton = document.getElementById('income-budget-next-button');
let spendsModal = document.getElementById('spends-modal');
let spendsBackButton = document.getElementById('spends-back-button');
let spendsNextButton = document.getElementById('spends-next-button');
let resultsModal = document.getElementById('results-modal');
let resultsBackButton = document.getElementById('results-back-button');

// Display income & budget modal
document.addEventListener('DOMContentLoaded', function (){
    let goButton = document.getElementById('go-button');

    goButton.addEventListener('click', function (){
        displayModal(incomeBudgetModal);
    });
})

// Close income & budget modal
incomeBudgetBackButton.addEventListener('click', function (){
    closeModal(incomeBudgetModal);
});

// Display spends modal
incomeBudgetNextButton.addEventListener('click', function(){
    displayModal(spendsModal);
})

// Close spends modal
spendsBackButton.addEventListener('click', function (){
    closeModal(spendsModal);
});

// Display results modal
spendsNextButton.addEventListener('click', function(){
    displayModal(resultsModal);
})

/**
 * Shows / displays the model passed as the parameter
 */
function displayModal(modalName){
    modalName.showModal();
}

/**
 * Closes the model passed as the parameter
 */
function closeModal(modalName){
    modalName.close();
}
