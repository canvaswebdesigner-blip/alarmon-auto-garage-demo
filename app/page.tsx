"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const phone = "+905387301332";
const whatsappBase = "https://wa.me/905387301332";

const gallery = [
  {
    src: "/images/volvo-ppf.jpg",
    alt: "Alarmon Auto Garage'da beyaz Volvo üzerine PPF uygulaması",
    label: "Volvo EX30",
    detail: "ORACAL PPF uygulaması",
    className: "gallery-tall",
  },
  {
    src: "/images/audi-angle-blurred.jpg",
    alt: "Alarmon Auto Garage tarafından PPF uygulanan siyah Audi SQ8",
    label: "Audi SQ8",
    detail: "Komple PPF uygulaması",
    className: "gallery-wide",
  },
  {
    src: "/images/dacia-rear-blurred.jpg",
    alt: "Alarmon Auto Garage uygulaması sonrası Dacia Sandero",
    label: "Dacia Sandero",
    detail: "210 mikron PPF + cam filmi",
    className: "",
  },
  {
    src: "/images/bmw-finish-blurred.jpg",
    alt: "Pasta cila, seramik ve detaylı iç bakım sonrası BMW 320",
    label: "BMW 3.20",
    detail: "Pasta polish + seramik + detaylı iç bakım",
    className: "",
  },
  {
    src: "/images/audi-front-blurred.jpg",
    alt: "Alarmon Auto Garage uygulaması sonrası siyah Audi SQ8",
    label: "Audi SQ8",
    detail: "Boya koruma filmi uygulaması",
    className: "gallery-wide",
  },
  {
    src: "/images/dacia-front-blurred.jpg",
    alt: "Alarmon Auto Garage önünde Dacia Sandero",
    label: "Dacia Sandero",
    detail: "Teslim görünümü",
    className: "",
  },
];

const services = [
  {
    number: "01",
    title: "PPF Kaplama",
    text: "Taş izi, hafif sürtme ve yol etkilerine karşı boyayı şeffaf bir koruma katmanıyla destekler.",
    note: "Komple araç veya bölgesel uygulama",
  },
  {
    number: "02",
    title: "Oto Cam Filmi",
    text: "Isı, parlama ve mahremiyet beklentine göre araç camlarına uygun film seçimi ve temiz uygulama.",
    note: "İhtiyaca göre ürün seçimi",
  },
  {
    number: "03",
    title: "Seramik & Boya Bakımı",
    text: "Pasta-polish ile yüzeyi toparlayan, seramik kaplama ile parlaklığı ve bakım kolaylığını destekleyen işlem.",
    note: "Araç yüzeyine göre planlama",
  },
  {
    number: "04",
    title: "Detaylı İç Bakım",
    text: "Koltuk, döşeme ve zor bölgeler için derin temizlik; ihtiyaca göre deri koltuk boyası uygulaması.",
    note: "İç mekâna özel uygulama",
  },
];

