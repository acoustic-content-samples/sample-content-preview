import slugify from 'slugify';
import isAbsoluteUrl from 'is-absolute-url';
import get from 'lodash.get';
import {
  matchVariables,
  matchVariableName,
  includesTokenToEval,
} from './regexp';

global.slugify = slugify;

const extractVariableName = (variable) => {
  return matchVariableName(variable).split('.').slice(1).join('.');
};

const getContentByKey = (content, key) => {
  const value = get(content, key);

  if (!value) {
    throw new Error(`Variable ${key} is not suported`);
  }

  return value;
};

const ingoreLeadingSlash = (string) => {
  if (string[0] === '/') {
    return string.slice(1);
  }

  return string;
};

export const getPreviewUrl = ({ config, content, previewResourceUrl = '' }) => {
  const { url } = config;
  const parsedUrl = ingoreLeadingSlash(url);
  const variables = matchVariables(parsedUrl);

  let constructedUrl = parsedUrl;

  if (variables) {
    variables.forEach((variable) => {
      let value;
      if (includesTokenToEval(variable)) {
        const token = variable.slice(1, -1);
        value = eval(token);
      } else {
        const key = extractVariableName(variable);
        value = getContentByKey(content, key);
      }

      constructedUrl = constructedUrl.replace(variable, value);
    });
  }

  if (isAbsoluteUrl(url)) {
    return constructedUrl;
  }

  return previewResourceUrl + constructedUrl;
};
