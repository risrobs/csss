// UTILITY PARAMETERS -------------------------------------------------------------------
const showPaletteViewButton = true;

if (showPaletteViewButton) {
	function createPaletteView(newDocument) {
		let paletteViewButton = newDocument.createElement("div");
		paletteViewButton.appendChild(newDocument.createTextNode("See Palette"));
		let body = newDocument.getElementsByTagName("body")[0];
		body.insertBefore(paletteViewButton, body.childNodes[0]);
	}

	function openPaletteViewerTab() {
		console.log("Open Palette Viewer Tab!");
		let newWindow = window.open("", "_blank");
		let newDocument = newWindow.document;
		let newBody = newDocument.getElementsByTagName("body")[0];
		newBody.onload = function() {
			createPaletteView(newDocument);
			console.log("Blank Window Loaded!");
		};
	}

	let paletteViewButton = document.createElement("div");
	paletteViewButton.appendChild(document.createTextNode("See Palette"));
	paletteViewButton.setAttribute("id", "paletteViewButton");
	paletteViewButton.onclick = function() {
		openPaletteViewerTab();
	};

	let body = document.getElementsByTagName("body")[0];
	body.insertBefore(paletteViewButton, body.childNodes[0]);
}
