define([
  "jquery",
  "components/useInteractions",
  "components/utils",
  "frameworks/aos.min",
  "components/useScorm",
  "text!structure/index.html",
  "components/contentMap",
  "components/audioPlayer",
  "components/helpers",
  "frameworks/dialog.min",
  "frameworks/utils-aria.min",
  "components/tools/header",
  "frameworks/keen-slider.min",
], function (
  jQuery, // o
  interacoes, // t
  funcoes, // i
  aos, // a
  ScormDataManager
) {
  var listaTelas = [], // n
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
    (this.template = jQuery(require("text!structure/index.html"))),
      jQuery("body").append(this.template),
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
        // a
        if (
          (dadosMapa.curso.titulo &&
            (60 < dadosMapa.curso.titulo.length &&
              jQuery("#header h1").addClass("shrinkTitle"),
            jQuery("#header h1, #new-header h1").html(dadosMapa.curso.titulo),
            dadosMapa.curso.aula
              ? jQuery("#header h2, #new-header h2").html(dadosMapa.curso.aula)
              : (jQuery("#header h1, #new-header h1").attr(
                  "style",
                  "margin-bottom: 0 !important;"
                ),
                jQuery("#header h2, #new-header h2").addClass("d-none"))),
          dadosMapa.curso.template &&
            jQuery("head").append(
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
              let elementoAula = jQuery(
                "<li><span>" + indiceAula + "</span></li>"
              ); // t
              indiceAula == dadosMapa.curso.progresso.aula_atual &&
                elementoAula.addClass("ativo"),
                jQuery("#aulas").append(elementoAula);
            }
          }
          if (dadosMapa.curso.progresso.modulos_total) {
            var tituloListaModulos = jQuery(
              "<li class='titulo-lista'>Módulo</li>"
            ); // s
            jQuery("#modulos").append(tituloListaModulos);
            for (
              indiceAula = 0;
              indiceAula < dadosMapa.curso.progresso.modulos_total;
              indiceAula++
            ) {
              // e
              let elementoModulo = jQuery(
                "<li><button>" + (indiceAula + 1) + "</button></li>"
              ); // t
              indiceAula == dadosMapa.curso.progresso.modulo_atual &&
                elementoModulo.addClass("ativo"),
                jQuery("#modulos").append(elementoModulo);
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
            jQuery(tela).on("fimTela", function (evento) {
              // t
              this.id < listaTelas.length - 1 &&
                (listaTelas[this.id + 1].tela.ativaTela(),
                cursoInstance.template.find("#content").addClass("seta-ativa")),
                cursoInstance.setTelaCompleted(this.id);
            }),
            jQuery(tela).on("telaContentLoaded", function (evento) {
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
            jQuery("#progresso-aula .pct-progresso-aula").html(
              percentualAtual + "%"
            );
        }, 20);
      },
      setContentLoaded: function (idTela) {
        // t
        var cursoInstance = this; // s
        if (++contadorConteudoCarregado >= listaTelas.length) {
          jQuery("#header, #new-header").header(configuracoesGlobais),
            jQuery("#sumario").sumario(listaTelas, cursoInstance),
            jQuery("#sumario").on("navegaContent", function (e, idTela, s) {
              cursoInstance.navegaContent(idTela);
            }),
            jQuery("#locucaoPlayer").locucaoPlayer();
          for (var i = 0; i < listaTelas.length; i++)
            // a
            listaTelas[i].tela.setTelaObject();
          this.checkScroll(),
            jQuery(this).trigger("contentLoaded"),
            jQuery("#content").tools({
              highlights: cursoInstance.suspend_data.highlights,
              postits: cursoInstance.suspend_data.postits,
              wrapper: jQuery("#wrapper"),
            }),
            jQuery("#content").on("gravaTool", function (e, dadosTool) {
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
            jQuery(".bt-insere-postit").on("click", function (e) {
              // t
              jQuery("#content").tools(
                "inserePostit",
                listaTelas[cursoInstance.telaAtual].tela.tela
              );
            }),
            jQuery("#marcaTexto").on("click", function (e) {
              // t
              e.preventDefault(),
                jQuery(this).toggleClass("ativo"),
                jQuery("#content").tools("habilitaHighlight");
            }),
            jQuery("#PDF").on("click", function (e) {
              // t
              jQuery("#content").tools("baixaPDF");
            }),
            jQuery("#fontSize").on("click", function (e) {
              // t
              jQuery("#content").tools("setFontSize");
            }),
            jQuery("#contrast").on("click", function (e) {
              // t
              jQuery("#content").tools("setContrast");
            }),
            jQuery(".bt-sumario").on("click", function () {
              jQuery("#bt-sumario").trigger("click");
            }),
            jQuery("#botao-topo").bind("click", function (e) {
              // t
              return (
                jQuery("html, body").animate(
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
            jQuery(window).scroll(),
            this.telaInicial && this.navegaContent(this.telaInicial),
            ("diagramacao" != modoExibicao && "locucao" != modoExibicao) ||
              (this.tema && jQuery("#content").attr("data-tema", this.tema),
              jQuery("#content").tools("baixaPDF"));
        }
      },
      checkScroll: function () {
        var cursoInstance = this, // e
          alturaHeader = jQuery("header").outerHeight() + 15, // s
          telas = jQuery(".tela"); // i
        jQuery(window).scroll(function () {
          var posicaoScrollMedia =
              jQuery(this).scrollTop() +
              alturaHeader +
              jQuery(window).height() / 2, // t
            telasVisiveis = telas.map(function () {
              // a
              if (
                (jQuery(this).offset().top < posicaoScrollMedia ||
                  (jQuery(this).height() < jQuery(window).height() / 2 &&
                    (parseInt(
                      jQuery(this).offset().top + jQuery(this).height()
                    ),
                    jQuery(window).scrollTop(),
                    jQuery(window).height())),
                (jQuery(this).offset().top < posicaoScrollMedia ||
                  (jQuery(this).height() < jQuery(window).height() / 2 &&
                    parseInt(
                      jQuery(this).offset().top + jQuery(this).height()
                    ) <=
                      jQuery(window).scrollTop() + jQuery(window).height())) &&
                  !jQuery(this).hasClass("locked"))
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
          jQuery("#content").tools(
            "setTelaAtual",
            idTela,
            listaTelas[idTela].titulo
          ),
          this.scormData.set("cmi.core.lesson_location", parseInt(idTela)),
          jQuery(this).trigger("initTela", idTela),
          jQuery("#sumario").sumario("initTela", idTela),
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
        jQuery(".tela[data-id=" + idTela + "]")[0].scrollIntoView();
      },
    }),
    (Tela.prototype = {
      initTela: function (conteudo) {
        // t
        (this.html = conteudo), jQuery(this).trigger("telaContentLoaded");
      },
      setTelaObject: function (t) {
        var telaInstance = this; // a
        let elementoTela = jQuery(
          // e
          "<div class='tela' data-aos='fade-up-right'></div>"
        )
          .prop("id", "tela-" + (this.id + 1))
          .attr("data-id", this.id)
          .attr("data-titulo", funcoes.formatURL(this.data.titulo))
          .addClass("tela-" + this.data.tipo)
          .appendTo(jQuery("#content"));
        "dev" === modoExibicao || this.data.status.active
          ? "dev" == modoExibicao &&
            elementoTela.append(
              "<div class='tela-dev'>" + this.data.url + "</div>"
            )
          : elementoTela.addClass("locked");
        let conteudoTela = jQuery(
          // s
          "<div class='tela-content d-flex align-items-center justify-content-center flex-column'></div>"
        );
        conteudoTela.html(this.html),
          (this.tela = elementoTela),
          elementoTela.append(conteudoTela),
          elementoTela.atividades(),
          elementoTela.interacoes(configuracoesGlobais),
          elementoTela.locucao(),
          elementoTela.on("initTela", function () {
            jQuery(this).trigger("ativaTela");
          }),
          elementoTela.on("fimContentTela", function () {
            jQuery(telaInstance).trigger("fimTela"),
              telaInstance.completaTela();
          }),
          elementoTela.on("fimContentTela", function () {}),
          this.data.status.completed && this.completaTela(),
          this.data.status.active && this.ativaTela();
      },
      ativaTela: function () {
        this.tela.addClass("next-screen"),
          this.tela.removeClass("locked"),
          jQuery("#sumario").sumario("unlock", this.id);
      },
      completaTela: function () {
        this.tela.addClass("completed");
      },
    }),
    Main
  );
});
