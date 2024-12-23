import $e, { createContext as wr, useState as Ie, useEffect as jr, useContext as Tr } from "react";
var V = { exports: {} }, U = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ke;
function Sr() {
  if (ke) return U;
  ke = 1;
  var n = $e, a = Symbol.for("react.element"), i = Symbol.for("react.fragment"), v = Object.prototype.hasOwnProperty, f = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, R = { key: !0, ref: !0, __self: !0, __source: !0 };
  function j(y, d, E) {
    var g, T = {}, P = null, k = null;
    E !== void 0 && (P = "" + E), d.key !== void 0 && (P = "" + d.key), d.ref !== void 0 && (k = d.ref);
    for (g in d) v.call(d, g) && !R.hasOwnProperty(g) && (T[g] = d[g]);
    if (y && y.defaultProps) for (g in d = y.defaultProps, d) T[g] === void 0 && (T[g] = d[g]);
    return { $$typeof: a, type: y, key: P, ref: k, props: T, _owner: f.current };
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
var xe;
function Or() {
  return xe || (xe = 1, process.env.NODE_ENV !== "production" && function() {
    var n = $e, a = Symbol.for("react.element"), i = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), j = Symbol.for("react.provider"), y = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), g = Symbol.for("react.suspense_list"), T = Symbol.for("react.memo"), P = Symbol.for("react.lazy"), k = Symbol.for("react.offscreen"), $ = Symbol.iterator, B = "@@iterator";
    function K(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = $ && e[$] || e[B];
      return typeof r == "function" ? r : null;
    }
    var S = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function m(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++)
          t[o - 1] = arguments[o];
        Ye("error", e, t);
      }
    }
    function Ye(e, r, t) {
      {
        var o = S.ReactDebugCurrentFrame, c = o.getStackAddendum();
        c !== "" && (r += "%s", t = t.concat([c]));
        var l = t.map(function(u) {
          return String(u);
        });
        l.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, l);
      }
    }
    var ze = !1, qe = !1, Je = !1, Ve = !1, Be = !1, ie;
    ie = Symbol.for("react.module.reference");
    function Ke(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === v || e === R || Be || e === f || e === E || e === g || Ve || e === k || ze || qe || Je || typeof e == "object" && e !== null && (e.$$typeof === P || e.$$typeof === T || e.$$typeof === j || e.$$typeof === y || e.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ie || e.getModuleId !== void 0));
    }
    function Ge(e, r, t) {
      var o = e.displayName;
      if (o)
        return o;
      var c = r.displayName || r.name || "";
      return c !== "" ? t + "(" + c + ")" : t;
    }
    function se(e) {
      return e.displayName || "Context";
    }
    function C(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && m("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case v:
          return "Fragment";
        case i:
          return "Portal";
        case R:
          return "Profiler";
        case f:
          return "StrictMode";
        case E:
          return "Suspense";
        case g:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case y:
            var r = e;
            return se(r) + ".Consumer";
          case j:
            var t = e;
            return se(t._context) + ".Provider";
          case d:
            return Ge(e, e.render, "ForwardRef");
          case T:
            var o = e.displayName || null;
            return o !== null ? o : C(e.type) || "Memo";
          case P: {
            var c = e, l = c._payload, u = c._init;
            try {
              return C(u(l));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var x = Object.assign, I = 0, ue, ce, le, fe, de, ve, pe;
    function he() {
    }
    he.__reactDisabledLog = !0;
    function Xe() {
      {
        if (I === 0) {
          ue = console.log, ce = console.info, le = console.warn, fe = console.error, de = console.group, ve = console.groupCollapsed, pe = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: he,
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
    function Ze() {
      {
        if (I--, I === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: x({}, e, {
              value: ue
            }),
            info: x({}, e, {
              value: ce
            }),
            warn: x({}, e, {
              value: le
            }),
            error: x({}, e, {
              value: fe
            }),
            group: x({}, e, {
              value: de
            }),
            groupCollapsed: x({}, e, {
              value: ve
            }),
            groupEnd: x({}, e, {
              value: pe
            })
          });
        }
        I < 0 && m("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var G = S.ReactCurrentDispatcher, X;
    function Y(e, r, t) {
      {
        if (X === void 0)
          try {
            throw Error();
          } catch (c) {
            var o = c.stack.trim().match(/\n( *(at )?)/);
            X = o && o[1] || "";
          }
        return `
` + X + e;
      }
    }
    var Z = !1, z;
    {
      var He = typeof WeakMap == "function" ? WeakMap : Map;
      z = new He();
    }
    function ge(e, r) {
      if (!e || Z)
        return "";
      {
        var t = z.get(e);
        if (t !== void 0)
          return t;
      }
      var o;
      Z = !0;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var l;
      l = G.current, G.current = null, Xe();
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
            } catch (b) {
              o = b;
            }
            Reflect.construct(e, [], u);
          } else {
            try {
              u.call();
            } catch (b) {
              o = b;
            }
            e.call(u.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (b) {
            o = b;
          }
          e();
        }
      } catch (b) {
        if (b && o && typeof b.stack == "string") {
          for (var s = b.stack.split(`
`), _ = o.stack.split(`
`), p = s.length - 1, h = _.length - 1; p >= 1 && h >= 0 && s[p] !== _[h]; )
            h--;
          for (; p >= 1 && h >= 0; p--, h--)
            if (s[p] !== _[h]) {
              if (p !== 1 || h !== 1)
                do
                  if (p--, h--, h < 0 || s[p] !== _[h]) {
                    var w = `
` + s[p].replace(" at new ", " at ");
                    return e.displayName && w.includes("<anonymous>") && (w = w.replace("<anonymous>", e.displayName)), typeof e == "function" && z.set(e, w), w;
                  }
                while (p >= 1 && h >= 0);
              break;
            }
        }
      } finally {
        Z = !1, G.current = l, Ze(), Error.prepareStackTrace = c;
      }
      var F = e ? e.displayName || e.name : "", A = F ? Y(F) : "";
      return typeof e == "function" && z.set(e, A), A;
    }
    function Qe(e, r, t) {
      return ge(e, !1);
    }
    function er(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function q(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ge(e, er(e));
      if (typeof e == "string")
        return Y(e);
      switch (e) {
        case E:
          return Y("Suspense");
        case g:
          return Y("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case d:
            return Qe(e.render);
          case T:
            return q(e.type, r, t);
          case P: {
            var o = e, c = o._payload, l = o._init;
            try {
              return q(l(c), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var M = Object.prototype.hasOwnProperty, me = {}, ye = S.ReactDebugCurrentFrame;
    function J(e) {
      if (e) {
        var r = e._owner, t = q(e.type, e._source, r ? r.type : null);
        ye.setExtraStackFrame(t);
      } else
        ye.setExtraStackFrame(null);
    }
    function rr(e, r, t, o, c) {
      {
        var l = Function.call.bind(M);
        for (var u in e)
          if (l(e, u)) {
            var s = void 0;
            try {
              if (typeof e[u] != "function") {
                var _ = Error((o || "React class") + ": " + t + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw _.name = "Invariant Violation", _;
              }
              s = e[u](r, u, o, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (p) {
              s = p;
            }
            s && !(s instanceof Error) && (J(c), m("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", t, u, typeof s), J(null)), s instanceof Error && !(s.message in me) && (me[s.message] = !0, J(c), m("Failed %s type: %s", t, s.message), J(null));
          }
      }
    }
    var tr = Array.isArray;
    function H(e) {
      return tr(e);
    }
    function nr(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function ar(e) {
      try {
        return _e(e), !1;
      } catch {
        return !0;
      }
    }
    function _e(e) {
      return "" + e;
    }
    function be(e) {
      if (ar(e))
        return m("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", nr(e)), _e(e);
    }
    var L = S.ReactCurrentOwner, or = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ee, Re, Q;
    Q = {};
    function ir(e) {
      if (M.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function sr(e) {
      if (M.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function ur(e, r) {
      if (typeof e.ref == "string" && L.current && r && L.current.stateNode !== r) {
        var t = C(L.current.type);
        Q[t] || (m('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', C(L.current.type), e.ref), Q[t] = !0);
      }
    }
    function cr(e, r) {
      {
        var t = function() {
          Ee || (Ee = !0, m("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function lr(e, r) {
      {
        var t = function() {
          Re || (Re = !0, m("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var fr = function(e, r, t, o, c, l, u) {
      var s = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: a,
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
        value: o
      }), Object.defineProperty(s, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: c
      }), Object.freeze && (Object.freeze(s.props), Object.freeze(s)), s;
    };
    function dr(e, r, t, o, c) {
      {
        var l, u = {}, s = null, _ = null;
        t !== void 0 && (be(t), s = "" + t), sr(r) && (be(r.key), s = "" + r.key), ir(r) && (_ = r.ref, ur(r, c));
        for (l in r)
          M.call(r, l) && !or.hasOwnProperty(l) && (u[l] = r[l]);
        if (e && e.defaultProps) {
          var p = e.defaultProps;
          for (l in p)
            u[l] === void 0 && (u[l] = p[l]);
        }
        if (s || _) {
          var h = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          s && cr(u, h), _ && lr(u, h);
        }
        return fr(e, s, _, c, o, L.current, u);
      }
    }
    var ee = S.ReactCurrentOwner, we = S.ReactDebugCurrentFrame;
    function D(e) {
      if (e) {
        var r = e._owner, t = q(e.type, e._source, r ? r.type : null);
        we.setExtraStackFrame(t);
      } else
        we.setExtraStackFrame(null);
    }
    var re;
    re = !1;
    function te(e) {
      return typeof e == "object" && e !== null && e.$$typeof === a;
    }
    function je() {
      {
        if (ee.current) {
          var e = C(ee.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function vr(e) {
      return "";
    }
    var Te = {};
    function pr(e) {
      {
        var r = je();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function Se(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = pr(r);
        if (Te[t])
          return;
        Te[t] = !0;
        var o = "";
        e && e._owner && e._owner !== ee.current && (o = " It was passed a child from " + C(e._owner.type) + "."), D(e), m('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, o), D(null);
      }
    }
    function Oe(e, r) {
      {
        if (typeof e != "object")
          return;
        if (H(e))
          for (var t = 0; t < e.length; t++) {
            var o = e[t];
            te(o) && Se(o, r);
          }
        else if (te(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var c = K(e);
          if (typeof c == "function" && c !== e.entries)
            for (var l = c.call(e), u; !(u = l.next()).done; )
              te(u.value) && Se(u.value, r);
        }
      }
    }
    function hr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === T))
          t = r.propTypes;
        else
          return;
        if (t) {
          var o = C(r);
          rr(t, e.props, "prop", o, e);
        } else if (r.PropTypes !== void 0 && !re) {
          re = !0;
          var c = C(r);
          m("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", c || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && m("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function gr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var o = r[t];
          if (o !== "children" && o !== "key") {
            D(e), m("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", o), D(null);
            break;
          }
        }
        e.ref !== null && (D(e), m("Invalid attribute `ref` supplied to `React.Fragment`."), D(null));
      }
    }
    var Ce = {};
    function Pe(e, r, t, o, c, l) {
      {
        var u = Ke(e);
        if (!u) {
          var s = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var _ = vr();
          _ ? s += _ : s += je();
          var p;
          e === null ? p = "null" : H(e) ? p = "array" : e !== void 0 && e.$$typeof === a ? (p = "<" + (C(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : p = typeof e, m("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", p, s);
        }
        var h = dr(e, r, t, c, l);
        if (h == null)
          return h;
        if (u) {
          var w = r.children;
          if (w !== void 0)
            if (o)
              if (H(w)) {
                for (var F = 0; F < w.length; F++)
                  Oe(w[F], e);
                Object.freeze && Object.freeze(w);
              } else
                m("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Oe(w, e);
        }
        if (M.call(r, "key")) {
          var A = C(e), b = Object.keys(r).filter(function(Rr) {
            return Rr !== "key";
          }), ne = b.length > 0 ? "{key: someKey, " + b.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ce[A + ne]) {
            var Er = b.length > 0 ? "{" + b.join(": ..., ") + ": ...}" : "{}";
            m(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ne, A, Er, A), Ce[A + ne] = !0;
          }
        }
        return e === v ? gr(h) : hr(h), h;
      }
    }
    function mr(e, r, t) {
      return Pe(e, r, t, !0);
    }
    function yr(e, r, t) {
      return Pe(e, r, t, !1);
    }
    var _r = yr, br = mr;
    W.Fragment = v, W.jsx = _r, W.jsxs = br;
  }()), W;
}
var Ae;
function Cr() {
  return Ae || (Ae = 1, process.env.NODE_ENV === "production" ? V.exports = Sr() : V.exports = Or()), V.exports;
}
var O = Cr();
let ae, oe = "", Me = "";
function Pr() {
  return ae && ae.access_token;
}
function De(n) {
  ae = n, oe && (console.log(333, n), localStorage.setItem("refresh-token", n.refresh_token));
}
function Jr(n) {
  oe = n;
}
function Vr(n) {
  Me = n;
}
function N() {
  return oe;
}
function Br() {
  return Me;
}
async function kr(n) {
  const a = await fetch(`${N()}/api/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(n)
  }), i = await a.json();
  if (!a.ok)
    throw new Error(i.message);
  return i;
}
async function Fe() {
  try {
    const n = await fetch(`${N()}/api/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Pr()}`
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
async function xr(n) {
  try {
    const a = await fetch(`${N()}/api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ refresh_token: n })
    });
    if (!a.ok) {
      const v = await a.json();
      throw new Error(v.message);
    }
    return await a.json();
  } catch (a) {
    throw console.error(a.message), a;
  }
}
async function Ar() {
  try {
    const n = await fetch(`${N()}/api/auth/release`, {
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
let Le = wr();
function Kr({ children: n }) {
  let [a, i] = Ie();
  jr(() => {
    f();
  }, [a]);
  const v = async ({ username: y, password: d }) => {
    try {
      const E = await kr({ username: y, password: d });
      De(E);
      const g = await Fe();
      return i(g), g;
    } catch (E) {
      throw i(!1), E;
    }
  }, f = async () => {
    if (a)
      return a;
    try {
      const y = await xr(N() ? localStorage.getItem("refresh-token") : "");
      if (!y)
        throw "no valid refresh token";
      De(y);
      const d = await Fe();
      if (!d)
        throw "no valid user";
      return i(d), d;
    } catch {
      return i(!1), !1;
    }
  };
  let j = { user: a, signin: v, signout: async () => {
    try {
      await Ar(), i(!1);
      return;
    } catch {
      i(!1);
      return;
    }
  }, checkUser: f };
  return /* @__PURE__ */ O.jsx(Le.Provider, { value: j, children: n });
}
function Ue() {
  return Tr(Le);
}
function Gr({
  onSuccess: n,
  onFailure: a,
  formClass: i,
  errorClass: v,
  labelClass: f,
  inputClass: R,
  headerClass: j,
  footerClass: y,
  submitClass: d
}) {
  let [E, g] = Ie(), T = Ue();
  async function P(k) {
    k.preventDefault();
    let $ = new FormData(k.currentTarget), B = $.get("username"), K = $.get("password");
    try {
      const S = await T.signin({ username: B, password: K });
      n && n(S);
    } catch (S) {
      a && a(S), g(S.message);
    }
  }
  return /* @__PURE__ */ O.jsxs("form", { className: i, onSubmit: P, children: [
    /* @__PURE__ */ O.jsx("div", { className: j, children: E && /* @__PURE__ */ O.jsx("div", { className: v, children: E }) }),
    /* @__PURE__ */ O.jsx("label", { className: f, htmlFor: "username", children: "Username" }),
    /* @__PURE__ */ O.jsx(
      "input",
      {
        required: !0,
        className: R,
        minLength: 4,
        name: "username"
      }
    ),
    /* @__PURE__ */ O.jsx("label", { className: f, htmlFor: "password", children: "Password" }),
    /* @__PURE__ */ O.jsx(
      "input",
      {
        required: !0,
        className: R,
        minLength: 4,
        type: "password",
        name: "password"
      }
    ),
    /* @__PURE__ */ O.jsx("div", { className: y, children: /* @__PURE__ */ O.jsx("button", { className: d, type: "submit", children: "Login" }) })
  ] });
}
function Xr({ children: n, onFailure: a = () => {
}, loader: i, loaderClass: v }) {
  let { user: f } = Ue();
  return console.log(11111, f), f === !1 ? a() : f != null && f.username ? (console.log(2222, f.username, n), n) : i || /* @__PURE__ */ O.jsx("div", { className: v });
}
const We = (n) => n.replace(/([A-Z])/g, (a) => ` ${a}`).trim().replace(/\s+/g, "-").toLowerCase(), Dr = (n) => n.replace(/([A-Z])/g, (a) => ` ${a}`).trim().replace(/\s+/g, "_").toLowerCase(), Fr = (n) => n.replace(/-/g, " ").split(" ").map((a, i) => a.charAt(0)[i === 0 ? "toLowerCase" : "toUpperCase"]() + a.slice(1)).join(""), $r = (n) => We(n).split(/\-|\_/g).map((a, i) => a.charAt(0).toUpperCase() + a.slice(1)).join(" ");
function Ir(n) {
  return n.charAt(0).toUpperCase() + n.slice(1).toLowerCase();
}
const Mr = function(n) {
  return n.split(" ").map((a) => a.charAt(0)).join("").replace(/[1-9]/ig, "").toUpperCase();
}, Lr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Ir,
  initialize: Mr,
  toCamelCase: Fr,
  toSlugCase: We,
  toSpaceCase: $r,
  toUnderscoreCase: Dr
}, Symbol.toStringTag, { value: "Module" })), Ur = (n) => {
  var a = n;
  if (n >= 1e3) {
    for (var i = ["", "k", "m", "b", "t"], v = Math.floor(("" + n).length / 3), f = "", R = 2; R >= 1; R--) {
      f = parseFloat((v !== 0 ? n / Math.pow(1e3, v) : n).toPrecision(R));
      var j = (f + "").replace(/[^a-zA-Z 0-9]+/g, "");
      if (j.length <= 2)
        break;
    }
    f % 1 !== 0 && (f = f.toFixed(1)), a = f + i[v];
  }
  return a;
}, Wr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abbreviate: Ur
}, Symbol.toStringTag, { value: "Module" }));
function Ne(n, a) {
  for (let i in a)
    a.hasOwnProperty(i) && (a[i] instanceof Object && n[i] instanceof Object ? n[i] = Ne(n[i], a[i]) : n[i] = a[i]);
  return n;
}
const Nr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  deepMerge: Ne
}, Symbol.toStringTag, { value: "Module" })), Yr = (n) => {
  const a = Math.floor(n / 36e5), i = Math.floor((n - a * 1e3 * 60 * 60) / (1e3 * 60)), v = Math.floor((n - a * 1e3 * 60 * 60 - i * 1e3 * 60) / 1e3);
  return (a < 10 ? "0" : "") + a + ":" + (i < 10 ? "0" : "") + i + ":" + (v < 10 ? "0" : "") + v;
}, zr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  msToTimeString: Yr
}, Symbol.toStringTag, { value: "Module" })), Zr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  number: Wr,
  object: Nr,
  string: Lr,
  time: zr
}, Symbol.toStringTag, { value: "Module" }));
export {
  Kr as AuthProvider,
  Gr as LoginForm,
  Xr as RequireAuth,
  Pr as getAccessToken,
  N as getRestDomain,
  Br as getSocketDomain,
  Fe as getUser,
  kr as login,
  xr as refresh,
  Ar as release,
  Jr as setRestDomain,
  Vr as setSocketDomain,
  De as setToken,
  Ue as useAuth,
  Zr as utils
};
