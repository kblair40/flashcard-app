export const getUnixTimestamp = () => {
  return new Date().getTime();
};

export const convertFromUnix = (timestamp) => {
  return new Date(timestamp);
};

export const makeDisplayName = (userData) => {
  if (!userData) return null;

  const { first_name, last_name } = userData;
  if (!first_name) {
    // first name is required.  return null if not provided
    return null;
  }

  const totalLength = first_name.length + last_name.length;

  // return full name if total length <= 12, else just first name
  return totalLength <= 12 ? `${first_name} ${last_name}` : `${first_name}`;
};

export const getCleanDuration = (duration) => {
  if (!duration) return null;

  const { hours, minutes, seconds } = duration;
  // make sure all values exist, even if they are 0
  if (![hours, minutes, seconds].every((val) => val !== undefined)) {
    return null;
  }

  let res;
  if (hours) {
    res = `${hours} ${hours > 1 ? "hours" : "hour"}`;
    if (minutes) res += `, ${minutes} ${minutes > 1 ? "minutes" : "minute"}`;
    if (seconds) res += `, ${seconds} ${seconds > 1 ? "seconds" : "second"}`;
  } else if (minutes) {
    res = `${minutes} ${minutes > 1 ? "minutes" : "minute"}`;
    if (seconds) res += `, ${seconds} ${seconds > 1 ? "seconds" : "second"}`;
  } else if (seconds) {
    res = `${seconds} ${seconds > 1 ? "seconds" : "second"}`;
  } else {
    return null;
  }

  return res;
};

export const toTitleCase = (str) => {
  // should only handle inputs with letters, forward slashes and whitespace.
  // return null if input includes any other characters
  str = str.trim();
  let validateInput = /^[a-zA-Z /]+$/;
  if (
    !validateInput.test(str) ||
    str[0].toUpperCase() === str[0].toLowerCase()
  ) {
    return null;
  }

  // sep will be used to split here, and join at the end
  let sep = str.includes("/") ? "/" : " ";
  let splitStr = str
    .toLowerCase()
    .split(sep)
    .map((word) => word.trim());

  let res = "";
  res = splitStr
    .map(function (word) {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(sep);

  return res;
};

export const isEmailValid = (email) => {
  const emailRegexp = new RegExp(
    /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
  );

  return emailRegexp.test(email);
};
