/*
Nicholas Meyer
*/

var current_num = "";  // stores the current number as a string
                       // and converts to a number as necessary
var base_display = ""; // stores display values from the past

update_screen = function() {
    display = document.getElementById("display");

    // Display the previous entries with the current on bottom
    var display_str = base_display + "<p>" + current_num + "</p>";
    display.innerHTML = display_str;
    
    // Keep the display scrolled to the bottom
    display.scrollTop = display.scrollHeight;
}

buttonclick = function(num) {
    // handle the case where current_num is negative or zero
    //sign = (current_num === 0)? 1:current_num / Math.abs(current_num);
    //current_num *= sign; // current_num is now guaranteed to be nonnegative
    
    /*if (!decimalmode)
    {
	// string conversion and then conversion back to number
	current_num = current_num + num;
    }
    else
    {
	decimalplaces += 1;
	// string conversion and then conversion back to number
	current_num = parseFloat();
	}*/
    current_num += num;

    //current_num *= sign;
    update_screen();
}

backspaceclick = function() {
    // handle the case where current_num is negative or zero
    /*sign = (current_num === 0)? 1:current_num / Math.abs(current_num);
    current_num *= sign; // current_num is now guaranteed to be nonnegative
    if (!decimal_mode)
    {
	current_num = Math.floor(current_num / 10);
	update_screen();
    }
    else
    {
	current_num = 0;
	update_screen();
    }*/
    //current_num *= sign;

    // since current_num is stored as a string, just truncate the string
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
	// Alert user to the error
    }
    if (str === "log")
    {
	ans = Math.log(num1);
	console.log("log");
    }
    else
    {
	// every operator other than log is binary
	if (!empty())
	{
	    console.log("not empty");
	    var num2 = pop();
	}
	else
	{
	    console.log("empty");
	    // Alert user to the error
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
	    ans = num1 / num2;
	    break;
	    case 'pow':
	    ans = Math.pow(num1, num2);
	    break;
	    default:
	}
    }
    console.log(num1);
    console.log(num2);
    console.log(ans);
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
    current_num = 0;

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
