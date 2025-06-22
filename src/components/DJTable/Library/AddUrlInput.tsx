import { useState } from "react";
import { getYoutubeInfo } from "../utils/getYoutubeInfo";
import { useSessionStore } from "../../../store/session";

function extractVideoId(url: string): string | null {
	const regex =
		/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([A-Za-z0-9_-]{11})/;
	const match = url.match(regex);
	return match ? match[1] : null;
}

interface AddUrlInputProps {
	className?: string;
}

export const AddUrlInput: React.FC<AddUrlInputProps> = ({ className }) => {
	const [urlInput, setUrlInput] = useState("");
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
		<div className={className}>
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
		</div>
	);
};
