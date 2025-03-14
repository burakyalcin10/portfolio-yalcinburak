// Tema değiştirme fonksiyonu
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Sayfa yüklendiğinde tema kontrolü
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Tema değiştirme düğmesi için event listener
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});

// Modal içeriğini güncelleme fonksiyonu
function updateModalContent(title, content, date, type) {
    const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body');
    const modalDate = document.querySelector('.modal-date');

    if (modalTitle && modalBody && modalDate) {
        modalTitle.textContent = title;
        modalBody.innerHTML = `<div class="${type}-text">${content}</div>`;
        modalDate.textContent = date;
    }
}

// Veri yükleme fonksiyonu
async function loadCreativeWorks() {
    try {
        const response = await fetch('data/creative-works.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Veri yüklenirken hata oluştu:', error);
        return { poems: [], lyrics: [] };
    }
}

// Kart oluşturma fonksiyonu
function createCard(item, type) {
    const article = document.createElement('article');
    article.className = `creative-card ${type}`;
    
    const modalId = `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    article.innerHTML = `
        <div class="card-content">
            <h3>${item.title}</h3>
            <p class="date">${item.date}</p>
            <div class="preview-text">
                ${item.preview}
            </div>
            <button class="read-more" data-bs-toggle="modal" data-bs-target="#${modalId}">
                Devamını Oku
            </button>
        </div>
    `;
    
    // Modal oluştur
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = modalId;
    modal.setAttribute('tabindex', '-1');
    
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${item.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p class="${type}-text">
                        ${item.content.replace(/\n/g, '<br>')}
                    </p>
                    <p class="date text-end">${item.date}</p>
                </div>
            </div>
        </div>
    `;
    
    // Modalı ilgili container'a ekle
    document.getElementById(`${type}-modals`).appendChild(modal);
    
    return article;
}

// Sayfayı güncelleme fonksiyonu
async function updatePage() {
    const data = await loadCreativeWorks();
    
    // Şiirleri ekle
    const poemsGrid = document.querySelector('#poems .creative-grid');
    poemsGrid.innerHTML = '';
    data.poems.forEach(poem => {
        poemsGrid.appendChild(createCard(poem, 'poem'));
    });
    
    // Şarkı sözlerini ekle
    const lyricsGrid = document.querySelector('#lyrics .creative-grid');
    lyricsGrid.innerHTML = '';
    data.lyrics.forEach(lyric => {
        lyricsGrid.appendChild(createCard(lyric, 'lyrics'));
    });
}

// Sayfa yüklendiğinde güncelle
document.addEventListener('DOMContentLoaded', updatePage); 