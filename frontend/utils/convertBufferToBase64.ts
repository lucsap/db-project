export const convertBufferToBase64 = (buffer: string) => {
  const base64String = Buffer.from(buffer).toString("base64");
  const url = `data:image/png;base64,${base64String}`;
  return url;
}

