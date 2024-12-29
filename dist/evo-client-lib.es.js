import Ie, { createContext as Ne, useState as x, useEffect as J, useContext as Ue } from "react";
var K = { exports: {} }, z = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ae;
function Pr() {
  if (Ae) return z;
  Ae = 1;
  var r = Ie, n = Symbol.for("react.element"), o = Symbol.for("react.fragment"), s = Object.prototype.hasOwnProperty, i = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, u = { key: !0, ref: !0, __self: !0, __source: !0 };
  function m(y, l, d) {
    var g, w = {}, C = null, A = null;
    d !== void 0 && (C = "" + d), l.key !== void 0 && (C = "" + l.key), l.ref !== void 0 && (A = l.ref);
    for (g in l) s.call(l, g) && !u.hasOwnProperty(g) && (w[g] = l[g]);
    if (y && y.defaultProps) for (g in l = y.defaultProps, l) w[g] === void 0 && (w[g] = l[g]);
    return { $$typeof: n, type: y, key: C, ref: A, props: w, _owner: i.current };
  }
  return z.Fragment = o, z.jsx = m, z.jsxs = m, z;
}
var Y = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var De;
function $r() {
  return De || (De = 1, process.env.NODE_ENV !== "production" && function() {
    var r = Ie, n = Symbol.for("react.element"), o = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), m = Symbol.for("react.provider"), y = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), g = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), A = Symbol.for("react.offscreen"), I = Symbol.iterator, X = "@@iterator";
    function Z(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = I && e[I] || e[X];
      return typeof t == "function" ? t : null;
    }
    var k = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function E(e) {
      {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), c = 1; c < t; c++)
          a[c - 1] = arguments[c];
        Ke("error", e, a);
      }
    }
    function Ke(e, t, a) {
      {
        var c = k.ReactDebugCurrentFrame, h = c.getStackAddendum();
        h !== "" && (t += "%s", a = a.concat([h]));
        var v = a.map(function(p) {
          return String(p);
        });
        v.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, v);
      }
    }
    var Xe = !1, Ze = !1, He = !1, Qe = !1, er = !1, ue;
    ue = Symbol.for("react.module.reference");
    function rr(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === s || e === u || er || e === i || e === d || e === g || Qe || e === A || Xe || Ze || He || typeof e == "object" && e !== null && (e.$$typeof === C || e.$$typeof === w || e.$$typeof === m || e.$$typeof === y || e.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ue || e.getModuleId !== void 0));
    }
    function tr(e, t, a) {
      var c = e.displayName;
      if (c)
        return c;
      var h = t.displayName || t.name || "";
      return h !== "" ? a + "(" + h + ")" : a;
    }
    function le(e) {
      return e.displayName || "Context";
    }
    function P(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && E("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case s:
          return "Fragment";
        case o:
          return "Portal";
        case u:
          return "Profiler";
        case i:
          return "StrictMode";
        case d:
          return "Suspense";
        case g:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case y:
            var t = e;
            return le(t) + ".Consumer";
          case m:
            var a = e;
            return le(a._context) + ".Provider";
          case l:
            return tr(e, e.render, "ForwardRef");
          case w:
            var c = e.displayName || null;
            return c !== null ? c : P(e.type) || "Memo";
          case C: {
            var h = e, v = h._payload, p = h._init;
            try {
              return P(p(v));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var D = Object.assign, N = 0, fe, de, pe, he, ve, ge, ye;
    function me() {
    }
    me.__reactDisabledLog = !0;
    function nr() {
      {
        if (N === 0) {
          fe = console.log, de = console.info, pe = console.warn, he = console.error, ve = console.group, ge = console.groupCollapsed, ye = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: me,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        N++;
      }
    }
    function or() {
      {
        if (N--, N === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: D({}, e, {
              value: fe
            }),
            info: D({}, e, {
              value: de
            }),
            warn: D({}, e, {
              value: pe
            }),
            error: D({}, e, {
              value: he
            }),
            group: D({}, e, {
              value: ve
            }),
            groupCollapsed: D({}, e, {
              value: ge
            }),
            groupEnd: D({}, e, {
              value: ye
            })
          });
        }
        N < 0 && E("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var H = k.ReactCurrentDispatcher, Q;
    function B(e, t, a) {
      {
        if (Q === void 0)
          try {
            throw Error();
          } catch (h) {
            var c = h.stack.trim().match(/\n( *(at )?)/);
            Q = c && c[1] || "";
          }
        return `
` + Q + e;
      }
    }
    var ee = !1, V;
    {
      var ar = typeof WeakMap == "function" ? WeakMap : Map;
      V = new ar();
    }
    function we(e, t) {
      if (!e || ee)
        return "";
      {
        var a = V.get(e);
        if (a !== void 0)
          return a;
      }
      var c;
      ee = !0;
      var h = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var v;
      v = H.current, H.current = null, nr();
      try {
        if (t) {
          var p = function() {
            throw Error();
          };
          if (Object.defineProperty(p.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(p, []);
            } catch (R) {
              c = R;
            }
            Reflect.construct(e, [], p);
          } else {
            try {
              p.call();
            } catch (R) {
              c = R;
            }
            e.call(p.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (R) {
            c = R;
          }
          e();
        }
      } catch (R) {
        if (R && c && typeof R.stack == "string") {
          for (var f = R.stack.split(`
`), _ = c.stack.split(`
`), j = f.length - 1, b = _.length - 1; j >= 1 && b >= 0 && f[j] !== _[b]; )
            b--;
          for (; j >= 1 && b >= 0; j--, b--)
            if (f[j] !== _[b]) {
              if (j !== 1 || b !== 1)
                do
                  if (j--, b--, b < 0 || f[j] !== _[b]) {
                    var T = `
` + f[j].replace(" at new ", " at ");
                    return e.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", e.displayName)), typeof e == "function" && V.set(e, T), T;
                  }
                while (j >= 1 && b >= 0);
              break;
            }
        }
      } finally {
        ee = !1, H.current = v, or(), Error.prepareStackTrace = h;
      }
      var L = e ? e.displayName || e.name : "", M = L ? B(L) : "";
      return typeof e == "function" && V.set(e, M), M;
    }
    function sr(e, t, a) {
      return we(e, !1);
    }
    function ir(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function q(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return we(e, ir(e));
      if (typeof e == "string")
        return B(e);
      switch (e) {
        case d:
          return B("Suspense");
        case g:
          return B("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case l:
            return sr(e.render);
          case w:
            return q(e.type, t, a);
          case C: {
            var c = e, h = c._payload, v = c._init;
            try {
              return q(v(h), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    var U = Object.prototype.hasOwnProperty, je = {}, be = k.ReactDebugCurrentFrame;
    function G(e) {
      if (e) {
        var t = e._owner, a = q(e.type, e._source, t ? t.type : null);
        be.setExtraStackFrame(a);
      } else
        be.setExtraStackFrame(null);
    }
    function cr(e, t, a, c, h) {
      {
        var v = Function.call.bind(U);
        for (var p in e)
          if (v(e, p)) {
            var f = void 0;
            try {
              if (typeof e[p] != "function") {
                var _ = Error((c || "React class") + ": " + a + " type `" + p + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[p] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw _.name = "Invariant Violation", _;
              }
              f = e[p](t, p, c, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (j) {
              f = j;
            }
            f && !(f instanceof Error) && (G(h), E("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", c || "React class", a, p, typeof f), G(null)), f instanceof Error && !(f.message in je) && (je[f.message] = !0, G(h), E("Failed %s type: %s", a, f.message), G(null));
          }
      }
    }
    var ur = Array.isArray;
    function re(e) {
      return ur(e);
    }
    function lr(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function fr(e) {
      try {
        return Ee(e), !1;
      } catch {
        return !0;
      }
    }
    function Ee(e) {
      return "" + e;
    }
    function _e(e) {
      if (fr(e))
        return E("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", lr(e)), Ee(e);
    }
    var W = k.ReactCurrentOwner, dr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Re, Se, te;
    te = {};
    function pr(e) {
      if (U.call(e, "ref")) {
        var t = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function hr(e) {
      if (U.call(e, "key")) {
        var t = Object.getOwnPropertyDescriptor(e, "key").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function vr(e, t) {
      if (typeof e.ref == "string" && W.current && t && W.current.stateNode !== t) {
        var a = P(W.current.type);
        te[a] || (E('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', P(W.current.type), e.ref), te[a] = !0);
      }
    }
    function gr(e, t) {
      {
        var a = function() {
          Re || (Re = !0, E("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: a,
          configurable: !0
        });
      }
    }
    function yr(e, t) {
      {
        var a = function() {
          Se || (Se = !0, E("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: a,
          configurable: !0
        });
      }
    }
    var mr = function(e, t, a, c, h, v, p) {
      var f = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: e,
        key: t,
        ref: a,
        props: p,
        // Record the component responsible for creating this element.
        _owner: v
      };
      return f._store = {}, Object.defineProperty(f._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(f, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: c
      }), Object.defineProperty(f, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: h
      }), Object.freeze && (Object.freeze(f.props), Object.freeze(f)), f;
    };
    function wr(e, t, a, c, h) {
      {
        var v, p = {}, f = null, _ = null;
        a !== void 0 && (_e(a), f = "" + a), hr(t) && (_e(t.key), f = "" + t.key), pr(t) && (_ = t.ref, vr(t, h));
        for (v in t)
          U.call(t, v) && !dr.hasOwnProperty(v) && (p[v] = t[v]);
        if (e && e.defaultProps) {
          var j = e.defaultProps;
          for (v in j)
            p[v] === void 0 && (p[v] = j[v]);
        }
        if (f || _) {
          var b = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          f && gr(p, b), _ && yr(p, b);
        }
        return mr(e, f, _, h, c, W.current, p);
      }
    }
    var ne = k.ReactCurrentOwner, Te = k.ReactDebugCurrentFrame;
    function F(e) {
      if (e) {
        var t = e._owner, a = q(e.type, e._source, t ? t.type : null);
        Te.setExtraStackFrame(a);
      } else
        Te.setExtraStackFrame(null);
    }
    var oe;
    oe = !1;
    function ae(e) {
      return typeof e == "object" && e !== null && e.$$typeof === n;
    }
    function Oe() {
      {
        if (ne.current) {
          var e = P(ne.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function jr(e) {
      return "";
    }
    var Ce = {};
    function br(e) {
      {
        var t = Oe();
        if (!t) {
          var a = typeof e == "string" ? e : e.displayName || e.name;
          a && (t = `

Check the top-level render call using <` + a + ">.");
        }
        return t;
      }
    }
    function ke(e, t) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var a = br(t);
        if (Ce[a])
          return;
        Ce[a] = !0;
        var c = "";
        e && e._owner && e._owner !== ne.current && (c = " It was passed a child from " + P(e._owner.type) + "."), F(e), E('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', a, c), F(null);
      }
    }
    function Pe(e, t) {
      {
        if (typeof e != "object")
          return;
        if (re(e))
          for (var a = 0; a < e.length; a++) {
            var c = e[a];
            ae(c) && ke(c, t);
          }
        else if (ae(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var h = Z(e);
          if (typeof h == "function" && h !== e.entries)
            for (var v = h.call(e), p; !(p = v.next()).done; )
              ae(p.value) && ke(p.value, t);
        }
      }
    }
    function Er(e) {
      {
        var t = e.type;
        if (t == null || typeof t == "string")
          return;
        var a;
        if (typeof t == "function")
          a = t.propTypes;
        else if (typeof t == "object" && (t.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        t.$$typeof === w))
          a = t.propTypes;
        else
          return;
        if (a) {
          var c = P(t);
          cr(a, e.props, "prop", c, e);
        } else if (t.PropTypes !== void 0 && !oe) {
          oe = !0;
          var h = P(t);
          E("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", h || "Unknown");
        }
        typeof t.getDefaultProps == "function" && !t.getDefaultProps.isReactClassApproved && E("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function _r(e) {
      {
        for (var t = Object.keys(e.props), a = 0; a < t.length; a++) {
          var c = t[a];
          if (c !== "children" && c !== "key") {
            F(e), E("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", c), F(null);
            break;
          }
        }
        e.ref !== null && (F(e), E("Invalid attribute `ref` supplied to `React.Fragment`."), F(null));
      }
    }
    var $e = {};
    function xe(e, t, a, c, h, v) {
      {
        var p = rr(e);
        if (!p) {
          var f = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (f += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var _ = jr();
          _ ? f += _ : f += Oe();
          var j;
          e === null ? j = "null" : re(e) ? j = "array" : e !== void 0 && e.$$typeof === n ? (j = "<" + (P(e.type) || "Unknown") + " />", f = " Did you accidentally export a JSX literal instead of a component?") : j = typeof e, E("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", j, f);
        }
        var b = wr(e, t, a, h, v);
        if (b == null)
          return b;
        if (p) {
          var T = t.children;
          if (T !== void 0)
            if (c)
              if (re(T)) {
                for (var L = 0; L < T.length; L++)
                  Pe(T[L], e);
                Object.freeze && Object.freeze(T);
              } else
                E("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Pe(T, e);
        }
        if (U.call(t, "key")) {
          var M = P(e), R = Object.keys(t).filter(function(kr) {
            return kr !== "key";
          }), se = R.length > 0 ? "{key: someKey, " + R.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!$e[M + se]) {
            var Cr = R.length > 0 ? "{" + R.join(": ..., ") + ": ...}" : "{}";
            E(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, se, M, Cr, M), $e[M + se] = !0;
          }
        }
        return e === s ? _r(b) : Er(b), b;
      }
    }
    function Rr(e, t, a) {
      return xe(e, t, a, !0);
    }
    function Sr(e, t, a) {
      return xe(e, t, a, !1);
    }
    var Tr = Sr, Or = Rr;
    Y.Fragment = s, Y.jsx = Tr, Y.jsxs = Or;
  }()), Y;
}
var Me;
function xr() {
  return Me || (Me = 1, process.env.NODE_ENV === "production" ? K.exports = Pr() : K.exports = $r()), K.exports;
}
var O = xr();
let ie, ce = "", We = "";
function $() {
  return ie && ie.access_token;
}
function Fe(r) {
  ie = r, ce && (console.log(333, r), localStorage.setItem("refresh-token", r.refresh_token));
}
function ot(r) {
  ce = r;
}
function at(r) {
  We = r;
}
function S() {
  return ce;
}
function Ar() {
  return We;
}
async function Dr(r) {
  const n = await fetch(`${S()}/api/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(r)
  }), o = await n.json();
  if (!n.ok)
    throw new Error(o.message);
  return o;
}
async function Le() {
  try {
    const r = await fetch(`${S()}/api/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$()}`
      }
    });
    if (!r.ok) {
      const o = await r.json();
      throw new Error(o.message);
    }
    return await r.json();
  } catch (r) {
    throw console.error(r.message), r;
  }
}
async function Mr(r) {
  try {
    const n = await fetch(`${S()}/api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ refresh_token: r })
    });
    if (!n.ok) {
      const s = await n.json();
      throw new Error(s.message);
    }
    return await n.json();
  } catch (n) {
    throw console.error(n.message), n;
  }
}
async function Fr() {
  try {
    const r = await fetch(`${S()}/api/auth/release`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!r.ok) {
      const o = await r.json();
      throw new Error(o.message);
    }
    return await r.json();
  } catch (r) {
    throw console.error(r.message), r;
  }
}
let ze = Ne();
function st({ children: r }) {
  let [n, o] = x();
  J(() => {
    i();
  }, [n]);
  const s = async ({ username: y, password: l }) => {
    try {
      const d = await Dr({ username: y, password: l });
      Fe(d);
      const g = await Le();
      return o(g), g;
    } catch (d) {
      throw o(!1), d;
    }
  }, i = async () => {
    if (n)
      return n;
    try {
      const y = await Mr(S() ? localStorage.getItem("refresh-token") : "");
      if (!y)
        throw "no valid refresh token";
      Fe(y);
      const l = await Le();
      if (!l)
        throw "no valid user";
      return o(l), l;
    } catch {
      return o(!1), !1;
    }
  };
  let m = { user: n, signin: s, signout: async () => {
    try {
      await Fr(), o(!1);
      return;
    } catch {
      o(!1);
      return;
    }
  }, checkUser: i };
  return /* @__PURE__ */ O.jsx(ze.Provider, { value: m, children: r });
}
function Ye() {
  return Ue(ze);
}
function it({
  onSuccess: r,
  onFailure: n,
  formClass: o,
  errorClass: s,
  labelClass: i,
  inputClass: u,
  headerClass: m,
  footerClass: y,
  submitClass: l
}) {
  let [d, g] = x(), w = Ye();
  async function C(A) {
    A.preventDefault();
    let I = new FormData(A.currentTarget), X = I.get("username"), Z = I.get("password");
    try {
      const k = await w.signin({ username: X, password: Z });
      r && r(k);
    } catch (k) {
      n && n(k), g(k.message);
    }
  }
  return /* @__PURE__ */ O.jsxs("form", { className: o, onSubmit: C, children: [
    /* @__PURE__ */ O.jsx("div", { className: m, children: d && /* @__PURE__ */ O.jsx("div", { className: s, children: d }) }),
    /* @__PURE__ */ O.jsx("label", { className: i, htmlFor: "username", children: "Username" }),
    /* @__PURE__ */ O.jsx(
      "input",
      {
        required: !0,
        className: u,
        minLength: 4,
        name: "username"
      }
    ),
    /* @__PURE__ */ O.jsx("label", { className: i, htmlFor: "password", children: "Password" }),
    /* @__PURE__ */ O.jsx(
      "input",
      {
        required: !0,
        className: u,
        minLength: 4,
        type: "password",
        name: "password"
      }
    ),
    /* @__PURE__ */ O.jsx("div", { className: y, children: /* @__PURE__ */ O.jsx("button", { className: l, type: "submit", children: "Login" }) })
  ] });
}
function ct({ children: r, onFailure: n = () => {
}, loader: o, loaderClass: s }) {
  let { user: i } = Ye();
  return i === !1 ? n() : i != null && i.username ? r : o || /* @__PURE__ */ O.jsx("div", { className: s });
}
async function Lr() {
  try {
    const r = await fetch(`${S()}/api/meta`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$()}`
      }
    });
    if (!r.ok) {
      const o = await r.json();
      throw new Error(o.message);
    }
    const n = await r.json();
    return n == null ? void 0 : n.records;
  } catch (r) {
    throw console.error(r.message), r;
  }
}
function ut(r = {}) {
  const [n, o] = x(), [s, i] = x(!0);
  return J(() => {
    Lr().then((u) => {
      i(!1), o(u);
    }).catch((u) => {
      console.error(u), i(!1), r.onError && r.onError(u);
    });
  }, []), { metaModels: n, loadingMetaModels: s, setMetaModels: o };
}
let Je = Ne();
function lt({ children: r }) {
  const [n, o] = x(null), [s, i] = x(!1), [u, m] = x([]);
  J(() => {
    const d = new WebSocket(`${Ar()}/ws`);
    return d.addEventListener("open", (g) => {
      i(!0), console.log("new WebSocket connected");
      const w = {
        resourse: "socket",
        action: "connected",
        messages: "hello"
      };
      d.send(JSON.stringify(w));
    }), d.addEventListener("close", (g) => {
      i(!1), console.log("WebSocket connected closed");
    }), d.addEventListener("message", (g) => {
      const w = JSON.parse(g.data);
      console.log("new message from websocket", w), m([...u, w]);
    }), o(d), () => {
      n && n.close(), i(!1);
    };
  }, []);
  let l = {
    ws: n,
    isReady: s,
    sendMessage: (d) => {
      n && n.send(d);
    },
    messages: u
  };
  return /* @__PURE__ */ O.jsx(Je.Provider, { value: l, children: r });
}
function Ir() {
  return Ue(Je);
}
async function Nr({ collection: r, id: n, method: o, path: s, query: i, body: u, secure: m }) {
  try {
    let y = `${S()}${s.replace(":collection", r).replace(":id", n)}${i ? `?${i}` : ""}`, l = { method: o };
    m && (l.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${$()}`
    }), u && (l.body = JSON.stringify(u));
    const d = await fetch(y, l);
    if (!d.ok) {
      const w = await d.json();
      throw new Error(w.message);
    }
    return await d.json();
  } catch (y) {
    throw console.error(y.message), y;
  }
}
async function Be(r, n) {
  try {
    let o = "";
    n && Object.keys(n).forEach((u, m) => {
      o = `${m > 0 ? "&" : ""}${u}=${n[u]}`;
    });
    const s = await fetch(`${S()}/api/${r}${n && Object.keys(n).length ? `?${o}` : ""}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$()}`
      }
    });
    if (!s.ok) {
      const u = await s.json();
      throw new Error(u.message);
    }
    return await s.json();
  } catch (o) {
    throw console.error(o.message), o;
  }
}
async function Ur(r, n) {
  try {
    const o = await fetch(`${S()}/api/${r}/${n}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$()}`
      }
    });
    if (!o.ok) {
      const i = await o.json();
      throw new Error(i.message);
    }
    return (await o.json()).record;
  } catch (o) {
    throw console.error(o.message), o;
  }
}
async function Wr(r, n = {}) {
  const o = new URLSearchParams({ ...n, where: JSON.stringify(n.where) }).toString();
  try {
    const s = await fetch(`${S()}/api/${r}/findone?${o}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$()}`
      }
    });
    if (!s.ok) {
      const u = await s.json();
      throw new Error(u.message);
    }
    return (await s.json()).record;
  } catch (s) {
    throw console.error(s.message), s;
  }
}
async function Ve(r, n) {
  try {
    const o = await fetch(`${S()}/api/${r}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$()}`
      },
      body: JSON.stringify(n)
    });
    if (!o.ok) {
      const i = await o.json();
      throw new Error(i.message);
    }
    return await o.json();
  } catch (o) {
    throw console.error(o.message), o;
  }
}
async function zr(r, n, o) {
  try {
    const s = await fetch(`${S()}/api/${r}/${n}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$()}`
      },
      body: JSON.stringify(o)
    });
    if (!s.ok) {
      const u = await s.json();
      throw new Error(u.message);
    }
    return await s.json();
  } catch (s) {
    throw console.error(s.message), s;
  }
}
async function Yr(r, n) {
  try {
    const o = await fetch(`${S()}/api/${r}/${n}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$()}`
      }
    });
    if (!o.ok) {
      const i = await o.json();
      throw new Error(i.message);
    }
    return await o.json();
  } catch (o) {
    throw console.error(o.message), o;
  }
}
async function Jr(r, n) {
  const o = new URLSearchParams({ ...n, where: JSON.stringify(n.where) }).toString();
  try {
    const s = await fetch(`${S()}/api/${r}/many?${o}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$()}`
      }
    });
    if (!s.ok) {
      const u = await s.json();
      throw new Error(u.message);
    }
    return await s.json();
  } catch (s) {
    throw console.error(s.message), s;
  }
}
function Br(r = {}) {
  const [n, o] = x(), [s, i] = x(!0), { ws: u } = Ir();
  J(() => {
    const l = (d) => {
      const { resource: g, action: w, message: C } = JSON.parse(d.data);
      g === r.model && ["create", "update", "delete"].includes(w) && (console.log("new message for useModel", { resource: g, action: w, message: C }), m(r.query));
    };
    return u.addEventListener("message", l), () => {
      u.removeEventListener("message", l);
    };
  }, []), J(() => {
    m(r.query);
  }, []);
  async function m(l) {
    console.log(11111);
    try {
      i(!0);
      const d = await Be(r.model, l);
      i(!1), o(d);
    } catch (d) {
      console.error(d), i(!1), r == null || r.onError(d);
    }
  }
  async function y(l) {
    try {
      await Ve(r.model, l), r.preventUpdate || await m(r.query);
    } catch (d) {
      console.error(d), r == null || r.onError(d);
    }
  }
  return [n, s, m, y];
}
const ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  builder: Nr,
  create: Ve,
  find: Be,
  findById: Ur,
  findOne: Wr,
  remove: Yr,
  removeMany: Jr,
  update: zr,
  useModel: Br
}, Symbol.toStringTag, { value: "Module" })), qe = (r) => r.replace(/([A-Z])/g, (n) => ` ${n}`).trim().replace(/\s+/g, "-").toLowerCase(), Vr = (r) => r.replace(/([A-Z])/g, (n) => ` ${n}`).trim().replace(/\s+/g, "_").toLowerCase(), qr = (r) => r.replace(/-/g, " ").split(" ").map((n, o) => n.charAt(0)[o === 0 ? "toLowerCase" : "toUpperCase"]() + n.slice(1)).join(""), Gr = (r) => qe(r).split(/\-|\_/g).map((n, o) => n.charAt(0).toUpperCase() + n.slice(1)).join(" ");
function Kr(r) {
  return r.charAt(0).toUpperCase() + r.slice(1).toLowerCase();
}
const Xr = function(r) {
  return r.split(" ").map((n) => n.charAt(0)).join("").replace(/[1-9]/ig, "").toUpperCase();
}, Zr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Kr,
  initialize: Xr,
  toCamelCase: qr,
  toSlugCase: qe,
  toSpaceCase: Gr,
  toUnderscoreCase: Vr
}, Symbol.toStringTag, { value: "Module" })), Hr = (r) => {
  var n = r;
  if (r >= 1e3) {
    for (var o = ["", "k", "m", "b", "t"], s = Math.floor(("" + r).length / 3), i = "", u = 2; u >= 1; u--) {
      i = parseFloat((s !== 0 ? r / Math.pow(1e3, s) : r).toPrecision(u));
      var m = (i + "").replace(/[^a-zA-Z 0-9]+/g, "");
      if (m.length <= 2)
        break;
    }
    i % 1 !== 0 && (i = i.toFixed(1)), n = i + o[s];
  }
  return n;
}, Qr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abbreviate: Hr
}, Symbol.toStringTag, { value: "Module" }));
function Ge(r, n) {
  for (let o in n)
    n.hasOwnProperty(o) && (n[o] instanceof Object && r[o] instanceof Object ? r[o] = Ge(r[o], n[o]) : r[o] = n[o]);
  return r;
}
const et = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  deepMerge: Ge
}, Symbol.toStringTag, { value: "Module" })), rt = (r) => {
  const n = Math.floor(r / 36e5), o = Math.floor((r - n * 1e3 * 60 * 60) / (1e3 * 60)), s = Math.floor((r - n * 1e3 * 60 * 60 - o * 1e3 * 60) / 1e3);
  return (n < 10 ? "0" : "") + n + ":" + (o < 10 ? "0" : "") + o + ":" + (s < 10 ? "0" : "") + s;
}, tt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  msToTimeString: rt
}, Symbol.toStringTag, { value: "Module" })), dt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  number: Qr,
  object: et,
  string: Zr,
  time: tt
}, Symbol.toStringTag, { value: "Module" }));
export {
  st as AuthProvider,
  it as LoginForm,
  ct as RequireAuth,
  lt as SocketProvider,
  Lr as fetchMeta,
  $ as getAccessToken,
  S as getRestDomain,
  Ar as getSocketDomain,
  Le as getUser,
  Dr as login,
  ft as models,
  Mr as refresh,
  Fr as release,
  ot as setRestDomain,
  at as setSocketDomain,
  Fe as setToken,
  Ye as useAuth,
  ut as useMeta,
  Ir as useSocket,
  dt as utils
};
