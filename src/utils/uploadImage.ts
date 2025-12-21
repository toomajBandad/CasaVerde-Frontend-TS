// src/utils/uploadImage.ts
export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "casa_verde");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dvblykeav/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url; // ✅ final Cloudinary URL
};
