define(["jquery", "app/main", "app/page"], function ($, Main, Page) {
  "use strict";

  const main = new Main();
  main.init();

  const page = new Page();
  
  $(main).on("contentLoaded", () => {
    $("#loader").addClass("hidden");
    page.init();
  });
});
