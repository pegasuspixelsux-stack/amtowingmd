type FontOptions = { variable?: string };

function makeFont(options?: FontOptions) {
  return { className: "", variable: options?.variable ?? "" };
}

export const Barlow_Condensed = makeFont;
export const Inter = makeFont;
