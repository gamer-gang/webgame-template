var a;import{Application as i}from"../_snowpack/pkg/pixijs.js";import{Game as s}from"./Game.js";import{GameObject as r}from"./GameObject.js";import"./index.css.proxy.js";import{Player as n}from"./Player.js";const o=32;export const app=new i({width:16*o,height:9*o,autoDensity:!0,antialias:!1,resolution:4,backgroundColor:1118481});(a=document.querySelector("#game"))==null||a.appendChild(app.view);export const game=new s(app);class p extends r{}const t=new n,e=new p;t.width=32,t.height=32,e.x=100,e.y=100,e.width=32,e.height=32,game.addObject(t,e);
