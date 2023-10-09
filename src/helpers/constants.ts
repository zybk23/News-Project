export const baseApiUrl = "https://newsapi.org/v2";
export const apiKey = "499efd9767c54b0cbf568d0e6ce37ae5";

export const INTERSECTION_THRESHOLD = 5;
export const LOAD_DELAY_MS = 100;

export const makeCapitalizeFirstLetter = (arr: any) => {
  const capitalizedArr: any = [];

  arr.forEach((x: any) => {
    const firstLetter = x.charAt(0);

    const firstLetterCap = firstLetter.toUpperCase();

    const remainingLetters = x.slice(1);

    const capitalizedWord = firstLetterCap + remainingLetters;
    capitalizedArr.push(capitalizedWord);
  });
  return capitalizedArr;
};
