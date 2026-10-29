/** Validate same-site versioned assets and scene coordinates before loading. */
export function validateManifest(data, manifestURL){
 if(!data || data.schema!==1)throw Error('Unsupported snapshot manifest.');
 if(data.ready!==true)return {ready:false,message:String(data.message||'The snapshot is not available yet.')};
 if(typeof data.version!=='string'||!data.version.trim()||!Array.isArray(data.chunks)||!data.chunks.some(x=>x.required===true))throw Error('The snapshot manifest is incomplete.');
 const base=new URL('.',manifestURL);
 const chunks=data.chunks.map(x=>{
  if(!x||typeof x.id!=='string'||typeof x.url!=='string'||!x.url.endsWith('.glb')||!Number.isFinite(x.bytes)||x.bytes<=0||typeof x.sha256!=='string'||!/^[0-9a-f]{64}$/.test(x.sha256))throw Error('Invalid snapshot asset.');
  if(x.group!==undefined&&(typeof x.group!=='string'||!x.group.trim()))throw Error('Invalid snapshot group.');
  const path=new URL(x.url,base);
  if(path.origin!==base.origin||!path.pathname.startsWith(base.pathname)||path.search||path.hash)throw Error('Snapshot assets must be hosted with this viewer.');
  return {...x,absoluteURL:path.href};
 });
 if(new Set(chunks.map(x=>x.id)).size!==chunks.length)throw Error('Duplicate snapshot assets.');
 const bookmarks=(data.bookmarks||[]).map(b=>{
  if(typeof b.label!=='string'||![b.position,b.target].every(v=>Array.isArray(v)&&v.length===3&&v.every(Number.isFinite)))throw Error('Invalid saved viewpoint.');
  if(b.fov_degrees!==undefined&&(!Number.isFinite(b.fov_degrees)||b.fov_degrees<=1||b.fov_degrees>=179))throw Error('Invalid viewpoint field of view.');
  return b;
 });
 return {...data,chunks,bookmarks};
}
export function safeDelta(seconds){return Number.isFinite(seconds)?Math.max(0,Math.min(.05,seconds)):0}
export function pixelRatio(device,quality){const cap={low:1,balanced:1.25,high:1.5}[quality]||1.25;return Math.max(.5,Math.min(device||1,cap))}
