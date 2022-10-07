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

// export const HamburgerIcon = () => {
//   <svg
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M3 12H21"
//       stroke="black"
//       strokeWidth="2"
//       strokeLinecap="round"
//       stroke-linejoin="round"
//     />
//     <path
//       d="M3 6H21"
//       stroke="black"
//       strokeWidth="2"
//       strokeLinecap="round"
//       stroke-linejoin="round"
//     />
//     <path
//       d="M3 18H21"
//       stroke="black"
//       strokeWidth="2"
//       strokeLinecap="round"
//       stroke-linejoin="round"
//     />
//   </svg>;
// };
