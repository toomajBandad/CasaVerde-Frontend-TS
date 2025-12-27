import MainTitle from "../../components/MainTitle/MainTitle";
import ParentForm from "../../components/MultiStepForm/ParentForm/ParentForm";

export default function CreateProperty() {
  return (
    <div className="min-h-screen bg-linear-to-br from-teal-500 via-teal-200 to-teal-200 pb-10">
      <div className="h-20 bg-linear-to-r from-teal-800 via-teal-400 to-teal-300"></div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-start px-4 pt-10">
        <div className="hidden md:block">
          <img
            src="/images/sides/1.jpg" //
            alt="Property illustration"
            className="w-full h-full object-cover rounded-tl-8xl rounded-bl-8xl shadow-lg"
          />
        </div>

        <div className="bg-white p-10 h-full flex flex-col justify-center items-center rounded-tr-8xl rounded-br-8xl shadow-lg">
          <MainTitle>Add a New Property</MainTitle>
          <ParentForm />
        </div>
      </div>
    </div>
  );
}
