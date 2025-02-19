document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    clearErrors();

    const username = document.getElementById("login_username").value.trim();
    const password = document.getElementById("login_password").value;

    let isValid = true;
    if (username === "") {
      setError("login_username", "Username must be entered.");
      isValid = false;
    }
    if (password === "") {
      setError("login_password", "Password must be entered.");
      isValid = false;
    }
    if (!isValid) return;

    // Retrieve registered users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if a matching user exists
    const matchingUser = users.find(
      (user) => user.username === username && user.password === password
    );

    const feedback = document.getElementById("loginFeedback");
    if (matchingUser) {
      feedback.style.color = "green";
      feedback.textContent = "User is genuine/valid user. Redirecting...";
      // Redirect to online bookstore (main.html) after a short delay
      setTimeout(function () {
        window.location.href = "main.html";
      }, 1000);
    } else {
      feedback.style.color = "red";
      feedback.textContent = "Wrong credentials or the user doesn't exist.";
    }
  });

  // Helper function to set error message for a field
  function setError(fieldId, message) {
    const errorSpan = document.getElementById("error_" + fieldId);
    if (errorSpan) {
      errorSpan.textContent = message;
    }
  }

  // Helper function to clear all error messages
  function clearErrors() {
    const errorSpans = document.querySelectorAll(".error");
    errorSpans.forEach(function (span) {
      span.textContent = "";
    });
    const feedback = document.getElementById("loginFeedback");
    if (feedback) {
      feedback.textContent = "";
    }
  }
});
