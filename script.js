document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const resultEmpty = document.querySelector('.black-container');
    const resultFilled = document.querySelector('.black-container2');
    const monthlyRepayments = document.querySelector('.monthly-repayments');
    const totalRepayment = document.querySelector('.total-amount');

    resultFilled.style.display = 'none';
    
    // listen for form submission 
    form.addEventListener('submit', function (e) {
        e.preventDefault();
    

        //get values entered by the user
        const amount = parseFloat(document.getElementById('amount').value);
        const term = parseFloat(document.getElementById('term').value);
        const interest = parseFloat(document.getElementById('interest').value);
        const mortgageType = document.querySelector('input[name="mortgage-type"]:checked');

        //validate user input
        if (!amount || !interest || !term || !mortgageType) {
            alert("Kindly fill out all fields and select mortgage type.");
            return;
        };

        //calculate mortgage payments

        //convert interest rate
        const monthlyRate = interest / 100 / 12;
        const months = term * 12;

        //repayment logic
        if (mortgageType.value === "repayment") {
            const power = Math.pow(1 + monthlyRate, months);
            monthlyPayment = amount * monthlyRate * power / (power - 1);
            totalAmount = monthlyPayment * months;
        }

        else if ( mortgageType.value === "interest-only") {
            monthlyPayment = amount * monthlyRate;
            totalAmount = monthlyPayment * months + amount;
        }

        //update and display results in two decimal places.
        monthlyRepayments.textContent = `£${monthlyPayment.toFixed(2)}`;
        totalRepayment.textContent = `£${totalAmount.toFixed(2)}`;

        //show results
        resultEmpty.style.display = 'none';
        resultFilled.style.display = 'flex';

        //implement the clear all fucntion
        const clearButton = document.getElementById('clear-btn');
        clearButton.addEventListener('click', function () {
            document.getElementById('amount').value = '';
            document.getElementById('term').value = '';
            document.getElementById('interest').value = '';
            document.querySelector('.black-container').style.display = 'flex'
            document.querySelector('.black-container2').style.display = 'none'

            const mortgageRadios = document.querySelectorAll('input[name="mortgage-type"]');
            mortgageRadios.forEach ( radio => radio.checked = false);
        });
    });  
});