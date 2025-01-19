<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to = "fpelegrincardoso@gmail.com";
    $subject = "New Contact Form Submission from $name";
    $body = "Name: $name\nEmail: $email\nMessage: $message";
    $headers = "From: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Thank you, $name. Your message has been sent.";
    } else {
        echo "There was a problem sending your message. Please try again.";
    }
} else {
    echo "Method not allowed.";
}
?>