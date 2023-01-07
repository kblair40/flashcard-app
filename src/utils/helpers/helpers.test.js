import {
  getUnixTimestamp,
  convertFromUnix,
  makeDisplayName,
  toTitleCase,
  getCleanDuration,
  isEmailValid,
} from "./helpers";

describe("Date Functions", () => {
  it("Returns current date as a unix timestamp and converts that timestamp to a Date object on request", () => {
    let nowTimestamp = getUnixTimestamp();
    let nowConverted = convertFromUnix(nowTimestamp);

    expect(nowConverted.getDate()).toEqual(new Date().getDate());
    expect(nowConverted.getHours()).toEqual(new Date().getHours());
  });

  it("isgood", () => {
    expect(true).toBeTruthy();
  });
});

describe("makeDisplayName", () => {
  it("Takes a user data object and returns a string with the first name and last name of the user separated by a space", () => {
    let testData = { first_name: "asdf", last_name: "asdf" };
    let fullName = makeDisplayName(testData);
    let nameArray = fullName.split(" ");

    expect(nameArray).toHaveLength(2);
    expect(nameArray[0].length).toBeGreaterThanOrEqual(2);
    expect(nameArray[1].length).toBeGreaterThanOrEqual(2);
    expect(nameArray[0]).toEqual("asdf");
    expect(nameArray[1]).toEqual("asdf");

    testData = { first_name: "muchlonger", last_name: "namelength" };
    fullName = makeDisplayName(testData);
    nameArray = fullName.split(" ");

    expect(nameArray).toHaveLength(1);
    expect(nameArray[0].length).toBeGreaterThanOrEqual(2);
    expect(nameArray[0]).toEqual("muchlonger");
  });

  it("returns only the first name if combined length of first and last name is > 12", () => {
    let testData = { first_name: "muchlonger", last_name: "namelength" };
    let fullName = makeDisplayName(testData);
    let nameArray = fullName.split(" ");

    expect(nameArray).toHaveLength(1);
    expect(nameArray[0].length).toBeGreaterThanOrEqual(2);
    expect(nameArray[0]).toEqual("muchlonger");
  });
});

describe("toTitleCase", () => {
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
});

describe("getCleanDuration", () => {
  it("Only returns values for fields with values > 0", () => {
    let duration1 = { hours: 0, minutes: 4, seconds: 36 };
    let duration2 = { hours: 2, minutes: 0, seconds: 36 };
    let duration3 = { hours: 0, minutes: 19, seconds: 0 };
    let duration4 = { hours: 3, minutes: 4, seconds: 27 };
    expect(getCleanDuration(duration1)).toEqual("4 minutes, 36 seconds");
    expect(getCleanDuration(duration2)).toEqual("2 hours, 36 seconds");
    expect(getCleanDuration(duration3)).toEqual("19 minutes");
    expect(getCleanDuration(duration4)).toEqual(
      "3 hours, 4 minutes, 27 seconds"
    );
  });

  it("Returns singular version of value name if corresponding value === 1", () => {
    let duration1 = { hours: 1, minutes: 1, seconds: 1 };
    let duration2 = { hours: 0, minutes: 1, seconds: 0 };
    let duration3 = { hours: 1, minutes: 0, seconds: 0 };

    expect(getCleanDuration(duration1)).toEqual("1 hour, 1 minute, 1 second");
    expect(getCleanDuration(duration2)).toEqual("1 minute");
    expect(getCleanDuration(duration3)).toEqual("1 hour");
  });

  it("Returns null if all values are 0, or duration arg is falsy", () => {
    expect(getCleanDuration({ hours: 0, minutes: 0, seconds: 0 })).toBeNull();
    expect(getCleanDuration(undefined)).toBeNull();
  });
});

describe("isEmailValid", () => {
  it("Returns true for emails in proper format, and false otherwise", () => {
    expect(isEmailValid("fdsa@fda.com")).toEqual(true);
    expect(isEmailValid("gdsghdsgd@gfsdfasf.gfqjk")).toEqual(true);
    expect(isEmailValid("fdsafda.com")).toEqual(false);
    expect(isEmailValid("fdsa@fda.")).toEqual(false);
    expect(isEmailValid()).toEqual(false);
  });
});

// // Full object...
// const DUMMY_USER_DATA = {
//   _id: "63419b250c1d0369414b5f20",
//   email: "asdf",
//   password: "$2b$10$LSucetdFm122l5LG7KMXWuEv15p9ie.ZkICorMPw4K2O9.nLB8vYC",
//   first_name: "asdf",
//   last_name: "asdf",
//   username: "asdfasdf",
//   avatar_image_url: "",
//   createdAt: "2022-10-08T15:45:41.354Z",
//   updatedAt: "2022-10-17T16:26:39.369Z",
//   __v: 51,
//   favorite_flashcard_sets: [],
// };
