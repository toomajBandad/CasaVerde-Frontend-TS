import ParentForm from "../../components/MultiStepForm/ParentForm/ParentForm";

export default function CreateProperty() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8 text-center">
          Add a New Property
        </h1>

        <ParentForm />
      </div>
    </div>
  );
}
