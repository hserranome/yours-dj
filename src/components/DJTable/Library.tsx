import { getYoutubeInfo } from "./utils/getYoutubeInfo";
import { useSessionStore } from "../../store/session";
import { useState } from "react";

function extractVideoId(url: string): string | null {
	const regex =
		/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([A-Za-z0-9_-]{11})/;
	const match = url.match(regex);
	return match ? match[1] : null;
}

export const Library = () => {
	const [urlInput, setUrlInput] = useState("");
	const library = useSessionStore((s) => s.library);
	const addToLibrary = useSessionStore((s) => s.addToLibrary);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleAdd = async () => {
		setError(null);
		const id = extractVideoId(urlInput.trim());
		if (!id) {
			setError("Please enter a valid YouTube URL");
			return;
		}

		try {
			setLoading(true);
			const info = await getYoutubeInfo(urlInput.trim());
			addToLibrary({
				id,
				url: urlInput.trim(),
				title: info.title,
				author: info.author_name,
				thumbnail: info.thumbnail_url,
			});
			setUrlInput("");
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex bg-gray-800 rounded-lg overflow-hidden h-96 mt-8">
			{/* Sidebar */}
			<aside className="w-72 p-4 border-r border-gray-700 flex flex-col">
				<h2 className="text-lg font-semibold mb-4">Library</h2>
				<div className="flex gap-2 mb-4">
					<input
						type="text"
						value={urlInput}
						onChange={(e) => setUrlInput(e.target.value)}
						placeholder="YouTube URL"
						className="flex-1 p-2 rounded bg-gray-900 text-sm focus:outline-none"
					/>
					<button
						type="button"
						onClick={handleAdd}
						disabled={loading}
						className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-sm disabled:opacity-50"
					>
						{loading ? "Add…" : "Add"}
					</button>
				</div>
				{error && <p className="text-red-400 text-sm mb-2">{error}</p>}

				{/* Video list */}
				<div className="flex-1 overflow-y-auto space-y-2">
					{library.map((item) => (
						<button
							key={item.id + item.url}
							className="flex items-center gap-2 bg-gray-900 p-2 rounded cursor-grab active:cursor-grabbing focus:ring-2 focus:ring-indigo-500 outline-none"
							type="button"
							tabIndex={0}
							draggable
							onDragStart={(e) => {
								e.dataTransfer.setData("videoId", item.id);
								e.dataTransfer.effectAllowed = "copy";
							}}
						>
							<img
								src={item.thumbnail}
								alt={item.title}
								className="w-12 h-8 object-cover rounded"
							/>
							<div className="flex-1 min-w-0">
								<p className="text-xs font-medium truncate" title={item.title}>
									{item.title}
								</p>
								<p
									className="text-[10px] text-gray-400 truncate"
									title={item.author}
								>
									{item.author}
								</p>
							</div>
						</button>
					))}
					{library.length === 0 && (
						<p className="text-gray-400 text-sm">No videos added yet.</p>
					)}
				</div>
			</aside>

			{/* Main content (empty for now) */}
			<section className="flex-1"></section>
		</div>
	);
};
