/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useEffect, useRef } from "react";
declare const window: any;
let uniqueId =
  Date.now().toString(36) + Math.random().toString(36).substring(2);

export const Button = ({ label, href }) => {
  const buttonRef = useRef(null);

  return (
    <div
      css={css`
        transform: perspective(960px);
        position: relative;
        background: radial-gradient(
          100% 100% at 150% 0%,
          var(--theme),
          var(--themeDark)
        );

        text-shadow: 0 1px 0 var(--themeDark);
      `}
      className="d-inline-block color-theme bdr-4 bdw-1 bds-solid bdc-themeDark"
      ref={buttonRef}
    >
      <a
        href={href}
        title={`link to: ${href}`}
        className="p-8 color-current td-none d-block w-100p h-100p"
      >
        {label}
      </a>
    </div>
  );
};

export default Button;
