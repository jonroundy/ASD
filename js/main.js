$(function(){
	//site code
	
	//$("[data-role=header]").fixedtoolbar({ tapToggle: false }); //Fix for header toggle
	//$("[data-role=footer]").fixedtoolbar({ tapToggle: false }); //Fix for footer toggle
	
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

$('#addWorkorder').on('pageinit', function(){
		//delete $.validator.methods.date;
		var myform = $('#woForm'),
			tferrorslink= $('#woerrorslink')
		;
		
		myform.validate({
			invalidHandler: function(form, validator){
				tferrorslink.click();
				var html = '';
				for(var key in validator.submitted){
					var label = $('label[for^="'+ key +'"]').not('[generated]');
					var legend = label.closest('fieldset').find('ui-controlgroup-label');
					var fieldName = legend.length ? legend.text() : label.text();
					html += '<li>'+ fieldName +'</li>';
					var cleanString = html.replace(/[:]/g, ""); //Removes all instances of :

				};
				$("#taskFormErrors ul").html(cleanString, html)
				$("#taskFormErrors p").blink();
		
			},
			submitHandler: function() {
				var data = myform.serializeArray();
				storeData(this.key);
			}
});//End of myform.

});

	//any other code needed for addItem page goes here
	
});

	//The functions below can go inside or outside the pageinit function for the page in which it is needed.
	
	//getElementById Function
	
function g(x){
		var theElement = document.getElementById(x);
		return theElement;
};
	
function getCheckboxVault(){
		if(g('urgent').checked){
			urgentValue = g('urgent').value;
		}else{
			urgentValue	= "No";
		}
};
		
	// Auto Populate Local Storage.
var autoFillData = function(){
		//Store the JSON OBJECT into Local Storage.
	for(var n in json){
		var id = Math.floor(Math.random()*100000001);
		localStorage.setItem(id, JSON.stringify(json[n]));
	}
};

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

var getImage = function(catName, makeSubList){
		var imageLi = document.createElement("li");
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement("img");
		var setSrc = newImg.setAttribute("src", "images/" + catName + ".png");
		imageLi.appendChild(newImg);
	};

	//Make Item Links
	//Create the edit and delete links for each storred item when displayed
var makeItemLinks = function(key, linksLi){
		//add line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		//add edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#addTask";
		editLink.key = key;
		var editText = "Edit Task";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//add line breakTag
		linksLi.appendChild(breakTag);
		
		//add delete single item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		deleteLink.setAttribute("data-role", "button");
		var deleteText = "Delete Task";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
		
		//add horizontal line
		var hrTag = document.createElement('hr');
		linksLi.appendChild(hrTag);
	};
var storeData = function(key){
			if(!key){
			var id					= Math.floor(Math.random()*100000001);
		}else{
			//Set the id to the existing key we're editing so that it will save over the data.
			//The key is the same ky that's been passed along from the editSubmit event handler
			//To the validate function, and then passed here, into the storeData function.
			id = key;
		}
			//Gather up all our form field values and store in an object.
			//Object properties are going to contain array with the form label and input value
			getCheckboxVault();
		var item					= {};
			item.cats				= ["Category List: ", g("categoryList").value];
			item.taskname			= ["Task Name: ", g("taskname").value];
			item.date				= ["Date: ", g("date").value];
			item.time				= ["Time: ", g("time").value];
			item.urgent				= ["Urgent: ", urgentValue];
			item.esttime			= ["Estimated Time.", g("esttime").value];
			item.textbox			= ["Notes: ", g("textbox").value];
			//Save data into Local Storage: Use Stringify to convert our object to a string. Local storage only stores strings.
			//Save form elements into LS
			localStorage.setItem(id, JSON.stringify(item));
			alert("Task Saved!");
		loadPage();
		//letsr();
		

};
//End of storeData.