import{o as c,c as d,n as G,a as n,b as S,r as _,w as M,v as A,d as O,F as f,e as T,t as g,f as u,g as v,h as $,i as B,j as L}from"./vendor.49a277d8.js";const V=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const h of i.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&o(h)}).observe(document,{childList:!0,subtree:!0});function s(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=s(r);fetch(r.href,i)}};V();const N="d0690cd38c2b128758385513f18ad8ee5045266d889b6aebc6430bdcff48c177",k=new Map;let p;const y={AGGREGATE_INDEX:"5",INVALID_SUB:"500"};let E;const m=new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${N}`);m.addEventListener("message",e=>{var a;let{TYPE:t,FROMSYMBOL:s,TOSYMBOL:o,PRICE:r,PARAMETER:i}=JSON.parse(e.data);if(t!==y.INVALID_SUB&&(t!==y.AGGREGATE_INDEX||r===void 0))return;let h=1;if(s==="BTC"?E=r:o==="BTC"&&(h=E),t===y.INVALID_SUB&&i){U(i);return}const l=(a=k.get(s))!=null?a:[];l==null||l.forEach(x=>x(r*h))});const U=e=>{const[t,s]=e.split("~").reverse();!(p==null?void 0:p.includes(s))||s==="BTC"||t==="BTC"||(w("BTC","USD"),w(s,"BTC"))},I=e=>{const t=JSON.stringify(e);m.readyState===WebSocket.OPEN&&m.send(t),m.addEventListener("open",()=>{m.send(t)},{once:!0})},w=(e,t)=>{const s={action:"SubAdd",subs:[`5~CCCAGG~${e}~${t}`]};I(s)},z=(e,t)=>{const s={action:"SubRemove",subs:[`5~CCCAGG~${e}~${t}`]};I(s)},C=(e,t)=>{const s=k.get(e)||[];k.set(e,[...s,t]),w(e,"USD")},D=e=>{k.delete(e),z(e,"USD")},P=async()=>{var s;const t=await(await fetch("https://min-api.cryptocompare.com/data/all/coinlist?summary=true")).json();return p=(s=Object.values(t.Data))==null?void 0:s.map(o=>o.Symbol),p};var b=(e,t)=>{const s=e.__vccOpts||e;for(const[o,r]of t)s[o]=r;return s};const W={name:"AddButton",props:{disabled:{type:Boolean,default:!1}}},F=["disabled"],R=n("svg",{class:"-ml-0.5 mr-2 h-6 w-6",xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 24 24",fill:"#ffffff"},[n("path",{d:"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"})],-1),j=S(" \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C "),K=[R,j];function Y(e,t,s,o,r,i){return c(),d("button",{class:G(["my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",{"disabled:opacity-50":s.disabled}]),disabled:s.disabled},K,10,F)}var H=b(W,[["render",Y]]);const J={name:"AddTicker",components:{AddButton:H},props:{oftenTickers:{type:Array,default(){return[]}},tickers:{type:Array,default(){return[]}}},emits:{addTicker:e=>{var t;return typeof e=="object"&&((t=e.name)==null?void 0:t.length)}},data(){return{ticker:"",disabled:!0}},computed:{autocompleteTicker(){var e;return(e=this.oftenTickers)==null?void 0:e.filter(t=>{var s;return t.includes((s=this.ticker)==null?void 0:s.toUpperCase())}).slice(0,4)},isOld(){var e;return(e=this.tickers)==null?void 0:e.filter(t=>{var s;return t.name===((s=this.ticker)==null?void 0:s.toUpperCase())}).length}},watch:{ticker(){if(!this.ticker||this.isOld){this.disabled=!0;return}this.disabled=!1}},methods:{add(){if(!this.ticker){this.ticker="";return}if(this.isOld)return;const e=this.ticker.toUpperCase(),t=this.oftenTickers.includes(e)?"bg-white":"bg-red-100",s={name:e,price:"-",intervalId:null,bgColor:t};this.$emit("addTicker",s),this.ticker=""}}},X={class:"flex"},q={class:"max-w-xs"},Q=n("label",{for:"wallet",class:"block text-sm font-medium text-gray-700"},"\u0422\u0438\u043A\u0435\u0440",-1),Z={class:"mt-1 relative rounded-md shadow-md"},ee={key:0,class:"flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap"},te=["onClick"],re={key:1},se=n("div",{class:"text-sm text-red-600"},"\u0422\u0430\u043A\u043E\u0439 \u0442\u0438\u043A\u0435\u0440 \u0443\u0436\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D",-1),ie=[se];function ne(e,t,s,o,r,i){const h=_("add-button");return c(),d("section",null,[n("div",X,[n("div",q,[Q,n("div",Z,[M(n("input",{id:"wallet","onUpdate:modelValue":t[0]||(t[0]=l=>r.ticker=l),type:"text",name:"wallet",class:"block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md",placeholder:"e.g. DOGE",onKeydown:t[1]||(t[1]=O((...l)=>i.add&&i.add(...l),["enter"]))},null,544),[[A,r.ticker]])]),r.ticker&&i.autocompleteTicker.length?(c(),d("div",ee,[(c(!0),d(f,null,T(i.autocompleteTicker,l=>(c(),d("span",{key:l,class:"inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer",onClick:a=>{r.ticker=l,i.add()}},g(l),9,te))),128))])):u("",!0),i.isOld?(c(),d("div",re,ie)):u("",!0)])]),v(h,{type:"button",onClick:i.add,disabled:r.disabled},null,8,["onClick","disabled"])])}var oe=b(J,[["render",ne]]);const ae={name:"TheGraph",props:{selectedTicker:Object,graph:Array},emits:{click:null,removeGraph:null,updateMaxElements:null},data(){return{maxGraphElements:1,graphWidth:0}},computed:{normalizedGraph(){const e=Math.max(...this.graph);let t=Math.min(...this.graph);return e===t&&(t=0),this.graph.map(s=>5+(s-t)*95/(e-t))}},watch:{maxGraphElements(){this.$emit("updateMaxElements",this.maxGraphElements)},graph(){this.calculateMaxGraphElements()},graphWidth(){this.calculateMaxGraphElements()}},mounted(){window.addEventListener("resize",this.calculateMaxGraphElements)},beforeUnmount(){window.removeEventListener("resize",this.calculateMaxGraphElements)},methods:{calculateMaxGraphElements(){!this.$refs.graph||(this.graphWidth=this.$refs.graph.clientWidth,this.maxGraphElements=parseFloat((this.graphWidth/38).toFixed()))}}},le={key:0,class:"relative"},ce={class:"text-lg leading-6 font-medium text-gray-900 my-8"},de={class:"flex items-end border-gray-600 border-b border-l h-64",ref:"graph"},he=n("svg",{xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",x:"0",y:"0",viewBox:"0 0 511.76 511.76","xml:space":"preserve"},[n("g",null,[n("path",{d:"M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048    c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z     M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165    c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0    c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z",fill:"#718096","data-original":"#000000"})])],-1),ue=[he];function me(e,t,s,o,r,i){return s.selectedTicker?(c(),d("section",le,[n("h3",ce,g(s.selectedTicker.name)+" - USD ",1),n("div",de,[(c(!0),d(f,null,T(i.normalizedGraph,(h,l)=>(c(),d("div",{key:l,style:$({height:`${h}%`}),class:"bg-purple-800 border w-10"},null,4))),128))],512),n("button",{type:"button",class:"absolute top-0 right-0",onClick:t[0]||(t[0]=h=>e.$emit("removeGraph"))},ue)])):u("",!0)}var pe=b(ae,[["render",me]]);const fe={components:{AddTicker:oe,TheGraph:pe},data(){return{oftenTickers:[],selectedTicker:null,tickers:[],graph:[],filter:"",page:1,maxGraphElements:1}},computed:{pageStateOptions(){return{filter:this.filter,page:this.page}},startIndex(){return 6*(this.page-1)},endIndex(){return 6*this.page},hasNextPage(){var e;return((e=this.filteredTickers)==null?void 0:e.length)>this.endIndex},filteredTickers(){var e;return(e=this.tickers)==null?void 0:e.filter(t=>{var s,o;return(o=t.name)==null?void 0:o.includes((s=this.filter)==null?void 0:s.toUpperCase())})},paginatedTickers(){var e;return(e=this.filteredTickers)==null?void 0:e.slice(this.startIndex,this.endIndex)}},watch:{tickers(){localStorage.setItem("cryptonomicon",JSON.stringify(this.tickers))},paginatedTickers(){var e;!((e=this.paginatedTickers)!=null&&e.length)&&this.page>1&&(this.page-=1)},selectedTicker(){this.graph=[],this.$nextTick(this.calculateMaxGraphElements)},filter(){this.page=1},pageStateOptions(e){window.history.pushState(null,"",`${window.location.pathname}?filter=${e.filter}&page=${e.page}`)}},async created(){var o;this.oftenTickers=[...await P()];const e=Object.fromEntries(new URL(window.location).searchParams.entries());["filter","page"].forEach(r=>{e[r]&&(this[r]=e[r])});const s=localStorage.getItem("cryptonomicon");s&&(this.tickers=JSON.parse(s),(o=this.tickers)==null||o.forEach(r=>{C(r.name,i=>{this.updateTicker(r.name,i)})}))},methods:{add(e){!e||(this.tickers=[...this.tickers,e],C(e.name,t=>{this.updateTicker(e.name,t)}),this.ticker="")},formatPrice(e){return e==="-"?e:e>1?e==null?void 0:e.toFixed(2):e==null?void 0:e.toPrecision(3)},resizeGraph(){this.graph.length>this.maxGraphElements&&(this.graph=this.graph.slice(this.graph.length-this.maxGraphElements,this.graph.length))},updateMaxElements(e){this.maxGraphElements=e,this.resizeGraph()},updateTicker(e,t){var s;this.tickers.find(o=>o.name===e).price=t,((s=this.selectedTicker)==null?void 0:s.name)===e&&(this.graph=[...this.graph,t],this.resizeGraph())},remove(e){this.tickers=this.tickers.filter(t=>(t===e&&(clearInterval(t.intervalId),t.intervalId=null),t!==e)),e===this.selectedTicker&&(this.selectedTicker=null),D(e.name)},select(e){this.selectedTicker=e}}},ge={class:"container mx-auto flex flex-col items-center bg-gray-100 p-4"},ke={class:"container"},be=n("label",{for:"filter",class:"block text-sm font-medium text-gray-700"},"\u0424\u0438\u043B\u044C\u0442\u0440",-1),xe=n("hr",{class:"w-full border-t border-gray-600 my-4"},null,-1),ye={class:"mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3"},_e=["onClick"],ve={class:"px-4 py-5 sm:p-6 text-center"},we={class:"text-sm font-medium text-gray-500 truncate"},Te={class:"mt-1 text-3xl font-semibold text-gray-900"},Ee=n("div",{class:"w-full border-t border-gray-200"},null,-1),Ce=["onClick"],Ge=n("svg",{class:"h-5 w-5",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"#718096","aria-hidden":"true"},[n("path",{"fill-rule":"evenodd",d:"M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z","clip-rule":"evenodd"})],-1),Se=S(" \u0423\u0434\u0430\u043B\u0438\u0442\u044C "),Me=[Ge,Se],Ae=n("hr",{class:"w-full border-t border-gray-600 my-4"},null,-1);function Oe(e,t,s,o,r,i){const h=_("add-ticker"),l=_("TheGraph");return c(),d("div",ge,[n("div",ke,[v(h,{onAddTicker:i.add,"often-tickers":r.oftenTickers,tickers:r.tickers},null,8,["onAddTicker","often-tickers","tickers"]),r.tickers.length?(c(),d(f,{key:0},[n("div",null,[r.page>1?(c(),d("button",{key:0,class:"my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",onClick:t[0]||(t[0]=a=>r.page--)}," back ")):u("",!0),i.hasNextPage?(c(),d("button",{key:1,class:"my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",onClick:t[1]||(t[1]=a=>r.page++)}," next ")):u("",!0),be,M(n("input",{id:"filter","onUpdate:modelValue":t[2]||(t[2]=a=>r.filter=a),type:"text",class:"block pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md",onKeydown:t[3]||(t[3]=O((...a)=>i.add&&i.add(...a),["enter"]))},null,544),[[A,r.filter]])]),xe,n("dl",ye,[(c(!0),d(f,null,T(i.paginatedTickers,a=>(c(),d("div",{key:a,class:G([[a.bgColor,{"border-4":r.selectedTicker===a}],"overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"]),onClick:x=>i.select(a)},[n("div",ve,[n("dt",we,g(a.name)+" - USD ",1),n("dd",Te,g(i.formatPrice(a.price)),1)]),Ee,n("button",{class:"flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none",onClick:B(x=>i.remove(a),["stop"])},Me,8,Ce)],10,_e))),128))]),Ae,v(l,{graph:r.graph,"selected-ticker":r.selectedTicker,onRemoveGraph:t[4]||(t[4]=a=>r.selectedTicker=null),onUpdateMaxElements:i.updateMaxElements},null,8,["graph","selected-ticker","onUpdateMaxElements"])],64)):u("",!0)])])}var Ie=b(fe,[["render",Oe]]);L(Ie).mount("#app");
