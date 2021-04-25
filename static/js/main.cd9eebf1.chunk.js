(this["webpackJsonpsensor-monitoring-app"]=this["webpackJsonpsensor-monitoring-app"]||[]).push([[0],{266:function(e,t,n){},672:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(12),c=n.n(r),s=(n(266),n(163)),l=n(14),o=n(77),j=n(62),d=n(13),b=n(5),p=n(710),u=n(26),h=n(730),x=n(715),O=n(716),m=n(719),g=n(714),f=n(122),v=n(718),w=n(717),C=n(240),y=n.n(C),R=n(242),S=n.n(R),N=n(241),k=n.n(N),T=n(675),B=n(720),F=n(721),L=n(237),M=n.n(L),I=n(238),P=n.n(I),W=n(239),z=n.n(W),A=n(4),D=240,J=Object(p.a)((function(e){return{root:{display:"flex"},appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:D,width:"calc(100% - ".concat(D,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:36},hide:{display:"none"},drawer:{width:D,flexShrink:0,whiteSpace:"nowrap"},drawerOpen:{width:D,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerClose:Object(d.a)({transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),overflowX:"hidden",width:e.spacing(7)+1},e.breakpoints.up("sm"),{width:e.spacing(9)+1}),toolbar:Object(j.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:e.spacing(0,1)},e.mixins.toolbar),content:{flexGrow:1,padding:e.spacing(3)}}}));function G(e){var t,n,a=e.pageTitle,r=J(),c=Object(u.a)(),s=i.a.useState(!1),l=Object(o.a)(s,2),j=l[0],p=l[1],C=[{label:"Data Overview",link:"/",icon:Object(A.jsx)(M.a,{})},{label:"Building Plan",link:"/plan",icon:Object(A.jsx)(P.a,{})},{label:"Warnings",link:"/warnings",icon:Object(A.jsx)(z.a,{})}];return Object(A.jsxs)("div",{className:r.root,children:[Object(A.jsx)(g.a,{}),Object(A.jsx)(x.a,{position:"fixed",className:Object(b.a)(r.appBar,Object(d.a)({},r.appBarShift,j)),children:Object(A.jsxs)(O.a,{children:[Object(A.jsx)(w.a,{color:"inherit","aria-label":"open drawer",onClick:function(){p(!0)},edge:"start",className:Object(b.a)(r.menuButton,Object(d.a)({},r.hide,j)),children:Object(A.jsx)(y.a,{})}),Object(A.jsx)(f.a,{variant:"h6",noWrap:!0,children:a})]})}),Object(A.jsxs)(h.a,{variant:"permanent",className:Object(b.a)(r.drawer,(t={},Object(d.a)(t,r.drawerOpen,j),Object(d.a)(t,r.drawerClose,!j),t)),classes:{paper:Object(b.a)((n={},Object(d.a)(n,r.drawerOpen,j),Object(d.a)(n,r.drawerClose,!j),n))},children:[Object(A.jsx)("div",{className:r.toolbar,children:Object(A.jsx)(w.a,{onClick:function(){p(!1)},children:"rtl"===c.direction?Object(A.jsx)(k.a,{}):Object(A.jsx)(S.a,{})})}),Object(A.jsx)(v.a,{}),Object(A.jsx)(m.a,{children:C.map((function(e){var t=e.label,n=e.link,a=e.icon;return Object(A.jsxs)(T.a,{button:!0,component:"a",href:n,children:[Object(A.jsx)(B.a,{children:a}),Object(A.jsx)(F.a,{primary:t})]},t)}))})]})]})}var H=function(){return Object(A.jsx)("div",{children:Object(A.jsx)(G,{pageTitle:"Building Plan"})})},V=n(246),E={labels:["January","February","March","April","May"],datasets:[{label:"Rainfall",backgroundColor:"rgba(75,192,192,1)",borderColor:"rgba(0,0,0,1)",borderWidth:2,data:[65,59,80,81,56]}]};var X=function(){return Object(A.jsx)("div",{children:Object(A.jsx)(V.a,{data:E,options:{title:{display:!0,text:"Average Rainfall per month",fontSize:20},legend:{display:!0,position:"right"}}})})},q=(n(377),n(722)),K=n(731),Q=n(727),U=n(725),Y=Object(p.a)((function(e){return{formControl:{margin:e.spacing(3),minWidth:250}}}));var Z=function(){var e=Y(),t=i.a.useState(""),n=Object(o.a)(t,2),a=n[0],r=n[1];return Object(A.jsx)(A.Fragment,{children:Object(A.jsxs)(q.a,{variant:"outlined",className:e.formControl,children:[Object(A.jsx)(K.a,{id:"demo-simple-select-filled-label",children:"Select Measurement"}),Object(A.jsxs)(Q.a,{labelId:"demo-simple-select-filled-label",id:"demo-simple-select-filled",value:a,onChange:function(e){r(e.target.value)},options:["C02","Temperature","Moisture"],label:"Select Measurement",children:[Object(A.jsx)(U.a,{value:"",children:Object(A.jsx)("em",{children:"None"})}),Object(A.jsx)(U.a,{value:"C02",children:"C02"}),Object(A.jsx)(U.a,{value:"Temperature",children:"Temperature"}),Object(A.jsx)(U.a,{value:"Moisture",children:"Moisture"})]})]})})},$=n(733),_=Object(p.a)((function(e){return{textField:{marginLeft:e.spacing(1),marginRight:e.spacing(1),width:265}}}));var ee=function(e){var t=e.label,n=_();return Object(A.jsx)("div",{children:Object(A.jsx)($.a,{id:"datetime-local",label:t,type:"datetime-local",defaultValue:"2017-05-24T10:30",className:n.textField,InputLabelProps:{shrink:!0}})})},te=n(723),ne=n(729),ae=n(734),ie=Object(p.a)((function(e){return{formControl:{margin:e.spacing(1),minWidth:250,maxWidth:300},chips:{display:"flex",flexWrap:"wrap"},chip:{margin:2},noLabel:{marginTop:e.spacing(3)}}})),re={PaperProps:{style:{maxHeight:285,width:250}}},ce=["Room 1","Room 2","Room 3","Room 4","Room 5","Room 6","Room 7","Room 8","Room 9","Room 10"];function se(){var e=ie(),t=i.a.useState([]),n=Object(o.a)(t,2),a=n[0],r=n[1];return Object(A.jsx)("div",{children:Object(A.jsxs)(q.a,{className:e.formControl,children:[Object(A.jsx)(K.a,{id:"demo-mutiple-chip-label",children:"Select Rooms"}),Object(A.jsx)(Q.a,{labelId:"demo-mutiple-chip-label",id:"demo-mutiple-chip",multiple:!0,value:a,onChange:function(e){r(e.target.value)},input:Object(A.jsx)(te.a,{id:"select-multiple-chip"}),renderValue:function(t){return Object(A.jsx)("div",{className:e.chips,children:t.map((function(t){return Object(A.jsx)(ae.a,{label:t,className:e.chip},t)}))})},MenuProps:re,children:ce.map((function(e){return Object(A.jsxs)(U.a,{value:e,children:[Object(A.jsx)(ne.a,{checked:a.indexOf(e)>-1}),Object(A.jsx)(F.a,{primary:e})]},e)}))})]})})}var le=Object(p.a)((function(e){return{timeContainer:{display:"flex",justifyContent:"space-evenly"}}}));var oe=function(){var e=le();return Object(A.jsxs)("div",{children:[Object(A.jsxs)("div",{className:e.timeContainer,children:[Object(A.jsx)(ee,{label:"From"}),Object(A.jsx)(ee,{label:"To"})]}),Object(A.jsx)(v.a,{}),Object(A.jsx)(Z,{}),Object(A.jsx)(se,{})]})},je=n(674),de=n(726),be=Object(p.a)((function(e){return{root:{flexGrow:1,marginTop:"80px",marginLeft:"90px",marginRight:"20px"},paper:{padding:e.spacing(2),textAlign:"center",color:e.palette.text.secondary,minHeight:"300px"}}}));function pe(e){var t=e.contentLeft,n=e.contentRight,a=be();return Object(A.jsx)("div",{className:a.root,children:Object(A.jsxs)(de.a,{container:!0,spacing:3,children:[Object(A.jsx)(de.a,{item:!0,xs:6,children:t.map((function(e){return Object(A.jsx)(je.a,{className:a.paper,children:e})}))}),Object(A.jsx)(de.a,{item:!0,xs:6,children:Object(A.jsx)(je.a,{className:a.paper,children:n})})]})})}var ue=function(){var e=[Object(A.jsx)(oe,{})],t=[Object(A.jsx)(X,{})];return Object(A.jsxs)("div",{children:[Object(A.jsx)(G,{pageTitle:"Data Overview"}),Object(A.jsx)(pe,{contentLeft:e,contentRight:t})]})};var he=function(){return Object(A.jsx)("div",{children:Object(A.jsx)(G,{pageTitle:"Warnings"})})};function xe(){return Object(A.jsx)(s.a,{basename:"/sensor-monitoring-app",children:Object(A.jsx)("div",{children:Object(A.jsxs)(l.c,{children:[Object(A.jsx)(l.a,{path:"/warnings",children:Object(A.jsx)(he,{})}),Object(A.jsx)(l.a,{path:"/plan",children:Object(A.jsx)(H,{})}),Object(A.jsx)(l.a,{exact:!0,path:"/",children:Object(A.jsx)(ue,{})})]})})})}var Oe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,736)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,r=t.getLCP,c=t.getTTFB;n(e),a(e),i(e),r(e),c(e)}))};c.a.render(Object(A.jsx)(i.a.StrictMode,{children:Object(A.jsx)(xe,{})}),document.getElementById("root")),Oe()}},[[672,1,2]]]);
//# sourceMappingURL=main.cd9eebf1.chunk.js.map