import { useEffect, useState } from "react";
import * as ytSearch from "youtube-search-api";

interface SearchResult {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
}

export const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => {
      (async () => {
        try {
          setLoading(true);
          const data = await ytSearch.GetListByKeyword(query, false, 10);
          const mapped: SearchResult[] = (data.items ?? []).map((item: any) => ({
            id: item.id,
            title: item.title,
            author: item.channelTitle,
            thumbnail: item.thumbnail.thumbnails?.[0]?.url ?? "",
          }));
          setResults(mapped);
        } catch (err) {
          if (err instanceof DOMException && err.name === "AbortError") return;
          console.error(err);
        } finally {
          setLoading(false);
        }
      })();
    }, 500); // debounce

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search on YouTube"
        className="p-2 rounded bg-gray-900 text-sm focus:outline-none"
      />
      {loading && <p className="text-gray-400 text-sm">Searching…</p>}
      <div className="flex-1 overflow-y-auto space-y-2">
        {results.map((item) => (
          <div key={item.id} className="flex items-center gap-2 bg-gray-900 p-2 rounded">
            <img src={item.thumbnail} alt={item.title} className="w-12 h-8 object-cover rounded" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate" title={item.title}>
                {item.title}
              </p>
              <p className="text-[10px] text-gray-400 truncate" title={item.author}>
                {item.author}
              </p>
            </div>
          </div>
        ))}
        {!loading && query && results.length === 0 && (
          <p className="text-gray-400 text-sm">No results</p>
        )}
      </div>
    </div>
  );
};
