import { useEffect, useState } from "react";
import { useParams } from "react-router";
import RelatedNewsItem from "../../components/RelatedNewsItem/RelatedNewsItem";
import EmptyState from "../../components/EmptyState/EmptyState";

interface NewsItem {
  _id: string;
  coverImage?: string;
  title: string;
  subtitle?: string;
  teaser?: string;
  content: string;
  category: string;
  author?: string;
  tags?: string[];
  createdAt: string;
}

export default function News() {
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [news, setNews] = useState<NewsItem | null>(null);
  const [related, setRelated] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch main article
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${apiUrl}/news/${id}`);
        if (res.ok) {
          const data = await res.json();
          setNews(data);
        } else {
          console.log("error");
        }
      } catch (err) {
        console.log("Error loading news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [apiUrl, id]);

  // Fetch related news
  useEffect(() => {
    if (!news) return;

    const fetchRelated = async () => {
      try {
        const res = await fetch(`${apiUrl}/news?category=${news.category}`);
        const data = await res.json();

        const filtered = data.filter((n: NewsItem) => n._id !== news._id);
        setRelated(filtered);
      } catch (err) {
        console.error("Error loading related news:", err);
      }
    };

    fetchRelated();
  }, [news, apiUrl]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <div className="w-full max-w-4xl px-4 animate-pulse flex flex-col gap-8">
          {/* Poster Skeleton */}
          <div className="w-full h-80 md:h-[450px] bg-gray-200 rounded-5xl"></div>

          {/* Text Skeleton */}
          <div className="flex flex-col gap-4">
            <div className="w-24 h-6 bg-gray-200 rounded-md"></div>
            <div className="w-3/4 h-8 bg-gray-200 rounded-md"></div>
            <div className="w-1/2 h-6 bg-gray-200 rounded-md"></div>
            <div className="w-full h-4 bg-gray-200 rounded-md"></div>
            <div className="w-full h-4 bg-gray-200 rounded-md"></div>
            <div className="w-5/6 h-4 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="h-screen">
        <div className="h-20 bg-linear-to-r from-teal-800 via-teal-400 to-teal-300"></div>
        <EmptyState
          title={"News not found."}
          message={"There is no news to show now, please check later!"}
        />
      </div>
    );
  }

  return (
    <>
      <div className="h-20 bg-linear-to-r from-teal-800 via-teal-400 to-teal-300"></div>

      <div className="w-full flex flex-col items-center px-4 md:px-20 py-10">
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-[1fr_280px] gap-10">
          <div className="flex flex-col gap-8">
            {/* Poster */}
            <div className="w-full rounded-5xl overflow-hidden shadow-md">
              <img
                src={news.coverImage ?? "#"}
                alt="news-cover"
                className="w-full h-80 md:h-[450px] object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="flex flex-col gap-6">
              <span className="text-sm bg-Seafoam text-Pine px-3 py-1 rounded-md w-fit font-semibold">
                {news.category}
              </span>

              <h1 className="font-Gumy text-3xl md:text-4xl text-darkGray leading-tight">
                {news.title}
              </h1>

              {news.subtitle && (
                <h2 className="text-gray-600 text-lg md:text-xl leading-snug">
                  {news.subtitle}
                </h2>
              )}

              <div className="text-sm text-gray-500">
                {news.author && <span>{news.author} • </span>}
                {new Date(news.createdAt).toLocaleDateString()}
              </div>

              {news.teaser && (
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  {news.teaser}
                </p>
              )}

              <div className="text-gray-800 text-base md:text-lg leading-relaxed whitespace-pre-line">
                {news.content}
              </div>

              {news.tags && news.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {news.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg text-darkGray">Related News</h3>

            {related.length === 0 && (
              <p className="text-gray-500 text-sm">No related news found.</p>
            )}

            {related.map((item) => (
              <RelatedNewsItem key={item._id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
