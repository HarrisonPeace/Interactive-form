// JavaScript Document

/*==========================================================================
------------------------------    Job Role  --------------------------------
============================================================================*/

let jobRole = document.getElementById('title')
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

let Tshirt_design = document.getElementById('design')
let Tshirt_color = document.getElementById('color')
let Tshirt_colorOptions = Tshirt_color.querySelectorAll('[data-theme]')

//show colors of design once a design has been choosen
Tshirt_design.addEventListener('change', (e) => {
	Tshirt_color.removeAttribute('disabled')
	function displayColors (design) {
		for (let i = 0; i < Tshirt_colorOptions.length; i++) {
			if (Tshirt_colorOptions[i].getAttribute('data-theme') === design) {
				Tshirt_colorOptions[i].style.display = 'initial'
			} else {
				Tshirt_colorOptions[i].style.display = 'none'
			}
		}
	}
	if (e.target.value === 'heart js') {
		displayColors('heart js')
	} else if (e.target.value === 'js puns') {
		displayColors('js puns')
	}
});

/*==========================================================================
-------------------------------    T-shirt  --------------------------------
============================================================================*/

let activities_Container = document.getElementById('activities');
let activities_Cost = document.getElementById('activities-cost');
let activities_Inputs = activities_Container.querySelectorAll('input')
let costTracker = 0;

activities_Container.addEventListener('change', (e) => {
    if (e.target.checked) {
        costTracker += parseInt(e.target.getAttribute('data-cost'));
    } else {
        costTracker -= parseInt(e.target.getAttribute('data-cost'));
    } 
	activities_Cost.innerHTML = `Total: $${costTracker}`

	for (let i = 0; i < activities_Inputs.length; i++) {
		let isMatch = false;
		let Act_i = activities_Inputs[i];	
			for (let j = 0; j < activities_Inputs.length; j++) {
				let Act_j = activities_Inputs[j];
				if (i !== j && Act_i.getAttribute('data-day-and-time') == Act_j.getAttribute('data-day-and-time') && Act_j.checked) {
					isMatch = true;
					break
				} 
			} 
		if (isMatch) {
			Act_i.setAttribute('disabled', '')
			Act_i.parentElement.className = 'disabled'
		} else {
			Act_i.removeAttribute('disabled')
			Act_i.parentElement.className = ''
		}
	}
});

