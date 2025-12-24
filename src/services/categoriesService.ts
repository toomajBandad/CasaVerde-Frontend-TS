const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchContractCategories() {
  const res = await fetch(`${apiUrl}/contractCategories`);
  if (!res.ok) throw new Error("Failed to fetch contract categories");
  const data = await res.json();
  return data.contractCategories;
}

export async function fetchTypeCategories() {
  const res = await fetch(`${apiUrl}/typeCategories`);
  if (!res.ok) throw new Error("Failed to fetch type categories");
  const data = await res.json();
  return data.typeCategories;
}
