const fs = require("fs");

const lines = fs.readFileSync("input.dat", "utf8").split("\n");

const valves = {
	// {
	//     valve: 'AA',
	//     rate:0,
	//     tunnels: [ 'DD', 'II', "BB"],
	// }
};

// Work out the steps to release the most pressure in 30 minutes.
// What is the most pressure you can release?
function part1() {
	// parse the input
	let currentValve;
	lines.forEach((line) => {
		const [valve, tunnels] = line.split(";");
		const valveTokens = valve.split(" ");
		if (!currentValve) {
			currentValve = valveTokens[1];
		}
		valves[valveTokens[1]] = {
			rate: parseInt(valveTokens[4].split("=")[1]),
			tunnels: tunnels
				.trim()
				.split(" ")
				.slice(4)
				.map((v) => v.replace(",", "")),
		};
	});
	console.log("valves", valves);

	const openableValves = Object.keys(valves).filter((v) => valves[v].rate > 0);
	console.log("openableValves", openableValves);

	const search = ({ valve, time, pressure, open, path }, skip) => {
		let currentValve = valve;
		let currentTime = time;
		let currentPressure = pressure;
		let currentOpen = open.slice();
		let currentPath = [...path, currentValve];
		let currentValveOpen = false;
		let choices = [];

		const MAX_DEPTH = 20;
		if (
			Object.keys(valves).length === openableValves.length ||
			currentPath.length > MAX_DEPTH
		) {
			return {
				valve,
				time: currentTime,
				pressure: currentPressure,
				open: currentOpen,
				path: currentPath,
			};
		}

		if (!skip) {
			const result = search({ valve, time, pressure, open, path }, true);
			choices.push(result);
		}

		if (
			!currentOpen.includes(currentValve) &&
			valves[currentValve].rate > 0 &&
			!skip
		) {
			currentTime--;
			if (currentTime > 0) {
				currentPressure += valves[currentValve].rate * currentTime;
				currentOpen.push(currentValve);
				currentValveOpen = true;
			}
		}

		if (currentTime > 0) {
			currentTime--;
			valves[currentValve].tunnels.forEach((tunnel) => {
				// ??? this should actually reverse check path for loops that have not been opened
				const previous =
					currentPath.length > 1 ? currentPath[currentPath.length - 2] : null;

				if (currentValveOpen || tunnel !== previous) {
					const result = search({
						valve: tunnel,
						time: currentTime,
						pressure: currentPressure,
						open: currentOpen,
						path: currentPath,
					});

					choices.push(result);
				}
			});
		}

		return choices.sort((a, b) => b.pressure - a.pressure)[0];
	};

	const best = search({
		valve: currentValve,
		time: 30,
		pressure: 0,
		open: [],
		path: [],
	});

	console.log("Best Path:", best);
}

function part2() {}

part1();
part2();
