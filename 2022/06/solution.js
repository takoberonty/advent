/*
bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 5
nppdvjthqldpwncqszvftbrmjlhg: first marker after character 6
nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 10
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 11
*/

const fs = require("fs");

const lines = fs.readFileSync("input.dat", "utf8").split("\n");

function part1(length = 4) {
	let sequence = [];
	for (let i = 0; i < lines[0].length; i++) {
		sequence.push(lines[0][i]);

		if (sequence.length < length) {
			continue;
		}

		const chars = sequence.reduce((acc, cur) => {
			acc[cur] = 1;
			return acc;
		}, {});

		if (Object.keys(chars).length === length) {
			console.log(i + 1);
			break;
		}

		sequence = sequence.slice(1);
	}
}

function part2() {
	part1(14);
}

part1();
part2();
