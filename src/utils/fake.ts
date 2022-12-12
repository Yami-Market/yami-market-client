import { faker } from '@faker-js/faker';

import { capitalizeFirstLetter } from './string';

export const randomColor = (upperFirst = true) => {
  if (upperFirst) {
    return capitalizeFirstLetter(faker.color.human());
  }
  return faker.color.human();
};

export const randomWord = (min = 5, max = 8, upperFirst = true) => {
  if (upperFirst) {
    return capitalizeFirstLetter(faker.lorem.word({ length: { min, max } }));
  }
  return faker.lorem.word({ length: { min, max } });
};

export const randomSentence = (count?: number) => {
  return faker.lorem.sentence(count);
};

export const randomParagraph = (min = 3) => {
  return faker.lorem.paragraph(min);
};
