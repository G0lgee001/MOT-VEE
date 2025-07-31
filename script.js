// Butonları seç
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const heartsContainer = document.getElementById('heartsContainer');

// "Hayır" butonunun tıklama sayısını takip et
let noClickCount = 0;

// "Evet" butonuna tıklandığında
yesBtn.addEventListener('click', function() {
    // Diğer butonu gizle
    noBtn.style.opacity = '0';
    noBtn.style.transform = 'scale(0)';
    setTimeout(() => {
        noBtn.style.display = 'none';
    }, 300);

    // Yazıyı değiştir
    this.textContent = 'Yapıcaz Tabi Amk :)';
    
    // Butonun mevcut pozisyonunu al
    const rect = this.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // "Evet" butonunu tam ortadan büyüt (30 saniyede tam ekran)
    this.style.transition = 'all 30s cubic-bezier(0.4,1)';
    this.style.position = 'fixed';
    this.style.left = '45%';
    this.style.top = '45%';
    this.style.transform = 'translate(-50%, -50%)';
    this.style.zIndex = '9999';
    this.style.borderRadius = '0';
    this.style.fontSize = '24px';
    this.style.width = rect.width + 'px';
    this.style.height = rect.height + 'px';

    // Kısa bir gecikmeyle büyütme başlasın
    setTimeout(() => {
        this.style.left = '50%';
        this.style.top = '50%';
        this.style.width = '100vw';
        this.style.height = '100vh';
        this.style.fontSize = '72px'; // Daha büyük font
    }, 50);

    // Kalp animasyonunu başlat
    startHeartAnimation();

    // Şarkı çal (dosya adını buraya yazacaksınız)
    playMusic();

    console.log('Evet butonuna tıklandı ve 30 saniyede büyüyecek! ❤️');
});

// "Hayır" butonuna tıklandığında
noBtn.addEventListener('click', function() {
    noClickCount++;

    // 4. tıklamada kalp animasyonunu başlat
    if (noClickCount >= 4) {
        startHeartAnimation();
    }

    // Buton çok büyüdüyse diğer butonu gizle
    if (noClickCount >= 3) {
        yesBtn.style.opacity = '0';
        yesBtn.style.transform = 'scale(0)';
        setTimeout(() => {
            yesBtn.style.display = 'none';
        }, 300);
    }
});

// Şarkı çalma fonksiyonu
function playMusic() {
    // Audio elementi oluştur
    const audio = document.createElement('audio');
    audio.controls = false;
    audio.autoplay = true;
    audio.loop = true; // Şarkı tekrar etsin
audio.volume = 0.5; // Ses seviyesi (0.0 = sessiz, 1.0 = tam ses)


    // Şarkı dosyasının adını buraya yazacaksınız
    audio.src = 'MOTIVE - ROMANTİK (Official Audio).mp3';

    // Audio'yu sayfaya ekle
    document.body.appendChild(audio);

    // Hata durumunda
    audio.addEventListener('error', function() {
        console.log('Şarkı dosyası bulunamadı!');
    });

    // Başarılı yükleme
    audio.addEventListener('canplay', function() {
        console.log('Şarkı çalmaya başladı! 🎵');
    });
}

// Kalp animasyonu fonksiyonu
function startHeartAnimation() {
    console.log('Kalp animasyonu başladı!');
    
    const heartInterval = setInterval(() => {
        createHeart();
    }, 100); // Her 100ms'de bir kalp

    // 1000 saniye sonra kalp animasyonunu durdur
    setTimeout(() => {
        clearInterval(heartInterval);
        console.log('Kalp animasyonu durdu!');
    }, 1000000);
}

// Tek bir kalp oluştur
function createHeart() {
    console.log('Kalp oluşturuluyor...');
    
    const heart = document.createElement('div');
    heart.innerHTML = '🤍';
    heart.style.position = 'absolute';
    heart.style.fontSize = '80px';
    heart.style.color = 'white';
    heart.style.zIndex = '9999';
    heart.style.pointerEvents = 'none';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.bottom = '-50px';
    heart.style.transition = 'all 3s ease-out';
    
    // Kalbi sayfaya ekle
    document.body.appendChild(heart);
    
    // Animasyonu başlat
    setTimeout(() => {
        heart.style.bottom = window.innerHeight + 'px';
        heart.style.opacity = '1';
    }, 100);
    
    // Kalbi temizle
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 3000);
}

// Sayfa yüklendiğinde başlangıç animasyonu
window.addEventListener('load', function() {
    // Butonlara hafif bir giriş animasyonu
    const buttons = document.querySelectorAll('.friend-btn');
    buttons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';

        setTimeout(() => {
            button.style.transition = 'all 0.5s ease';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, index * 200);
    });
});


// "Hayır" butonunu kaçırma oyunu - her zaman kaçsın
noBtn.addEventListener('mouseenter', function() {
    const rect = this.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    this.style.position = 'fixed';
    this.style.left = newX + 'px';
    this.style.top = newY + 'px';
    this.style.transition = 'all 0.3s ease';
});