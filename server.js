const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Geçici sohbet geçmişi saklama
const chatHistory = [];

// CORS ayarları
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Hata yönetimi middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Bir hata oluştu' });
});

// Admin kullanıcı bilgileri
const adminUser = {
    email: 'admin@example.com',
    password: 'admin123' // Güvenlik için değiştirilmeli
};

// JWT secret key
const JWT_SECRET = 'burak-yalcin-secret-key';

// Kimlik doğrulama middleware'i
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Token gerekli' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Geçersiz token' });
        }
        req.user = user;
        next();
    });
};

// Login endpoint
app.post('/api/login', (req, res) => {
    console.log('Login isteği alındı:', req.body.email);
    
    const { email, password } = req.body;
    
    if (email === adminUser.email && password === adminUser.password) {
        const token = jwt.sign({ email }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Geçersiz kullanıcı bilgileri' });
    }
});

// Chatbot endpoint'i - Herkese açık
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        console.log('Chat isteği alındı:', message);
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Sen Burak Yalçın'ın kişisel asistanı Ateş'sin. Burak hakkında şu bilgilere sahipsin:
                        - İsim: Burak Yalçın
                        - Instagram: burakyalciinn_
                        - Rol: Bilgisayar Mühendisliği Öğrencisi
                        - Üniversite: Akdeniz Üniversitesi
                        - İlgi Alanları: Yapay Zeka, Web Geliştirme, Mobil Uygulama Geliştirme
                        - Projeler: Kişisel Web Sitesi, Yapay Zeka Destekli Chatbot, E-ticaret Platformu, Mobil Fitness Uygulaması
                        
                        Kullanıcının mesajı: ${message}`
                    }]
                }]
            })
        });

        const data = await response.json();
        const botResponse = data.candidates[0].content.parts[0].text;

        // Sohbet geçmişine ekle
        const timestamp = new Date().toISOString();
        if (!chatHistory.length || chatHistory[chatHistory.length - 1].sessionId !== timestamp.split('T')[0]) {
            chatHistory.push({
                sessionId: timestamp.split('T')[0],
                timestamp: timestamp,
                messages: []
            });
        }

        const currentSession = chatHistory[chatHistory.length - 1];
        currentSession.messages.push(
            {
                sender: 'user',
                message: message,
                timestamp: timestamp
            },
            {
                sender: 'bot',
                message: botResponse,
                timestamp: timestamp
            }
        );

        // Son 50 oturumu sakla
        if (chatHistory.length > 50) {
            chatHistory.shift();
        }

        res.json({ response: botResponse });
    } catch (error) {
        console.error('Chat hatası:', error);
        res.status(500).json({ error: 'Bir hata oluştu' });
    }
});

// Sohbet geçmişi endpoint'i - Sadece yöneticiye özel
app.get('/api/chat-history', authenticateToken, (req, res) => {
    try {
        res.json(chatHistory);
    } catch (error) {
        console.error('Geçmiş yükleme hatası:', error);
        res.status(500).json({ error: 'Sohbet geçmişi yüklenirken bir hata oluştu' });
    }
});

// Şiir admin paneli endpoint'i
app.post('/api/poems', authenticateToken, (req, res) => {
    // Şiir ekleme işlemleri burada yapılacak
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 