import{Vector as t}from"./Vector.js";export class KeyHandler{constructor(s){this.keys={},this.mouse={m1:!1,m2:!1,pos:new t(0,0)},document.addEventListener("keydown",e=>{this.keys[e.key.toLowerCase()]=!0}),document.addEventListener("keyup",e=>{this.keys[e.key.toLowerCase()]=!1}),document.addEventListener("mousedown",()=>{this.mouse.m1=!0}),document.addEventListener("mouseup",()=>{this.mouse.m1=!1}),s.addEventListener("mousemove",e=>{this.mouse.pos.x=e.offsetX/s.clientWidth*16*32,this.mouse.pos.y=e.offsetY/s.clientHeight*9*32})}get gamepad(){return{up:this.keys.w,down:this.keys.s,left:this.keys.a,right:this.keys.d,mouse:this.mouse}}}
