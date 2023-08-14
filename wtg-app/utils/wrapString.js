
export default wrapString = (string, maxlen=8, postfix="...") => {
  if (string.length > maxlen) {
    string = string.substring(0, maxlen) + postfix;
  }
  return string;
}