const COLOR_CONVERTER = new ColorSpaceConverter();

class LightnessGradient {
	constructor(baseColor, lightnessIncrement) {
		if (baseColor === undefined) {
			baseColor = "#797979";
		}
		if (lightnessIncrement === undefined) {
			lightnessIncrement = 10 / 100;
		} else if (lightnessIncrement < 0.01) {
			lightnessIncrement = 0.01;
		} else if (lightnessIncrement > 1.0) {
			lightnessIncrement = 1.0;
		}
		this.baseColor = baseColor;
		this.lightnessIncrement = lightnessIncrement;
		this.baseColorHue = 0;
		this.baseColorSaturation = 0;
		this.baseColorLightness = 0;
		this.tints = [];
		this.shades = [];
		this.mapHSLValues();
		if (this.baseColorIsShade()) {
			this.baseColorHighExtreme = "#ffffff";
			this.baseColorLowExtreme = "#000000";
		} else {
			this.baseColorHighExtreme = "#000000";
			this.baseColorLowExtreme = "#ffffff";
		}
		this.mapTints();
		this.mapShades();
	}

	baseColorIsShade() {
		if (this.baseColorLightness < 0.5) {
			return true;
		} else {
			return false;
		}
	}

	mapHSLValues() {
		let hslValues = COLOR_CONVERTER.colorToHSLValues(this.baseColor);
		this.baseColorHue = hslValues[0];
		this.baseColorSaturation = hslValues[1];
		this.baseColorLightness = hslValues[2];
		this.baseColor = COLOR_CONVERTER.hslValuesToHexColor(
			hslValues[0],
			hslValues[1],
			hslValues[2]
		);
	}

	mapTints() {
		let nextLightnessToMap = this.baseColorLightness + this.lightnessIncrement;
		while (nextLightnessToMap < 1.0) {
			let nextTint = COLOR_CONVERTER.hslValuesToHexColor(
				this.baseColorHue,
				this.baseColorSaturation,
				nextLightnessToMap
			);
			this.tints.push(nextTint);
			nextLightnessToMap += this.lightnessIncrement;
		}
	}

	mapShades() {
		let nextLightnessToMap = this.baseColorLightness - this.lightnessIncrement;
		while (nextLightnessToMap > 0.0) {
			let nextShade = COLOR_CONVERTER.hslValuesToHexColor(
				this.baseColorHue,
				this.baseColorSaturation,
				nextLightnessToMap
			);
			this.shades.push(nextShade);
			nextLightnessToMap -= this.lightnessIncrement;
		}
	}

	getHighContrastMappings() {
		if (this.baseColorIsShade()) {
			return this.tints;
		} else {
			return this.shades;
		}
	}

	getLowContrastMappings() {
		if (this.baseColorIsShade()) {
			return this.shades;
		} else {
			return this.tints;
		}
	}

	// This is in case the developer wants to use alpha values at some point.
	// This can be done in the css by referencing the variable name as follows...
	// color: rgba(var(--color_name),0.5); <- 50% opacity
	remapWithRGBStrings() {
		this.baseColor = COLOR_CONVERTER.hexColorToRGBValueString(this.baseColor);
		this.baseColorHighExtreme = COLOR_CONVERTER.hexColorToRGBValueString(
			this.baseColorHighExtreme
		);
		this.baseColorLowExtreme = COLOR_CONVERTER.hexColorToRGBValueString(
			this.baseColorLowExtreme
		);
		for (let i = 0; i < this.shades.length; i++) {
			this.shades[i] = COLOR_CONVERTER.hexColorToRGBValueString(this.shades[i]);
		}
		for (let i = 0; i < this.tints.length; i++) {
			this.tints[i] = COLOR_CONVERTER.hexColorToRGBValueString(this.tints[i]);
		}
	}
}
