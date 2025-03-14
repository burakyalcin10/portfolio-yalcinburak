// Veri yönetimi için yardımcı fonksiyonlar
let creativeData = { poems: [], lyrics: [] };

// Sayfa yüklendiğinde çalışacak ana fonksiyon
document.addEventListener('DOMContentLoaded', () => {
    console.log('Sayfa yüklendi');

    // DOM elementlerini al
    const loginContainer = document.getElementById('loginContainer');
    const adminContainer = document.getElementById('adminContainer');
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const logoutButton = document.getElementById('logoutButton');

    // DOM elementlerinin varlığını kontrol et
    if (!loginContainer) console.error('loginContainer bulunamadı');
    if (!adminContainer) console.error('adminContainer bulunamadı');
    if (!loginForm) console.error('loginForm bulunamadı');
    if (!errorMessage) console.error('errorMessage bulunamadı');
    if (!logoutButton) console.error('logoutButton bulunamadı');

    // LocalStorage'dan verileri yükle
    loadStoredData();
    
    // Giriş durumunu kontrol et
    checkAuth();
    
    // Giriş formunu dinle
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Çıkış butonunu dinle
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }

    // JSON butonlarını ekle
    addJsonButtons();
});

// Giriş işlemi
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    console.log('Giriş denemesi:', email); // Şifreyi loglamıyoruz
    
    if (email === 'admin@example.com' && password === 'admin123') {
        console.log('Giriş başarılı');
        localStorage.setItem('adminLoggedIn', 'true');
        showAdminPanel();
    } else {
        console.log('Giriş başarısız');
        if (errorMessage) {
            errorMessage.textContent = 'Geçersiz e-posta veya şifre';
            errorMessage.style.display = 'block';
        }
    }
}

// Çıkış işlemi
function handleLogout() {
    console.log('Çıkış yapılıyor');
    localStorage.removeItem('adminLoggedIn');
    showLoginForm();
}

// Admin panelini göster
function showAdminPanel() {
    console.log('Admin paneli gösteriliyor');
    const loginContainer = document.getElementById('loginContainer');
    const adminContainer = document.getElementById('adminContainer');
    
    if (loginContainer) loginContainer.style.display = 'none';
    if (adminContainer) adminContainer.style.display = 'block';
    refreshTables();
}

// Giriş formunu göster
function showLoginForm() {
    console.log('Giriş formu gösteriliyor');
    const loginContainer = document.getElementById('loginContainer');
    const adminContainer = document.getElementById('adminContainer');
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    if (loginContainer) loginContainer.style.display = 'block';
    if (adminContainer) adminContainer.style.display = 'none';
    if (loginForm) loginForm.reset();
    if (errorMessage) errorMessage.style.display = 'none';
}

// Sayfa yüklendiğinde oturum kontrolü
function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    console.log('Oturum durumu:', isLoggedIn ? 'Giriş yapılmış' : 'Giriş yapılmamış');
    
    if (isLoggedIn) {
        showAdminPanel();
    } else {
        showLoginForm();
    }
}

// JSON butonlarını ekle
function addJsonButtons() {
    const container = document.querySelector('#adminContainer .container');
    if (container) {
        const loadButton = document.createElement('button');
        loadButton.className = 'btn btn-primary mb-3';
        loadButton.innerHTML = '<i class="fas fa-upload"></i> JSON Dosyası Yükle';
        loadButton.onclick = loadData;
        
        const saveButton = document.createElement('button');
        saveButton.className = 'btn btn-success mb-3 ms-2';
        saveButton.innerHTML = '<i class="fas fa-download"></i> JSON Dosyası İndir';
        saveButton.onclick = saveData;
        
        container.insertBefore(saveButton, container.firstChild);
        container.insertBefore(loadButton, container.firstChild);
    } else {
        console.error('JSON butonları için container bulunamadı');
    }
}

// LocalStorage işlemleri
function loadStoredData() {
    const storedData = localStorage.getItem('creativeData');
    if (storedData) {
        try {
            creativeData = JSON.parse(storedData);
        } catch (error) {
            console.error('Veri yükleme hatası:', error);
            creativeData = { poems: [], lyrics: [] };
        }
    }
}

function saveToStorage() {
    localStorage.setItem('creativeData', JSON.stringify(creativeData));
    return true;
}

// Dosya işlemleri
function loadData() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    
    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                creativeData = JSON.parse(e.target.result);
                saveToStorage();
                refreshTables();
                alert('Veriler başarıyla yüklendi!');
            } catch (error) {
                console.error('JSON okuma hatası:', error);
                alert('Dosya okunurken bir hata oluştu!');
            }
        };
        
        reader.readAsText(file);
    };
    
    fileInput.click();
}

