export const matchVariables = (string) => string.match(/\{([^}]+)\}/g);

export const matchVariableName = (string) => {
  const match = string.match(/[^{}]+(?=\})/);

  if (!match) {
    return null;
  }

  return match[0];
};

export const includesTokenToEval = (string) => string.match(/.+?(?=\()/);
