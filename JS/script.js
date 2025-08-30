// Wait for the DOM to fully load before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamic Name Feature ---
    const displayNameElement = document.getElementById('display-name');
    if (displayNameElement) {
        // We'll ask for the name only once per session using sessionStorage
        let userName = sessionStorage.getItem('userName');
        if (!userName) {
            userName = prompt("Please enter your name:", "Guest");
            sessionStorage.setItem('userName', userName ? userName : "Guest");
        }
        displayNameElement.textContent = userName ? userName : "Guest";
    }

    // --- Mobile Navigation (Hamburger Menu) ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Toggle Nav
            navLinks.classList.toggle('nav-active');
            
            // Animate Hamburger
            hamburger.classList.toggle('toggle');
        });
    }
    
    // --- Live Clock Feature ---
    const timeElement = document.getElementById('current-time');
    
    function updateTime() {
        if (timeElement) {
            const now = new Date();
            // Using Indonesian locale for better time formatting
            timeElement.textContent = now.toLocaleString('id-ID', {
                dateStyle: 'full',
                timeStyle: 'long',
                timeZone: 'Asia/Jakarta' 
            });
        }
    }
    
    // Update the time immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);

});

// --- Form Validation and Submission ---
function validateForm() {
    // Get form inputs
    const name = document.getElementById('name').value;
    const weddingDate = document.getElementById('birth-date').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const errorMessage = document.getElementById('error-message');

    // Simple validation checks
    if (name.trim() === "") {
        errorMessage.textContent = "Name cannot be empty.";
        return false;
    }
    if (weddingDate.trim() === "") {
        errorMessage.textContent = "Wedding Date cannot be empty.";
        return false;
    }
    if (!gender) {
        errorMessage.textContent = "Gender must be selected.";
        return false;
    }
    if (email.trim() === "" || !email.includes('@')) {
        errorMessage.textContent = "Please enter a valid email.";
        return false;
    }
    if (phone.trim() === "" || isNaN(phone)) {
        errorMessage.textContent = "Please enter a valid phone number.";
        return false;
    }
    if (message.trim() === "") {
        errorMessage.textContent = "Message cannot be empty.";
        return false;
    }

    // If validation passes
    errorMessage.textContent = ""; // Clear any previous error message

    // Display submitted values
    document.getElementById('output-name').textContent = name;
    document.getElementById('output-birth-date').textContent = weddingDate;
    document.getElementById('output-gender').textContent = gender.value;
    document.getElementById('output-email').textContent = email;
    document.getElementById('output-phone').textContent = phone;
    document.getElementById('output-message').textContent = message;

    alert('Thank you for your inquiry! We will get back to you soon.');
    document.getElementById('message-form').reset();


    // Prevent the form from actually submitting and reloading the page
    return false;
}