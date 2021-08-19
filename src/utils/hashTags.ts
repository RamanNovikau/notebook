const hashTagrule = /#(\w+)\b/gi;
const plainRule = /(<([^>]+)>)/gi;

export const handleHashTags = (text: string): string[] => {
  const matches = text.match(hashTagrule);

  if (!matches) {
    return [] as string[];
  }

  const tags = matches.map((part) => {
    return part;
  });

  const uniqueTags = Array.from(new Set(tags));

  return uniqueTags;
};

export const plainHashTags = (text: string) => {
  return text.replace(plainRule, '');
};

export const highlightHashTag = (text: string) => {
  return text.replace(
    hashTagrule,
    '<span style="background-color:rgb(255, 230, 202);border: 1px solid rgb(247, 182, 107);padding:1px;">#$1</span>'
  );
};
