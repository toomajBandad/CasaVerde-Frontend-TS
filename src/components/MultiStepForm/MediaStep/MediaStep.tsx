import { useFormContext } from "react-hook-form";
import { useState } from "react";

export default function MediaStep() {
  const { setValue, watch } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);

  const imageFile = watch("imageFile");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ Store the file in the form (NOT uploaded yet)
    setValue("imageFile", file);

    // ✅ Local preview only
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Media</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full border p-3 rounded"
      />

      {(preview || imageFile) && (
        <img
          src={preview || ""}
          alt="Preview"
          className="w-full h-64 object-cover rounded"
        />
      )}
    </div>
  );
}
