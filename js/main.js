$('#home').on('pageinit', function(){
	//code needed for main page goes here
});

$('#addWorkOrder').on('pageinit', function() {
	console.log("maybe2");
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
			console.log('hello');
                $('<li>'+ error.text() +'</li>').appendTo($("#formErrors ul"));
                //$("#formErrors").dialog('refresh');
            },
            
       		submitHandler: function(item) {
				$('#workOrderForm').serializeArray();
				storeData(this.key);
				//$('<li>'+ item +'</li>').appendTo($("#search ul"));
				$.mobile.changePage("#search");
			}
		 
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
		//alert(item);
		
}; //End of storeData.
/*
var getData = function(data){
				if(localStorage.length === 0){
			var autoFill = confirm("There are no task's to display. So default data was added.");
			if(autoFill === true){
			//autoFillData();
		}
	}
	var makeDiv = $("#datafield");
	var makeList = $("#dfId");
	//makeList.setAttribute("style", "list-style:none; padding-left:2px;"); // Style Rules for ul
	//makeDiv.appendChild(makeList);	
	for(var i=0, len=localStorage.length; i<len; i++){
		var makeLi = $("<li>");
		var makeLi = $("<li>");
		var linksLi = $("<li>");
		// makeList.appendChild(makeLi); Delete me after testing
		
		$("#dfId").append('<li></li>');
		
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		
		var makeSubList = $("<li>");
		//makeSubList.setAttribute("style", "list-style:none; padding-left:2px;");
		
		//makeLi.appendChild(makeSubList);
		$('<li>' + '</li>')
		
		getImage(obj.cats[1], makeSubList);
		for (var n in obj){
			var makeSubLi = $("<li>");
			//makeSubList.appendChild(makeSubLi);
			var optSubText = obj[n][0]+" "+obj[n][1];
			//makeSubLi.innerHTML = optSubText;
			//makeSubLi.appendChild(linksLi);
		}
		makeItemLinks(localStorage.key(i), linksLi);
	}

};
*/
/*
var getData = function(data){
				if(localStorage.length === 0){
			var autoFill = confirm("There are no task's to display. So default data was added.");
			if(autoFill === true){
			autoFillData();
		};
	};
	var srch = $("#search_list");
	//makeList.setAttribute("style", "list-style:none; padding-left:2px;"); // Style Rules for ul
	 //$("#datafield").appendChild(makeList);	
	for(var i=0, len=localStorage.length; i<len; i++){
		
		var key = localStorage.key(i);
		
		var value = localStorage.getItem(key);
		
		var obj = JSON.parse(value);
		console.log(obj);
		};
	for(var n in obj) {
			//var makeSubLi = document.createElement("li"); //!!! Created inside HTML
			//makeSubList.appendChild(makeSubLi);
			$('#optSubText').append(obj[n][0]+" "+obj[n][1]);
			console.log(obj[n][0]+" "+obj[n][1]);
			console.log(obj[n][0]+" ");
			//makeSubLi.innerHTML = optSubText;
			//makeSubLi.appendChild(linksLi);
		}
		//makeItemLinks(localStorage.key(i), linksLi);
	getImage(obj.oem[1]);
}; */

var getImage = function(catName, obj){	
		$('<img/>', {
    src:     "images/oem/" + catName + ".png",
    title:   catName,
    'class': 'OEM_Logo', // in quotes because class is a reserved js word
    click:   function( e ){
        // Everything here happens when you click the image.
        console.log( this );
    }
}).appendTo('#search, h3');
//GetImage End
		
		//var imageLi = $("li");
		//makeSubList.appendChild(imageLi);
		//var newImg = $("img");
		//var setSrc = newImg.setAttribute("src", "images/" + catName + ".png");
		//imageLi.appendChild(newImg);
	};

var getData = function(data){
			//alert('maybe');
			if(localStorage.length === 0){
			var autoFill = confirm("There are no task's to display. So default data was added.");
		if(autoFill === true){
			//autoFillData();
		}
	}
	for (var i=0, len=localStorage.length; i<len; i++) {
	//var makeLi = $("<li>");
	//makeLi.appendTo('#searchList');
	var key = localStorage.key(i);
	var value = localStorage.getItem(key);
	var obj = JSON.parse(value);
	console.log(obj);
	//getImage(obj.oem[1]);
		$(+
			'<div>'+
			'<h3>' + "" + '</h3>'+
			'<li>' + obj.oem + '</li>'+
			'<li>' + obj.device + '</li>'+
			'<li>' + obj.serial + '</li>'+
			'<li>' + obj.cust + '</li>'+
			'<li>' + obj.phone + '</li>'+
			'<li>' + obj.address + '</li>'+
			'<li>' + obj.city + '</li>'+
			'<li>' + obj.state + '</li>'+
			'<li>' + obj.zipcode + '</li>'+
			'<li>' + obj.date + '</li>'+
			'<li>' + obj.esttime + '</li>'+
			'<li>' + obj.urgent + '</li>'+
			'<li>' + obj.textbox + '</li>'+
			'</div>'
		).appendTo('#search_list');
		
		}
		
		for (var n in obj) {
			var optSubText = obj[n][0]+" "+obj[n][1];
			//var div2 = "<div data-role="collapsible" data-collapsed="true" data-inset="true" data-theme="a">";
		//("#search").on("div:fourth").attr('data-role="collapsible"');
			console.log(obj);

		
		//getImage();
			
	//	makeSubLi.innerHTML = optSubText;
	//	makeSubLi.appendChild(linksLi);
		
	}
	
	$("#search_list").listview('refresh');
	
	//console.log(getData);
	
	
};

$("#clear, #clear2").click(function() {
 console.log('maybe');
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

$('#search').on('pageinit', function(){
		getData(datafield);
});

$('#formErrors').on('pageinit', function(){

});
