const atvImg = () => {
  const d = document;
  const de = d.documentElement;
  const bd = d.getElementsByTagName("body")[0];
  const htm = d.getElementsByTagName("html")[0];
  const win = window;
  const imgs = d.querySelectorAll(".atvImg");
  const totalImgs = imgs.length;
  const supportsTouch = "ontouchstart" in win || navigator.msMaxTouchPoints;

  if (totalImgs <= 0) {
    return;
  }

  // build HTML
  for (let l = 0; l < totalImgs; l++) {
    const thisImg = imgs[l];
    const layerElems = thisImg.querySelectorAll(".atvImg-layer");
    const totalLayerElems = layerElems.length;

    if (totalLayerElems <= 0) {
      continue;
    }

    while (thisImg.firstChild) {
      thisImg.removeChild(thisImg.firstChild);
    }

    const containerHTML = d.createElement("div");
    const shineHTML = d.createElement("div");
    const shadowHTML = d.createElement("div");
    const layersHTML = d.createElement("div");
    const layers = [];

    thisImg.id = `atvImg__${l}`;
    containerHTML.className = "atvImg-container";
    shineHTML.className = "atvImg-shine";
    shadowHTML.className = "atvImg-shadow";
    layersHTML.className = "atvImg-layers";

    for (let i = 0; i < totalLayerElems; i++) {
      const layer = d.createElement("div");
      const imgSrc = layerElems[i].getAttribute("data-img");

      layer.className = "atvImg-rendered-layer";
      layer.setAttribute("data-layer", i);
      layer.style.backgroundImage = `url(${imgSrc})`;
      layersHTML.appendChild(layer);

      layers.push(layer);
    }

    containerHTML.appendChild(shadowHTML);
    containerHTML.appendChild(layersHTML);
    containerHTML.appendChild(shineHTML);
    thisImg.appendChild(containerHTML);

    const w = thisImg.clientWidth || thisImg.offsetWidth || thisImg.scrollWidth;
    thisImg.style.transform = `perspective(${w * 3}px)`;

    if (supportsTouch) {
      win.preventScroll = false;

      ((_thisImg, _layers, _totalLayers, _shine) => {
        thisImg.addEventListener("touchmove", (e) => {
          if (win.preventScroll) {
            e.preventDefault();
          }
          processMovement(e, true, _thisImg, _layers, _totalLayers, _shine);
        });
        thisImg.addEventListener("touchstart", (e) => {
          win.preventScroll = true;
          processEnter(e, _thisImg);
        });
        thisImg.addEventListener("touchend", (e) => {
          win.preventScroll = false;
          processExit(e, _thisImg, _layers, _totalLayers, _shine);
        });
      })(thisImg, layers, totalLayerElems, shineHTML);
    } else {
      ((_thisImg, _layers, _totalLayers, _shine) => {
        thisImg.addEventListener("mousemove", (e) => {
          processMovement(e, false, _thisImg, _layers, _totalLayers, _shine);
        });
        thisImg.addEventListener("mouseenter", (e) => {
          processEnter(e, _thisImg);
        });
        thisImg.addEventListener("mouseleave", (e) => {
          processExit(e, _thisImg, _layers, _totalLayers, _shine);
        });
      })(thisImg, layers, totalLayerElems, shineHTML);
    }
  }

  const processMovement = (
    e,
    touchEnabled,
    elem,
    layers,
    totalLayers,
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
    style.transform = `${
      `${`translateX(${offsetX * totalLayers}` - 0.1}px) translateY(${
        offsetY * totalLayers
      }` - 0.1
    }px)`;

    //parallax for each layer
    let revNum = totalLayers;
    for (let ly = 0; ly < totalLayers; ly++) {
      layers[ly].style.transform = `translateX(${
        offsetX * revNum * ((ly * 2.5) / wMultiple)
      }px) translateY(${offsetY * totalLayers * ((ly * 2.5) / wMultiple)}px)`;
      revNum--;
    }
  };

  const processEnter = (e, { firstChild }) => {
    firstChild.className += " over";
  };

  const processExit = (e, { firstChild }, layers, totalLayers, { style }) => {
    const container = firstChild;

    container.className = container.className.replace(" over", "");
    container.style.transform = "";
    style.cssText = "";

    for (let ly = 0; ly < totalLayers; ly++) {
      layers[ly].style.transform = "";
    }
  };
};
