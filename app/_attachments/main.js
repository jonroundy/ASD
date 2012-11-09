$("#search).live("pageshow", function(){
	$.ajax({
		"url": "_view/workorders",
		"dataType": "json",
		"success": function(data) {
			$.each(data.rows, function(index, workorder, key){
				var id				= workorder.key;
				var brand 			= workorder.value.brand;
				var device 			= workorder.value.device;
				var serial 			= workorder.value.serial;
				var customername 	= workorder.value.customername;
				var custphone 		= workorder.value.custphone;
				var address 		= workorder.value.address;
				var city 			= workorder.value.city;
				var state 			= workorder.value.state;
				var zipcode 		= workorder.value.zipcode;
				var date 			= workorder.value.date;
				var esttime 		= workorder.value.esttime;
				var urgent 			= workorder.value.urgent;
				var notes 			= workorder.value.notes;
				$('#search_list').append(
						$('<li>').append(
								//'<li id="list_icon">'+
								'<img src="images/oem/'+brand+'.png" class="ui-li-icon">' +
								'<a href="#">'+
								'<h3>' + 'Workorder: ' + id + '</h3>'+
								'<p><span class="oem">Brand: </span>' + brand + '</p>'+
								//'<p><span class="device">Device: </span>' + device + '</p>'+
								//'<p><span class="serial">Serial: </span>' + serial + '</p>'+
								//'<p><span class="cust">Customer Name: </span>' + customername + '</p>'+
								//'<p><span class="phonenum">Phone Number: </span>' + custphone + '</p>'+
								//'<p><span class="address">Address: </span>' + address + '</p>'+
								//'<p><span class="city">City: </span>' + city + '</p>'+
								//'<p><span class="state">State: </span>' + state + '</p>'+
								//'<p><span class="zipcode">Zipcode: </span>' + zipcode + '</p>'+
								//'<p><span class="date">Date service is due: </span>' + date + '</p>'+
								//'<p><span class="esttime">Estimated Repair Time: </span>' + esttime + '</p>'+
								//'<p><span class="urgent">Work order URGENT?: </span>' + urgent + '</p>'+
								//'<p><span class="notes">Notes: </span>' + notes + '</p>'+
								'</a>'+
								'<a href="#'+id.replace(':','')+'">Options</a>'
								//'</li>'
								)
					);
				
			});
			$('#search_list').listview('refresh');
		}
	});
});
//End of couchdata

$('#home').on('pageinit', function(){
	//code needed for main page goes here
	/*$.couch.db("workorderapp").view("plugin/workorder", {
		success: function(data) {
			console.log(data);
		}
	});*/
});

$('#addWorkOrder').on('pageinit', function() {
	
	$('#workOrderForm').validate( {
		invalidHandler: function (form, validator) {
			$("#formErrors ul").empty();
			$.mobile.changePage("#formErrors");
			
			//$('#formErrors').simpledialog2();	
			//$( "#formErrors" ).popup( "open" )
		},
			messages: {
			oemList: {		required: 'OEM is required.' },
			deviceList: { 	required: 'Device type is required.' },
			serial: { 		required: 'Serial is required.' },
			custName: { 	required: 'Customer Name is required.' },
			phoneNumber: { 	required: 'Phone number is required.' },
			address: { 		required: 'Address is required.' },
			city: { 		required: 'City is required.' },
			stateList: { 	required: 'State is required.' },
			zipcode: { 		required: 'Zipcode is required.' },
			date: { 		required: 'Date is required.' }
			},
			errorPlacement: function (error, element) {
			
                $('<li>'+ error.text() +'</li>').appendTo($("#formErrors ul"));
                
                //$("#formErrors").dialog('refresh');
            },  
       		submitHandler: function(item) {
				$('#workOrderForm').serializeArray();
				storeData(this.key);
				//$('<li>'+ item +'</li>').appendTo($("#search ul"));
				$.mobile.changePage("#search");
			},
		 
		}); // End of addWorkorder
});

var storeData = function(key){
			if(!key){
			var id					= Math.floor(Math.random() * 100000001);
		} else {
			//Set the id to the existing key we're editing so that it will save over the data.
			//The key is the same ky that's been passed along from the editSubmit event handler
			//To the validate function, and then passed here, into the storeData function.
			id = key;
		}
			if ($("input[name='urgent']").is(':checked')) {
				$('#urgent').val("Yes");
			} else {
				$('#urgent').val("No");
		} 
			//Gather up all our form field values and store in an object.
			//Object properties are going to contain array with the form label and input value
		var item					= {};
		item.oem					= $('#oemList').val();
		item.device					= $('#deviceList').val();
		item.serial					= $('#serial').val();
		item.cust					= $('#custName').val();
		item.phone					= $('#phoneNumber').val();
		item.address				= $('#address').val();
		item.city					= $('#city').val();
		item.state					= $('#stateList').val();
		item.zipcode				= $('#zipcode').val();
		item.date					= $('#date').val();
		item.esttime				= $('#esttime').val();
		item.urgent					= $('#urgent').val();
		item.textbox				= $('#textbox').val();

			//Save data into Local Storage: Use Stringify to convert our object to a string. Local storage only stores strings.
			//Save form elements into LS
			localStorage.setItem(id, JSON.stringify(item));
			alert("Task Saved!");
			console.log(item);
			//window.location.reload(); 
		//loadPage();
		//letsr();
		//console.log("id", id);
		//alert(item);
		
}; //End of storeData.

//getImage(obj.oem[1]);



$('#search').on('pageinit', function(data){

});
