import { Icon } from "@chakra-ui/react";

export const HamburgerIcon = ({ fill = "black", boxSize = "24px" }) => {
  return (
    <Icon boxSize={boxSize} viewBox="0 0 24 24" fill="none">
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

export const CloseIcon = ({ fill = "black", boxSize = "24px" }) => {
  return (
    <Icon boxSize={boxSize} viewBox="0 0 24 24" fill="none">
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

export const ChevronIcon = ({ fill = "black", boxSize = "24px", ...props }) => {
  return (
    <Icon boxSize={boxSize} viewBox="0 0 24 24" fill={fill} {...props}>
      <path d="M17.8817 12.7955L8.77181 21.9054C8.33245 22.3447 7.62014 22.3447 7.18083 21.9054L6.11831 20.8428C5.6797 20.4042 5.67886 19.6934 6.11644 19.2537L13.3362 12L6.11644 4.74634C5.67886 4.3067 5.6797 3.59584 6.11831 3.15723L7.18083 2.09472C7.62019 1.65536 8.3325 1.65536 8.77181 2.09472L17.8816 11.2045C18.321 11.6439 18.321 12.3562 17.8817 12.7955Z" />
    </Icon>
  );
};

export const VisibleIcon = ({ fill = "black", boxSize = "24px" }) => {
  return (
    <Icon boxSize={boxSize} viewBox="0 0 24 24" fill="none">
      <path
        d="M23.855 11.3917C21.5954 6.98292 17.1221 4 12 4C6.87792 4 2.40334 6.985 0.145008 11.3921C0.0496919 11.5806 3.05176e-05 11.7889 3.05176e-05 12.0002C3.05176e-05 12.2115 0.0496919 12.4198 0.145008 12.6083C2.40459 17.0171 6.87792 20 12 20C17.1221 20 21.5967 17.015 23.855 12.6079C23.9503 12.4194 24 12.2111 24 11.9998C24 11.7885 23.9503 11.5802 23.855 11.3917V11.3917ZM12 18C10.8133 18 9.65328 17.6481 8.66659 16.9888C7.67989 16.3295 6.91086 15.3925 6.45673 14.2961C6.0026 13.1997 5.88378 11.9933 6.1153 10.8295C6.34681 9.66557 6.91825 8.59647 7.75737 7.75736C8.59648 6.91824 9.66558 6.3468 10.8295 6.11529C11.9934 5.88378 13.1998 6.0026 14.2961 6.45672C15.3925 6.91085 16.3295 7.67988 16.9888 8.66658C17.6481 9.65327 18 10.8133 18 12C18.0004 12.788 17.8455 13.5684 17.5441 14.2966C17.2427 15.0247 16.8007 15.6863 16.2435 16.2435C15.6863 16.8007 15.0247 17.2427 14.2966 17.5441C13.5684 17.8455 12.788 18.0004 12 18V18ZM12 8C11.643 8.00499 11.2883 8.05811 10.9454 8.15792C11.228 8.54195 11.3636 9.01454 11.3277 9.48998C11.2917 9.96542 11.0865 10.4122 10.7494 10.7494C10.4122 11.0865 9.96543 11.2917 9.48998 11.3276C9.01454 11.3636 8.54196 11.228 8.15792 10.9454C7.93924 11.7511 7.97872 12.605 8.27079 13.3871C8.56287 14.1691 9.09283 14.8399 9.7861 15.305C10.4794 15.7701 11.301 16.006 12.1354 15.9797C12.9698 15.9533 13.7749 15.666 14.4375 15.158C15.1 14.6501 15.5866 13.9473 15.8287 13.1483C16.0708 12.3494 16.0563 11.4947 15.7872 10.7044C15.5181 9.91415 15.008 9.22818 14.3286 8.74305C13.6492 8.25791 12.8348 7.99803 12 8V8Z"
        fill={fill}
      />
    </Icon>
  );
};

export const NotVisibleIcon = ({ fill = "black", boxSize = "24px" }) => {
  return (
    <Icon boxSize={boxSize} viewBox="0 0 24 24" fill="none">
      <g clipPath="url(#clip0_5_14)">
        <path
          d="M12 17.4C9.15563 17.4 6.85314 15.1984 6.64126 12.4084L2.70751 9.36825C2.19039 10.017 1.71451 10.7029 1.33051 11.4529C1.24473 11.6226 1.20003 11.81 1.20003 12.0002C1.20003 12.1903 1.24473 12.3778 1.33051 12.5475C3.36414 16.5154 7.39013 19.2 12 19.2C13.0091 19.2 13.9826 19.05 14.9209 18.8078L12.975 17.3021C12.6536 17.3642 12.3273 17.397 12 17.4ZM23.7683 19.5788L19.6226 16.3748C20.8819 15.3135 21.9177 14.0124 22.6695 12.5471C22.7553 12.3774 22.8 12.19 22.8 11.9998C22.8 11.8097 22.7553 11.6222 22.6695 11.4525C20.6359 7.48463 16.6099 4.8 12 4.8C10.0693 4.80234 8.16999 5.28839 6.47551 6.21375L1.70476 2.52638C1.64255 2.47797 1.57141 2.44229 1.4954 2.42139C1.4194 2.40048 1.34002 2.39476 1.2618 2.40454C1.18358 2.41433 1.10806 2.43943 1.03955 2.47842C0.971036 2.5174 0.910878 2.56951 0.86251 2.63175L0.126385 3.57938C0.0287349 3.70499 -0.0150217 3.86426 0.00473934 4.02213C0.0245004 4.18001 0.106161 4.32358 0.23176 4.42125L22.2953 21.4736C22.3575 21.522 22.4286 21.5577 22.5046 21.5786C22.5806 21.5995 22.66 21.6052 22.7382 21.5955C22.8164 21.5857 22.892 21.5606 22.9605 21.5216C23.029 21.4826 23.0891 21.4305 23.1375 21.3683L23.874 20.4206C23.9716 20.295 24.0153 20.1357 23.9955 19.9778C23.9757 19.8199 23.8939 19.6764 23.7683 19.5788ZM16.8788 14.2538L15.405 13.1145C15.5291 12.7558 15.595 12.3795 15.6 12C15.6073 11.4443 15.4842 10.8947 15.2406 10.3953C14.997 9.89583 14.6396 9.46049 14.1972 9.12421C13.7548 8.78793 13.2397 8.56009 12.6933 8.459C12.1468 8.35791 11.5843 8.38638 11.0509 8.54213C11.277 8.84854 11.3993 9.21918 11.4 9.6C11.3944 9.72673 11.3751 9.85247 11.3423 9.975L8.58189 7.84163C9.54075 7.04033 10.7504 6.60092 12 6.6C12.7093 6.59961 13.4116 6.73901 14.067 7.01025C14.7223 7.28148 15.3178 7.67923 15.8193 8.18074C16.3208 8.68226 16.7185 9.27771 16.9898 9.93304C17.261 10.5884 17.4004 11.2908 17.4 12C17.4 12.8111 17.2016 13.5671 16.8788 14.2541V14.2538Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_5_14">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </Icon>
  );
};

export const SettingsIcon = ({ fill = "black", boxSize = "24px" }) => {
  return (
    <Icon boxSize={boxSize} viewBox="0 0 24 24" fill={fill}>
      <g clipPath="url(#clip0_12_8)">
        <path d="M22.8469 14.7984L20.85 13.6453C21.0516 12.5578 21.0516 11.4422 20.85 10.3547L22.8469 9.20156C23.0766 9.07031 23.1797 8.79843 23.1047 8.54531C22.5844 6.87656 21.6984 5.36718 20.5406 4.11093C20.3625 3.91874 20.0719 3.87187 19.8469 4.00312L17.85 5.15624C17.0109 4.43437 16.0453 3.87656 15 3.51093V1.20937C15 0.94687 14.8172 0.717183 14.5594 0.660933C12.8391 0.276558 11.0766 0.295308 9.44062 0.660933C9.18281 0.717183 9 0.94687 9 1.20937V3.51562C7.95938 3.88593 6.99375 4.44374 6.15 5.16093L4.15781 4.00781C3.92812 3.87656 3.64219 3.91875 3.46406 4.11562C2.30625 5.36718 1.42031 6.87656 0.9 8.54999C0.820312 8.80312 0.928125 9.07499 1.15781 9.20624L3.15469 10.3594C2.95313 11.4469 2.95313 12.5625 3.15469 13.65L1.15781 14.8031C0.928125 14.9344 0.825 15.2062 0.9 15.4594C1.42031 17.1281 2.30625 18.6375 3.46406 19.8937C3.64219 20.0859 3.93281 20.1328 4.15781 20.0016L6.15469 18.8484C6.99375 19.5703 7.95938 20.1281 9.00469 20.4937V22.8C9.00469 23.0625 9.1875 23.2922 9.44531 23.3484C11.1656 23.7328 12.9281 23.7141 14.5641 23.3484C14.8219 23.2922 15.0047 23.0625 15.0047 22.8V20.4937C16.0453 20.1234 17.0109 19.5656 17.8547 18.8484L19.8516 20.0016C20.0812 20.1328 20.3672 20.0906 20.5453 19.8937C21.7031 18.6422 22.5891 17.1328 23.1094 15.4594C23.1797 15.2016 23.0766 14.9297 22.8469 14.7984V14.7984ZM12 15.75C9.93281 15.75 8.25 14.0672 8.25 12C8.25 9.93281 9.93281 8.24999 12 8.24999C14.0672 8.24999 15.75 9.93281 15.75 12C15.75 14.0672 14.0672 15.75 12 15.75Z" />
      </g>
      <defs>
        <clipPath id="clip0_12_8">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </Icon>
  );
};
