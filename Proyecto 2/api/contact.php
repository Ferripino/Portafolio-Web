<?php
// Configuración de errores y logging (no mostrar errores al cliente en producción)
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Ajustes de CORS seguros: permitir solo orígenes confiables
header('Content-Type: application/json; charset=utf-8');
$allowed_origins = [
    'https://2x3webs.com',
    'https://portafolio-web-ferripinos-projects.vercel.app',
    'http://localhost',
    'http://127.0.0.1'
];
if (isset($_SERVER['HTTP_ORIGIN'])) {
    $origin = $_SERVER['HTTP_ORIGIN'];
    if (in_array($origin, $allowed_origins, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
    }
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, X-Requested-With');

// Función para logging (no incluir PII completo)
function logMessage($message, $type = 'INFO') {
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] [$type] $message\n";
    file_put_contents(__DIR__ . '/contact.log', $logEntry, FILE_APPEND | LOCK_EX);
}

// Manejar preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    logMessage('Método no permitido: ' . $_SERVER['REQUEST_METHOD'], 'ERROR');
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Método no permitido. Solo se acepta POST.'
    ]);
    exit();
}

// Simple rate limiting por IP: 5 envíos por hora
$rateLimitFile = __DIR__ . '/rate_limit.json';
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$limit = 5;
$window = 3600; // segundos
$rates = [];
if (file_exists($rateLimitFile)) {
    $json = file_get_contents($rateLimitFile);
    $rates = json_decode($json, true) ?: [];
}
$now = time();
if (!isset($rates[$ip])) {
    $rates[$ip] = [];
}
// limpiar entradas antiguas
$rates[$ip] = array_filter($rates[$ip], function($ts) use ($now, $window) { return ($now - $ts) < $window; });
if (count($rates[$ip]) >= $limit) {
    logMessage("Rate limit exceeded for $ip", 'WARN');
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Demasiadas solicitudes. Intenta de nuevo más tarde.']);
    exit();
}

try {
    // Obtener y decodificar datos
    $rawInput = file_get_contents('php://input');
    // No registrar raw input en producción para evitar PII
    // logMessage('Raw input length: ' . strlen($rawInput), 'DEBUG');
    
    $input = json_decode($rawInput, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Datos inválidos');
    }
    
    if (!$input) {
        throw new Exception('No se recibieron datos válidos');
    }

    // Validar campos requeridos
    $requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
    $errors = [];

    foreach ($requiredFields as $field) {
        if (!isset($input[$field]) || empty(trim($input[$field]))) {
            $errors[] = "El campo '$field' es requerido";
        }
    }

    if (!empty($errors)) {
        throw new Exception('Campos faltantes');
    }

    // Sanitizar y validar datos
    $firstName = filter_var(trim($input['firstName']), FILTER_SANITIZE_STRING);
    $lastName = filter_var(trim($input['lastName']), FILTER_SANITIZE_STRING);
    $emailRaw = trim($input['email']);
    $email = filter_var($emailRaw, FILTER_VALIDATE_EMAIL);
    $subjectRaw = trim($input['subject']);
    $subject = filter_var($subjectRaw, FILTER_SANITIZE_STRING);
    $messageRaw = trim($input['message']);
    $message = htmlspecialchars($messageRaw, ENT_QUOTES, 'UTF-8');

    // Validaciones específicas
    if (!$email) {
        throw new Exception('Email no válido');
    }

    if (mb_strlen($firstName) < 2 || mb_strlen($lastName) < 2) {
        throw new Exception('Nombre y apellido demasiado cortos');
    }

    if (mb_strlen($subject) < 5) {
        throw new Exception('Asunto demasiado corto');
    }

    if (mb_strlen($messageRaw) < 10) {
        throw new Exception('Mensaje demasiado corto');
    }

    // Prevenir header injection
    $safeEmail = preg_replace('/[\r\n]+/', ' ', $email);
    $safeSubject = preg_replace('/[\r\n]+/', ' ', $subject);

    // Configuración del email
    $to = 'fpelegrincardoso@gmail.com';
    $emailSubject = '🚀 Nuevo contacto desde 2x3 Webs: ' . $safeSubject;

    // Crear mensaje HTML (resumido en logs para evitar PII)
    $htmlMessage = "<html><body>Nuevo contacto de " . htmlentities($firstName . ' ' . $lastName) . "</body></html>";

    // Headers seguros
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: 2x3 Webs <noreply@2x3webs.com>',
        'Reply-To: ' . $safeEmail,
        'X-Mailer: PHP/' . phpversion()
    ];

    // Intento de envío
    logMessage("Intento de envío desde IP $ip - remitente: " . substr($safeEmail,0,50), 'INFO');
    $mailSent = mail($to, $emailSubject, $htmlMessage, implode("\r\n", $headers));

    if ($mailSent) {
        // Registrar intento en rate limit
        $rates[$ip][] = $now;
        file_put_contents($rateLimitFile, json_encode($rates));

        logMessage("Email enviado (IP: $ip)", 'SUCCESS');
        echo json_encode([
            'success' => true,
            'message' => 'Mensaje enviado correctamente. Gracias.'
        ]);
    } else {
        throw new Exception('No fue posible enviar el mensaje');
    }

} catch (Exception $e) {
    // Log del error (detalle solo en logs)
    logMessage('ERROR interno: ' . $e->getMessage(), 'ERROR');
    
    // Respuesta genérica al cliente
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Ocurrió un error al procesar el formulario. Intenta de nuevo más tarde.'
    ]);
}

?>
