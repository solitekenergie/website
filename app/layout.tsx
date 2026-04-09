import type { Metadata } from "next";
import { Figtree, Montserrat } from "next/font/google";
import Script from "next/script";
import RootLayoutClient from "@/components/layout/RootLayoutClient";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "900"],
  variable: "--font-title",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ui",
});

export const metadata: Metadata = {
  title: {
    default: "SOLITEK ENERGIE - Votre spécialiste ENR à côté de chez vous",
    template: "%s | SOLITEK ENERGIE",
  },
  description:
    "SOLITEK à Strasbourg et en Alsace : photovoltaïque, pompe à chaleur, climatisation, ventilation et électricité. Étude gratuite pour votre projet énergétique.",
  keywords: [
    // Core métier + Strasbourg
    "solutions énergétiques Strasbourg",
    "panneaux solaires Strasbourg",
    "photovoltaïque Strasbourg",
    "installation photovoltaïque Strasbourg",
    "rénovation énergétique Strasbourg",
    "installateur RGE Alsace",
    "panneaux solaires Alsace",
    "énergie solaire maison",
    "autoconsommation solaire",
    // Services + Strasbourg
    "pompe à chaleur Strasbourg",
    "chauffage Strasbourg",
    "climatisation réversible Strasbourg",
    "VMC double flux Strasbourg",
    "électricité Strasbourg",
    "électricien RGE Strasbourg",
    "pompe à chaleur Alsace",
    "climatisation réversible Alsace",
    "borne IRVE Strasbourg",
    "borne IRVE Alsace",
    // Certifications et aides
    "installateur RGE",
    "MaPrimeRénov panneaux solaires",
    "prime autoconsommation",
    "devis panneaux solaires gratuit",
    // Localisation
    "SOLITEK",
    "énergie renouvelable Strasbourg",
    "énergie renouvelable Alsace",
    "Eurométropole Strasbourg solaire",
    "Bas-Rhin photovoltaïque",
  ],
  metadataBase: new URL(SITE_URL),
  authors: [{ name: "SOLITEK", url: SITE_URL }],
  creator: "Studio Fief",
  publisher: "SOLITEK",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "SOLITEK",
    title: "Solutions énergétiques à Strasbourg | SOLITEK",
    description:
      "SOLITEK à Strasbourg et en Alsace : photovoltaïque, pompe à chaleur, climatisation, ventilation et électricité. Étude gratuite.",
    images: [
      {
        url: "/images/solitek-installation-panneaux-solaires-alsace.jpg",
        width: 1200,
        height: 630,
        alt: "Installation de panneaux solaires par SOLITEK en Alsace",
      },
    ],
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

        {/* Consent Mode config - inline script for fastest execution before GTM */}
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{'ad_storage':'denied','analytics_storage':'denied','functionality_storage':'denied','personalization_storage':'denied','security_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','wait_for_update':1500});gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',false);(function(){var s={adStorage:{storageName:"ad_storage",serialNumber:0},analyticsStorage:{storageName:"analytics_storage",serialNumber:1},functionalityStorage:{storageName:"functionality_storage",serialNumber:2},personalizationStorage:{storageName:"personalization_storage",serialNumber:3},securityStorage:{storageName:"security_storage",serialNumber:4},adUserData:{storageName:"ad_user_data",serialNumber:5},adPersonalization:{storageName:"ad_personalization",serialNumber:6}};var c=localStorage.getItem("__lxG__consent__v2");if(c){c=JSON.parse(c);if(c&&c.cls_val)c=c.cls_val;if(c)c=c.split("|");if(c&&c.length&&typeof c[14]!==undefined){c=c[14].split("").map(function(e){return e-0});if(c.length){var t={};Object.values(s).sort(function(a,b){return a.serialNumber-b.serialNumber}).forEach(function(e){t[e.storageName]=c[e.serialNumber]?"granted":"denied"});gtag("consent","update",t)}}}})();` }} />

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MS6ZCPX8');`}
        </Script>

        {/* Clickio Consent Main tag */}
        <Script
          src="//clickiocmp.com/t/consent_247315.js"
          strategy="lazyOnload"
        />

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BQWM1TP12T"
          strategy="afterInteractive"
        />
        <Script id="ga4-config" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-BQWM1TP12T');`}
        </Script>

        <Script
          id="json-ld-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": `${SITE_URL}/#localbusiness`,
              name: "SOLITEK",
              description:
                "Installateur certifié RGE en Alsace : panneaux solaires photovoltaïques, pompes à chaleur, climatisation réversible, VMC double flux et électricité.",
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              image:
                `${SITE_URL}/images/solitek-installation-panneaux-solaires-alsace.jpg`,
              telephone: "+33783289777",
              email: "solitek@outlook.fr",
              address: {
                "@type": "PostalAddress",
                streetAddress: "7 Rue de Bucarest",
                postalCode: "67100",
                addressLocality: "Strasbourg",
                addressRegion: "Alsace",
                addressCountry: "FR",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "08:00",
                  closes: "12:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "14:00",
                  closes: "18:00",
                },
              ],
              areaServed: [
                { "@type": "AdministrativeArea", name: "Bas-Rhin" },
                { "@type": "AdministrativeArea", name: "Haut-Rhin" },
                { "@type": "City", name: "Strasbourg" },
                { "@type": "City", name: "Eurométropole de Strasbourg" },
              ],
              hasCredential: {
                "@type": "EducationalOccupationalCredential",
                credentialCategory: "RGE",
              },
              makesOffer: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Installation panneaux solaires photovoltaïques" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pompe à chaleur air/eau et air/air" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Climatisation réversible" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "VMC double flux" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Électricité et mise aux normes" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Borne IRVE" } },
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+33783289777",
                contactType: "customer service",
                areaServed: "FR",
                availableLanguage: "French",
              },
              sameAs: [
                "https://www.linkedin.com/in/solitek-energie-82b6402a5/",
                "https://www.instagram.com/solitek_",
              ],
            }),
          }}
        />

        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
