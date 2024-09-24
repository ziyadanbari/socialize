import { Attachment, IAttachment } from "@/types";
import { FastAverageColor } from "fast-average-color";
const fac = new FastAverageColor();

export async function prepareAttachments(
  attachments: Attachment[]
): Promise<IAttachment[]> {
  return attachments
    ? await Promise.all(
        attachments.map(async (attachment) => {
          let backgroundColor = "black";
          try {
            backgroundColor = (
              await fac.getColorAsync(attachment?.attachmentLink)
            ).rgba;
          } catch (error) {}
          return {
            ...attachment,
            backgroundColor: backgroundColor,
            file: attachment?.attachmentLink,
          };
        })
      )
    : [];
}
