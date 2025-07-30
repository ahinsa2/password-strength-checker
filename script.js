const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strength-bar");
const strengthLabel = document.getElementById("strength-label");
const feedbackList = document.getElementById("feedback");
const submitBtn = document.getElementById("submit-btn");


passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  const result = checkPasswordStrength(password);

  strengthLabel.textContent = "Strength: " + result.strength;
  strengthBar.style.width = result.percentage + "%";
  strengthBar.style.backgroundColor = result.color;

  feedbackList.innerHTML = "";
  result.feedback.forEach(tip => {
    const li = document.createElement("li");
    li.textContent = tip;
    feedbackList.appendChild(li);
  });
});


submitBtn.addEventListener("click", () => {
  const password = passwordInput.value;
  if (password.trim() === "") {
    alert("Please enter a password.");
  } else {
    alert("Password checked: " + password);
  }
});

// Strength checking logic
function checkPasswordStrength(password) {
  let points = 0;
  let feedback = [];

  if (password.length >= 8) points++;
  else feedback.push("Use at least 8 characters.");

  if (/[a-z]/.test(password)) points++;
  else feedback.push("Add lowercase letters.");

  if (/[A-Z]/.test(password)) points++;
  else feedback.push("Add uppercase letters.");

  if (/\d/.test(password)) points++;
  else feedback.push("Include numbers.");

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) points++;
  else feedback.push("Add special characters (!@# etc).");

  let strength = "Weak";
  let color = "red";
  let percent = points * 20;

  if (points >= 4) {
    strength = "Strong";
    color = "green";
  } else if (points === 3) {
    strength = "Moderate";
    color = "orange";
  }

  return { strength, color, percentage: percent, feedback };
}
