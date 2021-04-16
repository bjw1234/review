// 封装一个插值器 给出 0 到 1 之间的过渡值
function interpolate({ timing, output, duration }) {
  const start = typeof performance === "object" ? performance.now() : Date.now();
  return requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;
    const progress = timing(timeFraction);
    output(progress);
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

interpolate({
  timing: value => (value * 10).toFixed(2),
  output: progress => console.log(progress),
  duration: 2000,
});
