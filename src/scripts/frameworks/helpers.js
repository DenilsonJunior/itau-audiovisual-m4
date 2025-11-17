define([
  "jquery",
  "frameworks/jquery-ui.min",
  "components/utils",
  "components/tools/postit",
  "components/tools/highlight",
  "components/tools/pdf",
  "components/tools/toolcard",
  "frameworks/jquery.mCustomScrollbar.min",

], function (n, t, o) {
  "use strict";
  var l = window.Tools || {};
  function e(t, o) {
    0 < o ? (t.removeClass("d-none"), t.html(o)) : t.addClass("");
  }
  ((l = function (t, o) {
    var i = this,
      s = {
        highlights: [],
        postits: [],
        fontSize: (parseInt(n("body").css("font-size")) / 16) * 100,
      };
    (this.settings = n.extend(!0, s, o)),
      (this.fontSize = this.settings.fontSize),
      (this.element = t),
      n(t).highlights({
        list: n("#tools-content .highlight-content"),
        parser: ".tela",
        highlights: i.settings.highlights,
      }),
      n(t).postits({
        list: n("#tools-content .postits-content"),
        parser: ".tela",
        postits: i.settings.postits,
      }),
      n(t).PDF(o.wrapper),
      e(
        n("#bt-highlights-list .tool-count"),
        i.settings.highlights.length || 0
      ),
      e(n("#bt-postits-list .tool-count"), i.settings.postits.length),
      e(
        n(".menuBaseContainerInfo .infoMenuDestaque span"),
        i.settings.highlights.length || "0"
      ),
      e(
        n(".menuBaseContainerInfo .infoMenuPost span"),
        i.settings.postits.length || "0"
      ),
      n(t).on("setHighlight", function (t, o) {
        e(n("#bt-highlights-list .tool-count"), o.length),
          e(n(".menuBaseContainerInfo .infoMenuDestaque span"), o.length || "0"),
          n(this).trigger("gravaTool", {
            tool: "highlight",
            val: o,
          });
      }),
      n(t).on("setPostit", function (t, o) {
        e(n("#bt-postits-list .tool-count"), o.length),
          e(n(".menuBaseContainerInfo .infoMenuPost span"), o.length || "0"),
          n(this).trigger("gravaTool", {
            tool: "postit",
            val: o,
          });
      }),
      n("[data-tool]").on("click", function () {
        $("body").trigger("closed-menu");

        var i = n(this).data("tool");
        n("#tools-content .bt-tools-content").each(function (t, o) {
          n(this).data("tool") != i
            ? n(this).removeClass("tool-atual")
            : n(this).toggleClass("tool-atual");
        }),
          n("#tools-content")
            .find(".tools-content")
            .each(function (t, o) {
              n(this).data("tool") != i
                ? n(this).addClass("inativo")
                : n(this).toggleClass("inativo");
            });
      }),
      n("#tools-content")
        .find(".close-tools")
        .on("click", function () {
          n(n(this).data("button")).trigger("click");
        });
  }).prototype.setCurrentPage = function (t, o) {
    this.id = t;
    var i = n(this.element).find(".tela[data-id='" + t + "']");
    n(this.element).highlights("setCurrentPage", t, i, o),
      n(this.element).postits("setCurrentPage", t, i, o);
  }),
    (l.prototype.inserePostit = function () {
      n(this.element).postits("inserePostit");
    }),
    (l.prototype.toggleHighlight = function () {
      n(this.element).highlights("toggleHighlight");
    }),
    (l.prototype.baixaPDF = function () {
      n(this.element).PDF("download");
    }),
    (l.prototype.setContrast = function () {
      n("body").toggleClass("contraste");
    }),
    (l.prototype.setFontSize = function () {
      var t = (100 - this.settings.fontSize) / 4;
      (this.fontSize += t),
        115 < this.fontSize && (this.fontSize = this.settings.fontSize),
        n("body").css("font-size", this.fontSize + "%");
    }),
    (n.fn.tools = function () {
      for (
        var t,
          o = this,
          i = arguments[0],
          s = Array.prototype.slice.call(arguments, 1),
          n = o.length,
          e = 0;
        e < n;
        e++
      )
        if (
          ("object" == typeof i || void 0 === i
            ? (o[e].tools = new l(o[e], i))
            : (t = o[e].tools[i].apply(o[e].tools, s)),
          void 0 !== t)
        )
          return t;
      return o;
    });
});
