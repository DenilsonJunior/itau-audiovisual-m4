define(["jquery", "components/utils"], function (r, u) {
  "use strict";
  var l,
    c = window.Sumario || {};
  function t() {
    var t =
      r(window).height() -
      (l.find(".sumario-content").offset().top - r(window).scrollTop());
    l.find(".sumario-content").css("max-height", t);
  }
  ((c = function (t, o) {
    var i = "";
    (this.obj = r(t)), (l = this.obj);
    for (var a, n, e = this, s = 0; s < o.length; s++)
      o[s].titulo &&
        i != o[s].titulo &&
        ((a = r("<li>")).removeClass("check"),
        a.attr("data-id", s),
        (n = r("<a>")).attr("href", "#" + u.formatURL(o[s].titulo)),
        n.attr("data-titulo-href", u.formatURL(o[s].titulo)),
        n.attr("role", "button"),
        n.attr("data-id", s),
        n.html(o[s].titulo),
        o[s].status.active || n.addClass("inativo"),
        a.append(n),
        r(t).find(".sumario-content").append(a),
        n.on("click", function (t) {
          t.preventDefault(),
            e.obj.trigger("navegaContent", [
              r(this).data("id"),
              r(this).data("titulo-href"),
            ]),
            e.abreSumario(),
            r(this).parent().hasClass("ativo");
        }),
        a.addClass("ativo"),
        (i = o[s].titulo)),
        (o[s].pgInicio = 0);
    r(document).mouseup(function (t) {
      var o = r("#sumario .sumario-content, #bt-sumario, .bt-sumario");
      o.is(t.target) || 0 !== o.has(t.target).length || e.fechaSumario();
    }),
      this.obj.find("#bt-sumario").on("click", function () {
        e.abreSumario();
      });
  }).prototype.abreSumario = function () {
    r("body").toggleClass("menu-ativo"),
      this.obj.toggleClass("ativo"),
      r(window).on("resize", t),
      t();
  }),
    (c.prototype.fechaSumario = function () {
      r("body").removeClass("menu-ativo"),
        this.obj.removeClass("ativo"),
        r(window).off("resize", t);
    }),
    (c.prototype.unlock = function (t) {
      this.obj
        .find(".sumario-content li a[data-id=" + t + "]")
        .removeClass("inativo");
    }),
    (c.prototype.initTela = function (t) {
      var o = this;
      t = parseInt(t);
      t = this.obj.find(".sumario-content li[data-id=" + t + "]");
      this.obj.find(".sumario-content li").removeClass("ativo"),
        t.addClass("ativo"),
        setTimeout(() => {
          o.obj.find(".sumario-content li a").width(""),
            o.obj.find(".sumario-content li a").css("transition", "none"),
            o.obj.find(".sumario-content li a").css("transition", "");
        }, 0);
    }),
    (r.fn.sumario = function (t) {
      for (
        var o,
          i = this,
          a = t,
          n = Array.prototype.slice.call(arguments, 1),
          e = i.length,
          s = 0;
        s < e;
        s++
      )
        if (
          ("object" == typeof a || void 0 === a
            ? (i[s].sumario = new c(i[s], a))
            : (o = i[s].sumario[a].apply(i[s].sumario, n)),
          void 0 !== o)
        )
          return o;
      return i;
    });
});
