export default function CategoryStep({ form, setForm }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Categories</h2>

      <select
        name="contractCategory"
        value={form.contractCategory}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      >
        <option value="">Contract type</option>
        <option value="rent">Rent</option>
        <option value="sell">Sell</option>
      </select>

      <select
        name="typeCategory"
        value={form.typeCategory}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      >
        <option value="">Property type</option>
        <option value="apartment">Apartment</option>
        <option value="studio">Studio</option>
        <option value="house">House</option>
      </select>
    </div>
  );
}
