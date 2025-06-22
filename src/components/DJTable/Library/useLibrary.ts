import { extractVideoId } from "~/utils/extractVideoId";
import { useSessionStore } from "~/store/session";
import { getYoutubeInfo } from "../utils/getYoutubeInfo";
import { useCallback } from "react";

export const useLibraryAdd = ({
	onError,
	onFinish,
	onSuccess,
}: {
	onError?: (error: string) => void;
	onFinish?: () => void;
	onSuccess?: () => void;
}) => {
	const addToLibrary = useSessionStore((s) => s.addToLibrary);

	const handleAdd = useCallback(
		async (url: string) => {
			const id = extractVideoId(url.trim());
			if (!id) {
				onError?.("Please enter a valid YouTube URL");
				return;
			}

			try {
				const info = await getYoutubeInfo(url.trim());
				addToLibrary({
					id,
					url: url.trim(),
					title: info.title,
					author: info.author_name,
					thumbnail: info.thumbnail_url,
				});
				onSuccess?.();
			} catch (err) {
				onError?.((err as Error).message);
			} finally {
				onFinish?.();
			}
		},
		[addToLibrary, onError, onFinish, onSuccess],
	);

	return handleAdd;
};
