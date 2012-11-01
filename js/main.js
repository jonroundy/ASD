$('#home').on('pageinit', function(){
	//code needed for main page goes here
});

$('#addWorkOrder').on('pageinit', function() {

	$('#workOrderForm').validate( {
		invalidHandler: function (form, validator) {
			$.mobile.changePage("#formErrors");
			
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
                //error.appendTo($("#formErrors"));
                $('<li>'+ error.text() +'</li>').appendTo($("#formErrors ul"));
              
            },
			submitHandler: function() {
				$('#workOrderForm').serializeArray();
				storeData(this.key);
			}
		});
		}); // End of addWorkorder
	
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
		item.oem					= ["OEM List: ", $('#oemList').val()];
		item.device					= ["Device: ", $('#deviceList').val()];
		item.serial					= ["Serial / Service Tag: ", $('#serial').val()];
		item.cust					= ["Customer Name: ", $('#custName').val()];
		item.phone					= ["Phone Number: ", $('#phoneNumber').val()];
		item.address				= ["Address: ", $('#address').val()];
		item.city					= ["City: ", $('#city').val()];
		item.state					= ["State: ", $('#stateList').val()];
		item.zipcode				= ["Zipcode: ", $('#zipcode').val()];
		item.date					= ["Date: ", $('#date').val()];
		item.esttime				= ["Estimated Repair Time: ", $('#esttime').val()];
		item.urgent					= ["Work order UGRENT? ", $('#urgent').val()];
		item.textbox				= ["Notes: ", $('#textbox').val()];

			//Save data into Local Storage: Use Stringify to convert our object to a string. Local storage only stores strings.
			//Save form elements into LS
			localStorage.setItem(id, JSON.stringify(item));
			alert("Task Saved!");
			console.log(item);
			//window.location.reload(); 
		//loadPage();
		//letsr();
		//console.log("id", id);
		alert(item);
		
}; //End of storeData.

$("#clear").click(function() {
  		if(localStorage.length === 0) {
			alert("There is no data to clear.");
		}else{	
			var ask = confirm("Are you sure you want to clear LocalStorage?");
			if(ask){
				localStorage.clear();
			alert("LocalStorage has been cleared!");
				window.location.reload();
		}
		return false;
	}

});