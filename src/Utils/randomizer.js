export const generateRandAlphaNumStr = (size) => {
  let rdmString = "";
  for (let strLeng = size ; rdmString.length < strLeng; rdmString  += Math.random().toString(36).substr(2)){}
  return  rdmString.substr(0, size);
};

export const generateRandNumberFromRange = (min, max) => (Math.floor(Math.random() * (max - min+ 1)) + min);