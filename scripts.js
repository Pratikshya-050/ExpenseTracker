// Sample data to demonstrate functionality (replace this with your actual data logic)
let expenses = [];

// Function to add an expense
function addExpense() {
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    if (amount && category && date) {
        const expense = {
            amount: parseFloat(amount),
            category: category,
            date: new Date(date),
        };

        expenses.push(expense);
        displayExpenses(expenses);
        updateTotal(expenses); // Update total with all expenses
        clearForm();
    } else {
        alert('Please fill in all fields.');
    }
}

// Function to clear the form fields after submission
function clearForm() {
    document.getElementById('amount').value = '';
    document.getElementById('category').value = 'Food'; // Reset to default
    document.getElementById('date').value = '';
}

// Function to display expenses
function displayExpenses(expenseList) {
    const expenseListDiv = document.getElementById('expense-list');
    expenseListDiv.innerHTML = '';

    if (expenseList.length === 0) {
        expenseListDiv.innerHTML = '<p>No expenses added yet.</p>';
        return;
    }

    expenseList.forEach((expense, index) => {
        const expenseItem = document.createElement('div');
        expenseItem.classList.add('expense-item');
        expenseItem.innerHTML = `
            <span>${expense.category}</span>
            <span>$${expense.amount.toFixed(2)}</span>
            <span>${expense.date.toLocaleDateString()}</span>
        `;
        expenseListDiv.appendChild(expenseItem);
    });
}

// Function to update the total expenditure
function updateTotal(expenseList) {
    const total = expenseList.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('monthly-summary').innerHTML = `Total: $${total.toFixed(2)}`;
}

// Function to filter expenses based on category and month
function filterExpenses() {
    const selectedCategory = document.getElementById('filter-category').value;
    const selectedMonth = document.getElementById('filter-month').value;

    let filteredExpenses = expenses;

    // Filter by category
    if (selectedCategory) {
        filteredExpenses = filteredExpenses.filter(expense => expense.category === selectedCategory);
    }

    // Filter by month
    if (selectedMonth) {
        const monthStart = new Date(selectedMonth);
        const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0); // Last day of the month
        filteredExpenses = filteredExpenses.filter(expense => 
            expense.date >= monthStart && expense.date <= monthEnd
        );
    }

    displayExpenses(filteredExpenses);
    updateTotal(filteredExpenses); // Update total with filtered expenses
}

// Call this function to ensure the expense list is updated when the page loads
window.onload = function() {
    displayExpenses(expenses);
    updateTotal(expenses); // Update total with all expenses on load
};




