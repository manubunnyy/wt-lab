document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent any actual form submission
  
      // Clear previous errors
      clearErrors();
  
      // Retrieve values from personal details
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const age = document.getElementById("age").value.trim();
      const bday = document.getElementById("bday").value.trim();
      const gender = document.getElementById("gender").value.trim();
      const phone = document.getElementById("phone").value.trim();
  
      // Retrieve values from account details
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm_password").value;
  
      let isValid = true;
  
      // Personal Details Validation
      if (name === "") {
        setError("name", "Full Name must be entered.");
        isValid = false;
      }
      if (email === "") {
        setError("email", "Email must be entered.");
        isValid = false;
      }
      if (age === "") {
        setError("age", "Age must be entered.");
        isValid = false;
      }
      if (bday === "") {
        setError("bday", "Birthday must be entered.");
        isValid = false;
      }
      if (gender === "") {
        setError("gender", "Please select your gender.");
        isValid = false;
      }
      if (phone === "") {
        setError("phone", "Phone number must be entered.");
        isValid = false;
      }
  
      // Account Details Validation
      if (username === "") {
        setError("username", "Username must be entered.");
        isValid = false;
      } else if (username.length < 5) {
        setError("username", "Username must be at least 5 characters long.");
        isValid = false;
      }
      if (password === "") {
        setError("password", "Password must be entered.");
        isValid = false;
      } else if (password.length < 8) {
        setError("password", "Password must be at least 8 characters long.");
        isValid = false;
      }
      if (confirmPassword === "") {
        setError("confirm_password", "Please confirm your password.");
        isValid = false;
      } else if (password !== confirmPassword) {
        setError("confirm_password", "Passwords do not match.");
        isValid = false;
      }
  
      // If all validations pass, store user data locally
      if (isValid) {
        // Create user object
        const newUser = {
          name,
          email,
          age,
          bday,
          gender,
          phone,
          username,
          password,
        };
  
        // Get existing users array or initialize new array
        let users = JSON.parse(localStorage.getItem("users")) || [];
        // Push new user
        users.push(newUser);
        // Save back to localStorage
        localStorage.setItem("users", JSON.stringify(users));
  
        alert("Registration successful!");
  
        // Reset the form to its default state (clear all fields)
        form.reset();
      }
    });
  
    // Helper to set error message for a field
    function setError(fieldId, message) {
      const errorSpan = document.getElementById("error_" + fieldId);
      if (errorSpan) {
        errorSpan.textContent = message;
      }
    }
  
    // Helper to clear all error messages
    function clearErrors() {
      const errorSpans = document.querySelectorAll(".error");
      errorSpans.forEach(function (span) {
        span.textContent = "";
      });
    }
  });
  