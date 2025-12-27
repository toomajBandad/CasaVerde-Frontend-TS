import { useNavigate } from "react-router";

interface NewsCartProps {
  item: {
    _id: string;
    coverImage?: string;
    title: string;
    subtitle?: string;
    author?: string;
    createdAt: string;
  };
}

export default function NewsCart({ item }: NewsCartProps) {
  const navigate = useNavigate();

  return (
    <div
      className="w-full max-w-96 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg hover:scale-102 cursor-pointer flex flex-col transition"
      onClick={() => navigate(`/news/${item._id}`)}
    >
      {/* Image */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={item.coverImage ?? ""}
          alt="news-cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        {/* Title */}
        <h3 className="font-Gumy text-xl text-darkGray leading-tight">
          {item.title}
        </h3>

        {/* Subtitle */}
        {item.subtitle && (
          <p className="text-gray-500 text-sm leading-snug">{item.subtitle}</p>
        )}

        {/* Author + Date */}
        <div className="text-xs text-gray-500 mt-1">
          {item.author && <span>{item.author} • </span>}
          {new Date(item.createdAt).toLocaleDateString()}
        </div>

        {/* CTA */}
        <div className="mt-3 underline text-Pine hover:text-teal-500">
          Read More
        </div>
      </div>
    </div>
  );
}
