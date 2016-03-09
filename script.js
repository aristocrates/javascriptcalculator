/*
Nicholas Meyer
*/

var current_num = 0;
var base_display = ""; // Stores display values from the past

buttonclick = function(num) {
    current_num = 10*current_num + num;
    display = document.getElementById("display");
    display.innerHTML = base_display + "<p>" +
	current_num + "</p>";
    display.scrollTop = display.scrollHeight;
}

operatorclick = function(str) {
}

enterclick = function() {
    var display = document.getElementById("display");
    base_display = display.innerHTML;
    // If a sufficient number of lines, display the scroll bar
    display.scrollTop = display.scrollHeight;
    current_num = 0;
}

calculate_current = function() {
}
