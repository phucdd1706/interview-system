(this["webpackJsonpinterview-manager-system"]=this["webpackJsonpinterview-manager-system"]||[]).push([[20],{314:function(e,t,n){"use strict";var i=n(14),a=n(0),l=n.n(a),c=n(334),r=n(289),o=n(1),s=l.a.forwardRef((function(e,t){var n,a,l,s,d=e.children,u=e.type,j=e.direction,b=e.offset,h=e.scale;switch(j){case"up":case"left":l=b,s=0;break;default:l=0,s=b}var v=Object(c.a)(l,s),x=Object(i.a)(v,2),O=x[0],p=x[1],m=Object(c.a)(l,s),f=Object(i.a)(m,2),g=f[0],A=f[1];switch(u){case"rotate":return Object(o.jsx)(r.a.div,{ref:t,animate:{rotate:360},transition:{repeat:1/0,repeatType:"loop",duration:2,repeatDelay:0},children:d});case"slide":return"up"===j||"down"===j?Object(o.jsx)(r.a.div,{ref:t,animate:{y:void 0!==g?g:""},onHoverEnd:function(){return A()},onHoverStart:function(){return A()},children:d}):Object(o.jsx)(r.a.div,{ref:t,animate:{x:void 0!==O?O:""},onHoverEnd:function(){return p()},onHoverStart:function(){return p()},children:d});default:return"number"===typeof h&&(h={hover:h,tap:h}),Object(o.jsx)(r.a.div,{ref:t,whileHover:{scale:null===(n=h)||void 0===n?void 0:n.hover},whileTap:{scale:null===(a=h)||void 0===a?void 0:a.tap},children:d})}}));s.defaultProps={type:"scale",offset:10,direction:"right",scale:{hover:1,tap:.9}},t.a=s},343:function(e,t,n){"use strict";t.a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAiBJREFUWIXtlk1oE0EUx38zu2nSeuhXCJESsWhbRGul2IOi9i5oDhW8iYKCZxFFPKk3Dx5UsJ4tQsCLBz/Qq6BQvCkFEW3BLwhiQmMTaXbGw+7isqm4k6EWtH9Ydve9+c/7z9vZNw/W8b9DRJ47yfacx3X3oVSqZaRSTb4tVvA8L+4B3gA3gLKpADe4SwZyT+WFkxNi51AHUraO/F5H3334VT15fpvP5YuxRewG7gBHgaqJgDDSuDy4f1jsGlk5OMCGTsSpqX4xOnSCrq7xiEcDs8BZ4KpJ8KiAAQr57kSEc8c3kuuZATIx1yvgHTBlIsD985AYMmnkmWNb1ZXpGcqVUsy7AFwK5lUrsDUwB7wODeEmLAIp4J6BlAkgUdYicIEDQAO4HBraxWybvMfANWAQeP+bHbfqeAFsB7sMQDp9mA5HsLh0PyEjD0wCHuDAr7+gHfSLHVtuipHBW0BfQk43MBw12GRAku0FRwosFmIjoMZSXSGkAmprIaBO44cOBDTWQgA0VROpraawE+B5y5gp0MQqpFUd0NVaRVdrFQPKW+B61GCXgYVPk4aMAnAI+BIabDKQItf3gHz2Ef45kgQZoDdqsBFQEHvHtok9Y6P4K2sLNp9gXr+cexYUovmEnGZwtaAIHLEQYwIZxCqGLwAfgU1/SYACNgMf4qpK+M2Cs4rBHfzTsBTEjLXlcBq/w026q02xjN/ITGNRvtfxb+EnALh3/3zr250AAAAASUVORK5CYII="},387:function(e,t,n){},629:function(e,t,n){"use strict";n.r(t);var i=n(6),a=n(19),l=n(14),c=n(8),r=n.n(c),o=n(0),s=n(277),d=n(297),u=n(282),j=n(643),b=n(571),h=n(81),v=n(357),x=n(358),O=n(651),p=n(652),m=n(348),f=n(649),g=n(650),A=n(653),w=n(347),S=n(326),k=n.n(S),y=n(34),C=n(322),E=n.n(C),B=n(125),D=n(9),I=n(132),H=n(293),z=n(311),W=n(569),F=n(648),M=n(299),R=n(305),q=n(323),N=n.n(q),T=n(321),G=n.n(T),L=n(618),Q=n(619),Y=n(318),U=n.n(Y),V=n(615),P=n(272),K=n(300),X=n(237),Z=n(642),J=n(645),_=n(639),$=n(635),ee=n(315),te=n(316),ne=n(314),ie=n(58),ae=n(45),le=n(1),ce=function(e){var t,n,i,a,c,r,b,v,x,O,p,m=e.dataEdit,f=e.visible,g=e.handleVisibleModal,A=e.getList,w=Object(y.a)(),S=Object(s.a)(w.breakpoints.down("md")),k=Object(o.useState)({}),C=Object(l.a)(k,2),E=C[0],B=C[1],H=function(e,t){Object(D.a)(Object(ie.c)({open:!0,message:t,anchorOrigin:{vertical:"top",horizontal:"right"},variant:"alert",alert:{color:e},close:!0}))},z=function(e){"close"===e&&(B({}),g(),M.resetForm())},W=te.c().shape({name:te.e().max(40).required("Name is required"),description:te.e().max(255).required("Description is required")}),M=Object(ee.b)({enableReinitialize:!0,initialValues:{name:null===m||void 0===m?void 0:m.name,description:null===m||void 0===m?void 0:m.description,status:null!==m&&void 0!==m&&m.id?null===m||void 0===m?void 0:m.status:1},validationSchema:W,onSubmit:function(e){!function(e){m.id?Object(D.a)(Object(I.c)({id:m.id,params:e,callback:function(e){var t;null!==e&&void 0!==e&&null!==(t=e.data)&&void 0!==t&&t.success?(H("success","Edit language successfully!"),z("close")):(H("error",null===e||void 0===e?void 0:e.message),B(null===e||void 0===e?void 0:e.errors))}})):Object(D.a)(Object(I.a)({params:e,callback:function(e){var t;null!==e&&void 0!==e&&null!==(t=e.data)&&void 0!==t&&t.success?(A(),H("success","Add language successfully!"),z("close")):(H("error",null===e||void 0===e?void 0:e.message),B(null===e||void 0===e?void 0:e.errors))}}))}(e)}});return Object(le.jsx)(V.a,{open:f,onClose:function(){z("close")},fullScreen:S,sx:{"&>div:nth-of-type(3)":{"&>div":{m:0,borderRadius:"0px",width:S?"100%":850,maxHeight:"100%"}}},children:f&&Object(le.jsxs)(le.Fragment,{children:[Object(le.jsx)(P.a,{sx:{p:3},children:Object(le.jsx)(d.a,{container:!0,alignItems:"center",spacing:.5,justifyContent:"space-between",children:Object(le.jsx)(d.a,{item:!0,sx:{width:"100%"},children:Object(le.jsxs)(u.a,{direction:"row",spacing:.5,alignItems:"center",children:[Object(le.jsx)(h.a,{variant:"h4",sx:{display:"inline-block",width:"calc(100% - 34px)",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden",verticalAlign:"middle"},children:null!==m&&void 0!==m&&m.id?"Edit ".concat(null===m||void 0===m?void 0:m.name):"Add new language"}),Object(le.jsx)(K.a,{variant:"text",color:"error",sx:{p:.5,minWidth:32,display:{xs:"block",md:"none"}},onClick:function(){return z("close")},children:Object(le.jsx)(U.a,{})})]})})})}),Object(le.jsx)(X.a,{}),Object(le.jsx)("form",{onSubmit:M.handleSubmit,children:Object(le.jsx)(Z.a,{children:Object(le.jsxs)(d.a,{container:!0,spacing:ae.b,sx:{mt:.25},children:[Object(le.jsx)(d.a,{item:!0,xs:12,xl:12,children:Object(le.jsx)(j.a,{id:"name",name:"name",value:null===M||void 0===M||null===(t=M.values)||void 0===t?void 0:t.name,label:Object(le.jsxs)("span",{children:[Object(le.jsx)("span",{style:{color:"#f44336"},children:"*"})," Name"]}),fullWidth:!0,onChange:M.handleChange,error:(null===M||void 0===M||null===(n=M.touched)||void 0===n?void 0:n.name)&&Boolean(null===M||void 0===M||null===(i=M.errors)||void 0===i?void 0:i.name)||(null===E||void 0===E?void 0:E.name),helperText:(null===M||void 0===M||null===(a=M.touched)||void 0===a?void 0:a.name)&&(null===M||void 0===M||null===(c=M.errors)||void 0===c?void 0:c.name)||(null===E||void 0===E?void 0:E.name)})}),Object(le.jsx)(d.a,{item:!0,xs:12,xl:12,children:Object(le.jsx)(j.a,{id:"description",name:"description",value:null===M||void 0===M||null===(r=M.values)||void 0===r?void 0:r.description,label:Object(le.jsxs)("span",{children:[Object(le.jsx)("span",{style:{color:"#f44336"},children:"*"})," Description"]}),fullWidth:!0,onChange:M.handleChange,error:(null===M||void 0===M||null===(b=M.touched)||void 0===b?void 0:b.description)&&Boolean(null===M||void 0===M||null===(v=M.errors)||void 0===v?void 0:v.description)||(null===E||void 0===E?void 0:E.description),helperText:(null===M||void 0===M||null===(x=M.touched)||void 0===x?void 0:x.description)&&(null===M||void 0===M||null===(O=M.errors)||void 0===O?void 0:O.description)||(null===E||void 0===E?void 0:E.description)})}),m.id&&Object(le.jsx)(d.a,{item:!0,xs:12,children:Object(le.jsxs)(J.a,{fullWidth:!0,children:[Object(le.jsx)(_.a,{children:"Status"}),Object(le.jsx)($.a,{id:"status",name:"status",label:"Status",displayEmpty:!0,value:null===M||void 0===M||null===(p=M.values)||void 0===p?void 0:p.status,onChange:M.handleChange,inputProps:{"aria-label":"Without label"},children:[{value:0,label:"Inactive"},{value:1,label:"Active"}].map((function(e,t){return Object(le.jsx)(F.a,{value:e.value,children:e.label},t)}))})]})}),Object(le.jsx)(d.a,{item:!0,xs:12,children:Object(le.jsx)(ne.a,{children:Object(le.jsx)(K.a,{fullWidth:!0,variant:"contained",type:"submit",children:"Save"})})})]})})})]})})},re=n(355),oe=n(647);function se(e){var t=e.name,n=e.open,i=e.handleClose;return Object(le.jsx)(V.a,{open:n,onClose:function(){return i(!1)},keepMounted:!0,maxWidth:"xs","aria-labelledby":"item-delete-title","aria-describedby":"item-delete-description",children:n&&Object(le.jsxs)(le.Fragment,{children:[Object(le.jsxs)(re.a,{id:"item-delete-title",children:[t," - Are you sure you want to delete?"]})," ",Object(le.jsxs)(oe.a,{sx:{mr:2},children:[Object(le.jsx)(K.a,{onClick:function(){return i(!1)},color:"error",children:"Cancel"}),Object(le.jsx)(K.a,{variant:"contained",size:"small",onClick:function(){return i(!0)},autoFocus:!0,children:"Delete"})]})]})})}var de=function(e){var t,n=e.language,i=e.index,a=e.getList,c=Object(y.a)(),r=Object(o.useState)(!1),s=Object(l.a)(r,2),d=s[0],j=s[1],b=Object(o.useState)(null),v=Object(l.a)(b,2),x=v[0],O=v[1],p=Object(o.useState)(!1),m=Object(l.a)(p,2),A=m[0],w=m[1],S=Object(D.e)((function(e){return e.language})),k=function(e){O(e.currentTarget)},C=function(){O(null)},E=function(e,t){Object(D.a)(Object(ie.c)({open:!0,message:t,anchorOrigin:{vertical:"top",horizontal:"right"},variant:"alert",alert:{color:e},close:!0}))};return Object(le.jsxs)(le.Fragment,{children:[Object(le.jsxs)(f.a,{hover:!0,children:[Object(le.jsx)(g.a,{sx:{width:"5%",pl:3},children:Object(le.jsx)(u.a,{direction:"row",spacing:.5,alignItems:"center",children:Object(le.jsx)(h.a,{variant:"body2",children:i+20*((null===S||void 0===S?void 0:S.currentPage)-1)+1})})}),Object(le.jsx)(g.a,{sx:{width:"20%",overflow:"hidden"},component:"th",scope:"row",children:Object(le.jsx)(R.a,{underline:"hover",color:"default",sx:{overflow:"hidden",display:"block",textOverflow:"ellipsis",whiteSpace:"nowrap",":hover":{color:"primary.main"},cursor:"pointer"},children:null===n||void 0===n?void 0:n.name})}),Object(le.jsx)(g.a,{sx:{width:"35%",overflow:"hidden"},children:null===n||void 0===n?void 0:n.description}),Object(le.jsx)(g.a,{sx:{width:"15%"},children:N()(null===n||void 0===n?void 0:n.created_at).format("DD/MM/YYYY HH:mm")}),Object(le.jsx)(g.a,{sx:{width:"10%"},children:(t=null===n||void 0===n?void 0:n.status,Object(le.jsxs)(le.Fragment,{children:[0===t&&Object(le.jsx)(M.a,{label:"Inactive",size:"small",sx:{background:"dark"===c.palette.mode?c.palette.dark.main:c.palette.warning.light,color:c.palette.warning.dark}}),1===t&&Object(le.jsx)(M.a,{label:"Active",size:"small",sx:{background:"dark"===c.palette.mode?c.palette.dark.main:c.palette.success.light+60,color:c.palette.success.dark}})]}))}),Object(le.jsx)(g.a,{sx:{width:"10%"},align:"center",children:Object(le.jsxs)(le.Fragment,{children:[Object(le.jsx)(H.a,{className:"more-button",sx:{borderRadius:"12px"},onClick:k,"aria-controls":"menu-comment","aria-haspopup":"true",children:Object(le.jsx)(z.a,{component:"span",size:"small",disableRipple:!0,children:Object(le.jsx)(G.a,{fontSize:"inherit"})})}),Object(le.jsxs)(W.a,{id:"menu-comment",anchorEl:x,keepMounted:!0,open:Boolean(x),onClose:C,variant:"selectedMenu",anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},children:[Object(le.jsxs)(F.a,{onClick:function(){C(),j(!d)},children:[Object(le.jsx)(L.a,{fontSize:"small",sx:{color:"#2196f3",mr:1}}),"Edit"]}),Object(le.jsxs)(F.a,{onClick:function(e){C(),w(!0)},children:[Object(le.jsx)(Q.a,{fontSize:"small",sx:{color:"#f44336",mr:1}}),"Delete"]})]})]})}),A&&Object(le.jsx)(se,{name:null===n||void 0===n?void 0:n.name,open:A,handleClose:function(e){w(!1),e&&Object(D.a)(Object(I.g)({id:n.id,callback:function(e){var t;null!==e&&void 0!==e&&null!==(t=e.data)&&void 0!==t&&t.success?(a(),E("success","Delete record successfully!")):E("error",null===e||void 0===e?void 0:e.message)}}))}})]},null===n||void 0===n?void 0:n.id),Object(le.jsx)(ce,{visible:d,dataEdit:n,handleVisibleModal:function(){j((function(e){return!e}))},getList:function(){return a()}})]})},ue=n(317),je=n.n(ue),be=[{value:"",label:"All"},{value:0,label:"Inactive"},{value:1,label:"Active"}],he=function(e){var t,n=Object(y.a)(),i=e.filters,a=e.handleSortClick,l=e.anchorElSort,c=e.handleSort,r=e.handleCloseSort,o=null===be||void 0===be?void 0:be.filter((function(e){return e.value===i.status})),d=Object(s.a)(n.breakpoints.down("md")),j=Boolean(l);return Object(le.jsxs)(u.a,{direction:"row",alignItems:"center",justifyContent:"center",sx:{display:"flex"},children:[!d&&Object(le.jsx)(h.a,{variant:"h5",children:"Sort by: "}),Object(le.jsx)(K.a,{id:"demo-positioned-button","aria-controls":"demo-positioned-menu","aria-haspopup":"true","aria-expanded":j?"true":void 0,onClick:c,sx:{color:"grey.500",fontWeight:400},endIcon:Object(le.jsx)(je.a,{}),children:(null===o||void 0===o?void 0:o.length)>0&&(null===(t=o[0])||void 0===t?void 0:t.label)}),Object(le.jsx)(W.a,{id:"demo-positioned-menu","aria-labelledby":"demo-positioned-button",anchorEl:l,open:j,onClose:r,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},children:null===be||void 0===be?void 0:be.map((function(e,t){return Object(le.jsx)(F.a,{sx:{p:1.5},selected:e.value===i.status,onClick:function(t){return a(t,e.value)},children:e.label},t)}))})]})},ve=(n(387),n(343));t.default=function(){var e=Object(D.d)(),t=Object(y.a)(),n=Object(s.a)(t.breakpoints.down("md")),c=Object(s.a)(t.breakpoints.down("lg")),S=c?1:1.5,C=Object(D.e)((function(e){return e.language})),H=Object(o.useState)([]),z=Object(l.a)(H,2),W=z[0],F=z[1],M=Object(o.useState)(!1),R=Object(l.a)(M,2),q=R[0],N=R[1],T=Object(o.useState)(null),G=Object(l.a)(T,2),L=G[0],Q=G[1],Y=Object(o.useState)({search:"",status:"",currentPage:1,limit:20}),U=Object(l.a)(Y,2),V=U[0],P=U[1];Object(o.useEffect)((function(){F(C.language)}),[C]),Object(o.useEffect)((function(){K()}),[]),Object(o.useEffect)((function(){X()}),[V]);var K=function(){e(Object(I.d)({params:V}))},X=function(){var t=Object(a.a)(r.a.mark((function t(){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e(Object(I.d)({params:V}));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),Z=function(e,t){P(Object(i.a)(Object(i.a)({},V),{},{status:t})),Q(null)},J=function(){var e=Object(a.a)(r.a.mark((function e(t){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=null===t||void 0===t?void 0:t.target.value,P(Object(i.a)(Object(i.a)({},V),{},{search:n}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),_=function(e){Q(e.currentTarget)},$=function(){Q(null)},ee=function(){N(!q)};return Object(le.jsxs)(le.Fragment,{children:[Object(le.jsxs)(B.a,{title:Object(le.jsxs)(d.a,{container:!0,spacing:2,children:[Object(le.jsx)(d.a,{item:!0,xs:12,sm:6,children:Object(le.jsx)(d.a,{container:!0,alignItems:"center",justifyContent:"space-between",spacing:c?.5:2,children:Object(le.jsx)(d.a,{item:!0,children:Object(le.jsxs)(u.a,{direction:"row",alignItems:"center",justifyContent:"center",spacing:n?2:S,children:[Object(le.jsx)(j.a,{sx:{width:{xs:140,md:"auto"}},InputProps:{startAdornment:Object(le.jsx)(b.a,{position:"start",children:Object(le.jsx)(E.a,{fontSize:"small"})})},value:V.search,placeholder:"Search....",size:"small",onChange:J}),Object(le.jsx)(h.a,{sx:{display:"flex",fontSize:"1rem",color:"grey.500",fontWeight:400},children:"|"}),Object(le.jsx)(he,{filters:V,anchorElSort:L,handleSort:_,handleCloseSort:$,handleSortClick:Z})]})})})}),Object(le.jsx)(d.a,{item:!0,xs:12,sm:6,sx:{textAlign:"right"},children:Object(le.jsx)(v.a,{title:"Add",children:Object(le.jsx)(x.a,{color:"primary",size:"small",onClick:ee,sx:{boxShadow:"none",ml:1,width:32,height:32,minHeight:32},children:Object(le.jsx)(k.a,{fontSize:"small"})})})})]}),content:!1,children:[Object(le.jsx)(O.a,{children:Object(le.jsxs)(p.a,{children:[Object(le.jsx)(m.a,{children:Object(le.jsxs)(f.a,{children:[Object(le.jsx)(g.a,{sx:{pl:3,width:"5%"},children:"#"}),Object(le.jsx)(g.a,{sx:{width:"20%"},children:"Name"}),Object(le.jsx)(g.a,{sx:{width:"35%"},children:"Description"}),Object(le.jsx)(g.a,{sx:{width:"15%"},children:"Created"}),Object(le.jsx)(g.a,{sx:{width:"10%"},children:"Status"}),Object(le.jsx)(g.a,{align:"center",sx:{pr:3,width:"10%"},children:"Actions"})]})}),Object(le.jsx)(A.a,{sx:{"& th,& td":{whiteSpace:"nowrap"}},children:null===W||void 0===W?void 0:W.map((function(e,t){return Object(le.jsx)(de,{language:e,index:t,getList:function(){return K()}},null===e||void 0===e?void 0:e.id)}))})]})}),0===(null===W||void 0===W?void 0:W.length)&&Object(le.jsxs)("div",{className:"noData",children:[Object(le.jsx)("img",{src:ve.a,alt:"NoDataImg",style:{marginRight:n?8:16}}),Object(le.jsx)("p",{children:"No data available"})]}),(null===W||void 0===W?void 0:W.length)>0&&Object(le.jsx)(d.a,{item:!0,xs:12,sx:{p:3,pl:n?0:3},children:Object(le.jsx)(d.a,{container:!0,justifyContent:"space-between",spacing:ae.b,children:Object(le.jsx)(d.a,{item:!0,children:Object(le.jsx)(w.a,{size:n?"small":"medium",count:null===C||void 0===C?void 0:C.pageCount,page:null===C||void 0===C?void 0:C.currentPage,color:"primary",onChange:function(e,t){P(Object(i.a)(Object(i.a)({},V),{},{currentPage:t}))}})})})})]}),Object(le.jsx)(ce,{visible:q,dataEdit:{},handleVisibleModal:function(){N((function(e){return!e}))},getList:function(){return K()}})]})}}}]);
//# sourceMappingURL=20.8e5cae1b.chunk.js.map