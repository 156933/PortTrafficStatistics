import{g as L,y as d,z as ke,A as re,B as Q,C as f,D as ao,E as S,G as so,H as h,I as ce,J as Y,K as de,i as w,m as B,k as co,L as xe,M as uo,N as vo,O as W,P as ho,Q as Me,R as ue,S as N,T as J,U as Le,V as se,W as te,X as mo,Y as Z,Z as ye,F as fo,_ as po,$ as go,a0 as bo,o as D,c as G,a as O,b as Be,q as Co,j as xo,w as q,u as U,d as K,a1 as ve,h as he,a2 as yo,e as wo,t as Pe,r as zo,v as Io,a3 as ko}from"./index-CTkP_6SE.js";import{i as So,r as _o,a as Ao,V as Ee,c as Ho,s as Ro,S as je,u as Fe,b as V,k as Se}from"./Scrollbar-H6Or62Uk.js";import{d as Po,t as Oo,C as To,N as No,a as $o,b as Oe}from"./Dropdown-BzRDd7F6.js";import{t as Mo,k as me}from"./Tag-CidDSDqo.js";import{f as fe,u as we}from"./get-BqNwwqIS.js";import{V as Lo,c as pe}from"./Popover-C76e-CDG.js";import{u as Bo}from"./use-compitable-Ha6lAY6i.js";import{_ as Eo}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./fade-in.cssr-DeTMvEbb.js";const jo=L({name:"ChevronDownFilled",render(){return d("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},d("path",{d:"M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z",fill:"currentColor"}))}}),Fo=So&&"loading"in document.createElement("img");function Ko(e={}){var t;const{root:o=null}=e;return{hash:`${e.rootMargin||"0px 0px 0px 0px"}-${Array.isArray(e.threshold)?e.threshold.join(","):(t=e.threshold)!==null&&t!==void 0?t:"0"}`,options:Object.assign(Object.assign({},e),{root:(typeof o=="string"?document.querySelector(o):o)||document.documentElement})}}const ge=new WeakMap,be=new WeakMap,Ce=new WeakMap,Vo=(e,t,o)=>{if(!e)return()=>{};const r=Ko(t),{root:l}=r.options;let i;const c=ge.get(l);c?i=c:(i=new Map,ge.set(l,i));let m,s;i.has(r.hash)?(s=i.get(r.hash),s[1].has(e)||(m=s[0],s[1].add(e),m.observe(e))):(m=new IntersectionObserver(y=>{y.forEach(v=>{if(v.isIntersecting){const z=be.get(v.target),R=Ce.get(v.target);z&&z(),R&&(R.value=!0)}})},r.options),m.observe(e),s=[m,new Set([e])],i.set(r.hash,s));let u=!1;const x=()=>{u||(be.delete(e),Ce.delete(e),u=!0,s[1].has(e)&&(s[0].unobserve(e),s[1].delete(e)),s[1].size<=0&&i.delete(r.hash),i.size||ge.delete(l))};return be.set(e,x),Ce.set(e,o),x};function Do(e){const{borderRadius:t,avatarColor:o,cardColor:r,fontSize:l,heightTiny:i,heightSmall:c,heightMedium:m,heightLarge:s,heightHuge:u,modalColor:x,popoverColor:y}=e;return{borderRadius:t,fontSize:l,border:`2px solid ${r}`,heightTiny:i,heightSmall:c,heightMedium:m,heightLarge:s,heightHuge:u,color:re(r,o),colorModal:re(x,o),colorPopover:re(y,o)}}const Uo={common:ke,self:Do},Wo=Q("n-avatar-group"),Go=f("avatar",`
 width: var(--n-merged-size);
 height: var(--n-merged-size);
 color: #FFF;
 font-size: var(--n-font-size);
 display: inline-flex;
 position: relative;
 overflow: hidden;
 text-align: center;
 border: var(--n-border);
 border-radius: var(--n-border-radius);
 --n-merged-color: var(--n-color);
 background-color: var(--n-merged-color);
 transition:
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[ao(S("&","--n-merged-color: var(--n-color-modal);")),so(S("&","--n-merged-color: var(--n-color-popover);")),S("img",`
 width: 100%;
 height: 100%;
 `),h("text",`
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `),f("icon",`
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `),h("text","line-height: 1.25")]),qo=Object.assign(Object.assign({},Y.props),{size:[String,Number],src:String,circle:{type:Boolean,default:void 0},objectFit:String,round:{type:Boolean,default:void 0},bordered:{type:Boolean,default:void 0},onError:Function,fallbackSrc:String,intersectionObserverOptions:Object,lazy:Boolean,onLoad:Function,renderPlaceholder:Function,renderFallback:Function,imgProps:Object,color:String}),Yo=L({name:"Avatar",props:qo,slots:Object,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=ce(e),r=B(!1);let l=null;const i=B(null),c=B(null),m=()=>{const{value:p}=i;if(p&&(l===null||l!==p.innerHTML)){l=p.innerHTML;const{value:A}=c;if(A){const{offsetWidth:T,offsetHeight:H}=A,{offsetWidth:b,offsetHeight:k}=p,j=.9,F=Math.min(T/b*j,H/k*j,1);p.style.transform=`translateX(-50%) translateY(-50%) scale(${F})`}}},s=W(Wo,null),u=w(()=>{const{size:p}=e;if(p)return p;const{size:A}=s||{};return A||"medium"}),x=Y("Avatar","-avatar",Go,Uo,e,t),y=W(Mo,null),v=w(()=>{if(s)return!0;const{round:p,circle:A}=e;return p!==void 0||A!==void 0?p||A:y?y.roundRef.value:!1}),z=w(()=>s?!0:e.bordered||!1),R=w(()=>{const p=u.value,A=v.value,T=z.value,{color:H}=e,{self:{borderRadius:b,fontSize:k,color:j,border:F,colorModal:ee,colorPopover:E},common:{cubicBezierEaseInOut:ie}}=x.value;let oe;return typeof p=="number"?oe=`${p}px`:oe=x.value.self[ho("height",p)],{"--n-font-size":k,"--n-border":T?F:"none","--n-border-radius":A?"50%":b,"--n-color":H||j,"--n-color-modal":H||ee,"--n-color-popover":H||E,"--n-bezier":ie,"--n-merged-size":`var(--n-avatar-size-override, ${oe})`}}),I=o?de("avatar",w(()=>{const p=u.value,A=v.value,T=z.value,{color:H}=e;let b="";return p&&(typeof p=="number"?b+=`a${p}`:b+=p[0]),A&&(b+="b"),T&&(b+="c"),H&&(b+=Ho(H)),b}),R,e):void 0,P=B(!e.lazy);co(()=>{if(e.lazy&&e.intersectionObserverOptions){let p;const A=xe(()=>{p==null||p(),p=void 0,e.lazy&&(p=Vo(c.value,e.intersectionObserverOptions,P))});uo(()=>{A(),p==null||p()})}}),vo(()=>{var p;return e.src||((p=e.imgProps)===null||p===void 0?void 0:p.src)},()=>{r.value=!1});const $=B(!e.lazy);return{textRef:i,selfRef:c,mergedRoundRef:v,mergedClsPrefix:t,fitTextTransform:m,cssVars:o?void 0:R,themeClass:I==null?void 0:I.themeClass,onRender:I==null?void 0:I.onRender,hasLoadError:r,shouldStartLoading:P,loaded:$,mergedOnError:p=>{if(!P.value)return;r.value=!0;const{onError:A,imgProps:{onError:T}={}}=e;A==null||A(p),T==null||T(p)},mergedOnLoad:p=>{const{onLoad:A,imgProps:{onLoad:T}={}}=e;A==null||A(p),T==null||T(p),$.value=!0}}},render(){var e,t;const{$slots:o,src:r,mergedClsPrefix:l,lazy:i,onRender:c,loaded:m,hasLoadError:s,imgProps:u={}}=this;c==null||c();let x;const y=!m&&!s&&(this.renderPlaceholder?this.renderPlaceholder():(t=(e=this.$slots).placeholder)===null||t===void 0?void 0:t.call(e));return this.hasLoadError?x=this.renderFallback?this.renderFallback():_o(o.fallback,()=>[d("img",{src:this.fallbackSrc,style:{objectFit:this.objectFit}})]):x=Ao(o.default,v=>{if(v)return d(Ee,{onResize:this.fitTextTransform},{default:()=>d("span",{ref:"textRef",class:`${l}-avatar__text`},v)});if(r||u.src){const z=this.src||u.src;return d("img",Object.assign(Object.assign({},u),{loading:Fo&&!this.intersectionObserverOptions&&i?"lazy":"eager",src:i&&this.intersectionObserverOptions?this.shouldStartLoading?z:void 0:z,"data-image-src":z,onLoad:this.mergedOnLoad,onError:this.mergedOnError,style:[u.style||"",{objectFit:this.objectFit},y?{height:"0",width:"0",visibility:"hidden",position:"absolute"}:""]}))}}),d("span",{ref:"selfRef",class:[`${l}-avatar`,this.themeClass],style:this.cssVars},x,i&&y)}});function Xo(e){const{baseColor:t,textColor2:o,bodyColor:r,cardColor:l,dividerColor:i,actionColor:c,scrollbarColor:m,scrollbarColorHover:s,invertedColor:u}=e;return{textColor:o,textColorInverted:"#FFF",color:r,colorEmbedded:c,headerColor:l,headerColorInverted:u,footerColor:c,footerColorInverted:u,headerBorderColor:i,headerBorderColorInverted:u,footerBorderColor:i,footerBorderColorInverted:u,siderBorderColor:i,siderBorderColorInverted:u,siderColor:l,siderColorInverted:u,siderToggleButtonBorder:`1px solid ${i}`,siderToggleButtonColor:t,siderToggleButtonIconColor:o,siderToggleButtonIconColorInverted:o,siderToggleBarColor:re(r,m),siderToggleBarColorHover:re(r,s),__invertScrollbar:"true"}}const Ke=Me({name:"Layout",common:ke,peers:{Scrollbar:Ro},self:Xo});function Zo(e,t,o,r){return{itemColorHoverInverted:"#0000",itemColorActiveInverted:t,itemColorActiveHoverInverted:t,itemColorActiveCollapsedInverted:t,itemTextColorInverted:e,itemTextColorHoverInverted:o,itemTextColorChildActiveInverted:o,itemTextColorChildActiveHoverInverted:o,itemTextColorActiveInverted:o,itemTextColorActiveHoverInverted:o,itemTextColorHorizontalInverted:e,itemTextColorHoverHorizontalInverted:o,itemTextColorChildActiveHorizontalInverted:o,itemTextColorChildActiveHoverHorizontalInverted:o,itemTextColorActiveHorizontalInverted:o,itemTextColorActiveHoverHorizontalInverted:o,itemIconColorInverted:e,itemIconColorHoverInverted:o,itemIconColorActiveInverted:o,itemIconColorActiveHoverInverted:o,itemIconColorChildActiveInverted:o,itemIconColorChildActiveHoverInverted:o,itemIconColorCollapsedInverted:e,itemIconColorHorizontalInverted:e,itemIconColorHoverHorizontalInverted:o,itemIconColorActiveHorizontalInverted:o,itemIconColorActiveHoverHorizontalInverted:o,itemIconColorChildActiveHorizontalInverted:o,itemIconColorChildActiveHoverHorizontalInverted:o,arrowColorInverted:e,arrowColorHoverInverted:o,arrowColorActiveInverted:o,arrowColorActiveHoverInverted:o,arrowColorChildActiveInverted:o,arrowColorChildActiveHoverInverted:o,groupTextColorInverted:r}}function Jo(e){const{borderRadius:t,textColor3:o,primaryColor:r,textColor2:l,textColor1:i,fontSize:c,dividerColor:m,hoverColor:s,primaryColorHover:u}=e;return Object.assign({borderRadius:t,color:"#0000",groupTextColor:o,itemColorHover:s,itemColorActive:ue(r,{alpha:.1}),itemColorActiveHover:ue(r,{alpha:.1}),itemColorActiveCollapsed:ue(r,{alpha:.1}),itemTextColor:l,itemTextColorHover:l,itemTextColorActive:r,itemTextColorActiveHover:r,itemTextColorChildActive:r,itemTextColorChildActiveHover:r,itemTextColorHorizontal:l,itemTextColorHoverHorizontal:u,itemTextColorActiveHorizontal:r,itemTextColorActiveHoverHorizontal:r,itemTextColorChildActiveHorizontal:r,itemTextColorChildActiveHoverHorizontal:r,itemIconColor:i,itemIconColorHover:i,itemIconColorActive:r,itemIconColorActiveHover:r,itemIconColorChildActive:r,itemIconColorChildActiveHover:r,itemIconColorCollapsed:i,itemIconColorHorizontal:i,itemIconColorHoverHorizontal:u,itemIconColorActiveHorizontal:r,itemIconColorActiveHoverHorizontal:r,itemIconColorChildActiveHorizontal:r,itemIconColorChildActiveHoverHorizontal:r,itemHeight:"42px",arrowColor:l,arrowColorHover:l,arrowColorActive:r,arrowColorActiveHover:r,arrowColorChildActive:r,arrowColorChildActiveHover:r,colorInverted:"#0000",borderColorHorizontal:"#0000",fontSize:c,dividerColor:m},Zo("#BBB",r,"#FFF","#AAA"))}const Qo=Me({name:"Menu",common:ke,peers:{Tooltip:Oo,Dropdown:Po},self:Jo}),Ve=Q("n-layout-sider"),De={type:String,default:"static"},et=f("layout",`
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
`,[f("layout-scroll-container",`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),N("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),ot={embedded:Boolean,position:De,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:""},hasSider:Boolean,siderPlacement:{type:String,default:"left"}},Ue=Q("n-layout");function We(e){return L({name:e?"LayoutContent":"Layout",props:Object.assign(Object.assign({},Y.props),ot),setup(t){const o=B(null),r=B(null),{mergedClsPrefixRef:l,inlineThemeDisabled:i}=ce(t),c=Y("Layout","-layout",et,Ke,t,l);function m(I,P){if(t.nativeScrollbar){const{value:$}=o;$&&(P===void 0?$.scrollTo(I):$.scrollTo(I,P))}else{const{value:$}=r;$&&$.scrollTo(I,P)}}J(Ue,t);let s=0,u=0;const x=I=>{var P;const $=I.target;s=$.scrollLeft,u=$.scrollTop,(P=t.onScroll)===null||P===void 0||P.call(t,I)};Fe(()=>{if(t.nativeScrollbar){const I=o.value;I&&(I.scrollTop=u,I.scrollLeft=s)}});const y={display:"flex",flexWrap:"nowrap",width:"100%",flexDirection:"row"},v={scrollTo:m},z=w(()=>{const{common:{cubicBezierEaseInOut:I},self:P}=c.value;return{"--n-bezier":I,"--n-color":t.embedded?P.colorEmbedded:P.color,"--n-text-color":P.textColor}}),R=i?de("layout",w(()=>t.embedded?"e":""),z,t):void 0;return Object.assign({mergedClsPrefix:l,scrollableElRef:o,scrollbarInstRef:r,hasSiderStyle:y,mergedTheme:c,handleNativeElScroll:x,cssVars:i?void 0:z,themeClass:R==null?void 0:R.themeClass,onRender:R==null?void 0:R.onRender},v)},render(){var t;const{mergedClsPrefix:o,hasSider:r}=this;(t=this.onRender)===null||t===void 0||t.call(this);const l=r?this.hasSiderStyle:void 0,i=[this.themeClass,e&&`${o}-layout-content`,`${o}-layout`,`${o}-layout--${this.position}-positioned`];return d("div",{class:i,style:this.cssVars},this.nativeScrollbar?d("div",{ref:"scrollableElRef",class:[`${o}-layout-scroll-container`,this.contentClass],style:[this.contentStyle,l],onScroll:this.handleNativeElScroll},this.$slots):d(je,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,l]}),this.$slots))}})}const Te=We(!1),tt=We(!0),rt=f("layout-sider",`
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
`,[N("bordered",[h("border",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),h("left-placement",[N("bordered",[h("border",`
 right: 0;
 `)])]),N("right-placement",`
 justify-content: flex-start;
 `,[N("bordered",[h("border",`
 left: 0;
 `)]),N("collapsed",[f("layout-toggle-button",[f("base-icon",`
 transform: rotate(180deg);
 `)]),f("layout-toggle-bar",[S("&:hover",[h("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),h("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])])]),f("layout-toggle-button",`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[f("base-icon",`
 transform: rotate(0);
 `)]),f("layout-toggle-bar",`
 left: -28px;
 transform: rotate(180deg);
 `,[S("&:hover",[h("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),h("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})])])]),N("collapsed",[f("layout-toggle-bar",[S("&:hover",[h("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),h("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])]),f("layout-toggle-button",[f("base-icon",`
 transform: rotate(0);
 `)])]),f("layout-toggle-button",`
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
 `,[f("base-icon",`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),f("layout-toggle-bar",`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[h("top, bottom",`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),h("bottom",`
 position: absolute;
 top: 34px;
 `),S("&:hover",[h("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),h("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})]),h("top, bottom",{backgroundColor:"var(--n-toggle-bar-color)"}),S("&:hover",[h("top, bottom",{backgroundColor:"var(--n-toggle-bar-color-hover)"})])]),h("border",`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),f("layout-sider-scroll-container",`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),N("show-content",[f("layout-sider-scroll-container",{opacity:1})]),N("absolute-positioned",`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),nt=L({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return d("div",{onClick:this.onClick,class:`${e}-layout-toggle-bar`},d("div",{class:`${e}-layout-toggle-bar__top`}),d("div",{class:`${e}-layout-toggle-bar__bottom`}))}}),it=L({name:"LayoutToggleButton",props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return d("div",{class:`${e}-layout-toggle-button`,onClick:this.onClick},d(Le,{clsPrefix:e},{default:()=>d(To,null)}))}}),lt={position:De,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:""},collapseMode:{type:String,default:"transform"},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},at=L({name:"LayoutSider",props:Object.assign(Object.assign({},Y.props),lt),setup(e){const t=W(Ue),o=B(null),r=B(null),l=B(e.defaultCollapsed),i=we(se(e,"collapsed"),l),c=w(()=>fe(i.value?e.collapsedWidth:e.width)),m=w(()=>e.collapseMode!=="transform"?{}:{minWidth:fe(e.width)}),s=w(()=>t?t.siderPlacement:"left");function u(H,b){if(e.nativeScrollbar){const{value:k}=o;k&&(b===void 0?k.scrollTo(H):k.scrollTo(H,b))}else{const{value:k}=r;k&&k.scrollTo(H,b)}}function x(){const{"onUpdate:collapsed":H,onUpdateCollapsed:b,onExpand:k,onCollapse:j}=e,{value:F}=i;b&&V(b,!F),H&&V(H,!F),l.value=!F,F?k&&V(k):j&&V(j)}let y=0,v=0;const z=H=>{var b;const k=H.target;y=k.scrollLeft,v=k.scrollTop,(b=e.onScroll)===null||b===void 0||b.call(e,H)};Fe(()=>{if(e.nativeScrollbar){const H=o.value;H&&(H.scrollTop=v,H.scrollLeft=y)}}),J(Ve,{collapsedRef:i,collapseModeRef:se(e,"collapseMode")});const{mergedClsPrefixRef:R,inlineThemeDisabled:I}=ce(e),P=Y("Layout","-layout-sider",rt,Ke,e,R);function $(H){var b,k;H.propertyName==="max-width"&&(i.value?(b=e.onAfterLeave)===null||b===void 0||b.call(e):(k=e.onAfterEnter)===null||k===void 0||k.call(e))}const p={scrollTo:u},A=w(()=>{const{common:{cubicBezierEaseInOut:H},self:b}=P.value,{siderToggleButtonColor:k,siderToggleButtonBorder:j,siderToggleBarColor:F,siderToggleBarColorHover:ee}=b,E={"--n-bezier":H,"--n-toggle-button-color":k,"--n-toggle-button-border":j,"--n-toggle-bar-color":F,"--n-toggle-bar-color-hover":ee};return e.inverted?(E["--n-color"]=b.siderColorInverted,E["--n-text-color"]=b.textColorInverted,E["--n-border-color"]=b.siderBorderColorInverted,E["--n-toggle-button-icon-color"]=b.siderToggleButtonIconColorInverted,E.__invertScrollbar=b.__invertScrollbar):(E["--n-color"]=b.siderColor,E["--n-text-color"]=b.textColor,E["--n-border-color"]=b.siderBorderColor,E["--n-toggle-button-icon-color"]=b.siderToggleButtonIconColor),E}),T=I?de("layout-sider",w(()=>e.inverted?"a":"b"),A,e):void 0;return Object.assign({scrollableElRef:o,scrollbarInstRef:r,mergedClsPrefix:R,mergedTheme:P,styleMaxWidth:c,mergedCollapsed:i,scrollContainerStyle:m,siderPlacement:s,handleNativeElScroll:z,handleTransitionend:$,handleTriggerClick:x,inlineThemeDisabled:I,cssVars:A,themeClass:T==null?void 0:T.themeClass,onRender:T==null?void 0:T.onRender},p)},render(){var e;const{mergedClsPrefix:t,mergedCollapsed:o,showTrigger:r}=this;return(e=this.onRender)===null||e===void 0||e.call(this),d("aside",{class:[`${t}-layout-sider`,this.themeClass,`${t}-layout-sider--${this.position}-positioned`,`${t}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${t}-layout-sider--bordered`,o&&`${t}-layout-sider--collapsed`,(!o||this.showCollapsedContent)&&`${t}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:fe(this.width)}]},this.nativeScrollbar?d("div",{class:[`${t}-layout-sider-scroll-container`,this.contentClass],onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:"auto"},this.contentStyle],ref:"scrollableElRef"},this.$slots):d(je,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar==="true"?{colorHover:"rgba(255, 255, 255, .4)",color:"rgba(255, 255, 255, .3)"}:void 0}),this.$slots),r?r==="bar"?d(nt,{clsPrefix:t,class:o?this.collapsedTriggerClass:this.triggerClass,style:o?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):d(it,{clsPrefix:t,class:o?this.collapsedTriggerClass:this.triggerClass,style:o?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?d("div",{class:`${t}-layout-sider__border`}):null)}}),ne=Q("n-menu"),Ge=Q("n-submenu"),_e=Q("n-menu-item-group"),Ne=[S("&::before","background-color: var(--n-item-color-hover);"),h("arrow",`
 color: var(--n-arrow-color-hover);
 `),h("icon",`
 color: var(--n-item-icon-color-hover);
 `),f("menu-item-content-header",`
 color: var(--n-item-text-color-hover);
 `,[S("a",`
 color: var(--n-item-text-color-hover);
 `),h("extra",`
 color: var(--n-item-text-color-hover);
 `)])],$e=[h("icon",`
 color: var(--n-item-icon-color-hover-horizontal);
 `),f("menu-item-content-header",`
 color: var(--n-item-text-color-hover-horizontal);
 `,[S("a",`
 color: var(--n-item-text-color-hover-horizontal);
 `),h("extra",`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],st=S([f("menu",`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[N("horizontal",`
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `,[f("submenu","margin: 0;"),f("menu-item","margin: 0;"),f("menu-item-content",`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[S("&::before","display: none;"),N("selected","border-bottom: 2px solid var(--n-border-color-horizontal)")]),f("menu-item-content",[N("selected",[h("icon","color: var(--n-item-icon-color-active-horizontal);"),f("menu-item-content-header",`
 color: var(--n-item-text-color-active-horizontal);
 `,[S("a","color: var(--n-item-text-color-active-horizontal);"),h("extra","color: var(--n-item-text-color-active-horizontal);")])]),N("child-active",`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[f("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[S("a",`
 color: var(--n-item-text-color-child-active-horizontal);
 `),h("extra",`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),h("icon",`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),te("disabled",[te("selected, child-active",[S("&:focus-within",$e)]),N("selected",[X(null,[h("icon","color: var(--n-item-icon-color-active-hover-horizontal);"),f("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[S("a","color: var(--n-item-text-color-active-hover-horizontal);"),h("extra","color: var(--n-item-text-color-active-hover-horizontal);")])])]),N("child-active",[X(null,[h("icon","color: var(--n-item-icon-color-child-active-hover-horizontal);"),f("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[S("a","color: var(--n-item-text-color-child-active-hover-horizontal);"),h("extra","color: var(--n-item-text-color-child-active-hover-horizontal);")])])]),X("border-bottom: 2px solid var(--n-border-color-horizontal);",$e)]),f("menu-item-content-header",[S("a","color: var(--n-item-text-color-horizontal);")])])]),te("responsive",[f("menu-item-content-header",`
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),N("collapsed",[f("menu-item-content",[N("selected",[S("&::before",`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),f("menu-item-content-header","opacity: 0;"),h("arrow","opacity: 0;"),h("icon","color: var(--n-item-icon-color-collapsed);")])]),f("menu-item",`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),f("menu-item-content",`
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
 `,[S("> *","z-index: 1;"),S("&::before",`
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
 `),N("disabled",`
 opacity: .45;
 cursor: not-allowed;
 `),N("collapsed",[h("arrow","transform: rotate(0);")]),N("selected",[S("&::before","background-color: var(--n-item-color-active);"),h("arrow","color: var(--n-arrow-color-active);"),h("icon","color: var(--n-item-icon-color-active);"),f("menu-item-content-header",`
 color: var(--n-item-text-color-active);
 `,[S("a","color: var(--n-item-text-color-active);"),h("extra","color: var(--n-item-text-color-active);")])]),N("child-active",[f("menu-item-content-header",`
 color: var(--n-item-text-color-child-active);
 `,[S("a",`
 color: var(--n-item-text-color-child-active);
 `),h("extra",`
 color: var(--n-item-text-color-child-active);
 `)]),h("arrow",`
 color: var(--n-arrow-color-child-active);
 `),h("icon",`
 color: var(--n-item-icon-color-child-active);
 `)]),te("disabled",[te("selected, child-active",[S("&:focus-within",Ne)]),N("selected",[X(null,[h("arrow","color: var(--n-arrow-color-active-hover);"),h("icon","color: var(--n-item-icon-color-active-hover);"),f("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover);
 `,[S("a","color: var(--n-item-text-color-active-hover);"),h("extra","color: var(--n-item-text-color-active-hover);")])])]),N("child-active",[X(null,[h("arrow","color: var(--n-arrow-color-child-active-hover);"),h("icon","color: var(--n-item-icon-color-child-active-hover);"),f("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover);
 `,[S("a","color: var(--n-item-text-color-child-active-hover);"),h("extra","color: var(--n-item-text-color-child-active-hover);")])])]),N("selected",[X(null,[S("&::before","background-color: var(--n-item-color-active-hover);")])]),X(null,Ne)]),h("icon",`
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
 `),h("arrow",`
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `),f("menu-item-content-header",`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 color: var(--n-item-text-color);
 `,[S("a",`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[S("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),h("extra",`
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]),f("submenu",`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[f("menu-item-content",`
 height: var(--n-item-height);
 `),f("submenu-children",`
 overflow: hidden;
 padding: 0;
 `,[mo({duration:".2s"})])]),f("menu-item-group",[f("menu-item-group-title",`
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
 `)])]),f("menu-tooltip",[S("a",`
 color: inherit;
 text-decoration: none;
 `)]),f("menu-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function X(e,t){return[N("hover",e,t),S("&:hover",e,t)]}const qe=L({name:"MenuOptionContent",props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0},isEllipsisPlaceholder:Boolean},setup(e){const{props:t}=W(ne);return{menuProps:t,style:w(()=>{const{paddingLeft:o}=e;return{paddingLeft:o&&`${o}px`}}),iconStyle:w(()=>{const{maxIconSize:o,activeIconSize:r,iconMarginRight:l}=e;return{width:`${o}px`,height:`${o}px`,fontSize:`${r}px`,marginRight:`${l}px`}})}},render(){const{clsPrefix:e,tmNode:t,menuProps:{renderIcon:o,renderLabel:r,renderExtra:l,expandIcon:i}}=this,c=o?o(t.rawNode):Z(this.icon);return d("div",{onClick:m=>{var s;(s=this.onClick)===null||s===void 0||s.call(this,m)},role:"none",class:[`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}],style:this.style},c&&d("div",{class:`${e}-menu-item-content__icon`,style:this.iconStyle,role:"none"},[c]),d("div",{class:`${e}-menu-item-content-header`,role:"none"},this.isEllipsisPlaceholder?this.title:r?r(t.rawNode):Z(this.title),this.extra||l?d("span",{class:`${e}-menu-item-content-header__extra`}," ",l?l(t.rawNode):Z(this.extra)):null),this.showArrow?d(Le,{ariaHidden:!0,class:`${e}-menu-item-content__arrow`,clsPrefix:e},{default:()=>i?i(t.rawNode):d(jo,null)}):null)}}),ae=8;function Ae(e){const t=W(ne),{props:o,mergedCollapsedRef:r}=t,l=W(Ge,null),i=W(_e,null),c=w(()=>o.mode==="horizontal"),m=w(()=>c.value?o.dropdownPlacement:"tmNodes"in e?"right-start":"right"),s=w(()=>{var v;return Math.max((v=o.collapsedIconSize)!==null&&v!==void 0?v:o.iconSize,o.iconSize)}),u=w(()=>{var v;return!c.value&&e.root&&r.value&&(v=o.collapsedIconSize)!==null&&v!==void 0?v:o.iconSize}),x=w(()=>{if(c.value)return;const{collapsedWidth:v,indent:z,rootIndent:R}=o,{root:I,isGroup:P}=e,$=R===void 0?z:R;return I?r.value?v/2-s.value/2:$:i&&typeof i.paddingLeftRef.value=="number"?z/2+i.paddingLeftRef.value:l&&typeof l.paddingLeftRef.value=="number"?(P?z/2:z)+l.paddingLeftRef.value:0}),y=w(()=>{const{collapsedWidth:v,indent:z,rootIndent:R}=o,{value:I}=s,{root:P}=e;return c.value||!P||!r.value?ae:(R===void 0?z:R)+I+ae-(v+I)/2});return{dropdownPlacement:m,activeIconSize:u,maxIconSize:s,paddingLeft:x,iconMarginRight:y,NMenu:t,NSubmenu:l,NMenuOptionGroup:i}}const He={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},ct=L({name:"MenuDivider",setup(){const e=W(ne),{mergedClsPrefixRef:t,isHorizontalRef:o}=e;return()=>o.value?null:d("div",{class:`${t.value}-menu-divider`})}}),Ye=Object.assign(Object.assign({},He),{tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function}),dt=Se(Ye),ut=L({name:"MenuOption",props:Ye,setup(e){const t=Ae(e),{NSubmenu:o,NMenu:r,NMenuOptionGroup:l}=t,{props:i,mergedClsPrefixRef:c,mergedCollapsedRef:m}=r,s=o?o.mergedDisabledRef:l?l.mergedDisabledRef:{value:!1},u=w(()=>s.value||e.disabled);function x(v){const{onClick:z}=e;z&&z(v)}function y(v){u.value||(r.doSelect(e.internalKey,e.tmNode.rawNode),x(v))}return{mergedClsPrefix:c,dropdownPlacement:t.dropdownPlacement,paddingLeft:t.paddingLeft,iconMarginRight:t.iconMarginRight,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,mergedTheme:r.mergedThemeRef,menuProps:i,dropdownEnabled:ye(()=>e.root&&m.value&&i.mode!=="horizontal"&&!u.value),selected:ye(()=>r.mergedValueRef.value===e.internalKey),mergedDisabled:u,handleClick:y}},render(){const{mergedClsPrefix:e,mergedTheme:t,tmNode:o,menuProps:{renderLabel:r,nodeProps:l}}=this,i=l==null?void 0:l(o.rawNode);return d("div",Object.assign({},i,{role:"menuitem",class:[`${e}-menu-item`,i==null?void 0:i.class]}),d(No,{theme:t.peers.Tooltip,themeOverrides:t.peerOverrides.Tooltip,trigger:"hover",placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:["menu-tooltip"]},{default:()=>r?r(o.rawNode):Z(this.title),trigger:()=>d(qe,{tmNode:o,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick})}))}}),Xe=Object.assign(Object.assign({},He),{tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}}),vt=Se(Xe),ht=L({name:"MenuOptionGroup",props:Xe,setup(e){const t=Ae(e),{NSubmenu:o}=t,r=w(()=>o!=null&&o.mergedDisabledRef.value?!0:e.tmNode.disabled);J(_e,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:r});const{mergedClsPrefixRef:l,props:i}=W(ne);return function(){const{value:c}=l,m=t.paddingLeft.value,{nodeProps:s}=i,u=s==null?void 0:s(e.tmNode.rawNode);return d("div",{class:`${c}-menu-item-group`,role:"group"},d("div",Object.assign({},u,{class:[`${c}-menu-item-group-title`,u==null?void 0:u.class],style:[(u==null?void 0:u.style)||"",m!==void 0?`padding-left: ${m}px;`:""]}),Z(e.title),e.extra?d(fo,null," ",Z(e.extra)):null),d("div",null,e.tmNodes.map(x=>Re(x,i))))}}});function ze(e){return e.type==="divider"||e.type==="render"}function mt(e){return e.type==="divider"}function Re(e,t){const{rawNode:o}=e,{show:r}=o;if(r===!1)return null;if(ze(o))return mt(o)?d(ct,Object.assign({key:e.key},o.props)):null;const{labelField:l}=t,{key:i,level:c,isGroup:m}=e,s=Object.assign(Object.assign({},o),{title:o.title||o[l],extra:o.titleExtra||o.extra,key:i,internalKey:i,level:c,root:c===0,isGroup:m});return e.children?e.isGroup?d(ht,me(s,vt,{tmNode:e,tmNodes:e.children,key:i})):d(Ie,me(s,ft,{key:i,rawNodes:o[t.childrenField],tmNodes:e.children,tmNode:e})):d(ut,me(s,dt,{key:i,tmNode:e}))}const Ze=Object.assign(Object.assign({},He),{rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function,domId:String,virtualChildActive:{type:Boolean,default:void 0},isEllipsisPlaceholder:Boolean}),ft=Se(Ze),Ie=L({name:"Submenu",props:Ze,setup(e){const t=Ae(e),{NMenu:o,NSubmenu:r}=t,{props:l,mergedCollapsedRef:i,mergedThemeRef:c}=o,m=w(()=>{const{disabled:v}=e;return r!=null&&r.mergedDisabledRef.value||l.disabled?!0:v}),s=B(!1);J(Ge,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:m}),J(_e,null);function u(){const{onClick:v}=e;v&&v()}function x(){m.value||(i.value||o.toggleExpand(e.internalKey),u())}function y(v){s.value=v}return{menuProps:l,mergedTheme:c,doSelect:o.doSelect,inverted:o.invertedRef,isHorizontal:o.isHorizontalRef,mergedClsPrefix:o.mergedClsPrefixRef,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,iconMarginRight:t.iconMarginRight,dropdownPlacement:t.dropdownPlacement,dropdownShow:s,paddingLeft:t.paddingLeft,mergedDisabled:m,mergedValue:o.mergedValueRef,childActive:ye(()=>{var v;return(v=e.virtualChildActive)!==null&&v!==void 0?v:o.activePathRef.value.includes(e.internalKey)}),collapsed:w(()=>l.mode==="horizontal"?!1:i.value?!0:!o.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:w(()=>!m.value&&(l.mode==="horizontal"||i.value)),handlePopoverShowChange:y,handleClick:x}},render(){var e;const{mergedClsPrefix:t,menuProps:{renderIcon:o,renderLabel:r}}=this,l=()=>{const{isHorizontal:c,paddingLeft:m,collapsed:s,mergedDisabled:u,maxIconSize:x,activeIconSize:y,title:v,childActive:z,icon:R,handleClick:I,menuProps:{nodeProps:P},dropdownShow:$,iconMarginRight:p,tmNode:A,mergedClsPrefix:T,isEllipsisPlaceholder:H,extra:b}=this,k=P==null?void 0:P(A.rawNode);return d("div",Object.assign({},k,{class:[`${T}-menu-item`,k==null?void 0:k.class],role:"menuitem"}),d(qe,{tmNode:A,paddingLeft:m,collapsed:s,disabled:u,iconMarginRight:p,maxIconSize:x,activeIconSize:y,title:v,extra:b,showArrow:!c,childActive:z,clsPrefix:T,icon:R,hover:$,onClick:I,isEllipsisPlaceholder:H}))},i=()=>d(po,null,{default:()=>{const{tmNodes:c,collapsed:m}=this;return m?null:d("div",{class:`${t}-submenu-children`,role:"menu"},c.map(s=>Re(s,this.menuProps)))}});return this.root?d($o,Object.assign({size:"large",trigger:"hover"},(e=this.menuProps)===null||e===void 0?void 0:e.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:"14px",optionIconSizeLarge:"18px"},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:o,renderLabel:r}),{default:()=>d("div",{class:`${t}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},l(),this.isHorizontal?null:i())}):d("div",{class:`${t}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},l(),i())}}),pt=Object.assign(Object.assign({},Y.props),{options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},disabledField:{type:String,default:"disabled"},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:"vertical"},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,default:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,dropdownPlacement:{type:String,default:"bottom"},responsive:Boolean,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array}),gt=L({name:"Menu",inheritAttrs:!1,props:pt,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=ce(e),r=Y("Menu","-menu",st,Qo,e,t),l=W(Ve,null),i=w(()=>{var g;const{collapsed:_}=e;if(_!==void 0)return _;if(l){const{collapseModeRef:n,collapsedRef:C}=l;if(n.value==="width")return(g=C.value)!==null&&g!==void 0?g:!1}return!1}),c=w(()=>{const{keyField:g,childrenField:_,disabledField:n}=e;return pe(e.items||e.options,{getIgnored(C){return ze(C)},getChildren(C){return C[_]},getDisabled(C){return C[n]},getKey(C){var M;return(M=C[g])!==null&&M!==void 0?M:C.name}})}),m=w(()=>new Set(c.value.treeNodes.map(g=>g.key))),{watchProps:s}=e,u=B(null);s!=null&&s.includes("defaultValue")?xe(()=>{u.value=e.defaultValue}):u.value=e.defaultValue;const x=se(e,"value"),y=we(x,u),v=B([]),z=()=>{v.value=e.defaultExpandAll?c.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||c.value.getPath(y.value,{includeSelf:!1}).keyPath};s!=null&&s.includes("defaultExpandedKeys")?xe(z):z();const R=Bo(e,["expandedNames","expandedKeys"]),I=we(R,v),P=w(()=>c.value.treeNodes),$=w(()=>c.value.getPath(y.value).keyPath);J(ne,{props:e,mergedCollapsedRef:i,mergedThemeRef:r,mergedValueRef:y,mergedExpandedKeysRef:I,activePathRef:$,mergedClsPrefixRef:t,isHorizontalRef:w(()=>e.mode==="horizontal"),invertedRef:se(e,"inverted"),doSelect:p,toggleExpand:T});function p(g,_){const{"onUpdate:value":n,onUpdateValue:C,onSelect:M}=e;C&&V(C,g,_),n&&V(n,g,_),M&&V(M,g,_),u.value=g}function A(g){const{"onUpdate:expandedKeys":_,onUpdateExpandedKeys:n,onExpandedNamesChange:C,onOpenNamesChange:M}=e;_&&V(_,g),n&&V(n,g),C&&V(C,g),M&&V(M,g),v.value=g}function T(g){const _=Array.from(I.value),n=_.findIndex(C=>C===g);if(~n)_.splice(n,1);else{if(e.accordion&&m.value.has(g)){const C=_.findIndex(M=>m.value.has(M));C>-1&&_.splice(C,1)}_.push(g)}A(_)}const H=g=>{const _=c.value.getPath(g??y.value,{includeSelf:!1}).keyPath;if(!_.length)return;const n=Array.from(I.value),C=new Set([...n,..._]);e.accordion&&m.value.forEach(M=>{C.has(M)&&!_.includes(M)&&C.delete(M)}),A(Array.from(C))},b=w(()=>{const{inverted:g}=e,{common:{cubicBezierEaseInOut:_},self:n}=r.value,{borderRadius:C,borderColorHorizontal:M,fontSize:no,itemHeight:io,dividerColor:lo}=n,a={"--n-divider-color":lo,"--n-bezier":_,"--n-font-size":no,"--n-border-color-horizontal":M,"--n-border-radius":C,"--n-item-height":io};return g?(a["--n-group-text-color"]=n.groupTextColorInverted,a["--n-color"]=n.colorInverted,a["--n-item-text-color"]=n.itemTextColorInverted,a["--n-item-text-color-hover"]=n.itemTextColorHoverInverted,a["--n-item-text-color-active"]=n.itemTextColorActiveInverted,a["--n-item-text-color-child-active"]=n.itemTextColorChildActiveInverted,a["--n-item-text-color-child-active-hover"]=n.itemTextColorChildActiveInverted,a["--n-item-text-color-active-hover"]=n.itemTextColorActiveHoverInverted,a["--n-item-icon-color"]=n.itemIconColorInverted,a["--n-item-icon-color-hover"]=n.itemIconColorHoverInverted,a["--n-item-icon-color-active"]=n.itemIconColorActiveInverted,a["--n-item-icon-color-active-hover"]=n.itemIconColorActiveHoverInverted,a["--n-item-icon-color-child-active"]=n.itemIconColorChildActiveInverted,a["--n-item-icon-color-child-active-hover"]=n.itemIconColorChildActiveHoverInverted,a["--n-item-icon-color-collapsed"]=n.itemIconColorCollapsedInverted,a["--n-item-text-color-horizontal"]=n.itemTextColorHorizontalInverted,a["--n-item-text-color-hover-horizontal"]=n.itemTextColorHoverHorizontalInverted,a["--n-item-text-color-active-horizontal"]=n.itemTextColorActiveHorizontalInverted,a["--n-item-text-color-child-active-horizontal"]=n.itemTextColorChildActiveHorizontalInverted,a["--n-item-text-color-child-active-hover-horizontal"]=n.itemTextColorChildActiveHoverHorizontalInverted,a["--n-item-text-color-active-hover-horizontal"]=n.itemTextColorActiveHoverHorizontalInverted,a["--n-item-icon-color-horizontal"]=n.itemIconColorHorizontalInverted,a["--n-item-icon-color-hover-horizontal"]=n.itemIconColorHoverHorizontalInverted,a["--n-item-icon-color-active-horizontal"]=n.itemIconColorActiveHorizontalInverted,a["--n-item-icon-color-active-hover-horizontal"]=n.itemIconColorActiveHoverHorizontalInverted,a["--n-item-icon-color-child-active-horizontal"]=n.itemIconColorChildActiveHorizontalInverted,a["--n-item-icon-color-child-active-hover-horizontal"]=n.itemIconColorChildActiveHoverHorizontalInverted,a["--n-arrow-color"]=n.arrowColorInverted,a["--n-arrow-color-hover"]=n.arrowColorHoverInverted,a["--n-arrow-color-active"]=n.arrowColorActiveInverted,a["--n-arrow-color-active-hover"]=n.arrowColorActiveHoverInverted,a["--n-arrow-color-child-active"]=n.arrowColorChildActiveInverted,a["--n-arrow-color-child-active-hover"]=n.arrowColorChildActiveHoverInverted,a["--n-item-color-hover"]=n.itemColorHoverInverted,a["--n-item-color-active"]=n.itemColorActiveInverted,a["--n-item-color-active-hover"]=n.itemColorActiveHoverInverted,a["--n-item-color-active-collapsed"]=n.itemColorActiveCollapsedInverted):(a["--n-group-text-color"]=n.groupTextColor,a["--n-color"]=n.color,a["--n-item-text-color"]=n.itemTextColor,a["--n-item-text-color-hover"]=n.itemTextColorHover,a["--n-item-text-color-active"]=n.itemTextColorActive,a["--n-item-text-color-child-active"]=n.itemTextColorChildActive,a["--n-item-text-color-child-active-hover"]=n.itemTextColorChildActiveHover,a["--n-item-text-color-active-hover"]=n.itemTextColorActiveHover,a["--n-item-icon-color"]=n.itemIconColor,a["--n-item-icon-color-hover"]=n.itemIconColorHover,a["--n-item-icon-color-active"]=n.itemIconColorActive,a["--n-item-icon-color-active-hover"]=n.itemIconColorActiveHover,a["--n-item-icon-color-child-active"]=n.itemIconColorChildActive,a["--n-item-icon-color-child-active-hover"]=n.itemIconColorChildActiveHover,a["--n-item-icon-color-collapsed"]=n.itemIconColorCollapsed,a["--n-item-text-color-horizontal"]=n.itemTextColorHorizontal,a["--n-item-text-color-hover-horizontal"]=n.itemTextColorHoverHorizontal,a["--n-item-text-color-active-horizontal"]=n.itemTextColorActiveHorizontal,a["--n-item-text-color-child-active-horizontal"]=n.itemTextColorChildActiveHorizontal,a["--n-item-text-color-child-active-hover-horizontal"]=n.itemTextColorChildActiveHoverHorizontal,a["--n-item-text-color-active-hover-horizontal"]=n.itemTextColorActiveHoverHorizontal,a["--n-item-icon-color-horizontal"]=n.itemIconColorHorizontal,a["--n-item-icon-color-hover-horizontal"]=n.itemIconColorHoverHorizontal,a["--n-item-icon-color-active-horizontal"]=n.itemIconColorActiveHorizontal,a["--n-item-icon-color-active-hover-horizontal"]=n.itemIconColorActiveHoverHorizontal,a["--n-item-icon-color-child-active-horizontal"]=n.itemIconColorChildActiveHorizontal,a["--n-item-icon-color-child-active-hover-horizontal"]=n.itemIconColorChildActiveHoverHorizontal,a["--n-arrow-color"]=n.arrowColor,a["--n-arrow-color-hover"]=n.arrowColorHover,a["--n-arrow-color-active"]=n.arrowColorActive,a["--n-arrow-color-active-hover"]=n.arrowColorActiveHover,a["--n-arrow-color-child-active"]=n.arrowColorChildActive,a["--n-arrow-color-child-active-hover"]=n.arrowColorChildActiveHover,a["--n-item-color-hover"]=n.itemColorHover,a["--n-item-color-active"]=n.itemColorActive,a["--n-item-color-active-hover"]=n.itemColorActiveHover,a["--n-item-color-active-collapsed"]=n.itemColorActiveCollapsed),a}),k=o?de("menu",w(()=>e.inverted?"a":"b"),b,e):void 0,j=go(),F=B(null),ee=B(null);let E=!0;const ie=()=>{var g;E?E=!1:(g=F.value)===null||g===void 0||g.sync({showAllItemsBeforeCalculate:!0})};function oe(){return document.getElementById(j)}const le=B(-1);function Je(g){le.value=e.options.length-g}function Qe(g){g||(le.value=-1)}const eo=w(()=>{const g=le.value;return{children:g===-1?[]:e.options.slice(g)}}),oo=w(()=>{const{childrenField:g,disabledField:_,keyField:n}=e;return pe([eo.value],{getIgnored(C){return ze(C)},getChildren(C){return C[g]},getDisabled(C){return C[_]},getKey(C){var M;return(M=C[n])!==null&&M!==void 0?M:C.name}})}),to=w(()=>pe([{}]).treeNodes[0]);function ro(){var g;if(le.value===-1)return d(Ie,{root:!0,level:0,key:"__ellpisisGroupPlaceholder__",internalKey:"__ellpisisGroupPlaceholder__",title:"···",tmNode:to.value,domId:j,isEllipsisPlaceholder:!0});const _=oo.value.treeNodes[0],n=$.value,C=!!(!((g=_.children)===null||g===void 0)&&g.some(M=>n.includes(M.key)));return d(Ie,{level:0,root:!0,key:"__ellpisisGroup__",internalKey:"__ellpisisGroup__",title:"···",virtualChildActive:C,tmNode:_,domId:j,rawNodes:_.rawNode.children||[],tmNodes:_.children||[],isEllipsisPlaceholder:!0})}return{mergedClsPrefix:t,controlledExpandedKeys:R,uncontrolledExpanededKeys:v,mergedExpandedKeys:I,uncontrolledValue:u,mergedValue:y,activePath:$,tmNodes:P,mergedTheme:r,mergedCollapsed:i,cssVars:o?void 0:b,themeClass:k==null?void 0:k.themeClass,overflowRef:F,counterRef:ee,updateCounter:()=>{},onResize:ie,onUpdateOverflow:Qe,onUpdateCount:Je,renderCounter:ro,getCounter:oe,onRender:k==null?void 0:k.onRender,showOption:H,deriveResponsiveState:ie}},render(){const{mergedClsPrefix:e,mode:t,themeClass:o,onRender:r}=this;r==null||r();const l=()=>this.tmNodes.map(s=>Re(s,this.$props)),c=t==="horizontal"&&this.responsive,m=()=>d("div",bo(this.$attrs,{role:t==="horizontal"?"menubar":"menu",class:[`${e}-menu`,o,`${e}-menu--${t}`,c&&`${e}-menu--responsive`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars}),c?d(Lo,{ref:"overflowRef",onUpdateOverflow:this.onUpdateOverflow,getCounter:this.getCounter,onUpdateCount:this.onUpdateCount,updateCounter:this.updateCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:l,counter:this.renderCounter}):l());return c?d(Ee,{onResize:this.onResize},{default:m}):m()}}),bt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Ct=O("path",{d:"M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z",fill:"none",stroke:"currentColor","stroke-miterlimit":"10","stroke-width":"32"},null,-1),xt=O("path",{d:"M250.26 166.05L256 288l5.73-121.95a5.74 5.74 0 0 0-5.79-6h0a5.74 5.74 0 0 0-5.68 6z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),yt=O("path",{d:"M256 367.91a20 20 0 1 1 20-20a20 20 0 0 1-20 20z",fill:"currentColor"},null,-1),wt=[Ct,xt,yt],zt=L({name:"AlertCircleOutline",render:function(t,o){return D(),G("svg",bt,wt)}}),It={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},kt=O("path",{d:"M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62z",fill:"none",stroke:"currentColor","stroke-linejoin":"round","stroke-width":"32"},null,-1),St=O("path",{d:"M256 56v120a32 32 0 0 0 32 32h120",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),_t=O("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 288h160"},null,-1),At=O("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 368h160"},null,-1),Ht=[kt,St,_t,At],Rt=L({name:"DocumentTextOutline",render:function(t,o){return D(),G("svg",It,Ht)}}),Pt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Ot=Be('<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M160 144h288"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M160 256h288"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M160 368h288"></path><circle cx="80" cy="144" r="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><circle cx="80" cy="256" r="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><circle cx="80" cy="368" r="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle>',6),Tt=[Ot],Nt=L({name:"ListOutline",render:function(t,o){return D(),G("svg",Pt,Tt)}}),$t={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Mt=O("path",{d:"M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Lt=O("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M368 336l80-80l-80-80"},null,-1),Bt=O("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 256h256"},null,-1),Et=[Mt,Lt,Bt],jt=L({name:"LogOutOutline",render:function(t,o){return D(),G("svg",$t,Et)}}),Ft={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Kt=O("path",{d:"M402 168c-2.93 40.67-33.1 72-66 72s-63.12-31.32-66-72c-3-42.31 26.37-72 66-72s69 30.46 66 72z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Vt=O("path",{d:"M336 304c-65.17 0-127.84 32.37-143.54 95.41c-2.08 8.34 3.15 16.59 11.72 16.59h263.65c8.57 0 13.77-8.25 11.72-16.59C463.85 335.36 401.18 304 336 304z",fill:"none",stroke:"currentColor","stroke-miterlimit":"10","stroke-width":"32"},null,-1),Dt=O("path",{d:"M200 185.94c-2.34 32.48-26.72 58.06-53 58.06s-50.7-25.57-53-58.06C91.61 152.15 115.34 128 147 128s55.39 24.77 53 57.94z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Ut=O("path",{d:"M206 306c-18.05-8.27-37.93-11.45-59-11.45c-52 0-102.1 25.85-114.65 76.2c-1.65 6.66 2.53 13.25 9.37 13.25H154",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32"},null,-1),Wt=[Kt,Vt,Dt,Ut],Gt=L({name:"PeopleOutline",render:function(t,o){return D(),G("svg",Ft,Wt)}}),qt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Yt=O("ellipse",{cx:"256",cy:"128",rx:"192",ry:"80",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32"},null,-1),Xt=O("path",{d:"M448 214c0 44.18-86 80-192 80S64 258.18 64 214",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32"},null,-1),Zt=O("path",{d:"M448 300c0 44.18-86 80-192 80S64 344.18 64 300",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32"},null,-1),Jt=O("path",{d:"M64 127.24v257.52C64 428.52 150 464 256 464s192-35.48 192-79.24V127.24",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32"},null,-1),Qt=[Yt,Xt,Zt,Jt],er=L({name:"ServerOutline",render:function(t,o){return D(),G("svg",qt,Qt)}}),or={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},tr=Be('<path d="M326.1 231.9l-47.5 75.5a31 31 0 0 1-7 7a30.11 30.11 0 0 1-35-49l75.5-47.5a10.23 10.23 0 0 1 11.7 0a10.06 10.06 0 0 1 2.3 14z" fill="currentColor"></path><path d="M256 64C132.3 64 32 164.2 32 287.9a223.18 223.18 0 0 0 56.3 148.5c1.1 1.2 2.1 2.4 3.2 3.5a25.19 25.19 0 0 0 37.1-.1a173.13 173.13 0 0 1 254.8 0a25.19 25.19 0 0 0 37.1.1l3.2-3.5A223.18 223.18 0 0 0 480 287.9C480 164.2 379.7 64 256 64z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M256 128v32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M416 288h-32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M128 288H96"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M165.49 197.49l-22.63-22.63"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M346.51 197.49l22.63-22.63"></path>',7),rr=[tr],nr=L({name:"SpeedometerOutline",render:function(t,o){return D(),G("svg",or,rr)}}),ir={class:"sider-logo"},lr={key:0,class:"sider-logo-text"},ar={class:"sider-footer"},sr={key:0,class:"user-detail"},cr={class:"user-name"},dr=["title"],ur={key:0,style:{"margin-left":"8px"}},vr=L({__name:"AdminLayout",setup(e){const t=Io(),o=ko(),r=Co(),l=B(!1);function i(x){return()=>d(Oe,null,{default:()=>d(x)})}const c=[{label:"仪表盘",key:"/admin/dashboard",icon:i(nr)},{label:"用户管理",key:"/admin/users",icon:i(Gt)},{label:"母机管理",key:"/admin/hosts",icon:i(er)},{label:"告警配置",key:"/admin/alerts/rules",icon:i(zt)},{label:"告警记录",key:"/admin/alerts/logs",icon:i(Nt)},{label:"操作日志",key:"/admin/audit",icon:i(Rt)}],m=w(()=>{const x=o.path;return x.startsWith("/admin/users")?"/admin/users":x.startsWith("/admin/alerts/rules")?"/admin/alerts/rules":x.startsWith("/admin/alerts/logs")?"/admin/alerts/logs":x});function s(x){t.push(x)}function u(){r.logout(),t.push("/login")}return(x,y)=>{const v=zo("router-view");return D(),xo(U(Te),{"has-sider":"",style:{"min-height":"100vh"}},{default:q(()=>[K(U(at),{collapsed:l.value,"collapse-mode":"width","collapsed-width":68,width:240,"show-trigger":"bar","native-scrollbar":!1,class:"admin-sider",onCollapse:y[0]||(y[0]=z=>l.value=!0),onExpand:y[1]||(y[1]=z=>l.value=!1)},{default:q(()=>[O("div",ir,[y[2]||(y[2]=O("div",{class:"sider-logo-icon"},[O("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none"},[O("path",{d:"M13 2L3 14h9l-1 8 10-12h-9l1-8z",fill:"currentColor"})])],-1)),K(ve,{name:"fade"},{default:q(()=>[l.value?he("",!0):(D(),G("span",lr,"流量监控"))]),_:1})]),K(U(gt),{collapsed:l.value,"collapsed-width":68,"collapsed-icon-size":20,options:c,value:m.value,"onUpdate:value":s},null,8,["collapsed","value"]),O("div",ar,[O("div",{class:yo(["user-info",{collapsed:l.value}])},[K(U(Yo),{size:32,round:"",style:{background:"linear-gradient(135deg, #6366f1, #8b5cf6)","flex-shrink":"0"}},{default:q(()=>{var z,R;return[wo(Pe((R=(z=U(r).username)==null?void 0:z.charAt(0))==null?void 0:R.toUpperCase()),1)]}),_:1}),K(ve,{name:"fade"},{default:q(()=>[l.value?he("",!0):(D(),G("div",sr,[O("span",cr,Pe(U(r).username),1),y[3]||(y[3]=O("span",{class:"user-role"},"管理员",-1))]))]),_:1})],2),O("div",{class:"logout-btn",onClick:u,title:l.value?"退出登录":""},[K(U(Oe),{size:18},{default:q(()=>[K(U(jt))]),_:1}),K(ve,{name:"fade"},{default:q(()=>[l.value?he("",!0):(D(),G("span",ur,"退出登录"))]),_:1})],8,dr)])]),_:1},8,["collapsed"]),K(U(Te),null,{default:q(()=>[K(U(tt),{class:"admin-content"},{default:q(()=>[K(v)]),_:1})]),_:1})]),_:1})}}}),wr=Eo(vr,[["__scopeId","data-v-5cc16e41"]]);export{wr as default};
