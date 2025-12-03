import responsive from "/images/icons/responsive.png";
import infinity from "/images/icons/infinity.png";
import socialMedia from "/images/icons/bullhorn.png";
import CardConcept from "../CardConcept/CardConcept";

export default function CardConceptCompo() {
  const infoArray = [
    {
      id: 1,
      icon: responsive,
      title: "Web & Mobile Application",
      text: "You can use our tool on any device, whether it is a desktop computer, tablet or mobile phone, and all you want.",
    },
    {
      id: 2,
      icon: infinity,
      title: "Without Any Limit",
      text: "Our service is designed to be fast and efficient, with no limits on the number of images you can upload.",
    },
    {
      id: 3,
      icon: socialMedia,
      title: "Social Media Ready",
      text: "We provide you with the perfect image size for your social media posts, so you can share your content with ease.",
    },
  ];

  return (
    <div className="flex justify-center items-center my-12 mx-auto px-4 md:px-60">
      <div className="flex justify-center items-center gap-8 py-8 flex-row md:flex-row w-full md:w-full">
        {infoArray.map((item) => (
          <CardConcept
            key={item.id}
            icon={item.icon}
            title={item.title}
            text={item.text}
          />
        ))}
      </div>
    </div>
  );
}
