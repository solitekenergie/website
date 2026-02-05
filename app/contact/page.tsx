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
    <section className="w-full h-full pt-[160px] pb-20 px-[100px] inline-flex justify-start items-start gap-[120px] bg-[#F5F7FA]">
      <div className="flex-1 overflow-hidden rounded-[8px] inline-flex flex-col justify-start items-start gap-8 p-0">
        <div className="w-full flex flex-col justify-start items-start gap-6">
          <div className="text-[#2DB180] text-[72px] leading-[72px] font-title font-black uppercase">
            Demandez <br />
            un devis
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col justify-start items-start gap-4">
            <div className="w-full inline-flex gap-4">
              <Field
                label="Nom complet*"
                type="text"
                register={register("name")}
                error={errors.name?.message}
                disabled={status === "loading"}
              />
            </div>
            <div className="w-full inline-flex gap-4">
              <Field
                label="E-mail*"
                type="email"
                full
                register={register("email")}
                error={errors.email?.message}
                disabled={status === "loading"}
              />
            </div>
            <Field
              label="Numéro de téléphone"
              type="tel"
              full
              register={register("phone")}
              error={errors.phone?.message}
              disabled={status === "loading"}
            />
            <Field
              label="Message*"
              type="textarea"
              full
              register={register("message")}
              error={errors.message?.message}
              disabled={status === "loading"}
            />

            {serverMessage && (
              <div
                className={`w-full rounded-lg p-4 ${
                  status === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {serverMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#2DB180] px-6 py-4 hover:bg-[#26a072] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <AnimatedLink className="text-white text-[14px] leading-[16.8px] font-['Figtree'] font-bold uppercase">
                {status === "loading" ? "Envoi en cours..." : "Envoyer"}
              </AnimatedLink>
            </button>
          </form>
        </div>
      </div>

      <div className="relative w-[536px] h-[698px] pt-10 pb-10 overflow-hidden rounded-[24px]">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%)] pointer-events-none" />
        <video
          className="h-full w-full rounded-[24px] object-cover scale-110"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/mission-toiture-05.jpg"
        >
          <source src="/hero.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo HTML5.
        </video>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  type: string;
  full?: boolean;
  register: any;
  error?: string;
  disabled?: boolean;
};

function Field({ label, type, full, register, error, disabled }: FieldProps) {
  return (
    <div className={`inline-flex flex-col justify-start items-start gap-2 ${full ? "flex-1" : "flex-1"}`}>
      <div className="text-[16px] leading-[19.2px] font-title font-normal text-black/60">{label}</div>
      {type === "textarea" ? (
        <textarea
          {...register}
          disabled={disabled}
          rows={5}
          className="w-full rounded-[8px] border border-[rgba(128,128,128,0.55)] px-6 py-4 text-[16px] text-[#161A1E] focus:outline-none focus:border-[#2DB180] focus:ring-2 focus:ring-[#2DB180]/20 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      ) : (
        <input
          type={type}
          {...register}
          disabled={disabled}
          className="h-[50px] w-full rounded-[8px] border border-[rgba(128,128,128,0.55)] px-6 py-4 text-[16px] text-[#161A1E] focus:outline-none focus:border-[#2DB180] focus:ring-2 focus:ring-[#2DB180]/20 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
