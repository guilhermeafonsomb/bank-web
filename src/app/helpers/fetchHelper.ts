interface FetchHelper {
  url: string;
  body?: unknown;
}

export function FetchHelper() {
  const get = async ({ url }: FetchHelper) => {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw { status: response.status, message: errorData.message };
    }
    return await response.json();
  };

  const post = async ({ url, body }: FetchHelper) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw { status: response.status, message: errorData.message };
    }
    return await response.json();
  };

  const exclude = async ({ url }: FetchHelper) => {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw { status: response.status, message: errorData.message };
    }
    return await response.json();
  };

  const put = async ({ url, body }: FetchHelper) => {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw { status: response.status, message: errorData.message };
    }
    return await response.json();
  };

  return {
    get,
    post,
    exclude,
    put,
  };
}
