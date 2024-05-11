let expenseItems = localStorage.getItem('user-expenses')
  ? JSON.parse(localStorage.getItem('user-expenses'))
  : [];

window.onload = () => {
  displayItems(expenseItems);
};

const form = document.querySelector('form');
const ul = document.querySelector('ul');
let editingIndex = -1;

form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();

  const amount = document.querySelector('#amount').value;
  const description = document.querySelector('#description').value;
  const category = document.querySelector('#category').value;

  if (amount == '' || description == '') return;

  if (editingIndex !== -1) {
    expenseItems[editingIndex] = { amount, description, category };
    editingIndex = -1;
  } else {
    expenseItems.push({
      amount,
      description,
      category,
    });
  }

  localStorage.setItem('user-expenses', JSON.stringify(expenseItems));

  form.reset();

  displayItems(expenseItems);
}

function displayItems(items) {
  if (!items.length) return;
  ul.innerHTML = '';
  items.forEach((item, index) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const deletebtn = document.createElement('button');
    editbtn = document.createElement('button');

    deletebtn.id = 'delete';
    editbtn.id = 'edit';

    span.innerText = `${item.amount}-${item.description}-${item.category}`;
    deletebtn.innerText = 'Delete';
    editbtn.innerText = 'Edit';

    deletebtn.addEventListener('click', () => deleteItem(index));
    editbtn.addEventListener('click', () => editItem(index));

    li.append(span);
    li.append(deletebtn);
    li.append(editbtn);

    ul.append(li);
  });
}

function deleteItem(index) {
  expenseItems.splice(index, 1);
  localStorage.setItem('user-expenses', JSON.stringify(expenseItems));
  if (!expenseItems.length) location.reload();
  displayItems(expenseItems);
}

function editItem(index) {
  let editAmount = document.querySelector('#amount');
  let editDescription = document.querySelector('#description');
  let editCategory = document.querySelector('#category');

  editAmount.value = expenseItems[index].amount;
  editDescription.value = expenseItems[index].description;
  editCategory.value = expenseItems[index].category;

  editingIndex = index;
}