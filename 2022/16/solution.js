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
	const start = new Date().getTime();

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

	const maxValves = Object.keys(valves).filter((v) => valves[v].rate > 0);

	const search = ({
		valve,
		time,
		pressure,
		open = [],
		path = [],
		wander = [],
		skip = false,
	}) => {
		let currentValve = valve;
		let currentTime = time;
		let currentPressure = pressure;
		let currentOpen = open.slice();
		let currentPath = [...path, currentValve];
		let currentWander = wander || [];
		let choices = [];

		// We should never hit maxDepth if we are detecting loops correctly
		const maxDepth = Object.keys(valves).length * 2;
		if (open.length === maxValves.length || currentPath.length > maxDepth) {
			return {
				valve,
				time: currentTime,
				pressure: currentPressure,
				open: currentOpen,
				path: currentPath,
			};
		}

		if (!skip) {
			const result = search({
				valve,
				time,
				pressure,
				open,
				path,
				wander,
				skip: true,
			});
			if (result) {
				choices.push(result);
			}
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
			}
			currentWander = [];
		} else if (skip) {
			currentWander.push(currentValve);
		}

		if (currentTime > 0) {
			currentTime--;
			valves[currentValve].tunnels.forEach((tunnel) => {
				// const loopy = currentWander.includes(tunnel);
				// if (!loopy) {
				const previous =
					currentPath.length > 1 ? currentPath[currentPath.length - 2] : null;
				if (currentWander.length === 0 || tunnel !== previous) {
					const result = search({
						valve: tunnel,
						time: currentTime,
						pressure: currentPressure,
						open: currentOpen,
						path: currentPath,
						wander: currentWander,
					});

					if (result) {
						choices.push(result);
					}
				}
			});
		}

		choices.push({
			valve,
			time: currentTime,
			pressure: currentPressure,
			open: currentOpen,
			path: currentPath,
		});

		return choices.filter(Boolean).sort((a, b) => b.pressure - a.pressure)[0];
	};

	const best = search({
		valve: currentValve,
		time: 30,
		pressure: 0,
	});

	console.log("Best Path:", best);

	const end = new Date().getTime();
	console.log("Completed in", end - start, "ms");
}

function part2() {
	// const start = new Date().getTime();
	// const end = new Date().getTime();
	// console.log("Completed in ", end - start, "ms");
}

part1();
part2();
