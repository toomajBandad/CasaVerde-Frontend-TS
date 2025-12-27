import { useEffect, useState } from "react";
import NewsCart from "../NewsCart/NewsCart";
import NewsCartSkeleton from "../Skeletens/NewsCartSkeleton/NewsCartSkeleton";

interface NewsItem {
  _id: string;
  coverImage?: string;
  title: string;
  subtitle?: string;
  teaser?: string;
  category: string;
  author?: string;
  tags?: string[];
  createdAt: string;
}

export default function NewsBar() {
  const apiUrl: string = import.meta.env.VITE_API_URL;

  const [allNewsCat, setAllNewsCat] = useState<string[]>([]);
  const [newsCategory, setNewsCategory] = useState<string>("");
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const resCat = await fetch(`${apiUrl}/news/categories`);
        const categories: string[] = await resCat.json();
        setAllNewsCat(categories);
        if (categories.length > 0) setNewsCategory(categories[0]);

        const resNews = await fetch(`${apiUrl}/news`);
        const news: NewsItem[] = await resNews.json();
        setAllNews(news);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const filteredNews = allNews.filter((item) => item.category === newsCategory);

  return (
    <div className="flex flex-col justify-center items-start m-0 p-0 h-auto md:mx-20 md:py-8">
      <h2 className="mainTitle">Casa Verde / News</h2>
      <p className="mainsubtitle">
        Helpful guides and practical advice for buying or renting your dream
        house abroad.
      </p>

      {/* Category Tabs */}
      <div className="w-full flex items-center border-b border-neutral-400 text-center text-base font-normal m-0 gap-0 md:text-lg md:font-bold md:my-4 md:mb-8">
        {allNewsCat.map((cat) => (
          <span
            key={cat}
            className={`cursor-pointer rounded-t-md p-2 md:px-4 md:py-2 transition-all
              ${
                cat === newsCategory
                  ? "border-b-2 border-Pine text-Lemon bg-Pine"
                  : "text-gray-500 hover:text-Pine hover:bg-Seafoam"
              }`}
            onClick={() => setNewsCategory(cat)}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* News Cards */}
      <div className="flex justify-center items-center w-full flex-col gap-6 md:flex-row md:flex-wrap md:gap-8">
        {loading ? (
          <>
            {[...Array(3)].map((_, i) => (
              <NewsCartSkeleton key={i} />
            ))}
          </>
        ) : filteredNews.length > 0 ? (
          filteredNews.map((item) => <NewsCart key={item._id} item={item} />)
        ) : (
          <p className="text-gray-500 py-10">
            No news available in this category.
          </p>
        )}
      </div>
    </div>
  );
}
