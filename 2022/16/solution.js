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
	let maxPressure = 0;

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
		let currentWander = wander.slice();
		let choices = [];

		// We should never hit maxDepth if we are detecting loops correctly
		const maxDepth = Object.keys(valves).length * 2;
		const maxWander = Object.keys(valves).length;

		if (
			open.length === maxValves.length ||
			currentPath.length >= maxDepth ||
			currentWander.length >= maxWander
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

			// let tunnels = [];

			/*
			// if all are open then try each one
			if (
				valves[currentValve].tunnels.every((tunnel) =>
					currentOpen.includes(tunnel)
				)
			) {
				tunnels = valves[currentValve].tunnels;
			} else {
				tunnels.push(
					...valves[currentValve].tunnels
						.filter((tunnel) => !currentOpen.includes(tunnel))
						.map((tunnel) => {
							return {
								tunnel,
								rate: valves[tunnel].rate,
							};
						})
						.filter((tunnel) => tunnel.rate > 0)
						.map((tunnel) => tunnel.tunnel)
				);
			}

			if (tunnels.length === 0) {
				tunnels.push(
					...valves[currentValve].tunnels
						.map((tunnel) => {
							const potential = valves[tunnel].tunnels.reduce((acc, t) => {
								if (!currentOpen.includes(t)) {
									acc += valves[t].rate;
								}
								return acc;
							}, 0);
							return {
								tunnel,
								potential,
							};
						})
						.sort((a, b) => b.potential - a.potential)
						.map((tunnel) => tunnel.tunnel)
						.slice(0, 3)
				);
			}

			tunnels.filter(Boolean).forEach((tunnel) => {
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
            */

			/*
			valves[currentValve].tunnels.forEach((tunnel) => {
				// This is the fastest, but doesn't work
				// const loopy = currentWander.includes(tunnel);
				// if (!loopy) {
				// This doesn't seem to work
				// const loopy = currentWander.slice(-2, -1).includes(tunnel);
				// if (!loopy) {

				// This is the slowest, but works
				const previous =
					currentPath.length > 1 ? currentPath[currentPath.length - 2] : null;
				if (currentWander.length === 0 || tunnel !== previous) {
					// Nope
					// console.log(currentWander);
					// const loopy = currentWander.slice(0, -1).includes(tunnel);
					// const previous =
					// 	currentPath.length > 1 ? currentPath[currentPath.length - 2] : null;
					// if ((currentWander.length === 0 || tunnel !== previous) && !loopy) {

					// Nope - off by 1
					// const previous =
					// 	currentPath.length > 1 ? currentPath[currentPath.length - 2] : null;
					// if (
					// 	currentWander.length === 0 ||
					// 	(currentPath.length < maxValves * 2 && tunnel !== previous)
					// ) {
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
            */

			valves[currentValve].tunnels.forEach((tunnel) => {
				const loopy = currentWander.includes(tunnel);
				if (loopy) {
					return;
				}

				const potentialPressure =
					currentPressure +
					Object.keys(valves).reduce((a, b) => {
						if (!currentOpen.includes(b)) {
							return a + valves[b].rate;
						}
						return a;
					}, 0);
				if (potentialPressure < maxPressure) {
					return;
				}

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
			});
		}

		choices.push({
			valve,
			time: currentTime,
			pressure: currentPressure,
			open: currentOpen,
			path: currentPath,
		});

		const best = choices
			.filter(Boolean)
			.sort((a, b) => b.pressure - a.pressure)[0];
		if (best.pressure > maxPressure) {
			maxPressure = best.pressure;
			return best;
		}
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
