import { useNavigate } from "react-router";

interface RelatedNewsItemProps {
  item: {
    _id: string;
    coverImage?: string;
    title: string;
    createdAt: string;
  };
}

export default function RelatedNewsItem({ item }: RelatedNewsItemProps) {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer flex gap-3 items-start hover:opacity-80"
      onClick={() => navigate(`/news/${item._id}`)}
    >
      <img
        src={item.coverImage}
        className="w-20 h-16 object-cover rounded-md"
      />

      <div className="flex flex-col">
        <span className="text-sm font-semibold text-darkGray line-clamp-2">
          {item.title}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
