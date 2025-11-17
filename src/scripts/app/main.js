define([
  "jquery",
  "components/useInteractions",
  "components/utils",
  "frameworks/aos.min",
  "components/useScorm",
  "text!structure/index.html",
  "components/contentMap",
  "components/contentMenu",
  "components/audioPlayer",
  "components/helpers",
  "frameworks/dialog.min",
  "frameworks/utils-aria.min",
  "components/tools/header",
  "frameworks/keen-slider.min",
], function ($, interacoes, funcoes, aos, ScormDataManager) {
  var listaTelas = [],
    caminhoBase = "",
    contadorConteudoCarregado = 0,
    modoExibicao =
      "" != funcoes.getParameterByName("mode")
        ? funcoes.getParameterByName("mode")
        : "user"; // h
  let configuracoesGlobais;
  var statusTelas = [
    // p
    {
      id: 0,
      active: !0,
      completed: !1,
    },
  ];
  function Main() {
    // s
    (this.template = $(require("text!structure/index.html"))),
      $("body").append(this.template),
      (this.default_suspend_data = {
        visited: [],
        highlights: [],
        postits: [],
      }),
      (this.scormData = new ScormDataManager()),
      (this.telaInicial = this.scormData.get("cmi.core.lesson_location") || 0);
  }
  function Tela(dadosTela, idTela) {
    // m
    (this.defaultdata = {
      url: "",
      titulo: "",
      status: "",
      tipo: "conteudo",
    }),
      (this.data = jQuery.extend({}, this.defaultdata, dadosTela)),
      (this.html = ""),
      (this.id = idTela),
      (this.tela = null);
    var telaInstance = this;
    jQuery.ajax({
      url: caminhoBase + this.data.url,
      cache: !1,
      success: function (conteudo, status, xhr) {
        telaInstance.initTela(conteudo);
      },
      error: function () {
        telaInstance.initTela(
          "<h2 class='corfonte-2'>Erro ao carregar conteúdo.</h2>"
        );
      },
    });
  }

  return (
    (Main.prototype = {
      init: function () {
        var cursoInstance = this, // e
          dadosDefaultTela = {
            // s
            url: "",
            tipo: "conteudo",
            titulo: "",
          };

        const mapUrl = "./src/map.json";

        jQuery.getJSON(mapUrl, function (dadosMapa) {
          // t
          caminhoBase = dadosMapa.curso.path || "";
          for (var i = 0; i < dadosMapa.curso.conteudo.telas.length; i++)
            listaTelas[i] = jQuery.extend(
              {},
              dadosDefaultTela,
              dadosMapa.curso.conteudo.telas[i]
            );
          cursoInstance.configOnePage(dadosMapa), cursoInstance.loadContent();
        }),
          "" == this.scormData.get("cmi.suspend_data") &&
            this.scormData.set("cmi.suspend_data", btoa("{}"));
        try {
          JSON.parse(atob(this.scormData.get("cmi.suspend_data")));
        } catch (erro) {
          // t
          this.scormData.set("cmi.suspend_data", btoa("{}"));
        }
        this.suspend_data = jQuery.extend(
          {},
          this.default_suspend_data,
          JSON.parse(atob(this.scormData.get("cmi.suspend_data")))
        );
        for (var i = 0; i < this.suspend_data.visited.length; i++)
          // t
          statusTelas[i] = {
            id: this.suspend_data.visited[i].id,
            completed: this.suspend_data.visited[i].completed || !1,
            active: !0,
          };
      },
      configOnePage: function (dadosMapa) {
        $(".menuBaseContainerInfo .mdoInfo h2").html(dadosMapa.curso.titulo);
        $(".menuBaseContainerInfo .mdoInfo p").html(dadosMapa.curso.aula);
        // a
        if (
          (dadosMapa.curso.titulo &&
            (60 < dadosMapa.curso.titulo.length &&
              $("#header h1").addClass("shrinkTitle"),
            $("#header h1, #new-header h1").html(dadosMapa.curso.titulo),
            dadosMapa.curso.aula
              ? $("#header h2, #new-header h2").html(dadosMapa.curso.aula)
              : ($("#header h1, #new-header h1").attr(
                  "style",
                  "margin-bottom: 0 !important;"
                ),
                $("#header h2, #new-header h2").addClass("d-none"))),
          dadosMapa.curso.template &&
            $("head").append(
              "<link rel='stylesheet' href='../../assets/css/" +
                dadosMapa.curso.template +
                ".min.css' type='text/css' media='screen'>"
            ),
          dadosMapa.curso.progresso)
        ) {
          if (dadosMapa.curso.progresso.aulas_total) {
            var indicePrimeiraAula = dadosMapa.curso.progresso.aula_atual - 1; // t
            dadosMapa.curso.progresso.aula_atual ==
            dadosMapa.curso.progresso.aulas_total
              ? indicePrimeiraAula--
              : 1 == dadosMapa.curso.progresso.aula_atual
              ? (indicePrimeiraAula = 1)
              : 0 == dadosMapa.curso.progresso.aula_atual &&
                (indicePrimeiraAula = 0);
            for (
              var indiceAula = indicePrimeiraAula;
              indiceAula <= indicePrimeiraAula + 2;
              indiceAula++
            ) {
              // e
              let elementoAula = $("<li><span>" + indiceAula + "</span></li>"); // t
              indiceAula == dadosMapa.curso.progresso.aula_atual &&
                elementoAula.addClass("ativo"),
                $("#aulas").append(elementoAula);
            }
          }
          if (dadosMapa.curso.progresso.modulos_total) {
            var tituloListaModulos = $("<li class='titulo-lista'>Módulo</li>"); // s
            $("#modulos").append(tituloListaModulos);
            for (
              indiceAula = 0;
              indiceAula < dadosMapa.curso.progresso.modulos_total;
              indiceAula++
            ) {
              // e
              let elementoModulo = $(
                "<li><button>" + (indiceAula + 1) + "</button></li>"
              ); // t
              indiceAula == dadosMapa.curso.progresso.modulo_atual &&
                elementoModulo.addClass("ativo"),
                $("#modulos").append(elementoModulo);
            }
          }
        }
      },
      loadContent: function () {
        var cursoInstance = this, // e
          tela;
        for (var i = 0; i < listaTelas.length; i++) {
          // e
          (listaTelas[i].status = statusTelas.find(
            (status) => status.id == i
          ) || {
            // t
            id: i,
            active: !1,
            completed: !1,
          }),
            (0 == i ||
              (!listaTelas[i].status.active &&
                listaTelas[i - 1].status.completed)) &&
              (listaTelas[i].status.active = !0);
          tela = new Tela(listaTelas[i], i); // t
          (listaTelas[i].tela = tela),
            $(tela).on("fimTela", function (evento) {
              // t
              this.id < listaTelas.length - 1 &&
                (listaTelas[this.id + 1].tela.ativaTela(),
                cursoInstance.template.find("#content").addClass("seta-ativa")),
                cursoInstance.setTelaCompleted(this.id);
            }),
            $(tela).on("telaContentLoaded", function (evento) {
              // t
              cursoInstance.setContentLoaded(this.id);
            });
        }
      },
      setTelaCompleted: function (idTela) {
        // e
        var indiceVisita = this.suspend_data.visited.findIndex(function (
          visita,
          indice
        ) {
          // t, a
          return visita.id == idTela;
        });
        -1 !== indiceVisita &&
          (JSON.stringify(),
          (this.suspend_data.visited[indiceVisita].completed = !0),
          this.scormData.set(
            "cmi.suspend_data",
            btoa(JSON.stringify(this.suspend_data))
          ),
          this.setProgress());
      },
      setProgress: function () {
        var cursoInstance = this, // t
          telasCompletas = this.suspend_data.visited.filter(
            // a
            (t) => 1 == t.completed
          ),
          percentualAtual = this.pctProgresso || 0; // e
        (this.pctProgresso = parseInt(
          (telasCompletas.length / listaTelas.length) * 100
        )),
          100 <= this.pctProgresso &&
            cursoInstance.scormData.set("cmi.core.lesson_status", "completed");
        var intervaloProgresso = setInterval(function () {
          // s
          ++percentualAtual >= cursoInstance.pctProgresso &&
            ((percentualAtual = cursoInstance.pctProgresso),
            clearInterval(intervaloProgresso)),
            $("#progresso-aula .pct-progresso-aula").html(
              percentualAtual + "%"
            );
          $(".progresso-aula .ko-progresso-text").html(percentualAtual + "%");
          $("[data-progress]").attr("data-progress", percentualAtual);
        }, 20);
      },
      setContentLoaded: function (idTela) {
        // t
        var cursoInstance = this; // s
        if (++contadorConteudoCarregado >= listaTelas.length) {
          $("#header, #new-header").header(configuracoesGlobais),
            $("#sumario").sumario(listaTelas, cursoInstance),
            $("#sumario").on("navegaContent", function (e, idTela, s) {
              cursoInstance.navegaContent(idTela);
            }),
            $("#locucaoPlayer").locucaoPlayer();
          for (var i = 0; i < listaTelas.length; i++)
            // a
            listaTelas[i].tela.setTelaObject();
          this.checkScroll(),
            $(this).trigger("contentLoaded"),
            $("#content").tools({
              highlights: cursoInstance.suspend_data.highlights,
              postits: cursoInstance.suspend_data.postits,
              wrapper: $("#wrapper"),
            }),
            $("#content").on("gravaTool", function (e, dadosTool) {
              // t, a
              "highlight" == dadosTool.tool &&
                (cursoInstance.suspend_data.highlights = dadosTool.val),
                "postit" == dadosTool.tool &&
                  (cursoInstance.suspend_data.postits = dadosTool.val),
                cursoInstance.scormData.set(
                  "cmi.suspend_data",
                  btoa(JSON.stringify(cursoInstance.suspend_data))
                );
            }),
            $(".bt-insere-postit").on("click", function (e) {
              // t
              $("#content").tools(
                "inserePostit",
                listaTelas[cursoInstance.telaAtual].tela.tela
              );
            }),
            $("#marcaTexto").on("click", function (e) {
              // t
              e.preventDefault(),
                $(this).toggleClass("ativo"),
                $("#content").tools("toggleHighlight");
            }),
            $("#PDF").on("click", function (e) {
              // t
              $("#content").tools("baixaPDF");
            }),
            $("#fontSize").on("click", function (e) {
              // t
              $("#content").tools("setFontSize");
            }),
            $("#contrast").on("click", function (e) {
              // t
              $("#content").tools("setContrast");
            }),
            $(".bt-sumario").on("click", function () {
              $("#bt-sumario").trigger("click");
            }),
            $("#bt-menu").on("click", function () {
              $("#marcaTexto").trigger("click");
              $("body").trigger("open-menu");
            }),
            $(".close-menu, .menuBaseHit, .hit-tools").on(
              "click",
              function (e) {
                $("body").trigger("closed-menu");
              }
            );

          $("#botao-topo").bind("click", function (e) {
            // t
            return (
              $("html, body").animate(
                {
                  scrollTop: 0,
                },
                600
              ),
              !1
            );
          }),
            this.iniciaTela(this.telaInicial),
            this.setProgress(),
            $(window).scroll(),
            this.telaInicial && this.navegaContent(this.telaInicial),
            ("diagramacao" != modoExibicao && "locucao" != modoExibicao) ||
              (this.tema && $("#content").attr("data-tema", this.tema),
              $("#content").tools("baixaPDF"));
        }
      },
      checkScroll: function () {
        var cursoInstance = this, // e
          alturaHeader = $("header").outerHeight() + 15, // s
          telas = $(".tela"); // i
        $(window).scroll(function () {
          var posicaoScrollMedia =
              $(this).scrollTop() + alturaHeader + $(window).height() / 2, // t
            telasVisiveis = telas.map(function () {
              // a
              if (
                ($(this).offset().top < posicaoScrollMedia ||
                  ($(this).height() < $(window).height() / 2 &&
                    (parseInt($(this).offset().top + $(this).height()),
                    $(window).scrollTop(),
                    $(window).height())),
                ($(this).offset().top < posicaoScrollMedia ||
                  ($(this).height() < $(window).height() / 2 &&
                    parseInt($(this).offset().top + $(this).height()) <=
                      $(window).scrollTop() + $(window).height())) &&
                  !$(this).hasClass("locked"))
              )
                return this;
            }),
            idTelaVisivel = (telasVisiveis =
              telasVisiveis[telasVisiveis.length - 1]) // a
              ? telasVisiveis.getAttribute("data-id")
              : "";
          idTelaVisivel != cursoInstance.telaAtual &&
            (cursoInstance.template.find("#content").removeClass("seta-ativa"),
            cursoInstance.iniciaTela(idTelaVisivel));
        });
      },
      iniciaTela: function (idTela) {
        // e
        -1 ==
          this.suspend_data.visited.findIndex(function (visita, indice) {
            // t, a
            return visita.id == idTela;
          }) &&
          (this.suspend_data.visited.push({
            id: parseInt(idTela),
          }),
          this.scormData.set(
            "cmi.suspend_data",
            btoa(JSON.stringify(this.suspend_data))
          )),
          this.telaAtual &&
            listaTelas[this.telaAtual].tela.tela.trigger("fimTela"),
          this.setTela(idTela);
      },
      setTela: function (idTela) {
        // t
        (this.telaAtual = idTela),
          $("#content").tools(
            "setCurrentPage",
            idTela,
            listaTelas[idTela].titulo
          ),
          this.scormData.set("cmi.core.lesson_location", parseInt(idTela)),
          $(this).trigger("initTela", idTela),
          $("#sumario").sumario("initTela", idTela),
          listaTelas[idTela].tela.tela.trigger("initTela");
        var urlFormatada = funcoes.formatURL(listaTelas[idTela].titulo); // a
        clearTimeout(window.intervaloScroll),
          (window.intervaloScroll = setTimeout(() => {
            history.pushState({}, urlFormatada, "#" + urlFormatada);
          }, 500));
      },
      getTela: function () {
        return this.telaAtual;
      },
      navegaContent: function (idTela) {
        // t
        $(".tela[data-id=" + idTela + "]")[0].scrollIntoView();
      },
    }),
    (Tela.prototype = {
      initTela: function (conteudo) {
        // t
        (this.html = conteudo), $(this).trigger("telaContentLoaded");
      },
      setTelaObject: function (t) {
        var telaInstance = this; // a
        let elementoTela = $(
          // e
          "<div class='tela' data-aos='fade-up-right'></div>"
        )
          .prop("id", "tela-" + (this.id + 1))
          .attr("data-id", this.id)
          .attr("data-titulo", funcoes.formatURL(this.data.titulo))
          .addClass("tela-" + this.data.tipo)
          .appendTo($("#content"));
        "dev" === modoExibicao || this.data.status.active
          ? "dev" == modoExibicao &&
            elementoTela.append(
              "<div class='tela-dev'>" + this.data.url + "</div>"
            )
          : elementoTela.addClass("lockedRSS");
        /// Remover esssa class para nao da problema no SLIDE - elementoTela.addClass("locked");
        let conteudoTela = $(
          "<div class='tela-content d-flex align-items-center justify-content-center flex-column'></div>"
        );
        conteudoTela.html(this.html),
          (this.tela = elementoTela),
          elementoTela.append(conteudoTela),
          elementoTela.atividades(),
          elementoTela.interacoes(configuracoesGlobais),
          elementoTela.locucao(),
          elementoTela.on("initTela", function () {
            $(this).trigger("ativaTela");
          }),
          elementoTela.on("fimContentTela", function () {
            $(telaInstance).trigger("fimTela"), telaInstance.completaTela();
          }),
          elementoTela.on("fimContentTela", function () {}),
          this.data.status.completed && this.completaTela(),
          this.data.status.active && this.ativaTela();
      },
      ativaTela: function () {
        this.tela.addClass("next-screen"),
          this.tela.removeClass("locked"),
          $("#sumario").sumario("unlock", this.id);
      },
      completaTela: function () {
        this.tela.addClass("completed");
      },
    }),
    Main
  );
});