const reviews = [
  {
    name: "İlkay Balcı",
    text: "Pasta cila, detaylı temizlik ve cam filmi işçiliğinden çok memnun kaldım; ilgi ve özen üst seviyedeydi.",
  },
  {
    name: "Tugay Şanlı",
    text: "Detay PPF işçiliği çok iyiydi. Fiyatlandırmayı da piyasaya göre makul buldum.",
  },
  {
    name: "Gizem Savaşbektaş",
    text: "Seramik kaplama sonrası araç cam gibi oldu. Güler yüzlü ekip ve sonuçtan çok memnun kaldım.",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? "brand-compact" : ""}`} aria-label="Alarmon Auto Garage">
      <span className="brand-main">ALARMON</span>
      <span className="brand-sub">AUTO GARAGE</span>
    </span>
  );
}

function Lightbox({ index, onClose }: { index: number; onClose: () => void }) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const touch = useRef({ distance: 0, x: 0, y: 0 });
  const image = gallery[index];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const setZoom = (next: number) => {
    const value = Math.min(4, Math.max(1, next));
    setScale(value);
    if (value === 1) setOffset({ x: 0, y: 0 });
  };

  const distance = (a: React.Touch, b: React.Touch) =>
    Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${image.label} fotoğrafı`} onClick={onClose}>
      <div className="lightbox-top">
        <div>
          <strong>{image.label}</strong>
          <span>{image.detail}</span>
        </div>
        <button type="button" onClick={onClose} aria-label="Fotoğrafı kapat">×</button>
      </div>
      <div className="lightbox-stage" onClick={(event) => event.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          draggable={false}
          style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})` }}
          onDoubleClick={() => setZoom(scale > 1 ? 1 : 2)}
          onWheel={(event) => {
            event.preventDefault();
            setZoom(scale + (event.deltaY < 0 ? 0.25 : -0.25));
          }}
          onTouchStart={(event) => {
            if (event.touches.length === 2) {
              touch.current.distance = distance(event.touches[0], event.touches[1]);
            } else if (event.touches.length === 1) {
              touch.current.x = event.touches[0].clientX - offset.x;
              touch.current.y = event.touches[0].clientY - offset.y;
            }
          }}
          onTouchMove={(event) => {
            if (event.touches.length === 2) {
              const nextDistance = distance(event.touches[0], event.touches[1]);
              if (touch.current.distance) setZoom(scale * (nextDistance / touch.current.distance));
              touch.current.distance = nextDistance;
            } else if (event.touches.length === 1 && scale > 1) {
              setOffset({
                x: event.touches[0].clientX - touch.current.x,
                y: event.touches[0].clientY - touch.current.y,
              });
            }
          }}
        />
      </div>
      <div className="lightbox-controls" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={() => setZoom(scale - 0.5)} aria-label="Uzaklaştır">−</button>
        <span>{Math.round(scale * 100)}%</span>
        <button type="button" onClick={() => setZoom(scale + 0.5)} aria-label="Yakınlaştır">+</button>
        <button type="button" className="reset" onClick={() => setZoom(1)}>Sıfırla</button>
      </div>
      <p className="lightbox-hint">İki parmakla yakınlaştırabilir, sürükleyerek inceleyebilirsin.</p>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [vehicle, setVehicle] = useState("");
  const [service, setService] = useState("PPF Kaplama");
  const [scope, setScope] = useState("Komple araç");

  const quoteUrl = useMemo(() => {
    const message = [
      "Merhaba Alarmon Auto Garage, web siteniz üzerinden teklif almak istiyorum.",
      `Araç: ${vehicle.trim() || "Henüz belirtmedim"}`,
      `İşlem: ${service}`,
      service === "PPF Kaplama" ? `Kapsam: ${scope}` : null,
      "Uygun ürün, tahmini süre ve fiyat bilgisini paylaşabilir misiniz?",
    ]
      .filter(Boolean)
      .join("\n");
    return `${whatsappBase}?text=${encodeURIComponent(message)}`;
  }, [vehicle, service, scope]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="logo-link" aria-label="Alarmon Auto Garage ana sayfa" onClick={closeMenu}>
          <BrandMark />
        </a>
        <nav className={menuOpen ? "nav-open" : ""} aria-label="Ana menü">
          <a href="#hizmetler" onClick={closeMenu}>Hizmetler</a>
          <a href="#uygulamalar" onClick={closeMenu}>Uygulamalar</a>
          <a href="#yorumlar" onClick={closeMenu}>Yorumlar</a>
          <a href="#iletisim" onClick={closeMenu}>İletişim</a>
        </nav>
        <a className="header-cta" href="#teklif">Aracına göre teklif al <ArrowIcon /></a>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-media" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/audi-angle-blurred.jpg" alt="" />
        </div>
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <span className="eyebrow"><i /> Karabağlar, İzmir</span>
          <h1>Boyayı değil,<br /><em>aracının değerini</em><br />koru.</h1>
          <p>PPF kaplama, cam filmi ve detaylı araç bakımı. Aracına uygun işlemi birlikte netleştirelim.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#teklif">Aracıma göre teklif al <ArrowIcon /></a>
            <a className="button button-ghost" href="#uygulamalar">Gerçek uygulamaları gör</a>
          </div>
        </div>
        <div className="hero-proof" aria-label="İşletme güven bilgileri">
          <div><strong>4,9</strong><span>Google puanı</span></div>
          <div><strong>50</strong><span>müşteri yorumu</span></div>
          <div><strong>08:30–20:00</strong><span>Pzt–Cmt açık</span></div>
        </div>
        <div className="scroll-note"><span /> Aşağı kaydır</div>
      </section>

      <section className="trust-bar" aria-label="Öne çıkan bilgiler">
        <span>PPF KAPLAMA</span><i />
        <span>CAM FİLMİ</span><i />
        <span>SERAMİK KAPLAMA</span><i />
        <span>DETAYLI BAKIM</span>
      </section>

      <section className="section services" id="hizmetler">
        <div className="section-heading">
          <span className="section-index">01 / HİZMETLER</span>
          <h2>Aracın için<br /><em>doğru katman.</em></h2>
          <p>Fiyatı tek başına değil; aracın, kullanım şeklin ve beklediğin koruma seviyesi belirler.</p>
        </div>
        <div className="services-grid">
          {services.map((item) => (
            <article className="service-card" key={item.number}>
              <span className="service-number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div><CheckIcon /> {item.note}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="ppf-focus">
        <div className="ppf-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/volvo-ppf.jpg" alt="Volvo EX30 üzerine şeffaf PPF uygulanırken" />
          <span>Gerçek uygulama görüntüsü</span>
        </div>
        <div className="ppf-copy">
          <span className="section-index">02 / PPF ODAĞI</span>
          <h2>Görünmez koruma.<br /><em>Görünen özen.</em></h2>
          <p>PPF’de sonucu sadece film değil; yüzey hazırlığı, temiz ortam, kenar bitişleri ve uygulama işçiliği belirler.</p>
          <ul>
            <li><span>01</span><div><strong>Aracı gör</strong><small>Boya durumu ve kullanım ihtiyacı incelensin.</small></div></li>
            <li><span>02</span><div><strong>Kapsamı seç</strong><small>Komple araç veya kaput, çamurluk, tampon gibi bölgesel çözüm.</small></div></li>
            <li><span>03</span><div><strong>Ürünü netleştir</strong><small>Film özellikleri ve yazılı garanti kapsamı teklif sırasında açıklansın.</small></div></li>
          </ul>
          <a href="#teklif" className="text-link">Aracıma uygun kapsamı sor <ArrowIcon /></a>
        </div>
      </section>

      <section className="section work" id="uygulamalar">
        <div className="section-heading work-heading">
          <div>
            <span className="section-index">03 / UYGULAMALAR</span>
            <h2>Söz değil,<br /><em>işçilik konuşsun.</em></h2>
          </div>
          <p>Alarmon’un resmî hesabında paylaşılan gerçek uygulamalardan seçki. Fotoğrafa dokunup ayrıntıyı yakınlaştırabilirsin.</p>
        </div>
        <div className="gallery-grid">
          {gallery.map((item, index) => (
            <button
              type="button"
              className={`gallery-card ${item.className}`}
              key={item.src}
              onClick={() => setLightboxIndex(index)}
              aria-label={`${item.label} fotoğrafını büyüt`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.alt} loading={index > 1 ? "lazy" : "eager"} />
              <span className="gallery-overlay">
                <span><strong>{item.label}</strong><small>{item.detail}</small></span>
                <b>+</b>
              </span>
            </button>
          ))}
        </div>
        <a className="instagram-link" href="https://www.instagram.com/alarmonautogarage/" target="_blank" rel="noreferrer">
          Daha fazla uygulama için Instagram <ArrowIcon />
        </a>
      </section>

      <section className="quote-section" id="teklif">
        <div className="quote-copy">
          <span className="section-index">04 / HIZLI TEKLİF</span>
          <h2>Üç bilgi ver,<br /><em>doğru işlemden konuşalım.</em></h2>
          <p>Form göndermez. Seçimlerini hazır bir WhatsApp mesajına dönüştürür; son kontrol sende kalır.</p>
          <div className="quote-benefits">
            <span><CheckIcon /> Araca özel değerlendirme</span>
            <span><CheckIcon /> Net kapsam ve ürün bilgisi</span>
            <span><CheckIcon /> Tahmini süre ve fiyat</span>
          </div>
        </div>
        <div className="quote-panel">
          <label>
            <span>01 — Aracın</span>
            <input value={vehicle} onChange={(event) => setVehicle(event.target.value)} placeholder="Örn. 2024 Cupra Formentor" />
          </label>
          <label>
            <span>02 — İstediğin işlem</span>
            <select value={service} onChange={(event) => setService(event.target.value)}>
              <option>PPF Kaplama</option>
              <option>Oto Cam Filmi</option>
              <option>Seramik Kaplama</option>
              <option>Pasta Polish</option>
              <option>Detaylı İç Bakım</option>
              <option>Deri Koltuk Boyası</option>
            </select>
          </label>
          {service === "PPF Kaplama" && (
            <label>
              <span>03 — Düşündüğün kapsam</span>
              <select value={scope} onChange={(event) => setScope(event.target.value)}>
                <option>Komple araç</option>
                <option>Kaput + çamurluk + tampon</option>
                <option>Sadece kaput</option>
                <option>Kararsızım, öneri istiyorum</option>
              </select>
            </label>
          )}
          <a className="button button-primary quote-button" href={quoteUrl} target="_blank" rel="noreferrer">
            WhatsApp’tan teklif iste <ArrowIcon />
          </a>
          <small>Mesaj, WhatsApp açıldıktan sonra sen onaylayınca gönderilir.</small>
        </div>
      </section>

      <section className="section reviews" id="yorumlar">
        <div className="review-score">
          <span className="section-index">05 / MÜŞTERİ DENEYİMİ</span>
          <strong>4,9</strong>
          <div className="stars" aria-label="5 yıldız">★★★★★</div>
          <p>50 Google değerlendirmesi</p>
          <a href="https://www.google.com/maps/search/?api=1&query=Alarmon+Auto+Garage+Karabağlar+İzmir" target="_blank" rel="noreferrer">Google’da görüntüle <ArrowIcon /></a>
        </div>
        <div className="review-content">
          <h2>İşçiliği,<br /><em>müşterileri anlatıyor.</em></h2>
          <div className="review-list">
            {reviews.map((review) => (
              <article key={review.name}>
                <div className="stars" aria-hidden="true">★★★★★</div>
                <blockquote>“{review.text}”</blockquote>
                <span>{review.name} <small>Google değerlendirmesi</small></span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="location" id="iletisim">
        <div className="location-info">
          <span className="section-index">06 / İLETİŞİM</span>
          <h2>Aracını göster,<br /><em>işlemi netleştirelim.</em></h2>
          <div className="contact-row">
            <span>Telefon</span>
            <a href={`tel:${phone}`}>0538 730 13 32</a>
          </div>
          <div className="contact-row">
            <span>Adres</span>
            <p>Çalıkuşu Mahallesi, 3209. Sokak No:9<br />Karabağlar / İzmir</p>
          </div>
          <div className="contact-row hours-row">
            <span>Çalışma</span>
            <p>Pazartesi — Cumartesi <b>08:30–20:00</b><br />Pazar <b>Kapalı</b></p>
          </div>
          <div className="location-actions">
            <a className="button button-primary" href={quoteUrl} target="_blank" rel="noreferrer">WhatsApp <ArrowIcon /></a>
            <a className="button button-ghost" href="https://www.google.com/maps/search/?api=1&query=Alarmon+Auto+Garage+Karabağlar+İzmir" target="_blank" rel="noreferrer">Yol tarifi</a>
          </div>
        </div>
        <div className="map-wrap">
          <iframe
            title="Alarmon Auto Garage haritası"
            src="https://www.google.com/maps?q=Alarmon%20Auto%20Garage%20Karaba%C4%9Flar%20%C4%B0zmir&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a href="https://www.google.com/maps/search/?api=1&query=Alarmon+Auto+Garage+Karabağlar+İzmir" target="_blank" rel="noreferrer">
            Haritada aç <ArrowIcon />
          </a>
        </div>
      </section>

      <section className="section faq">
        <div className="section-heading">
          <span className="section-index">07 / SIK SORULANLAR</span>
          <h2>Karar vermeden<br /><em>önce bil.</em></h2>
        </div>
        <div className="faq-list">
          <details>
            <summary>PPF için komple araç şart mı?<span>+</span></summary>
            <p>Hayır. Kullanım ihtiyacına göre komple araç ya da kaput, tampon ve çamurluk gibi darbe alan bölgelere odaklanan kapsamlar değerlendirilebilir.</p>
          </details>
          <details>
            <summary>Fiyat neden araçtan araca değişiyor?<span>+</span></summary>
            <p>Araç ölçüsü, yüzey durumu, seçilen ürün ve uygulama kapsamı toplam işçiliği değiştirir. En sağlıklı fiyat araç bilgisiyle netleşir.</p>
          </details>
          <details>
            <summary>Garanti kapsamı nasıl belirleniyor?<span>+</span></summary>
            <p>Kapsam kullanılan ürüne ve uygulamaya göre değişir. Teklif sırasında ürün adı, kapsamı ve yazılı garanti koşullarını net olarak isteyebilirsin.</p>
          </details>
          <details>
            <summary>Randevu almadan gelebilir miyim?<span>+</span></summary>
            <p>Aracın beklememesi ve doğru süre planı için gelmeden önce telefon veya WhatsApp üzerinden iletişim kurman önerilir.</p>
          </details>
        </div>
      </section>

      <footer>
        <BrandMark />
        <p>PPF kaplama, cam filmi ve detaylı araç bakım merkezi.</p>
        <div className="footer-links">
          <a href="https://www.instagram.com/alarmonautogarage/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.facebook.com/people/Alarmon-Auto-Garage/61565340601399/" target="_blank" rel="noreferrer">Facebook</a>
          <a href={`tel:${phone}`}>Telefon</a>
          <a href="#top">Yukarı dön ↑</a>
        </div>
        <small>© 2026 Alarmon Auto Garage. Demo web sitesi.</small>
      </footer>

      <div className="mobile-actions" aria-label="Hızlı iletişim">
        <a href={`tel:${phone}`}>Ara</a>
        <a href={quoteUrl} target="_blank" rel="noreferrer">Teklif al</a>
      </div>

      {lightboxIndex !== null && <Lightbox index={lightboxIndex} onClose={() => setLightboxIndex(null)} />}
    </main>
  );
}
