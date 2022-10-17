import { getUnixTimestamp, convertFromUnix } from "./helpers";

it("Returns current date as a unix timestamp and converts that timestamp to a Date object on request", () => {
  let nowTimestamp = getUnixTimestamp();
  let nowConverted = convertFromUnix(nowTimestamp);

  expect(nowConverted.getDate()).toEqual(new Date().getDate());
  expect(nowConverted.getHours()).toEqual(new Date().getHours());
});
