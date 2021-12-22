class ColorSpaceConverter {
	constructor() {}

	// COLOR CONVERSION FUNCTIONS: Copied or adapted from CSS-Tricks.com
	// Ref: https://css-tricks.com/converting-color-spaces-in-javascript/

	// Note: "Values" refers to the actual numerical values of the channels of a color.
	// Whereas "Color" refers to the string that would be used to specify the color in css.
	// Examples:
	// RGB: Values = [redValue, greenValue, blueValue]
	// RGB: Color = rgb(XXX,XXX,XXX) where the X's are some values for the channels.
	// Hex: Values = [redValue, greenValue, blueValue]
	// Hex: Color = #XXXXXX where the X's are values for the channels.
	// HSL: Values = [hueValue, saturationValue, lightnessValue]
	// HSL: Color = hsl(XXX,XXX,XXX) where the X's are some values for the channels.

	hexColorToRGBColor(hexColor) {
		let r = 0,
			g = 0,
			b = 0;

		// 3 digits
		if (hexColor.length == 4) {
			r = "0x" + hexColor[1] + hexColor[1];
			g = "0x" + hexColor[2] + hexColor[2];
			b = "0x" + hexColor[3] + hexColor[3];

			// 6 digits
		} else if (hexColor.length == 7) {
			r = "0x" + hexColor[1] + hexColor[2];
			g = "0x" + hexColor[3] + hexColor[4];
			b = "0x" + hexColor[5] + hexColor[6];
		}

		return "rgb(" + +r + "," + +g + "," + +b + ")";
	}

	hexColorToRGBValues(hexColor) {
		let r = 0,
			g = 0,
			b = 0;

		// 3 digits
		if (hexColor.length == 4) {
			r = "0x" + hexColor[1] + hexColor[1];
			g = "0x" + hexColor[2] + hexColor[2];
			b = "0x" + hexColor[3] + hexColor[3];

			// 6 digits
		} else if (hexColor.length == 7) {
			r = "0x" + hexColor[1] + hexColor[2];
			g = "0x" + hexColor[3] + hexColor[4];
			b = "0x" + hexColor[5] + hexColor[6];
		}

		return [+r, +g, +b];
	}

	rgbValuesToHexColor(redValue, greenValue, blueValue) {
		redValue = redValue.toString(16);
		greenValue = greenValue.toString(16);
		blueValue = blueValue.toString(16);

		if (redValue.length == 1) redValue = "0" + redValue;
		if (greenValue.length == 1) greenValue = "0" + greenValue;
		if (blueValue.length == 1) blueValue = "0" + blueValue;

		return "#" + redValue + greenValue + blueValue;
	}

	rgbColorToHexColor(rgbColor) {
		// Choose correct separator
		let sep = rgbColor.indexOf(",") > -1 ? "," : " ";
		// Turn "rgb(r,g,b)" into [r,g,b]
		rgbColor = rgbColor
			.substr(4)
			.split(")")[0]
			.split(sep);

		let redValue = (+rgbColor[0]).toString(16),
			greenValue = (+rgbColor[1]).toString(16),
			blueValue = (+rgbColor[2]).toString(16);

		if (redValue.length == 1) redValue = "0" + redValue;
		if (greenValue.length == 1) greenValue = "0" + greenValue;
		if (blueValue.length == 1) blueValue = "0" + blueValue;

		return "#" + redValue + greenValue + blueValue;
	}

	hexColorToHSLColor(hexColor) {
		// Convert hex to RGB first
		let r = 0,
			g = 0,
			b = 0;
		if (hexColor.length == 4) {
			r = "0x" + hexColor[1] + hexColor[1];
			g = "0x" + hexColor[2] + hexColor[2];
			b = "0x" + hexColor[3] + hexColor[3];
		} else if (hexColor.length == 7) {
			r = "0x" + hexColor[1] + hexColor[2];
			g = "0x" + hexColor[3] + hexColor[4];
			b = "0x" + hexColor[5] + hexColor[6];
		}
		// Then to HSL
		r /= 255;
		g /= 255;
		b /= 255;
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;

		if (delta == 0) h = 0;
		else if (cmax == r) h = ((g - b) / delta) % 6;
		else if (cmax == g) h = (b - r) / delta + 2;
		else h = (r - g) / delta + 4;

		h = Math.round(h * 60);

		if (h < 0) h += 360;

		l = (cmax + cmin) / 2;
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);

		return "hsl(" + h + "," + s + "%," + l + "%)";
	}

	hslColorToHSLValues(hslColor) {
		let sep = hslColor.indexOf(",") > -1 ? "," : " ";
		hslColor = hslColor
			.substr(4)
			.split(")")[0]
			.split(sep);

		let hue = hslColor[0] * 1,
			saturation = hslColor[1].substr(0, hslColor[1].length - 1) / 100,
			lightness = hslColor[2].substr(0, hslColor[2].length - 1) / 100;

		return [hue, saturation, lightness];
	}

	hslValuesToHexColor(hueValue, saturationValue, lightnessValue) {
		let c = (1 - Math.abs(2 * lightnessValue - 1)) * saturationValue,
			x = c * (1 - Math.abs(((hueValue / 60) % 2) - 1)),
			m = lightnessValue - c / 2,
			redValue = 0,
			greenValue = 0,
			blueValue = 0;

		if (0 <= hueValue && hueValue < 60) {
			redValue = c;
			greenValue = x;
			blueValue = 0;
		} else if (60 <= hueValue && hueValue < 120) {
			redValue = x;
			greenValue = c;
			blueValue = 0;
		} else if (120 <= hueValue && hueValue < 180) {
			redValue = 0;
			greenValue = c;
			blueValue = x;
		} else if (180 <= hueValue && hueValue < 240) {
			redValue = 0;
			greenValue = x;
			blueValue = c;
		} else if (240 <= hueValue && hueValue < 300) {
			redValue = x;
			greenValue = 0;
			blueValue = c;
		} else if (300 <= hueValue && hueValue < 360) {
			redValue = c;
			greenValue = 0;
			blueValue = x;
		}
		// Having obtained RGB, convert channels to hex
		redValue = Math.round((redValue + m) * 255).toString(16);
		greenValue = Math.round((greenValue + m) * 255).toString(16);
		blueValue = Math.round((blueValue + m) * 255).toString(16);

		// Prepend 0s, if necessary
		if (redValue.length == 1) redValue = "0" + redValue;
		if (greenValue.length == 1) greenValue = "0" + greenValue;
		if (blueValue.length == 1) blueValue = "0" + blueValue;

		return "#" + redValue + greenValue + blueValue;
	}

	hexColorToHSLValues(hexColor) {
		return this.hslColorToHSLValues(this.hexColorToHSLColor(hexColor));
	}

	hslColorToHexColor(hslColor) {
		hslValues = this.hslColorToHSLValues(hslColor);
		return this.hslValuesToHexColor(hslValues[0], hslValues[1], hslValues[2]);
	}

	hslValuesToRGBValues(hueValue, saturationValue, lightnessValue) {
		let hexColor = this.hslValuesToHexColor(
			hueValue,
			saturationValue,
			lightnessValue
		);
		let rgbValues = this.hexColorToRGBValues(hexColor);
		return rgbValues;
	}

	hslValuesToRGBValueString(hueValue, saturationValue, lightnessValue) {
		let rgbValues = this.hslValuesToRGBValues(
			hueValue,
			saturationValue,
			lightnessValue
		);
		return rgbValues[0] + "," + rgbValues[1] + "," + rgbValues[2];
	}

	hexColorToRGBValueString(hexColor) {
		let rgbValues = this.hexColorToRGBValues(hexColor);
		return rgbValues[0] + "," + rgbValues[1] + "," + rgbValues[2];
	}

	hslValuesToRGBColor(hueValue, saturationValue, lightnessValue) {
		let rgbValues = this.hslValuesToRGBValues(
			hueValue,
			saturationValue,
			lightnessValue
		);
		return (
			"rgb(" + rgbValues[0] + "," + rgbValues[1] + "," + rgbValues[2] + ")"
		);
	}

	hslValuesToHSLColor(hueValue, saturationValue, lightnessValue) {
		saturationValue = +(saturationValue * 100).toFixed(1);
		lightnessValue = +(lightnessValue * 100).toFixed(1);
		return (
			"hsl(" + hueValue + "," + saturationValue + "%," + lightnessValue + "%)"
		);
	}

	rgbColorToHSLValues(rgbColor) {
		let hexColor = this.rgbColorToHexColor(rgbColor);
		let hslValues = this.hexColorToHSLValues(hexColor);
		return hslValues;
	}

	colorToHSLValues(color) {
		let hslValues = [0, 0, 0];
		if (color === undefined) {
			hslValues = [0, 0, 0];
		} else if (color.includes("rgb(")) {
			hslValues = this.rgbColorToHSLValues(color);
		} else if (color.includes("hsl(")) {
			hslValues = this.hslColorToHSLValues(color);
		} else if (
			color.includes("#") &&
			(color.length == 4 || color.length == 7)
		) {
			hslValues = this.hexColorToHSLValues(color);
		}
		return hslValues;
	}
}
