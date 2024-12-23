import Fe, { createContext as br, useState as De, useContext as _r } from "react";
var q = { exports: {} }, U = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ce;
function Er() {
  if (Ce) return U;
  Ce = 1;
  var n = Fe, o = Symbol.for("react.element"), i = Symbol.for("react.fragment"), h = Object.prototype.hasOwnProperty, m = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, R = { key: !0, ref: !0, __self: !0, __source: !0 };
  function j(y, f, E) {
    var p, T = {}, P = null, x = null;
    E !== void 0 && (P = "" + E), f.key !== void 0 && (P = "" + f.key), f.ref !== void 0 && (x = f.ref);
    for (p in f) h.call(f, p) && !R.hasOwnProperty(p) && (T[p] = f[p]);
    if (y && y.defaultProps) for (p in f = y.defaultProps, f) T[p] === void 0 && (T[p] = f[p]);
    return { $$typeof: o, type: y, key: P, ref: x, props: T, _owner: m.current };
  }
  return U.Fragment = i, U.jsx = j, U.jsxs = j, U;
}
var W = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pe;
function Rr() {
  return Pe || (Pe = 1, process.env.NODE_ENV !== "production" && function() {
    var n = Fe, o = Symbol.for("react.element"), i = Symbol.for("react.portal"), h = Symbol.for("react.fragment"), m = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), j = Symbol.for("react.provider"), y = Symbol.for("react.context"), f = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), T = Symbol.for("react.memo"), P = Symbol.for("react.lazy"), x = Symbol.for("react.offscreen"), $ = Symbol.iterator, J = "@@iterator";
    function B(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = $ && e[$] || e[J];
      return typeof r == "function" ? r : null;
    }
    var O = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function g(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
          t[a - 1] = arguments[a];
        Le("error", e, t);
      }
    }
    function Le(e, r, t) {
      {
        var a = O.ReactDebugCurrentFrame, c = a.getStackAddendum();
        c !== "" && (r += "%s", t = t.concat([c]));
        var l = t.map(function(u) {
          return String(u);
        });
        l.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, l);
      }
    }
    var Ue = !1, We = !1, Ye = !1, Ne = !1, ze = !1, ae;
    ae = Symbol.for("react.module.reference");
    function Ve(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === h || e === R || ze || e === m || e === E || e === p || Ne || e === x || Ue || We || Ye || typeof e == "object" && e !== null && (e.$$typeof === P || e.$$typeof === T || e.$$typeof === j || e.$$typeof === y || e.$$typeof === f || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ae || e.getModuleId !== void 0));
    }
    function qe(e, r, t) {
      var a = e.displayName;
      if (a)
        return a;
      var c = r.displayName || r.name || "";
      return c !== "" ? t + "(" + c + ")" : t;
    }
    function oe(e) {
      return e.displayName || "Context";
    }
    function S(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && g("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case h:
          return "Fragment";
        case i:
          return "Portal";
        case R:
          return "Profiler";
        case m:
          return "StrictMode";
        case E:
          return "Suspense";
        case p:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case y:
            var r = e;
            return oe(r) + ".Consumer";
          case j:
            var t = e;
            return oe(t._context) + ".Provider";
          case f:
            return qe(e, e.render, "ForwardRef");
          case T:
            var a = e.displayName || null;
            return a !== null ? a : S(e.type) || "Memo";
          case P: {
            var c = e, l = c._payload, u = c._init;
            try {
              return S(u(l));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var k = Object.assign, I = 0, ie, se, ue, ce, le, fe, de;
    function ve() {
    }
    ve.__reactDisabledLog = !0;
    function Je() {
      {
        if (I === 0) {
          ie = console.log, se = console.info, ue = console.warn, ce = console.error, le = console.group, fe = console.groupCollapsed, de = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ve,
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
        I++;
      }
    }
    function Be() {
      {
        if (I--, I === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: k({}, e, {
              value: ie
            }),
            info: k({}, e, {
              value: se
            }),
            warn: k({}, e, {
              value: ue
            }),
            error: k({}, e, {
              value: ce
            }),
            group: k({}, e, {
              value: le
            }),
            groupCollapsed: k({}, e, {
              value: fe
            }),
            groupEnd: k({}, e, {
              value: de
            })
          });
        }
        I < 0 && g("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var K = O.ReactCurrentDispatcher, G;
    function Y(e, r, t) {
      {
        if (G === void 0)
          try {
            throw Error();
          } catch (c) {
            var a = c.stack.trim().match(/\n( *(at )?)/);
            G = a && a[1] || "";
          }
        return `
` + G + e;
      }
    }
    var X = !1, N;
    {
      var Ke = typeof WeakMap == "function" ? WeakMap : Map;
      N = new Ke();
    }
    function pe(e, r) {
      if (!e || X)
        return "";
      {
        var t = N.get(e);
        if (t !== void 0)
          return t;
      }
      var a;
      X = !0;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var l;
      l = K.current, K.current = null, Je();
      try {
        if (r) {
          var u = function() {
            throw Error();
          };
          if (Object.defineProperty(u.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(u, []);
            } catch (_) {
              a = _;
            }
            Reflect.construct(e, [], u);
          } else {
            try {
              u.call();
            } catch (_) {
              a = _;
            }
            e.call(u.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (_) {
            a = _;
          }
          e();
        }
      } catch (_) {
        if (_ && a && typeof _.stack == "string") {
          for (var s = _.stack.split(`
`), b = a.stack.split(`
`), d = s.length - 1, v = b.length - 1; d >= 1 && v >= 0 && s[d] !== b[v]; )
            v--;
          for (; d >= 1 && v >= 0; d--, v--)
            if (s[d] !== b[v]) {
              if (d !== 1 || v !== 1)
                do
                  if (d--, v--, v < 0 || s[d] !== b[v]) {
                    var w = `
` + s[d].replace(" at new ", " at ");
                    return e.displayName && w.includes("<anonymous>") && (w = w.replace("<anonymous>", e.displayName)), typeof e == "function" && N.set(e, w), w;
                  }
                while (d >= 1 && v >= 0);
              break;
            }
        }
      } finally {
        X = !1, K.current = l, Be(), Error.prepareStackTrace = c;
      }
      var D = e ? e.displayName || e.name : "", A = D ? Y(D) : "";
      return typeof e == "function" && N.set(e, A), A;
    }
    function Ge(e, r, t) {
      return pe(e, !1);
    }
    function Xe(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function z(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return pe(e, Xe(e));
      if (typeof e == "string")
        return Y(e);
      switch (e) {
        case E:
          return Y("Suspense");
        case p:
          return Y("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case f:
            return Ge(e.render);
          case T:
            return z(e.type, r, t);
          case P: {
            var a = e, c = a._payload, l = a._init;
            try {
              return z(l(c), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var M = Object.prototype.hasOwnProperty, he = {}, ge = O.ReactDebugCurrentFrame;
    function V(e) {
      if (e) {
        var r = e._owner, t = z(e.type, e._source, r ? r.type : null);
        ge.setExtraStackFrame(t);
      } else
        ge.setExtraStackFrame(null);
    }
    function Ze(e, r, t, a, c) {
      {
        var l = Function.call.bind(M);
        for (var u in e)
          if (l(e, u)) {
            var s = void 0;
            try {
              if (typeof e[u] != "function") {
                var b = Error((a || "React class") + ": " + t + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw b.name = "Invariant Violation", b;
              }
              s = e[u](r, u, a, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (d) {
              s = d;
            }
            s && !(s instanceof Error) && (V(c), g("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", t, u, typeof s), V(null)), s instanceof Error && !(s.message in he) && (he[s.message] = !0, V(c), g("Failed %s type: %s", t, s.message), V(null));
          }
      }
    }
    var He = Array.isArray;
    function Z(e) {
      return He(e);
    }
    function Qe(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function er(e) {
      try {
        return me(e), !1;
      } catch {
        return !0;
      }
    }
    function me(e) {
      return "" + e;
    }
    function ye(e) {
      if (er(e))
        return g("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Qe(e)), me(e);
    }
    var L = O.ReactCurrentOwner, rr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, be, _e, H;
    H = {};
    function tr(e) {
      if (M.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function nr(e) {
      if (M.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function ar(e, r) {
      if (typeof e.ref == "string" && L.current && r && L.current.stateNode !== r) {
        var t = S(L.current.type);
        H[t] || (g('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', S(L.current.type), e.ref), H[t] = !0);
      }
    }
    function or(e, r) {
      {
        var t = function() {
          be || (be = !0, g("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function ir(e, r) {
      {
        var t = function() {
          _e || (_e = !0, g("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var sr = function(e, r, t, a, c, l, u) {
      var s = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: o,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: u,
        // Record the component responsible for creating this element.
        _owner: l
      };
      return s._store = {}, Object.defineProperty(s._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(s, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: a
      }), Object.defineProperty(s, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: c
      }), Object.freeze && (Object.freeze(s.props), Object.freeze(s)), s;
    };
    function ur(e, r, t, a, c) {
      {
        var l, u = {}, s = null, b = null;
        t !== void 0 && (ye(t), s = "" + t), nr(r) && (ye(r.key), s = "" + r.key), tr(r) && (b = r.ref, ar(r, c));
        for (l in r)
          M.call(r, l) && !rr.hasOwnProperty(l) && (u[l] = r[l]);
        if (e && e.defaultProps) {
          var d = e.defaultProps;
          for (l in d)
            u[l] === void 0 && (u[l] = d[l]);
        }
        if (s || b) {
          var v = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          s && or(u, v), b && ir(u, v);
        }
        return sr(e, s, b, c, a, L.current, u);
      }
    }
    var Q = O.ReactCurrentOwner, Ee = O.ReactDebugCurrentFrame;
    function F(e) {
      if (e) {
        var r = e._owner, t = z(e.type, e._source, r ? r.type : null);
        Ee.setExtraStackFrame(t);
      } else
        Ee.setExtraStackFrame(null);
    }
    var ee;
    ee = !1;
    function re(e) {
      return typeof e == "object" && e !== null && e.$$typeof === o;
    }
    function Re() {
      {
        if (Q.current) {
          var e = S(Q.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function cr(e) {
      return "";
    }
    var we = {};
    function lr(e) {
      {
        var r = Re();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function je(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = lr(r);
        if (we[t])
          return;
        we[t] = !0;
        var a = "";
        e && e._owner && e._owner !== Q.current && (a = " It was passed a child from " + S(e._owner.type) + "."), F(e), g('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, a), F(null);
      }
    }
    function Te(e, r) {
      {
        if (typeof e != "object")
          return;
        if (Z(e))
          for (var t = 0; t < e.length; t++) {
            var a = e[t];
            re(a) && je(a, r);
          }
        else if (re(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var c = B(e);
          if (typeof c == "function" && c !== e.entries)
            for (var l = c.call(e), u; !(u = l.next()).done; )
              re(u.value) && je(u.value, r);
        }
      }
    }
    function fr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === f || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === T))
          t = r.propTypes;
        else
          return;
        if (t) {
          var a = S(r);
          Ze(t, e.props, "prop", a, e);
        } else if (r.PropTypes !== void 0 && !ee) {
          ee = !0;
          var c = S(r);
          g("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", c || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && g("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function dr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var a = r[t];
          if (a !== "children" && a !== "key") {
            F(e), g("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", a), F(null);
            break;
          }
        }
        e.ref !== null && (F(e), g("Invalid attribute `ref` supplied to `React.Fragment`."), F(null));
      }
    }
    var Oe = {};
    function Se(e, r, t, a, c, l) {
      {
        var u = Ve(e);
        if (!u) {
          var s = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var b = cr();
          b ? s += b : s += Re();
          var d;
          e === null ? d = "null" : Z(e) ? d = "array" : e !== void 0 && e.$$typeof === o ? (d = "<" + (S(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : d = typeof e, g("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", d, s);
        }
        var v = ur(e, r, t, c, l);
        if (v == null)
          return v;
        if (u) {
          var w = r.children;
          if (w !== void 0)
            if (a)
              if (Z(w)) {
                for (var D = 0; D < w.length; D++)
                  Te(w[D], e);
                Object.freeze && Object.freeze(w);
              } else
                g("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Te(w, e);
        }
        if (M.call(r, "key")) {
          var A = S(e), _ = Object.keys(r).filter(function(yr) {
            return yr !== "key";
          }), te = _.length > 0 ? "{key: someKey, " + _.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Oe[A + te]) {
            var mr = _.length > 0 ? "{" + _.join(": ..., ") + ": ...}" : "{}";
            g(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, te, A, mr, A), Oe[A + te] = !0;
          }
        }
        return e === h ? dr(v) : fr(v), v;
      }
    }
    function vr(e, r, t) {
      return Se(e, r, t, !0);
    }
    function pr(e, r, t) {
      return Se(e, r, t, !1);
    }
    var hr = pr, gr = vr;
    W.Fragment = h, W.jsx = hr, W.jsxs = gr;
  }()), W;
}
var xe;
function wr() {
  return xe || (xe = 1, process.env.NODE_ENV === "production" ? q.exports = Er() : q.exports = Rr()), q.exports;
}
var C = wr();
let ne;
function jr() {
  return ne && ne.access_token;
}
function ke(n) {
  ne = n;
}
async function Tr(n) {
  const o = await fetch("/api/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(n)
  }), i = await o.json();
  if (!o.ok)
    throw new Error(i.message);
  return i;
}
async function Ae() {
  try {
    const n = await fetch("/api/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jr()}`
      }
    });
    if (!n.ok) {
      const i = await n.json();
      throw new Error(i.message);
    }
    return await n.json();
  } catch (n) {
    throw console.error(n.message), n;
  }
}
async function Or() {
  try {
    const n = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!n.ok) {
      const i = await n.json();
      throw new Error(i.message);
    }
    return await n.json();
  } catch (n) {
    throw console.error(n.message), n;
  }
}
async function Sr() {
  try {
    const n = await fetch("/api/auth/release", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!n.ok) {
      const i = await n.json();
      throw new Error(i.message);
    }
    return await n.json();
  } catch (n) {
    throw console.error(n.message), n;
  }
}
let $e = br();
function Yr({ children: n }) {
  let [o, i] = De(), j = { user: o, signin: async ({ username: y, password: f }) => {
    try {
      const E = await Tr({ username: y, password: f });
      ke(E);
      const p = await Ae();
      return i(p), p;
    } catch (E) {
      throw i(!1), E;
    }
  }, signout: async () => {
    try {
      await Sr(), i(!1);
      return;
    } catch {
      i(!1);
      return;
    }
  }, checkUser: async () => {
    if (o)
      return o;
    try {
      const y = await Or();
      if (!y)
        throw "no valid refresh token";
      ke(y);
      const f = await Ae();
      if (!f)
        throw "no valid user";
      return i(f), f;
    } catch {
      return i(!1), !1;
    }
  } };
  return /* @__PURE__ */ C.jsx($e.Provider, { value: j, children: n });
}
function Cr() {
  return _r($e);
}
function Nr({
  onSuccess: n,
  onFailure: o,
  formClass: i,
  errorClass: h,
  labelClass: m,
  inputClass: R,
  headerClass: j,
  footerClass: y,
  submitClass: f
}) {
  let [E, p] = De(), T = Cr();
  async function P(x) {
    x.preventDefault();
    let $ = new FormData(x.currentTarget), J = $.get("username"), B = $.get("password");
    try {
      const O = await T.signin({ username: J, password: B });
      n && n(O);
    } catch (O) {
      o && o(O), p(O.message);
    }
  }
  return /* @__PURE__ */ C.jsxs("form", { className: i, onSubmit: P, children: [
    /* @__PURE__ */ C.jsx("div", { className: j, children: E && /* @__PURE__ */ C.jsx("div", { className: h, children: E }) }),
    /* @__PURE__ */ C.jsx("label", { className: m, htmlFor: "username", children: "Username" }),
    /* @__PURE__ */ C.jsx(
      "input",
      {
        required: !0,
        className: R,
        minLength: 4,
        name: "username"
      }
    ),
    /* @__PURE__ */ C.jsx("label", { className: m, htmlFor: "password", children: "Password" }),
    /* @__PURE__ */ C.jsx(
      "input",
      {
        required: !0,
        className: R,
        minLength: 4,
        type: "password",
        name: "password"
      }
    ),
    /* @__PURE__ */ C.jsx("div", { className: y, children: /* @__PURE__ */ C.jsx("button", { className: f, type: "submit", children: "Login" }) })
  ] });
}
const Ie = (n) => n.replace(/([A-Z])/g, (o) => ` ${o}`).trim().replace(/\s+/g, "-").toLowerCase(), Pr = (n) => n.replace(/([A-Z])/g, (o) => ` ${o}`).trim().replace(/\s+/g, "_").toLowerCase(), xr = (n) => n.replace(/-/g, " ").split(" ").map((o, i) => o.charAt(0)[i === 0 ? "toLowerCase" : "toUpperCase"]() + o.slice(1)).join(""), kr = (n) => Ie(n).split(/\-|\_/g).map((o, i) => o.charAt(0).toUpperCase() + o.slice(1)).join(" ");
function Ar(n) {
  return n.charAt(0).toUpperCase() + n.slice(1).toLowerCase();
}
const Fr = function(n) {
  return n.split(" ").map((o) => o.charAt(0)).join("").replace(/[1-9]/ig, "").toUpperCase();
}, Dr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Ar,
  initialize: Fr,
  toCamelCase: xr,
  toSlugCase: Ie,
  toSpaceCase: kr,
  toUnderscoreCase: Pr
}, Symbol.toStringTag, { value: "Module" })), $r = (n) => {
  var o = n;
  if (n >= 1e3) {
    for (var i = ["", "k", "m", "b", "t"], h = Math.floor(("" + n).length / 3), m = "", R = 2; R >= 1; R--) {
      m = parseFloat((h !== 0 ? n / Math.pow(1e3, h) : n).toPrecision(R));
      var j = (m + "").replace(/[^a-zA-Z 0-9]+/g, "");
      if (j.length <= 2)
        break;
    }
    m % 1 !== 0 && (m = m.toFixed(1)), o = m + i[h];
  }
  return o;
}, Ir = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abbreviate: $r
}, Symbol.toStringTag, { value: "Module" }));
function Me(n, o) {
  for (let i in o)
    o.hasOwnProperty(i) && (o[i] instanceof Object && n[i] instanceof Object ? n[i] = Me(n[i], o[i]) : n[i] = o[i]);
  return n;
}
const Mr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  deepMerge: Me
}, Symbol.toStringTag, { value: "Module" })), Lr = (n) => {
  const o = Math.floor(n / 36e5), i = Math.floor((n - o * 1e3 * 60 * 60) / (1e3 * 60)), h = Math.floor((n - o * 1e3 * 60 * 60 - i * 1e3 * 60) / 1e3);
  return (o < 10 ? "0" : "") + o + ":" + (i < 10 ? "0" : "") + i + ":" + (h < 10 ? "0" : "") + h;
}, Ur = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  msToTimeString: Lr
}, Symbol.toStringTag, { value: "Module" })), zr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  number: Ir,
  object: Mr,
  string: Dr,
  time: Ur
}, Symbol.toStringTag, { value: "Module" }));
export {
  Yr as AuthProvider,
  Nr as LoginForm,
  jr as getAccessToken,
  Ae as getUser,
  Tr as login,
  Or as refresh,
  Sr as release,
  ke as setToken,
  Cr as useAuth,
  zr as utils
};
