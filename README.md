# 🌊 Ripplab - Müzik Pazar Yeri

Modern ve profesyonel bir müzik satış platformu. Beat'ler, ses efektleri, albüm kapakları ve daha fazlasını satın alın veya satın.

## ✨ Özellikler

### 🔐 Güvenli Kimlik Doğrulama Sistemi
- **Sayfa Gizliliği**: Giriş yapmadan ana sayfa görünmez
- **Alıcı/Satıcı Ayrımı**: Farklı hesap türleri için ayrı giriş akışları
- **Sosyal Giriş**: Facebook ve Google ile hızlı giriş
- **E-posta Doğrulama**: Google hesapları için otomatik doğrulama
- **Oturum Yönetimi**: 30 dakika oturum süresi, otomatik çıkış
- **Güvenli Şifre**: Şifre gücü göstergesi ve validasyon

### 🎵 Müzik Marketplace
- **Kategoriler**: Beats, Ses Efektleri, Albüm Kapakları, Sample Packs
- **Alt Kategoriler**: Hip-Hop, Trap, EDM, Lo-Fi, Rock
- **Filtreler**: Fiyat aralığı, minimum rating, BPM aralığı
- **Arama**: Gelişmiş arama sistemi
- **Görünüm**: Grid ve liste görünüm seçenekleri

### 🎨 Modern UI/UX
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Gradient Renkler**: Mavi tonlarında modern tema
- **Animasyonlar**: Smooth geçişler ve hover efektleri
- **Glassmorphism**: Modern cam efekti tasarım
- **3D Kartlar**: Ürün kartlarında derinlik hissi

## 🚀 Kurulum

1. **Repository'yi klonlayın:**
   ```bash
   git clone https://github.com/G0lgee001/ripplab.git
   cd ripplab
   ```

2. **HTTP sunucusu başlatın:**
   ```bash
   python3 -m http.server 8000
   # veya
   npx serve .
   ```

3. **Tarayıcıda açın:**
   ```
   http://localhost:8000
   ```

## 🧪 Test

Kimlik doğrulama sistemini test etmek için:
```
http://localhost:8000/test-auth.html
```

## 🎨 Renk Paleti

- **Ana Renk**: `#0386f2` (Mavi)
- **Vurgu Rengi**: `#0047c4` (Koyu Mavi)
- **İkincil Renk**: `#6eafdf` (Açık Mavi)
- **Arka Plan**: `#ffffff` (Beyaz)
- **Ek Arka Plan**: `#f8fafc` (Açık Gri)
- **Metin**: `#000000` (Siyah)

## 📱 Responsive Tasarım

- **Desktop**: 1200px+ (Tam özellikli sidebar)
- **Tablet**: 768px-1199px (Yatay sidebar)
- **Mobile**: 480px-767px (Dikey düzen)
- **Small Mobile**: <480px (Kompakt düzen)

## 🔧 Teknik Detaylar

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern CSS özellikleri, CSS Grid, Flexbox
- **JavaScript ES6+**: Modern JavaScript, ES6 modules
- **Font Awesome**: İkon kütüphanesi
- **Google Fonts**: Inter font ailesi

### Özellikler
- **Local Storage**: Kullanıcı verileri ve oturum bilgileri
- **Session Management**: Otomatik oturum sonlandırma
- **Form Validation**: Gerçek zamanlı form doğrulama
- **Password Strength**: Şifre gücü analizi
- **Social Login**: Facebook ve Google OAuth simülasyonu
- **Notification System**: Toast bildirimleri
- **Music Player Modal**: Müzik önizleme sistemi

### Güvenlik
- **Input Sanitization**: Form verilerinin temizlenmesi
- **Password Validation**: Güçlü şifre gereksinimleri
- **Session Timeout**: Otomatik güvenlik çıkışı
- **XSS Protection**: Güvenli DOM manipülasyonu

## 📁 Proje Yapısı

```
ripplab/
├── index.html              # Ana sayfa
├── test-auth.html          # Kimlik doğrulama test sayfası
├── css/
│   └── style.css          # Ana stil dosyası
├── js/
│   └── app.js             # Ana JavaScript dosyası
├── assets/
│   ├── logo.png           # Logo (kullanıcı tarafından eklenmeli)
│   └── images/            # Görsel dosyalar
└── README.md              # Bu dosya
```

## 🔐 Kimlik Doğrulama Akışı

1. **Sayfa Yükleme**: Kimlik doğrulama modalı gösterilir
2. **Giriş/Kayıt**: Kullanıcı hesap türünü seçer (Alıcı/Satıcı)
3. **Form Doldurma**: Gerekli bilgiler girilir
4. **Doğrulama**: Form verileri validate edilir
5. **Kimlik Doğrulama**: Başarılı giriş sonrası ana sayfa gösterilir
6. **Oturum Yönetimi**: 30 dakika aktivite olmazsa otomatik çıkış

## 🎯 Gelecek Özellikler

- [ ] Gerçek backend API entegrasyonu
- [ ] Ödeme sistemi entegrasyonu
- [ ] Dosya yükleme sistemi
- [ ] Kullanıcı profil yönetimi
- [ ] Admin paneli
- [ ] Analytics ve raporlama
- [ ] Mobil uygulama

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Push yapın (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **Proje**: [Ripplab](https://github.com/G0lgee001/ripplab)
- **Geliştirici**: G0lgee001

---

**🌊 Ripplab** - Müzik dünyasında dalga yaratın! 🎵