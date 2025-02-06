import { css } from "styled-components";

export const mobile = (styles) => css`
  @media (max-width: 480px) {
    ${styles}
  }
`;

export const smallMobile = (styles) => css`
  @media (max-width: 375px) {
    ${styles}
  }
`;

export const tablet = (styles) => css`
  @media (max-width: 768px) {
    ${styles}
  }
`;
