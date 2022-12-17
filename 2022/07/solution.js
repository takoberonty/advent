const fs = require("fs");

const lines = fs.readFileSync("input.dat", "utf8").split("\n");

// Find all of the directories with a total size of at most 100000.
// What is the sum of the total sizes of those directories?
function part1() {
	let total = 0;
	let current = 0;
	let path = [];
	let paths = {};
	lines.forEach((line) => {
		if (line.startsWith("$ cd")) {
			if (line.startsWith("$ cd /")) {
				path = [];
			} else if (line.startsWith("$ cd ..")) {
				path.pop();
			} else if (line.startsWith("$ cd ")) {
				path.push(line.split(" ")[2]);
			}
		} else if (line.startsWith("$ ls")) {
			// current = 0;
		} else if (line.startsWith("dir ")) {
			return;
		} else {
			// current += parseInt(line.split(" ")[0]);
			const size = parseInt(line.split(" ")[0]);
			let p = "";
			path.forEach((dir) => {
				p += dir;
				paths[p] = Boolean(paths[p]) ? paths[p] + size : size;
				p += "/";
			});
		}
	});
	Object.values(paths).forEach((value) => {
		if (value <= 100000) {
			total += value;
		}
	});
	console.log(total);
	return paths;
}

// Find the smallest directory that, if deleted, would free up enough space on the filesystem to run the update.
// What is the total size of that directory?
function part2() {
	const total = 70000000;
	const target = 30000000;
	const paths = part1();

	let used = 0;
	for (const [key, value] of Object.entries(paths)) {
		if (!key.includes("/")) {
			used += value;
		}
	}
	const free = total - used;
	const needed = target - free;

	const size = Object.values(paths)
		.filter((v) => v >= needed)
		.sort((a, b) => a - b)[0];

	console.log(size);
}

part1();
part2();
