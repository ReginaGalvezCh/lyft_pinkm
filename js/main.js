
/*$('#search').on('click', function(){
		$('#hidden').slideDown(800);
	});*/
	/*secciongeolocalizacion*/


	var cargaLugar = function() {
		$(".white-text").eq(0).text(window.localStorage.getItem("name")+" "+window.localStorage.getItem("lastname"));
		$(".white-text").eq(1).text(window.localStorage.getItem("email"));
		$(".button-collapse").sideNav({
			menuWidth: 250,
			edge: 'left',
			closeOnClick: true
		}
		);
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
		}
		$("#search").click(buscar);
	};

	var map,lat,lon;
	var funcionExito = function(posicion) {
		lat = posicion.coords.latitude;
		lon = posicion.coords.longitude;
		map = new GMaps({
			div: "#map",
			lat: lat,
			lng: lon,
			zoom:15,
			mapTypeControl:false,
			zoomControl: false,
			streetViewControl:false
		});
		var geocoder = new google.maps.Geocoder;
/*	var infowindow = new google.maps.InfoWindow;
	$("#submit").on('click', function() {
		geocodeLatLng(geocoder, map, infowindow);
	});*/
	map.addMarker({
		lat: lat,
		lng: lon,
	});
	var content = $("#direction");
	var dir = "";
	var latlng = new google.maps.LatLng(lat, lon);
	geocoder = new google.maps.Geocoder();
	geocoder.geocode({"latLng": latlng}, function(resultado, estado){
		if (estado == google.maps.GeocoderStatus.OK){
			if (resultado[0]){
				dir = resultado[0].formatted_address;
			}
			else{
				dir = "No se ha podido obtener ninguna dirección en esas coordenadas.";
			}
		}
		else{
			dir = "El Servicio de Codificación Geográfica ha fallado con el siguiente error: " + estado;
		}
		window.localStorage.setItem("direction",dir)
		content.text(window.localStorage.getItem("direction"));
	});

}
var funcionError = function (error) {
	alert("Tenemos un problema con encontrar tu ubicación");
}
var buscar= function(e){
	e.preventDefault();
	GMaps.geocode({
		address: $('#direccion-dos').val(),
		callback: function(results, status) {
			if (status == 'OK') {
				var latlng = results[0].geometry.location;
				map.zoomOut(2);
				map.setCenter(lat,latlng.lng());
				map.addMarker({
					lat: latlng.lat(),
					lng: latlng.lng()
				});
				map.getRoutes({
					origin: [lat,lon],
					destination: [latlng.lat(), latlng.lng()],
					travelMode: 'driving',
					callback: function (e) {
						var time = 0;
						var distance = 0;
						for (var i=0; i<e[0].legs.length; i++) {
							time += e[0].legs[i].duration.value *1000;
							distance += e[0].legs[i].distance.value;

						}
						$.ajax({
							url: 'https://api.lyft.com/v1/ridetypes',
							data:{
								lat : 37.7972,
								lng :-122.4533
							},
							beforeSend: function(req) {
								req.setRequestHeader("Authorization", "Bearer " + 'gAAAAABXvLCb-7y-4HU0AIGe270fHo_QRUC0VID0UFvye9yAe8BeWNHe3r0PaadBl3h_4Yl1YmVGt4J0kwPZiO_M9STD1onKV3dH-lrgV8FJDrctPE6z9bplmaZWzPwSEenKa9yrMsef8QA31CO5OGvsHOoKk_k96ELQNyIN4Icnb2twQVXYWT4=');
							},
							success: function(res){
								console.log(res);
		//console.log((res.ride_types[1].pricing_details.base_charge * 662 ) + " Pesos chilenos")
		console.log(res.ride_types);
		//var ride_types = res.ride_types;
		res.ride_types.forEach(function(e,i){
			
			car = e.display_name;
			pricing = e.pricing_details.base_charge;
			minimum = e.pricing_details.cost_minimum;
			per_mile = e.pricing_details.cost_per_mile;
			per_minute = e.pricing_details.cost_per_minute;
			service = e.pricing_details.trust_and_service;

			console.log(car);
		})

	},
	error: function(error){
		console.log(error);
	}
})
						alert(time + " " + distance);
					}
				});
				map.drawRoute({
					origin: [lat,lon],
					destination: [latlng.lat(), latlng.lng()],
					travelMode: 'driving',
					strokeColor: '#131540',
					strokeOpacity: 0.6,
					strokeWeight: 6
				});
				var x = 10;
			}
		}
	});
	$('#search').val("");
}
$(document).ready(cargaLugar);

