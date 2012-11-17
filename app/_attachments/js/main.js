// Jon Roundy
// Work Order App

$("#details").live("pageshow", function() {
	var urlData = $($.mobile.activePage).data("url");
	var urlParts = urlData.split('?');
	var urlPairs = urlParts[1].split('&');
	var urlValues = {};
	for (var pair in urlPairs) {
			var keyValue = urlPairs[pair].split(':');
			var key = decodeURIComponent(keyValue[0]);
			var value = decodeURIComponent(keyValue[1]);
			urlValues[key] = value;
	}
	console.log(urlValues);
	$.couch.db("workorderapp").openDoc("workorder:"+value, {
		"success": function(data) {
			$( '#workorder_list' ).empty();
			var cid = data._id;
			var crev = data._rev;
			var brand 			= data.brand;
			var device 			= data.device;
			var serial 			= data.serial;
			var customername 	= data.customername;
			var custphone 		= data.custphone;
			var address 		= data.address;
			var city 			= data.city;
			var state 			= data.state;
			var zipcode 		= data.zipcode;
			var date 			= data.date;
			var esttime 		= data.esttime;
			var urgent 			= data.urgent;
			var notes 			= data.notes;
			$('#workorder_list').append(
					$('<li>').append(
							'<img src="images/oem/'+brand+'.png" class="ui-li-icon">' +
							'<br/>'+
							'<br/>'+
							'<br/>'+
							'<h3>' + 'Workorder: ' + cid.replace(':','')+ '</h3>'+
							'<p><span class="oem">Brand: </span>' + brand + '</p>'+
							'<p><span class="device">Device: </span>' + device + '</p>'+
							'<p><span class="serial">Serial: </span>' + serial + '</p>'+
							'<p><span class="cust">Customer Name: </span>' + customername + '</p>'+
							'<p><span class="phonenum">Phone Number: </span>' + custphone + '</p>'+
							'<p><span class="address">Address: </span>' + address + '</p>'+
							'<p><span class="city">City: </span>' + city + '</p>'+
							'<p><span class="state">State: </span>' + state + '</p>'+
							'<p><span class="zipcode">Zipcode: </span>' + zipcode + '</p>'+
							'<p><span class="date">Date service is due: </span>' + date + '</p>'+
							'<p><span class="esttime">Estimated Repair Time: </span>' + esttime + '</p>'+
							'<p><span class="urgent">Work order URGENT?: </span>' + urgent + '</p>'+
							'<p><span class="notes">Notes: </span>' + notes + '</p>'
							)
					);
			//alert("success");
				$('#editButton').on('click', function() {
					$('#id').val(cid);
					$('#rev').val(crev);
					$('#brand').val(brand);
					$('#device').val(device);
					$('#serial').val(serial);
					$('#customername').val(customername);
					$('#custphone').val(custphone);
					$('#address').val(address);
					$('#city').val(city);
					$('#state').val(state);
					$('#zipcode').val(zipcode);
					$('#date').val(date);
					$('#esttime').val(esttime);
					$('#urgent').val(urgent);
					$('#notes').val(notes);
				});
				$('#deleteButton').on('click', function() {
					var ask = confirm("Delete Workorder?");
					if(ask){
					var doc = {
					_id: cid,
					_rev: crev
					};
					$.couch.db("workorderapp").removeDoc(doc, {
						success: function(data) {
						alert('Workorder Deleted');
						$.mobile.changePage($('#dashboard'));
					},
					error: function(status) {
						console.log(status);
					}
				});
					}else{
					alert("Workorder was NOT deleted!");
					}	
			});
		
		$('#workorder_list').listview('refresh');
		console.log(data.brand);
	}
	});
	
});

$('#search').live("pageshow", function() {											
	$.couch.db("workorderapp").view("app/workorders", {		
		
		success: function(data) {														
			$( '#search_list' ).empty();
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
								'<img src="images/oem/'+brand+'.png" class="ui-li-icon">' +
								'<a href="details.html?workorder'+ id +'">'+
								'<h3>' + 'Workorder: ' + id.replace(':','')+ '</h3>'+
								'<p><span class="oem">Brand: </span>' + brand + '</p>'+
								'</a>'+
								'<a href="#dataPopup" data-rel="popup" data-position-to="window" class="opts">Options</a>'	
						)	
				);	
		});
				$('#search_list').listview('refresh');
		},
		error: function(msg) {
           }
	});  
});


$('#addWorkOrder').on('pageinit', function() {
	
	$('#workOrderForm').validate( {
		invalidHandler: function (form, validator) {
			$("#formErrors ul").empty();
			$.mobile.changePage("#formErrors");
		},
			messages: {
			brand: {		required: 'OEM is required.' },
			device: { 	required: 'Device type is required.' },
			serial: { 		required: 'Serial is required.' },
			customername: { 	required: 'Customer Name is required.' },
			custphone: { 	required: 'Phone number is required.' },
			address: { 		required: 'Address is required.' },
			city: { 		required: 'City is required.' },
			stateList: { 	required: 'State is required.' },
			zipcode: { 		required: 'Zipcode is required.' },
			date: { 		required: 'Date is required.' }
			},
			errorPlacement: function (error, element) {
                $('<li>'+ error.text() +'</li>').appendTo($("#formErrors ul"));
            },  
       		submitHandler: function(item) {
				$('#workOrderForm').serializeArray();
				storeData(this.key);
				$.mobile.changePage("#search");
			},
		 
		}); // End of addWorkorder
});


var storeData = function(key){
			if(!key){
				
			var id					= Math.floor(Math.random() * 10000000);
		} else {
			id = key;
		}
			if ($("input[name='urgent']").is(':checked')) {
				$('#urgent').val("Yes");
			} else {
				$('#urgent').val("No");
		} 
		var item					= {
				'_id': 'workorder:' + "WM"+id
		};
		item.brand 					= $('#brand').val();
		item.device					= $('#device').val();
		item.serial					= $('#serial').val();
		item.customername			= $('#customername').val();
		item.custphone				= $('#custphone').val();
		item.address				= $('#address').val();
		item.city					= $('#city').val();
		item.state					= $('#state').val();
		item.zipcode				= $('#zipcode').val();
		item.date					= $('#date').val();
		item.esttime				= $('#esttime').val();
		item.urgent					= $('#urgent').val();
		item.notes					= $('#notes').val();

		var idcheck = item._id;
		if (idcheck === "") {
		alert('id and rev not defined!!!!');
		delete item._id;
		delete item._rev;
		}
        $.couch.db('workorderapp').saveDoc(item, {
            success: function (data) {
                console.log(status);
                alert("Workorder Saved!");
                $.mobile.changePage('#search');
            }, //close success
        }); //close couch call

		
};