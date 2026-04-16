import{a3 as xo,Q as fo,g as _,M as vo,O as Bo,i as P,aq as Do,j as J,f as po,h as I,ay as Eo,R as Ro,ad as Go,A as Q,K as ho,e as Wo,k as R,P as v,T as lo,au as ko,Y as Oo,av as Mo,a7 as jo,X as No,u as _o,l as Co,a2 as Ko,n as Lo,p as n,L as Y}from"./index-LAepXqtP.js";import{i as Z,r as ao,n as Vo,c as Qo}from"./Scrollbar-D8GMbawD.js";function co(o){return o.replace(/#|\(|\)|,|\s|\./g,"_")}const qo=/^(\d|\.)+$/,uo=/(\d|\.)+/;function de(o,{c:b=1,offset:x=0,attachPx:d=!0}={}){if(typeof o=="number"){const r=(o+x)*b;return r===0?"0":`${r}px`}else if(typeof o=="string")if(qo.test(o)){const r=(Number(o)+x)*b;return d?r===0?"0":`${r}px`:`${r}`}else{const r=uo.exec(o);return r?o.replace(uo,String((Number(r[0])+x)*b)):o}return o}const bo=vo("n-form-item");function Ao(o,{defaultSize:b="medium",mergedSize:x,mergedDisabled:d}={}){const r=fo(bo,null);Bo(bo,null);const G=_(x?()=>x(r):()=>{const{size:S}=o;if(S)return S;if(r){const{mergedSize:W}=r;if(W.value!==void 0)return W.value}return b}),K=_(d?()=>d(r):()=>{const{disabled:S}=o;return S!==void 0?S:r?r.disabled.value:!1}),O=_(()=>{const{status:S}=o;return S||(r==null?void 0:r.mergedValidationStatus.value)});return xo(()=>{r&&r.restoreValidation()}),{mergedSizeRef:G,mergedDisabledRef:K,mergedStatusRef:O,nTriggerFormBlur(){r&&r.handleContentBlur()},nTriggerFormChange(){r&&r.handleContentChange()},nTriggerFormFocus(){r&&r.handleContentFocus()},nTriggerFormInput(){r&&r.handleContentInput()}}}const{cubicBezierEaseInOut:k}=Do;function Xo({duration:o=".2s",delay:b=".1s"}={}){return[P("&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to",{opacity:1}),P("&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from",`
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `),P("&.fade-in-width-expand-transition-leave-active",`
 overflow: hidden;
 transition:
 opacity ${o} ${k},
 max-width ${o} ${k} ${b},
 margin-left ${o} ${k} ${b},
 margin-right ${o} ${k} ${b};
 `),P("&.fade-in-width-expand-transition-enter-active",`
 overflow: hidden;
 transition:
 opacity ${o} ${k} ${b},
 max-width ${o} ${k},
 margin-left ${o} ${k},
 margin-right ${o} ${k};
 `)]}const Yo=J("base-wave",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`),Uo=po({name:"BaseWave",props:{clsPrefix:{type:String,required:!0}},setup(o){Eo("-base-wave",Yo,Ro(o,"clsPrefix"));const b=Q(null),x=Q(!1);let d=null;return xo(()=>{d!==null&&window.clearTimeout(d)}),{active:x,selfRef:b,play(){d!==null&&(window.clearTimeout(d),x.value=!1,d=null),Go(()=>{var r;(r=b.value)===null||r===void 0||r.offsetHeight,x.value=!0,d=window.setTimeout(()=>{x.value=!1,d=null},1e3)})}}},render(){const{clsPrefix:o}=this;return I("div",{ref:"selfRef","aria-hidden":!0,class:[`${o}-base-wave`,this.active&&`${o}-base-wave--active`]})}}),Jo=Z&&"chrome"in window;Z&&navigator.userAgent.includes("Firefox");const Zo=Z&&navigator.userAgent.includes("Safari")&&!Jo;function N(o){return ho(o,[255,255,255,.16])}function U(o){return ho(o,[0,0,0,.12])}const oe=vo("n-button-group"),ee={paddingTiny:"0 6px",paddingSmall:"0 10px",paddingMedium:"0 14px",paddingLarge:"0 18px",paddingRoundTiny:"0 10px",paddingRoundSmall:"0 14px",paddingRoundMedium:"0 18px",paddingRoundLarge:"0 22px",iconMarginTiny:"6px",iconMarginSmall:"6px",iconMarginMedium:"6px",iconMarginLarge:"6px",iconSizeTiny:"14px",iconSizeSmall:"18px",iconSizeMedium:"18px",iconSizeLarge:"20px",rippleDuration:".6s"};function re(o){const{heightTiny:b,heightSmall:x,heightMedium:d,heightLarge:r,borderRadius:G,fontSizeTiny:K,fontSizeSmall:O,fontSizeMedium:S,fontSizeLarge:W,opacityDisabled:L,textColor2:h,textColor3:oo,primaryColorHover:f,primaryColorPressed:B,borderColor:q,primaryColor:z,baseColor:i,infoColor:D,infoColorHover:H,infoColorPressed:F,successColor:t,successColorHover:l,successColorPressed:C,warningColor:e,warningColorHover:g,warningColorPressed:$,errorColor:m,errorColorHover:T,errorColorPressed:y,fontWeight:V,buttonColor2:E,buttonColor2Hover:M,buttonColor2Pressed:w,fontWeightStrong:a}=o;return Object.assign(Object.assign({},ee),{heightTiny:b,heightSmall:x,heightMedium:d,heightLarge:r,borderRadiusTiny:G,borderRadiusSmall:G,borderRadiusMedium:G,borderRadiusLarge:G,fontSizeTiny:K,fontSizeSmall:O,fontSizeMedium:S,fontSizeLarge:W,opacityDisabled:L,colorOpacitySecondary:"0.16",colorOpacitySecondaryHover:"0.22",colorOpacitySecondaryPressed:"0.28",colorSecondary:E,colorSecondaryHover:M,colorSecondaryPressed:w,colorTertiary:E,colorTertiaryHover:M,colorTertiaryPressed:w,colorQuaternary:"#0000",colorQuaternaryHover:M,colorQuaternaryPressed:w,color:"#0000",colorHover:"#0000",colorPressed:"#0000",colorFocus:"#0000",colorDisabled:"#0000",textColor:h,textColorTertiary:oo,textColorHover:f,textColorPressed:B,textColorFocus:f,textColorDisabled:h,textColorText:h,textColorTextHover:f,textColorTextPressed:B,textColorTextFocus:f,textColorTextDisabled:h,textColorGhost:h,textColorGhostHover:f,textColorGhostPressed:B,textColorGhostFocus:f,textColorGhostDisabled:h,border:`1px solid ${q}`,borderHover:`1px solid ${f}`,borderPressed:`1px solid ${B}`,borderFocus:`1px solid ${f}`,borderDisabled:`1px solid ${q}`,rippleColor:z,colorPrimary:z,colorHoverPrimary:f,colorPressedPrimary:B,colorFocusPrimary:f,colorDisabledPrimary:z,textColorPrimary:i,textColorHoverPrimary:i,textColorPressedPrimary:i,textColorFocusPrimary:i,textColorDisabledPrimary:i,textColorTextPrimary:z,textColorTextHoverPrimary:f,textColorTextPressedPrimary:B,textColorTextFocusPrimary:f,textColorTextDisabledPrimary:h,textColorGhostPrimary:z,textColorGhostHoverPrimary:f,textColorGhostPressedPrimary:B,textColorGhostFocusPrimary:f,textColorGhostDisabledPrimary:z,borderPrimary:`1px solid ${z}`,borderHoverPrimary:`1px solid ${f}`,borderPressedPrimary:`1px solid ${B}`,borderFocusPrimary:`1px solid ${f}`,borderDisabledPrimary:`1px solid ${z}`,rippleColorPrimary:z,colorInfo:D,colorHoverInfo:H,colorPressedInfo:F,colorFocusInfo:H,colorDisabledInfo:D,textColorInfo:i,textColorHoverInfo:i,textColorPressedInfo:i,textColorFocusInfo:i,textColorDisabledInfo:i,textColorTextInfo:D,textColorTextHoverInfo:H,textColorTextPressedInfo:F,textColorTextFocusInfo:H,textColorTextDisabledInfo:h,textColorGhostInfo:D,textColorGhostHoverInfo:H,textColorGhostPressedInfo:F,textColorGhostFocusInfo:H,textColorGhostDisabledInfo:D,borderInfo:`1px solid ${D}`,borderHoverInfo:`1px solid ${H}`,borderPressedInfo:`1px solid ${F}`,borderFocusInfo:`1px solid ${H}`,borderDisabledInfo:`1px solid ${D}`,rippleColorInfo:D,colorSuccess:t,colorHoverSuccess:l,colorPressedSuccess:C,colorFocusSuccess:l,colorDisabledSuccess:t,textColorSuccess:i,textColorHoverSuccess:i,textColorPressedSuccess:i,textColorFocusSuccess:i,textColorDisabledSuccess:i,textColorTextSuccess:t,textColorTextHoverSuccess:l,textColorTextPressedSuccess:C,textColorTextFocusSuccess:l,textColorTextDisabledSuccess:h,textColorGhostSuccess:t,textColorGhostHoverSuccess:l,textColorGhostPressedSuccess:C,textColorGhostFocusSuccess:l,textColorGhostDisabledSuccess:t,borderSuccess:`1px solid ${t}`,borderHoverSuccess:`1px solid ${l}`,borderPressedSuccess:`1px solid ${C}`,borderFocusSuccess:`1px solid ${l}`,borderDisabledSuccess:`1px solid ${t}`,rippleColorSuccess:t,colorWarning:e,colorHoverWarning:g,colorPressedWarning:$,colorFocusWarning:g,colorDisabledWarning:e,textColorWarning:i,textColorHoverWarning:i,textColorPressedWarning:i,textColorFocusWarning:i,textColorDisabledWarning:i,textColorTextWarning:e,textColorTextHoverWarning:g,textColorTextPressedWarning:$,textColorTextFocusWarning:g,textColorTextDisabledWarning:h,textColorGhostWarning:e,textColorGhostHoverWarning:g,textColorGhostPressedWarning:$,textColorGhostFocusWarning:g,textColorGhostDisabledWarning:e,borderWarning:`1px solid ${e}`,borderHoverWarning:`1px solid ${g}`,borderPressedWarning:`1px solid ${$}`,borderFocusWarning:`1px solid ${g}`,borderDisabledWarning:`1px solid ${e}`,rippleColorWarning:e,colorError:m,colorHoverError:T,colorPressedError:y,colorFocusError:T,colorDisabledError:m,textColorError:i,textColorHoverError:i,textColorPressedError:i,textColorFocusError:i,textColorDisabledError:i,textColorTextError:m,textColorTextHoverError:T,textColorTextPressedError:y,textColorTextFocusError:T,textColorTextDisabledError:h,textColorGhostError:m,textColorGhostHoverError:T,textColorGhostPressedError:y,textColorGhostFocusError:T,textColorGhostDisabledError:m,borderError:`1px solid ${m}`,borderHoverError:`1px solid ${T}`,borderPressedError:`1px solid ${y}`,borderFocusError:`1px solid ${T}`,borderDisabledError:`1px solid ${m}`,rippleColorError:m,waveOpacity:"0.6",fontWeight:V,fontWeightStrong:a})}const te={name:"Button",common:Wo,self:re},ne=P([J("button",`
 margin: 0;
 font-weight: var(--n-font-weight);
 line-height: 1;
 font-family: inherit;
 padding: var(--n-padding);
 height: var(--n-height);
 font-size: var(--n-font-size);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 width: var(--n-width);
 white-space: nowrap;
 outline: none;
 position: relative;
 z-index: auto;
 border: none;
 display: inline-flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 align-items: center;
 justify-content: center;
 user-select: none;
 -webkit-user-select: none;
 text-align: center;
 cursor: pointer;
 text-decoration: none;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[R("color",[v("border",{borderColor:"var(--n-border-color)"}),R("disabled",[v("border",{borderColor:"var(--n-border-color-disabled)"})]),lo("disabled",[P("&:focus",[v("state-border",{borderColor:"var(--n-border-color-focus)"})]),P("&:hover",[v("state-border",{borderColor:"var(--n-border-color-hover)"})]),P("&:active",[v("state-border",{borderColor:"var(--n-border-color-pressed)"})]),R("pressed",[v("state-border",{borderColor:"var(--n-border-color-pressed)"})])])]),R("disabled",{backgroundColor:"var(--n-color-disabled)",color:"var(--n-text-color-disabled)"},[v("border",{border:"var(--n-border-disabled)"})]),lo("disabled",[P("&:focus",{backgroundColor:"var(--n-color-focus)",color:"var(--n-text-color-focus)"},[v("state-border",{border:"var(--n-border-focus)"})]),P("&:hover",{backgroundColor:"var(--n-color-hover)",color:"var(--n-text-color-hover)"},[v("state-border",{border:"var(--n-border-hover)"})]),P("&:active",{backgroundColor:"var(--n-color-pressed)",color:"var(--n-text-color-pressed)"},[v("state-border",{border:"var(--n-border-pressed)"})]),R("pressed",{backgroundColor:"var(--n-color-pressed)",color:"var(--n-text-color-pressed)"},[v("state-border",{border:"var(--n-border-pressed)"})])]),R("loading","cursor: wait;"),J("base-wave",`
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `,[R("active",{zIndex:1,animationName:"button-wave-spread, button-wave-opacity"})]),Z&&"MozBoxSizing"in document.createElement("div").style?P("&::moz-focus-inner",{border:0}):null,v("border, state-border",`
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `),v("border",`
 border: var(--n-border);
 `),v("state-border",`
 border: var(--n-border);
 border-color: #0000;
 z-index: 1;
 `),v("icon",`
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `,[J("icon-slot",`
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `,[ko({top:"50%",originalTransform:"translateY(-50%)"})]),Xo()]),v("content",`
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `,[P("~",[v("icon",{margin:"var(--n-icon-margin)",marginRight:0})])]),R("block",`
 display: flex;
 width: 100%;
 `),R("dashed",[v("border, state-border",{borderStyle:"dashed !important"})]),R("disabled",{cursor:"not-allowed",opacity:"var(--n-opacity-disabled)"})]),P("@keyframes button-wave-spread",{from:{boxShadow:"0 0 0.5px 0 var(--n-ripple-color)"},to:{boxShadow:"0 0 0.5px 4.5px var(--n-ripple-color)"}}),P("@keyframes button-wave-opacity",{from:{opacity:"var(--n-wave-opacity)"},to:{opacity:0}})]),se=Object.assign(Object.assign({},Co.props),{color:String,textColor:String,text:Boolean,block:Boolean,loading:Boolean,disabled:Boolean,circle:Boolean,size:String,ghost:Boolean,round:Boolean,secondary:Boolean,tertiary:Boolean,quaternary:Boolean,strong:Boolean,focusable:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},tag:{type:String,default:"button"},type:{type:String,default:"default"},dashed:Boolean,renderIcon:Function,iconPlacement:{type:String,default:"left"},attrType:{type:String,default:"button"},bordered:{type:Boolean,default:!0},onClick:[Function,Array],nativeFocusBehavior:{type:Boolean,default:!Zo},spinProps:Object}),ie=po({name:"Button",props:se,slots:Object,setup(o){const b=Q(null),x=Q(null),d=Q(!1),r=No(()=>!o.quaternary&&!o.tertiary&&!o.secondary&&!o.text&&(!o.color||o.ghost||o.dashed)&&o.bordered),G=fo(oe,{}),{inlineThemeDisabled:K,mergedClsPrefixRef:O,mergedRtlRef:S,mergedComponentPropsRef:W}=_o(o),{mergedSizeRef:L}=Ao({},{defaultSize:"medium",mergedSize:t=>{var l,C;const{size:e}=o;if(e)return e;const{size:g}=G;if(g)return g;const{mergedSize:$}=t||{};if($)return $.value;const m=(C=(l=W==null?void 0:W.value)===null||l===void 0?void 0:l.Button)===null||C===void 0?void 0:C.size;return m||"medium"}}),h=_(()=>o.focusable&&!o.disabled),oo=t=>{var l;h.value||t.preventDefault(),!o.nativeFocusBehavior&&(t.preventDefault(),!o.disabled&&h.value&&((l=b.value)===null||l===void 0||l.focus({preventScroll:!0})))},f=t=>{var l;if(!o.disabled&&!o.loading){const{onClick:C}=o;C&&Qo(C,t),o.text||(l=x.value)===null||l===void 0||l.play()}},B=t=>{switch(t.key){case"Enter":if(!o.keyboard)return;d.value=!1}},q=t=>{switch(t.key){case"Enter":if(!o.keyboard||o.loading){t.preventDefault();return}d.value=!0}},z=()=>{d.value=!1},i=Co("Button","-button",ne,te,o,O),D=Ko("Button",S,O),H=_(()=>{const t=i.value,{common:{cubicBezierEaseInOut:l,cubicBezierEaseOut:C},self:e}=t,{rippleDuration:g,opacityDisabled:$,fontWeight:m,fontWeightStrong:T}=e,y=L.value,{dashed:V,type:E,ghost:M,text:w,color:a,round:no,circle:eo,textColor:j,secondary:go,tertiary:so,quaternary:mo,strong:yo}=o,Po={"--n-font-weight":yo?T:m};let c={"--n-color":"initial","--n-color-hover":"initial","--n-color-pressed":"initial","--n-color-focus":"initial","--n-color-disabled":"initial","--n-ripple-color":"initial","--n-text-color":"initial","--n-text-color-hover":"initial","--n-text-color-pressed":"initial","--n-text-color-focus":"initial","--n-text-color-disabled":"initial"};const A=E==="tertiary",io=E==="default",s=A?"default":E;if(w){const u=j||a;c={"--n-color":"#0000","--n-color-hover":"#0000","--n-color-pressed":"#0000","--n-color-focus":"#0000","--n-color-disabled":"#0000","--n-ripple-color":"#0000","--n-text-color":u||e[n("textColorText",s)],"--n-text-color-hover":u?N(u):e[n("textColorTextHover",s)],"--n-text-color-pressed":u?U(u):e[n("textColorTextPressed",s)],"--n-text-color-focus":u?N(u):e[n("textColorTextHover",s)],"--n-text-color-disabled":u||e[n("textColorTextDisabled",s)]}}else if(M||V){const u=j||a;c={"--n-color":"#0000","--n-color-hover":"#0000","--n-color-pressed":"#0000","--n-color-focus":"#0000","--n-color-disabled":"#0000","--n-ripple-color":a||e[n("rippleColor",s)],"--n-text-color":u||e[n("textColorGhost",s)],"--n-text-color-hover":u?N(u):e[n("textColorGhostHover",s)],"--n-text-color-pressed":u?U(u):e[n("textColorGhostPressed",s)],"--n-text-color-focus":u?N(u):e[n("textColorGhostHover",s)],"--n-text-color-disabled":u||e[n("textColorGhostDisabled",s)]}}else if(go){const u=io?e.textColor:A?e.textColorTertiary:e[n("color",s)],p=a||u,X=E!=="default"&&E!=="tertiary";c={"--n-color":X?Y(p,{alpha:Number(e.colorOpacitySecondary)}):e.colorSecondary,"--n-color-hover":X?Y(p,{alpha:Number(e.colorOpacitySecondaryHover)}):e.colorSecondaryHover,"--n-color-pressed":X?Y(p,{alpha:Number(e.colorOpacitySecondaryPressed)}):e.colorSecondaryPressed,"--n-color-focus":X?Y(p,{alpha:Number(e.colorOpacitySecondaryHover)}):e.colorSecondaryHover,"--n-color-disabled":e.colorSecondary,"--n-ripple-color":"#0000","--n-text-color":p,"--n-text-color-hover":p,"--n-text-color-pressed":p,"--n-text-color-focus":p,"--n-text-color-disabled":p}}else if(so||mo){const u=io?e.textColor:A?e.textColorTertiary:e[n("color",s)],p=a||u;so?(c["--n-color"]=e.colorTertiary,c["--n-color-hover"]=e.colorTertiaryHover,c["--n-color-pressed"]=e.colorTertiaryPressed,c["--n-color-focus"]=e.colorSecondaryHover,c["--n-color-disabled"]=e.colorTertiary):(c["--n-color"]=e.colorQuaternary,c["--n-color-hover"]=e.colorQuaternaryHover,c["--n-color-pressed"]=e.colorQuaternaryPressed,c["--n-color-focus"]=e.colorQuaternaryHover,c["--n-color-disabled"]=e.colorQuaternary),c["--n-ripple-color"]="#0000",c["--n-text-color"]=p,c["--n-text-color-hover"]=p,c["--n-text-color-pressed"]=p,c["--n-text-color-focus"]=p,c["--n-text-color-disabled"]=p}else c={"--n-color":a||e[n("color",s)],"--n-color-hover":a?N(a):e[n("colorHover",s)],"--n-color-pressed":a?U(a):e[n("colorPressed",s)],"--n-color-focus":a?N(a):e[n("colorFocus",s)],"--n-color-disabled":a||e[n("colorDisabled",s)],"--n-ripple-color":a||e[n("rippleColor",s)],"--n-text-color":j||(a?e.textColorPrimary:A?e.textColorTertiary:e[n("textColor",s)]),"--n-text-color-hover":j||(a?e.textColorHoverPrimary:e[n("textColorHover",s)]),"--n-text-color-pressed":j||(a?e.textColorPressedPrimary:e[n("textColorPressed",s)]),"--n-text-color-focus":j||(a?e.textColorFocusPrimary:e[n("textColorFocus",s)]),"--n-text-color-disabled":j||(a?e.textColorDisabledPrimary:e[n("textColorDisabled",s)])};let ro={"--n-border":"initial","--n-border-hover":"initial","--n-border-pressed":"initial","--n-border-focus":"initial","--n-border-disabled":"initial"};w?ro={"--n-border":"none","--n-border-hover":"none","--n-border-pressed":"none","--n-border-focus":"none","--n-border-disabled":"none"}:ro={"--n-border":e[n("border",s)],"--n-border-hover":e[n("borderHover",s)],"--n-border-pressed":e[n("borderPressed",s)],"--n-border-focus":e[n("borderFocus",s)],"--n-border-disabled":e[n("borderDisabled",s)]};const{[n("height",y)]:to,[n("fontSize",y)]:So,[n("padding",y)]:$o,[n("paddingRound",y)]:To,[n("iconSize",y)]:wo,[n("borderRadius",y)]:zo,[n("iconMargin",y)]:Ho,waveOpacity:Fo}=e,Io={"--n-width":eo&&!w?to:"initial","--n-height":w?"initial":to,"--n-font-size":So,"--n-padding":eo||w?"initial":no?To:$o,"--n-icon-size":wo,"--n-icon-margin":Ho,"--n-border-radius":w?"initial":eo||no?to:zo};return Object.assign(Object.assign(Object.assign(Object.assign({"--n-bezier":l,"--n-bezier-ease-out":C,"--n-ripple-duration":g,"--n-opacity-disabled":$,"--n-wave-opacity":Fo},Po),c),ro),Io)}),F=K?Lo("button",_(()=>{let t="";const{dashed:l,type:C,ghost:e,text:g,color:$,round:m,circle:T,textColor:y,secondary:V,tertiary:E,quaternary:M,strong:w}=o;l&&(t+="a"),e&&(t+="b"),g&&(t+="c"),m&&(t+="d"),T&&(t+="e"),V&&(t+="f"),E&&(t+="g"),M&&(t+="h"),w&&(t+="i"),$&&(t+=`j${co($)}`),y&&(t+=`k${co(y)}`);const{value:a}=L;return t+=`l${a[0]}`,t+=`m${C[0]}`,t}),H,o):void 0;return{selfElRef:b,waveElRef:x,mergedClsPrefix:O,mergedFocusable:h,mergedSize:L,showBorder:r,enterPressed:d,rtlEnabled:D,handleMousedown:oo,handleKeydown:q,handleBlur:z,handleKeyup:B,handleClick:f,customColorCssVars:_(()=>{const{color:t}=o;if(!t)return null;const l=N(t);return{"--n-border-color":t,"--n-border-color-hover":l,"--n-border-color-pressed":U(t),"--n-border-color-focus":l,"--n-border-color-disabled":t}}),cssVars:K?void 0:H,themeClass:F==null?void 0:F.themeClass,onRender:F==null?void 0:F.onRender}},render(){const{mergedClsPrefix:o,tag:b,onRender:x}=this;x==null||x();const d=ao(this.$slots.default,r=>r&&I("span",{class:`${o}-button__content`},r));return I(b,{ref:"selfElRef",class:[this.themeClass,`${o}-button`,`${o}-button--${this.type}-type`,`${o}-button--${this.mergedSize}-type`,this.rtlEnabled&&`${o}-button--rtl`,this.disabled&&`${o}-button--disabled`,this.block&&`${o}-button--block`,this.enterPressed&&`${o}-button--pressed`,!this.text&&this.dashed&&`${o}-button--dashed`,this.color&&`${o}-button--color`,this.secondary&&`${o}-button--secondary`,this.loading&&`${o}-button--loading`,this.ghost&&`${o}-button--ghost`],tabindex:this.mergedFocusable?0:-1,type:this.attrType,style:this.cssVars,disabled:this.disabled,onClick:this.handleClick,onBlur:this.handleBlur,onMousedown:this.handleMousedown,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},this.iconPlacement==="right"&&d,I(Oo,{width:!0},{default:()=>ao(this.$slots.icon,r=>(this.loading||this.renderIcon||r)&&I("span",{class:`${o}-button__icon`,style:{margin:Vo(this.$slots.default)?"0":""}},I(Mo,null,{default:()=>this.loading?I(jo,Object.assign({clsPrefix:o,key:"loading",class:`${o}-icon-slot`,strokeWidth:20},this.spinProps)):I("div",{key:"icon",class:`${o}-icon-slot`,role:"none"},this.renderIcon?this.renderIcon():r)})))}),this.iconPlacement==="left"&&d,this.text?null:I(Uo,{ref:"waveElRef",clsPrefix:o}),this.showBorder?I("div",{"aria-hidden":!0,class:`${o}-button__border`,style:this.customColorCssVars}):null,this.showBorder?I("div",{"aria-hidden":!0,class:`${o}-button__state-border`,style:this.customColorCssVars}):null)}}),ce=ie;export{ie as B,ce as X,bo as a,te as b,co as c,de as f,Zo as i,Ao as u};
