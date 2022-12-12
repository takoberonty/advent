const fs = require("fs");

const lines = fs.readFileSync("input.dat", "utf8").split("\n");

// In how many assignment pairs does one range fully contain the other?
function part1() {
	let count = 0;

	lines.forEach((line) => {
		const [r0, r1] = line.split(",").map((range) => {
			const [min, max] = range.split("-").map(Number);
			return { min, max };
		});
		if (
			(r0.min <= r1.min && r0.max >= r1.max) ||
			(r1.min <= r0.min && r1.max >= r0.max)
		) {
			count++;
		}
	});

	console.log(count);
}

// Any overlap at all?
function part2() {
	let count = 0;

	lines.forEach((line) => {
		const [r0, r1] = line.split(",").map((range) => {
			const [min, max] = range.split("-").map(Number);
			return { min, max };
		});
		if (
			(r0.min <= r1.min && r0.max >= r1.max) ||
			(r1.min <= r0.min && r1.max >= r0.max)
		) {
			count++;
		} else if (r0.min >= r1.min && r0.min <= r1.max) {
			count++;
		} else if (r0.max >= r1.min && r0.max <= r1.max) {
			count++;
		}
	});

	console.log(count);
}

part1();
part2();
