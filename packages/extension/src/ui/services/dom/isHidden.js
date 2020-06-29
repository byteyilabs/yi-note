export default (el) => {
  const style = window.getComputedStyle(el);
  return (style.display === 'none');
}
