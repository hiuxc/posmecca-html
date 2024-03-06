function includeFooter() {
  let str = `
<footer id="footer" class="footer">
  <div class="inner">
    <div class="logo" role="img" aria-label="POSMECCA"></div>
    <div>
      <ul class="policy-list">
        <li>
          <a href="#">개인정보취급방침</a>
        </li>
        <li>
          <a href="#">고객지원시스템</a>
        </li>
        <li>
          <a href="#">자료실</a>
        </li>
      </ul>
      <div class="footer-address">
        <p>08584 서울특별시 금천구 두산로 70 A동 1807호/1808호 <span>(독산동 291-1 현대지식산업센터)</span></p>
        <p>
          <span>TEL 02-2668-6460</span> 
          <span>FAX 02-6008-6467</span>
        </p>     
      </div>
      <div class="copyright">
          <small class="txt_copyright">Copyright 2024 (주)피오에스메카</small>
        </div>
    </div>
  </div>
</footer>
<div class="scroll-top"><button type="button" class="btn-scroll-top" aria-label="페이지 상단으로 이동"></button></div>`;
  document.write(str);
  const $include = document.querySelector('.__include');
  if ($include) $include.remove();
}
includeFooter();
