
export default wrapString = (string, maxlen=8) => {
  if (string.length > maxlen) {
    string = string.substring(0, maxlen) + "...";
  }
  return string;
}