// JavaScript Document

/*==========================================================================
------------------------------    Job Role  --------------------------------
============================================================================*/

let jobRole = document.getElementById('title');
let jobRole_otherTextBox = document.getElementById('other-job-role');
jobRole_otherTextBox.style.display = 'none'; //hide on load
jobRole.addEventListener('click', (e) => {
	if (e.target.value === 'other') {
		jobRole_otherTextBox.style.display = 'initial'; //show when other is selected
	} else {
		jobRole_otherTextBox.style.display = 'none'; //hide if other is de-selected
	}
});
/*==========================================================================
-------------------------------    T-shirt  --------------------------------
============================================================================*/

let Tshirt_design = document.getElementById('design');
let Tshirt_color = document.getElementById('color');
let Tshirt_colorOptions = Tshirt_color.querySelectorAll('[data-theme]');

function displayColors(design) {
	for (let i = 0; i < Tshirt_colorOptions.length; i++) { //loop through all colors
		if (Tshirt_colorOptions[i].getAttribute('data-theme') === design) { //only show colors that match design choosen
			Tshirt_colorOptions[i].style.display = 'initial';
		} else {
			Tshirt_colorOptions[i].style.display = 'none';
		}
	}
}
//show colors of design once a design has been choosen
Tshirt_design.addEventListener('change', (e) => {
	Tshirt_color.removeAttribute('disabled');
	Tshirt_color.firstElementChild.selected = "true";
	if (e.target.value === 'heart js') {
		displayColors('heart js');
	} else if (e.target.value === 'js puns') {
		displayColors('js puns');
	}
});

/*==========================================================================
-------------------------------  Activities  -------------------------------
============================================================================*/

let activities_Container = document.getElementById('activities');
let activities_Cost = document.getElementById('activities-cost');
let activities_Inputs = activities_Container.querySelectorAll('input');
let costTracker = 0;
activities_Container.addEventListener('change', (e) => {
	if (e.target.checked) { //add activity cost
		costTracker += parseInt(e.target.getAttribute('data-cost'));
	} else { //subtract activity cost
		costTracker -= parseInt(e.target.getAttribute('data-cost'));
	}
	activities_Cost.innerHTML = `Total: $${costTracker}`; //add total cost to page
	//loop through all activites
	for (let i = 0; i < activities_Inputs.length; i++) {
		let isMatch = false;
		let Act_i = activities_Inputs[i];
		for (let j = 0; j < activities_Inputs.length; j++) {
			let Act_j = activities_Inputs[j];
			if (i !== j && Act_i.getAttribute('data-day-and-time') == Act_j.getAttribute('data-day-and-time') && Act_j.checked) {
				isMatch = true; //if activity matches another checked activity with same time
				break;
			}
		}
		if (isMatch) { //if match
			Act_i.setAttribute('disabled', '');
			Act_i.parentElement.className = 'disabled';
		} else { // if no match
			Act_i.removeAttribute('disabled');
			Act_i.parentElement.className = '';
		}
	}
});
/*-------------------------  Improved Focus State  -------------------------*/

//loop through all activity inputs and add focus and blur event listener
for (let i = 0; i < activities_Inputs.length; i++) {
	activities_Inputs[i].addEventListener('focus', (e) => {
		e.target.parentElement.classList.add('focus');
	});
	activities_Inputs[i].addEventListener('blur', (e) => {
		e.target.parentElement.classList.remove('focus');
	});
}
/*==========================================================================
---------------------------------  Payment  --------------------------------
============================================================================*/

let payment_Options = document.getElementById('payment');
let payment_CC = document.getElementById('credit-card');
let payment_Paypal = document.getElementById('paypal');
let payment_Bitcoin = document.getElementById('bitcoin');
payment_Options.firstElementChild.selected = "true"; //make credit card default option
payment_Paypal.style.display = 'none'; //hide on load
payment_Bitcoin.style.display = 'none'; //hide on load
payment_Options.addEventListener('change', (e) => {
	if (e.target.value === 'credit-card') {
		showPaymentOption(payment_CC);
	} else if (e.target.value === 'paypal') {
		showPaymentOption(payment_Paypal);
	} else if (e.target.value === 'bitcoin') {
		showPaymentOption(payment_Bitcoin);
	}
});

function showPaymentOption(paymentOption) {
	//reset all payment options
	payment_CC.style.display = 'none';
	payment_Paypal.style.display = 'none';
	payment_Bitcoin.style.display = 'none';
	//show desired option
	paymentOption.style.display = 'block';
}

/*==========================================================================
-----------------------------  Form Validation -----------------------------
============================================================================*/

let form = document.querySelector('form');
let nameF = document.getElementById('name');
let email = document.getElementById('email');
let cc_ExpM = document.getElementById('exp-month');
let cc_ExpY = document.getElementById('exp-year');
let cc_Num = document.getElementById('cc-num');
let cc_Zip = document.getElementById('zip');
let cc_Cvv = document.getElementById('cvv');

