(window.webpackJsonptime=window.webpackJsonptime||[]).push([[0],[,,,,,,function(e,t,n){e.exports=n.p+"static/media/day.bca467fd.svg"},function(e,t,n){e.exports=n.p+"static/media/night.1f2142ef.svg"},function(e,t,n){e.exports=n(18)},,,,,function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(3),c=n.n(o),i=n(1);n(13);var s=function(e){return r.a.createElement("input",{className:"digit",type:"text",value:e.value,disabled:e.disabled})};n(14);var l=function(e){var t=e.choices.map(function(t){return r.a.createElement("button",{key:t,className:"".concat(t===e.selected?"selected":""),onClick:function(){return e.onSelect(t)}},t)});return r.a.createElement("div",{className:"select-button"},t)},u=n(4),f=n.n(u),d=n(5);function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}var v=function(e){var t=Object(a.useState)(e),n=Object(i.a)(t,2),r=n[0],o=n[1];return{settings:r,handleTimeFormatChange:function(e){o(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(n,!0).forEach(function(t){Object(d.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},r,{format:e}))}}},g=n(6),b=n.n(g),p=n(7),h=n.n(p),w=(n(16),Object.freeze({TWELVE:12,TWENTY_FOUR:24}));function E(e){var t=e===w.TWELVE?"hh":"HH",n=f()(new Date);return{hours:n.format(t),minutes:n.format("mm"),seconds:n.format("ss"),isDay:"AM"===n.format("A")}}function y(e){return r.a.createElement("div",{className:"clock-settings"},r.a.createElement(l,{choices:Object.values(w),onSelect:e.handleTimeFormatChange,selected:e.settings.format}))}function O(e){return r.a.createElement("div",{className:"time-unit"},r.a.createElement(s,{value:e.value[0],disabled:e.disabled}),r.a.createElement(s,{value:e.value[1],disabled:e.disabled}))}var j=function(e){var t=v({format:w.TWELVE}),n=Object(a.useState)(E(t.settings.format)),o=Object(i.a)(n,2),c=o[0],s=o[1];return Object(a.useEffect)(function(){s(E(t.settings.format));var e=setInterval(function(){s(E(t.settings.format))},1e3);return function(){clearInterval(e)}},[t.settings.format]),r.a.createElement("div",{className:"clock"},r.a.createElement(y,t),r.a.createElement("div",{className:"time"},r.a.createElement(O,{disabled:!0,value:c.hours}),r.a.createElement(O,{disabled:!0,value:c.minutes}),r.a.createElement(O,{disabled:!0,value:c.seconds}),r.a.createElement("div",{className:"daylight"},r.a.createElement("img",{src:c.isDay?b.a:h.a,alt:""}))))};n(17);var k=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"tool"},r.a.createElement(j,null)))},N=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function W(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}!function(e){if("serviceWorker"in navigator){if(new URL("/clock",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/clock","/service-worker.js");N?(!function(e,t){fetch(e).then(function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):W(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):W(t,e)})}}(),c.a.render(r.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[8,1,2]]]);
//# sourceMappingURL=main.c3645322.chunk.js.map