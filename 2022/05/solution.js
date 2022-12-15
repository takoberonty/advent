const fs = require("fs");

const lines = fs.readFileSync("input.dat", "utf8").split("\n");

function parseStacks() {
	let rawStacks;
	const stacks = {};
	let commands;

	for (let i = 0; i < lines.length; i++) {
		if (lines[i].trim() === "") {
			rawStacks = lines.slice(0, i);
			commands = lines.slice(i + 1);
		}
	}

	for (let i = rawStacks.length - 1; i >= 0; i--) {
		if (i === rawStacks.length - 1) {
			rawStacks[i].split("   ").forEach((stack) => {
				stacks[stack.trim()] = [];
			});
		} else {
			// remove all whitespace
			const values = [];
			for (let j = 0; j < rawStacks[i].length; j += 4) {
				const value = rawStacks[i]
					.slice(j, j + 3)
					.trim()
					.replace("[", "")
					.replace("]", "");
				values.push(value || "");
			}

			for (let j = 0; j < values.length; j++) {
				const key = (j + 1).toString();
				if (!stacks[key]) {
					continue;
				}

				if (values[j] !== "") {
					stacks[key].push(values[j]);
				}
			}
		}
	}

	console.log([stacks, commands]);
	return [stacks, commands];
}

function part1() {
	const [stacks, commands] = parseStacks(lines);

	commands.forEach((line) => {
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
	const [stacks, commands] = parseStacks(lines);

	commands.forEach((line) => {
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
part2(); // QNDWLMGNS
