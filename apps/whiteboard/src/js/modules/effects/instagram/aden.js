import app from '../../../app.js';
import config from '../../../config.js';
import Dialog_class from '../../../libs/popup.js';
import Base_layers_class from '../../../core/base-layers.js';
import alertify from 'alertifyjs/build/alertify.min.js';

class Effects_aden_class {

	constructor() {
		this.POP = new Dialog_class();
		this.Base_layers = new Base_layers_class();
	}

	aden() {
		if (config.layer.type != 'image') {
			alertify.error('This layer must contain an image. Please convert it to raster to apply this tool.');
			return;
		}

		//get canvas from layer
		var canvas = this.Base_layers.convert_layer_to_canvas(null, true);
		var ctx = canvas.getContext("2d");

		//change data
		var data = this.change(canvas, canvas.width, canvas.height);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(data, 0, 0);

		//save
		return app.State.do_action(
			new app.Actions.Update_layer_image_action(canvas)
		);
	}

	change(canvas, width, height) {

		//create temp canvas
		var canvas2 = document.createElement('canvas');
		var ctx2 = canvas2.getContext("2d");
		canvas2.width = width;
		canvas2.height = height;
		var gradient = ctx2.createLinearGradient(0, 0, width, height);
		gradient.addColorStop(0, "rgba(66, 10, 14, 0.2)");
		gradient.addColorStop(1, "rgba(66, 10, 14, 0.2)");
		ctx2.fillStyle = gradient;
		ctx2.fillRect(0, 0, width, height);

		//merge
		ctx2.globalCompositeOperation = "darken";
		ctx2.drawImage(canvas, 0, 0);
		ctx2.globalCompositeOperation = "source-over";

		//apply more effects
		ctx2.filter = 'hue-rotate(-20deg) contrast(0.9) saturate(0.85) brightness(1.2)';
		ctx2.drawImage(canvas2, 0, 0);
		ctx2.filter = 'none';

		return canvas2;
	}

	demo(canvas_id, canvas_thumb){
		var canvas = document.getElementById(canvas_id);
		var ctx = canvas.getContext("2d");

		//modify
		var data = this.change(canvas_thumb, canvas_thumb.width, canvas_thumb.height);

		//draw
		ctx.drawImage(data, 0, 0);
	}

}

export default Effects_aden_class;