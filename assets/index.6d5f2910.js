import{o as a,c,a as i,w as p,v as g,b as y,F as m,r as f,d,t as h,n as v,e as b,f as _,g as x,h as k}from"./vendor.ccbc6ca9.js";const w=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}};w();var C=(o,e)=>{const n=o.__vccOpts||o;for(const[l,t]of e)n[l]=t;return n};const S={data(){return{oftenTickers:[],autocompleteTicker:[],ticker:null,sel:null,tickers:[],graph:[],filter:"",page:1,hasNextPage:!0}},computed:{autocompleteTicker(){var o;return(o=this.oftenTickers)==null?void 0:o.filter(e=>{var n;return e.includes((n=this.ticker)==null?void 0:n.toUpperCase())}).slice(0,4)}},async created(){var l,t;const o=localStorage.getItem("cryptonomicon");o&&(this.tickers=JSON.parse(o),(l=this.tickers)==null||l.forEach(s=>{this.updateTicker(s)}));const n=await(await fetch("https://min-api.cryptocompare.com/data/all/coinlist?summary=true")).json();this.oftenTickers=(t=Object.values(n.Data))==null?void 0:t.map(s=>s.Symbol)},watch:{filter(){this.page=1}},methods:{add(){if(this.isOld())return;if(!this.ticker){this.ticker="";return}const o={name:this.ticker.toUpperCase(),price:"-",intervalId:null};this.updateTicker(o),this.tickers.push(o),localStorage.setItem("cryptonomicon",JSON.stringify(this.tickers)),this.ticker=""},updateTicker(o){o.intervalId=setInterval(async()=>{var t;const e=await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${o.name}&tsyms=USD&api_key=d0690cd38c2b128758385513f18ad8ee5045266d889b6aebc6430bdcff48c177`);if(e.status!==200)return;const l=(await e.json()).USD;this.tickers.find(s=>s.name===o.name).price=l>1?l.toFixed(2):l.toPrecision(2),((t=this.sel)==null?void 0:t.name)===o.name&&this.graph.push(l)},2e3)},remove(o){this.tickers=this.tickers.filter(e=>(e===o&&(clearInterval(e.intervalId),e.intervalId=null,this.sel=null),e!==o)),localStorage.setItem("cryptonomicon",JSON.stringify(this.tickers))},filteredTickers(){var l;const o=6*(this.page-1),e=6*this.page,n=(l=this.tickers)==null?void 0:l.filter(t=>{var s,r;return(r=t.name)==null?void 0:r.includes((s=this.filter)==null?void 0:s.toUpperCase())});return this.hasNextPage=n.length>e,n==null?void 0:n.slice(o,e)},isOld(){var o;return(o=this.tickers)==null?void 0:o.filter(e=>{var n,l;return((n=e.name)==null?void 0:n.toUpperCase())===((l=this.ticker)==null?void 0:l.toUpperCase())}).length},normalizedGraph(){const o=Math.max(...this.graph);let e=Math.min(...this.graph);return o===e&&(e=0),this.graph.map(n=>5+(n-e)*95/(o-e))},select(o){this.sel=o,this.graph=[]}}},O={class:"container mx-auto flex flex-col items-center bg-gray-100 p-4"},z={class:"container"},N={class:"flex"},T={class:"max-w-xs"},U=i("label",{for:"wallet",class:"block text-sm font-medium text-gray-700"},"\u0422\u0438\u043A\u0435\u0440",-1),V={class:"mt-1 relative rounded-md shadow-md"},I={key:0,class:"flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap"},M=["onClick"],D={key:1},L=i("div",{class:"text-sm text-red-600"},"\u0422\u0430\u043A\u043E\u0439 \u0442\u0438\u043A\u0435\u0440 \u0443\u0436\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D",-1),B=[L],P=i("svg",{class:"-ml-0.5 mr-2 h-6 w-6",xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 24 24",fill:"#ffffff"},[i("path",{d:"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"})],-1),j=x(" \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C "),A=[P,j],E=i("label",{for:"filter",class:"block text-sm font-medium text-gray-700"},"\u0424\u0438\u043B\u044C\u0442\u0440",-1),F=i("hr",{class:"w-full border-t border-gray-600 my-4"},null,-1),K={class:"mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3"},G=["onClick"],H={class:"px-4 py-5 sm:p-6 text-center"},J={class:"text-sm font-medium text-gray-500 truncate"},q={class:"mt-1 text-3xl font-semibold text-gray-900"},Q=i("div",{class:"w-full border-t border-gray-200"},null,-1),R=["onClick"],W=i("svg",{class:"h-5 w-5",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"#718096","aria-hidden":"true"},[i("path",{"fill-rule":"evenodd",d:"M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z","clip-rule":"evenodd"})],-1),X=x(" \u0423\u0434\u0430\u043B\u0438\u0442\u044C "),Y=[W,X],Z=i("hr",{class:"w-full border-t border-gray-600 my-4"},null,-1),$={key:0,class:"relative"},ee={class:"text-lg leading-6 font-medium text-gray-900 my-8"},te={class:"flex items-end border-gray-600 border-b border-l h-64"},se=i("svg",{xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",x:"0",y:"0",viewBox:"0 0 511.76 511.76","xml:space":"preserve"},[i("g",null,[i("path",{d:"M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048    c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z     M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165    c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0    c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z",fill:"#718096","data-original":"#000000"})])],-1),re=[se];function oe(o,e,n,l,t,s){return a(),c("div",O,[i("div",z,[i("section",null,[i("div",N,[i("div",T,[U,i("div",V,[p(i("input",{id:"wallet","onUpdate:modelValue":e[0]||(e[0]=r=>t.ticker=r),type:"text",name:"wallet",class:"block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md",placeholder:"e.g. DOGE",onKeydown:e[1]||(e[1]=y((...r)=>s.add&&s.add(...r),["enter"]))},null,544),[[g,t.ticker]])]),t.ticker&&s.autocompleteTicker.length?(a(),c("div",I,[(a(!0),c(m,null,f(s.autocompleteTicker,r=>(a(),c("span",{key:r,class:"inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer",onClick:u=>{t.ticker=r,s.add()}},h(r),9,M))),128))])):d("",!0),s.isOld()?(a(),c("div",D,B)):d("",!0)])]),i("button",{type:"button",class:"my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",onClick:e[2]||(e[2]=(...r)=>s.add&&s.add(...r))},A)]),t.tickers.length?(a(),c(m,{key:0},[i("div",null,[t.page>1?(a(),c("button",{key:0,class:"my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",onClick:e[3]||(e[3]=r=>t.page--)}," back ")):d("",!0),t.hasNextPage?(a(),c("button",{key:1,class:"my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",onClick:e[4]||(e[4]=r=>t.page++)}," next ")):d("",!0),E,p(i("input",{id:"filter","onUpdate:modelValue":e[5]||(e[5]=r=>t.filter=r),type:"text",class:"block pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md",onKeydown:e[6]||(e[6]=y((...r)=>s.add&&s.add(...r),["enter"]))},null,544),[[g,t.filter]])]),F,i("dl",K,[(a(!0),c(m,null,f(s.filteredTickers(),r=>(a(),c("div",{key:r,class:v([{"border-4":t.sel===r},"bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"]),onClick:u=>s.select(r)},[i("div",H,[i("dt",J,h(r.name)+" - USD ",1),i("dd",q,h(r.price),1)]),Q,i("button",{class:"flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none",onClick:b(u=>s.remove(r),["stop"])},Y,8,R)],10,G))),128))]),Z,t.sel?(a(),c("section",$,[i("h3",ee,h(t.sel.name)+" - USD ",1),i("div",te,[(a(!0),c(m,null,f(s.normalizedGraph(),(r,u)=>(a(),c("div",{key:u,style:_({height:`${r}%`}),class:"bg-purple-800 border w-10"},null,4))),128))]),i("button",{type:"button",class:"absolute top-0 right-0",onClick:e[7]||(e[7]=r=>t.sel=null)},re)])):d("",!0)],64)):d("",!0)])])}var ie=C(S,[["render",oe]]);k(ie).mount("#app");
