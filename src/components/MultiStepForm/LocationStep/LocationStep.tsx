export default function LocationStep({ form, setForm }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Location</h2>

      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Street address"
        className="w-full border p-3 rounded"
      />

      <input
        name="city"
        value={form.city}
        onChange={handleChange}
        placeholder="City"
        className="w-full border p-3 rounded"
      />
    </div>
  );
}
