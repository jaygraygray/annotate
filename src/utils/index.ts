const rough = require('roughjs');

let roughCanvas = rough.canvas(document.getElementById('app-canvas'));

roughCanvas.line(60, 60, 300, 60, { strokeWidth: 10 });

roughCanvas.circle(100, 100, 100, { fill: "pink", bowing: 10, });

roughCanvas.rectangle(120, 15, 80, 80);

roughCanvas.linearPath([[690, 10], [790, 20], [750, 120], [690, 100]]);

/**
 * each shape will be its own hook
 *  - CRUD operations on each shape
 * 
 * will need generic event handlers to pass coordinates
 * 
 * UI to select which shape to draw
 * 
 * right click each shape to edit settings?
 * 
 * only use high contrast color schemes
 */