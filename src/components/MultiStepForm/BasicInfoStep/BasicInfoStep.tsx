import { useFormContext } from "react-hook-form";

export default function BasicInfoStep() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Basic Information</h2>

      <input
        {...register("title", { required: true })}
        placeholder="Property title"
        className="w-full border p-3 rounded"
      />

      <textarea
        {...register("desc", { required: true })}
        placeholder="Description"
        className="w-full border p-3 rounded"
      />

      <input
        type="number"
        {...register("price", { required: true, valueAsNumber: true })}
        placeholder="Price"
        className="w-full border p-3 rounded"
      />

      <input
        {...register("duration", { required: true })}
        placeholder="Duration (e.g. monthly)"
        className="w-full border p-3 rounded"
      />

      <input
        type="number"
        {...register("area", { required: true, valueAsNumber: true })}
        placeholder="Area (m²)"
        className="w-full border p-3 rounded"
      />
    </div>
  );
}
