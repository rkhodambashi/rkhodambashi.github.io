(() => {
  const grid = document.querySelector('.project-journey');
  if (!grid) return;
  const svg = grid.querySelector('.journey-path');
  const group = svg.querySelector('.journey-segments');
  const ns = 'http://www.w3.org/2000/svg';
  function draw() {
    const base = grid.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${base.width} ${base.height}`);
    group.replaceChildren();
    if (matchMedia('(max-width: 640px)').matches) return;
    const boxes = {};
    grid.querySelectorAll('[data-journey]').forEach(card => {
      const r = card.getBoundingClientRect();
      boxes[card.dataset.journey] = { x: r.left - base.left + r.width / 2, top: r.top - base.top, bottom: r.bottom - base.top };
    });
    const {georgia: a, asu: b, calviri: c, satellite: d} = boxes;
    const lower = (a.top + a.bottom) / 2;
    const upper = (c.top + c.bottom) / 2;
    const middle = (a.top + c.bottom) / 2;
    const left = a.x, right = d.x;
    const radius = Math.min(76, (middle - upper) / 3, (lower - middle) / 3);
    // One continuous S: right through the lower row, left between rows,
    // then right through the upper row. Cards sit above the ribbon.
    const route = `M ${left} ${lower} H ${b.x-radius}
      Q ${b.x} ${lower} ${b.x} ${lower-radius}
      V ${middle+radius} Q ${b.x} ${middle} ${b.x-radius} ${middle}
      H ${c.x+radius} Q ${c.x} ${middle} ${c.x} ${middle-radius}
      V ${upper+radius} Q ${c.x} ${upper} ${c.x+radius} ${upper}
      H ${right}`;
    const makePath = (name) => {
      const path = document.createElementNS(ns, 'path');
      path.setAttribute('d', route); path.setAttribute('class', name); group.append(path);
      return path;
    };
    const border = makePath('ribbon-border');
    // SVG linear gradients follow coordinates, not a curve's travel direction.
    // Sample arc length to paint a smooth gradient along this entire S instead.
    const length = border.getTotalLength();
    const stops = [[158,187,176], [126,170,169], [145,178,192], [184,200,177]];
    const pieces = Math.ceil(length / 4);
    const ribbon = document.createElementNS(ns, 'g');
    ribbon.setAttribute('class', 'ribbon-colors');
    group.append(ribbon);
    for (let i = 0; i < pieces; i++) {
      const t = i / (pieces - 1);
      const scaled = t * (stops.length - 1);
      const index = Math.min(stops.length - 2, Math.floor(scaled));
      const fraction = scaled - index;
      const rgb = stops[index].map((v, channel) => Math.round(v + (stops[index + 1][channel] - v) * fraction));
      const start = border.getPointAtLength(length * i / pieces);
      const end = border.getPointAtLength(length * (i + 1) / pieces);
      const segment = document.createElementNS(ns, 'path');
      segment.setAttribute('class', 'ribbon-main');
      segment.setAttribute('d', `M ${start.x} ${start.y} L ${end.x} ${end.y}`);
      segment.style.stroke = `rgb(${rgb.join(',')})`;


      ribbon.append(segment);
    }
    makePath('ribbon-highlight');
    [[base.width/2, lower, 1], [base.width/2, middle, -1], [base.width/2, upper, 1]].forEach(([x,y,direction]) => {
      const arrow = document.createElementNS(ns, 'path');
      arrow.setAttribute('class', 'ribbon-chevron');
      arrow.setAttribute('d', `M ${x-5*direction} ${y-5} L ${x+2*direction} ${y} L ${x-5*direction} ${y+5}`);
      group.append(arrow);
    });
    [[left, lower], [right, upper]].forEach(([x,y]) => {
      const dot = document.createElementNS(ns, 'circle');
      dot.setAttribute('cx',x); dot.setAttribute('cy',y); dot.setAttribute('r',5);
      dot.setAttribute('class','ribbon-end'); group.append(dot);
    });
  }
  let frame;
  const update = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); };
  const observer = new ResizeObserver(update);
  observer.observe(grid);
  grid.querySelectorAll('[data-journey]').forEach(card => observer.observe(card));
  window.addEventListener('resize', update);
  update();
})();
