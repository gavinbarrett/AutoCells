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
	for (let idx = 0; idx < data.length; idx += 4) {
		let neighbors = getLiveNeighbors(idx, canvas.width);
		let liveNeighbors = neighbors.filter(elem => {
			return 0 < elem && elem < data.length && data[elem] != 0;
		});
		// check if cell is live
		if (data[idx] && data[idx + 1] && data[idx + 2] && data[idx + 3]) {
			if (liveNeighbors.length == 2 || liveNeighbors.length == 3) {
				// continue to the next generation
				newData[idx] = 255;
				newData[idx + 1] = 105;
				newData[idx + 2] = 180;
				newData[idx + 3] = 255;
			} else {
				// die off
				newData[idx] = 0;
				newData[idx + 1] = 0;
				newData[idx + 2] = 0;
				newData[idx + 3] = 0;
			}
		// check if cell is dead
		} else {
			if (liveNeighbors.length == 3) {
				newData[idx] = 255;
				newData[idx + 1] = 105;
				newData[idx + 2] = 180;
				newData[idx + 3] = 255;
			} else {
				newData[idx] = 0;
				newData[idx + 1] = 0;
				newData[idx + 2] = 0;
				newData[idx + 3] = 0;
			}
		}
	}
	// update data
	ctx.putImageData(newImageData, 0, 0);
	setTimeout(() => simulate(ctx, canvas), 20);
}

const getLiveNeighbors = (idx, width) => {
	// return a valid list of neighbor cells
	return [
		idx - ((width - 1) * 4),
		idx - (width * 4) ,
		idx - ((width + 1) * 4),
		idx - 4,
		idx + 4,
		idx + ((width - 1) * 4),
		idx + (width * 4),
		idx + ((width + 1) * 4)
	];
}