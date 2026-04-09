import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";
import { FadeIn } from "@/components/ui/FadeIn";

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#161A1E] px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-20 lg:pb-24 lg:pt-24">
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-4 font-ui text-sm font-semibold uppercase tracking-wide text-[#1E9A66]">
            Contactez-nous
          </p>
          <h1 className="font-title text-4xl font-black uppercase leading-tight text-white sm:text-5xl lg:text-[72px] lg:leading-[1]">
            Demandez votre devis gratuit
          </h1>
          <p className="mt-6 max-w-[600px] font-ui text-base leading-relaxed text-white/70 sm:text-lg">
            Décrivez votre projet, nous vous rappelons sous 24h. Gratuit et sans engagement.
          </p>
        </div>
      </section>

      {/* Formulaire + Carte contact */}
      <section id="formulaire" className="bg-[#F5F7FA] px-4 py-12 sm:px-8 sm:py-16 lg:px-20 lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-5 lg:gap-16">

            {/* Formulaire - 3 colonnes */}
            <div className="lg:col-span-3">
              <h2 className="mb-6 font-title text-2xl font-black uppercase text-[#161A1E] sm:text-3xl">
                Décrivez votre projet
              </h2>
              <ContactForm />
            </div>

            {/* Card contact Florian - 2 colonnes */}
            <div className="flex flex-col lg:col-span-2">
              <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                {/* Bandeau vert */}
                <div className="bg-[#2DB180] px-6 py-5">
                  <p className="font-ui text-xs font-semibold uppercase tracking-wide text-white/70">
                    Votre interlocuteur dédié
                  </p>
                </div>
                {/* Contenu */}
                <div className="flex flex-1 flex-col gap-6 px-6 py-8">
                  <div>
                    <p className="font-title text-xl font-black uppercase text-[#161A1E]">Florian Baret</p>
                    <p className="mt-1 font-ui text-base text-black/50">Dirigeant SOLITEK</p>
                  </div>
                  <div className="h-px bg-slate-100" />
                  <a
                    href="tel:+33783289777"
                    className="group flex items-center gap-4 transition-opacity hover:opacity-80"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2DB180]/10">
                      <svg className="h-5 w-5 text-[#1E9A66]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                    </div>
                    <span className="font-ui text-base font-semibold text-[#161A1E]">07 83 28 97 77</span>
                  </a>
                  <a
                    href="mailto:solitek@outlook.fr"
                    className="group flex items-center gap-4 transition-opacity hover:opacity-80"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2DB180]/10">
                      <svg className="h-5 w-5 text-[#1E9A66]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <span className="font-ui text-base font-medium text-[#161A1E]">solitek@outlook.fr</span>
                  </a>
                  <div className="h-px bg-slate-100" />
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2DB180]/10">
                      <svg className="h-5 w-5 text-[#1E9A66]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-ui text-base font-medium text-[#161A1E]">Lun - Ven</p>
                      <p className="mt-0.5 font-ui text-sm text-black/50">08h00 - 12h00 / 14h00 - 18h00</p>
                    </div>
                  </div>
                  <div className="flex-1" />
                  <a
                    href="/florian-baret.vcf"
                    download="Florian Baret - SOLITEK.vcf"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#2DB180] px-5 py-3 transition-all hover:-translate-y-0.5 hover:bg-[#26A072]"
                  >
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                    <span className="font-ui text-sm font-bold text-white">Ajouter aux contacts</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Qui sommes-nous - intro */}
      <section className="bg-white px-4 pb-6 pt-14 sm:px-8 sm:pb-8 sm:pt-20 lg:px-20 lg:pb-10 lg:pt-24">
        <FadeIn className="mx-auto max-w-[1200px]">
          <h2 className="mb-6 font-title text-3xl font-black uppercase leading-tight text-[#161A1E] sm:text-4xl lg:text-[40px] lg:leading-tight">
            Qui sommes-nous ?
          </h2>
          <p className="max-w-[900px] font-ui text-base leading-relaxed text-black/70 sm:text-lg sm:leading-[27px]">
            SOLITEK, c'est avant tout un expert du terrain. Formé au sein des leaders de l'énergie en Alsace (ES Énergie, FranceSolar, Groupe Beyer), notre fondateur a créé SOLITEK avec une ambition simple : vous offrir un service que les grandes structures ne peuvent pas garantir. Un interlocuteur unique, des conseils honnêtes, et des installations réalisées dans les règles de l'art. Résultat : des clients satisfaits qui nous recommandent, et un accompagnement humain du premier appel à la mise en service.
          </p>
        </FadeIn>
      </section>

      {/* Sous-sections */}
      {[
        {
          bg: "bg-white",
          label: "Expérience",
          title: "Une expertise forgée sur le terrain",
          text: "SOLITEK, c'est avant tout un expert du terrain. Formé au sein des leaders de l'énergie en Alsace (ES Énergie, FranceSolar, Groupe Beyer), notre fondateur a créé SOLITEK avec une ambition simple : vous offrir un service que les grandes structures ne peuvent pas garantir. Un interlocuteur unique, des conseils honnêtes, et des installations réalisées dans les règles de l'art. Résultat : des clients satisfaits qui nous recommandent, et un accompagnement humain du premier appel à la mise en service.",
          image: "/images/solitek-installation-nacelle-toiture-alsace.jpg",
          alt: "Installation de panneaux solaires avec nacelle par SOLITEK",
          position: "center 40%",
          reverse: false,
        },
        {
          bg: "bg-[#F5F7FA]",
          label: "Mission",
          title: "Des solutions fiables, au juste prix",
          text: "Avec Solitek, bénéficiez de solutions intelligentes et durables pour protéger votre habitat dès aujourd'hui. Et pour demain, nous mettons la technologie au service de votre confort et de vos économies.",
          image: "/images/solitek-pompe-chaleur-air-eau-atlantic-terrasse.jpg",
          alt: "Pompe à chaleur Atlantic installée en extérieur par SOLITEK",
          position: "60% center",
          reverse: true,
        },
        {
          bg: "bg-white",
          label: "Valeurs",
          title: "Un suivi humain et personnalisé",
          text: "Chez Solitek, chaque installation et chaque projet sont uniques. Nous nous adaptons à votre configuration, à vos besoins et à vos contraintes afin de vous proposer une solution entièrement sur-mesure, au-delà de l'installation. Nous mettons un point d'honneur à vous offrir un accompagnement personnalisé avec un suivi humain, indispensable et réactif à chaque étape de votre projet chez Solitek. La relation client est au coeur de notre engagement.",
          image: "/images/solitek-pompe-chaleur-facade-moderne.jpg",
          alt: "Pompe à chaleur installée sur facade moderne",
          position: "center",
          reverse: false,
        },
        {
          bg: "bg-[#F5F7FA]",
          label: "Solution",
          title: "Gratuit et sans engagement",
          text: "Chez SOLITEK, nous faisons le choix de vous accompagner en toute transparence dès le début de votre projet. Ainsi, l'ensemble de nos prestations en amont (conseil, déplacement, solution, étude technique, élaboration du projet) est entièrement gratuit et sans engagement. Bénéficiez d'une approche complète et personnalisée, sans aucun frais, afin de vous permettre de construire votre projet en toute sérénité. Une démarche simple, claire et pensée pour vous.",
          image: "/images/solitek-carport-solaire-ciel-bleu.jpg",
          alt: "Carport solaire installé par SOLITEK en Alsace",
          position: "center 45%",
          reverse: true,
        },
      ].map((s) => (
        <section key={s.label} className={`${s.bg} px-4 py-12 sm:px-8 sm:py-16 lg:px-20 lg:py-20`}>
          <FadeIn className={`mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 ${s.reverse ? "lg:[direction:rtl]" : ""}`}>
            <div className={s.reverse ? "lg:[direction:ltr]" : ""}>
              <p className="mb-2 font-ui text-sm font-semibold uppercase tracking-wide text-[#1E9A66]">
                {s.label}
              </p>
              <h3 className="mb-4 font-title text-xl font-black uppercase leading-tight text-[#161A1E] sm:text-2xl lg:text-[30px] lg:leading-tight">
                {s.title}
              </h3>
              <p className="font-ui text-base leading-relaxed text-black/70 sm:text-lg sm:leading-[27px]">
                {s.text}
              </p>
            </div>
            <div className={s.reverse ? "lg:[direction:ltr]" : ""}>
              <Image
                src={s.image}
                alt={s.alt}
                width={600}
                height={340}
                className="h-[280px] w-full rounded-2xl object-cover sm:h-[320px] lg:h-[340px]"
                style={{ objectPosition: s.position }}
              />
            </div>
          </FadeIn>
        </section>
      ))}

      {/* Processus SOLITEK */}
      <section className="bg-[#161A1E] px-4 py-14 sm:px-8 sm:py-20 lg:px-20">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-10 text-center font-title text-3xl font-black uppercase leading-tight text-white sm:mb-14 sm:text-4xl lg:text-[40px] lg:leading-tight">
            Comment ça marche ?
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
            {[
              { step: "01", title: "Prise de contact", desc: "Décrivez votre projet via le formulaire ou par téléphone. Nous vous recontactons sous 24h pour échanger sur vos besoins.", icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              )},
              { step: "02", title: "Visite technique", desc: "Un technicien se déplace gratuitement chez vous pour réaliser une étude personnalisée et vous remettre un devis détaillé.", icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
                </svg>
              )},
              { step: "03", title: "Installation", desc: "Notre équipe intervient avec du matériel haut de gamme. Mise en service, test de conformité et remise des documents inclus.", icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
              )},
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2DB180]/15 text-[#1E9A66]">
                  {item.icon}
                </div>
                <span className="font-ui text-xs font-bold tracking-wide text-[#1E9A66]">{item.step}</span>
                <h3 className="font-title text-xl font-black uppercase text-white">{item.title}</h3>
                <p className="font-ui text-sm leading-relaxed text-white/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-white px-4 py-14 sm:px-8 sm:py-20 lg:px-20">
        <FadeIn className="mx-auto flex max-w-[800px] flex-col items-center gap-6 text-center">
          <h2 className="font-title text-3xl font-black uppercase leading-tight text-[#161A1E] sm:text-4xl lg:text-[40px] lg:leading-tight">
            Prêt à lancer votre projet ?
          </h2>
          <p className="font-ui text-base leading-relaxed text-black/70 sm:text-lg">
            Demandez votre devis gratuit ou estimez directement votre installation photovoltaïque.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <a
              href="#formulaire"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#2DB180] px-8 font-ui text-base font-bold text-white shadow-[0_18px_40px_rgba(45,177,128,0.32)] transition-all hover:-translate-y-0.5 hover:bg-[#26A072]"
            >
              Devis gratuit tous travaux
            </a>
            <Link
              href="/estimateur"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-[#2DB180] px-8 font-ui text-base font-bold text-[#2DB180] transition-all hover:-translate-y-0.5 hover:bg-[#2DB180]/5"
            >
              Simulation solaire en 2 min
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
