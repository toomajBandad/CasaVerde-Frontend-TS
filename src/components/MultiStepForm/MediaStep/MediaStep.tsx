import { useFormContext } from "react-hook-form";
import { useState } from "react";

export default function MediaStep() {
  const { register, setValue, watch } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);

  const image = watch("image");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setValue("image", base64); // store in form
      setPreview(base64); // local preview
    };
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

      {(preview || image) && (
        <img
          src={preview || image}
          alt="Preview"
          className="w-full h-64 object-cover rounded"
        />
      )}
    </div>
  );
}
