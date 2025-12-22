import { useFormContext } from "react-hook-form";
import MainInput from "../../MainInput/MainInput";

export default function BasicInfoStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Basic Information</h2>

      <MainInput
        type="text"
        placeholder="Property title"
        label="Property title"
        required={true}
        {...register("title", {
          required: "Title is required",
          minLength: { value: 4, message: "Minimum 4 characters" },
          maxLength: { value: 20, message: "Maximum 20 characters" },
        })}
        error={errors.title?.message as string}
      />

      <MainInput
        type="text"
        placeholder="Description"
        label="Description"
        required={true}
        {...register("desc", {
          required: "Description is required",
          minLength: { value: 10, message: "Minimum 10 characters" },
          maxLength: { value: 200, message: "Maximum 200 characters" },
        })}
        error={errors.desc?.message as string}
      />

      <MainInput
        type="number"
        placeholder="Price"
        label="Price"
        required={true}
        {...register("price", {
          required: "Price is required",
          valueAsNumber: true,
          min: { value: 100, message: "Price must be at least 100" },
          max: { value: 1000000, message: "Price must be at most 1,000,000" },
        })}
        error={errors.price?.message as string}
      />

      <MainInput
        type="number"
        placeholder="Duration (e.g. monthly)"
        label="Duration (e.g. monthly)"
        required={true}
        {...register("duration", {
          required: "Duration is required",
          valueAsNumber: true,
          min: { value: 1, message: "Duration must be at least 1" },
          max: { value: 24, message: "Duration must be at most 24" },
        })}
        error={errors.duration?.message as string}
      />

      <MainInput
        type="number"
        placeholder="Area (m²)"
        label="Area (m²)"
        required={true}
        {...register("area", {
          required: "Area is required",
          valueAsNumber: true,
          min: { value: 10, message: "Area must be at least 10 m²" },
          max: { value: 10000, message: "Area must be at most 10,000 m²" },
        })}
        error={errors.area?.message as string}
      />
    </div>
  );
}
