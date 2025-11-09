$.fn.header = function (config) {
  const janela = $(window);
  const elementosTela = $(".tela");
  janela.on("scroll", () => {
    const alturaJanela = janela.height();
    const scroll = janela.scrollTop();
    const fimJanela = scroll + alturaJanela;

    if (scroll > $("#new-header").height())
      $("#wrapper").addClass("short-header");
    else $("#wrapper").removeClass("short-header");

    elementosTela.each(function () {
      const $tela = $(this);
      const topo = $tela.offset().top;
      const altura = $tela.outerHeight();
      if (scroll <= topo + altura && topo <= fimJanela) $tela.addClass("monta");
    });
  });

  $(this).interacoes(config);
};
