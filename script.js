
let countdown
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
let done = new Audio('done.wav');


function timer(seconds) {
	clearInterval(countdown);
	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);

	countdown = setInterval(() => {
	const secondsLeft = Math.round((then - Date.now()) / 1000);
		if(secondsLeft < 0){
			done.play();
			clearInterval(countdown);
			return;
		}
		displayTimeLeft(secondsLeft);
	}, 1000);
}

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
	document.title = display;
	timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();
	endTime.textContent = `Ends at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}
function startTimer() {
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

function decWork() {
	const item = document.getElementById('work');
	const dispTime = Number(item.innerHTML.substring(5)) - 1;
	const dataTime = item.getAttribute('data-time');
	item.setAttribute('data-time', Number(dataTime) - 60)
	item.innerHTML = 'Work ' + dispTime
}
function incWork() {
	const item = document.getElementById('work');
	const dispTime = Number(item.innerHTML.substring(5)) + 1;
	const dataTime = item.getAttribute('data-time');
	item.setAttribute('data-time', Number(dataTime) + 60)
	item.innerHTML = 'Work ' + dispTime
}
function decBreak() {
	const item = document.getElementById('break');
	const dispTime = Number(item.innerHTML.substring(5)) - 1;
	const dataTime = item.getAttribute('data-time');
	item.setAttribute('data-time', Number(dataTime) - 60)
	item.innerHTML = 'Break ' + dispTime
}
function incBreak() {
	const item = document.getElementById('break');
	const dispTime = Number(item.innerHTML.substring(5)) + 1;
	const dataTime = item.getAttribute('data-time');
	item.setAttribute('data-time', Number(dataTime) + 60)
	item.innerHTML = 'Break ' + dispTime
}

buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function(e) {
	e.preventDefault();
	const mins = this.minutes.value;
	timer(mins *60);
	this.reset();
});
