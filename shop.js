//handle adding products to the basket
//wait for the entire DOM to be loaded before executing the script 
document.addEventListener('DOMContentLoaded', function() {

    //select all add to basket buttons and the basket items and total amount
    const basketButtons = document.querySelectorAll('.add-button');
    const basketItems = document.getElementById('basket-items');
    const totalAmount = document.getElementById('amount');

    let total = 0;

    //add event listener to each button
    basketButtons.forEach(button=> {
        button.addEventListener('click', function() {
            //find the closest product card element
            const productCard = button.closest('.product-card');

            //extract product details from the product card
            const productName = productCard.querySelector('.imgname').innerText;
            const price = parseFloat(productCard.querySelector('.price').innerText.replace('$',''));
            const quantityInput = productCard.querySelector('input[type="number"]');
            const quantity = parseInt(quantityInput.value);
            const selectSize = productCard.querySelector('select[name^="Size"]');
            const selectMetal = productCard.querySelector('select[name^="Metal"]');
            const selectColor = productCard.querySelector('select[name^="Color"]');

            //get selected size,metal,color if available
            let size = selectSize ? selectSize.value : '';
            let metal = selectMetal ? selectMetal.value : '';
            let color = selectColor ? selectColor.value : '';

            //create a new list item for the basket with the product details
            const listItem =document.createElement('li');
            listItem.innerText = `${productName} - $${price} x ${quantity} ${size ? '-Size:'+size:''} ${metal ? '-Metal:'+metal:''} ${color ? '-Color:'+color:''}`;
            basketItems.appendChild(listItem);

            //update the total amount
            total += price * quantity;
            totalAmount.innerText = total.toFixed(2);
    
        });
    });
});         

//javascript for form functionality
//function to clear all input feilds within a fieldset
function clearFieldset(fieldsetId) {
    const field = document.getElementById(fieldsetId);
    const inputs = field.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
    });

}
//function to save data from inputs in a fieldset
function saveFieldset(fieldsetId) {
    const field = document.getElementById(fieldsetId);
    const inputs = field.querySelectorAll('input');
    let valid = true;
    const data = {};


    //check input validity before saving
    inputs.forEach(input => {
        if(!input.checkValidity()) {
            alert('Invalid input! Please check the '+ input.name +' field'); //error message for invalid input
            valid = false;
            return;
        }
        data[input.name] = input.value;
    });

    if(valid) {
        alert('Data saved'); //save data 
    }
    
}
//event listener for form submission
document.getElementById('checkout-form').addEventListener ('submit', function(event) {
    event.preventDefault();

    let validAll = true;
    const fields = ['fd1','fd2','fd3'];
    const form = document.getElementById('checkout-form');

    fields.forEach(fieldId => {
        const fieldset = document.getElementById(fieldId);
        const inputs = fieldset.querySelectorAll('input');
        inputs.forEach(input => {
            if (!input.checkValidity()) {
               alert('Invalid input! Please check the ' + input.name + ' field');
               validAll = false;
            }
        });
     });
     if(validAll) {
        if(confirm ('Are you sure you want to complete the order?')) { //confirm before submiting the order
              //submitOrder();
            alert('Order completed successfully!');
        }
     }

    //placeholder for function submitOrder()
    //function submitOrder() {
       //const formData = new FormData(form);

       //fetch('/submit_order', {
           // method: 'POST',
           // body:formData
        //})

       // .then(response => response.json())
      //  .then(data => {
           // if(data.success) {
               // alert('Order completed successfully!');
           // }
          //  else {
             //   alert('An error occured while submitting data! Please try again');
          //  }
       // })
      //  .catch(error => {
          //  console.error('Error:', error);
          //  alert('An error occured while submitting data! Please try again')
      //  });
 //   }
});