function showErrors(element) {
	element.parentElement.classList.add("not-valid");
	element.parentElement.classList.remove("valid");
	element.parentElement.lastElementChild.style.display = 'block';
}

function showValid(element) {
	element.parentElement.classList.add("valid");
	element.parentElement.classList.remove("not-valid");
	element.parentElement.lastElementChild.style.display = 'none';
}

function isValidEmil () {
	if (/^[^@]+@([a-z]|\d|-)+.com$/.test(email.value)) { //test for usual email format
		showValid(email);
	} else {
		showErrors(email);
	}
}

function isValidName() {
	if (/[a-zA-Z]/.test(nameF.value)) { //test for at least one letter
		showValid(nameF);
		return true;
	} else {
		showErrors(nameF);
		return false;
	}
}

function hasActivitySelected() {
	let hasActivity = false;
	//loop through all activites and check if at least one is selected
	for (let i = 0; i < activities_Inputs.length; i++) {
		if (activities_Inputs[i].checked) {
			hasActivity = true;
			break;
		}
	}
	if (hasActivity) {
		showValid(activities_Inputs[0].closest('DIV'));
		return true;
	} else {
		showErrors(activities_Inputs[0].closest('DIV'));
		return false;
	}
}

function checkCCExpM () {
	if (cc_ExpM.value !== 'Select Date') {
		showValid(cc_ExpM);
	} else {
		showErrors(cc_ExpM);
	}
}

function checkCCExpY () {
	if (cc_ExpY.value !== 'Select Year') {
		showValid(cc_ExpY);
	} else {
		showErrors(cc_ExpY);
	}
}

function hasValidCreditCard() {
	let validDetails = true;
	function checkCCdetails (CCcomponent) {
		if (!CCcomponent.parentElement.classList.contains('valid')) {
			validDetails = false;
			showErrors(CCcomponent);
		}
	}
	//validate credit card exp month
	checkCCExpM();
	//validate credit card exp year
	checkCCExpY();
	//confirm each credit card compenent has been validated
	checkCCdetails(cc_ExpM);
	checkCCdetails(cc_ExpY);
	checkCCdetails(cc_Num);
	checkCCdetails(cc_Zip);
	checkCCdetails(cc_Cvv);
	return validDetails;
}

/*-----------------------  Real Time Validation  -------------------------*/

//validate email
email.addEventListener('keyup', isValidEmil);

//validate credit card number
cc_Num.addEventListener('keyup', () => {
	if (/^\d{13,16}$/.test(cc_Num.value)) {
		showValid(cc_Num);
	} else if (/[^\d]/.test(cc_Num.value)) {
		cc_Num.parentElement.lastElementChild.innerHTML = 'Card number must only contain numbers';
		showErrors(cc_Num);
	} else {
		cc_Num.parentElement.lastElementChild.innerHTML = 'Card number must be between 13 - 16 digits';
		showErrors(cc_Num);
	}
});

//validate credit card zip
cc_Zip.addEventListener('keyup', () => {
	if (/^\d{5}$/.test(cc_Zip.value)) {
		showValid(cc_Zip);
	} else if (/[^\d]/.test(cc_Zip.value)) {
		cc_Zip.parentElement.lastElementChild.innerHTML = 'Zip Code must only contain numbers';
		showErrors(cc_Zip);
	} else {
		cc_Zip.parentElement.lastElementChild.innerHTML = 'Zip Code must be 5 digits';
		showErrors(cc_Zip);
	}
});

//validate credit card cvv
cc_Cvv.addEventListener('keyup', () => {
	if (/^\d{3}$/.test(cc_Cvv.value)) {
		showValid(cc_Cvv);
	} else if (/[^\d]/.test(cc_Cvv.value)) {
		cc_Cvv.parentElement.lastElementChild.innerHTML = 'CVV must only contain numbers';
		showErrors(cc_Cvv);
	} else {
		cc_Cvv.parentElement.lastElementChild.innerHTML = 'CVV must be 3 digits';
		showErrors(cc_Cvv);
	}
});

/*==========================================================================
-----------------------------------  Submit --------------------------------
============================================================================*/

form.addEventListener('submit', (e) => {
	let nameV = isValidName();
	let emailV = email.parentElement.classList.contains('valid'); //confirm email has been validated
	let hasAct = hasActivitySelected();
	let creditV = true;
	if (payment_Options.value === 'credit-card') { //only validate CC if it is selected
		creditV = hasValidCreditCard();
	} 
	if (!nameV || !emailV || !hasAct || !creditV) { //check if error with any compenent
		e.preventDefault(); // prevent form submitting if there is an error
		isValidEmil(); //check if email is valid
		nameF.addEventListener('keyup', isValidName); //add real time validation for name
		activities_Container.addEventListener('change', hasActivitySelected); //add real time validation for activities
		cc_ExpM.addEventListener('change', checkCCExpM); //add real time validation for credit card expiry month
		cc_ExpY.addEventListener('change', checkCCExpY); //add real time validation for credit card expiry year
	}
});