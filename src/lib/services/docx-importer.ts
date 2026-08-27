import mammoth from "mammoth";

export async function convertDocxToHtml(buffer: Buffer): Promise<{
  html: string;
  messages: string[];
}> {
  try {
    const result = await mammoth.convertToHtml(
      { buffer },
      {
        styleMap: [
          "p[style-name='Heading 1'] => h2:fresh",
          "p[style-name='Heading 2'] => h3:fresh",
          "p[style-name='Heading 3'] => h4:fresh",
          "p[style-name='Quote'] => blockquote:fresh",
          "p[style-name='Intense Quote'] => blockquote:fresh",
        ],
      }
    );

    // Clean and sanitize HTML for TipTap
    let cleanedHtml = result.value;
    // Ensure the first paragraph has drop-cap if wanted
    if (cleanedHtml && !cleanedHtml.startsWith("<p class=")) {
      cleanedHtml = cleanedHtml.replace(/^<p>/, '<p class="drop-cap">');
    }

    return {
      html: cleanedHtml,
      messages: result.messages.map((m) => m.message),
    };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Docx conversion error:", msg);
    throw new Error(`Failed to convert .docx file: ${msg}`);
  }
}
