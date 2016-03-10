/*
Nicholas Meyer, 2016
*/

var current_num = "";  // stores the current number as a string
                       // and converts to a number as necessary
var base_display = ""; // stores display values from the past
var warning_str = "";

update_screen = function() {
    display = document.getElementById("display");

    // Display the previous entries with the current on bottom
    var display_str = base_display + "<p>" + current_num + "</p>";
    display.innerHTML = display_str;
    
    // Keep the display scrolled to the bottom
    display.scrollTop = display.scrollHeight;
}

buttonclick = function(num) {
    current_num += num;

    update_screen();
}

warn = function(message, time) {
    display_warning(message);
    setTimeout(remove_warning, time);
}

display_warning = function(message) {
    warning_str = '<div id="warning">' + message + '</div>';
    show_warning_div(warning_str);
    update_screen();
}

remove_warning = function() {
    warning_str = "";
    remove_warning_div();
    update_screen();
}

var originalBody = "";

// hackish effort to handle nested warnings
nested_warnings = 0;

show_warning_div = function(message) {
    nested_warnings += 1;
    
    if (originalBody === "")
    {
	originalBody = document.body.innerHTML;
    }
    document.body.innerHTML = message + originalBody;
    //document.getElementById("warningwrapper").innerHTML = message;
}

remove_warning_div = function(message) {
    nested_warnings -= 1;
    //document.getElementById("warningwrapper").innerHTML = "";
    document.body.innerHTML = originalBody;

    // only set the original body to empty if this is the last
    // warning
    if (nested_warnings === 0)
    {
	originalBody = "";
    }
}

backspaceclick = function() {
    current_num = current_num.substring(0, current_num.length - 1);
    update_screen();
}

// Available operators are +, -, x, ÷, pow, log
operatorclick = function(str) {
    // firstly push the current num onto the stack
    push(parseFloat(current_num));
    // now calculate the answer and push that
    var ans;
    
    // operate on the last two elements of the stack and push the result
    if (!empty())
    {
	var num1 = pop();
    }
    else
    {
	// Note: this code block never actually runs since
	// by default NaN will be pushed if no input was entered
	
	// Alert user to the error
	warn("Error: insufficient stack", 2000);
	return;
    }
    if (!Number.isFinite(num1))
    {
	// Alert user to the error
	warn("Error: insufficient stack", 2000);
	return;
    }
    
    if (str === "log")
    {
	if (num1 <= 0)
	{
	    warn("Error: argument must be positive", 2000);
	    return;
	}
	else
	{
	    ans = Math.log(num1);
	}
    }
    else
    {
	// every operator other than log is binary
	if (!empty())
	{
	    var num2 = pop();
	}
	else
	{
	    // Alert user to the error
	    warn("Error: insufficient stack", 2000);
	    return;
	}
	switch(str)
	{
	    case '+':
	    ans = num1 + num2;
	    break;
	    case '-':
	    ans = num1 - num2;
	    break;
	    case 'x':
	    ans = num1 * num2;
	    break;
	    case '÷':
	    if (num2 == 0)
	    {
		warn("Error: cannot divide by zero", 2000);
		return;
	    }
	    ans = num1 / num2;
	    break;
	    case 'pow':
	    ans = Math.pow(num1, num2);
	    break;
	    default:
	}
    }
    base_display = get_text();
    current_num = ans + "";
    update_screen();
}

decimalclick = function() {
    // Don't do anything if already using decimals
    if (!Number.isInteger(parseFloat(current_num)))
    {
	return;
    }
    current_num += "."; // add the decimal point
    update_screen();
}

popclick = function() {
    if (!empty())
    {
	pop();
    }
    base_display = get_text();
    update_screen();
}

enterclick = function() {
    var display = document.getElementById("display");
    // base_display = display.innerHTML;
    
    // If a sufficient number of lines, display the scroll bar
    display.scrollTop = display.scrollHeight;
    // Push the current number onto the stack
    push(parseFloat(current_num));
    current_num = "";

    // decimal mode will be false
    decimalmode = false;
    
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

empty = function() {
    return num_stack.length === 0;
}

pop = function() {
    var ans = num_stack[num_stack.length - 1];
    num_stack.splice(num_stack.length - 1, 1);
    return ans;
}

// Key listeners

document.addEventListener('keydown', function(event) {
    if (handle_key_code(event.keyCode))
    {
	// if the key was handled, don't have the backspace
	// make the user leave the page
	event.preventDefault();
    }
});

handle_key_code = function(key_code) {
    if (!handle_digit(key_code))
    {
	return handle_operator(key_code);
    }
    return true;
}

var nums1 = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 110];
var nums2 = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 190];
handle_digit = function(key_code) {
    var num = nums1.indexOf(key_code);
    if (num != -1)
    {
	if (num <= 9)
	{
	    buttonclick(num);
	}
	else
	{
	    decimalclick();
	}
	return true;
    }
    num = nums2.indexOf(key_code);
    if (num != -1)
    {
	if (num <= 9)
	{
	    buttonclick(num);
	}
	else
	{
	    decimalclick();
	}
	return true;
    }
    return false;
}

operators1 = [187, 189, 56, 191, 54, 76, 8, 46, 13];
operators2 = [107, 109, 106, 111, 54, 76, 8, 46, 13];
// Available operators are +, -, x, ÷, pow, log, backspace, delete, enter
operatorsDo = ['+', '-', 'x', '÷', 'pow', 'log'];
handle_operator = function(key_code) {
    op = operators1.indexOf(key_code);
    if (op != -1)
    {
	if (op <= 5)
	{
	    operatorclick(operatorsDo[op]);
	}
	else
	{
	    switch (op)
	    {
		case 6:
		backspaceclick();
		break;
		case 7:
		popclick();
		break;
		case 8:
		enterclick();
		break;
		default:
	    }
	}
	return true;
    }
    op = operators2.indexOf(key_code);
    if (op != -1)
    {
	if (op <= 5)
	{
	    operatorclick(operatorsDo[op]);
	}
	else
	{
	    switch (op)
	    {
		case 6:
		backspaceclick();
		break;
		case 7:
		popclick();
		break;
		case 8:
		enterclick();
		break;
		default:
	    }
	}
	return true;
    }
    return false;
}
