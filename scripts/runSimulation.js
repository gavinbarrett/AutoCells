export const runSimulation = () => {
	// run simulation loop indefinitely
	const canvas = document.querySelector("canvas");
	const ctx = canvas.getContext("2d");
	simulate(ctx, canvas);
}

const simulate = (ctx, canvas) => {
	let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = imageData.data;
	for (let i = 0; i < data.length; i += 4) {
		let neighbors = getLiveNeighbors(i, canvas.width, data.length);
		let liveNeighbors = neighbors.filter(elem => {
			return data[elem] != 0;
		});
		// check if cell is live
		if (data[i] && data[i + 1] && data[i + 2] && data[i + 3]) {
			if (liveNeighbors.length == 2 || liveNeighbors.length == 3) {
				data[i] = 0;
				data[i + 1] = 0;
				data[i + 2] = 0;
				data[i + 3] = 0;
			}
		// check if cell is dead
		} else {
			if (liveNeighbors.length == 3) {
				data[i] = 255;
				data[i + 1] = 255;
				data[i + 2] = 255;
				data[i + 3] = 255;
			}
		}
	}
	// update data
	ctx.putImageData(imageData, 0, 0);
	setTimeout(() => simulate(ctx, canvas), 100);
}

const getLiveNeighbors = (idx, width, length) => {
	// return a valid list of neighbor cells
	return [
		(idx - width) - 1,
		(idx - width),
		(idx - width) + 1,
		idx - 1,
		idx + 1,
		(idx + width) - 1,
		(idx + width) + 1
	].filter(elem => {
		return 0 < elem && elem < length;
	});
}
