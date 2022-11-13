export default function year() {
  const thisYear = document.querySelector('.this-year');
  thisYear.textContent = new Date().getFullYear();
}