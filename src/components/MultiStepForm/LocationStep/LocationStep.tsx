import { useFormContext } from "react-hook-form";

export default function LocationStep() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Location</h2>

      <input
        {...register("location", { required: true })}
        placeholder="Full address or area"
        className="w-full border p-3 rounded"
      />

      <input
        {...register("city", { required: true })}
        placeholder="City"
        className="w-full border p-3 rounded"
      />
    </div>
  );
}
