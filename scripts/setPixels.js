export const setPixels = () => {
	let canvas = document.querySelector("canvas");
	let ctx = canvas.getContext('2d');
	let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = imageData.data;
	for (let i = 0; i < data.length; i += 4) {
		if (Math.floor(Math.random() * 255) % 17 == 0) {
			data[i] = 255;
			data[i + 1] = 255;
			data[i + 2] = 255;
			data[i + 3] = 255;
		}
	}
	ctx.putImageData(imageData, 0, 0);
}