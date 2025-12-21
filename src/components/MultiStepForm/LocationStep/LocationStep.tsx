import { useFormContext } from "react-hook-form";
import MainInput from "../../MainInput/MainInput";

export default function LocationStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Location</h2>

      <MainInput
        type="text"
        placeholder="Full address or area"
        label="Full address or area"
        required={true}
        {...register("location", {
          required: "Location is required",
          minLength: { value: 4, message: "Minimum 4 characters" },
          maxLength: { value: 30, message: "Maximum 30 characters" },
        })}
        error={errors.location?.message as string}
      />

      <MainInput
        type="text"
        placeholder="City"
        label="City"
        required={true}
        {...register("city", {
          required: "City is required",
          minLength: { value: 3, message: "Minimum 3 characters" },
          maxLength: { value: 20, message: "Maximum 20 characters" },
        })}
        error={errors.city?.message as string}
      />
    </div>
  );
}
