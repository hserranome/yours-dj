export function extractVideoId(url: string): string | null {
	const regex =
		/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([A-Za-z0-9_-]{11})/;
	const match = url.match(regex);
	return match ? match[1] : null;
}