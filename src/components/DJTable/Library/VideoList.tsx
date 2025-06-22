import { useSessionStore } from "../../../store/session";

export const VideoList: React.FC = () => {
	const library = useSessionStore((s) => s.library);
	const removeFromLibrary = useSessionStore((s) => s.removeFromLibrary);

	if (library.length === 0) {
		return <p className="text-gray-400 text-sm">No videos added yet.</p>;
	}

	return (
		<div className="flex-1 overflow-y-auto space-y-2">
			{library.map((item) => (
				// biome-ignore lint/a11y/noStaticElementInteractions: <TODO: fix later>
				<div
					key={item.id + item.url}
					className="group flex items-center gap-2 bg-gray-900 p-2 rounded cursor-grab active:cursor-grabbing focus:ring-2 focus:ring-indigo-500 outline-none"
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
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							removeFromLibrary(item.id);
						}}
						className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-400 focus:text-red-400"
						aria-label="Remove video"
					>
						<span className="font-bold">×</span>
					</button>
				</div>
			))}
		</div>
	);
};
