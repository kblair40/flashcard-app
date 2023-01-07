import {
  getUnixTimestamp,
  convertFromUnix,
  makeDisplayName,
  toTitleCase,
} from "./helpers";

it("Returns current date as a unix timestamp and converts that timestamp to a Date object on request", () => {
  let nowTimestamp = getUnixTimestamp();
  let nowConverted = convertFromUnix(nowTimestamp);

  expect(nowConverted.getDate()).toEqual(new Date().getDate());
  expect(nowConverted.getHours()).toEqual(new Date().getHours());
});

it("Takes a user data object and returns a string with the first name and last name of the user separated by a space", () => {
  let fullName = makeDisplayName(DUMMY_USER_DATA);
  let nameArray = fullName.split(" ");

  expect(nameArray).toHaveLength(2);
  expect(nameArray[0].length).toBeGreaterThanOrEqual(2);
  expect(nameArray[1].length).toBeGreaterThanOrEqual(2);
  expect(nameArray[0]).toEqual("asdf");
  expect(nameArray[1]).toEqual("asdf");
});

it("Converts first character of all words in a string to uppercase, and all other letters to lowercase", () => {
  let singleName1 = "kevIn";
  let singleName2 = "KEVIN";
  let singleName3 = " kevin ";

  expect(toTitleCase(singleName1)).toEqual("Kevin");
  expect(toTitleCase(singleName2)).toEqual("Kevin");
  expect(toTitleCase(singleName3)).toEqual("Kevin");

  let multiName1 = "kevin blair";
  let multiName2 = "kEvIn BlaIR";
  let multiName3 = "KEVIN BLAIR";

  expect(toTitleCase(multiName1)).toEqual("Kevin Blair");
  expect(toTitleCase(multiName2)).toEqual("Kevin Blair");
  expect(toTitleCase(multiName3)).toEqual("Kevin Blair");

  let slashName1 = "kevin/blair ";
  let slashName2 = " keVin /  Blair";
  let slashName3 = " KEVIN / BLAIR";

  expect(toTitleCase(slashName1)).toEqual("Kevin/Blair");
  expect(toTitleCase(slashName2)).toEqual("Kevin/Blair");
  expect(toTitleCase(slashName3)).toEqual("Kevin/Blair");

  let nullName1 = "kevin-";
  let nullName2 = "kevin-blair";
  let nullName3 = "";
  let nullName4 = "  ";
  let nullName5 = "/";

  expect(toTitleCase(nullName1)).toEqual(null);
  expect(toTitleCase(nullName2)).toEqual(null);
  expect(toTitleCase(nullName3)).toEqual(null);
  expect(toTitleCase(nullName4)).toEqual(null);
  expect(toTitleCase(nullName5)).toEqual(null);
});

const DUMMY_USER_DATA = {
  _id: "63419b250c1d0369414b5f20",
  email: "asdf",
  password: "$2b$10$LSucetdFm122l5LG7KMXWuEv15p9ie.ZkICorMPw4K2O9.nLB8vYC",
  first_name: "asdf",
  last_name: "asdf",
  username: "asdfasdf",
  avatar_image_url: "",
  createdAt: "2022-10-08T15:45:41.354Z",
  updatedAt: "2022-10-17T16:26:39.369Z",
  __v: 51,
  favorite_flashcard_sets: [],
};
