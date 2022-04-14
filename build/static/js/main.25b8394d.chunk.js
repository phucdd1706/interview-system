(this['webpackJsonpinterview-manager-system'] = this['webpackJsonpinterview-manager-system'] || []).push([
  [4],
  {
    126: function (e, t, r) {
      'use strict';
      var a = r(6),
        n = r(58),
        o = r(0),
        i = r.n(o),
        c = r(30),
        l = r(226),
        s = r(167),
        d = r(82),
        p = r(222),
        u = r(227),
        b = r(1),
        j = ['border', 'boxShadow', 'children', 'content', 'contentClass', 'contentSX', 'darkTitle', 'secondary', 'shadow', 'sx', 'title'],
        m = { '& .MuiCardHeader-action': { mr: 0 } },
        h = i.a.forwardRef(function (e, t) {
          var r = e.border,
            o = void 0 === r || r,
            i = e.boxShadow,
            h = e.children,
            x = e.content,
            g = void 0 === x || x,
            O = e.contentClass,
            f = void 0 === O ? '' : O,
            v = e.contentSX,
            y = void 0 === v ? {} : v,
            k = e.darkTitle,
            w = e.secondary,
            C = e.shadow,
            S = e.sx,
            A = void 0 === S ? {} : S,
            I = e.title,
            M = Object(n.a)(e, j),
            z = Object(c.a)();
          return Object(b.jsxs)(
            l.a,
            Object(a.a)(
              Object(a.a)({ ref: t }, M),
              {},
              {
                sx: Object(a.a)(
                  {
                    border: o ? '1px solid' : 'none',
                    borderColor: 'dark' === z.palette.mode ? z.palette.background.default : z.palette.primary[200] + 75,
                    ':hover': {
                      boxShadow: i
                        ? C || ('dark' === z.palette.mode ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)')
                        : 'inherit'
                    }
                  },
                  A
                ),
                children: [
                  !k && I && Object(b.jsx)(s.a, { sx: m, title: I, action: w }),
                  k && I && Object(b.jsx)(s.a, { sx: m, title: Object(b.jsx)(d.a, { variant: 'h3', children: I }), action: w }),
                  I && Object(b.jsx)(p.a, {}),
                  g && Object(b.jsx)(u.a, { sx: y, className: f, children: h }),
                  !g && h
                ]
              }
            )
          );
        });
      t.a = h;
    },
    133: function (e, t, r) {
      'use strict';
      r.d(t, 'b', function () {
        return p;
      });
      var a = r(48),
        n = r(33),
        o = r.n(n),
        i = r(44),
        c = r(50),
        l = r(20),
        s = ''.concat('http://13.251.110.92/api', '/v1/operator/users'),
        d = Object(i.b)({
          name: 'user',
          initialState: { error: null, users: [] },
          reducers: {
            hasError: function (e, t) {
              e.error = t.payload;
            },
            getAdministratorListSuccess: function (e, t) {
              e.users = t.payload;
            }
          }
        });
      function p(e) {
        return Object(a.a)(
          o.a.mark(function t() {
            var r;
            return o.a.wrap(
              function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        (t.prev = 0),
                        (t.next = 3),
                        c.a.get(
                          ''
                            .concat(s, '?search=')
                            .concat(null === e || void 0 === e ? void 0 : e.search, '&status=')
                            .concat(null === e || void 0 === e ? void 0 : e.status)
                        )
                      );
                    case 3:
                      (r = t.sent), Object(l.a)(d.actions.getAdministratorListSuccess(r.data.success.data)), (t.next = 10);
                      break;
                    case 7:
                      (t.prev = 7), (t.t0 = t.catch(0)), Object(l.a)(d.actions.hasError(t.t0));
                    case 10:
                    case 'end':
                      return t.stop();
                  }
              },
              t,
              null,
              [[0, 7]]
            );
          })
        );
      }
      t.a = d.reducer;
    },
    134: function (e, t, r) {
      'use strict';
      r.d(t, 'b', function () {
        return p;
      });
      var a = r(48),
        n = r(33),
        o = r.n(n),
        i = r(44),
        c = r(50),
        l = r(20),
        s = ''.concat('http://13.251.110.92/api', '/v1/client/users'),
        d = Object(i.b)({
          name: 'customer',
          initialState: { error: null, users: [] },
          reducers: {
            hasError: function (e, t) {
              e.error = t.payload;
            },
            getCusomterListSuccess: function (e, t) {
              e.users = t.payload;
            }
          }
        });
      function p(e) {
        return Object(a.a)(
          o.a.mark(function t() {
            var r;
            return o.a.wrap(
              function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        (t.prev = 0),
                        (t.next = 3),
                        c.a.get(
                          ''
                            .concat(s, '?search=')
                            .concat(null === e || void 0 === e ? void 0 : e.search, '&status=')
                            .concat(null === e || void 0 === e ? void 0 : e.status)
                        )
                      );
                    case 3:
                      (r = t.sent), Object(l.a)(d.actions.getCusomterListSuccess(r.data.success.data)), (t.next = 10);
                      break;
                    case 7:
                      (t.prev = 7), (t.t0 = t.catch(0)), Object(l.a)(d.actions.hasError(t.t0));
                    case 10:
                    case 'end':
                      return t.stop();
                  }
              },
              t,
              null,
              [[0, 7]]
            );
          })
        );
      }
      t.a = d.reducer;
    },
    135: function (e, t, r) {
      'use strict';
      r.d(t, 'b', function () {
        return p;
      });
      var a = r(48),
        n = r(33),
        o = r.n(n),
        i = r(44),
        c = r(50),
        l = r(20),
        s = ''.concat('http://13.251.110.92/api', '/v1/operator/ranks'),
        d = Object(i.b)({
          name: 'rank',
          initialState: { error: null, ranks: [] },
          reducers: {
            hasError: function (e, t) {
              e.error = t.payload;
            },
            getRanksListSuccess: function (e, t) {
              e.ranks = t.payload;
            }
          }
        });
      function p(e) {
        var t;
        return (
          (t =
            void 0 !== e
              ? '?search='
                  .concat(null === e || void 0 === e ? void 0 : e.search, '&status=')
                  .concat(null === e || void 0 === e ? void 0 : e.status)
              : ''),
          Object(a.a)(
            o.a.mark(function e() {
              var r;
              return o.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.prev = 0), (e.next = 3), c.a.get(''.concat(s).concat(t));
                      case 3:
                        (r = e.sent), Object(l.a)(d.actions.getRanksListSuccess(r.data.success.data)), (e.next = 10);
                        break;
                      case 7:
                        (e.prev = 7), (e.t0 = e.catch(0)), Object(l.a)(d.actions.hasError(e.t0));
                      case 10:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [[0, 7]]
              );
            })
          )
        );
      }
      t.a = d.reducer;
    },
    137: function (e, t, r) {
      'use strict';
      var a = r(261),
        n = r(256),
        o = r(30),
        i = r(1);
      t.a = function () {
        var e = Object(o.a)(),
          t = Object(a.a)(e.breakpoints.down('md'));
        return Object(i.jsx)(n.a, {
          sx: { marginLeft: 5 },
          children: Object(i.jsx)('img', {
            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAABKCAMAAACRrbojAAAC+lBMVEUAAAD///+urq7///////////////////////////////+9vLz///////9pZ2eSkZH////////////////////////8+/z///+D0/3///////9GRERyy/7h4eH///8vLC3C5/7k4+T+/v7///////9YVldsamp2dXW1tbX///////8oJiZoZmajoqP//v/+/v7////////////////X19jV1NRDQUFsamqxsbHIx8f///////9kYmPR0dHb2tv+/v7////+/v7///9eXF1ZV1fb29v///8yMDBgXl6cm5vd3Nz6+vr///////////////8vLS1bWVlvbm54dneD0/2gn5/e3N3t7e3i4eLw+f7+/v7///8jISE0s/5EQUI1MjM/PT1aWFhjxP5vbm54zf7BwMHZ8P7Y7/3b2tve8v7h4eH5+fnx8PDu7u77/f4krv0qKChEQkI4NjZVU1NQvf1ycXF8e3uAf3+FhISJ0v6S1v6RkJGW1v6pqKm2tbW55P7JyMnN7P7k4+Td3d3u7u7+/v46ODhAPj5LSUlPTk5GQ0RDQUFBuf9PTU1bwv9nyP5/fX2NjIyYlpetrK2o3f29vLzB5/68u7vNzc3R7f7L6v3T0tPu7e7c29zk4+P19fVAuf9RT1BLSUlJvf5tyf5lY2SWlZaNjIyHhod/zv6Af3+pp6ie2v3DwsOtra3W1dXKysrl9f7k9P/o6Ojk9P7w7/BVU1Qts/1bWlpqaWlaxP5fXV6A0f2pqKmcm5up3v245P37+/vn5+cusv5NS0tlZGSMi4tuyf2G0P2z4/64uLjF6P7p6erg4ODl5eXe8v4nJSUAq/8IBgYAAAAkIiIDAQEoJiYZFhYAnP8ODAwpJycSEBAaGBgAqP8FAwMjICEhHx8eHBwMCgoWFBQcGhoAm/8UEhIAmf8qKCgAof4Apf8gHh4An/8Ao/8LCAkAnv8Aof8Ap/8Eqf4Qp/8Akv8yMDAAlv8Jpf4sKiobqf4Amf4AmP4grf4Ajv4IkWckAAAA0HRSTlMAFq8SKwYLAhQJPqhDBOHNVSMPLSEfaBzGDTrz2IJY/peJWkk16N7PpkAx+961Y19SKCUajo3327WjRy/jlYZqZUYe6eCKTPzkwY9mUDw4M/bj29jIvJCAfnlsXP319fXs5tnTz6Cem5WKh351cnD6+fLu7ebh2tXUx8TEvbGvp5mUkId8c/759/bv6Obi4d/Pw8CxsKqhnp2bmJaEgHtS7uvr6tnTycnJyMi+tampnIyEgH93Zfb07t3b29O2s6ifd3Hp493Vzsutq5yWdHFtxe1A5QAACsdJREFUWMPNlwdUU1cYgG/MjsQSEkhDK1ZJqwklYSiyWkDKqiB2WItbq62rat1776rV1mpbq3bvvffe85GbvCQvISGDJJAAWqnadU7vfS+zlTblhHP6QSD3J+E7975/vID+gsfjg/5HkHNkk1YO+hmu6P7lJu9DR5KEoD/Ja5rd7j3d0haY9YpUDPqLlIz1v3s7mhEd3jNryligX+CmP/DorwEkaWlBP06dnbqpoj8Ob0zTY+1e2mDqxrZmk+nAy7KEa9jzfj+Lj6zzt8XPHX7zt1Po6emzZ7YIEu3Jfa8HH5n33JqyPJlm/RnvabTsuUuZQAVfWTYO5M5uQ5rAgXmNYhThvDyrHYlMj6kSp2Fp1vxyGZBdbGpu6Z6dkxLsCZlruluaTZeKEmURqzZNPXv2I5CKPe33p4TT4tbTHYnz8HObHmsztXRexk+9uA15LuOCILLbfkqk5wFTTwv6/9hjwr/DFSO5NaGe15YHTBf2JHQ/gJd0ZKo3EDq3zi388PVJpAeTr1l/7o+PAO0J3J8fObf2ROYbJnfe0z8CyY0m1HL2bUkX0lmonLcv0Iw8KpBAFKkKwMGeZlP77KZcMT910dPn8NJ7lwgkFuRpa0Z0en9Zr804vNjbiadDz1pJwj3o+tAE2h56tLub7nXdl2rFifeYQqMnYKLHQ9vyBxqYshXzWEEEAiFTD0JWFEI+4Cqi1myhEC2jEfDE4XPDno5AZzNDx6cfZvJC03xz9gCaezbM2S7CptSXUCRE9kssIBoYCdyT/X3xUbyMihwXhDx0/Xz4HB4IGNPTyeG5nfQG1DHYzPobypF+3DIcYeiClbkg7XwkYIMTJi3Fy6jIE3nRnvZ5ytdmmfDGkHPWKxzAUFwK9UHsZrgiBwDRIKgPA68vAWnTnOG13bChfL9OH0WrbYI04mH6aMWmqb+eotPgzNpyNrOfQQaCInQGg83ho9yGohSQfoWBIAmry4iwwkFSMPYSM0HpjTQumF1+J8R/Qa+h7HSk7m8eIE9bc4a+6znlnfoKL+SxZz1+y/Xv+h0kBZ8aQ3sIIstHECRJGlZIaA9BZVEEQq97v+zhLoLwZZH4RUtIFHlWEuvh4fRSvzzLRGd5z6WckMeYtaBBWp/ttBPwYB4Yhzxu+5wTNw9GVL0uBGnIY5lx7WA6cPXJ9E+2oaebxxsJ5zXz0bOqYey/ejDCpCP7Aii5TXepQh4rMR8A3lajg4BPMR6rYyI33Pexx3lHOQgj5AL5gvEewlabwQNCcXT9MB4GgfZLE+5vohgPd67VQcKDvXo0sbNg6BAXobs8GSB68wDZrZ3MXIicm1LSMNBpp+C6fJBOn9vRwVcjRl6dDoLnNnIbWleN/EEOMGzGM+yvfSfGk3rbT53RHn/WM+suOjjdel7nOMFl8oCcom9FWPQ3Mx6CsNtxAL4lYs4kHo8sMrcjeW1wnXeN/04JQAOd124rxukYzHhIvdWKQm64rKJXD+7Xvc1t7MHpatfrCcK4NFuL98NEMB5icHg/GD2c+a+eLdzezo0inLiBOH42wpVJQIn3Q1qcXV1OJzQHPT69E9HlhLtV/+Bh5jYrcv8WmweOrA9eeOGFQ1PclMs8kqsejSJTPjg6AjFgRAXjcS0dQbPhJck/76c5sK9JFtRMeicQk9cucsEYISvzKXRehmxBCfIYHQtYQjZCyA/m9V6NgA5w+b17pLO9qAF0/7I+Q4BekXx4Me6mbdF1ug1nx72oP+qyWdhj9R8HIcTYY941NrTu3SNb24N7WsD70LfVxVuWt9ETtec9acQzlA2AutCg13dtYDyOB1ncFISCH6rTMraQCfTu4WoOeOmJ2tb+zqwOLz1Xf320iRep0weT65O370dpZWP2455ydNuokYhjnyiCdXqsig5c9bqiVw8QVn89lb77ON1t6qA/oi5+blhkLtjJd0cPKp1uoQh71xwF9hBkMJHhilzcr+nCxWu/oS6/Nw9Grll7jpmmePq0z16E0yaS1102m81CUj64Uwsao+rUHZk/VhojvFvWuwcjnXeAmabd6CZEFK6lilLYivD70cMNbUWovw1CkRDwCilIK9AFV36/A9ZJAII1lDK3GpZNBn+Hl7npTe+pU78tPpzMjkST3oKWIC7jHUVq1HcqcYTBA0s5IK0GhpYeC3xiDN1Ht7qhBe4OeWKRl609c+6rRbKYbR4rHMjwTVHVZHz2klGF9w4Mcm/hqHxQUbRxYCRwgk2n1rDnNw4svE8ELohY/VrTOG5sLrIkEtkYOYYVvKNjSySpdCBVJpGxxUDIkslSg8jkwcQW5stkMvSO/yHCvIaK4uLiClGjJDg6FBxVcWaxisNmLqxELeUwSKXSVLlErS4pkUrpZUmJukQujsfCV0+ccH1tbWVt6RWrC2+W0NV21ZOllSjw5LH6FLRWPbvqojCr5pS/v/qiaFZXseLxiJ51QwgNNoMBGuCKBpRKH9ea6QCElsqtKGm0u6AuDLxlx3S0jGCAhblxaARFUEeQqPzxD7i6EaRM3AndaIG/3dAxVwEmX27Th4HPlH3WpY/C79wojcOjXAF9pM9pwNhwEWYsgxTl86Clx4caxJ56cfJMHeoHZqcZA4ej+2uz2WlBXcTnQDEdLOTE4cmZaUMD+5FDdU+uHPSIu1DBft7mIH26mrdXvT1E5yNbdXPyc67TEfqsOy8pwExZt+PzJQUFe2eQesI+/s5pBbuGPC+Pw5O220l4xi9QchrHJU3efhJIV0KScO5/VdWoenW/k6DgM2rs8Ux/UDNZq9Vqxmam56Rph2nmZhkJ2+OLyidrxqqEcWTbpAIz0bVHE1wB3N0ov/lFnHeyF81+Ag5PSsaemkWxl3UrZSQMo5PFIE7K9zgJS80OQWidPhqSbve1OJ+5VXYrYRiemXEN8vx8e2zNXYs8titzQLzUV9oIvevxOWnFeQracz0kHcarcIUKRzncIY9l+sfFFdXV1fUipljY15LYkxy3J/0K6KMIg2dX6d1V1aywB++PF+XxLxl+8AbE6NUZffPIC6GTotAlMUDrdS9KgfLCHp/eZsBA68K+efjVTzigzainKNIIu4ry1Rf2hLDs7KMHiBsnrnvYroMWVJ1wWo7ylgt4InUK9X3zYLi5yYNHDB/v8RFG/0IR9lj/6sF1urdg2rRpNW+MZTw3RXnihycXTZxhJqz6m5MYD53Xo/whD67TsrJJkybtKOcEPVQfPBjlKki4/cexx+3eysaeoX6mfug63cEDXAQAffOkqJX5CjFOcOSxth5XjYaUXbdxnIKnkG7U2Uk4XJV8XVSd9tXTWHfD5lc1xaL6oUstyHNCeQiSpGvJgO2Ltg9Y4iIpeCg3JxGe+t3QM+Th2tJalAekZcjrgvkWi++8xVmzt8bpOU+5XNvYOTMv5PH9Jw9/4U5Lq0tnM9hcaAzBGxpA+hfQ4aPsHrPHTlF2uFIJMhLgAaMgNKKpSKCHC/onpgBx8kpocBA45jDAyjI+0C6Dji7fwljPXL/ZAUsz4vacXPcIhT80ogcxc64Mp1lO3QyPTYe+PHfUaVGCD9sDrToidj+8uW6nFVbG36/FuRnzR9wz4e4JG0bMrxYwZ8lJ2zwARQZsLufgTFRXFd1XdFV67NtO3oeCV3P+U5GyU/Ny88aweZEOkZKPIijfGS9XkZLC5YNYkRB95kLB/xd/AtQ8RVJTnK5bAAAAAElFTkSuQmCC',
            alt: 'Beetsoft',
            style: { marginRight: t ? 8 : 16 }
          })
        });
      };
    },
    163: function (e, t, r) {
      e.exports = {
        paper: '#fff',
        primaryLight: '#e3f2fd',
        primary200: '#90caf9',
        primaryMain: '#2196f3',
        primaryDark: '#1e88e5',
        primary800: '#1565c0',
        secondaryLight: '#ede7f6',
        secondary200: '#b39ddb',
        secondaryMain: '#673ab7',
        secondaryDark: '#5e35b1',
        secondary800: '#4527a0',
        successLight: '#b9f6ca',
        success200: '#69f0ae',
        successMain: '#00e676',
        successDark: '#00c853',
        errorLight: '#ef9a9a',
        errorMain: '#f44336',
        errorDark: '#c62828',
        orangeLight: '#fbe9e7',
        orangeMain: '#ffab91',
        orangeDark: '#d84315',
        warningLight: '#fff8e1',
        warningMain: '#ffe57f',
        warningDark: '#ffc107',
        grey50: '#fafafa',
        grey100: '#f5f5f5',
        grey200: '#eee',
        grey300: '#e0e0e0',
        grey500: '#9e9e9e',
        grey600: '#757575',
        grey700: '#616161',
        grey900: '#212121',
        darkPaper: '#111936',
        darkBackground: '#1a223f',
        darkLevel1: '#29314f',
        darkLevel2: '#212946',
        darkTextTitle: '#d7dcec',
        darkTextPrimary: '#bdc8f0',
        darkTextSecondary: '#8492c4',
        darkPrimaryLight: '#e3f2fd',
        darkPrimaryMain: '#2196f3',
        darkPrimaryDark: '#1e88e5',
        darkPrimary200: '#90caf9',
        darkPrimary800: '#1565c0',
        darkSecondaryLight: '#d1c4e9',
        darkSecondaryMain: '#7c4dff',
        darkSecondaryDark: '#651fff',
        darkSecondary200: '#b39ddb',
        darkSecondary800: '#6200ea'
      };
    },
    20: function (e, t, r) {
      'use strict';
      r.d(t, 'c', function () {
        return m;
      }),
        r.d(t, 'b', function () {
          return h;
        }),
        r.d(t, 'a', function () {
          return x;
        }),
        r.d(t, 'e', function () {
          return O;
        }),
        r.d(t, 'd', function () {
          return g;
        });
      var a = r(44),
        n = r(79),
        o = r(78),
        i = r(118),
        c = r.n(i),
        l = r(37),
        s = r(45),
        d = r(97),
        p = r(133),
        u = r(134),
        b = r(135),
        j = Object(l.b)({
          snackbar: d.b,
          user: Object(n.a)({ key: 'user', storage: c.a, keyPrefix: 'beetsoft-' }, p.a),
          customer: Object(n.a)({ key: 'customer', storage: c.a, keyPrefix: 'beetsoft-' }, u.a),
          rank: b.a,
          menu: s.b
        }),
        m = Object(a.a)({
          reducer: j,
          middleware: function (e) {
            return e({ serializableCheck: !1, immutableCheck: !1 });
          }
        }),
        h = Object(n.b)(m),
        x = m.dispatch,
        g = function () {
          return Object(o.b)();
        },
        O = o.c;
    },
    210: function (e, t, r) {
      'use strict';
      r.r(t);
      var a = r(51),
        n = r.n(a),
        o = r(32),
        i = r(78),
        c = r(150),
        l = r(0),
        s = r.n(l),
        d = r(12),
        p = r(273),
        u = r(6),
        b = '/dashboard/analytics',
        j = {
          fontFamily: "'Roboto', sans-serif",
          borderRadius: 8,
          outlinedFilled: !0,
          navType: 'light',
          presetColor: 'default',
          locale: 'en',
          rtlLayout: !1,
          container: !1
        };
      var m = r(1),
        h = Object(u.a)(
          Object(u.a)({}, j),
          {},
          {
            onChangeMenuType: function () {},
            onChangePresetColor: function () {},
            onChangeLocale: function () {},
            onChangeRTL: function () {},
            onChangeContainer: function () {},
            onChangeFontFamily: function () {},
            onChangeBorderRadius: function () {},
            onChangeOutlinedField: function () {}
          }
        ),
        x = Object(l.createContext)(h);
      function g(e) {
        var t = e.children,
          r = (function (e, t) {
            var r = Object(l.useState)(function () {
                var r = localStorage.getItem(e);
                return null === r ? t : JSON.parse(r);
              }),
              a = Object(d.a)(r, 2),
              n = a[0],
              o = a[1];
            return (
              Object(l.useEffect)(
                function () {
                  var t = function (t) {
                    t.storageArea === localStorage && t.key === e && o(t.newValue ? JSON.parse(t.newValue) : t.newValue);
                  };
                  return (
                    window.addEventListener('storage', t),
                    function () {
                      window.removeEventListener('storage', t);
                    }
                  );
                },
                [e, t]
              ),
              [
                n,
                function (t) {
                  o(function (r) {
                    var a = 'function' === typeof t ? t(r) : t;
                    return localStorage.setItem(e, JSON.stringify(a)), a;
                  });
                }
              ]
            );
          })('beetsoft-config', {
            fontFamily: h.fontFamily,
            borderRadius: h.borderRadius,
            outlinedFilled: h.outlinedFilled,
            navType: h.navType,
            presetColor: h.presetColor,
            locale: h.locale,
            rtlLayout: h.rtlLayout
          }),
          a = Object(d.a)(r, 2),
          n = a[0],
          o = a[1];
        return Object(m.jsx)(x.Provider, {
          value: Object(u.a)(
            Object(u.a)({}, n),
            {},
            {
              onChangeMenuType: function (e) {
                o(Object(u.a)(Object(u.a)({}, n), {}, { navType: e }));
              },
              onChangePresetColor: function (e) {
                o(Object(u.a)(Object(u.a)({}, n), {}, { presetColor: e }));
              },
              onChangeLocale: function (e) {
                o(Object(u.a)(Object(u.a)({}, n), {}, { locale: e }));
              },
              onChangeRTL: function (e) {
                o(Object(u.a)(Object(u.a)({}, n), {}, { rtlLayout: e }));
              },
              onChangeContainer: function () {
                o(Object(u.a)(Object(u.a)({}, n), {}, { container: !n.container }));
              },
              onChangeFontFamily: function (e) {
                o(Object(u.a)(Object(u.a)({}, n), {}, { fontFamily: e }));
              },
              onChangeBorderRadius: function (e, t) {
                o(Object(u.a)(Object(u.a)({}, n), {}, { borderRadius: t }));
              },
              onChangeOutlinedField: function (e) {
                o(Object(u.a)(Object(u.a)({}, n), {}, { outlinedFilled: e }));
              }
            }
          ),
          children: t
        });
      }
      var O = function () {
          return Object(l.useContext)(x);
        },
        f = function (e) {
          var t = e.children,
            a = O().locale,
            n = Object(l.useState)(),
            o = Object(d.a)(n, 2),
            i = o[0],
            c = o[1];
          return (
            Object(l.useEffect)(
              function () {
                (function (e) {
                  return 'vi' === e ? r.e(16).then(r.t.bind(null, 500, 3)) : r.e(15).then(r.t.bind(null, 501, 3));
                })(a).then(function (e) {
                  c(e.default);
                });
              },
              [a]
            ),
            Object(m.jsx)(m.Fragment, { children: i && Object(m.jsx)(p.a, { locale: a, defaultLocale: 'en', messages: i, children: t }) })
          );
        },
        v = r(16),
        y = function (e) {
          var t = e.children,
            r = Object(v.d)().pathname;
          return (
            Object(l.useEffect)(
              function () {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              },
              [r]
            ),
            t || null
          );
        },
        k = r(5),
        w = r(261),
        C = r(292),
        S = r(256),
        A = r(269),
        I = r(293),
        M = r(294),
        z = r(27),
        L = r(7),
        P = r(30),
        T = r(58),
        R = r(116),
        D = r.n(R),
        B = r(155),
        E = r.n(B),
        F = r(154),
        W = r.n(F),
        H = r(278),
        J = r(82),
        Y = r(226),
        X = r(279),
        N = r(222),
        U = r(43),
        Q = ['card', 'divider', 'icon', 'icons', 'maxItems', 'navigation', 'rightAlign', 'separator', 'title', 'titleBottom'],
        K = { display: 'flex', color: 'grey.900', textDecoration: 'none', alignContent: 'center', alignItems: 'center' },
        Z = function (e) {
          var t = e.card,
            r = e.divider,
            a = e.icon,
            n = e.icons,
            i = e.maxItems,
            c = e.navigation,
            s = e.rightAlign,
            p = e.separator,
            b = e.title,
            j = e.titleBottom,
            h = Object(T.a)(e, Q),
            x = Object(P.a)(),
            g = {
              marginRight: x.spacing(0.75),
              marginTop: '-'.concat(x.spacing(0.25)),
              width: '1rem',
              height: '1rem',
              color: x.palette.secondary.main
            },
            O = Object(l.useState)(),
            f = Object(d.a)(O, 2),
            v = f[0],
            y = f[1],
            k = Object(l.useState)(),
            w = Object(d.a)(k, 2),
            C = w[0],
            A = w[1];
          Object(l.useEffect)(function () {
            var e;
            null === c ||
              void 0 === c ||
              null === (e = c.items) ||
              void 0 === e ||
              e.map(function (e, t) {
                return e.type && 'group' === e.type && B(e), !1;
              });
          });
          var I,
            M,
            L,
            R,
            B = function e(t) {
              t.children &&
                t.children.filter(function (r) {
                  return (
                    r.type && 'collapse' === r.type
                      ? e(r)
                      : r.type && 'item' === r.type && document.location.pathname === '' + r.url && (y(t), A(r)),
                    !1
                  );
                });
            },
            F = p,
            Z = p ? Object(m.jsx)(F, { stroke: 1.5, size: '1rem' }) : Object(m.jsx)(z.j, { stroke: 1.5, size: '1rem' }),
            G = Object(m.jsx)(J.a, {}),
            V = '';
          return (
            v &&
              'collapse' === v.type &&
              ((L = v.icon ? v.icon : D.a),
              (I = Object(m.jsxs)(J.a, {
                component: o.b,
                to: '#',
                variant: 'subtitle1',
                sx: K,
                children: [n && Object(m.jsx)(L, { style: g }), v.title]
              }))),
            C &&
              'item' === C.type &&
              ((V = C.title),
              (R = C.icon ? C.icon : D.a),
              (M = Object(m.jsxs)(J.a, {
                variant: 'subtitle1',
                sx: { display: 'flex', textDecoration: 'none', alignContent: 'center', alignItems: 'center', color: 'grey.500' },
                children: [n && Object(m.jsx)(R, { style: g }), V]
              })),
              !1 !== C.breadcrumbs &&
                (G = Object(m.jsxs)(
                  Y.a,
                  Object(u.a)(
                    Object(u.a)(
                      {
                        sx: {
                          marginBottom: !1 === t ? 0 : x.spacing(U.b),
                          border: !1 === t ? 'none' : '1px solid',
                          borderColor: 'dark' === x.palette.mode ? x.palette.background.default : x.palette.primary[200] + 75,
                          background: !1 === t ? 'transparent' : x.palette.background.default
                        }
                      },
                      h
                    ),
                    {},
                    {
                      children: [
                        Object(m.jsx)(S.a, {
                          sx: { p: 2, pl: !1 === t ? 0 : 2 },
                          children: Object(m.jsxs)(X.a, {
                            container: !0,
                            direction: s ? 'row' : 'column',
                            justifyContent: s ? 'space-between' : 'flex-start',
                            alignItems: s ? 'center' : 'flex-start',
                            spacing: 1,
                            children: [
                              b &&
                                !j &&
                                Object(m.jsx)(X.a, {
                                  item: !0,
                                  children: Object(m.jsx)(J.a, { variant: 'h3', sx: { fontWeight: 500 }, children: C.title })
                                }),
                              Object(m.jsx)(X.a, {
                                item: !0,
                                children: Object(m.jsxs)(H.a, {
                                  sx: { '& .MuiBreadcrumbs-separator': { width: 16, ml: 1.25, mr: 1.25 } },
                                  'aria-label': 'breadcrumb',
                                  maxItems: i || 8,
                                  separator: Z,
                                  children: [
                                    Object(m.jsxs)(J.a, {
                                      component: o.b,
                                      to: '/',
                                      color: 'inherit',
                                      variant: 'subtitle1',
                                      sx: K,
                                      children: [
                                        n && Object(m.jsx)(W.a, { sx: g }),
                                        a && Object(m.jsx)(E.a, { sx: Object(u.a)(Object(u.a)({}, g), {}, { mr: 0 }) }),
                                        !a && 'Dashboard'
                                      ]
                                    }),
                                    I,
                                    M
                                  ]
                                })
                              }),
                              b &&
                                j &&
                                Object(m.jsx)(X.a, {
                                  item: !0,
                                  children: Object(m.jsx)(J.a, { variant: 'h3', sx: { fontWeight: 500 }, children: C.title })
                                })
                            ]
                          })
                        }),
                        !1 === t && !1 !== r && Object(m.jsx)(N.a, { sx: { borderColor: x.palette.primary.main, mb: U.b } })
                      ]
                    }
                  )
                ))),
            G
          );
        },
        G = r(280),
        V = r(272),
        q = r(263),
        $ = r(286),
        _ = r(288),
        ee = r(289),
        te = r(264),
        re = r(157),
        ae = r.n(re),
        ne = r(257),
        oe = r(287),
        ie = r(258),
        ce = r(259),
        le = r(260),
        se = ['children', 'position', 'sx', 'type', 'direction'],
        de = s.a.forwardRef(function (e, t) {
          var r = e.children,
            a = e.position,
            n = (e.sx, e.type),
            o = e.direction,
            i = Object(T.a)(e, se),
            c = { transformOrigin: '0 0 0' };
          switch (a) {
            case 'top-right':
              c = { transformOrigin: 'top right' };
              break;
            case 'top':
              c = { transformOrigin: 'top' };
              break;
            case 'bottom-left':
              c = { transformOrigin: 'bottom left' };
              break;
            case 'bottom-right':
              c = { transformOrigin: 'bottom right' };
              break;
            case 'bottom':
              c = { transformOrigin: 'bottom' };
              break;
            default:
              c = { transformOrigin: '0 0 0' };
          }
          return Object(m.jsxs)(S.a, {
            ref: t,
            children: [
              'grow' === n &&
                Object(m.jsx)(ne.a, Object(u.a)(Object(u.a)({}, i), {}, { children: Object(m.jsx)(S.a, { sx: c, children: r }) })),
              'collapse' === n && Object(m.jsx)(oe.a, Object(u.a)(Object(u.a)({}, i), {}, { sx: c, children: r })),
              'fade' === n &&
                Object(m.jsx)(
                  ie.a,
                  Object(u.a)(
                    Object(u.a)({}, i),
                    {},
                    { timeout: { appear: 500, enter: 600, exit: 400 }, children: Object(m.jsx)(S.a, { sx: c, children: r }) }
                  )
                ),
              'slide' === n &&
                Object(m.jsx)(
                  ce.a,
                  Object(u.a)(
                    Object(u.a)({}, i),
                    {},
                    { timeout: { appear: 0, enter: 400, exit: 200 }, direction: o, children: Object(m.jsx)(S.a, { sx: c, children: r }) }
                  )
                ),
              'zoom' === n &&
                Object(m.jsx)(le.a, Object(u.a)(Object(u.a)({}, i), {}, { children: Object(m.jsx)(S.a, { sx: c, children: r }) }))
            ]
          });
        });
      de.defaultProps = { type: 'grow', position: 'top-left', direction: 'up' };
      var pe = de,
        ue = function () {
          var e = O(),
            t = e.borderRadius,
            r = e.locale,
            a = e.onChangeLocale,
            n = Object(P.a)(),
            o = Object(w.a)(n.breakpoints.down('md')),
            i = Object(l.useState)(!1),
            c = Object(d.a)(i, 2),
            s = c[0],
            p = c[1],
            b = Object(l.useRef)(null),
            j = Object(l.useState)(r),
            h = Object(d.a)(j, 2),
            x = h[0],
            g = h[1],
            f = function (e, t) {
              g(t), a(t), p(!1);
            },
            v = function (e) {
              (b.current && b.current.contains(e.target)) || p(!1);
            },
            y = Object(l.useRef)(s);
          return (
            Object(l.useEffect)(
              function () {
                !0 === y.current && !1 === s && b.current.focus(), (y.current = s);
              },
              [s]
            ),
            Object(l.useEffect)(
              function () {
                g(r);
              },
              [r]
            ),
            Object(m.jsxs)(m.Fragment, {
              children: [
                Object(m.jsx)(S.a, {
                  sx: Object(k.a)({ ml: 2, mr: 3 }, n.breakpoints.down('md'), { ml: 2 }),
                  children: Object(m.jsxs)(G.a, {
                    variant: 'rounded',
                    sx: Object(u.a)(
                      Object(u.a)(Object(u.a)({}, n.typography.commonAvatar), n.typography.mediumAvatar),
                      {},
                      {
                        border: '1px solid',
                        borderColor: 'dark' === n.palette.mode ? n.palette.dark.main : n.palette.primary.light,
                        background: 'dark' === n.palette.mode ? n.palette.dark.main : n.palette.primary.light,
                        color: n.palette.primary.dark,
                        transition: 'all .2s ease-in-out',
                        '&[aria-controls="menu-list-grow"],&:hover': {
                          borderColor: n.palette.primary.main,
                          background: n.palette.primary.main,
                          color: n.palette.primary.light
                        }
                      }
                    ),
                    ref: b,
                    'aria-controls': s ? 'menu-list-grow' : void 0,
                    'aria-haspopup': 'true',
                    onClick: function () {
                      p(function (e) {
                        return !e;
                      });
                    },
                    color: 'inherit',
                    children: [
                      'en' !== x &&
                        Object(m.jsx)(J.a, { variant: 'h5', sx: { textTransform: 'uppercase' }, color: 'inherit', children: x }),
                      'en' === x && Object(m.jsx)(ae.a, { sx: { fontSize: '1.3rem' } })
                    ]
                  })
                }),
                Object(m.jsx)(V.a, {
                  placement: o ? 'bottom-start' : 'bottom',
                  open: s,
                  anchorEl: b.current,
                  role: void 0,
                  transition: !0,
                  disablePortal: !0,
                  popperOptions: { modifiers: [{ name: 'offset', options: { offset: [0, 20] } }] },
                  children: function (e) {
                    var r = e.TransitionProps;
                    return Object(m.jsx)(q.a, {
                      onClickAway: v,
                      children: Object(m.jsx)(
                        pe,
                        Object(u.a)(
                          Object(u.a)({ position: o ? 'top-left' : 'top', in: s }, r),
                          {},
                          {
                            children: Object(m.jsx)($.a, {
                              elevation: 16,
                              children:
                                s &&
                                Object(m.jsxs)(_.a, {
                                  component: 'nav',
                                  sx: Object(k.a)(
                                    {
                                      width: '100%',
                                      minWidth: 200,
                                      maxWidth: 280,
                                      bgcolor: n.palette.background.paper,
                                      borderRadius: ''.concat(t, 'px')
                                    },
                                    n.breakpoints.down('md'),
                                    { maxWidth: 250 }
                                  ),
                                  children: [
                                    Object(m.jsx)(ee.a, {
                                      selected: 'en' === x,
                                      onClick: function (e) {
                                        return f(0, 'en');
                                      },
                                      children: Object(m.jsx)(te.a, {
                                        primary: Object(m.jsxs)(X.a, {
                                          container: !0,
                                          children: [
                                            Object(m.jsx)(J.a, { color: 'textPrimary', children: 'English' }),
                                            Object(m.jsx)(J.a, {
                                              variant: 'caption',
                                              color: 'textSecondary',
                                              sx: { ml: '8px' },
                                              children: '(UK)'
                                            })
                                          ]
                                        })
                                      })
                                    }),
                                    Object(m.jsx)(ee.a, {
                                      selected: 'vi' === x,
                                      onClick: function (e) {
                                        return f(0, 'vi');
                                      },
                                      children: Object(m.jsx)(te.a, {
                                        primary: Object(m.jsxs)(X.a, {
                                          container: !0,
                                          children: [
                                            Object(m.jsx)(J.a, { color: 'textPrimary', children: 'Ti\u1ebfng vi\u1ec7t' }),
                                            Object(m.jsx)(J.a, {
                                              variant: 'caption',
                                              color: 'textSecondary',
                                              sx: { ml: '8px' },
                                              children: '(Vietnamese)'
                                            })
                                          ]
                                        })
                                      })
                                    })
                                  ]
                                })
                            })
                          }
                        )
                      )
                    });
                  }
                })
              ]
            })
          );
        },
        be = r(48),
        je = r(33),
        me = r.n(je),
        he = r(95),
        xe = r.n(he),
        ge = r(281),
        Oe = r(266),
        fe = r(267),
        ve = r(265),
        ye = r(126),
        ke = r(67),
        we = r.p + 'static/media/user-round.13b5a31b.svg',
        Ce = function () {
          var e = Object(P.a)(),
            t = O().borderRadius,
            r = Object(v.e)(),
            a = Object(l.useState)(-1),
            n = Object(d.a)(a, 2),
            o = n[0],
            i = n[1],
            c = Object(ke.a)(),
            s = c.logout,
            p = c.user,
            b = Object(l.useState)(!1),
            j = Object(d.a)(b, 2),
            h = j[0],
            x = j[1],
            g = Object(l.useRef)(null),
            f = (function () {
              var e = Object(be.a)(
                me.a.mark(function e() {
                  return me.a.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (e.prev = 0), (e.next = 3), s();
                          case 3:
                            e.next = 8;
                            break;
                          case 5:
                            (e.prev = 5), (e.t0 = e.catch(0)), console.error(e.t0);
                          case 8:
                          case 'end':
                            return e.stop();
                        }
                    },
                    e,
                    null,
                    [[0, 5]]
                  );
                })
              );
              return function () {
                return e.apply(this, arguments);
              };
            })(),
            y = function (e) {
              (g.current && g.current.contains(e.target)) || x(!1);
            },
            w = Object(l.useRef)(h);
          return (
            Object(l.useEffect)(
              function () {
                !0 === w.current && !1 === h && g.current.focus(), (w.current = h);
              },
              [h]
            ),
            Object(m.jsxs)(m.Fragment, {
              children: [
                Object(m.jsx)(ge.a, {
                  sx: {
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: 'dark' === e.palette.mode ? e.palette.dark.main : e.palette.primary.light,
                    backgroundColor: 'dark' === e.palette.mode ? e.palette.dark.main : e.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                      borderColor: e.palette.primary.main,
                      background: ''.concat(e.palette.primary.main, '!important'),
                      color: e.palette.primary.light,
                      '& svg': { stroke: e.palette.primary.light }
                    },
                    '& .MuiChip-label': { lineHeight: 0 }
                  },
                  icon: Object(m.jsx)(G.a, {
                    src: we,
                    sx: Object(u.a)(
                      Object(u.a)({}, e.typography.mediumAvatar),
                      {},
                      { margin: '8px 0 8px 8px !important', cursor: 'pointer' }
                    ),
                    ref: g,
                    'aria-controls': h ? 'menu-list-grow' : void 0,
                    'aria-haspopup': 'true',
                    color: 'inherit'
                  }),
                  label: Object(m.jsx)(z.h, { stroke: 1.5, size: '1.5rem', color: e.palette.primary.main }),
                  variant: 'outlined',
                  ref: g,
                  'aria-controls': h ? 'menu-list-grow' : void 0,
                  'aria-haspopup': 'true',
                  onClick: function () {
                    x(function (e) {
                      return !e;
                    });
                  },
                  color: 'primary'
                }),
                Object(m.jsx)(V.a, {
                  placement: 'bottom',
                  open: h,
                  anchorEl: g.current,
                  role: void 0,
                  transition: !0,
                  disablePortal: !0,
                  popperOptions: { modifiers: [{ name: 'offset', options: { offset: [0, 14] } }] },
                  children: function (a) {
                    var n,
                      c = a.TransitionProps;
                    return Object(m.jsx)(q.a, {
                      onClickAway: y,
                      children: Object(m.jsx)(
                        pe,
                        Object(u.a)(
                          Object(u.a)({ in: h }, c),
                          {},
                          {
                            children: Object(m.jsx)($.a, {
                              children:
                                h &&
                                Object(m.jsxs)(ye.a, {
                                  border: !1,
                                  elevation: 16,
                                  content: !1,
                                  boxShadow: !0,
                                  shadow: e.shadows[16],
                                  children: [
                                    Object(m.jsxs)(ve.a, {
                                      sx: { p: 2, pb: 0 },
                                      children: [
                                        Object(m.jsxs)(Oe.a, {
                                          sx: { width: '100%', pr: 1, pl: 2, my: 2 },
                                          children: [
                                            Object(m.jsxs)(Oe.a, {
                                              direction: 'row',
                                              spacing: 0.5,
                                              alignItems: 'center',
                                              children: [
                                                Object(m.jsx)(J.a, { variant: 'h4', children: 'Hi,' }),
                                                Object(m.jsx)(J.a, {
                                                  component: 'span',
                                                  variant: 'h4',
                                                  sx: { fontWeight: 400 },
                                                  children: null === p || void 0 === p ? void 0 : p.name
                                                })
                                              ]
                                            }),
                                            Object(m.jsx)(J.a, {
                                              variant: 'subtitle2',
                                              children: 1 === (null === p || void 0 === p ? void 0 : p.type) ? 'Administrator' : 'Custommer'
                                            })
                                          ]
                                        }),
                                        Object(m.jsx)(N.a, {})
                                      ]
                                    }),
                                    Object(m.jsx)(xe.a, {
                                      style: { height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' },
                                      children: Object(m.jsxs)(ve.a, {
                                        sx: { p: 2, pt: 0 },
                                        children: [
                                          Object(m.jsx)(N.a, {}),
                                          Object(m.jsxs)(_.a, {
                                            component: 'nav',
                                            sx:
                                              ((n = {
                                                width: '100%',
                                                maxWidth: 350,
                                                minWidth: 300,
                                                backgroundColor: e.palette.background.paper,
                                                borderRadius: '10px'
                                              }),
                                              Object(k.a)(n, e.breakpoints.down('md'), { minWidth: '100%' }),
                                              Object(k.a)(n, '& .MuiListItemButton-root', { mt: 0.5 }),
                                              n),
                                            children: [
                                              Object(m.jsxs)(ee.a, {
                                                sx: { borderRadius: ''.concat(t, 'px') },
                                                selected: 0 === o,
                                                onClick: function (e) {
                                                  return (function (e, t) {
                                                    var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '';
                                                    i(t), y(e), a && '' !== a && r(a);
                                                  })(e, 0, '/user/profile');
                                                },
                                                children: [
                                                  Object(m.jsx)(fe.a, { children: Object(m.jsx)(z.h, { stroke: 1.5, size: '1.3rem' }) }),
                                                  Object(m.jsx)(te.a, {
                                                    primary: Object(m.jsx)(J.a, { variant: 'body2', children: 'Account Settings' })
                                                  })
                                                ]
                                              }),
                                              Object(m.jsxs)(ee.a, {
                                                sx: { borderRadius: ''.concat(t, 'px') },
                                                selected: 4 === o,
                                                onClick: f,
                                                children: [
                                                  Object(m.jsx)(fe.a, { children: Object(m.jsx)(z.f, { stroke: 1.5, size: '1.3rem' }) }),
                                                  Object(m.jsx)(te.a, {
                                                    primary: Object(m.jsx)(J.a, { variant: 'body2', children: 'Logout' })
                                                  })
                                                ]
                                              })
                                            ]
                                          })
                                        ]
                                      })
                                    })
                                  ]
                                })
                            })
                          }
                        )
                      )
                    });
                  }
                })
              ]
            })
          );
        },
        Se = r(20),
        Ae = r(45),
        Ie = function () {
          var e = Object(P.a)(),
            t = Object(Se.d)(),
            r = Object(Se.e)(function (e) {
              return e.menu;
            }).drawerOpen;
          return Object(m.jsxs)(m.Fragment, {
            children: [
              Object(m.jsx)(S.a, {
                sx: Object(k.a)({ width: 228, display: 'flex' }, e.breakpoints.down('md'), { width: 'auto' }),
                children: Object(m.jsx)(G.a, {
                  variant: 'rounded',
                  sx: Object(u.a)(
                    Object(u.a)(Object(u.a)({}, e.typography.commonAvatar), e.typography.mediumAvatar),
                    {},
                    {
                      overflow: 'hidden',
                      transition: 'all .2s ease-in-out',
                      background: 'dark' === e.palette.mode ? e.palette.dark.main : e.palette.secondary.light,
                      color: 'dark' === e.palette.mode ? e.palette.secondary.main : e.palette.secondary.dark,
                      '&:hover': {
                        background: 'dark' === e.palette.mode ? e.palette.secondary.main : e.palette.secondary.dark,
                        color: (e.palette.mode, e.palette.secondary.light)
                      }
                    }
                  ),
                  onClick: function () {
                    return t(Object(Ae.c)(!r));
                  },
                  color: 'inherit',
                  children: Object(m.jsx)(z.g, { stroke: 1.5, size: '1.3rem' })
                })
              }),
              Object(m.jsx)(S.a, { sx: { flexGrow: 1 } }),
              Object(m.jsx)(S.a, { sx: { flexGrow: 1 } }),
              Object(m.jsx)(S.a, { sx: { display: { xs: 'none', sm: 'block' } }, children: Object(m.jsx)(ue, {}) }),
              Object(m.jsx)(Ce, {})
            ]
          });
        },
        Me = r(291),
        ze = ['chipcolor', 'disabled', 'sx', 'variant'],
        Le = function (e) {
          var t,
            r,
            a,
            n,
            o,
            i,
            c,
            l,
            s = e.chipcolor,
            d = e.disabled,
            p = e.sx,
            b = void 0 === p ? {} : p,
            j = e.variant,
            h = Object(T.a)(e, ze),
            x = Object(P.a)(),
            g = {
              color: 'dark' === x.palette.mode ? x.palette.primary.light : x.palette.primary.main,
              bgcolor: 'dark' === x.palette.mode ? x.palette.primary.main : x.palette.primary.light,
              ':hover': {
                color: x.palette.primary.light,
                bgcolor: 'dark' === x.palette.mode ? x.palette.primary.dark + 90 : x.palette.primary.dark
              }
            },
            O = {
              color: x.palette.primary.main,
              bgcolor: 'transparent',
              border: '1px solid',
              borderColor: x.palette.primary.main,
              ':hover': {
                color: (x.palette.mode, x.palette.primary.light),
                bgcolor: 'dark' === x.palette.mode ? x.palette.primary.main : x.palette.primary.dark
              }
            };
          switch (s) {
            case 'secondary':
              'outlined' === j
                ? (O = {
                    color: x.palette.secondary.main,
                    bgcolor: 'transparent',
                    border: '1px solid',
                    borderColor: x.palette.secondary.main,
                    ':hover': {
                      color: 'dark' === x.palette.mode ? x.palette.secondary.light : x.palette.secondary.main,
                      bgcolor: 'dark' === x.palette.mode ? x.palette.secondary.dark : x.palette.secondary.light
                    }
                  })
                : (g = {
                    color: 'dark' === x.palette.mode ? x.palette.secondary.light : x.palette.secondary.main,
                    bgcolor: 'dark' === x.palette.mode ? x.palette.secondary.dark : x.palette.secondary.light,
                    ':hover': {
                      color: x.palette.secondary.light,
                      bgcolor: 'dark' === x.palette.mode ? x.palette.secondary.dark + 90 : x.palette.secondary.main
                    }
                  });
              break;
            case 'success':
              'outlined' === j
                ? (O = {
                    color: x.palette.success.dark,
                    bgcolor: 'transparent',
                    border: '1px solid',
                    borderColor: x.palette.success.dark,
                    ':hover': {
                      color: 'dark' === x.palette.mode ? x.palette.success.light : x.palette.success.dark,
                      bgcolor: 'dark' === x.palette.mode ? x.palette.success.dark : x.palette.success.light + 60
                    }
                  })
                : (g = {
                    color: 'dark' === x.palette.mode ? x.palette.success.light : x.palette.success.dark,
                    bgcolor: 'dark' === x.palette.mode ? x.palette.success.dark : x.palette.success.light + 60,
                    ':hover': {
                      color: x.palette.success.light,
                      bgcolor: 'dark' === x.palette.mode ? x.palette.success.dark + 90 : x.palette.success.dark
                    }
                  });
              break;
            case 'error':
              'outlined' === j
                ? (O = {
                    color: x.palette.error.main,
                    bgcolor: 'transparent',
                    border: '1px solid',
                    borderColor: x.palette.error.main,
                    ':hover': {
                      color: 'dark' === x.palette.mode ? x.palette.error.light : x.palette.error.dark,
                      bgcolor: 'dark' === x.palette.mode ? x.palette.error.dark : x.palette.error.light
                    }
                  })
                : (g = {
                    color: 'dark' === x.palette.mode ? x.palette.error.light : x.palette.error.dark,
                    bgcolor: 'dark' === x.palette.mode ? x.palette.error.dark : x.palette.error.light + 60,
                    ':hover': {
                      color: x.palette.error.light,
                      bgcolor: 'dark' === x.palette.mode ? x.palette.error.dark + 90 : x.palette.error.dark
                    }
                  });
              break;
            case 'orange':
              'outlined' === j
                ? (O = {
                    color: null === (t = x.palette.orange) || void 0 === t ? void 0 : t.dark,
                    bgcolor: 'transparent',
                    border: '1px solid',
                    borderColor: null === (r = x.palette.orange) || void 0 === r ? void 0 : r.main,
                    ':hover': {
                      color: null === (a = x.palette.orange) || void 0 === a ? void 0 : a.dark,
                      bgcolor: null === (n = x.palette.orange) || void 0 === n ? void 0 : n.light
                    }
                  })
                : (g = {
                    color: null === (o = x.palette.orange) || void 0 === o ? void 0 : o.dark,
                    bgcolor: null === (i = x.palette.orange) || void 0 === i ? void 0 : i.light,
                    ':hover': {
                      color: null === (c = x.palette.orange) || void 0 === c ? void 0 : c.light,
                      bgcolor: null === (l = x.palette.orange) || void 0 === l ? void 0 : l.dark
                    }
                  });
              break;
            case 'warning':
              'outlined' === j
                ? (O = {
                    color: x.palette.warning.dark,
                    bgcolor: 'transparent',
                    border: '1px solid',
                    borderColor: x.palette.warning.dark,
                    ':hover': { color: x.palette.warning.dark, bgcolor: x.palette.warning.light }
                  })
                : (g = {
                    color: x.palette.warning.dark,
                    bgcolor: x.palette.warning.light,
                    ':hover': {
                      color: x.palette.warning.light,
                      bgcolor: 'dark' === x.palette.mode ? x.palette.warning.dark + 90 : x.palette.warning.dark
                    }
                  });
          }
          d &&
            ('outlined' === j
              ? (O = {
                  color: x.palette.grey[500],
                  bgcolor: 'transparent',
                  border: '1px solid',
                  borderColor: x.palette.grey[500],
                  ':hover': { color: x.palette.grey[500], bgcolor: 'transparent' }
                })
              : (g = {
                  color: x.palette.grey[500],
                  bgcolor: x.palette.grey[50],
                  ':hover': { color: x.palette.grey[500], bgcolor: x.palette.grey[50] }
                }));
          var f = g;
          return (
            'outlined' === j && (f = O),
            (f = Object(u.a)(Object(u.a)({}, f), b)),
            Object(m.jsx)(ge.a, Object(u.a)(Object(u.a)({}, h), {}, { sx: f }))
          );
        },
        Pe = r(290),
        Te = r(137),
        Re = function () {
          return Object(m.jsx)(Pe.a, { component: o.b, to: b, children: Object(m.jsx)(Te.a, {}) });
        },
        De = r(98),
        Be = r.n(De),
        Ee = function (e) {
          var t = e.item,
            r = e.level,
            a = Object(P.a)(),
            n = Object(w.a)(a.breakpoints.down('lg')),
            i = O().borderRadius,
            c = Object(Se.d)(),
            s = Object(Se.e)(function (e) {
              return e.menu;
            }).openItem,
            d = null === t || void 0 === t ? void 0 : t.icon,
            p =
              null !== t && void 0 !== t && t.icon
                ? Object(m.jsx)(d, { stroke: 1.5, size: '1.3rem' })
                : Object(m.jsx)(Be.a, {
                    sx: {
                      width:
                        s.findIndex(function (e) {
                          return e === (null === t || void 0 === t ? void 0 : t.id);
                        }) > -1
                          ? 8
                          : 6,
                      height:
                        s.findIndex(function (e) {
                          return e === (null === t || void 0 === t ? void 0 : t.id);
                        }) > -1
                          ? 8
                          : 6
                    },
                    fontSize: r > 0 ? 'inherit' : 'medium'
                  }),
            b = '_self';
          t.target && (b = '_blank');
          var j = {
            component: Object(l.forwardRef)(function (e, r) {
              return Object(m.jsx)(o.b, Object(u.a)(Object(u.a)({ ref: r }, e), {}, { to: t.url, target: b }));
            })
          };
          null !== t && void 0 !== t && t.external && (j = { component: 'a', href: t.url, target: b });
          return (
            Object(l.useEffect)(function () {
              document.location.pathname
                .toString()
                .split('/')
                .findIndex(function (e) {
                  return e === t.id;
                }) > -1 && c(Object(Ae.a)([t.id]));
            }, []),
            Object(m.jsxs)(
              ee.a,
              Object(u.a)(
                Object(u.a)({}, j),
                {},
                {
                  disabled: t.disabled,
                  sx: {
                    borderRadius: ''.concat(i, 'px'),
                    mb: 0.5,
                    alignItems: 'flex-start',
                    backgroundColor: r > 1 ? 'transparent !important' : 'inherit',
                    py: r > 1 ? 1 : 1.25,
                    pl: ''.concat(24 * r, 'px')
                  },
                  selected:
                    (null === s || void 0 === s
                      ? void 0
                      : s.findIndex(function (e) {
                          return e === t.id;
                        })) > -1,
                  onClick: function () {
                    return (e = t.id), c(Object(Ae.a)([e])), void (n && c(Object(Ae.c)(!1)));
                    var e;
                  },
                  children: [
                    Object(m.jsx)(fe.a, { sx: { my: 'auto', minWidth: null !== t && void 0 !== t && t.icon ? 36 : 18 }, children: p }),
                    Object(m.jsx)(te.a, {
                      primary: Object(m.jsx)(J.a, {
                        variant:
                          (null === s || void 0 === s
                            ? void 0
                            : s.findIndex(function (e) {
                                return e === t.id;
                              })) > -1
                            ? 'h5'
                            : 'body1',
                        color: 'inherit',
                        children: t.title
                      }),
                      secondary:
                        t.caption &&
                        Object(m.jsx)(J.a, {
                          variant: 'caption',
                          sx: Object(u.a)({}, a.typography.subMenuCaption),
                          display: 'block',
                          gutterBottom: !0,
                          children: t.caption
                        })
                    }),
                    t.chip &&
                      Object(m.jsx)(ge.a, {
                        color: t.chip.color,
                        variant: t.chip.variant,
                        size: t.chip.size,
                        label: t.chip.label,
                        avatar: t.chip.avatar && Object(m.jsx)(G.a, { children: t.chip.avatar })
                      })
                  ]
                }
              )
            )
          );
        },
        Fe = function e(t) {
          var r,
            a = t.menu,
            n = t.level,
            o = Object(P.a)(),
            i = O().borderRadius,
            c = Object(l.useState)(!1),
            s = Object(d.a)(c, 2),
            p = s[0],
            b = s[1],
            j = Object(l.useState)(null),
            h = Object(d.a)(j, 2),
            x = h[0],
            g = h[1],
            f = Object(v.d)().pathname;
          Object(l.useEffect)(
            function () {
              (a.children ? a.children : []).forEach(function (e) {
                f && f.includes('product-details') && e.url && e.url.includes('product-details') && b(!0), e.url === f && b(!0);
              });
            },
            [f, a.children]
          );
          var y =
              null === (r = a.children) || void 0 === r
                ? void 0
                : r.map(function (t) {
                    switch (t.type) {
                      case 'collapse':
                        return Object(m.jsx)(e, { menu: t, level: n + 1 }, t.id);
                      case 'item':
                        return Object(m.jsx)(Ee, { item: t, level: n + 1 }, t.id);
                      default:
                        return Object(m.jsx)(J.a, { variant: 'h6', color: 'error', align: 'center', children: 'Menu Items Error' }, t.id);
                    }
                  }),
            k = a.icon,
            w = a.icon
              ? Object(m.jsx)(k, { strokeWidth: 1.5, size: '1.3rem', style: { marginTop: 'auto', marginBottom: 'auto' } })
              : Object(m.jsx)(Be.a, {
                  sx: { width: x === a.id ? 8 : 6, height: x === a.id ? 8 : 6 },
                  fontSize: n > 0 ? 'inherit' : 'medium'
                });
          return Object(m.jsxs)(m.Fragment, {
            children: [
              Object(m.jsxs)(ee.a, {
                sx: {
                  borderRadius: ''.concat(i, 'px'),
                  mb: 0.5,
                  alignItems: 'flex-start',
                  backgroundColor: n > 1 ? 'transparent !important' : 'inherit',
                  py: n > 1 ? 1 : 1.25,
                  pl: ''.concat(24 * n, 'px')
                },
                selected: x === a.id,
                onClick: function () {
                  b(!p), g(x ? null : a.id);
                },
                children: [
                  Object(m.jsx)(fe.a, { sx: { my: 'auto', minWidth: a.icon ? 36 : 18 }, children: w }),
                  Object(m.jsx)(te.a, {
                    primary: Object(m.jsx)(J.a, {
                      variant: x === a.id ? 'h5' : 'body1',
                      color: 'inherit',
                      sx: { my: 'auto' },
                      children: a.title
                    }),
                    secondary:
                      a.caption &&
                      Object(m.jsx)(J.a, {
                        variant: 'caption',
                        sx: Object(u.a)({}, o.typography.subMenuCaption),
                        display: 'block',
                        gutterBottom: !0,
                        children: a.caption
                      })
                  }),
                  p
                    ? Object(m.jsx)(z.c, { stroke: 1.5, size: '1rem', style: { marginTop: 'auto', marginBottom: 'auto' } })
                    : Object(m.jsx)(z.a, { stroke: 1.5, size: '1rem', style: { marginTop: 'auto', marginBottom: 'auto' } })
                ]
              }),
              Object(m.jsx)(oe.a, {
                in: p,
                timeout: 'auto',
                unmountOnExit: !0,
                children:
                  p &&
                  Object(m.jsx)(_.a, {
                    component: 'div',
                    disablePadding: !0,
                    sx: {
                      position: 'relative',
                      '&:after': {
                        content: "''",
                        position: 'absolute',
                        left: '32px',
                        top: 0,
                        height: '100%',
                        width: '1px',
                        opacity: 'dark' === o.palette.mode ? 0.2 : 1,
                        background: 'dark' === o.palette.mode ? o.palette.dark.light : o.palette.primary.light
                      }
                    },
                    children: y
                  })
              })
            ]
          });
        },
        We = function (e) {
          var t,
            r = e.item,
            a = Object(P.a)(),
            n =
              null === (t = r.children) || void 0 === t
                ? void 0
                : t.map(function (e) {
                    switch (e.type) {
                      case 'collapse':
                        return Object(m.jsx)(Fe, { menu: e, level: 1 }, e.id);
                      case 'item':
                        return Object(m.jsx)(Ee, { item: e, level: 1 }, e.id);
                      default:
                        return Object(m.jsx)(J.a, { variant: 'h6', color: 'error', align: 'center', children: 'Menu Items Error' }, e.id);
                    }
                  });
          return Object(m.jsxs)(m.Fragment, {
            children: [
              Object(m.jsx)(_.a, {
                subheader:
                  r.title &&
                  Object(m.jsxs)(J.a, {
                    variant: 'caption',
                    sx: Object(u.a)({}, a.typography.menuCaption),
                    display: 'block',
                    gutterBottom: !0,
                    children: [
                      r.title,
                      r.caption &&
                        Object(m.jsx)(J.a, {
                          variant: 'caption',
                          sx: Object(u.a)({}, a.typography.subMenuCaption),
                          display: 'block',
                          gutterBottom: !0,
                          children: r.caption
                        })
                    ]
                  }),
                children: n
              }),
              Object(m.jsx)(N.a, { sx: { mt: 0.25, mb: 1.25 } })
            ]
          });
        },
        He = r(285),
        Je = { IconDashboard: z.d, IconDeviceAnalytics: z.e },
        Ye = {
          id: 'dashboard',
          title: Object(m.jsx)(He.a, { id: 'dashboard' }),
          type: 'group',
          children: [
            {
              id: 'analytics',
              title: Object(m.jsx)(He.a, { id: 'analytics' }),
              type: 'item',
              url: '/dashboard/analytics',
              icon: Je.IconDeviceAnalytics,
              breadcrumbs: !1
            }
          ]
        },
        Xe = { IconStairsUp: z.i, IconUserCheck: z.k },
        Ne = {
          items: [
            Ye,
            {
              id: 'application',
              title: Object(m.jsx)(He.a, { id: 'application' }),
              type: 'group',
              children: [
                {
                  id: 'manage-member',
                  title: Object(m.jsx)(He.a, { id: 'manage-member' }),
                  type: 'collapse',
                  icon: Xe.IconUserCheck,
                  children: [
                    { id: 'administrator', title: Object(m.jsx)(He.a, { id: 'administrator' }), type: 'item', url: '/user/administrator' },
                    { id: 'customer', title: Object(m.jsx)(He.a, { id: 'customer' }), type: 'item', url: '/user/customer' }
                  ]
                },
                {
                  id: 'manage-rank',
                  title: Object(m.jsx)(He.a, { id: 'manage-rank' }),
                  type: 'item',
                  url: '/ranks',
                  icon: Xe.IconStairsUp,
                  breadcrumbs: !1
                }
              ]
            }
          ]
        },
        Ue = function () {
          var e = Ne.items.map(function (e) {
            return 'group' === e.type
              ? Object(m.jsx)(We, { item: e }, e.id)
              : Object(m.jsx)(J.a, { variant: 'h6', color: 'error', align: 'center', children: 'Menu Items Error' }, e.id);
          });
          return Object(m.jsx)(m.Fragment, { children: e });
        },
        Qe = Object(l.memo)(Ue),
        Ke = function (e) {
          var t = e.window,
            r = Object(P.a)(),
            a = Object(w.a)(r.breakpoints.up('md')),
            n = Object(Se.d)(),
            o = Object(Se.e)(function (e) {
              return e.menu;
            }).drawerOpen,
            i = Object(l.useMemo)(function () {
              return Object(m.jsx)(S.a, {
                sx: { display: { xs: 'block', md: 'none' } },
                children: Object(m.jsx)(S.a, { sx: { display: 'flex', p: 2, mx: 'auto' }, children: Object(m.jsx)(Re, {}) })
              });
            }, []),
            c = Object(l.useMemo)(
              function () {
                return Object(m.jsxs)(xe.a, {
                  component: 'div',
                  style: { height: a ? 'calc(100vh - 88px)' : 'calc(100vh - 56px)', paddingLeft: '16px', paddingRight: '16px' },
                  children: [
                    Object(m.jsx)(Qe, {}),
                    Object(m.jsx)(Oe.a, {
                      direction: 'row',
                      justifyContent: 'center',
                      sx: { mb: 2 },
                      children: Object(m.jsx)(Le, {
                        label: 'v1.0.0',
                        disabled: !0,
                        chipcolor: 'secondary',
                        size: 'small',
                        sx: { cursor: 'pointer' }
                      })
                    })
                  ]
                });
              },
              [a]
            ),
            s =
              void 0 !== t
                ? function () {
                    return t.document.body;
                  }
                : void 0;
          return Object(m.jsx)(S.a, {
            component: 'nav',
            sx: { flexShrink: { md: 0 }, width: a ? U.a : 'auto' },
            'aria-label': 'mailbox folders',
            children: Object(m.jsxs)(Me.a, {
              container: s,
              variant: a ? 'persistent' : 'temporary',
              anchor: 'left',
              open: o,
              onClose: function () {
                return n(Object(Ae.c)(!o));
              },
              sx: {
                '& .MuiDrawer-paper': Object(k.a)(
                  { width: U.a, background: r.palette.background.default, color: r.palette.text.primary, borderRight: 'none' },
                  r.breakpoints.up('md'),
                  { top: '88px' }
                )
              },
              ModalProps: { keepMounted: !0 },
              color: 'inherit',
              children: [o && i, o && c]
            })
          });
        },
        Ze = Object(l.memo)(Ke),
        Ge = Object(L.a)('main', {
          shouldForwardProp: function (e) {
            return 'open' !== e;
          }
        })(function (e) {
          var t,
            r,
            a = e.theme,
            n = e.open;
          return Object(u.a)(
            Object(u.a)(
              Object(u.a)({}, a.typography.mainContent),
              !n &&
                ((t = {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  transition: a.transitions.create('margin', {
                    easing: a.transitions.easing.sharp,
                    duration: a.transitions.duration.shorter
                  })
                }),
                Object(k.a)(t, a.breakpoints.up('md'), { marginLeft: -(U.a - 20), width: 'calc(100% - '.concat(U.a, 'px)') }),
                Object(k.a)(t, a.breakpoints.down('md'), { marginLeft: '20px', width: 'calc(100% - '.concat(U.a, 'px)'), padding: '16px' }),
                Object(k.a)(t, a.breakpoints.down('sm'), {
                  marginLeft: '10px',
                  width: 'calc(100% - '.concat(U.a, 'px)'),
                  padding: '16px',
                  marginRight: '10px'
                }),
                t)
            ),
            n &&
              ((r = {
                transition: a.transitions.create('margin', {
                  easing: a.transitions.easing.easeOut,
                  duration: a.transitions.duration.shorter
                }),
                marginLeft: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                width: 'calc(100% - '.concat(U.a, 'px)')
              }),
              Object(k.a)(r, a.breakpoints.down('md'), { marginLeft: '20px' }),
              Object(k.a)(r, a.breakpoints.down('sm'), { marginLeft: '10px' }),
              r)
          );
        }),
        Ve = function () {
          var e = Object(P.a)(),
            t = Object(w.a)(e.breakpoints.down('lg')),
            r = Object(Se.d)(),
            a = Object(Se.e)(function (e) {
              return e.menu;
            }).drawerOpen,
            n = O().container;
          s.a.useEffect(
            function () {
              r(Object(Ae.c)(!t));
            },
            [t]
          );
          var o = Object(l.useMemo)(function () {
            return Object(m.jsx)(C.a, { children: Object(m.jsx)(Ie, {}) });
          }, []);
          return Object(m.jsxs)(S.a, {
            sx: { display: 'flex' },
            children: [
              Object(m.jsx)(A.a, {}),
              Object(m.jsx)(I.a, {
                enableColorOnDark: !0,
                position: 'fixed',
                color: 'inherit',
                elevation: 0,
                sx: { bgcolor: e.palette.background.default, transition: a ? e.transitions.create('width') : 'none' },
                children: o
              }),
              Object(m.jsx)(Ze, {}),
              Object(m.jsxs)(Ge, {
                theme: e,
                open: a,
                children: [
                  n &&
                    Object(m.jsxs)(M.a, {
                      maxWidth: 'lg',
                      children: [
                        Object(m.jsx)(Z, { separator: z.b, navigation: Ne, icon: !0, title: !0, rightAlign: !0 }),
                        Object(m.jsx)(v.a, {})
                      ]
                    }),
                  !n &&
                    Object(m.jsxs)(m.Fragment, {
                      children: [
                        Object(m.jsx)(Z, { separator: z.b, navigation: Ne, icon: !0, title: !0, rightAlign: !0 }),
                        Object(m.jsx)(v.a, {})
                      ]
                    })
                ]
              })
            ]
          });
        },
        qe = r(96),
        $e = function (e) {
          return function (t) {
            return Object(m.jsx)(l.Suspense, { fallback: Object(m.jsx)(qe.a, {}), children: Object(m.jsx)(e, Object(u.a)({}, t)) });
          };
        },
        _e = function (e) {
          var t = e.children,
            r = Object(ke.a)().isLoggedIn,
            a = Object(v.e)();
          return Object(l.useEffect)(function () {}, [r, a]), t;
        },
        et = $e(
          Object(l.lazy)(function () {
            return r.e(12).then(r.bind(null, 502));
          })
        ),
        tt = $e(
          Object(l.lazy)(function () {
            return Promise.all([r.e(0), r.e(2), r.e(3), r.e(9)]).then(r.bind(null, 510));
          })
        ),
        rt = $e(
          Object(l.lazy)(function () {
            return Promise.all([r.e(0), r.e(1), r.e(2), r.e(3), r.e(11)]).then(r.bind(null, 508));
          })
        ),
        at = $e(
          Object(l.lazy)(function () {
            return Promise.all([r.e(0), r.e(2), r.e(13)]).then(r.bind(null, 511));
          })
        ),
        nt = {
          path: '/',
          element: Object(m.jsx)(_e, { children: Object(m.jsx)(Ve, {}) }),
          children: [
            { path: '/dashboard/analytics', element: Object(m.jsx)(et, {}) },
            { path: '/user/administrator', element: Object(m.jsx)(tt, {}) },
            { path: '/user/customer', element: Object(m.jsx)(rt, {}) },
            { path: 'ranks', element: Object(m.jsx)(at, {}) }
          ]
        },
        ot = function (e) {
          var t = e.children,
            r = Object(ke.a)().isLoggedIn,
            a = Object(v.e)();
          return (
            Object(l.useEffect)(
              function () {
                r && a(b, { replace: !0 });
              },
              [r, a]
            ),
            t
          );
        },
        it = function () {
          return Object(m.jsx)(m.Fragment, { children: Object(m.jsx)(v.a, {}) });
        },
        ct = r(271),
        lt = function (e) {
          var t = e.children;
          return Object(m.jsx)(ct.a.div, {
            initial: 'initial',
            animate: 'in',
            exit: 'out',
            variants: { initial: { opacity: 0, scale: 0.99 }, in: { opacity: 1, scale: 1 }, out: { opacity: 0, scale: 1.01 } },
            transition: { type: 'tween', ease: 'anticipate', duration: 0.4 },
            children: t
          });
        },
        st = $e(
          Object(l.lazy)(function () {
            return Promise.all([r.e(0), r.e(1), r.e(10), r.e(8)]).then(r.bind(null, 514));
          })
        ),
        dt = $e(
          Object(l.lazy)(function () {
            return Promise.all([r.e(0), r.e(1), r.e(7)]).then(r.bind(null, 515));
          })
        ),
        pt = {
          path: '/',
          element: Object(m.jsx)(lt, { children: Object(m.jsx)(ot, { children: Object(m.jsx)(it, {}) }) }),
          children: [
            { path: '/login', element: Object(m.jsx)(st, {}) },
            { path: '/forgot', element: Object(m.jsx)(dt, {}) }
          ]
        },
        ut = { path: '/', element: Object(m.jsx)(it, {}), children: [] };
      function bt() {
        return Object(v.g)([nt, pt, ut]);
      }
      var jt = r(60),
        mt = r(34),
        ht = r(161),
        xt = function (e) {
          var t = e.children,
            r = O().rtlLayout;
          Object(l.useEffect)(
            function () {
              document.dir = r ? 'rtl' : 'ltr';
            },
            [r]
          );
          var a = Object(jt.a)({ key: r ? 'rtl' : 'css', prepend: !0, stylisPlugins: r ? [ht.a] : [] });
          return Object(m.jsx)(mt.a, { value: a, children: t });
        },
        gt = r(120),
        Ot = r(284),
        ft = r(270);
      var vt = r(215),
        yt = function (e, t) {
          var r = Object(vt.a)(t, 0.24);
          return {
            z1: '0 1px 2px 0 '.concat(r),
            z8: '0 8px 16px 0 '.concat(r),
            z12: '0 12px 24px 0 '.concat(r, ' 0 10px 20px 0 ').concat(r),
            z16: '0 0 3px 0 '.concat(r, ' 0 14px 28px -5px ').concat(r),
            z20: '0 0 3px 0 '.concat(r, ' 0 18px 36px -5px ').concat(r),
            z24: '0 0 6px 0 '.concat(r, ' 0 21px 44px 0 ').concat(r),
            primary: '0px 12px 14px 0px '.concat(Object(vt.a)(e.palette.primary.main, 0.3)),
            secondary: '0px 12px 14px 0px '.concat(Object(vt.a)(e.palette.secondary.main, 0.3)),
            orange: '0px 12px 14px 0px '.concat(Object(vt.a)(e.palette.orange.main, 0.3)),
            success: '0px 12px 14px 0px '.concat(Object(vt.a)(e.palette.success.main, 0.3)),
            warning: '0px 12px 14px 0px '.concat(Object(vt.a)(e.palette.warning.main, 0.3)),
            error: '0px 12px 14px 0px '.concat(Object(vt.a)(e.palette.error.main, 0.3))
          };
        };
      var kt = r(163),
        wt = r.n(kt),
        Ct = function (e, t) {
          var r;
          return (
            (r = wt.a),
            Object(gt.a)({
              palette: {
                mode: e,
                common: { black: r.darkPaper },
                primary: {
                  light: 'dark' === e ? r.darkPrimaryLight : r.primaryLight,
                  main: 'dark' === e ? r.darkPrimaryMain : r.primaryMain,
                  dark: 'dark' === e ? r.darkPrimaryDark : r.primaryDark,
                  200: 'dark' === e ? r.darkPrimary200 : r.primary200,
                  800: 'dark' === e ? r.darkPrimary800 : r.primary800
                },
                secondary: {
                  light: 'dark' === e ? r.darkSecondaryLight : r.secondaryLight,
                  main: 'dark' === e ? r.darkSecondaryMain : r.secondaryMain,
                  dark: 'dark' === e ? r.darkSecondaryDark : r.secondaryDark,
                  200: 'dark' === e ? r.darkSecondary200 : r.secondary200,
                  800: 'dark' === e ? r.darkSecondary800 : r.secondary800
                },
                error: { light: r.errorLight, main: r.errorMain, dark: r.errorDark },
                orange: { light: r.orangeLight, main: r.orangeMain, dark: r.orangeDark },
                warning: { light: r.warningLight, main: r.warningMain, dark: r.warningDark },
                success: { light: r.successLight, 200: r.success200, main: r.successMain, dark: r.successDark },
                grey: {
                  50: r.grey50,
                  100: r.grey100,
                  500: 'dark' === e ? r.darkTextSecondary : r.grey500,
                  600: 'dark' === e ? r.darkTextTitle : r.grey900,
                  700: 'dark' === e ? r.darkTextPrimary : r.grey700,
                  900: 'dark' === e ? r.darkTextPrimary : r.grey900
                },
                dark: { light: r.darkTextPrimary, main: r.darkLevel1, dark: r.darkLevel2, 800: r.darkBackground, 900: r.darkPaper },
                text: {
                  primary: 'dark' === e ? r.darkTextPrimary : r.grey700,
                  secondary: 'dark' === e ? r.darkTextSecondary : r.grey500,
                  dark: 'dark' === e ? r.darkTextPrimary : r.grey900,
                  hint: r.grey100
                },
                divider: 'dark' === e ? r.darkTextPrimary : r.grey200,
                background: { paper: 'dark' === e ? r.darkLevel2 : r.paper, default: 'dark' === e ? r.darkPaper : r.paper }
              }
            })
          );
        },
        St = function (e, t, r) {
          return {
            fontFamily: r,
            h6: { fontWeight: 500, color: e.palette.grey[600], fontSize: '0.75rem' },
            h5: { fontSize: '0.875rem', color: e.palette.grey[600], fontWeight: 500 },
            h4: { fontSize: '1rem', color: e.palette.grey[600], fontWeight: 600 },
            h3: { fontSize: '1.25rem', color: e.palette.grey[600], fontWeight: 600 },
            h2: { fontSize: '1.5rem', color: e.palette.grey[600], fontWeight: 700 },
            h1: { fontSize: '2.125rem', color: e.palette.grey[600], fontWeight: 700 },
            subtitle1: { fontSize: '0.875rem', fontWeight: 500, color: e.palette.text.dark },
            subtitle2: { fontSize: '0.75rem', fontWeight: 400, color: e.palette.text.secondary },
            caption: { fontSize: '0.75rem', color: e.palette.text.secondary, fontWeight: 400 },
            body1: { fontSize: '0.875rem', fontWeight: 400, lineHeight: '1.334em' },
            body2: { letterSpacing: '0em', fontWeight: 400, lineHeight: '1.5em', color: e.palette.text.primary },
            button: { textTransform: 'capitalize' },
            customInput: {
              marginTop: 1,
              marginBottom: 1,
              '& > label': { top: 23, left: 0, color: e.palette.grey[500], '&[data-shrink="false"]': { top: 5 } },
              '& > div > input': { padding: '30.5px 14px 11.5px !important' },
              '& legend': { display: 'none' },
              '& fieldset': { top: 0 }
            },
            mainContent: {
              backgroundColor: 'dark' === e.palette.mode ? e.palette.dark[800] : e.palette.primary.light,
              width: '100%',
              minHeight: 'calc(100vh - 88px)',
              flexGrow: 1,
              padding: '20px',
              marginTop: '88px',
              marginRight: '20px',
              borderRadius: ''.concat(t, 'px')
            },
            menuCaption: {
              fontSize: '0.875rem',
              fontWeight: 500,
              color: e.palette.grey[600],
              padding: '6px',
              textTransform: 'capitalize',
              marginTop: '10px'
            },
            subMenuCaption: { fontSize: '0.6875rem', fontWeight: 500, color: e.palette.text.secondary, textTransform: 'capitalize' },
            commonAvatar: { cursor: 'pointer', borderRadius: '8px' },
            smallAvatar: { width: '22px', height: '22px', fontSize: '1rem' },
            mediumAvatar: { width: '34px', height: '34px', fontSize: '1.2rem' },
            largeAvatar: { width: '44px', height: '44px', fontSize: '1.5rem' }
          };
        };
      function At(e) {
        var t = e.children,
          r = O(),
          a = r.borderRadius,
          n = r.fontFamily,
          o = r.navType,
          i = r.outlinedFilled,
          c = r.presetColor,
          s = r.rtlLayout,
          d = Object(l.useMemo)(
            function () {
              return Ct(o, c);
            },
            [o, c]
          ),
          p = Object(l.useMemo)(
            function () {
              return St(d, a, n);
            },
            [d, a, n]
          ),
          u = Object(l.useMemo)(
            function () {
              return (function (e, t) {
                return yt(t, 'dark' === e ? t.palette.dark.main : t.palette.grey[600]);
              })(o, d);
            },
            [o, d]
          ),
          b = Object(l.useMemo)(
            function () {
              return {
                direction: s ? 'rtl' : 'ltr',
                palette: d.palette,
                mixins: { toolbar: { minHeight: '48px', padding: '16px', '@media (min-width: 600px)': { minHeight: '48px' } } },
                typography: p,
                customShadows: u
              };
            },
            [s, d, u, p]
          ),
          j = Object(gt.a)(b);
        return (
          (j.components = Object(l.useMemo)(
            function () {
              return (function (e, t, r) {
                var a = e.palette.mode,
                  n = 'dark' === a ? e.palette.dark[800] : e.palette.grey[50],
                  o = 'dark' === a ? e.palette.secondary.main + 15 : e.palette.secondary.light,
                  i = 'dark' === a ? e.palette.secondary.main : e.palette.secondary.dark;
                return {
                  MuiButton: { styleOverrides: { root: { fontWeight: 500, borderRadius: '4px' } } },
                  MuiPaper: {
                    defaultProps: { elevation: 0 },
                    styleOverrides: { root: { backgroundImage: 'none' }, rounded: { borderRadius: ''.concat(t, 'px') } }
                  },
                  MuiCardHeader: {
                    styleOverrides: { root: { color: e.palette.text.dark, padding: '24px' }, title: { fontSize: '1.125rem' } }
                  },
                  MuiCardContent: { styleOverrides: { root: { padding: '24px' } } },
                  MuiCardActions: { styleOverrides: { root: { padding: '24px' } } },
                  MuiAlert: { styleOverrides: { root: { alignItems: 'center' }, outlined: { border: '1px dashed' } } },
                  MuiListItemButton: {
                    styleOverrides: {
                      root: {
                        color: e.palette.text.primary,
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        '&.Mui-selected': {
                          color: i,
                          backgroundColor: o,
                          '&:hover': { backgroundColor: o },
                          '& .MuiListItemIcon-root': { color: i }
                        },
                        '&:hover': { backgroundColor: o, color: i, '& .MuiListItemIcon-root': { color: i } }
                      }
                    }
                  },
                  MuiListItemIcon: { styleOverrides: { root: { color: e.palette.text.primary, minWidth: '36px' } } },
                  MuiListItemText: { styleOverrides: { primary: { color: e.palette.text.dark } } },
                  MuiInputBase: {
                    styleOverrides: {
                      input: { color: e.palette.text.dark, '&::placeholder': { color: e.palette.text.secondary, fontSize: '0.875rem' } }
                    }
                  },
                  MuiOutlinedInput: {
                    styleOverrides: {
                      root: {
                        background: r ? n : 'transparent',
                        borderRadius: ''.concat(t, 'px'),
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'dark' === a ? e.palette.text.primary + 28 : e.palette.grey[400]
                        },
                        '&:hover $notchedOutline': { borderColor: e.palette.primary.light },
                        '&.MuiInputBase-multiline': { padding: 1 }
                      },
                      input: {
                        fontWeight: 500,
                        background: r ? n : 'transparent',
                        padding: '15.5px 14px',
                        borderRadius: ''.concat(t, 'px'),
                        '&.MuiInputBase-inputSizeSmall': { padding: '10px 14px', '&.MuiInputBase-inputAdornedStart': { paddingLeft: 0 } }
                      },
                      inputAdornedStart: { paddingLeft: 4 },
                      notchedOutline: { borderRadius: ''.concat(t, 'px') }
                    }
                  },
                  MuiSlider: {
                    styleOverrides: {
                      root: { '&.Mui-disabled': { color: 'dark' === a ? e.palette.text.primary + 50 : e.palette.grey[300] } },
                      mark: { backgroundColor: e.palette.background.paper, width: '4px' },
                      valueLabel: { color: 'dark' === a ? e.palette.primary.main : e.palette.primary.light }
                    }
                  },
                  MuiAutocomplete: {
                    styleOverrides: {
                      root: {
                        '& .MuiAutocomplete-tag': {
                          background: 'dark' === a ? e.palette.text.primary + 20 : e.palette.secondary.light,
                          borderRadius: 4,
                          color: e.palette.text.dark,
                          '.MuiChip-deleteIcon': { color: 'dark' === a ? e.palette.text.primary + 80 : e.palette.secondary[200] }
                        }
                      },
                      popper: {
                        borderRadius: ''.concat(t, 'px'),
                        boxShadow:
                          '0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%)'
                      }
                    }
                  },
                  MuiDivider: { styleOverrides: { root: { borderColor: e.palette.divider, opacity: 'dark' === a ? 0.2 : 1 } } },
                  MuiSelect: { styleOverrides: { select: { '&:focus': { backgroundColor: 'transparent' } } } },
                  MuiAvatar: {
                    styleOverrides: {
                      root: {
                        color: 'dark' === a ? e.palette.dark.main : e.palette.primary.dark,
                        background: 'dark' === a ? e.palette.text.primary : e.palette.primary[200]
                      }
                    }
                  },
                  MuiChip: { styleOverrides: { root: { '&.MuiChip-deletable .MuiChip-deleteIcon': { color: 'inherit' } } } },
                  MuiTimelineContent: { styleOverrides: { root: { color: e.palette.text.dark, fontSize: '16px' } } },
                  MuiTreeItem: { styleOverrides: { label: { marginTop: 14, marginBottom: 14 } } },
                  MuiTimelineDot: { styleOverrides: { root: { boxShadow: 'none' } } },
                  MuiInternalDateTimePickerTabs: {
                    styleOverrides: {
                      tabs: {
                        backgroundColor: 'dark' === a ? e.palette.dark[900] : e.palette.primary.light,
                        '& .MuiTabs-flexContainer': { borderColor: 'dark' === a ? e.palette.text.primary + 20 : e.palette.primary[200] },
                        '& .MuiTab-root': { color: 'dark' === a ? e.palette.text.secondary : e.palette.grey[900] },
                        '& .MuiTabs-indicator': { backgroundColor: e.palette.primary.dark },
                        '& .Mui-selected': { color: e.palette.primary.dark }
                      }
                    }
                  },
                  MuiTabs: {
                    styleOverrides: {
                      flexContainer: {
                        borderBottom: '1px solid',
                        borderColor: 'dark' === a ? e.palette.text.primary + 20 : e.palette.grey[200]
                      }
                    }
                  },
                  MuiDialog: { styleOverrides: { paper: { padding: '12px 0 12px 0' } } },
                  MuiTableCell: {
                    styleOverrides: {
                      root: {
                        borderColor: 'dark' === a ? e.palette.text.primary + 15 : e.palette.grey[200],
                        '&.MuiTableCell-head': { fontSize: '0.875rem', color: e.palette.grey[600], fontWeight: 500 }
                      }
                    }
                  },
                  MuiTooltip: { styleOverrides: { tooltip: { color: e.palette.background.paper, background: e.palette.text.primary } } },
                  MuiDialogTitle: { styleOverrides: { root: { fontSize: '1.25rem' } } }
                };
              })(j, a, i);
            },
            [j, a, i]
          )),
          Object(m.jsx)(ft.a, { injectFirst: !0, children: Object(m.jsxs)(Ot.a, { theme: j, children: [Object(m.jsx)(A.a, {}), t] }) })
        );
      }
      var It = r(99),
        Mt = r(119),
        zt = r.n(Mt),
        Lt = r(277),
        Pt = r(283),
        Tt = r(295),
        Rt = r(275),
        Dt = r(97);
      var Bt = {
          SlideLeft: function (e) {
            return Object(m.jsx)(ce.a, Object(u.a)(Object(u.a)({}, e), {}, { direction: 'left' }));
          },
          SlideUp: function (e) {
            return Object(m.jsx)(ce.a, Object(u.a)(Object(u.a)({}, e), {}, { direction: 'up' }));
          },
          SlideRight: function (e) {
            return Object(m.jsx)(ce.a, Object(u.a)(Object(u.a)({}, e), {}, { direction: 'right' }));
          },
          SlideDown: function (e) {
            return Object(m.jsx)(ce.a, Object(u.a)(Object(u.a)({}, e), {}, { direction: 'down' }));
          },
          Grow: function (e) {
            return Object(m.jsx)(ne.a, Object(u.a)({}, e));
          },
          Fade: ie.a
        },
        Et = function () {
          var e = Object(Se.d)(),
            t = Object(Se.e)(function (e) {
              return e.snackbar;
            }),
            r = t.actionButton,
            a = t.anchorOrigin,
            n = t.alert,
            o = t.close,
            i = t.message,
            c = t.open,
            l = t.transition,
            s = t.variant,
            d = function (t, r) {
              'clickaway' !== r && e(Object(Dt.a)());
            };
          return Object(m.jsxs)(m.Fragment, {
            children: [
              'default' === s &&
                Object(m.jsx)(Lt.a, {
                  anchorOrigin: a,
                  open: c,
                  autoHideDuration: 6e3,
                  onClose: d,
                  message: i,
                  TransitionComponent: Bt[l],
                  action: Object(m.jsxs)(m.Fragment, {
                    children: [
                      Object(m.jsx)(Pt.a, { color: 'secondary', size: 'small', onClick: d, children: 'UNDO' }),
                      Object(m.jsx)(Tt.a, {
                        size: 'small',
                        'aria-label': 'close',
                        color: 'inherit',
                        onClick: d,
                        sx: { mt: 0.25 },
                        children: Object(m.jsx)(zt.a, { fontSize: 'small' })
                      })
                    ]
                  })
                }),
              'alert' === s &&
                Object(m.jsx)(Lt.a, {
                  TransitionComponent: Bt[l],
                  anchorOrigin: a,
                  open: c,
                  autoHideDuration: 6e3,
                  onClose: d,
                  children: Object(m.jsx)(Rt.a, {
                    variant: n.variant,
                    color: n.color,
                    action: Object(m.jsxs)(m.Fragment, {
                      children: [
                        !1 !== r && Object(m.jsx)(Pt.a, { size: 'small', onClick: d, sx: { color: 'background.paper' }, children: 'UNDO' }),
                        !1 !== o &&
                          Object(m.jsx)(Tt.a, {
                            sx: { color: 'background.paper' },
                            size: 'small',
                            'aria-label': 'close',
                            onClick: d,
                            children: Object(m.jsx)(zt.a, { fontSize: 'small' })
                          })
                      ]
                    }),
                    sx: Object(u.a)({}, 'outlined' === n.variant && { bgcolor: 'background.paper' }),
                    children: i
                  })
                })
            ]
          });
        },
        Ft = function () {
          return Object(m.jsx)(At, {
            children: Object(m.jsx)(xt, {
              children: Object(m.jsx)(f, {
                children: Object(m.jsx)(y, {
                  children: Object(m.jsx)(It.a, {
                    children: Object(m.jsxs)(m.Fragment, { children: [Object(m.jsx)(bt, {}), Object(m.jsx)(Et, {})] })
                  })
                })
              })
            })
          });
        },
        Wt = function (e) {
          e &&
            e instanceof Function &&
            r
              .e(14)
              .then(r.bind(null, 504))
              .then(function (t) {
                var r = t.getCLS,
                  a = t.getFID,
                  n = t.getFCP,
                  o = t.getLCP,
                  i = t.getTTFB;
                r(e), a(e), n(e), o(e), i(e);
              });
        };
      Boolean(
        'localhost' === window.location.hostname ||
          '[::1]' === window.location.hostname ||
          window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
      );
      n.a.render(
        Object(m.jsx)(i.a, {
          store: Se.c,
          children: Object(m.jsx)(c.a, {
            loading: null,
            persistor: Se.b,
            children: Object(m.jsx)(g, { children: Object(m.jsx)(o.a, { basename: '', children: Object(m.jsx)(Ft, {}) }) })
          })
        }),
        document.getElementById('root')
      ),
        'serviceWorker' in navigator &&
          navigator.serviceWorker.ready
            .then(function (e) {
              e.unregister();
            })
            .catch(function (e) {
              console.error(e.message);
            }),
        Wt();
    },
    43: function (e, t, r) {
      'use strict';
      r.d(t, 'b', function () {
        return a;
      }),
        r.d(t, 'a', function () {
          return n;
        });
      var a = 3,
        n = 260;
    },
    45: function (e, t, r) {
      'use strict';
      r.d(t, 'a', function () {
        return i;
      }),
        r.d(t, 'c', function () {
          return c;
        });
      var a = r(44),
        n = Object(a.b)({
          name: 'menu',
          initialState: { openItem: ['dashboard'], drawerOpen: !1 },
          reducers: {
            activeItem: function (e, t) {
              e.openItem = t.payload;
            },
            openDrawer: function (e, t) {
              e.drawerOpen = t.payload;
            }
          }
        });
      t.b = n.reducer;
      var o = n.actions,
        i = o.activeItem,
        c = o.openDrawer;
    },
    50: function (e, t, r) {
      'use strict';
      var a = r(159),
        n = r.n(a).a.create();
      n.interceptors.response.use(
        function (e) {
          return e;
        },
        function (e) {
          return Promise.reject((e.response && e.response.data) || 'Wrong Services');
        }
      ),
        (t.a = n);
    },
    67: function (e, t, r) {
      'use strict';
      var a = r(0),
        n = r(99);
      t.a = function () {
        var e = Object(a.useContext)(n.b);
        if (!e) throw new Error('context must be use inside provider');
        return e;
      };
    },
    96: function (e, t, r) {
      'use strict';
      var a = r(228),
        n = r(7),
        o = r(1),
        i = Object(n.a)('div')({ position: 'fixed', top: 0, left: 0, zIndex: 1301, width: '100%' });
      t.a = function () {
        return Object(o.jsx)(i, { children: Object(o.jsx)(a.a, { color: 'primary' }) });
      };
    },
    97: function (e, t, r) {
      'use strict';
      r.d(t, 'a', function () {
        return c;
      });
      var a = r(44),
        n = {
          action: !1,
          open: !1,
          message: 'Note archived',
          anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
          variant: 'default',
          alert: { color: 'primary', variant: 'filled' },
          transition: 'Fade',
          close: !0,
          actionButton: !1
        },
        o = Object(a.b)({
          name: 'snackbar',
          initialState: n,
          reducers: {
            openSnackbar: function (e, t) {
              var r = t.payload,
                a = r.open,
                o = r.message,
                i = r.anchorOrigin,
                c = r.variant,
                l = r.alert,
                s = r.transition,
                d = r.close,
                p = r.actionButton;
              (e.action = !e.action),
                (e.open = a || n.open),
                (e.message = o || n.message),
                (e.anchorOrigin = i || n.anchorOrigin),
                (e.variant = c || n.variant),
                (e.alert = {
                  color: (null === l || void 0 === l ? void 0 : l.color) || n.alert.color,
                  variant: (null === l || void 0 === l ? void 0 : l.variant) || n.alert.variant
                }),
                (e.transition = s || n.transition),
                (e.close = !1 === d ? d : n.close),
                (e.actionButton = p || n.actionButton);
            },
            closeSnackbar: function (e) {
              e.open = !1;
            }
          }
        });
      t.b = o.reducer;
      var i = o.actions,
        c = i.closeSnackbar;
      i.openSnackbar;
    },
    99: function (e, t, r) {
      'use strict';
      r.d(t, 'a', function () {
        return k;
      });
      var a = r(6),
        n = r(48),
        o = r(12),
        i = r(33),
        c = r.n(i),
        l = r(158),
        s = r(0),
        d = 'LOGIN',
        p = 'LOGOUT',
        u = { isLoggedIn: !1, isInitialized: !1, user: null },
        b = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : u,
            t = arguments.length > 1 ? arguments[1] : void 0;
          switch (t.type) {
            case d:
              var r = t.payload,
                n = r.user;
              return Object(a.a)(Object(a.a)({}, e), {}, { isLoggedIn: !0, isInitialized: !0, user: n });
            case p:
              return Object(a.a)(Object(a.a)({}, e), {}, { isInitialized: !0, isLoggedIn: !1, user: null });
            default:
              return Object(a.a)({}, e);
          }
        },
        j = r(50),
        m = r(96),
        h = r(1),
        x = ''.concat('http://13.251.110.92/api', '/v1/login'),
        g = ''.concat('http://13.251.110.92/api', '/v1/me'),
        O = { isLoggedIn: !1, isInitialized: !1, user: null },
        f = function (e) {
          return !!e && Object(l.a)(e).exp > Date.now() / 1e3;
        },
        v = function (e) {
          e
            ? (localStorage.setItem('serviceToken', e), (j.a.defaults.headers.common.Authorization = 'Bearer '.concat(e)))
            : (localStorage.removeItem('serviceToken'), delete j.a.defaults.headers.common.Authorization);
        },
        y = Object(s.createContext)(null),
        k = function (e) {
          var t = e.children,
            r = Object(s.useReducer)(b, O),
            i = Object(o.a)(r, 2),
            l = i[0],
            u = i[1];
          if (
            (Object(s.useEffect)(function () {
              var e = (function () {
                var e = Object(n.a)(
                  c.a.mark(function e() {
                    var t, r, a;
                    return c.a.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (((e.prev = 0), !(t = window.localStorage.getItem('serviceToken')) || !f(t))) {
                                e.next = 11;
                                break;
                              }
                              return v(t), (e.next = 6), j.a.get(g);
                            case 6:
                              (r = e.sent), (a = r.data.success), u({ type: d, payload: { isLoggedIn: !0, user: a } }), (e.next = 12);
                              break;
                            case 11:
                              u({ type: p });
                            case 12:
                              e.next = 17;
                              break;
                            case 14:
                              (e.prev = 14), (e.t0 = e.catch(0)), u({ type: p });
                            case 17:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      null,
                      [[0, 14]]
                    );
                  })
                );
                return function () {
                  return e.apply(this, arguments);
                };
              })();
              e();
            }, []),
            void 0 !== l.isInitialized && !l.isInitialized)
          )
            return Object(h.jsx)(m.a, {});
          var k = (function () {
            var e = Object(n.a)(
              c.a.mark(function e(t, r) {
                var a, n, o, i;
                return c.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.next = 2), j.a.post(x, { email: t, password: r });
                      case 2:
                        (a = e.sent),
                          (n = a.data.success),
                          (o = n.token),
                          (i = n.user),
                          v(o),
                          u({ type: d, payload: { isLoggedIn: !0, user: i } });
                      case 6:
                      case 'end':
                        return e.stop();
                    }
                }, e);
              })
            );
            return function (t, r) {
              return e.apply(this, arguments);
            };
          })();
          return Object(h.jsx)(y.Provider, {
            value: Object(a.a)(
              Object(a.a)({}, l),
              {},
              {
                login: k,
                logout: function () {
                  v(null), u({ type: p });
                }
              }
            ),
            children: t
          });
        };
      t.b = y;
    }
  },
  [[210, 5, 6]]
]);
//# sourceMappingURL=main.25b8394d.chunk.js.map
