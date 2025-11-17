define([
  "jquery",
  "frameworks/jquery-ui.min",
  "components/utils",
  "components/tools/postit",
  "components/tools/highlight",
  "components/tools/pdf",
  "components/tools/toolcard",
  "frameworks/jquery.mCustomScrollbar.min",
], function ($, jQueryUI, utils) {
  "use strict";
  var ToolsManager = window.Tools || {};

  /**
   * Atualiza o contador de ferramentas na interface.
   * @param {jQuery} element - Elemento jQuery onde o contador será exibido.
   * @param {number|string} count - O número de itens a ser exibido.
   */
  function updateToolCount(element, count) {
    element.html(count ? count : "0");
    // 0 < count ? (element.removeClass("d-none"), element.html(count)) : element.addClass("");
  }

  /**
   * Construtor do ToolsManager.
   * @param {HTMLElement} element - O elemento DOM principal onde as ferramentas serão aplicadas.
   * @param {object} options - Opções de configuração.
   */
  ((ToolsManager = function (element, options) {
    var self = this,
      defaultSettings = {
        highlights: [],
        postits: [],
        fontSize: (parseInt($("body").css("font-size")) / 16) * 100,
      };

    (this.settings = $.extend(!0, defaultSettings, options)),
      (this.fontSize = this.settings.fontSize),
      (this.element = element),
      // Inicializa a ferramenta de Highlights
      $(element).highlights({
        list: $("#tools-content .highlight-content"),
        parser: ".tela",
        highlights: self.settings.highlights,
      }),
      // Inicializa a ferramenta de Postits
      $(element).postits({
        list: $("#tools-content .postits-content"),
        parser: ".tela",
        postits: self.settings.postits,
      }),
      // Inicializa a ferramenta de PDF
      $(element).PDF(options.wrapper),
      // Atualiza contadores iniciais
      updateToolCount(
        $("#bt-highlights-list .tool-count"),
        self.settings.highlights.length || 0
      ),
      updateToolCount(
        $("#bt-postits-list .tool-count"),
        self.settings.postits.length
      ),
      updateToolCount(
        $(".menuBaseContainerInfo .infoMenuDestaque span"),
        self.settings.highlights.length || "0"
      ),
      updateToolCount(
        $(".menuBaseContainerInfo .infoMenuPost span"),
        self.settings.postits.length || "0"
      ),
      // Evento para atualização de Highlights
      $(element).on("setHighlight", function (event, highlightsList) {
        updateToolCount(
          $("#bt-highlights-list .tool-count"),
          highlightsList.length
        ),
          updateToolCount(
            $(".menuBaseContainerInfo .infoMenuDestaque span"),
            highlightsList.length || "0"
          ),
          $(this).trigger("gravaTool", {
            tool: "highlight",
            val: highlightsList,
          });
      }),
      // Evento para atualização de Postits
      $(element).on("setPostit", function (event, postitsList) {
        updateToolCount($("#bt-postits-list .tool-count"), postitsList.length),
          updateToolCount(
            $(".menuBaseContainerInfo .infoMenuPost span"),
            postitsList.length || "0"
          ),
          $(this).trigger("gravaTool", {
            tool: "postit",
            val: postitsList,
          });
      }),
      // Lógica de clique nos botões de ferramentas
      $("[data-tool]").on("click", function () {
        $("body").trigger("closed-menu");
        $(".hit-tools").toggleClass("hide");

        var toolName = $(this).data("tool");

        // Alterna a classe 'tool-atual' nos botões
        $("#tools-content .bt-tools-content").each(function (index, button) {
          $(this).data("tool") != toolName
            ? $(this).removeClass("tool-atual")
            : $(this).toggleClass("tool-atual");
        }),
          // Alterna a classe 'inativo' no conteúdo das ferramentas
          $("#tools-content")
            .find(".tools-content")
            .each(function (index, content) {
              $(this).data("tool") != toolName
                ? $(this).addClass("inativo")
                : $(this).toggleClass("inativo");
            });
      }),
      // Lógica para fechar o painel de ferramentas
      $("#tools-content")
        .find(".close-tools, .hit-tools")
        .on("click", function () {
          $($(this).data("button")).trigger("click");
        });
      $(".hit-tools")
        .on("click", function () {
          $("body").trigger("closed-menu");
          $(".hit-tools").addClass("hide");
          $("#tools-content .bt-tools-content").removeClass("tool-atual");
          $("#tools-content .tools-content").addClass("inativo");
        });
  }).prototype.setCurrentPage = function (pageId, pageElement) {
    this.id = pageId;
    var telaElement = $(this.element).find(".tela[data-id='" + pageId + "']");
    $(this.element).highlights(
      "setCurrentPage",
      pageId,
      telaElement,
      pageElement
    ),
      $(this.element).postits(
        "setCurrentPage",
        pageId,
        telaElement,
        pageElement
      );
  }),
    (ToolsManager.prototype.inserePostit = function () {
      $(this.element).postits("inserePostit");
    }),
    (ToolsManager.prototype.toggleHighlight = function () {
      $(this.element).highlights("toggleHighlight");
    }),
    (ToolsManager.prototype.baixaPDF = function () {
      $(this.element).PDF("download");
    }),
    (ToolsManager.prototype.setContrast = function () {
      $("body").toggleClass("contraste");
    }),
    (ToolsManager.prototype.setFontSize = function () {
      var sizeChange = (100 - this.settings.fontSize) / 4;
      (this.fontSize += sizeChange),
        115 < this.fontSize && (this.fontSize = this.settings.fontSize),
        $("body").css("font-size", this.fontSize + "%");
    }),
    // Plugin jQuery para inicializar o ToolsManager
    ($.fn.tools = function () {
      for (
        var returnValue,
          elements = this,
          methodOrOptions = arguments[0],
          args = Array.prototype.slice.call(arguments, 1),
          numElements = elements.length,
          i = 0;
        i < numElements;
        i++
      )
        if (
          ("object" == typeof methodOrOptions || void 0 === methodOrOptions
            ? (elements[i].tools = new ToolsManager(
                elements[i],
                methodOrOptions
              ))
            : (returnValue = elements[i].tools[methodOrOptions].apply(
                elements[i].tools,
                args
              )),
          void 0 !== returnValue)
        )
          return returnValue;
      return elements;
    });
});
