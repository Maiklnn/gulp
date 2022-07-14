


/*! nouislider - 14.6.2 - 9/16/2020 */
!(function (t) {
	"function" == typeof define && define.amd
		? define([], t)
		: "object" == typeof exports
		? (module.exports = t())
		: (window.noUiSlider = t());
})(function () {
	"use strict";
	var lt = "14.6.2";
	function ut(t) {
		t.parentElement.removeChild(t);
	}
	function a(t) {
		return null != t;
	}
	function ct(t) {
		t.preventDefault();
	}
	function o(t) {
		return "number" == typeof t && !isNaN(t) && isFinite(t);
	}
	function pt(t, e, r) {
		0 < r &&
		(ht(t, e),
			setTimeout(function () {
				mt(t, e);
			}, r));
	}
	function ft(t) {
		return Math.max(Math.min(t, 100), 0);
	}
	function dt(t) {
		return Array.isArray(t) ? t : [t];
	}
	function e(t) {
		var e = (t = String(t)).split(".");
		return 1 < e.length ? e[1].length : 0;
	}
	function ht(t, e) {
		t.classList && !/\s/.test(e)
			? t.classList.add(e)
			: (t.className += " " + e);
	}
	function mt(t, e) {
		t.classList && !/\s/.test(e)
			? t.classList.remove(e)
			: (t.className = t.className.replace(
			new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"),
			" "
			));
	}
	function gt(t) {
		var e = void 0 !== window.pageXOffset,
			r = "CSS1Compat" === (t.compatMode || "");
		return {
			x: e
				? window.pageXOffset
				: r
					? t.documentElement.scrollLeft
					: t.body.scrollLeft,
			y: e
				? window.pageYOffset
				: r
					? t.documentElement.scrollTop
					: t.body.scrollTop,
		};
	}
	function c(t, e) {
		return 100 / (e - t);
	}
	function p(t, e, r) {
		return (100 * e) / (t[r + 1] - t[r]);
	}
	function f(t, e) {
		for (var r = 1; t >= e[r]; ) r += 1;
		return r;
	}
	function r(t, e, r) {
		if (r >= t.slice(-1)[0]) return 100;
		var n,
			i,
			o = f(r, t),
			s = t[o - 1],
			a = t[o],
			l = e[o - 1],
			u = e[o];
		return (
			l +
			((i = r),
			p((n = [s, a]), n[0] < 0 ? i + Math.abs(n[0]) : i - n[0], 0) / c(l, u))
		);
	}
	function n(t, e, r, n) {
		if (100 === n) return n;
		var i,
			o,
			s = f(n, t),
			a = t[s - 1],
			l = t[s];
		return r
			? (l - a) / 2 < n - a
				? l
				: a
			: e[s - 1]
				? t[s - 1] + ((i = n - t[s - 1]), (o = e[s - 1]), Math.round(i / o) * o)
				: n;
	}
	function s(t, e, r) {
		var n;
		if (("number" == typeof e && (e = [e]), !Array.isArray(e)))
			throw new Error(
				"noUiSlider (" + lt + "): 'range' contains invalid value."
			);
		if (
			!o((n = "min" === t ? 0 : "max" === t ? 100 : parseFloat(t))) ||
			!o(e[0])
		)
			throw new Error("noUiSlider (" + lt + "): 'range' value isn't numeric.");
		r.xPct.push(n),
			r.xVal.push(e[0]),
			n
				? r.xSteps.push(!isNaN(e[1]) && e[1])
				: isNaN(e[1]) || (r.xSteps[0] = e[1]),
			r.xHighestCompleteStep.push(0);
	}
	function l(t, e, r) {
		if (e)
			if (r.xVal[t] !== r.xVal[t + 1]) {
				r.xSteps[t] =
					p([r.xVal[t], r.xVal[t + 1]], e, 0) / c(r.xPct[t], r.xPct[t + 1]);
				var n = (r.xVal[t + 1] - r.xVal[t]) / r.xNumSteps[t],
					i = Math.ceil(Number(n.toFixed(3)) - 1),
					o = r.xVal[t] + r.xNumSteps[t] * i;
				r.xHighestCompleteStep[t] = o;
			} else r.xSteps[t] = r.xHighestCompleteStep[t] = r.xVal[t];
	}
	function i(t, e, r) {
		var n;
		(this.xPct = []),
			(this.xVal = []),
			(this.xSteps = [r || !1]),
			(this.xNumSteps = [!1]),
			(this.xHighestCompleteStep = []),
			(this.snap = e);
		var i = [];
		for (n in t) t.hasOwnProperty(n) && i.push([t[n], n]);
		for (
			i.length && "object" == typeof i[0][0]
				? i.sort(function (t, e) {
					return t[0][0] - e[0][0];
				})
				: i.sort(function (t, e) {
					return t[0] - e[0];
				}),
				n = 0;
			n < i.length;
			n++
		)
			s(i[n][1], i[n][0], this);
		for (
			this.xNumSteps = this.xSteps.slice(0), n = 0;
			n < this.xNumSteps.length;
			n++
		)
			l(n, this.xNumSteps[n], this);
	}
	(i.prototype.getDistance = function (t) {
		var e,
			r = [];
		for (e = 0; e < this.xNumSteps.length - 1; e++) {
			var n = this.xNumSteps[e];
			if (n && (t / n) % 1 != 0)
				throw new Error(
					"noUiSlider (" +
					lt +
					"): 'limit', 'margin' and 'padding' of " +
					this.xPct[e] +
					"% range must be divisible by step."
				);
			r[e] = p(this.xVal, t, e);
		}
		return r;
	}),
		(i.prototype.getAbsoluteDistance = function (t, e, r) {
			var n,
				i = 0;
			if (t < this.xPct[this.xPct.length - 1])
				for (; t > this.xPct[i + 1]; ) i++;
			else t === this.xPct[this.xPct.length - 1] && (i = this.xPct.length - 2);
			r || t !== this.xPct[i + 1] || i++;
			var o = 1,
				s = e[i],
				a = 0,
				l = 0,
				u = 0,
				c = 0;
			for (
				n = r
					? (t - this.xPct[i]) / (this.xPct[i + 1] - this.xPct[i])
					: (this.xPct[i + 1] - t) / (this.xPct[i + 1] - this.xPct[i]);
				0 < s;

			)
				(a = this.xPct[i + 1 + c] - this.xPct[i + c]),
					100 < e[i + c] * o + 100 - 100 * n
						? ((l = a * n), (o = (s - 100 * n) / e[i + c]), (n = 1))
						: ((l = ((e[i + c] * a) / 100) * o), (o = 0)),
					r
						? ((u -= l), 1 <= this.xPct.length + c && c--)
						: ((u += l), 1 <= this.xPct.length - c && c++),
					(s = e[i + c] * o);
			return t + u;
		}),
		(i.prototype.toStepping = function (t) {
			return (t = r(this.xVal, this.xPct, t));
		}),
		(i.prototype.fromStepping = function (t) {
			return (function (t, e, r) {
				if (100 <= r) return t.slice(-1)[0];
				var n,
					i = f(r, e),
					o = t[i - 1],
					s = t[i],
					a = e[i - 1],
					l = e[i];
				return (n = [o, s]), ((r - a) * c(a, l) * (n[1] - n[0])) / 100 + n[0];
			})(this.xVal, this.xPct, t);
		}),
		(i.prototype.getStep = function (t) {
			return (t = n(this.xPct, this.xSteps, this.snap, t));
		}),
		(i.prototype.getDefaultStep = function (t, e, r) {
			var n = f(t, this.xPct);
			return (
				(100 === t || (e && t === this.xPct[n - 1])) &&
				(n = Math.max(n - 1, 1)),
				(this.xVal[n] - this.xVal[n - 1]) / r
			);
		}),
		(i.prototype.getNearbySteps = function (t) {
			var e = f(t, this.xPct);
			return {
				stepBefore: {
					startValue: this.xVal[e - 2],
					step: this.xNumSteps[e - 2],
					highestStep: this.xHighestCompleteStep[e - 2],
				},
				thisStep: {
					startValue: this.xVal[e - 1],
					step: this.xNumSteps[e - 1],
					highestStep: this.xHighestCompleteStep[e - 1],
				},
				stepAfter: {
					startValue: this.xVal[e],
					step: this.xNumSteps[e],
					highestStep: this.xHighestCompleteStep[e],
				},
			};
		}),
		(i.prototype.countStepDecimals = function () {
			var t = this.xNumSteps.map(e);
			return Math.max.apply(null, t);
		}),
		(i.prototype.convert = function (t) {
			return this.getStep(this.toStepping(t));
		});
	var u = {
			to: function (t) {
				return void 0 !== t && t.toFixed(2);
			},
			from: Number,
		},
		d = {
			target: "target",
			base: "base",
			origin: "origin",
			handle: "handle",
			handleLower: "handle-lower",
			handleUpper: "handle-upper",
			touchArea: "touch-area",
			horizontal: "horizontal",
			vertical: "vertical",
			background: "background",
			connect: "connect",
			connects: "connects",
			ltr: "ltr",
			rtl: "rtl",
			textDirectionLtr: "txt-dir-ltr",
			textDirectionRtl: "txt-dir-rtl",
			draggable: "draggable",
			drag: "state-drag",
			tap: "state-tap",
			active: "active",
			tooltip: "tooltip",
			pips: "pips",
			pipsHorizontal: "pips-horizontal",
			pipsVertical: "pips-vertical",
			marker: "marker",
			markerHorizontal: "marker-horizontal",
			markerVertical: "marker-vertical",
			markerNormal: "marker-normal",
			markerLarge: "marker-large",
			markerSub: "marker-sub",
			value: "value",
			valueHorizontal: "value-horizontal",
			valueVertical: "value-vertical",
			valueNormal: "value-normal",
			valueLarge: "value-large",
			valueSub: "value-sub",
		};
	function h(t) {
		if (
			"object" == typeof (e = t) &&
			"function" == typeof e.to &&
			"function" == typeof e.from
		)
			return !0;
		var e;
		throw new Error(
			"noUiSlider (" + lt + "): 'format' requires 'to' and 'from' methods."
		);
	}
	function m(t, e) {
		if (!o(e))
			throw new Error("noUiSlider (" + lt + "): 'step' is not numeric.");
		t.singleStep = e;
	}
	function g(t, e) {
		if (!o(e))
			throw new Error(
				"noUiSlider (" + lt + "): 'keyboardPageMultiplier' is not numeric."
			);
		t.keyboardPageMultiplier = e;
	}
	function v(t, e) {
		if (!o(e))
			throw new Error(
				"noUiSlider (" + lt + "): 'keyboardDefaultStep' is not numeric."
			);
		t.keyboardDefaultStep = e;
	}
	function b(t, e) {
		if ("object" != typeof e || Array.isArray(e))
			throw new Error("noUiSlider (" + lt + "): 'range' is not an object.");
		if (void 0 === e.min || void 0 === e.max)
			throw new Error(
				"noUiSlider (" + lt + "): Missing 'min' or 'max' in 'range'."
			);
		if (e.min === e.max)
			throw new Error(
				"noUiSlider (" + lt + "): 'range' 'min' and 'max' cannot be equal."
			);
		t.spectrum = new i(e, t.snap, t.singleStep);
	}
	function x(t, e) {
		if (((e = dt(e)), !Array.isArray(e) || !e.length))
			throw new Error("noUiSlider (" + lt + "): 'start' option is incorrect.");
		(t.handles = e.length), (t.start = e);
	}
	function S(t, e) {
		if ("boolean" != typeof (t.snap = e))
			throw new Error(
				"noUiSlider (" + lt + "): 'snap' option must be a boolean."
			);
	}
	function w(t, e) {
		if ("boolean" != typeof (t.animate = e))
			throw new Error(
				"noUiSlider (" + lt + "): 'animate' option must be a boolean."
			);
	}
	function y(t, e) {
		if ("number" != typeof (t.animationDuration = e))
			throw new Error(
				"noUiSlider (" + lt + "): 'animationDuration' option must be a number."
			);
	}
	function E(t, e) {
		var r,
			n = [!1];
		if (
			("lower" === e ? (e = [!0, !1]) : "upper" === e && (e = [!1, !0]),
			!0 === e || !1 === e)
		) {
			for (r = 1; r < t.handles; r++) n.push(e);
			n.push(!1);
		} else {
			if (!Array.isArray(e) || !e.length || e.length !== t.handles + 1)
				throw new Error(
					"noUiSlider (" +
					lt +
					"): 'connect' option doesn't match handle count."
				);
			n = e;
		}
		t.connect = n;
	}
	function C(t, e) {
		switch (e) {
			case "horizontal":
				t.ort = 0;
				break;
			case "vertical":
				t.ort = 1;
				break;
			default:
				throw new Error(
					"noUiSlider (" + lt + "): 'orientation' option is invalid."
				);
		}
	}
	function P(t, e) {
		if (!o(e))
			throw new Error(
				"noUiSlider (" + lt + "): 'margin' option must be numeric."
			);
		0 !== e && (t.margin = t.spectrum.getDistance(e));
	}
	function N(t, e) {
		if (!o(e))
			throw new Error(
				"noUiSlider (" + lt + "): 'limit' option must be numeric."
			);
		if (((t.limit = t.spectrum.getDistance(e)), !t.limit || t.handles < 2))
			throw new Error(
				"noUiSlider (" +
				lt +
				"): 'limit' option is only supported on linear sliders with 2 or more handles."
			);
	}
	function k(t, e) {
		var r;
		if (!o(e) && !Array.isArray(e))
			throw new Error(
				"noUiSlider (" +
				lt +
				"): 'padding' option must be numeric or array of exactly 2 numbers."
			);
		if (Array.isArray(e) && 2 !== e.length && !o(e[0]) && !o(e[1]))
			throw new Error(
				"noUiSlider (" +
				lt +
				"): 'padding' option must be numeric or array of exactly 2 numbers."
			);
		if (0 !== e) {
			for (
				Array.isArray(e) || (e = [e, e]),
					t.padding = [
						t.spectrum.getDistance(e[0]),
						t.spectrum.getDistance(e[1]),
					],
					r = 0;
				r < t.spectrum.xNumSteps.length - 1;
				r++
			)
				if (t.padding[0][r] < 0 || t.padding[1][r] < 0)
					throw new Error(
						"noUiSlider (" +
						lt +
						"): 'padding' option must be a positive number(s)."
					);
			var n = e[0] + e[1],
				i = t.spectrum.xVal[0];
			if (1 < n / (t.spectrum.xVal[t.spectrum.xVal.length - 1] - i))
				throw new Error(
					"noUiSlider (" +
					lt +
					"): 'padding' option must not exceed 100% of the range."
				);
		}
	}
	function U(t, e) {
		switch (e) {
			case "ltr":
				t.dir = 0;
				break;
			case "rtl":
				t.dir = 1;
				break;
			default:
				throw new Error(
					"noUiSlider (" + lt + "): 'direction' option was not recognized."
				);
		}
	}
	function A(t, e) {
		if ("string" != typeof e)
			throw new Error(
				"noUiSlider (" +
				lt +
				"): 'behaviour' must be a string containing options."
			);
		var r = 0 <= e.indexOf("tap"),
			n = 0 <= e.indexOf("drag"),
			i = 0 <= e.indexOf("fixed"),
			o = 0 <= e.indexOf("snap"),
			s = 0 <= e.indexOf("hover"),
			a = 0 <= e.indexOf("unconstrained");
		if (i) {
			if (2 !== t.handles)
				throw new Error(
					"noUiSlider (" +
					lt +
					"): 'fixed' behaviour must be used with 2 handles"
				);
			P(t, t.start[1] - t.start[0]);
		}
		if (a && (t.margin || t.limit))
			throw new Error(
				"noUiSlider (" +
				lt +
				"): 'unconstrained' behaviour cannot be used with margin or limit"
			);
		t.events = {
			tap: r || o,
			drag: n,
			fixed: i,
			snap: o,
			hover: s,
			unconstrained: a,
		};
	}
	function V(t, e) {
		if (!1 !== e)
			if (!0 === e) {
				t.tooltips = [];
				for (var r = 0; r < t.handles; r++) t.tooltips.push(!0);
			} else {
				if (((t.tooltips = dt(e)), t.tooltips.length !== t.handles))
					throw new Error(
						"noUiSlider (" + lt + "): must pass a formatter for all handles."
					);
				t.tooltips.forEach(function (t) {
					if (
						"boolean" != typeof t &&
						("object" != typeof t || "function" != typeof t.to)
					)
						throw new Error(
							"noUiSlider (" +
							lt +
							"): 'tooltips' must be passed a formatter or 'false'."
						);
				});
			}
	}
	function D(t, e) {
		h((t.ariaFormat = e));
	}
	function M(t, e) {
		h((t.format = e));
	}
	function O(t, e) {
		if ("boolean" != typeof (t.keyboardSupport = e))
			throw new Error(
				"noUiSlider (" + lt + "): 'keyboardSupport' option must be a boolean."
			);
	}
	function L(t, e) {
		t.documentElement = e;
	}
	function z(t, e) {
		if ("string" != typeof e && !1 !== e)
			throw new Error(
				"noUiSlider (" + lt + "): 'cssPrefix' must be a string or `false`."
			);
		t.cssPrefix = e;
	}
	function H(t, e) {
		if ("object" != typeof e)
			throw new Error(
				"noUiSlider (" + lt + "): 'cssClasses' must be an object."
			);
		if ("string" == typeof t.cssPrefix)
			for (var r in ((t.cssClasses = {}), e))
				e.hasOwnProperty(r) && (t.cssClasses[r] = t.cssPrefix + e[r]);
		else t.cssClasses = e;
	}
	function vt(e) {
		var r = {
				margin: 0,
				limit: 0,
				padding: 0,
				animate: !0,
				animationDuration: 300,
				ariaFormat: u,
				format: u,
			},
			n = {
				step: { r: !1, t: m },
				keyboardPageMultiplier: { r: !1, t: g },
				keyboardDefaultStep: { r: !1, t: v },
				start: { r: !0, t: x },
				connect: { r: !0, t: E },
				direction: { r: !0, t: U },
				snap: { r: !1, t: S },
				animate: { r: !1, t: w },
				animationDuration: { r: !1, t: y },
				range: { r: !0, t: b },
				orientation: { r: !1, t: C },
				margin: { r: !1, t: P },
				limit: { r: !1, t: N },
				padding: { r: !1, t: k },
				behaviour: { r: !0, t: A },
				ariaFormat: { r: !1, t: D },
				format: { r: !1, t: M },
				tooltips: { r: !1, t: V },
				keyboardSupport: { r: !0, t: O },
				documentElement: { r: !1, t: L },
				cssPrefix: { r: !0, t: z },
				cssClasses: { r: !0, t: H },
			},
			i = {
				connect: !1,
				direction: "ltr",
				behaviour: "tap",
				orientation: "horizontal",
				keyboardSupport: !0,
				cssPrefix: "noUi-",
				cssClasses: d,
				keyboardPageMultiplier: 5,
				keyboardDefaultStep: 10,
			};
		e.format && !e.ariaFormat && (e.ariaFormat = e.format),
			Object.keys(n).forEach(function (t) {
				if (!a(e[t]) && void 0 === i[t]) {
					if (n[t].r)
						throw new Error(
							"noUiSlider (" + lt + "): '" + t + "' is required."
						);
					return !0;
				}
				n[t].t(r, a(e[t]) ? e[t] : i[t]);
			}),
			(r.pips = e.pips);
		var t = document.createElement("div"),
			o = void 0 !== t.style.msTransform,
			s = void 0 !== t.style.transform;
		r.transformRule = s ? "transform" : o ? "msTransform" : "webkitTransform";
		return (
			(r.style = [
				["left", "top"],
				["right", "bottom"],
			][r.dir][r.ort]),
				r
		);
	}
	function j(t, b, o) {
		var l,
			u,
			s,
			c,
			i,
			a,
			e,
			p,
			f = window.navigator.pointerEnabled
				? { start: "pointerdown", move: "pointermove", end: "pointerup" }
				: window.navigator.msPointerEnabled
					? { start: "MSPointerDown", move: "MSPointerMove", end: "MSPointerUp" }
					: {
						start: "mousedown touchstart",
						move: "mousemove touchmove",
						end: "mouseup touchend",
					},
			d =
				window.CSS &&
				CSS.supports &&
				CSS.supports("touch-action", "none") &&
				(function () {
					var t = !1;
					try {
						var e = Object.defineProperty({}, "passive", {
							get: function () {
								t = !0;
							},
						});
						window.addEventListener("test", null, e);
					} catch (t) {}
					return t;
				})(),
			h = t,
			y = b.spectrum,
			x = [],
			S = [],
			m = [],
			g = 0,
			v = {},
			w = t.ownerDocument,
			E = b.documentElement || w.documentElement,
			C = w.body,
			P = -1,
			N = 0,
			k = 1,
			U = 2,
			A = "rtl" === w.dir || 1 === b.ort ? 0 : 100;
		function V(t, e) {
			var r = w.createElement("div");
			return e && ht(r, e), t.appendChild(r), r;
		}
		function D(t, e) {
			var r = V(t, b.cssClasses.origin),
				n = V(r, b.cssClasses.handle);
			return (
				V(n, b.cssClasses.touchArea),
					n.setAttribute("data-handle", e),
				b.keyboardSupport &&
				(n.setAttribute("tabindex", "0"),
					n.addEventListener("keydown", function (t) {
						return (function (t, e) {
							if (O() || L(e)) return !1;
							var r = ["Left", "Right"],
								n = ["Down", "Up"],
								i = ["PageDown", "PageUp"],
								o = ["Home", "End"];
							b.dir && !b.ort
								? r.reverse()
								: b.ort && !b.dir && (n.reverse(), i.reverse());
							var s,
								a = t.key.replace("Arrow", ""),
								l = a === i[0],
								u = a === i[1],
								c = a === n[0] || a === r[0] || l,
								p = a === n[1] || a === r[1] || u,
								f = a === o[0],
								d = a === o[1];
							if (!(c || p || f || d)) return !0;
							if ((t.preventDefault(), p || c)) {
								var h = b.keyboardPageMultiplier,
									m = c ? 0 : 1,
									g = at(e),
									v = g[m];
								if (null === v) return !1;
								!1 === v &&
								(v = y.getDefaultStep(S[e], c, b.keyboardDefaultStep)),
								(u || l) && (v *= h),
									(v = Math.max(v, 1e-7)),
									(v *= c ? -1 : 1),
									(s = x[e] + v);
							} else s = d ? b.spectrum.xVal[b.spectrum.xVal.length - 1] : b.spectrum.xVal[0];
							return (
								rt(e, y.toStepping(s), !0, !0),
									J("slide", e),
									J("update", e),
									J("change", e),
									J("set", e),
									!1
							);
						})(t, e);
					})),
					n.setAttribute("role", "slider"),
					n.setAttribute("aria-orientation", b.ort ? "vertical" : "horizontal"),
					0 === e
						? ht(n, b.cssClasses.handleLower)
						: e === b.handles - 1 && ht(n, b.cssClasses.handleUpper),
					r
			);
		}
		function M(t, e) {
			return !!e && V(t, b.cssClasses.connect);
		}
		function r(t, e) {
			return !!b.tooltips[e] && V(t.firstChild, b.cssClasses.tooltip);
		}
		function O() {
			return h.hasAttribute("disabled");
		}
		function L(t) {
			return u[t].hasAttribute("disabled");
		}
		function z() {
			i &&
			(G("update.tooltips"),
				i.forEach(function (t) {
					t && ut(t);
				}),
				(i = null));
		}
		function H() {
			z(),
				(i = u.map(r)),
				$("update.tooltips", function (t, e, r) {
					if (i[e]) {
						var n = t[e];
						!0 !== b.tooltips[e] && (n = b.tooltips[e].to(r[e])),
							(i[e].innerHTML = n);
					}
				});
		}
		function j(e, i, o) {
			var s = w.createElement("div"),
				a = [];
			(a[N] = b.cssClasses.valueNormal),
				(a[k] = b.cssClasses.valueLarge),
				(a[U] = b.cssClasses.valueSub);
			var l = [];
			(l[N] = b.cssClasses.markerNormal),
				(l[k] = b.cssClasses.markerLarge),
				(l[U] = b.cssClasses.markerSub);
			var u = [b.cssClasses.valueHorizontal, b.cssClasses.valueVertical],
				c = [b.cssClasses.markerHorizontal, b.cssClasses.markerVertical];
			function p(t, e) {
				var r = e === b.cssClasses.value,
					n = r ? a : l;
				return e + " " + (r ? u : c)[b.ort] + " " + n[t];
			}
			return (
				ht(s, b.cssClasses.pips),
					ht(
						s,
						0 === b.ort ? b.cssClasses.pipsHorizontal : b.cssClasses.pipsVertical
					),
					Object.keys(e).forEach(function (t) {
						!(function (t, e, r) {
							if ((r = i ? i(e, r) : r) !== P) {
								var n = V(s, !1);
								(n.className = p(r, b.cssClasses.marker)),
									(n.style[b.style] = t + "%"),
								N < r &&
								(((n = V(s, !1)).className = p(r, b.cssClasses.value)),
									n.setAttribute("data-value", e),
									(n.style[b.style] = t + "%"),
									(n.innerHTML = o.to(e)));
							}
						})(t, e[t][0], e[t][1]);
					}),
					s
			);
		}
		function F() {
			c && (ut(c), (c = null));
		}
		function R(t) {
			F();
			var m,
				g,
				v,
				b,
				e,
				r,
				x,
				S,
				w,
				n = t.mode,
				i = t.density || 1,
				o = t.filter || !1,
				s = (function (t, e, r) {
					if ("range" === t || "steps" === t) return y.xVal;
					if ("count" === t) {
						if (e < 2)
							throw new Error(
								"noUiSlider (" +
								lt +
								"): 'values' (>= 2) required for mode 'count'."
							);
						var n = e - 1,
							i = 100 / n;
						for (e = []; n--; ) e[n] = n * i;
						e.push(100), (t = "positions");
					}
					return "positions" === t
						? e.map(function (t) {
							return y.fromStepping(r ? y.getStep(t) : t);
						})
						: "values" === t
							? r
								? e.map(function (t) {
									return y.fromStepping(y.getStep(y.toStepping(t)));
								})
								: e
							: void 0;
				})(n, t.values || !1, t.stepped || !1),
				a =
					((m = i),
						(g = n),
						(v = s),
						(b = {}),
						(e = y.xVal[0]),
						(r = y.xVal[y.xVal.length - 1]),
						(S = x = !1),
						(w = 0),
					(v = v
					.slice()
					.sort(function (t, e) {
						return t - e;
					})
					.filter(function (t) {
						return !this[t] && (this[t] = !0);
					}, {}))[0] !== e && (v.unshift(e), (x = !0)),
					v[v.length - 1] !== r && (v.push(r), (S = !0)),
						v.forEach(function (t, e) {
							var r,
								n,
								i,
								o,
								s,
								a,
								l,
								u,
								c,
								p,
								f = t,
								d = v[e + 1],
								h = "steps" === g;
							if ((h && (r = y.xNumSteps[e]), r || (r = d - f), !1 !== f))
								for (
									void 0 === d && (d = f), r = Math.max(r, 1e-7), n = f;
									n <= d;
									n = (n + r).toFixed(7) / 1
								) {
									for (
										u = (s = (o = y.toStepping(n)) - w) / m,
											p = s / (c = Math.round(u)),
											i = 1;
										i <= c;
										i += 1
									)
										b[(a = w + i * p).toFixed(5)] = [y.fromStepping(a), 0];
									(l = -1 < v.indexOf(n) ? k : h ? U : N),
									!e && x && n !== d && (l = 0),
									(n === d && S) || (b[o.toFixed(5)] = [n, l]),
										(w = o);
								}
						}),
						b),
				l = t.format || { to: Math.round };
			return (c = h.appendChild(j(a, o, l)));
		}
		function T() {
			var t = l.getBoundingClientRect(),
				e = "offset" + ["Width", "Height"][b.ort];
			return 0 === b.ort ? t.width || l[e] : t.height || l[e];
		}
		function B(n, i, o, s) {
			var e = function (t) {
					return (
						!!(t = (function (t, e, r) {
							var n,
								i,
								o = 0 === t.type.indexOf("touch"),
								s = 0 === t.type.indexOf("mouse"),
								a = 0 === t.type.indexOf("pointer");
							0 === t.type.indexOf("MSPointer") && (a = !0);
							if ("mousedown" === t.type && !t.buttons && !t.touches) return !1;
							if (o) {
								var l = function (t) {
									return (
										t.target === r ||
										r.contains(t.target) ||
										(t.target.shadowRoot && t.target.shadowRoot.contains(r))
									);
								};
								if ("touchstart" === t.type) {
									var u = Array.prototype.filter.call(t.touches, l);
									if (1 < u.length) return !1;
									(n = u[0].pageX), (i = u[0].pageY);
								} else {
									var c = Array.prototype.find.call(t.changedTouches, l);
									if (!c) return !1;
									(n = c.pageX), (i = c.pageY);
								}
							}
							(e = e || gt(w)),
							(s || a) && ((n = t.clientX + e.x), (i = t.clientY + e.y));
							return (
								(t.pageOffset = e), (t.points = [n, i]), (t.cursor = s || a), t
							);
						})(t, s.pageOffset, s.target || i)) &&
						!(O() && !s.doNotReject) &&
						((e = h),
							(r = b.cssClasses.tap),
						!(
							(e.classList
								? e.classList.contains(r)
								: new RegExp("\\b" + r + "\\b").test(e.className)) &&
							!s.doNotReject
						) &&
						!(n === f.start && void 0 !== t.buttons && 1 < t.buttons) &&
						(!s.hover || !t.buttons) &&
						(d || t.preventDefault(),
							(t.calcPoint = t.points[b.ort]),
							void o(t, s)))
					);
					var e, r;
				},
				r = [];
			return (
				n.split(" ").forEach(function (t) {
					i.addEventListener(t, e, !!d && { passive: !0 }), r.push([t, e]);
				}),
					r
			);
		}
		function q(t) {
			var e,
				r,
				n,
				i,
				o,
				s,
				a =
					(100 *
						(t -
							((e = l),
								(r = b.ort),
								(n = e.getBoundingClientRect()),
								(i = e.ownerDocument),
								(o = i.documentElement),
								(s = gt(i)),
							/webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (s.x = 0),
								r ? n.top + s.y - o.clientTop : n.left + s.x - o.clientLeft))) /
					T();
			return (a = ft(a)), b.dir ? 100 - a : a;
		}
		function X(t, e) {
			"mouseout" === t.type &&
			"HTML" === t.target.nodeName &&
			null === t.relatedTarget &&
			_(t, e);
		}
		function Y(t, e) {
			if (
				-1 === navigator.appVersion.indexOf("MSIE 9") &&
				0 === t.buttons &&
				0 !== e.buttonsProperty
			)
				return _(t, e);
			var r = (b.dir ? -1 : 1) * (t.calcPoint - e.startCalcPoint);
			Z(0 < r, (100 * r) / e.baseSize, e.locations, e.handleNumbers);
		}
		function _(t, e) {
			e.handle && (mt(e.handle, b.cssClasses.active), (g -= 1)),
				e.listeners.forEach(function (t) {
					E.removeEventListener(t[0], t[1]);
				}),
			0 === g &&
			(mt(h, b.cssClasses.drag),
				et(),
			t.cursor &&
			((C.style.cursor = ""), C.removeEventListener("selectstart", ct))),
				e.handleNumbers.forEach(function (t) {
					J("change", t), J("set", t), J("end", t);
				});
		}
		function I(t, e) {
			if (e.handleNumbers.some(L)) return !1;
			var r;
			1 === e.handleNumbers.length &&
			((r = u[e.handleNumbers[0]].children[0]),
				(g += 1),
				ht(r, b.cssClasses.active));
			t.stopPropagation();
			var n = [],
				i = B(f.move, E, Y, {
					target: t.target,
					handle: r,
					listeners: n,
					startCalcPoint: t.calcPoint,
					baseSize: T(),
					pageOffset: t.pageOffset,
					handleNumbers: e.handleNumbers,
					buttonsProperty: t.buttons,
					locations: S.slice(),
				}),
				o = B(f.end, E, _, {
					target: t.target,
					handle: r,
					listeners: n,
					doNotReject: !0,
					handleNumbers: e.handleNumbers,
				}),
				s = B("mouseout", E, X, {
					target: t.target,
					handle: r,
					listeners: n,
					doNotReject: !0,
					handleNumbers: e.handleNumbers,
				});
			n.push.apply(n, i.concat(o, s)),
			t.cursor &&
			((C.style.cursor = getComputedStyle(t.target).cursor),
			1 < u.length && ht(h, b.cssClasses.drag),
				C.addEventListener("selectstart", ct, !1)),
				e.handleNumbers.forEach(function (t) {
					J("start", t);
				});
		}
		function n(t) {
			t.stopPropagation();
			var i,
				o,
				s,
				e = q(t.calcPoint),
				r =
					((i = e),
						(s = !(o = 100)),
						u.forEach(function (t, e) {
							if (!L(e)) {
								var r = S[e],
									n = Math.abs(r - i);
								(n < o || (n <= o && r < i) || (100 === n && 100 === o)) &&
								((s = e), (o = n));
							}
						}),
						s);
			if (!1 === r) return !1;
			b.events.snap || pt(h, b.cssClasses.tap, b.animationDuration),
				rt(r, e, !0, !0),
				et(),
				J("slide", r, !0),
				J("update", r, !0),
				J("change", r, !0),
				J("set", r, !0),
			b.events.snap && I(t, { handleNumbers: [r] });
		}
		function W(t) {
			var e = q(t.calcPoint),
				r = y.getStep(e),
				n = y.fromStepping(r);
			Object.keys(v).forEach(function (t) {
				"hover" === t.split(".")[0] &&
				v[t].forEach(function (t) {
					t.call(a, n);
				});
			});
		}
		function $(t, e) {
			(v[t] = v[t] || []),
				v[t].push(e),
			"update" === t.split(".")[0] &&
			u.forEach(function (t, e) {
				J("update", e);
			});
		}
		function G(t) {
			var n = t && t.split(".")[0],
				i = n && t.substring(n.length);
			Object.keys(v).forEach(function (t) {
				var e = t.split(".")[0],
					r = t.substring(e.length);
				(n && n !== e) || (i && i !== r) || delete v[t];
			});
		}
		function J(r, n, i) {
			Object.keys(v).forEach(function (t) {
				var e = t.split(".")[0];
				r === e &&
				v[t].forEach(function (t) {
					t.call(a, x.map(b.format.to), n, x.slice(), i || !1, S.slice(), a);
				});
			});
		}
		function K(t, e, r, n, i, o) {
			var s;
			return (
				1 < u.length &&
				!b.events.unconstrained &&
				(n &&
				0 < e &&
				((s = y.getAbsoluteDistance(t[e - 1], b.margin, 0)),
					(r = Math.max(r, s))),
				i &&
				e < u.length - 1 &&
				((s = y.getAbsoluteDistance(t[e + 1], b.margin, 1)),
					(r = Math.min(r, s)))),
				1 < u.length &&
				b.limit &&
				(n &&
				0 < e &&
				((s = y.getAbsoluteDistance(t[e - 1], b.limit, 0)),
					(r = Math.min(r, s))),
				i &&
				e < u.length - 1 &&
				((s = y.getAbsoluteDistance(t[e + 1], b.limit, 1)),
					(r = Math.max(r, s)))),
				b.padding &&
				(0 === e &&
				((s = y.getAbsoluteDistance(0, b.padding[0], 0)),
					(r = Math.max(r, s))),
				e === u.length - 1 &&
				((s = y.getAbsoluteDistance(100, b.padding[1], 1)),
					(r = Math.min(r, s)))),
				!((r = ft((r = y.getStep(r)))) === t[e] && !o) && r
			);
		}
		function Q(t, e) {
			var r = b.ort;
			return (r ? e : t) + ", " + (r ? t : e);
		}
		function Z(t, n, r, e) {
			var i = r.slice(),
				o = [!t, t],
				s = [t, !t];
			(e = e.slice()),
			t && e.reverse(),
				1 < e.length
					? e.forEach(function (t, e) {
						var r = K(i, t, i[t] + n, o[e], s[e], !1);
						!1 === r ? (n = 0) : ((n = r - i[t]), (i[t] = r));
					})
					: (o = s = [!0]);
			var a = !1;
			e.forEach(function (t, e) {
				a = rt(t, r[t] + n, o[e], s[e]) || a;
			}),
			a &&
			e.forEach(function (t) {
				J("update", t), J("slide", t);
			});
		}
		function tt(t, e) {
			return b.dir ? 100 - t - e : t;
		}
		function et() {
			m.forEach(function (t) {
				var e = 50 < S[t] ? -1 : 1,
					r = 3 + (u.length + e * t);
				u[t].style.zIndex = r;
			});
		}
		function rt(t, e, r, n, i) {
			return (
				i || (e = K(S, t, e, r, n, !1)),
				!1 !== e &&
				((function (t, e) {
					(S[t] = e), (x[t] = y.fromStepping(e));
					var r = "translate(" + Q(10 * (tt(e, 0) - A) + "%", "0") + ")";
					(u[t].style[b.transformRule] = r), nt(t), nt(t + 1);
				})(t, e),
					!0)
			);
		}
		function nt(t) {
			if (s[t]) {
				var e = 0,
					r = 100;
				0 !== t && (e = S[t - 1]), t !== s.length - 1 && (r = S[t]);
				var n = r - e,
					i = "translate(" + Q(tt(e, n) + "%", "0") + ")",
					o = "scale(" + Q(n / 100, "1") + ")";
				s[t].style[b.transformRule] = i + " " + o;
			}
		}
		function it(t, e) {
			return null === t || !1 === t || void 0 === t
				? S[e]
				: ("number" == typeof t && (t = String(t)),
					(t = b.format.from(t)),
					!1 === (t = y.toStepping(t)) || isNaN(t) ? S[e] : t);
		}
		function ot(t, e, r) {
			var n = dt(t),
				i = void 0 === S[0];
			(e = void 0 === e || !!e),
			b.animate && !i && pt(h, b.cssClasses.tap, b.animationDuration),
				m.forEach(function (t) {
					rt(t, it(n[t], t), !0, !1, r);
				});
			for (var o = 1 === m.length ? 0 : 1; o < m.length; ++o)
				m.forEach(function (t) {
					rt(t, S[t], !0, !0, r);
				});
			et(),
				m.forEach(function (t) {
					J("update", t), null !== n[t] && e && J("set", t);
				});
		}
		function st() {
			var t = x.map(b.format.to);
			return 1 === t.length ? t[0] : t;
		}
		function at(t) {
			var e = S[t],
				r = y.getNearbySteps(e),
				n = x[t],
				i = r.thisStep.step,
				o = null;
			if (b.snap)
				return [
					n - r.stepBefore.startValue || null,
					r.stepAfter.startValue - n || null,
				];
			!1 !== i &&
			n + i > r.stepAfter.startValue &&
			(i = r.stepAfter.startValue - n),
				(o =
					n > r.thisStep.startValue
						? r.thisStep.step
						: !1 !== r.stepBefore.step && n - r.stepBefore.highestStep),
				100 === e ? (i = null) : 0 === e && (o = null);
			var s = y.countStepDecimals();
			return (
				null !== i && !1 !== i && (i = Number(i.toFixed(s))),
				null !== o && !1 !== o && (o = Number(o.toFixed(s))),
					[o, i]
			);
		}
		return (
			ht((e = h), b.cssClasses.target),
				0 === b.dir ? ht(e, b.cssClasses.ltr) : ht(e, b.cssClasses.rtl),
				0 === b.ort
					? ht(e, b.cssClasses.horizontal)
					: ht(e, b.cssClasses.vertical),
				ht(
					e,
					"rtl" === getComputedStyle(e).direction
						? b.cssClasses.textDirectionRtl
						: b.cssClasses.textDirectionLtr
				),
				(l = V(e, b.cssClasses.base)),
				(function (t, e) {
					var r = V(e, b.cssClasses.connects);
					(u = []), (s = []).push(M(r, t[0]));
					for (var n = 0; n < b.handles; n++)
						u.push(D(e, n)), (m[n] = n), s.push(M(r, t[n + 1]));
				})(b.connect, l),
			(p = b.events).fixed ||
			u.forEach(function (t, e) {
				B(f.start, t.children[0], I, { handleNumbers: [e] });
			}),
			p.tap && B(f.start, l, n, {}),
			p.hover && B(f.move, l, W, { hover: !0 }),
			p.drag &&
			s.forEach(function (t, e) {
				if (!1 !== t && 0 !== e && e !== s.length - 1) {
					var r = u[e - 1],
						n = u[e],
						i = [t];
					ht(t, b.cssClasses.draggable),
					p.fixed && (i.push(r.children[0]), i.push(n.children[0])),
						i.forEach(function (t) {
							B(f.start, t, I, {
								handles: [r, n],
								handleNumbers: [e - 1, e],
							});
						});
				}
			}),
				ot(b.start),
			b.pips && R(b.pips),
			b.tooltips && H(),
				$("update", function (t, e, s, r, a) {
					m.forEach(function (t) {
						var e = u[t],
							r = K(S, t, 0, !0, !0, !0),
							n = K(S, t, 100, !0, !0, !0),
							i = a[t],
							o = b.ariaFormat.to(s[t]);
						(r = y.fromStepping(r).toFixed(1)),
							(n = y.fromStepping(n).toFixed(1)),
							(i = y.fromStepping(i).toFixed(1)),
							e.children[0].setAttribute("aria-valuemin", r),
							e.children[0].setAttribute("aria-valuemax", n),
							e.children[0].setAttribute("aria-valuenow", i),
							e.children[0].setAttribute("aria-valuetext", o);
					});
				}),
				(a = {
					destroy: function () {
						for (var t in b.cssClasses)
							b.cssClasses.hasOwnProperty(t) && mt(h, b.cssClasses[t]);
						for (; h.firstChild; ) h.removeChild(h.firstChild);
						delete h.noUiSlider;
					},
					steps: function () {
						return m.map(at);
					},
					on: $,
					off: G,
					get: st,
					set: ot,
					setHandle: function (t, e, r, n) {
						if (!(0 <= (t = Number(t)) && t < m.length))
							throw new Error(
								"noUiSlider (" + lt + "): invalid handle number, got: " + t
							);
						rt(t, it(e, t), !0, !0, n), J("update", t), r && J("set", t);
					},
					reset: function (t) {
						ot(b.start, t);
					},
					__moveHandles: function (t, e, r) {
						Z(t, e, S, r);
					},
					options: o,
					updateOptions: function (e, t) {
						var r = st(),
							n = [
								"margin",
								"limit",
								"padding",
								"range",
								"animate",
								"snap",
								"step",
								"format",
								"pips",
								"tooltips",
							];
						n.forEach(function (t) {
							void 0 !== e[t] && (o[t] = e[t]);
						});
						var i = vt(o);
						n.forEach(function (t) {
							void 0 !== e[t] && (b[t] = i[t]);
						}),
							(y = i.spectrum),
							(b.margin = i.margin),
							(b.limit = i.limit),
							(b.padding = i.padding),
							b.pips ? R(b.pips) : F(),
							b.tooltips ? H() : z(),
							(S = []),
							ot(e.start || r, t);
					},
					target: h,
					removePips: F,
					removeTooltips: z,
					getTooltips: function () {
						return i;
					},
					getOrigins: function () {
						return u;
					},
					pips: R,
				})
		);
	}
	return {
		__spectrum: i,
		version: lt,
		cssClasses: d,
		create: function (t, e) {
			if (!t || !t.nodeName)
				throw new Error(
					"noUiSlider (" + lt + "): create requires a single element, got: " + t
				);
			if (t.noUiSlider)
				throw new Error(
					"noUiSlider (" + lt + "): Slider was already initialized."
				);
			var r = j(t, vt(e), e);
			return (t.noUiSlider = r);
		},
	};

});


const rangeSlider = document.getElementById('range-slider');

if (rangeSlider) {
	noUiSlider.create(rangeSlider, {
		start: [500, 999999],
		connect: true,
		step: 1,
		range: {
			'min': [500],
			'max': [10000]
		}
	});

	const input0 = document.getElementById('input-0');
	const input1 = document.getElementById('input-1');
	const inputs = [input0, input1];

	rangeSlider.noUiSlider.on('update', function(values, handle){
		inputs[handle].value = Math.round(values[handle]);
	});

	const setRangeSlider = (i, value) => {
		let arr = [null, null];
		arr[i] = value;

		rangeSlider.noUiSlider.set(arr);
	};

	inputs.forEach((el, index) => {
		el.addEventListener('change', (e) => {
			console.log(index);
			setRangeSlider(index, e.currentTarget.value);
		});
	});
}
