const apiUrl = import.meta.env.VITE_API_URL as string;

export async function addFavorite(
  userId: string | number,
  propertyId: string | number
) {
  const res = await fetch(`${apiUrl}/users/${userId}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ propertyId }),
  });

  if (!res.ok) {
    throw new Error("Failed to add favorite");
  }
  try {
    return await res.json();
  } catch {
    return;
  }
}

export async function removeFavorite(
  userId: string | number,
  propertyId: string | number
) {
  const res = await fetch(`${apiUrl}/users/${userId}/favorites/${propertyId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to remove favorite");
  }

  try {
    return await res.json();
  } catch {
    return;
  }
}
