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
