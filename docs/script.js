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
        alert('Please enter all 17 values.');
        return;
    }

    if (!validValues) {
        alert('Please only enter values between 1 and 5.');
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



document.getElementById('edit-pdf-btn').addEventListener('click', async function() {
    const fileInput = document.getElementById('pdf-upload');
    const name = document.getElementById('name-input').value;
    const date = document.getElementById('date-input').value;

    if (!fileInput.files || fileInput.files.length === 0) {
        alert('Please upload a PDF file.');
        return;
    }

    const pdfDoc = await PDFLib.PDFDocument.load(await fileInput.files[0].arrayBuffer());
    const pages = pdfDoc.getPages();

    // Check if there are at least two pages
    if (pages.length < 2) {
        alert('The PDF does not have enough pages.');
        return;
    }

    const firstPage = pages[0];
    const secondPage = pages[1]; // Targeting the second page
    const { width } = secondPage.getSize();
    const fontSize = 12; // Adjust as needed

    // Add name to the top left of the first page
    if (name) {
        firstPage.drawText(name, {
            x: 125, // Adjust the position as needed
            y: width + 102, // Adjust the position as needed
            size: fontSize,
            color: PDFLib.rgb(0, 0, 0)
        });
    }

    // Add date to the top right of the first page
    if (date) {
        firstPage.drawText(date, {
            x: width - 220, // Adjust the position as needed
            y: width + 102, // Adjust the position as needed
            size: fontSize,
            color: PDFLib.rgb(0, 0, 0)
        });
    }

    // Add score to the second page
    const scoreText = `${document.getElementById('result-container').innerText.split(': ')[1]}`;
    secondPage.drawText(scoreText, {
        x: 120, // Adjust the position as needed
        y: 264, // Adjust the position as needed
        size: fontSize,
        color: PDFLib.rgb(0, 0, 0)
    });

    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, "edited-pdf.pdf", "application/pdf");
});

function download(data, filename, type) {
    const file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) { // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    } else { // Others
        const a = document.createElement("a"),
              url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}