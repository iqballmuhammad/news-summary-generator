export const DEFAULT_PROMPT = `Generate a 150-200 words summary for each of these article: {{url}}. The urls are delimited by comma. Citate or mention the source, use the media source name as text and linked it with the news URL. Separate the summary from different URL with bullet points.`;
export const BULK_PROMPT = `
Generate a brief and concise summary from the following data:

{{data}}

This data is an array of message request. Generate summary in paragraph forms for each entries from "content". Categorize the summary from entry's category, and group each entry with same category within the same section separated by bullet points. Citate media source name and linked it with the source url within each paragraph.
`