import{f as N,h as s,J as Re,e as Pe,K as Ie,L as ce,M as ee,j as u,k,u as ie,l as U,n as le,g as C,A as B,O as X,P as d,i as w,N as Te,Q as D,R as ne,T as Q,U as eo,V as W,X as ve,F as oo,Y as to,Z as ke,_ as ro,$ as no,o as Y,c as Z,a as $,a0 as Ne,C as io,s as lo,w as G,t as j,b as V,x as Se,d as ao,r as co,D as so,a1 as uo}from"./index-LAepXqtP.js";import{s as vo,S as $e,u as Oe,c as E,k as fe,V as ho}from"./Scrollbar-D8GMbawD.js";import{d as mo,t as po,C as fo,N as go,a as Co,b as bo,c as xo}from"./Space-Bk0uqng5.js";import{k as se}from"./fade-in-scale-up.cssr-DpQErpet.js";import{u as he}from"./get-B7FPDDd0.js";import{V as yo,c as de}from"./Popover-BovTPIpo.js";import{u as wo}from"./flatten-BGKwcNLb.js";import{f as ue,B as zo}from"./Button-DjIGwXDg.js";import"./get-slot-Bk_rJcZu.js";const Io=N({name:"ChevronDownFilled",render(){return s("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},s("path",{d:"M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z",fill:"currentColor"}))}});function ko(e){const{baseColor:t,textColor2:o,bodyColor:n,cardColor:a,dividerColor:l,actionColor:v,scrollbarColor:m,scrollbarColorHover:c,invertedColor:p}=e;return{textColor:o,textColorInverted:"#FFF",color:n,colorEmbedded:v,headerColor:a,headerColorInverted:p,footerColor:v,footerColorInverted:p,headerBorderColor:l,headerBorderColorInverted:p,footerBorderColor:l,footerBorderColorInverted:p,siderBorderColor:l,siderBorderColorInverted:p,siderColor:a,siderColorInverted:p,siderToggleButtonBorder:`1px solid ${l}`,siderToggleButtonColor:t,siderToggleButtonIconColor:o,siderToggleButtonIconColorInverted:o,siderToggleBarColor:Ie(n,m),siderToggleBarColorHover:Ie(n,c),__invertScrollbar:"true"}}const ge=Re({name:"Layout",common:Pe,peers:{Scrollbar:vo},self:ko});function So(e,t,o,n){return{itemColorHoverInverted:"#0000",itemColorActiveInverted:t,itemColorActiveHoverInverted:t,itemColorActiveCollapsedInverted:t,itemTextColorInverted:e,itemTextColorHoverInverted:o,itemTextColorChildActiveInverted:o,itemTextColorChildActiveHoverInverted:o,itemTextColorActiveInverted:o,itemTextColorActiveHoverInverted:o,itemTextColorHorizontalInverted:e,itemTextColorHoverHorizontalInverted:o,itemTextColorChildActiveHorizontalInverted:o,itemTextColorChildActiveHoverHorizontalInverted:o,itemTextColorActiveHorizontalInverted:o,itemTextColorActiveHoverHorizontalInverted:o,itemIconColorInverted:e,itemIconColorHoverInverted:o,itemIconColorActiveInverted:o,itemIconColorActiveHoverInverted:o,itemIconColorChildActiveInverted:o,itemIconColorChildActiveHoverInverted:o,itemIconColorCollapsedInverted:e,itemIconColorHorizontalInverted:e,itemIconColorHoverHorizontalInverted:o,itemIconColorActiveHorizontalInverted:o,itemIconColorActiveHoverHorizontalInverted:o,itemIconColorChildActiveHorizontalInverted:o,itemIconColorChildActiveHoverHorizontalInverted:o,arrowColorInverted:e,arrowColorHoverInverted:o,arrowColorActiveInverted:o,arrowColorActiveHoverInverted:o,arrowColorChildActiveInverted:o,arrowColorChildActiveHoverInverted:o,groupTextColorInverted:n}}function Ao(e){const{borderRadius:t,textColor3:o,primaryColor:n,textColor2:a,textColor1:l,fontSize:v,dividerColor:m,hoverColor:c,primaryColorHover:p}=e;return Object.assign({borderRadius:t,color:"#0000",groupTextColor:o,itemColorHover:c,itemColorActive:ce(n,{alpha:.1}),itemColorActiveHover:ce(n,{alpha:.1}),itemColorActiveCollapsed:ce(n,{alpha:.1}),itemTextColor:a,itemTextColorHover:a,itemTextColorActive:n,itemTextColorActiveHover:n,itemTextColorChildActive:n,itemTextColorChildActiveHover:n,itemTextColorHorizontal:a,itemTextColorHoverHorizontal:p,itemTextColorActiveHorizontal:n,itemTextColorActiveHoverHorizontal:n,itemTextColorChildActiveHorizontal:n,itemTextColorChildActiveHoverHorizontal:n,itemIconColor:l,itemIconColorHover:l,itemIconColorActive:n,itemIconColorActiveHover:n,itemIconColorChildActive:n,itemIconColorChildActiveHover:n,itemIconColorCollapsed:l,itemIconColorHorizontal:l,itemIconColorHoverHorizontal:p,itemIconColorActiveHorizontal:n,itemIconColorActiveHoverHorizontal:n,itemIconColorChildActiveHorizontal:n,itemIconColorChildActiveHoverHorizontal:n,itemHeight:"42px",arrowColor:a,arrowColorHover:a,arrowColorActive:n,arrowColorActiveHover:n,arrowColorChildActive:n,arrowColorChildActiveHover:n,colorInverted:"#0000",borderColorHorizontal:"#0000",fontSize:v,dividerColor:m},So("#BBB",n,"#FFF","#AAA"))}const Ho=Re({name:"Menu",common:Pe,peers:{Tooltip:po,Dropdown:mo},self:Ao}),Be=ee("n-layout-sider"),Ce={type:String,default:"static"},_o=u("layout",`
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 flex: auto;
 overflow: hidden;
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[u("layout-scroll-container",`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),k("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),Ro={embedded:Boolean,position:Ce,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:""},hasSider:Boolean,siderPlacement:{type:String,default:"left"}},Me=ee("n-layout");function Ee(e){return N({name:e?"LayoutContent":"Layout",props:Object.assign(Object.assign({},U.props),Ro),setup(t){const o=B(null),n=B(null),{mergedClsPrefixRef:a,inlineThemeDisabled:l}=ie(t),v=U("Layout","-layout",_o,ge,t,a);function m(I,S){if(t.nativeScrollbar){const{value:T}=o;T&&(S===void 0?T.scrollTo(I):T.scrollTo(I,S))}else{const{value:T}=n;T&&T.scrollTo(I,S)}}X(Me,t);let c=0,p=0;const R=I=>{var S;const T=I.target;c=T.scrollLeft,p=T.scrollTop,(S=t.onScroll)===null||S===void 0||S.call(t,I)};Oe(()=>{if(t.nativeScrollbar){const I=o.value;I&&(I.scrollTop=p,I.scrollLeft=c)}});const z={display:"flex",flexWrap:"nowrap",width:"100%",flexDirection:"row"},f={scrollTo:m},H=C(()=>{const{common:{cubicBezierEaseInOut:I},self:S}=v.value;return{"--n-bezier":I,"--n-color":t.embedded?S.colorEmbedded:S.color,"--n-text-color":S.textColor}}),P=l?le("layout",C(()=>t.embedded?"e":""),H,t):void 0;return Object.assign({mergedClsPrefix:a,scrollableElRef:o,scrollbarInstRef:n,hasSiderStyle:z,mergedTheme:v,handleNativeElScroll:R,cssVars:l?void 0:H,themeClass:P==null?void 0:P.themeClass,onRender:P==null?void 0:P.onRender},f)},render(){var t;const{mergedClsPrefix:o,hasSider:n}=this;(t=this.onRender)===null||t===void 0||t.call(this);const a=n?this.hasSiderStyle:void 0,l=[this.themeClass,e&&`${o}-layout-content`,`${o}-layout`,`${o}-layout--${this.position}-positioned`];return s("div",{class:l,style:this.cssVars},this.nativeScrollbar?s("div",{ref:"scrollableElRef",class:[`${o}-layout-scroll-container`,this.contentClass],style:[this.contentStyle,a],onScroll:this.handleNativeElScroll},this.$slots):s($e,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,a]}),this.$slots))}})}const Ae=Ee(!1),Po=Ee(!0),To=u("layout-header",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[k("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),k("bordered",`
 border-bottom: solid 1px var(--n-border-color);
 `)]),No={position:Ce,inverted:Boolean,bordered:{type:Boolean,default:!1}},$o=N({name:"LayoutHeader",props:Object.assign(Object.assign({},U.props),No),setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=ie(e),n=U("Layout","-layout-header",To,ge,e,t),a=C(()=>{const{common:{cubicBezierEaseInOut:v},self:m}=n.value,c={"--n-bezier":v};return e.inverted?(c["--n-color"]=m.headerColorInverted,c["--n-text-color"]=m.textColorInverted,c["--n-border-color"]=m.headerBorderColorInverted):(c["--n-color"]=m.headerColor,c["--n-text-color"]=m.textColor,c["--n-border-color"]=m.headerBorderColor),c}),l=o?le("layout-header",C(()=>e.inverted?"a":"b"),a,e):void 0;return{mergedClsPrefix:t,cssVars:o?void 0:a,themeClass:l==null?void 0:l.themeClass,onRender:l==null?void 0:l.onRender}},render(){var e;const{mergedClsPrefix:t}=this;return(e=this.onRender)===null||e===void 0||e.call(this),s("div",{class:[`${t}-layout-header`,this.themeClass,this.position&&`${t}-layout-header--${this.position}-positioned`,this.bordered&&`${t}-layout-header--bordered`],style:this.cssVars},this.$slots)}}),Oo=u("layout-sider",`
 flex-shrink: 0;
 box-sizing: border-box;
 position: relative;
 z-index: 1;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 min-width .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 transform .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 display: flex;
 justify-content: flex-end;
`,[k("bordered",[d("border",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),d("left-placement",[k("bordered",[d("border",`
 right: 0;
 `)])]),k("right-placement",`
 justify-content: flex-start;
 `,[k("bordered",[d("border",`
 left: 0;
 `)]),k("collapsed",[u("layout-toggle-button",[u("base-icon",`
 transform: rotate(180deg);
 `)]),u("layout-toggle-bar",[w("&:hover",[d("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),d("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])])]),u("layout-toggle-button",`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[u("base-icon",`
 transform: rotate(0);
 `)]),u("layout-toggle-bar",`
 left: -28px;
 transform: rotate(180deg);
 `,[w("&:hover",[d("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),d("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})])])]),k("collapsed",[u("layout-toggle-bar",[w("&:hover",[d("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),d("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])]),u("layout-toggle-button",[u("base-icon",`
 transform: rotate(0);
 `)])]),u("layout-toggle-button",`
 transition:
 color .3s var(--n-bezier),
 right .3s var(--n-bezier),
 left .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 cursor: pointer;
 width: 24px;
 height: 24px;
 position: absolute;
 top: 50%;
 right: 0;
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 18px;
 color: var(--n-toggle-button-icon-color);
 border: var(--n-toggle-button-border);
 background-color: var(--n-toggle-button-color);
 box-shadow: 0 2px 4px 0px rgba(0, 0, 0, .06);
 transform: translateX(50%) translateY(-50%);
 z-index: 1;
 `,[u("base-icon",`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),u("layout-toggle-bar",`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[d("top, bottom",`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),d("bottom",`
 position: absolute;
 top: 34px;
 `),w("&:hover",[d("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),d("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})]),d("top, bottom",{backgroundColor:"var(--n-toggle-bar-color)"}),w("&:hover",[d("top, bottom",{backgroundColor:"var(--n-toggle-bar-color-hover)"})])]),d("border",`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),u("layout-sider-scroll-container",`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),k("show-content",[u("layout-sider-scroll-container",{opacity:1})]),k("absolute-positioned",`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),Bo=N({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return s("div",{onClick:this.onClick,class:`${e}-layout-toggle-bar`},s("div",{class:`${e}-layout-toggle-bar__top`}),s("div",{class:`${e}-layout-toggle-bar__bottom`}))}}),Mo=N({name:"LayoutToggleButton",props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return s("div",{class:`${e}-layout-toggle-button`,onClick:this.onClick},s(Te,{clsPrefix:e},{default:()=>s(fo,null)}))}}),Eo={position:Ce,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:""},collapseMode:{type:String,default:"transform"},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},Lo=N({name:"LayoutSider",props:Object.assign(Object.assign({},U.props),Eo),setup(e){const t=D(Me),o=B(null),n=B(null),a=B(e.defaultCollapsed),l=he(ne(e,"collapsed"),a),v=C(()=>ue(l.value?e.collapsedWidth:e.width)),m=C(()=>e.collapseMode!=="transform"?{}:{minWidth:ue(e.width)}),c=C(()=>t?t.siderPlacement:"left");function p(_,x){if(e.nativeScrollbar){const{value:y}=o;y&&(x===void 0?y.scrollTo(_):y.scrollTo(_,x))}else{const{value:y}=n;y&&y.scrollTo(_,x)}}function R(){const{"onUpdate:collapsed":_,onUpdateCollapsed:x,onExpand:y,onCollapse:K}=e,{value:L}=l;x&&E(x,!L),_&&E(_,!L),a.value=!L,L?y&&E(y):K&&E(K)}let z=0,f=0;const H=_=>{var x;const y=_.target;z=y.scrollLeft,f=y.scrollTop,(x=e.onScroll)===null||x===void 0||x.call(e,_)};Oe(()=>{if(e.nativeScrollbar){const _=o.value;_&&(_.scrollTop=f,_.scrollLeft=z)}}),X(Be,{collapsedRef:l,collapseModeRef:ne(e,"collapseMode")});const{mergedClsPrefixRef:P,inlineThemeDisabled:I}=ie(e),S=U("Layout","-layout-sider",Oo,ge,e,P);function T(_){var x,y;_.propertyName==="max-width"&&(l.value?(x=e.onAfterLeave)===null||x===void 0||x.call(e):(y=e.onAfterEnter)===null||y===void 0||y.call(e))}const J={scrollTo:p},F=C(()=>{const{common:{cubicBezierEaseInOut:_},self:x}=S.value,{siderToggleButtonColor:y,siderToggleButtonBorder:K,siderToggleBarColor:L,siderToggleBarColorHover:ae}=x,O={"--n-bezier":_,"--n-toggle-button-color":y,"--n-toggle-button-border":K,"--n-toggle-bar-color":L,"--n-toggle-bar-color-hover":ae};return e.inverted?(O["--n-color"]=x.siderColorInverted,O["--n-text-color"]=x.textColorInverted,O["--n-border-color"]=x.siderBorderColorInverted,O["--n-toggle-button-icon-color"]=x.siderToggleButtonIconColorInverted,O.__invertScrollbar=x.__invertScrollbar):(O["--n-color"]=x.siderColor,O["--n-text-color"]=x.textColor,O["--n-border-color"]=x.siderBorderColor,O["--n-toggle-button-icon-color"]=x.siderToggleButtonIconColor),O}),M=I?le("layout-sider",C(()=>e.inverted?"a":"b"),F,e):void 0;return Object.assign({scrollableElRef:o,scrollbarInstRef:n,mergedClsPrefix:P,mergedTheme:S,styleMaxWidth:v,mergedCollapsed:l,scrollContainerStyle:m,siderPlacement:c,handleNativeElScroll:H,handleTransitionend:T,handleTriggerClick:R,inlineThemeDisabled:I,cssVars:F,themeClass:M==null?void 0:M.themeClass,onRender:M==null?void 0:M.onRender},J)},render(){var e;const{mergedClsPrefix:t,mergedCollapsed:o,showTrigger:n}=this;return(e=this.onRender)===null||e===void 0||e.call(this),s("aside",{class:[`${t}-layout-sider`,this.themeClass,`${t}-layout-sider--${this.position}-positioned`,`${t}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${t}-layout-sider--bordered`,o&&`${t}-layout-sider--collapsed`,(!o||this.showCollapsedContent)&&`${t}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:ue(this.width)}]},this.nativeScrollbar?s("div",{class:[`${t}-layout-sider-scroll-container`,this.contentClass],onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:"auto"},this.contentStyle],ref:"scrollableElRef"},this.$slots):s($e,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar==="true"?{colorHover:"rgba(255, 255, 255, .4)",color:"rgba(255, 255, 255, .3)"}:void 0}),this.$slots),n?n==="bar"?s(Bo,{clsPrefix:t,class:o?this.collapsedTriggerClass:this.triggerClass,style:o?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):s(Mo,{clsPrefix:t,class:o?this.collapsedTriggerClass:this.triggerClass,style:o?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?s("div",{class:`${t}-layout-sider__border`}):null)}}),oe=ee("n-menu"),Le=ee("n-submenu"),be=ee("n-menu-item-group"),He=[w("&::before","background-color: var(--n-item-color-hover);"),d("arrow",`
 color: var(--n-arrow-color-hover);
 `),d("icon",`
 color: var(--n-item-icon-color-hover);
 `),u("menu-item-content-header",`
 color: var(--n-item-text-color-hover);
 `,[w("a",`
 color: var(--n-item-text-color-hover);
 `),d("extra",`
 color: var(--n-item-text-color-hover);
 `)])],_e=[d("icon",`
 color: var(--n-item-icon-color-hover-horizontal);
 `),u("menu-item-content-header",`
 color: var(--n-item-text-color-hover-horizontal);
 `,[w("a",`
 color: var(--n-item-text-color-hover-horizontal);
 `),d("extra",`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],jo=w([u("menu",`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[k("horizontal",`
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `,[u("submenu","margin: 0;"),u("menu-item","margin: 0;"),u("menu-item-content",`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[w("&::before","display: none;"),k("selected","border-bottom: 2px solid var(--n-border-color-horizontal)")]),u("menu-item-content",[k("selected",[d("icon","color: var(--n-item-icon-color-active-horizontal);"),u("menu-item-content-header",`
 color: var(--n-item-text-color-active-horizontal);
 `,[w("a","color: var(--n-item-text-color-active-horizontal);"),d("extra","color: var(--n-item-text-color-active-horizontal);")])]),k("child-active",`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[u("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[w("a",`
 color: var(--n-item-text-color-child-active-horizontal);
 `),d("extra",`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),d("icon",`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),Q("disabled",[Q("selected, child-active",[w("&:focus-within",_e)]),k("selected",[q(null,[d("icon","color: var(--n-item-icon-color-active-hover-horizontal);"),u("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[w("a","color: var(--n-item-text-color-active-hover-horizontal);"),d("extra","color: var(--n-item-text-color-active-hover-horizontal);")])])]),k("child-active",[q(null,[d("icon","color: var(--n-item-icon-color-child-active-hover-horizontal);"),u("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[w("a","color: var(--n-item-text-color-child-active-hover-horizontal);"),d("extra","color: var(--n-item-text-color-child-active-hover-horizontal);")])])]),q("border-bottom: 2px solid var(--n-border-color-horizontal);",_e)]),u("menu-item-content-header",[w("a","color: var(--n-item-text-color-horizontal);")])])]),Q("responsive",[u("menu-item-content-header",`
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),k("collapsed",[u("menu-item-content",[k("selected",[w("&::before",`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),u("menu-item-content-header","opacity: 0;"),d("arrow","opacity: 0;"),d("icon","color: var(--n-item-icon-color-collapsed);")])]),u("menu-item",`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),u("menu-item-content",`
 box-sizing: border-box;
 line-height: 1.75;
 height: 100%;
 display: grid;
 grid-template-areas: "icon content arrow";
 grid-template-columns: auto 1fr auto;
 align-items: center;
 cursor: pointer;
 position: relative;
 padding-right: 18px;
 transition:
 background-color .3s var(--n-bezier),
 padding-left .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[w("> *","z-index: 1;"),w("&::before",`
 z-index: auto;
 content: "";
 background-color: #0000;
 position: absolute;
 left: 8px;
 right: 8px;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),k("disabled",`
 opacity: .45;
 cursor: not-allowed;
 `),k("collapsed",[d("arrow","transform: rotate(0);")]),k("selected",[w("&::before","background-color: var(--n-item-color-active);"),d("arrow","color: var(--n-arrow-color-active);"),d("icon","color: var(--n-item-icon-color-active);"),u("menu-item-content-header",`
 color: var(--n-item-text-color-active);
 `,[w("a","color: var(--n-item-text-color-active);"),d("extra","color: var(--n-item-text-color-active);")])]),k("child-active",[u("menu-item-content-header",`
 color: var(--n-item-text-color-child-active);
 `,[w("a",`
 color: var(--n-item-text-color-child-active);
 `),d("extra",`
 color: var(--n-item-text-color-child-active);
 `)]),d("arrow",`
 color: var(--n-arrow-color-child-active);
 `),d("icon",`
 color: var(--n-item-icon-color-child-active);
 `)]),Q("disabled",[Q("selected, child-active",[w("&:focus-within",He)]),k("selected",[q(null,[d("arrow","color: var(--n-arrow-color-active-hover);"),d("icon","color: var(--n-item-icon-color-active-hover);"),u("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover);
 `,[w("a","color: var(--n-item-text-color-active-hover);"),d("extra","color: var(--n-item-text-color-active-hover);")])])]),k("child-active",[q(null,[d("arrow","color: var(--n-arrow-color-child-active-hover);"),d("icon","color: var(--n-item-icon-color-child-active-hover);"),u("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover);
 `,[w("a","color: var(--n-item-text-color-child-active-hover);"),d("extra","color: var(--n-item-text-color-child-active-hover);")])])]),k("selected",[q(null,[w("&::before","background-color: var(--n-item-color-active-hover);")])]),q(null,He)]),d("icon",`
 grid-area: icon;
 color: var(--n-item-icon-color);
 transition:
 color .3s var(--n-bezier),
 font-size .3s var(--n-bezier),
 margin-right .3s var(--n-bezier);
 box-sizing: content-box;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 `),d("arrow",`
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `),u("menu-item-content-header",`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 color: var(--n-item-text-color);
 `,[w("a",`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[w("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),d("extra",`
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]),u("submenu",`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[u("menu-item-content",`
 height: var(--n-item-height);
 `),u("submenu-children",`
 overflow: hidden;
 padding: 0;
 `,[eo({duration:".2s"})])]),u("menu-item-group",[u("menu-item-group-title",`
 margin-top: 6px;
 color: var(--n-group-text-color);
 cursor: default;
 font-size: .93em;
 height: 36px;
 display: flex;
 align-items: center;
 transition:
 padding-left .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)])]),u("menu-tooltip",[w("a",`
 color: inherit;
 text-decoration: none;
 `)]),u("menu-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function q(e,t){return[k("hover",e,t),w("&:hover",e,t)]}const je=N({name:"MenuOptionContent",props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0},isEllipsisPlaceholder:Boolean},setup(e){const{props:t}=D(oe);return{menuProps:t,style:C(()=>{const{paddingLeft:o}=e;return{paddingLeft:o&&`${o}px`}}),iconStyle:C(()=>{const{maxIconSize:o,activeIconSize:n,iconMarginRight:a}=e;return{width:`${o}px`,height:`${o}px`,fontSize:`${n}px`,marginRight:`${a}px`}})}},render(){const{clsPrefix:e,tmNode:t,menuProps:{renderIcon:o,renderLabel:n,renderExtra:a,expandIcon:l}}=this,v=o?o(t.rawNode):W(this.icon);return s("div",{onClick:m=>{var c;(c=this.onClick)===null||c===void 0||c.call(this,m)},role:"none",class:[`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}],style:this.style},v&&s("div",{class:`${e}-menu-item-content__icon`,style:this.iconStyle,role:"none"},[v]),s("div",{class:`${e}-menu-item-content-header`,role:"none"},this.isEllipsisPlaceholder?this.title:n?n(t.rawNode):W(this.title),this.extra||a?s("span",{class:`${e}-menu-item-content-header__extra`}," ",a?a(t.rawNode):W(this.extra)):null),this.showArrow?s(Te,{ariaHidden:!0,class:`${e}-menu-item-content__arrow`,clsPrefix:e},{default:()=>l?l(t.rawNode):s(Io,null)}):null)}}),re=8;function xe(e){const t=D(oe),{props:o,mergedCollapsedRef:n}=t,a=D(Le,null),l=D(be,null),v=C(()=>o.mode==="horizontal"),m=C(()=>v.value?o.dropdownPlacement:"tmNodes"in e?"right-start":"right"),c=C(()=>{var f;return Math.max((f=o.collapsedIconSize)!==null&&f!==void 0?f:o.iconSize,o.iconSize)}),p=C(()=>{var f;return!v.value&&e.root&&n.value&&(f=o.collapsedIconSize)!==null&&f!==void 0?f:o.iconSize}),R=C(()=>{if(v.value)return;const{collapsedWidth:f,indent:H,rootIndent:P}=o,{root:I,isGroup:S}=e,T=P===void 0?H:P;return I?n.value?f/2-c.value/2:T:l&&typeof l.paddingLeftRef.value=="number"?H/2+l.paddingLeftRef.value:a&&typeof a.paddingLeftRef.value=="number"?(S?H/2:H)+a.paddingLeftRef.value:0}),z=C(()=>{const{collapsedWidth:f,indent:H,rootIndent:P}=o,{value:I}=c,{root:S}=e;return v.value||!S||!n.value?re:(P===void 0?H:P)+I+re-(f+I)/2});return{dropdownPlacement:m,activeIconSize:p,maxIconSize:c,paddingLeft:R,iconMarginRight:z,NMenu:t,NSubmenu:a,NMenuOptionGroup:l}}const ye={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},Fo=N({name:"MenuDivider",setup(){const e=D(oe),{mergedClsPrefixRef:t,isHorizontalRef:o}=e;return()=>o.value?null:s("div",{class:`${t.value}-menu-divider`})}}),Fe=Object.assign(Object.assign({},ye),{tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function}),Ko=fe(Fe),Vo=N({name:"MenuOption",props:Fe,setup(e){const t=xe(e),{NSubmenu:o,NMenu:n,NMenuOptionGroup:a}=t,{props:l,mergedClsPrefixRef:v,mergedCollapsedRef:m}=n,c=o?o.mergedDisabledRef:a?a.mergedDisabledRef:{value:!1},p=C(()=>c.value||e.disabled);function R(f){const{onClick:H}=e;H&&H(f)}function z(f){p.value||(n.doSelect(e.internalKey,e.tmNode.rawNode),R(f))}return{mergedClsPrefix:v,dropdownPlacement:t.dropdownPlacement,paddingLeft:t.paddingLeft,iconMarginRight:t.iconMarginRight,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,mergedTheme:n.mergedThemeRef,menuProps:l,dropdownEnabled:ve(()=>e.root&&m.value&&l.mode!=="horizontal"&&!p.value),selected:ve(()=>n.mergedValueRef.value===e.internalKey),mergedDisabled:p,handleClick:z}},render(){const{mergedClsPrefix:e,mergedTheme:t,tmNode:o,menuProps:{renderLabel:n,nodeProps:a}}=this,l=a==null?void 0:a(o.rawNode);return s("div",Object.assign({},l,{role:"menuitem",class:[`${e}-menu-item`,l==null?void 0:l.class]}),s(go,{theme:t.peers.Tooltip,themeOverrides:t.peerOverrides.Tooltip,trigger:"hover",placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:["menu-tooltip"]},{default:()=>n?n(o.rawNode):W(this.title),trigger:()=>s(je,{tmNode:o,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick})}))}}),Ke=Object.assign(Object.assign({},ye),{tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}}),Do=fe(Ke),Uo=N({name:"MenuOptionGroup",props:Ke,setup(e){const t=xe(e),{NSubmenu:o}=t,n=C(()=>o!=null&&o.mergedDisabledRef.value?!0:e.tmNode.disabled);X(be,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:n});const{mergedClsPrefixRef:a,props:l}=D(oe);return function(){const{value:v}=a,m=t.paddingLeft.value,{nodeProps:c}=l,p=c==null?void 0:c(e.tmNode.rawNode);return s("div",{class:`${v}-menu-item-group`,role:"group"},s("div",Object.assign({},p,{class:[`${v}-menu-item-group-title`,p==null?void 0:p.class],style:[(p==null?void 0:p.style)||"",m!==void 0?`padding-left: ${m}px;`:""]}),W(e.title),e.extra?s(oo,null," ",W(e.extra)):null),s("div",null,e.tmNodes.map(R=>we(R,l))))}}});function me(e){return e.type==="divider"||e.type==="render"}function Go(e){return e.type==="divider"}function we(e,t){const{rawNode:o}=e,{show:n}=o;if(n===!1)return null;if(me(o))return Go(o)?s(Fo,Object.assign({key:e.key},o.props)):null;const{labelField:a}=t,{key:l,level:v,isGroup:m}=e,c=Object.assign(Object.assign({},o),{title:o.title||o[a],extra:o.titleExtra||o.extra,key:l,internalKey:l,level:v,root:v===0,isGroup:m});return e.children?e.isGroup?s(Uo,se(c,Do,{tmNode:e,tmNodes:e.children,key:l})):s(pe,se(c,qo,{key:l,rawNodes:o[t.childrenField],tmNodes:e.children,tmNode:e})):s(Vo,se(c,Ko,{key:l,tmNode:e}))}const Ve=Object.assign(Object.assign({},ye),{rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function,domId:String,virtualChildActive:{type:Boolean,default:void 0},isEllipsisPlaceholder:Boolean}),qo=fe(Ve),pe=N({name:"Submenu",props:Ve,setup(e){const t=xe(e),{NMenu:o,NSubmenu:n}=t,{props:a,mergedCollapsedRef:l,mergedThemeRef:v}=o,m=C(()=>{const{disabled:f}=e;return n!=null&&n.mergedDisabledRef.value||a.disabled?!0:f}),c=B(!1);X(Le,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:m}),X(be,null);function p(){const{onClick:f}=e;f&&f()}function R(){m.value||(l.value||o.toggleExpand(e.internalKey),p())}function z(f){c.value=f}return{menuProps:a,mergedTheme:v,doSelect:o.doSelect,inverted:o.invertedRef,isHorizontal:o.isHorizontalRef,mergedClsPrefix:o.mergedClsPrefixRef,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,iconMarginRight:t.iconMarginRight,dropdownPlacement:t.dropdownPlacement,dropdownShow:c,paddingLeft:t.paddingLeft,mergedDisabled:m,mergedValue:o.mergedValueRef,childActive:ve(()=>{var f;return(f=e.virtualChildActive)!==null&&f!==void 0?f:o.activePathRef.value.includes(e.internalKey)}),collapsed:C(()=>a.mode==="horizontal"?!1:l.value?!0:!o.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:C(()=>!m.value&&(a.mode==="horizontal"||l.value)),handlePopoverShowChange:z,handleClick:R}},render(){var e;const{mergedClsPrefix:t,menuProps:{renderIcon:o,renderLabel:n}}=this,a=()=>{const{isHorizontal:v,paddingLeft:m,collapsed:c,mergedDisabled:p,maxIconSize:R,activeIconSize:z,title:f,childActive:H,icon:P,handleClick:I,menuProps:{nodeProps:S},dropdownShow:T,iconMarginRight:J,tmNode:F,mergedClsPrefix:M,isEllipsisPlaceholder:_,extra:x}=this,y=S==null?void 0:S(F.rawNode);return s("div",Object.assign({},y,{class:[`${M}-menu-item`,y==null?void 0:y.class],role:"menuitem"}),s(je,{tmNode:F,paddingLeft:m,collapsed:c,disabled:p,iconMarginRight:J,maxIconSize:R,activeIconSize:z,title:f,extra:x,showArrow:!v,childActive:H,clsPrefix:M,icon:P,hover:T,onClick:I,isEllipsisPlaceholder:_}))},l=()=>s(to,null,{default:()=>{const{tmNodes:v,collapsed:m}=this;return m?null:s("div",{class:`${t}-submenu-children`,role:"menu"},v.map(c=>we(c,this.menuProps)))}});return this.root?s(Co,Object.assign({size:"large",trigger:"hover"},(e=this.menuProps)===null||e===void 0?void 0:e.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:"14px",optionIconSizeLarge:"18px"},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:o,renderLabel:n}),{default:()=>s("div",{class:`${t}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},a(),this.isHorizontal?null:l())}):s("div",{class:`${t}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},a(),l())}}),Yo=Object.assign(Object.assign({},U.props),{options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},disabledField:{type:String,default:"disabled"},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:"vertical"},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,default:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,dropdownPlacement:{type:String,default:"bottom"},responsive:Boolean,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array}),Wo=N({name:"Menu",inheritAttrs:!1,props:Yo,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=ie(e),n=U("Menu","-menu",jo,Ho,e,t),a=D(Be,null),l=C(()=>{var h;const{collapsed:b}=e;if(b!==void 0)return b;if(a){const{collapseModeRef:r,collapsedRef:g}=a;if(r.value==="width")return(h=g.value)!==null&&h!==void 0?h:!1}return!1}),v=C(()=>{const{keyField:h,childrenField:b,disabledField:r}=e;return de(e.items||e.options,{getIgnored(g){return me(g)},getChildren(g){return g[b]},getDisabled(g){return g[r]},getKey(g){var A;return(A=g[h])!==null&&A!==void 0?A:g.name}})}),m=C(()=>new Set(v.value.treeNodes.map(h=>h.key))),{watchProps:c}=e,p=B(null);c!=null&&c.includes("defaultValue")?ke(()=>{p.value=e.defaultValue}):p.value=e.defaultValue;const R=ne(e,"value"),z=he(R,p),f=B([]),H=()=>{f.value=e.defaultExpandAll?v.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||v.value.getPath(z.value,{includeSelf:!1}).keyPath};c!=null&&c.includes("defaultExpandedKeys")?ke(H):H();const P=wo(e,["expandedNames","expandedKeys"]),I=he(P,f),S=C(()=>v.value.treeNodes),T=C(()=>v.value.getPath(z.value).keyPath);X(oe,{props:e,mergedCollapsedRef:l,mergedThemeRef:n,mergedValueRef:z,mergedExpandedKeysRef:I,activePathRef:T,mergedClsPrefixRef:t,isHorizontalRef:C(()=>e.mode==="horizontal"),invertedRef:ne(e,"inverted"),doSelect:J,toggleExpand:M});function J(h,b){const{"onUpdate:value":r,onUpdateValue:g,onSelect:A}=e;g&&E(g,h,b),r&&E(r,h,b),A&&E(A,h,b),p.value=h}function F(h){const{"onUpdate:expandedKeys":b,onUpdateExpandedKeys:r,onExpandedNamesChange:g,onOpenNamesChange:A}=e;b&&E(b,h),r&&E(r,h),g&&E(g,h),A&&E(A,h),f.value=h}function M(h){const b=Array.from(I.value),r=b.findIndex(g=>g===h);if(~r)b.splice(r,1);else{if(e.accordion&&m.value.has(h)){const g=b.findIndex(A=>m.value.has(A));g>-1&&b.splice(g,1)}b.push(h)}F(b)}const _=h=>{const b=v.value.getPath(h??z.value,{includeSelf:!1}).keyPath;if(!b.length)return;const r=Array.from(I.value),g=new Set([...r,...b]);e.accordion&&m.value.forEach(A=>{g.has(A)&&!b.includes(A)&&g.delete(A)}),F(Array.from(g))},x=C(()=>{const{inverted:h}=e,{common:{cubicBezierEaseInOut:b},self:r}=n.value,{borderRadius:g,borderColorHorizontal:A,fontSize:Ze,itemHeight:Je,dividerColor:Qe}=r,i={"--n-divider-color":Qe,"--n-bezier":b,"--n-font-size":Ze,"--n-border-color-horizontal":A,"--n-border-radius":g,"--n-item-height":Je};return h?(i["--n-group-text-color"]=r.groupTextColorInverted,i["--n-color"]=r.colorInverted,i["--n-item-text-color"]=r.itemTextColorInverted,i["--n-item-text-color-hover"]=r.itemTextColorHoverInverted,i["--n-item-text-color-active"]=r.itemTextColorActiveInverted,i["--n-item-text-color-child-active"]=r.itemTextColorChildActiveInverted,i["--n-item-text-color-child-active-hover"]=r.itemTextColorChildActiveInverted,i["--n-item-text-color-active-hover"]=r.itemTextColorActiveHoverInverted,i["--n-item-icon-color"]=r.itemIconColorInverted,i["--n-item-icon-color-hover"]=r.itemIconColorHoverInverted,i["--n-item-icon-color-active"]=r.itemIconColorActiveInverted,i["--n-item-icon-color-active-hover"]=r.itemIconColorActiveHoverInverted,i["--n-item-icon-color-child-active"]=r.itemIconColorChildActiveInverted,i["--n-item-icon-color-child-active-hover"]=r.itemIconColorChildActiveHoverInverted,i["--n-item-icon-color-collapsed"]=r.itemIconColorCollapsedInverted,i["--n-item-text-color-horizontal"]=r.itemTextColorHorizontalInverted,i["--n-item-text-color-hover-horizontal"]=r.itemTextColorHoverHorizontalInverted,i["--n-item-text-color-active-horizontal"]=r.itemTextColorActiveHorizontalInverted,i["--n-item-text-color-child-active-horizontal"]=r.itemTextColorChildActiveHorizontalInverted,i["--n-item-text-color-child-active-hover-horizontal"]=r.itemTextColorChildActiveHoverHorizontalInverted,i["--n-item-text-color-active-hover-horizontal"]=r.itemTextColorActiveHoverHorizontalInverted,i["--n-item-icon-color-horizontal"]=r.itemIconColorHorizontalInverted,i["--n-item-icon-color-hover-horizontal"]=r.itemIconColorHoverHorizontalInverted,i["--n-item-icon-color-active-horizontal"]=r.itemIconColorActiveHorizontalInverted,i["--n-item-icon-color-active-hover-horizontal"]=r.itemIconColorActiveHoverHorizontalInverted,i["--n-item-icon-color-child-active-horizontal"]=r.itemIconColorChildActiveHorizontalInverted,i["--n-item-icon-color-child-active-hover-horizontal"]=r.itemIconColorChildActiveHoverHorizontalInverted,i["--n-arrow-color"]=r.arrowColorInverted,i["--n-arrow-color-hover"]=r.arrowColorHoverInverted,i["--n-arrow-color-active"]=r.arrowColorActiveInverted,i["--n-arrow-color-active-hover"]=r.arrowColorActiveHoverInverted,i["--n-arrow-color-child-active"]=r.arrowColorChildActiveInverted,i["--n-arrow-color-child-active-hover"]=r.arrowColorChildActiveHoverInverted,i["--n-item-color-hover"]=r.itemColorHoverInverted,i["--n-item-color-active"]=r.itemColorActiveInverted,i["--n-item-color-active-hover"]=r.itemColorActiveHoverInverted,i["--n-item-color-active-collapsed"]=r.itemColorActiveCollapsedInverted):(i["--n-group-text-color"]=r.groupTextColor,i["--n-color"]=r.color,i["--n-item-text-color"]=r.itemTextColor,i["--n-item-text-color-hover"]=r.itemTextColorHover,i["--n-item-text-color-active"]=r.itemTextColorActive,i["--n-item-text-color-child-active"]=r.itemTextColorChildActive,i["--n-item-text-color-child-active-hover"]=r.itemTextColorChildActiveHover,i["--n-item-text-color-active-hover"]=r.itemTextColorActiveHover,i["--n-item-icon-color"]=r.itemIconColor,i["--n-item-icon-color-hover"]=r.itemIconColorHover,i["--n-item-icon-color-active"]=r.itemIconColorActive,i["--n-item-icon-color-active-hover"]=r.itemIconColorActiveHover,i["--n-item-icon-color-child-active"]=r.itemIconColorChildActive,i["--n-item-icon-color-child-active-hover"]=r.itemIconColorChildActiveHover,i["--n-item-icon-color-collapsed"]=r.itemIconColorCollapsed,i["--n-item-text-color-horizontal"]=r.itemTextColorHorizontal,i["--n-item-text-color-hover-horizontal"]=r.itemTextColorHoverHorizontal,i["--n-item-text-color-active-horizontal"]=r.itemTextColorActiveHorizontal,i["--n-item-text-color-child-active-horizontal"]=r.itemTextColorChildActiveHorizontal,i["--n-item-text-color-child-active-hover-horizontal"]=r.itemTextColorChildActiveHoverHorizontal,i["--n-item-text-color-active-hover-horizontal"]=r.itemTextColorActiveHoverHorizontal,i["--n-item-icon-color-horizontal"]=r.itemIconColorHorizontal,i["--n-item-icon-color-hover-horizontal"]=r.itemIconColorHoverHorizontal,i["--n-item-icon-color-active-horizontal"]=r.itemIconColorActiveHorizontal,i["--n-item-icon-color-active-hover-horizontal"]=r.itemIconColorActiveHoverHorizontal,i["--n-item-icon-color-child-active-horizontal"]=r.itemIconColorChildActiveHorizontal,i["--n-item-icon-color-child-active-hover-horizontal"]=r.itemIconColorChildActiveHoverHorizontal,i["--n-arrow-color"]=r.arrowColor,i["--n-arrow-color-hover"]=r.arrowColorHover,i["--n-arrow-color-active"]=r.arrowColorActive,i["--n-arrow-color-active-hover"]=r.arrowColorActiveHover,i["--n-arrow-color-child-active"]=r.arrowColorChildActive,i["--n-arrow-color-child-active-hover"]=r.arrowColorChildActiveHover,i["--n-item-color-hover"]=r.itemColorHover,i["--n-item-color-active"]=r.itemColorActive,i["--n-item-color-active-hover"]=r.itemColorActiveHover,i["--n-item-color-active-collapsed"]=r.itemColorActiveCollapsed),i}),y=o?le("menu",C(()=>e.inverted?"a":"b"),x,e):void 0,K=ro(),L=B(null),ae=B(null);let O=!0;const ze=()=>{var h;O?O=!1:(h=L.value)===null||h===void 0||h.sync({showAllItemsBeforeCalculate:!0})};function De(){return document.getElementById(K)}const te=B(-1);function Ue(h){te.value=e.options.length-h}function Ge(h){h||(te.value=-1)}const qe=C(()=>{const h=te.value;return{children:h===-1?[]:e.options.slice(h)}}),Ye=C(()=>{const{childrenField:h,disabledField:b,keyField:r}=e;return de([qe.value],{getIgnored(g){return me(g)},getChildren(g){return g[h]},getDisabled(g){return g[b]},getKey(g){var A;return(A=g[r])!==null&&A!==void 0?A:g.name}})}),We=C(()=>de([{}]).treeNodes[0]);function Xe(){var h;if(te.value===-1)return s(pe,{root:!0,level:0,key:"__ellpisisGroupPlaceholder__",internalKey:"__ellpisisGroupPlaceholder__",title:"···",tmNode:We.value,domId:K,isEllipsisPlaceholder:!0});const b=Ye.value.treeNodes[0],r=T.value,g=!!(!((h=b.children)===null||h===void 0)&&h.some(A=>r.includes(A.key)));return s(pe,{level:0,root:!0,key:"__ellpisisGroup__",internalKey:"__ellpisisGroup__",title:"···",virtualChildActive:g,tmNode:b,domId:K,rawNodes:b.rawNode.children||[],tmNodes:b.children||[],isEllipsisPlaceholder:!0})}return{mergedClsPrefix:t,controlledExpandedKeys:P,uncontrolledExpanededKeys:f,mergedExpandedKeys:I,uncontrolledValue:p,mergedValue:z,activePath:T,tmNodes:S,mergedTheme:n,mergedCollapsed:l,cssVars:o?void 0:x,themeClass:y==null?void 0:y.themeClass,overflowRef:L,counterRef:ae,updateCounter:()=>{},onResize:ze,onUpdateOverflow:Ge,onUpdateCount:Ue,renderCounter:Xe,getCounter:De,onRender:y==null?void 0:y.onRender,showOption:_,deriveResponsiveState:ze}},render(){const{mergedClsPrefix:e,mode:t,themeClass:o,onRender:n}=this;n==null||n();const a=()=>this.tmNodes.map(c=>we(c,this.$props)),v=t==="horizontal"&&this.responsive,m=()=>s("div",no(this.$attrs,{role:t==="horizontal"?"menubar":"menu",class:[`${e}-menu`,o,`${e}-menu--${t}`,v&&`${e}-menu--responsive`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars}),v?s(yo,{ref:"overflowRef",onUpdateOverflow:this.onUpdateOverflow,getCounter:this.getCounter,onUpdateCount:this.onUpdateCount,updateCounter:this.updateCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:a,counter:this.renderCounter}):a());return v?s(ho,{onResize:this.onResize},{default:m}):m()}}),Xo={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Zo=$("path",{d:"M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z",fill:"none",stroke:"currentColor","stroke-miterlimit":"10","stroke-width":"32"},null,-1),Jo=$("path",{d:"M250.26 166.05L256 288l5.73-121.95a5.74 5.74 0 0 0-5.79-6h0a5.74 5.74 0 0 0-5.68 6z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Qo=$("path",{d:"M256 367.91a20 20 0 1 1 20-20a20 20 0 0 1-20 20z",fill:"currentColor"},null,-1),et=[Zo,Jo,Qo],ot=N({name:"AlertCircleOutline",render:function(t,o){return Y(),Z("svg",Xo,et)}}),tt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},rt=$("path",{d:"M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62z",fill:"none",stroke:"currentColor","stroke-linejoin":"round","stroke-width":"32"},null,-1),nt=$("path",{d:"M256 56v120a32 32 0 0 0 32 32h120",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),it=$("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 288h160"},null,-1),lt=$("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 368h160"},null,-1),at=[rt,nt,it,lt],ct=N({name:"DocumentTextOutline",render:function(t,o){return Y(),Z("svg",tt,at)}}),st={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},dt=Ne('<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M160 144h288"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M160 256h288"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M160 368h288"></path><circle cx="80" cy="144" r="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><circle cx="80" cy="256" r="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><circle cx="80" cy="368" r="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle>',6),ut=[dt],vt=N({name:"ListOutline",render:function(t,o){return Y(),Z("svg",st,ut)}}),ht={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},mt=$("path",{d:"M402 168c-2.93 40.67-33.1 72-66 72s-63.12-31.32-66-72c-3-42.31 26.37-72 66-72s69 30.46 66 72z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),pt=$("path",{d:"M336 304c-65.17 0-127.84 32.37-143.54 95.41c-2.08 8.34 3.15 16.59 11.72 16.59h263.65c8.57 0 13.77-8.25 11.72-16.59C463.85 335.36 401.18 304 336 304z",fill:"none",stroke:"currentColor","stroke-miterlimit":"10","stroke-width":"32"},null,-1),ft=$("path",{d:"M200 185.94c-2.34 32.48-26.72 58.06-53 58.06s-50.7-25.57-53-58.06C91.61 152.15 115.34 128 147 128s55.39 24.77 53 57.94z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),gt=$("path",{d:"M206 306c-18.05-8.27-37.93-11.45-59-11.45c-52 0-102.1 25.85-114.65 76.2c-1.65 6.66 2.53 13.25 9.37 13.25H154",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32"},null,-1),Ct=[mt,pt,ft,gt],bt=N({name:"PeopleOutline",render:function(t,o){return Y(),Z("svg",ht,Ct)}}),xt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},yt=$("ellipse",{cx:"256",cy:"128",rx:"192",ry:"80",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32"},null,-1),wt=$("path",{d:"M448 214c0 44.18-86 80-192 80S64 258.18 64 214",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32"},null,-1),zt=$("path",{d:"M448 300c0 44.18-86 80-192 80S64 344.18 64 300",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32"},null,-1),It=$("path",{d:"M64 127.24v257.52C64 428.52 150 464 256 464s192-35.48 192-79.24V127.24",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32"},null,-1),kt=[yt,wt,zt,It],St=N({name:"ServerOutline",render:function(t,o){return Y(),Z("svg",xt,kt)}}),At={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Ht=Ne('<path d="M326.1 231.9l-47.5 75.5a31 31 0 0 1-7 7a30.11 30.11 0 0 1-35-49l75.5-47.5a10.23 10.23 0 0 1 11.7 0a10.06 10.06 0 0 1 2.3 14z" fill="currentColor"></path><path d="M256 64C132.3 64 32 164.2 32 287.9a223.18 223.18 0 0 0 56.3 148.5c1.1 1.2 2.1 2.4 3.2 3.5a25.19 25.19 0 0 0 37.1-.1a173.13 173.13 0 0 1 254.8 0a25.19 25.19 0 0 0 37.1.1l3.2-3.5A223.18 223.18 0 0 0 480 287.9C480 164.2 379.7 64 256 64z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M256 128v32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M416 288h-32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M128 288H96"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M165.49 197.49l-22.63-22.63"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M346.51 197.49l22.63-22.63"></path>',7),_t=[Ht],Rt=N({name:"SpeedometerOutline",render:function(t,o){return Y(),Z("svg",At,_t)}}),Pt={style:{padding:"16px","text-align":"center","font-weight":"bold","font-size":"16px"}},Tt={style:{"font-size":"14px"}},Kt=N({__name:"AdminLayout",setup(e){const t=so(),o=uo(),n=io(),a=B(!1);function l(R){return()=>s(xo,null,{default:()=>s(R)})}const v=[{label:"仪表盘",key:"/admin/dashboard",icon:l(Rt)},{label:"用户管理",key:"/admin/users",icon:l(bt)},{label:"母机管理",key:"/admin/hosts",icon:l(St)},{label:"告警配置",key:"/admin/alerts/rules",icon:l(ot)},{label:"告警记录",key:"/admin/alerts/logs",icon:l(vt)},{label:"操作日志",key:"/admin/audit",icon:l(ct)}],m=C(()=>o.path);function c(R){t.push(R)}function p(){n.logout(),t.push("/login")}return(R,z)=>{const f=co("router-view");return Y(),lo(j(Ae),{"has-sider":"",style:{"min-height":"100vh"}},{default:G(()=>[V(j(Lo),{bordered:"",collapsed:a.value,"collapse-mode":"width","collapsed-width":64,width:220,"show-trigger":"",onCollapse:z[0]||(z[0]=H=>a.value=!0),onExpand:z[1]||(z[1]=H=>a.value=!1)},{default:G(()=>[$("div",Pt,Se(a.value?"LXC":"LXC 流量监控"),1),V(j(Wo),{collapsed:a.value,"collapsed-width":64,"collapsed-icon-size":22,options:v,value:m.value,"onUpdate:value":c},null,8,["collapsed","value"])]),_:1},8,["collapsed"]),V(j(Ae),null,{default:G(()=>[V(j($o),{bordered:"",style:{padding:"12px 24px",display:"flex","justify-content":"space-between","align-items":"center"}},{default:G(()=>[z[3]||(z[3]=$("span",{style:{"font-size":"14px",color:"#666"}},"管理后台",-1)),V(j(bo),{align:"center"},{default:G(()=>[$("span",Tt,Se(j(n).username),1),V(j(zo),{size:"small",onClick:p},{default:G(()=>[...z[2]||(z[2]=[ao("登出",-1)])]),_:1})]),_:1})]),_:1}),V(j(Po),{style:{padding:"24px"}},{default:G(()=>[V(f)]),_:1})]),_:1})]),_:1})}}});export{Kt as default};
