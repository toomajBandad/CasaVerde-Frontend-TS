type BlogCartProps = {
  title: string;
  img: string;
  text: string;
  link?: string;
  dir?: "left" | "right";
};

export default function BlogCart({
  title,
  img,
  text,
  link,
  dir = "right",
}: BlogCartProps) {
  return (
    <div
      className={`flex ${dir === "left" ? "flex-row-reverse" : "flex-row"} 
                  flex-wrap md:mx-60 md:my-12 mx-0 my-0`}
    >
      <img
        src={img}
        alt={title}
        className="w-full md:w-3/5 rounded-none md:rounded-lg object-cover"
      />
      <div
        className="flex flex-col justify-around items-start
                   md:w-2/5 w-full md:-ml-16 md:mt-8
                   p-12 gap-8 rounded-none md:rounded-lg
                   shadow-md text-gray-600 z-10
                   bg-linear-to-br from-[#b7ded9] via-[#eefaf4] to-[#eefaf4]"
      >
        <h2 className="font-aladin text-xl font-bold text-(--Pine-Green) underline">
          {title}
        </h2>
        <p className="text-(--dark-Gray)">{text}</p>
        {link && (
          <a
            href={link}
            className="text-lg font-bold font-aladin underline cursor-pointer
                       text-(--Pine-Green) bg-[#ccebe7]
                       hover:underline hover:shadow-sm"
          >
            Leer más
          </a>
        )}
      </div>
    </div>
  );
}
