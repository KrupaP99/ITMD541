const form = document.getElementById("tipForm");

form.addEventListener("input", calculate);

function calculate() {

    let bill = parseFloat(document.getElementById("billTotal").value);
    let tipPercent = document.getElementById("tipRange").value;
    let currency = document.getElementById("currency").value;
    let taxExempt = document.getElementById("taxExempt").checked;

    let error = document.getElementById("error");

    // Validation (20 pts requirement)
    if (isNaN(bill) || bill < 0) {
        error.textContent = "Please enter a valid positive number!";
        resetFields();
        return;
    } else {
        error.textContent = "";
    }

    // Reset if bill = 0 (Part B)
    if (bill === 0) {
        resetFields();
        return;
    }

    // Tip %
    document.getElementById("tipPercent").value = tipPercent + "%";

    // Tip amount
    let tipAmount = bill * (tipPercent / 100);

    // Tax calculation (Part C + 541 exempt)
    let tax = taxExempt ? 0 : bill * 0.11;
    let totalWithTax = bill + tax;

    // Final total
    let finalTotal = totalWithTax + tipAmount;

    // Currency conversion
    if (currency === "eur") {
        tipAmount *= 0.95;
        totalWithTax *= 0.95;
        finalTotal *= 0.95;
    } else if (currency === "inr") {
        tipAmount *= 85;
        totalWithTax *= 85;
        finalTotal *= 85;
    }

    // Output with 2 decimals (Part A)
    document.getElementById("tipAmount").value = tipAmount.toFixed(2);
    document.getElementById("totalWithTax").value = totalWithTax.toFixed(2);
    document.getElementById("finalTotal").value = finalTotal.toFixed(2);
}

// Reset function
function resetFields() {
    document.getElementById("tipPercent").value = "";
    document.getElementById("tipAmount").value = "";
    document.getElementById("totalWithTax").value = "";
    document.getElementById("finalTotal").value = "";
}