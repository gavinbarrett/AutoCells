export const runSimulation = () => {
	// run simulation loop indefinitely
	const canvas = document.querySelector("canvas");
	const ctx = canvas.getContext("2d");
	simulate(ctx, canvas);
}

const simulate = (ctx, canvas) => {
	let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = imageData.data;
	let newImageData = ctx.createImageData(canvas.width, canvas.height);
	let newData = newImageData.data
	for (let i = 0; i < data.length; i += 4) {
		let neighbors = getLiveNeighbors(i, canvas.width);
		let liveNeighbors = neighbors.filter(elem => {
			return 0 < elem && elem < data.length && data[elem] != 0;
		});
		// check if cell is live
		if (data[i] && data[i + 1] && data[i + 2] && data[i + 3]) {
			if (liveNeighbors.length == 2 || liveNeighbors.length == 3) {
				// continue to the next generation
				newData[i] = 255;
				newData[i + 1] = 255;
				newData[i + 2] = 255;
				newData[i + 3] = 255;
			} else {
				// die off
				newData[i] = 0;
				newData[i + 1] = 0;
				newData[i + 2] = 0;
				newData[i + 3] = 0;
			}
		// check if cell is dead
		} else {
			if (liveNeighbors.length == 3) {
				newData[i] = 255;
				newData[i + 1] = 255;
				newData[i + 2] = 255;
				newData[i + 3] = 255;
			} else {
				newData[i] = 0;
				newData[i + 1] = 0;
				newData[i + 2] = 0;
				newData[i + 3] = 0;
			}
		}
	}
	// update data
	ctx.putImageData(newImageData, 0, 0);
	setTimeout(() => simulate(ctx, canvas), 10);
}

const getLiveNeighbors = (idx, width) => {
	// return a valid list of neighbor cells
	return [
		idx - width - 1,
		idx - width,
		idx - width + 1,
		idx - 1,
		idx + 1,
		idx + width - 1,
		idx + width,
		idx + width + 1
	];
}