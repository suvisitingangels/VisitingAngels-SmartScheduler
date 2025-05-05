const today = new Date();

// Get full day formatted with leading zeroes
export default function getFullDate() {
	let fullDate = `${today.getFullYear()}-`;
	let month = today.getMonth() + 1;
	if (month > 9) {
		fullDate += `${month}-`;
	} else {
		fullDate += `0${month}-`;
	}
	let day = today.getDate();
	if (day > 9) {
		fullDate += `${day}`;
	} else {
		fullDate += `0${day}`;
	}
	return fullDate;
}