import { useFormContext } from "react-hook-form";
import MainInput from "../../MainInput/MainInput";

export default function SpecsStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Specifications</h2>

      <MainInput
        type="number"
        placeholder="Number of bedrooms"
        label="Number of bedrooms"
        required={true}
        {...register("bedrooms", {
          required: "Number of bedrooms is required",
          min: { value: 0, message: "Minimum is 0" },
          max: { value: 5, message: "Maximum is 5" },
        })}
        error={errors.bedrooms?.message as string}
      />

      <MainInput
        type="number"
        placeholder="Number of bathrooms"
        label="Number of bathrooms"
        required={true}
        {...register("bathrooms", {
          required: "Number of bathrooms is required",
          min: { value: 0, message: "Minimum is 0" },
          max: { value: 3, message: "Maximum is 3" },
        })}
        error={errors.bathrooms?.message as string}
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
