import { NextResponse } from "next/server";

export function formatSuccessResponse<T = null>(
  status: number,
  data: T
): APIResponse<T> {
  const responseContent = {
    success: true,
    data,
  };

  return NextResponse.json(responseContent, { status });
}

export const formatErrorResponse = (
  status: number,
  message: string,
  error?: Record<string, string[]>
): APIResponse => {
  const responseContent = {
    success: false,
    error: {
      message,
      details: error,
    },
  };

  return NextResponse.json(responseContent, { status });
};
