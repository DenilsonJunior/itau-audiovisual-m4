define(["jquery", "frameworks/SCORM_API_wrapper.min", "frameworks/js.cookie"], function (
  i,
  t,
  s
) {
  "use strict";
  var e = window.ScormData || {};
  return (
    ((e = function (t) {
      var e = this;
      (e.defaults = {
        enabled: !1,
        scorm: null,
      }),
        (e.defaultdata = {
          "cmi.suspend_data": "",
          "cmi.core.lesson_location": "",
          "cmi.core.lesson_status": "",
          "cmi.core.score.raw": 0,
          "cmi.core.score.max": 0,
          "cmi.core.score.min": 0,
          "cmi.core.total_time": 0,
          "cmi.core.session_time": 0,
          startTime: new Date().getTime(),
        }),
        (e.settings = i.extend({}, e.defaults, t)),
        (e.data = i.extend({}, e.defaultdata, {})),
        this.init();
    }).prototype.init = function () {
      var e = this,
        i = {};
      (onkeydown = onkeyup =
        function (t) {
          (t = t || event),
            (i[t.keyCode] = "keydown" == t.type),
            i[86] && i[69] && i[68] && e.clearData();
        }),
        (this.scorm = pipwerks.SCORM),
        (this.scorm.version = "1.2"),
        this.scorm.connection.initialize(),
        this.getValues();
    }),
    (e.prototype.getValues = function () {
      if (this.scorm.connection.isActive)
        for (var t in this.data) this.data[t] = this.scorm.data.get(t);
      else for (var t in this.data) this.data[t] = s.get(t) || this.data[t];
      return this.data;
    }),
    (e.prototype.get = function (t) {
      return this.data[t];
    }),
    (e.prototype.set = function (t, e) {
      var i;
      return (
        this.scorm.connection.isActive
          ? (this.scorm.data.set(t, e), this.scorm.save())
          : ((i = location.pathname),
            s.set(t, e, {
              expires: 7,
              path: i,
            })),
        this.getValues()
      );
    }),
    (e.prototype.clearData = function () {
      if (!this.scorm.connection.isActive)
        for (var t in this.defaultdata) this.set(t, this.defaultdata[t]);
    }),
    e
  );
});
