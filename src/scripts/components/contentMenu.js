define(["jquery"], function ($) {

  
  $("body").on('open-menu', ()=>{
    
    $("body").toggleClass("menu-ativo");
    $(".modalMenuBase").toggleClass("active");
    
  });

  $("body").on("closed-menu", () => {
    $("body").removeClass("menu-ativo");
    $(".modalMenuBase").removeClass("active");
  });


});
