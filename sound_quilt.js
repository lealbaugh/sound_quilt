var filename = "hi_sylvia";

let fs = require('fs');
let wav = require('node-wav');
var Path = require('paths-js/path');

let buffer = fs.readFileSync(filename+'.wav');
let result = wav.decode(buffer);
console.log(result.sampleRate);
// console.log(result.channelData); // array of Float32Arrays
// wav.encode(result.channelData, { sampleRate: result.sampleRate, float: true, bitDepth: 32 });
var min = 1000;
var max = -1000;
for (var i = 0; i<result.channelData[0].length; i++) {
	min = Math.min(min, result.channelData[0][i]);
	max = Math.max(max, result.channelData[0][i]);
}
console.log(min, max);
var range = Math.max(Math.abs(min), max);


var height = 300;
var width = 2000;
var hScale = width/result.channelData[0].length;
var vScale = (height/2)/range;
var downsample = 10;
var path = Path();
path = path.moveto(0, height/2);
for (var i = 0; i<result.channelData[0].length; i+=downsample) {
	path = path.lineto((i+1)*hScale, (height/2)+result.channelData[0][i]*vScale);
}
// path = path.closepath();


var data = "<svg version=\"1.1\" baseProfile=\"full\" width=\"2000\" height=\"400\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\""+path.print()+"\" stroke=\"blue\" fill=\"white\" fill-opacity=\"0.0\" stroke-opacity=\"0.8\"/></svg>";
fs.writeFile(filename+".svg", data, function (err) {
	console.log("done printing");
});