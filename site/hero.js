(() => {
  const image = document.querySelector('.hero-image img');
  if (!image) return;
  const roundPhoto = () => {
    if (!image.naturalWidth || !image.clientWidth || !image.clientHeight) return;
    const scale = Math.min(image.clientWidth / image.naturalWidth, image.clientHeight / image.naturalHeight);
    const left = Math.max(0, image.clientWidth - image.naturalWidth * scale);
    const vertical = Math.max(0, (image.clientHeight - image.naturalHeight * scale) / 2);
    image.style.clipPath = `inset(${vertical}px 0 ${vertical}px ${left}px round 10px)`;
  };
  new ResizeObserver(roundPhoto).observe(image);
  image.addEventListener('load', roundPhoto);
  roundPhoto();
})();
