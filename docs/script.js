document.getElementById('calculate-btn').addEventListener('click', function() {
    const inputs = document.querySelectorAll('.value-input');
    let sum = 0;
    let allValuesEntered = true;
    let validValues = true;

    inputs.forEach(function(input) {
        if (!input.value) {
            allValuesEntered = false;
            input.classList.add('invalid'); // Highlight empty input
            return;
        }
        const value = parseInt(input.value);
        if (value < 1 || value > 5) {
            validValues = false;
            input.classList.add('invalid'); // Highlight invalid input
            return;
        }
        sum += value - 1;
        input.classList.remove('invalid'); // Remove highlight from valid input
    });

    if (!allValuesEntered) {
        alert('Please enter all 16 values.');
        return;
    }

    if (!validValues) {
        alert('Please enter values between 1 and 5.');
        return;
    }

    const result = sum / 68;
    document.getElementById('result-container').innerText = `Result: ${result.toFixed(2)}`;
});

document.getElementById('clear-all-btn').addEventListener('click', function() {
    const inputs = document.querySelectorAll('.value-input');
    inputs.forEach(function(input) {
        input.value = '';
    });
    document.getElementById('result-container').innerText = ''; // Clear the result
});