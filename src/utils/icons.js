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

export const EditIcon = ({ fill = "black", boxSize = "24px" }) => {
  return (
    <Icon boxSize={boxSize} viewBox="0 0 24 24" fill={fill}>
      <g clipPath="url(#clip0_13_10)">
        <path d="M17.3001 5.03095L21.0584 8.78928C21.2167 8.94762 21.2167 9.20595 21.0584 9.36428L11.9584 18.4643L8.09173 18.8934C7.57506 18.9518 7.13756 18.5143 7.19589 17.9976L7.62506 14.131L16.7251 5.03095C16.8834 4.87262 17.1417 4.87262 17.3001 5.03095ZM24.0501 4.07678L22.0167 2.04345C21.3834 1.41012 20.3542 1.41012 19.7167 2.04345L18.2417 3.51845C18.0834 3.67678 18.0834 3.93512 18.2417 4.09345L22.0001 7.85178C22.1584 8.01012 22.4167 8.01012 22.5751 7.85178L24.0501 6.37678C24.6834 5.73928 24.6834 4.71012 24.0501 4.07678V4.07678ZM16.5251 15.9893V20.2309H3.19173V6.89762H12.7667C12.9001 6.89762 13.0251 6.84345 13.1209 6.75178L14.7876 5.08512C15.1042 4.76845 14.8792 4.23095 14.4334 4.23095H2.52506C1.42089 4.23095 0.525059 5.12678 0.525059 6.23095V20.8976C0.525059 22.0018 1.42089 22.8976 2.52506 22.8976H17.1917C18.2959 22.8976 19.1917 22.0018 19.1917 20.8976V14.3226C19.1917 13.8768 18.6542 13.656 18.3376 13.9685L16.6709 15.6351C16.5792 15.731 16.5251 15.856 16.5251 15.9893Z" />
      </g>
      <defs>
        <clipPath id="clip0_13_10">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.525059 0.230957)"
          />
        </clipPath>
      </defs>
    </Icon>
  );
};

export const SunIcon = ({ fill = "black", boxSize = "24px" }) => {
  return (
    <Icon boxSize={boxSize} viewBox="0 0 24 24" fill={fill}>
      <g clipPath="url(#clip0_14_2)">
        <path d="M12 7.5C9.52031 7.5 7.5 9.52031 7.5 12C7.5 14.4797 9.52031 16.5 12 16.5C14.4797 16.5 16.5 14.4797 16.5 12C16.5 9.52031 14.4797 7.5 12 7.5ZM23.55 11.2734L19.1109 9.05625L20.6812 4.35C20.8922 3.7125 20.2875 3.10781 19.6547 3.32344L14.9484 4.89375L12.7266 0.45C12.4266 -0.15 11.5734 -0.15 11.2734 0.45L9.05625 4.88906L4.34531 3.31875C3.70781 3.10781 3.10312 3.7125 3.31875 4.34531L4.88906 9.05156L0.45 11.2734C-0.15 11.5734 -0.15 12.4266 0.45 12.7266L4.88906 14.9437L3.31875 19.6547C3.10781 20.2922 3.7125 20.8969 4.34531 20.6813L9.05156 19.1109L11.2687 23.55C11.5687 24.15 12.4219 24.15 12.7219 23.55L14.9391 19.1109L19.6453 20.6813C20.2828 20.8922 20.8875 20.2875 20.6719 19.6547L19.1016 14.9484L23.5406 12.7313C24.15 12.4266 24.15 11.5734 23.55 11.2734V11.2734ZM16.2422 16.2422C13.9031 18.5813 10.0969 18.5813 7.75781 16.2422C5.41875 13.9031 5.41875 10.0969 7.75781 7.75781C10.0969 5.41875 13.9031 5.41875 16.2422 7.75781C18.5812 10.0969 18.5812 13.9031 16.2422 16.2422Z" />
      </g>
      <defs>
        <clipPath id="clip0_14_2">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </Icon>
  );
};

export const MoonIcon = ({ fill = "black", boxSize = "24px" }) => {
  return (
    <Icon boxSize={boxSize} viewBox="0 0 24 24" fill={fill}>
      <path d="M13.2755 24C16.9769 24 20.3573 22.316 22.5969 19.5566C22.9282 19.1484 22.567 18.5521 22.055 18.6496C16.233 19.7584 10.8864 15.2945 10.8864 9.41738C10.8864 6.03197 12.6987 2.91886 15.6442 1.24266C16.0982 0.984281 15.984 0.295922 15.4681 0.200625C14.7448 0.0672624 14.011 0.000109516 13.2755 0C6.65165 0 1.27551 5.3677 1.27551 12C1.27551 18.6239 6.64322 24 13.2755 24Z" />
    </Icon>
  );
};

