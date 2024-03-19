function includeHeader() {
  let str = `
<header id="header" class="header">
  <div class="inner">
    <h1 id="logo"><a href="../html/main.html" aria-label="POSMECCA">POSMECCA</a></h1>
    <nav id="gnb">
      <button type="button" class="btn-gnb">
        <span class="gnb-current">모바일 메뉴 펼치기</span>
      </button>
      <ul>
        <li><a href="../html/service_solution.html" aria-label="Service">Service</a></li>
        <li><a href="../html/reference.html" aria-label="Reference">Reference</a></li>
        <li><a href="../html/esg_environment.html" aria-label="ESG">ESG</a></li>
        <li><a href="../html/cs_center_info.html" aria-label="CS Center">CS Center</a></li>
        <li><a href="../html/aboutus_greeting.html" aria-label="About us">About us</a></li>
      </ul>
    </nav>
  </div>
</header>`;
  document.write(str);
  const $include = document.querySelector('.__include');
  if ($include) $include.remove();
}
includeHeader();
