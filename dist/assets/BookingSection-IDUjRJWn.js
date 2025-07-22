import{j as l}from"./index-C1_ZM8EK.js";import{r as o,a as H}from"./react-vendor-C8sD07fA.js";import{m as f}from"./animation-vendor-g9CtzOhW.js";import"./image-vendor-CGS74YQe.js";var x=function(e,t){return x=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,n){a.__proto__=n}||function(a,n){for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(a[i]=n[i])},x(e,t)};function p(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");x(e,t);function a(){this.constructor=e}e.prototype=t===null?Object.create(t):(a.prototype=t.prototype,new a)}var d=function(){return d=Object.assign||function(t){for(var a,n=1,i=arguments.length;n<i;n++){a=arguments[n];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r])}return t},d.apply(this,arguments)};function q(e,t){t===void 0&&(t={});var a=t.insertAt;if(!(typeof document>"u")){var n=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css",a==="top"&&n.firstChild?n.insertBefore(i,n.firstChild):n.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}}var Q=`/*
  code is extracted from Calendly's embed stylesheet: https://assets.calendly.com/assets/external/widget.css
*/

.calendly-inline-widget,
.calendly-inline-widget *,
.calendly-badge-widget,
.calendly-badge-widget *,
.calendly-overlay,
.calendly-overlay * {
  font-size: 16px;
  line-height: 1.2em;
}

.calendly-inline-widget {
  min-width: 320px;
  height: 630px;
}

.calendly-inline-widget iframe,
.calendly-badge-widget iframe,
.calendly-overlay iframe {
  display: inline;
  width: 100%;
  height: 100%;
}

.calendly-popup-content {
  position: relative;
}

.calendly-popup-content.calendly-mobile {
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
}

.calendly-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 9999;
  background-color: #a5a5a5;
  background-color: rgba(31, 31, 31, 0.4);
}

.calendly-overlay .calendly-close-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.calendly-overlay .calendly-popup {
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
  width: 80%;
  min-width: 900px;
  max-width: 1000px;
  height: 90%;
  max-height: 680px;
}

@media (max-width: 975px) {
  .calendly-overlay .calendly-popup {
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-transform: none;
    transform: none;
    width: 100%;
    height: auto;
    min-width: 0;
    max-height: none;
  }
}

.calendly-overlay .calendly-popup .calendly-popup-content {
  height: 100%;
}

.calendly-overlay .calendly-popup-close {
  position: absolute;
  top: 25px;
  right: 25px;
  color: #fff;
  width: 19px;
  height: 19px;
  cursor: pointer;
  background: url(https://assets.calendly.com/assets/external/close-icon.svg)
    no-repeat;
  background-size: contain;
}

@media (max-width: 975px) {
  .calendly-overlay .calendly-popup-close {
    top: 15px;
    right: 15px;
  }
}

.calendly-badge-widget {
  position: fixed;
  right: 20px;
  bottom: 15px;
  z-index: 9998;
}

.calendly-badge-widget .calendly-badge-content {
  display: table-cell;
  width: auto;
  height: 45px;
  padding: 0 30px;
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.25) 0 2px 5px;
  font-family: sans-serif;
  text-align: center;
  vertical-align: middle;
  font-weight: bold;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
}

.calendly-badge-widget .calendly-badge-content.calendly-white {
  color: #666a73;
}

.calendly-badge-widget .calendly-badge-content span {
  display: block;
  font-size: 12px;
}

.calendly-spinner {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  text-align: center;
  z-index: -1;
}

.calendly-spinner > div {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-color: #e1e1e1;
  border-radius: 50%;
  vertical-align: middle;
  -webkit-animation: calendly-bouncedelay 1.4s infinite ease-in-out;
  animation: calendly-bouncedelay 1.4s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.calendly-spinner .calendly-bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.calendly-spinner .calendly-bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes calendly-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes calendly-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
`;q(Q);function g(e){return e.charAt(0)==="#"?e.slice(1):e}function X(e){return e!=null&&e.primaryColor&&(e.primaryColor=g(e.primaryColor)),e!=null&&e.textColor&&(e.textColor=g(e.textColor)),e!=null&&e.backgroundColor&&(e.backgroundColor=g(e.backgroundColor)),e}var U;(function(e){e.PROFILE_PAGE_VIEWED="calendly.profile_page_viewed",e.EVENT_TYPE_VIEWED="calendly.event_type_viewed",e.DATE_AND_TIME_SELECTED="calendly.date_and_time_selected",e.EVENT_SCHEDULED="calendly.event_scheduled",e.PAGE_HEIGHT="calendly.page_height"})(U||(U={}));var M=function(e){var t=e.url,a=e.prefill,n=a===void 0?{}:a,i=e.pageSettings,r=i===void 0?{}:i,u=e.utm,s=u===void 0?{}:u,m=e.embedType,c=X(r),b=c.backgroundColor,B=c.hideEventTypeDetails,W=c.hideLandingPageDetails,v=c.primaryColor,C=c.textColor,Y=c.hideGdprBanner,w=n.customAnswers,h=n.date,E=n.email,_=n.firstName,k=n.guests,N=n.lastName,S=n.location,j=n.name,L=s.utmCampaign,P=s.utmContent,I=s.utmMedium,T=s.utmSource,D=s.utmTerm,O=s.salesforce_uuid,y=t.indexOf("?"),R=y>-1,F=t.slice(y+1),V=R?t.slice(0,y):t,G=[R?F:null,b?"background_color=".concat(b):null,B?"hide_event_type_details=1":null,W?"hide_landing_page_details=1":null,v?"primary_color=".concat(v):null,C?"text_color=".concat(C):null,Y?"hide_gdpr_banner=1":null,j?"name=".concat(encodeURIComponent(j)):null,S?"location=".concat(encodeURIComponent(S)):null,_?"first_name=".concat(encodeURIComponent(_)):null,N?"last_name=".concat(encodeURIComponent(N)):null,k?"guests=".concat(k.map(encodeURIComponent).join(",")):null,E?"email=".concat(encodeURIComponent(E)):null,h&&h instanceof Date?"date=".concat(J(h)):null,L?"utm_campaign=".concat(encodeURIComponent(L)):null,P?"utm_content=".concat(encodeURIComponent(P)):null,I?"utm_medium=".concat(encodeURIComponent(I)):null,T?"utm_source=".concat(encodeURIComponent(T)):null,D?"utm_term=".concat(encodeURIComponent(D)):null,O?"salesforce_uuid=".concat(encodeURIComponent(O)):null,m?"embed_type=".concat(m):null,"embed_domain=1"].concat(w?Z(w):[]).filter(function($){return $!==null}).join("&");return"".concat(V,"?").concat(G)},J=function(e){var t=e.getMonth()+1,a=e.getDate(),n=e.getFullYear();return[n,t<10?"0".concat(t):t,a<10?"0".concat(a):a].join("-")},K=/^a\d{1,2}$/,Z=function(e){var t=Object.keys(e).filter(function(a){return a.match(K)});return t.length?t.map(function(a){return"".concat(a,"=").concat(encodeURIComponent(e[a]))}):[]},z=function(e){p(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}return t.prototype.render=function(){return o.createElement("div",{className:"calendly-spinner"},o.createElement("div",{className:"calendly-bounce1"}),o.createElement("div",{className:"calendly-bounce2"}),o.createElement("div",{className:"calendly-bounce3"}))},t}(o.Component),ee="calendly-inline-widget",ne=function(e){p(t,e);function t(a){var n=e.call(this,a)||this;return n.state={isLoading:!0},n.onLoad=n.onLoad.bind(n),n}return t.prototype.onLoad=function(){this.setState({isLoading:!1})},t.prototype.render=function(){var a=M({url:this.props.url,pageSettings:this.props.pageSettings,prefill:this.props.prefill,utm:this.props.utm,embedType:"Inline"}),n=this.props.LoadingSpinner||z;return o.createElement("div",{className:this.props.className||ee,style:this.props.styles||{}},this.state.isLoading&&o.createElement(n,null),o.createElement("iframe",{width:"100%",height:"100%",frameBorder:"0",title:this.props.iframeTitle||"Calendly Scheduling Page",onLoad:this.onLoad,src:a}))},t}(o.Component),te=function(e){p(t,e);function t(a){var n=e.call(this,a)||this;return n.state={isLoading:!0},n.onLoad=n.onLoad.bind(n),n}return t.prototype.onLoad=function(){this.setState({isLoading:!1})},t.prototype.render=function(){var a=M({url:this.props.url,pageSettings:this.props.pageSettings,prefill:this.props.prefill,utm:this.props.utm,embedType:"Inline"}),n=this.props.LoadingSpinner||z;return o.createElement(o.Fragment,null,this.state.isLoading&&o.createElement(n,null),o.createElement("iframe",{width:"100%",height:"100%",frameBorder:"0",title:this.props.iframeTitle||"Calendly Scheduling Page",onLoad:this.onLoad,src:a}))},t}(o.Component),A=function(e){if(!e.open)return null;if(!e.rootElement)throw new Error("[react-calendly]: PopupModal rootElement property cannot be undefined");return H.createPortal(o.createElement("div",{className:"calendly-overlay"},o.createElement("div",{onClick:e.onModalClose,className:"calendly-close-overlay"}),o.createElement("div",{className:"calendly-popup"},o.createElement("div",{className:"calendly-popup-content"},o.createElement(te,d({},e)))),o.createElement("button",{className:"calendly-popup-close",onClick:e.onModalClose,"aria-label":"Close modal",style:{display:"block",border:"none",padding:0}})),e.rootElement)};(function(e){p(t,e);function t(a){var n=e.call(this,a)||this;return n.state={isOpen:!1},n.onClick=n.onClick.bind(n),n.onClose=n.onClose.bind(n),n}return t.prototype.onClick=function(a){a.preventDefault(),this.setState({isOpen:!0})},t.prototype.onClose=function(a){a.stopPropagation(),this.setState({isOpen:!1})},t.prototype.render=function(){return o.createElement(o.Fragment,null,o.createElement("button",{onClick:this.onClick,style:this.props.styles||{},className:this.props.className||""},this.props.text),o.createElement(A,d({},this.props,{open:this.state.isOpen,onModalClose:this.onClose,rootElement:this.props.rootElement})))},t})(o.Component);(function(e){p(t,e);function t(a){var n=e.call(this,a)||this;return n.state={isOpen:!1},n.onClick=n.onClick.bind(n),n.onClose=n.onClose.bind(n),n}return t.prototype.onClick=function(){this.setState({isOpen:!0})},t.prototype.onClose=function(a){a.stopPropagation(),this.setState({isOpen:!1})},t.prototype.render=function(){return o.createElement("div",{className:"calendly-badge-widget",onClick:this.onClick},o.createElement("div",{className:"calendly-badge-content",style:{background:this.props.color||"#00a2ff",color:this.props.textColor||"#ffffff"}},this.props.text||"Schedule time with me",this.props.branding&&o.createElement("span",null,"powered by Calendly")),o.createElement(A,d({},this.props,{open:this.state.isOpen,onModalClose:this.onClose,rootElement:this.props.rootElement})))},t})(o.Component);function ae({url:e,prefill:t,utm:a}){return e?l.jsx("div",{className:"calendly-widget glass-card",children:l.jsx(ne,{url:e,styles:{height:"700px",width:"100%",borderRadius:"16px",overflow:"hidden",border:"none"},prefill:t,utm:a,pageSettings:{backgroundColor:"red",hideEventTypeDetails:!1,hideLandingPageDetails:!1,primaryColor:"1e3a8a",textColor:"4d5055"}})}):l.jsx("div",{className:"calendly-widget glass-card",children:l.jsx("div",{className:"text-center p-8",children:l.jsx("p",{className:"text-red-400",children:"Error: Calendly URL not provided"})})})}function se(){var i;const[e,t]=o.useState(null),a={"half-day":"https://calendly.com/namelesspharoe/half-day-private-lesson-4-hours-1-250","full-day":"https://calendly.com/namelesspharoe/30min"},n=[{id:"half-day",title:"Half Day Private",duration:"4 hours",price:"$1,250",features:["Personalized instruction","Skill level assessment","Technique refinement","Real-time feedback"]},{id:"full-day",title:"Full Day Private",duration:"7 hours",price:"$1,799",features:["Extended personalized instruction","Comprehensive skill development","Multiple terrain exploration","Lunch break included"]}];return l.jsx("section",{id:"booking",className:"py-20 px-4",children:l.jsxs("div",{className:"max-w-6xl mx-auto",children:[l.jsxs(f.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{duration:.8},className:"text-center mb-12",children:[l.jsx("h2",{className:"text-4xl font-bold mb-4",children:"Book Your Lesson"}),l.jsx("p",{className:"text-lg text-white/90 max-w-2xl mx-auto",children:"Choose your package and select your preferred time slot"})]}),e?l.jsxs(f.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.8},className:"max-w-4xl mx-auto",children:[l.jsxs("div",{className:"text-center mb-8",children:[l.jsx("h3",{className:"text-2xl font-bold mb-2",children:(i=n.find(r=>r.id===e))==null?void 0:i.title}),l.jsx("p",{className:"text-lg text-white/90 mb-4",children:"Select your preferred date and time"}),l.jsx("button",{onClick:()=>t(null),className:"px-6 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors",children:"← Back to Packages"})]}),l.jsx(ae,{url:a[e],prefill:{name:"",email:""},utm:{utmSource:"mooseology101",utmMedium:"website",utmCampaign:"ski-lessons"}})]}):l.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto",children:n.map((r,u)=>l.jsxs(f.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{duration:.8,delay:u*.2},className:"glass-card cursor-pointer hover:scale-105 transition-transform",onClick:()=>t(r.id),children:[l.jsx("h3",{className:"text-2xl font-bold mb-2",children:r.title}),l.jsx("div",{className:"text-3xl font-bold mb-4 text-blue-300",children:r.price}),l.jsx("div",{className:"text-sm mb-4",children:r.duration}),l.jsx("ul",{className:"text-left space-y-2 mb-6",children:r.features.map((s,m)=>l.jsxs("li",{className:"flex items-center",children:[l.jsx("span",{className:"mr-2",children:"✓"}),s]},m))}),l.jsx("button",{className:"w-full px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors",children:"Select Package"})]},r.id))})]})})}export{se as BookingSection};
