interface GetFetchParameters<T> {
  url: string;
  opts: T;
}

export const http = {
  get: async <T extends { [key in string]: unknown }>({
    url,
    opts,
  }: GetFetchParameters<T>) => {
    opts = {
      headers: {},
      method: "get",
      ...opts,
    };

    const response = await fetch(url, opts);

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body);
    }

    return body;
  },
};
