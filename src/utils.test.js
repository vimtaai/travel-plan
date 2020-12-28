import { insertCharAt } from "./utils";

test("Insert to middle", () => {
  expect(insertCharAt("abc", "z", 1)).toBe("azbc");
});

test("Insert to end", () => {
  expect(insertCharAt("abc", "z", 3)).toBe("abcz");
});

test("Insert to start", () => {
  expect(insertCharAt("abc", "z", 0)).toBe("zabc");
});

test("Insert after end", () => {
  expect(insertCharAt("abc", "z", 5)).toBe("abcz");
});

test("Insert before start", () => {
  expect(insertCharAt("abc", "z", -1)).toBe("zabc");
});
