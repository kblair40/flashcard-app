export const getUnixTimestamp = () => {
  return new Date().getTime();
};

export const convertFromUnix = (timestamp) => {
  return new Date(timestamp);
};

export const makeDisplayName = (userData) => {
  if (!userData) return null;
  const { first_name, last_name } = userData;

  return `${first_name} ${last_name}`;
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
  let sep = str.includes("/") ? "/" : " ";
  return str
    .toLowerCase()
    .split(sep)
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(sep);
};

export const isEmailValid = (email) => {
  const emailRegexp = new RegExp(
    /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
  );

  return emailRegexp.test(email);
};