function saveData() {
    const dataStr = JSON.stringify(creativeData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'creative-works.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return true;
}

// Form işlemleri
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function getFormData(formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    
    const content = formData.get('content');
    const preview = content.split('\n')[0].substring(0, 100) + (content.length > 100 ? '...' : '');
    
    const data = {
        title: formData.get('title'),
        date: formatDate(formData.get('date')),
        content: content,
        preview: preview
    };

    if (formId === 'addLyricsForm') {
        const spotifyLink = formData.get('spotifyLink');
        if (spotifyLink) {
            data.spotifyLink = spotifyLink;
        }
    }

    return data;
}

// Kaydetme işlemleri
function savePoem() {
    const poemData = getFormData('addPoemForm');
    
    if (!creativeData.poems) {
        creativeData.poems = [];
    }
    
    creativeData.poems.unshift(poemData);
    
    if (saveToStorage()) {
        refreshTables();
        const modal = bootstrap.Modal.getInstance(document.getElementById('addPoemModal'));
        if (modal) {
            modal.hide();
        }
        document.getElementById('addPoemForm').reset();
    }
}

function saveLyrics() {
    const lyricsData = getFormData('addLyricsForm');
    
    if (!creativeData.lyrics) {
        creativeData.lyrics = [];
    }
    
    creativeData.lyrics.unshift(lyricsData);
    
    if (saveToStorage()) {
        refreshTables();
        const modal = bootstrap.Modal.getInstance(document.getElementById('addLyricsModal'));
        if (modal) {
            modal.hide();
        }
        document.getElementById('addLyricsForm').reset();
    }
}

// Tablo işlemleri
function createTableRow(item, type) {
    const tr = document.createElement('tr');
    
    const titleTd = document.createElement('td');
    titleTd.textContent = item.title;
    
    const dateTd = document.createElement('td');
    dateTd.textContent = item.date;
    
    const previewTd = document.createElement('td');
    previewTd.className = 'preview-text';
    previewTd.textContent = item.preview;
    
    const actionsTd = document.createElement('td');
    actionsTd.className = 'action-buttons';
    
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-sm btn-primary me-2';
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.onclick = () => editItem(item, type);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm btn-danger';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.onclick = () => deleteItem(item, type);
    
    actionsTd.appendChild(editBtn);
    actionsTd.appendChild(deleteBtn);
    
    tr.appendChild(titleTd);
    tr.appendChild(dateTd);
    tr.appendChild(previewTd);
    
    if (type === 'lyrics') {
        const spotifyTd = document.createElement('td');
        if (item.spotifyLink) {
            const spotifyBtn = document.createElement('a');
            spotifyBtn.href = item.spotifyLink;
            spotifyBtn.target = '_blank';
            spotifyBtn.className = 'btn btn-sm btn-spotify';
            spotifyBtn.innerHTML = '<i class="fab fa-spotify"></i> Dinle';
            spotifyTd.appendChild(spotifyBtn);
        } else {
            spotifyTd.textContent = '-';
        }
        tr.appendChild(spotifyTd);
    }
    
    tr.appendChild(actionsTd);
    
    return tr;
}

function refreshTables() {
    const poemsTable = document.querySelector('#poems-table tbody');
    const lyricsTable = document.querySelector('#lyrics-table tbody');
    
    if (poemsTable) {
        poemsTable.innerHTML = '';
        if (creativeData.poems && Array.isArray(creativeData.poems)) {
            creativeData.poems.forEach(poem => {
                poemsTable.appendChild(createTableRow(poem, 'poem'));
            });
        }
    }
    
    if (lyricsTable) {
        lyricsTable.innerHTML = '';
        if (creativeData.lyrics && Array.isArray(creativeData.lyrics)) {
            creativeData.lyrics.forEach(lyric => {
                lyricsTable.appendChild(createTableRow(lyric, 'lyrics'));
            });
        }
    }
}

// Düzenleme ve silme işlemleri
function editItem(item, type) {
    const modalId = type === 'poem' ? 'addPoemModal' : 'addLyricsModal';
    const formId = type === 'poem' ? 'addPoemForm' : 'addLyricsForm';
    const modal = document.getElementById(modalId);
    const form = document.getElementById(formId);
    
    if (form && modal) {
        form.elements['title'].value = item.title;
        const dateParts = item.date.split(' ');
        const monthIndex = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'].indexOf(dateParts[1]);
        const formattedDate = `${dateParts[2]}-${(monthIndex + 1).toString().padStart(2, '0')}-${dateParts[0].padStart(2, '0')}`;
        form.elements['date'].value = formattedDate;
        form.elements['content'].value = item.content;
        
        if (type === 'lyrics' && item.spotifyLink) {
            form.elements['spotifyLink'].value = item.spotifyLink;
        }
        
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
        
        const items = type === 'poem' ? creativeData.poems : creativeData.lyrics;
        const index = items.findIndex(i => i.title === item.title && i.date === item.date);
        
        if (index !== -1) {
            items.splice(index, 1);
            saveToStorage();
        }
    }
}

function deleteItem(item, type) {
    if (!confirm('Bu öğeyi silmek istediğinizden emin misiniz?')) {
        return;
    }
    
    const items = type === 'poem' ? creativeData.poems : creativeData.lyrics;
    const index = items.findIndex(i => i.title === item.title && i.date === item.date);
    
    if (index !== -1) {
        items.splice(index, 1);
        if (saveToStorage()) {
            refreshTables();
        }
    }
} 