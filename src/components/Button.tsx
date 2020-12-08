/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useEffect, useRef } from "react";
declare const window: any;

export const Button = ({ label }) => {
  const buttonRef = useRef(null);
  useEffect(() => {
    if (buttonRef.current) {
      const text = buttonRef.current.textContent;
      const atvImg = () => {
        const d = document;
        const de = d.documentElement;
        const bd = d.getElementsByTagName("body")[0];
        const htm = d.getElementsByTagName("html")[0];
        const win = window;

        const supportsTouch =
          "ontouchstart" in win || navigator.msMaxTouchPoints;

        // build HTML

        const thisButton = buttonRef.current;

        // if (totalLayerElems <= 0) {
        //   continue;
        // }

        while (thisButton.firstChild) {
          thisButton.removeChild(thisButton.firstChild);
        }

        const containerHTML = d.createElement("div");
        const contentHTML = d.createElement("span");
        const shineHTML = d.createElement("div");
        const shadowHTML = d.createElement("div");

        thisButton.id = `atvImg__1`;
        containerHTML.className =
          "atvImg-container bgc-themeDark d-flex ai-center jc-center ";
        contentHTML.className = "atvImg-content";
        shineHTML.className = "atvImg-shine";
        shadowHTML.className = "atvImg-shadow";
        contentHTML.innerHTML = label;

        console.log(contentHTML);

        containerHTML.appendChild(shadowHTML);
        containerHTML.appendChild(shineHTML);
        containerHTML.appendChild(contentHTML);
        thisButton.appendChild(containerHTML);

        const w =
          thisButton.clientWidth ||
          thisButton.offsetWidth ||
          thisButton.scrollWidth;
        thisButton.style.transform = `perspective(${w * 3}px)`;

        if (supportsTouch) {
          win.preventScroll = false;

          ((_thisButton, _shine) => {
            thisButton.addEventListener("touchmove", (e) => {
              if (win.preventScroll) {
                e.preventDefault();
              }
              processMovement(e, true, _thisButton, _shine);
            });
            thisButton.addEventListener("touchstart", (e) => {
              win.preventScroll = true;
              processEnter(e, _thisButton);
            });
            thisButton.addEventListener("touchend", (e) => {
              win.preventScroll = false;
              processExit(e, _thisButton, _shine);
            });
          })(thisButton, shineHTML);
        } else {
          ((_thisButton, _shine) => {
            thisButton.addEventListener("mousemove", (e) => {
              processMovement(e, false, _thisButton, _shine);
            });
            thisButton.addEventListener("mouseenter", (e) => {
              processEnter(e, _thisButton);
            });
            thisButton.addEventListener("mouseleave", (e) => {
              processExit(e, _thisButton, _shine);
            });
          })(thisButton, shineHTML);
        }

        const processMovement = (
          e,
          touchEnabled,
          elem,

          { style }
        ) => {
          const bdst = bd.scrollTop || htm.scrollTop; //convert rad in degrees
          const bdsl = bd.scrollLeft;
          const pageX = touchEnabled ? e.touches[0].pageX : e.pageX;
          const pageY = touchEnabled ? e.touches[0].pageY : e.pageY;
          const offsets = elem.getBoundingClientRect();

          const // width
            w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth;

          const // height
            h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight;

          const wMultiple = 320 / w;

          const //cursor position X
            offsetX = 0.52 - (pageX - offsets.left - bdsl) / w;

          const //cursor position Y
            offsetY = 0.52 - (pageY - offsets.top - bdst) / h;

          const //@h/2 = center of container
            dy = pageY - offsets.top - bdst - h / 2;

          const //@w/2 = center of container
            dx = pageX - offsets.left - bdsl - w / 2;

          const //rotation for container Y
            yRotate = (offsetX - dx) * (0.07 * wMultiple);

          const //rotation for container X
            xRotate = (dy - offsetY) * (0.1 * wMultiple);

          let //img transform
            imgCSS = `rotateX(${xRotate}deg) rotateY(${yRotate}deg)`;

          const //angle between cursor and center of container in RAD
            arad = Math.atan2(dy, dx);

          let angle = (arad * 180) / Math.PI - 90;

          const transformStyle = `
            translateX(calc(${offsetX}) - 0.1px) 
            translateY(calc(${offsetY}) - 0.1px)
            `;

          //get angle between 0-360
          if (angle < 0) {
            angle = angle + 360;
          }

          //container transform
          if (elem.firstChild.className.includes(" over")) {
            imgCSS += " scale3d(1.07,1.07,1.07)";
          }
          elem.firstChild.style.transform = imgCSS;

          //gradient angle and opacity for shine

          style.background = `linear-gradient(${angle}deg, rgba(255,255,255,${
            ((pageY - offsets.top - bdst) / h) * 0.4
          }) 0%,rgba(255,255,255,0) 80%)`;
          style.transform = transformStyle;

          // //parallax for each layer
          // let revNum = totalLayers;
          // for (let ly = 0; ly < totalLayers; ly++) {
          //   layers[ly].style.transform = `translateX(${
          //     offsetX * revNum * ((ly * 2.5) / wMultiple)
          //   }px) translateY(${
          //     offsetY * totalLayers * ((ly * 2.5) / wMultiple)
          //   }px)`;
          //   revNum--;
          // }
        };

        const processEnter = (e, { firstChild }) => {
          firstChild.className += " over";
        };

        const processExit = (
          e,
          { firstChild },

          { style }
        ) => {
          const container = firstChild;

          container.className = container.className.replace(" over", "");
          container.style.transform = "";
          style.cssText = "";
        };
      };
      atvImg();
    }
  }, [buttonRef]);

  return (
    <div
      css={css`
        transform: perspective(960px);
        width: 200px;
        height: 80px;
      `}
      className="p-16 d-inline-block color-theme bdr-4"
      ref={buttonRef}
    >
      <div>{label}</div>
    </div>
  );
};

export default Button;
