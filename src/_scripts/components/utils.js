define(["jquery"], function (e) {
  return {
    formatURL: function (e) {
      return e
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");
    },
    Events: function () {
      var r = {};
      (this.on = function (e, n) {
        r[e] || (r[e] = []), r[e].push(n);
      }),
        (this.triggerHandler = function (e, n) {
          if (r[e]) for (i in r[e]) r[e][i](n);
        });
    },
    getParameterByName: function (e, n) {
      return (
        (n = n || location.search),
        (e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")),
        null == (n = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(n))
          ? ""
          : decodeURIComponent(n[1].replace(/\+/g, " "))
      );
    },
  };
});
