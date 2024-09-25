import { revalidateTag } from "next/cache";

interface FetchHelper {
  tags: string[];
  url: string;
  body?: unknown;
}

export function FetchHelper() {
  const get = async ({ tags, url }: FetchHelper) => {
    const response = await fetch(url, {
      next: {
        tags,
      },
    });
    const data = await response.json();
    return data;
  };

  const post = async ({ url, body, tags }: FetchHelper) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    revalidateTag(tags[0]);

    return data;
  };

  return {
    get,
    post,
  };
}
