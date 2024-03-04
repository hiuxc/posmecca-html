function includeFooter() {
  let str = `
<footer id="footer" class="footer">
  <div class="inner">
    <div class="logo" role="img" aria-label="POSMECCA"></div>
    
    
  </div>
</footer>
<div class="scroll-top"><button type="button" class="btn-scroll-top" aria-label="페이지 상단으로 이동"></button></div>`;
  document.write(str);
  const $include = document.querySelector('.__include');
  if ($include) $include.remove();
}
includeFooter();
