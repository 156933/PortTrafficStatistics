import{M as bo,O as xo,i as N,B as fo,T as Io,E as P,ar as Bo,C as U,g as vo,y as I,az as Do,V as Eo,a9 as Ro,m as Q,A as ho,z as Go,S as R,H as x,W as lo,av as Wo,_ as ko,aw as Oo,a4 as Mo,Z as jo,I as _o,J as po,ab as No,K as Ko,P as t,R as Y}from"./index-CxZFzrlx.js";import{i as Z,a as ao,j as Vo,b as Lo,c as co}from"./Scrollbar-Cyy4ikIj.js";const uo=fo("n-form-item");function Qo(e,{defaultSize:f="medium",mergedSize:v,mergedDisabled:u}={}){const n=xo(uo,null);Io(uo,null);const G=N(v?()=>v(n):()=>{const{size:S}=e;if(S)return S;if(n){const{mergedSize:W}=n;if(W.value!==void 0)return W.value}return f}),K=N(u?()=>u(n):()=>{const{disabled:S}=e;return S!==void 0?S:n?n.disabled.value:!1}),O=N(()=>{const{status:S}=e;return S||(n==null?void 0:n.mergedValidationStatus.value)});return bo(()=>{n&&n.restoreValidation()}),{mergedSizeRef:G,mergedDisabledRef:K,mergedStatusRef:O,nTriggerFormBlur(){n&&n.handleContentBlur()},nTriggerFormChange(){n&&n.handleContentChange()},nTriggerFormFocus(){n&&n.handleContentFocus()},nTriggerFormInput(){n&&n.handleContentInput()}}}const{cubicBezierEaseInOut:k}=Bo;function qo({duration:e=".2s",delay:f=".1s"}={}){return[P("&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to",{opacity:1}),P("&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from",`
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `),P("&.fade-in-width-expand-transition-leave-active",`
 overflow: hidden;
 transition:
 opacity ${e} ${k},
 max-width ${e} ${k} ${f},
 margin-left ${e} ${k} ${f},
 margin-right ${e} ${k} ${f};
 `),P("&.fade-in-width-expand-transition-enter-active",`
 overflow: hidden;
 transition:
 opacity ${e} ${k} ${f},
 max-width ${e} ${k},
 margin-left ${e} ${k},
 margin-right ${e} ${k};
 `)]}const Ao=U("base-wave",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`),Xo=vo({name:"BaseWave",props:{clsPrefix:{type:String,required:!0}},setup(e){Do("-base-wave",Ao,Eo(e,"clsPrefix"));const f=Q(null),v=Q(!1);let u=null;return bo(()=>{u!==null&&window.clearTimeout(u)}),{active:v,selfRef:f,play(){u!==null&&(window.clearTimeout(u),v.value=!1,u=null),Ro(()=>{var n;(n=f.value)===null||n===void 0||n.offsetHeight,v.value=!0,u=window.setTimeout(()=>{v.value=!1,u=null},1e3)})}}},render(){const{clsPrefix:e}=this;return I("div",{ref:"selfRef","aria-hidden":!0,class:[`${e}-base-wave`,this.active&&`${e}-base-wave--active`]})}}),Yo=Z&&"chrome"in window;Z&&navigator.userAgent.includes("Firefox");const Jo=Z&&navigator.userAgent.includes("Safari")&&!Yo;function _(e){return ho(e,[255,255,255,.16])}function J(e){return ho(e,[0,0,0,.12])}const Uo=fo("n-button-group"),Zo={paddingTiny:"0 6px",paddingSmall:"0 10px",paddingMedium:"0 14px",paddingLarge:"0 18px",paddingRoundTiny:"0 10px",paddingRoundSmall:"0 14px",paddingRoundMedium:"0 18px",paddingRoundLarge:"0 22px",iconMarginTiny:"6px",iconMarginSmall:"6px",iconMarginMedium:"6px",iconMarginLarge:"6px",iconSizeTiny:"14px",iconSizeSmall:"18px",iconSizeMedium:"18px",iconSizeLarge:"20px",rippleDuration:".6s"};function oe(e){const{heightTiny:f,heightSmall:v,heightMedium:u,heightLarge:n,borderRadius:G,fontSizeTiny:K,fontSizeSmall:O,fontSizeMedium:S,fontSizeLarge:W,opacityDisabled:V,textColor2:p,textColor3:oo,primaryColorHover:b,primaryColorPressed:B,borderColor:q,primaryColor:z,baseColor:i,infoColor:D,infoColorHover:H,infoColorPressed:F,successColor:r,successColorHover:l,successColorPressed:C,warningColor:o,warningColorHover:g,warningColorPressed:T,errorColor:m,errorColorHover:$,errorColorPressed:y,fontWeight:L,buttonColor2:E,buttonColor2Hover:M,buttonColor2Pressed:w,fontWeightStrong:a}=e;return Object.assign(Object.assign({},Zo),{heightTiny:f,heightSmall:v,heightMedium:u,heightLarge:n,borderRadiusTiny:G,borderRadiusSmall:G,borderRadiusMedium:G,borderRadiusLarge:G,fontSizeTiny:K,fontSizeSmall:O,fontSizeMedium:S,fontSizeLarge:W,opacityDisabled:V,colorOpacitySecondary:"0.16",colorOpacitySecondaryHover:"0.22",colorOpacitySecondaryPressed:"0.28",colorSecondary:E,colorSecondaryHover:M,colorSecondaryPressed:w,colorTertiary:E,colorTertiaryHover:M,colorTertiaryPressed:w,colorQuaternary:"#0000",colorQuaternaryHover:M,colorQuaternaryPressed:w,color:"#0000",colorHover:"#0000",colorPressed:"#0000",colorFocus:"#0000",colorDisabled:"#0000",textColor:p,textColorTertiary:oo,textColorHover:b,textColorPressed:B,textColorFocus:b,textColorDisabled:p,textColorText:p,textColorTextHover:b,textColorTextPressed:B,textColorTextFocus:b,textColorTextDisabled:p,textColorGhost:p,textColorGhostHover:b,textColorGhostPressed:B,textColorGhostFocus:b,textColorGhostDisabled:p,border:`1px solid ${q}`,borderHover:`1px solid ${b}`,borderPressed:`1px solid ${B}`,borderFocus:`1px solid ${b}`,borderDisabled:`1px solid ${q}`,rippleColor:z,colorPrimary:z,colorHoverPrimary:b,colorPressedPrimary:B,colorFocusPrimary:b,colorDisabledPrimary:z,textColorPrimary:i,textColorHoverPrimary:i,textColorPressedPrimary:i,textColorFocusPrimary:i,textColorDisabledPrimary:i,textColorTextPrimary:z,textColorTextHoverPrimary:b,textColorTextPressedPrimary:B,textColorTextFocusPrimary:b,textColorTextDisabledPrimary:p,textColorGhostPrimary:z,textColorGhostHoverPrimary:b,textColorGhostPressedPrimary:B,textColorGhostFocusPrimary:b,textColorGhostDisabledPrimary:z,borderPrimary:`1px solid ${z}`,borderHoverPrimary:`1px solid ${b}`,borderPressedPrimary:`1px solid ${B}`,borderFocusPrimary:`1px solid ${b}`,borderDisabledPrimary:`1px solid ${z}`,rippleColorPrimary:z,colorInfo:D,colorHoverInfo:H,colorPressedInfo:F,colorFocusInfo:H,colorDisabledInfo:D,textColorInfo:i,textColorHoverInfo:i,textColorPressedInfo:i,textColorFocusInfo:i,textColorDisabledInfo:i,textColorTextInfo:D,textColorTextHoverInfo:H,textColorTextPressedInfo:F,textColorTextFocusInfo:H,textColorTextDisabledInfo:p,textColorGhostInfo:D,textColorGhostHoverInfo:H,textColorGhostPressedInfo:F,textColorGhostFocusInfo:H,textColorGhostDisabledInfo:D,borderInfo:`1px solid ${D}`,borderHoverInfo:`1px solid ${H}`,borderPressedInfo:`1px solid ${F}`,borderFocusInfo:`1px solid ${H}`,borderDisabledInfo:`1px solid ${D}`,rippleColorInfo:D,colorSuccess:r,colorHoverSuccess:l,colorPressedSuccess:C,colorFocusSuccess:l,colorDisabledSuccess:r,textColorSuccess:i,textColorHoverSuccess:i,textColorPressedSuccess:i,textColorFocusSuccess:i,textColorDisabledSuccess:i,textColorTextSuccess:r,textColorTextHoverSuccess:l,textColorTextPressedSuccess:C,textColorTextFocusSuccess:l,textColorTextDisabledSuccess:p,textColorGhostSuccess:r,textColorGhostHoverSuccess:l,textColorGhostPressedSuccess:C,textColorGhostFocusSuccess:l,textColorGhostDisabledSuccess:r,borderSuccess:`1px solid ${r}`,borderHoverSuccess:`1px solid ${l}`,borderPressedSuccess:`1px solid ${C}`,borderFocusSuccess:`1px solid ${l}`,borderDisabledSuccess:`1px solid ${r}`,rippleColorSuccess:r,colorWarning:o,colorHoverWarning:g,colorPressedWarning:T,colorFocusWarning:g,colorDisabledWarning:o,textColorWarning:i,textColorHoverWarning:i,textColorPressedWarning:i,textColorFocusWarning:i,textColorDisabledWarning:i,textColorTextWarning:o,textColorTextHoverWarning:g,textColorTextPressedWarning:T,textColorTextFocusWarning:g,textColorTextDisabledWarning:p,textColorGhostWarning:o,textColorGhostHoverWarning:g,textColorGhostPressedWarning:T,textColorGhostFocusWarning:g,textColorGhostDisabledWarning:o,borderWarning:`1px solid ${o}`,borderHoverWarning:`1px solid ${g}`,borderPressedWarning:`1px solid ${T}`,borderFocusWarning:`1px solid ${g}`,borderDisabledWarning:`1px solid ${o}`,rippleColorWarning:o,colorError:m,colorHoverError:$,colorPressedError:y,colorFocusError:$,colorDisabledError:m,textColorError:i,textColorHoverError:i,textColorPressedError:i,textColorFocusError:i,textColorDisabledError:i,textColorTextError:m,textColorTextHoverError:$,textColorTextPressedError:y,textColorTextFocusError:$,textColorTextDisabledError:p,textColorGhostError:m,textColorGhostHoverError:$,textColorGhostPressedError:y,textColorGhostFocusError:$,textColorGhostDisabledError:m,borderError:`1px solid ${m}`,borderHoverError:`1px solid ${$}`,borderPressedError:`1px solid ${y}`,borderFocusError:`1px solid ${$}`,borderDisabledError:`1px solid ${m}`,rippleColorError:m,waveOpacity:"0.6",fontWeight:L,fontWeightStrong:a})}const ee={name:"Button",common:Go,self:oe},re=P([U("button",`
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
 `,[R("color",[x("border",{borderColor:"var(--n-border-color)"}),R("disabled",[x("border",{borderColor:"var(--n-border-color-disabled)"})]),lo("disabled",[P("&:focus",[x("state-border",{borderColor:"var(--n-border-color-focus)"})]),P("&:hover",[x("state-border",{borderColor:"var(--n-border-color-hover)"})]),P("&:active",[x("state-border",{borderColor:"var(--n-border-color-pressed)"})]),R("pressed",[x("state-border",{borderColor:"var(--n-border-color-pressed)"})])])]),R("disabled",{backgroundColor:"var(--n-color-disabled)",color:"var(--n-text-color-disabled)"},[x("border",{border:"var(--n-border-disabled)"})]),lo("disabled",[P("&:focus",{backgroundColor:"var(--n-color-focus)",color:"var(--n-text-color-focus)"},[x("state-border",{border:"var(--n-border-focus)"})]),P("&:hover",{backgroundColor:"var(--n-color-hover)",color:"var(--n-text-color-hover)"},[x("state-border",{border:"var(--n-border-hover)"})]),P("&:active",{backgroundColor:"var(--n-color-pressed)",color:"var(--n-text-color-pressed)"},[x("state-border",{border:"var(--n-border-pressed)"})]),R("pressed",{backgroundColor:"var(--n-color-pressed)",color:"var(--n-text-color-pressed)"},[x("state-border",{border:"var(--n-border-pressed)"})])]),R("loading","cursor: wait;"),U("base-wave",`
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `,[R("active",{zIndex:1,animationName:"button-wave-spread, button-wave-opacity"})]),Z&&"MozBoxSizing"in document.createElement("div").style?P("&::moz-focus-inner",{border:0}):null,x("border, state-border",`
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `),x("border",`
 border: var(--n-border);
 `),x("state-border",`
 border: var(--n-border);
 border-color: #0000;
 z-index: 1;
 `),x("icon",`
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `,[U("icon-slot",`
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `,[Wo({top:"50%",originalTransform:"translateY(-50%)"})]),qo()]),x("content",`
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `,[P("~",[x("icon",{margin:"var(--n-icon-margin)",marginRight:0})])]),R("block",`
 display: flex;
 width: 100%;
 `),R("dashed",[x("border, state-border",{borderStyle:"dashed !important"})]),R("disabled",{cursor:"not-allowed",opacity:"var(--n-opacity-disabled)"})]),P("@keyframes button-wave-spread",{from:{boxShadow:"0 0 0.5px 0 var(--n-ripple-color)"},to:{boxShadow:"0 0 0.5px 4.5px var(--n-ripple-color)"}}),P("@keyframes button-wave-opacity",{from:{opacity:"var(--n-wave-opacity)"},to:{opacity:0}})]),te=Object.assign(Object.assign({},po.props),{color:String,textColor:String,text:Boolean,block:Boolean,loading:Boolean,disabled:Boolean,circle:Boolean,size:String,ghost:Boolean,round:Boolean,secondary:Boolean,tertiary:Boolean,quaternary:Boolean,strong:Boolean,focusable:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},tag:{type:String,default:"button"},type:{type:String,default:"default"},dashed:Boolean,renderIcon:Function,iconPlacement:{type:String,default:"left"},attrType:{type:String,default:"button"},bordered:{type:Boolean,default:!0},onClick:[Function,Array],nativeFocusBehavior:{type:Boolean,default:!Jo},spinProps:Object}),ne=vo({name:"Button",props:te,slots:Object,setup(e){const f=Q(null),v=Q(null),u=Q(!1),n=jo(()=>!e.quaternary&&!e.tertiary&&!e.secondary&&!e.text&&(!e.color||e.ghost||e.dashed)&&e.bordered),G=xo(Uo,{}),{inlineThemeDisabled:K,mergedClsPrefixRef:O,mergedRtlRef:S,mergedComponentPropsRef:W}=_o(e),{mergedSizeRef:V}=Qo({},{defaultSize:"medium",mergedSize:r=>{var l,C;const{size:o}=e;if(o)return o;const{size:g}=G;if(g)return g;const{mergedSize:T}=r||{};if(T)return T.value;const m=(C=(l=W==null?void 0:W.value)===null||l===void 0?void 0:l.Button)===null||C===void 0?void 0:C.size;return m||"medium"}}),p=N(()=>e.focusable&&!e.disabled),oo=r=>{var l;p.value||r.preventDefault(),!e.nativeFocusBehavior&&(r.preventDefault(),!e.disabled&&p.value&&((l=f.value)===null||l===void 0||l.focus({preventScroll:!0})))},b=r=>{var l;if(!e.disabled&&!e.loading){const{onClick:C}=e;C&&Lo(C,r),e.text||(l=v.value)===null||l===void 0||l.play()}},B=r=>{switch(r.key){case"Enter":if(!e.keyboard)return;u.value=!1}},q=r=>{switch(r.key){case"Enter":if(!e.keyboard||e.loading){r.preventDefault();return}u.value=!0}},z=()=>{u.value=!1},i=po("Button","-button",re,ee,e,O),D=No("Button",S,O),H=N(()=>{const r=i.value,{common:{cubicBezierEaseInOut:l,cubicBezierEaseOut:C},self:o}=r,{rippleDuration:g,opacityDisabled:T,fontWeight:m,fontWeightStrong:$}=o,y=V.value,{dashed:L,type:E,ghost:M,text:w,color:a,round:no,circle:eo,textColor:j,secondary:Co,tertiary:so,quaternary:go,strong:mo}=e,yo={"--n-font-weight":mo?$:m};let d={"--n-color":"initial","--n-color-hover":"initial","--n-color-pressed":"initial","--n-color-focus":"initial","--n-color-disabled":"initial","--n-ripple-color":"initial","--n-text-color":"initial","--n-text-color-hover":"initial","--n-text-color-pressed":"initial","--n-text-color-focus":"initial","--n-text-color-disabled":"initial"};const A=E==="tertiary",io=E==="default",s=A?"default":E;if(w){const c=j||a;d={"--n-color":"#0000","--n-color-hover":"#0000","--n-color-pressed":"#0000","--n-color-focus":"#0000","--n-color-disabled":"#0000","--n-ripple-color":"#0000","--n-text-color":c||o[t("textColorText",s)],"--n-text-color-hover":c?_(c):o[t("textColorTextHover",s)],"--n-text-color-pressed":c?J(c):o[t("textColorTextPressed",s)],"--n-text-color-focus":c?_(c):o[t("textColorTextHover",s)],"--n-text-color-disabled":c||o[t("textColorTextDisabled",s)]}}else if(M||L){const c=j||a;d={"--n-color":"#0000","--n-color-hover":"#0000","--n-color-pressed":"#0000","--n-color-focus":"#0000","--n-color-disabled":"#0000","--n-ripple-color":a||o[t("rippleColor",s)],"--n-text-color":c||o[t("textColorGhost",s)],"--n-text-color-hover":c?_(c):o[t("textColorGhostHover",s)],"--n-text-color-pressed":c?J(c):o[t("textColorGhostPressed",s)],"--n-text-color-focus":c?_(c):o[t("textColorGhostHover",s)],"--n-text-color-disabled":c||o[t("textColorGhostDisabled",s)]}}else if(Co){const c=io?o.textColor:A?o.textColorTertiary:o[t("color",s)],h=a||c,X=E!=="default"&&E!=="tertiary";d={"--n-color":X?Y(h,{alpha:Number(o.colorOpacitySecondary)}):o.colorSecondary,"--n-color-hover":X?Y(h,{alpha:Number(o.colorOpacitySecondaryHover)}):o.colorSecondaryHover,"--n-color-pressed":X?Y(h,{alpha:Number(o.colorOpacitySecondaryPressed)}):o.colorSecondaryPressed,"--n-color-focus":X?Y(h,{alpha:Number(o.colorOpacitySecondaryHover)}):o.colorSecondaryHover,"--n-color-disabled":o.colorSecondary,"--n-ripple-color":"#0000","--n-text-color":h,"--n-text-color-hover":h,"--n-text-color-pressed":h,"--n-text-color-focus":h,"--n-text-color-disabled":h}}else if(so||go){const c=io?o.textColor:A?o.textColorTertiary:o[t("color",s)],h=a||c;so?(d["--n-color"]=o.colorTertiary,d["--n-color-hover"]=o.colorTertiaryHover,d["--n-color-pressed"]=o.colorTertiaryPressed,d["--n-color-focus"]=o.colorSecondaryHover,d["--n-color-disabled"]=o.colorTertiary):(d["--n-color"]=o.colorQuaternary,d["--n-color-hover"]=o.colorQuaternaryHover,d["--n-color-pressed"]=o.colorQuaternaryPressed,d["--n-color-focus"]=o.colorQuaternaryHover,d["--n-color-disabled"]=o.colorQuaternary),d["--n-ripple-color"]="#0000",d["--n-text-color"]=h,d["--n-text-color-hover"]=h,d["--n-text-color-pressed"]=h,d["--n-text-color-focus"]=h,d["--n-text-color-disabled"]=h}else d={"--n-color":a||o[t("color",s)],"--n-color-hover":a?_(a):o[t("colorHover",s)],"--n-color-pressed":a?J(a):o[t("colorPressed",s)],"--n-color-focus":a?_(a):o[t("colorFocus",s)],"--n-color-disabled":a||o[t("colorDisabled",s)],"--n-ripple-color":a||o[t("rippleColor",s)],"--n-text-color":j||(a?o.textColorPrimary:A?o.textColorTertiary:o[t("textColor",s)]),"--n-text-color-hover":j||(a?o.textColorHoverPrimary:o[t("textColorHover",s)]),"--n-text-color-pressed":j||(a?o.textColorPressedPrimary:o[t("textColorPressed",s)]),"--n-text-color-focus":j||(a?o.textColorFocusPrimary:o[t("textColorFocus",s)]),"--n-text-color-disabled":j||(a?o.textColorDisabledPrimary:o[t("textColorDisabled",s)])};let ro={"--n-border":"initial","--n-border-hover":"initial","--n-border-pressed":"initial","--n-border-focus":"initial","--n-border-disabled":"initial"};w?ro={"--n-border":"none","--n-border-hover":"none","--n-border-pressed":"none","--n-border-focus":"none","--n-border-disabled":"none"}:ro={"--n-border":o[t("border",s)],"--n-border-hover":o[t("borderHover",s)],"--n-border-pressed":o[t("borderPressed",s)],"--n-border-focus":o[t("borderFocus",s)],"--n-border-disabled":o[t("borderDisabled",s)]};const{[t("height",y)]:to,[t("fontSize",y)]:Po,[t("padding",y)]:So,[t("paddingRound",y)]:To,[t("iconSize",y)]:$o,[t("borderRadius",y)]:wo,[t("iconMargin",y)]:zo,waveOpacity:Ho}=o,Fo={"--n-width":eo&&!w?to:"initial","--n-height":w?"initial":to,"--n-font-size":Po,"--n-padding":eo||w?"initial":no?To:So,"--n-icon-size":$o,"--n-icon-margin":zo,"--n-border-radius":w?"initial":eo||no?to:wo};return Object.assign(Object.assign(Object.assign(Object.assign({"--n-bezier":l,"--n-bezier-ease-out":C,"--n-ripple-duration":g,"--n-opacity-disabled":T,"--n-wave-opacity":Ho},yo),d),ro),Fo)}),F=K?Ko("button",N(()=>{let r="";const{dashed:l,type:C,ghost:o,text:g,color:T,round:m,circle:$,textColor:y,secondary:L,tertiary:E,quaternary:M,strong:w}=e;l&&(r+="a"),o&&(r+="b"),g&&(r+="c"),m&&(r+="d"),$&&(r+="e"),L&&(r+="f"),E&&(r+="g"),M&&(r+="h"),w&&(r+="i"),T&&(r+=`j${co(T)}`),y&&(r+=`k${co(y)}`);const{value:a}=V;return r+=`l${a[0]}`,r+=`m${C[0]}`,r}),H,e):void 0;return{selfElRef:f,waveElRef:v,mergedClsPrefix:O,mergedFocusable:p,mergedSize:V,showBorder:n,enterPressed:u,rtlEnabled:D,handleMousedown:oo,handleKeydown:q,handleBlur:z,handleKeyup:B,handleClick:b,customColorCssVars:N(()=>{const{color:r}=e;if(!r)return null;const l=_(r);return{"--n-border-color":r,"--n-border-color-hover":l,"--n-border-color-pressed":J(r),"--n-border-color-focus":l,"--n-border-color-disabled":r}}),cssVars:K?void 0:H,themeClass:F==null?void 0:F.themeClass,onRender:F==null?void 0:F.onRender}},render(){const{mergedClsPrefix:e,tag:f,onRender:v}=this;v==null||v();const u=ao(this.$slots.default,n=>n&&I("span",{class:`${e}-button__content`},n));return I(f,{ref:"selfElRef",class:[this.themeClass,`${e}-button`,`${e}-button--${this.type}-type`,`${e}-button--${this.mergedSize}-type`,this.rtlEnabled&&`${e}-button--rtl`,this.disabled&&`${e}-button--disabled`,this.block&&`${e}-button--block`,this.enterPressed&&`${e}-button--pressed`,!this.text&&this.dashed&&`${e}-button--dashed`,this.color&&`${e}-button--color`,this.secondary&&`${e}-button--secondary`,this.loading&&`${e}-button--loading`,this.ghost&&`${e}-button--ghost`],tabindex:this.mergedFocusable?0:-1,type:this.attrType,style:this.cssVars,disabled:this.disabled,onClick:this.handleClick,onBlur:this.handleBlur,onMousedown:this.handleMousedown,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},this.iconPlacement==="right"&&u,I(ko,{width:!0},{default:()=>ao(this.$slots.icon,n=>(this.loading||this.renderIcon||n)&&I("span",{class:`${e}-button__icon`,style:{margin:Vo(this.$slots.default)?"0":""}},I(Oo,null,{default:()=>this.loading?I(Mo,Object.assign({clsPrefix:e,key:"loading",class:`${e}-icon-slot`,strokeWidth:20},this.spinProps)):I("div",{key:"icon",class:`${e}-icon-slot`,role:"none"},this.renderIcon?this.renderIcon():n)})))}),this.iconPlacement==="left"&&u,this.text?null:I(Xo,{ref:"waveElRef",clsPrefix:e}),this.showBorder?I("div",{"aria-hidden":!0,class:`${e}-button__border`,style:this.customColorCssVars}):null,this.showBorder?I("div",{"aria-hidden":!0,class:`${e}-button__state-border`,style:this.customColorCssVars}):null)}}),le=ne;export{ne as B,le as X,ee as b,uo as f,Jo as i,Qo as u};
