class WebsitePalette {
	constructor(baseColorsMap, lightnessIncrements, asRGBStrings) {
		if (baseColorsMap === undefined) {
			baseColorsMap = new Map();
			baseColorsMap.set("neutral", "#797979");
		}
		if (lightnessIncrements === undefined) {
			lightnessIncrements = [];
			for (let i = 0; i < baseColorsMap.size; i++) {
				lightnessIncrements.push(0.1);
			}
		} else if (!Array.isArray(lightnessIncrements)) {
			if (isNaN(lightnessIncrements)) {
				lightnessIncrements = [];
				for (let i = 0; i < baseColorsMap.size; i++) {
					lightnessIncrements.push(0.1);
				}
			} else {
				lightnessIncrements = [lightnessIncrements];
			}
		}
		if (lightnessIncrements.length != baseColorsMap.size) {
			let incrementSize = Math.min(...lightnessIncrements);
			incrementSize = Math.max(incrementSize, 0.01);
			if (isNaN(incrementSize)) {
				incrementSize = 0.1;
			}
			lightnessIncrements = [];
			for (let i = 0; i < baseColorsMap.size; i++) {
				lightnessIncrements.push(incrementSize);
			}
		}
		if (asRGBStrings === undefined) {
			this.asRGBStrings = false;
		}
		this.asRGBStrings = asRGBStrings;
		this.initializePalette(baseColorsMap, lightnessIncrements);
	}

	initializePalette(baseColorsMap, lightnessIncrements) {
		this.palette = [];
		let incrementIndex = 0;
		for (let entry of baseColorsMap) {
			let baseColorName = entry[0];
			let baseColor = entry[1];
			let lightnessIncrement = lightnessIncrements[incrementIndex];
			let gradient = new CSSVarGradient(
				baseColor,
				lightnessIncrement,
				baseColorName
			);
			if (this.asRGBStrings) {
				gradient.reinitializeWithRGBStrings();
			}
			this.palette.push(gradient);
			incrementIndex++;
		}
	}

	mapCSSVarsToRoot(cssVars) {
		const rootStyle = document.documentElement.style;
		for (let entry of cssVars) {
			let cssVarName = entry[0];
			let cssVarValue = entry[1];
			rootStyle.setProperty(cssVarName, cssVarValue);
		}
	}

	mapPaletteToRoot() {
		// document.documentElement.style.setProperty("--your-variable", "#YOURCOLOR");
		const rootStyle = document.documentElement.style;

		for (let i = 0; i < this.palette.length; i++) {
			let gradient = this.palette[i];
			let baseCSSVars = gradient.baseCSSVars;
			let highContrastCSSVars = gradient.highContrastCSSVars;
			let lowContrastCSSVars = gradient.lowContrastCSSVars;
			this.mapCSSVarsToRoot(baseCSSVars);
			this.mapCSSVarsToRoot(highContrastCSSVars);
			this.mapCSSVarsToRoot(lowContrastCSSVars);
		}
	}
}
