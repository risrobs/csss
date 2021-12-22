class CSSVarGradient extends LightnessGradient {
	constructor(baseColor, lightnessIncrement, baseColorName) {
		super(baseColor, lightnessIncrement);
		if (baseColorName === undefined) {
			baseColorName = "unnamed";
		}
		this.baseColorName = baseColorName;
		this.cssVarNameSeparator = "-";
		this.cssVarNamePrefix = "--";
		this.cssVarNameHighLabel = "high";
		this.cssVarNameLowLabel = "low";
		this.initializeMaps();
	}

	initializeMaps() {
		this.baseCSSVars = new Map();
		this.initializeBaseMap();
		this.highContrastCSSVars = new Map();
		this.initializeHighContrastMap();
		this.lowContrastCSSVars = new Map();
		this.initializeLowContrastMap();
	}

	initializeBaseMap() {
		let baseColorCSSVarName = this.cssVarNamePrefix + this.baseColorName;
		let baseColorValue = this.baseColor;
		this.baseCSSVars.set(baseColorCSSVarName, baseColorValue);

		let baseColorHighExtremeCSSVarName =
			this.cssVarNamePrefix +
			this.baseColorName +
			this.cssVarNameSeparator +
			this.cssVarNameHighLabel;
		let baseColorHighExtremeValue = this.baseColorHighExtreme;
		this.baseCSSVars.set(
			baseColorHighExtremeCSSVarName,
			baseColorHighExtremeValue
		);

		let baseColorLowExtremeCSSVarName =
			this.cssVarNamePrefix +
			this.baseColorName +
			this.cssVarNameSeparator +
			this.cssVarNameLowLabel;
		let baseColorLowExtremeValue = this.baseColorLowExtreme;
		this.baseCSSVars.set(
			baseColorLowExtremeCSSVarName,
			baseColorLowExtremeValue
		);
	}

	initializeHighContrastMap() {
		let highContrasts = this.getHighContrastMappings();
		for (let i = 0; i < highContrasts.length; i++) {
			let contrastStep = i + 1;
			let cssVarName =
				this.cssVarNamePrefix +
				this.baseColorName +
				this.cssVarNameSeparator +
				this.cssVarNameHighLabel +
				this.cssVarNameSeparator +
				contrastStep;
			let colorValue = highContrasts[i];
			this.highContrastCSSVars.set(cssVarName, colorValue);
		}
	}

	initializeLowContrastMap() {
		let lowContrasts = this.getLowContrastMappings();
		for (let i = 0; i < lowContrasts.length; i++) {
			let contrastStep = i + 1;
			let cssVarName =
				this.cssVarNamePrefix +
				this.baseColorName +
				this.cssVarNameSeparator +
				this.cssVarNameLowLabel +
				this.cssVarNameSeparator +
				contrastStep;
			let colorValue = lowContrasts[i];
			this.lowContrastCSSVars.set(cssVarName, colorValue);
		}
	}

	reinitializeWithRGBStrings() {
		this.remapWithRGBStrings();
		this.initializeMaps();
	}
}
