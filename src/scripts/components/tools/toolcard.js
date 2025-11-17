!(function (t) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], t)
    : "undefined" != typeof exports
    ? (module.exports = t(require("jquery")))
    : t(jQuery);
})(function (i) {
  "use strict";
  var t = window.ToolListCard || {};
  return (
    ((t = function (t) {
      (this.defaults = {
        text: "",
        pg: null,
        titulo: "",
        element: null,
      }),
        (this.settings = i.extend({}, this.defaults, t)),
        this.settings.text,
        (t = /<\/?[a-z][\s\S]*>/i.test()
          ? this.settings.text.html()
          : this.settings.text),
        (this.card = i(
          '<div class="highlight-item tool-item"><div class="item-top-bar"><span class="titulo-item">' +
            this.settings.titulo +
            '</span><button class="delete-tool-item">Remover</button></div><div class="item-content"><div class="texto-card">' +
            t +
            "</div></div></div>"
        ));
    }).prototype.init = function (t) {
      var e = this;
      t.append(this.card),
        this.card.find(".item-content").mCustomScrollbar({
          theme: "minimal-dark",
        }),
        this.card.find(".delete-tool-item").on("click", function (t) {
          t.stopPropagation(), i(e).trigger("delete", [e.settings]), e.delete();
        }),
        this.card.on("click", function () {
          e.settings.element[0].scrollIntoView({
            block: "end",
          });
        });
    }),
    (t.prototype.update = function (t) {
      this.settings.text = t;
      this.settings.text;
      t = /<\/?[a-z][\s\S]*>/i.test()
        ? this.settings.text.html()
        : this.settings.text;
      this.card.find(".texto-card").html(t);
    }),
    (t.prototype.delete = function () {
      var e = this;
      this.card.height(this.card.height()),
        this.card.addClass("delete"),
        (this.card[0].onanimationend = function (t) {
          e.card.remove();
        });
    }),
    t
  );
});
