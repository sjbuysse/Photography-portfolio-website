//task: make submit button interactive

//when button is pressed
	//check if all fields are filled in.
		//if yes, then clear all fields and display "message send"" on page.
		//else color field that lacks input and display tip
	

var nameField = $("#name");
var emailField = $("#email");
var msgField = $("#message");
var $nameTip = $("<span class='tip'>Please provide a name</span>");
var $msgTip = $("<span class='tip'>Please write a message</span>");
var $emailTip = $("<span class='tip'>Please provide a valid emailadress</span>");
var errorColor = "#FCE2DF";

function checkName() {
	if(nameField.val().length > 0){
			$nameTip.hide();
			return true;
	} else{
		$("label[for='name']").append($nameTip);
		$nameTip.show();
		return false;
	}
}

function checkEmail() {
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(re.test(emailField.val())){
		$emailTip.hide();
		return true;
	} else{
		$("label[for='email']").append($emailTip);
		$emailTip.show();
		return false;
	}
}
function checkMsg() {
	if(msgField.val().length > 0)	{
		$msgTip.hide();
		return true;
	} else {
		$("label[for='message']").append($msgTip);	
		$msgTip.show();
		return false;
	}
}
	
$("#submitBtn").click(function(){
	var check1 = checkName();
	var check2 = checkEmail()
	var check3 = checkMsg();
	if(check1 && check2 && check3){
		console.log("1");
		nameField.val("");
		emailField.val("");
		msgField.val("");
	} else {
		console.log("2");
	}	
});