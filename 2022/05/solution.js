const fs = require("fs");

const lines = fs.readFileSync("input.dat", "utf8").split("\n");

function part1() {
	// const stacks = {
	// 	1: ["Z", "N"],
	// 	2: ["M", "C", "D"],
	// 	3: ["P"],
	// 	4: [],
	// 	5: [],
	// 	6: [],
	// 	7: [],
	// 	8: [],
	// 	9: [],
	// };
	const stacks = {
		1: ["S", "C", "V", "N"],
		2: ["Z", "M", "J", "H", "N", "S"],
		3: ["M", "C", "T", "G", "J", "N", "D"],
		4: ["T", "D", "F", "J", "W", "R", "M"],
		5: ["P", "F", "H"],
		6: ["C", "T", "Z", "H", "J"],
		7: ["D", "P", "R", "Q", "F", "S", "L", "Z"],
		8: ["C", "S", "L", "H", "D", "F", "P", "W"],
		9: ["D", "S", "M", "P", "F", "N", "G", "Z"],
	};

	lines.forEach((line) => {
		// move 1 from 2 to 3
		const command = line.split(" ");
		const count = Number(command[1]);
		const from = command[3];
		const to = command[5];

		for (let i = 0; i < count; i++) {
			stacks[to].push(stacks[from].pop());
		}
	});

	const top = Object.values(stacks)
		.map((stack) => stack.slice(-1))
		.join("");
	console.log(top);
}

// Keep order
function part2() {
	// const stacks = {
	// 	1: ["Z", "N"],
	// 	2: ["M", "C", "D"],
	// 	3: ["P"],
	// 	4: [],
	// 	5: [],
	// 	6: [],
	// 	7: [],
	// 	8: [],
	// 	9: [],
	// };
	const stacks = {
		1: ["S", "C", "V", "N"],
		2: ["Z", "M", "J", "H", "N", "S"],
		3: ["M", "C", "T", "G", "J", "N", "D"],
		4: ["T", "D", "F", "J", "W", "R", "M"],
		5: ["P", "F", "H"],
		6: ["C", "T", "Z", "H", "J"],
		7: ["D", "P", "R", "Q", "F", "S", "L", "Z"],
		8: ["C", "S", "L", "H", "D", "F", "P", "W"],
		9: ["D", "S", "M", "P", "F", "N", "G", "Z"],
	};

	lines.forEach((line) => {
		// move 1 from 2 to 3
		const command = line.split(" ");
		const count = Number(command[1]);
		const from = command[3];
		const to = command[5];

		const crane = [];
		for (let i = 0; i < count; i++) {
			crane.push(stacks[from].pop());
		}
		stacks[to].push(...crane.reverse());
	});

	const top = Object.values(stacks)
		.map((stack) => stack.slice(-1))
		.join("");
	console.log(top);
}

part1();
part2();
