type CardConceptProps = {
  icon: string;
  title: string;
  text: string;
};

export default function CardConcept({ icon, title, text }: CardConceptProps) {
  return (
    <div
      className="
        flex justify-center items-center bg-white border border-gray-400 rounded-lg
        transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg cursor-pointer
        flex-col md:flex-col px-4 md:px-8 py-2 md:py-4 gap-2 md:gap-5
      "
    >
      {/* Icon */}
      <div className="mb-4 md:mb-0">
        <img src={icon} alt={title} className="w-20" />
      </div>

      {/* Title + Text */}
      <div className="flex flex-col text-center md:text-center px-2 md:px-4 gap-2 md:gap-4">
        <h3 className="font-[Aladin] text-lg font-semibold">{title}</h3>
        <p className="text-gray-600 leading-6">{text}</p>
      </div>
    </div>
  );
}
