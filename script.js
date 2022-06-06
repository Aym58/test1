const subminBtn = document.getElementById("submit");
const nameInp = document.getElementById("name-input");
const emailInp = document.getElementById("email-input");
const oneHourSelect = document.getElementById("1-hour");
const oneAndHalfHourSelect = document.getElementById("1,5-hour");
const monthSelectButton = document.getElementById("month-btn");
const daySelectButton = document.getElementById("day-btn");
const selectDurationField = document.querySelector(".select-duration");
const selectorField = document.getElementById("selector-field");
const selectTimeBtn = document.getElementById("selectTimeBtn");
const submitBtn = document.getElementById("submitBtn");

let today = new Date();
let dd = today.getDate();
let weekday = today.getDay();
let mm = today.getMonth();
let yyyy = today.getFullYear();
console.log(new Date(yyyy, mm, 1).getDay());
console.log(new Date(yyyy, mm, 1));

let weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
	"Oct",
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

today = `${String(dd).padStart(2, "0")}.${String(mm).padStart(2, "0")}.${yyyy}`;
document.getElementById("year").innerHTML = yyyy;
monthSelectButton.innerHTML = months[mm];
daySelectButton.innerHTML = String(dd).padStart(2, "0");
let selectedMonth = mm;
let selectedDay = Number(String(dd).padStart(2, "0"));
let selectedTime;

const setMonth = (m) => {
	selectedMonth = m;
};

const setDay = (d) => {
	selectedDay = d;
};

const setTime = (t) => {
	selectedTime = times[t];
};

let duration;
selectDurationField.addEventListener("click", function (e) {
	if (e.target.classList.contains("duration")) {
		e.target.parentElement.querySelectorAll(".duration").forEach((e) => {
			e.classList.add("dur-unselected");
			e.classList.remove("dur-selected");
		});
		e.target.classList.add("dur-selected");
		e.target.classList.remove("dur-unselected");
		duration = e.target.getAttribute("data-dur");
	}
});

const submit = () => {
	console.log(
		`Student name: ${nameInp.value},\nlesson at ${selectedTime} on ${selectedDay}.${selectedMonth}.${yyyy}\nLesson lenght: ${duration}`
	);
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
	selectorField.innerHTML = "";
	mm === selectedMonth ? (d = dd) : (d = 1);
	const startOfMonthDay = new Date(yyyy, selectedMonth, 1).getDay();
	for (let i = 1; i <= 7; i++) {
		const el = selectorField.appendChild(document.createElement("div"));
		el.classList.add("date-weekday");
		el.textContent = weekDays[i - 1];
	}

	for (let i = 1; i < startOfMonthDay; i++) {
		const el = selectorField.appendChild(document.createElement("div"));
		el.setAttribute("class", "date-input-day-filler");
		//	el.setAttribute("id", `date-input-day-${i}`);
	}

	for (let i = 1; i <= days[selectedMonth]; i++) {
		const el = selectorField.appendChild(document.createElement("div"));
		el.classList.add("date-input-day");
		el.setAttribute("id", `date-input-day-${i}`);
		el.innerHTML = String(i).padStart(2, "0");
		const wd = `${new Date(yyyy, selectedMonth, i)}`;
		if (wd.includes("Sun") || wd.includes("Sat")) {
			el.classList.add("date-input-day-weekend");
		}
		if (wd.includes("Sun")) {
			el.classList.add("date-input-day-sunday");
		}

		document
			.getElementById(`date-input-day-${i}`)
			.addEventListener("click", () => {
				setDay(i);
				daySelectButton.innerHTML = String(i).padStart(2, "0");
				selectorField.innerHTML = "";
				selectTimeFunc();
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
submitBtn.addEventListener("click", submit);
