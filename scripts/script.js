import Swal from 'sweetalert2'

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const formData = new FormData(this);
    fetch('contact.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        Swal.fire({
            title: "Gracias por su mensaje",
            text: "En un rato me pondré en contacto con usted",
            icon: "success"
          }); // Show server response
        this.reset(); // Reset the form
    })
    .catch(error => {
        Swal.fire({
            icon: "error",
            title: "ERROR",
            text: "Halgo a salido mal, por favor, intente de nuevo",
          });
        console.error('Error:', error);
    });
});
