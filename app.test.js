import test from 'node:test';import assert from 'node:assert/strict';
class FakeElement {
 constructor(){this.events={};this.hidden=false;this.disabled=false;this.value='';this.textContent='';this.attributes={};this.classList={toggle(){}}}
 addEventListener(name,fn){this.events[name]=fn}
 removeAttribute(name){delete this[name];delete this.attributes[name]}
 dispatch(name){return this.events[name]?.({preventDefault(){}})}
}
let version=0;
async function setup({hash='',saved=null}={}){
 const selectors=['#gateway','#gateway-form','#message','#remote-viewer','#empty','#viewer-state','#new-tab','#fullscreen','.viewer','#forget'];const elements=Object.fromEntries(selectors.map(x=>[x,new FakeElement()]));const stored=new Map();if(saved!==null)stored.set('giza-private-gateway-origin-v1',saved);
 let replaced=null;globalThis.document={querySelector:s=>elements[s],addEventListener(){},fullscreenElement:null};globalThis.localStorage={getItem:k=>stored.get(k)||null,setItem:(k,v)=>stored.set(k,v),removeItem:k=>stored.delete(k)};globalThis.window={location:{hash,pathname:'/giza-velocity-viewer/',search:''},history:{replaceState(_a,_b,url){replaced=url}},open(){throw Error('not invoked')}};
 await import(`./app.js?test=${++version}`);return {elements,stored,get replaced(){return replaced}};
}
test('invalid manual gateway is rejected without loading or storing',async()=>{const {elements,stored}=await setup();elements['#gateway'].value='https://example.test/?token=secret';elements['#gateway-form'].dispatch('submit');assert.equal(elements['#remote-viewer'].src,undefined);assert.equal(stored.size,0);assert.match(elements['#message'].textContent,/credentials|query/i)});
test('clean origin loads and Forget clears local state',async()=>{const {elements,stored}=await setup();elements['#gateway'].value='https://viewer.example.test/';elements['#gateway-form'].dispatch('submit');assert.equal(elements['#remote-viewer'].src,'https://viewer.example.test/');assert.equal(stored.size,1);assert.equal(elements['#empty'].hidden,true);elements['#forget'].dispatch('click');assert.equal(stored.size,0);assert.equal(elements['#remote-viewer'].hidden,true);assert.equal(elements['#empty'].hidden,false)});
test('a saved validated origin automatically opens on return',async()=>{const {elements}=await setup({saved:'https://viewer.example.test'});assert.equal(elements['#remote-viewer'].src,'https://viewer.example.test/');assert.equal(elements['#empty'].hidden,true)});
test('encoded handoff opens a clean origin and removes the fragment',async()=>{const {elements,stored,replaced}=await setup({hash:'#gateway=https%3A%2F%2Fviewer.example.test%3A9443'});assert.equal(elements['#remote-viewer'].src,'https://viewer.example.test:9443/');assert.equal(stored.get('giza-private-gateway-origin-v1'),'https://viewer.example.test:9443');assert.equal(replaced,'/giza-velocity-viewer/')});
test('invalid or duplicate handoff does not load, overwrite saved origin, or leave fragment',async()=>{for(const hash of ['#gateway=https%3A%2F%2Fviewer.example.test%2F%3Ftoken%3Dsecret','#gateway=https%3A%2F%2Fone.test&gateway=https%3A%2F%2Ftwo.test','#gateway=https%3A%2F%2Fone.test&token=secret']){const {elements,stored,replaced}=await setup({hash,saved:'https://saved.example.test'});assert.equal(elements['#remote-viewer'].src,undefined);assert.equal(stored.get('giza-private-gateway-origin-v1'),'https://saved.example.test');assert.equal(replaced,'/giza-velocity-viewer/');assert.ok(elements['#message'].textContent)}});
