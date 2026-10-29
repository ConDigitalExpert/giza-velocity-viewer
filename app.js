import { normalizeGateway } from './origin.js';
const input=document.querySelector('#gateway'),form=document.querySelector('#gateway-form'),message=document.querySelector('#message'),frame=document.querySelector('#remote-viewer'),empty=document.querySelector('#empty'),state=document.querySelector('#viewer-state'),openTab=document.querySelector('#new-tab'),full=document.querySelector('#fullscreen'),viewer=document.querySelector('.viewer');
const key='giza-private-gateway-origin-v1';let active=null;
function note(text,error=false){message.textContent=text;message.classList.toggle('error',error)}
try{const saved=localStorage.getItem(key);if(saved)input.value=normalizeGateway(saved)}catch{}
form.addEventListener('submit',event=>{event.preventDefault();let origin;try{origin=normalizeGateway(input.value)}catch(error){note(error.message,true);return}active=origin;input.value=origin;try{localStorage.setItem(key,origin)}catch{}frame.src=origin+'/';frame.hidden=false;empty.hidden=true;full.disabled=false;openTab.disabled=false;state.textContent='Opening private viewer';note('The gateway may request sign-in. If the embedded view is blocked, use Open in new tab.');});
frame.addEventListener('load',()=>{if(active)state.textContent='Viewer requested · check its video status'});
openTab.addEventListener('click',()=>{if(active)window.open(active+'/','_blank','noopener,noreferrer')});
document.querySelector('#forget').addEventListener('click',()=>{try{localStorage.removeItem(key)}catch{}active=null;input.value='';frame.removeAttribute('src');frame.hidden=true;empty.hidden=false;full.disabled=true;openTab.disabled=true;state.textContent='Not connected';note('The saved gateway address was removed from this browser.')});
full.addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await viewer.requestFullscreen()}catch{note('Full screen is unavailable here. Use Open in new tab if needed.',true)}});
document.addEventListener('fullscreenchange',()=>{full.textContent=document.fullscreenElement?'Exit full screen':'Full screen'});
