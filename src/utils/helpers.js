export const getUnixTimestamp = () => {
  return new Date().getTime();
};

export const convertFromUnix = () => {
  //
};

export const makeDisplayName = (userData) => {
  if (!userData) return null;
  const { first_name, last_name } = userData;

  return `${first_name} ${last_name}`;
};

export const getCleanDuration = (duration) => {
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
