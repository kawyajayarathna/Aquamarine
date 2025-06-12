document.addEventListener('DOMContentLoaded', function() {
    const checkoutButton = document.getElementById('checkout-button');
    const basketItemsList = document.getElementById('basket-items');
    const nameInput = document.getElementById('nme');
    const emailInput = document.getElementById('mail');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const confirmCheckbox = document.getElementById('chck');

    checkoutButton.addEventListener('click', function(event) {
        event.preventDefault(); // prevent default action

        // clear previous error messages
        nameError.textContent = '';
        emailError.textContent = '';

        //check if basket has at least one item
        if (basketItemsList.children.length === 0) {
            alert('Please select at least one item to proceed to checkout');
            return;
        }
        //check form inputs
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();

        if (nameValue === '') {
            nameError.textContent = 'Name is required!';
            return;
        } else if (!/^[a-zA-Z\s]+$/.test(nameValue)) {
            nameError.textContent = 'Name can be letters or characters only!';
            return;
        }

        if (emailValue === '') {
            emailError.textContent = 'Email is required!';
            return;
        } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
            emailError.textContent = 'Please enter a valid email address!';
            return;
        }
        //check if confirm checkbox is checked
        if (!confirmCheckbox.checked) {
            alert('Please confirm to proceed to checkout');
            return;
        }

        //if all check pass, proceed to checkout page
        alert ('You are now proceeding to checkout section!');
        window.location.href = 'checkout.html';
    });
});