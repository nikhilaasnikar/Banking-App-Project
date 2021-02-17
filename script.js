'use strict';
alert(`Please use any of the following Username and password for login:
USER--> na
PIN--> 1111,
USER--> va  
PIN--> 2222,
USER--> nk
PIN--> 3333,
USER--> ss
PIN--> 4444
`);
// Data
const account1 = {
  owner: 'Nikhil Aasnikar',
  transactions: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Varsha Ranganath',
  transactions: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Naghma Khan',
  transactions: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  transactions: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.Date');
const labelBalance = document.querySelector('.Balance-value');
const labelSumIn = document.querySelector('.Summary-value-in');
const labelSumOut = document.querySelector('.Summary-value-out');
const labelSumInterest = document.querySelector('.Summary-value-interest');
// const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.App');
const containerTransactions = document.querySelector('.Transactions'); //1

const btnLogin = document.querySelector('.Login-btn');
const btnTransfer = document.querySelector('.Form-btn-transfer');
const btnLoan = document.querySelector('.Form-btn-loan');
const btnClose = document.querySelector('.Form-btn-close');
const btnSort = document.querySelector('.btn-sort');

const inputLoginUsername = document.querySelector('.Login-input-user');
const inputLoginPin = document.querySelector('.Login-input-pin');
const inputTransferTo = document.querySelector('.Form-input-to');
const inputTransferAmount = document.querySelector('.Form-input-amount');
const inputLoanAmount = document.querySelector('.Form-input-loan');
const inputCloseUsername = document.querySelector('.Form-input-user');
const inputClosePin = document.querySelector('.Form-input-pin');

// console.log(labelWelcome);
// console.log(labelDate);
// console.log(labelBalance);
// console.log(labelSumIn);
// console.log(labelSumOut);
// console.log(labelSumInterest);
// console.log(containerApp);
// console.log(containerMovements);
// console.log(btnLogin);
// console.log(btnTransfer);
// console.log(btnLoan);
// console.log(btnClose);
// console.log(btnSort);
// console.log(inputLoginUsername);
// console.log(inputLoginPin);
// console.log(inputTransferTo);
// console.log(inputTransferAmount);
// console.log(inputLoanAmount);
// console.log(inputCloseUsername);
// console.log(inputClosePin);

const Transactions = [200, 450, -400, 3000, -650, -130, 70, 1300];

const displayTransactions = function (Transactions) {
  containerTransactions.innerHTML = ''; // this will empty the container
  Transactions.forEach(function (mov, i) {
    console.log(mov);
    console.log(i);
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `

    <div class="Transactions-row">
    <div class="Transactions-type Transactions-type-${type}">${
      i + 1
    } ${type}</div> 

    <div class="Transactions-value">${mov}€</div>

      `;

    containerTransactions.insertAdjacentHTML('afterbegin', html);
  });
};

displayTransactions(Transactions);

//  displaying total value in the bottom of UI

const calcDisplaySummary = function (acc) {
  const incomes = acc.transactions
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.transactions
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.transactions
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((interest, i, arr) => {
      console.log(arr);
      return interest >= 1;
    })
    .reduce((acc, interest) => acc + interest, 0);

  labelSumInterest.textContent = `${interest}`;
};

// COmputing Username and storing into accounts array
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
  });
};

createUserNames(accounts);

console.log(accounts);

// Update UI

const updateUi = function (acc) {
  // Display Transactions

  displayTransactions(currentAccount.transactions);

  // Display balance
  calcDisplayBalance(currentAccount);
  // Display Summary
  calcDisplaySummary(currentAccount);
};

// addding balance value to UI also
const calcDisplayBalance = function (acc) {
  acc.balance = acc.transactions.reduce((acc, mov) => acc + mov, 0);

  // acc.balance = balance;
  labelBalance.textContent = `${acc.balance} €`;
};

// Implemeting Login Functionality
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear Input Fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update Ui
    updateUi(currentAccount);
  }
});

// Implemeting transfers

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiveAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiveAcc);

  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiveAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.transactions.push(-amount);
    receiveAcc.transactions.push(amount);

    // Update UI
    updateUi(currentAccount);
  }
});

// Implementing Loan Functionality

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    (amount > 0 && currentAccount,
    currentAccount.transactions.some(mov => mov >= amount / 10)) //Check later
  ) {
    console.log(Transactions);
    // Add the transaction
    currentAccount.transactions.push(amount);

    // Update Ui
    updateUi(currentAccount);
  }
  inputLoanAmount.value = '';
});

// Implementing Close account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // console.log(index);
    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
});
