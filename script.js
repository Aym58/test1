"use strict";
const subminBtn = document.getElementById("submit");
const nameInp = document.getElementById("name-input");
const emailInp = document.getElementById("email-input");
const oneHourSelect = document.getElementById("1-hour");
const oneAndHalfHourSelect = document.getElementById("1,5-hour");
const monthSelectButton = document.getElementById("month-btn");
const daySelectButton = document.getElementById("day-btn");
const selectorField = document.getElementById("selector-field");
const selectTimeBtn = document.getElementById("selectTimeBtn");
const submitBtn = document.getElementById("submitBtn");

let duration;
for (let i = 0; i < 2; i++) {
	let durationSelect = document.getElementById(`duration-${i}`);
	durationSelect.addEventListener("click", function () {
		const durationUnSelect = document.getElementById(
			`duration-${i === 1 ? 0 : 1}`
		);
		i == 0 ? (duration = "1 hour") : (duration = "1,5 hours");
		durationSelect.classList.add("dur-selected");
		durationSelect.classList.remove("dur-unselected");
		durationUnSelect.classList.add("dur-unselected");
		durationUnSelect.classList.remove("dur-selected");
	});
}

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth();
let yyyy = today.getFullYear();

let months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Sep",
	"Nov",
	"Dec",
];

let days = [
	"31",
	"28",
	"31",
	"30",
	"31",
	"30",
	"31",
	"31",
	"30",
	"31",
	"30",
	"31",
];

let times = [
	"08:00",
	"08:30",
	"09:00",
	"09:30",
	"10:00",
	"10:30",
	"11:00",
	"11:30",
	"12:00",
	"12:30",
	"13:00",
	"13:30",
	"14:00",
	"14:30",
	"15:00",
];

console.log(months[5]);

today = `${String(dd).padStart(2, "0")}.${String(mm).padStart(2, "0")}.${yyyy}`;

document.getElementById("year").innerHTML = yyyy;
monthSelectButton.innerHTML = months[mm];

daySelectButton.innerHTML = String(dd).padStart(2, "0");

let selectedMonth = mm;
let selectedDay = Number(String(dd).padStart(2, "0"));
let selectedTime;

const setMonth = (m) => {
	selectedMonth = m;
	console.log(selectedMonth);
};

const setDay = (d) => {
	selectedDay = d;
	console.log(selectedDay);
};

const setTime = (t) => {
	selectedTime = times[t];
	console.log(selectedTime);
};

function sendEmail() {
	Email.send({
		SecureToken: "<paste security token that we just generated>",
		To: "aymuntian@gmail.com",
		From: "aym58@ukr.net",
		Subject: "Test email",
		Body: "<html><h2>Header</h2><strong>Bold text</strong><br></br><em>Italic</em></html>",
	}).then(() => alert("mail sent successfully"));
}

const submit = () => {
	console.log(
		`Sludent name: ${nameInp.value},\nlesson at ${selectedTime} on ${selectedDay}.${selectedMonth}.${yyyy}\nLesson lenght: ${duration}`
	);
	sendEmail();
};

const submitTime = () => {
	selectorField.innerHTML = "";
	const el = selectorField.appendChild(document.createElement("div"));
	el.setAttribute("class", "time-selected");
	el.innerHTML = selectedTime;
};

const selectMonthFunc = () => {
	selectorField.innerHTML = "";
	for (let i = mm; i <= mm + 1; i++) {
		const el = selectorField.appendChild(document.createElement("div"));
		el.setAttribute("class", "date-input-month");
		el.setAttribute("id", `date-input-month-${i}`);
		el.innerHTML = months[i];
		document
			.getElementById(`date-input-month-${i}`)
			.addEventListener("click", () => {
				setMonth(i);
				monthSelectButton.innerHTML = months[i];
				selectorField.innerHTML = "";
			});
	}
};

const selectDayFunc = () => {
	let d, m;
	selectorField.innerHTML = "";
	if (mm === selectedMonth) {
		d = dd;
	} else {
		d = 1;
	}
	for (let i = d; i <= days[selectedMonth]; i++) {
		const el = selectorField.appendChild(document.createElement("div"));
		el.setAttribute("class", "date-input-day");
		el.setAttribute("id", `date-input-day-${i}`);
		el.innerHTML = String(i).padStart(2, "0");
		document
			.getElementById(`date-input-day-${i}`)
			.addEventListener("click", () => {
				setDay(i);
				daySelectButton.innerHTML = String(i).padStart(2, "0");
				selectorField.innerHTML = "";
			});
	}
};

const selectTimeFunc = () => {
	selectorField.innerHTML = "";
	for (let i = 0; i < times.length; i++) {
		const el = selectorField.appendChild(document.createElement("div"));
		el.setAttribute("class", "date-input-time");
		el.setAttribute("id", `date-input-time-${i}`);
		el.innerHTML = times[i];
		document
			.getElementById(`date-input-time-${i}`)
			.addEventListener("click", () => {
				setTime(i);
				submitTime();
			});
	}
};

daySelectButton.addEventListener("click", selectDayFunc);

monthSelectButton.addEventListener("click", selectMonthFunc);

selectTimeBtn.addEventListener("click", selectTimeFunc);

submitBtn.addEventListener("click", sendEmail);
