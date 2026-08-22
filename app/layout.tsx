import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alarmon-auto-garage-demo.pages.dev"),
  title: "Alarmon Auto Garage | PPF, Cam Filmi ve Araç Bakımı",
  description: "Karabağlar İzmir'de PPF kaplama, oto cam filmi, seramik kaplama, pasta polish ve detaylı iç bakım.",
  keywords: ["Alarmon Auto Garage", "İzmir PPF kaplama", "Karabağlar cam filmi", "İzmir seramik kaplama", "detaylı araç bakımı"],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    title: "Alarmon Auto Garage | Aracının Değerini Koru",
    description: "PPF kaplama, cam filmi ve detaylı araç bakımı. Aracına göre teklif al.",
    images: [{ url: "/images/og-alarmon.jpg", width: 1200, height: 630, alt: "Alarmon Auto Garage" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alarmon Auto Garage",
    description: "PPF kaplama, cam filmi ve detaylı araç bakımı.",
    images: ["/images/og-alarmon.jpg"],
  },
  icons: {
    icon: "/images/alarmon-profile.jpg",
    shortcut: "/images/alarmon-profile.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0a0a0a",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoWash",
  name: "Alarmon Auto Garage",
  description: "PPF kaplama, oto cam filmi, seramik kaplama, pasta polish ve detaylı araç bakım merkezi.",
  telephone: "+90 538 730 13 32",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Çalıkuşu Mahallesi, 3209. Sokak No:9",
    addressLocality: "Karabağlar",
    addressRegion: "İzmir",
    addressCountry: "TR",
  },
  sameAs: [
    "https://www.instagram.com/alarmonautogarage/",
    "https://www.facebook.com/people/Alarmon-Auto-Garage/61565340601399/",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "50",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:30",
      closes: "20:00",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </body>
    </html>
  );
}
