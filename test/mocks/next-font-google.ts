type FontOptions = { variable?: string };

function makeFont(options?: FontOptions) {
  return { className: "", variable: options?.variable ?? "" };
}

export const Inter_Tight = makeFont;
export const Inter = makeFont;
