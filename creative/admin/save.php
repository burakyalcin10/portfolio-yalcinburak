<?php
header('Content-Type: application/json');

// CORS ayarları
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Hata raporlamayı etkinleştir
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    // Sadece POST isteklerini kabul et
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Sadece POST metodu kabul edilir');
    }

    // JSON verisini al
    $json = file_get_contents('php://input');
    if (!$json) {
        throw new Exception('Veri alınamadı');
    }

    $data = json_decode($json, true);
    if (!$data) {
        throw new Exception('Geçersiz JSON verisi');
    }

    // Dosya yolu
    $file = __DIR__ . '/../data/creative-works.json';

    // Dizinin var olduğundan emin ol
    $dir = dirname($file);
    if (!is_dir($dir)) {
        if (!mkdir($dir, 0777, true)) {
            throw new Exception('Dizin oluşturulamadı');
        }
    }

    // Dosya yazma izinlerini kontrol et
    if (file_exists($file) && !is_writable($file)) {
        throw new Exception('Dosya yazılabilir değil');
    }

    // Dosyaya yaz
    if (file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) === false) {
        throw new Exception('Veri kaydedilemedi');
    }

    echo json_encode(['success' => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?> 