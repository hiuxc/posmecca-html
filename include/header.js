function includeHeader() {
  let str = `
<header id="header" class="header">
  <div class="inner">
    <h1 class="h1"><a href="main.html" aria-label="POSMECCA</a></h1>
    
  </div>
</header>`;
  document.write(str);
  const $include = document.querySelector('.__include');
  if ($include) $include.remove();
}
includeHeader();
