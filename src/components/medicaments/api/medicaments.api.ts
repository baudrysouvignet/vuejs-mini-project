export async function getMedicaments(page = 0, size = 20) {
  const res = await fetch(
    `https://springajax.herokuapp.com/api/medicaments?page=${page}&size=${size}`
  );

  if (!res.ok) throw new Error('Failed to fetch medicaments');

  return res.json();
}
