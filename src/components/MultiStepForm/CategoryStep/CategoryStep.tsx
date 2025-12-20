import { useFormContext } from "react-hook-form";

export default function CategoryStep() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Categories</h2>

      <select
        {...register("contractCategory", { required: true })}
        className="w-full border p-3 rounded"
      >
        <option value="">Select contract type</option>
        <option value="rent">Rent</option>
        <option value="sale">Sale</option>
        <option value="temporary">Temporary</option>
      </select>

      <select
        {...register("typeCategory", { required: true })}
        className="w-full border p-3 rounded"
      >
        <option value="">Select property type</option>
        <option value="apartment">Apartment</option>
        <option value="studio">Studio</option>
        <option value="room">Room</option>
        <option value="house">House</option>
      </select>
    </div>
  );
}
