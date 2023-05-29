const incomeSection = document.querySelector(".income-area")
const expensesSection = document.querySelector(".expenses-area")
const availableMoney = document.querySelector(".available-money")
const addTrasactionPanel = document.querySelector(".add-transaction-panel")

const nameInput = document.querySelector("#name")
const amountInput = document.querySelector("#amount")
const categorySelect = document.querySelector("#category")

const addTransactionBtn = document.querySelector(".add-transaction")
const deleteAllBtn = document.querySelector(".delete-all")
const saveBtn = document.querySelector(".save")
const cancelBtn = document.querySelector(".cancel")
const deleteBtn = document.querySelector(".delete")
const lightStyleBtn = document.querySelector(".light")
const darkStyleBtn = document.querySelector(".dark")

let root = document.documentElement
let ID = 0
let categoryIcon
let selectedCategory
let moneyArr = [0]

const showPanel = () => {
	addTrasactionPanel.style.display = "flex"
}

const closePanel = () => {
	addTrasactionPanel.style.display = "none"
	clearInputs()
}

const checkForm = () => {
	if (
		nameInput.value !== "" &&
		amountInput.value !== "" &&
		categorySelect.value !== "none"
	) {
		createNewTransaction()
	} else {
		alert("Wypełnij wszystkie pola!")
	}
}
const clearInputs = () => {
	nameInput.value = ""
	amountInput.value = ""
	categorySelect.selectedIndex = 0
}
const createNewTransaction = () => {
	const newTrasaction = document.createElement("div")
	newTrasaction.classList.add("transaction")
	newTrasaction.setAttribute("id", ID)

	checkCategory(selectedCategory)

	newTrasaction.innerHTML = `
	<p class="transaction-name">${categoryIcon} ${nameInput.value}</p>
	<p class="transaction-amount">${amountInput.value} zł<button class="delete" onclick = "deleteTransaction(${ID})"><i class="fas fa-times"></i></button>
	</p>
	`

	amountInput.value > 0
		? incomeSection.appendChild(newTrasaction) &&
		  newTrasaction.classList.add("income")
		: expensesSection.appendChild(newTrasaction) &&
		  newTrasaction.classList.add("expense")

	moneyArr.push(parseFloat(amountInput.value))
	countMoney(moneyArr)
	closePanel()
	ID++
	clearInputs()
}

const selectCategory = () => {
	selectedCategory = categorySelect.options[categorySelect.selectedIndex].text
}
const checkCategory = transaction => {
	switch (transaction) {
		case "[ + ] Przychód":
			categoryIcon = '<i class="fas fa-money-bill-wave"></i>'
			break
		case "[ - ] Zakupy":
			categoryIcon = '<i class="fas fa-cart-arrow-down"></i>'
			break
		case "[ - ] Jedzenie":
			categoryIcon = '<i class="fas fa-hamburger"></i>'
			break
		case "[ - ] Kino":
			categoryIcon = '<i class="fas fa-film"></i>'
			break
		case "[ - ] Zdrowie":
			categoryIcon = '<i class="fa-solid fa-heart-pulse"></i>'
			break
		case "[ - ] Transport":
			categoryIcon = '<i class="fa-solid fa-car"></i>'
			break
		case "[ - ] Rozrywka":
			categoryIcon = '<i class="fa-solid fa-music"></i>'
			break
		case "[ - ] Ubrania":
			categoryIcon = '<i class="fa-solid fa-shirt"></i>'
			break
		case "[ - ] Rachunki":
			categoryIcon = '<i class="fa-solid fa-money-bill"></i>'
			break
	}
}
const countMoney = money => {
	const newMoney = money.reduce((a, b) => a + b)
	availableMoney.textContent = `${newMoney}zł`
}

const deleteTransaction = id => {
	const transactionToDelete = document.getElementById(id)
	const transactionAmount = parseFloat(
		transactionToDelete.childNodes[3].innerText
	)
	const indexOfTransaction = moneyArr.indexOf(transactionAmount)

	moneyArr.splice(indexOfTransaction, 1)

	transactionToDelete.classList.contains("income")
		? incomeSection.removeChild(transactionToDelete)
		: expensesSection.removeChild(transactionToDelete)

	countMoney(moneyArr)
}

const deleteAllTransaction = () => {
	incomeSection.innerHTML = "<h3>Przychód:</h3>"
	expensesSection.innerHTML = "<h3>Wydatki:<h3>"
	availableMoney.textContent = "0 zł"
	moneyArr = []
}

const changeStyleToLight = () => {
	root.style.setProperty("--first-color", "#f9f9f9")
	root.style.setProperty("--second-color", "#14161F")
	root.style.setProperty("--border-color", "rgba(0, 0, 0, 0.2)")
}
const changeStyleToDark = () => {
	root.style.setProperty("--first-color", "#14161F")
	root.style.setProperty("--second-color", "#f9f9f9")
	root.style.setProperty("--border-color", "rgba(255, 255, 255, 0.4)")
}

addTransactionBtn.addEventListener("click", showPanel)
cancelBtn.addEventListener("click", closePanel)
saveBtn.addEventListener("click", checkForm)
deleteAllBtn.addEventListener("click", deleteAllTransaction)
lightStyleBtn.addEventListener("click", changeStyleToLight)
darkStyleBtn.addEventListener("click", changeStyleToDark)
