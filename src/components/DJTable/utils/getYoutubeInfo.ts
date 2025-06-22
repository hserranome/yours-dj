export interface YoutubeInfo {
  title: string;
  author_name: string;
  thumbnail_url: string;
}

/**
 * Fetch YouTube video information (title, author, thumbnail) using the public
 * oEmbed endpoint. No API key required.
 *
 * @param url Full YouTube video URL
 * @throws Error if the request fails or the URL is invalid/not a YouTube link
 */
export async function getYoutubeInfo(url: string): Promise<YoutubeInfo> {
  const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error("Failed to retrieve YouTube data");
  }
  const data = (await res.json()) as YoutubeInfo;
  return data;
}
