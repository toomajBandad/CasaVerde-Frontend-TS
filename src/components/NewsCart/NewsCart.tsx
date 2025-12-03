import { useNavigate } from "react-router";

interface NewsCartProps {
  img?: string | null;
  text: string;
  link: string;
}

export default function NewsCart({ img, text, link }: NewsCartProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-around items-start w-96 border border-gray-400">
      <img src={img ?? ""} className="w-full" alt="cart-img" />
      <div className="font-bold p-4 flex flex-col gap-4">
        <div className="text-gray-500">{text}</div>
        <div
          className="text-(--Pine-Green) underline hover:cursor-pointer hover:[text-shadow:1px_1px_1px_var(--Mint-Green)]"
          onClick={() => navigate(link)}
        >
          Read More
        </div>
      </div>
    </div>
  );
}
