const DEFAULT_TITLE_LIMIT = 50;
const DEFAULT_DESCRIPTION_LIMIT = 155;

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function trimAtWordBoundary(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;

  const sliced = value.slice(0, maxLength + 1);
  const lastSpace = sliced.lastIndexOf(" ");

  if (lastSpace > Math.floor(maxLength * 0.6)) {
    return sliced.slice(0, lastSpace).trim().replace(/[,:;!?-]+$/, "");
  }

  return sliced.slice(0, maxLength).trim().replace(/[,:;!?-]+$/, "");
}

export function shortenSeoTitle(value: string, maxLength = DEFAULT_TITLE_LIMIT): string {
  const title = normalizeText(value);
  if (title.length <= maxLength) return title;

  const questionIndex = title.indexOf("? ");
  if (questionIndex > 0) {
    const candidate = title.slice(0, questionIndex + 1).trim();
    if (candidate.length <= maxLength) return candidate;
  }

  for (const separator of [": ", " - ", " – ", " — ", ", "]) {
    const index = title.indexOf(separator);
    if (index > 0) {
      const candidate = title.slice(0, index).trim();
      if (candidate.length >= 24 && candidate.length <= maxLength) return candidate;
    }
  }

  return trimAtWordBoundary(title, maxLength);
}

export function shortenSeoDescription(value: string, maxLength = DEFAULT_DESCRIPTION_LIMIT): string {
  const description = normalizeText(value);
  if (description.length <= maxLength) return description;

  const sentenceEnd = description.lastIndexOf(".", maxLength);
  if (sentenceEnd > Math.floor(maxLength * 0.6)) {
    return description.slice(0, sentenceEnd + 1).trim();
  }

  return `${trimAtWordBoundary(description, maxLength - 1)}…`;
}
