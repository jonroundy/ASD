$(function(){
	//site code
	
	var menuStatus;
 
    $("a.showMenu").click(function(){
        if(menuStatus != true){
        $(".ui-page-active").animate({
            marginLeft: "165px",
          }, 300, function(){menuStatus = true});
          return false;
          } else {
            $(".ui-page-active").animate({
            marginLeft: "0px",
          }, 300, function(){menuStatus = false});
            return false;
          }
    });
 
    $('.pages').live("swipeleft", function(){
        if (menuStatus){
        $(".ui-page-active").animate({
            marginLeft: "0px",
          }, 300, function(){menuStatus = false});
          }
    });
 
    $('.pages').live("swiperight", function(){
        if (!menuStatus){
        $(".ui-page-active").animate({
            marginLeft: "165px",
          }, 300, function(){menuStatus = true});
          }
    });
 
    $("#menu li a").click(function(){
        var p = $(this).parent();
        if($(p).hasClass('active')){
            $("#menu li").removeClass('active');
        } else {
            $("#menu li").removeClass('active');
            $(p).addClass('active');
        }
    });//Slide Menu
});
  

$('#home').on('pageinit', function(){
	//code needed for main page goes here
});

$('#addWorkOrder').on('pageinit', function() {

	$('#workOrderForm').validate({
			invalidHandler: function(form, validator) {

			//$('workOrderForm').showErrors( errors )
			//$("#formErrors").dialog('open');
			},
			messages: {
				oemList: { required: 'OEM is required.<br/>' },
				deviceList: { required: 'Device type is required.<br/>' },
				serial: { required: 'Serial is required.<br/>' },
				custName: { required: 'Customer Name is required.<br/>' },
				phoneNumber: { required: 'Phone number is required.<br/>' },
				address: { required: 'Address is required.<br/>' },
				city: { required: 'City is required.<br/>' },
				stateList: { required: 'State is required.<br/>' },
				zipcode: { required: 'Zipcode is required.<br/>' },
				date: { required: 'Date is required.<br/>' }
			},
			errorPlacement: function (error, element) {
			console.log(
                error.appendTo($("#formErrors"));
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

/*
var getData = function(data){
				if(localStorage.length === 0){
			var autoFill = confirm("There are no task's to display. So default data was added.");
			if(autoFill === true){
			autoFillData();
		}
	}
	var makeDiv = g("datafield");
	var makeList = g("dfId");
	//makeList.setAttribute("style", "list-style:none; padding-left:2px;"); // Style Rules for ul
	makeDiv.appendChild(makeList);	
	for(var i=0, len=localStorage.length; i<len; i++){
		var makeLi = document.createElement("li");
		var linksLi = document.createElement("li");
		makeList.appendChild(makeLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var makeSubList = document.createElement("li");
		//makeSubList.setAttribute("style", "list-style:none; padding-left:2px;");
		
		makeLi.appendChild(makeSubList);
		getImage(obj.cats[1], makeSubList);
		for (var n in obj){
			var makeSubLi = document.createElement("li");
			makeSubList.appendChild(makeSubLi);
			var optSubText = obj[n][0]+" "+obj[n][1];
			makeSubLi.innerHTML = optSubText;
			makeSubLi.appendChild(linksLi);
		}
		makeItemLinks(localStorage.key(i), linksLi);
	}

};

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

$('#dialog').on('pageinit', function(){

});
*/