!function(e){function t(t){for(var i,r,s=t[0],l=t[1],c=t[2],h=0,d=[];h<s.length;h++)r=s[h],a[r]&&d.push(a[r][0]),a[r]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);for(u&&u(t);d.length;)d.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],i=!0,s=1;s<n.length;s++){var l=n[s];0!==a[l]&&(i=!1)}i&&(o.splice(t--,1),e=r(r.s=n[0]))}return e}var i={},a={0:0},o=[];function r(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=i,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="js/";var s=window.webpackJsonp=window.webpackJsonp||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=l;o.push([22,1]),n()}({22:function(e,t,n){"use strict";n.r(t);n(7);var i=n(0),a=n.n(i);function o(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var r=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.myTabEvent()}return function(e,t,n){t&&o(e.prototype,t),n&&o(e,n)}(e,[{key:"myTabClicks",value:function(e){for(var t=document.querySelectorAll(".tabs-nav > li"),n=0;n<t.length;n++)t[n].classList.remove("active");e.currentTarget.classList.add("active"),e.preventDefault();for(var i=document.querySelectorAll(".tab-pane"),a=0;a<i.length;a++)i[a].classList.remove("active");var o=e.target.getAttribute("href");document.querySelector(o).classList.add("active")}},{key:"myTabEvent",value:function(){for(var e=document.querySelectorAll(".tabs-nav > li"),t=0;t<e.length;t++)e[t].addEventListener("click",this.myTabClicks)}}]),e}(),s=n(3),l=n.n(s);function c(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var u=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.content=document.querySelector(".main__content"),this.body=document.querySelector("body"),this.sticky()}return function(e,t,n){t&&c(e.prototype,t),n&&c(e,n)}(e,[{key:"sticky",value:function(){if(!this.body.classList.contains("header--sticky")){var e=new l.a.Controller;new l.a.Scene({triggerElement:this.body,triggerHook:0,offset:100}).setClassToggle(this.body,"header--sticky").addTo(e)}}}]),e}(),h=n(4),d=n.n(h);var f=function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.slider=new d.a(t,{slidesPerView:5,spaceBetween:0,breakpoints:{400:{slidesPerView:1},600:{slidesPerView:2},768:{slidesPerView:3},1200:{slidesPerView:4}}})};function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function v(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var y=function(){function e(t){var n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.width;var i=a()(t+" .carousel__mask");this.slider=new d.a(t,(p(n={speed:400,effect:"slide",slidesOffsetBefore:0,spaceBetween:0,centeredSlides:!0,roundLengths:!0,loop:!0,slidesPerView:6},"spaceBetween",0),p(n,"breakpoints",{576:{slidesPerView:2},768:{slidesPerView:3},1200:{slidesPerView:4},2048:{slidesPerView:5}}),p(n,"on",{init:function(){this.width=this.slidesSizesGrid[0],i.width(this.width),this.slideTo(Math.floor(this.params.slidesPerView/2))},resize:function(){this.width=this.slidesSizesGrid[0],i.width(this.width)}}),n)),this.next(this.slider,t)}return function(e,t,n){t&&v(e.prototype,t),n&&v(e,n)}(e,[{key:"next",value:function(e,t){a()(t+" .swiper-slide").on("click",function(t){return t.preventDefault(),e.slideTo(a()(this).index()),!1})}}]),e}(),w=n(2);function g(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var m=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.open(this.openPopup),this.close(this.closePopup),this.closeESC(this.closePopup)}return function(e,t,n){t&&g(e.prototype,t),n&&g(e,n)}(e,[{key:"open",value:function(e){a()(".js-hamburger").on("click",function(t){t.preventDefault(),e()})}},{key:"close",value:function(e){a()(".js-popup-close").on("click",function(t){t.preventDefault(),e()})}},{key:"closeESC",value:function(e){document.onkeydown=function(t){27===(t=t||window.event).keyCode&&e()}}},{key:"openPopup",value:function(){a()(".popup").addClass("show"),a()("html").css("overflow","hidden"),Object(w.a)({targets:".popup",opacity:[0,1],translateX:["-100%",0],easing:"easeInOutQuart",duration:1e3,delay:250,loop:!1}),Object(w.a)({targets:".popup__inner",opacity:[0,1],translateX:["-100%",0],easing:"easeInOutQuart",duration:1e3,delay:250,loop:!1,complete:function(){a()(".popup").css("overflow","auto"),a()("body").addClass("popup-open")}})}},{key:"closePopup",value:function(){a()(".popup").css("overflow","hidden"),a()("html").css("overflow","auto"),Object(w.a)({targets:".popup",translateX:[0,"100%"],opacity:[1,0],easing:"easeInQuad",duration:1e3,delay:250,loop:!1}),Object(w.a)({targets:".popup__inner",opacity:0,translateX:"100%",easing:"easeInQuad",duration:1e3,delay:250,loop:!1,complete:function(){a()("body").removeClass("popup-open"),a()(".popup").removeClass("show")}})}}]),e}();function b(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var k=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.controller=new l.a.Controller,this.hoverSvg(this.drawSvg),this.animateLeftToRight(this.controller,this.drawSvg),this.animateRightToLeft(this.controller,this.drawSvg),this.animateBottomToTop(this.controller),this.animateFadeIn(this.controller)}return function(e,t,n){t&&b(e.prototype,t),n&&b(e,n)}(e,[{key:"drawSvg",value:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2e3,n=[],i=a()(e).find("path"),o=0;o<a()(e).find("path").length;o++)n[o]=i[o];return Object(w.a)({targets:n,strokeDashoffset:[w.a.setDashoffset,0],easing:"easeInQuad",duration:t,delay:function(e,t){return(n.length+1)/(t+1)*250},direction:"alternate",loop:!1,autoplay:!1})}},{key:"hoverSvg",value:function(e){a()(".animate-svg").hover(function(){var t=a()(this);e(t,500).play()})}},{key:"animateLeftToRight",value:function(e,t){a()(".animate-to-right").each(function(){var n=a()(this),i=n.find(".animate-svg"),o=Object(w.a)({targets:this,translateX:["-100%",0],opacity:[0,1],delay:250,duration:1e3,easing:"easeInOutQuart",autoplay:!1,begin:function(){n.parent().css("overflow","hidden")},complete:function(){n.parent().css("overflow","visible")}});new l.a.Scene({triggerElement:this,triggerHook:1,reverse:!1}).addTo(e).on("enter",function(){t(i,2e3).play(),o.play()})})}},{key:"animateRightToLeft",value:function(e,t){a()(".animate-to-left").each(function(){var n=a()(this),i=n.find(".animate-svg"),o=Object(w.a)({targets:this,translateX:["100%",0],opacity:[0,1],delay:250,duration:1e3,easing:"easeInOutQuart",autoplay:!1,begin:function(){n.parent().css("overflow","hidden")},complete:function(){n.parent().css("overflow","visible")}});new l.a.Scene({triggerElement:this,triggerHook:1,reverse:!1}).addTo(e).on("enter",function(){t(i,2e3).play(),o.play()})})}},{key:"animateBottomToTop",value:function(e){a()(".animate-to-top").each(function(){var t=a()(this),n=Object(w.a)({targets:this,translateY:["100%",0],opacity:[0,1],delay:250,duration:1e3,easing:"easeInOutQuart",autoplay:!1,begin:function(){t.parent().css("overflow","hidden")},complete:function(){t.parent().css("overflow","visible")}});new l.a.Scene({triggerElement:this.parentNode,triggerHook:1,reverse:!1}).addTo(e).on("enter",function(){n.play()})})}},{key:"animateFadeIn",value:function(e){a()(".animate-fade-in").each(function(){var t=Object(w.a)({targets:this,opacity:[0,1],delay:250,duration:1e3,easing:"linear",autoplay:!1});new l.a.Scene({triggerElement:this,triggerHook:1,reverse:!1}).addTo(e).on("enter",function(){t.play()})})}}]),e}();function x(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var C=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.classes(),this.textarea=a()("textarea").on("keydown",this.textareaAutoSize)}return function(e,t,n){t&&x(e.prototype,t),n&&x(e,n)}(e,[{key:"classes",value:function(){a()("input, textarea").on("blur change keyup paste input",function(){var e=a()(this);""===e.val()?e.is(":focus")||e.closest(".form-group").removeClass("active"):e.closest(".form-group").addClass("active")}),a()("input, textarea").on("focus active",function(){a()(this).closest(".form-group").addClass("focus active")}),a()("input, textarea").on("blur",function(){a()(this).closest(".form-group").removeClass("focus")})}},{key:"textareaAutoSize",value:function(){var e=this;setTimeout(function(){e.style.cssText="height:auto; padding: 0",e.style.cssText="height:"+e.scrollHeight+"px"},0)}}]),e}();function O(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var P=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.custom(t)}return function(e,t,n){t&&O(e.prototype,t),n&&O(e,n)}(e,[{key:"custom",value:function(e){a()(e).each(function(){var e=a()(this).parent().parent().find(".file-name");a()(this).on("change",function(t){var n="";(n=this.files&&this.files.length>1?(this.getAttribute("data-multiple-caption")||"").replace("{count}",this.files.length):t.target.value.split("\\").pop())?e.val(n):e.val("")})})}}]),e}();function j(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var T=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.vh=.01*window.innerHeight,this.addVh=document.documentElement.style.setProperty("--vh","".concat(this.vh,"px")),this.resize()}return function(e,t,n){t&&j(e.prototype,t),n&&j(e,n)}(e,[{key:"resize",value:function(){var e=this;window.addEventListener("resize",function(){e.vh=.01*window.innerHeight,document.documentElement.style.setProperty("--vh","".concat(e.vh,"px"))})}}]),e}();function S(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var E=function(e,t,n,i){var a,o,r=1,s=e.slides[t].getElementsByClassName("slider__bg"),l=e.slides[t].getElementsByClassName("sl");if(s.length>0){var c=s[0].getAttribute("data-swiper-screen-x"),u=s[0].getAttribute("data-swiper-screen-y");if(c&&u){a=c,o=u,r=window.matchMedia("(orientation: portrait)").matches?n/a*1.6:i/o;var h=n/i;h<1.6&&h>=.976?r=r*h*.6:h<.55&&(r=r*h*2.8)}else console.log("Attributes data-swiper-screen-x, data-swiper-screen-y is empty!");if(l.length>0)for(var d=0;d<l.length;d++){var f=l[d].getAttribute("data-swiper-right"),p=l[d].getAttribute("data-swiper-top"),v=l[d].getAttribute("data-swiper-zIndex"),y=l[d].style;y.right=f*r+"px",y.top=p*r+"px",y.zIndex=v;var w=l[d].children[0].naturalWidth,g=l[d].children[0].naturalHeight;y.width=w*r+"px",y.height=g*r+"px"}}},M=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var i=new Array,o=new Array,r=new Array;this.createArray(i,o,r,t),this.slider=new d.a(t,{parallax:!0,spaceBetween:0,preloadImages:!1,loop:!1,lazy:{loadPrevNext:!0},slidesPerView:1,watchSlidesVisibility:!0,effect:"fade",pagination:{el:".js-slider-pagination",clickable:!0,renderBullet:function(e,t){return'<div class="'+t+'"><span>'+i[e]+"</span></div>"}},on:{init:function(){var e=this.activeIndex,t=this.width,i=this.height;if(o[e]?a()("body").addClass("slider--theme-light"):a()("body").removeClass("slider--theme-light"),r[e]){var s=this.slides[e].getElementsByClassName("slider__item")[0];a()(s).data("vide").getVideoObject().play()}else a()(".slider__item").each(function(){a()(this).data("vide")&&a()(this).data("vide").getVideoObject().pause()});n(this,e,t,i)}}}),this.slider.on("resize",function(){var e=this.activeIndex,t=this.width,i=this.height;n(this,e,t,i)}),this.slider.on("slideChange",function(){var e=this.activeIndex,t=this.width,i=this.height;if(n(this,e,t,i),o[e]?a()("body").addClass("slider--theme-light"):a()("body").removeClass("slider--theme-light"),r[e]){var s=this.slides[e].getElementsByClassName("slider__item")[0];a()(s).data("vide").getVideoObject().play()}else a()(".slider__item").each(function(){a()(this).data("vide")&&a()(this).data("vide").getVideoObject().pause()})})}return function(e,t,n){t&&S(e.prototype,t),n&&S(e,n)}(e,[{key:"createArray",value:function(e,t,n,i){a()(i+" .swiper-slide").each(function(){var i=a()(this).data("title"),o=a()(this).data("theme"),r=a()(this).data("video");e.push(i),t.push(o),n.push(r)})}}]),e}();function L(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}a()(document).ready(function(){new M(".js-slider",E)}),new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.onready=document.addEventListener("DOMContentLoaded",this.ready)}return function(e,t,n){t&&L(e.prototype,t),n&&L(e,n)}(e,[{key:"ready",value:function(){a()(".preloader").length>0&&(a()(".preloader").delay(2e3).fadeOut(500),a()(".loader").delay(1e3).fadeOut(500,function(){a()("body").addClass("loaded")}))}}]),e}());var _=n(1),A=n(6);function z(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var B=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),window.matchMedia("(orientation: portrait)").matches?this.resolution=35:this.resolution=60,this.isolation=40,this.materials=new _.h({color:16711909,specular:592137,shininess:40}),this.balls=new A.a(this.resolution,this.materials,!0,!0),this.balls.position.set(700,0,0),this.balls.scale.set(700,700,700),this.balls.isolation=this.isolation,this.balls.enableUvs=!1,this.balls.enableColors=!1}return function(e,t,n){t&&z(e.prototype,t),n&&z(e,n)}(e,[{key:"updateColors",value:function(e){var t;return t=e<=0?30*e+320:320-30*e,Math.abs(t/360).toFixed(2)}},{key:"updateMarchingCubes",value:function(e,t,n,i){var a,o,r,s,l;this.balls.reset(),l=1.2/((Math.sqrt(t)-1)/4+1);var c=Math.abs(n),u=Math.abs(i);for(a=0;a<t;a++)o=Math.sin(a+1.26*e/1.5*(1.03+.5*Math.sin(.21*a)))*(Math.cos(c)-.1)*.3+.5,r=Math.sin(Math.sin(a+3.52*e/1.5*Math.sin(1.22+.1424*a)))*(Math.cos(u)-.2)*.43+.5,s=.27*Math.cos(a+1.32*e*.1*Math.sin(.92+.53*a))+.5,this.balls.material.color.setHSL(this.updateColors(n),1,.5),this.balls.addBall(o,r,s,l,12)}}]),e}();function V(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var I=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.container=document.getElementById(t)}return function(e,t,n){t&&V(e.prototype,t),n&&V(e,n)}(e,[{key:"setup",value:function(){this.width=window.innerWidth,this.height=window.innerHeight,this.time=0,this.speed=1,this.clock=new _.d,this.mouse=new _.n,this.pointLight=new _.l(526344,.5),this.numblobs=8,this.metaBalls=new B}},{key:"createScene",value:function(){this.scene=new _.m,this.renderer=new _.o({antialias:!0,alpha:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=_.j,this.container.appendChild(this.renderer.domElement)}},{key:"createCamera",value:function(){this.camera=new _.k(45,window.innerWidth/window.innerHeight,1,1e4),this.camera.position.set(0,0,2e3),window.matchMedia("(orientation: portrait)").matches?this.camera.position.x=700:this.camera.position.x=0,this.scene.add(this.camera)}},{key:"addDirectionalLight",value:function(){var e=new _.f(16777215);e.position.set(-1,.85,.85),this.scene.add(e)}},{key:"addPointLight",value:function(e,t){var n=this.pointLight;n.color.setHSL(e.hue,e.saturation,e.lightness),n.position.set(t.x,t.y,t.z),this.scene.add(n)}},{key:"addAmbientLight",value:function(){var e=new _.a(526344);this.scene.add(e)}},{key:"addBalls",value:function(){this.scene.add(this.metaBalls.balls)}},{key:"init",value:function(){this.container&&(this.setup(),this.createScene(),this.createCamera(),this.addDirectionalLight(),window.matchMedia("(orientation: portrait)").matches||this.addPointLight({hue:.8,saturation:0,lightness:.4},{x:0,y:0,z:0}),this.addAmbientLight(),this.addBalls(),this.animate(),window.addEventListener("resize",this.onResize.bind(this)),window.addEventListener("mousemove",this.onMouseMove.bind(this),!1))}},{key:"onResize",value:function(){window.matchMedia("(orientation: portrait)").matches?this.camera.position.x=700:this.camera.position.x=0,this.width=window.innerWidth,this.height=window.innerHeight,this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height)}},{key:"onMouseMove",value:function(e){e.preventDefault(),this.mouse.x=e.clientX/this.width*2-1,this.mouse.y=-e.clientY/this.height*2+1}},{key:"draw",value:function(){var e=this.clock.getDelta();this.time+=e*this.speed*.5,this.metaBalls.updateMarchingCubes(this.time,this.numblobs,this.mouse.x,this.mouse.y),this.pointLight.position.x=700*this.mouse.x,this.pointLight.position.y=700*this.mouse.y,this.pointLight.position.z=1e3*this.mouse.x}},{key:"animate",value:function(){this.draw(),this.renderer.clear(),this.renderer.render(this.scene,this.camera),requestAnimationFrame(this.animate.bind(this))}}]),e}();a()(document).ready(function(){new T,new k,new r,new m,new C,new P(".file-input"),new u,new f(".js-awards"),new y(".js-phone-screens"),new I("container").init(),a()("[data-scrollto]").click(function(){a.a.scrollTo(a()(this).attr("data-scrollto"),1e3)}),a()(".tel").mask("+7 (999) 999-99-99")})}});
//# sourceMappingURL=app.js.map