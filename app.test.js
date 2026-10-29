import test from 'node:test';import assert from 'node:assert/strict';
class FakeElement {
 constructor(){this.events={};this.hidden=false;this.disabled=false;this.value='';this.textContent='';this.attributes={};this.classList={toggle(){}}}
 addEventListener(name,fn){this.events[name]=fn}
 removeAttribute(name){delete this[name];delete this.attributes[name]}
 dispatch(name){return this.events[name]?.({preventDefault(){}})}
}
const selectors=['#gateway','#gateway-form','#message','#remote-viewer','#empty','#viewer-state','#new-tab','#fullscreen','.viewer','#forget'];const elements=Object.fromEntries(selectors.map(x=>[x,new FakeElement()]));const stored=new Map();
globalThis.document={querySelector:s=>elements[s],addEventListener(){},fullscreenElement:null};globalThis.localStorage={getItem:k=>stored.get(k)||null,setItem:(k,v)=>stored.set(k,v),removeItem:k=>stored.delete(k)};globalThis.window={open(){throw Error('not invoked')}};
await import('./app.js');
test('invalid gateway is rejected without loading the viewer or saving input',()=>{elements['#gateway'].value='https://example.test/?token=secret';elements['#gateway-form'].dispatch('submit');assert.equal(elements['#remote-viewer'].src,undefined);assert.equal(stored.size,0);assert.match(elements['#message'].textContent,/credentials|query/i)});
test('clean origin loads private viewer and Forget clears local state',()=>{elements['#gateway'].value='https://viewer.example.test/';elements['#gateway-form'].dispatch('submit');assert.equal(elements['#remote-viewer'].src,'https://viewer.example.test/');assert.equal(stored.size,1);assert.equal(elements['#empty'].hidden,true);elements['#forget'].dispatch('click');assert.equal(stored.size,0);assert.equal(elements['#remote-viewer'].hidden,true);assert.equal(elements['#empty'].hidden,false)});
