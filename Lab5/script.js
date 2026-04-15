const form = document.getElementById("tipForm");

form.addEventListener("input", calculate);

function calculate() {

    const billInput = document.getElementById("billTotal").value.trim();
    const error = document.getElementById("error");

    // If field is empty, reset and stop
    if (billInput === "") {
        error.textContent = "";
        resetFields();
        return;
    }

    const bill = parseFloat(billInput);
    const tipPercent = document.getElementById("tipRange").value;
    const currency = document.getElementById("currency").value;
    const taxExempt = document.getElementById("taxExempt").checked;

    // Validation — non-number or negative number
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

    // Show tip % in the display box next to slider
    document.getElementById("tipPercent").value = tipPercent + "%";

    // Tip amount (in USD before conversion)
    let tipAmount = bill * (tipPercent / 100);

    // Tax calculation (Part C + 541 tax exempt)
    // When tax exempt, totalWithTax = bill (no tax applied)
    let totalWithTax = taxExempt ? bill : bill * 1.11;

    // Final total = totalWithTax + tip (still in USD)
    let finalTotal = totalWithTax + tipAmount;

    // Write totalWithTax in USD BEFORE currency conversion (it always shows in USD)
    document.getElementById("totalWithTax").value = totalWithTax.toFixed(2);

    // Currency conversion — only apply to tip and final total
    if (currency === "eur") {
        tipAmount *= 0.95;
        finalTotal *= 0.95;
    } else if (currency === "inr") {
        tipAmount *= 85;
        finalTotal *= 85;
    }

    // Output with 2 decimal places (Part A)
    document.getElementById("tipAmount").value = tipAmount.toFixed(2);
    document.getElementById("finalTotal").value = finalTotal.toFixed(2);
}

// Reset all output fields
function resetFields() {
    document.getElementById("tipPercent").value = "";
    document.getElementById("tipAmount").value = "";
    document.getElementById("totalWithTax").value = "";
    document.getElementById("finalTotal").value = "";
}