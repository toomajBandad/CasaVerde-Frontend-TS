import { useFormContext } from "react-hook-form";

export default function ReviewStep() {
  const { watch } = useFormContext();

  const data = watch(); // get all form values

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Review Your Information</h2>

      <div className="space-y-2 text-gray-700">
        <p>
          <strong>Title:</strong> {data.title}
        </p>
        <p>
          <strong>Description:</strong> {data.desc}
        </p>
        <p>
          <strong>Price:</strong> {data.price}
        </p>
        <p>
          <strong>Duration:</strong> {data.duration}
        </p>
        <p>
          <strong>Area:</strong> {data.area} m²
        </p>

        <p>
          <strong>Location:</strong> {data.location}
        </p>
        <p>
          <strong>City:</strong> {data.city}
        </p>

        <p>
          <strong>Bedrooms:</strong> {data.bedrooms}
        </p>
        <p>
          <strong>Bathrooms:</strong> {data.bathrooms}
        </p>

        <p>
          <strong>Pets allowed:</strong> {data.pets ? "Yes" : "No"}
        </p>
        <p>
          <strong>Couples allowed:</strong> {data.couples ? "Yes" : "No"}
        </p>
        <p>
          <strong>Minors allowed:</strong> {data.minors ? "Yes" : "No"}
        </p>

        <p>
          <strong>Contract type:</strong> {data.contractCategory}
        </p>
        <p>
          <strong>Property type:</strong> {data.typeCategory}
        </p>

        {data.image && (
          <div className="mt-4">
            <strong>Image Preview:</strong>
            <img
              src={data.image}
              alt="Preview"
              className="w-full h-64 object-cover rounded mt-2"
            />
          </div>
        )}
      </div>
    </div>
  );
}
