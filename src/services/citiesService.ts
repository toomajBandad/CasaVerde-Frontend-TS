const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchCities() {
  const res = await fetch(`${apiUrl}/cities`);
  if (!res.ok) throw new Error("Failed to fetch cities");
  const data = await res.json();
  return data.cities;
}
