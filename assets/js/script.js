// Income & budget modal
let goButton = document.getElementById('go-button');

goButton.addEventListener('click', function () {
    let incomeBudgetModal = document.getElementById('income-budget-modal');
    displayModal(incomeBudgetModal);
});

function displayModal(modalName) {
    modalName.showModal();
}
