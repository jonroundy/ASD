$('#home').on('pageinit', function(){
	//code needed for main page goes here
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

};//GetImage End
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
	//console.log($(''));
	//getImage(obj.oem[1]);
	//$('<img src="++"/>', {src:     "images/oem/" + obj.oem + ".png",'class': 'OEM_Logo' })
//$(function(){
		//console.log(obj.oem);
		

            
		$(
			'<li>'+
			$('<img/>', {src: "images/oem/" + obj.oem + ".png",'class': 'OEM_Logo'})+
			'<h3>' + "" + '</h3>'+
			'<p><span class="oem">Brand: </span>' + obj.oem + '</p>'+
			'<p><span class="label">Device: </span>' + obj.device + '</p>'+
			'<p><span class="label">Serial / Service Tag: </span>' + obj.serial + '</p>'+
			'<p><span class="label">Customer Name: </span>' + obj.cust + '</p>'+
			'<p><span class="label">Phone Number: </span>' + obj.phone + '</p>'+
			'<p><span class="label">Address: </span>' + obj.address + '</p>'+
			'<p><span class="label">City: </span>' + obj.city + '</p>'+
			'<p><span class="label">State: </span>' + obj.state + '</p>'+
			'<p><span class="label">Zipcode: </span>' + obj.zipcode + '</p>'+
			'<p><span class="label">Date: </span>' + obj.date + '</p>'+
			'<p><span class="label">Estimated Repair Time: </span>' + obj.esttime + '</p>'+
			'<p><span class="label">Work order URGENT?: </span>' + obj.urgent + '</p>'+
			'<p><span class="label">Notes: </span>' + obj.textbox + '</p>'+
			'</li>'
		).appendTo('#search_list');
		
		}
		//for (var n in obj) {
		//	var optSubText = obj[n][0]+" "+obj[n][1];
			//var div2 = "<div data-role="collapsible" data-collapsed="true" data-inset="true" data-theme="a">";
		//("#search").on("div:fourth").attr('data-role="collapsible"');
			//console.log(obj);

		
		//getImage();
			
	//	makeSubLi.innerHTML = optSubText;
	//	makeSubLi.appendChild(linksLi);
		
	
	
	$("#search_list").listview('refresh');
	
	//console.log(getData);
	
};

$("#clear, #clear2").click(function() {
 console.log('clearData');
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
		//$( ".dataPopupLink" ).popup( "open" );
		$("#dataPopupLink").click();
});

    
$('#formErrors').on('pageinit', function(){

});

$( '#csv' ).on( 'click', function() {
$.ajax( {
            url: 'xhr/data.csv',
            type: 'GET',
            dataType: 'text',
            success:function (data) {

var data2 = $.csv2Array(data, {
      onParseValue: $.csv.hooks.castToScalar
    });


$(
			'<li>'+
			'<h3>' + "" + '</h3>'+
			'<p>' + data2[2] + '</p>'+
			'<p>' + data2[3] + '</p>'+
			'<p>' + data2[4] + '</p>'+
			'<p>' + data2[5] + '</p>'+
			'<p>' + data2[6] + '</p>'+
			'</li>'
		).appendTo('#search_list');
}
})
});
		
		
		
		
		
		
   //      console.log(endResult[1]);
//console.log(item[2]);
//console.log(item[1]);
            

/*
$( '#csv' ).on( 'click', function() {

$.ajax( {
            url: 'xhr/data.csv',
            type: 'GET',
            dataType: 'text',
            success:function (data) {
	       	var allTextLines = data.split(/\r\n|\n/);
	       	var headers = allTextLines[0].split(',');
	       	var lines = [];

	       	for (var i=1; i<allTextLines.length; i++) {
		       	var data = allTextLines[i].split(',');
		       	if (data.length == headers.length) {
			       	var tools = [];

			       	for (var j=0; j<headers.length; j++) {
				       	tools.push(data[j]);
}
lines.push(tools);
}	

}
            
            } //success end
            
       }) //Ajax end

});//CSV end
*/     
