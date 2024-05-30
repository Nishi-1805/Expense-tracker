const expenseform = document.getElementById("expense-tracker");

const loadExpenses = () => {
  const expensesdata = JSON.parse(localStorage.getItem("expenses"));
  return expensesdata;
};
const saveExpenses = (expenses) => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};
const UpdateList = () => {
  const expenses = loadExpenses();
  const expenseList = document.createElement("ul");

  expenses.forEach((expense, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${expense.amount} - ${expense.description} - ${expense.category}
      <button data-index="${index}" class="edit">Edit</button>
      <button data-index="${index}" class="delete">Delete</button>`;
    expenseList.appendChild(listItem);
  });

  const existingList = document.querySelector("ul");
  if (existingList) {
    existingList.replaceWith(expenseList);
  } else {
    document.body.appendChild(expenseList);
  }
  addEditEventListeners();
  addDeleteEventListeners();
};
const addEditEventListeners = () => {
  document.querySelectorAll('.edit').forEach(button => {
    button.addEventListener('click', (event) => {
      const index = event.target.dataset.index;
      editExpense(index);
    });
  });
};
const addDeleteEventListeners = () => {
  document.querySelectorAll('.delete').forEach(button => {
    button.addEventListener('click', (event) => {
      const index = event.target.dataset.index;
      deleteExpense(index);
    });
  });
};
const handleFormSubmit = (event) => {
  event.preventDefault();
  const amount = document.getElementById("expense").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  if (!amount || !description || !category) {
    alert("Please fill all required details");
    return;
  }
  const expenses = loadExpenses();
  expenses.push({amount, description, category});
  saveExpenses(expenses);
  UpdateList();
  expenseform.reset();
};
const editExpense = (index) => {
  const expenses = loadExpenses();
  const expense = expenses[index];

  const newAmount = prompt("Enter new amount:", expense.amount);
  const newDescription = prompt("Enter new description:", expense.description);
  const newCategory = prompt("Enter new category:", expense.category);

  if (newAmount !== null && newDescription !== null && newCategory !== null) {
    expenses[index] = { amount: newAmount, description: newDescription, category: newCategory };
    saveExpenses(expenses);
    UpdateList();
  }
};
const deleteExpense = (index) => {
  const confirmDelete = confirm("Are you sure you want to delete this expense?");
  if (confirmDelete) {
    const expenses = loadExpenses();
    expenses.splice(index, 1);
    saveExpenses(expenses);
    UpdateList();
  }
};
expenseform.addEventListener("submit", handleFormSubmit);
UpdateList();
