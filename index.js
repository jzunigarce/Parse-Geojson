const fs = require('fs')
const GeoJSON = require('geojson'); 

if(process.argv.length < 3)
	throw Error ('Número de argumentos incorrectos')
 
const file =  process.argv[2]
readFile(file)
.then(data => {
	const geoData = parseFile(data)
	const geoDataFormat = convertGeoJSON(geoData)
	console.log(geoDataFormat)
	return writeFile(geoDataFormat, 'geo')
})
.then((data) => {
	console.log(data)
})
.catch(err => {
	console.log(err)
})

function readFile (file) {
	return new Promise((resolve, reject) => {
		fs.readFile(file, (err, data) => {
			if(err)
				reject(err)
			resolve(data)
		})
	})
}

function writeFile(data, name) {
	return new Promise((resolve, reject) => {
		fs.writeFile(`${name}.json`, JSON.stringify(data), (err) => {
			if(err)
				reject(err)
			resolve('Archivo creado')
		});

	})
}

function parseFile(file) {
	return JSON.parse(file)
}

function convertGeoJSON ({data}) {
	return GeoJSON.parse(data, {Point: ['lat', 'lng']});
}