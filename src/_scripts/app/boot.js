requirejs.config({
  baseUrl: "../src/scripts",
  paths: {
    frameworks: "./frameworks",
    app: "./app",
    components: "./components",
    jquery: "./frameworks/jquery.min",
    structure: "../structure",
  },
  shim: {
    "frameworks/jquery.mCustomScrollbar.min": {
      deps: ["jquery", "frameworks/jquery.mousewheel.min"],
    },
    "components/utils": {
      deps: ["jquery"],
    },
    "components/useInteractions": {
      deps: ["jquery"],
    },
    "components/audioPlayer": {
      deps: ["jquery"],
    },
    "components/tools/postit.min": {
      deps: [
        "jquery",
        "frameworks/jquery-ui.min",
        "frameworks/transit.min",
        "frameworks/jquery.transform2d.min",
      ],
    },
    "components/tools/highlight.min": {
      deps: [
        "jquery",
        "frameworks/jquery-ui.min",
        "frameworks/TextHighlighter.min",
      ],
    },
    "components/tools/pdf.min": {
      deps: ["jquery"],
    },
    "frameworks/transit.min": {
      deps: ["jquery"],
    },
    "frameworks/jquery.transform2d.min": {
      deps: ["jquery"],
    },
    "components/helpers": {
      deps: [
        "jquery",
        "frameworks/jquery-ui.min",
        "components/utils",
        "components/tools/postit.min",
        "components/tools/highlight.min",
        "components/tools/pdf.min",
        "components/tools/toolcard.min",
        "frameworks/jquery.mCustomScrollbar.min",
      ],
    },
    "components/useScorm": {
      deps: [
        "jquery",
        "frameworks/SCORM_API_wrapper.min",
        "frameworks/js.cookie",
      ],
    },

    "frameworks/keen-slider.min": {
      deps: [
        "jquery",
      ],
    },

    "app/main": {
      deps: [
        "jquery",
        "components/utils",
        "components/useInteractions",
        "text!structure/index.html",
        "components/contentMap",
        "components/audioPlayer",
        "components/helpers",
        "components/useScorm",
        "frameworks/aos.min",
        "frameworks/dialog.min",
        "frameworks/utils-aria.min",
        "components/tools/header",
        "frameworks/fontawesome",
        "frameworks/keen-slider.min",
      ],
    },

    "app/page": {
      deps: [
        "jquery",
        "components/utils",
      ],
    },
  },
}),
  requirejs(["app/appRoot"], function () {});
