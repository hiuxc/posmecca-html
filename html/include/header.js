function includeHeader() {
  let str = `
<header id="header" class="header">
  <div class="inner">
    <h1 class="h1"><a href="main.html" aria-label="POSMECCA">POSMECCA</a></h1>
    <nav id="gnb">
      <ul>
        <li><a href="main.html" aria-label="Service">Service</a></li>
        <li><a href="main.html" aria-label="Reference">Reference</a></li>
        <li><a href=" main.html" aria-label="ESG">ESG</a></li>
        <li><a href="main.html" aria-label="CS Center">CS Center</a></li>
        <li><a href="main.html" aria-label="About us">About us</a></li>
      </ul>
    </nav>
  </div>
</header>`;
  document.write(str);
  const $include = document.querySelector('.__include');
  if ($include) $include.remove();
}
includeHeader();
