!(function (factory) {
  "use strict";

  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof exports !== "undefined") {
    module.exports = factory(require("jquery"));
  } else {
    factory(jQuery);
  }
})(function ($) {
  "use strict";

  // ============================================================
  // HIGHLIGHTS MANAGER (principal)
  // ============================================================
  var HighlightsManager = window.Highlights || {};
  var HighlightsManagerInit = false;

  HighlightsManager = function (containerElement, options) {
    this.$container = $(containerElement);
    this.highlightObjects = options.highlightObjects || [];

    this.defaults = {
      enabled: false,
      obj: null,
      pg: 0,
      parser: null,
      highlights: [],
      tagsToRemove: ["strong", "a", "b", "i", "em", "sub", "sup"],
      list: null,
    };

    this.settings = $.extend({}, this.defaults, options);

    var _this = this;
    setTimeout(function () {
      _this.init();
      HighlightsManagerInit = true;
    }, 1000 * 1);
    
  };

  // ------------------------------------------------------------
  // Inicialização
  // ------------------------------------------------------------
  HighlightsManager.prototype.init = function () {
    if (this.settings.highlights.length) {
      for (var i = 0; i < this.settings.highlights.length; i++) {
        var highlightData = this.settings.highlights[i];
        var $pageElement = $(
          this.settings.parser + "[data-id=" + highlightData.pg + "]"
        );

        this.loadHighlight(
          highlightData.pg,
          $pageElement,
          highlightData.message,
          highlightData.titulo
        );

        var highlightObj = this.highlightObjects[i];


        var serialized = highlightObj.textHighlighter.serializeHighlights();

        this.createCard(highlightObj, serialized, highlightData.titulo);
      }

      this.settings.list.parent().removeClass("empty");
    }

    if (this.settings.list) {
      this.initializeHighlightList();
    }
  };

  // ------------------------------------------------------------
  // Scroll da lista lateral
  // ------------------------------------------------------------
  HighlightsManager.prototype.initializeHighlightList = function () {
    this.settings.list.mCustomScrollbar({ theme: "minimal-dark" });
  };

  // ------------------------------------------------------------
  // Habilitar/desabilitar ferramenta
  // ------------------------------------------------------------
  HighlightsManager.prototype.toggleHighlight = function () {
    this.settings.enabled = !this.settings.enabled;
  };

  // ------------------------------------------------------------
  // Carregar highlight em uma página específica
  // ------------------------------------------------------------
  HighlightsManager.prototype.loadHighlight = function (
    pageId,
    $pageElement,
    savedMessage,
    titulo
  ) {
    var self = this;

    var highlightObj = self.highlightObjects.find((h) => h.pg == self.pg);

    if (!highlightObj) {
      var callbacks = {
        onBeforeHighlight: function () {
          return !!self.settings.enabled;
        },
        onAfterHighlight: function () {
          var existingObj = self.highlightObjects.find((h) => h.pg == self.pg);

          if (existingObj) {
            self.generateHighlight(existingObj);
          } else {
           
            self.loadHighlight(pageId, $pageElement, savedMessage, titulo);
          }
        },
      };

      var highlighter = new TextHighlighter($pageElement[0], callbacks);


      var newHighlightObj = {
        pg: pageId,
        textHighlighter: highlighter,
        titulo: titulo || self.currentTitle,
      };

      self.highlightObjects.push(newHighlightObj);

      $pageElement.attr("data-highlight-page-id", pageId);

      if (savedMessage) {
        highlighter.deserializeHighlights(savedMessage);
      }
    }
  };

  // ------------------------------------------------------------
  // Criar card lateral
  // ------------------------------------------------------------
  HighlightsManager.prototype.createCard = function (
    highlightObj,
    serialized,
    titulo
  ) {
    var self = this;
    var pageId = highlightObj.pg;

    highlightObj.message = serialized.message;

    if (highlightObj.HighlightCard) {
      highlightObj.HighlightCard.update(serialized.text);
    } else {
      highlightObj.HighlightCard = new HighlightCard({
        text: serialized.text,
        pg: pageId,
        titulo,
      });

      highlightObj.HighlightCard.init(this.settings.list.find(".cards"));

      $(highlightObj.HighlightCard).on("delete", function () {
        self.removeHighlights(highlightObj);
      });
    }
  };

  // ------------------------------------------------------------
  // Gerar highlight após interação
  // ------------------------------------------------------------
  HighlightsManager.prototype.generateHighlight = function (highlightObj) {
    var serialized = highlightObj.textHighlighter.serializeHighlights();
    this.createCard(highlightObj, serialized, this.currentTitle);
    this.saveHighlights();
  };

  // ------------------------------------------------------------
  // Persistir lista de highlights
  // ------------------------------------------------------------
  HighlightsManager.prototype.saveHighlights = function () {
    var items = [];

    for (var i = 0; i < this.highlightObjects.length; i++) {
      var item = this.highlightObjects[i];
      if (item.message) {
        items.push({
          pg: item.pg,
          message: item.message,
          titulo: item.titulo,
        });
      }
    }

    if (items.length) {
      this.settings.list.parent().removeClass("empty");
    } else {
      this.settings.list.parent().addClass("empty");
    }

    this.$container.trigger("setHighlight", [items]);
  };

  // ------------------------------------------------------------
  // Remover highlight e card
  // ------------------------------------------------------------
  HighlightsManager.prototype.removeHighlights = function (highlightObj) {
    var self = this;

    highlightObj.textHighlighter.removeHighlights();

    highlightObj.HighlightCard.card.height(
      highlightObj.HighlightCard.card.height()
    );

    highlightObj.HighlightCard.card.addClass("delete");

    highlightObj.HighlightCard.card[0].onanimationend = function () {
      highlightObj.HighlightCard.card.remove();

      var index = self.highlightObjects.findIndex(
        (h) => h.pg == highlightObj.pg
      );

      self.highlightObjects.splice(index, 1);
      self.saveHighlights();
    };
  };

  // ------------------------------------------------------------
  // Trocar tela/slide
  // ------------------------------------------------------------
  HighlightsManager.prototype.setCurrentPage = function (
    pageId,
    $element,
    titulo
  ) {
    this.settings.pg = pageId;
    this.pg = pageId;
    this.currentPageElement = $element;
    this.currentTitle = titulo;

    if(HighlightsManagerInit){
      this.loadHighlight(pageId, this.currentPageElement);
    }
  };

  // ============================================================
  // CARD DO LADO DIREITO
  // ============================================================
  var HighlightCard = window.Highlights || {};

  HighlightCard = function (options) {
    this.defaults = {
      text: "",
      pg: null,
      titulo: "",
    };

    this.settings = $.extend({}, this.defaults, options);

    this.card = $(
      '<div class="highlight-item tool-item">' +
        '<div class="item-top-bar">' +
        '<span class="titulo-item">' +
        (this.settings.titulo) +
        "</span>" +
        '<button class="delete-tool-item">Remover</button>' +
        "</div>" +
        '<div class="item-content">' +
        '<div class="texto-card">' +
        this.settings.text.html() +
        "</div>" +
        "</div>" +
        "</div>"
    );
  };

  HighlightCard.prototype.init = function ($parent) {
    var self = this;

    $parent.append(this.card);

    this.card.find(".item-content").mCustomScrollbar({
      theme: "minimal-dark",
    });

    this.card.find(".delete-tool-item").on("click", function (e) {
      e.preventDefault();
      self.delete();
    });
  };

  HighlightCard.prototype.update = function (text) {
    this.settings.text = text;
    this.card.find(".texto-card").html(text.html());
  };

  HighlightCard.prototype.delete = function () {
    $(this).trigger("delete");
  };

 

  // ============================================================
  // REGISTRO COMO PLUGIN JQUERY
  // ============================================================
  $.fn.highlights = function (option) {
    var returnValue;
    var args = Array.prototype.slice.call(arguments, 1);

    this.each(function () {
      var instance;

      if (typeof option === "object" || option === undefined) {
        this.highlights = new HighlightsManager(this, option);
      } else {
        instance = this.highlights[option].apply(this.highlights, args);
      }

      if (instance !== undefined) {
        returnValue = instance;
        return false;
      }
    });

    return returnValue || this;
  };
});
