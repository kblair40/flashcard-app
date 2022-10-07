import { Icon } from "@chakra-ui/react";

export const HamburgerIcon = ({ fill = "black" }) => {
  return (
    <Icon width="24px" height="24px" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12H21"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 6H21"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 18H21"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export const CloseIcon = ({ fill = "black" }) => {
  return (
    <Icon width="24px" height="24px" viewBox="0 0 24 24" fill="none">
      <path
        d="M18 6L6 18"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export const ChevronIcon = ({ fill = "black" }) => {
  return (
    <Icon width="24px" height="24px" viewBox="0 0 24 24" fill="none">
      <path
        d="M17.8817 12.7955L8.77181 21.9054C8.33245 22.3447 7.62014 22.3447 7.18083 21.9054L6.11831 20.8428C5.6797 20.4042 5.67886 19.6934 6.11644 19.2537L13.3362 12L6.11644 4.74634C5.67886 4.3067 5.6797 3.59584 6.11831 3.15723L7.18083 2.09472C7.62019 1.65536 8.3325 1.65536 8.77181 2.09472L17.8816 11.2045C18.321 11.6439 18.321 12.3562 17.8817 12.7955Z"
        fill={fill}
      />
    </Icon>
  );
};
