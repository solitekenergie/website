"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import {
  contactSchema,
  type ContactFormData,
  type ContactPayload,
} from "@/lib/validation/contact";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData, undefined, ContactPayload>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = async (data: ContactPayload) => {
    setStatus("loading");
    setServerMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = (await response.json().catch(() => null)) as
        | { message?: string; note?: string }
        | null;

      if (!response.ok) {
        setStatus("error");
        setServerMessage(payload?.message ?? "Impossible d'envoyer le message.");
        return;
      }

      setStatus("success");
      setServerMessage(payload?.note ?? "Merci, nous vous recontactons rapidement.");
      reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setServerMessage("Erreur réseau, merci de réessayer.");
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#161A1E] px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-20 lg:pb-24 lg:pt-24">
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-4 font-['Figtree'] text-sm font-semibold uppercase tracking-widest text-[#2DB180]">
            Contactez-nous
          </p>
          <h1 className="font-title text-4xl font-black uppercase leading-tight text-white sm:text-5xl lg:text-[72px] lg:leading-[1]">
            Demandez<br />un devis
          </h1>
          <p className="mt-6 max-w-[600px] font-['Figtree'] text-base leading-relaxed text-white/70 sm:text-lg">
            Décrivez votre projet, nous vous rappelons sous 24h. Sans engagement.
          </p>
        </div>
      </section>

      <div className="bg-[#F5F7FA]">
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 sm:py-16 lg:px-20 lg:py-20">

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16 xl:gap-24">

          {/* Colonne formulaire */}
          <div className="flex w-full flex-col gap-8 lg:flex-1">
            <div>
              <p className="font-['Figtree'] text-base leading-relaxed text-black/60 sm:text-lg">
                Pompe à chaleur, climatisation, VMC, électricité : décrivez votre projet ici, nous vous rappelons sous 24h. Pour le photovoltaïque, utilisez notre{' '}
                <a href="/estimateur" className="font-semibold text-[#2DB180] underline underline-offset-2 hover:opacity-80">
                  simulateur dédié
                </a>
                .
              </p>
            </div>

            {/* Processus SOLITEK */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-0">
              {[
                { step: '01', title: 'Prise de contact', desc: 'Réponse sous 24h' },
                { step: '02', title: 'Visite technique', desc: 'Devis personnalisé offert' },
                { step: '03', title: 'Installation', desc: 'Mise en service incluse' },
              ].map((item) => (
                <div key={item.step} className="flex flex-col gap-2 border-l-2 border-[#2DB180] pl-4 sm:border-l-0 sm:border-t-2 sm:pl-0 sm:pt-4 sm:pr-4">
                  <span className="font-['Figtree'] text-xs font-bold text-[#2DB180]">{item.step}</span>
                  <p className="font-['Figtree'] text-sm font-semibold text-[#161A1E]">{item.title}</p>
                  <p className="font-['Figtree'] text-xs text-black/50">{item.desc}</p>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-4"
            >
              <Field
                label="Nom complet*"
                type="text"
                register={register("name")}
                error={errors.name?.message}
                disabled={status === "loading"}
              />

              <div className="flex flex-col gap-4 sm:flex-row">
                <Field
                  label="E-mail*"
                  type="email"
                  register={register("email")}
                  error={errors.email?.message}
                  disabled={status === "loading"}
                />
                <Field
                  label="Téléphone"
                  type="tel"
                  register={register("phone")}
                  error={errors.phone?.message}
                  disabled={status === "loading"}
                />
              </div>

              <Field
                label="Message*"
                type="textarea"
                register={register("message")}
                error={errors.message?.message}
                disabled={status === "loading"}
              />

              {serverMessage && (
                <div
                  className={`w-full rounded-lg p-4 text-sm font-medium ${
                    status === "success"
                      ? "border border-green-200 bg-green-50 text-green-800"
                      : "border border-red-200 bg-red-50 text-red-800"
                  }`}
                >
                  {serverMessage}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2DB180] px-8 py-4 transition-colors hover:bg-[#26a072] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <AnimatedLink className="font-['Figtree'] text-sm font-bold uppercase leading-tight text-white sm:text-base">
                    {status === "loading" ? "Envoi en cours…" : "Envoyer"}
                  </AnimatedLink>
                </button>
              </div>
            </form>
          </div>

          {/* Colonne visuelle — cachée sur mobile, visible à partir de lg */}
          <div className="hidden lg:flex lg:w-[420px] lg:flex-shrink-0 lg:self-stretch xl:w-[500px]">
            <div className="w-full overflow-hidden rounded-2xl shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="relative h-full">
                <div className="pointer-events-none absolute inset-0 z-10 bg-black/20" />
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster="/images/solitek-toiture-equipee-panneaux-solaires-alsace.jpg"
                >
                  <source src="/hero.mp4" type="video/mp4" />
                </video>
                {/* Badge superposé */}
                <div className="absolute bottom-6 left-6 right-6 z-20 rounded-xl bg-white/10 p-5 backdrop-blur-sm">
                  <p className="font-['Figtree'] text-sm font-semibold text-white">
                    Florian Baret
                  </p>
                  <p className="font-['Figtree'] text-sm text-white/80">
                    Responsable photovoltaïque SOLITEK
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  type: string;
  register: any;
  error?: string;
  disabled?: boolean;
};

function Field({ label, type, register, error, disabled }: FieldProps) {
  const base =
    "w-full rounded-lg border border-[rgba(128,128,128,0.40)] bg-white px-4 py-3 text-base text-[#161A1E] placeholder-transparent focus:border-[#2DB180] focus:outline-none focus:ring-2 focus:ring-[#2DB180]/20 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 sm:py-4";

  return (
    <div className="flex flex-1 flex-col gap-1.5">
      <label className="font-['Figtree'] text-sm font-medium text-black/70 sm:text-base">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          {...register}
          disabled={disabled}
          rows={5}
          className={base}
        />
      ) : (
        <input
          type={type}
          {...register}
          disabled={disabled}
          className={`h-12 sm:h-[52px] ${base}`}
        />
      )}
      {error && (
        <p className="text-xs font-medium text-red-600 sm:text-sm">{error}</p>
      )}
    </div>
  );
}
