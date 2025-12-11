export function initSliders() {
  const container = document.getElementById("sliders");

  container.innerHTML = `
    <label>Placeholder Slider</label>
    <input type="range" min="0" max="100" value="50">
  `;
}
