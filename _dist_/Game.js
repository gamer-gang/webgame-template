var d=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)};var r=(i,e,t)=>(d(i,e,"access private method"),t);var s,o;import{GameObject as h}from"./GameObject.js";import{KeyHandler as p}from"./KeyHandler.js";export class Game{constructor(e){s.add(this);this.app=e,e.ticker.add(t=>this.update(t)),this.keyhandler=new p(this.app.view),r(this,s,o).call(this)}update(e){this.app.stage.children.forEach(t=>{h.isGameObject(t)&&t.update(e)})}addObject(...e){this.app.stage.addChild(...e)}}s=new WeakSet,o=function(){const e=this.app.renderer.width/this.app.renderer.height;window.addEventListener("resize",()=>{const{innerWidth:t,innerHeight:a}=window,n=t/a>=e?[a*e,a]:[t,t/e];this.app.view.style.width=`${n[0]}px`,this.app.view.style.height=`${n[1]}px`}),window.dispatchEvent(new Event("resize"))};
