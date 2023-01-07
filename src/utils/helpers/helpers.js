export const getUnixTimestamp = () => {
  return new Date().getTime();
};

export const convertFromUnix = (timestamp) => {
  return new Date(timestamp);
};

export const makeDisplayName = (userData) => {
  if (!userData) return null;
  const { first_name, last_name } = userData;
  const totalLength = first_name.length + last_name.length;

  return totalLength <= 12 ? `${first_name} ${last_name}` : `${first_name}`;
};

export const getCleanDuration = (duration) => {
  if (!duration) return null;

  const { hours, minutes, seconds } = duration;

  let res;
  if (hours) {
    res = `${hours} hours`;
    if (minutes) res += `, ${minutes} minutes`;
    if (seconds) res += `, ${seconds} seconds`;
  } else if (minutes) {
    res = `${minutes} minutes`;
    if (seconds) res += `, ${seconds} seconds`;
  } else if (seconds) {
    res = `${seconds} seconds`;
  } else {
    return null;
  }

  return res;
};

export const toTitleCase = (str) => {
  str = str.trim();
  // only building this to handle inputs with letters, forward slashes and whitespace.
  // return null if input includes any other characters
  let validateInput = /^[a-zA-Z /]+$/;
  if (!validateInput.test(str)) return null;

  // sep will be used to split here, and join at the end
  let sep = str.includes("/") ? "/" : " ";
  let splitStr = str
    .toLowerCase()
    .split(sep)
    .map((word) => word.trim());

  let res = "";
  if (splitStr.length > 1) {
    res = splitStr
      .map(function (word) {
        return word[0].toUpperCase() + word.slice(1);
      })
      .join(sep);
  } else {
    let word = splitStr[0];
    res = word[0].toUpperCase() + word.slice(1);
  }

  console.log("output:", res);
  return res;
};

export const isEmailValid = (email) => {
  const emailRegexp = new RegExp(
    /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
  );

  return emailRegexp.test(email);
};
