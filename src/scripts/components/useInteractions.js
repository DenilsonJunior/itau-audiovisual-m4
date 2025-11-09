var v;
function sorteia(t) {
  for (var i = [], e = [], o = 0; o < t.length; o++) i.push(o);
  for (; 0 < i.length; ) {
    var s = parseInt(Math.random() * i.length, 10);
    e.push(i[s]), i.splice(s, 1);
  }
  return e;
}
($.fn.abreAba = function () {
  var e = $(this);
  $(this)
    .find(".box-aba")
    .each(function () {
      ($this = $(this)),
        e.trigger("set-interaction"),
        $(this).setClickCheck(),
        $(this)
          .find(".aba")
          .each(function () {
            var i = $this;
            $(this).bind("click", function () {
              var t;
              i.find(".instrucao").addClass("off"),
                i.find(".aba").removeClass("on"),
                $(this).addClass("on").addClass("clicou"),
                i.find(".aba-conteudo").removeClass("on"),
                i
                  .find("[data-id=" + $(this).attr("data-aba") + "]")
                  .addClass("on"),
                i.find(".popup-content").length
                  ? (t =
                      i.find(".box-aba").offset().top -
                      i.find(".popup-content").offset().top)
                  : i.find(".container").length &&
                    (t =
                      i.find(".box-aba").offset().top -
                      i.find(".container").offset().top),
                i.find(".aba.clicou").length == i.find(".aba").length &&
                  (i.trigger("interaction-done"),
                  e.find(".feedback-aba").addClass("on")),
                i.animate(
                  {
                    scrollTop: t,
                  },
                  500
                );
            });
          });
    });
}),
  ($.fn.animacoes = function () {
    var t = (t = [
        ".fade",
        ".slide-left",
        ".slide-right",
        ".slide-up",
        ".slide-down",
        ".anima-cima",
        ".anima-baixo",
        ".anima-esquerda",
        ".anima-direita",
        ".anima-diminui",
        ".anima-cresce",
        ".zoom-in",
        ".zoom-out",
        ".gira-esquerda",
        ".gira-direita",
        ".zoom-out",
        ".espelho",
        ".pulsar",
      ]).join(","),
      a = 0;
    $(this)
      .find(t)
      .each(function (t) {
        var i = 200,
          e = $(this)[0].className.split(/\s+/);
        const o = new RegExp("d[0-9]");
        var s = $(this).prev().prop("nodeName");
        s && "li" == s.toLowerCase() && (i = 100);
        e = e.find((t) => o.test(t));
        "string" == typeof e || e instanceof String
          ? ((e = e.substr(e.indexOf("d") + 1)), (a = parseInt(e)))
          : ((a += i), $(this).addClass("d" + a));
      });
  }),
  (function (b) {
    (b.fn.acessibilidadeAtividades = function () {
      b(this);
      var t,
        a = b(this).attr("id");
      b(this).find(".multipla-escolha.radio").length
        ? ((t = b(this).find(".alternativas").attr("class")),
          b(this)
            .find(".alternativas")
            .replaceWith(function () {
              return b("<fieldset />", {
                html: this.innerHTML,
                class: t,
              });
            }))
        : (b(this)
            .find(".textoAlternativas, .pergunta")
            .each(function () {
              var t = b(this);
              b(this).replaceWith(function () {
                return b("<legend />", {
                  html: this.innerHTML,
                  class: t.attr("class"),
                });
              });
            }),
          b(this)
            .find(".textoAlternativas, .pergunta")
            .each(function (t) {
              var i;
              b(this).parent().hasClass("linha")
                ? ((i = b(
                    "<div class='col12'><fieldset class='linha'></fieldset></div>"
                  )).appendTo(b(this).parent()),
                  i.find("fieldset").append(b(this).next(".alternativas")),
                  i.find("fieldset").prepend(b(this)))
                : ((i = b("<fieldset>")).appendTo(b(this).parent()),
                  i.append(b(this).next(".alternativas")),
                  i.prepend(b(this)));
            })),
        b(this)
          .find(".multipla-escolha, .vf")
          .each(function () {
            var t = b(this).attr("class");
            b(this).replaceWith(function () {
              return b("<form/>", {
                html: this.innerHTML,
                class: t,
              }).prop("action", "#");
            });
          }),
        b(this)
          .find(".multipla-escolha, .vf")
          .each(function (o) {
            var s = "checkbox";
            (b(this).hasClass("vf") || b(this).hasClass("radio")) &&
              (s = "radio"),
              b(this)
                .find(".alternativas")
                .each(function (e) {
                  b(this)
                    .find(".alternativa")
                    .each(function (t) {
                      var i = b(this).attr("class");
                      b(this).replaceWith(function () {
                        return b("<input/>", {
                          html: this.innerHTML,
                          class: i,
                        })
                          .prop("type", s)
                          .attr("data-ok", b(this).data("ok"))
                          .attr("data-feed", b(this).data("feed"));
                      });
                    }),
                    b(this)
                      .find(".alternativa")
                      .each(function (t) {
                        var i = a + "-" + o + "-" + e + "-" + t,
                          t = a + "-" + o + "-" + e;
                        b(this).prop("id", i),
                          "radio" == s
                            ? (b(this).prop("name", t),
                              b(this).attr(
                                "value",
                                b(this).find(".selection").text()
                              ))
                            : (b(this).prop(
                                "name",
                                b(this).find(".selection").text()
                              ),
                              b(this).attr("value", b(this).data("ok"))),
                          b(this).closest(".alternativas-radio").length
                            ? (b(this)
                                .closest(".alternativas-radio")
                                .find(".selection")
                                .prependTo(b(this).parent().find(".pergunta")),
                              b(this)
                                .parent()
                                .find(".pergunta")
                                .replaceWith(function () {
                                  return b("<label/>", {
                                    html: this.innerHTML,
                                    class: "pergunta",
                                  });
                                }),
                              b(this)
                                .parent()
                                .find(".pergunta")
                                .prop("for", i)
                                .insertAfter(b(this)))
                            : (b(this)
                                .find(".selection")
                                .replaceWith(function () {
                                  return b("<label/>", {
                                    html: this.innerHTML,
                                    class: "selection",
                                  });
                                }),
                              b(this)
                                .find(".selection")
                                .prop("for", i)
                                .insertAfter(b(this)));
                      });
                }),
              b(this)
                .find(".botao-ok")
                .insertAfter(b(this).find(".questao").last());
          });
    }),
      (b.fn.atividades = function () {
        b(this).data("loaded", 1);
        var i = b(this);
        b(this).acessibilidadeAtividades(i),
          b(this).find(".multipla-escolha, .vf").multiplaEscolha(i),
          document.YTReady && clearInterval(intervaloVideo),
          b(this).find(".video-interativo").length &&
            (document.YTReady
              ? i.find(".video-interativo").each(function (t, i) {
                  var e;
                  b(this).data("loaded") ||
                    (b(this).data("loaded", 1),
                    b(this).data("video-interativo") ||
                      ((e = new VideoInterativo(b(this)).initialize()),
                      b(this).data("video-interativo", e)));
                })
              : (b.getScript("../assets/js/components/video-interativo.min.js"),
                b(document).bind("VideoAPIReady", function () {
                  (document.YTReady = !0),
                    i.find(".video-interativo").each(function (t, i) {
                      var e;
                      b(this).data("loaded") ||
                        (b(this).data("loaded", 1),
                        b(this).data("video-interativo") ||
                          ((e = new VideoInterativo(b(this)).initialize()),
                          b(this).data("video-interativo", e)));
                    }),
                    b(document).unbind("YouTubeAPIReady");
                }))),
          b(this).bind("fimQuestionario", function () {
            !(function () {
              {
                var t;
                i.find(".botao-ok").addClass("hidden"),
                  i.find(".box-atencao").length
                    ? (i
                        .find("[data-feedback='1']")
                        .css("display", "block")
                        .removeClass("hidden"),
                      (t =
                        i.find(".box-atencao").offset().top -
                        i.find(".container").offset().top),
                      setTimeout(function () {
                        i.animate(
                          {
                            scrollTop: t - 150,
                          },
                          800
                        ),
                          i.find("[data-feedback='1']").addClass("ativo");
                      }, 200))
                    : i.find("[data-feedback='1']").length &&
                      setTimeout(function () {
                        var t =
                          i
                            .find(".atividade, .vf, .multipla-escolha")
                            .first()
                            .offset().top -
                          i.find(".container").offset().top -
                          30;
                        i.animate(
                          {
                            scrollTop: t - 150,
                          },
                          800
                        ),
                          i.find("[data-feedback='1']").addClass("ativo"),
                          b(".multipla-escolha .alternativas").addClass(
                            "showfeedback"
                          );
                      }, 200);
              }
            })();
          });
      }),
      (b.fn.multiplaEscolha = function (i) {
        var u;
        function o(t, i, e) {
          switch (e) {
            case "radio":
            case "vf":
              t
                .find(".alternativa, label.selection")
                .removeClass("selecionado"),
                i.addClass("selecionado"),
                u.find(".questao .alternativa.selecionado").length >=
                  u.find(".questao").length &&
                  (u.find(".botao-ok").removeClass("inativo").addClass("ativo"),
                  u.find(".botao-ok").attr("aria-disabled", "false"),
                  b("body #content").animate(
                    {
                      scrollTop: b(document).height() + 200,
                    },
                    1e3
                  ));
              break;
            case "checkbox":
              i.toggleClass("selecionado"),
                t.find(".alternativas").each(function () {
                  1 <= b(this).find(".alternativa.selecionado").length
                    ? b(this).addClass("selecionado")
                    : b(this).removeClass("selecionado");
                }),
                t.find(".alternativas.selecionado").length >=
                t.find(".alternativas").length
                  ? (u
                      .find(".botao-ok")
                      .removeClass("inativo")
                      .addClass("ativo"),
                    b("body #content").animate(
                      {
                        scrollTop: b(document).height() + 200,
                      },
                      1e3
                    ))
                  : u.find(".botao-ok").removeClass("ativo");
          }
        }
        function v(t) {
          var s = "<h5 tabindex='0'>Veja a seguir o seu resultado:</h5>";
          return (
            t.find("fieldset").each(function (t) {
              var i, e, o;
              b(this).find(".alternativas").length &&
                ((i = b(this).find(".alternativas .alternativa.acerto")),
                (e = b(this).find(
                  ".alternativas .alternativa.erro, .alternativas .alternativa.acerto"
                )),
                (o = b(this).find(
                  ".alternativas .alternativa.acerto, .alternativas .alternativa.acerto-2"
                )),
                (s += b(this).find(".textoAlternativas").html()),
                (s += "<p>Suas respostas:"),
                e.each(function () {
                  s += b(this).attr("name") + ",";
                }),
                (s += "</p>"),
                (s += "<p>Respostas corretas:"),
                o.each(function () {
                  s += b(this).attr("name") + ",";
                }),
                (s += "</p>"),
                (s +=
                  "<p>Você acertou " +
                  i.length +
                  (1 == i.length ? " opção" : " opções") +
                  ".</p>"));
            }),
            b("<div class='sr-only'>" + s + "</div>")
          );
        }
        b(this).length &&
          (b(this).hasClass("optional") ||
            setTimeout(() => {
              i.trigger("set-interaction");
            }),
          (u = b(this)),
          b(this)
            .find(".questoes .questao")
            .each(function (t) {
              var i = b(this),
                e = b(this).data("tipo") || "checkbox";
              b(this)
                .find(".alternativa")
                .each(function (t) {
                  b(this).attr("data-id", t),
                    b(this).on("change", function () {
                      b(this).hasClass("inativa") || o(i, b(this), e);
                    });
                }),
                b(this)
                  .find(".alternativa, label.selection")
                  .each(function (t) {});
            }),
          b(this)
            .find(".botao-ok")
            .bind("click", function (t) {
              t.preventDefault(),
                b(this).hasClass("ativo") &&
                  (function (p) {
                    p.find(".box-dica").removeAttr("disabled"),
                      p.find(".box-dica").removeClass("btinativo");
                    var f = {
                      selecionadas: [],
                      corretas: [],
                    };
                    u.find(".botao-ok").removeClass("ativo").addClass("off"),
                      u.find(".alternativa").addClass("inativa"),
                      u.find(".alternativa").prop("disabled", "1");
                    var h = 0;
                    u.find(".questoes .questao").each(function (t) {
                      var i = b(this),
                        e = b(this).data("tipo") || "checkbox",
                        o = b(this).find(".alternativa.selecionado"),
                        s = b(this).find(".alternativa").not(".selecionado"),
                        a = b(this).find(".alternativa");
                      if (!o.length) return !1;
                      switch (e) {
                        case "checkbox":
                          var n = 0,
                            d = 0;
                          o.each(function (t) {
                            b(this).data("ok") || 1 == b(this).val()
                              ? (n++, b(this).addClass("acerto"))
                              : (d++,
                                b(this)
                                  .removeClass("selecionado")
                                  .addClass("erro"));
                          }),
                            s.each(function (t) {
                              b(this).data("ok") || 1 == b(this).val()
                                ? (d++, b(this).addClass("acerto-2"))
                                : n++;
                            }),
                            a.each(function (t) {
                              b(this).hasClass("selecionado") &&
                                f.selecionadas.push(t + 1),
                                b(this).data("ok") && f.corretas.push(t + 1);
                            }),
                            0 === d
                              ? u.feedback("acerto", p, f)
                              : 0 < n &&
                                p.find(".feedbacks .feedback-neutro").length
                              ? u.feedback("neutro", p, f)
                              : (0 !== n &&
                                  p.find(".feedbacks .feedback-neutro")
                                    .length) ||
                                u.feedback("erro", p, f);
                          var r = v(u);
                          i.append(r), r[0].focus();
                          break;
                        case "radio":
                          1 == o.data("ok")
                            ? i.feedback("acerto", p, f)
                            : i.feedback("erro", p, f),
                            o.data("feed") &&
                              b("#" + o.data("feed")).removeClass("d-none"),
                            a.each(function (t) {
                              b(this).hasClass("selecionado") &&
                                (f.selecionadas.push(t + 1),
                                b(this).data("ok") ||
                                  b(this)
                                    .removeClass("selecionado")
                                    .addClass("erro")),
                                b(this).data("ok") &&
                                  (f.corretas.push(t + 1),
                                  b(this).hasClass("selecionado"),
                                  b(this).addClass("acerto"),
                                  b(".pergunta").addClass("acerto"));
                            });
                          r = v(u);
                          i.append(r), r[0].focus();
                          break;
                        case "vf":
                          b(this).addClass("showfeedback"),
                            b(this).find(".feedback-resp").show(),
                            b(".feedbak-unico").addClass("ativo"),
                            1 == o.data("ok")
                              ? (b(this).addClass("acerto"),
                                o.addClass("acerto"),
                                h++)
                              : (b(this).addClass("erro"), o.addClass("erro")),
                            t == u.find(".questoes .questao").length - 1 &&
                              (h > u.find(".questoes .questao").length / 2
                                ? u.feedback("acerto", p)
                                : u.feedback("erro", p));
                          var l = "Sua resposta: ";
                          "F" ==
                          b(this).find("input:checked").val().toUpperCase()
                            ? (l += "Falso")
                            : (l += "Verdadeiro");
                          var c =
                              "F" ==
                              b(this)
                                .find("input[data-ok=1]")
                                .val()
                                .toUpperCase()
                                ? "Falso"
                                : "Verdadeiro",
                            r = b(
                              "<div class='sr-only'>" +
                                (l += ". Resposta correta: " + c + ".") +
                                "</div>"
                            );
                          i.find(".feedback-resp").length
                            ? r.insertBefore(i.find(".feedback-resp"))
                            : r.insertAfter(i.find("p").last());
                      }
                    }),
                      u.find("h5").length
                        ? setTimeout(() => {
                            u.find("h5")[0].focus();
                          }, 1e3)
                        : u.find("[data-feedback='1']").length
                        ? setTimeout(() => {
                            u.find("[data-feedback='1']")[0].focus();
                          }, 1e3)
                        : (b(
                            "<h5 tabindex='0' class='sr-only'>Veja o gabarito a seguir:</h5>"
                          ).prependTo(u.find(".questoes").first()),
                          setTimeout(() => {
                            u.find("h5")[0].focus();
                          }, 1e3));
                  })(i);
            }));
      }),
      (b.fn.feedback = function (t, i) {
        var e = b(this),
          o = b(this).find(".feedbacks .feedback-" + t);
        i.trigger("interaction-done"),
          b(window).resize(),
          o.length &&
            (e.find(".feedbacks").addClass("ativo"), o.addClass("ativo")),
          e.trigger("fimQuestionario");
      }),
      (b.fn.atividadeCores = function (i) {
        var e;
        function t(t) {
          t =
            e.find(".botao-cores-container").scrollLeft() +
            t * e.find(".botao-costura").outerWidth();
          e.find(".botao-cores-container").stop().animate(
            {
              scrollLeft: t,
            },
            400
          );
          e.find(".botao-cores-container")[0].scrollWidth,
            e.find(".botao-cores-container").width();
        }
        b(this).length &&
          ((e = b(this)),
          b(this)
            .find(".botao-costura")
            .each(function () {
              b(this).bind("click", function (t) {
                t.preventDefault(),
                  (function (t) {
                    e.find(".trecho").removeClass("ativo"),
                      e.find(".trecho." + t).addClass("ativo");
                    t =
                      e
                        .find(".trecho." + t + ".ativo")
                        .first()
                        .offset().top -
                      i.find(".content-container").offset().top -
                      20;
                    i.animate(
                      {
                        scrollTop: t,
                      },
                      2e3
                    );
                  })(b(this).data("cor"));
              });
            }),
          b(this)
            .find(".seta.seta-esquerda")
            .bind("click", function () {
              t(-1);
            }),
          b(this)
            .find(".seta.seta-direita")
            .bind("click", function () {
              t(1);
            }),
          e.find(".botao-cores-container").bind("scroll", function (t) {
            !(function () {
              var t = e.find(".botao-cores-container").scrollLeft();
              e.find(".botao-cores-container")[0].scrollWidth -
                t -
                e.find(".botao-cores-container").width() <=
              0
                ? e.find(".seta.seta-direita").addClass("inativo")
                : e.find(".seta.seta-direita").removeClass("inativo");
              t <= 0
                ? e.find(".seta.seta-esquerda").addClass("inativo")
                : e.find(".seta.seta-esquerda").removeClass("inativo");
            })();
          }));
      }),
      (b.fn.atividadeAssociacao = function (l) {
        if (b(this).length) {
          var c = b(this),
            o = [],
            i = 0;
          if (
            (b(this)
              .find(".botoes-cores.esquerda .botao-costura")
              .each(function () {
                b(this).bind("click", function (t) {
                  t.preventDefault(), s(b(this), "esquerda");
                });
              }),
            setTimeout(function () {
              c.find(".botao-costura").each(function (t) {
                b(this).height() > i && (i = b(this).height());
              }),
                c.find(".botao-costura").height(i + 36);
            }, 10),
            (ordenaEl = !0),
            null != b(this).data("ordena") &&
              (ordenaEl = b(this).data("ordena")),
            ordenaEl)
          ) {
            var t = sorteia(
              b(this).find(".botoes-cores.direita .botao-costura")
            );
            b(this)
              .find(".botoes-cores.direita .botao-costura")
              .each(function () {
                o.push(b(this)), b(this).remove();
              });
            for (var e = 0; e < t.length; e++)
              b(this).find(".botoes-cores.direita").append(o[t[e]]);
          } else {
            t = b(this).find(".botoes-cores.direita .botao-costura");
            b(this)
              .find(".botoes-cores.direita .botao-costura")
              .each(function () {
                o.push(b(this)), b(this).remove();
              });
            for (e = 0; e < t.length; e++)
              b(this).find(".botoes-cores.direita").append(t[e]);
          }
          b(this)
            .find(".botoes-cores.direita .botao-costura")
            .each(function () {
              b(this).bind("click", function (t) {
                t.preventDefault(), s(b(this), "direita");
              });
            });
        }
        function s(t, i) {
          t.hasClass("selecionado") ||
            (1 == c.find(".botoes-cores." + i).find(".selecionado").length &&
              c
                .find(".botoes-cores." + i)
                .find(".selecionado")
                .removeClass("selecionado")),
            t.toggleClass("selecionado"),
            2 == c.find(".botoes-cores").find(".selecionado").length &&
              ((t = t),
              c
                .find(".botoes-cores")
                .find(".botao-costura")
                .removeClass("shake"),
              b(c.find(".botoes-cores").find(".selecionado")[0]).data("id") ==
              b(c.find(".botoes-cores").find(".selecionado")[1]).data("id")
                ? (a(b(c.find(".botoes-cores").find(".selecionado")[0]), 0),
                  a(b(c.find(".botoes-cores").find(".selecionado")[1]), 1),
                  c.find(".boxes-resposta").addClass("ativo"),
                  setTimeout(function () {
                    c.find(".cover").addClass("ativo");
                  }, 10),
                  setTimeout(function () {
                    l.find(".container").offset().top,
                      c.find(".boxes-resposta").offset().top,
                      l.height(),
                      l[0].scrollTop;
                    setTimeout(function () {
                      c
                        .find(".boxes-resposta")
                        .find(".botao-costura.selecionado")
                        .addClass("bye"),
                        c.find(".cover").removeClass("ativo"),
                        setTimeout(function () {
                          c.find(".boxes-resposta").removeClass("ativo"),
                            c
                              .find(".boxes-resposta")
                              .find(".botao-costura.bye")
                              .remove();
                        }, 1e3),
                        c.find(".botoes-cores").find(".botao-costura.off")
                          .length ==
                        c.find(".botoes-cores").find(".botao-costura").length
                          ? (function () {
                              setTimeout(function () {}, 300);
                              for (
                                var t = [], i = 0;
                                i < c.find(".direita .botao-costura").length;
                                i++
                              )
                                t.push(
                                  c.find(
                                    ".direita .botao-costura[data-id='" +
                                      (i + 1) +
                                      "']"
                                  )
                                );
                              c.find(".direita .botao-costura").remove();
                              for (i = 0; i < o.length; i++) {
                                var e = b(t[i]);
                                e.addClass("selecionado tela-final"),
                                  e.removeClass("off"),
                                  c.find(".direita").append(e);
                              }
                              c
                                .find(".esquerda .botao-costura")
                                .removeClass("off")
                                .addClass("selecionado tela-final"),
                                c.find(".botao-costura").unbind(),
                                c
                                  .find(".botao-costura")
                                  .addClass("selecionado"),
                                c.trigger("fimQuestionario");
                            })()
                          : c
                              .find(".botoes-cores")
                              .find(".selecionado")
                              .removeClass("selecionado");
                    }, 800);
                  }, 1e3))
                : t.addClass("shake"));
        }
        function a(t, i) {
          var e = t.clone(!1);
          e.children("span").css("opacity", "1");
          var o = t.offset().top - c.offset().top,
            s = t.offset().left - c.offset().left,
            a = t.outerWidth(),
            n = t.outerHeight(),
            d =
              0 == i
                ? c.width() / 2 - t.width() - (a - t.width()) - 15
                : c.width() / 2 + (a - t.width()) / 2 + 15,
            r =
              l.find(".container").offset().top -
              c.find(".boxes-resposta").offset().top +
              l.height() / 2 +
              l[0].scrollTop -
              t.outerHeight() / 2;
          e.addClass("gabarito"),
            e.css({
              top: o,
              left: s,
              width: a,
              height: n,
            }),
            c.find(".boxes-resposta").append(e),
            t.addClass("off visible selecionado").unbind(),
            setTimeout(function () {
              e.css({
                top: r,
                left: d,
              });
            }, 300),
            setTimeout(function () {}, 600);
        }
      }),
      (b.fn.atividadeAssociacaoNumeros = function (l) {
        if (b(this).length) {
          var c = b(this),
            o = [],
            i = 0;
          if (
            (b(this)
              .find(".botoes-cores.esquerda .botao-cor")
              .each(function (t) {
                b(this).bind("click", function (t) {
                  t.preventDefault(), s(b(this), "esquerda");
                });
              }),
            b(this)
              .find(".botao-cor")
              .each(function (t) {
                b(this).height() > i && (i = b(this).height());
              }),
            b(this)
              .find(".botao-cor")
              .height(i + 36),
            (ordenaEl = !0),
            null != b(this).data("ordena") &&
              (ordenaEl = b(this).data("ordena")),
            ordenaEl)
          ) {
            var t = sorteia(b(this).find(".botoes-cores.esquerda .botao-cor"));
            b(this)
              .find(".botoes-cores.esquerda .botao-cor")
              .each(function () {
                o.push(b(this)), b(this).remove();
              });
            for (var e = 0; e < t.length; e++)
              b(this).find(".botoes-cores.esquerda").append(o[t[e]]);
          }
          b(this)
            .find(".botoes-cores.direita .botao-cor")
            .each(function () {
              b(this).bind("click", function (t) {
                t.preventDefault(), s(b(this), "direita");
              });
            });
        }
        function s(t, i) {
          t.hasClass("selecionado") ||
            (1 == c.find(".botoes-cores." + i).find(".selecionado").length &&
              c
                .find(".botoes-cores." + i)
                .find(".selecionado")
                .removeClass("selecionado")),
            t.toggleClass("selecionado"),
            2 == c.find(".botoes-cores").find(".selecionado").length &&
              ((t = t),
              c.find(".botoes-cores").find(".botao-cor").removeClass("shake"),
              b(c.find(".botoes-cores").find(".selecionado")[0]).data("id") ==
              b(c.find(".botoes-cores").find(".selecionado")[1]).data("id")
                ? (a(b(c.find(".botoes-cores").find(".selecionado")[0]), 0),
                  a(b(c.find(".botoes-cores").find(".selecionado")[1]), 1),
                  c.find(".boxes-resposta").addClass("ativo"),
                  setTimeout(function () {
                    c.find(".cover").addClass("ativo");
                  }, 10),
                  setTimeout(function () {
                    l.find(".container").offset().top,
                      c.find(".boxes-resposta").offset().top,
                      l.height(),
                      l[0].scrollTop;
                    setTimeout(function () {
                      c
                        .find(".boxes-resposta")
                        .find(".botao-cor.selecionado")
                        .addClass("bye"),
                        c.find(".cover").removeClass("ativo"),
                        setTimeout(function () {
                          c.find(".boxes-resposta").removeClass("ativo"),
                            c
                              .find(".boxes-resposta")
                              .find(".botao-cor.bye")
                              .remove();
                        }, 1e3),
                        c.find(".botoes-cores").find(".botao-cor.off").length ==
                        c.find(".botoes-cores").find(".botao-cor").length
                          ? (function () {
                              setTimeout(function () {}, 300);
                              for (
                                var t = [], i = 0;
                                i < c.find(".esquerda .botao-cor").length;
                                i++
                              )
                                t.push(
                                  c.find(
                                    ".esquerda .botao-cor[data-id='" +
                                      (i + 1) +
                                      "']"
                                  )
                                );
                              c.find(".esquerda .botao-cor").remove();
                              for (i = 0; i < o.length; i++) {
                                var e = b(t[i]);
                                e.addClass("selecionado tela-final"),
                                  e.removeClass("off"),
                                  c.find(".esquerda").append(e);
                              }
                              c
                                .find(".direita .botao-cor")
                                .removeClass("off")
                                .addClass("selecionado tela-final"),
                                c.find(".botao-cor").unbind(),
                                c.find(".botao-cor").addClass("selecionado"),
                                c.find(".col-ponto").hide(0, function () {
                                  b(this).addClass("esconde");
                                }),
                                c
                                  .find(".col-grafico")
                                  .addClass("l100pc lmin100pc")
                                  .removeClass("l75pc lmin70pc"),
                                c.trigger("fimQuestionario");
                            })()
                          : c
                              .find(".botoes-cores")
                              .find(".selecionado")
                              .removeClass("selecionado");
                    }, 800);
                  }, 1e3))
                : t.addClass("shake"));
        }
        function a(t, i) {
          var e = t.clone(!1);
          e.children("span").css("opacity", "1");
          var o = t.offset().top - c.offset().top,
            s = t.offset().left - c.offset().left,
            a = t.outerWidth(),
            n = t.outerHeight(),
            d =
              0 == i
                ? c.width() / 2 - t.width() - (a - t.width()) - 15
                : c.width() / 2 + (a - t.width()) / 2 + 15,
            r =
              l.find(".container").offset().top -
              c.find(".boxes-resposta").offset().top +
              l.height() / 2 +
              l[0].scrollTop -
              t.outerHeight() / 2;
          e.addClass("gabarito"),
            e.css({
              top: o,
              left: s,
              width: a,
              height: n,
            }),
            c.find(".boxes-resposta").append(e),
            t.addClass("off visible selecionado").unbind(),
            setTimeout(function () {
              e.css({
                top: r,
                left: d,
              });
            }, 300),
            setTimeout(function () {}, 600);
        }
      }),
      (b.fn.atividadePopup = function (n) {
        var d, r, e, l, a, c, p, f;
        function h() {
          var e = b("<div class='gabarito atividade'></div>");
          d.find("[data-id]").each(function () {
            var t = b(this).clone(!1);
            t.find(".respostas").addClass("ativo"),
              t.find(".resposta").remove(),
              t.find(".clique-aqui").remove(),
              e.append(t);
            var i = b(this).data("id"),
              i =
                "multipla" == f
                  ? n.find(".popup [data-destino='" + i + "']")
                  : n.find(".popup [data-alternativa-popup='" + i + "']");
            i.removeClass().addClass("resposta box-texto costura"),
              t.find(".respostas").append(i.clone(!1));
          });
          var t = b("<div><h3>Confira as respostas corretas:</h3></div>");
          t.append(e),
            t.addClass("popup-branco"),
            n.trigger("openDynamicPopup", t),
            n.unbind("fechaPopup");
        }
        b(this).length &&
          ((d = b(this)),
          (l = []),
          (a = []),
          (p = n.find(".box-texto[data-alternativa-popup]")),
          (f = b(this).data("tipo") || "unica"),
          b(this)
            .find("[data-popup]")
            .each(function (t) {
              b(this).attr("data-id", t);
              var i = b("<div class='respostas'></div>");
              b(this).append(i), "multipla" == f && (l[t] = []);
            }),
          n.find(".botao-ok").bind("click", function (t) {
            t.preventDefault(),
              b(this).hasClass("inativo") ||
                (function () {
                  var t = 0;
                  if ("multipla" == f) {
                    for (var i = 0; i < l.length; i++)
                      for (var e = 0; e < l[i].length; e++) {
                        var o = b(p[l[i][e]]).attr("data-destino"),
                          s = d.find("[data-id='" + o + "'] .respostas");
                        o == i
                          ? (t++,
                            d
                              .find(
                                "[data-id='" +
                                  i +
                                  "'] .respostas .resposta[data-bt='" +
                                  l[i][e] +
                                  "']"
                              )
                              .addClass("acerto"))
                          : (s.addClass("ativo"),
                            d
                              .find(
                                "[data-id='" +
                                  i +
                                  "'] .respostas .resposta[data-bt='" +
                                  l[i][e] +
                                  "']"
                              )
                              .addClass("erro"));
                      }
                    t == p.length
                      ? (d.feedback("acerto", n),
                        n.find(".txt-bt-completo").removeClass("ativo"))
                      : ((a = b(
                          "<button class='botao-gabarito mb20'>Ver gabarito</button>"
                        )).bind("click", function (t) {
                          t.preventDefault(), h();
                        }),
                        d.append(a),
                        n.find(".txt-bt-completo").removeClass("ativo"),
                        n.find(".txt-bt-gabarito").addClass("ativo"),
                        d.feedback("erro", n));
                  } else if ("unica" == f) {
                    for (var a, i = 0; i < l.length; i++) {
                      (o = parseInt(
                        b(d.find(".box-popup")[i]).attr("data-id"),
                        10
                      )),
                        (s = d.find("[data-id='" + o + "'] .respostas"));
                      o == l[i]
                        ? (t++,
                          d
                            .find(
                              "[data-id='" +
                                i +
                                "'] .respostas .resposta[data-bt='" +
                                l[i] +
                                "']"
                            )
                            .addClass("acerto"))
                        : d
                            .find(
                              "[data-id='" +
                                i +
                                "'] .respostas .resposta[data-bt='" +
                                l[i] +
                                "']"
                            )
                            .addClass("erro");
                    }
                    t == p.length
                      ? (n.find(".txt-bt-completo").removeClass("ativo"),
                        d.feedback("acerto", n))
                      : ((a = b(
                          "<a href='#' class='botao-gabarito mb20'><div class='brilho'></div>Ver gabarito</a>"
                        )).bind("click", function (t) {
                          t.preventDefault(), h();
                        }),
                        d.append(a),
                        n.find(".txt-bt-completo").removeClass("ativo"),
                        n.find(".txt-bt-gabarito").addClass("ativo"),
                        d.feedback("erro", n));
                  }
                  d.find(".box-texto, .box-popup").addClass("inativo"),
                    d.find(".box-texto, .box-popup").unbind(),
                    d.find(".clique-aqui").addClass("OFF"),
                    setTimeout(function () {
                      d.find(".clique-aqui").remove();
                    }, 400);
                })();
          }),
          n.bind("abrePopupInterativo", function (t, i) {
            var s;
            (c = null),
              (s = e = i),
              (r = n.find(".pop .cont-popup"))
                .find("[data-alternativa-popup]")
                .each(function (t) {
                  b(this).addClass(f);
                  var i = parseInt(b(this).attr("data-alternativa-popup"), 10);
                  if ("multipla" == f)
                    if (-1 != l[s].indexOf(i) || a[s] == i)
                      b(this).addClass("selecionado");
                    else {
                      var e = !1;
                      -1 != a.indexOf(i) && (e = !0);
                      for (var o = 0; o < l.length; o++)
                        -1 !== l[o].indexOf(i) && (e = !0);
                      e && b(this).addClass("escolhido");
                    }
                  else
                    a[s] == i
                      ? (b(this).addClass("selecionado"), (c = i))
                      : ((e = !1),
                        -1 != a.indexOf(i) && b(this).addClass("escolhido"));
                  b(this).bind("click", function (t) {
                    t.preventDefault(),
                      b(this).hasClass("escolhido") ||
                        (function (t, i) {
                          var e = parseInt(
                            t.attr("data-alternativa-popup"),
                            10
                          );
                          {
                            var o;
                            "multipla" == f
                              ? -1 == (o = parseInt(l[i].indexOf(e), 10))
                                ? (l[i].push(e), t.addClass("selecionado"))
                                : (l[i].splice(o, 1),
                                  t.removeClass("selecionado"))
                              : "unica" == f &&
                                (r
                                  .find(".box-texto.selecionado")
                                  .removeClass("selecionado"),
                                c == e
                                  ? ((a[i] = null),
                                    (c = null),
                                    t.removeClass("selecionado"))
                                  : ((a[i] = parseInt(e, 10)),
                                    (c = parseInt(e, 10)),
                                    t.addClass("selecionado")));
                          }
                          (c || l.length) &&
                            r.find(".botao-ok").removeClass("inativo");
                        })(b(this), s);
                  });
                }),
              r.find(".botao-ok").bind("click", function (t) {
                b(this).hasClass("inativo") ||
                  r.find(".fechar").trigger("click");
              });
          }),
          n.bind("fechaPopup", function (t) {
            !(function (t) {
              if (
                (d.find("[data-id='" + t + "'] .respostas").html(""),
                "multipla" == f)
              ) {
                var i =
                    "<div class='resposta box-texto costura'><blockquote></blockquote></div>",
                  e = d.find("[data-id='" + t + "']").attr("data-popup");
                if (0 < l[t].length) {
                  d.find("[data-id='" + t + "'] .respostas").addClass("ativo");
                  for (var o = 0; o < l[t].length; o++)
                    (a = b(i)).attr("data-bt", l[t][o]),
                      a.find("blockquote").html(
                        n
                          .find(e)
                          .find(
                            "[data-alternativa-popup='" +
                              parseInt(l[t][o], 10) +
                              "'] blockquote"
                          )
                          .html()
                      ),
                      d.find("[data-id='" + t + "'] .respostas").append(a);
                } else
                  d.find("[data-id='" + t + "'] .respostas").removeClass(
                    "ativo"
                  );
                for (var s = 0, o = 0; o < l.length; o++) s += l[o].length;
                s == r.find(".box-texto").length
                  ? (n.find(".botao-ok").removeClass("inativo"),
                    n.find(".txt-bt-incompleto").addClass("inativo"),
                    n.find(".txt-bt-completo").addClass("ativo"))
                  : (n.find(".botao-ok").addClass("inativo"),
                    n.find(".txt-bt-incompleto").removeClass("inativo"),
                    n.find(".txt-bt-completo").removeClass("ativo"));
              } else if ("unica" == f) {
                var a;
                null != c
                  ? ((i =
                      "<div class='resposta box-texto costura'><blockquote></blockquote></div>"),
                    (e = d.find("[data-id='" + t + "']").attr("data-popup")),
                    d
                      .find("[data-id='" + t + "'] .respostas")
                      .addClass("ativo"),
                    (a = b(i)).attr("data-bt", c),
                    a.find("blockquote").html(
                      n
                        .find(e)
                        .find("[data-alternativa-popup='" + c + "'] blockquote")
                        .html()
                    ),
                    d.find("[data-id='" + t + "'] .respostas").append(a),
                    (l[t] = c))
                  : (d
                      .find("[data-id='" + t + "'] .respostas")
                      .removeClass("ativo"),
                    (l[t] = null));
                for (s = 0, o = 0; o < l.length; o++)
                  null != l[o] && null != l[o] && s++;
                s == r.find(".box-texto").length
                  ? (n.find(".botao-ok").removeClass("inativo"),
                    n.find(".txt-bt-incompleto").addClass("inativo"),
                    n.find(".txt-bt-completo").addClass("ativo"))
                  : (n.find(".botao-ok").addClass("inativo"),
                    n.find(".txt-bt-incompleto").removeClass("inativo"),
                    n.find(".txt-bt-completo").removeClass("ativo"));
              }
            })(e);
          }));
      }),
      (b.fn.atividadePopupAvaliacao = function (d) {
        var r, s, o, l, a, n, c;
        b(this).length &&
          ((r = b(this)),
          (l = []),
          (a = []),
          (c = d.find(".box-texto[data-alternativa-popup]")),
          b(this)
            .find("[data-popup]")
            .each(function (t) {
              b(this).attr("data-id", t);
              var i = b("<div class='respostas'></div>");
              b(this).append(i), (l[t] = []);
            }),
          d.find(".botao-ok").bind("click", function (t) {
            b(this).hasClass("inativo") ||
              (function () {
                for (var o = 0, s = 0; s < l.length; s++)
                  for (var a = 0; a < l[s].length; a++) {
                    var t = b(c[l[s][a]]).attr("data-destino").split(",");
                    if ("" == t) return;
                    b.each(t, function (t, i) {
                      var e = r.find("[data-id='" + i + "'] .respostas");
                      i == s
                        ? (o++,
                          r
                            .find(
                              "[data-id='" +
                                s +
                                "'] .respostas .resposta[data-bt='" +
                                l[s][a] +
                                "']"
                            )
                            .addClass("acerto"))
                        : (e.addClass("ativo"),
                          r
                            .find(
                              "[data-id='" +
                                s +
                                "'] .respostas .resposta[data-bt='" +
                                l[s][a] +
                                "']"
                            )
                            .addClass("erro"));
                    });
                  }
                for (var i = 0, a = 0; a < l.length; a++)
                  for (s = 0; s < l[a].length; s++) i++;
                var e = 0;
                {
                  var n;
                  ($popThis = r.data("consulta")),
                    b($popThis)
                      .find("[data-alternativa-popup]")
                      .each(function (t) {
                        var i = b(this).attr("data-destino").split(",");
                        "" != i &&
                          "3" != i &&
                          b.each(i, function (t, i) {
                            e++;
                          });
                      }),
                    o == e && o == i
                      ? r.feedback("acerto", d)
                      : ((n = b(
                          "<a href='#' class='botao-gabarito mt0 mb20'>Ver gabarito</a>"
                        )).bind("click", function (t) {
                          t.preventDefault(),
                            (function () {
                              var t = b(
                                "<div class='gabarito atividade'></div>"
                              );
                              r.find("[data-id]").each(function () {
                                var e = b(this).clone(!1);
                                e.find(".trecho, .feedback").addClass("ativo"),
                                  e.find(".respostas").addClass("ativo"),
                                  e.find(".resposta").remove(),
                                  e.find(".clique-aqui").remove(),
                                  t.append(e);
                                var o = b(this).data("id");
                                d.find(".popup [data-destino]").each(
                                  function () {
                                    var t = b(this)
                                      .attr("data-destino")
                                      .split(",");
                                    "" != t &&
                                      (($thisDestino = b(this)),
                                      b.each(t, function (t, i) {
                                        i == o &&
                                          ((i = $thisDestino)
                                            .removeClass()
                                            .addClass("resposta box-texto"),
                                          e
                                            .find(".respostas")
                                            .append(i.clone(!1)));
                                      }));
                                  }
                                );
                              });
                              var i = b(
                                "<div><h3>Confira as respostas corretas:</h3></div>"
                              );
                              i.append(t),
                                i.addClass("popup-branco"),
                                d.trigger("openDynamicPopup", i),
                                d.unbind("fechaPopup");
                            })();
                        }),
                        r.append(n),
                        r.feedback("erro", d));
                }
                r.find(".box-texto, .box-popup").addClass("inativo"),
                  r.find(".box-texto, .box-popup").unbind(),
                  r.find(".clique-aqui").addClass("OFF"),
                  setTimeout(function () {
                    r.find(".clique-aqui").remove();
                  }, 400);
              })();
          }),
          d.bind("abrePopupInterativo", function (t, i) {
            var e;
            (n = null),
              (e = o = i),
              (s = d.find(".pop .cont-popup"))
                .find("[data-alternativa-popup]")
                .each(function (t) {
                  var i = parseInt(b(this).attr("data-alternativa-popup"), 10);
                  (-1 == l[e].indexOf(i) && a[e] != i) ||
                    b(this).addClass("selecionado"),
                    b(this).bind("click", function (t) {
                      t.preventDefault(),
                        b(this).hasClass("escolhido") ||
                          (function (t, i) {
                            var e = parseInt(
                                t.attr("data-alternativa-popup"),
                                10
                              ),
                              o = parseInt(l[i].indexOf(e), 10);
                            -1 == o
                              ? (l[i].push(e), t.addClass("selecionado"))
                              : (l[i].splice(o, 1),
                                t.removeClass("selecionado"));
                            (n || l.length) &&
                              s.find(".botao-ok").removeClass("inativo");
                          })(b(this), e);
                    });
                }),
              s.find(".botao-ok").bind("click", function (t) {
                b(this).hasClass("inativo") ||
                  s.find(".fechar").trigger("click");
              });
          }),
          d.bind("fechaPopup", function (t) {
            !(function (t) {
              r.find("[data-id='" + t + "'] .respostas").html("");
              var i,
                e = r.find("[data-id='" + t + "']").attr("data-popup");
              if (0 < l[t].length) {
                r.find("[data-id='" + t + "'] .respostas").addClass("ativo");
                for (var o = 0; o < l[t].length; o++)
                  (i = b(
                    "<div class='resposta box-texto'><blockquote></blockquote></div>"
                  )).attr("data-bt", l[t][o]),
                    i.find("blockquote").html(
                      d
                        .find(e)
                        .find(
                          "[data-alternativa-popup='" +
                            parseInt(l[t][o], 10) +
                            "'] blockquote"
                        )
                        .html()
                    ),
                    r.find("[data-id='" + t + "'] .respostas").append(i);
              } else r.find("[data-id='" + t + "'] .respostas").removeClass("ativo");
              var s = 0;
              r.find(".box-popup").each(function (t) {
                1 <= b(this).find(".respostas").children().length && s++;
              }),
                s == r.find(".box-popup").length
                  ? d.find(".botao-ok").removeClass("inativo")
                  : d.find(".botao-ok").addClass("inativo");
            })(o);
          }));
      }),
      (b.fn.atividadeFeedback = function (t) {
        var i, e, o, s;
        function a(t) {
          (e = t),
            i.find(".botao-ok").addClass("inativo"),
            i.find(".questao").addClass("inativa"),
            i.find(".questao[data-id=" + t + "]").removeClass("inativa"),
            i
              .find(".botao-popup")
              .removeClass("acerto")
              .removeClass("erro")
              .removeClass("inativo");
        }
        b(this).length &&
          ((i = b(this)),
          (e = 0),
          (o = []),
          b(this)
            .find(".botao-popup")
            .each(function (t) {
              b(this).attr("data-id", t);
            }),
          b(this)
            .find(".botao-popup")
            .bind("click", function (t) {
              t.preventDefault(),
                (t = b(this).data("id")),
                i.find(".botao-popup").removeClass("selecionado"),
                i
                  .find(".botao-popup[data-id=" + t + "]")
                  .addClass("selecionado"),
                i.find(".bt-confirmar").removeClass("inativo"),
                (s = t);
            }),
          b(this)
            .find(".questao")
            .each(function (t) {
              b(this).attr("data-id", t),
                (o[t] = b(this).attr("data-resp")),
                b(this).addClass("inativa");
            }),
          i.find(".bt-confirmar").bind("click", function (t) {
            t.preventDefault(),
              (function () {
                i
                  .find(".questao[data-id=" + e + "]")
                  .find(".feedback")
                  .addClass("ativo"),
                  i.find(".botao-popup").addClass("inativo"),
                  i.find(".bt-confirmar").addClass("inativo"),
                  e < o.length - 1
                    ? i.find(".bt-proxima").removeClass("inativo")
                    : i.find(".botoes-container").addClass("hidden");
                o[e] == s
                  ? i
                      .find(".botao-popup[data-id=" + s + "]")
                      .removeClass("selecionado")
                      .addClass("acerto")
                  : (i
                      .find(".botao-popup[data-id=" + s + "]")
                      .removeClass("selecionado")
                      .addClass("erro"),
                    i
                      .find(".botao-popup[data-id=" + o[e] + "]")
                      .addClass("acerto"));
              })();
          }),
          i.find(".bt-proxima").bind("click", function (t) {
            t.preventDefault(), a(e + 1);
          }),
          a(e));
      }),
      (b.fn.atividadeNotas = function (i) {
        var o = b(this);
        b(this)
          .find(".botoes-ponto")
          .each(function (i) {
            b(this);
            b(this)
              .find("input")
              .each(function (t) {
                b(this).attr("id", String.fromCharCode(65 + i) + t),
                  b(this).attr("name", String.fromCharCode(65 + i)),
                  b(this).attr("value", b(this).next("label").text());
              }),
              b(this)
                .find("label")
                .each(function (t) {
                  b(this).attr("for", String.fromCharCode(65 + i) + t);
                });
          }),
          b(this)
            .find("input[type='radio']")
            .change(function () {
              var e,
                t = b(this).parent();
              t.find(".botao-ponto").each(function () {
                b(this).addClass("disable");
              }),
                t
                  .find("label[for='" + b(this).attr("id") + "']")
                  .removeClass("disable"),
                o.find('input[type="radio"]:checked').length ==
                  o.find("fieldset").length &&
                  (i.find(".botao-popup").removeClass("inativoHdn btinativo"),
                  i.find(".botao-popup").removeAttr("disabled"),
                  i.find(".box-dica").removeAttr("disabled"),
                  i.find(".texto-vez").html(i.find(".interno").text()),
                  (e = new Number()),
                  o.find('input[type="radio"]:checked').each(function (t) {
                    var i = b(this).val();
                    b(".popup").each(function () {
                      b(this).find(".pts_cursista").eq(t).html(i);
                    }),
                      (e += parseFloat(b(this).val().replace(",", ".")));
                  }),
                  b(".pts_pontuacao").html(e.toString().replace(".", ",")));
            });
      }),
      (b.fn.atividadeAlternativas = function (o) {
        var s, a;
        b(this).length &&
          ((s = b(this)),
          b(this)
            .find(".pergunta")
            .each(function (t) {
              b(this).attr("data-id", t);
            }),
          b(this)
            .find(".pergunta")
            .bind("click", function (t) {
              t.preventDefault(),
                (t = b(this).attr("data-id")),
                s.find(".pergunta").removeClass("selecionado"),
                s.find(".pergunta[data-id=" + t + "]").addClass("selecionado"),
                s.find(".botao-ok").removeClass("inativo"),
                (a = t);
            }),
          s.find(".botao-ok").bind("click", function (t) {
            t.preventDefault(),
              this.hasClass("inativo") ||
                (function () {
                  var t = s
                      .find(".pergunta[data-id=" + a + "]")
                      .find(".feedback-alternativa"),
                    i = t.find("p").html(),
                    e = "erro";
                  a == s.attr("data-resp") &&
                    ((e = "acerto"),
                    s.find(".botao-ok").html("Ver feedback"),
                    s.find(".pergunta").addClass("inativo"));
                  i =
                    '<div class="pop feedback"><div class="cont-popup"><div class="topo"></div><div class="popup-header"><div class="titulo"></div><div class="fechar"></div></div><div class="popup-content"><div class="texto"><h2 class=' +
                    e +
                    ">" +
                    t.find("h2").html() +
                    "</h2><p>" +
                    i +
                    "</p></div></div></div></div>";
                  o.append(i),
                    o.css("overflow", "hidden"),
                    b("body").css("overflow", "hidden"),
                    o.find(".pop, .pop .fechar").bind("click", function () {
                      o.css("overflow", ""),
                        b("body").css("overflow", ""),
                        o.find(".pop").removeClass("aberto"),
                        setTimeout(function () {
                          o.find(".pop").remove();
                        }, 400);
                    }),
                    o.find(".pop .cont-popup").bind("click", function (t) {
                      t.stopPropagation();
                    }),
                    o.find(".pop").css("display"),
                    o.find(".pop").addClass("aberto");
                })();
          }));
      });
  })(jQuery),
  ($.fn.dataelemento = function () {
    var e = $(this);
    $(this)
      .find("[data-elemento]")
      .each(function (t) {
        e.trigger("set-interaction"), $(this).setClickCheck();
      }),
      $(this)
        .find("[data-elemento]")
        .bind("click", function (t) {
          e.trigger("interaction-done"),
            t.preventDefault(),
            $(this).addClass("on");
          var i = $($(this).data("elemento"));
          i.removeClass("hidden"),
            $(".clique-bola").find("[data-elemento].on").length ==
              $(".clique-bola").find("[data-elemento]").length &&
              $(".clique-bola").find(".feedback").addClass("on"),
            setTimeout(function () {
              i.addClass("show");
            }, 10);
        });
  }),
  ($.fn.glossario = function () {
    var o,
      n = $(this);
    function d(t, i, e) {
      (o =
        '<div class="bg-glossario"><div class="glossario"><div class="glossarioCabecalho"><div class="contBtFechar"><a href="#" class="bt-fechar">Fechar Glossário</a></div>' +
        e +
        '</div><div class="contConteudo"><div class="conteudo"><p>' +
        i +
        "</p></div></div></div></div>"),
        n.append(o);
      i = $(t).data("largura");
      void 0 !== i && n.find(".glossario").css("width", i),
        n.find(".glossario .contBtFechar, .bg-glossario").bind("click", s),
        n.find(".bg-glossario .glossario").bind("click", function (t) {
          t.stopPropagation();
        }),
        scrollFormularioConsulteInit(".bg-glossario .conteudo", "light-2"),
        n.css("overflow", "hidden");
      t = $(t).data("tema");
      void 0 !== t && n.find(".bg-glossario").addClass(t),
        setTimeout(function () {
          n.find(".bg-glossario").addClass("aberto"),
            setFocus(n.find(".glossario .contConteudo"));
        }, 50);
    }
    function s(t) {
      t.preventDefault(),
        n.css("overflow", ""),
        n.find(".bg-glossario").removeClass("aberto"),
        setTimeout(function () {
          n.find(".bg-glossario").remove();
        }, 200);
    }
    n.bind("navega", function (t) {
      0 < n.find(".bg-glossario").length && s(t);
    }),
      $(this)
        .find(".bt-glossario, .bt-referencias, .bt-neutro")
        .each(function (t, i) {
          var e, o, s, a;
          n.trigger("set-interaction"),
            $(this).setClickCheck(),
            $(this).attr("title") &&
              ((e = $(this)),
              (o = $(e).attr("title")),
              (s = $(e).data("titulo")),
              (o = $(e).attr("title")),
              (s = $(e).data("titulo")),
              (a = $(e).html()),
              $(e).removeAttr("title"),
              $(e).bind("click", function (t) {
                t.preventDefault(),
                  n.trigger("interaction-done"),
                  $(this).removeClass("pulsar"),
                  d(e, o, s || a),
                  e.hasClass("bt-referencias")
                    ? $(".bg-glossario").addClass("referencias")
                    : e.hasClass("bt-neutro") &&
                      $(".bg-glossario").addClass("neutro");
              }));
        });
  }),
  (function (n) {
    var s = !1;
    (n.fn.interacoes = function (t) {
      t && t.print && (s = !0);
      var i,
        a = n(this),
        e = 0,
        o = 0;
      n(this).attr("data-interaction-count", e),
        n(this).on("set-interaction", function () {
          t.trava && e++, n(this).attr("data-interaction-count", e);
        }),
        n(this).on("interaction-done", function () {
          e <= ++o && n(this).trigger("fimContentTela");
        }),
        n(this).on("ativaTela", function () {
          n(this).addClass("tela-ativa"),
            0 == e &&
              (n(this).addClass("no-interaction-lock"),
              n(this).trigger("fimContentTela")),
            setTimeout(() => {
              a.find(".slides").slick("setPosition");
            }, 100);
        }),
        n(this)
          .find(".link-required")
          .each(function () {
            var t = n(this).html().trim();
            n(this).html(t);
          }),
        a.telasEspeciais(),
        a.btnColocaBlockquote(),
        a.required(),
        a.sanfona(),
        setTimeout(() => {
          a.find(".slides")
            .slick({
              dots: !0,
              centerMode: !1,
              infinite: !0,
              speed: 300,
              lazyLoad: "ondemand",
              slidesToShow: 1,
              adaptiveHeight: !0,
              mobileFirst: !0,
            })
            .on("lazyLoaded", function (t) {});
        }, 10),
        a.find(".card").each(function () {
          var t = n(this),
            i = n(this).closest(".flip-card");
          n(this).hasClass("optional") ||
            i.hasClass("optional") ||
            a.trigger("set-interaction"),
            n(this)
              .closest("label")
              .parent()
              .find("input")
              .on("change", function () {
                a.trigger("interaction-done"),
                  t.addClass("clicou"),
                  n(this).off("change");
              });
        }),
        a.find(".slides").each(function () {
          n(this).hasClass("optional") || a.trigger("set-interaction");
          var s = [];
          n(this).on("beforeChange", function (t, i, e, o) {
            -1 == s.indexOf(o) && s.push(o),
              -1 == s.indexOf(e) && s.push(e),
              s.length == n(this).slick("getSlick").slideCount &&
                a.trigger("interaction-done");
          });
        }),
        a.glossario(),
        a.popup(),
        a.abreAba(),
        a.telaTexto(),
        n(this)
          .find(".btn_play")
          .bind("click", function (t) {
            t.preventDefault(),
              n(this).hasClass("ativo") ||
                (n(this).addClass("ativo"), n(this).attr("data-bt", "1")),
              a.find(".btn_play").each(function () {
                1 == n(this).attr("data-bt")
                  ? n(this).removeAttr("data-bt")
                  : n(this).removeClass("ativo");
              });
          }),
        n(this)
          .find(".clique-aqui-pdf")
          .bind("click", function (t) {
            n(this).find(".clique-aqui").removeClass();
          }),
        n(this).bind("navega", function () {
          n(this)
            .find(".btn_play")
            .each(function (t) {
              n(this).hasClass("ativo") &&
                angular.element(n(this)[0]).triggerHandler("click");
            });
        }),
        n(this).find(".tela-imagem").length
          ? ((i = n(this).find(".tela-imagem").attr("data-image")),
            a
              .find(".content-container")
              .css("background-image", "url(" + i + ")"))
          : a.find(".content-container").css("background-image", ""),
        n(this).find(".tela-cor").length
          ? ((i = n(this).find(".tela-cor").attr("data-cor")),
            a.find(".content-container").css("background-color", i))
          : a.find(".content-container").css("background-color", ""),
        n(this).dataelemento(),
        n(this)
          .find(".pulsar")
          .bind("click", function (t) {
            n(this).removeClass("pulsar");
          }),
        n(this).on("fimPagina", function () {
          a.trigger("fimContentTela");
        }),
        a.find(".required").each(function () {
          n(this).hasClass("optional") || a.trigger("set-interaction"),
            n(this).on("click", function () {
              n(this).hasClass("clicou") ||
                (a.trigger("interaction-done"), n(this).addClass("clicou"));
            });
        }),
        a.find("._link-externo").each(function () {
          n(this).hasClass("optional") || a.trigger("set-interaction"),
            n(this).on("click", function () {
              n(this).hasClass("clicou") ||
                (a.trigger("interaction-done"), n(this).addClass("clicou"));
            });
        }),
        n(this).animacoes();
    }),
      (n.fn.telaTexto = function () {
        n(this)
          .find(".tela-texto")
          .removeClass("tela-texto")
          .parent()
          .parent()
          .addClass("tela-texto");
      }),
      (n.fn.clicou = function () {
        n(this).removeClass("pulsar"),
          n(this).hasClass("required") || n(this).addClass("clicou"),
          n(this).closest(".item-clicou").addClass("clicou");
      }),
      (n.fn.setClickCheck = function () {}),
      (n.fn.btnColocaBlockquote = function () {
        var e, o, s;
        n(this)
          .find(
            ".item-bt, .box-texto, .box-citacao, .box-dialogo, .box-atencao, .box-estante, .box-na-pratica, .box-aspas, .box-popup, .box-pdf, .box-audio, .botao-video"
          )
          .each(function (t, i) {
            (e = n(this)),
              (o =
                e.hasClass("box-popup") ||
                e.hasClass("box-pdf") ||
                e.hasClass("box-audio")
                  ? '<div class="clique-aqui pulsar"></div>'
                  : ""),
              (s = ""),
              e.hasClass("checkbox") && (s += '<div class="selection"></div>'),
              (o =
                s +
                "<blockquote>" +
                o +
                '<div class="">' +
                e.html() +
                "</div></blockquote>"),
              e.html(""),
              e.html(o);
          });
      }),
      (n.fn.telasEspeciais = function () {
        var i,
          t = n(this);
        if (!s)
          if (0 < t.find("[data-tela]").length) {
            n("#telas-especiais").addClass("ativa");
            var e,
              o = t.find("[data-tela]").first().data("tela");
            switch (o) {
              case "voce-no-centro":
                i = n("#voce-no-centro");
                break;
              case "nossa-prosa":
                i = n("#nossa-prosa");
                break;
              case "de-la-pra-ca":
                i = n("#de-la-pra-ca");
                break;
              case "inspiracao":
                i = n("#inspiracao");
                break;
              default:
                i = n("#" + o);
            }
            s ||
              (n("#telas-especiais .tela-especial").removeClass("ativa"),
              "atividade" != o
                ? ((e = t.find("[data-tela]").html()),
                  i.find(".tela-especial-content").html(e),
                  t.find(".content-container").html(""),
                  i.interacoes())
                : i.find(".bt-iniciar").bind("click", function (t) {
                    t.preventDefault(),
                      n("#telas-especiais").removeClass("ativa"),
                      i.removeClass("ativa");
                  }),
              i.addClass("ativa"));
          } else
            n(this).hasClass("tela") &&
              (s ||
                (n("#telas-especiais").removeClass("ativa"),
                n(".tela-especial").removeClass("ativa")));
      });
  })(jQuery),
  ($.fn.popup = function () {
    var s,
      a,
      n,
      d,
      i,
      e,
      r = $(this),
      l = r;
    function c(t, i, e, o, s) {
      (a =
        "popup-pdf" == i
          ? ((n =
              '<a href="../assets/pdf/' +
              e +
              '" target="_blank" class="botao-popup"><div class="clique-interno"><div class="clique-aqui pulsar"></div></div><p>Download do texto</p><div class="ico"></div></a>'),
            t.html())
          : "popup-audio" == i
          ? ((n =
              '<div class="botao-popup"><p>ouça a leitura</p><div class="ico"></div></div><audio class="box-audio"><source src="../src/assets/audio/' +
              e +
              '"type="audio/mpeg"></audio>'),
            t.html())
          : (a = t.clone(!0)).find("h2").length
          ? ((n =
              "<h2 class='titulo-redondo cor1'>" +
              a.find("h2").html() +
              "</h2>"),
            a.find("h2").remove(),
            a.html())
          : ((n = ""), t.html())),
        (n = $(
          '<div class="pop"><div class="cont-popup"><div class="popup-header">' +
            n +
            '<a href="#" class="bt-fechar-popup">Fechar Modal</a></div><div class="popup-content">' +
            a +
            "</div></div></div>"
        )),
        i && (n.attr("data-tema", i), n.addClass(i)),
        (l = $("#wrapper"));
      var a = $(n);
      l.append(a),
        a.interacoes(),
        n.addClass(i),
        void 0 !== (s = s || t.data("largura")) &&
          l.find(".pop .cont-popup").css("width", s),
        l.css("overflow", "hidden"),
        l.find(".pop .bt-fechar-popup").on("click", function (t) {
          t.preventDefault(), p(o);
        }),
        l.find(".pop .cont-popup").on("click", function (t) {
          t.stopPropagation();
        }),
        l.find(".pop").css("display"),
        l.find(".pop").addClass("aberto"),
        $(".popup-pdf")
          .find(".botao-popup")
          .bind("click", function (t) {
            $(this).find(".clique-interno").addClass("OFF"),
              $(this).removeClass("pulsar");
          }),
        l.find(".pop").find("[data-alternativa-popup]").length &&
          !l.find(".pop .gabarito").length &&
          l.trigger("abrePopupInterativo", o.data("id")),
        $("#menu").hasClass("ativo") && $("#bt-menu").trigger("click");
    }
    function p(t) {
      l.css("overflow", ""),
        (i = $("[data-popup]").length),
        (e = $(".clicou").length),
        i == e &&
          ($(".popup-feedback-cotent").addClass("on"),
          l.find(".feedback").addClass("on")),
        $("body").removeClass("modal-open"),
        l.find(".pop").removeClass("aberto"),
        $(t).find(".clique-aqui").addClass("OFF"),
        setTimeout(function () {
          l.find(".pop").remove(), $(t).find(".clique-aqui").remove();
        }, 400),
        l.trigger("fechaPopup");
    }
    r.bind("navega", function () {
      0 < r.find(".pop").length && p();
    }),
      $(this)
        .find(".popup[data-auto]")
        .each(function () {
          (d = $(this).attr("id")), (s = $(this)), (a = s.clone(!1));
          var t = $(this).attr("data-tema"),
            i = $(this).attr("data-link"),
            e = $(this).attr("data-largura");
          c(a, t, i, "", e);
        }),
      $(this)
        .find("[data-popup]")
        .each(function () {
          $(this).hasClass("optional") ||
            $(this).hasClass("required") ||
            r.trigger("set-interaction");
        }),
      $(this)
        .find("[data-popup]")
        .on("click", function (t) {
          t.preventDefault(),
            $(this).hasClass("optional") ||
              $(this).hasClass("required") ||
              r.trigger("interaction-done"),
            $(this).clicou(),
            $(".link-popup").removeClass("pulsar-cor-popup");
          var i = $(this),
            e = i.attr("data-tema"),
            o = i.attr("data-link"),
            t = i.attr("data-largura");
          $(this).hasClass("disabled") ||
            ((d = $(this).data("popup")),
            (s = $(d)),
            (a = s),
            r.find(".pop").remove(),
            i.find(".maozinha").addClass("OFF"),
            $("body").addClass("modal-open"),
            c(a, e, o, i, t));
        }),
      $(this).bind("openDynamicPopup", function (t, i) {
        s = $(i);
        $(this).attr("data-tema");
        i = $(this).attr("data-link");
        c(s, "popup-branco", i, "");
      });
  }),
  ($.fn.required = function () {
    var e = $(this),
      o = 0;
    $(this)
      .find(".required")
      .each(function (t, i) {
        o++,
          $(this).bind("click", function () {
            var t;
            (t = $(this)).hasClass("disabled") ||
              (t.find(".clique-maozinha").remove(),
              e.find(".required").length || e.trigger("fimPagina"));
          });
      }),
      $(this).find("[data-trava]").length && o++,
      0 == o && e.trigger("fimPagina");
  }),
  ($.fn.sanfona = function () {
    var n = $(this);
    $(this)
      .find(".sanfona")
      .each(function (t, i) {
        var a = $(this);
        $(this)
          .find(".item-sanfona")
          .each(function (t) {
            n.trigger("set-interaction"),
              $(this).setClickCheck(),
              $(this).attr("data-id", t);
          }),
          a.find(".item-sanfona").addClass("pulsar-setinha"),
          a.find("> .item-sanfona").bind("click", function (t) {
            var i, e, o, s;
            t.target;
            $(t.target).hasClass("link-required") ||
              $(t.target).closest(".link-required").length ||
              ($(this).removeClass("pulsar-setinha"),
              (t = $(this).closest(".item-sanfona")).hasClass("clicou") ||
                (t.addClass("clicou"), n.trigger("interaction-done")),
              a.find(".item-sanfona.clicou").length ==
                a.find(".item-sanfona").length &&
                n.find(".feedback").addClass("on"),
              t.hasClass("ativo")
                ? t.removeClass("ativo").addClass("inativo")
                : (t.offset().top,
                  (i = n.find(".container")),
                  a.find("> .item-sanfona.ativo").each(function () {
                    $(this).removeClass("ativo").addClass("inativo");
                  }),
                  (e = $(this)),
                  (o = $(this).attr("data-id") - 1),
                  setTimeout(function () {
                    var t;
                    (s =
                      0 <= o
                        ? (t = a
                            .find(".item-sanfona[data-id=" + o + "]")
                            .find(".cont-botao")).offset().top -
                          i.offset().top +
                          t.height()
                        : e.offset().top - i.offset().top - 30),
                      n.stop().animate(
                        {
                          scrollTop: s,
                        },
                        "350",
                        "linear"
                      );
                  }, 300),
                  t.addClass("ativo").removeClass("inativo"),
                  0 === t.find("> .cont-texto  >.item-biblioteca").length &&
                    0 < t.find("> .cont-texto .item-sanfona").length &&
                    t
                      .find("> .cont-texto .item-sanfona")
                      .first()
                      .addClass("ativo")
                      .removeClass("inativo")));
          });
      });
  }),
  (function (t) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery"], t)
      : "undefined" != typeof exports
      ? (module.exports = t(require("jquery")))
      : t(jQuery);
  })(function (l) {
    "use strict";
    var o,
      n = window.Slick || {};
    (o = 0),
      ((n = function (t, i) {
        var e = this;
        (e.defaults = {
          accessibility: !0,
          adaptiveHeight: !1,
          appendArrows: l(t),
          appendDots: l(t),
          arrows: !0,
          asNavFor: null,
          prevArrow:
            '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
          nextArrow:
            '<button class="slick-next" aria-label="Next" type="button">Next</button>',
          autoplay: !1,
          autoplaySpeed: 3e3,
          centerMode: !1,
          centerPadding: "50px",
          cssEase: "ease",
          customPaging: function (t, i) {
            return l('<button type="button" />').text(i + 1);
          },
          dots: !1,
          dotsClass: "slick-dots",
          draggable: !0,
          easing: "linear",
          edgeFriction: 0.35,
          fade: !1,
          focusOnSelect: !1,
          focusOnChange: !1,
          infinite: !0,
          initialSlide: 0,
          lazyLoad: "ondemand",
          mobileFirst: !1,
          pauseOnHover: !0,
          pauseOnFocus: !0,
          pauseOnDotsHover: !1,
          respondTo: "window",
          responsive: null,
          rows: 1,
          rtl: !1,
          slide: "",
          slidesPerRow: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          swipe: !0,
          swipeToSlide: !1,
          touchMove: !0,
          touchThreshold: 5,
          useCSS: !0,
          useTransform: !0,
          variableWidth: !1,
          vertical: !1,
          verticalSwiping: !1,
          waitForAnimate: !0,
          zIndex: 1e3,
        }),
          (e.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1,
          }),
          l.extend(e, e.initials),
          (e.activeBreakpoint = null),
          (e.animType = null),
          (e.animProp = null),
          (e.breakpoints = []),
          (e.breakpointSettings = []),
          (e.cssTransitions = !1),
          (e.focussed = !1),
          (e.interrupted = !1),
          (e.hidden = "hidden"),
          (e.paused = !0),
          (e.positionProp = null),
          (e.respondTo = null),
          (e.rowCount = 1),
          (e.shouldClick = !0),
          (e.$slider = l(t)),
          (e.$slidesCache = null),
          (e.transformType = null),
          (e.transitionType = null),
          (e.visibilityChange = "visibilitychange"),
          (e.windowWidth = 0),
          (e.windowTimer = null),
          (t = l(t).data("slick") || {}),
          (e.options = l.extend({}, e.defaults, i, t)),
          (e.currentSlide = e.options.initialSlide),
          (e.originalSettings = e.options),
          void 0 !== document.mozHidden
            ? ((e.hidden = "mozHidden"),
              (e.visibilityChange = "mozvisibilitychange"))
            : void 0 !== document.webkitHidden &&
              ((e.hidden = "webkitHidden"),
              (e.visibilityChange = "webkitvisibilitychange")),
          (e.autoPlay = l.proxy(e.autoPlay, e)),
          (e.autoPlayClear = l.proxy(e.autoPlayClear, e)),
          (e.autoPlayIterator = l.proxy(e.autoPlayIterator, e)),
          (e.changeSlide = l.proxy(e.changeSlide, e)),
          (e.clickHandler = l.proxy(e.clickHandler, e)),
          (e.selectHandler = l.proxy(e.selectHandler, e)),
          (e.setPosition = l.proxy(e.setPosition, e)),
          (e.swipeHandler = l.proxy(e.swipeHandler, e)),
          (e.dragHandler = l.proxy(e.dragHandler, e)),
          (e.keyHandler = l.proxy(e.keyHandler, e)),
          (e.instanceUid = o++),
          (e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
          e.registerBreakpoints(),
          e.init(!0);
      }).prototype.activateADA = function () {
        this.$slideTrack
          .find(".slick-active")
          .attr({
            "aria-hidden": "false",
          })
          .find("a, input, button, select")
          .attr({
            tabindex: "0",
          });
      }),
      (n.prototype.addSlide = n.prototype.slickAdd =
        function (t, i, e) {
          var o = this;
          if ("boolean" == typeof i) (e = i), (i = null);
          else if (i < 0 || i >= o.slideCount) return !1;
          o.unload(),
            "number" == typeof i
              ? 0 === i && 0 === o.$slides.length
                ? l(t).appendTo(o.$slideTrack)
                : e
                ? l(t).insertBefore(o.$slides.eq(i))
                : l(t).insertAfter(o.$slides.eq(i))
              : !0 === e
              ? l(t).prependTo(o.$slideTrack)
              : l(t).appendTo(o.$slideTrack),
            (o.$slides = o.$slideTrack.children(this.options.slide)),
            o.$slideTrack.children(this.options.slide).detach(),
            o.$slideTrack.append(o.$slides),
            o.$slides.each(function (t, i) {
              l(i).attr("data-slick-index", t);
            }),
            (o.$slidesCache = o.$slides),
            o.reinit();
        }),
      (n.prototype.animateHeight = function () {
        var t,
          i = this;
        1 === i.options.slidesToShow &&
          !0 === i.options.adaptiveHeight &&
          !1 === i.options.vertical &&
          ((t = i.$slides.eq(i.currentSlide).outerHeight(!0)),
          i.$list.animate(
            {
              height: t,
            },
            i.options.speed
          ));
      }),
      (n.prototype.animateSlide = function (t, i) {
        var e = {},
          o = this;
        o.animateHeight(),
          !0 === o.options.rtl && !1 === o.options.vertical && (t = -t),
          !1 === o.transformsEnabled
            ? !1 === o.options.vertical
              ? o.$slideTrack.animate(
                  {
                    left: t,
                  },
                  o.options.speed,
                  o.options.easing,
                  i
                )
              : o.$slideTrack.animate(
                  {
                    top: t,
                  },
                  o.options.speed,
                  o.options.easing,
                  i
                )
            : !1 === o.cssTransitions
            ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft),
              l({
                animStart: o.currentLeft,
              }).animate(
                {
                  animStart: t,
                },
                {
                  duration: o.options.speed,
                  easing: o.options.easing,
                  step: function (t) {
                    (t = Math.ceil(t)),
                      !1 === o.options.vertical
                        ? (e[o.animType] = "translate(" + t + "px, 0px)")
                        : (e[o.animType] = "translate(0px," + t + "px)"),
                      o.$slideTrack.css(e);
                  },
                  complete: function () {
                    i && i.call();
                  },
                }
              ))
            : (o.applyTransition(),
              (t = Math.ceil(t)),
              !1 === o.options.vertical
                ? (e[o.animType] = "translate3d(" + t + "px, 0px, 0px)")
                : (e[o.animType] = "translate3d(0px," + t + "px, 0px)"),
              o.$slideTrack.css(e),
              i &&
                setTimeout(function () {
                  o.disableTransition(), i.call();
                }, o.options.speed));
      }),
      (n.prototype.getNavTarget = function () {
        var t = this.options.asNavFor;
        return (t = t && null !== t ? l(t).not(this.$slider) : t);
      }),
      (n.prototype.asNavFor = function (i) {
        var t = this.getNavTarget();
        null !== t &&
          "object" == typeof t &&
          t.each(function () {
            var t = l(this).slick("getSlick");
            t.unslicked || t.slideHandler(i, !0);
          });
      }),
      (n.prototype.applyTransition = function (t) {
        var i = this,
          e = {};
        !1 === i.options.fade
          ? (e[i.transitionType] =
              i.transformType +
              " " +
              i.options.speed +
              "ms " +
              i.options.cssEase)
          : (e[i.transitionType] =
              "opacity " + i.options.speed + "ms " + i.options.cssEase),
          (!1 === i.options.fade ? i.$slideTrack : i.$slides.eq(t)).css(e);
      }),
      (n.prototype.autoPlay = function () {
        var t = this;
        t.autoPlayClear(),
          t.slideCount > t.options.slidesToShow &&
            (t.autoPlayTimer = setInterval(
              t.autoPlayIterator,
              t.options.autoplaySpeed
            ));
      }),
      (n.prototype.autoPlayClear = function () {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer);
      }),
      (n.prototype.autoPlayIterator = function () {
        var t = this,
          i = t.currentSlide + t.options.slidesToScroll;
        t.paused ||
          t.interrupted ||
          t.focussed ||
          (!1 === t.options.infinite &&
            (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1
              ? (t.direction = 0)
              : 0 === t.direction &&
                ((i = t.currentSlide - t.options.slidesToScroll),
                t.currentSlide - 1 == 0 && (t.direction = 1))),
          t.slideHandler(i));
      }),
      (n.prototype.buildArrows = function () {
        var t = this;
        !0 === t.options.arrows &&
          ((t.$prevArrow = l(t.options.prevArrow).addClass("slick-arrow")),
          (t.$nextArrow = l(t.options.nextArrow).addClass("slick-arrow")),
          t.slideCount > t.options.slidesToShow
            ? (t.$prevArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex"),
              t.$nextArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex"),
              t.htmlExpr.test(t.options.prevArrow) &&
                t.$prevArrow.prependTo(t.options.appendArrows),
              t.htmlExpr.test(t.options.nextArrow) &&
                t.$nextArrow.appendTo(t.options.appendArrows),
              !0 !== t.options.infinite &&
                t.$prevArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"))
            : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1",
              }));
      }),
      (n.prototype.buildDots = function () {
        var t,
          i,
          e = this;
        if (!0 === e.options.dots && e.slideCount > e.options.slidesToShow) {
          for (
            e.$slider.addClass("slick-dotted"),
              i = l("<ul />").addClass(e.options.dotsClass),
              t = 0;
            t <= e.getDotCount();
            t += 1
          )
            i.append(
              l("<li />").append(e.options.customPaging.call(this, e, t))
            );
          (e.$dots = i.appendTo(e.options.appendDots)),
            e.$dots.find("li").first().addClass("slick-active");
        }
      }),
      (n.prototype.buildOut = function () {
        var t = this;
        (t.$slides = t.$slider
          .children(t.options.slide + ":not(.slick-cloned)")
          .addClass("slick-slide")),
          (t.slideCount = t.$slides.length),
          t.$slides.each(function (t, i) {
            l(i)
              .attr("data-slick-index", t)
              .data("originalStyling", l(i).attr("style") || "");
          }),
          t.$slider.addClass("slick-slider"),
          (t.$slideTrack =
            0 === t.slideCount
              ? l('<div class="slick-track"/>').appendTo(t.$slider)
              : t.$slides.wrapAll('<div class="slick-track"/>').parent()),
          (t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent()),
          t.$slideTrack.css("opacity", 0),
          (!0 !== t.options.centerMode && !0 !== t.options.swipeToSlide) ||
            (t.options.slidesToScroll = 1),
          l("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"),
          t.setupInfinite(),
          t.buildArrows(),
          t.buildDots(),
          t.updateDots(),
          t.setSlideClasses(
            "number" == typeof t.currentSlide ? t.currentSlide : 0
          ),
          !0 === t.options.draggable && t.$list.addClass("draggable");
      }),
      (n.prototype.buildRows = function () {
        var t,
          i,
          e,
          o = this,
          s = document.createDocumentFragment(),
          a = o.$slider.children();
        if (0 < o.options.rows) {
          for (
            e = o.options.slidesPerRow * o.options.rows,
              i = Math.ceil(a.length / e),
              t = 0;
            t < i;
            t++
          ) {
            for (
              var n = document.createElement("div"), d = 0;
              d < o.options.rows;
              d++
            ) {
              for (
                var r = document.createElement("div"), l = 0;
                l < o.options.slidesPerRow;
                l++
              ) {
                var c = t * e + (d * o.options.slidesPerRow + l);
                a.get(c) && r.appendChild(a.get(c));
              }
              n.appendChild(r);
            }
            s.appendChild(n);
          }
          o.$slider.empty().append(s),
            o.$slider
              .children()
              .children()
              .children()
              .css({
                width: 100 / o.options.slidesPerRow + "%",
                display: "inline-block",
              });
        }
      }),
      (n.prototype.checkResponsive = function (t, i) {
        var e,
          o,
          s,
          a = this,
          n = !1,
          d = a.$slider.width(),
          r = window.innerWidth || l(window).width();
        if (
          ("window" === a.respondTo
            ? (s = r)
            : "slider" === a.respondTo
            ? (s = d)
            : "min" === a.respondTo && (s = Math.min(r, d)),
          a.options.responsive &&
            a.options.responsive.length &&
            null !== a.options.responsive)
        ) {
          for (e in ((o = null), a.breakpoints))
            a.breakpoints.hasOwnProperty(e) &&
              (!1 === a.originalSettings.mobileFirst
                ? s < a.breakpoints[e] && (o = a.breakpoints[e])
                : s > a.breakpoints[e] && (o = a.breakpoints[e]));
          null !== o
            ? (null !== a.activeBreakpoint && o === a.activeBreakpoint && !i) ||
              ((a.activeBreakpoint = o),
              "unslick" === a.breakpointSettings[o]
                ? a.unslick(o)
                : ((a.options = l.extend(
                    {},
                    a.originalSettings,
                    a.breakpointSettings[o]
                  )),
                  !0 === t && (a.currentSlide = a.options.initialSlide),
                  a.refresh(t)),
              (n = o))
            : null !== a.activeBreakpoint &&
              ((a.activeBreakpoint = null),
              (a.options = a.originalSettings),
              !0 === t && (a.currentSlide = a.options.initialSlide),
              a.refresh(t),
              (n = o)),
            t || !1 === n || a.$slider.trigger("breakpoint", [a, n]);
        }
      }),
      (n.prototype.changeSlide = function (t, i) {
        var e,
          o = this,
          s = l(t.currentTarget);
        switch (
          (s.is("a") && t.preventDefault(),
          s.is("li") || (s = s.closest("li")),
          (e =
            o.slideCount % o.options.slidesToScroll != 0
              ? 0
              : (o.slideCount - o.currentSlide) % o.options.slidesToScroll),
          t.data.message)
        ) {
          case "previous":
            (a =
              0 == e ? o.options.slidesToScroll : o.options.slidesToShow - e),
              o.slideCount > o.options.slidesToShow &&
                o.slideHandler(o.currentSlide - a, !1, i);
            break;
          case "next":
            (a = 0 == e ? o.options.slidesToScroll : e),
              o.slideCount > o.options.slidesToShow &&
                o.slideHandler(o.currentSlide + a, !1, i);
            break;
          case "index":
            var a =
              0 === t.data.index
                ? 0
                : t.data.index || s.index() * o.options.slidesToScroll;
            o.slideHandler(o.checkNavigable(a), !1, i),
              s.children().trigger("focus");
            break;
          default:
            return;
        }
      }),
      (n.prototype.checkNavigable = function (t) {
        var i = this.getNavigableIndexes(),
          e = 0;
        if (t > i[i.length - 1]) t = i[i.length - 1];
        else
          for (var o in i) {
            if (t < i[o]) {
              t = e;
              break;
            }
            e = i[o];
          }
        return t;
      }),
      (n.prototype.cleanUpEvents = function () {
        var t = this;
        t.options.dots &&
          null !== t.$dots &&
          (l("li", t.$dots)
            .off("click.slick", t.changeSlide)
            .off("mouseenter.slick", l.proxy(t.interrupt, t, !0))
            .off("mouseleave.slick", l.proxy(t.interrupt, t, !1)),
          !0 === t.options.accessibility &&
            t.$dots.off("keydown.slick", t.keyHandler)),
          t.$slider.off("focus.slick blur.slick"),
          !0 === t.options.arrows &&
            t.slideCount > t.options.slidesToShow &&
            (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide),
            t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide),
            !0 === t.options.accessibility &&
              (t.$prevArrow && t.$prevArrow.off("keydown.slick", t.keyHandler),
              t.$nextArrow && t.$nextArrow.off("keydown.slick", t.keyHandler))),
          t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler),
          t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler),
          t.$list.off("touchend.slick mouseup.slick", t.swipeHandler),
          t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler),
          t.$list.off("click.slick", t.clickHandler),
          l(document).off(t.visibilityChange, t.visibility),
          t.cleanUpSlideEvents(),
          !0 === t.options.accessibility &&
            t.$list.off("keydown.slick", t.keyHandler),
          !0 === t.options.focusOnSelect &&
            l(t.$slideTrack).children().off("click.slick", t.selectHandler),
          l(window).off(
            "orientationchange.slick.slick-" + t.instanceUid,
            t.orientationChange
          ),
          l(window).off("resize.slick.slick-" + t.instanceUid, t.resize),
          l("[draggable!=true]", t.$slideTrack).off(
            "dragstart",
            t.preventDefault
          ),
          l(window).off("load.slick.slick-" + t.instanceUid, t.setPosition);
      }),
      (n.prototype.cleanUpSlideEvents = function () {
        var t = this;
        t.$list.off("mouseenter.slick", l.proxy(t.interrupt, t, !0)),
          t.$list.off("mouseleave.slick", l.proxy(t.interrupt, t, !1));
      }),
      (n.prototype.cleanUpRows = function () {
        var t;
        0 < this.options.rows &&
          ((t = this.$slides.children().children()).removeAttr("style"),
          this.$slider.empty().append(t));
      }),
      (n.prototype.clickHandler = function (t) {
        !1 === this.shouldClick &&
          (t.stopImmediatePropagation(),
          t.stopPropagation(),
          t.preventDefault());
      }),
      (n.prototype.destroy = function (t) {
        var i = this;
        i.autoPlayClear(),
          (i.touchObject = {}),
          i.cleanUpEvents(),
          l(".slick-cloned", i.$slider).detach(),
          i.$dots && i.$dots.remove(),
          i.$prevArrow &&
            i.$prevArrow.length &&
            (i.$prevArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", ""),
            i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()),
          i.$nextArrow &&
            i.$nextArrow.length &&
            (i.$nextArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", ""),
            i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()),
          i.$slides &&
            (i.$slides
              .removeClass(
                "slick-slide slick-active slick-center slick-visible slick-current"
              )
              .removeAttr("aria-hidden")
              .removeAttr("data-slick-index")
              .each(function () {
                l(this).attr("style", l(this).data("originalStyling"));
              }),
            i.$slideTrack.children(this.options.slide).detach(),
            i.$slideTrack.detach(),
            i.$list.detach(),
            i.$slider.append(i.$slides)),
          i.cleanUpRows(),
          i.$slider.removeClass("slick-slider"),
          i.$slider.removeClass("slick-initialized"),
          i.$slider.removeClass("slick-dotted"),
          (i.unslicked = !0),
          t || i.$slider.trigger("destroy", [i]);
      }),
      (n.prototype.disableTransition = function (t) {
        var i = {};
        (i[this.transitionType] = ""),
          (!1 === this.options.fade
            ? this.$slideTrack
            : this.$slides.eq(t)
          ).css(i);
      }),
      (n.prototype.fadeSlide = function (t, i) {
        var e = this;
        !1 === e.cssTransitions
          ? (e.$slides.eq(t).css({
              zIndex: e.options.zIndex,
            }),
            e.$slides.eq(t).animate(
              {
                opacity: 1,
              },
              e.options.speed,
              e.options.easing,
              i
            ))
          : (e.applyTransition(t),
            e.$slides.eq(t).css({
              opacity: 1,
              zIndex: e.options.zIndex,
            }),
            i &&
              setTimeout(function () {
                e.disableTransition(t), i.call();
              }, e.options.speed));
      }),
      (n.prototype.fadeSlideOut = function (t) {
        var i = this;
        !1 === i.cssTransitions
          ? i.$slides.eq(t).animate(
              {
                opacity: 0,
                zIndex: i.options.zIndex - 2,
              },
              i.options.speed,
              i.options.easing
            )
          : (i.applyTransition(t),
            i.$slides.eq(t).css({
              opacity: 0,
              zIndex: i.options.zIndex - 2,
            }));
      }),
      (n.prototype.filterSlides = n.prototype.slickFilter =
        function (t) {
          var i = this;
          null !== t &&
            ((i.$slidesCache = i.$slides),
            i.unload(),
            i.$slideTrack.children(this.options.slide).detach(),
            i.$slidesCache.filter(t).appendTo(i.$slideTrack),
            i.reinit());
        }),
      (n.prototype.focusHandler = function () {
        var e = this;
        e.$slider
          .off("focus.slick blur.slick")
          .on("focus.slick", "*", function (t) {
            var i = l(this);
            setTimeout(function () {
              e.options.pauseOnFocus &&
                i.is(":focus") &&
                ((e.focussed = !0), e.autoPlay());
            }, 0);
          })
          .on("blur.slick", "*", function (t) {
            l(this);
            e.options.pauseOnFocus && ((e.focussed = !1), e.autoPlay());
          });
      }),
      (n.prototype.getCurrent = n.prototype.slickCurrentSlide =
        function () {
          return this.currentSlide;
        }),
      (n.prototype.getDotCount = function () {
        var t = this,
          i = 0,
          e = 0,
          o = 0;
        if (!0 === t.options.infinite)
          if (t.slideCount <= t.options.slidesToShow) ++o;
          else
            for (; i < t.slideCount; )
              ++o,
                (i = e + t.options.slidesToScroll),
                (e +=
                  t.options.slidesToScroll <= t.options.slidesToShow
                    ? t.options.slidesToScroll
                    : t.options.slidesToShow);
        else if (!0 === t.options.centerMode) o = t.slideCount;
        else if (t.options.asNavFor)
          for (; i < t.slideCount; )
            ++o,
              (i = e + t.options.slidesToScroll),
              (e +=
                t.options.slidesToScroll <= t.options.slidesToShow
                  ? t.options.slidesToScroll
                  : t.options.slidesToShow);
        else
          o =
            1 +
            Math.ceil(
              (t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll
            );
        return o - 1;
      }),
      (n.prototype.getLeft = function (t) {
        var i,
          e,
          o = this,
          s = 0;
        return (
          (o.slideOffset = 0),
          (i = o.$slides.first().outerHeight(!0)),
          !0 === o.options.infinite
            ? (o.slideCount > o.options.slidesToShow &&
                ((o.slideOffset = o.slideWidth * o.options.slidesToShow * -1),
                (e = -1),
                !0 === o.options.vertical &&
                  !0 === o.options.centerMode &&
                  (2 === o.options.slidesToShow
                    ? (e = -1.5)
                    : 1 === o.options.slidesToShow && (e = -2)),
                (s = i * o.options.slidesToShow * e)),
              o.slideCount % o.options.slidesToScroll != 0 &&
                t + o.options.slidesToScroll > o.slideCount &&
                o.slideCount > o.options.slidesToShow &&
                (s =
                  t > o.slideCount
                    ? ((o.slideOffset =
                        (o.options.slidesToShow - (t - o.slideCount)) *
                        o.slideWidth *
                        -1),
                      (o.options.slidesToShow - (t - o.slideCount)) * i * -1)
                    : ((o.slideOffset =
                        (o.slideCount % o.options.slidesToScroll) *
                        o.slideWidth *
                        -1),
                      (o.slideCount % o.options.slidesToScroll) * i * -1)))
            : t + o.options.slidesToShow > o.slideCount &&
              ((o.slideOffset =
                (t + o.options.slidesToShow - o.slideCount) * o.slideWidth),
              (s = (t + o.options.slidesToShow - o.slideCount) * i)),
          o.slideCount <= o.options.slidesToShow && (s = o.slideOffset = 0),
          !0 === o.options.centerMode && o.slideCount <= o.options.slidesToShow
            ? (o.slideOffset =
                (o.slideWidth * Math.floor(o.options.slidesToShow)) / 2 -
                (o.slideWidth * o.slideCount) / 2)
            : !0 === o.options.centerMode && !0 === o.options.infinite
            ? (o.slideOffset +=
                o.slideWidth * Math.floor(o.options.slidesToShow / 2) -
                o.slideWidth)
            : !0 === o.options.centerMode &&
              ((o.slideOffset = 0),
              (o.slideOffset +=
                o.slideWidth * Math.floor(o.options.slidesToShow / 2))),
          (i =
            !1 === o.options.vertical
              ? t * o.slideWidth * -1 + o.slideOffset
              : t * i * -1 + s),
          !0 === o.options.variableWidth &&
            ((s =
              o.slideCount <= o.options.slidesToShow ||
              !1 === o.options.infinite
                ? o.$slideTrack.children(".slick-slide").eq(t)
                : o.$slideTrack
                    .children(".slick-slide")
                    .eq(t + o.options.slidesToShow)),
            (i =
              !0 === o.options.rtl
                ? s[0]
                  ? -1 * (o.$slideTrack.width() - s[0].offsetLeft - s.width())
                  : 0
                : s[0]
                ? -1 * s[0].offsetLeft
                : 0),
            !0 === o.options.centerMode &&
              ((s =
                o.slideCount <= o.options.slidesToShow ||
                !1 === o.options.infinite
                  ? o.$slideTrack.children(".slick-slide").eq(t)
                  : o.$slideTrack
                      .children(".slick-slide")
                      .eq(t + o.options.slidesToShow + 1)),
              (i =
                !0 === o.options.rtl
                  ? s[0]
                    ? -1 * (o.$slideTrack.width() - s[0].offsetLeft - s.width())
                    : 0
                  : s[0]
                  ? -1 * s[0].offsetLeft
                  : 0),
              (i += (o.$list.width() - s.outerWidth()) / 2))),
          i
        );
      }),
      (n.prototype.getOption = n.prototype.slickGetOption =
        function (t) {
          return this.options[t];
        }),
      (n.prototype.getNavigableIndexes = function () {
        for (
          var t = this,
            i = 0,
            e = 0,
            o = [],
            s =
              !1 === t.options.infinite
                ? t.slideCount
                : ((i = -1 * t.options.slidesToScroll),
                  (e = -1 * t.options.slidesToScroll),
                  2 * t.slideCount);
          i < s;

        )
          o.push(i),
            (i = e + t.options.slidesToScroll),
            (e +=
              t.options.slidesToScroll <= t.options.slidesToShow
                ? t.options.slidesToScroll
                : t.options.slidesToShow);
        return o;
      }),
      (n.prototype.getSlick = function () {
        return this;
      }),
      (n.prototype.getSlideCount = function () {
        var s,
          a = this,
          t = !0 === a.options.centerMode ? Math.floor(a.$list.width() / 2) : 0,
          n = -1 * a.swipeLeft + t;
        return !0 === a.options.swipeToSlide
          ? (a.$slideTrack.find(".slick-slide").each(function (t, i) {
              var e = l(i).outerWidth(),
                o = i.offsetLeft;
              if ((!0 !== a.options.centerMode && (o += e / 2), n < o + e))
                return (s = i), !1;
            }),
            Math.abs(l(s).attr("data-slick-index") - a.currentSlide) || 1)
          : a.options.slidesToScroll;
      }),
      (n.prototype.goTo = n.prototype.slickGoTo =
        function (t, i) {
          this.changeSlide(
            {
              data: {
                message: "index",
                index: parseInt(t),
              },
            },
            i
          );
        }),
      (n.prototype.init = function (t) {
        var i = this;
        l(i.$slider).hasClass("slick-initialized") ||
          (l(i.$slider).addClass("slick-initialized"),
          i.buildRows(),
          i.buildOut(),
          i.setProps(),
          i.startLoad(),
          i.loadSlider(),
          i.initializeEvents(),
          i.updateArrows(),
          i.updateDots(),
          i.checkResponsive(!0),
          i.focusHandler()),
          t && i.$slider.trigger("init", [i]),
          !0 === i.options.accessibility && i.initADA(),
          i.options.autoplay && ((i.paused = !1), i.autoPlay());
      }),
      (n.prototype.initADA = function () {
        var e = this,
          o = Math.ceil(e.slideCount / e.options.slidesToShow),
          s = e.getNavigableIndexes().filter(function (t) {
            return 0 <= t && t < e.slideCount;
          });
        e.$slides
          .add(e.$slideTrack.find(".slick-cloned"))
          .attr({
            "aria-hidden": "true",
            tabindex: "-1",
          })
          .find("a, input, button, select")
          .attr({
            tabindex: "-1",
          }),
          null !== e.$dots &&
            (e.$slides
              .not(e.$slideTrack.find(".slick-cloned"))
              .each(function (t) {
                var i = s.indexOf(t);
                l(this).attr({
                  role: "tabpanel",
                  id: "slick-slide" + e.instanceUid + t,
                  tabindex: -1,
                }),
                  -1 !== i &&
                    ((i = "slick-slide-control" + e.instanceUid + i),
                    l("#" + i).length &&
                      l(this).attr({
                        "aria-describedby": i,
                      }));
              }),
            e.$dots
              .attr("role", "tablist")
              .find("li")
              .each(function (t) {
                var i = s[t];
                l(this).attr({
                  role: "presentation",
                }),
                  l(this)
                    .find("button")
                    .first()
                    .attr({
                      role: "tab",
                      id: "slick-slide-control" + e.instanceUid + t,
                      "aria-controls": "slick-slide" + e.instanceUid + i,
                      "aria-label": t + 1 + " of " + o,
                      "aria-selected": null,
                      tabindex: "-1",
                    });
              })
              .eq(e.currentSlide)
              .find("button")
              .attr({
                "aria-selected": "true",
                tabindex: "0",
              })
              .end());
        for (var t = e.currentSlide, i = t + e.options.slidesToShow; t < i; t++)
          e.options.focusOnChange
            ? e.$slides.eq(t).attr({
                tabindex: "0",
              })
            : e.$slides.eq(t).removeAttr("tabindex");
        e.activateADA();
      }),
      (n.prototype.initArrowEvents = function () {
        var t = this;
        !0 === t.options.arrows &&
          t.slideCount > t.options.slidesToShow &&
          (t.$prevArrow.off("click.slick").on(
            "click.slick",
            {
              message: "previous",
            },
            t.changeSlide
          ),
          t.$nextArrow.off("click.slick").on(
            "click.slick",
            {
              message: "next",
            },
            t.changeSlide
          ),
          !0 === t.options.accessibility &&
            (t.$prevArrow.on("keydown.slick", t.keyHandler),
            t.$nextArrow.on("keydown.slick", t.keyHandler)));
      }),
      (n.prototype.initDotEvents = function () {
        var t = this;
        !0 === t.options.dots &&
          t.slideCount > t.options.slidesToShow &&
          (l("li", t.$dots).on(
            "click.slick",
            {
              message: "index",
            },
            t.changeSlide
          ),
          !0 === t.options.accessibility &&
            t.$dots.on("keydown.slick", t.keyHandler)),
          !0 === t.options.dots &&
            !0 === t.options.pauseOnDotsHover &&
            t.slideCount > t.options.slidesToShow &&
            l("li", t.$dots)
              .on("mouseenter.slick", l.proxy(t.interrupt, t, !0))
              .on("mouseleave.slick", l.proxy(t.interrupt, t, !1));
      }),
      (n.prototype.initSlideEvents = function () {
        var t = this;
        t.options.pauseOnHover &&
          (t.$list.on("mouseenter.slick", l.proxy(t.interrupt, t, !0)),
          t.$list.on("mouseleave.slick", l.proxy(t.interrupt, t, !1)));
      }),
      (n.prototype.initializeEvents = function () {
        var t = this;
        t.initArrowEvents(),
          t.initDotEvents(),
          t.initSlideEvents(),
          t.$list.on(
            "touchstart.slick mousedown.slick",
            {
              action: "start",
            },
            t.swipeHandler
          ),
          t.$list.on(
            "touchmove.slick mousemove.slick",
            {
              action: "move",
            },
            t.swipeHandler
          ),
          t.$list.on(
            "touchend.slick mouseup.slick",
            {
              action: "end",
            },
            t.swipeHandler
          ),
          t.$list.on(
            "touchcancel.slick mouseleave.slick",
            {
              action: "end",
            },
            t.swipeHandler
          ),
          t.$list.on("click.slick", t.clickHandler),
          l(document).on(t.visibilityChange, l.proxy(t.visibility, t)),
          !0 === t.options.accessibility &&
            t.$list.on("keydown.slick", t.keyHandler),
          !0 === t.options.focusOnSelect &&
            l(t.$slideTrack).children().on("click.slick", t.selectHandler),
          l(window).on(
            "orientationchange.slick.slick-" + t.instanceUid,
            l.proxy(t.orientationChange, t)
          ),
          l(window).on(
            "resize.slick.slick-" + t.instanceUid,
            l.proxy(t.resize, t)
          ),
          l("[draggable!=true]", t.$slideTrack).on(
            "dragstart",
            t.preventDefault
          ),
          l(window).on("load.slick.slick-" + t.instanceUid, t.setPosition),
          l(t.setPosition);
      }),
      (n.prototype.initUI = function () {
        var t = this;
        !0 === t.options.arrows &&
          t.slideCount > t.options.slidesToShow &&
          (t.$prevArrow.show(), t.$nextArrow.show()),
          !0 === t.options.dots &&
            t.slideCount > t.options.slidesToShow &&
            t.$dots.show();
      }),
      (n.prototype.keyHandler = function (t) {
        var i = this;
        t.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
          (37 === t.keyCode && !0 === i.options.accessibility
            ? i.changeSlide({
                data: {
                  message: !0 === i.options.rtl ? "next" : "previous",
                },
              })
            : 39 === t.keyCode &&
              !0 === i.options.accessibility &&
              i.changeSlide({
                data: {
                  message: !0 === i.options.rtl ? "previous" : "next",
                },
              }));
      }),
      (n.prototype.lazyLoad = function () {
        var t,
          i,
          e,
          a = this;
        function o(t) {
          l("img[data-lazy]", t).each(function () {
            var t = l(this),
              i = l(this).attr("data-lazy"),
              e = l(this).attr("data-srcset"),
              o = l(this).attr("data-sizes") || a.$slider.attr("data-sizes"),
              s = document.createElement("img");
            (s.onload = function () {
              t.animate(
                {
                  opacity: 0,
                },
                100,
                function () {
                  e && (t.attr("srcset", e), o && t.attr("sizes", o)),
                    t.attr("src", i).animate(
                      {
                        opacity: 1,
                      },
                      200,
                      function () {
                        t.removeAttr(
                          "data-lazy data-srcset data-sizes"
                        ).removeClass("slick-loading");
                      }
                    ),
                    a.$slider.trigger("lazyLoaded", [a, t, i]);
                }
              );
            }),
              (s.onerror = function () {
                t
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                  a.$slider.trigger("lazyLoadError", [a, t, i]);
              }),
              (s.src = i);
          });
        }
        if (
          (!0 === a.options.centerMode
            ? (e =
                !0 === a.options.infinite
                  ? (i = a.currentSlide + (a.options.slidesToShow / 2 + 1)) +
                    a.options.slidesToShow +
                    2
                  : ((i = Math.max(
                      0,
                      a.currentSlide - (a.options.slidesToShow / 2 + 1)
                    )),
                    a.options.slidesToShow / 2 + 1 + 2 + a.currentSlide))
            : ((i = a.options.infinite
                ? a.options.slidesToShow + a.currentSlide
                : a.currentSlide),
              (e = Math.ceil(i + a.options.slidesToShow)),
              !0 === a.options.fade &&
                (0 < i && i--, e <= a.slideCount && e++)),
          (t = a.$slider.find(".slick-slide").slice(i, e)),
          "anticipated" === a.options.lazyLoad)
        )
          for (
            var s = i - 1, n = e, d = a.$slider.find(".slick-slide"), r = 0;
            r < a.options.slidesToScroll;
            r++
          )
            s < 0 && (s = a.slideCount - 1),
              (t = (t = t.add(d.eq(s))).add(d.eq(n))),
              s--,
              n++;
        o(t),
          a.slideCount <= a.options.slidesToShow
            ? o(a.$slider.find(".slick-slide"))
            : a.currentSlide >= a.slideCount - a.options.slidesToShow
            ? o(
                a.$slider.find(".slick-cloned").slice(0, a.options.slidesToShow)
              )
            : 0 === a.currentSlide &&
              o(
                a.$slider
                  .find(".slick-cloned")
                  .slice(-1 * a.options.slidesToShow)
              );
      }),
      (n.prototype.loadSlider = function () {
        var t = this;
        t.setPosition(),
          t.$slideTrack.css({
            opacity: 1,
          }),
          t.$slider.removeClass("slick-loading"),
          t.initUI(),
          "progressive" === t.options.lazyLoad && t.progressiveLazyLoad();
      }),
      (n.prototype.next = n.prototype.slickNext =
        function () {
          this.changeSlide({
            data: {
              message: "next",
            },
          });
        }),
      (n.prototype.orientationChange = function () {
        this.checkResponsive(), this.setPosition();
      }),
      (n.prototype.pause = n.prototype.slickPause =
        function () {
          this.autoPlayClear(), (this.paused = !0);
        }),
      (n.prototype.play = n.prototype.slickPlay =
        function () {
          var t = this;
          t.autoPlay(),
            (t.options.autoplay = !0),
            (t.paused = !1),
            (t.focussed = !1),
            (t.interrupted = !1);
        }),
      (n.prototype.postSlide = function (t) {
        var i = this;
        i.unslicked ||
          (i.$slider.trigger("afterChange", [i, t]),
          (i.animating = !1),
          i.slideCount > i.options.slidesToShow && i.setPosition(),
          (i.swipeLeft = null),
          i.options.autoplay && i.autoPlay(),
          !0 === i.options.accessibility &&
            (i.initADA(),
            i.options.focusOnChange &&
              l(i.$slides.get(i.currentSlide)).attr("tabindex", 0).focus()));
      }),
      (n.prototype.prev = n.prototype.slickPrev =
        function () {
          this.changeSlide({
            data: {
              message: "previous",
            },
          });
        }),
      (n.prototype.preventDefault = function (t) {
        t.preventDefault();
      }),
      (n.prototype.progressiveLazyLoad = function (t) {
        t = t || 1;
        var i,
          e,
          o,
          s,
          a = this,
          n = l("img[data-lazy]", a.$slider);
        n.length
          ? ((i = n.first()),
            (e = i.attr("data-lazy")),
            (o = i.attr("data-srcset")),
            (s = i.attr("data-sizes") || a.$slider.attr("data-sizes")),
            ((n = document.createElement("img")).onload = function () {
              o && (i.attr("srcset", o), s && i.attr("sizes", s)),
                i
                  .attr("src", e)
                  .removeAttr("data-lazy data-srcset data-sizes")
                  .removeClass("slick-loading"),
                !0 === a.options.adaptiveHeight && a.setPosition(),
                a.$slider.trigger("lazyLoaded", [a, i, e]),
                a.progressiveLazyLoad();
            }),
            (n.onerror = function () {
              t < 3
                ? setTimeout(function () {
                    a.progressiveLazyLoad(t + 1);
                  }, 500)
                : (i
                    .removeAttr("data-lazy")
                    .removeClass("slick-loading")
                    .addClass("slick-lazyload-error"),
                  a.$slider.trigger("lazyLoadError", [a, i, e]),
                  a.progressiveLazyLoad());
            }),
            (n.src = e))
          : a.$slider.trigger("allImagesLoaded", [a]);
      }),
      (n.prototype.refresh = function (t) {
        var i = this,
          e = i.slideCount - i.options.slidesToShow;
        !i.options.infinite && i.currentSlide > e && (i.currentSlide = e),
          i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0),
          (e = i.currentSlide),
          i.destroy(!0),
          l.extend(i, i.initials, {
            currentSlide: e,
          }),
          i.init(),
          t ||
            i.changeSlide(
              {
                data: {
                  message: "index",
                  index: e,
                },
              },
              !1
            );
      }),
      (n.prototype.registerBreakpoints = function () {
        var t,
          i,
          e,
          o = this,
          s = o.options.responsive || null;
        if ("array" === l.type(s) && s.length) {
          for (t in ((o.respondTo = o.options.respondTo || "window"), s))
            if (((e = o.breakpoints.length - 1), s.hasOwnProperty(t))) {
              for (i = s[t].breakpoint; 0 <= e; )
                o.breakpoints[e] &&
                  o.breakpoints[e] === i &&
                  o.breakpoints.splice(e, 1),
                  e--;
              o.breakpoints.push(i), (o.breakpointSettings[i] = s[t].settings);
            }
          o.breakpoints.sort(function (t, i) {
            return o.options.mobileFirst ? t - i : i - t;
          });
        }
      }),
      (n.prototype.reinit = function () {
        var t = this;
        (t.$slides = t.$slideTrack
          .children(t.options.slide)
          .addClass("slick-slide")),
          (t.slideCount = t.$slides.length),
          t.currentSlide >= t.slideCount &&
            0 !== t.currentSlide &&
            (t.currentSlide = t.currentSlide - t.options.slidesToScroll),
          t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0),
          t.registerBreakpoints(),
          t.setProps(),
          t.setupInfinite(),
          t.buildArrows(),
          t.updateArrows(),
          t.initArrowEvents(),
          t.buildDots(),
          t.updateDots(),
          t.initDotEvents(),
          t.cleanUpSlideEvents(),
          t.initSlideEvents(),
          t.checkResponsive(!1, !0),
          !0 === t.options.focusOnSelect &&
            l(t.$slideTrack).children().on("click.slick", t.selectHandler),
          t.setSlideClasses(
            "number" == typeof t.currentSlide ? t.currentSlide : 0
          ),
          t.setPosition(),
          t.focusHandler(),
          (t.paused = !t.options.autoplay),
          t.autoPlay(),
          t.$slider.trigger("reInit", [t]);
      }),
      (n.prototype.resize = function () {
        var t = this;
        l(window).width() !== t.windowWidth &&
          (clearTimeout(t.windowDelay),
          (t.windowDelay = window.setTimeout(function () {
            (t.windowWidth = l(window).width()),
              t.checkResponsive(),
              t.unslicked || t.setPosition();
          }, 50)));
      }),
      (n.prototype.removeSlide = n.prototype.slickRemove =
        function (t, i, e) {
          var o = this;
          if (
            ((t =
              "boolean" == typeof t
                ? !0 === (i = t)
                  ? 0
                  : o.slideCount - 1
                : !0 === i
                ? --t
                : t),
            o.slideCount < 1 || t < 0 || t > o.slideCount - 1)
          )
            return !1;
          o.unload(),
            (!0 === e
              ? o.$slideTrack.children()
              : o.$slideTrack.children(this.options.slide).eq(t)
            ).remove(),
            (o.$slides = o.$slideTrack.children(this.options.slide)),
            o.$slideTrack.children(this.options.slide).detach(),
            o.$slideTrack.append(o.$slides),
            (o.$slidesCache = o.$slides),
            o.reinit();
        }),
      (n.prototype.setCSS = function (t) {
        var i,
          e,
          o = this,
          s = {};
        !0 === o.options.rtl && (t = -t),
          (i = "left" == o.positionProp ? Math.ceil(t) + "px" : "0px"),
          (e = "top" == o.positionProp ? Math.ceil(t) + "px" : "0px"),
          (s[o.positionProp] = t),
          !1 === o.transformsEnabled ||
            (!(s = {}) === o.cssTransitions
              ? (s[o.animType] = "translate(" + i + ", " + e + ")")
              : (s[o.animType] = "translate3d(" + i + ", " + e + ", 0px)")),
          o.$slideTrack.css(s);
      }),
      (n.prototype.setDimensions = function () {
        var t = this;
        !1 === t.options.vertical
          ? !0 === t.options.centerMode &&
            t.$list.css({
              padding: "0px " + t.options.centerPadding,
            })
          : (t.$list.height(
              t.$slides.first().outerHeight(!0) * t.options.slidesToShow
            ),
            !0 === t.options.centerMode &&
              t.$list.css({
                padding: t.options.centerPadding + " 0px",
              })),
          (t.listWidth = t.$list.width()),
          (t.listHeight = t.$list.height()),
          !1 === t.options.vertical && !1 === t.options.variableWidth
            ? ((t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow)),
              t.$slideTrack.width(
                Math.ceil(
                  t.slideWidth * t.$slideTrack.children(".slick-slide").length
                )
              ))
            : !0 === t.options.variableWidth
            ? t.$slideTrack.width(5e3 * t.slideCount)
            : ((t.slideWidth = Math.ceil(t.listWidth)),
              t.$slideTrack.height(
                Math.ceil(
                  t.$slides.first().outerHeight(!0) *
                    t.$slideTrack.children(".slick-slide").length
                )
              ));
        var i = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
        !1 === t.options.variableWidth &&
          t.$slideTrack.children(".slick-slide").width(t.slideWidth - i);
      }),
      (n.prototype.setFade = function () {
        var e,
          o = this;
        o.$slides.each(function (t, i) {
          (e = o.slideWidth * t * -1),
            !0 === o.options.rtl
              ? l(i).css({
                  position: "relative",
                  right: e,
                  top: 0,
                  zIndex: o.options.zIndex - 2,
                  opacity: 0,
                })
              : l(i).css({
                  position: "relative",
                  left: e,
                  top: 0,
                  zIndex: o.options.zIndex - 2,
                  opacity: 0,
                });
        }),
          o.$slides.eq(o.currentSlide).css({
            zIndex: o.options.zIndex - 1,
            opacity: 1,
          });
      }),
      (n.prototype.setHeight = function () {
        var t,
          i = this;
        1 === i.options.slidesToShow &&
          !0 === i.options.adaptiveHeight &&
          !1 === i.options.vertical &&
          ((t = i.$slides.eq(i.currentSlide).outerHeight(!0)),
          i.$list.css("height", t));
      }),
      (n.prototype.setOption = n.prototype.slickSetOption =
        function () {
          var t,
            i,
            e,
            o,
            s,
            a = this,
            n = !1;
          if (
            ("object" === l.type(arguments[0])
              ? ((e = arguments[0]), (n = arguments[1]), (s = "multiple"))
              : "string" === l.type(arguments[0]) &&
                ((e = arguments[0]),
                (o = arguments[1]),
                (n = arguments[2]),
                "responsive" === arguments[0] &&
                "array" === l.type(arguments[1])
                  ? (s = "responsive")
                  : void 0 !== arguments[1] && (s = "single")),
            "single" === s)
          )
            a.options[e] = o;
          else if ("multiple" === s)
            l.each(e, function (t, i) {
              a.options[t] = i;
            });
          else if ("responsive" === s)
            for (i in o)
              if ("array" !== l.type(a.options.responsive))
                a.options.responsive = [o[i]];
              else {
                for (t = a.options.responsive.length - 1; 0 <= t; )
                  a.options.responsive[t].breakpoint === o[i].breakpoint &&
                    a.options.responsive.splice(t, 1),
                    t--;
                a.options.responsive.push(o[i]);
              }
          n && (a.unload(), a.reinit());
        }),
      (n.prototype.setPosition = function () {
        var t = this;
        t.setDimensions(),
          t.setHeight(),
          !1 === t.options.fade
            ? t.setCSS(t.getLeft(t.currentSlide))
            : t.setFade(),
          t.$slider.trigger("setPosition", [t]);
      }),
      (n.prototype.setProps = function () {
        var t = this,
          i = document.body.style;
        (t.positionProp = !0 === t.options.vertical ? "top" : "left"),
          "top" === t.positionProp
            ? t.$slider.addClass("slick-vertical")
            : t.$slider.removeClass("slick-vertical"),
          (void 0 === i.WebkitTransition &&
            void 0 === i.MozTransition &&
            void 0 === i.msTransition) ||
            (!0 === t.options.useCSS && (t.cssTransitions = !0)),
          t.options.fade &&
            ("number" == typeof t.options.zIndex
              ? t.options.zIndex < 3 && (t.options.zIndex = 3)
              : (t.options.zIndex = t.defaults.zIndex)),
          void 0 !== i.OTransform &&
            ((t.animType = "OTransform"),
            (t.transformType = "-o-transform"),
            (t.transitionType = "OTransition"),
            void 0 === i.perspectiveProperty &&
              void 0 === i.webkitPerspective &&
              (t.animType = !1)),
          void 0 !== i.MozTransform &&
            ((t.animType = "MozTransform"),
            (t.transformType = "-moz-transform"),
            (t.transitionType = "MozTransition"),
            void 0 === i.perspectiveProperty &&
              void 0 === i.MozPerspective &&
              (t.animType = !1)),
          void 0 !== i.webkitTransform &&
            ((t.animType = "webkitTransform"),
            (t.transformType = "-webkit-transform"),
            (t.transitionType = "webkitTransition"),
            void 0 === i.perspectiveProperty &&
              void 0 === i.webkitPerspective &&
              (t.animType = !1)),
          void 0 !== i.msTransform &&
            ((t.animType = "msTransform"),
            (t.transformType = "-ms-transform"),
            (t.transitionType = "msTransition"),
            void 0 === i.msTransform && (t.animType = !1)),
          void 0 !== i.transform &&
            !1 !== t.animType &&
            ((t.animType = "transform"),
            (t.transformType = "transform"),
            (t.transitionType = "transition")),
          (t.transformsEnabled =
            t.options.useTransform && null !== t.animType && !1 !== t.animType);
      }),
      (n.prototype.setSlideClasses = function (t) {
        var i,
          e,
          o,
          s = this,
          a = s.$slider
            .find(".slick-slide")
            .removeClass("slick-active slick-center slick-current")
            .attr("aria-hidden", "true");
        s.$slides.eq(t).addClass("slick-current"),
          !0 === s.options.centerMode
            ? ((e = s.options.slidesToShow % 2 == 0 ? 1 : 0),
              (o = Math.floor(s.options.slidesToShow / 2)),
              !0 === s.options.infinite &&
                (o <= t && t <= s.slideCount - 1 - o
                  ? s.$slides
                      .slice(t - o + e, t + o + 1)
                      .addClass("slick-active")
                      .attr("aria-hidden", "false")
                  : ((i = s.options.slidesToShow + t),
                    a
                      .slice(i - o + 1 + e, i + o + 2)
                      .addClass("slick-active")
                      .attr("aria-hidden", "false")),
                0 === t
                  ? a
                      .eq(s.options.slidesToShow + s.slideCount + 1)
                      .addClass("slick-center")
                  : t === s.slideCount - 1 &&
                    a.eq(s.options.slidesToShow).addClass("slick-center")),
              s.$slides.eq(t).addClass("slick-center"))
            : 0 <= t && t <= s.slideCount - s.options.slidesToShow
            ? s.$slides
                .slice(t, t + s.options.slidesToShow)
                .addClass("slick-active")
                .attr("aria-hidden", "false")
            : a.length <= s.options.slidesToShow
            ? a.addClass("slick-active").attr("aria-hidden", "false")
            : ((o = s.slideCount % s.options.slidesToShow),
              (i = !0 === s.options.infinite ? s.options.slidesToShow + t : t),
              (s.options.slidesToShow == s.options.slidesToScroll &&
              s.slideCount - t < s.options.slidesToShow
                ? a.slice(i - (s.options.slidesToShow - o), i + o)
                : a.slice(i, i + s.options.slidesToShow)
              )
                .addClass("slick-active")
                .attr("aria-hidden", "false")),
          ("ondemand" !== s.options.lazyLoad &&
            "anticipated" !== s.options.lazyLoad) ||
            s.lazyLoad();
      }),
      (n.prototype.setupInfinite = function () {
        var t,
          i,
          e,
          o = this;
        if (
          (!0 === o.options.fade && (o.options.centerMode = !1),
          !0 === o.options.infinite &&
            !1 === o.options.fade &&
            ((i = null), o.slideCount > o.options.slidesToShow))
        ) {
          for (
            e =
              !0 === o.options.centerMode
                ? o.options.slidesToShow + 1
                : o.options.slidesToShow,
              t = o.slideCount;
            t > o.slideCount - e;
            --t
          )
            (i = t - 1),
              l(o.$slides[i])
                .clone(!0)
                .attr("id", "")
                .attr("data-slick-index", i - o.slideCount)
                .prependTo(o.$slideTrack)
                .addClass("slick-cloned");
          for (t = 0; t < e + o.slideCount; t += 1)
            (i = t),
              l(o.$slides[i])
                .clone(!0)
                .attr("id", "")
                .attr("data-slick-index", i + o.slideCount)
                .appendTo(o.$slideTrack)
                .addClass("slick-cloned");
          o.$slideTrack
            .find(".slick-cloned")
            .find("[id]")
            .each(function () {
              l(this).attr("id", "");
            });
        }
      }),
      (n.prototype.interrupt = function (t) {
        t || this.autoPlay(), (this.interrupted = t);
      }),
      (n.prototype.selectHandler = function (t) {
        (t = l(t.target).is(".slick-slide")
          ? l(t.target)
          : l(t.target).parents(".slick-slide")),
          (t = (t = parseInt(t.attr("data-slick-index"))) || 0);
        this.slideCount <= this.options.slidesToShow
          ? this.slideHandler(t, !1, !0)
          : this.slideHandler(t);
      }),
      (n.prototype.slideHandler = function (t, i, e) {
        var o,
          s,
          a,
          n,
          d = this;
        if (
          ((i = i || !1),
          !(
            (!0 === d.animating && !0 === d.options.waitForAnimate) ||
            (!0 === d.options.fade && d.currentSlide === t)
          ))
        )
          if (
            (!1 === i && d.asNavFor(t),
            (o = t),
            (a = d.getLeft(o)),
            (i = d.getLeft(d.currentSlide)),
            (d.currentLeft = null === d.swipeLeft ? i : d.swipeLeft),
            !1 === d.options.infinite &&
              !1 === d.options.centerMode &&
              (t < 0 || t > d.getDotCount() * d.options.slidesToScroll))
          )
            !1 === d.options.fade &&
              ((o = d.currentSlide),
              !0 !== e && d.slideCount > d.options.slidesToShow
                ? d.animateSlide(i, function () {
                    d.postSlide(o);
                  })
                : d.postSlide(o));
          else if (
            !1 === d.options.infinite &&
            !0 === d.options.centerMode &&
            (t < 0 || t > d.slideCount - d.options.slidesToScroll)
          )
            !1 === d.options.fade &&
              ((o = d.currentSlide),
              !0 !== e && d.slideCount > d.options.slidesToShow
                ? d.animateSlide(i, function () {
                    d.postSlide(o);
                  })
                : d.postSlide(o));
          else {
            if (
              (d.options.autoplay && clearInterval(d.autoPlayTimer),
              (s =
                o < 0
                  ? d.slideCount % d.options.slidesToScroll != 0
                    ? d.slideCount - (d.slideCount % d.options.slidesToScroll)
                    : d.slideCount + o
                  : o >= d.slideCount
                  ? d.slideCount % d.options.slidesToScroll != 0
                    ? 0
                    : o - d.slideCount
                  : o),
              (d.animating = !0),
              d.$slider.trigger("beforeChange", [d, d.currentSlide, s]),
              (i = d.currentSlide),
              (d.currentSlide = s),
              d.setSlideClasses(d.currentSlide),
              d.options.asNavFor &&
                (n = (n = d.getNavTarget()).slick("getSlick")).slideCount <=
                  n.options.slidesToShow &&
                n.setSlideClasses(d.currentSlide),
              d.updateDots(),
              d.updateArrows(),
              !0 === d.options.fade)
            )
              return (
                !0 !== e
                  ? (d.fadeSlideOut(i),
                    d.fadeSlide(s, function () {
                      d.postSlide(s);
                    }))
                  : d.postSlide(s),
                void d.animateHeight()
              );
            !0 !== e && d.slideCount > d.options.slidesToShow
              ? d.animateSlide(a, function () {
                  d.postSlide(s);
                })
              : d.postSlide(s);
          }
      }),
      (n.prototype.startLoad = function () {
        var t = this;
        !0 === t.options.arrows &&
          t.slideCount > t.options.slidesToShow &&
          (t.$prevArrow.hide(), t.$nextArrow.hide()),
          !0 === t.options.dots &&
            t.slideCount > t.options.slidesToShow &&
            t.$dots.hide(),
          t.$slider.addClass("slick-loading");
      }),
      (n.prototype.swipeDirection = function () {
        var t = this,
          i = t.touchObject.startX - t.touchObject.curX,
          e = t.touchObject.startY - t.touchObject.curY,
          i = Math.atan2(e, i),
          i = Math.round((180 * i) / Math.PI);
        return ((i = i < 0 ? 360 - Math.abs(i) : i) <= 45 && 0 <= i) ||
          (i <= 360 && 315 <= i)
          ? !1 === t.options.rtl
            ? "left"
            : "right"
          : 135 <= i && i <= 225
          ? !1 === t.options.rtl
            ? "right"
            : "left"
          : !0 === t.options.verticalSwiping
          ? 35 <= i && i <= 135
            ? "down"
            : "up"
          : "vertical";
      }),
      (n.prototype.swipeEnd = function (t) {
        var i,
          e,
          o = this;
        if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
          return (o.scrolling = !1);
        if (
          ((o.interrupted = !1),
          (o.shouldClick = !(10 < o.touchObject.swipeLength)),
          void 0 === o.touchObject.curX)
        )
          return !1;
        if (
          (!0 === o.touchObject.edgeHit &&
            o.$slider.trigger("edge", [o, o.swipeDirection()]),
          o.touchObject.swipeLength >= o.touchObject.minSwipe)
        ) {
          switch ((e = o.swipeDirection())) {
            case "left":
            case "down":
              (i = o.options.swipeToSlide
                ? o.checkNavigable(o.currentSlide + o.getSlideCount())
                : o.currentSlide + o.getSlideCount()),
                (o.currentDirection = 0);
              break;
            case "right":
            case "up":
              (i = o.options.swipeToSlide
                ? o.checkNavigable(o.currentSlide - o.getSlideCount())
                : o.currentSlide - o.getSlideCount()),
                (o.currentDirection = 1);
          }
          "vertical" != e &&
            (o.slideHandler(i),
            (o.touchObject = {}),
            o.$slider.trigger("swipe", [o, e]));
        } else
          o.touchObject.startX !== o.touchObject.curX &&
            (o.slideHandler(o.currentSlide), (o.touchObject = {}));
      }),
      (n.prototype.swipeHandler = function (t) {
        var i = this;
        if (
          !(
            !1 === i.options.swipe ||
            ("ontouchend" in document && !1 === i.options.swipe) ||
            (!1 === i.options.draggable && -1 !== t.type.indexOf("mouse"))
          )
        )
          switch (
            ((i.touchObject.fingerCount =
              t.originalEvent && void 0 !== t.originalEvent.touches
                ? t.originalEvent.touches.length
                : 1),
            (i.touchObject.minSwipe = i.listWidth / i.options.touchThreshold),
            !0 === i.options.verticalSwiping &&
              (i.touchObject.minSwipe =
                i.listHeight / i.options.touchThreshold),
            t.data.action)
          ) {
            case "start":
              i.swipeStart(t);
              break;
            case "move":
              i.swipeMove(t);
              break;
            case "end":
              i.swipeEnd(t);
          }
      }),
      (n.prototype.swipeMove = function (t) {
        var i,
          e,
          o = this,
          s = void 0 !== t.originalEvent ? t.originalEvent.touches : null;
        return (
          !(!o.dragging || o.scrolling || (s && 1 !== s.length)) &&
          ((i = o.getLeft(o.currentSlide)),
          (o.touchObject.curX = void 0 !== s ? s[0].pageX : t.clientX),
          (o.touchObject.curY = void 0 !== s ? s[0].pageY : t.clientY),
          (o.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(o.touchObject.curX - o.touchObject.startX, 2))
          )),
          (e = Math.round(
            Math.sqrt(Math.pow(o.touchObject.curY - o.touchObject.startY, 2))
          )),
          !o.options.verticalSwiping && !o.swiping && 4 < e
            ? !(o.scrolling = !0)
            : (!0 === o.options.verticalSwiping &&
                (o.touchObject.swipeLength = e),
              (s = o.swipeDirection()),
              void 0 !== t.originalEvent &&
                4 < o.touchObject.swipeLength &&
                ((o.swiping = !0), t.preventDefault()),
              (e =
                (!1 === o.options.rtl ? 1 : -1) *
                (o.touchObject.curX > o.touchObject.startX ? 1 : -1)),
              !0 === o.options.verticalSwiping &&
                (e = o.touchObject.curY > o.touchObject.startY ? 1 : -1),
              (t = o.touchObject.swipeLength),
              (o.touchObject.edgeHit = !1) === o.options.infinite &&
                ((0 === o.currentSlide && "right" === s) ||
                  (o.currentSlide >= o.getDotCount() && "left" === s)) &&
                ((t = o.touchObject.swipeLength * o.options.edgeFriction),
                (o.touchObject.edgeHit = !0)),
              !1 === o.options.vertical
                ? (o.swipeLeft = i + t * e)
                : (o.swipeLeft = i + t * (o.$list.height() / o.listWidth) * e),
              !0 === o.options.verticalSwiping && (o.swipeLeft = i + t * e),
              !0 !== o.options.fade &&
                !1 !== o.options.touchMove &&
                (!0 === o.animating
                  ? ((o.swipeLeft = null), !1)
                  : void o.setCSS(o.swipeLeft))))
        );
      }),
      (n.prototype.swipeStart = function (t) {
        var i,
          e = this;
        if (
          ((e.interrupted = !0),
          1 !== e.touchObject.fingerCount ||
            e.slideCount <= e.options.slidesToShow)
        )
          return !(e.touchObject = {});
        void 0 !== t.originalEvent &&
          void 0 !== t.originalEvent.touches &&
          (i = t.originalEvent.touches[0]),
          (e.touchObject.startX = e.touchObject.curX =
            void 0 !== i ? i.pageX : t.clientX),
          (e.touchObject.startY = e.touchObject.curY =
            void 0 !== i ? i.pageY : t.clientY),
          (e.dragging = !0);
      }),
      (n.prototype.unfilterSlides = n.prototype.slickUnfilter =
        function () {
          var t = this;
          null !== t.$slidesCache &&
            (t.unload(),
            t.$slideTrack.children(this.options.slide).detach(),
            t.$slidesCache.appendTo(t.$slideTrack),
            t.reinit());
        }),
      (n.prototype.unload = function () {
        var t = this;
        l(".slick-cloned", t.$slider).remove(),
          t.$dots && t.$dots.remove(),
          t.$prevArrow &&
            t.htmlExpr.test(t.options.prevArrow) &&
            t.$prevArrow.remove(),
          t.$nextArrow &&
            t.htmlExpr.test(t.options.nextArrow) &&
            t.$nextArrow.remove(),
          t.$slides
            .removeClass("slick-slide slick-active slick-visible slick-current")
            .attr("aria-hidden", "true")
            .css("width", "");
      }),
      (n.prototype.unslick = function (t) {
        this.$slider.trigger("unslick", [this, t]), this.destroy();
      }),
      (n.prototype.updateArrows = function () {
        var t = this;
        Math.floor(t.options.slidesToShow / 2);
        !0 === t.options.arrows &&
          t.slideCount > t.options.slidesToShow &&
          !t.options.infinite &&
          (t.$prevArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          t.$nextArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          0 === t.currentSlide
            ? (t.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              t.$nextArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : ((t.currentSlide >= t.slideCount - t.options.slidesToShow &&
                !1 === t.options.centerMode) ||
                (t.currentSlide >= t.slideCount - 1 &&
                  !0 === t.options.centerMode)) &&
              (t.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              t.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false")));
      }),
      (n.prototype.updateDots = function () {
        var t = this;
        null !== t.$dots &&
          (t.$dots.find("li").removeClass("slick-active").end(),
          t.$dots
            .find("li")
            .eq(Math.floor(t.currentSlide / t.options.slidesToScroll))
            .addClass("slick-active"));
      }),
      (n.prototype.visibility = function () {
        this.options.autoplay &&
          (document[this.hidden]
            ? (this.interrupted = !0)
            : (this.interrupted = !1));
      }),
      (l.fn.slick = function () {
        for (
          var t,
            i = this,
            e = arguments[0],
            o = Array.prototype.slice.call(arguments, 1),
            s = i.length,
            a = 0;
          a < s;
          a++
        )
          if (
            ("object" == typeof e || void 0 === e
              ? (i[a].slick = new n(i[a], e))
              : (t = i[a].slick[e].apply(i[a].slick, o)),
            void 0 !== t)
          )
            return t;
        return i;
      });
  });
