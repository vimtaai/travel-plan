export function insertCharAt(text, char, index) {
  return text.substring(0, index) + char + text.substring(index);
}
