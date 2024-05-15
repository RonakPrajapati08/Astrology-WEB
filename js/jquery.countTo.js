! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? t(require("jquery")) : t(jQuery)
}(function(t) {
    var e = function(o, i) {
        this.$element = t(o), this.options = t.extend({}, e.DEFAULTS, this.dataOptions(), i), this.init()
    };
    e.DEFAULTS = {
        from: 0,
        to: 0,
        speed: 1e3,
        refreshInterval: 100,
        decimals: 0,
        formatter: function(t, e) {
            return t.toFixed(e.decimals)
        },
        onUpdate: null,
        onComplete: null
    }, e.prototype.init = function() {
        this.value = this.options.from, this.loops = Math.ceil(this.options.speed / this.options.refreshInterval), this.loopCount = 0, this.increment = (this.options.to - this.options.from) / this.loops
    }, e.prototype.dataOptions = function() {
        var t = {
                from: this.$element.data("from"),
                to: this.$element.data("to"),
                speed: this.$element.data("speed"),
                refreshInterval: this.$element.data("refresh-interval"),
                decimals: this.$element.data("decimals")
            },
            e = Object.keys(t);
        for (var o in e) {
            var i = e[o];
            void 0 === t[i] && delete t[i]
        }
        return t
    }, e.prototype.update = function() {
        this.value += this.increment, this.loopCount++, this.render(), "function" == typeof this.options.onUpdate && this.options.onUpdate.call(this.$element, this.value), this.loopCount >= this.loops && (clearInterval(this.interval), this.value = this.options.to, "function" == typeof this.options.onComplete && this.options.onComplete.call(this.$element, this.value))
    }, e.prototype.render = function() {
        var t = this.options.formatter.call(this.$element, this.value, this.options);
        this.$element.text(t)
    }, e.prototype.restart = function() {
        this.stop(), this.init(), this.start()
    }, e.prototype.start = function() {
        this.stop(), this.render(), this.interval = setInterval(this.update.bind(this), this.options.refreshInterval)
    }, e.prototype.stop = function() {
        this.interval && clearInterval(this.interval)
    }, e.prototype.toggle = function() {
        this.interval ? this.stop() : this.start()
    }, t.fn.countTo = function(o) {
        return this.each(function() {
            var i = t(this),
                n = i.data("countTo"),
                s = "object" == typeof o ? o : {},
                r = "string" == typeof o ? o : "start";
            (!n || "object" == typeof o) && (n && n.stop(), i.data("countTo", n = new e(this, s))), n[r].call(n)
        })
    }
});