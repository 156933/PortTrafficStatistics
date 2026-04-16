import{ah as G,A as R,ai as ie,a3 as Q,y as Ke,ab as V,M as Ue,J as Pe,e as Be,i as _,j as F,P as B,k as A,aj as Ve,ak as qe,f as le,h as d,V as j,N as Ge,af as Je,u as Oe,a2 as Qe,l as J,n as Me,g as T,E as Ze,W as eo,S as oo,I as ce,p as to,z as no,al as io,a6 as lo,$ as so,am as ee,a8 as $e,a4 as de,Q as oe,ad as ue,R as W,an as fe,O as q,ao}from"./index-LAepXqtP.js";import{c as ro,a as co,N as uo,b as fo}from"./Card-umG12zca.js";import{o as L,b as N,i as go,k as Te,r as Z,a as ge,g as ho,s as vo,S as mo,f as po,c as Y,d as Co}from"./Scrollbar-D8GMbawD.js";import{b as bo,B as he}from"./Button-DjIGwXDg.js";import{g as yo,F as wo,c as ko,k as te,m as Fe,a as xo,d as So,p as Ro,f as Po,L as Bo,z as Oo,b as Mo}from"./fade-in-scale-up.cssr-DpQErpet.js";import{i as ze,h as Ee}from"./flatten-BGKwcNLb.js";import{e as $o}from"./Tag-jnWHs7aD.js";const H=R(null);function ve(e){if(e.clientX>0||e.clientY>0)H.value={x:e.clientX,y:e.clientY};else{const{target:o}=e;if(o instanceof Element){const{left:t,top:s,width:u,height:f}=o.getBoundingClientRect();t>0||s>0?H.value={x:t+u/2,y:s+f/2}:H.value={x:0,y:0}}else H.value=null}}let K=0,me=!0;function To(){if(!ze)return G(R(null));K===0&&L("click",document,ve,!0);const e=()=>{K+=1};return me&&(me=Ee())?(ie(e),Q(()=>{K-=1,K===0&&N("click",document,ve,!0)})):e(),G(H)}const Fo=R(void 0);let U=0;function pe(){Fo.value=Date.now()}let Ce=!0;function zo(e){if(!ze)return G(R(!1));const o=R(!1);let t=null;function s(){t!==null&&window.clearTimeout(t)}function u(){s(),o.value=!0,t=window.setTimeout(()=>{o.value=!1},e)}U===0&&L("click",window,pe,!0);const f=()=>{U+=1,L("click",window,u,!0)};return Ce&&(Ce=Ee())?(ie(f),Q(()=>{U-=1,U===0&&N("click",window,pe,!0),N("click",window,u,!0),s()})):f(),G(o)}const se=R(!1);function be(){se.value=!0}function ye(){se.value=!1}let D=0;function Eo(){return go&&(ie(()=>{D||(window.addEventListener("compositionstart",be),window.addEventListener("compositionend",ye)),D++}),Q(()=>{D<=1?(window.removeEventListener("compositionstart",be),window.removeEventListener("compositionend",ye),D=0):D--})),se}let I=0,we="",ke="",xe="",Se="";const Re=R("0px");function jo(e){if(typeof document>"u")return;const o=document.documentElement;let t,s=!1;const u=()=>{o.style.marginRight=we,o.style.overflow=ke,o.style.overflowX=xe,o.style.overflowY=Se,Re.value="0px"};Ke(()=>{t=V(e,f=>{if(f){if(!I){const g=window.innerWidth-o.offsetWidth;g>0&&(we=o.style.marginRight,o.style.marginRight=`${g}px`,Re.value=`${g}px`),ke=o.style.overflow,xe=o.style.overflowX,Se=o.style.overflowY,o.style.overflow="hidden",o.style.overflowX="hidden",o.style.overflowY="hidden"}s=!0,I++}else I--,I||u(),s=!1},{immediate:!0})}),Q(()=>{t==null||t(),s&&(I--,I||u(),s=!1)})}const Io=Ue("n-dialog-provider"),Ao={titleFontSize:"18px",padding:"16px 28px 20px 28px",iconSize:"28px",actionSpace:"12px",contentMargin:"8px 0 16px 0",iconMargin:"0 4px 0 0",iconMarginIconTop:"4px 0 8px 0",closeSize:"22px",closeIconSize:"18px",closeMargin:"20px 26px 0 0",closeMarginIconTop:"10px 16px 0 0"};function Lo(e){const{textColor1:o,textColor2:t,modalColor:s,closeIconColor:u,closeIconColorHover:f,closeIconColorPressed:g,closeColorHover:m,closeColorPressed:a,infoColor:x,successColor:k,warningColor:b,errorColor:c,primaryColor:h,dividerColor:v,borderRadius:y,fontWeightStrong:S,lineHeight:w,fontSize:r}=e;return Object.assign(Object.assign({},Ao),{fontSize:r,lineHeight:w,border:`1px solid ${v}`,titleTextColor:o,textColor:t,color:s,closeColorHover:m,closeColorPressed:a,closeIconColor:u,closeIconColorHover:f,closeIconColorPressed:g,closeBorderRadius:y,iconColor:h,iconColorInfo:x,iconColorSuccess:k,iconColorWarning:b,iconColorError:c,borderRadius:y,titleFontWeight:S})}const je=Pe({name:"Dialog",common:Be,peers:{Button:bo},self:Lo}),ae={icon:Function,type:{type:String,default:"default"},title:[String,Function],closable:{type:Boolean,default:!0},negativeText:String,positiveText:String,positiveButtonProps:Object,negativeButtonProps:Object,content:[String,Function],action:Function,showIcon:{type:Boolean,default:!0},loading:Boolean,bordered:Boolean,iconPlacement:String,titleClass:[String,Array],titleStyle:[String,Object],contentClass:[String,Array],contentStyle:[String,Object],actionClass:[String,Array],actionStyle:[String,Object],onPositiveClick:Function,onNegativeClick:Function,onClose:Function,closeFocusable:Boolean},No=Te(ae),Do=_([F("dialog",`
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
 `,[B("icon",`
 color: var(--n-icon-color);
 `),A("bordered",`
 border: var(--n-border);
 `),A("icon-top",[B("close",`
 margin: var(--n-close-margin);
 `),B("icon",`
 margin: var(--n-icon-margin);
 `),B("content",`
 text-align: center;
 `),B("title",`
 justify-content: center;
 `),B("action",`
 justify-content: center;
 `)]),A("icon-left",[B("icon",`
 margin: var(--n-icon-margin);
 `),A("closable",[B("title",`
 padding-right: calc(var(--n-close-size) + 6px);
 `)])]),B("close",`
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 z-index: 1;
 `),B("content",`
 font-size: var(--n-font-size);
 margin: var(--n-content-margin);
 position: relative;
 word-break: break-word;
 `,[A("last","margin-bottom: 0;")]),B("action",`
 display: flex;
 justify-content: flex-end;
 `,[_("> *:not(:last-child)",`
 margin-right: var(--n-action-space);
 `)]),B("icon",`
 font-size: var(--n-icon-size);
 transition: color .3s var(--n-bezier);
 `),B("title",`
 transition: color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `),F("dialog-icon-container",`
 display: flex;
 justify-content: center;
 `)]),Ve(F("dialog",`
 width: 446px;
 max-width: calc(100vw - 32px);
 `)),F("dialog",[qe(`
 width: 446px;
 max-width: calc(100vw - 32px);
 `)])]),Ho={default:()=>d(ce,null),info:()=>d(ce,null),success:()=>d(oo,null),warning:()=>d(eo,null),error:()=>d(Ze,null)},_o=le({name:"Dialog",alias:["NimbusConfirmCard","Confirm"],props:Object.assign(Object.assign({},J.props),ae),slots:Object,setup(e){const{mergedComponentPropsRef:o,mergedClsPrefixRef:t,inlineThemeDisabled:s,mergedRtlRef:u}=Oe(e),f=Qe("Dialog",u,t),g=T(()=>{var h,v;const{iconPlacement:y}=e;return y||((v=(h=o==null?void 0:o.value)===null||h===void 0?void 0:h.Dialog)===null||v===void 0?void 0:v.iconPlacement)||"left"});function m(h){const{onPositiveClick:v}=e;v&&v(h)}function a(h){const{onNegativeClick:v}=e;v&&v(h)}function x(){const{onClose:h}=e;h&&h()}const k=J("Dialog","-dialog",Do,je,e,t),b=T(()=>{const{type:h}=e,v=g.value,{common:{cubicBezierEaseInOut:y},self:{fontSize:S,lineHeight:w,border:r,titleTextColor:O,textColor:M,color:C,closeBorderRadius:n,closeColorHover:l,closeColorPressed:i,closeIconColor:p,closeIconColorHover:P,closeIconColorPressed:$,closeIconSize:z,borderRadius:E,titleFontWeight:Ie,titleFontSize:Ae,padding:Le,iconSize:Ne,actionSpace:De,contentMargin:He,closeSize:_e,[v==="top"?"iconMarginIconTop":"iconMargin"]:We,[v==="top"?"closeMarginIconTop":"closeMargin"]:Xe,[to("iconColor",h)]:Ye}}=k.value,X=ho(We);return{"--n-font-size":S,"--n-icon-color":Ye,"--n-bezier":y,"--n-close-margin":Xe,"--n-icon-margin-top":X.top,"--n-icon-margin-right":X.right,"--n-icon-margin-bottom":X.bottom,"--n-icon-margin-left":X.left,"--n-icon-size":Ne,"--n-close-size":_e,"--n-close-icon-size":z,"--n-close-border-radius":n,"--n-close-color-hover":l,"--n-close-color-pressed":i,"--n-close-icon-color":p,"--n-close-icon-color-hover":P,"--n-close-icon-color-pressed":$,"--n-color":C,"--n-text-color":M,"--n-border-radius":E,"--n-padding":Le,"--n-line-height":w,"--n-border":r,"--n-content-margin":He,"--n-title-font-size":Ae,"--n-title-font-weight":Ie,"--n-title-text-color":O,"--n-action-space":De}}),c=s?Me("dialog",T(()=>`${e.type[0]}${g.value[0]}`),b,e):void 0;return{mergedClsPrefix:t,rtlEnabled:f,mergedIconPlacement:g,mergedTheme:k,handlePositiveClick:m,handleNegativeClick:a,handleCloseClick:x,cssVars:s?void 0:b,themeClass:c==null?void 0:c.themeClass,onRender:c==null?void 0:c.onRender}},render(){var e;const{bordered:o,mergedIconPlacement:t,cssVars:s,closable:u,showIcon:f,title:g,content:m,action:a,negativeText:x,positiveText:k,positiveButtonProps:b,negativeButtonProps:c,handlePositiveClick:h,handleNegativeClick:v,mergedTheme:y,loading:S,type:w,mergedClsPrefix:r}=this;(e=this.onRender)===null||e===void 0||e.call(this);const O=f?d(Ge,{clsPrefix:r,class:`${r}-dialog__icon`},{default:()=>Z(this.$slots.icon,C=>C||(this.icon?j(this.icon):Ho[this.type]()))}):null,M=Z(this.$slots.action,C=>C||k||x||a?d("div",{class:[`${r}-dialog__action`,this.actionClass],style:this.actionStyle},C||(a?[j(a)]:[this.negativeText&&d(he,Object.assign({theme:y.peers.Button,themeOverrides:y.peerOverrides.Button,ghost:!0,size:"small",onClick:v},c),{default:()=>j(this.negativeText)}),this.positiveText&&d(he,Object.assign({theme:y.peers.Button,themeOverrides:y.peerOverrides.Button,size:"small",type:w==="default"?"primary":w,disabled:S,loading:S,onClick:h},b),{default:()=>j(this.positiveText)})])):null);return d("div",{class:[`${r}-dialog`,this.themeClass,this.closable&&`${r}-dialog--closable`,`${r}-dialog--icon-${t}`,o&&`${r}-dialog--bordered`,this.rtlEnabled&&`${r}-dialog--rtl`],style:s,role:"dialog"},u?Z(this.$slots.close,C=>{const n=[`${r}-dialog__close`,this.rtlEnabled&&`${r}-dialog--rtl`];return C?d("div",{class:n},C):d(Je,{focusable:this.closeFocusable,clsPrefix:r,class:n,onClick:this.handleCloseClick})}):null,f&&t==="top"?d("div",{class:`${r}-dialog-icon-container`},O):null,d("div",{class:[`${r}-dialog__title`,this.titleClass],style:this.titleStyle},f&&t==="left"?O:null,ge(this.$slots.header,()=>[j(g)])),d("div",{class:[`${r}-dialog__content`,M?"":`${r}-dialog__content--last`,this.contentClass],style:this.contentStyle},ge(this.$slots.default,()=>[j(m)])),M)}});function Wo(e){const{modalColor:o,textColor2:t,boxShadow3:s}=e;return{color:o,textColor:t,boxShadow:s}}const Xo=Pe({name:"Modal",common:Be,peers:{Scrollbar:vo,Dialog:je,Card:ro},self:Wo}),ne="n-draggable";function Yo(e,o){let t;const s=T(()=>e.value!==!1),u=T(()=>s.value?ne:""),f=T(()=>{const a=e.value;return a===!0||a===!1?!0:a?a.bounds!=="none":!0});function g(a){const x=a.querySelector(`.${ne}`);if(!x||!u.value)return;let k=0,b=0,c=0,h=0,v=0,y=0,S,w=null,r=null;function O(l){l.preventDefault(),S=l;const{x:i,y:p,right:P,bottom:$}=a.getBoundingClientRect();b=i,h=p,k=window.innerWidth-P,c=window.innerHeight-$;const{left:z,top:E}=a.style;v=+E.slice(0,-2),y=+z.slice(0,-2)}function M(){r&&(a.style.top=`${r.y}px`,a.style.left=`${r.x}px`,r=null),w=null}function C(l){if(!S)return;const{clientX:i,clientY:p}=S;let P=l.clientX-i,$=l.clientY-p;f.value&&(P>k?P=k:-P>b&&(P=-b),$>c?$=c:-$>h&&($=-h));const z=P+y,E=$+v;r={x:z,y:E},w||(w=requestAnimationFrame(M))}function n(){S=void 0,w&&(cancelAnimationFrame(w),w=null),r&&(a.style.top=`${r.y}px`,a.style.left=`${r.x}px`,r=null),o.onEnd(a)}L("mousedown",x,O),L("mousemove",window,C),L("mouseup",window,n),t=()=>{w&&cancelAnimationFrame(w),N("mousedown",x,O),N("mousemove",window,C),N("mouseup",window,n)}}function m(){t&&(t(),t=void 0)}return no(m),{stopDrag:m,startDrag:g,draggableRef:s,draggableClassRef:u}}const re=Object.assign(Object.assign({},co),ae),Ko=Te(re),Uo=le({name:"ModalBody",inheritAttrs:!1,slots:Object,props:Object.assign(Object.assign({show:{type:Boolean,required:!0},preset:String,displayDirective:{type:String,required:!0},trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},blockScroll:Boolean,draggable:{type:[Boolean,Object],default:!1},maskHidden:Boolean},re),{renderMask:Function,onClickoutside:Function,onBeforeLeave:{type:Function,required:!0},onAfterLeave:{type:Function,required:!0},onPositiveClick:{type:Function,required:!0},onNegativeClick:{type:Function,required:!0},onClose:{type:Function,required:!0},onAfterEnter:Function,onEsc:Function}),setup(e){const o=R(null),t=R(null),s=R(e.show),u=R(null),f=R(null),g=oe(Fe);let m=null;V(W(e,"show"),i=>{i&&(m=g.getMousePosition())},{immediate:!0});const{stopDrag:a,startDrag:x,draggableRef:k,draggableClassRef:b}=Yo(W(e,"draggable"),{onEnd:i=>{y(i)}}),c=T(()=>fe([e.titleClass,b.value])),h=T(()=>fe([e.headerClass,b.value]));V(W(e,"show"),i=>{i&&(s.value=!0)}),jo(T(()=>e.blockScroll&&s.value));function v(){if(g.transformOriginRef.value==="center")return"";const{value:i}=u,{value:p}=f;if(i===null||p===null)return"";if(t.value){const P=t.value.containerScrollTop;return`${i}px ${p+P}px`}return""}function y(i){if(g.transformOriginRef.value==="center"||!m||!t.value)return;const p=t.value.containerScrollTop,{offsetLeft:P,offsetTop:$}=i,z=m.y,E=m.x;u.value=-(P-E),f.value=-($-z-p),i.style.transformOrigin=v()}function S(i){ue(()=>{y(i)})}function w(i){i.style.transformOrigin=v(),e.onBeforeLeave()}function r(i){const p=i;k.value&&x(p),e.onAfterEnter&&e.onAfterEnter(p)}function O(){s.value=!1,u.value=null,f.value=null,a(),e.onAfterLeave()}function M(){const{onClose:i}=e;i&&i()}function C(){e.onNegativeClick()}function n(){e.onPositiveClick()}const l=R(null);return V(l,i=>{i&&ue(()=>{const p=i.el;p&&o.value!==p&&(o.value=p)})}),q(xo,o),q(So,null),q(Ro,null),{mergedTheme:g.mergedThemeRef,appear:g.appearRef,isMounted:g.isMountedRef,mergedClsPrefix:g.mergedClsPrefixRef,bodyRef:o,scrollbarRef:t,draggableClass:b,displayed:s,childNodeRef:l,cardHeaderClass:h,dialogTitleClass:c,handlePositiveClick:n,handleNegativeClick:C,handleCloseClick:M,handleAfterEnter:r,handleAfterLeave:O,handleBeforeLeave:w,handleEnter:S}},render(){const{$slots:e,$attrs:o,handleEnter:t,handleAfterEnter:s,handleAfterLeave:u,handleBeforeLeave:f,preset:g,mergedClsPrefix:m}=this;let a=null;if(!g){if(a=yo("default",e.default,{draggableClass:this.draggableClass}),!a){io("modal","default slot is empty");return}a=lo(a),a.props=so({class:`${m}-modal`},o,a.props||{})}return this.displayDirective==="show"||this.displayed||this.show?ee(d("div",{role:"none",class:[`${m}-modal-body-wrapper`,this.maskHidden&&`${m}-modal-body-wrapper--mask-hidden`]},d(mo,{ref:"scrollbarRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:`${m}-modal-scroll-content`},{default:()=>{var x;return[(x=this.renderMask)===null||x===void 0?void 0:x.call(this),d(wo,{disabled:!this.trapFocus||this.maskHidden,active:this.show,onEsc:this.onEsc,autoFocus:this.autoFocus},{default:()=>{var k;return d($e,{name:"fade-in-scale-up-transition",appear:(k=this.appear)!==null&&k!==void 0?k:this.isMounted,onEnter:t,onAfterEnter:s,onAfterLeave:u,onBeforeLeave:f},{default:()=>{const b=[[de,this.show]],{onClickoutside:c}=this;return c&&b.push([ko,this.onClickoutside,void 0,{capture:!0}]),ee(this.preset==="confirm"||this.preset==="dialog"?d(_o,Object.assign({},this.$attrs,{class:[`${m}-modal`,this.$attrs.class],ref:"bodyRef",theme:this.mergedTheme.peers.Dialog,themeOverrides:this.mergedTheme.peerOverrides.Dialog},te(this.$props,No),{titleClass:this.dialogTitleClass,"aria-modal":"true"}),e):this.preset==="card"?d(uo,Object.assign({},this.$attrs,{ref:"bodyRef",class:[`${m}-modal`,this.$attrs.class],theme:this.mergedTheme.peers.Card,themeOverrides:this.mergedTheme.peerOverrides.Card},te(this.$props,fo),{headerClass:this.cardHeaderClass,"aria-modal":"true",role:"dialog"}),e):this.childNodeRef=a,b)}})}})]}})),[[de,this.displayDirective==="if"||this.displayed||this.show]]):null}}),Vo=_([F("modal-container",`
 position: fixed;
 left: 0;
 top: 0;
 height: 0;
 width: 0;
 display: flex;
 `),F("modal-mask",`
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 background-color: rgba(0, 0, 0, .4);
 `,[po({enterDuration:".25s",leaveDuration:".25s",enterCubicBezier:"var(--n-bezier-ease-out)",leaveCubicBezier:"var(--n-bezier-ease-out)"})]),F("modal-body-wrapper",`
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: visible;
 `,[F("modal-scroll-content",`
 min-height: 100%;
 display: flex;
 position: relative;
 `),A("mask-hidden","pointer-events: none;",[F("modal-scroll-content",[_("> *",`
 pointer-events: all;
 `)])])]),F("modal",`
 position: relative;
 align-self: center;
 color: var(--n-text-color);
 margin: auto;
 box-shadow: var(--n-box-shadow);
 `,[Po({duration:".25s",enterScale:".5"}),_(`.${ne}`,`
 cursor: move;
 user-select: none;
 `)])]),qo=Object.assign(Object.assign(Object.assign(Object.assign({},J.props),{show:Boolean,showMask:{type:Boolean,default:!0},maskClosable:{type:Boolean,default:!0},preset:String,to:[String,Object],displayDirective:{type:String,default:"if"},transformOrigin:{type:String,default:"mouse"},zIndex:Number,autoFocus:{type:Boolean,default:!0},trapFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0}}),re),{draggable:[Boolean,Object],onEsc:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onBeforeLeave:Function,onAfterLeave:Function,onClose:Function,onPositiveClick:Function,onNegativeClick:Function,onMaskClick:Function,internalDialog:Boolean,internalModal:Boolean,internalAppear:{type:Boolean,default:void 0},overlayStyle:[String,Object],onBeforeHide:Function,onAfterHide:Function,onHide:Function,unstableShowMask:{type:Boolean,default:void 0}}),nt=le({name:"Modal",inheritAttrs:!1,props:qo,slots:Object,setup(e){const o=R(null),{mergedClsPrefixRef:t,namespaceRef:s,inlineThemeDisabled:u}=Oe(e),f=J("Modal","-modal",Vo,Xo,e,t),g=zo(64),m=To(),a=ao(),x=e.internalDialog?oe(Io,null):null,k=e.internalModal?oe(Mo,null):null,b=Eo();function c(n){const{onUpdateShow:l,"onUpdate:show":i,onHide:p}=e;l&&Y(l,n),i&&Y(i,n),p&&!n&&p(n)}function h(){const{onClose:n}=e;n?Promise.resolve(n()).then(l=>{l!==!1&&c(!1)}):c(!1)}function v(){const{onPositiveClick:n}=e;n?Promise.resolve(n()).then(l=>{l!==!1&&c(!1)}):c(!1)}function y(){const{onNegativeClick:n}=e;n?Promise.resolve(n()).then(l=>{l!==!1&&c(!1)}):c(!1)}function S(){const{onBeforeLeave:n,onBeforeHide:l}=e;n&&Y(n),l&&l()}function w(){const{onAfterLeave:n,onAfterHide:l}=e;n&&Y(n),l&&l()}function r(n){var l;const{onMaskClick:i}=e;i&&i(n),e.maskClosable&&!((l=o.value)===null||l===void 0)&&l.contains(Co(n))&&c(!1)}function O(n){var l;(l=e.onEsc)===null||l===void 0||l.call(e),e.show&&e.closeOnEsc&&$o(n)&&(b.value||c(!1))}q(Fe,{getMousePosition:()=>{const n=x||k;if(n){const{clickedRef:l,clickedPositionRef:i}=n;if(l.value&&i.value)return i.value}return g.value?m.value:null},mergedClsPrefixRef:t,mergedThemeRef:f,isMountedRef:a,appearRef:W(e,"internalAppear"),transformOriginRef:W(e,"transformOrigin")});const M=T(()=>{const{common:{cubicBezierEaseOut:n},self:{boxShadow:l,color:i,textColor:p}}=f.value;return{"--n-bezier-ease-out":n,"--n-box-shadow":l,"--n-color":i,"--n-text-color":p}}),C=u?Me("theme-class",void 0,M,e):void 0;return{mergedClsPrefix:t,namespace:s,isMounted:a,containerRef:o,presetProps:T(()=>te(e,Ko)),handleEsc:O,handleAfterLeave:w,handleClickoutside:r,handleBeforeLeave:S,doUpdateShow:c,handleNegativeClick:y,handlePositiveClick:v,handleCloseClick:h,cssVars:u?void 0:M,themeClass:C==null?void 0:C.themeClass,onRender:C==null?void 0:C.onRender}},render(){const{mergedClsPrefix:e}=this;return d(Bo,{to:this.to,show:this.show},{default:()=>{var o;(o=this.onRender)===null||o===void 0||o.call(this);const{showMask:t}=this;return ee(d("div",{role:"none",ref:"containerRef",class:[`${e}-modal-container`,this.themeClass,this.namespace],style:this.cssVars},d(Uo,Object.assign({style:this.overlayStyle},this.$attrs,{ref:"bodyWrapper",displayDirective:this.displayDirective,show:this.show,preset:this.preset,autoFocus:this.autoFocus,trapFocus:this.trapFocus,draggable:this.draggable,blockScroll:this.blockScroll,maskHidden:!t},this.presetProps,{onEsc:this.handleEsc,onClose:this.handleCloseClick,onNegativeClick:this.handleNegativeClick,onPositiveClick:this.handlePositiveClick,onBeforeLeave:this.handleBeforeLeave,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave,onClickoutside:t?void 0:this.handleClickoutside,renderMask:t?()=>{var s;return d($e,{name:"fade-in-transition",key:"mask",appear:(s=this.internalAppear)!==null&&s!==void 0?s:this.isMounted},{default:()=>this.show?d("div",{"aria-hidden":!0,ref:"containerRef",class:`${e}-modal-mask`,onClick:this.handleClickoutside}):null})}:void 0}),this.$slots)),[[Oo,{zIndex:this.zIndex,enabled:this.show}]])}})}});export{nt as N};
