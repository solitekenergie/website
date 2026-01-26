/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

type AssetProbeProps = {
  sources: { src: string; label: string }[];
};

export function AssetProbe({ sources }: AssetProbeProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {sources.map(({ src, label }) => (
        <ProbeImage key={src} src={src} label={label} />
      ))}
    </div>
  );
}

function ProbeImage({ src, label }: { src: string; label: string }) {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`flex h-32 w-full items-center justify-center rounded border text-xs ${
          status === "error" ? "border-red-500 text-red-600" : "border-slate-200 text-slate-500"
        }`}
      >
        <img
          className="h-full w-full rounded object-cover"
          src={src}
          alt={label}
          onLoad={() => {
            console.log("IMG OK", src);
            setStatus("ok");
          }}
          onError={() => {
            console.log("IMG ERROR", src);
            setStatus("error");
          }}
        />
      </div>
      <span className="text-xs font-mono text-slate-600">
        {label} — {status === "error" ? "ERROR" : status === "ok" ? "OK" : "pending"}
      </span>
      <span className="text-[10px] text-slate-500 break-all">{src}</span>
    </div>
  );
}
