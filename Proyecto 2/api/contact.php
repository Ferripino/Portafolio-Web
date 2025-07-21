<?php
// Configuración de errores y logging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Headers CORS mejorados
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, X-Requested-With');

// Función para logging
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

try {
    // Obtener y decodificar datos
    $rawInput = file_get_contents('php://input');
    logMessage('Raw input received: ' . substr($rawInput, 0, 200), 'DEBUG');
    
    $input = json_decode($rawInput, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Error al decodificar JSON: ' . json_last_error_msg());
    }
    
    if (!$input) {
        throw new Exception('No se recibieron datos válidos del formulario');
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
        throw new Exception('Campos faltantes: ' . implode(', ', $errors));
    }

    // Sanitizar y validar datos
    $firstName = htmlspecialchars(trim($input['firstName']), ENT_QUOTES, 'UTF-8');
    $lastName = htmlspecialchars(trim($input['lastName']), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($input['email']), FILTER_VALIDATE_EMAIL);
    $subject = htmlspecialchars(trim($input['subject']), ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars(trim($input['message']), ENT_QUOTES, 'UTF-8');

    // Validaciones específicas
    if (!$email) {
        throw new Exception('El email proporcionado no es válido');
    }

    if (strlen($firstName) < 2 || strlen($lastName) < 2) {
        throw new Exception('El nombre y apellido deben tener al menos 2 caracteres');
    }

    if (strlen($subject) < 5) {
        throw new Exception('El asunto debe tener al menos 5 caracteres');
    }

    if (strlen($message) < 10) {
        throw new Exception('El mensaje debe tener al menos 10 caracteres');
    }

    // Configuración del email
    $to = 'fpelegrincardoso@gmail.com';
    $emailSubject = '🚀 Nuevo contacto desde 2x3 Webs: ' . $subject;

    // Crear mensaje HTML profesional
    $htmlMessage = "
    <!DOCTYPE html>
    <html lang='es'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Nuevo Contacto - 2x3 Webs</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                background-color: #f4f4f4;
            }
            .container { 
                max-width: 600px; 
                margin: 20px auto; 
                background: #ffffff;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }
            .header { 
                background: linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%); 
                color: white; 
                padding: 40px 30px; 
                text-align: center; 
            }
            .header h1 {
                font-size: 28px;
                margin-bottom: 10px;
                font-weight: 700;
            }
            .header p {
                font-size: 16px;
                opacity: 0.9;
            }
            .content { 
                padding: 40px 30px; 
            }
            .field { 
                margin-bottom: 25px; 
                padding: 20px;
                background: #f8fafc;
                border-radius: 10px;
                border-left: 5px solid #22d3ee;
            }
            .label { 
                font-weight: 700; 
                color: #1e293b; 
                display: block;
                margin-bottom: 8px;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .value {
                color: #334155;
                font-size: 16px;
                line-height: 1.5;
            }
            .message-content {
                background: white;
                padding: 25px;
                border-radius: 10px;
                border: 2px solid #e2e8f0;
                white-space: pre-wrap;
                font-family: Georgia, serif;
                line-height: 1.8;
                font-size: 15px;
            }
            .footer { 
                text-align: center; 
                padding: 30px; 
                background: #1e293b;
                color: white;
            }
            .footer a {
                color: #22d3ee;
                text-decoration: none;
                font-weight: 600;
            }
            .footer a:hover {
                text-decoration: underline;
            }
            .contact-info {
                margin-top: 15px;
                padding-top: 15px;
                border-top: 1px solid #334155;
            }
            .badge {
                display: inline-block;
                background: #22d3ee;
                color: white;
                padding: 5px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>🚀 Nuevo Contacto</h1>
                <p>Solicitud desde 2x3webs.com</p>
                <div class='badge'>ALTA PRIORIDAD</div>
            </div>
            
            <div class='content'>
                <div class='field'>
                    <span class='label'>👤 Cliente</span>
                    <div class='value'><strong>$firstName $lastName</strong></div>
                </div>
                
                <div class='field'>
                    <span class='label'>📧 Email de Contacto</span>
                    <div class='value'><a href='mailto:$email'>$email</a></div>
                </div>
                
                <div class='field'>
                    <span class='label'>📝 Asunto del Proyecto</span>
                    <div class='value'><strong>$subject</strong></div>
                </div>
                
                <div class='field'>
                    <span class='label'>💬 Detalles del Proyecto</span>
                    <div class='message-content'>$message</div>
                </div>
            </div>
            
            <div class='footer'>
                <p><strong>2x3 Webs - Cuba Digital</strong></p>
                <p>Este mensaje fue enviado desde <a href='https://2x3webs.com'>2x3webs.com</a></p>
                
                <div class='contact-info'>
                    <p>📧 <strong>Responder a:</strong> $email</p>
                    <p>🕒 <strong>Recibido:</strong> " . date('d/m/Y H:i:s') . "</p>
                    <p>🇨🇺 <strong>Transformando Cuba digitalmente</strong></p>
                </div>
            </div>
        </div>
    </body>
    </html>
    ";

    // Headers del email
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: 2x3 Webs <noreply@2x3webs.com>',
        'Reply-To: ' . $email,
        'Return-Path: ' . $email,
        'X-Mailer: PHP/' . phpversion(),
        'X-Priority: 1',
        'Importance: High'
    ];

    // Log del intento de envío
    logMessage("Intentando enviar email a: $to desde: $email", 'INFO');

    // Enviar email
    $mailSent = mail($to, $emailSubject, $htmlMessage, implode("\r\n", $headers));

    if ($mailSent) {
        // Log exitoso
        logMessage("✅ Email enviado exitosamente - Cliente: $firstName $lastName ($email)", 'SUCCESS');
        
        // Respuesta exitosa
        echo json_encode([
            'success' => true,
            'message' => '✅ ¡Mensaje enviado exitosamente! Te contactaremos en menos de 24 horas.'
        ]);
    } else {
        throw new Exception('El servidor de correo no pudo enviar el mensaje');
    }

} catch (Exception $e) {
    // Log del error
    logMessage('❌ ERROR: ' . $e->getMessage(), 'ERROR');
    
    // Respuesta de error
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => '❌ ' . $e->getMessage() . ' Por favor, intenta de nuevo o contáctanos directamente al +53 5234-5678.'
    ]);
}
?>
