// open input.dat file and read each line
const fs = require("fs");

const input = fs.readFileSync("input.dat", "utf8").split("\n");

// 157
function part1() {
	const priorityKeys = [];
	input.forEach((line) => {
		const l0 = line.slice(0, line.length / 2);
		const l1 = line.slice(line.length / 2);

		// count occurrences of each character
		const c0 = {};
		const c1 = {};
		for (let i = 0; i < l0.length; i++) {
			c0[l0[i]] = (c0[l0[i]] || 0) + 1;
			c1[l1[i]] = (c1[l1[i]] || 0) + 1;
		}

		// find the most common character in each half
		const m0 = Object.keys(c0).reduce((a, b) => (c0[a] > c0[b] ? a : b));
		const m1 = Object.keys(c1).reduce((a, b) => (c1[a] > c1[b] ? a : b));

		// find common characters in both halves
		const common = Object.keys(c0).filter((c) => c1[c]);
		priorityKeys.push(...common);
	});

	// convert to ascii values
	const priority = convertToPriority(priorityKeys);

	const sum = priority.reduce((a, b) => a + b);

	console.log(sum);
}

function part2() {
	const priorityKeys = [];

	let lineCount = 0;
	let currentGroup = [];
	const groupedInput = input.reduce((acc, line) => {
		if (lineCount < 3) {
			currentGroup.push(line);
			lineCount++;
		}

		if (lineCount === 3) {
			lineCount = 0;
			acc.push(currentGroup);
			currentGroup = [];
		}

		return acc;
	}, []);

	console.log(groupedInput);
	groupedInput.forEach((group) => {
		for (var i = 0; i < group[0].length; i++) {
			const c = group[0].charAt(i);
			if (group[1].includes(c) && group[2].includes(c)) {
				priorityKeys.push(c);
				break;
			}
		}
	});

	// convert to ascii values
	console.log(priorityKeys);
	const priority = convertToPriority(priorityKeys);

	const sum = priority.reduce((a, b) => a + b);

	console.log(sum);
}

function convertToPriority(priorityKeys) {
	return priorityKeys.map((c) => {
		const code = c.charCodeAt(0);
		const offset = code >= 96 ? 96 : 38;
		return code - offset;
	});
}

part1();
part2();
