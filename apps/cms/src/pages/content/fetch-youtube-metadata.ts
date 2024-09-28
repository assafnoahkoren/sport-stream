type YoutubeMetadata = {
  title: string;
  author_name: string;
  author_url: string;
  type: string;
  height: number;
  width: number;
  version: string;
  provider_name: string;
  provider_url: string;
  thumbnail_height: number;
  thumbnail_width: number;
  thumbnail_url: string;
  html: string;
};

export const fetchYoutubeMetadata = async (videoUrl: string): Promise<YoutubeMetadata | null> => {
  if (!videoUrl.includes('youtube.com')) { return null; }

  const response = await fetch(`https://youtube.com/oembed?url=${videoUrl}&format=json`);
  const data: YoutubeMetadata = await response.json();
  return data;
};