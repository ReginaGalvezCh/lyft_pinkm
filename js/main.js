
$('#search').on('click', function(){
		$('#hidden').slideDown(800);
});

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

			console.log(pricing);
		})

	},
    error: function(error){
    	console.log(error);
    }
})

