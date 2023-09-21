let incomeBudgetModal = document.getElementById('income-budget-modal');
let incomeBudgetBackButton = document.getElementById('income-budget-back-button');
let incomeBudgetNextButton = document.getElementById('income-budget-next-button');

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
