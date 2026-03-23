import type { Metadata } from "next";
import { Figtree, Montserrat } from "next/font/google";
import Script from "next/script";
import RootLayoutClient from "@/components/layout/RootLayoutClient";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "900"],
  variable: "--font-title",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-ui",
});

export const metadata: Metadata = {
  title: {
    default: "SOLITEK | Installateur RGE – Solaire, PAC & Clim en Alsace",
    template: "%s | SOLITEK",
  },
  description:
    "SOLITEK, installateur certifié RGE en Alsace : panneaux solaires, pompe à chaleur, climatisation réversible, VMC, borne IRVE et électricité. Devis gratuit, sans engagement.",
  keywords: [
    // Core métier
    "installateur solaire Alsace",
    "panneaux solaires Alsace",
    "photovoltaïque Alsace",
    "installation photovoltaïque",
    "énergie solaire maison",
    "autoconsommation solaire",
    // Services
    "pompe à chaleur Alsace",
    "climatisation réversible Alsace",
    "VMC double flux Alsace",
    "borne IRVE Alsace",
    "électricien RGE Alsace",
    // Certifications et aides
    "installateur RGE",
    "MaPrimeRénov panneaux solaires",
    "prime autoconsommation",
    "devis panneaux solaires gratuit",
    // Localisation
    "SOLITEK",
    "énergie renouvelable Alsace",
    "Bas-Rhin photovoltaïque",
    "Haut-Rhin énergie solaire",
  ],
  metadataBase: new URL("https://www.solitekenergie.fr"),
  authors: [{ name: "SOLITEK", url: "https://solitekenergie.fr" }],
  creator: "Studio Fief",
  publisher: "SOLITEK",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "SOLITEK",
    title: "SOLITEK | Installateur RGE – Solaire, PAC & Clim en Alsace",
    description:
      "Panneaux solaires, pompe à chaleur, climatisation, VMC et borne IRVE en Alsace. Certifié RGE. Devis gratuit et sans engagement.",
    images: [
      {
        url: "/hero-panels.jpg",
        width: 1200,
        height: 630,
        alt: "Installation de panneaux solaires par SOLITEK en Alsace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOLITEK | Installateur RGE – Solaire, PAC & Clim en Alsace",
    description:
      "Panneaux solaires, pompe à chaleur, climatisation, VMC et borne IRVE en Alsace. Certifié RGE.",
    images: ["/hero-panels.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${montserrat.variable} ${figtree.variable} antialiased bg-slate-50 text-slate-900 font-title`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MS6ZCPX8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MS6ZCPX8');`}
        </Script>

        {/* Default Consent Mode + GA4 config — beforeInteractive pour que le dataLayer
            soit prêt avant le chargement de gtag.js */}
        <Script id="consent-mode-config" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'denied',
                'personalization_storage': 'denied',
                'security_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'wait_for_update': 1500
            });
            gtag('set', 'ads_data_redaction', true);
            gtag('set', 'url_passthrough', false);
            (function(){
                const s={adStorage:{storageName:"ad_storage",serialNumber:0},analyticsStorage:{storageName:"analytics_storage",serialNumber:1},functionalityStorage:{storageName:"functionality_storage",serialNumber:2},personalizationStorage:{storageName:"personalization_storage",serialNumber:3},securityStorage:{storageName:"security_storage",serialNumber:4},adUserData:{storageName:"ad_user_data",serialNumber:5},adPersonalization:{storageName:"ad_personalization",serialNumber:6}};let c=localStorage.getItem("__lxG__consent__v2");if(c){c=JSON.parse(c);if(c&&c.cls_val)c=c.cls_val;if(c)c=c.split("|");if(c&&c.length&&typeof c[14]!==undefined){c=c[14].split("").map(e=>e-0);if(c.length){let t={};Object.values(s).sort((e,t)=>e.serialNumber-t.serialNumber).forEach(e=>{t[e.storageName]=c[e.serialNumber]?"granted":"denied"});gtag("consent","update",t)}}}
            })();
            gtag('js', new Date());
            gtag('config', 'G-BQWM1TP12T');
          `}
        </Script>

        {/* Clickio Consent Main tag */}
        <Script
          src="//clickiocmp.com/t/consent_247315.js"
          strategy="beforeInteractive"
        />

        {/* Google Analytics 4 — charge gtag.js après hydratation, traite la file dataLayer */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BQWM1TP12T"
          strategy="afterInteractive"
        />

        <Script
          id="json-ld-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "SOLITEK",
              description:
                "Installateur certifié RGE en Alsace : panneaux solaires photovoltaïques, pompes à chaleur, climatisation réversible, VMC double flux et électricité.",
              url: "https://solitekenergie.fr",
              logo: "https://solitekenergie.fr/logo.png",
              image:
                "https://solitekenergie.fr/images/solitek-installation-panneaux-solaires-alsace.jpg",
              address: {
                "@type": "PostalAddress",
                addressRegion: "Alsace",
                addressCountry: "FR",
              },
              areaServed: [
                { "@type": "State", name: "Bas-Rhin" },
                { "@type": "State", name: "Haut-Rhin" },
                { "@type": "City", name: "Strasbourg" },
              ],
              hasCredential: {
                "@type": "EducationalOccupationalCredential",
                credentialCategory: "RGE",
              },
              knowsAbout: [
                "Panneaux solaires photovoltaïques",
                "Pompe à chaleur",
                "Climatisation réversible",
                "VMC double flux",
                "Électricité",
                "Borne IRVE",
              ],
              sameAs: [],
            }),
          }}
        />

        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
