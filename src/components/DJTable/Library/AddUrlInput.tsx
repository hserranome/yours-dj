import { useState } from "react";
import { useLibraryAdd } from "./useLibrary";

interface AddUrlInputProps {
	className?: string;
}

export const AddUrlInput: React.FC<AddUrlInputProps> = ({ className }) => {
	const [urlInput, setUrlInput] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handler = useLibraryAdd({
		onError: (message) => setError(message),
		onFinish: () => setLoading(false),
		onSuccess: () => {
			setUrlInput("");
		},
	});

	const handleAdd = async () => {
		setError(null);
		handler(urlInput);
		setLoading(false);
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
