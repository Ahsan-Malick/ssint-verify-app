export async function imageUrlToBase64(url: string|undefined): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url??"";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL("image/png");
      resolve(dataUrl); // ✅ This is the base64 string
    };

    img.onerror = reject;
  });
}