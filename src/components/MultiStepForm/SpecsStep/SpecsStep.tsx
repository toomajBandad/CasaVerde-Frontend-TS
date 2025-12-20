export default function SpecsStep({ form, setForm }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Specifications</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="bedrooms"
          value={form.bedrooms}
          onChange={handleChange}
          placeholder="Bedrooms"
          className="border p-3 rounded"
        />

        <input
          type="number"
          name="bathrooms"
          value={form.bathrooms}
          onChange={handleChange}
          placeholder="Bathrooms"
          className="border p-3 rounded"
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="pets"
            checked={form.pets}
            onChange={handleChange}
          />
          Pets allowed
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="couples"
            checked={form.couples}
            onChange={handleChange}
          />
          Couples allowed
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="minors"
            checked={form.minors}
            onChange={handleChange}
          />
          Minors allowed
        </label>
      </div>
    </div>
  );
}
