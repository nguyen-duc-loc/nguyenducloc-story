import { StatusCodes } from "http-status-codes";

interface FetchOptions extends RequestInit {
  timeout?: number;
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ActionResponse<T>> {
  const {
    timeout = 50000,
    headers: customHeaders = {},
    ...restOptions
  } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const headers: HeadersInit = { ...defaultHeaders, ...customHeaders };
  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  const response = await fetch(url, config);

  clearTimeout(id);

  if (response.status === StatusCodes.NO_CONTENT) {
    return { success: true, statusCode: response.status };
  }

  return await response.json();
}
