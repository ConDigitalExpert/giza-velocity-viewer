import { normalizeGateway } from './origin.js';
const input=document.querySelector('#gateway'),form=document.querySelector('#gateway-form'),message=document.querySelector('#message'),frame=document.querySelector('#remote-viewer'),empty=document.querySelector('#empty'),state=document.querySelector('#viewer-state'),openTab=document.querySelector('#new-tab'),full=document.querySelector('#fullscreen'),viewer=document.querySelector('.viewer'),settings=document.querySelector('#settings'),settingsClose=document.querySelector('#settings-close'),setupTitle=document.querySelector('#setup-title');
const key='giza-private-gateway-origin-v1';let active=null;
function note(text,error=false){message.textContent=text;message.classList.toggle('error',error)}
function settingsOpen(open){document.body.classList.toggle('settings-open',open);settings.setAttribute('aria-expanded',String(open));if(open)input.focus();}
function connect(value){
 let origin;try{origin=normalizeGateway(value)}catch(error){note(error.message,true);return false}
 active=origin;input.value=origin;try{localStorage.setItem(key,origin)}catch{}
 frame.src=origin+'/';frame.hidden=false;empty.hidden=true;full.disabled=false;openTab.disabled=false;document.body.classList.add('configured');settings.hidden=false;setupTitle.textContent='Connection settings';settingsOpen(false);
 state.textContent='Opening private viewer';note('The gateway may request sign-in. If the embedded view is blocked, use Open in new tab.');return true;
}
form.addEventListener('submit',event=>{event.preventDefault();connect(input.value)});
frame.addEventListener('load',()=>{if(active)state.textContent='Viewer requested · check its video status'});
openTab.addEventListener('click',()=>{if(active)window.open(active+'/','_blank','noopener,noreferrer')});
settings.addEventListener('click',async()=>{if(document.fullscreenElement){try{await document.exitFullscreen()}catch{note('Exit full screen to change connection settings.',true);return}}settingsOpen(true)});
settingsClose.addEventListener('click',()=>{settingsOpen(false);settings.focus()});
document.querySelector('#forget').addEventListener('click',()=>{try{localStorage.removeItem(key)}catch{}active=null;input.value='';frame.removeAttribute('src');frame.hidden=true;empty.hidden=false;full.disabled=true;openTab.disabled=true;settingsOpen(false);document.body.classList.remove('configured');settings.hidden=true;setupTitle.textContent='Connect your viewer';state.textContent='Not connected';note('The saved gateway address was removed from this browser.');input.focus()});
full.addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await viewer.requestFullscreen()}catch{state.textContent='Full screen unavailable · use Open in new tab';note('Full screen is unavailable here. Use Open in new tab if needed.',true)}});
document.addEventListener('fullscreenchange',()=>{full.textContent=document.fullscreenElement?'Exit full screen':'Full screen'});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.body.classList.contains('settings-open')){settingsOpen(false);settings.focus()}});
// A one-time handoff is explicit in the link. Remove the complete fragment even
// when invalid, so accidental credentials are not retained in the address bar.
const fragment=new URLSearchParams(window.location.hash.slice(1));
if(fragment.has('gateway')){
 try{window.history.replaceState(null,'',window.location.pathname+window.location.search)}catch{}
 const gateways=fragment.getAll('gateway');
 if(gateways.length!==1||[...fragment.keys()].some(name=>name!=='gateway'))note('Invalid gateway handoff. Use one HTTPS origin without credentials.',true);
 else connect(gateways[0]);
}else{
 try{const saved=localStorage.getItem(key);if(saved)connect(saved)}catch{}
}
