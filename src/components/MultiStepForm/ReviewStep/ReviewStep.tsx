export default function ReviewStep({ form }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Review Your Property</h2>

      <div className="space-y-2">
        <p>
          <strong>Title:</strong> {form.title}
        </p>
        <p>
          <strong>Description:</strong> {form.desc}
        </p>
        <p>
          <strong>Location:</strong> {form.location}, {form.city}
        </p>
        <p>
          <strong>Price:</strong> {form.price}
        </p>
        <p>
          <strong>Duration:</strong> {form.duration}
        </p>
        <p>
          <strong>Area:</strong> {form.area} m²
        </p>
        <p>
          <strong>Bedrooms:</strong> {form.bedrooms}
        </p>
        <p>
          <strong>Bathrooms:</strong> {form.bathrooms}
        </p>
        <p>
          <strong>Pets:</strong> {form.pets ? "Yes" : "No"}
        </p>
        <p>
          <strong>Couples:</strong> {form.couples ? "Yes" : "No"}
        </p>
        <p>
          <strong>Minors:</strong> {form.minors ? "Yes" : "No"}
        </p>
        <p>
          <strong>Contract:</strong> {form.contractCategory}
        </p>
        <p>
          <strong>Type:</strong> {form.typeCategory}
        </p>
      </div>

      {form.image && (
        <img
          src={form.image}
          alt="Preview"
          className="w-full h-48 object-cover rounded"
        />
      )}
    </div>
  );
}
