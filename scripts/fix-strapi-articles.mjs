const TOKEN = process.env.STRAPI_API_TOKEN;
const BASE = "https://cms-production-8fb5.up.railway.app";

async function del(docId) {
  const r = await fetch(`${BASE}/api/articles/${docId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  console.log("DELETE", docId, r.status);
}

async function update(docId, data) {
  const r = await fetch(`${BASE}/api/articles/${docId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });
  const j = await r.json();
  if (!r.ok) console.log("FAIL", docId, JSON.stringify(j.error));
  else console.log("OK", docId, data.categorie);
}

async function main() {
  // Delete bad duplicate
  await del("q99kve09v36y9f06ncibkz1v");

  // Fix categories
  const fixes = [
    { id: "o3278wyiin70pf2gu49piy1f", cat: "Photovoltaique" },
    { id: "gkhc52s2afx15wzy7lpjtfro", cat: "Climatisation" },
    { id: "rq5d3j3m9vr94zshqzpaj1ix", cat: "Climatisation" },
    { id: "r0d6dqm69g8o1q246cofwm6v", cat: "Photovoltaique" },
    { id: "fr16r7nsg5c53e2n2stzx7yr", cat: "Electricite" },
    { id: "cz2nq86er50z3mtu0ueafg8f", cat: "Entretien" },
    { id: "anmqb0ph4uudoleazy21ml43", cat: "Chauffage" },
    { id: "h3cmv6r9607al99amek673pz", cat: "Chauffage" },
    { id: "qrr4iol7xj8tnzc9xfcu8i7f", cat: "Photovoltaique" },
    { id: "s6u1p0egkf9u9dwiw4mk73l6", cat: "Photovoltaique" },
    { id: "ashsp44rhs9mwts8khg6azst", cat: "Aides & Primes" },
    { id: "l8osbgvc7q9immfrrckt0dcj", cat: "Photovoltaique" },
    { id: "rswy50auylyr0fr3hlvt59hd", cat: "Ventilation" },
  ];

  for (const f of fixes) {
    await update(f.id, { categorie: f.cat });
  }

  console.log("\nDone");
}

main();
