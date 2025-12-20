import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import BasicInfoStep from "../BasicInfoStep/BasicInfoStep";
import LocationStep from "../LocationStep/LocationStep";
import SpecsStep from "../SpecsStep/SpecsStep";
import CategoryStep from "../CategoryStep/CategoryStep";
import MediaStep from "../MediaStep/MediaStep";
import ReviewStep from "../ReviewStep/ReviewStep";

export type PropertyForm = {
  title: string;
  desc: string;
  location: string;
  city: string;
  price: number;
  duration: string;
  bedrooms: number;
  bathrooms: number;
  pets: boolean;
  couples: boolean;
  minors: boolean;
  contractCategory: string;
  typeCategory: string;
  area: number;
  image: string;
};

export default function ParentForm() {
  const [step, setStep] = useState(0);

  const methods = useForm<PropertyForm>({
    defaultValues: {
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
    },
  });

  const stepConfig = [
    { key: "basic", component: BasicInfoStep },
    { key: "location", component: LocationStep },
    { key: "specs", component: SpecsStep },
    { key: "category", component: CategoryStep },
    { key: "media", component: MediaStep },
    { key: "review", component: ReviewStep },
  ];

  const StepComponent = stepConfig[step].component;

  const next = async () => {
    const valid = await methods.trigger();
    if (valid) setStep((s) => s + 1);
  };

  const back = () => setStep((s) => s - 1);

  const onSubmit = (data: PropertyForm) => {
    console.log("Submitting:", data);
    // axios.post("/api/properties", data)
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow"
      >
        <StepComponent />

        <div className="flex justify-between mt-6">
          {step > 0 && (
            <button
              type="button"
              onClick={back}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Back
            </button>
          )}

          {step < stepConfig.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
