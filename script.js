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
	e.preventDefault();
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

const submit = (e) => {
	e.preventDefault();
	console.log(
		`Student name: ${nameInp.value},\nlesson at ${selectedTime} on ${selectedDay}.${selectedMonth}.${yyyy}\nLesson lenght: ${duration}`
	);
};

const submitTime = (e) => {
	e.preventDefault();
	selectorField.innerHTML = "";
	const el = selectorField.appendChild(document.createElement("div"));
	el.setAttribute("class", "time-selected");
	el.innerHTML = selectedTime;
	fadeIn(el);
	el.addEventListener("click", (e) => {
		e.preventDefault();
		fadeOut(el);
		setTimeout(() => selectTimeFunc(), 100);
	});
};

const fadeIn = (el) => {
	el.style.transition = "all 0.1s linear";
	el.style.opacity = 0;
	setTimeout(() => (el.style.opacity = 1), 0);
};

const fadeOut = (el) => {
	el.style.transition = "all 0.1s linear";
	el.style.opacity = 1;
	setTimeout(() => (el.style.opacity = 0), 0);
};

const selectMonthFunc = (e) => {
	e.preventDefault();
	selectorField.innerHTML = "";
	for (let i = mm; i <= mm + 1; i++) {
		const el = selectorField.appendChild(document.createElement("div"));
		el.setAttribute("class", "date-input-month");
		el.setAttribute("id", `date-input-month-${i}`);
		el.innerHTML = months[i];
		fadeIn(el);
		if (i === selectedMonth) {
			el.classList.add("date-input-month-selected");
		}
		document
			.getElementById(`date-input-month-${i}`)
			.addEventListener("click", (e) => {
				e.preventDefault();
				setMonth(i);
				monthSelectButton.innerHTML = months[i];
				document
					.querySelectorAll(".date-input-month")
					.forEach((el) =>
						el.classList.remove("date-input-selected")
					);
				el.classList.add("date-input-selected");
				document
					.querySelectorAll(".date-input-month")
					.forEach((el) => fadeOut(el));
				setTimeout(() => (selectorField.innerHTML = ""), 100);
			});
	}
};

const selectDayFunc = (e) => {
	e.preventDefault();
	selectorField.innerHTML = "";
	mm === selectedMonth ? (d = dd) : (d = 1);
	const startOfMonthDay = new Date(yyyy, selectedMonth, 1).getDay();
	for (let i = 1; i <= 7; i++) {
		const el = selectorField.appendChild(document.createElement("div"));
		el.classList.add("day", "date-weekday");
		el.textContent = weekDays[i - 1];
		fadeIn(el);
	}

	for (let i = 1; i < startOfMonthDay; i++) {
		const el = selectorField.appendChild(document.createElement("div"));
		el.classList.add("day", "date-input-day-filler");
		fadeIn(el);
		//	el.setAttribute("id", `date-input-day-${i}`);
	}

	for (let i = 1; i <= days[selectedMonth]; i++) {
		const el = selectorField.appendChild(document.createElement("div"));
		el.classList.add("day", "date-input-day");
		el.setAttribute("id", `date-input-day-${i}`);
		el.innerHTML = String(i).padStart(2, "0");
		fadeIn(el);
		const wd = `${new Date(yyyy, selectedMonth, i)}`;
		if (wd.includes("Sun") || wd.includes("Sat")) {
			el.classList.add("day", "date-input-day-weekend");
		}
		if (wd.includes("Sun")) {
			el.classList.add("day", "date-input-day-sunday");
		}
		document
			.getElementById(`date-input-day-${i}`)
			.addEventListener("click", (e) => {
				e.preventDefault();
				setDay(i);
				daySelectButton.innerHTML = String(i).padStart(2, "0");

				document
					.querySelectorAll(".day")
					.forEach((el) =>
						el.classList.remove("date-input-selected")
					);
				e.target.classList.add("date-input-selected");

				document.querySelectorAll(".day").forEach((el) => fadeOut(el));
				setTimeout(() => (selectorField.innerHTML = ""), 100);
				setTimeout(() => selectTimeFunc(), 100);
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
		fadeIn(el);
		document
			.getElementById(`date-input-time-${i}`)
			.addEventListener("click", (e) => {
				document
					.querySelectorAll(".date-input-time")
					.forEach((el) =>
						el.classList.remove("date-input-selected")
					);
				e.target.classList.add("date-input-selected");

				document
					.querySelectorAll(".date-input-time")
					.forEach((el) => fadeOut(el));
				setTimeout(() => setTime(i), 100);
				setTimeout(() => submitTime(), 100);
			});
	}
};

daySelectButton.addEventListener("click", selectDayFunc);
monthSelectButton.addEventListener("click", selectMonthFunc);
submitBtn.addEventListener("click", submit);
