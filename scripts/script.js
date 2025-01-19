document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const formData = new FormData(this);
    fetch('contact.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Show server response
        this.reset(); // Reset the form
    })
    .catch(error => {
        console.error('Error:', error);
    });
});