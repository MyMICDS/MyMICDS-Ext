console.log('hello world!');

const table = document.querySelector('table#grades_summary');
const assignments = table.querySelectorAll('tr.student_assignment.assignment_graded');

// console.log(assignments);

const categoriesReceived = {};
const categoriesTotal = {};

// Go through assignments and calculate grade and category they're in
for (const assignment of assignments) {

	const category = assignment.querySelector('th.title .context').textContent;

	const gradeChildren = assignment.querySelector('td.assignment_score .grade').childNodes;
	// Only get top-level text from the grade; not its children
	let gradeText = '';
	for (const child of gradeChildren) {
		if (child.nodeType === Node.TEXT_NODE) {
			gradeText += child.textContent;
		}
	}

	const pointsReceived = parseFloat(gradeText, 10);
	const pointsPossible = parseFloat(assignment.querySelector('td.points_possible').textContent, 10);
	console.log('points received', pointsReceived, 'out of', pointsPossible);
	categoriesReceived[category] = (categoriesReceived[category] || 0) + pointsReceived;
	categoriesTotal[category] = (categoriesTotal[category] || 0) + pointsPossible;
}

console.log('total', categoriesReceived, categoriesTotal);

// Go through the categories at the end and insert percentages in their respective row
const categories = table.querySelectorAll('tr.student_assignment.hard_coded.group_total');

console.log('categories', categories);

for (const category of categories) {
	console.log('cateogyr)')
	const title = category.querySelector('th.title').textContent.trim();
	const weight = parseFloat(category.querySelector('td.possible.points_possible').textContent);
	console.log(title, 'has weight of', weight);

	// Insert appropriate percentage
	category.querySelector('td.assignment_score .grade').textContent = (categoriesReceived[title] / categoriesTotal[title] * 100).toFixed(2) + '%';
}
