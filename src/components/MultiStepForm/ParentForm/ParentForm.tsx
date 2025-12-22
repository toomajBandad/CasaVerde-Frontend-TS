import { useContext, useState } from "react";
import { useForm, FormProvider, type SubmitHandler } from "react-hook-form";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import BasicInfoStep from "../BasicInfoStep/BasicInfoStep";
import LocationStep from "../LocationStep/LocationStep";
import SpecsStep from "../SpecsStep/SpecsStep";
import CategoryStep from "../CategoryStep/CategoryStep";
import MediaStep from "../MediaStep/MediaStep";
import ReviewStep from "../ReviewStep/ReviewStep";
import MainBtn from "../../MainBtn/MainBtn";
import { uploadImage } from "../../../utils/uploadImage";
import AuthContext from "../../../contexts/AuthContext";

export type PropertyForm = {
  title: string;
  desc: string;
  location: string;
  city: string;
  price: number;
  duration: number;
  bedrooms: number;
  bathrooms: number;
  pets: boolean;
  couples: boolean;
  minors: boolean;
  contractCategory: string;
  typeCategory: string;
  area: number;
  image: string;
  imageFile?: File | null;
  owner?: string;
};

export default function ParentForm() {
  const apiUrl = import.meta.env.VITE_API_URL as string;
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [validationTick, setValidationTick] = useState(0);

  const methods = useForm<PropertyForm>({
    defaultValues: {
      title: "",
      desc: "",
      location: "",
      city: "",
      price: 0,
      duration: 0,
      bedrooms: 0,
      bathrooms: 1,
      pets: false,
      couples: false,
      minors: false,
      contractCategory: "",
      typeCategory: "",
      area: 0,
      image: "",
      imageFile: null,
      owner: authContext.userInfos?.id || "",
    },
    mode: "onTouched",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    shouldFocusError: true,
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
    const valid = await methods.trigger(undefined, { shouldFocus: true });

    if (!valid) {
      setValidationTick((t) => t + 1); // force re-render to show errors
      return;
    }

    setStep((s) => s + 1);
  };

  const back = () => setStep((s) => s - 1);

  const onSubmit: SubmitHandler<PropertyForm> = async (formDatas) => {
    setLoading(true);
    console.log(formDatas);

    try {
      let finalImageUrl = null;
      if (formDatas.imageFile) {
        finalImageUrl = await uploadImage(formDatas.imageFile);
      }

      const payload = {
        ...formDatas,
        image: finalImageUrl,
        owner: authContext.userInfos?.id || "",
      };

      delete payload.imageFile;

      const res = await fetch(`${apiUrl}/properties`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let result = {};
      try {
        result = await res.json();
      } catch {
        console.log(result);
      }

      if (res.ok) {
        authContext.updateUserInfos();

        navigate("/profile");
      } else {
        Swal.fire({
          icon: "error",
          title: "Adding Property Failed",
          text: "Please try again later.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full px-5">
        <StepComponent key={step + "-" + validationTick} />

        <div className="flex justify-between mt-6">
          {step > 0 && (
            <MainBtn onClick={back} type="button" disabled={loading}>
              Back
            </MainBtn>
          )}

          {step < stepConfig.length - 1 ? (
            <MainBtn onClick={next} type="button" disabled={loading}>
              {loading ? "Loading..." : "Next"}
            </MainBtn>
          ) : (
            <></>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
