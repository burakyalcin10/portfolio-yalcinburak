// Dil değiştirme için gerekli değişkenler ve fonksiyonlar
const languageToggle = document.getElementById('language-toggle');
const translations = {
    en: {
        'main-title': 'Burak YALÇIN',
        'subtitle': 'Computer Science & Engineering Student',
        'about-me': 'About Me',
        'who-i-am': 'Who I Am',
        'who-i-am-text': 'I am a Computer Science & Engineering student with a passion for creating innovative solutions through technology. My focus areas include Software Engineering, Artificial Intelligence, and Full-Stack Development.',
        'what-i-do': 'What I Do',
        'my-approach': 'My Approach',
        'personal-interests': 'Personal Interests',
        'experience': 'Experience',
        'education': 'Education',
        'skills': 'Skills',
        'projects': 'Projects',
        'blog': 'Blog',
        'contact-social': 'Contact & Social',
        'theme-title': 'Theme',
        'theme-text': 'Switch between light & dark',
        'language-title': 'Language',
        'language-text': 'Switch between TR & EN',
        'download-cv-en': 'Download CV (EN)',
        'download-cv-tr': 'Download CV (TR)',
        'download-portfolio': 'Download Portfolio',
        'chatbot-title': 'ChatBOT',
        'welcome': 'Welcome!',
        'profile-text': 'I am a Computer Science & Engineering student with a passion for creating innovative solutions through technology. My focus areas include Software Engineering, Artificial Intelligence, and Full-Stack Development.',
        'software-dev': 'Software Development',
        'software-dev-desc': 'Building scalable and efficient applications using modern technologies and best practices.',
        'ai-dev': 'AI Development',
        'ai-dev-desc': 'Creating intelligent solutions using machine learning and artificial intelligence.',
        'fullstack-dev': 'Full-Stack Development',
        'fullstack-dev-desc': 'Developing end-to-end web applications with modern frameworks and tools.',
        'mobile-dev': 'Mobile Development',
        'mobile-dev-desc': 'Building cross-platform mobile applications for iOS and Android.',
        'approach-1': 'Focus on writing clean, maintainable code',
        'approach-2': 'Emphasis on user experience and performance',
        'approach-3': 'Continuous learning and staying up-to-date with technology',
        'approach-4': 'Strong problem-solving and analytical skills',
        'personal-interests-text': 'Beyond coding, I\'m passionate about technology, innovation, and continuous learning. I enjoy contributing to open-source projects, writing technical articles, and sharing knowledge with the developer community.',
        'loading-projects': 'Loading projects...',
        'loading-blog': 'Loading blog posts...',
        'email': 'Email',
        'phone': 'Phone',
        'location': 'Location',
        'location-text': 'Antalya, Türkiye',
        'github-text': 'Check out my code repositories and contributions',
        'linkedin-text': 'Connect with me professionally',
        'portfolio-text': 'Visit my personal website',
        'chatbot-placeholder': 'Type your message...',
        'view-journey': 'View my professional journey',
        'view-education': 'Explore my academic background',
        'view-skills': 'Discover my technical expertise',
        'view-projects': 'Check out my latest work',
        'view-blog': 'Read my latest articles',
        'connect': 'Let\'s connect and collaborate!'
    },
    tr: {
        'main-title': 'Burak YALÇIN',
        'subtitle': 'Bilgisayar Mühendisliği Öğrencisi',
        'about-me': 'Hakkımda',
        'who-i-am': 'Ben Kimim',
        'who-i-am-text': 'Bilgisayar Mühendisliği öğrencisiyim ve teknoloji aracılığıyla yenilikçi çözümler üretmeye tutkulu biriyim. Odak alanlarım Yazılım Mühendisliği, Yapay Zeka ve Full-Stack Geliştirme konularını içerir.',
        'what-i-do': 'Ne Yapıyorum',
        'my-approach': 'Yaklaşımım',
        'personal-interests': 'Kişisel İlgi Alanlarım',
        'experience': 'Deneyim',
        'education': 'Eğitim',
        'skills': 'Beceriler',
        'projects': 'Projeler',
        'blog': 'Blog',
        'contact-social': 'İletişim & Sosyal Medya',
        'theme-title': 'Tema',
        'theme-text': 'Açık & koyu tema arası geçiş',
        'language-title': 'Dil',
        'language-text': 'TR & EN arası geçiş',
        'download-cv-en': 'CV İndir (EN)',
        'download-cv-tr': 'CV İndir (TR)',
        'download-portfolio': 'Portfolyo İndir',
        'chatbot-title': 'Sohbet Robotu',
        'welcome': 'Hoş Geldiniz!',
        'profile-text': 'Bilgisayar Mühendisliği 2.sınıf öğrencisiyim ve teknolojik gelişmeleri yakından takip ederek kendimi sürekli geliştirmeyi hedefliyorum. Öğrenme sürecimde öğrendiklerimi projelerde uygulamaya ve büyük organizasyonlarda aktif rol almaya özen gösteriyorum. Odaklandığım alanlar arasında Yazılım Mühendisliği, Yapay Zeka ve Full-Stack Development yer alıyor.',
        'software-dev': 'Yazılım Geliştirme',
        'software-dev-desc': 'Modern teknolojiler ve en iyi uygulamalarla ölçeklenebilir ve verimli uygulamalar geliştirme.',
        'ai-dev': 'Yapay Zeka Geliştirme',
        'ai-dev-desc': 'Makine öğrenimi ve yapay zeka kullanarak akıllı çözümler oluşturma.',
        'fullstack-dev': 'Full-Stack Geliştirme',
        'fullstack-dev-desc': 'Modern framework ve araçlarla uçtan uca web uygulamaları geliştirme.',
        'mobile-dev': 'Mobil Geliştirme',
        'mobile-dev-desc': 'iOS ve Android için çapraz platform mobil uygulamalar geliştirme.',
        'approach-1': 'Temiz ve sürdürülebilir kod yazmaya odaklanma',
        'approach-2': 'Kullanıcı deneyimi ve performansa önem verme',
        'approach-3': 'Sürekli öğrenme ve teknolojiyi takip etme',
        'approach-4': 'Güçlü problem çözme ve analitik beceriler',
        'personal-interests-text': 'Kodlamanın ötesinde, teknoloji, inovasyon ve sürekli öğrenmeye tutkuyla bağlıyım. Açık kaynak projelere katkıda bulunmayı, teknik makaleler yazmayı ve geliştirici topluluğuyla bilgi paylaşmayı seviyorum.',
        'loading-projects': 'Projeler yükleniyor...',
        'loading-blog': 'Blog yazıları yükleniyor...',
        'email': 'E-posta',
        'phone': 'Telefon',
        'location': 'Konum',
        'location-text': 'Antalya, Türkiye',
        'github-text': 'Kod depolarımı ve katkılarımı inceleyin',
        'linkedin-text': 'Profesyonel olarak bağlantı kurun',
        'portfolio-text': 'Kişisel web sitemi ziyaret edin',
        'chatbot-placeholder': 'Mesajınızı yazın...',
        'view-journey': 'Profesyonel yolculuğumu görüntüle',
        'view-education': 'Akademik geçmişimi keşfet',
        'view-skills': 'Teknik uzmanlığımı keşfet',
        'view-projects': 'Son çalışmalarımı incele',
        'view-blog': 'Son yazılarımı oku',
        'connect': 'Haydi bağlantı kuralım ve işbirliği yapalım!'
    }
};

// Sayfa yüklendiğinde çalışacak fonksiyon
document.addEventListener('DOMContentLoaded', () => {
    // Dil değiştirme butonunu dinle
    languageToggle.addEventListener('change', function() {
        const language = this.checked ? 'tr' : 'en';
        changeLanguage(language);
    });

    // Başlangıçta dili ayarla
    const initialLanguage = localStorage.getItem('language') || 'en';
    languageToggle.checked = initialLanguage === 'tr';
    changeLanguage(initialLanguage);
});

// Dil değiştirme fonksiyonu
function changeLanguage(language) {
    // Local storage'a kaydet
    localStorage.setItem('language', language);
    
    // HTML lang attribute'unu güncelle
    document.documentElement.lang = language;
    
    // Tüm çevrilebilir elementleri bul ve güncelle
    for (const [key, value] of Object.entries(translations[language])) {
        const elements = document.querySelectorAll(`.${key}`);
        elements.forEach(element => {
            if (element) {
                element.textContent = value;
            }
        });
    }
} 