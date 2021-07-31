export const setPixels = () => {
	let canvas = document.querySelector("canvas");
	let ctx = canvas.getContext('2d');
	let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = imageData.data;
	for (let idx = 0; idx < data.length; idx += 4) {
		if (Math.floor(Math.random() * 255) % 5 == 0) {
			data[idx] = 255;
			data[idx + 1] = 105;
			data[idx + 2] = 180;
			data[idx + 3] = 255;
		}
	}
	ctx.putImageData(imageData, 0, 0);
}