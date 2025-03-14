# Burak Yalçın - Kişisel Portföy Sitesi

Bu proje, kişisel portföy ve yaratıcı çalışmalarımı sergilediğim web sitesinin kaynak kodlarını içerir.

## 🚀 Özellikler

- 💼 Portföy vitrini
- 📝 Yaratıcı çalışmalar bölümü (şiirler ve şarkı sözleri)
- 🔐 Yönetici paneli
- 📱 Responsive tasarım
- 🎨 Modern ve şık arayüz

## 🛠️ Kullanılan Teknolojiler

- HTML5
- CSS3
- JavaScript (Vanilla)
- Bootstrap 5
- Font Awesome
- Local Storage (veri depolama)
- JWT (kimlik doğrulama)

## 📦 Kurulum

1. Repoyu klonlayın:
```bash
git clone https://github.com/yourusername/yalcinburak-portfolio.git
```

2. Proje dizinine gidin:
```bash
cd yalcinburak-portfolio
```

3. Gerekli paketleri yükleyin:
```bash
npm install
```

4. `.env` dosyasını oluşturun ve JWT anahtarını ayarlayın:
```
JWT_SECRET=your_secure_jwt_secret_key
```

5. Admin bilgilerini güncelleyin:
   - `server.js` dosyasında `adminUser` nesnesini
   - `creative/admin/admin.js` dosyasında `handleLogin` fonksiyonunu

6. Sunucuyu başlatın:
```bash
node server.js
```

## 📦 Kurulum

1. Repoyu klonlayın:
```bash
git clone https://github.com/yourusername/yalcinburak-portfolio.git
```

2. Proje dizinine gidin:
```bash
cd yalcinburak-portfolio
```

3. `index.html` dosyasını bir web tarayıcısında açın veya bir local sunucu kullanın.

## 📂 Proje Yapısı

```
yalcinburak-portfolio/
├── index.html              # Ana sayfa
├── creative/              # Yaratıcı çalışmalar bölümü
│   └── admin/            # Yönetici paneli
│       ├── index.html
│       ├── admin.js
│       └── admin.css
├── assets/               # Medya dosyaları
│   └── images/          # Görseller
├── css/                 # Stil dosyaları
└── js/                  # JavaScript dosyaları
```

## 🔐 Yönetici Paneli

Yaratıcı çalışmalar bölümünü yönetmek için:

1. `/creative/admin` dizinine gidin
2. Varsayılan yönetici bilgileri:
   - E-posta: admin@example.com
   - Şifre: admin123
   
   **Not:** Güvenlik için bu bilgileri değiştirmeniz önerilir.
   Bunun için `admin.js` dosyasındaki `handleLogin` fonksiyonunu güncelleyin.

3. Şiir ve şarkı sözlerini ekleyin, düzenleyin veya silin
4. Spotify bağlantılarını ekleyin

## 💾 Veri Yönetimi

- Tüm veriler Local Storage'da JSON formatında saklanır
- Verileri dışa/içe aktarma özelliği
- Otomatik kayıt sistemi

## 🔄 Güncelleme Geçmişi

- v1.0.0 - İlk sürüm
  - Temel portföy özellikleri
  - Yaratıcı çalışmalar yönetimi
  - Responsive tasarım

## 📝 Lisans

Bu proje [MIT lisansı](LICENSE) altında lisanslanmıştır.

## 👤 İletişim

Burak Yalçın
- 📧 E-posta: burakyalcin.4510@gmail.com
- 🌐 Website: [yalcinburak.com](https://yalcinburak.com)

## 🔐 Güvenlik Notları

1. **Varsayılan Giriş Bilgileri**
   - E-posta: admin@example.com
   - Şifre: admin123
   
   **ÖNEMLİ:** Bu bilgiler sadece geliştirme içindir. Canlıya almadan önce mutlaka değiştirilmelidir.

2. **Güvenlik Güncellemeleri**
   - JWT_SECRET değerini güçlü bir değerle değiştirin
   - Admin e-posta ve şifresini değiştirin
   - Şifreleri düzenli olarak güncelleyin
   - Hassas bilgileri asla GitHub'a pushlamayın