export const MoreHorizontalIcon = ({ fill = "black", boxSize = "24px" }) => {
  return (
    <Icon boxSize={boxSize} viewBox="0 0 24 24" fill={fill}>
      <path
        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export const StudyIcon = ({ fill = "black", boxSize = "24px" }) => {
  return (
    <Icon boxSize={boxSize} viewBox="0 0 24 24" fill={fill}>
      <path d="M22.5925 2.66874C20.3092 2.79832 15.7708 3.26999 12.9692 4.98499C12.7758 5.10332 12.6662 5.31374 12.6662 5.53374V20.695C12.6662 21.1762 13.1925 21.4804 13.6362 21.2571C16.5187 19.8062 20.6875 19.4104 22.7487 19.3021C23.4525 19.265 23.9996 18.7008 23.9996 18.0246V3.9479C24 3.20999 23.36 2.6254 22.5925 2.66874ZM11.0304 4.98499C8.22917 3.26999 3.69083 2.79874 1.4075 2.66874C0.64 2.6254 0 3.20999 0 3.9479V18.025C0 18.7017 0.547083 19.2658 1.25083 19.3025C3.31292 19.4108 7.48375 19.8071 10.3662 21.2587C10.8087 21.4816 11.3333 21.1779 11.3333 20.6979V5.52624C11.3333 5.30582 11.2242 5.10374 11.0304 4.98499Z" />
    </Icon>
  );
};

export const AddIcon = ({ fill = "black", boxSize = "24px" }) => {
  return (
    <Icon boxSize={boxSize} viewBox="0 0 24 24" fill={fill}>
      <path d="M21 9.75H14.25V3C14.25 2.17172 13.5783 1.5 12.75 1.5H11.25C10.4217 1.5 9.75 2.17172 9.75 3V9.75H3C2.17172 9.75 1.5 10.4217 1.5 11.25V12.75C1.5 13.5783 2.17172 14.25 3 14.25H9.75V21C9.75 21.8283 10.4217 22.5 11.25 22.5H12.75C13.5783 22.5 14.25 21.8283 14.25 21V14.25H21C21.8283 14.25 22.5 13.5783 22.5 12.75V11.25C22.5 10.4217 21.8283 9.75 21 9.75Z" />
    </Icon>
  );
};

export const LogoutIcon = ({ fill = "black", boxSize = "24px" }) => {
  return (
    <Icon boxSize={boxSize} viewBox="0 0 24 24" fill={fill}>
      <g clipPath="url(#clip0_22_19)">
        <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" />
      </g>
      <defs>
        <clipPath id="clip0_22_19">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </Icon>
  );
};

export const SmartIcon = ({ fill = "#2D3748", boxSize = "72px" }) => {
  return (
    <Icon boxSize={boxSize} viewBox="0 0 72 72" fill={fill}>
      <path d="M36.0422 2.80547C30.2766 2.80547 25.6219 7.4039 25.6219 13.1091C25.6219 16.3406 26.7469 17.8594 27.9844 19.8281C28.8141 21.1359 29.6719 22.6547 30.1641 24.8344H41.8359C42.3281 22.5984 43.1859 21.0656 44.0156 19.7437C45.2672 17.7609 46.3781 16.2703 46.3781 13.1091C46.3781 7.4039 41.7656 2.80547 36.0422 2.80547ZM16.0594 3.88828L11.3906 4.97812L22.8094 10.6383L16.0594 3.88828ZM55.9406 3.88828L49.1906 10.6383L60.6094 4.97812L55.9406 3.88828ZM29.6016 11.1375L36 14.3297L42.3984 11.1375L39.4734 22.8094L37.0266 22.1906L38.6016 15.8625L36 17.1703L33.3984 15.8625L34.9734 22.1906L32.5266 22.8094L29.6016 11.1375ZM9 13.5042V18.0141L22.5 15.75L9 13.5042ZM63 13.5042L49.5 15.75L63 18V13.5042ZM46.9969 20.2922L52.6078 29.1937L55.9969 27.0422L46.9969 20.2922ZM25.0031 20.3062L16.0031 27.0562L19.3922 29.2078L25.0031 20.3062ZM30.375 26.8594V29.1094H41.625V26.8594H30.375ZM35.2125 30.8391C33.2859 30.8391 31.4297 30.9094 30.1922 30.9797C20.6016 32.4844 18.5344 45.8016 20.8125 57.9234H24.1313L23.9906 43.1016L26.6062 43.0734C26.4094 52.0312 26.8312 60.8766 27.3797 69.75H34.6078V54.8859H37.2375V69.75H44.325C44.9578 60.6094 45.1547 51.2578 45.2391 43.0734L47.8687 43.1016L47.7141 57.9234H51.1734C53.7469 45.4781 50.4984 32.7656 41.7375 31.1203C40.4156 30.9234 38.2359 30.8391 36.0281 30.8391H35.2125Z" />
    </Icon>
  );
};

export const GlobeNetworkIcon = ({ fill = "#2D3748", boxSize = "72px" }) => {
  return (
    <Icon boxSize={boxSize} viewBox="0 0 72 72" fill={fill}>
      <path d="M18.9864 24.894C19.7064 24.894 20.4048 24.9984 21.06 25.2036C23.5446 22.4197 26.2975 19.8875 29.2788 17.6436C28.9724 16.3617 29.0322 15.0195 29.4516 13.77C26.0888 11.36 22.4498 9.36096 18.612 7.8156C14.9946 10.0529 11.8393 12.9626 9.3168 16.3872C11.1852 19.6992 13.4064 22.7844 15.9336 25.5924C16.8552 25.146 17.8884 24.894 18.9864 24.894ZM11.9376 31.9392C11.9376 30.9492 12.1464 30.006 12.51 29.1564C10.2441 26.6661 8.2022 23.9809 6.408 21.132C4.08418 25.7447 2.87576 30.8386 2.88 36.0036C2.8738 41.9673 4.48498 47.821 7.542 52.9416C8.58762 47.0858 10.5561 41.433 13.374 36.1944C12.4414 34.9719 11.9367 33.4767 11.9376 31.9392V31.9392ZM36.1296 8.9604C37.9908 8.9604 39.6756 9.684 40.9392 10.8648C44.657 9.26004 48.5376 8.06266 52.5132 7.2936C47.4928 4.39564 41.7968 2.87323 36 2.88C32.0209 2.87751 28.0742 3.59465 24.3504 4.9968C27.2174 6.41285 29.9596 8.06875 32.5476 9.9468C33.5988 9.3204 34.8192 8.9604 36.1296 8.9604ZM46.6632 42.1488C47.0964 41.2386 47.7215 40.4329 48.4956 39.7872C46.4344 33.4571 43.168 27.5857 38.8764 22.4964C37.7661 22.9662 36.5537 23.1431 35.3554 23.0101C34.1571 22.8771 33.0131 22.4387 32.0328 21.7368C29.4796 23.6762 27.1126 25.8492 24.9624 28.2276C25.5038 29.0848 25.851 30.05 25.9798 31.0557C26.1085 32.0613 26.0156 33.0829 25.7076 34.0488C32.0086 38.2638 39.1654 41.0301 46.6632 42.1488V42.1488ZM55.8036 51.6636C56.0667 55.3627 55.969 59.0786 55.512 62.7588C61.1981 58.611 65.4179 52.7623 67.5612 46.0584C64.9789 46.6841 62.3549 47.1232 59.7096 47.3724C59.4004 48.3239 58.8921 49.1987 58.2187 49.9386C57.5452 50.6785 56.7219 51.2665 55.8036 51.6636V51.6636ZM45.0144 46.8864C37.0049 45.5522 29.3786 42.5017 22.6584 37.944C21.1276 38.8853 19.2945 39.2048 17.5356 38.8368C14.3011 44.9604 12.3427 51.6768 11.7792 58.5792C14.9529 61.9921 18.8109 64.697 23.1012 66.5172C28.5396 58.1496 36.1014 51.3754 45.0144 46.8864V46.8864ZM58.2336 11.4516C53.0361 11.9599 47.9462 13.2564 43.1388 15.2964C43.2704 16.603 43.0322 17.9203 42.4512 19.098C47.2201 24.6908 50.8508 31.1611 53.1396 38.1456C54.5038 38.1702 55.8317 38.5896 56.9626 39.3531C58.0935 40.1166 58.9788 41.1914 59.5116 42.4476C62.7012 42.1236 65.8044 41.5116 68.7924 40.6332C69.5565 35.2764 68.9933 29.8138 67.1522 24.7256C65.3111 19.6374 62.2485 15.0792 58.2336 11.4516V11.4516ZM48.5604 50.6484C40.2579 54.5359 33.145 60.5712 27.9576 68.13C30.5877 68.7884 33.2888 69.1209 36 69.12C40.8286 69.1242 45.5992 68.0686 49.9752 66.0276C50.6592 62.6868 51.0192 59.2344 51.0192 55.6992C51.0192 54.4212 50.9616 53.154 50.8644 51.9012C50.0236 51.6342 49.2416 51.209 48.5604 50.6484Z" />
    </Icon>
  );
};

export const FlipIcon = ({ fill = "#2D3748", boxSize = "24px", ...props }) => {
  return (
    <Icon boxSize={boxSize} viewBox="0 0 24 24" fill={fill} {...props}>
      <path d="M9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9C10.34 9 9 10.34 9 12ZM13 12C13 12.55 12.55 13 12 13C11.45 13 11 12.55 11 12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12Z" />
      <path d="M8 10V8H5.09C6.47 5.61 9.05 4 12 4C15.72 4 18.85 6.56 19.74 10H21.8C20.87 5.44 16.84 2 12 2C8.73 2 5.82 3.58 4 6.01V4H2V10H8ZM16 14V16H18.91C17.53 18.39 14.95 20 12 20C8.28 20 5.15 17.44 4.26 14H2.2C3.13 18.56 7.16 22 12 22C15.27 22 18.18 20.42 20 17.99V20H22V14H16Z" />
    </Icon>
  );
};
