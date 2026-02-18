const API_URL =  "https://springajax.herokuapp.com";

export async function getMedicaments(page = 0, size = 20) {
  const res = await fetch(
    `${API_URL}/api/medicaments?page=${page}&size=${size}`
  );

  if (!res.ok) throw new Error('Failed to fetch medicaments');

  return res.json();
}


export async function patchMedicamentStock(reference, unitesEnStock) {
  const res = await fetch(
    `${API_URL}/api/medicaments/${reference}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        unitesEnStock: unitesEnStock
      })
    }
  );

  if (!res.ok) throw new Error("Failed to update medicament stock");

  return res.json();
}

export async function deleteMedicament(reference: string) {
  const res = await fetch(
    `${API_URL}/api/medicaments/${reference}`,
    { method: "DELETE" }
  );

  if (!res.ok) throw new Error("Failed to delete medicament");
}


export async function createMedicament(medicament: any) {
  const res = await fetch(`${API_URL}/api/medicaments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(medicament.toDTO()),
  });

  if (!res.ok) throw new Error("Failed to create medicament");
  return res.json();
}

export async function updateMedicament(medicament) {
  const res = await fetch(`${API_URL}/api/medicaments/${medicament.reference}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(medicament.toDTO()),
  });

  if (!res.ok) throw new Error("Failed to update medicament");
  return res.json();
}