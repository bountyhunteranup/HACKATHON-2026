// Create map centered on Mangalore
var map = L.map('map').setView([12.9141, 74.8560], 13);

// Load map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: "© OpenStreetMap"
}).addTo(map);


// Demo locations
var locations = {
kankanady: [12.8698, 74.8451],
hampankatta: [12.8690, 74.8429],
surathkal: [13.0080, 74.7955],
lalbagh: [12.8926, 74.8446],
kadri: [12.8876, 74.8560]
};


// Danger zones
var dangerZones = [

{
name: "Isolated Road - Kadri",
coords: [12.8890, 74.8585],
risk: "High Risk Area"
},

{
name: "Dark Street - Lalbagh",
coords: [12.8935, 74.8420],
risk: "Low Lighting Area"
},

{
name: "Silent Area - Surathkal",
coords: [13.0100, 74.7920],
risk: "Less Crowd at Night"
}

];


// Add danger markers
dangerZones.forEach(function(zone){

L.circleMarker(zone.coords,{
color:"red",
radius:8,
fillOpacity:0.8
})
.addTo(map)
.bindPopup(
"<b>⚠ Danger Zone</b><br>" +
zone.name + "<br>" +
"<b>Risk:</b> " + zone.risk
);

});


var routingControl;
var startPoint;
var endPoint;


// Search route
function searchRoute(){

let from = document.getElementById("from").value.toLowerCase();
let to = document.getElementById("to").value.toLowerCase();

if(locations[from] && locations[to]){

startPoint = locations[from];
endPoint = locations[to];

drawRoute("fast");

}else{

alert("Location not found in demo");

}

}


// Draw route
function drawRoute(type){

if(routingControl){
map.removeControl(routingControl);
}

routingControl = L.Routing.control({

waypoints:[
L.latLng(startPoint[0],startPoint[1]),
L.latLng(endPoint[0],endPoint[1])
],

lineOptions:{
styles:[{
color: type==="safe" ? "green" : "blue",
weight:5
}]
},

routeWhileDragging:false

}).addTo(map);


// Fit map to route
setTimeout(function(){
map.fitBounds(routingControl.getBounds());
},500);


// Demo safety score
var score = Math.floor(Math.random()*30)+70;


document.getElementById("routeInfo").innerHTML =

"<h3>Route Details</h3>" +
"<p><b>From:</b> " + document.getElementById("from").value + "</p>" +
"<p><b>To:</b> " + document.getElementById("to").value + "</p>" +
"<p><b>Mode:</b> " + (type==="safe" ? "Safest Route" : "Fastest Route") + "</p>" +
"<p><b>Safety Score:</b> " + score + "%</p>";

}


// Route buttons
function showSafeRoute(){
if(startPoint && endPoint){
drawRoute("safe");
}
}

function showFastRoute(){
if(startPoint && endPoint){
drawRoute("fast");
}
}


// Share location
function shareLocation(){

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(function(position){

var lat = position.coords.latitude;
var lon = position.coords.longitude;

L.marker([lat,lon])
.addTo(map)
.bindPopup("📍 Your Current Location")
.openPopup();

map.setView([lat,lon],15);

});

}else{

alert("Location not supported");

}

}


function login(){

let username = document.getElementById("username").value
let password = document.getElementById("password").value

fetch("http://127.0.0.1:5000/api/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
username:username,
password:password
})

})

.then(res=>res.json())

.then(data=>{

if(data.status==="success"){

window.location.href="navigation.html"

}else{

alert("Invalid login")

}

})

}

function getLocation(name){

fetch(`http://127.0.0.1:5000/api/location/${name}`)

.then(res=>res.json())

.then(data=>{

console.log(data.coordinates)

})

}