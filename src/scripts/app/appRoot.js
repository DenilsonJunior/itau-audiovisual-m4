define([
  "jquery",
  "app/main",
  "app/page",
  "frameworks/imagesloaded.pkgd.min",
], function ($, Main, Page, imagesLoaded) {
  "use strict";

  const main = new Main();
  main.init();

  const page = new Page();

  $(main).on("contentLoaded", () => {
    // Aguarda o DOM estar pronto
    const body = document.querySelector("body");

    // Garante que o elemento é válido antes de passar para imagesLoaded
    if (!body) return;

    // imagesLoaded espera um elemento DOM (não um objeto jQuery)
    imagesLoaded(body, { background: true }, function () {
      $("#loader").addClass("hidden");
      page.init();
    });
  });
});
