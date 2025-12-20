import { useState } from "react";
import BasicInfoStep from "../BasicInfoStep/BasicInfoStep";
import LocationStep from "../LocationStep/LocationStep";
import SpecsStep from "../SpecsStep/SpecsStep";
import CategoryStep from "../CategoryStep/CategoryStep";
import MediaStep from "../MediaStep/MediaStep";
import ReviewStep from "../ReviewStep/ReviewStep";

export default function ParentForm() {
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    title: "",
    desc: "",
    location: "",
    city: "",
    price: 0,
    duration: "",
    bedrooms: 0,
    bathrooms: 1,
    pets: false,
    couples: false,
    minors: false,
    contractCategory: "",
    typeCategory: "",
    area: 0,
    image: "",
  });

  const steps = [
    <BasicInfoStep form={form} setForm={setForm} />,
    <LocationStep form={form} setForm={setForm} />,
    <SpecsStep form={form} setForm={setForm} />,
    <CategoryStep form={form} setForm={setForm} />,
    <MediaStep form={form} setForm={setForm} />,
    <ReviewStep form={form} setForm={setForm} />,
  ];

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const handleSubmit = () => {
    console.log("Submitting:", form);
    // axios.post("/api/properties", form)
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      {steps[step]}

      <div className="flex justify-between mt-6">
        {step > 0 && (
          <button onClick={back} className="px-4 py-2 bg-gray-200 rounded">
            Back
          </button>
        )}

        {step < steps.length - 1 ? (
          <button
            onClick={next}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
