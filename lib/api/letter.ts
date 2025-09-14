"use server";

import { fetchHandler } from "@/api/fetch";
import { SendLetterData } from "@/validation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const sendLetter = async (data: SendLetterData) => {
  const response = await fetchHandler(`${API_BASE_URL}/letter`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response;
};
