import { useEffect, useState } from "react";
import NewsCart from "../NewsCart/NewsCart";

interface NewsItem {
  _id: string;
  coverImage: string;
  mainTitle: string;
  category: string;
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
            className={`cursor-pointer rounded-t-md p-2 md:px-4 md:py-2
              ${
                cat === newsCategory
                  ? "border-b-2 border-Pine text-Lemon bg-Pine"
                  : "text-gray-500"
              }`}
            onClick={() => setNewsCategory(cat)}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* News Cards */}
      <div className="flex justify-center items-center w-full flex-col gap-0 md:flex-row md:gap-8">
        {loading ? (
          // Skeleton loader UI
          <>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse flex flex-col items-center w-64 h-72 bg-gray-200 rounded-lg p-4"
              >
                <div className="w-full h-40 bg-gray-300 rounded-md mb-4"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
              </div>
            ))}
          </>
        ) : (
          allNews
            .filter((item) => item.category === newsCategory)
            .map((item) => (
              <NewsCart
                key={item._id}
                img={item.coverImage}
                text={item.mainTitle}
                link={`/news/${item._id}`}
              />
            ))
        )}
      </div>
    </div>
  );
}
