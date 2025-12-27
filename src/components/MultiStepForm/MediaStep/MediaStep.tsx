import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";

export default function MediaStep() {
  const { register, setValue, watch } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);

  // Watch the file stored in RHF
  const imageFile = watch("imageFile");

  // Register field for persistence
  register("imageFile");

  // 🔥 Rebuild preview when returning to this step
  useEffect(() => {
    if (imageFile && !preview) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(imageFile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Save file in RHF
    setValue("imageFile", file);

    // Local preview
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
          src={preview || "#"}
          alt="Preview"
          className="w-full h-64 object-cover rounded"
        />
      )}
    </div>
  );
}
