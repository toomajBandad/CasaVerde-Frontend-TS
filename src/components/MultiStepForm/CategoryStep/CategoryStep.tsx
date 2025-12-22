import { useFormContext } from "react-hook-form";

export default function CategoryStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Categories</h2>

      <select
        {...register("contractCategory", { required: true })}
        className="w-full border p-3 rounded"
      >
        <option value="">Select contract type</option>
        <option value="BUY">BUY</option>
        <option value="RENT">RENT</option>
        <option value="SHARE">SHARE</option>
      </select>
      {errors.contractCategory && (
        <p className="text-sm text-red-500">Contract type is required</p>
      )}

      <select
        {...register("typeCategory", { required: true })}
        className="w-full border p-3 rounded"
      >
        <option value="">Select property type</option>
        <option value="Apartment">Apartment</option>
        <option value="Villa">Villa</option>
        <option value="Room">Room</option>
        <option value="Flat">Flat</option>
      </select>
      {errors.typeCategory && (
        <p className="text-sm text-red-500">Property type is required</p>
      )}
    </div>
  );
}
