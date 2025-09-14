import handleError from "@/api/error-handler";
import { fetchHandler } from "@/api/fetch";
import { ValidationError } from "@/api/http-errors";
import { formatSuccessResponse } from "@/api/response";
import { SendLetterSchema } from "@/validation";
import { StatusCodes } from "http-status-codes";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = SendLetterSchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { sender, content } = validatedData.data;

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error(
        "DISCORD_WEBHOOK_URL is not defined in environment variables."
      );
    }

    const userIdToMention = process.env.DISCORD_MENTION_USER_ID;
    const mentionText = userIdToMention ? `<@${userIdToMention}>` : "";

    const payload = {
      content: mentionText,
      embeds: [
        {
          color: 0x0099ff,
          title: "Bạn có một lá thư mới!",
          fields: [
            { name: "Người gửi", value: sender, inline: true },
            { name: "Nội dung", value: content },
          ],
        },
      ],
    };

    await fetchHandler(webhookUrl, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return formatSuccessResponse(StatusCodes.OK, null);
  } catch (error) {
    return handleError(error) as APIErrorResponse;
  }
}
