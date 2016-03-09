/*
Nicholas Meyer
*/

var current_num = 0;
var base_display = ""; // Stores display values from the past

update_screen = function() {
    display = document.getElementById("display");
    // Display the previous entries with the current on bottom
    display.innerHTML = base_display + "<p>" +
	current_num + "</p>";
    display.scrollTop = display.scrollHeight;
}

buttonclick = function(num) {
    current_num = 10*current_num + num;
    update_screen();
}

operatorclick = function(str) {
    // operate on the last two elements of the stack and push the result
    
}

backspaceclick = function() {
    current_num = Math.floor(current_num / 10);
    update_screen();
}

enterclick = function() {
    var display = document.getElementById("display");
    // base_display = display.innerHTML;
    
    // If a sufficient number of lines, display the scroll bar
    display.scrollTop = display.scrollHeight;
    // Push the current number onto the stack
    push(current_num);
    current_num = 0;

    base_display = get_text();
    update_screen();
}

// "Stack" methods (using an array to allow for random access
// when making the text display) :

var num_stack = [];

get_text = function() {
    var text = "";
    for (var i = 0; i < num_stack.length; i = i + 1)
    {
	text = text + "<p>" + num_stack[i] + "</p>";
    }
    return text;
}

push = function(num) {
    num_stack[num_stack.length] = num;
}

pop = function() {
    num_stack.splice(num_stack.length - 1, 1);
}
