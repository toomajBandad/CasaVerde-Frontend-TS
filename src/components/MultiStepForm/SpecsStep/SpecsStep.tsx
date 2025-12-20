import { useFormContext } from "react-hook-form";

export default function SpecsStep() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Specifications</h2>

      <input
        type="number"
        {...register("bedrooms", { required: true, valueAsNumber: true })}
        placeholder="Number of bedrooms"
        className="w-full border p-3 rounded"
      />

      <input
        type="number"
        {...register("bathrooms", { required: true, valueAsNumber: true })}
        placeholder="Number of bathrooms"
        className="w-full border p-3 rounded"
      />

      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("pets")} className="h-4 w-4" />
        <label>Pets allowed</label>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("couples")} className="h-4 w-4" />
        <label>Couples allowed</label>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("minors")} className="h-4 w-4" />
        <label>Minors allowed</label>
      </div>
    </div>
  );
}
