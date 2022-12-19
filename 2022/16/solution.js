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
		// console.log({ valve, time, pressure, open, path }, skip);
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

			// ??? not sure if this is a good idea
			// currentTime = 0;
		}

		if (!skip) {
			const result = search({ valve, time, pressure, open, path }, true);
			// if (result.open.length > currentOpen.length) {
			choices.push(result);
			// }
		}

		// console.log("time", currentTime, "skip", skip);
		if (
			!currentOpen.includes(currentValve) &&
			valves[currentValve].rate > 0 &&
			!skip
		) {
			currentTime--;
			if (currentTime > 0) {
				// console.log("OPEN!!!!!");
				currentPressure += valves[currentValve].rate * currentTime;
				// console.log("pressure", currentPressure);
				currentOpen.push(currentValve);
				currentValveOpen = true;
			}
		} else {
			// console.log("WTF", valves[currentValve], currentOpen, currentValve, skip);
		}

		// There might be a need to continue searching through visited tunnels
		// if (
		// 	currentTime === 0 //||
		// 	// valves[currentValve].tunnels.every((v) => currentOpen.includes(v))
		// ) {
		// 	return {
		// 		valve,
		// 		time: currentTime,
		// 		pressure: currentPressure,
		// 		open: currentOpen,
		// 		path: currentPath,
		// 	};
		// }

		if (currentTime > 0) {
			currentTime--;
			valves[currentValve].tunnels.forEach((tunnel) => {
				// if (!currentOpen.includes(tunnel)) {
				// ??? this should actually reverse check path for loops that have not been opened
				const previous =
					currentPath.length > 1 ? currentPath[currentPath.length - 2] : null;
				// if (!currentValveOpen && tunnel !== previous) {
				// if (tunnel !== previous) {
				if (currentValveOpen || tunnel !== previous) {
					// console.log("search", {
					// 	valve: tunnel,
					// 	time: currentTime,
					// 	pressure: currentPressure,
					// 	open: currentOpen,
					// 	path: currentPath,
					// });
					const result = search({
						valve: tunnel,
						time: currentTime,
						pressure: currentPressure,
						open: currentOpen,
						path: currentPath,
					});
					// console.log("result", result);
					// if (result?.open.length > currentOpen.length) {
					choices.push(result);
					// }
				}
			});
		}

		// console.log("choices", choices);
		return choices.sort((a, b) => b.pressure - a.pressure)[0];
	};

	// const search = ({ valve, time, pressure, visited }, skip) => {
	// 	let currentValve = valve;
	// 	let currentTime = time;
	// 	let currentPressure = pressure;
	// 	let currentVisited = visited.slice();
	// 	const choices = [];

	// 	if (!skip) {
	// 		choices.push(search({ valve, time, pressure, visited }, true));
	// 	}

	// 	currentVisited.push(currentValve);
	// 	if (valves[currentValve].rate > 0 && !skip) {
	// 		currentTime--;
	// 		if (currentTime > 0) {
	// 			currentPressure += valves[currentValve].rate * currentTime;
	// 		}
	// 	}

	// 	// There might be a need to continue searching through visited tunnels
	// 	if (
	// 		currentTime === 0 ||
	// 		valves[currentValve].tunnels.every((v) => currentVisited.includes(v))
	// 	) {
	// 		return { valve, time: currentTime, pressure: currentPressure, visited };
	// 	}

	// 	currentTime--;
	// 	valves[currentValve].tunnels.forEach((tunnel) => {
	// 		if (!currentVisited.includes(tunnel)) {
	// 			choices.push(
	// 				search({
	// 					valve: tunnel,
	// 					time: currentTime,
	// 					pressure: currentPressure,
	// 					visited: currentVisited,
	// 				})
	// 			);
	// 		}
	// 	});

	// 	return choices.sort((a, b) => b.pressure - a.pressure)[0];
	// };

	// const search = ({ valve, time, pressure, visited }) => {
	// 	let currentValve = valve;
	// 	let currentTime = time;
	// 	let currentPressure = pressure;
	// 	let currentVisited = visited.slice();

	// 	currentVisited.push(currentValve);
	// 	if (valves[currentValve].rate > 0) {
	// 		currentTime--;
	// 		if (currentTime > 0) {
	// 			currentPressure += valves[currentValve].rate * currentTime;
	// 		}
	// 	}

	// 	// There might be a need to continue searching through visited tunnels
	// 	if (
	// 		currentTime === 0 ||
	// 		valves[currentValve].tunnels.every((v) => currentVisited.includes(v))
	// 	) {
	// 		return { valve, time: currentTime, pressure: currentPressure, visited };
	// 	}

	// 	const choices = [];
	// 	currentTime--;
	// 	valves[currentValve].tunnels.forEach((tunnel) => {
	// 		if (!currentVisited.includes(tunnel)) {
	// 			choices.push(
	// 				search({
	// 					valve: tunnel,
	// 					time: currentTime,
	// 					pressure: currentPressure,
	// 					visited: currentVisited,
	// 				})
	// 			);
	// 		}
	// 	});

	// 	return choices.sort((a, b) => b.pressure - a.pressure)[0];
	// };

	const best = search({
		valve: currentValve,
		time: 30,
		pressure: 0,
		open: [],
		path: [],
	});

	console.log("BEST:", best);

	// const search = ({ valve, time, pressure, visited }) => {
	// 	let currentValve = valve;
	// 	let currentTime = time;
	// 	let currentPressure = pressure;
	// 	let currentVisited = visited.slice();

	// 	currentVisited.push(currentValve);
	// 	if (valves[currentValve].rate > 0) {
	// 		currentTime--;
	// 		currentPressure += valves[currentValve].rate * currentTime;
	// 	}

	// 	// There might be a need to continue searching through visited tunnels
	// 	if (valves[currentValve].tunnels.every((v) => currentVisited.includes(v))) {
	// 		currentValve = null;
	// 		return [{ valve, time, pressure, visited }];
	// 	}

	// 	const choices = [];
	// 	valves[currentValve].tunnels.forEach((tunnel) => {
	// 		if (!currentVisited.includes(tunnel)) {
	// 			choices.push(
	// 				...search({
	// 					valve: tunnel,
	// 					time: currentTime,
	// 					pressure: currentPressure,
	// 					visited: currentVisited,
	// 				})
	// 			);
	// 		}
	// 	});

	// 	return choices;
	// };

	// let time = 30;
	// let pressure = 0;
	// let visited = [];
	// const choices = search({ valve: currentValve, time, pressure, visited });

	// console.log(best);
}
// function part1() {
// 	// parse the input
// 	let currentValve;
// 	lines.forEach((line) => {
// 		const [valve, tunnels] = line.split(";");
// 		const valveTokens = valve.split(" ");
// 		if (!currentValve) {
// 			currentValve = valveTokens[1];
// 		}
// 		valves[valveTokens[1]] = {
// 			rate: parseInt(valveTokens[4].split("=")[1]),
// 			tunnels: tunnels
// 				.trim()
// 				.split(" ")
// 				.slice(4)
// 				.map((v) => v.replace(",", "")),
// 		};
// 	});

// 	let time = 30;
// 	let pressure = 0;
// 	let visited = [];
// 	while (time > 0) {
// 		visited.push(currentValve);
// 		console.log(visited, pressure);
// 		if (valves[currentValve].rate > 0) {
// 			time--;
// 			pressure += valves[currentValve].rate * time;
// 		}

// 		if (valves[currentValve].tunnels.every((v) => visited.includes(v))) {
// 			currentValve = null;
// 			break;
// 		}

// 		// find the next valve
// 		time--;
// 		currentValve = valves[currentValve].tunnels
// 			.filter((v) => !visited.includes(v))
// 			.sort((a, b) => {
// 				return valves[b].rate - valves[a].rate;
// 			})
//             [0];
// 	}

// 	console.log(pressure);
// }

function part2() {}

part1();
part2();
