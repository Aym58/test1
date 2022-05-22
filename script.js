"use strict";
const subminBtn = document.getElementById("submit");
const nameInp = document.getElementById("name-input");
const emailInp = document.getElementById("email-input");
const oneHourSelect = document.getElementById("1-hour");
const oneAndHalfHourSelect = document.getElementById("1,5-hour");
let duration;

for (let i = 0; i < 2; i++) {
	let durationSelect = document.getElementById(`duration-${i}`);
	durationSelect.addEventListener("click", function () {
		const durationUnSelect = document.getElementById(
			`duration-${i === 1 ? 0 : 1}`
		);
		duration = i;
		durationSelect.classList.add("dur-selected");
		durationSelect.classList.remove("dur-unselected");
		durationUnSelect.classList.add("dur-unselected");
		durationUnSelect.classList.remove("dur-selected");
	});
}

const submitFunc = () => {
	const name = nameInp.value;
	const email = emailInp.value;
	if (name && email) {
		console.log("Submitted!");
		console.log(name);
		console.log(email);
	} else {
		console.log("Not submitted!");
	}
};

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth();
let yyyy = today.getFullYear();

today = `${String(dd).padStart(2, "0")}.${String(mm).padStart(2, "0")}.${yyyy}`;

document.getElementById("year").innerHTML = yyyy;

console.log(today);

subminBtn.addEventListener("click", submitFunc);
