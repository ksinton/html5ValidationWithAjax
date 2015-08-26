function validation() {

	this.init = function() {
	
		this.is_safari = false; 
	
		if ((navigator.userAgent.indexOf("Safari") > -1) && (navigator.userAgent.indexOf("Chrome") == -1)) {
			this.is_safari = true; 
		}
	
		//caching the DOM lookups here for improved performance
		this.firstNameField = document.getElementById('firstName');
		this.lastNameField = document.getElementById('lastName');
		this.emailField = document.getElementById('email');
		this.password1Field = document.getElementById('password1');
		this.password2Field = document.getElementById('password2');
		this.birthdayField = document.getElementById('birthday');
	
		//set some date vars
		this.birthdayDate = new Date();
		this.oldestDate = new Date();
		this.youngestDate = new Date();
	
		this.oldestDate.setYear(this.oldestDate.getFullYear() - 150);
		this.youngestDate.setYear(this.youngestDate.getFullYear() - 14);
	};

	this.reset = function() {
	
		if (confirm("Are you sure you want to clear all fields??")) {
			document.getElementById("signupForm").reset();
		}
	}

	this.validate = function() {
	
		//reset this to false each time
		document.getElementById("signupForm").noValidate = false;
	
		if(this.is_safari) {
			event.preventDefault();
		}
	
		if (!this.firstNameField.checkValidity()) {
		
			if(this.is_safari) {
		
				alert("The first name field is require");
				this.firstNameField.focus();
			}
		
			return false;		
		}
	
		var totalNameLength = this.firstNameField.value.length + this.lastNameField.value.length;
	
		if (totalNameLength > 50) {
		
		
			alert("Sorry we only allow names up to 50 characters long.");
			event.preventDefault();
		
			//temporarily turn off the html5 validation that will other wise cause an incorrect field focus
			//this will get set back on next time this validate function is run
			document.getElementById("signupForm").noValidate = true;
			this.firstNameField.focus();
		
			return false;		
		}
	
		if (!this.emailField.checkValidity()) {
		
			if(this.is_safari) {
		
				alert("You must enter a valid email in the username field");
				this.emailField.focus();
			}
		
			return false;		
		}
	
		if (!this.password1Field.checkValidity()) {
		
			if(this.is_safari) {
		
				alert("You must enter a password that is at least 6 characters long");
				this.password1Field.focus();
			}
		
			return false;		
		}
	
		if (this.password1Field.value != this.password2Field.value) {
		
		
			alert("Please make sure password and confirm password match");
			event.preventDefault();
		
			document.getElementById("signupForm").noValidate = true;
			this.password1Field.focus();
		
			return false;		
		}
	
		if (!this.birthdayField.checkValidity()) {
		
			if(this.is_safari) {
		
				alert("Please enter a valid date using the MM/DD/YYYY format");
				this.birthdayField.focus();
			}
		
			return false;		
		}

		if (!this.is_safari) {
			//cus we already did this for safari :-)
			event.preventDefault();
		}
	
		this.birthdayDate = this.parseDate(this.birthdayField.value);
	
		if(!this.birthdayDate) {
		
			alert("Please enter a valid date using the MM/DD/YYYY format");
			event.preventDefault();
		
			document.getElementById("signupForm").noValidate = true;
			this.birthdayField.focus();
		
			return false;	
	
		}
	
		if (this.birthdayDate < this.oldestDate) {
	
			alert("Dude your not that old!");
			event.preventDefault();
		
			document.getElementById("signupForm").noValidate = true;
			this.birthdayField.focus();
		
			return false;	
	
		}
	
		if (this.birthdayDate > this.youngestDate) {
	
			alert("Sorry you gotta be at least 14 years old to signup.");
			event.preventDefault();
		
			document.getElementById("signupForm").noValidate = true;
			this.birthdayField.focus();
		
			return false;	
		}
	
		this.birthdayISO8601 = this.birthdayDate.toISOString();
	
		console.log(this.birthdayISO8601);
		
		//AJAX CALL WOULD GO HEAR :-) 
		//and only on success would I show the thank you page
		//I would recommend doing additional server side validation in this AJAX call
		//lines below would go in the success call back from the AJAX
	
		this.buildThankyouMessage();
	
		document.getElementsByClassName("signUpScreen")[0].style.display = "none";
		document.getElementsByClassName("thanYouScreen")[0].style.display = "block";
		document.getElementById("thankYouMessageCont").innerHTML = this.thankYouMessage;
		
	
	};


	//this function could be refactored into a generic date helper lib
	this.parseDate = function(dateString) {

		var dateComponentsArray = dateString.split(/[-,/ ]+/);
	
		var dateMonth = parseInt(dateComponentsArray[0]) - 1;
		var dateDay = parseInt(dateComponentsArray[1]);
		var dateYear = parseInt(dateComponentsArray[2]);
	
		//this is needed because of the way the setDate objects set methods will try to compensate for out of range values
		if ((dateMonth < 0) || (dateMonth > 11) || (dateDay < 1) || (dateDay > 31)) {
			return false;
		}
	
	
		var dateObj = new Date();
	
		dateObj.setFullYear(dateYear, dateMonth , dateDay);
	
		return dateObj;
	}

	this.buildThankyouMessage = function() {

		this.thankYouMessage = "";
	
		this.thankYouMessage += "First Name: " + this.firstNameField.value + "<br>";
		this.thankYouMessage += "Last Name: " + this.lastNameField.value + "<br>";
		this.thankYouMessage += "Email: " + this.emailField.value + "<br>";
		this.thankYouMessage += "Birthday: " + this.birthdayField.value + "<br>";
	
	};

}

validationObj = new validation();

console.log(validationObj);

validationObj.init();
