const baseColorsMap = new Map();
baseColorsMap.set("primary", "#192d49");
baseColorsMap.set("secondary", "#468189");
baseColorsMap.set("complement", "#f6edd6");
baseColorsMap.set("neutral", "#797979");
const lightnessIncrements = 0.1;
const asRGBStrings = true;
const websitePalette = new WebsitePalette(
	baseColorsMap,
	lightnessIncrements,
	asRGBStrings
);

websitePalette.mapPaletteToRoot();
console.log("----------Palette Mapped to Root----------");
console.log(websitePalette);
console.log("------------------------------------------");
