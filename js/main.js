$(function(){
	//site code
	$("[data-role=header]").fixedtoolbar({ tapToggle: false }); //Fix for header toggle
	$("[data-role=footer]").fixedtoolbar({ tapToggle: false }); //Fix for footer toggle
	
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

$('#thisPageID').live('pagecreate', function(event) {
  // Default picker value of Jan 1, 2012
  var defaultPickerValue = [2012, 0, 1];
    
  // Make it a date
  var presetDate = new Date(defaultPickerValue[0], defaultPickerValue[1], defaultPickerValue[2], 0, 0, 0, 0);
    
  // Get Today
  var todaysDate = new Date(); 
    
  // Length of 1 Day
  var lengthOfDay = 24 * 60 * 60 * 1000; 
    
  // Get the difference
  var diff = parseInt((((presetDate.getTime() - todaysDate.getTime()) / lengthOfDay)+1)*-1,10); 
    
  // Set the origin date
  $('#mydate').data('datebox').options.defaultPickerValue = defaultPickerValue;
    
  // Set minDays to disallow anything earlier
  $('#mydate').data('datebox').options.minDays = diff; 
});