import{ad as ee,m as O,ae as pe,M as oe,k as ro,N as J,z as be,E as b,C as y,af as Ve,S as B,H as w,D as Ye,G as io,g as te,y as f,I as Ce,J as V,ab as Xe,K as xe,i as F,ag as Ke,P as Q,B as lo,Q as Ue,Y as A,U as ao,ah as so,ai as co,aj as uo,ak as Re,l as fo,al as go,am as vo,a0 as ho,an as ge,a1 as qe,ao as Pe,O as ve,a9 as Be,V as U,a2 as $e,T as Z,ap as mo}from"./index-D7P4uqD-.js";import{o as N,d as W,i as po,a as H,e as _,S as Ge,b as X,k as ye,r as Oe,s as bo,g as Co}from"./Scrollbar-CdqXPTRM.js";import{g as Je,f as xo}from"./fade-in.cssr-CCpMT8qc.js";import{b as yo,B as Fe}from"./Button-DXVu3i_o.js";import{i as Qe,h as Ze,g as wo,F as So,c as ko,k as he,m as eo,a as zo,d as Ro,p as Po,f as Bo,L as $o,z as Oo,b as Fo}from"./Tag-BsPE1bgf.js";import{e as Mo}from"./index-DsSU6HIH.js";const K=O(null);function Me(e){if(e.clientX>0||e.clientY>0)K.value={x:e.clientX,y:e.clientY};else{const{target:t}=e;if(t instanceof Element){const{left:n,top:o,width:v,height:g}=t.getBoundingClientRect();n>0||o>0?K.value={x:n+v/2,y:o+g/2}:K.value={x:0,y:0}}else K.value=null}}let q=0,Ee=!0;function Eo(){if(!Qe)return ee(O(null));q===0&&N("click",document,Me,!0);const e=()=>{q+=1};return Ee&&(Ee=Ze())?(pe(e),oe(()=>{q-=1,q===0&&W("click",document,Me,!0)})):e(),ee(K)}const To=O(void 0);let G=0;function Te(){To.value=Date.now()}let je=!0;function jo(e){if(!Qe)return ee(O(!1));const t=O(!1);let n=null;function o(){n!==null&&window.clearTimeout(n)}function v(){o(),t.value=!0,n=window.setTimeout(()=>{t.value=!1},e)}G===0&&N("click",window,Te,!0);const g=()=>{G+=1,N("click",window,v,!0)};return je&&(je=Ze())?(pe(g),oe(()=>{G-=1,G===0&&W("click",window,Te,!0),W("click",window,v,!0),o()})):g(),ee(t)}const we=O(!1);function Ie(){we.value=!0}function He(){we.value=!1}let Y=0;function Io(){return po&&(pe(()=>{Y||(window.addEventListener("compositionstart",Ie),window.addEventListener("compositionend",He)),Y++}),oe(()=>{Y<=1?(window.removeEventListener("compositionstart",Ie),window.removeEventListener("compositionend",He),Y=0):Y--})),we}let D=0,Le="",Ae="",_e="",De="";const Ne=O("0px");function Ho(e){if(typeof document>"u")return;const t=document.documentElement;let n,o=!1;const v=()=>{t.style.marginRight=Le,t.style.overflow=Ae,t.style.overflowX=_e,t.style.overflowY=De,Ne.value="0px"};ro(()=>{n=J(e,g=>{if(g){if(!D){const h=window.innerWidth-t.offsetWidth;h>0&&(Le=t.style.marginRight,t.style.marginRight=`${h}px`,Ne.value=`${h}px`),Ae=t.style.overflow,_e=t.style.overflowX,De=t.style.overflowY,t.style.overflow="hidden",t.style.overflowX="hidden",t.style.overflowY="hidden"}o=!0,D++}else D--,D||v(),o=!1},{immediate:!0})}),oe(()=>{n==null||n(),o&&(D--,D||v(),o=!1)})}const Lo={paddingSmall:"12px 16px 12px",paddingMedium:"19px 24px 20px",paddingLarge:"23px 32px 24px",paddingHuge:"27px 40px 28px",titleFontSizeSmall:"16px",titleFontSizeMedium:"18px",titleFontSizeLarge:"18px",titleFontSizeHuge:"18px",closeIconSize:"18px",closeSize:"22px"};function Ao(e){const{primaryColor:t,borderRadius:n,lineHeight:o,fontSize:v,cardColor:g,textColor2:h,textColor1:C,dividerColor:r,fontWeightStrong:m,closeIconColor:i,closeIconColorHover:c,closeIconColorPressed:u,closeColorHover:p,closeColorPressed:x,modalColor:k,boxShadow1:P,popoverColor:z,actionColor:s}=e;return Object.assign(Object.assign({},Lo),{lineHeight:o,color:g,colorModal:k,colorPopover:z,colorTarget:t,colorEmbedded:s,colorEmbeddedModal:s,colorEmbeddedPopover:s,textColor:h,titleTextColor:C,borderColor:r,actionColor:s,titleFontWeight:m,closeColorHover:p,closeColorPressed:x,closeBorderRadius:n,closeIconColor:i,closeIconColorHover:c,closeIconColorPressed:u,fontSizeSmall:v,fontSizeMedium:v,fontSizeLarge:v,fontSizeHuge:v,boxShadow:P,borderRadius:n})}const oo={name:"Card",common:be,self:Ao},We=y("card-content",`
 flex: 1;
 min-width: 0;
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
`),_o=b([y("card",`
 font-size: var(--n-font-size);
 line-height: var(--n-line-height);
 display: flex;
 flex-direction: column;
 width: 100%;
 box-sizing: border-box;
 position: relative;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 color: var(--n-text-color);
 word-break: break-word;
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[Ve({background:"var(--n-color-modal)"}),B("hoverable",[b("&:hover","box-shadow: var(--n-box-shadow);")]),B("content-segmented",[b(">",[y("card-content",`
 padding-top: var(--n-padding-bottom);
 `),w("content-scrollbar",[b(">",[y("scrollbar-container",[b(">",[y("card-content",`
 padding-top: var(--n-padding-bottom);
 `)])])])])])]),B("content-soft-segmented",[b(">",[y("card-content",`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `),w("content-scrollbar",[b(">",[y("scrollbar-container",[b(">",[y("card-content",`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])])])])])]),B("footer-segmented",[b(">",[w("footer",`
 padding-top: var(--n-padding-bottom);
 `)])]),B("footer-soft-segmented",[b(">",[w("footer",`
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]),b(">",[y("card-header",`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `,[w("main",`
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `),w("extra",`
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),w("close",`
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),w("action",`
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `),We,y("card-content",[b("&:first-child",`
 padding-top: var(--n-padding-bottom);
 `)]),w("content-scrollbar",`
 display: flex;
 flex-direction: column;
 `,[b(">",[y("scrollbar-container",[b(">",[We])])]),b("&:first-child >",[y("scrollbar-container",[b(">",[y("card-content",`
 padding-top: var(--n-padding-bottom);
 `)])])])]),w("footer",`
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `,[b("&:first-child",`
 padding-top: var(--n-padding-bottom);
 `)]),w("action",`
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]),y("card-cover",`
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `,[b("img",`
 display: block;
 width: 100%;
 `)]),B("bordered",`
 border: 1px solid var(--n-border-color);
 `,[b("&:target","border-color: var(--n-color-target);")]),B("action-segmented",[b(">",[w("action",[b("&:not(:first-child)",`
 border-top: 1px solid var(--n-border-color);
 `)])])]),B("content-segmented, content-soft-segmented",[b(">",[y("card-content",`
 transition: border-color 0.3s var(--n-bezier);
 `,[b("&:not(:first-child)",`
 border-top: 1px solid var(--n-border-color);
 `)]),w("content-scrollbar",`
 transition: border-color 0.3s var(--n-bezier);
 `,[b("&:not(:first-child)",`
 border-top: 1px solid var(--n-border-color);
 `)])])]),B("footer-segmented, footer-soft-segmented",[b(">",[w("footer",`
 transition: border-color 0.3s var(--n-bezier);
 `,[b("&:not(:first-child)",`
 border-top: 1px solid var(--n-border-color);
 `)])])]),B("embedded",`
 background-color: var(--n-color-embedded);
 `)]),Ye(y("card",`
 background: var(--n-color-modal);
 `,[B("embedded",`
 background-color: var(--n-color-embedded-modal);
 `)])),io(y("card",`
 background: var(--n-color-popover);
 `,[B("embedded",`
 background-color: var(--n-color-embedded-popover);
 `)]))]),Se={title:[String,Function],contentClass:String,contentStyle:[Object,String],contentScrollable:Boolean,headerClass:String,headerStyle:[Object,String],headerExtraClass:String,headerExtraStyle:[Object,String],footerClass:String,footerStyle:[Object,String],embedded:Boolean,segmented:{type:[Boolean,Object],default:!1},size:String,bordered:{type:Boolean,default:!0},closable:Boolean,hoverable:Boolean,role:String,onClose:[Function,Array],tag:{type:String,default:"div"},cover:Function,content:[String,Function],footer:Function,action:Function,headerExtra:Function,closeFocusable:Boolean},Do=ye(Se),No=Object.assign(Object.assign({},V.props),Se),Wo=te({name:"Card",props:No,slots:Object,setup(e){const t=()=>{const{onClose:c}=e;c&&X(c)},{inlineThemeDisabled:n,mergedClsPrefixRef:o,mergedRtlRef:v,mergedComponentPropsRef:g}=Ce(e),h=V("Card","-card",_o,oo,e,o),C=Xe("Card",v,o),r=F(()=>{var c,u;return e.size||((u=(c=g==null?void 0:g.value)===null||c===void 0?void 0:c.Card)===null||u===void 0?void 0:u.size)||"medium"}),m=F(()=>{const c=r.value,{self:{color:u,colorModal:p,colorTarget:x,textColor:k,titleTextColor:P,titleFontWeight:z,borderColor:s,actionColor:M,borderRadius:E,lineHeight:R,closeIconColor:l,closeIconColorHover:d,closeIconColorPressed:a,closeColorHover:S,closeColorPressed:$,closeBorderRadius:T,closeIconSize:j,closeSize:I,boxShadow:ne,colorPopover:re,colorEmbedded:ie,colorEmbeddedModal:le,colorEmbeddedPopover:ae,[Q("padding",c)]:se,[Q("fontSize",c)]:ce,[Q("titleFontSize",c)]:de},common:{cubicBezierEaseInOut:ue}}=h.value,{top:fe,left:L,bottom:no}=Je(se);return{"--n-bezier":ue,"--n-border-radius":E,"--n-color":u,"--n-color-modal":p,"--n-color-popover":re,"--n-color-embedded":ie,"--n-color-embedded-modal":le,"--n-color-embedded-popover":ae,"--n-color-target":x,"--n-text-color":k,"--n-line-height":R,"--n-action-color":M,"--n-title-text-color":P,"--n-title-font-weight":z,"--n-close-icon-color":l,"--n-close-icon-color-hover":d,"--n-close-icon-color-pressed":a,"--n-close-color-hover":S,"--n-close-color-pressed":$,"--n-border-color":s,"--n-box-shadow":ne,"--n-padding-top":fe,"--n-padding-bottom":no,"--n-padding-left":L,"--n-font-size":ce,"--n-title-font-size":de,"--n-close-size":I,"--n-close-icon-size":j,"--n-close-border-radius":T}}),i=n?xe("card",F(()=>r.value[0]),m,e):void 0;return{rtlEnabled:C,mergedClsPrefix:o,mergedTheme:h,handleCloseClick:t,cssVars:n?void 0:m,themeClass:i==null?void 0:i.themeClass,onRender:i==null?void 0:i.onRender}},render(){const{segmented:e,bordered:t,hoverable:n,mergedClsPrefix:o,rtlEnabled:v,onRender:g,embedded:h,tag:C,$slots:r}=this;return g==null||g(),f(C,{class:[`${o}-card`,this.themeClass,h&&`${o}-card--embedded`,{[`${o}-card--rtl`]:v,[`${o}-card--content-scrollable`]:this.contentScrollable,[`${o}-card--content${typeof e!="boolean"&&e.content==="soft"?"-soft":""}-segmented`]:e===!0||e!==!1&&e.content,[`${o}-card--footer${typeof e!="boolean"&&e.footer==="soft"?"-soft":""}-segmented`]:e===!0||e!==!1&&e.footer,[`${o}-card--action-segmented`]:e===!0||e!==!1&&e.action,[`${o}-card--bordered`]:t,[`${o}-card--hoverable`]:n}],style:this.cssVars,role:this.role},H(r.cover,m=>{const i=this.cover?_([this.cover()]):m;return i&&f("div",{class:`${o}-card-cover`,role:"none"},i)}),H(r.header,m=>{const{title:i}=this,c=i?_(typeof i=="function"?[i()]:[i]):m;return c||this.closable?f("div",{class:[`${o}-card-header`,this.headerClass],style:this.headerStyle,role:"heading"},f("div",{class:`${o}-card-header__main`,role:"heading"},c),H(r["header-extra"],u=>{const p=this.headerExtra?_([this.headerExtra()]):u;return p&&f("div",{class:[`${o}-card-header__extra`,this.headerExtraClass],style:this.headerExtraStyle},p)}),this.closable&&f(Ke,{clsPrefix:o,class:`${o}-card-header__close`,onClick:this.handleCloseClick,focusable:this.closeFocusable,absolute:!0})):null}),H(r.default,m=>{const{content:i}=this,c=i?_(typeof i=="function"?[i()]:[i]):m;return c?this.contentScrollable?f(Ge,{class:`${o}-card__content-scrollbar`,contentClass:[`${o}-card-content`,this.contentClass],contentStyle:this.contentStyle},c):f("div",{class:[`${o}-card-content`,this.contentClass],style:this.contentStyle,role:"none"},c):null}),H(r.footer,m=>{const i=this.footer?_([this.footer()]):m;return i&&f("div",{class:[`${o}-card__footer`,this.footerClass],style:this.footerStyle,role:"none"},i)}),H(r.action,m=>{const i=this.action?_([this.action()]):m;return i&&f("div",{class:`${o}-card__action`,role:"none"},i)}))}}),Vo=lo("n-dialog-provider"),Yo={titleFontSize:"18px",padding:"16px 28px 20px 28px",iconSize:"28px",actionSpace:"12px",contentMargin:"8px 0 16px 0",iconMargin:"0 4px 0 0",iconMarginIconTop:"4px 0 8px 0",closeSize:"22px",closeIconSize:"18px",closeMargin:"20px 26px 0 0",closeMarginIconTop:"10px 16px 0 0"};function Xo(e){const{textColor1:t,textColor2:n,modalColor:o,closeIconColor:v,closeIconColorHover:g,closeIconColorPressed:h,closeColorHover:C,closeColorPressed:r,infoColor:m,successColor:i,warningColor:c,errorColor:u,primaryColor:p,dividerColor:x,borderRadius:k,fontWeightStrong:P,lineHeight:z,fontSize:s}=e;return Object.assign(Object.assign({},Yo),{fontSize:s,lineHeight:z,border:`1px solid ${x}`,titleTextColor:t,textColor:n,color:o,closeColorHover:C,closeColorPressed:r,closeIconColor:v,closeIconColorHover:g,closeIconColorPressed:h,closeBorderRadius:k,iconColor:p,iconColorInfo:m,iconColorSuccess:i,iconColorWarning:c,iconColorError:u,borderRadius:k,titleFontWeight:P})}const to=Ue({name:"Dialog",common:be,peers:{Button:yo},self:Xo}),ke={icon:Function,type:{type:String,default:"default"},title:[String,Function],closable:{type:Boolean,default:!0},negativeText:String,positiveText:String,positiveButtonProps:Object,negativeButtonProps:Object,content:[String,Function],action:Function,showIcon:{type:Boolean,default:!0},loading:Boolean,bordered:Boolean,iconPlacement:String,titleClass:[String,Array],titleStyle:[String,Object],contentClass:[String,Array],contentStyle:[String,Object],actionClass:[String,Array],actionStyle:[String,Object],onPositiveClick:Function,onNegativeClick:Function,onClose:Function,closeFocusable:Boolean},Ko=ye(ke),Uo=b([y("dialog",`
 --n-icon-margin: var(--n-icon-margin-top) var(--n-icon-margin-right) var(--n-icon-margin-bottom) var(--n-icon-margin-left);
 word-break: break-word;
 line-height: var(--n-line-height);
 position: relative;
 background: var(--n-color);
 color: var(--n-text-color);
 box-sizing: border-box;
 margin: auto;
 border-radius: var(--n-border-radius);
 padding: var(--n-padding);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `,[w("icon",`
 color: var(--n-icon-color);
 `),B("bordered",`
 border: var(--n-border);
 `),B("icon-top",[w("close",`
 margin: var(--n-close-margin);
 `),w("icon",`
 margin: var(--n-icon-margin);
 `),w("content",`
 text-align: center;
 `),w("title",`
 justify-content: center;
 `),w("action",`
 justify-content: center;
 `)]),B("icon-left",[w("icon",`
 margin: var(--n-icon-margin);
 `),B("closable",[w("title",`
 padding-right: calc(var(--n-close-size) + 6px);
 `)])]),w("close",`
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 z-index: 1;
 `),w("content",`
 font-size: var(--n-font-size);
 margin: var(--n-content-margin);
 position: relative;
 word-break: break-word;
 `,[B("last","margin-bottom: 0;")]),w("action",`
 display: flex;
 justify-content: flex-end;
 `,[b("> *:not(:last-child)",`
 margin-right: var(--n-action-space);
 `)]),w("icon",`
 font-size: var(--n-icon-size);
 transition: color .3s var(--n-bezier);
 `),w("title",`
 transition: color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `),y("dialog-icon-container",`
 display: flex;
 justify-content: center;
 `)]),Ye(y("dialog",`
 width: 446px;
 max-width: calc(100vw - 32px);
 `)),y("dialog",[Ve(`
 width: 446px;
 max-width: calc(100vw - 32px);
 `)])]),qo={default:()=>f(Re,null),info:()=>f(Re,null),success:()=>f(uo,null),warning:()=>f(co,null),error:()=>f(so,null)},Go=te({name:"Dialog",alias:["NimbusConfirmCard","Confirm"],props:Object.assign(Object.assign({},V.props),ke),slots:Object,setup(e){const{mergedComponentPropsRef:t,mergedClsPrefixRef:n,inlineThemeDisabled:o,mergedRtlRef:v}=Ce(e),g=Xe("Dialog",v,n),h=F(()=>{var p,x;const{iconPlacement:k}=e;return k||((x=(p=t==null?void 0:t.value)===null||p===void 0?void 0:p.Dialog)===null||x===void 0?void 0:x.iconPlacement)||"left"});function C(p){const{onPositiveClick:x}=e;x&&x(p)}function r(p){const{onNegativeClick:x}=e;x&&x(p)}function m(){const{onClose:p}=e;p&&p()}const i=V("Dialog","-dialog",Uo,to,e,n),c=F(()=>{const{type:p}=e,x=h.value,{common:{cubicBezierEaseInOut:k},self:{fontSize:P,lineHeight:z,border:s,titleTextColor:M,textColor:E,color:R,closeBorderRadius:l,closeColorHover:d,closeColorPressed:a,closeIconColor:S,closeIconColorHover:$,closeIconColorPressed:T,closeIconSize:j,borderRadius:I,titleFontWeight:ne,titleFontSize:re,padding:ie,iconSize:le,actionSpace:ae,contentMargin:se,closeSize:ce,[x==="top"?"iconMarginIconTop":"iconMargin"]:de,[x==="top"?"closeMarginIconTop":"closeMargin"]:ue,[Q("iconColor",p)]:fe}}=i.value,L=Je(de);return{"--n-font-size":P,"--n-icon-color":fe,"--n-bezier":k,"--n-close-margin":ue,"--n-icon-margin-top":L.top,"--n-icon-margin-right":L.right,"--n-icon-margin-bottom":L.bottom,"--n-icon-margin-left":L.left,"--n-icon-size":le,"--n-close-size":ce,"--n-close-icon-size":j,"--n-close-border-radius":l,"--n-close-color-hover":d,"--n-close-color-pressed":a,"--n-close-icon-color":S,"--n-close-icon-color-hover":$,"--n-close-icon-color-pressed":T,"--n-color":R,"--n-text-color":E,"--n-border-radius":I,"--n-padding":ie,"--n-line-height":z,"--n-border":s,"--n-content-margin":se,"--n-title-font-size":re,"--n-title-font-weight":ne,"--n-title-text-color":M,"--n-action-space":ae}}),u=o?xe("dialog",F(()=>`${e.type[0]}${h.value[0]}`),c,e):void 0;return{mergedClsPrefix:n,rtlEnabled:g,mergedIconPlacement:h,mergedTheme:i,handlePositiveClick:C,handleNegativeClick:r,handleCloseClick:m,cssVars:o?void 0:c,themeClass:u==null?void 0:u.themeClass,onRender:u==null?void 0:u.onRender}},render(){var e;const{bordered:t,mergedIconPlacement:n,cssVars:o,closable:v,showIcon:g,title:h,content:C,action:r,negativeText:m,positiveText:i,positiveButtonProps:c,negativeButtonProps:u,handlePositiveClick:p,handleNegativeClick:x,mergedTheme:k,loading:P,type:z,mergedClsPrefix:s}=this;(e=this.onRender)===null||e===void 0||e.call(this);const M=g?f(ao,{clsPrefix:s,class:`${s}-dialog__icon`},{default:()=>H(this.$slots.icon,R=>R||(this.icon?A(this.icon):qo[this.type]()))}):null,E=H(this.$slots.action,R=>R||i||m||r?f("div",{class:[`${s}-dialog__action`,this.actionClass],style:this.actionStyle},R||(r?[A(r)]:[this.negativeText&&f(Fe,Object.assign({theme:k.peers.Button,themeOverrides:k.peerOverrides.Button,ghost:!0,size:"small",onClick:x},u),{default:()=>A(this.negativeText)}),this.positiveText&&f(Fe,Object.assign({theme:k.peers.Button,themeOverrides:k.peerOverrides.Button,size:"small",type:z==="default"?"primary":z,disabled:P,loading:P,onClick:p},c),{default:()=>A(this.positiveText)})])):null);return f("div",{class:[`${s}-dialog`,this.themeClass,this.closable&&`${s}-dialog--closable`,`${s}-dialog--icon-${n}`,t&&`${s}-dialog--bordered`,this.rtlEnabled&&`${s}-dialog--rtl`],style:o,role:"dialog"},v?H(this.$slots.close,R=>{const l=[`${s}-dialog__close`,this.rtlEnabled&&`${s}-dialog--rtl`];return R?f("div",{class:l},R):f(Ke,{focusable:this.closeFocusable,clsPrefix:s,class:l,onClick:this.handleCloseClick})}):null,g&&n==="top"?f("div",{class:`${s}-dialog-icon-container`},M):null,f("div",{class:[`${s}-dialog__title`,this.titleClass],style:this.titleStyle},g&&n==="left"?M:null,Oe(this.$slots.header,()=>[A(h)])),f("div",{class:[`${s}-dialog__content`,E?"":`${s}-dialog__content--last`,this.contentClass],style:this.contentStyle},Oe(this.$slots.default,()=>[A(C)])),E)}});function Jo(e){const{modalColor:t,textColor2:n,boxShadow3:o}=e;return{color:t,textColor:n,boxShadow:o}}const Qo=Ue({name:"Modal",common:be,peers:{Scrollbar:bo,Dialog:to,Card:oo},self:Jo}),me="n-draggable";function Zo(e,t){let n;const o=F(()=>e.value!==!1),v=F(()=>o.value?me:""),g=F(()=>{const r=e.value;return r===!0||r===!1?!0:r?r.bounds!=="none":!0});function h(r){const m=r.querySelector(`.${me}`);if(!m||!v.value)return;let i=0,c=0,u=0,p=0,x=0,k=0,P,z=null,s=null;function M(d){d.preventDefault(),P=d;const{x:a,y:S,right:$,bottom:T}=r.getBoundingClientRect();c=a,p=S,i=window.innerWidth-$,u=window.innerHeight-T;const{left:j,top:I}=r.style;x=+I.slice(0,-2),k=+j.slice(0,-2)}function E(){s&&(r.style.top=`${s.y}px`,r.style.left=`${s.x}px`,s=null),z=null}function R(d){if(!P)return;const{clientX:a,clientY:S}=P;let $=d.clientX-a,T=d.clientY-S;g.value&&($>i?$=i:-$>c&&($=-c),T>u?T=u:-T>p&&(T=-p));const j=$+k,I=T+x;s={x:j,y:I},z||(z=requestAnimationFrame(E))}function l(){P=void 0,z&&(cancelAnimationFrame(z),z=null),s&&(r.style.top=`${s.y}px`,r.style.left=`${s.x}px`,s=null),t.onEnd(r)}N("mousedown",m,M),N("mousemove",window,R),N("mouseup",window,l),n=()=>{z&&cancelAnimationFrame(z),W("mousedown",m,M),W("mousemove",window,R),W("mouseup",window,l)}}function C(){n&&(n(),n=void 0)}return fo(C),{stopDrag:C,startDrag:h,draggableRef:o,draggableClassRef:v}}const ze=Object.assign(Object.assign({},Se),ke),et=ye(ze),ot=te({name:"ModalBody",inheritAttrs:!1,slots:Object,props:Object.assign(Object.assign({show:{type:Boolean,required:!0},preset:String,displayDirective:{type:String,required:!0},trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},blockScroll:Boolean,draggable:{type:[Boolean,Object],default:!1},maskHidden:Boolean},ze),{renderMask:Function,onClickoutside:Function,onBeforeLeave:{type:Function,required:!0},onAfterLeave:{type:Function,required:!0},onPositiveClick:{type:Function,required:!0},onNegativeClick:{type:Function,required:!0},onClose:{type:Function,required:!0},onAfterEnter:Function,onEsc:Function}),setup(e){const t=O(null),n=O(null),o=O(e.show),v=O(null),g=O(null),h=ve(eo);let C=null;J(U(e,"show"),a=>{a&&(C=h.getMousePosition())},{immediate:!0});const{stopDrag:r,startDrag:m,draggableRef:i,draggableClassRef:c}=Zo(U(e,"draggable"),{onEnd:a=>{k(a)}}),u=F(()=>$e([e.titleClass,c.value])),p=F(()=>$e([e.headerClass,c.value]));J(U(e,"show"),a=>{a&&(o.value=!0)}),Ho(F(()=>e.blockScroll&&o.value));function x(){if(h.transformOriginRef.value==="center")return"";const{value:a}=v,{value:S}=g;if(a===null||S===null)return"";if(n.value){const $=n.value.containerScrollTop;return`${a}px ${S+$}px`}return""}function k(a){if(h.transformOriginRef.value==="center"||!C||!n.value)return;const S=n.value.containerScrollTop,{offsetLeft:$,offsetTop:T}=a,j=C.y,I=C.x;v.value=-($-I),g.value=-(T-j-S),a.style.transformOrigin=x()}function P(a){Be(()=>{k(a)})}function z(a){a.style.transformOrigin=x(),e.onBeforeLeave()}function s(a){const S=a;i.value&&m(S),e.onAfterEnter&&e.onAfterEnter(S)}function M(){o.value=!1,v.value=null,g.value=null,r(),e.onAfterLeave()}function E(){const{onClose:a}=e;a&&a()}function R(){e.onNegativeClick()}function l(){e.onPositiveClick()}const d=O(null);return J(d,a=>{a&&Be(()=>{const S=a.el;S&&t.value!==S&&(t.value=S)})}),Z(zo,t),Z(Ro,null),Z(Po,null),{mergedTheme:h.mergedThemeRef,appear:h.appearRef,isMounted:h.isMountedRef,mergedClsPrefix:h.mergedClsPrefixRef,bodyRef:t,scrollbarRef:n,draggableClass:c,displayed:o,childNodeRef:d,cardHeaderClass:p,dialogTitleClass:u,handlePositiveClick:l,handleNegativeClick:R,handleCloseClick:E,handleAfterEnter:s,handleAfterLeave:M,handleBeforeLeave:z,handleEnter:P}},render(){const{$slots:e,$attrs:t,handleEnter:n,handleAfterEnter:o,handleAfterLeave:v,handleBeforeLeave:g,preset:h,mergedClsPrefix:C}=this;let r=null;if(!h){if(r=wo("default",e.default,{draggableClass:this.draggableClass}),!r){go("modal","default slot is empty");return}r=vo(r),r.props=ho({class:`${C}-modal`},t,r.props||{})}return this.displayDirective==="show"||this.displayed||this.show?ge(f("div",{role:"none",class:[`${C}-modal-body-wrapper`,this.maskHidden&&`${C}-modal-body-wrapper--mask-hidden`]},f(Ge,{ref:"scrollbarRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:`${C}-modal-scroll-content`},{default:()=>{var m;return[(m=this.renderMask)===null||m===void 0?void 0:m.call(this),f(So,{disabled:!this.trapFocus||this.maskHidden,active:this.show,onEsc:this.onEsc,autoFocus:this.autoFocus},{default:()=>{var i;return f(qe,{name:"fade-in-scale-up-transition",appear:(i=this.appear)!==null&&i!==void 0?i:this.isMounted,onEnter:n,onAfterEnter:o,onAfterLeave:v,onBeforeLeave:g},{default:()=>{const c=[[Pe,this.show]],{onClickoutside:u}=this;return u&&c.push([ko,this.onClickoutside,void 0,{capture:!0}]),ge(this.preset==="confirm"||this.preset==="dialog"?f(Go,Object.assign({},this.$attrs,{class:[`${C}-modal`,this.$attrs.class],ref:"bodyRef",theme:this.mergedTheme.peers.Dialog,themeOverrides:this.mergedTheme.peerOverrides.Dialog},he(this.$props,Ko),{titleClass:this.dialogTitleClass,"aria-modal":"true"}),e):this.preset==="card"?f(Wo,Object.assign({},this.$attrs,{ref:"bodyRef",class:[`${C}-modal`,this.$attrs.class],theme:this.mergedTheme.peers.Card,themeOverrides:this.mergedTheme.peerOverrides.Card},he(this.$props,Do),{headerClass:this.cardHeaderClass,"aria-modal":"true",role:"dialog"}),e):this.childNodeRef=r,c)}})}})]}})),[[Pe,this.displayDirective==="if"||this.displayed||this.show]]):null}}),tt=b([y("modal-container",`
 position: fixed;
 left: 0;
 top: 0;
 height: 0;
 width: 0;
 display: flex;
 `),y("modal-mask",`
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 background-color: rgba(0, 0, 0, .4);
 `,[xo({enterDuration:".25s",leaveDuration:".25s",enterCubicBezier:"var(--n-bezier-ease-out)",leaveCubicBezier:"var(--n-bezier-ease-out)"})]),y("modal-body-wrapper",`
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: visible;
 `,[y("modal-scroll-content",`
 min-height: 100%;
 display: flex;
 position: relative;
 `),B("mask-hidden","pointer-events: none;",[y("modal-scroll-content",[b("> *",`
 pointer-events: all;
 `)])])]),y("modal",`
 position: relative;
 align-self: center;
 color: var(--n-text-color);
 margin: auto;
 box-shadow: var(--n-box-shadow);
 `,[Bo({duration:".25s",enterScale:".5"}),b(`.${me}`,`
 cursor: move;
 user-select: none;
 `)])]),nt=Object.assign(Object.assign(Object.assign(Object.assign({},V.props),{show:Boolean,showMask:{type:Boolean,default:!0},maskClosable:{type:Boolean,default:!0},preset:String,to:[String,Object],displayDirective:{type:String,default:"if"},transformOrigin:{type:String,default:"mouse"},zIndex:Number,autoFocus:{type:Boolean,default:!0},trapFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0}}),ze),{draggable:[Boolean,Object],onEsc:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onBeforeLeave:Function,onAfterLeave:Function,onClose:Function,onPositiveClick:Function,onNegativeClick:Function,onMaskClick:Function,internalDialog:Boolean,internalModal:Boolean,internalAppear:{type:Boolean,default:void 0},overlayStyle:[String,Object],onBeforeHide:Function,onAfterHide:Function,onHide:Function,unstableShowMask:{type:Boolean,default:void 0}}),dt=te({name:"Modal",inheritAttrs:!1,props:nt,slots:Object,setup(e){const t=O(null),{mergedClsPrefixRef:n,namespaceRef:o,inlineThemeDisabled:v}=Ce(e),g=V("Modal","-modal",tt,Qo,e,n),h=jo(64),C=Eo(),r=mo(),m=e.internalDialog?ve(Vo,null):null,i=e.internalModal?ve(Fo,null):null,c=Io();function u(l){const{onUpdateShow:d,"onUpdate:show":a,onHide:S}=e;d&&X(d,l),a&&X(a,l),S&&!l&&S(l)}function p(){const{onClose:l}=e;l?Promise.resolve(l()).then(d=>{d!==!1&&u(!1)}):u(!1)}function x(){const{onPositiveClick:l}=e;l?Promise.resolve(l()).then(d=>{d!==!1&&u(!1)}):u(!1)}function k(){const{onNegativeClick:l}=e;l?Promise.resolve(l()).then(d=>{d!==!1&&u(!1)}):u(!1)}function P(){const{onBeforeLeave:l,onBeforeHide:d}=e;l&&X(l),d&&d()}function z(){const{onAfterLeave:l,onAfterHide:d}=e;l&&X(l),d&&d()}function s(l){var d;const{onMaskClick:a}=e;a&&a(l),e.maskClosable&&!((d=t.value)===null||d===void 0)&&d.contains(Co(l))&&u(!1)}function M(l){var d;(d=e.onEsc)===null||d===void 0||d.call(e),e.show&&e.closeOnEsc&&Mo(l)&&(c.value||u(!1))}Z(eo,{getMousePosition:()=>{const l=m||i;if(l){const{clickedRef:d,clickedPositionRef:a}=l;if(d.value&&a.value)return a.value}return h.value?C.value:null},mergedClsPrefixRef:n,mergedThemeRef:g,isMountedRef:r,appearRef:U(e,"internalAppear"),transformOriginRef:U(e,"transformOrigin")});const E=F(()=>{const{common:{cubicBezierEaseOut:l},self:{boxShadow:d,color:a,textColor:S}}=g.value;return{"--n-bezier-ease-out":l,"--n-box-shadow":d,"--n-color":a,"--n-text-color":S}}),R=v?xe("theme-class",void 0,E,e):void 0;return{mergedClsPrefix:n,namespace:o,isMounted:r,containerRef:t,presetProps:F(()=>he(e,et)),handleEsc:M,handleAfterLeave:z,handleClickoutside:s,handleBeforeLeave:P,doUpdateShow:u,handleNegativeClick:k,handlePositiveClick:x,handleCloseClick:p,cssVars:v?void 0:E,themeClass:R==null?void 0:R.themeClass,onRender:R==null?void 0:R.onRender}},render(){const{mergedClsPrefix:e}=this;return f($o,{to:this.to,show:this.show},{default:()=>{var t;(t=this.onRender)===null||t===void 0||t.call(this);const{showMask:n}=this;return ge(f("div",{role:"none",ref:"containerRef",class:[`${e}-modal-container`,this.themeClass,this.namespace],style:this.cssVars},f(ot,Object.assign({style:this.overlayStyle},this.$attrs,{ref:"bodyWrapper",displayDirective:this.displayDirective,show:this.show,preset:this.preset,autoFocus:this.autoFocus,trapFocus:this.trapFocus,draggable:this.draggable,blockScroll:this.blockScroll,maskHidden:!n},this.presetProps,{onEsc:this.handleEsc,onClose:this.handleCloseClick,onNegativeClick:this.handleNegativeClick,onPositiveClick:this.handlePositiveClick,onBeforeLeave:this.handleBeforeLeave,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave,onClickoutside:n?void 0:this.handleClickoutside,renderMask:n?()=>{var o;return f(qe,{name:"fade-in-transition",key:"mask",appear:(o=this.internalAppear)!==null&&o!==void 0?o:this.isMounted},{default:()=>this.show?f("div",{"aria-hidden":!0,ref:"containerRef",class:`${e}-modal-mask`,onClick:this.handleClickoutside}):null})}:void 0}),this.$slots)),[[Oo,{zIndex:this.zIndex,enabled:this.show}]])}})}});export{dt as N};
