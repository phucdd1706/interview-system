(this['webpackJsonpinterview-manager-system'] = this['webpackJsonpinterview-manager-system'] || []).push([
  [13],
  {
    511: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(6),
        c = n(48),
        r = n(12),
        i = n(33),
        s = n.n(i),
        o = n(323),
        l = n.n(o),
        j = n(322),
        u = n.n(j),
        b = n(126),
        d = n(0),
        x = n.n(d),
        h = n(321),
        O = n.n(h),
        f = [
          { value: '', label: 'All' },
          { value: 0, label: 'Inactive' },
          { value: 1, label: 'Active' }
        ],
        p = n(261),
        m = n(279),
        g = n(266),
        v = n(505),
        w = n(484),
        y = n(82),
        z = n(283),
        S = n(483),
        k = n(527),
        C = n(513),
        A = n(528),
        I = n(30),
        E = n(319),
        J = n.n(E),
        T = n(318),
        W = n.n(T),
        B = n(317),
        H = n.n(B),
        N = n(521),
        P = n(522),
        q = n(523),
        D = n(524),
        F = n(525),
        G = n(526),
        K = n(295),
        L = n(135),
        M = n(20),
        Q = n(1),
        R = function () {
          var e = Object(M.d)(),
            t = x.a.useState([]),
            n = Object(r.a)(t, 2),
            a = n[0],
            c = n[1],
            i = Object(M.e)(function (e) {
              return e.rank;
            }).ranks;
          return (
            x.a.useEffect(
              function () {
                c(i);
              },
              [i]
            ),
            x.a.useEffect(function () {
              e(Object(L.b)());
            }, []),
            Object(Q.jsx)(N.a, {
              children: Object(Q.jsxs)(P.a, {
                children: [
                  Object(Q.jsx)(q.a, {
                    children: Object(Q.jsxs)(D.a, {
                      children: [
                        Object(Q.jsx)(F.a, { sx: { pl: 3 }, children: '#' }),
                        Object(Q.jsx)(F.a, { children: 'Name' }),
                        Object(Q.jsx)(F.a, { align: 'center', sx: { pr: 3 }, children: 'Actions' })
                      ]
                    })
                  }),
                  Object(Q.jsx)(G.a, {
                    children:
                      a &&
                      a.map(function (e, t) {
                        return Object(Q.jsxs)(
                          D.a,
                          {
                            hover: !0,
                            children: [
                              Object(Q.jsx)(F.a, { sx: { pl: 3 }, children: e.id }),
                              Object(Q.jsx)(F.a, { children: e.name }),
                              Object(Q.jsxs)(F.a, {
                                align: 'center',
                                sx: { pr: 3 },
                                children: [
                                  Object(Q.jsx)(K.a, {
                                    color: 'primary',
                                    size: 'large',
                                    children: Object(Q.jsx)(H.a, { sx: { fontSize: '1.3rem' } })
                                  }),
                                  Object(Q.jsx)(K.a, {
                                    color: 'secondary',
                                    size: 'large',
                                    children: Object(Q.jsx)(W.a, { sx: { fontSize: '1.3rem' } })
                                  }),
                                  Object(Q.jsx)(K.a, {
                                    color: 'error',
                                    size: 'large',
                                    children: Object(Q.jsx)(J.a, { sx: { fontSize: '1.3rem' } })
                                  })
                                ]
                              })
                            ]
                          },
                          t
                        );
                      })
                  })
                ]
              })
            })
          );
        };
      t.default = function () {
        var e = Object(I.a)(),
          t = Object(p.a)(e.breakpoints.down('md')),
          n = Object(p.a)(e.breakpoints.down('lg')),
          i = n ? 1 : 1.5,
          o = x.a.useState(!1),
          j = Object(r.a)(o, 2),
          h = (j[0], j[1]),
          E = Object(d.useState)({ search: '', status: '' }),
          J = Object(r.a)(E, 2),
          T = J[0],
          W = J[1],
          B = (function () {
            var e = Object(c.a)(
              s.a.mark(function e(t) {
                var n;
                return s.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        (n = null === t || void 0 === t ? void 0 : t.target.value), W(Object(a.a)(Object(a.a)({}, T), {}, { search: n }));
                      case 2:
                      case 'end':
                        return e.stop();
                    }
                }, e);
              })
            );
            return function (t) {
              return e.apply(this, arguments);
            };
          })(),
          H = Object(d.useState)(null),
          N = Object(r.a)(H, 2),
          P = N[0],
          q = N[1],
          D = Boolean(P),
          F = (function () {
            var e = Object(c.a)(
              s.a.mark(function e() {
                return s.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        setTimeout(
                          Object(c.a)(
                            s.a.mark(function e() {
                              return s.a.wrap(function (e) {
                                for (;;)
                                  switch ((e.prev = e.next)) {
                                    case 0:
                                      return (e.next = 2), Object(M.a)(Object(L.b)(T));
                                    case 2:
                                    case 'end':
                                      return e.stop();
                                  }
                              }, e);
                            })
                          ),
                          400
                        );
                      case 1:
                      case 'end':
                        return e.stop();
                    }
                }, e);
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })();
        Object(d.useEffect)(
          function () {
            F();
          },
          [T]
        );
        var G = f.filter(function (e) {
          return e.value === T.status;
        });
        return Object(Q.jsx)(b.a, {
          title: Object(Q.jsxs)(m.a, {
            container: !0,
            spacing: 2,
            children: [
              Object(Q.jsx)(m.a, {
                item: !0,
                xs: 12,
                sm: 6,
                children: Object(Q.jsx)(m.a, {
                  container: !0,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  spacing: n ? 0.5 : 2,
                  children: Object(Q.jsx)(m.a, {
                    item: !0,
                    children: Object(Q.jsxs)(g.a, {
                      direction: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      spacing: t ? 0.5 : i,
                      children: [
                        Object(Q.jsx)(v.a, {
                          sx: { width: { xs: 140, md: 'auto' } },
                          InputProps: {
                            startAdornment: Object(Q.jsx)(w.a, { position: 'start', children: Object(Q.jsx)(O.a, { fontSize: 'small' }) })
                          },
                          value: T.search,
                          placeholder: 'Search....',
                          size: 'small',
                          onChange: B
                        }),
                        Object(Q.jsx)(y.a, {
                          sx: { display: { xs: 'none', sm: 'flex' }, fontSize: '1rem', color: 'grey.500', fontWeight: 400 },
                          children: '|'
                        }),
                        Object(Q.jsxs)(g.a, {
                          direction: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          sx: { display: { xs: 'none', sm: 'flex' } },
                          children: [
                            Object(Q.jsx)(y.a, { variant: 'h5', children: 'Sort by: ' }),
                            Object(Q.jsx)(z.a, {
                              id: 'demo-positioned-button',
                              'aria-controls': 'demo-positioned-menu',
                              'aria-haspopup': 'true',
                              'aria-expanded': D ? 'true' : void 0,
                              onClick: function (e) {
                                q(e.currentTarget);
                              },
                              sx: { color: 'grey.500', fontWeight: 400 },
                              endIcon: Object(Q.jsx)(u.a, {}),
                              children: G.length > 0 && G[0].label
                            }),
                            Object(Q.jsx)(S.a, {
                              id: 'demo-positioned-menu',
                              'aria-labelledby': 'demo-positioned-button',
                              anchorEl: P,
                              open: D,
                              onClose: function () {
                                q(null);
                              },
                              anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
                              transformOrigin: { vertical: 'top', horizontal: 'right' },
                              children: f.map(function (e, t) {
                                return Object(Q.jsx)(
                                  k.a,
                                  {
                                    sx: { p: 1.5 },
                                    selected: e.value === T.status,
                                    onClick: function (t) {
                                      return (function (e, t) {
                                        W(Object(a.a)(Object(a.a)({}, T), {}, { status: t })), q(null);
                                      })(0, e.value);
                                    },
                                    children: e.label
                                  },
                                  t
                                );
                              })
                            })
                          ]
                        })
                      ]
                    })
                  })
                })
              }),
              Object(Q.jsx)(m.a, {
                item: !0,
                xs: 12,
                sm: 6,
                sx: { textAlign: 'right' },
                children: Object(Q.jsx)(C.a, {
                  title: 'Add',
                  children: Object(Q.jsx)(A.a, {
                    color: 'primary',
                    size: 'small',
                    onClick: function () {
                      h(!0);
                    },
                    sx: { boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 },
                    children: Object(Q.jsx)(l.a, { fontSize: 'small' })
                  })
                })
              })
            ]
          }),
          content: !1,
          children: Object(Q.jsx)(R, {})
        });
      };
    }
  }
]);
//# sourceMappingURL=13.57763be8.chunk.js.map
