const API_URL =  "https://springajax.herokuapp.com";

export async function getCategories(size = 100000000) {
  const res = await fetch(
    `${API_URL}/api/categories?size=${size}`
  );

  if (!res.ok) throw new Error('Failed to fetch categories');

  return res.json();
}