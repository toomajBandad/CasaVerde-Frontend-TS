export default function BasicInfoStep({ form, setForm }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Basic Information</h2>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Property title"
        className="w-full border p-3 rounded"
      />

      <textarea
        name="desc"
        value={form.desc}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-3 rounded"
      />

      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full border p-3 rounded"
      />

      <input
        name="duration"
        value={form.duration}
        onChange={handleChange}
        placeholder="Duration (e.g. monthly)"
        className="w-full border p-3 rounded"
      />

      <input
        type="number"
        name="area"
        value={form.area}
        onChange={handleChange}
        placeholder="Area (m²)"
        className="w-full border p-3 rounded"
      />
    </div>
  );
}
