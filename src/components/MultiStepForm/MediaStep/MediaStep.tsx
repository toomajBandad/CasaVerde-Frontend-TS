export default function MediaStep({ form, setForm }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Media</h2>

      <input
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full border p-3 rounded"
      />

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
