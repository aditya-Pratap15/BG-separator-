var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},c=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},l=(n,r,o)=>(o=n==null?{}:e(i(n)),c(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n)),u=(e=>typeof require<`u`?require:typeof Proxy<`u`?new Proxy(e,{get:(e,t)=>(typeof require<`u`?require:e)[t]}):e)(function(e){if(typeof require<`u`)return require.apply(this,arguments);throw Error('Calling `require` for "'+e+"\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.")});(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var d=l(o(((e,t)=>{(function(n){typeof e==`object`&&t!==void 0?t.exports=n():typeof define==`function`&&define.amd?define([],n):(typeof window<`u`?window:typeof global<`u`?global:typeof self<`u`?self:this).JSZip=n()})(function(){return function e(t,n,r){function i(o,s){if(!n[o]){if(!t[o]){var c=typeof u==`function`&&u;if(!s&&c)return c(o,!0);if(a)return a(o,!0);var l=Error(`Cannot find module '`+o+`'`);throw l.code=`MODULE_NOT_FOUND`,l}var d=n[o]={exports:{}};t[o][0].call(d.exports,function(e){var n=t[o][1][e];return i(n||e)},d,d.exports,e,t,n,r)}return n[o].exports}for(var a=typeof u==`function`&&u,o=0;o<r.length;o++)i(r[o]);return i}({1:[function(e,t,n){var r=e(`./utils`),i=e(`./support`),a=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`;n.encode=function(e){for(var t,n,i,o,s,c,l,u=[],d=0,f=e.length,p=f,m=r.getTypeOf(e)!==`string`;d<e.length;)p=f-d,i=m?(t=e[d++],n=d<f?e[d++]:0,d<f?e[d++]:0):(t=e.charCodeAt(d++),n=d<f?e.charCodeAt(d++):0,d<f?e.charCodeAt(d++):0),o=t>>2,s=(3&t)<<4|n>>4,c=1<p?(15&n)<<2|i>>6:64,l=2<p?63&i:64,u.push(a.charAt(o)+a.charAt(s)+a.charAt(c)+a.charAt(l));return u.join(``)},n.decode=function(e){var t,n,r,o,s,c,l=0,u=0,d=`data:`;if(e.substr(0,d.length)===d)throw Error(`Invalid base64 input, it looks like a data url.`);var f,p=3*(e=e.replace(/[^A-Za-z0-9+/=]/g,``)).length/4;if(e.charAt(e.length-1)===a.charAt(64)&&p--,e.charAt(e.length-2)===a.charAt(64)&&p--,p%1!=0)throw Error(`Invalid base64 input, bad content length.`);for(f=i.uint8array?new Uint8Array(0|p):Array(0|p);l<e.length;)t=a.indexOf(e.charAt(l++))<<2|(o=a.indexOf(e.charAt(l++)))>>4,n=(15&o)<<4|(s=a.indexOf(e.charAt(l++)))>>2,r=(3&s)<<6|(c=a.indexOf(e.charAt(l++))),f[u++]=t,s!==64&&(f[u++]=n),c!==64&&(f[u++]=r);return f}},{"./support":30,"./utils":32}],2:[function(e,t,n){var r=e(`./external`),i=e(`./stream/DataWorker`),a=e(`./stream/Crc32Probe`),o=e(`./stream/DataLengthProbe`);function s(e,t,n,r,i){this.compressedSize=e,this.uncompressedSize=t,this.crc32=n,this.compression=r,this.compressedContent=i}s.prototype={getContentWorker:function(){var e=new i(r.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new o(`data_length`)),t=this;return e.on(`end`,function(){if(this.streamInfo.data_length!==t.uncompressedSize)throw Error(`Bug : uncompressed data size mismatch`)}),e},getCompressedWorker:function(){return new i(r.Promise.resolve(this.compressedContent)).withStreamInfo(`compressedSize`,this.compressedSize).withStreamInfo(`uncompressedSize`,this.uncompressedSize).withStreamInfo(`crc32`,this.crc32).withStreamInfo(`compression`,this.compression)}},s.createWorkerFrom=function(e,t,n){return e.pipe(new a).pipe(new o(`uncompressedSize`)).pipe(t.compressWorker(n)).pipe(new o(`compressedSize`)).withStreamInfo(`compression`,t)},t.exports=s},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,t,n){var r=e(`./stream/GenericWorker`);n.STORE={magic:`\0\0`,compressWorker:function(){return new r(`STORE compression`)},uncompressWorker:function(){return new r(`STORE decompression`)}},n.DEFLATE=e(`./flate`)},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,t,n){var r=e(`./utils`),i=function(){for(var e,t=[],n=0;n<256;n++){e=n;for(var r=0;r<8;r++)e=1&e?3988292384^e>>>1:e>>>1;t[n]=e}return t}();t.exports=function(e,t){return e!==void 0&&e.length?r.getTypeOf(e)===`string`?function(e,t,n,r){var a=i,o=r+n;e^=-1;for(var s=r;s<o;s++)e=e>>>8^a[255&(e^t.charCodeAt(s))];return-1^e}(0|t,e,e.length,0):function(e,t,n,r){var a=i,o=r+n;e^=-1;for(var s=r;s<o;s++)e=e>>>8^a[255&(e^t[s])];return-1^e}(0|t,e,e.length,0):0}},{"./utils":32}],5:[function(e,t,n){n.base64=!1,n.binary=!1,n.dir=!1,n.createFolders=!0,n.date=null,n.compression=null,n.compressionOptions=null,n.comment=null,n.unixPermissions=null,n.dosPermissions=null},{}],6:[function(e,t,n){var r=null;r=typeof Promise<`u`?Promise:e(`lie`),t.exports={Promise:r}},{lie:37}],7:[function(e,t,n){var r=typeof Uint8Array<`u`&&typeof Uint16Array<`u`&&typeof Uint32Array<`u`,i=e(`pako`),a=e(`./utils`),o=e(`./stream/GenericWorker`),s=r?`uint8array`:`array`;function c(e,t){o.call(this,`FlateWorker/`+e),this._pako=null,this._pakoAction=e,this._pakoOptions=t,this.meta={}}n.magic=`\b\0`,a.inherits(c,o),c.prototype.processChunk=function(e){this.meta=e.meta,this._pako===null&&this._createPako(),this._pako.push(a.transformTo(s,e.data),!1)},c.prototype.flush=function(){o.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},c.prototype.cleanUp=function(){o.prototype.cleanUp.call(this),this._pako=null},c.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var e=this;this._pako.onData=function(t){e.push({data:t,meta:e.meta})}},n.compressWorker=function(e){return new c(`Deflate`,e)},n.uncompressWorker=function(){return new c(`Inflate`,{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,t,n){function r(e,t){var n,r=``;for(n=0;n<t;n++)r+=String.fromCharCode(255&e),e>>>=8;return r}function i(e,t,n,i,o,u){var d,f,p=e.file,m=e.compression,h=u!==s.utf8encode,g=a.transformTo(`string`,u(p.name)),_=a.transformTo(`string`,s.utf8encode(p.name)),v=p.comment,y=a.transformTo(`string`,u(v)),b=a.transformTo(`string`,s.utf8encode(v)),x=_.length!==p.name.length,S=b.length!==v.length,C=``,w=``,T=``,E=p.dir,D=p.date,O={crc32:0,compressedSize:0,uncompressedSize:0};t&&!n||(O.crc32=e.crc32,O.compressedSize=e.compressedSize,O.uncompressedSize=e.uncompressedSize);var k=0;t&&(k|=8),h||!x&&!S||(k|=2048);var A=0,j=0;E&&(A|=16),o===`UNIX`?(j=798,A|=function(e,t){var n=e;return e||(n=t?16893:33204),(65535&n)<<16}(p.unixPermissions,E)):(j=20,A|=function(e){return 63&(e||0)}(p.dosPermissions)),d=D.getUTCHours(),d<<=6,d|=D.getUTCMinutes(),d<<=5,d|=D.getUTCSeconds()/2,f=D.getUTCFullYear()-1980,f<<=4,f|=D.getUTCMonth()+1,f<<=5,f|=D.getUTCDate(),x&&(w=r(1,1)+r(c(g),4)+_,C+=`up`+r(w.length,2)+w),S&&(T=r(1,1)+r(c(y),4)+b,C+=`uc`+r(T.length,2)+T);var M=``;return M+=`
\0`,M+=r(k,2),M+=m.magic,M+=r(d,2),M+=r(f,2),M+=r(O.crc32,4),M+=r(O.compressedSize,4),M+=r(O.uncompressedSize,4),M+=r(g.length,2),M+=r(C.length,2),{fileRecord:l.LOCAL_FILE_HEADER+M+g+C,dirRecord:l.CENTRAL_FILE_HEADER+r(j,2)+M+r(y.length,2)+`\0\0\0\0`+r(A,4)+r(i,4)+g+C+y}}var a=e(`../utils`),o=e(`../stream/GenericWorker`),s=e(`../utf8`),c=e(`../crc32`),l=e(`../signature`);function u(e,t,n,r){o.call(this,`ZipFileWorker`),this.bytesWritten=0,this.zipComment=t,this.zipPlatform=n,this.encodeFileName=r,this.streamFiles=e,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}a.inherits(u,o),u.prototype.push=function(e){var t=e.meta.percent||0,n=this.entriesCount,r=this._sources.length;this.accumulate?this.contentBuffer.push(e):(this.bytesWritten+=e.data.length,o.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:n?(t+100*(n-r-1))/n:100}}))},u.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten,this.currentFile=e.file.name;var t=this.streamFiles&&!e.file.dir;if(t){var n=i(e,t,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:n.fileRecord,meta:{percent:0}})}else this.accumulate=!0},u.prototype.closedSource=function(e){this.accumulate=!1;var t=this.streamFiles&&!e.file.dir,n=i(e,t,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(n.dirRecord),t)this.push({data:function(e){return l.DATA_DESCRIPTOR+r(e.crc32,4)+r(e.compressedSize,4)+r(e.uncompressedSize,4)}(e),meta:{percent:100}});else for(this.push({data:n.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},u.prototype.flush=function(){for(var e=this.bytesWritten,t=0;t<this.dirRecords.length;t++)this.push({data:this.dirRecords[t],meta:{percent:100}});var n=this.bytesWritten-e,i=function(e,t,n,i,o){var s=a.transformTo(`string`,o(i));return l.CENTRAL_DIRECTORY_END+`\0\0\0\0`+r(e,2)+r(e,2)+r(t,4)+r(n,4)+r(s.length,2)+s}(this.dirRecords.length,n,e,this.zipComment,this.encodeFileName);this.push({data:i,meta:{percent:100}})},u.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},u.prototype.registerPrevious=function(e){this._sources.push(e);var t=this;return e.on(`data`,function(e){t.processChunk(e)}),e.on(`end`,function(){t.closedSource(t.previous.streamInfo),t._sources.length?t.prepareNextSource():t.end()}),e.on(`error`,function(e){t.error(e)}),this},u.prototype.resume=function(){return!!o.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},u.prototype.error=function(e){var t=this._sources;if(!o.prototype.error.call(this,e))return!1;for(var n=0;n<t.length;n++)try{t[n].error(e)}catch{}return!0},u.prototype.lock=function(){o.prototype.lock.call(this);for(var e=this._sources,t=0;t<e.length;t++)e[t].lock()},t.exports=u},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,t,n){var r=e(`../compressions`),i=e(`./ZipFileWorker`);n.generateWorker=function(e,t,n){var a=new i(t.streamFiles,n,t.platform,t.encodeFileName),o=0;try{e.forEach(function(e,n){o++;var i=function(e,t){var n=e||t,i=r[n];if(!i)throw Error(n+` is not a valid compression method !`);return i}(n.options.compression,t.compression),s=n.options.compressionOptions||t.compressionOptions||{},c=n.dir,l=n.date;n._compressWorker(i,s).withStreamInfo(`file`,{name:e,dir:c,date:l,comment:n.comment||``,unixPermissions:n.unixPermissions,dosPermissions:n.dosPermissions}).pipe(a)}),a.entriesCount=o}catch(e){a.error(e)}return a}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,t,n){function r(){if(!(this instanceof r))return new r;if(arguments.length)throw Error(`The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.`);this.files=Object.create(null),this.comment=null,this.root=``,this.clone=function(){var e=new r;for(var t in this)typeof this[t]!=`function`&&(e[t]=this[t]);return e}}(r.prototype=e(`./object`)).loadAsync=e(`./load`),r.support=e(`./support`),r.defaults=e(`./defaults`),r.version=`3.10.2`,r.loadAsync=function(e,t){return new r().loadAsync(e,t)},r.external=e(`./external`),t.exports=r},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,t,n){var r=e(`./utils`),i=e(`./external`),a=e(`./utf8`),o=e(`./zipEntries`),s=e(`./stream/Crc32Probe`),c=e(`./nodejsUtils`);function l(e){return new i.Promise(function(t,n){var r=e.decompressed.getContentWorker().pipe(new s);r.on(`error`,function(e){n(e)}).on(`end`,function(){r.streamInfo.crc32===e.decompressed.crc32?t():n(Error(`Corrupted zip : CRC32 mismatch`))}).resume()})}t.exports=function(e,t){var n=this;return t=r.extend(t||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:a.utf8decode}),c.isNode&&c.isStream(e)?i.Promise.reject(Error(`JSZip can't accept a stream when loading a zip file.`)):r.prepareContent(`the loaded zip file`,e,!0,t.optimizedBinaryString,t.base64).then(function(e){var n=new o(t);return n.load(e),n}).then(function(e){var n=[i.Promise.resolve(e)],r=e.files;if(t.checkCRC32)for(var a=0;a<r.length;a++)n.push(l(r[a]));return i.Promise.all(n)}).then(function(e){for(var i=e.shift(),a=i.files,o=0;o<a.length;o++){var s=a[o],c=s.fileNameStr,l=r.resolve(s.fileNameStr);n.file(l,s.decompressed,{binary:!0,optimizedBinaryString:!0,date:s.date,dir:s.dir,comment:s.fileCommentStr.length?s.fileCommentStr:null,unixPermissions:s.unixPermissions,dosPermissions:s.dosPermissions,createFolders:t.createFolders}),s.dir||(n.file(l).unsafeOriginalName=c)}return i.zipComment.length&&(n.comment=i.zipComment),n})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,t,n){var r=e(`../utils`),i=e(`../stream/GenericWorker`);function a(e,t){i.call(this,`Nodejs stream input adapter for `+e),this._upstreamEnded=!1,this._bindStream(t)}r.inherits(a,i),a.prototype._bindStream=function(e){var t=this;(this._stream=e).pause(),e.on(`data`,function(e){t.push({data:e,meta:{percent:0}})}).on(`error`,function(e){t.isPaused?this.generatedError=e:t.error(e)}).on(`end`,function(){t.isPaused?t._upstreamEnded=!0:t.end()})},a.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},a.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=a},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,t,n){var r=e(`readable-stream`).Readable;function i(e,t,n){r.call(this,t),this._helper=e;var i=this;e.on(`data`,function(e,t){i.push(e)||i._helper.pause(),n&&n(t)}).on(`error`,function(e){i.emit(`error`,e)}).on(`end`,function(){i.push(null)})}e(`../utils`).inherits(i,r),i.prototype._read=function(){this._helper.resume()},t.exports=i},{"../utils":32,"readable-stream":16}],14:[function(e,t,n){t.exports={isNode:typeof Buffer<`u`,newBufferFrom:function(e,t){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(e,t);if(typeof e==`number`)throw Error(`The "data" argument must not be a number`);return new Buffer(e,t)},allocBuffer:function(e){if(Buffer.alloc)return Buffer.alloc(e);var t=new Buffer(e);return t.fill(0),t},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&typeof e.on==`function`&&typeof e.pause==`function`&&typeof e.resume==`function`}}},{}],15:[function(e,t,n){function r(e,t,n){var r,i=a.getTypeOf(t),s=a.extend(n||{},c);s.date=s.date||new Date,s.compression!==null&&(s.compression=s.compression.toUpperCase()),typeof s.unixPermissions==`string`&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(e=h(e)),s.createFolders&&(r=m(e))&&g.call(this,r,!0);var d=i===`string`&&!1===s.binary&&!1===s.base64;n&&n.binary!==void 0||(s.binary=!d),(t instanceof l&&t.uncompressedSize===0||s.dir||!t||t.length===0)&&(s.base64=!1,s.binary=!0,t=``,s.compression=`STORE`,i=`string`);var _=null;_=t instanceof l||t instanceof o?t:f.isNode&&f.isStream(t)?new p(e,t):a.prepareContent(e,t,s.binary,s.optimizedBinaryString,s.base64);var v=new u(e,_,s);this.files[e]=v}var i=e(`./utf8`),a=e(`./utils`),o=e(`./stream/GenericWorker`),s=e(`./stream/StreamHelper`),c=e(`./defaults`),l=e(`./compressedObject`),u=e(`./zipObject`),d=e(`./generate`),f=e(`./nodejsUtils`),p=e(`./nodejs/NodejsStreamInputAdapter`),m=function(e){e.slice(-1)===`/`&&(e=e.substring(0,e.length-1));var t=e.lastIndexOf(`/`);return 0<t?e.substring(0,t):``},h=function(e){return e.slice(-1)!==`/`&&(e+=`/`),e},g=function(e,t){return t=t===void 0?c.createFolders:t,e=h(e),this.files[e]||r.call(this,e,null,{dir:!0,createFolders:t}),this.files[e]};function _(e){return Object.prototype.toString.call(e)===`[object RegExp]`}t.exports={load:function(){throw Error(`This method has been removed in JSZip 3.0, please check the upgrade guide.`)},forEach:function(e){var t,n,r;for(t in this.files)r=this.files[t],(n=t.slice(this.root.length,t.length))&&t.slice(0,this.root.length)===this.root&&e(n,r)},filter:function(e){var t=[];return this.forEach(function(n,r){e(n,r)&&t.push(r)}),t},file:function(e,t,n){if(arguments.length!==1)return e=this.root+e,r.call(this,e,t,n),this;if(_(e)){var i=e;return this.filter(function(e,t){return!t.dir&&i.test(e)})}var a=this.files[this.root+e];return a&&!a.dir?a:null},folder:function(e){if(!e)return this;if(_(e))return this.filter(function(t,n){return n.dir&&e.test(t)});var t=this.root+e,n=g.call(this,t),r=this.clone();return r.root=n.name,r},remove:function(e){e=this.root+e;var t=this.files[e];if(t||=(e.slice(-1)!==`/`&&(e+=`/`),this.files[e]),t&&!t.dir)delete this.files[e];else for(var n=this.filter(function(t,n){return n.name.slice(0,e.length)===e}),r=0;r<n.length;r++)delete this.files[n[r].name];return this},generate:function(){throw Error(`This method has been removed in JSZip 3.0, please check the upgrade guide.`)},generateInternalStream:function(e){var t,n={};try{if((n=a.extend(e||{},{streamFiles:!1,compression:`STORE`,compressionOptions:null,type:``,platform:`DOS`,comment:null,mimeType:`application/zip`,encodeFileName:i.utf8encode})).type=n.type.toLowerCase(),n.compression=n.compression.toUpperCase(),n.type===`binarystring`&&(n.type=`string`),!n.type)throw Error(`No output type specified.`);a.checkSupport(n.type),n.platform!==`darwin`&&n.platform!==`freebsd`&&n.platform!==`linux`&&n.platform!==`sunos`||(n.platform=`UNIX`),n.platform===`win32`&&(n.platform=`DOS`);var r=n.comment||this.comment||``;t=d.generateWorker(this,n,r)}catch(e){(t=new o(`error`)).error(e)}return new s(t,n.type||`string`,n.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){return(e||={}).type||(e.type=`nodebuffer`),this.generateInternalStream(e).toNodejsStream(t)}}},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,t,n){t.exports=e(`stream`)},{stream:void 0}],17:[function(e,t,n){var r=e(`./DataReader`);function i(e){r.call(this,e);for(var t=0;t<this.data.length;t++)e[t]=255&e[t]}e(`../utils`).inherits(i,r),i.prototype.byteAt=function(e){return this.data[this.zero+e]},i.prototype.lastIndexOfSignature=function(e){for(var t=e.charCodeAt(0),n=e.charCodeAt(1),r=e.charCodeAt(2),i=e.charCodeAt(3),a=this.length-4;0<=a;--a)if(this.data[a]===t&&this.data[a+1]===n&&this.data[a+2]===r&&this.data[a+3]===i)return a-this.zero;return-1},i.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),n=e.charCodeAt(1),r=e.charCodeAt(2),i=e.charCodeAt(3),a=this.readData(4);return t===a[0]&&n===a[1]&&r===a[2]&&i===a[3]},i.prototype.readData=function(e){if(this.checkOffset(e),e===0)return[];var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],18:[function(e,t,n){var r=e(`../utils`);function i(e){this.data=e,this.length=e.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(e){this.checkIndex(this.index+e)},checkIndex:function(e){if(this.length<this.zero+e||e<0)throw Error(`End of data reached (data length = `+this.length+`, asked index = `+e+`). Corrupted zip ?`)},setIndex:function(e){this.checkIndex(e),this.index=e},skip:function(e){this.setIndex(this.index+e)},byteAt:function(){},readInt:function(e){var t,n=0;for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)n=(n<<8)+this.byteAt(t);return this.index+=e,n},readString:function(e){return r.transformTo(`string`,this.readData(e))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC(1980+(e>>25&127),(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(31&e)<<1))}},t.exports=i},{"../utils":32}],19:[function(e,t,n){var r=e(`./Uint8ArrayReader`);function i(e){r.call(this,e)}e(`../utils`).inherits(i,r),i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,t,n){var r=e(`./DataReader`);function i(e){r.call(this,e)}e(`../utils`).inherits(i,r),i.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)},i.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero},i.prototype.readAndCheckSignature=function(e){return e===this.readData(4)},i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],21:[function(e,t,n){var r=e(`./ArrayReader`);function i(e){r.call(this,e)}e(`../utils`).inherits(i,r),i.prototype.readData=function(e){if(this.checkOffset(e),e===0)return new Uint8Array;var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./ArrayReader":17}],22:[function(e,t,n){var r=e(`../utils`),i=e(`../support`),a=e(`./ArrayReader`),o=e(`./StringReader`),s=e(`./NodeBufferReader`),c=e(`./Uint8ArrayReader`);t.exports=function(e){var t=r.getTypeOf(e);return r.checkSupport(t),t!==`string`||i.uint8array?t===`nodebuffer`?new s(e):i.uint8array?new c(r.transformTo(`uint8array`,e)):new a(r.transformTo(`array`,e)):new o(e)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,t,n){n.LOCAL_FILE_HEADER=`PK`,n.CENTRAL_FILE_HEADER=`PK`,n.CENTRAL_DIRECTORY_END=`PK`,n.ZIP64_CENTRAL_DIRECTORY_LOCATOR=`PK\x07`,n.ZIP64_CENTRAL_DIRECTORY_END=`PK`,n.DATA_DESCRIPTOR=`PK\x07\b`},{}],24:[function(e,t,n){var r=e(`./GenericWorker`),i=e(`../utils`);function a(e){r.call(this,`ConvertWorker to `+e),this.destType=e}i.inherits(a,r),a.prototype.processChunk=function(e){this.push({data:i.transformTo(this.destType,e.data),meta:e.meta})},t.exports=a},{"../utils":32,"./GenericWorker":28}],25:[function(e,t,n){var r=e(`./GenericWorker`),i=e(`../crc32`);function a(){r.call(this,`Crc32Probe`),this.withStreamInfo(`crc32`,0)}e(`../utils`).inherits(a,r),a.prototype.processChunk=function(e){this.streamInfo.crc32=i(e.data,this.streamInfo.crc32||0),this.push(e)},t.exports=a},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,t,n){var r=e(`../utils`),i=e(`./GenericWorker`);function a(e){i.call(this,`DataLengthProbe for `+e),this.propName=e,this.withStreamInfo(e,0)}r.inherits(a,i),a.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=t+e.data.length}i.prototype.processChunk.call(this,e)},t.exports=a},{"../utils":32,"./GenericWorker":28}],27:[function(e,t,n){var r=e(`../utils`),i=e(`./GenericWorker`);function a(e){i.call(this,`DataWorker`);var t=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type=``,this._tickScheduled=!1,e.then(function(e){t.dataIsReady=!0,t.data=e,t.max=e&&e.length||0,t.type=r.getTypeOf(e),t.isPaused||t._tickAndRepeat()},function(e){t.error(e)})}r.inherits(a,i),a.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},a.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,r.delay(this._tickAndRepeat,[],this)),!0)},a.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(r.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},a.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var e=null,t=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case`string`:e=this.data.substring(this.index,t);break;case`uint8array`:e=this.data.subarray(this.index,t);break;case`array`:case`nodebuffer`:e=this.data.slice(this.index,t)}return this.index=t,this.push({data:e,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=a},{"../utils":32,"./GenericWorker":28}],28:[function(e,t,n){function r(e){this.name=e||`default`,this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}r.prototype={push:function(e){this.emit(`data`,e)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit(`end`),this.cleanUp(),this.isFinished=!0}catch(e){this.emit(`error`,e)}return!0},error:function(e){return!this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit(`error`,e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(e,t){if(this._listeners[e])for(var n=0;n<this._listeners[e].length;n++)this._listeners[e][n].call(this,t)},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw Error(`The stream '`+this+`' has already been used.`);this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e;var t=this;return e.on(`data`,function(e){t.processChunk(e)}),e.on(`end`,function(){t.end()}),e.on(`error`,function(e){t.error(e)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var e=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e)},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,e)&&(this.streamInfo[e]=this.extraStreamInfo[e])},lock:function(){if(this.isLocked)throw Error(`The stream '`+this+`' has already been used.`);this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var e=`Worker `+this.name;return this.previous?this.previous+` -> `+e:e}},t.exports=r},{}],29:[function(e,t,n){var r=e(`../utils`),i=e(`./ConvertWorker`),a=e(`./GenericWorker`),o=e(`../base64`),s=e(`../support`),c=e(`../external`),l=null;if(s.nodestream)try{l=e(`../nodejs/NodejsStreamOutputAdapter`)}catch{}function u(e,t){return new c.Promise(function(n,i){var a=[],s=e._internalType,c=e._outputType,l=e._mimeType;e.on(`data`,function(e,n){a.push(e),t&&t(n)}).on(`error`,function(e){a=[],i(e)}).on(`end`,function(){try{n(function(e,t,n){switch(e){case`blob`:return r.newBlob(r.transformTo(`arraybuffer`,t),n);case`base64`:return o.encode(t);default:return r.transformTo(e,t)}}(c,function(e,t){var n,r=0,i=null,a=0;for(n=0;n<t.length;n++)a+=t[n].length;switch(e){case`string`:return t.join(``);case`array`:return Array.prototype.concat.apply([],t);case`uint8array`:for(i=new Uint8Array(a),n=0;n<t.length;n++)i.set(t[n],r),r+=t[n].length;return i;case`nodebuffer`:return Buffer.concat(t);default:throw Error(`concat : unsupported type '`+e+`'`)}}(s,a),l))}catch(e){i(e)}a=[]}).resume()})}function d(e,t,n){var o=t;switch(t){case`blob`:case`arraybuffer`:o=`uint8array`;break;case`base64`:o=`string`}try{this._internalType=o,this._outputType=t,this._mimeType=n,r.checkSupport(o),this._worker=e.pipe(new i(o)),e.lock()}catch(e){this._worker=new a(`error`),this._worker.error(e)}}d.prototype={accumulate:function(e){return u(this,e)},on:function(e,t){var n=this;return e===`data`?this._worker.on(e,function(e){t.call(n,e.data,e.meta)}):this._worker.on(e,function(){r.delay(t,arguments,n)}),this},resume:function(){return r.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(e){if(r.checkSupport(`nodestream`),this._outputType!==`nodebuffer`)throw Error(this._outputType+` is not supported by this method`);return new l(this,{objectMode:this._outputType!==`nodebuffer`},e)}},t.exports=d},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,t,n){if(n.base64=!0,n.array=!0,n.string=!0,n.arraybuffer=typeof ArrayBuffer<`u`&&typeof Uint8Array<`u`,n.nodebuffer=typeof Buffer<`u`,n.uint8array=typeof Uint8Array<`u`,typeof ArrayBuffer>`u`)n.blob=!1;else{var r=new ArrayBuffer(0);try{n.blob=new Blob([r],{type:`application/zip`}).size===0}catch{try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(r),n.blob=i.getBlob(`application/zip`).size===0}catch{n.blob=!1}}}try{n.nodestream=!!e(`readable-stream`).Readable}catch{n.nodestream=!1}},{"readable-stream":16}],31:[function(e,t,n){for(var r=e(`./utils`),i=e(`./support`),a=e(`./nodejsUtils`),o=e(`./stream/GenericWorker`),s=Array(256),c=0;c<256;c++)s[c]=252<=c?6:248<=c?5:240<=c?4:224<=c?3:192<=c?2:1;s[254]=s[254]=1;function l(){o.call(this,`utf-8 decode`),this.leftOver=null}function u(){o.call(this,`utf-8 encode`)}n.utf8encode=function(e){return i.nodebuffer?a.newBufferFrom(e,`utf-8`):function(e){var t,n,r,a,o,s=e.length,c=0;for(a=0;a<s;a++)(64512&(n=e.charCodeAt(a)))==55296&&a+1<s&&(64512&(r=e.charCodeAt(a+1)))==56320&&(n=65536+(n-55296<<10)+(r-56320),a++),c+=n<128?1:n<2048?2:n<65536?3:4;for(t=i.uint8array?new Uint8Array(c):Array(c),a=o=0;o<c;a++)(64512&(n=e.charCodeAt(a)))==55296&&a+1<s&&(64512&(r=e.charCodeAt(a+1)))==56320&&(n=65536+(n-55296<<10)+(r-56320),a++),n<128?t[o++]=n:(n<2048?t[o++]=192|n>>>6:(n<65536?t[o++]=224|n>>>12:(t[o++]=240|n>>>18,t[o++]=128|n>>>12&63),t[o++]=128|n>>>6&63),t[o++]=128|63&n);return t}(e)},n.utf8decode=function(e){return i.nodebuffer?r.transformTo(`nodebuffer`,e).toString(`utf-8`):function(e){var t,n,i,a,o=e.length,c=Array(2*o);for(t=n=0;t<o;)if((i=e[t++])<128)c[n++]=i;else if(4<(a=s[i]))c[n++]=65533,t+=a-1;else{for(i&=a===2?31:a===3?15:7;1<a&&t<o;)i=i<<6|63&e[t++],a--;1<a?c[n++]=65533:i<65536?c[n++]=i:(i-=65536,c[n++]=55296|i>>10&1023,c[n++]=56320|1023&i)}return c.length!==n&&(c.subarray?c=c.subarray(0,n):c.length=n),r.applyFromCharCode(c)}(e=r.transformTo(i.uint8array?`uint8array`:`array`,e))},r.inherits(l,o),l.prototype.processChunk=function(e){var t=r.transformTo(i.uint8array?`uint8array`:`array`,e.data);if(this.leftOver&&this.leftOver.length){if(i.uint8array){var a=t;(t=new Uint8Array(a.length+this.leftOver.length)).set(this.leftOver,0),t.set(a,this.leftOver.length)}else t=this.leftOver.concat(t);this.leftOver=null}var o=function(e,t){var n;for((t||=e.length)>e.length&&(t=e.length),n=t-1;0<=n&&(192&e[n])==128;)n--;return n<0||n===0?t:n+s[e[n]]>t?n:t}(t),c=t;o!==t.length&&(i.uint8array?(c=t.subarray(0,o),this.leftOver=t.subarray(o,t.length)):(c=t.slice(0,o),this.leftOver=t.slice(o,t.length))),this.push({data:n.utf8decode(c),meta:e.meta})},l.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:n.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},n.Utf8DecodeWorker=l,r.inherits(u,o),u.prototype.processChunk=function(e){this.push({data:n.utf8encode(e.data),meta:e.meta})},n.Utf8EncodeWorker=u},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,t,n){var r=e(`./support`),i=e(`./base64`),a=e(`./nodejsUtils`),o=e(`./external`);function s(e){return e}function c(e,t){for(var n=0;n<e.length;++n)t[n]=255&e.charCodeAt(n);return t}e(`setimmediate`),n.newBlob=function(e,t){n.checkSupport(`blob`);try{return new Blob([e],{type:t})}catch{try{var r=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return r.append(e),r.getBlob(t)}catch{throw Error(`Bug : can't construct the Blob.`)}}};var l={stringifyByChunk:function(e,t,n){var r=[],i=0,a=e.length;if(a<=n)return String.fromCharCode.apply(null,e);for(;i<a;)t===`array`||t===`nodebuffer`?r.push(String.fromCharCode.apply(null,e.slice(i,Math.min(i+n,a)))):r.push(String.fromCharCode.apply(null,e.subarray(i,Math.min(i+n,a)))),i+=n;return r.join(``)},stringifyByChar:function(e){for(var t=``,n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return t},applyCanBeUsed:{uint8array:function(){try{return r.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}}(),nodebuffer:function(){try{return r.nodebuffer&&String.fromCharCode.apply(null,a.allocBuffer(1)).length===1}catch{return!1}}()}};function u(e){var t=65536,r=n.getTypeOf(e),i=!0;if(r===`uint8array`?i=l.applyCanBeUsed.uint8array:r===`nodebuffer`&&(i=l.applyCanBeUsed.nodebuffer),i)for(;1<t;)try{return l.stringifyByChunk(e,r,t)}catch{t=Math.floor(t/2)}return l.stringifyByChar(e)}function d(e,t){for(var n=0;n<e.length;n++)t[n]=e[n];return t}n.applyFromCharCode=u;var f={};f.string={string:s,array:function(e){return c(e,Array(e.length))},arraybuffer:function(e){return f.string.uint8array(e).buffer},uint8array:function(e){return c(e,new Uint8Array(e.length))},nodebuffer:function(e){return c(e,a.allocBuffer(e.length))}},f.array={string:u,array:s,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return a.newBufferFrom(e)}},f.arraybuffer={string:function(e){return u(new Uint8Array(e))},array:function(e){return d(new Uint8Array(e),Array(e.byteLength))},arraybuffer:s,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return a.newBufferFrom(new Uint8Array(e))}},f.uint8array={string:u,array:function(e){return d(e,Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:s,nodebuffer:function(e){return a.newBufferFrom(e)}},f.nodebuffer={string:u,array:function(e){return d(e,Array(e.length))},arraybuffer:function(e){return f.nodebuffer.uint8array(e).buffer},uint8array:function(e){return d(e,new Uint8Array(e.length))},nodebuffer:s},n.transformTo=function(e,t){return t||=``,e?(n.checkSupport(e),f[n.getTypeOf(t)][e](t)):t},n.resolve=function(e){for(var t=e.split(`/`),n=[],r=0;r<t.length;r++){var i=t[r];i===`.`||i===``&&r!==0&&r!==t.length-1||(i===`..`?n.pop():n.push(i))}return n.join(`/`)},n.getTypeOf=function(e){if(typeof e==`string`)return`string`;var t=Object.prototype.toString.call(e);return t===`[object Array]`?`array`:r.nodebuffer&&a.isBuffer(e)?`nodebuffer`:r.uint8array&&t===`[object Uint8Array]`?`uint8array`:r.arraybuffer&&t===`[object ArrayBuffer]`?`arraybuffer`:void 0},n.checkSupport=function(e){if(!r[e.toLowerCase()])throw Error(e+` is not supported by this platform`)},n.MAX_VALUE_16BITS=65535,n.MAX_VALUE_32BITS=-1,n.pretty=function(e){var t,n,r=``;for(n=0;n<(e||``).length;n++)r+=`\\x`+((t=e.charCodeAt(n))<16?`0`:``)+t.toString(16).toUpperCase();return r},n.delay=function(e,t,n){setImmediate(function(){e.apply(n||null,t||[])})},n.inherits=function(e,t){function n(){}n.prototype=t.prototype,e.prototype=new n},n.extend=function(){var e,t,n={};for(e=0;e<arguments.length;e++)for(t in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],t)&&n[t]===void 0&&(n[t]=arguments[e][t]);return n},n.prepareContent=function(e,t,a,s,l){return o.Promise.resolve(t).then(function(t){return r.blob&&(t instanceof Blob||[`[object File]`,`[object Blob]`].indexOf(Object.prototype.toString.call(t))!==-1)?Blob.prototype.arrayBuffer===void 0?typeof FileReader<`u`?new o.Promise(function(e,n){var r=new FileReader;r.onload=function(t){e(t.target.result)},r.onerror=function(e){n(e.target.error)},r.readAsArrayBuffer(t)}):o.Promise.reject(Error(e+` is a Blob, but we have no way of reading it.`)):t.arrayBuffer():t}).then(function(t){var u=n.getTypeOf(t);return u?(u===`arraybuffer`?t=n.transformTo(`uint8array`,t):u===`string`&&(l?t=i.decode(t):a&&!0!==s&&(t=function(e){return c(e,r.uint8array?new Uint8Array(e.length):Array(e.length))}(t))),t):o.Promise.reject(Error(`Can't read the data of '`+e+`'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?`))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,t,n){var r=e(`./reader/readerFor`),i=e(`./utils`),a=e(`./signature`),o=e(`./zipEntry`),s=e(`./support`);function c(e){this.files=[],this.loadOptions=e}c.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var t=this.reader.readString(4);throw Error(`Corrupted zip or bug: unexpected signature (`+i.pretty(t)+`, expected `+i.pretty(e)+`)`)}},isSignature:function(e,t){var n=this.reader.index;this.reader.setIndex(e);var r=this.reader.readString(4)===t;return this.reader.setIndex(n),r},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength),t=s.uint8array?`uint8array`:`array`,n=i.transformTo(t,e);this.zipComment=this.loadOptions.decodeFileName(n)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var e,t,n,r=this.zip64EndOfCentralSize-44;0<r;)e=this.reader.readInt(2),t=this.reader.readInt(4),n=this.reader.readData(t),this.zip64ExtensibleData[e]={id:e,length:t,value:n}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw Error(`Multi-volumes zip are not supported`)},readLocalFiles:function(){for(var e=0,t;e<this.files.length;e++)t=this.files[e],this.reader.setIndex(t.localHeaderOffset),this.checkSignature(a.LOCAL_FILE_HEADER),t.readLocalPart(this.reader),t.handleUTF8(),t.processAttributes()},readCentralDir:function(){var e;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(a.CENTRAL_FILE_HEADER);)(e=new o({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(e);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw Error(`Corrupted zip or bug: expected `+this.centralDirRecords+` records in central dir, got `+this.files.length)},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(a.CENTRAL_DIRECTORY_END);if(e<0)throw this.isSignature(0,a.LOCAL_FILE_HEADER)?Error(`Corrupted zip: can't find end of central directory`):Error(`Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html`);this.reader.setIndex(e);var t=e;if(this.checkSignature(a.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(e=this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw Error(`Corrupted zip: can't find the ZIP64 end of central directory locator`);if(this.reader.setIndex(e),this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,a.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw Error(`Corrupted zip: can't find the ZIP64 end of central directory`);this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var n=this.centralDirOffset+this.centralDirSize;this.zip64&&(n+=20,n+=12+this.zip64EndOfCentralSize);var r=t-n;if(0<r)this.isSignature(t,a.CENTRAL_FILE_HEADER)||(this.reader.zero=r);else if(r<0)throw Error(`Corrupted zip: missing `+Math.abs(r)+` bytes.`)},prepareReader:function(e){this.reader=r(e)},load:function(e){this.prepareReader(e),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=c},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,t,n){var r=e(`./reader/readerFor`),i=e(`./utils`),a=e(`./compressedObject`),o=e(`./crc32`),s=e(`./utf8`),c=e(`./compressions`),l=e(`./support`);function u(e,t){this.options=e,this.loadOptions=t}u.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(e){var t,n;if(e.skip(22),this.fileNameLength=e.readInt(2),n=e.readInt(2),this.fileName=e.readData(this.fileNameLength),e.skip(n),this.compressedSize===-1||this.uncompressedSize===-1)throw Error(`Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)`);if((t=function(e){for(var t in c)if(Object.prototype.hasOwnProperty.call(c,t)&&c[t].magic===e)return c[t];return null}(this.compressionMethod))===null)throw Error(`Corrupted zip : compression `+i.pretty(this.compressionMethod)+` unknown (inner file : `+i.transformTo(`string`,this.fileName)+`)`);this.decompressed=new a(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize))},readCentralPart:function(e){this.versionMadeBy=e.readInt(2),e.skip(2),this.bitFlag=e.readInt(2),this.compressionMethod=e.readString(2),this.date=e.readDate(),this.crc32=e.readInt(4),this.compressedSize=e.readInt(4),this.uncompressedSize=e.readInt(4);var t=e.readInt(2);if(this.extraFieldsLength=e.readInt(2),this.fileCommentLength=e.readInt(2),this.diskNumberStart=e.readInt(2),this.internalFileAttributes=e.readInt(2),this.externalFileAttributes=e.readInt(4),this.localHeaderOffset=e.readInt(4),this.isEncrypted())throw Error(`Encrypted zip are not supported`);e.skip(t),this.readExtraFields(e),this.parseZIP64ExtraField(e),this.fileComment=e.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),e==0&&(this.dosPermissions=63&this.externalFileAttributes),e==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!==`/`||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var e=r(this.extraFields[1].value);this.uncompressedSize===i.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===i.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===i.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===i.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4))}},readExtraFields:function(e){var t,n,r,i=e.index+this.extraFieldsLength;for(this.extraFields||={};e.index+4<i;)t=e.readInt(2),n=e.readInt(2),r=e.readData(n),this.extraFields[t]={id:t,length:n,value:r};e.setIndex(i)},handleUTF8:function(){var e=l.uint8array?`uint8array`:`array`;if(this.useUTF8())this.fileNameStr=s.utf8decode(this.fileName),this.fileCommentStr=s.utf8decode(this.fileComment);else{var t=this.findExtraFieldUnicodePath();if(t!==null)this.fileNameStr=t;else{var n=i.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(n)}var r=this.findExtraFieldUnicodeComment();if(r!==null)this.fileCommentStr=r;else{var a=i.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(a)}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var t=r(e.value);return t.readInt(1)===1&&o(this.fileName)===t.readInt(4)?s.utf8decode(t.readData(e.length-5)):null}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var t=r(e.value);return t.readInt(1)===1&&o(this.fileComment)===t.readInt(4)?s.utf8decode(t.readData(e.length-5)):null}return null}},t.exports=u},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,t,n){function r(e,t,n){this.name=e,this.dir=n.dir,this.date=n.date,this.comment=n.comment,this.unixPermissions=n.unixPermissions,this.dosPermissions=n.dosPermissions,this._data=t,this._dataBinary=n.binary,this.options={compression:n.compression,compressionOptions:n.compressionOptions}}var i=e(`./stream/StreamHelper`),a=e(`./stream/DataWorker`),o=e(`./utf8`),s=e(`./compressedObject`),c=e(`./stream/GenericWorker`);r.prototype={internalStream:function(e){var t=null,n=`string`;try{if(!e)throw Error(`No output type specified.`);var r=(n=e.toLowerCase())===`string`||n===`text`;n!==`binarystring`&&n!==`text`||(n=`string`),t=this._decompressWorker();var a=!this._dataBinary;a&&!r&&(t=t.pipe(new o.Utf8EncodeWorker)),!a&&r&&(t=t.pipe(new o.Utf8DecodeWorker))}catch(e){(t=new c(`error`)).error(e)}return new i(t,n,``)},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||`nodebuffer`).toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof s&&this._data.compression.magic===e.magic)return this._data.getCompressedWorker();var n=this._decompressWorker();return this._dataBinary||(n=n.pipe(new o.Utf8EncodeWorker)),s.createWorkerFrom(n,e,t)},_decompressWorker:function(){return this._data instanceof s?this._data.getContentWorker():this._data instanceof c?this._data:new a(this._data)}};for(var l=[`asText`,`asBinary`,`asNodeBuffer`,`asUint8Array`,`asArrayBuffer`],u=function(){throw Error(`This method has been removed in JSZip 3.0, please check the upgrade guide.`)},d=0;d<l.length;d++)r.prototype[l[d]]=u;t.exports=r},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,t,n){(function(e){var n,r,i=e.MutationObserver||e.WebKitMutationObserver;if(i){var a=0,o=new i(u),s=e.document.createTextNode(``);o.observe(s,{characterData:!0}),n=function(){s.data=a=++a%2}}else if(e.setImmediate||e.MessageChannel===void 0)n=`document`in e&&`onreadystatechange`in e.document.createElement(`script`)?function(){var t=e.document.createElement(`script`);t.onreadystatechange=function(){u(),t.onreadystatechange=null,t.parentNode.removeChild(t),t=null},e.document.documentElement.appendChild(t)}:function(){setTimeout(u,0)};else{var c=new e.MessageChannel;c.port1.onmessage=u,n=function(){c.port2.postMessage(0)}}var l=[];function u(){var e,t;r=!0;for(var n=l.length;n;){for(t=l,l=[],e=-1;++e<n;)t[e]();n=l.length}r=!1}t.exports=function(e){l.push(e)!==1||r||n()}}).call(this,typeof global<`u`?global:typeof self<`u`?self:typeof window<`u`?window:{})},{}],37:[function(e,t,n){var r=e(`immediate`);function i(){}var a={},o=[`REJECTED`],s=[`FULFILLED`],c=[`PENDING`];function l(e){if(typeof e!=`function`)throw TypeError(`resolver must be a function`);this.state=c,this.queue=[],this.outcome=void 0,e!==i&&p(this,e)}function u(e,t,n){this.promise=e,typeof t==`function`&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),typeof n==`function`&&(this.onRejected=n,this.callRejected=this.otherCallRejected)}function d(e,t,n){r(function(){var r;try{r=t(n)}catch(t){return a.reject(e,t)}r===e?a.reject(e,TypeError(`Cannot resolve promise with itself`)):a.resolve(e,r)})}function f(e){var t=e&&e.then;if(e&&(typeof e==`object`||typeof e==`function`)&&typeof t==`function`)return function(){t.apply(e,arguments)}}function p(e,t){var n=!1;function r(t){n||(n=!0,a.reject(e,t))}function i(t){n||(n=!0,a.resolve(e,t))}var o=m(function(){t(i,r)});o.status===`error`&&r(o.value)}function m(e,t){var n={};try{n.value=e(t),n.status=`success`}catch(e){n.status=`error`,n.value=e}return n}(t.exports=l).prototype.finally=function(e){if(typeof e!=`function`)return this;var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){throw n})})},l.prototype.catch=function(e){return this.then(null,e)},l.prototype.then=function(e,t){if(typeof e!=`function`&&this.state===s||typeof t!=`function`&&this.state===o)return this;var n=new this.constructor(i);return this.state===c?this.queue.push(new u(n,e,t)):d(n,this.state===s?e:t,this.outcome),n},u.prototype.callFulfilled=function(e){a.resolve(this.promise,e)},u.prototype.otherCallFulfilled=function(e){d(this.promise,this.onFulfilled,e)},u.prototype.callRejected=function(e){a.reject(this.promise,e)},u.prototype.otherCallRejected=function(e){d(this.promise,this.onRejected,e)},a.resolve=function(e,t){var n=m(f,t);if(n.status===`error`)return a.reject(e,n.value);var r=n.value;if(r)p(e,r);else{e.state=s,e.outcome=t;for(var i=-1,o=e.queue.length;++i<o;)e.queue[i].callFulfilled(t)}return e},a.reject=function(e,t){e.state=o,e.outcome=t;for(var n=-1,r=e.queue.length;++n<r;)e.queue[n].callRejected(t);return e},l.resolve=function(e){return e instanceof this?e:a.resolve(new this(i),e)},l.reject=function(e){var t=new this(i);return a.reject(t,e)},l.all=function(e){var t=this;if(Object.prototype.toString.call(e)!==`[object Array]`)return this.reject(TypeError(`must be an array`));var n=e.length,r=!1;if(!n)return this.resolve([]);for(var o=Array(n),s=0,c=-1,l=new this(i);++c<n;)u(e[c],c);return l;function u(e,i){t.resolve(e).then(function(e){o[i]=e,++s!==n||r||(r=!0,a.resolve(l,o))},function(e){r||(r=!0,a.reject(l,e))})}},l.race=function(e){var t=this;if(Object.prototype.toString.call(e)!==`[object Array]`)return this.reject(TypeError(`must be an array`));var n=e.length,r=!1;if(!n)return this.resolve([]);for(var o=-1,s=new this(i);++o<n;)c=e[o],t.resolve(c).then(function(e){r||(r=!0,a.resolve(s,e))},function(e){r||(r=!0,a.reject(s,e))});var c;return s}},{immediate:36}],38:[function(e,t,n){var r={};(0,e(`./lib/utils/common`).assign)(r,e(`./lib/deflate`),e(`./lib/inflate`),e(`./lib/zlib/constants`)),t.exports=r},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,t,n){var r=e(`./zlib/deflate`),i=e(`./utils/common`),a=e(`./utils/strings`),o=e(`./zlib/messages`),s=e(`./zlib/zstream`),c=Object.prototype.toString,l=0,u=-1,d=0,f=8;function p(e){if(!(this instanceof p))return new p(e);this.options=i.assign({level:u,method:f,chunkSize:16384,windowBits:15,memLevel:8,strategy:d,to:``},e||{});var t=this.options;t.raw&&0<t.windowBits?t.windowBits=-t.windowBits:t.gzip&&0<t.windowBits&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg=``,this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var n=r.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(n!==l)throw Error(o[n]);if(t.header&&r.deflateSetHeader(this.strm,t.header),t.dictionary){var m=typeof t.dictionary==`string`?a.string2buf(t.dictionary):c.call(t.dictionary)===`[object ArrayBuffer]`?new Uint8Array(t.dictionary):t.dictionary;if((n=r.deflateSetDictionary(this.strm,m))!==l)throw Error(o[n]);this._dict_set=!0}}function m(e,t){var n=new p(t);if(n.push(e,!0),n.err)throw n.msg||o[n.err];return n.result}p.prototype.push=function(e,t){var n,o,s=this.strm,u=this.options.chunkSize;if(this.ended)return!1;o=t===~~t?t:!0===t?4:0,s.input=typeof e==`string`?a.string2buf(e):c.call(e)===`[object ArrayBuffer]`?new Uint8Array(e):e,s.next_in=0,s.avail_in=s.input.length;do{if(s.avail_out===0&&(s.output=new i.Buf8(u),s.next_out=0,s.avail_out=u),(n=r.deflate(s,o))!==1&&n!==l)return this.onEnd(n),!(this.ended=!0);s.avail_out!==0&&(s.avail_in!==0||o!==4&&o!==2)||(this.options.to===`string`?this.onData(a.buf2binstring(i.shrinkBuf(s.output,s.next_out))):this.onData(i.shrinkBuf(s.output,s.next_out)))}while((0<s.avail_in||s.avail_out===0)&&n!==1);return o===4?(n=r.deflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===l):o!==2||(this.onEnd(l),!(s.avail_out=0))},p.prototype.onData=function(e){this.chunks.push(e)},p.prototype.onEnd=function(e){e===l&&(this.result=this.options.to===`string`?this.chunks.join(``):i.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},n.Deflate=p,n.deflate=m,n.deflateRaw=function(e,t){return(t||={}).raw=!0,m(e,t)},n.gzip=function(e,t){return(t||={}).gzip=!0,m(e,t)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,t,n){var r=e(`./zlib/inflate`),i=e(`./utils/common`),a=e(`./utils/strings`),o=e(`./zlib/constants`),s=e(`./zlib/messages`),c=e(`./zlib/zstream`),l=e(`./zlib/gzheader`),u=Object.prototype.toString;function d(e){if(!(this instanceof d))return new d(e);this.options=i.assign({chunkSize:16384,windowBits:0,to:``},e||{});var t=this.options;t.raw&&0<=t.windowBits&&t.windowBits<16&&(t.windowBits=-t.windowBits,t.windowBits===0&&(t.windowBits=-15)),!(0<=t.windowBits&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),15<t.windowBits&&t.windowBits<48&&!(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg=``,this.ended=!1,this.chunks=[],this.strm=new c,this.strm.avail_out=0;var n=r.inflateInit2(this.strm,t.windowBits);if(n!==o.Z_OK)throw Error(s[n]);this.header=new l,r.inflateGetHeader(this.strm,this.header)}function f(e,t){var n=new d(t);if(n.push(e,!0),n.err)throw n.msg||s[n.err];return n.result}d.prototype.push=function(e,t){var n,s,c,l,d,f,p=this.strm,m=this.options.chunkSize,h=this.options.dictionary,g=!1;if(this.ended)return!1;s=t===~~t?t:!0===t?o.Z_FINISH:o.Z_NO_FLUSH,p.input=typeof e==`string`?a.binstring2buf(e):u.call(e)===`[object ArrayBuffer]`?new Uint8Array(e):e,p.next_in=0,p.avail_in=p.input.length;do{if(p.avail_out===0&&(p.output=new i.Buf8(m),p.next_out=0,p.avail_out=m),(n=r.inflate(p,o.Z_NO_FLUSH))===o.Z_NEED_DICT&&h&&(f=typeof h==`string`?a.string2buf(h):u.call(h)===`[object ArrayBuffer]`?new Uint8Array(h):h,n=r.inflateSetDictionary(this.strm,f)),n===o.Z_BUF_ERROR&&!0===g&&(n=o.Z_OK,g=!1),n!==o.Z_STREAM_END&&n!==o.Z_OK)return this.onEnd(n),!(this.ended=!0);p.next_out&&(p.avail_out!==0&&n!==o.Z_STREAM_END&&(p.avail_in!==0||s!==o.Z_FINISH&&s!==o.Z_SYNC_FLUSH)||(this.options.to===`string`?(c=a.utf8border(p.output,p.next_out),l=p.next_out-c,d=a.buf2string(p.output,c),p.next_out=l,p.avail_out=m-l,l&&i.arraySet(p.output,p.output,c,l,0),this.onData(d)):this.onData(i.shrinkBuf(p.output,p.next_out)))),p.avail_in===0&&p.avail_out===0&&(g=!0)}while((0<p.avail_in||p.avail_out===0)&&n!==o.Z_STREAM_END);return n===o.Z_STREAM_END&&(s=o.Z_FINISH),s===o.Z_FINISH?(n=r.inflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===o.Z_OK):s!==o.Z_SYNC_FLUSH||(this.onEnd(o.Z_OK),!(p.avail_out=0))},d.prototype.onData=function(e){this.chunks.push(e)},d.prototype.onEnd=function(e){e===o.Z_OK&&(this.result=this.options.to===`string`?this.chunks.join(``):i.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},n.Inflate=d,n.inflate=f,n.inflateRaw=function(e,t){return(t||={}).raw=!0,f(e,t)},n.ungzip=f},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,t,n){var r=typeof Uint8Array<`u`&&typeof Uint16Array<`u`&&typeof Int32Array<`u`;n.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var n=t.shift();if(n){if(typeof n!=`object`)throw TypeError(n+`must be non-object`);for(var r in n)n.hasOwnProperty(r)&&(e[r]=n[r])}}return e},n.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,n,r,i){if(t.subarray&&e.subarray)e.set(t.subarray(n,n+r),i);else for(var a=0;a<r;a++)e[i+a]=t[n+a]},flattenChunks:function(e){for(var t=r=0,n=e.length,r,i,a,o;t<n;t++)r+=e[t].length;for(o=new Uint8Array(r),t=i=0,n=e.length;t<n;t++)a=e[t],o.set(a,i),i+=a.length;return o}},a={arraySet:function(e,t,n,r,i){for(var a=0;a<r;a++)e[i+a]=t[n+a]},flattenChunks:function(e){return[].concat.apply([],e)}};n.setTyped=function(e){e?(n.Buf8=Uint8Array,n.Buf16=Uint16Array,n.Buf32=Int32Array,n.assign(n,i)):(n.Buf8=Array,n.Buf16=Array,n.Buf32=Array,n.assign(n,a))},n.setTyped(r)},{}],42:[function(e,t,n){var r=e(`./common`),i=!0,a=!0;try{String.fromCharCode.apply(null,[0])}catch{i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{a=!1}for(var o=new r.Buf8(256),s=0;s<256;s++)o[s]=252<=s?6:248<=s?5:240<=s?4:224<=s?3:192<=s?2:1;function c(e,t){if(t<65537&&(e.subarray&&a||!e.subarray&&i))return String.fromCharCode.apply(null,r.shrinkBuf(e,t));for(var n=``,o=0;o<t;o++)n+=String.fromCharCode(e[o]);return n}o[254]=o[254]=1,n.string2buf=function(e){var t,n,i,a,o,s=e.length,c=0;for(a=0;a<s;a++)(64512&(n=e.charCodeAt(a)))==55296&&a+1<s&&(64512&(i=e.charCodeAt(a+1)))==56320&&(n=65536+(n-55296<<10)+(i-56320),a++),c+=n<128?1:n<2048?2:n<65536?3:4;for(t=new r.Buf8(c),a=o=0;o<c;a++)(64512&(n=e.charCodeAt(a)))==55296&&a+1<s&&(64512&(i=e.charCodeAt(a+1)))==56320&&(n=65536+(n-55296<<10)+(i-56320),a++),n<128?t[o++]=n:(n<2048?t[o++]=192|n>>>6:(n<65536?t[o++]=224|n>>>12:(t[o++]=240|n>>>18,t[o++]=128|n>>>12&63),t[o++]=128|n>>>6&63),t[o++]=128|63&n);return t},n.buf2binstring=function(e){return c(e,e.length)},n.binstring2buf=function(e){for(var t=new r.Buf8(e.length),n=0,i=t.length;n<i;n++)t[n]=e.charCodeAt(n);return t},n.buf2string=function(e,t){var n,r,i,a,s=t||e.length,l=Array(2*s);for(n=r=0;n<s;)if((i=e[n++])<128)l[r++]=i;else if(4<(a=o[i]))l[r++]=65533,n+=a-1;else{for(i&=a===2?31:a===3?15:7;1<a&&n<s;)i=i<<6|63&e[n++],a--;1<a?l[r++]=65533:i<65536?l[r++]=i:(i-=65536,l[r++]=55296|i>>10&1023,l[r++]=56320|1023&i)}return c(l,r)},n.utf8border=function(e,t){var n;for((t||=e.length)>e.length&&(t=e.length),n=t-1;0<=n&&(192&e[n])==128;)n--;return n<0||n===0?t:n+o[e[n]]>t?n:t}},{"./common":41}],43:[function(e,t,n){t.exports=function(e,t,n,r){for(var i=65535&e,a=e>>>16&65535,o=0;n!==0;){for(n-=o=2e3<n?2e3:n;a=a+(i=i+t[r++]|0)|0,--o;);i%=65521,a%=65521}return i|a<<16}},{}],44:[function(e,t,n){t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,t,n){var r=function(){for(var e,t=[],n=0;n<256;n++){e=n;for(var r=0;r<8;r++)e=1&e?3988292384^e>>>1:e>>>1;t[n]=e}return t}();t.exports=function(e,t,n,i){var a=r,o=i+n;e^=-1;for(var s=i;s<o;s++)e=e>>>8^a[255&(e^t[s])];return-1^e}},{}],46:[function(e,t,n){var r,i=e(`../utils/common`),a=e(`./trees`),o=e(`./adler32`),s=e(`./crc32`),c=e(`./messages`),l=0,u=4,d=0,f=-2,p=-1,m=4,h=2,g=8,_=9,v=286,y=30,b=19,x=2*v+1,S=15,C=3,w=258,T=w+C+1,E=42,D=113,O=1,k=2,A=3,j=4;function M(e,t){return e.msg=c[t],t}function ee(e){return(e<<1)-(4<e?9:0)}function te(e){for(var t=e.length;0<=--t;)e[t]=0}function N(e){var t=e.state,n=t.pending;n>e.avail_out&&(n=e.avail_out),n!==0&&(i.arraySet(e.output,t.pending_buf,t.pending_out,n,e.next_out),e.next_out+=n,t.pending_out+=n,e.total_out+=n,e.avail_out-=n,t.pending-=n,t.pending===0&&(t.pending_out=0))}function P(e,t){a._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,N(e.strm)}function F(e,t){e.pending_buf[e.pending++]=t}function I(e,t){e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t}function ne(e,t){var n,r,i=e.max_chain_length,a=e.strstart,o=e.prev_length,s=e.nice_match,c=e.strstart>e.w_size-T?e.strstart-(e.w_size-T):0,l=e.window,u=e.w_mask,d=e.prev,f=e.strstart+w,p=l[a+o-1],m=l[a+o];e.prev_length>=e.good_match&&(i>>=2),s>e.lookahead&&(s=e.lookahead);do if(l[(n=t)+o]===m&&l[n+o-1]===p&&l[n]===l[a]&&l[++n]===l[a+1]){a+=2,n++;do;while(l[++a]===l[++n]&&l[++a]===l[++n]&&l[++a]===l[++n]&&l[++a]===l[++n]&&l[++a]===l[++n]&&l[++a]===l[++n]&&l[++a]===l[++n]&&l[++a]===l[++n]&&a<f);if(r=w-(f-a),a=f-w,o<r){if(e.match_start=t,s<=(o=r))break;p=l[a+o-1],m=l[a+o]}}while((t=d[t&u])>c&&--i!=0);return o<=e.lookahead?o:e.lookahead}function L(e){var t,n,r,a,c,l,u,d,f,p,m=e.w_size;do{if(a=e.window_size-e.lookahead-e.strstart,e.strstart>=m+(m-T)){for(i.arraySet(e.window,e.window,m,m,0),e.match_start-=m,e.strstart-=m,e.block_start-=m,t=n=e.hash_size;r=e.head[--t],e.head[t]=m<=r?r-m:0,--n;);for(t=n=m;r=e.prev[--t],e.prev[t]=m<=r?r-m:0,--n;);a+=m}if(e.strm.avail_in===0)break;if(l=e.strm,u=e.window,d=e.strstart+e.lookahead,f=a,p=void 0,p=l.avail_in,f<p&&(p=f),n=p===0?0:(l.avail_in-=p,i.arraySet(u,l.input,l.next_in,p,d),l.state.wrap===1?l.adler=o(l.adler,u,p,d):l.state.wrap===2&&(l.adler=s(l.adler,u,p,d)),l.next_in+=p,l.total_in+=p,p),e.lookahead+=n,e.lookahead+e.insert>=C)for(c=e.strstart-e.insert,e.ins_h=e.window[c],e.ins_h=(e.ins_h<<e.hash_shift^e.window[c+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[c+C-1])&e.hash_mask,e.prev[c&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=c,c++,e.insert--,!(e.lookahead+e.insert<C)););}while(e.lookahead<T&&e.strm.avail_in!==0)}function re(e,t){for(var n,r;;){if(e.lookahead<T){if(L(e),e.lookahead<T&&t===l)return O;if(e.lookahead===0)break}if(n=0,e.lookahead>=C&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+C-1])&e.hash_mask,n=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),n!==0&&e.strstart-n<=e.w_size-T&&(e.match_length=ne(e,n)),e.match_length>=C){if(r=a._tr_tally(e,e.strstart-e.match_start,e.match_length-C),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=C){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+C-1])&e.hash_mask,n=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,--e.match_length!=0;);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask}else r=a._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(r&&(P(e,!1),e.strm.avail_out===0))return O}return e.insert=e.strstart<C-1?e.strstart:C-1,t===u?(P(e,!0),e.strm.avail_out===0?A:j):e.last_lit&&(P(e,!1),e.strm.avail_out===0)?O:k}function R(e,t){for(var n,r,i;;){if(e.lookahead<T){if(L(e),e.lookahead<T&&t===l)return O;if(e.lookahead===0)break}if(n=0,e.lookahead>=C&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+C-1])&e.hash_mask,n=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=C-1,n!==0&&e.prev_length<e.max_lazy_match&&e.strstart-n<=e.w_size-T&&(e.match_length=ne(e,n),e.match_length<=5&&(e.strategy===1||e.match_length===C&&4096<e.strstart-e.match_start)&&(e.match_length=C-1)),e.prev_length>=C&&e.match_length<=e.prev_length){for(i=e.strstart+e.lookahead-C,r=a._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-C),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+C-1])&e.hash_mask,n=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),--e.prev_length!=0;);if(e.match_available=0,e.match_length=C-1,e.strstart++,r&&(P(e,!1),e.strm.avail_out===0))return O}else if(e.match_available){if((r=a._tr_tally(e,0,e.window[e.strstart-1]))&&P(e,!1),e.strstart++,e.lookahead--,e.strm.avail_out===0)return O}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&=(r=a._tr_tally(e,0,e.window[e.strstart-1]),0),e.insert=e.strstart<C-1?e.strstart:C-1,t===u?(P(e,!0),e.strm.avail_out===0?A:j):e.last_lit&&(P(e,!1),e.strm.avail_out===0)?O:k}function ie(e,t,n,r,i){this.good_length=e,this.max_lazy=t,this.nice_length=n,this.max_chain=r,this.func=i}function ae(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=g,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new i.Buf16(2*x),this.dyn_dtree=new i.Buf16(2*(2*y+1)),this.bl_tree=new i.Buf16(2*(2*b+1)),te(this.dyn_ltree),te(this.dyn_dtree),te(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new i.Buf16(S+1),this.heap=new i.Buf16(2*v+1),te(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new i.Buf16(2*v+1),te(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function oe(e){var t;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=h,(t=e.state).pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap?E:D,e.adler=t.wrap===2?0:1,t.last_flush=l,a._tr_init(t),d):M(e,f)}function se(e){var t=oe(e);return t===d&&function(e){e.window_size=2*e.w_size,te(e.head),e.max_lazy_match=r[e.level].max_lazy,e.good_match=r[e.level].good_length,e.nice_match=r[e.level].nice_length,e.max_chain_length=r[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=C-1,e.match_available=0,e.ins_h=0}(e.state),t}function ce(e,t,n,r,a,o){if(!e)return f;var s=1;if(t===p&&(t=6),r<0?(s=0,r=-r):15<r&&(s=2,r-=16),a<1||_<a||n!==g||r<8||15<r||t<0||9<t||o<0||m<o)return M(e,f);r===8&&(r=9);var c=new ae;return(e.state=c).strm=e,c.wrap=s,c.gzhead=null,c.w_bits=r,c.w_size=1<<c.w_bits,c.w_mask=c.w_size-1,c.hash_bits=a+7,c.hash_size=1<<c.hash_bits,c.hash_mask=c.hash_size-1,c.hash_shift=~~((c.hash_bits+C-1)/C),c.window=new i.Buf8(2*c.w_size),c.head=new i.Buf16(c.hash_size),c.prev=new i.Buf16(c.w_size),c.lit_bufsize=1<<a+6,c.pending_buf_size=4*c.lit_bufsize,c.pending_buf=new i.Buf8(c.pending_buf_size),c.d_buf=1*c.lit_bufsize,c.l_buf=3*c.lit_bufsize,c.level=t,c.strategy=o,c.method=n,se(e)}r=[new ie(0,0,0,0,function(e,t){var n=65535;for(n>e.pending_buf_size-5&&(n=e.pending_buf_size-5);;){if(e.lookahead<=1){if(L(e),e.lookahead===0&&t===l)return O;if(e.lookahead===0)break}e.strstart+=e.lookahead,e.lookahead=0;var r=e.block_start+n;if((e.strstart===0||e.strstart>=r)&&(e.lookahead=e.strstart-r,e.strstart=r,P(e,!1),e.strm.avail_out===0)||e.strstart-e.block_start>=e.w_size-T&&(P(e,!1),e.strm.avail_out===0))return O}return e.insert=0,t===u?(P(e,!0),e.strm.avail_out===0?A:j):(e.strstart>e.block_start&&(P(e,!1),e.strm.avail_out),O)}),new ie(4,4,8,4,re),new ie(4,5,16,8,re),new ie(4,6,32,32,re),new ie(4,4,16,16,R),new ie(8,16,32,32,R),new ie(8,16,128,128,R),new ie(8,32,128,256,R),new ie(32,128,258,1024,R),new ie(32,258,258,4096,R)],n.deflateInit=function(e,t){return ce(e,t,g,15,8,0)},n.deflateInit2=ce,n.deflateReset=se,n.deflateResetKeep=oe,n.deflateSetHeader=function(e,t){return e&&e.state&&e.state.wrap===2?(e.state.gzhead=t,d):f},n.deflate=function(e,t){var n,i,o,c;if(!e||!e.state||5<t||t<0)return e?M(e,f):f;if(i=e.state,!e.output||!e.input&&e.avail_in!==0||i.status===666&&t!==u)return M(e,e.avail_out===0?-5:f);if(i.strm=e,n=i.last_flush,i.last_flush=t,i.status===E){if(i.wrap===2)e.adler=0,F(i,31),F(i,139),F(i,8),i.gzhead?(F(i,+!!i.gzhead.text+(i.gzhead.hcrc?2:0)+(i.gzhead.extra?4:0)+(i.gzhead.name?8:0)+(i.gzhead.comment?16:0)),F(i,255&i.gzhead.time),F(i,i.gzhead.time>>8&255),F(i,i.gzhead.time>>16&255),F(i,i.gzhead.time>>24&255),F(i,i.level===9?2:2<=i.strategy||i.level<2?4:0),F(i,255&i.gzhead.os),i.gzhead.extra&&i.gzhead.extra.length&&(F(i,255&i.gzhead.extra.length),F(i,i.gzhead.extra.length>>8&255)),i.gzhead.hcrc&&(e.adler=s(e.adler,i.pending_buf,i.pending,0)),i.gzindex=0,i.status=69):(F(i,0),F(i,0),F(i,0),F(i,0),F(i,0),F(i,i.level===9?2:2<=i.strategy||i.level<2?4:0),F(i,3),i.status=D);else{var p=g+(i.w_bits-8<<4)<<8;p|=(2<=i.strategy||i.level<2?0:i.level<6?1:i.level===6?2:3)<<6,i.strstart!==0&&(p|=32),p+=31-p%31,i.status=D,I(i,p),i.strstart!==0&&(I(i,e.adler>>>16),I(i,65535&e.adler)),e.adler=1}}if(i.status===69){if(i.gzhead.extra){for(o=i.pending;i.gzindex<(65535&i.gzhead.extra.length)&&(i.pending!==i.pending_buf_size||(i.gzhead.hcrc&&i.pending>o&&(e.adler=s(e.adler,i.pending_buf,i.pending-o,o)),N(e),o=i.pending,i.pending!==i.pending_buf_size));)F(i,255&i.gzhead.extra[i.gzindex]),i.gzindex++;i.gzhead.hcrc&&i.pending>o&&(e.adler=s(e.adler,i.pending_buf,i.pending-o,o)),i.gzindex===i.gzhead.extra.length&&(i.gzindex=0,i.status=73)}else i.status=73}if(i.status===73){if(i.gzhead.name){o=i.pending;do{if(i.pending===i.pending_buf_size&&(i.gzhead.hcrc&&i.pending>o&&(e.adler=s(e.adler,i.pending_buf,i.pending-o,o)),N(e),o=i.pending,i.pending===i.pending_buf_size)){c=1;break}c=i.gzindex<i.gzhead.name.length?255&i.gzhead.name.charCodeAt(i.gzindex++):0,F(i,c)}while(c!==0);i.gzhead.hcrc&&i.pending>o&&(e.adler=s(e.adler,i.pending_buf,i.pending-o,o)),c===0&&(i.gzindex=0,i.status=91)}else i.status=91}if(i.status===91){if(i.gzhead.comment){o=i.pending;do{if(i.pending===i.pending_buf_size&&(i.gzhead.hcrc&&i.pending>o&&(e.adler=s(e.adler,i.pending_buf,i.pending-o,o)),N(e),o=i.pending,i.pending===i.pending_buf_size)){c=1;break}c=i.gzindex<i.gzhead.comment.length?255&i.gzhead.comment.charCodeAt(i.gzindex++):0,F(i,c)}while(c!==0);i.gzhead.hcrc&&i.pending>o&&(e.adler=s(e.adler,i.pending_buf,i.pending-o,o)),c===0&&(i.status=103)}else i.status=103}if(i.status===103&&(i.gzhead.hcrc?(i.pending+2>i.pending_buf_size&&N(e),i.pending+2<=i.pending_buf_size&&(F(i,255&e.adler),F(i,e.adler>>8&255),e.adler=0,i.status=D)):i.status=D),i.pending!==0){if(N(e),e.avail_out===0)return i.last_flush=-1,d}else if(e.avail_in===0&&ee(t)<=ee(n)&&t!==u)return M(e,-5);if(i.status===666&&e.avail_in!==0)return M(e,-5);if(e.avail_in!==0||i.lookahead!==0||t!==l&&i.status!==666){var m=i.strategy===2?function(e,t){for(var n;;){if(e.lookahead===0&&(L(e),e.lookahead===0)){if(t===l)return O;break}if(e.match_length=0,n=a._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,n&&(P(e,!1),e.strm.avail_out===0))return O}return e.insert=0,t===u?(P(e,!0),e.strm.avail_out===0?A:j):e.last_lit&&(P(e,!1),e.strm.avail_out===0)?O:k}(i,t):i.strategy===3?function(e,t){for(var n,r,i,o,s=e.window;;){if(e.lookahead<=w){if(L(e),e.lookahead<=w&&t===l)return O;if(e.lookahead===0)break}if(e.match_length=0,e.lookahead>=C&&0<e.strstart&&(r=s[i=e.strstart-1])===s[++i]&&r===s[++i]&&r===s[++i]){o=e.strstart+w;do;while(r===s[++i]&&r===s[++i]&&r===s[++i]&&r===s[++i]&&r===s[++i]&&r===s[++i]&&r===s[++i]&&r===s[++i]&&i<o);e.match_length=w-(o-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=C?(n=a._tr_tally(e,1,e.match_length-C),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(n=a._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),n&&(P(e,!1),e.strm.avail_out===0))return O}return e.insert=0,t===u?(P(e,!0),e.strm.avail_out===0?A:j):e.last_lit&&(P(e,!1),e.strm.avail_out===0)?O:k}(i,t):r[i.level].func(i,t);if(m!==A&&m!==j||(i.status=666),m===O||m===A)return e.avail_out===0&&(i.last_flush=-1),d;if(m===k&&(t===1?a._tr_align(i):t!==5&&(a._tr_stored_block(i,0,0,!1),t===3&&(te(i.head),i.lookahead===0&&(i.strstart=0,i.block_start=0,i.insert=0))),N(e),e.avail_out===0))return i.last_flush=-1,d}return t===u?i.wrap<=0?1:(i.wrap===2?(F(i,255&e.adler),F(i,e.adler>>8&255),F(i,e.adler>>16&255),F(i,e.adler>>24&255),F(i,255&e.total_in),F(i,e.total_in>>8&255),F(i,e.total_in>>16&255),F(i,e.total_in>>24&255)):(I(i,e.adler>>>16),I(i,65535&e.adler)),N(e),0<i.wrap&&(i.wrap=-i.wrap),i.pending===0?1:d):d},n.deflateEnd=function(e){var t;return e&&e.state?(t=e.state.status)!==E&&t!==69&&t!==73&&t!==91&&t!==103&&t!==D&&t!==666?M(e,f):(e.state=null,t===D?M(e,-3):d):f},n.deflateSetDictionary=function(e,t){var n,r,a,s,c,l,u,p,m=t.length;if(!e||!e.state||(s=(n=e.state).wrap)===2||s===1&&n.status!==E||n.lookahead)return f;for(s===1&&(e.adler=o(e.adler,t,m,0)),n.wrap=0,m>=n.w_size&&(s===0&&(te(n.head),n.strstart=0,n.block_start=0,n.insert=0),p=new i.Buf8(n.w_size),i.arraySet(p,t,m-n.w_size,n.w_size,0),t=p,m=n.w_size),c=e.avail_in,l=e.next_in,u=e.input,e.avail_in=m,e.next_in=0,e.input=t,L(n);n.lookahead>=C;){for(r=n.strstart,a=n.lookahead-(C-1);n.ins_h=(n.ins_h<<n.hash_shift^n.window[r+C-1])&n.hash_mask,n.prev[r&n.w_mask]=n.head[n.ins_h],n.head[n.ins_h]=r,r++,--a;);n.strstart=r,n.lookahead=C-1,L(n)}return n.strstart+=n.lookahead,n.block_start=n.strstart,n.insert=n.lookahead,n.lookahead=0,n.match_length=n.prev_length=C-1,n.match_available=0,e.next_in=l,e.input=u,e.avail_in=c,n.wrap=s,d},n.deflateInfo=`pako deflate (from Nodeca project)`},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,t,n){t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name=``,this.comment=``,this.hcrc=0,this.done=!1}},{}],48:[function(e,t,n){t.exports=function(e,t){var n=e.state,r=e.next_in,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T=e.input,E;i=r+(e.avail_in-5),a=e.next_out,E=e.output,o=a-(t-e.avail_out),s=a+(e.avail_out-257),c=n.dmax,l=n.wsize,u=n.whave,d=n.wnext,f=n.window,p=n.hold,m=n.bits,h=n.lencode,g=n.distcode,_=(1<<n.lenbits)-1,v=(1<<n.distbits)-1;e:do{m<15&&(p+=T[r++]<<m,m+=8,p+=T[r++]<<m,m+=8),y=h[p&_];t:for(;;){if(p>>>=b=y>>>24,m-=b,(b=y>>>16&255)==0)E[a++]=65535&y;else{if(!(16&b)){if(!(64&b)){y=h[(65535&y)+(p&(1<<b)-1)];continue t}if(32&b){n.mode=12;break e}e.msg=`invalid literal/length code`,n.mode=30;break e}x=65535&y,(b&=15)&&(m<b&&(p+=T[r++]<<m,m+=8),x+=p&(1<<b)-1,p>>>=b,m-=b),m<15&&(p+=T[r++]<<m,m+=8,p+=T[r++]<<m,m+=8),y=g[p&v];r:for(;;){if(p>>>=b=y>>>24,m-=b,!(16&(b=y>>>16&255))){if(!(64&b)){y=g[(65535&y)+(p&(1<<b)-1)];continue r}e.msg=`invalid distance code`,n.mode=30;break e}if(S=65535&y,m<(b&=15)&&(p+=T[r++]<<m,(m+=8)<b&&(p+=T[r++]<<m,m+=8)),c<(S+=p&(1<<b)-1)){e.msg=`invalid distance too far back`,n.mode=30;break e}if(p>>>=b,m-=b,(b=a-o)<S){if(u<(b=S-b)&&n.sane){e.msg=`invalid distance too far back`,n.mode=30;break e}if(w=f,(C=0)===d){if(C+=l-b,b<x){for(x-=b;E[a++]=f[C++],--b;);C=a-S,w=E}}else if(d<b){if(C+=l+d-b,(b-=d)<x){for(x-=b;E[a++]=f[C++],--b;);if(C=0,d<x){for(x-=b=d;E[a++]=f[C++],--b;);C=a-S,w=E}}}else if(C+=d-b,b<x){for(x-=b;E[a++]=f[C++],--b;);C=a-S,w=E}for(;2<x;)E[a++]=w[C++],E[a++]=w[C++],E[a++]=w[C++],x-=3;x&&(E[a++]=w[C++],1<x&&(E[a++]=w[C++]))}else{for(C=a-S;E[a++]=E[C++],E[a++]=E[C++],E[a++]=E[C++],2<(x-=3););x&&(E[a++]=E[C++],1<x&&(E[a++]=E[C++]))}break}}break}}while(r<i&&a<s);r-=x=m>>3,p&=(1<<(m-=x<<3))-1,e.next_in=r,e.next_out=a,e.avail_in=r<i?i-r+5:5-(r-i),e.avail_out=a<s?s-a+257:257-(a-s),n.hold=p,n.bits=m}},{}],49:[function(e,t,n){var r=e(`../utils/common`),i=e(`./adler32`),a=e(`./crc32`),o=e(`./inffast`),s=e(`./inftrees`),c=1,l=2,u=0,d=-2,f=1,p=852,m=592;function h(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function g(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new r.Buf16(320),this.work=new r.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function _(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg=``,t.wrap&&(e.adler=1&t.wrap),t.mode=f,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new r.Buf32(p),t.distcode=t.distdyn=new r.Buf32(m),t.sane=1,t.back=-1,u):d}function v(e){var t;return e&&e.state?((t=e.state).wsize=0,t.whave=0,t.wnext=0,_(e)):d}function y(e,t){var n,r;return e&&e.state?(r=e.state,t<0?(n=0,t=-t):(n=1+(t>>4),t<48&&(t&=15)),t&&(t<8||15<t)?d:(r.window!==null&&r.wbits!==t&&(r.window=null),r.wrap=n,r.wbits=t,v(e))):d}function b(e,t){var n,r;return e?(r=new g,(e.state=r).window=null,(n=y(e,t))!==u&&(e.state=null),n):d}var x,S,C=!0;function w(e){if(C){var t;for(x=new r.Buf32(512),S=new r.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(s(c,e.lens,0,288,x,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;s(l,e.lens,0,32,S,0,e.work,{bits:5}),C=!1}e.lencode=x,e.lenbits=9,e.distcode=S,e.distbits=5}function T(e,t,n,i){var a,o=e.state;return o.window===null&&(o.wsize=1<<o.wbits,o.wnext=0,o.whave=0,o.window=new r.Buf8(o.wsize)),i>=o.wsize?(r.arraySet(o.window,t,n-o.wsize,o.wsize,0),o.wnext=0,o.whave=o.wsize):(i<(a=o.wsize-o.wnext)&&(a=i),r.arraySet(o.window,t,n-i,a,o.wnext),(i-=a)?(r.arraySet(o.window,t,n-i,i,0),o.wnext=i,o.whave=o.wsize):(o.wnext+=a,o.wnext===o.wsize&&(o.wnext=0),o.whave<o.wsize&&(o.whave+=a))),0}n.inflateReset=v,n.inflateReset2=y,n.inflateResetKeep=_,n.inflateInit=function(e){return b(e,15)},n.inflateInit2=b,n.inflate=function(e,t){var n,p,m,g,_,v,y,b,x,S,C,E,D,O,k,A,j,M,ee,te,N,P,F,I,ne=0,L=new r.Buf8(4),re=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&e.avail_in!==0)return d;(n=e.state).mode===12&&(n.mode=13),_=e.next_out,m=e.output,y=e.avail_out,g=e.next_in,p=e.input,v=e.avail_in,b=n.hold,x=n.bits,S=v,C=y,P=u;e:for(;;)switch(n.mode){case f:if(n.wrap===0){n.mode=13;break}for(;x<16;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(2&n.wrap&&b===35615){L[n.check=0]=255&b,L[1]=b>>>8&255,n.check=a(n.check,L,2,0),x=b=0,n.mode=2;break}if(n.flags=0,n.head&&(n.head.done=!1),!(1&n.wrap)||(((255&b)<<8)+(b>>8))%31){e.msg=`incorrect header check`,n.mode=30;break}if((15&b)!=8){e.msg=`unknown compression method`,n.mode=30;break}if(x-=4,N=8+(15&(b>>>=4)),n.wbits===0)n.wbits=N;else if(N>n.wbits){e.msg=`invalid window size`,n.mode=30;break}n.dmax=1<<N,e.adler=n.check=1,n.mode=512&b?10:12,x=b=0;break;case 2:for(;x<16;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(n.flags=b,(255&n.flags)!=8){e.msg=`unknown compression method`,n.mode=30;break}if(57344&n.flags){e.msg=`unknown header flags set`,n.mode=30;break}n.head&&(n.head.text=b>>8&1),512&n.flags&&(L[0]=255&b,L[1]=b>>>8&255,n.check=a(n.check,L,2,0)),x=b=0,n.mode=3;case 3:for(;x<32;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}n.head&&(n.head.time=b),512&n.flags&&(L[0]=255&b,L[1]=b>>>8&255,L[2]=b>>>16&255,L[3]=b>>>24&255,n.check=a(n.check,L,4,0)),x=b=0,n.mode=4;case 4:for(;x<16;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}n.head&&(n.head.xflags=255&b,n.head.os=b>>8),512&n.flags&&(L[0]=255&b,L[1]=b>>>8&255,n.check=a(n.check,L,2,0)),x=b=0,n.mode=5;case 5:if(1024&n.flags){for(;x<16;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}n.length=b,n.head&&(n.head.extra_len=b),512&n.flags&&(L[0]=255&b,L[1]=b>>>8&255,n.check=a(n.check,L,2,0)),x=b=0}else n.head&&(n.head.extra=null);n.mode=6;case 6:if(1024&n.flags&&(v<(E=n.length)&&(E=v),E&&(n.head&&(N=n.head.extra_len-n.length,n.head.extra||(n.head.extra=Array(n.head.extra_len)),r.arraySet(n.head.extra,p,g,E,N)),512&n.flags&&(n.check=a(n.check,p,E,g)),v-=E,g+=E,n.length-=E),n.length))break e;n.length=0,n.mode=7;case 7:if(2048&n.flags){if(v===0)break e;for(E=0;N=p[g+E++],n.head&&N&&n.length<65536&&(n.head.name+=String.fromCharCode(N)),N&&E<v;);if(512&n.flags&&(n.check=a(n.check,p,E,g)),v-=E,g+=E,N)break e}else n.head&&(n.head.name=null);n.length=0,n.mode=8;case 8:if(4096&n.flags){if(v===0)break e;for(E=0;N=p[g+E++],n.head&&N&&n.length<65536&&(n.head.comment+=String.fromCharCode(N)),N&&E<v;);if(512&n.flags&&(n.check=a(n.check,p,E,g)),v-=E,g+=E,N)break e}else n.head&&(n.head.comment=null);n.mode=9;case 9:if(512&n.flags){for(;x<16;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(b!==(65535&n.check)){e.msg=`header crc mismatch`,n.mode=30;break}x=b=0}n.head&&(n.head.hcrc=n.flags>>9&1,n.head.done=!0),e.adler=n.check=0,n.mode=12;break;case 10:for(;x<32;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}e.adler=n.check=h(b),x=b=0,n.mode=11;case 11:if(n.havedict===0)return e.next_out=_,e.avail_out=y,e.next_in=g,e.avail_in=v,n.hold=b,n.bits=x,2;e.adler=n.check=1,n.mode=12;case 12:if(t===5||t===6)break e;case 13:if(n.last){b>>>=7&x,x-=7&x,n.mode=27;break}for(;x<3;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}switch(n.last=1&b,--x,3&(b>>>=1)){case 0:n.mode=14;break;case 1:if(w(n),n.mode=20,t!==6)break;b>>>=2,x-=2;break e;case 2:n.mode=17;break;case 3:e.msg=`invalid block type`,n.mode=30}b>>>=2,x-=2;break;case 14:for(b>>>=7&x,x-=7&x;x<32;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if((65535&b)!=(b>>>16^65535)){e.msg=`invalid stored block lengths`,n.mode=30;break}if(n.length=65535&b,x=b=0,n.mode=15,t===6)break e;case 15:n.mode=16;case 16:if(E=n.length){if(v<E&&(E=v),y<E&&(E=y),E===0)break e;r.arraySet(m,p,g,E,_),v-=E,g+=E,y-=E,_+=E,n.length-=E;break}n.mode=12;break;case 17:for(;x<14;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(n.nlen=257+(31&b),b>>>=5,x-=5,n.ndist=1+(31&b),b>>>=5,x-=5,n.ncode=4+(15&b),b>>>=4,x-=4,286<n.nlen||30<n.ndist){e.msg=`too many length or distance symbols`,n.mode=30;break}n.have=0,n.mode=18;case 18:for(;n.have<n.ncode;){for(;x<3;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}n.lens[re[n.have++]]=7&b,b>>>=3,x-=3}for(;n.have<19;)n.lens[re[n.have++]]=0;if(n.lencode=n.lendyn,n.lenbits=7,F={bits:n.lenbits},P=s(0,n.lens,0,19,n.lencode,0,n.work,F),n.lenbits=F.bits,P){e.msg=`invalid code lengths set`,n.mode=30;break}n.have=0,n.mode=19;case 19:for(;n.have<n.nlen+n.ndist;){for(;A=(ne=n.lencode[b&(1<<n.lenbits)-1])>>>16&255,j=65535&ne,!((k=ne>>>24)<=x);){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(j<16)b>>>=k,x-=k,n.lens[n.have++]=j;else{if(j===16){for(I=k+2;x<I;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(b>>>=k,x-=k,n.have===0){e.msg=`invalid bit length repeat`,n.mode=30;break}N=n.lens[n.have-1],E=3+(3&b),b>>>=2,x-=2}else if(j===17){for(I=k+3;x<I;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}x-=k,N=0,E=3+(7&(b>>>=k)),b>>>=3,x-=3}else{for(I=k+7;x<I;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}x-=k,N=0,E=11+(127&(b>>>=k)),b>>>=7,x-=7}if(n.have+E>n.nlen+n.ndist){e.msg=`invalid bit length repeat`,n.mode=30;break}for(;E--;)n.lens[n.have++]=N}}if(n.mode===30)break;if(n.lens[256]===0){e.msg=`invalid code -- missing end-of-block`,n.mode=30;break}if(n.lenbits=9,F={bits:n.lenbits},P=s(c,n.lens,0,n.nlen,n.lencode,0,n.work,F),n.lenbits=F.bits,P){e.msg=`invalid literal/lengths set`,n.mode=30;break}if(n.distbits=6,n.distcode=n.distdyn,F={bits:n.distbits},P=s(l,n.lens,n.nlen,n.ndist,n.distcode,0,n.work,F),n.distbits=F.bits,P){e.msg=`invalid distances set`,n.mode=30;break}if(n.mode=20,t===6)break e;case 20:n.mode=21;case 21:if(6<=v&&258<=y){e.next_out=_,e.avail_out=y,e.next_in=g,e.avail_in=v,n.hold=b,n.bits=x,o(e,C),_=e.next_out,m=e.output,y=e.avail_out,g=e.next_in,p=e.input,v=e.avail_in,b=n.hold,x=n.bits,n.mode===12&&(n.back=-1);break}for(n.back=0;A=(ne=n.lencode[b&(1<<n.lenbits)-1])>>>16&255,j=65535&ne,!((k=ne>>>24)<=x);){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(A&&!(240&A)){for(M=k,ee=A,te=j;A=(ne=n.lencode[te+((b&(1<<M+ee)-1)>>M)])>>>16&255,j=65535&ne,!(M+(k=ne>>>24)<=x);){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}b>>>=M,x-=M,n.back+=M}if(b>>>=k,x-=k,n.back+=k,n.length=j,A===0){n.mode=26;break}if(32&A){n.back=-1,n.mode=12;break}if(64&A){e.msg=`invalid literal/length code`,n.mode=30;break}n.extra=15&A,n.mode=22;case 22:if(n.extra){for(I=n.extra;x<I;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}n.length+=b&(1<<n.extra)-1,b>>>=n.extra,x-=n.extra,n.back+=n.extra}n.was=n.length,n.mode=23;case 23:for(;A=(ne=n.distcode[b&(1<<n.distbits)-1])>>>16&255,j=65535&ne,!((k=ne>>>24)<=x);){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(!(240&A)){for(M=k,ee=A,te=j;A=(ne=n.distcode[te+((b&(1<<M+ee)-1)>>M)])>>>16&255,j=65535&ne,!(M+(k=ne>>>24)<=x);){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}b>>>=M,x-=M,n.back+=M}if(b>>>=k,x-=k,n.back+=k,64&A){e.msg=`invalid distance code`,n.mode=30;break}n.offset=j,n.extra=15&A,n.mode=24;case 24:if(n.extra){for(I=n.extra;x<I;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}n.offset+=b&(1<<n.extra)-1,b>>>=n.extra,x-=n.extra,n.back+=n.extra}if(n.offset>n.dmax){e.msg=`invalid distance too far back`,n.mode=30;break}n.mode=25;case 25:if(y===0)break e;if(E=C-y,n.offset>E){if((E=n.offset-E)>n.whave&&n.sane){e.msg=`invalid distance too far back`,n.mode=30;break}D=E>n.wnext?(E-=n.wnext,n.wsize-E):n.wnext-E,E>n.length&&(E=n.length),O=n.window}else O=m,D=_-n.offset,E=n.length;for(y<E&&(E=y),y-=E,n.length-=E;m[_++]=O[D++],--E;);n.length===0&&(n.mode=21);break;case 26:if(y===0)break e;m[_++]=n.length,y--,n.mode=21;break;case 27:if(n.wrap){for(;x<32;){if(v===0)break e;v--,b|=p[g++]<<x,x+=8}if(C-=y,e.total_out+=C,n.total+=C,C&&(e.adler=n.check=n.flags?a(n.check,m,C,_-C):i(n.check,m,C,_-C)),C=y,(n.flags?b:h(b))!==n.check){e.msg=`incorrect data check`,n.mode=30;break}x=b=0}n.mode=28;case 28:if(n.wrap&&n.flags){for(;x<32;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(b!==(0|n.total)){e.msg=`incorrect length check`,n.mode=30;break}x=b=0}n.mode=29;case 29:P=1;break e;case 30:P=-3;break e;case 31:return-4;default:return d}return e.next_out=_,e.avail_out=y,e.next_in=g,e.avail_in=v,n.hold=b,n.bits=x,(n.wsize||C!==e.avail_out&&n.mode<30&&(n.mode<27||t!==4))&&T(e,e.output,e.next_out,C-e.avail_out)?(n.mode=31,-4):(S-=e.avail_in,C-=e.avail_out,e.total_in+=S,e.total_out+=C,n.total+=C,n.wrap&&C&&(e.adler=n.check=n.flags?a(n.check,m,C,e.next_out-C):i(n.check,m,C,e.next_out-C)),e.data_type=n.bits+(n.last?64:0)+(n.mode===12?128:0)+(n.mode===20||n.mode===15?256:0),(S==0&&C===0||t===4)&&P===u&&(P=-5),P)},n.inflateEnd=function(e){if(!e||!e.state)return d;var t=e.state;return t.window&&=null,e.state=null,u},n.inflateGetHeader=function(e,t){var n;return e&&e.state&&2&(n=e.state).wrap?((n.head=t).done=!1,u):d},n.inflateSetDictionary=function(e,t){var n,r=t.length;return e&&e.state?(n=e.state).wrap!==0&&n.mode!==11?d:n.mode===11&&i(1,t,r,0)!==n.check?-3:T(e,t,r,r)?(n.mode=31,-4):(n.havedict=1,u):d},n.inflateInfo=`pako inflate (from Nodeca project)`},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,t,n){var r=e(`../utils/common`),i=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],a=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],o=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],s=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,n,c,l,u,d,f){var p,m,h,g,_,v,y,b,x,S=f.bits,C=0,w=0,T=0,E=0,D=0,O=0,k=0,A=0,j=0,M=0,ee=null,te=0,N=new r.Buf16(16),P=new r.Buf16(16),F=null,I=0;for(C=0;C<=15;C++)N[C]=0;for(w=0;w<c;w++)N[t[n+w]]++;for(D=S,E=15;1<=E&&N[E]===0;E--);if(E<D&&(D=E),E===0)return l[u++]=20971520,l[u++]=20971520,f.bits=1,0;for(T=1;T<E&&N[T]===0;T++);for(D<T&&(D=T),C=A=1;C<=15;C++)if(A<<=1,(A-=N[C])<0)return-1;if(0<A&&(e===0||E!==1))return-1;for(P[1]=0,C=1;C<15;C++)P[C+1]=P[C]+N[C];for(w=0;w<c;w++)t[n+w]!==0&&(d[P[t[n+w]]++]=w);if(v=e===0?(ee=F=d,19):e===1?(ee=i,te-=257,F=a,I-=257,256):(ee=o,F=s,-1),C=T,_=u,k=w=M=0,h=-1,g=(j=1<<(O=D))-1,e===1&&852<j||e===2&&592<j)return 1;for(;;){for(y=C-k,x=d[w]<v?(b=0,d[w]):d[w]>v?(b=F[I+d[w]],ee[te+d[w]]):(b=96,0),p=1<<C-k,T=m=1<<O;l[_+(M>>k)+(m-=p)]=y<<24|b<<16|x,m!==0;);for(p=1<<C-1;M&p;)p>>=1;if(p===0?M=0:(M&=p-1,M+=p),w++,--N[C]==0){if(C===E)break;C=t[n+d[w]]}if(D<C&&(M&g)!==h){for(k===0&&(k=D),_+=T,A=1<<(O=C-k);O+k<E&&!((A-=N[O+k])<=0);)O++,A<<=1;if(j+=1<<O,e===1&&852<j||e===2&&592<j)return 1;l[h=M&g]=D<<24|O<<16|_-u}}return M!==0&&(l[_+M]=C-k<<24|4194304),f.bits=D,0}},{"../utils/common":41}],51:[function(e,t,n){t.exports={2:`need dictionary`,1:`stream end`,0:``,"-1":`file error`,"-2":`stream error`,"-3":`data error`,"-4":`insufficient memory`,"-5":`buffer error`,"-6":`incompatible version`}},{}],52:[function(e,t,n){var r=e(`../utils/common`),i=0,a=1;function o(e){for(var t=e.length;0<=--t;)e[t]=0}var s=0,c=29,l=256,u=l+1+c,d=30,f=19,p=2*u+1,m=15,h=16,g=7,_=256,v=16,y=17,b=18,x=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],S=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],C=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],w=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],T=Array(2*(u+2));o(T);var E=Array(2*d);o(E);var D=Array(512);o(D);var O=Array(256);o(O);var k=Array(c);o(k);var A,j,M,ee=Array(d);function te(e,t,n,r,i){this.static_tree=e,this.extra_bits=t,this.extra_base=n,this.elems=r,this.max_length=i,this.has_stree=e&&e.length}function N(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t}function P(e){return e<256?D[e]:D[256+(e>>>7)]}function F(e,t){e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255}function I(e,t,n){e.bi_valid>h-n?(e.bi_buf|=t<<e.bi_valid&65535,F(e,e.bi_buf),e.bi_buf=t>>h-e.bi_valid,e.bi_valid+=n-h):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=n)}function ne(e,t,n){I(e,n[2*t],n[2*t+1])}function L(e,t){for(var n=0;n|=1&e,e>>>=1,n<<=1,0<--t;);return n>>>1}function re(e,t,n){var r,i,a=Array(m+1),o=0;for(r=1;r<=m;r++)a[r]=o=o+n[r-1]<<1;for(i=0;i<=t;i++){var s=e[2*i+1];s!==0&&(e[2*i]=L(a[s]++,s))}}function R(e){for(var t=0;t<u;t++)e.dyn_ltree[2*t]=0;for(t=0;t<d;t++)e.dyn_dtree[2*t]=0;for(t=0;t<f;t++)e.bl_tree[2*t]=0;e.dyn_ltree[2*_]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0}function ie(e){8<e.bi_valid?F(e,e.bi_buf):0<e.bi_valid&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0}function ae(e,t,n,r){var i=2*t,a=2*n;return e[i]<e[a]||e[i]===e[a]&&r[t]<=r[n]}function oe(e,t,n){for(var r=e.heap[n],i=n<<1;i<=e.heap_len&&(i<e.heap_len&&ae(t,e.heap[i+1],e.heap[i],e.depth)&&i++,!ae(t,r,e.heap[i],e.depth));)e.heap[n]=e.heap[i],n=i,i<<=1;e.heap[n]=r}function se(e,t,n){var r,i,a,o,s=0;if(e.last_lit!==0)for(;r=e.pending_buf[e.d_buf+2*s]<<8|e.pending_buf[e.d_buf+2*s+1],i=e.pending_buf[e.l_buf+s],s++,r===0?ne(e,i,t):(ne(e,(a=O[i])+l+1,t),(o=x[a])!==0&&I(e,i-=k[a],o),ne(e,a=P(--r),n),(o=S[a])!==0&&I(e,r-=ee[a],o)),s<e.last_lit;);ne(e,_,t)}function ce(e,t){var n,r,i,a=t.dyn_tree,o=t.stat_desc.static_tree,s=t.stat_desc.has_stree,c=t.stat_desc.elems,l=-1;for(e.heap_len=0,e.heap_max=p,n=0;n<c;n++)a[2*n]===0?a[2*n+1]=0:(e.heap[++e.heap_len]=l=n,e.depth[n]=0);for(;e.heap_len<2;)a[2*(i=e.heap[++e.heap_len]=l<2?++l:0)]=1,e.depth[i]=0,e.opt_len--,s&&(e.static_len-=o[2*i+1]);for(t.max_code=l,n=e.heap_len>>1;1<=n;n--)oe(e,a,n);for(i=c;n=e.heap[1],e.heap[1]=e.heap[e.heap_len--],oe(e,a,1),r=e.heap[1],e.heap[--e.heap_max]=n,e.heap[--e.heap_max]=r,a[2*i]=a[2*n]+a[2*r],e.depth[i]=(e.depth[n]>=e.depth[r]?e.depth[n]:e.depth[r])+1,a[2*n+1]=a[2*r+1]=i,e.heap[1]=i++,oe(e,a,1),2<=e.heap_len;);e.heap[--e.heap_max]=e.heap[1],function(e,t){var n,r,i,a,o,s,c=t.dyn_tree,l=t.max_code,u=t.stat_desc.static_tree,d=t.stat_desc.has_stree,f=t.stat_desc.extra_bits,h=t.stat_desc.extra_base,g=t.stat_desc.max_length,_=0;for(a=0;a<=m;a++)e.bl_count[a]=0;for(c[2*e.heap[e.heap_max]+1]=0,n=e.heap_max+1;n<p;n++)g<(a=c[2*c[2*(r=e.heap[n])+1]+1]+1)&&(a=g,_++),c[2*r+1]=a,l<r||(e.bl_count[a]++,o=0,h<=r&&(o=f[r-h]),s=c[2*r],e.opt_len+=s*(a+o),d&&(e.static_len+=s*(u[2*r+1]+o)));if(_!==0){do{for(a=g-1;e.bl_count[a]===0;)a--;e.bl_count[a]--,e.bl_count[a+1]+=2,e.bl_count[g]--,_-=2}while(0<_);for(a=g;a!==0;a--)for(r=e.bl_count[a];r!==0;)l<(i=e.heap[--n])||(c[2*i+1]!==a&&(e.opt_len+=(a-c[2*i+1])*c[2*i],c[2*i+1]=a),r--)}}(e,t),re(a,l,e.bl_count)}function le(e,t,n){var r,i,a=-1,o=t[1],s=0,c=7,l=4;for(o===0&&(c=138,l=3),t[2*(n+1)+1]=65535,r=0;r<=n;r++)i=o,o=t[2*(r+1)+1],++s<c&&i===o||(s<l?e.bl_tree[2*i]+=s:i===0?s<=10?e.bl_tree[2*y]++:e.bl_tree[2*b]++:(i!==a&&e.bl_tree[2*i]++,e.bl_tree[2*v]++),a=i,l=(s=0)===o?(c=138,3):i===o?(c=6,3):(c=7,4))}function ue(e,t,n){var r,i,a=-1,o=t[1],s=0,c=7,l=4;for(o===0&&(c=138,l=3),r=0;r<=n;r++)if(i=o,o=t[2*(r+1)+1],!(++s<c&&i===o)){if(s<l)for(;ne(e,i,e.bl_tree),--s!=0;);else i===0?s<=10?(ne(e,y,e.bl_tree),I(e,s-3,3)):(ne(e,b,e.bl_tree),I(e,s-11,7)):(i!==a&&(ne(e,i,e.bl_tree),s--),ne(e,v,e.bl_tree),I(e,s-3,2));a=i,l=(s=0)===o?(c=138,3):i===o?(c=6,3):(c=7,4)}}o(ee);var de=!1;function fe(e,t,n,i){I(e,(s<<1)+ +!!i,3),function(e,t,n,i){ie(e),F(e,n),F(e,~n),r.arraySet(e.pending_buf,e.window,t,n,e.pending),e.pending+=n}(e,t,n,!0)}n._tr_init=function(e){de||=(function(){var e,t,n,r,i,a=Array(m+1);for(r=n=0;r<c-1;r++)for(k[r]=n,e=0;e<1<<x[r];e++)O[n++]=r;for(O[n-1]=r,r=i=0;r<16;r++)for(ee[r]=i,e=0;e<1<<S[r];e++)D[i++]=r;for(i>>=7;r<d;r++)for(ee[r]=i<<7,e=0;e<1<<S[r]-7;e++)D[256+i++]=r;for(t=0;t<=m;t++)a[t]=0;for(e=0;e<=143;)T[2*e+1]=8,e++,a[8]++;for(;e<=255;)T[2*e+1]=9,e++,a[9]++;for(;e<=279;)T[2*e+1]=7,e++,a[7]++;for(;e<=287;)T[2*e+1]=8,e++,a[8]++;for(re(T,u+1,a),e=0;e<d;e++)E[2*e+1]=5,E[2*e]=L(e,5);A=new te(T,x,l+1,u,m),j=new te(E,S,0,d,m),M=new te([],C,0,f,g)}(),!0),e.l_desc=new N(e.dyn_ltree,A),e.d_desc=new N(e.dyn_dtree,j),e.bl_desc=new N(e.bl_tree,M),e.bi_buf=0,e.bi_valid=0,R(e)},n._tr_stored_block=fe,n._tr_flush_block=function(e,t,n,r){var o,s,c=0;0<e.level?(e.strm.data_type===2&&(e.strm.data_type=function(e){var t,n=4093624447;for(t=0;t<=31;t++,n>>>=1)if(1&n&&e.dyn_ltree[2*t]!==0)return i;if(e.dyn_ltree[18]!==0||e.dyn_ltree[20]!==0||e.dyn_ltree[26]!==0)return a;for(t=32;t<l;t++)if(e.dyn_ltree[2*t]!==0)return a;return i}(e)),ce(e,e.l_desc),ce(e,e.d_desc),c=function(e){var t;for(le(e,e.dyn_ltree,e.l_desc.max_code),le(e,e.dyn_dtree,e.d_desc.max_code),ce(e,e.bl_desc),t=f-1;3<=t&&e.bl_tree[2*w[t]+1]===0;t--);return e.opt_len+=3*(t+1)+5+5+4,t}(e),o=e.opt_len+3+7>>>3,(s=e.static_len+3+7>>>3)<=o&&(o=s)):o=s=n+5,n+4<=o&&t!==-1?fe(e,t,n,r):e.strategy===4||s===o?(I(e,2+ +!!r,3),se(e,T,E)):(I(e,4+ +!!r,3),function(e,t,n,r){var i;for(I(e,t-257,5),I(e,n-1,5),I(e,r-4,4),i=0;i<r;i++)I(e,e.bl_tree[2*w[i]+1],3);ue(e,e.dyn_ltree,t-1),ue(e,e.dyn_dtree,n-1)}(e,e.l_desc.max_code+1,e.d_desc.max_code+1,c+1),se(e,e.dyn_ltree,e.dyn_dtree)),R(e),r&&ie(e)},n._tr_tally=function(e,t,n){return e.pending_buf[e.d_buf+2*e.last_lit]=t>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&t,e.pending_buf[e.l_buf+e.last_lit]=255&n,e.last_lit++,t===0?e.dyn_ltree[2*n]++:(e.matches++,t--,e.dyn_ltree[2*(O[n]+l+1)]++,e.dyn_dtree[2*P(t)]++),e.last_lit===e.lit_bufsize-1},n._tr_align=function(e){I(e,2,3),ne(e,_,T),function(e){e.bi_valid===16?(F(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):8<=e.bi_valid&&(e.pending_buf[e.pending++]=255&e.bi_buf,e.bi_buf>>=8,e.bi_valid-=8)}(e)}},{"../utils/common":41}],53:[function(e,t,n){t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg=``,this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,t,n){(function(e){(function(e,t){if(!e.setImmediate){var n,r,i,a,o=1,s={},c=!1,l=e.document,u=Object.getPrototypeOf&&Object.getPrototypeOf(e);u=u&&u.setTimeout?u:e,n={}.toString.call(e.process)===`[object process]`?function(e){process.nextTick(function(){f(e)})}:function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage(``,`*`),e.onmessage=n,t}}()?(a=`setImmediate$`+Math.random()+`$`,e.addEventListener?e.addEventListener(`message`,p,!1):e.attachEvent(`onmessage`,p),function(t){e.postMessage(a+t,`*`)}):e.MessageChannel?((i=new MessageChannel).port1.onmessage=function(e){f(e.data)},function(e){i.port2.postMessage(e)}):l&&`onreadystatechange`in l.createElement(`script`)?(r=l.documentElement,function(e){var t=l.createElement(`script`);t.onreadystatechange=function(){f(e),t.onreadystatechange=null,r.removeChild(t),t=null},r.appendChild(t)}):function(e){setTimeout(f,0,e)},u.setImmediate=function(e){typeof e!=`function`&&(e=Function(``+e));for(var t=Array(arguments.length-1),r=0;r<t.length;r++)t[r]=arguments[r+1];return s[o]={callback:e,args:t},n(o),o++},u.clearImmediate=d}function d(e){delete s[e]}function f(e){if(c)setTimeout(f,0,e);else{var n=s[e];if(n){c=!0;try{(function(e){var n=e.callback,r=e.args;switch(r.length){case 0:n();break;case 1:n(r[0]);break;case 2:n(r[0],r[1]);break;case 3:n(r[0],r[1],r[2]);break;default:n.apply(t,r)}})(n)}finally{d(e),c=!1}}}}function p(t){t.source===e&&typeof t.data==`string`&&t.data.indexOf(a)===0&&f(+t.data.slice(a.length))}})(typeof self>`u`?e===void 0?this:e:self)}).call(this,typeof global<`u`?global:typeof self<`u`?self:typeof window<`u`?window:{})},{}]},{},[10])(10)})}))(),1);async function f(e,t=()=>{}){t(`Reading file "${e.name}" (${(e.size/1048576).toFixed(1)} MB)...`);let n=await e.arrayBuffer();t(`Decoding audio track via Web Audio API...`);let r=new(window.AudioContext||window.webkitAudioContext)({sampleRate:44100});try{let i=await r.decodeAudioData(n),a=i.duration;t(`Resampling to 44.1kHz Stereo (${a.toFixed(1)}s)...`);let o,s;if(i.sampleRate===44100&&i.numberOfChannels===2)o=i.getChannelData(0),s=i.getChannelData(1);else{let e=new OfflineAudioContext(2,Math.ceil(a*44100),44100),t=e.createBufferSource();t.buffer=i,t.connect(e.destination),t.start(0);let n=await e.startRendering();o=n.getChannelData(0),s=n.getChannelData(1)}return await r.close(),{name:e.name,duration:a,sampleRate:44100,left:new Float32Array(o),right:new Float32Array(s),originalFile:e}}catch(e){throw await r.close(),Error(`Failed to decode audio track: ${e.message}. Please ensure the file contains a valid audio stream.`)}}function p(e,t,n=44100){let r=e.length,i=new Float32Array(r),a=new Float32Array(r),o=new Float32Array(r),s=new Float32Array(r);for(let n=0;n<r;n++){let r=e[n],c=t[n],l=(r-c)*.7071;i[n]=l,a[n]=-l;let u=(r+c)*.5;o[n]=u,s[n]=u}return{vocals:{left:o,right:s},no_vocals:{left:i,right:a},drums:{left:i,right:a},bass:{left:new Float32Array(r),right:new Float32Array(r)},other:{left:i,right:a}}}function m(e,t){let n=new Float32Array(t),r=new Float32Array(t);for(let i of e)if(i&&i.left)for(let e=0;e<t;e++)n[e]+=i.left[e],r[e]+=i.right[e];return{left:n,right:r}}function h(e,t,n=44100){let r=e.length,i=n*2*2,a=r*2*2,o=44+a,s=new ArrayBuffer(o),c=new DataView(s);function l(e,t){for(let n=0;n<t.length;n++)c.setUint8(e+n,t.charCodeAt(n))}l(0,`RIFF`),c.setUint32(4,o-8,!0),l(8,`WAVE`),l(12,`fmt `),c.setUint32(16,16,!0),c.setUint16(20,1,!0),c.setUint16(22,2,!0),c.setUint32(24,n,!0),c.setUint32(28,i,!0),c.setUint16(32,4,!0),c.setUint16(34,16,!0),l(36,`data`),c.setUint32(40,a,!0);let u=44;for(let n=0;n<r;n++){let r=Math.max(-1,Math.min(1,e[n])),i=r<0?r*32768:r*32767;c.setInt16(u,i,!0),u+=2;let a=Math.max(-1,Math.min(1,t[n])),o=a<0?a*32768:a*32767;c.setInt16(u,o,!0),u+=2}return new Blob([s],{type:`audio/wav`})}function g(e,t){let n=URL.createObjectURL(e),r=document.createElement(`a`);r.style.display=`none`,r.href=n,r.download=t,document.body.appendChild(r),r.click(),setTimeout(()=>{document.body.removeChild(r),URL.revokeObjectURL(n)},100)}async function _(e,t=`stems`){let n=new d.default,r=n.folder(t);for(let[t,n]of Object.entries(e))r.file(`${t}.wav`,n);g(await n.generateAsync({type:`blob`}),`${t}_separated_stems.zip`)}var v=s({InferenceSession:()=>Re,LoraAdapter:()=>Be,TRACE:()=>ae,TRACE_EVENT_BEGIN:()=>le,TRACE_EVENT_END:()=>ue,TRACE_FUNC_BEGIN:()=>se,TRACE_FUNC_END:()=>ce,Tensor:()=>Pe,default:()=>yf,env:()=>R,registerBackend:()=>j}),y=Object.defineProperty,b=Object.getOwnPropertyDescriptor,x=Object.getOwnPropertyNames,S=Object.prototype.hasOwnProperty,C=(e=>typeof u<`u`?u:typeof Proxy<`u`?new Proxy(e,{get:(e,t)=>(typeof u<`u`?u:e)[t]}):e)(function(e){if(typeof u<`u`)return u.apply(this,arguments);throw Error(`Dynamic require of "`+e+`" is not supported`)}),w=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},T=(e,t)=>{for(var n in t)y(e,n,{get:t[n],enumerable:!0})},E=(e,t,n,r)=>{if(t&&typeof t==`object`||typeof t==`function`)for(let i of x(t))!S.call(e,i)&&i!==n&&y(e,i,{get:()=>t[i],enumerable:!(r=b(t,i))||r.enumerable});return e},D=e=>E(y({},`__esModule`,{value:!0}),e),O,k,A,j,M,ee,te,N=w(()=>{O=new Map,k=[],A=new WeakMap,j=(e,t,n)=>{if(t&&typeof t.init==`function`&&typeof t.createInferenceSessionHandler==`function`){let r=O.get(e);if(r===void 0)O.set(e,{backend:t,priority:n});else{if(r.priority>n)return;if(r.priority===n&&r.backend!==t)throw Error(`cannot register backend "${e}" using priority ${n}`)}if(n>=0){let t=k.indexOf(e);t!==-1&&k.splice(t,1);for(let t=0;t<k.length;t++)if(O.get(k[t]).priority<=n){k.splice(t,0,e);return}k.push(e)}}else throw TypeError(`not a valid backend`)},M=async e=>{let t=O.get(e);if(!t)return`backend not found.`;if(t.initialized)return t.backend;if(t.aborted)return t.error;{let n=!!t.initPromise;try{if(!n){let n=t.backend,r=A.get(n);t.initPromise=r?r.then(async()=>n.init(e),async()=>n.init(e)):n.init(e),A.set(n,t.initPromise)}return await t.initPromise,t.initialized=!0,t.backend}catch(e){return n||(t.error=`${e}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},ee=async e=>{let t=e.executionProviders||[],n=t.map(e=>typeof e==`string`?e:e.name),r=n.length===0?k:n,i,a=[],o=new Set;for(let e of r){let t=await M(e);typeof t==`string`?a.push({name:e,err:t}):(i||=t,i===t&&o.add(e))}if(!i)throw Error(`no available backend found. ERR: ${a.map(e=>`[${e.name}] ${e.err}`).join(`, `)}`);for(let{name:e,err:t}of a)n.includes(e)&&console.warn(`removing requested execution provider "${e}" from session options because it is not available: ${t}`);let s=t.filter(e=>o.has(typeof e==`string`?e:e.name));return[i,new Proxy(e,{get:(e,t)=>t===`executionProviders`?s:Reflect.get(e,t)})]},te=async()=>{let e=[];for(let t of k){if(typeof O.get(t).backend.createLoraAdapterHandler!=`function`)continue;let n=await M(t);if(typeof n!=`string`)return n;e.push({name:t,err:n})}let t=e.length===0?``:` ERR: ${e.map(e=>`[${e.name}] ${e.err}`).join(`, `)}`;throw Error(`no available backend supports LoRA adapters.${t}`)}}),P=w(()=>{N()}),F,I=w(()=>{F=`1.31.1`}),ne,L,re=w(()=>{I(),ne=`warning`,L={wasm:{},webgl:{},webgpu:{},versions:{common:F},set logLevel(e){if(e!==void 0){if(typeof e!=`string`||[`verbose`,`info`,`warning`,`error`,`fatal`].indexOf(e)===-1)throw Error(`Unsupported logging level: ${e}`);ne=e}},get logLevel(){return ne}},Object.defineProperty(L,"logLevel",{enumerable:!0})}),R,ie=w(()=>{re(),R=L}),ae,oe,se,ce,le,ue,de=w(()=>{re(),ae=(e,t)=>{(typeof L.trace>`u`?!L.wasm.trace:!L.trace)||console.timeStamp(`${e}::ORT::${t}`)},oe=(e,t)=>{let n=Error().stack?.split(/\r\n|\r|\n/g)||[],r=!1;for(let i=0;i<n.length;i++){if(r&&!n[i].includes(`TRACE_FUNC`)){let r=`FUNC_${e}::${n[i].trim().split(` `)[1]}`;t&&(r+=`::${t}`),ae(`CPU`,r);return}n[i].includes(`TRACE_FUNC`)&&(r=!0)}},se=e=>{(typeof L.trace>`u`?!L.wasm.trace:!L.trace)||oe(`BEGIN`,e)},ce=e=>{(typeof L.trace>`u`?!L.wasm.trace:!L.trace)||oe(`END`,e)},le=e=>{(typeof L.trace>`u`?!L.wasm.trace:!L.trace)||console.time(`ORT::${e}`)},ue=e=>{(typeof L.trace>`u`?!L.wasm.trace:!L.trace)||console.timeEnd(`ORT::${e}`)}}),fe,pe=w(()=>{N(),de(),fe=class e{constructor(e,t){this.backend=e,this.handler=t}static async create(t){if(se(),typeof t!=`string`&&!(t instanceof Uint8Array))throw TypeError(`Unexpected argument[0]: must be 'path' or 'buffer'.`);let n=await te(),r=await n.createLoraAdapterHandler(t);return ce(),new e(n,r)}async release(){return this.handler.dispose()}}}),me,he,ge=w(()=>{me=(e,t)=>{let n=typeof document<`u`?document.createElement(`canvas`):new OffscreenCanvas(1,1);n.width=e.dims[3],n.height=e.dims[2];let r=n.getContext(`2d`);if(r!=null){let i,a;t?.tensorLayout!==void 0&&t.tensorLayout===`NHWC`?(i=e.dims[2],a=e.dims[3]):(i=e.dims[3],a=e.dims[2]);let o=t?.format===void 0?`RGB`:t.format,s=t?.norm,c,l;s===void 0||s.mean===void 0?c=[255,255,255,255]:typeof s.mean==`number`?c=[s.mean,s.mean,s.mean,s.mean]:(c=[s.mean[0],s.mean[1],s.mean[2],0],s.mean[3]!==void 0&&(c[3]=s.mean[3])),s===void 0||s.bias===void 0?l=[0,0,0,0]:typeof s.bias==`number`?l=[s.bias,s.bias,s.bias,s.bias]:(l=[s.bias[0],s.bias[1],s.bias[2],0],s.bias[3]!==void 0&&(l[3]=s.bias[3]));let u=a*i,d=0,f=u,p=u*2,m=-1;o===`RGBA`?(d=0,f=u,p=u*2,m=u*3):o===`RGB`?(d=0,f=u,p=u*2):o===`RBG`&&(d=0,p=u,f=u*2);for(let t=0;t<a;t++)for(let n=0;n<i;n++){let i=(e.data[d++]-l[0])*c[0],a=(e.data[f++]-l[1])*c[1],o=(e.data[p++]-l[2])*c[2],s=m===-1?255:(e.data[m++]-l[3])*c[3];r.fillStyle=`rgba(`+i+`,`+a+`,`+o+`,`+s+`)`,r.fillRect(n,t,1,1)}if(`toDataURL`in n)return n.toDataURL();throw Error(`toDataURL is not supported`)}throw Error(`Can not access image data`)},he=(e,t)=>{let n=typeof document<`u`?document.createElement(`canvas`).getContext(`2d`):new OffscreenCanvas(1,1).getContext(`2d`),r;if(n!=null){let i,a,o;t?.tensorLayout!==void 0&&t.tensorLayout===`NHWC`?(i=e.dims[2],a=e.dims[1],o=e.dims[3]):(i=e.dims[3],a=e.dims[2],o=e.dims[1]);let s=t!==void 0&&t.format!==void 0?t.format:`RGB`,c=t?.norm,l,u;c===void 0||c.mean===void 0?l=[255,255,255,255]:typeof c.mean==`number`?l=[c.mean,c.mean,c.mean,c.mean]:(l=[c.mean[0],c.mean[1],c.mean[2],255],c.mean[3]!==void 0&&(l[3]=c.mean[3])),c===void 0||c.bias===void 0?u=[0,0,0,0]:typeof c.bias==`number`?u=[c.bias,c.bias,c.bias,c.bias]:(u=[c.bias[0],c.bias[1],c.bias[2],0],c.bias[3]!==void 0&&(u[3]=c.bias[3]));let d=a*i;if(t!==void 0&&(t.format!==void 0&&o===4&&t.format!==`RGBA`||o===3&&t.format!==`RGB`&&t.format!==`BGR`))throw Error(`Tensor format doesn't match input tensor dims`);let f=0,p=1,m=2,h=3,g=0,_=d,v=d*2,y=-1;s===`RGBA`?(g=0,_=d,v=d*2,y=d*3):s===`RGB`?(g=0,_=d,v=d*2):s===`RBG`&&(g=0,v=d,_=d*2),r=n.createImageData(i,a);for(let t=0;t<a*i;f+=4,p+=4,m+=4,h+=4,t++)r.data[f]=(e.data[g++]-u[0])*l[0],r.data[p]=(e.data[_++]-u[1])*l[1],r.data[m]=(e.data[v++]-u[2])*l[2],r.data[h]=y===-1?255:(e.data[y++]-u[3])*l[3]}else throw Error(`Can not access image data`);return r}}),_e,ve,ye,be,xe,Se,Ce=w(()=>{Ne(),_e=(e,t)=>{if(e===void 0)throw Error(`Image buffer must be defined`);if(t.height===void 0||t.width===void 0)throw Error(`Image height and width must be defined`);if(t.tensorLayout===`NHWC`)throw Error(`NHWC Tensor layout is not supported yet`);let{height:n,width:r}=t,i=t.norm??{mean:255,bias:0},a,o;a=typeof i.mean==`number`?[i.mean,i.mean,i.mean,i.mean]:[i.mean[0],i.mean[1],i.mean[2],i.mean[3]??255],o=typeof i.bias==`number`?[i.bias,i.bias,i.bias,i.bias]:[i.bias[0],i.bias[1],i.bias[2],i.bias[3]??0];let s=t.format===void 0?`RGBA`:t.format,c=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:`RGB`,l=n*r,u=c===`RGBA`?new Float32Array(l*4):new Float32Array(l*3),d=4,f=0,p=1,m=2,h=3,g=0,_=l,v=l*2,y=-1;s===`RGB`&&(d=3,f=0,p=1,m=2,h=-1),c===`RGBA`?y=l*3:c===`RBG`?(g=0,v=l,_=l*2):c===`BGR`&&(v=0,_=l,g=l*2);for(let t=0;t<l;t++,f+=d,m+=d,p+=d,h+=d)u[g++]=(e[f]+o[0])/a[0],u[_++]=(e[p]+o[1])/a[1],u[v++]=(e[m]+o[2])/a[2],y!==-1&&h!==-1&&(u[y++]=(e[h]+o[3])/a[3]);return c===`RGBA`?new Me(`float32`,u,[1,4,n,r]):new Me(`float32`,u,[1,3,n,r])},ve=async(e,t)=>{let n=typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement,r=typeof ImageData<`u`&&e instanceof ImageData,i=typeof ImageBitmap<`u`&&e instanceof ImageBitmap,a=typeof e==`string`,o,s=t??{},c=()=>{if(typeof document<`u`)return document.createElement(`canvas`);if(typeof OffscreenCanvas<`u`)return new OffscreenCanvas(1,1);throw Error(`Canvas is not supported`)},l=e=>typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||e instanceof OffscreenCanvas?e.getContext(`2d`):null;if(n){let n=c();n.width=e.width,n.height=e.height;let r=l(n);if(r!=null){let n=e.height,i=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(n=t.resizedHeight,i=t.resizedWidth),t!==void 0){if(s=t,t.tensorFormat!==void 0)throw Error(`Image input config format must be RGBA for HTMLImageElement`);s.tensorFormat=`RGBA`,s.height=n,s.width=i}else s.tensorFormat=`RGBA`,s.height=n,s.width=i;r.drawImage(e,0,0),o=r.getImageData(0,0,i,n).data}else throw Error(`Can not access image data`)}else if(r){let n,r;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(n=t.resizedHeight,r=t.resizedWidth):(n=e.height,r=e.width),t!==void 0&&(s=t),s.format=`RGBA`,s.height=n,s.width=r,t!==void 0){let t=c();t.width=r,t.height=n;let i=l(t);if(i!=null)i.putImageData(e,0,0),o=i.getImageData(0,0,r,n).data;else throw Error(`Can not access image data`)}else o=e.data}else if(i){if(t===void 0)throw Error(`Please provide image config with format for Imagebitmap`);let n=c();n.width=e.width,n.height=e.height;let r=l(n);if(r!=null){let t=e.height,n=e.width;return r.drawImage(e,0,0,n,t),o=r.getImageData(0,0,n,t).data,s.height=t,s.width=n,_e(o,s)}throw Error(`Can not access image data`)}else{if(a)return new Promise((t,n)=>{let r=c(),i=l(r);if(!e||!i)return n();let a=new Image;a.crossOrigin=`Anonymous`,a.src=e,a.onload=()=>{r.width=a.width,r.height=a.height,i.drawImage(a,0,0,r.width,r.height);let e=i.getImageData(0,0,r.width,r.height);s.height=r.height,s.width=r.width,t(_e(e.data,s))}});throw Error(`Input data provided is not supported - aborted tensor creation`)}if(o!==void 0)return _e(o,s);throw Error(`Input data provided is not supported - aborted tensor creation`)},ye=(e,t)=>{let{width:n,height:r,download:i,dispose:a}=t;return new Me({location:`texture`,type:`float32`,texture:e,dims:[1,r,n,4],download:i,dispose:a})},be=(e,t)=>{let{dataType:n,dims:r,download:i,dispose:a}=t;return new Me({location:`gpu-buffer`,type:n??`float32`,gpuBuffer:e,dims:r,download:i,dispose:a})},xe=(e,t)=>{let{dataType:n,dims:r,download:i,dispose:a}=t;return new Me({location:`ml-tensor`,type:n??`float32`,mlTensor:e,dims:r,download:i,dispose:a})},Se=(e,t,n)=>new Me({location:`cpu-pinned`,type:e,data:t,dims:n??[t.length]})}),we,Te,Ee,De,Oe=w(()=>{we=new Map([[`float32`,Float32Array],[`uint8`,Uint8Array],[`int8`,Int8Array],[`uint16`,Uint16Array],[`int16`,Int16Array],[`int32`,Int32Array],[`bool`,Uint8Array],[`float64`,Float64Array],[`uint32`,Uint32Array],[`int4`,Uint8Array],[`uint4`,Uint8Array]]),Te=new Map([[Float32Array,`float32`],[Uint8Array,`uint8`],[Int8Array,`int8`],[Uint16Array,`uint16`],[Int16Array,`int16`],[Int32Array,`int32`],[Float64Array,`float64`],[Uint32Array,`uint32`]]),Ee=!1,De=()=>{if(!Ee){Ee=!0;let e=typeof BigInt64Array<`u`&&BigInt64Array.from,t=typeof BigUint64Array<`u`&&BigUint64Array.from,n=globalThis.Float16Array,r=typeof n<`u`&&n.from;e&&(we.set(`int64`,BigInt64Array),Te.set(BigInt64Array,`int64`)),t&&(we.set(`uint64`,BigUint64Array),Te.set(BigUint64Array,`uint64`)),r?(we.set(`float16`,n),Te.set(n,`float16`)):we.set(`float16`,Uint16Array)}}}),ke,Ae,je=w(()=>{Ne(),ke=e=>{let t=1;for(let n=0;n<e.length;n++){let r=e[n];if(typeof r!=`number`||!Number.isSafeInteger(r))throw TypeError(`dims[${n}] must be an integer, got: ${r}`);if(r<0)throw RangeError(`dims[${n}] must be a non-negative integer, got: ${r}`);t*=r}return t},Ae=(e,t)=>{switch(e.location){case`cpu`:return new Me(e.type,e.data,t);case`cpu-pinned`:return new Me({location:`cpu-pinned`,data:e.data,type:e.type,dims:t});case`texture`:return new Me({location:`texture`,texture:e.texture,type:e.type,dims:t});case`gpu-buffer`:return new Me({location:`gpu-buffer`,gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case`ml-tensor`:return new Me({location:`ml-tensor`,mlTensor:e.mlTensor,type:e.type,dims:t});default:throw Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Me,Ne=w(()=>{ge(),Ce(),Oe(),je(),Me=class{constructor(e,t,n){De();let r,i;if(typeof e==`object`&&`location`in e)switch(this.dataLocation=e.location,r=e.type,i=e.dims,e.location){case`cpu-pinned`:{let t=we.get(r);if(!t)throw TypeError(`unsupported type "${r}" to create tensor from pinned buffer`);if(!(e.data instanceof t))throw TypeError(`buffer should be of type ${t.name}`);this.cpuData=e.data;break}case`texture`:if(r!==`float32`)throw TypeError(`unsupported type "${r}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break;case`gpu-buffer`:if(r!==`float32`&&r!==`float16`&&r!==`int32`&&r!==`int64`&&r!==`uint32`&&r!==`uint8`&&r!==`bool`&&r!==`uint4`&&r!==`int4`)throw TypeError(`unsupported type "${r}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break;case`ml-tensor`:if(r!==`float32`&&r!==`float16`&&r!==`int32`&&r!==`int64`&&r!==`uint32`&&r!==`uint64`&&r!==`int8`&&r!==`uint8`&&r!==`bool`&&r!==`uint4`&&r!==`int4`)throw TypeError(`unsupported type "${r}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break;default:throw Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,o;if(typeof e==`string`){if(r=e,o=n,e===`string`){if(!Array.isArray(t))throw TypeError(`A string tensor's data must be a string array.`);a=t}else{let n=we.get(e);if(n===void 0)throw TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e===`float16`&&n===Uint16Array||e===`uint4`||e===`int4`)throw TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${n.name} as data.`);a=e===`uint64`||e===`int64`?n.from(t,BigInt):n.from(t)}else if(t instanceof n)a=t;else if(t instanceof Uint8ClampedArray){if(e===`uint8`)a=Uint8Array.from(t);else throw TypeError(`A Uint8ClampedArray tensor's data must be type of uint8`)}else if(e===`float16`&&t instanceof Uint16Array&&n!==Uint16Array)a=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw TypeError(`A ${r} tensor's data must be type of ${n}`)}}else if(o=t,Array.isArray(e)){if(e.length===0)throw TypeError(`Tensor type cannot be inferred from an empty array.`);let t=typeof e[0];if(t===`string`)r=`string`,a=e;else if(t===`boolean`)r=`bool`,a=Uint8Array.from(e);else throw TypeError(`Invalid element type of data array: ${t}.`)}else if(e instanceof Uint8ClampedArray)r=`uint8`,a=Uint8Array.from(e);else{let t=Te.get(e.constructor);if(t===void 0)throw TypeError(`Unsupported type for tensor data: ${e.constructor}.`);r=t,a=e}if(o===void 0)o=[a.length];else if(!Array.isArray(o))throw TypeError(`A tensor's dims must be a number array`);i=o,this.cpuData=a,this.dataLocation=`cpu`}let a=ke(i);if(this.cpuData&&a!==this.cpuData.length&&(r!==`uint4`&&r!==`int4`||Math.ceil(a/2)!==this.cpuData.length))throw Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=r,this.dims=i,this.size=a}static async fromImage(e,t){return ve(e,t)}static fromTexture(e,t){return ye(e,t)}static fromGpuBuffer(e,t){return be(e,t)}static fromMLTensor(e,t){return xe(e,t)}static fromPinnedBuffer(e,t,n){return Se(e,t,n)}toDataURL(e){return me(this,e)}toImageData(e){return he(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw Error(`The data is not stored as a WebGL texture.`);return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw Error(`The data is not stored as a WebGPU buffer.`);return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw Error(`The data is not stored as a WebNN MLTensor.`);return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case`cpu`:case`cpu-pinned`:return this.data;case`texture`:case`gpu-buffer`:case`ml-tensor`:if(!this.downloader)throw Error(`The current tensor is not created with a specified data downloader.`);if(this.isDownloading)throw Error(`The current tensor is being downloaded.`);try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation=`cpu`,this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}default:throw Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw Error(`The current tensor is being downloaded.`);this.disposer&&=(this.disposer(),void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation=`none`}ensureValid(){if(this.dataLocation===`none`)throw Error(`The tensor is disposed.`)}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw Error(`Cannot reshape a tensor that owns GPU resource.`);return Ae(this,e)}}}),Pe,Fe=w(()=>{Ne(),Pe=Me}),Ie,Le=w(()=>{N(),pe(),Fe(),de(),Ie=class e{constructor(e,t){this.handler=e,this.backend=t}async run(e,t,n){se(),le(`InferenceSession.run`);let r={},i={};if(typeof e!=`object`||!e||e instanceof Pe||Array.isArray(e))throw TypeError(`'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.`);let a=!0;if(typeof t==`object`){if(t===null)throw TypeError(`Unexpected argument[1]: cannot be null.`);if(t instanceof Pe)throw TypeError(`'fetches' cannot be a Tensor`);if(Array.isArray(t)){if(t.length===0)throw TypeError(`'fetches' cannot be an empty array.`);a=!1;for(let e of t){if(typeof e!=`string`)throw TypeError(`'fetches' must be a string array or an object.`);if(this.outputNames.indexOf(e)===-1)throw RangeError(`'fetches' contains invalid output name: ${e}.`);r[e]=null}if(typeof n==`object`&&n)i=n;else if(typeof n<`u`)throw TypeError(`'options' must be an object.`)}else{let e=!1,o=Object.getOwnPropertyNames(t);for(let n of this.outputNames)if(o.indexOf(n)!==-1){let i=t[n];(i===null||i instanceof Pe)&&(e=!0,a=!1,r[n]=i)}if(e){if(typeof n==`object`&&n)i=n;else if(typeof n<`u`)throw TypeError(`'options' must be an object.`)}else i=t}}else if(typeof t<`u`)throw TypeError(`Unexpected argument[1]: must be 'fetches' or 'options'.`);for(let t of this.inputNames)if(typeof e[t]>`u`)throw Error(`input '${t}' is missing in 'feeds'.`);if(a)for(let e of this.outputNames)r[e]=null;let o;if(i.activeLoraAdapters!==void 0){if(!Array.isArray(i.activeLoraAdapters))throw TypeError(`'activeLoraAdapters' must be an array.`);o=i.activeLoraAdapters.map(e=>{if(!(e instanceof fe))throw TypeError(`'activeLoraAdapters' must be an array of LoraAdapter objects.`);if(e.backend!==this.backend)throw Error(`LoRA adapter was created by a different backend than the session.`);return e.handler})}let s=await this.handler.run(e,r,i,o),c={};for(let e in s)if(Object.hasOwnProperty.call(s,e)){let t=s[e];c[e]=t instanceof Pe?t:new Pe(t.type,t.data,t.dims)}return ue(`InferenceSession.run`),ce(),c}async release(){return this.handler.dispose()}static async create(t,n,r,i){se(),le(`InferenceSession.create`);let a,o={};if(typeof t==`string`){if(a=t,typeof n==`object`&&n)o=n;else if(typeof n<`u`)throw TypeError(`'options' must be an object.`)}else if(t instanceof Uint8Array){if(a=t,typeof n==`object`&&n)o=n;else if(typeof n<`u`)throw TypeError(`'options' must be an object.`)}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<`u`&&t instanceof SharedArrayBuffer){let e=t,s=0,c=t.byteLength;if(typeof n==`object`&&n)o=n;else if(typeof n==`number`){if(s=n,!Number.isSafeInteger(s))throw RangeError(`'byteOffset' must be an integer.`);if(s<0||s>=e.byteLength)throw RangeError(`'byteOffset' is out of range [0, ${e.byteLength}).`);if(c=t.byteLength-s,typeof r==`number`){if(c=r,!Number.isSafeInteger(c))throw RangeError(`'byteLength' must be an integer.`);if(c<=0||s+c>e.byteLength)throw RangeError(`'byteLength' is out of range (0, ${e.byteLength-s}].`);if(typeof i==`object`&&i)o=i;else if(typeof i<`u`)throw TypeError(`'options' must be an object.`)}else if(typeof r<`u`)throw TypeError(`'byteLength' must be a number.`)}else if(typeof n<`u`)throw TypeError(`'options' must be an object.`);a=new Uint8Array(e,s,c)}else throw TypeError(`Unexpected argument[0]: must be 'path' or 'buffer'.`);let[s,c]=await ee(o),l=await s.createInferenceSessionHandler(a,c);return ue(`InferenceSession.create`),ce(),new e(l,s)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Re,ze=w(()=>{Le(),Re=Ie}),Be,Ve=w(()=>{pe(),Be=fe}),He=w(()=>{}),Ue=w(()=>{}),We=w(()=>{}),Ge=w(()=>{}),Ke={};T(Ke,{InferenceSession:()=>Re,LoraAdapter:()=>Be,TRACE:()=>ae,TRACE_EVENT_BEGIN:()=>le,TRACE_EVENT_END:()=>ue,TRACE_FUNC_BEGIN:()=>se,TRACE_FUNC_END:()=>ce,Tensor:()=>Pe,env:()=>R,registerBackend:()=>j});var qe=w(()=>{P(),ie(),ze(),Ve(),Fe(),He(),Ue(),de(),We(),Ge()}),Je=w(()=>{}),Ye={};T(Ye,{default:()=>Qe});var Xe,Ze,Qe,$e=w(()=>{Id(),Ot(),yt(),Xe=`ort-wasm-proxy-worker`,Ze=globalThis.self?.name===Xe,Ze&&(self.onmessage=e=>{let{type:t,in:n}=e.data;try{switch(t){case`init-wasm`:Dt(n.wasm).then(()=>{yd(n).then(()=>{postMessage({type:t})},e=>{postMessage({type:t,err:e})})},e=>{postMessage({type:t,err:e})});break;case`init-ep`:{let{epName:e,env:r}=n;bd(r,e).then(()=>{postMessage({type:t})},e=>{postMessage({type:t,err:e})});break}case`copy-from`:{let{buffer:e}=n,r=wd(e);postMessage({type:t,out:r});break}case`create`:{let{model:e,options:r}=n;Td(e,r).then(e=>{postMessage({type:t,out:e})},e=>{postMessage({type:t,err:e})});break}case`release`:Ed(n),postMessage({type:t});break;case`run`:{let{sessionId:e,inputIndices:r,inputs:i,outputIndices:a,options:o}=n;Nd(e,r,i,a,Array(a.length).fill(null),o).then(e=>{e.some(e=>e[3]!==`cpu`)?postMessage({type:t,err:`Proxy does not support non-cpu tensor location.`}):postMessage({type:t,out:e},Fd([...i,...e]))},e=>{postMessage({type:t,err:e})});break}case`end-profiling`:Pd(n),postMessage({type:t})}}catch(e){postMessage({type:t,err:e})}}),Qe=Ze?null:e=>new Worker(e??ct,{type:`module`,name:Xe})}),et={};T(et,{default:()=>nt});async function tt(e={}){var t=e,n=!!globalThis.window,r=!!globalThis.WorkerGlobalScope,i=r&&self.name?.startsWith(`em-pthread`);t.mountExternalData=(e,n)=>{e.startsWith(`./`)&&(e=e.substring(2)),(t.jd||=new Map).set(e,n)},t.unmountExternalData=()=>{delete t.jd,delete t.ke,delete t.je,delete t.le},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let a=e=>async(...n)=>{try{if(t.hd)throw Error(`Session already started`);let r=t.hd={Vd:n[0],errors:[]},i=await e(...n);if(t.hd!==r)throw Error(`Session mismatch`);t.pd?.flush();let a=r.errors;if(0<a.length){let e=await Promise.all(a);if(e=e.filter(e=>e),0<e.length)throw Error(e.join(`
`))}return i}finally{t.hd=null}};t.jsepInit=(e,n)=>{if(e===`webgpu`){[t.pd,t.Ld,t.Pd,t.rd,t.Od,t.ic,t.Qd,t.Sd,t.Md,t.Nd,t.Rd]=n;let e=t.pd;t.jsepRegisterBuffer=(t,n,r,i)=>e.registerBuffer(t,n,r,i),t.jsepGetBuffer=t=>e.getBuffer(t),t.jsepCreateDownloader=(t,n,r)=>e.createDownloader(t,n,r),t.jsepOnCreateSession=t=>{e.onCreateSession(t)},t.jsepOnReleaseSession=t=>{e.onReleaseSession(t)},t.jsepOnRunStart=t=>e.onRunStart(t),t.Td=(t,n)=>{e.upload(t,n)}}else if(e===`webnn`){let e=n[0];[t.ce,t.Cd,t.webnnEnsureTensor,t.Dd,t.webnnDownloadTensor,t.be,t.webnnEnableTraceEvent]=n.slice(1),t.webnnReleaseTensorId=t.Cd,t.webnnUploadTensor=t.Dd,t.webnnRegisterMLContext=t.be,t.webnnOnRunStart=t=>e.onRunStart(t),t.webnnOnRunEnd=e.onRunEnd.bind(e),t.webnnOnReleaseSession=t=>{e.onReleaseSession(t)},t.webnnCreateMLTensorDownloader=(t,n)=>e.createMLTensorDownloader(t,n),t.webnnRegisterMLTensor=(t,n,r,i)=>e.registerMLTensor(t,n,r,i),t.webnnCreateMLContext=t=>e.createMLContext(t),t.webnnRegisterGraphInput=e.registerGraphInput.bind(e),t.webnnIsGraphInput=e.isGraphInput.bind(e),t.webnnRegisterGraphOutput=e.registerGraphOutput.bind(e),t.webnnIsGraphOutput=e.isGraphOutput.bind(e),t.webnnCreateTemporaryTensor=e.createTemporaryTensor.bind(e),t.webnnIsGraphInputOutputTypeSupported=e.isGraphInputOutputTypeSupported.bind(e)}};let o=()=>{let e=e=>(...t)=>{let n=Qt;return t=e(...t),Qt==n?t:new Promise((e,t)=>{an={resolve:e,reject:t}})};(n=>{for(let r of n)t[r]=e(t[r])})(`_OrtAppendExecutionProvider _OrtAppendExecutionProviderV2 _OrtCreateSession _OrtRun _OrtRunWithBinding _OrtBindInput`.split(` `)),a!==void 0&&(t._OrtRun=a(t._OrtRun),t._OrtRunWithBinding=a(t._OrtRunWithBinding)),o=void 0};t.asyncInit=()=>{o?.()};var s,c,l=(e,t)=>{throw t},u=import.meta.url,d=``;if(n||r){try{d=new URL(`.`,u).href}catch{}r&&(c=e=>{var t=new XMLHttpRequest;return t.open(`GET`,e,!1),t.responseType=`arraybuffer`,t.send(null),new Uint8Array(t.response)}),s=async e=>{if(C(e))return new Promise((t,n)=>{var r=new XMLHttpRequest;r.open(`GET`,e,!0),r.responseType=`arraybuffer`,r.onload=()=>{r.status==200||r.status==0&&r.response?t(r.response):n(r.status)},r.onerror=n,r.send(null)});var t=await fetch(e,{credentials:`same-origin`});if(t.ok)return t.arrayBuffer();throw Error(t.status+` : `+t.url)}}var f,p,m,h,g,_,v=console.log.bind(console),y=console.error.bind(console),b=v,x=y,S=!1,C=e=>e.startsWith(`file://`);function w(){Ce.buffer!=E.buffer&&I()}if(i){let e=function(n){try{var r=n.data,i=r.bd;if(i===`load`){let n=[];self.onmessage=e=>n.push(e),_=()=>{postMessage({bd:`loaded`});for(let t of n)e(t);self.onmessage=e};for(let e of r.Hd)t[e]&&!t[e].proxy||(t[e]=(...t)=>{postMessage({bd:`callHandler`,Fd:e,args:t})},e==`print`&&(b=t[e]),e==`printErr`&&(x=t[e]));Ce=r.Zd,I(),p=r.$d,R(),sa()}else if(i===`run`){(function(e){var t=(w(),j)[e+52>>>2>>>0];e=(w(),j)[e+56>>>2>>>0],Cr(t,t-e),Z(t)})(r.ad),hr(r.ad,0,0,1,0,0),be(),Ht(r.ad),T||=(dr(),!0);try{we(r.Xd,r.nd)}catch(e){if(e!=`unwind`)throw e}}else r.target!==`setimmediate`&&(i===`checkMailbox`?T&&Ut():i&&(x(`worker: received unknown command ${i}`),x(r)))}catch(e){throw gr(),e}};var T=!1;self.onunhandledrejection=e=>{throw e.reason||e},self.onmessage=e}var E,D,O,k,A,j,M,ee,te,N,P,F=!1;function I(){var e=Ce.buffer;t.HEAP8=E=new Int8Array(e),O=new Int16Array(e),t.HEAPU8=D=new Uint8Array(e),k=new Uint16Array(e),t.HEAP32=A=new Int32Array(e),t.HEAPU32=j=new Uint32Array(e),M=new Float32Array(e),ee=new Float64Array(e),te=new BigInt64Array(e),N=new BigUint64Array(e)}function ne(){F=!0,i?_():vi.vb()}function L(e){throw x(e=`Aborted(`+e+`)`),S=!0,e=new WebAssembly.RuntimeError(e+`. Build with -sASSERTIONS for more info.`),g?.(e),e}function re(){return{a:{na:Si,jb:xi,g:De,G:ke,f:Pe,o:Fe,h:Ie,$:Le,b:Re,S:ze,Ja:Ve,n:He,aa:qe,_a:Je,Fa:Ye,Ha:Xe,$a:Ze,Ya:Qe,Ra:$e,Xa:et,la:tt,Ga:nt,Da:rt,Za:it,Ea:at,eb:ot,ga:mt,ya:ht,wa:Ct,fa:Tt,N:Et,I:Dt,xa:kt,_:Lt,za:Rt,Ua:zt,Ba:Wt,Ka:Kt,ua:qt,ha:Jt,Ta:Ht,bb:Yt,Q:H,r:pn,c:vt,kb:mn,y:hn,M:gn,D:_n,m:vn,s:yn,lb:bn,J:xn,R:Sn,j:Cn,u:wn,q:Tn,k:En,Oa:Dn,Pa:jn,Qa:Mn,Ma:Nn,Na:Pn,va:Ln,gb:Rn,db:Vn,v:Un,ba:Wn,ia:Gn,cb:zn,V:Kn,ab:G,Ca:qn,F:In,U:Jn,ma:q,Aa:J,ib:Zn,hb:Qn,Va:Y,Wa:nr,Ia:me,T:rr,La:ir,ka:ar,Sa:or,ja:cr,nb:aa,oa:ea,ob:ia,pa:$i,H:Hi,e:Ei,t:wi,w:Ci,B:Ii,pb:Xi,Z:Yi,x:ki,qa:Zi,X:ta,ca:Ji,qb:qi,ea:$,O:Li,sb:Wi,ra:Ki,tb:Ui,L:Bi,Y:Qi,d:Ti,A:Oi,l:Di,mb:oa,p:ji,z:Mi,C:Ai,E:Ni,K:Ri,sa:Vi,P:na,da:zi,W:ra,ub:Fi,ta:Pi,rb:Gi,i:lr,a:Ce,fb:fe}}}async function R(){function e(e,n){var r=vi=e.exports;e={};for(let[t,n]of Object.entries(r))typeof n==`function`?(r=Xt(n),e[t]=r):e[t]=n;return vi=e,vi=(function(){var e=vi,t=e=>t=>e(t)>>>0,n=e=>()=>e()>>>0;return(e=Object.assign({},e)).wb=t(e.wb),e.ec=n(e.ec),e.gc=t(e.gc),e.uc=t(e.uc),e.vc=n(e.vc),e.zc=t(e.zc),e})(),_e.push(vi.hc),ur=(e=vi).wb,dr=e.xb,t._OrtInit=e.yb,t._OrtGetLastError=e.zb,t._OrtCreateSessionOptions=e.Ab,t._OrtAppendExecutionProvider=e.Bb,t._OrtGetEpDevices=e.Cb,t._OrtEpDevice_EpName=e.Db,t._OrtAppendExecutionProviderV2=e.Eb,t._OrtAddFreeDimensionOverride=e.Fb,t._OrtAddSessionConfigEntry=e.Gb,t._OrtReleaseSessionOptions=e.Hb,t._OrtCreateSession=e.Ib,t._OrtReleaseSession=e.Jb,t._OrtGetInputOutputCount=e.Kb,t._OrtGetInputOutputMetadata=e.Lb,t._OrtFree=e.Mb,t._OrtCreateTensor=e.Nb,t._OrtGetTensorData=e.Ob,t._OrtReleaseTensor=e.Pb,t._OrtCreateLoraAdapter=e.Qb,t._OrtReleaseLoraAdapter=e.Rb,t._OrtCreateRunOptions=e.Sb,t._OrtAddRunConfigEntry=e.Tb,t._OrtRunOptionsAddActiveLoraAdapter=e.Ub,t._OrtReleaseRunOptions=e.Vb,t._OrtCreateBinding=e.Wb,t._OrtBindInput=e.Xb,t._OrtBindOutput=e.Yb,t._OrtClearBoundOutputs=e.Zb,t._OrtReleaseBinding=e._b,t._OrtRunWithBinding=e.$b,t._OrtRun=e.ac,t._OrtEndProfiling=e.bc,t._JsepOutput=e.cc,t._JsepGetNodeName=e.dc,fr=e.ec,pr=t._free=e.fc,mr=t._malloc=e.gc,hr=e.jc,gr=e.kc,_r=e.lc,vr=e.mc,yr=e.nc,br=e.oc,xr=e.pc,X=e.qc,Sr=e.rc,Cr=e.sc,Z=e.tc,wr=e.uc,Q=e.vc,Tr=e.wc,Er=e.xc,Dr=e.yc,Or=e.zc,kr=e.Ac,Ar=e.Bc,jr=e.Cc,Mr=e.Dc,Nr=e.Ec,Pr=e.Fc,Fr=e.Gc,Ir=e.Hc,Lr=e.Ic,Rr=e.Jc,zr=e.Kc,Br=e.Lc,Vr=e.Mc,Hr=e.Nc,Ur=e.Oc,Wr=e.Pc,Gr=e.Qc,Kr=e.Rc,qr=e.Sc,Jr=e.Tc,Yr=e.Uc,Xr=e.Vc,Zr=e.Wc,Qr=e.Xc,$r=e.Yc,ei=e._c,ti=e.$c,ni=e.kd,ri=e.ld,ii=e.qd,ai=e.vd,oi=e.wd,si=e.xd,ci=e.yd,li=e.zd,ui=e.Ad,di=e.Bd,fi=e.Gd,pi=e.Jd,mi=e.fe,hi=e.ge,gi=e.he,_i=e.ie,p=n,vi}var n,r=re();return t.instantiateWasm?new Promise(n=>{t.instantiateWasm(r,(t,r)=>{n(e(t,r))})}):i?e(new WebAssembly.Instance(p,re()),p):(P??=t.locateFile?t.locateFile?t.locateFile(`ort-wasm-simd-threaded.jsep.wasm`,d):d+`ort-wasm-simd-threaded.jsep.wasm`:new URL(new URL(`ort-wasm-simd-threaded.jsep-Dt5UNR3U.wasm`,import.meta.url).href,``+import.meta.url).href,n=await(async function(e){var t=P;if(!f&&!C(t))try{var n=fetch(t,{credentials:`same-origin`});return await WebAssembly.instantiateStreaming(n,e)}catch(e){x(`wasm streaming compile failed: ${e}`),x(`falling back to ArrayBuffer instantiation`)}return(async function(e,t){try{var n=await(async function(e){if(!f)try{var t=await s(e);return new Uint8Array(t)}catch{}if(e==P&&f)e=new Uint8Array(f);else{if(!c)throw`both async and sync fetching of the wasm failed`;e=c(e)}return e})(e);return await WebAssembly.instantiate(n,t)}catch(e){x(`failed to asynchronously prepare wasm: ${e}`),L(e)}})(t,e)})(r),e(n.instance,n.module))}class ie{name=`ExitStatus`;constructor(e){this.message=`Program terminated with exit(${e})`,this.status=e}}var ae=e=>{e.terminate(),e.onmessage=()=>{}},oe=[],se=0,ce=null,le=e=>{he.length==0&&(Se(),xe(he[0]));var t=he.pop();if(!t)return 6;ge.push(t),ve[e.ad]=t,t.ad=e.ad;var n={bd:`run`,Xd:e.Wd,nd:e.nd,ad:e.ad};return t.postMessage(n,e.ud),0},ue=0,de=(e,t,...n)=>{var r,i=16*n.length,a=Q(),o=wr(i),s=o>>>3;for(r of n)typeof r==`bigint`?((w(),te)[s++>>>0]=1n,(w(),te)[s++>>>0]=r):((w(),te)[s++>>>0]=0n,(w(),ee)[s++>>>0]=r);return e=_r(e,0,i,o,t),Z(a),e};function fe(e){if(i)return de(0,1,e);if(m=e,!(0<ue)){for(var t of ge)ae(t);for(t of he)ae(t);he=[],ge=[],ve={},S=!0}l(0,new ie(e))}function pe(e){if(i)return de(1,0,e);me(e)}var me=e=>{if(m=e,i)throw pe(e),`unwind`;fe(e)},he=[],ge=[],_e=[],ve={},ye=e=>{var t=e.ad;delete ve[t],he.push(e),ge.splice(ge.indexOf(e),1),e.ad=0,vr(t)};function be(){_e.forEach(e=>e())}var xe=e=>new Promise(n=>{e.onmessage=r=>{var i=r.data;if(r=i.bd,i.md&&i.md!=fr()){var a=ve[i.md];a?a.postMessage(i,i.ud):x(`Internal error! Worker sent a message "${r}" to target pthread ${i.md}, but that thread no longer exists!`)}else r===`checkMailbox`?Ut():r===`spawnThread`?le(i):r===`cleanupThread`?Bt(()=>{ye(ve[i.Yd])}):r===`loaded`?(e.loaded=!0,n(e)):i.target===`setimmediate`?e.postMessage(i):r===`uncaughtException`?e.onerror(i.error):r===`callHandler`?t[i.Fd](...i.args):r&&x(`worker sent an unknown command ${r}`)},e.onerror=e=>{throw x(`worker sent an error! ${e.filename}:${e.lineno}: ${e.message}`),e};var r,i=[];for(r of[])t.propertyIsEnumerable(r)&&i.push(r);e.postMessage({bd:`load`,Hd:i,Zd:Ce,$d:p})});function Se(){var e=new Worker((()=>{let e=URL;return import.meta.url>`file:`&&import.meta.url<`file;`?new e(`ort.bundle.min.mjs`,import.meta.url):new URL(import.meta.url)})(),{type:`module`,workerData:`em-pthread`,name:`em-pthread`});he.push(e)}var Ce,we=(e,t)=>{ue=0,e=Ar(e,t),0<ue?m=e:yr(e)},Te=[],Ee=0;function De(e){var t=new Me(e>>>=0);return(w(),E)[t.cd+12>>>0]==0&&(Ae(t,!0),Ee--),je(t,!1),Te.push(t),Or(e)}var Oe=0,ke=()=>{X(0,0);var e=Te.pop();Tr(e.od),Oe=0};function Ae(e,t){t=+!!t,(w(),E)[e.cd+12>>>0]=t}function je(e,t){t=+!!t,(w(),E)[e.cd+13>>>0]=t}class Me{constructor(e){this.od=e,this.cd=e-24}}var Ne=e=>{var t=Oe;if(!t)return Sr(0),0;var n=new Me(t);(w(),j)[n.cd+16>>>2>>>0]=t;var r=(w(),j)[n.cd+4>>>2>>>0];if(!r)return Sr(0),t;for(var i of e){if(i===0||i===r)break;if(Dr(i,r,n.cd+16))return Sr(i),t}return Sr(r),t};function Pe(){return Ne([])}function Fe(e){return Ne([e>>>0])}function Ie(e,t,n,r){return Ne([e>>>0,t>>>0,n>>>0,r>>>0])}var Le=()=>{var e=Te.pop();e||L(`no exception to throw`);var t=e.od;throw(w(),E)[e.cd+13>>>0]==0&&(Te.push(e),je(e,!0),Ae(e,!1),Ee++),Er(t),Oe=t};function Re(e,t,n){var r=new Me(e>>>=0);throw t>>>=0,n>>>=0,(w(),j)[r.cd+16>>>2>>>0]=0,(w(),j)[r.cd+4>>>2>>>0]=t,(w(),j)[r.cd+8>>>2>>>0]=n,Er(e),Ee++,Oe=e}var ze=()=>Ee;function Be(e,t,n,r){return i?de(2,1,e,t,n,r):Ve(e,t,n,r)}function Ve(e,t,n,r){if(e>>>=0,t>>>=0,n>>>=0,r>>>=0,!globalThis.SharedArrayBuffer)return 6;var a=[];return i&&a.length===0?Be(e,t,n,r):(e={Wd:n,ad:e,nd:r,ud:a},i?(e.bd=`spawnThread`,postMessage(e,a),0):le(e))}function He(e){throw Oe||=e>>>0,Oe}var Ue=globalThis.TextDecoder&&new TextDecoder,We=(e,t,n,r)=>{if(n=t+n,r)return n;for(;e[t]&&!(t>=n);)++t;return t},Ge=(e,t=0,n,r)=>{if(16<(n=We(e,t>>>=0,n,r))-t&&e.buffer&&Ue)return Ue.decode(e.buffer instanceof ArrayBuffer?e.subarray(t,n):e.slice(t,n));for(r=``;t<n;){var i=e[t++];if(128&i){var a=63&e[t++];if((224&i)==192)r+=String.fromCharCode((31&i)<<6|a);else{var o=63&e[t++];65536>(i=(240&i)==224?(15&i)<<12|a<<6|o:(7&i)<<18|a<<12|o<<6|63&e[t++])?r+=String.fromCharCode(i):(i-=65536,r+=String.fromCharCode(55296|i>>10,56320|1023&i))}}else r+=String.fromCharCode(i)}return r},Ke=(e,t,n)=>(e>>>=0)?Ge((w(),D),e,t,n):``;function qe(e,t,n){return i?de(3,1,e,t,n):0}function Je(e,t){if(i)return de(4,1,e,t)}function Ye(e,t){if(i)return de(5,1,e,t)}function Xe(e,t,n){if(i)return de(6,1,e,t,n)}function Ze(e,t,n){return i?de(7,1,e,t,n):0}function Qe(e,t){if(i)return de(8,1,e,t)}function $e(e,t,n){if(i)return de(9,1,e,t,n)}function et(e,t,n,r){if(i)return de(10,1,e,t,n,r)}function tt(e,t,n,r){if(i)return de(11,1,e,t,n,r)}function nt(e,t,n,r){if(i)return de(12,1,e,t,n,r)}function rt(e){if(i)return de(13,1,e)}function it(e,t){if(i)return de(14,1,e,t)}function at(e,t,n){if(i)return de(15,1,e,t,n)}var ot=()=>L(``),st=e=>{e>>>=0;for(var t=``;;){var n=(w(),D)[e++>>>0];if(!n)return t;t+=String.fromCharCode(n)}},ct={},lt={},ut={},dt=class extends Error{constructor(e){super(e),this.name=`BindingError`}};function ft(e,t,n={}){return(function(e,t,n={}){var r=t.name;if(!e)throw new dt(`type "${r}" must have a positive integer typeid pointer`);if(lt.hasOwnProperty(e)){if(n.Id)return;throw new dt(`Cannot register type '${r}' twice`)}lt[e]=t,delete ut[e],ct.hasOwnProperty(e)&&(t=ct[e],delete ct[e],t.forEach(e=>e()))})(e,t,n)}var pt=(e,t,n)=>{switch(t){case 1:return n?e=>(w(),E)[e>>>0]:e=>(w(),D)[e>>>0];case 2:return n?e=>(w(),O)[e>>>1>>>0]:e=>(w(),k)[e>>>1>>>0];case 4:return n?e=>(w(),A)[e>>>2>>>0]:e=>(w(),j)[e>>>2>>>0];case 8:return n?e=>(w(),te)[e>>>3>>>0]:e=>(w(),N)[e>>>3>>>0];default:throw TypeError(`invalid integer width (${t}): ${e}`)}};function mt(e,t,n,r,i){e>>>=0,n>>>=0,t=st(t>>>0);let a=e=>e;if(r=r===0n){let e=8*n;a=t=>BigInt.asUintN(e,t),i=a(i)}ft(e,{name:t,Zc:a,ed:(e,t)=>(typeof t==`number`&&(t=BigInt(t)),t),dd:pt(t,n,!r),gd:null})}function ht(e,t,n,r){ft(e>>>=0,{name:t=st(t>>>0),Zc:function(e){return!!e},ed:function(e,t){return t?n:r},dd:function(e){return this.Zc((w(),D)[e>>>0])},gd:null})}var gt=[],_t=[0,1,,1,null,1,!0,1,!1,1];function vt(e){9<(e>>>=0)&&--_t[e+1]===0&&(_t[e]=void 0,gt.push(e))}var yt=e=>{if(!e)throw new dt(`Cannot use deleted val. handle = ${e}`);return _t[e]},bt=e=>{switch(e){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let t=gt.pop()||_t.length;return _t[t]=e,_t[t+1]=1,t}};function xt(e){return this.Zc((w(),j)[e>>>2>>>0])}var St={name:`emscripten::val`,Zc:e=>{var t=yt(e);return vt(e),t},ed:(e,t)=>bt(t),dd:xt,gd:null};function Ct(e){return ft(e>>>0,St)}var wt=(e,t)=>{switch(t){case 4:return function(e){return this.Zc((w(),M)[e>>>2>>>0])};case 8:return function(e){return this.Zc((w(),ee)[e>>>3>>>0])};default:throw TypeError(`invalid float width (${t}): ${e}`)}};function Tt(e,t,n){n>>>=0,ft(e>>>=0,{name:t=st(t>>>0),Zc:e=>e,ed:(e,t)=>t,dd:wt(t,n),gd:null})}function Et(e,t,n,r,i){e>>>=0,n>>>=0,t=st(t>>>0);let a=e=>e;if(r===0){var o=32-8*n;a=e=>e<<o>>>o,i=a(i)}ft(e,{name:t,Zc:a,ed:(e,t)=>t,dd:pt(t,n,r!==0),gd:null})}function Dt(e,t,n){function r(e){var t=(w(),j)[e>>>2>>>0];return e=(w(),j)[e+4>>>2>>>0],new i((w(),E).buffer,e,t)}var i=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][t];ft(e>>>=0,{name:n=st(n>>>0),Zc:r,dd:r},{Id:!0})}var z=(e,t,n)=>{var r=(w(),D);if(t>>>=0,0<n){var i=t;n=t+n-1;for(var a=0;a<e.length;++a){var o=e.codePointAt(a);if(127>=o){if(t>=n)break;r[t++>>>0]=o}else if(2047>=o){if(t+1>=n)break;r[t++>>>0]=192|o>>6,r[t++>>>0]=128|63&o}else if(65535>=o){if(t+2>=n)break;r[t++>>>0]=224|o>>12,r[t++>>>0]=128|o>>6&63,r[t++>>>0]=128|63&o}else{if(t+3>=n)break;r[t++>>>0]=240|o>>18,r[t++>>>0]=128|o>>12&63,r[t++>>>0]=128|o>>6&63,r[t++>>>0]=128|63&o,a++}}r[t>>>0]=0,e=t-i}else e=0;return e},Ot=e=>{for(var t=0,n=0;n<e.length;++n){var r=e.charCodeAt(n);127>=r?t++:2047>=r?t+=2:55296<=r&&57343>=r?(t+=4,++n):t+=3}return t};function kt(e,t){ft(e>>>=0,{name:t=st(t>>>0),Zc(e){var t=(w(),j)[e>>>2>>>0];return t=Ke(e+4,t,!0),pr(e),t},ed(e,t){t instanceof ArrayBuffer&&(t=new Uint8Array(t));var n=typeof t==`string`;if(!(n||ArrayBuffer.isView(t)&&t.BYTES_PER_ELEMENT==1))throw new dt(`Cannot pass non-string to std::string`);var r=n?Ot(t):t.length,i=mr(4+r+1),a=i+4;return(w(),j)[i>>>2>>>0]=r,n?z(t,a,r+1):(w(),D).set(t,a>>>0),e!==null&&e.push(pr,i),i},dd:xt,gd(e){pr(e)}})}var At=globalThis.TextDecoder?new TextDecoder(`utf-16le`):void 0,jt=(e,t,n)=>{if(e>>>=1,16<(t=We((w(),k),e,t/2,n))-e&&At)return At.decode((w(),k).slice(e,t));for(n=``;e<t;++e){var r=(w(),k)[e>>>0];n+=String.fromCharCode(r)}return n},Mt=(e,t,n)=>{if(n??=2147483647,2>n)return 0;var r=t;n=(n-=2)<2*e.length?n/2:e.length;for(var i=0;i<n;++i){var a=e.charCodeAt(i);(w(),O)[t>>>1>>>0]=a,t+=2}return(w(),O)[t>>>1>>>0]=0,t-r},Nt=e=>2*e.length,Pt=(e,t,n)=>{var r=``;e>>>=2;for(var i=0;!(i>=t/4);i++){var a=(w(),j)[e+i>>>0];if(!a&&!n)break;r+=String.fromCodePoint(a)}return r},Ft=(e,t,n)=>{if(t>>>=0,n??=2147483647,4>n)return 0;var r=t;n=r+n-4;for(var i=0;i<e.length;++i){var a=e.codePointAt(i);if(65535<a&&i++,(w(),A)[t>>>2>>>0]=a,(t+=4)+4>n)break}return(w(),A)[t>>>2>>>0]=0,t-r},It=e=>{for(var t=0,n=0;n<e.length;++n)65535<e.codePointAt(n)&&n++,t+=4;return t};function Lt(e,t,n){if(e>>>=0,t>>>=0,n=st(n>>>=0),t===2)var r=jt,i=Mt,a=Nt;else r=Pt,i=Ft,a=It;ft(e,{name:n,Zc:e=>{var n=(w(),j)[e>>>2>>>0];return n=r(e+4,n*t,!0),pr(e),n},ed:(e,r)=>{if(typeof r!=`string`)throw new dt(`Cannot pass non-string to C++ string type ${n}`);var o=a(r),s=mr(4+o+t);return(w(),j)[s>>>2>>>0]=o/t,i(r,s+4,o+t),e!==null&&e.push(pr,s),s},dd:xt,gd(e){pr(e)}})}function Rt(e,t){ft(e>>>=0,{Kd:!0,name:t=st(t>>>0),Zc:()=>{},ed:()=>{}})}function zt(e){hr(e>>>0,!r,1,!n,131072,!1),be()}var Bt=e=>{if(!S)try{if(e(),!(0<ue))try{i?fr()&&yr(m):me(m)}catch(e){e instanceof ie||e==`unwind`||l(0,e)}}catch(e){e instanceof ie||e==`unwind`||l(0,e)}},Vt=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function Ht(e){e>>>=0,Vt||(Atomics.waitAsync((w(),A),e>>>2,e).value.then(Ut),e+=128,Atomics.store((w(),A),e>>>2,1))}var Ut=()=>Bt(()=>{var e=fr();e&&(Ht(e),xr())});function Wt(e,t){(e>>>=0)==t>>>0?setTimeout(Ut):i?postMessage({md:e,bd:`checkMailbox`}):(e=ve[e])&&e.postMessage({bd:`checkMailbox`})}var Gt=[];function Kt(e,t,n,r,i){for(t>>>=0,i>>>=0,Gt.length=0,n=i>>>3,r=i+r>>>3;n<r;){var a=(w(),te)[n++>>>0]?(w(),te)[n++>>>0]:(w(),ee)[n++>>>0];Gt.push(a)}return(t?bi[t]:yi[e])(...Gt)}var qt=()=>{ue=0};function Jt(e){e>>>=0,i?postMessage({bd:`cleanupThread`,Yd:e}):ye(ve[e])}function Yt(e){}var B=e=>{try{e()}catch(e){L(e)}};function Xt(e){var t=(...t)=>{en.push(e);try{return e(...t)}finally{S||(en.pop(),Qt&&Zt===1&&en.length===0&&(Zt=0,ue+=1,B(hi),typeof Fibers<`u`&&Fibers.ne()))}};return rn.set(e,t),t}var Zt=0,Qt=null,$t=0,en=[],tn=new Map,nn=new Map,rn=new Map,V=0,an=null,on=[],sn=e=>(function(e){if(!S){if(Zt===0){var t=!1,n=!1;e((e=0)=>{if(!S&&($t=e,t=!0,n)){Zt=2,B(()=>gi(Qt)),typeof MainLoop<`u`&&MainLoop.Ed&&MainLoop.resume(),e=!1;try{var r=(function(){var e=(w(),A)[Qt+8>>>2>>>0];return e=nn.get(e),e=rn.get(e),--ue,e()})()}catch(t){r=t,e=!0}var i=!1;if(!Qt){var a=an;a&&(an=null,(e?a.reject:a.resolve)(r),i=!0)}if(e&&!i)throw r}}),n=!0,t||(Zt=1,Qt=(function(){var e=mr(65548),t=e+12;if((w(),j)[e>>>2>>>0]=t,(w(),j)[e+4>>>2>>>0]=t+65536,t=en[0],!tn.has(t)){var n=V++;tn.set(t,n),nn.set(n,t)}return t=tn.get(t),(w(),A)[e+8>>>2>>>0]=t,e})(),typeof MainLoop<`u`&&MainLoop.Ed&&MainLoop.pause(),B(()=>mi(Qt)))}else Zt===2?(Zt=0,B(_i),pr(Qt),Qt=null,on.forEach(Bt)):L(`invalid state: ${Zt}`);return $t}})(t=>{e().then(t)});function H(e){return e>>>=0,sn(async()=>bt(await yt(e)))}var cn=[],ln=e=>{var t=cn.length;return cn.push(e),t},un=(e,t)=>{for(var n=Array(e),r=0;r<e;++r){var i=r,a=(w(),j)[t+4*r>>>2>>>0],o=lt[a];if(o===void 0)throw e=`parameter ${r}`,a=ur(a),t=st(a),pr(a),new dt(`${e} has unknown type ${t}`);n[i]=o}return n},dn=(e,t,n)=>{var r=[];return e=e(r,n),r.length&&((w(),j)[t>>>2>>>0]=bt(r)),e},U={},fn=e=>{var t=U[e];return t===void 0?st(e):t};function pn(e,t,n){var[r,...i]=un(e,t>>>0);t=r.ed.bind(r);var a=i.map(e=>e.dd.bind(e));e--;var o={toValue:yt};switch(e=a.map((e,t)=>{var n=`argFromPtr${t}`;return o[n]=e,`${n}(args${t?`+`+8*t:``})`}),n){case 0:var s=`toValue(handle)`;break;case 2:s=`new (toValue(handle))`;break;case 3:s=``;break;case 1:o.getStringOrSymbol=fn,s=`toValue(handle)[getStringOrSymbol(methodName)]`}return s+=`(${e})`,r.Kd||(o.toReturnWire=t,o.emval_returnValue=dn,s=`return emval_returnValue(toReturnWire, destructorsRef, ${s})`),s=`return function (handle, methodName, destructorsRef, args) {
  ${s}
  }`,n=Function(Object.keys(o),s)(...Object.values(o)),s=`methodCaller<(${i.map(e=>e.name)}) => ${r.name}>`,ln(Object.defineProperty(n,"name",{value:s}))}function mn(e,t){return t>>>=0,(e=yt(e>>>0))==yt(t)}function hn(e){return(e>>>=0)?(e=fn(e),bt(globalThis[e])):bt(globalThis)}function gn(e){return e=fn(e>>>0),bt(t[e])}function _n(e,t){return t>>>=0,e=yt(e>>>0),t=yt(t),bt(e[t])}function vn(e){9<(e>>>=0)&&(_t[e+1]+=1)}function yn(e,t,n,r,i){return cn[e>>>0](t>>>0,n>>>0,r>>>0,i>>>0)}function bn(e,t,n,r,i){return yn(e>>>0,t>>>0,n>>>0,r>>>0,i>>>0)}function xn(){return bt([])}function Sn(e){e=yt(e>>>0);for(var t=Array(e.length),n=0;n<e.length;n++)t[n]=e[n];return bt(t)}function Cn(e){return bt(fn(e>>>0))}function wn(){return bt({})}function Tn(e){for(var t=yt(e>>>=0);t.length;){var n=t.pop();t.pop()(n)}vt(e)}function En(e,t,n){t>>>=0,n>>>=0,e=yt(e>>>0),t=yt(t),n=yt(n),e[t]=n}function Dn(e,t){e=-9007199254740992>e||9007199254740992<e?NaN:Number(e),t>>>=0,e=new Date(1e3*e),(w(),A)[t>>>2>>>0]=e.getUTCSeconds(),(w(),A)[t+4>>>2>>>0]=e.getUTCMinutes(),(w(),A)[t+8>>>2>>>0]=e.getUTCHours(),(w(),A)[t+12>>>2>>>0]=e.getUTCDate(),(w(),A)[t+16>>>2>>>0]=e.getUTCMonth(),(w(),A)[t+20>>>2>>>0]=e.getUTCFullYear()-1900,(w(),A)[t+24>>>2>>>0]=e.getUTCDay(),e=(e.getTime()-Date.UTC(e.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(w(),A)[t+28>>>2>>>0]=e}var On=e=>e%4==0&&(e%100!=0||e%400==0),kn=[0,31,60,91,121,152,182,213,244,274,305,335],An=[0,31,59,90,120,151,181,212,243,273,304,334];function jn(e,t){e=-9007199254740992>e||9007199254740992<e?NaN:Number(e),t>>>=0,e=new Date(1e3*e),(w(),A)[t>>>2>>>0]=e.getSeconds(),(w(),A)[t+4>>>2>>>0]=e.getMinutes(),(w(),A)[t+8>>>2>>>0]=e.getHours(),(w(),A)[t+12>>>2>>>0]=e.getDate(),(w(),A)[t+16>>>2>>>0]=e.getMonth(),(w(),A)[t+20>>>2>>>0]=e.getFullYear()-1900,(w(),A)[t+24>>>2>>>0]=e.getDay();var n=(On(e.getFullYear())?kn:An)[e.getMonth()]+e.getDate()-1|0;(w(),A)[t+28>>>2>>>0]=n,(w(),A)[t+36>>>2>>>0]=-60*e.getTimezoneOffset(),n=new Date(e.getFullYear(),6,1).getTimezoneOffset();var r=new Date(e.getFullYear(),0,1).getTimezoneOffset();e=0|(n!=r&&e.getTimezoneOffset()==Math.min(r,n)),(w(),A)[t+32>>>2>>>0]=e}function Mn(e){e>>>=0;var t=new Date((w(),A)[e+20>>>2>>>0]+1900,(w(),A)[e+16>>>2>>>0],(w(),A)[e+12>>>2>>>0],(w(),A)[e+8>>>2>>>0],(w(),A)[e+4>>>2>>>0],(w(),A)[e>>>2>>>0],0),n=(w(),A)[e+32>>>2>>>0],r=t.getTimezoneOffset(),i=new Date(t.getFullYear(),6,1).getTimezoneOffset(),a=new Date(t.getFullYear(),0,1).getTimezoneOffset(),o=Math.min(a,i);return 0>n?(w(),A)[e+32>>>2>>>0]=+(i!=a&&o==r):0<n!=(o==r)&&(i=Math.max(a,i),t.setTime(t.getTime()+6e4*((0<n?o:i)-r))),(w(),A)[e+24>>>2>>>0]=t.getDay(),n=(On(t.getFullYear())?kn:An)[t.getMonth()]+t.getDate()-1|0,(w(),A)[e+28>>>2>>>0]=n,(w(),A)[e>>>2>>>0]=t.getSeconds(),(w(),A)[e+4>>>2>>>0]=t.getMinutes(),(w(),A)[e+8>>>2>>>0]=t.getHours(),(w(),A)[e+12>>>2>>>0]=t.getDate(),(w(),A)[e+16>>>2>>>0]=t.getMonth(),(w(),A)[e+20>>>2>>>0]=t.getYear(),e=t.getTime(),BigInt(isNaN(e)?-1:e/1e3)}function Nn(e,t,n,r,a,o,s){return i?de(16,1,e,t,n,r,a,o,s):-52}function Pn(e,t,n,r,a,o){if(i)return de(17,1,e,t,n,r,a,o)}var Fn={},In=()=>performance.timeOrigin+performance.now();function Ln(e,t){return i?de(18,1,e,t):(Fn[e]&&(clearTimeout(Fn[e].id),delete Fn[e]),t&&(Fn[e]={id:setTimeout(()=>{delete Fn[e],Bt(()=>br(e,performance.timeOrigin+performance.now()))},t),me:t}),0)}function Rn(e,t,n,r){e>>>=0,t>>>=0,n>>>=0,r>>>=0;var i=new Date().getFullYear(),a=new Date(i,0,1).getTimezoneOffset();i=new Date(i,6,1).getTimezoneOffset();var o=Math.max(a,i);(w(),j)[e>>>2>>>0]=60*o,(w(),A)[t>>>2>>>0]=+(a!=i),e=(t=e=>{var t=Math.abs(e);return`UTC${0<=e?`-`:`+`}${String(Math.floor(t/60)).padStart(2,`0`)}${String(t%60).padStart(2,`0`)}`})(a),t=t(i),i<a?(z(e,n,17),z(t,r,17)):(z(e,r,17),z(t,n,17))}var zn=()=>Date.now(),Bn=1;function Vn(e,t,n){if(n>>>=0,!(0<=e&&3>=e))return 28;if(e===0)e=Date.now();else{if(!Bn)return 52;e=performance.timeOrigin+performance.now()}return e=Math.round(1e6*e),(w(),te)[n>>>3>>>0]=BigInt(e),0}var W=[],Hn=(e,t)=>{W.length=0;for(var n;n=(w(),D)[e++>>>0];){var r=n!=105;t+=(r&=n!=112)&&t%8?4:0,W.push(n==112?(w(),j)[t>>>2>>>0]:n==106?(w(),te)[t>>>3>>>0]:n==105?(w(),A)[t>>>2>>>0]:(w(),ee)[t>>>3>>>0]),t+=r?8:4}return W};function Un(e,t,n){return e>>>=0,t=Hn(t>>>0,n>>>0),bi[e](...t)}function Wn(e,t,n){return e>>>=0,t=Hn(t>>>0,n>>>0),bi[e](...t)}var Gn=()=>{};function Kn(e,t){return x(Ke(e>>>0,t>>>0))}var G=()=>{throw ue+=1,`unwind`};function qn(){return 4294901760}var Jn=()=>navigator.hardwareConcurrency,Yn={},Xn=e=>{var t;return(t=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(e))?+t[1]:(t=/:(\d+):\d+(?:\)|$)/.exec(e))?2147483648|t[1]:0},K=e=>{for(var t of e)(e=Xn(t))&&(Yn[e]=t)};function Zn(){var e=Error().stack.toString().split(`
`);return e[0]==`Error`&&e.shift(),K(e),Yn.sd=Xn(e[3]),Yn.Ud=e,Yn.sd}function q(e){if(!(e=Yn[e>>>0]))return 0;var t;if(t=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(e))e=t[1];else if(t=/^\s+at (.*) \(.*\)$/.exec(e))e=t[1];else{if(!(t=/^(.+?)@/.exec(e)))return 0;e=t[1]}pr(q.td??0),t=Ot(e)+1;var n=mr(t);return n&&z(e,n,t),q.td=n,q.td}function J(e){e>>>=0;var t=(w(),D).length;if(e<=t||4294901760<e)return!1;for(var n=1;4>=n;n*=2){var r=t*(1+.2/n);r=Math.min(r,e+100663296);e:{r=(Math.min(4294901760,65536*Math.ceil(Math.max(e,r)/65536))-Ce.buffer.byteLength+65535)/65536|0;try{Ce.grow(r),I();var i=1;break e}catch{}i=void 0}if(i)return!0}return!1}function Qn(e,t,n){if(e>>>=0,t>>>=0,Yn.sd==e)var r=Yn.Ud;else(r=Error().stack.toString().split(`
`))[0]==`Error`&&r.shift(),K(r);for(var i=3;r[i]&&Xn(r[i])!=e;)++i;for(e=0;e<n&&r[e+i];++e)(w(),A)[t+4*e>>>2>>>0]=Xn(r[e+i]);return e}var $n,er={},tr=()=>{if(!$n){var e,t={USER:`web_user`,LOGNAME:`web_user`,PATH:`/`,PWD:`/`,HOME:`/home/web_user`,LANG:(globalThis.navigator?.language??`C`).replace(`-`,`_`)+`.UTF-8`,_:`./this.program`};for(e in er)er[e]===void 0?delete t[e]:t[e]=er[e];var n=[];for(e in t)n.push(`${e}=${t[e]}`);$n=n}return $n};function Y(e,t){if(i)return de(19,1,e,t);e>>>=0,t>>>=0;var n,r=0,a=0;for(n of tr()){var o=t+r;(w(),j)[e+a>>>2>>>0]=o,r+=z(n,o,1/0)+1,a+=4}return 0}function nr(e,t){if(i)return de(20,1,e,t);e>>>=0,t>>>=0;var n=tr();for(var r of((w(),j)[e>>>2>>>0]=n.length,e=0,n))e+=Ot(r)+1;return(w(),j)[t>>>2>>>0]=e,0}function rr(e){return i?de(21,1,e):52}function ir(e,t,n,r,a){return i?de(22,1,e,t,n,r,a):52}function ar(e,t,n,r){return i?de(23,1,e,t,n,r):52}function or(e,t,n,r){return i?de(24,1,e,t,n,r):70}var sr=[null,[],[]];function cr(e,t,n,r){if(i)return de(25,1,e,t,n,r);t>>>=0,n>>>=0,r>>>=0;for(var a=0,o=0;o<n;o++){var s=(w(),j)[t>>>2>>>0],c=(w(),j)[t+4>>>2>>>0];t+=8;for(var l=0;l<c;l++){var u=e,d=(w(),D)[s+l>>>0],f=sr[u];d===0||d===10?((u===1?b:x)(Ge(f)),f.length=0):f.push(d)}a+=c}return(w(),j)[r>>>2>>>0]=a,0}function lr(e){return e>>>0}i||(function(){for(var e=t.numThreads-1;e--;)Se();oe.push(async()=>{var e=(async function(){if(!i)return Promise.all(he.map(xe))})();se++,await e,--se==0&&ce&&(e=ce,ce=null,e())})})(),i||(Ce=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),I()),t.wasmBinary&&(f=t.wasmBinary),t.stackSave=()=>Q(),t.stackRestore=e=>Z(e),t.stackAlloc=e=>wr(e),t.setValue=function(e,t,n=`i8`){switch(n.endsWith(`*`)&&(n=`*`),n){case`i1`:case`i8`:(w(),E)[e>>>0]=t;break;case`i16`:(w(),O)[e>>>1>>>0]=t;break;case`i32`:(w(),A)[e>>>2>>>0]=t;break;case`i64`:(w(),te)[e>>>3>>>0]=BigInt(t);break;case`float`:(w(),M)[e>>>2>>>0]=t;break;case`double`:(w(),ee)[e>>>3>>>0]=t;break;case`*`:(w(),j)[e>>>2>>>0]=t;break;default:L(`invalid type for setValue: ${n}`)}},t.getValue=function(e,t=`i8`){switch(t.endsWith(`*`)&&(t=`*`),t){case`i1`:case`i8`:return(w(),E)[e>>>0];case`i16`:return(w(),O)[e>>>1>>>0];case`i32`:return(w(),A)[e>>>2>>>0];case`i64`:return(w(),te)[e>>>3>>>0];case`float`:return(w(),M)[e>>>2>>>0];case`double`:return(w(),ee)[e>>>3>>>0];case`*`:return(w(),j)[e>>>2>>>0];default:L(`invalid type for getValue: ${t}`)}},t.UTF8ToString=Ke,t.stringToUTF8=z,t.lengthBytesUTF8=Ot;var ur,dr,fr,pr,mr,hr,gr,_r,vr,yr,br,xr,X,Sr,Cr,Z,wr,Q,Tr,Er,Dr,Or,kr,Ar,jr,Mr,Nr,Pr,Fr,Ir,Lr,Rr,zr,Br,Vr,Hr,Ur,Wr,Gr,Kr,qr,Jr,Yr,Xr,Zr,Qr,$r,ei,ti,ni,ri,ii,ai,oi,si,ci,li,ui,di,fi,pi,mi,hi,gi,_i,vi,yi=[fe,pe,Be,qe,Je,Ye,Xe,Ze,Qe,$e,et,tt,nt,rt,it,at,Nn,Pn,Ln,Y,nr,rr,ir,ar,or,cr],bi={1124124:(e,n,r,i,a)=>{if(t===void 0||!t.jd)return 1;if((e=Ke(Number(e>>>0))).startsWith(`./`)&&(e=e.substring(2)),!(e=t.jd.get(e)))return 2;if(n=Number(n>>>0),r=Number(r>>>0),i=Number(i>>>0),n+r>e.byteLength)return 3;try{let o=e.subarray(n,n+r);switch(a){case 0:(w(),D).set(o,i>>>0);break;case 1:t.ae?t.ae(i,o):t.Td(i,o);break;default:return 4}return 0}catch{return 4}},1124948:()=>typeof navigator<`u`&&navigator.de?1:0,1125020:(e,n,r)=>{t.Dd(e,(w(),D).subarray(n>>>0,n+r>>>0))},1125084:()=>t.ce(),1125126:e=>{t.Cd(e)},1125163:()=>{t.Md()},1125194:()=>{t.Nd()},1125223:()=>{t.Rd()},1125248:e=>t.Ld(e),1125281:e=>t.Pd(e),1125313:(e,n,r)=>{t.rd(Number(e),Number(n),Number(r),!0)},1125376:(e,n,r)=>{t.rd(Number(e),Number(n),Number(r))},1125433:()=>typeof wasmOffsetConverter<`u`,1125490:e=>{t.ic(`Abs`,e,void 0)},1125541:e=>{t.ic(`Neg`,e,void 0)},1125592:e=>{t.ic(`Floor`,e,void 0)},1125645:e=>{t.ic(`Ceil`,e,void 0)},1125697:e=>{t.ic(`Reciprocal`,e,void 0)},1125755:e=>{t.ic(`Sqrt`,e,void 0)},1125807:e=>{t.ic(`Exp`,e,void 0)},1125858:e=>{t.ic(`Erf`,e,void 0)},1125909:e=>{t.ic(`Sigmoid`,e,void 0)},1125964:(e,n,r)=>{t.ic(`HardSigmoid`,e,{alpha:n,beta:r})},1126043:e=>{t.ic(`HardSwish`,e,void 0)},1126100:e=>{t.ic(`Log`,e,void 0)},1126151:e=>{t.ic(`Sin`,e,void 0)},1126202:e=>{t.ic(`Cos`,e,void 0)},1126253:e=>{t.ic(`Tan`,e,void 0)},1126304:e=>{t.ic(`Asin`,e,void 0)},1126356:e=>{t.ic(`Acos`,e,void 0)},1126408:e=>{t.ic(`Atan`,e,void 0)},1126460:e=>{t.ic(`Sinh`,e,void 0)},1126512:e=>{t.ic(`Cosh`,e,void 0)},1126564:e=>{t.ic(`Asinh`,e,void 0)},1126617:e=>{t.ic(`Acosh`,e,void 0)},1126670:e=>{t.ic(`Atanh`,e,void 0)},1126723:e=>{t.ic(`Tanh`,e,void 0)},1126775:e=>{t.ic(`Not`,e,void 0)},1126826:(e,n,r)=>{t.ic(`Clip`,e,{min:n,max:r})},1126895:e=>{t.ic(`Clip`,e,void 0)},1126947:(e,n)=>{t.ic(`Elu`,e,{alpha:n})},1127005:e=>{t.ic(`Gelu`,e,void 0)},1127057:e=>{t.ic(`Relu`,e,void 0)},1127109:(e,n)=>{t.ic(`LeakyRelu`,e,{alpha:n})},1127173:(e,n)=>{t.ic(`ThresholdedRelu`,e,{alpha:n})},1127243:(e,n)=>{t.ic(`Cast`,e,{to:n})},1127301:e=>{t.ic(`Add`,e,void 0)},1127352:e=>{t.ic(`Sub`,e,void 0)},1127403:e=>{t.ic(`Mul`,e,void 0)},1127454:e=>{t.ic(`Div`,e,void 0)},1127505:e=>{t.ic(`Pow`,e,void 0)},1127556:e=>{t.ic(`Equal`,e,void 0)},1127609:e=>{t.ic(`Greater`,e,void 0)},1127664:e=>{t.ic(`GreaterOrEqual`,e,void 0)},1127726:e=>{t.ic(`Less`,e,void 0)},1127778:e=>{t.ic(`LessOrEqual`,e,void 0)},1127837:(e,n,r,i,a)=>{t.ic(`ReduceMean`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1128012:(e,n,r,i,a)=>{t.ic(`ReduceMax`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1128186:(e,n,r,i,a)=>{t.ic(`ReduceMin`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1128360:(e,n,r,i,a)=>{t.ic(`ReduceProd`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1128535:(e,n,r,i,a)=>{t.ic(`ReduceSum`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1128709:(e,n,r,i,a)=>{t.ic(`ReduceL1`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1128882:(e,n,r,i,a)=>{t.ic(`ReduceL2`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1129055:(e,n,r,i,a)=>{t.ic(`ReduceLogSum`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1129232:(e,n,r,i,a)=>{t.ic(`ReduceSumSquare`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1129412:(e,n,r,i,a)=>{t.ic(`ReduceLogSumExp`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1129592:e=>{t.ic(`Where`,e,void 0)},1129645:(e,n,r)=>{t.ic(`Transpose`,e,{perm:n?Array.from((w(),A).subarray(Number(n)>>>0,Number(r)>>>0)):[]})},1129769:(e,n,r,i)=>{t.ic(`DepthToSpace`,e,{blocksize:n,mode:Ke(r),format:i?`NHWC`:`NCHW`})},1129902:(e,n,r,i)=>{t.ic(`DepthToSpace`,e,{blocksize:n,mode:Ke(r),format:i?`NHWC`:`NCHW`})},1130035:(e,n,r,i)=>{t.ic(`DFT`,e,{axis:n,inverse:r,onesided:i})},1130127:(e,n,r,i,a,o,s,c,l,u,d,f,p,m,h)=>{t.ic(`ConvTranspose`,e,{format:l?`NHWC`:`NCHW`,autoPad:n,dilations:[r],group:i,kernelShape:[a],pads:[o,s],strides:[c],wIsConst:()=>!!(w(),E)[u>>>0],outputPadding:d?Array.from((w(),A).subarray(Number(d)>>>0,Number(f)>>>0)):[],outputShape:p?Array.from((w(),A).subarray(Number(p)>>>0,Number(m)>>>0)):[],activation:Ke(h)})},1130560:(e,n,r,i,a,o,s,c,l,u,d,f,p,m)=>{t.ic(`ConvTranspose`,e,{format:c?`NHWC`:`NCHW`,autoPad:n,dilations:Array.from((w(),A).subarray(Number(r)>>>0,(Number(r)>>>0)+2>>>0)),group:i,kernelShape:Array.from((w(),A).subarray(Number(a)>>>0,(Number(a)>>>0)+2>>>0)),pads:Array.from((w(),A).subarray(Number(o)>>>0,(Number(o)>>>0)+4>>>0)),strides:Array.from((w(),A).subarray(Number(s)>>>0,(Number(s)>>>0)+2>>>0)),wIsConst:()=>!!(w(),E)[l>>>0],outputPadding:u?Array.from((w(),A).subarray(Number(u)>>>0,Number(d)>>>0)):[],outputShape:f?Array.from((w(),A).subarray(Number(f)>>>0,Number(p)>>>0)):[],activation:Ke(m)})},1131221:(e,n,r,i,a,o,s,c,l,u,d,f,p,m,h)=>{t.ic(`ConvTranspose`,e,{format:l?`NHWC`:`NCHW`,autoPad:n,dilations:[r],group:i,kernelShape:[a],pads:[o,s],strides:[c],wIsConst:()=>!!(w(),E)[u>>>0],outputPadding:d?Array.from((w(),A).subarray(Number(d)>>>0,Number(f)>>>0)):[],outputShape:p?Array.from((w(),A).subarray(Number(p)>>>0,Number(m)>>>0)):[],activation:Ke(h)})},1131654:(e,n,r,i,a,o,s,c,l,u,d,f,p,m)=>{t.ic(`ConvTranspose`,e,{format:c?`NHWC`:`NCHW`,autoPad:n,dilations:Array.from((w(),A).subarray(Number(r)>>>0,(Number(r)>>>0)+2>>>0)),group:i,kernelShape:Array.from((w(),A).subarray(Number(a)>>>0,(Number(a)>>>0)+2>>>0)),pads:Array.from((w(),A).subarray(Number(o)>>>0,(Number(o)>>>0)+4>>>0)),strides:Array.from((w(),A).subarray(Number(s)>>>0,(Number(s)>>>0)+2>>>0)),wIsConst:()=>!!(w(),E)[l>>>0],outputPadding:u?Array.from((w(),A).subarray(Number(u)>>>0,Number(d)>>>0)):[],outputShape:f?Array.from((w(),A).subarray(Number(f)>>>0,Number(p)>>>0)):[],activation:Ke(m)})},1132315:(e,n)=>{t.ic(`GlobalAveragePool`,e,{format:n?`NHWC`:`NCHW`})},1132406:(e,n,r,i,a,o,s,c,l,u,d,f,p,m)=>{t.ic(`AveragePool`,e,{format:m?`NHWC`:`NCHW`,auto_pad:n,ceil_mode:r,count_include_pad:i,storage_order:a,dilations:o?Array.from((w(),A).subarray(Number(o)>>>0,Number(s)>>>0)):[],kernel_shape:c?Array.from((w(),A).subarray(Number(c)>>>0,Number(l)>>>0)):[],pads:u?Array.from((w(),A).subarray(Number(u)>>>0,Number(d)>>>0)):[],strides:f?Array.from((w(),A).subarray(Number(f)>>>0,Number(p)>>>0)):[]})},1132885:(e,n)=>{t.ic(`GlobalAveragePool`,e,{format:n?`NHWC`:`NCHW`})},1132976:(e,n,r,i,a,o,s,c,l,u,d,f,p,m)=>{t.ic(`AveragePool`,e,{format:m?`NHWC`:`NCHW`,auto_pad:n,ceil_mode:r,count_include_pad:i,storage_order:a,dilations:o?Array.from((w(),A).subarray(Number(o)>>>0,Number(s)>>>0)):[],kernel_shape:c?Array.from((w(),A).subarray(Number(c)>>>0,Number(l)>>>0)):[],pads:u?Array.from((w(),A).subarray(Number(u)>>>0,Number(d)>>>0)):[],strides:f?Array.from((w(),A).subarray(Number(f)>>>0,Number(p)>>>0)):[]})},1133455:(e,n)=>{t.ic(`GlobalMaxPool`,e,{format:n?`NHWC`:`NCHW`})},1133542:(e,n,r,i,a,o,s,c,l,u,d,f,p,m)=>{t.ic(`MaxPool`,e,{format:m?`NHWC`:`NCHW`,auto_pad:n,ceil_mode:r,count_include_pad:i,storage_order:a,dilations:o?Array.from((w(),A).subarray(Number(o)>>>0,Number(s)>>>0)):[],kernel_shape:c?Array.from((w(),A).subarray(Number(c)>>>0,Number(l)>>>0)):[],pads:u?Array.from((w(),A).subarray(Number(u)>>>0,Number(d)>>>0)):[],strides:f?Array.from((w(),A).subarray(Number(f)>>>0,Number(p)>>>0)):[]})},1134017:(e,n)=>{t.ic(`GlobalMaxPool`,e,{format:n?`NHWC`:`NCHW`})},1134104:(e,n,r,i,a,o,s,c,l,u,d,f,p,m)=>{t.ic(`MaxPool`,e,{format:m?`NHWC`:`NCHW`,auto_pad:n,ceil_mode:r,count_include_pad:i,storage_order:a,dilations:o?Array.from((w(),A).subarray(Number(o)>>>0,Number(s)>>>0)):[],kernel_shape:c?Array.from((w(),A).subarray(Number(c)>>>0,Number(l)>>>0)):[],pads:u?Array.from((w(),A).subarray(Number(u)>>>0,Number(d)>>>0)):[],strides:f?Array.from((w(),A).subarray(Number(f)>>>0,Number(p)>>>0)):[]})},1134579:(e,n,r,i,a)=>{t.ic(`Gemm`,e,{alpha:n,beta:r,transA:i,transB:a})},1134683:e=>{t.ic(`MatMul`,e,void 0)},1134737:(e,n,r,i)=>{t.ic(`ArgMax`,e,{keepDims:!!n,selectLastIndex:!!r,axis:i})},1134845:(e,n,r,i)=>{t.ic(`ArgMin`,e,{keepDims:!!n,selectLastIndex:!!r,axis:i})},1134953:(e,n)=>{t.ic(`Softmax`,e,{axis:n})},1135016:(e,n)=>{t.ic(`Concat`,e,{axis:n})},1135076:(e,n,r,i,a)=>{t.ic(`Split`,e,{axis:n,numOutputs:r,splitSizes:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1135232:e=>{t.ic(`Expand`,e,void 0)},1135286:(e,n)=>{t.ic(`Gather`,e,{axis:Number(n)})},1135357:(e,n)=>{t.ic(`GatherElements`,e,{axis:Number(n)})},1135436:(e,n)=>{t.ic(`GatherND`,e,{batch_dims:Number(n)})},1135515:(e,n,r,i,a,o,s,c,l,u,d)=>{t.ic(`Resize`,e,{antialias:n,axes:r?Array.from((w(),A).subarray(Number(r)>>>0,Number(i)>>>0)):[],coordinateTransformMode:Ke(a),cubicCoeffA:o,excludeOutside:s,extrapolationValue:c,keepAspectRatioPolicy:Ke(l),mode:Ke(u),nearestMode:Ke(d)})},1135877:(e,n,r,i,a,o,s)=>{t.ic(`Slice`,e,{starts:n?Array.from((w(),A).subarray(Number(n)>>>0,Number(r)>>>0)):[],ends:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[],axes:o?Array.from((w(),A).subarray(Number(o)>>>0,Number(s)>>>0)):[]})},1136141:e=>{t.ic(`Tile`,e,void 0)},1136193:(e,n,r)=>{t.ic(`InstanceNormalization`,e,{epsilon:n,format:r?`NHWC`:`NCHW`})},1136307:(e,n,r)=>{t.ic(`InstanceNormalization`,e,{epsilon:n,format:r?`NHWC`:`NCHW`})},1136421:e=>{t.ic(`Range`,e,void 0)},1136474:(e,n)=>{t.ic(`Einsum`,e,{equation:Ke(n)})},1136555:(e,n,r,i,a)=>{t.ic(`Pad`,e,{mode:n,value:r,pads:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1136698:(e,n,r,i,a,o)=>{t.ic(`BatchNormalization`,e,{epsilon:n,momentum:r,spatial:!!a,trainingMode:!!i,format:o?`NHWC`:`NCHW`})},1136867:(e,n,r,i,a,o)=>{t.ic(`BatchNormalization`,e,{epsilon:n,momentum:r,spatial:!!a,trainingMode:!!i,format:o?`NHWC`:`NCHW`})},1137036:(e,n,r)=>{t.ic(`CumSum`,e,{exclusive:Number(n),reverse:Number(r)})},1137133:(e,n,r)=>{t.ic(`DequantizeLinear`,e,{axis:n,blockSize:r})},1137223:(e,n,r,i,a)=>{t.ic(`GridSample`,e,{align_corners:n,mode:Ke(r),padding_mode:Ke(i),format:a?`NHWC`:`NCHW`})},1137393:(e,n,r,i,a)=>{t.ic(`GridSample`,e,{align_corners:n,mode:Ke(r),padding_mode:Ke(i),format:a?`NHWC`:`NCHW`})},1137563:(e,n)=>{t.ic(`ScatterND`,e,{reduction:Ke(n)})},1137648:(e,n,r,i,a,o,s,c,l)=>{t.ic(`Attention`,e,{numHeads:n,isUnidirectional:r,maskFilterValue:i,scale:a,doRotary:o,qkvHiddenSizes:s?Array.from((w(),A).subarray(Number(c)>>>0,Number(c)+s>>>0)):[],pastPresentShareBuffer:!!l})},1137920:e=>{t.ic(`BiasAdd`,e,void 0)},1137975:e=>{t.ic(`BiasSplitGelu`,e,void 0)},1138036:e=>{t.ic(`FastGelu`,e,void 0)},1138092:(e,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g)=>{t.ic(`Conv`,e,{format:f?`NHWC`:`NCHW`,auto_pad:n,dilations:r?Array.from((w(),A).subarray(Number(r)>>>0,Number(i)>>>0)):[],group:a,kernel_shape:o?Array.from((w(),A).subarray(Number(o)>>>0,Number(s)>>>0)):[],pads:c?Array.from((w(),A).subarray(Number(c)>>>0,Number(l)>>>0)):[],strides:u?Array.from((w(),A).subarray(Number(u)>>>0,Number(d)>>>0)):[],w_is_const:()=>!!(w(),E)[Number(p)>>>0],activation:Ke(m),activation_params:h?Array.from((w(),M).subarray(Number(h)>>>0,Number(g)>>>0)):[]})},1138676:e=>{t.ic(`Gelu`,e,void 0)},1138728:(e,n,r,i,a,o,s,c,l)=>{t.ic(`GroupQueryAttention`,e,{numHeads:n,kvNumHeads:r,scale:i,softcap:a,doRotary:o,rotaryInterleaved:s,smoothSoftmax:c,localWindowSize:l})},1138945:(e,n,r,i)=>{t.ic(`LayerNormalization`,e,{axis:n,epsilon:r,simplified:!!i})},1139056:(e,n,r,i)=>{t.ic(`LayerNormalization`,e,{axis:n,epsilon:r,simplified:!!i})},1139167:(e,n,r,i,a,o)=>{t.ic(`MatMulNBits`,e,{k:n,n:r,accuracyLevel:i,bits:a,blockSize:o})},1139294:(e,n,r,i,a,o)=>{t.ic(`MultiHeadAttention`,e,{numHeads:n,isUnidirectional:r,maskFilterValue:i,scale:a,doRotary:o})},1139453:(e,n)=>{t.ic(`QuickGelu`,e,{alpha:n})},1139517:(e,n,r,i,a)=>{t.ic(`RotaryEmbedding`,e,{interleaved:!!n,numHeads:r,rotaryEmbeddingDim:i,scale:a})},1139656:(e,n,r)=>{t.ic(`SkipLayerNormalization`,e,{epsilon:n,simplified:!!r})},1139758:(e,n,r)=>{t.ic(`SkipLayerNormalization`,e,{epsilon:n,simplified:!!r})},1139860:(e,n,r,i)=>{t.ic(`GatherBlockQuantized`,e,{gatherAxis:n,quantizeAxis:r,blockSize:i})},1139981:e=>{t.Qd(e)},1140015:(e,n)=>t.Sd(Number(e),Number(n),t.hd.Vd,t.hd.errors)};function xi(e,n,r){return sn(async()=>{await t.Od(Number(e),Number(n),Number(r))})}function Si(){return typeof wasmOffsetConverter<`u`}function Ci(e,t,n,r){var i=Q();try{return zr(e,t,n,r)}catch(e){if(Z(i),e!==e+0)throw e;X(1,0)}}function wi(e,t,n){var r=Q();try{return Lr(e,t,n)}catch(e){if(Z(r),e!==e+0)throw e;X(1,0)}}function Ti(e){var t=Q();try{Fr(e)}catch(e){if(Z(t),e!==e+0)throw e;X(1,0)}}function Ei(e,t){var n=Q();try{return Ar(e,t)}catch(e){if(Z(n),e!==e+0)throw e;X(1,0)}}function Di(e,t,n){var r=Q();try{kr(e,t,n)}catch(e){if(Z(r),e!==e+0)throw e;X(1,0)}}function $(e,t,n,r){var i=Q();try{return Wr(e,t,n,r)}catch(e){if(Z(i),e!==e+0)throw e;X(1,0)}}function Oi(e,t){var n=Q();try{Br(e,t)}catch(e){if(Z(n),e!==e+0)throw e;X(1,0)}}function ki(e,t,n,r,i,a,o){var s=Q();try{return Rr(e,t,n,r,i,a,o)}catch(e){if(Z(s),e!==e+0)throw e;X(1,0)}}function Ai(e,t,n,r,i,a){var o=Q();try{jr(e,t,n,r,i,a)}catch(e){if(Z(o),e!==e+0)throw e;X(1,0)}}function ji(e,t,n,r){var i=Q();try{Nr(e,t,n,r)}catch(e){if(Z(i),e!==e+0)throw e;X(1,0)}}function Mi(e,t,n,r,i){var a=Q();try{Ir(e,t,n,r,i)}catch(e){if(Z(a),e!==e+0)throw e;X(1,0)}}function Ni(e,t,n,r,i,a,o){var s=Q();try{Hr(e,t,n,r,i,a,o)}catch(e){if(Z(s),e!==e+0)throw e;X(1,0)}}function Pi(e,t,n,r,i,a,o){var s=Q();try{Ur(e,t,n,r,i,a,o)}catch(e){if(Z(s),e!==e+0)throw e;X(1,0)}}function Fi(e,t,n,r,i,a,o,s){var c=Q();try{Jr(e,t,n,r,i,a,o,s)}catch(e){if(Z(c),e!==e+0)throw e;X(1,0)}}function Ii(e,t,n,r,i){var a=Q();try{return Vr(e,t,n,r,i)}catch(e){if(Z(a),e!==e+0)throw e;X(1,0)}}function Li(e,t,n){var r=Q();try{return Pr(e,t,n)}catch(e){if(Z(r),e!==e+0)throw e;X(1,0)}}function Ri(e,t,n,r,i,a,o,s){var c=Q();try{Yr(e,t,n,r,i,a,o,s)}catch(e){if(Z(c),e!==e+0)throw e;X(1,0)}}function zi(e,t,n,r,i,a,o,s,c,l,u,d){var f=Q();try{Gr(e,t,n,r,i,a,o,s,c,l,u,d)}catch(e){if(Z(f),e!==e+0)throw e;X(1,0)}}function Bi(e,t,n){var r=Q();try{return Xr(e,t,n)}catch(e){if(Z(r),e!==e+0)throw e;return X(1,0),0n}}function Vi(e,t,n,r,i,a,o,s,c){var l=Q();try{Mr(e,t,n,r,i,a,o,s,c)}catch(e){if(Z(l),e!==e+0)throw e;X(1,0)}}function Hi(e){var t=Q();try{return Zr(e)}catch(e){if(Z(t),e!==e+0)throw e;X(1,0)}}function Ui(e,t){var n=Q();try{return fi(e,t)}catch(e){if(Z(n),e!==e+0)throw e;return X(1,0),0n}}function Wi(e,t,n,r){var i=Q();try{return Qr(e,t,n,r)}catch(e){if(Z(i),e!==e+0)throw e;X(1,0)}}function Gi(e,t,n,r,i,a,o){var s=Q();try{pi(e,t,n,r,i,a,o)}catch(e){if(Z(s),e!==e+0)throw e;X(1,0)}}function Ki(e){var t=Q();try{return $r(e)}catch(e){if(Z(t),e!==e+0)throw e;return X(1,0),0n}}function qi(e,t,n,r,i){var a=Q();try{return ai(e,t,n,r,i)}catch(e){if(Z(a),e!==e+0)throw e;X(1,0)}}function Ji(e,t,n,r,i,a){var o=Q();try{return oi(e,t,n,r,i,a)}catch(e){if(Z(o),e!==e+0)throw e;X(1,0)}}function Yi(e,t,n,r,i,a){var o=Q();try{return Kr(e,t,n,r,i,a)}catch(e){if(Z(o),e!==e+0)throw e;X(1,0)}}function Xi(e,t,n,r,i,a){var o=Q();try{return si(e,t,n,r,i,a)}catch(e){if(Z(o),e!==e+0)throw e;X(1,0)}}function Zi(e,t,n,r,i,a,o,s){var c=Q();try{return qr(e,t,n,r,i,a,o,s)}catch(e){if(Z(c),e!==e+0)throw e;X(1,0)}}function Qi(e,t,n,r,i){var a=Q();try{return ci(e,t,n,r,i)}catch(e){if(Z(a),e!==e+0)throw e;return X(1,0),0n}}function $i(e,t,n,r){var i=Q();try{return li(e,t,n,r)}catch(e){if(Z(i),e!==e+0)throw e;X(1,0)}}function ea(e,t,n,r){var i=Q();try{return ui(e,t,n,r)}catch(e){if(Z(i),e!==e+0)throw e;X(1,0)}}function ta(e,t,n,r,i,a,o,s,c,l,u,d){var f=Q();try{return di(e,t,n,r,i,a,o,s,c,l,u,d)}catch(e){if(Z(f),e!==e+0)throw e;X(1,0)}}function na(e,t,n,r,i,a,o,s,c,l,u){var d=Q();try{ri(e,t,n,r,i,a,o,s,c,l,u)}catch(e){if(Z(d),e!==e+0)throw e;X(1,0)}}function ra(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){var g=Q();try{ii(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}catch(e){if(Z(g),e!==e+0)throw e;X(1,0)}}function ia(e,t,n){var r=Q();try{return ei(e,t,n)}catch(e){if(Z(r),e!==e+0)throw e;X(1,0)}}function aa(e,t,n){var r=Q();try{return ti(e,t,n)}catch(e){if(Z(r),e!==e+0)throw e;X(1,0)}}function oa(e,t,n,r){var i=Q();try{ni(e,t,n,r)}catch(e){if(Z(i),e!==e+0)throw e;X(1,0)}}function sa(){if(0<se)ce=sa;else if(i)h?.(t),ne();else{for(var e=oe;0<e.length;)e.shift()(t);0<se?ce=sa:(t.calledRun=!0,S||(ne(),h?.(t)))}}return i||(vi=await R(),sa()),t.PTR_SIZE=4,F?t:new Promise((e,t)=>{h=e,g=t})}var nt,rt,it=w(()=>{nt=tt,rt=globalThis.self?.name?.startsWith(`em-pthread`),rt&&tt()}),at,ot,st,ct,lt,ut,dt,ft,pt,mt,ht,gt,_t,vt,yt=w(()=>{Je(),at=typeof location>`u`?void 0:location.origin,ot=import.meta.url>`file:`&&import.meta.url<`file;`,st=()=>ot?new URL(new URL(`ort.bundle.min.mjs`,import.meta.url).href,at).href:import.meta.url,ct=st(),lt=()=>{if(ct&&!ct.startsWith(`blob:`))return ct.substring(0,ct.lastIndexOf(`/`)+1)},ut=(e,t)=>{try{let n=t??ct;return(n?new URL(e,n):new URL(e)).origin===at}catch{return!1}},dt=(e,t)=>{let n=t??ct;try{return(n?new URL(e,n):new URL(e)).href}catch{return}},ft=(e,t)=>`${t??`./`}${e}`,pt=async e=>{let t=await(await fetch(e,{credentials:`same-origin`})).blob();return URL.createObjectURL(t)},mt=async e=>(await import(e)).default,ht=($e(),D(Ye)).default,gt=async()=>{if(!ct)throw Error(`Failed to load proxy worker: cannot determine the script source URL.`);if(ut(ct))return[void 0,ht()];let e=await pt(ct);return[e,ht(e)]},_t=(it(),D(et)).default,vt=async(e,t,n,r)=>{let i=_t&&!(e||t);if(i){if(ct)i=ut(ct)||r&&!n;else if(r&&!n)i=!0;else throw Error(`cannot determine the script source URL.`)}if(i)return[void 0,_t];{let r=`ort-wasm-simd-threaded.jsep.mjs`,i=e??dt(r,t),a=n&&i&&!ut(i,t),o=a?await pt(i):i??ft(r,t);return[a?o:void 0,await mt(o)]}}}),bt,xt,St,Ct,wt,Tt,Et,Dt,z,Ot=w(()=>{yt(),xt=!1,St=!1,Ct=!1,wt=()=>{if(typeof SharedArrayBuffer>`u`)return!1;try{return typeof MessageChannel<`u`&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Tt=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Et=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Dt=async e=>{if(xt)return Promise.resolve();if(St)throw Error(`multiple calls to 'initializeWebAssembly()' detected.`);if(Ct)throw Error(`previous call to 'initializeWebAssembly()' failed.`);St=!0;let t=e.initTimeout,n=e.numThreads;if(e.simd!==!1){if(e.simd===`relaxed`){if(!Et())throw Error(`Relaxed WebAssembly SIMD is not supported in the current environment.`)}else if(!Tt())throw Error(`WebAssembly SIMD is not supported in the current environment.`)}let r=wt();n>1&&!r&&(typeof self<`u`&&!self.crossOriginIsolated&&console.warn(`env.wasm.numThreads is set to `+n+`, but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info.`),console.warn(`WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading.`),e.numThreads=n=1);let i=e.wasmPaths,a=typeof i==`string`?i:void 0,o=i?.mjs,s=o?.href??o,c=i?.wasm,l=c?.href??c,u=e.wasmBinary,[d,f]=await vt(s,a,n>1,!!u||!!l),p=!1,m=[];if(t>0&&m.push(new Promise(e=>{setTimeout(()=>{p=!0,e()},t)})),m.push(new Promise((e,t)=>{let r={numThreads:n};if(u)r.wasmBinary=u,r.locateFile=e=>e;else if(l||a)r.locateFile=e=>l??a+e;else if(s&&s.indexOf(`blob:`)!==0)r.locateFile=e=>new URL(e,s).href;else if(d){let e=lt();e&&(r.locateFile=t=>e+t)}f(r).then(t=>{St=!1,xt=!0,bt=t,e(),d&&URL.revokeObjectURL(d)},e=>{St=!1,Ct=!0,t(e)})})),await Promise.race(m),p)throw Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},z=()=>{if(xt&&bt)return bt;throw Error(`WebAssembly is not initialized yet.`)}}),kt,At,jt,Mt=w(()=>{Ot(),kt=(e,t)=>{let n=z(),r=n.lengthBytesUTF8(e)+1,i=n._malloc(r);return n.stringToUTF8(e,i,r),t.push(i),i},At=(e,t,n,r)=>{if(typeof e==`object`&&e){if(n.has(e))throw Error(`Circular reference in options`);n.add(e)}Object.entries(e).forEach(([e,i])=>{let a=t?t+e:e;if(typeof i==`object`)At(i,a+`.`,n,r);else if(typeof i==`string`||typeof i==`number`)r(a,i.toString());else if(typeof i==`boolean`)r(a,i?`1`:`0`);else throw Error(`Can't handle extra config type: ${typeof i}`)})},jt=e=>{let t=z(),n=t.stackSave();try{let n=t.PTR_SIZE,r=t.stackAlloc(2*n);t._OrtGetLastError(r,r+n);let i=Number(t.getValue(r,n===4?`i32`:`i64`)),a=t.getValue(r+n,`*`),o=a?t.UTF8ToString(a):``;throw Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${o}`)}finally{t.stackRestore(n)}}}),Nt,Pt=w(()=>{Ot(),Mt(),Nt=(e,t)=>{let n=z(),r=0,i=[],a=e||{};try{if(e?.logSeverityLevel===void 0)a.logSeverityLevel=2;else if(typeof e.logSeverityLevel!=`number`||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)a.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!=`number`||!Number.isInteger(e.logVerbosityLevel))throw Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(a.terminate=!1);let o=0;e?.tag!==void 0&&(o=kt(e.tag,i)),r=n._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,o),r===0&&jt(`Can't create run options.`),e?.extra!==void 0&&At(e.extra,``,new WeakSet,(e,t)=>{let a=kt(e,i),o=kt(t,i);n._OrtAddRunConfigEntry(r,a,o)!==0&&jt(`Can't set a run config entry: ${e} - ${t}.`)});for(let e of t)n._OrtRunOptionsAddActiveLoraAdapter(r,e)!==0&&jt(`Can't add an active LoRA adapter.`);return[r,i]}catch(e){throw r!==0&&n._OrtReleaseRunOptions(r),i.forEach(e=>n._free(e)),e}}}),Ft,It,Lt,Rt,zt,Bt,Vt=w(()=>{Ot(),Mt(),Ft=e=>{switch(e){case`disabled`:return 0;case`basic`:return 1;case`extended`:return 2;case`layout`:return 3;case`all`:return 99;default:throw Error(`unsupported graph optimization level: ${e}`)}},It=e=>{switch(e){case`sequential`:return 0;case`parallel`:return 1;default:throw Error(`unsupported execution mode: ${e}`)}},Lt=e=>{e.extra||={},e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||=`1`,e.executionProviders&&e.executionProviders.some(e=>(typeof e==`string`?e:e.name)===`webgpu`)&&(e.enableMemPattern=!1)},Rt=(e,t,n,r)=>{let i=kt(t,r),a=kt(n,r);z()._OrtAddSessionConfigEntry(e,i,a)!==0&&jt(`Can't set a session config entry: ${t} - ${n}.`)},zt=async(e,t,n)=>{let r=t.executionProviders;for(let t of r){let r=typeof t==`string`?t:t.name,i=[];switch(r){case`webnn`:if(r=`WEBNN`,Rt(e,`session.disable_quant_qdq`,`1`,n),Rt(e,`session.disable_qdq_constant_folding`,`1`,n),typeof t!=`string`){let r=t?.deviceType;r&&Rt(e,`deviceType`,r,n)}break;case`webgpu`:if(r=`JS`,typeof t!=`string`){let r=t;if(r?.preferredLayout){if(r.preferredLayout!==`NCHW`&&r.preferredLayout!==`NHWC`)throw Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${r.preferredLayout}`);Rt(e,`preferredLayout`,r.preferredLayout,n)}}break;case`wasm`:case`cpu`:continue;default:throw Error(`not supported execution provider: ${r}`)}let a=i.length,o=0,s=0;if(a>0){o=z()._malloc(a*z().PTR_SIZE),n.push(o),s=z()._malloc(a*z().PTR_SIZE),n.push(s);for(let e=0;e<a;e++)z().setValue(o+e*z().PTR_SIZE,i[e][0],`*`),z().setValue(s+e*z().PTR_SIZE,i[e][1],`*`)}let c;{let t=kt(r,n);c=await z()._OrtAppendExecutionProvider(e,t,o,s,a)}c!==0&&jt(`Can't append execution provider: ${r}.`)}},Bt=async e=>{let t=z(),n=0,r=[],i=e||{};Lt(i);try{let e=Ft(i.graphOptimizationLevel??`all`),a=It(i.executionMode??`sequential`),o=typeof i.logId==`string`?kt(i.logId,r):0,s=i.logSeverityLevel??2;if(!Number.isInteger(s)||s<0||s>4)throw Error(`log severity level is not valid: ${s}`);let c=i.logVerbosityLevel??0;if(!Number.isInteger(c)||c<0||c>4)throw Error(`log verbosity level is not valid: ${c}`);let l=typeof i.optimizedModelFilePath==`string`?kt(i.optimizedModelFilePath,r):0;if(n=t._OrtCreateSessionOptions(e,!!i.enableCpuMemArena,!!i.enableMemPattern,a,!!i.enableProfiling,0,o,s,c,l),n===0&&jt(`Can't create session options.`),i.executionProviders&&await zt(n,i,r),i.enableGraphCapture!==void 0){if(typeof i.enableGraphCapture!=`boolean`)throw Error(`enableGraphCapture must be a boolean value: ${i.enableGraphCapture}`);Rt(n,`enableGraphCapture`,i.enableGraphCapture.toString(),r)}if(i.freeDimensionOverrides)for(let[e,a]of Object.entries(i.freeDimensionOverrides)){if(typeof e!=`string`)throw Error(`free dimension override name must be a string: ${e}`);if(typeof a!=`number`||!Number.isInteger(a)||a<0)throw Error(`free dimension override value must be a non-negative integer: ${a}`);let i=kt(e,r);t._OrtAddFreeDimensionOverride(n,i,a)!==0&&jt(`Can't set a free dimension override: ${e} - ${a}.`)}return i.extra!==void 0&&At(i.extra,``,new WeakSet,(e,t)=>{Rt(n,e,t,r)}),[n,r]}catch(e){throw n!==0&&t._OrtReleaseSessionOptions(n)!==0&&jt(`Can't release session options.`),r.forEach(e=>t._free(e)),e}}}),Ht,Ut,Wt,Gt,Kt,qt,Jt,Yt,B=w(()=>{Ht=e=>{switch(e){case`int8`:return 3;case`uint8`:return 2;case`bool`:return 9;case`int16`:return 5;case`uint16`:return 4;case`int32`:return 6;case`uint32`:return 12;case`float16`:return 10;case`float32`:return 1;case`float64`:return 11;case`string`:return 8;case`int64`:return 7;case`uint64`:return 13;case`int4`:return 22;case`uint4`:return 21;default:throw Error(`unsupported data type: ${e}`)}},Ut=e=>{switch(e){case 3:return`int8`;case 2:return`uint8`;case 9:return`bool`;case 5:return`int16`;case 4:return`uint16`;case 6:return`int32`;case 12:return`uint32`;case 10:return`float16`;case 1:return`float32`;case 11:return`float64`;case 8:return`string`;case 7:return`int64`;case 13:return`uint64`;case 22:return`int4`;case 21:return`uint4`;default:throw Error(`unsupported data type: ${e}`)}},Wt=(e,t)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r=typeof t==`number`?t:t.reduce((e,t)=>e*t,1);return n>0?Math.ceil(r*n):void 0},Gt=e=>{switch(e){case`float16`:return typeof Float16Array<`u`?Float16Array:Uint16Array;case`float32`:return Float32Array;case`uint8`:return Uint8Array;case`int8`:return Int8Array;case`uint16`:return Uint16Array;case`int16`:return Int16Array;case`int32`:return Int32Array;case`bool`:return Uint8Array;case`float64`:return Float64Array;case`uint32`:return Uint32Array;case`int64`:return BigInt64Array;case`uint64`:return BigUint64Array;default:throw Error(`unsupported type: ${e}`)}},Kt=e=>{switch(e){case`verbose`:return 0;case`info`:return 1;case`warning`:return 2;case`error`:return 3;case`fatal`:return 4;default:throw Error(`unsupported logging level: ${e}`)}},qt=e=>e===`float32`||e===`float16`||e===`int32`||e===`int64`||e===`uint32`||e===`uint8`||e===`bool`||e===`uint4`||e===`int4`,Jt=e=>e===`float32`||e===`float16`||e===`int32`||e===`int64`||e===`uint32`||e===`uint64`||e===`int8`||e===`uint8`||e===`bool`||e===`uint4`||e===`int4`,Yt=e=>{switch(e){case`none`:return 0;case`cpu`:return 1;case`cpu-pinned`:return 2;case`texture`:return 3;case`gpu-buffer`:return 4;case`ml-tensor`:return 5;default:throw Error(`unsupported data location: ${e}`)}}}),Xt,Zt=w(()=>{Je(),Xt=async e=>{if(typeof e==`string`){let t=await fetch(e);if(!t.ok)throw Error(`failed to load external data file: ${e}`);let n=t.headers.get(`Content-Length`),r=n?parseInt(n,10):0;if(r<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw Error(`failed to load external data file: ${e}, no response body.`);let n=t.body.getReader(),i;try{i=new ArrayBuffer(r)}catch(e){if(e instanceof RangeError){let e=Math.ceil(r/65536);i=new WebAssembly.Memory({initial:e,maximum:e}).buffer}else throw e}let a=0;for(;;){let{done:e,value:t}=await n.read();if(e)break;let r=t.byteLength;new Uint8Array(i,a,r).set(t),a+=r}return new Uint8Array(i,0,r)}}return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Qt,$t,en,tn,nn,rn,V,an=w(()=>{B(),Qt=[`V`,`I`,`W`,`E`,`F`],$t=(e,t)=>{console.log(`[${Qt[e]},${new Date().toISOString()}]${t}`)},nn=(e,t)=>{en=e,tn=t},rn=(e,t)=>{let n=Kt(e);n>=Kt(en)&&$t(n,typeof t==`function`?t():t)},V=(...e)=>{tn&&rn(...e)}}),on,sn,H,cn,ln,un,dn,U=w(()=>{on=class{static calcMatMulShape(e,t){return e[1]===t[0]?[e[0],t[1]]:void 0}},sn=class{static calcShape(e,t,n=!1){let r=e.length,i=t.length;if(r===0)return t;if(i===0)return e;let a=Math.max(e.length,t.length),o=Array(a);if(n){if(r<2||i<2)return;let n=on.calcMatMulShape([e[r-2],e[r-1]],[t[i-2],t[i-1]]);if(n===void 0)return;[o[a-2],o[a-1]]=n}for(let s=n?3:1;s<=a;s++){let n=r-s<0?1:e[r-s],c=i-s<0?1:t[i-s];if(n!==c&&n>1&&c>1)return;let l=Math.max(n,c);if(n&&c)o[a-s]=Math.max(n,c);else{if(l>1)return;o[a-s]=0}}return o}static isValidBroadcast(e,t){let n=e.length,r=t.length;if(n>r)return!1;for(let i=1;i<=n;i++)if(e[n-i]!==1&&e[n-i]!==t[r-i])return!1;return!0}},H=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(e,t=4){let n=e.length;if(n===0)return[];let r=Array(n),i=n-1;for(;i>=0;){if(e[i]%t===0){r[i]=e[i]/t;break}if(t%e[i]!==0)throw Error(`cannot convert shape`);r[i]=1,t/=e[i],i--}for(i--;i>=0;i--)r[i]=e[i];return r}static sizeFromDimension(t,n){if(n<0||n>t.length)throw Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(e,t,n){let r=1;for(let i=t;i<n;i++){if(e[i]<0)throw Error(`cannot get valid size from specified dimension range. Most likely the range contains negative values in them.`);r*=Number(e[i])}return r}static computeStrides(e){let t=e.length;if(t===0)return[];if(t===1)return[1];let n=Array(t);n[t-1]=1,n[t-2]=e[t-1];for(let r=t-3;r>=0;--r)n[r]=n[r+1]*e[r+1];return n}static normalizeAxis(e,t){if(e<-t&&e>=t)throw Error(`unsupported axis for this operation.`);return e<0?e+t:e}static normalizeAxes(e,t){return e.map(n=>this.normalizeAxis(n,t??e.length))}static sortBasedOnPerm(e,t){return t?t.map(t=>e[t]):e.slice().reverse()}static padShape(e,t){let n=e.length;return e.map((e,r)=>e+t[r]+t[r+n])}static areEqual(e,t){return e.length===t.length&&e.every((e,n)=>e===t[n])}},cn=class e{static adjustPoolAttributes(e,t,n,r,i,a){if(!e&&n.length!==t.length-2)throw Error(`length of specified kernel shapes should be 2 less than length of input dimensions`);if(e)for(let e=0;e<t.length-2;e++)e>=n.length?n.push(t[e+2]):n[e]=t[e+2];for(let e=0;e<n.length;e++)if(e<r.length){if(r[e]<0)throw Error(`strides should be greater than or equal to 1`)}else r.push(1);for(let e=0;e<n.length;e++)if(e<i.length){if(i[e]<0)throw Error(`dilations should be greater than or equal to 1`)}else i.push(1);for(let e=0;e<n.length*2;e++)if(e<a.length){if(a[e]<0)throw Error(`pad should be greater than or equal to 1`)}else a.push(0);for(let e=0;e<n.length;e++){if(n[e]<=0)throw Error(`kernel shapes need to be greater than 0`);if(a[e]>=n[e]||a[e+n.length]>=n[e])throw Error(`pads should be smaller than kernel`)}}static adjustPadsBasedOnAutoPad(t,n,r,i,a,o,s){if(s){if(a.length!==2*(t.length-2))throw Error(`length of pads should be twice the length of data dimensions`);if(n.length!==t.length-2)throw Error(`length of strides should be the length of data dimensions`);if(i.length!==t.length-2)throw Error(`length of kernel shapes should be the length of data dimensions`);for(let c=0;c<t.length-2;c++)e.adjustPadAndReturnShape(t[c+(o?1:2)],n[c],r[c],i[c],a,c,c+t.length-2,s)}}static computePoolOutputShape(t,n,r,i,a,o,s,c=0){if(n.length<=0)throw Error(`input shape must be of size greater than 0`);let l=[n[0],n[1]];return e.computeShapeHelper(t,n,l,r,i,a,o,s,c),l}static computeConvOutputShape(t,n,r,i,a,o,s){if(t.length<=0||n.length<=0)throw Error(`invalid input tensor dims or invalid filter tensor dims`);let c=[t[0],n[0]];return e.computeShapeHelper(!1,t,c,r,i,a,o,s),c}static computeShapeHelper(t,n,r,i,a,o,s,c,l=0){if(t)for(let e=0;e<n.length-2;e++)r.push(1);else for(let t=0;t<n.length-2;t++)r.push(e.adjustPadAndReturnShape(n[t+2],i[t],a[t],o[t],s,t,t+n.length-2,c,l))}static computeOutputSize(e,t,n,r,i){let a=Math.floor(e/t)+1;return i===1&&(a=Math.ceil(e/t)+1,(a-1)*t>=n+r&&--a),a}static adjustPadAndReturnShape(t,n,r,i,a,o,s,c,l=0){let u=r*(i-1)+1;if(c&&c!==`NOTSET`)switch(c){case`VALID`:return a[o]=0,a[s]=0,e.computeOutputSize(t-u,n,t,0,l);case`SAME_LOWER`:case`SAME_UPPER`:if(r!==1)throw Error(`Dilation not supported for SAME_UPPER or SAME_LOWER`);{let r=(Math.floor((t+n-1)/n)-1)*n+i-t;return a[o]=Math.floor(c===`SAME_LOWER`?(r+1)/2:r/2),a[s]=r-a[o],e.computeOutputSize(t+a[o]+a[s]-u,n,t,a[o],l)}default:throw Error(`Unsupported AutoPad type`)}else return e.computeOutputSize(t+a[o]+a[s]-u,n,t,a[o],l)}},ln=class{static getShapeOfGemmResult(e,t,n,r,i){if(e.length!==2||n.length!==2)throw Error(`shape need to be of size 2`);let a,o,s;t?(a=e[1],o=e[0]):(a=e[0],o=e[1]);let c=-1;if(r?(s=n[0],c=1):(s=n[1],c=0),n[c]!==o)throw Error(`dimension mismatch`);if(a<=0||s<=0||o<=0)throw Error(`invalid shape specified`);if(i&&!sn.isValidBroadcast(i,[a,s]))throw Error(`gemm: invalid bias shape for broadcast`);return[a,s,o]}},un=-34028234663852886e22,dn=34028234663852886e22}),fn,pn=w(()=>{B(),fn=(e,t)=>new(Gt(t))(e)}),mn,hn,gn,_n,vn,yn,bn,xn,Sn,Cn,wn,Tn=w(()=>{B(),an(),mn=new Map([[`float32`,32],[`float16`,16],[`int32`,32],[`uint32`,32],[`int64`,64],[`uint64`,64],[`int8`,8],[`uint8`,8],[`int4`,4],[`uint4`,4]]),hn=(e,t)=>{if(t===`int32`)return e;let n=mn.get(t);if(!n)throw Error(`WebNN backend does not support data type: ${t}`);let r=n/8;if(e.byteLength%r!==0)throw Error(`Invalid Uint8Array length - must be a multiple of ${r}.`);let i=e.byteLength/r,a=new(Gt(t))(e.buffer,e.byteOffset,i);switch(t){case`int64`:case`uint64`:{let e=new Int32Array(i);for(let t=0;t<i;t++){let n=a[t];if(n>2147483647n||n<-2147483648n)throw Error(`Can not convert int64 data to int32 - value out of range.`);e[t]=Number(n)}return new Uint8Array(e.buffer)}case`int8`:case`uint8`:case`uint32`:{if(t===`uint32`&&a.some(e=>e>2147483647))throw Error(`Can not convert uint32 data to int32 - value out of range.`);let e=Int32Array.from(a,Number);return new Uint8Array(e.buffer)}default:throw Error(`Unsupported data conversion from ${t} to 'int32'`)}},gn=(e,t)=>{if(t===`int32`)return e;if(e.byteLength%4!=0)throw Error(`Invalid Uint8Array length - must be a multiple of 4 (int32).`);let n=e.byteLength/4,r=new Int32Array(e.buffer,e.byteOffset,n);switch(t){case`int64`:{let e=BigInt64Array.from(r,BigInt);return new Uint8Array(e.buffer)}case`uint64`:{if(r.some(e=>e<0))throw Error(`Can not convert int32 data to uin64 - negative value found.`);let e=BigUint64Array.from(r,BigInt);return new Uint8Array(e.buffer)}case`int8`:{if(r.some(e=>e<-128||e>127))throw Error(`Can not convert int32 data to int8 - value out of range.`);let e=Int8Array.from(r,Number);return new Uint8Array(e.buffer)}case`uint8`:if(r.some(e=>e<0||e>255))throw Error(`Can not convert int32 data to uint8 - value out of range.`);return Uint8Array.from(r,Number);case`uint32`:{if(r.some(e=>e<0))throw Error(`Can not convert int32 data to uint32 - negative value found.`);let e=Uint32Array.from(r,Number);return new Uint8Array(e.buffer)}default:throw Error(`Unsupported data conversion from 'int32' to ${t}`)}},_n=1,vn=()=>_n++,yn=new Map([[`int8`,`int32`],[`uint8`,`int32`],[`uint32`,`int32`],[`int64`,`int32`]]),bn=(e,t)=>{let n=mn.get(e);if(!n)throw Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((e,t)=>e*t)*n/8):0},xn=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:n,tensor:r,dataType:i,shape:a,fallbackDataType:o}=e;this.sessionId=t,this.mlContext=n,this.mlTensor=r,this.dataType=i,this.tensorShape=a,this.fallbackDataType=o}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return bn(this.dataType,this.tensorShape)}destroy(){V(`verbose`,()=>`[WebNN] TensorWrapper.destroy`),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),n=gn(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(n);return}return new Uint8Array(n).buffer}return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,n){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===n.length&&this.tensorShape.every((e,t)=>e===n[t])}setIsDataConverted(e){this.isDataConverted=e}},Sn=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,n,r){let i=this.tensorManager.getMLContext(e),a=this.tensorManager.getMLOpSupportLimits(e),o;if(!a?.input.dataTypes.includes(t)){if(o=yn.get(t),!o||!a?.input.dataTypes.includes(o))throw Error(`WebNN backend does not support data type: ${t}`);V(`verbose`,()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${o}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(i,t,n))return this.wrapper.tensor;if(r){if(this.wrapper.byteLength!==bn(t,n))throw Error(`Unable to copy data to tensor with different size.`);this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let s=typeof MLTensorUsage>`u`?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,n,s,!0,!0,o),r&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType){if(this.wrapper.fallbackType===`int32`)t=hn(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`)}if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}V(`verbose`,()=>`Data size does not match tensor size. Releasing tensor.`),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?gn(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}return t.buffer}if(!this.wrapper)throw Error(`Tensor has not been created.`);return e?this.wrapper.read(e):this.wrapper.read()}},Cn=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw Error(`MLContext not found for session.`);return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=vn();return this.tensorTrackersById.set(e,new Sn(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,n,r,i){V(`verbose`,()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${n}, shape: ${r}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(t);if(!a)throw Error(`Tensor not found.`);return a.ensureTensor(e,n,r,i)}upload(e,t){let n=this.tensorTrackersById.get(e);if(!n)throw Error(`Tensor not found.`);n.upload(t)}async download(e,t){V(`verbose`,()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let n=this.tensorTrackersById.get(e);if(!n)throw Error(`Tensor not found.`);return n.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,n,r){let i=this.getMLContext(e),a=vn(),o=new xn({sessionId:e,context:i,tensor:t,dataType:n,shape:r});return this.tensorTrackersById.set(a,new Sn(this,o)),this.externalTensors.add(o),a}async getCachedTensor(e,t,n,r,i,a,o){let s=this.getMLContext(e);for(let[r,i]of this.freeTensors.entries())if(i.canReuseTensor(s,t,n)){V(`verbose`,()=>`[WebNN] Reusing tensor {dataType: ${t}, ${o?`fallbackDataType: ${o},`:``} shape: ${n}`);let i=this.freeTensors.splice(r,1)[0];return i.sessionId=e,i}V(`verbose`,()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${o?`fallbackDataType: ${o},`:``} shape: ${n}}`);let c=await s.createTensor({dataType:o??t,shape:n,dimensions:n,usage:r,writable:i,readable:a});return new xn({sessionId:e,context:s,tensor:c,dataType:t,shape:n,fallbackDataType:o})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},wn=(...e)=>new Cn(...e)}),En,Dn,On,kn=w(()=>{B(),Ot(),pn(),Tn(),an(),En=new Map([[1,`float32`],[10,`float16`],[6,`int32`],[12,`uint32`],[7,`int64`],[13,`uint64`],[22,`int4`],[21,`uint4`],[3,`int8`],[2,`uint8`],[9,`uint8`]]),Dn=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let n=Object.keys(e).sort(),r=Object.keys(t).sort();return n.length===r.length&&n.every((n,i)=>n===r[i]&&e[n]===t[n])},On=class{constructor(e){this.tensorManager=wn(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,nn(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw Error(`No active session`);return this.activeSessionId}onRunStart(e){V(`verbose`,()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){V(`verbose`,()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let e of t)V(`verbose`,()=>`[WebNN] releasing temporary tensor {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(t=>t.gpuDevice===e);if(t!==-1)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:t}),t}}if(e===void 0){let e=this.mlContextCache.findIndex(e=>e.options===void 0&&e.gpuDevice===void 0);if(e!==-1)return this.mlContextCache[e].mlContext;{let e=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:e}),e}}let t=this.mlContextCache.findIndex(t=>Dn(t.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let n=this.sessionIdsByMLContext.get(t);n||(n=new Set,this.sessionIdsByMLContext.set(t,n)),n.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let n=this.sessionIdsByMLContext.get(t);if(n.delete(e),n.size===0){this.sessionIdsByMLContext.delete(t);let e=this.mlContextCache.findIndex(e=>e.mlContext===t);e!==-1&&this.mlContextCache.splice(e,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){V(`verbose`,()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,n,r,i){let a=En.get(n);if(!a)throw Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,a,r,i)}async createTemporaryTensor(e,t,n){V(`verbose`,()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${n}}`);let r=En.get(t);if(!r)throw Error(`Unsupported ONNX data type: ${t}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,r,n,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,t){if(!z().shouldTransferToMLTensor)throw Error(`Trying to upload to a MLTensor while shouldTransferToMLTensor is false`);V(`verbose`,()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let n=await this.tensorManager.download(e);return fn(n,t)}}registerMLTensor(e,t,n,r){let i=En.get(n);if(!i)throw Error(`Unsupported ONNX data type: ${n}`);let a=this.tensorManager.registerTensor(e,t,i,r);return V(`verbose`,()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${i}, dimensions: ${r}} -> {tensorId: ${a}}`),a}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let n=this.sessionGraphInputs.get(e);return n?n.includes(t):!1}isGraphOutput(e,t){let n=this.sessionGraphOutputs.get(e);return n?n.includes(t):!1}isGraphInputOutputTypeSupported(e,t,n=!0){let r=En.get(Ht(t)),i=this.mlOpSupportLimitsBySessionId.get(e);return typeof r>`u`?!1:n?!!i?.input.dataTypes.includes(r):!!i?.output.dataTypes.includes(r)}flush(){}}}),An=w(()=>{}),jn,Mn,Nn,Pn,Fn,In,Ln,Rn,zn,Bn=w(()=>{an(),An(),jn=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Mn=[],Nn=e=>Math.ceil(Number(e)/16)*16,Pn=e=>{for(let t=0;t<Mn.length;t++){let n=Mn[t];if(e<=n)return n}return Math.ceil(e/16)*16},Fn=1,In=()=>Fn++,Ln=async(e,t,n,r)=>{let i=Nn(n),a=e.device.createBuffer({size:i,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let o=e.getCommandEncoder();e.endComputePass(),o.copyBufferToBuffer(t,0,a,0,i),e.flush(),await a.mapAsync(GPUMapMode.READ);let s=a.getMappedRange();if(r){let e=r();return e.set(new Uint8Array(s,0,n)),e}return new Uint8Array(s.slice(0,n))}finally{a.destroy()}},Rn=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[e]of jn)Mn.push(e),this.freeBuffers.set(e,[]),this.freeUniformBuffers.set(e,[]);this.sessionCount=0}upload(e,t){let n=t.buffer,r=t.byteOffset,i=t.byteLength,a=Nn(i),o=this.storageCache.get(e);if(!o)throw Error(`gpu data for uploading does not exist`);if(Number(o.originalSize)!==i)throw Error(`inconsistent data size. gpu data size=${o.originalSize}, data size=${i}`);if(a===i&&r%4==0)this.backend.device.queue.writeBuffer(o.gpuData.buffer,0,n,r,i);else{let e=new Uint8Array(a);e.set(t),this.backend.device.queue.writeBuffer(o.gpuData.buffer,0,e,0,a)}V(`verbose`,()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let n=this.storageCache.get(e);if(!n)throw Error(`source gpu data for memcpy does not exist`);let r=this.storageCache.get(t);if(!r)throw Error(`destination gpu data for memcpy does not exist`);if(n.originalSize!==r.originalSize)throw Error(`inconsistent source and destination gpu data size`);let i=Nn(n.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(n.gpuData.buffer,0,r.gpuData.buffer,0,i)}registerExternalBuffer(e,t,n){let r;if(n){if(r=n[0],e===n[1])return V(`verbose`,()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, buffer is the same, skip.`),r;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else r=In();return this.storageCache.set(r,{gpuData:{id:r,type:0,buffer:e},originalSize:t}),V(`verbose`,()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, registered.`),r}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),V(`verbose`,()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=Pn(e),r,i=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let e=(i?this.freeBuffers:this.freeUniformBuffers).get(n);r=e&&e.length>0?e.pop():this.backend.device.createBuffer({size:n,usage:t})}else r=this.backend.device.createBuffer({size:n,usage:t});let o={id:In(),type:0,buffer:r};return this.storageCache.set(o.id,{gpuData:o,originalSize:Number(e)}),V(`verbose`,()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${o.id}`),o}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e==`bigint`?Number(e):e,n=this.storageCache.get(t);if(!n){if(this.storageCache.size===0)return 0;throw Error(`releasing data does not exist`)}return V(`verbose`,()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(e,t){let n=this.storageCache.get(Number(e));if(!n)throw Error(`data does not exist`);await Ln(this.backend,n.gpuData.buffer,n.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0){if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=jn.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(e=>{e.destroy()}),this.capturedPendingBuffers.delete(e)),--this.sessionCount,this.sessionCount===0&&(V(`warning`,()=>`[WebGPU] Clearing webgpu buffer cache`),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.storageCache=new Map)}},zn=(...e)=>new Rn(...e)}),Vn,W,Hn=w(()=>{Vn=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(`;`),this.key}},W=e=>new Vn(e)}),Un,Wn,Gn,Kn,G,qn,Jn,Yn,Xn,K,Zn,q,J,Qn,$n,er,tr,Y=w(()=>{B(),U(),Un=64,Wn=(e,t)=>{if(t===3)throw Error(`vec3 has same alignment as vec4, use vec4 instead`);switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:`f16`;case 1:return t>1?`vec${t}<f32>`:`f32`;case 6:return t>1?`vec${t}<i32>`:`i32`;case 12:return t>1?`vec${t}<u32>`:`u32`;case 7:if(t>1)throw Error(`currently not supported vecX of uint64 yet`);return[`vec2<u32>`,`i32`];case 13:if(t>1)throw Error(`currently not supported vecX of uint64 yet`);return[`vec2<u32>`,`u32`];case 9:if(t!==4)throw Error(`bool must be vec4`);return[`u32`,`vec4<bool>`];case 22:return`i32`;case 21:return`u32`;default:throw Error(`Unknown data type: ${e}`)}},Gn=(e,t=1)=>{let n=Wn(e,t);return typeof n==`string`?n:n[0]},Kn=(e,t=1)=>{let n=Wn(e,t);return typeof n==`string`?n:n[1]},G=(...e)=>{let t=[];return e.forEach(e=>{e.length!==0&&t.push({type:12,data:e},{type:12,data:H.computeStrides(e)})}),t},qn=e=>e%4==0?4:e%2==0?2:1,Jn=(e=`f32`,t,n=`0`)=>!t||t===1?`${e}(${n})`:`vec${t}<${e}>(${n})`,Yn=(e,t,n)=>e===`f32`?n:t===1?`f32(${n})`:`vec${t}<f32>(${n})`,Xn=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,K=(e,t,n,r)=>e.startsWith(`uniforms.`)&&n>4?typeof t==`string`?r===`f16`?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:r===`f16`?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:n>1?`${e}[${t}]`:e,Zn=(e,t,n,r,i)=>{let a=typeof n==`number`,o=a?n:n.length,s=[...Array(o).keys()],c=o<2?`u32`:o<=4?`vec${o}<u32>`:`array<u32, ${o}>`,l=Wn(t,i),u=typeof l==`string`?l:l[1],d={indices:c,value:u,storage:typeof l==`string`?l:l[0],tensor:t},f=e=>typeof e==`string`?e:`${e}u`,p={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},m=a?`uniforms.`:``,h=`${m}${e}_shape`,g=`${m}${e}_strides`,_=``;for(let e=0;e<o-1;e++)_+=`
    let dim${e} = current / ${K(g,e,o)};
    let rest${e} = current % ${K(g,e,o)};
    indices[${e}] = dim${e};
    current = rest${e};
    `;_+=`indices[${o-1}] = current;`;let v=o<2?``:`
  fn o2i_${e}(offset: u32) -> ${d.indices} {
    var indices: ${d.indices};
    var current = offset;
    ${_}
    return indices;
  }`,y=t=>(p.offsetToIndices=!0,o<2?t:`o2i_${e}(${t})`),b=[];if(o>=2)for(let e=o-1;e>=0;e--)b.push(`${K(g,e,o)} * (indices[${e}])`);let x=o<2?``:`
  fn i2o_${e}(indices: ${d.indices}) -> u32 {
    return ${b.join(`+`)};
  }`,S=t=>(p.indicesToOffset=!0,o<2?t:`i2o_${e}(${t})`),C=(...e)=>o===0?`0u`:`${d.indices}(${e.map(f).join(`,`)})`,w=(e,t)=>o<2?`${e}`:`${K(e,t,o)}`,T=(e,t,n)=>o<2?`${e}=${n};`:`${K(e,t,o)}=${n};`,E={},D=(t,n)=>{p.broadcastedIndicesToOffset=!0;let r=`${n.name}broadcastedIndicesTo${e}Offset`;if(r in E)return`${r}(${t})`;let i=[];for(let e=o-1;e>=0;e--){let t=n.indicesGet(`outputIndices`,e+n.rank-o);i.push(`${w(g,e)} * (${t} % ${w(h,e)})`)}return E[r]=`fn ${r}(outputIndices: ${n.type.indices}) -> u32 {
             return ${i.length>0?i.join(`+`):`0u`};
           }`,`${r}(${t})`},O=(t,n)=>(()=>{if(d.storage===d.value)return`${e}[${t}]=${n};`;if(d.storage===`vec2<u32>`&&d.value===`i32`)return`${e}[${t}]=vec2<u32>(u32(${n}), select(0u, 0xFFFFFFFFu, ${n} < 0));`;if(d.storage===`vec2<u32>`&&d.value===`u32`)return`${e}[${t}]=vec2<u32>(u32(${n}), 0u);`;if(d.storage===`u32`&&d.value===`vec4<bool>`)return`${e}[${t}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${n}));`;throw Error(`not supported combination of storage type ${d.storage} and value type ${d.value} yet`)})(),k=t=>(()=>{if(d.storage===d.value)return`${e}[${t}]`;if(d.storage===`vec2<u32>`&&d.value===`i32`)return`i32(${e}[${t}].x)`;if(d.storage===`vec2<u32>`&&d.value===`u32`)return`u32(${e}[${t}].x)`;if(d.storage===`u32`&&d.value===`vec4<bool>`)return`vec4<bool>(bool(${e}[${t}] & 0xFFu), bool(${e}[${t}] & 0xFF00u), bool(${e}[${t}] & 0xFF0000u), bool(${e}[${t}] & 0xFF000000u))`;throw Error(`not supported combination of storage type ${d.storage} and value type ${d.value} yet`)})(),A=o<2?``:`
  fn get_${e}ByIndices(indices: ${d.indices}) -> ${u} {
    return ${k(`i2o_${e}(indices)`)};
  }`,j=o<2?``:(()=>{let t=s.map(e=>`d${e}: u32`).join(`, `),n=s.map(e=>`d${e}`).join(`, `);return`
  fn get_${e}(${t}) -> ${u} {
    return get_${e}ByIndices(${C(n)});
  }`})(),M=(...t)=>{if(t.length!==o)throw Error(`indices length must be ${o}`);let n=t.map(f).join(`,`);return o===0?k(`0u`):o===1?k(n[0]):(p.get=!0,p.getByIndices=!0,p.indicesToOffset=!0,`get_${e}(${n})`)},ee=t=>o<2?k(t):(p.getByIndices=!0,p.indicesToOffset=!0,`get_${e}ByIndices(${t})`),te=o<2?``:`
  fn set_${e}ByIndices(indices: ${d.indices}, value: ${u}) {
    ${O(`i2o_${e}(indices)`,`value`)}
  }`,N=o<2?``:(()=>{let t=s.map(e=>`d${e}: u32`).join(`, `),n=s.map(e=>`d${e}`).join(`, `);return`
  fn set_${e}(${t}, value: ${u}) {
    set_${e}ByIndices(${C(n)}, value);
  }`})();return{impl:()=>{let e=[],t=!1;return p.offsetToIndices&&(e.push(v),t=!0),p.indicesToOffset&&(e.push(x),t=!0),p.broadcastedIndicesToOffset&&(Object.values(E).forEach(t=>e.push(t)),t=!0),p.set&&(e.push(N),t=!0),p.setByIndices&&(e.push(te),t=!0),p.get&&(e.push(j),t=!0),p.getByIndices&&(e.push(A),t=!0),!a&&t&&e.unshift(`const ${h} = ${d.indices}(${n.join(`,`)});`,`const ${g} = ${d.indices}(${H.computeStrides(n).join(`,`)});`),e.join(`
`)},type:d,offsetToIndices:y,indicesToOffset:S,broadcastedIndicesToOffset:D,indices:C,indicesGet:w,indicesSet:T,set:(...t)=>{if(t.length!==o+1)throw Error(`indices length must be ${o}`);let n=t[o];if(typeof n!=`string`)throw Error(`value must be string`);let r=t.slice(0,o).map(f).join(`,`);return o===0?O(`0u`,n):o===1?O(r[0],n):(p.set=!0,p.setByIndices=!0,p.indicesToOffset=!0,`set_${e}(${r}, ${n})`)},setByOffset:O,setByIndices:(t,n)=>o<2?O(t,n):(p.setByIndices=!0,p.indicesToOffset=!0,`set_${e}ByIndices(${t}, ${n});`),get:M,getByOffset:k,getByIndices:ee,usage:r,name:e,strides:g,shape:h,rank:o}},q=(e,t,n,r=1)=>Zn(e,t,n,`input`,r),J=(e,t,n,r=1)=>Zn(e,t,n,`output`,r),Qn=(e,t,n)=>Zn(e,t,n,`atomicOutput`,1),$n=(e,t,n,r=1)=>Zn(e,t,n,`internal`,r),er=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e==`number`?`${e}u`:e}) { return; }`}mainStart(e=Un){let t=typeof e==`number`?e:e[0],n=typeof e==`number`?1:e[1],r=typeof e==`number`?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||r>this.limits.maxComputeWorkgroupSizeZ)throw Error(`workgroup size [${t}, ${n}, ${r}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*n*r>this.limits.maxComputeInvocationsPerWorkgroup)throw Error(`workgroup size [${t}, ${n}, ${r}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1;return`@compute @workgroup_size(${t}, ${n}, ${r})
  fn main(${i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`}) {
    ${i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*n*r}u + local_idx;`}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith(`uniforms.`)&&this.uniforms.push({name:e.shape.replace(`uniforms.`,``),type:`u32`,length:e.rank}),e.strides.startsWith(`uniforms.`)&&this.uniforms.push({name:e.strides.replace(`uniforms.`,``),type:`u32`,length:e.rank}))}declareVariable(e,t){if(e.usage===`internal`)throw Error(`cannot use internal variable with declareVariable(). use registerInternalVariables() instead.`);this.variables.push(e),this.appendVariableUniforms(e);let n=e.usage===`input`?`read`:`read_write`,r=e.usage===`atomicOutput`?`atomic<i32>`:e.type.storage;return`@group(0) @binding(${t}) var<storage, ${n}> ${e.name}: array<${r}>;`}declareVariables(...e){return e.map(e=>this.declareVariable(e,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!==`internal`)throw Error(`cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.`);this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(e=>this.registerInternalVariable(e)),this}registerUniform(e,t,n=1){return this.uniforms.push({name:e,type:t,length:n}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return``;let e=[];for(let{name:t,type:n,length:r}of this.uniforms)if(r&&r>4)n===`f16`?e.push(`@align(16) ${t}:array<mat2x4<${n}>, ${Math.ceil(r/8)}>`):e.push(`${t}:array<vec4<${n}>, ${Math.ceil(r/4)}>`);else{let i=r==null||r===1?n:`vec${r}<${n}>`;e.push(`${t}:${i}`)}return`
      struct Uniforms { ${e.join(`, `)} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=e=>[12,10,1,6][[`u32`,`f16`,`f32`,`i32`].indexOf(e)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},tr=(e,t)=>new er(e,t)}),nr,rr,ir,ar,or,sr,cr,lr,ur,dr=w(()=>{B(),U(),Hn(),Y(),nr=(e,t)=>{if(!e||e.length!==1)throw Error(`Transpose requires 1 input.`);if(t.length!==0&&t.length!==e[0].dims.length)throw Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},rr=(e,t)=>t.length===0?[...Array(e).keys()].reverse():t,ir=(e,t)=>H.sortBasedOnPerm(e,rr(e.length,t)),ar=(e,t,n,r)=>{let i=`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let n=0;n<t;++n)i+=`a[${e[n]}]=i[${n}];`;return i+=`return a;}`},or=(e,t)=>{let n=[],r=[];for(let i=0;i<e.length;++i)e[i]!==1&&n.push(e[i]),e[t[i]]!==1&&r.push(t[i]);return{newShape:n,newPerm:r}},sr=(e,t)=>{let n=0;for(let r=0;r<e.length;++r)if(t[e[r]]!==1){if(e[r]<n)return!1;n=e[r]}return!0},cr=(e,t)=>{let n=e.dataType,r=e.dims.length,i=rr(r,t),a=ir(e.dims,i),o=e.dims,s=a,c=r<2||sr(i,e.dims),l;if(c)return l=e=>{let t=q(`input`,n,o,4),r=J(`output`,n,s,4);return`
  ${e.registerUniform(`output_size`,`u32`).declareVariables(t,r)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
    output[global_idx] = input[global_idx];
  }`},{name:`TransposeCopy`,shaderCache:{inputDependencies:[`type`]},getRunData:()=>{let t=H.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(t/64/4)},programUniforms:[{type:12,data:Math.ceil(t/4)}]}},getShaderSource:l};let{newShape:u,newPerm:d}=or(e.dims,i),f=H.areEqual(d,[2,3,1]),p=H.areEqual(d,[3,1,2]);return u.length===2||f||p?(o=f?[u[0],u[1]*u[2]]:p?[u[0]*u[1],u[2]]:u,s=[o[1],o[0]],l=e=>{let t=q(`a`,n,o.length),r=J(`output`,n,s.length);return`
  ${e.registerUniform(`output_size`,`u32`).declareVariables(t,r)}
  var<workgroup> tile : array<array<${r.type.value}, 17>, 16>;
  ${e.mainStart([16,16,1])}
    let stride = (uniforms.output_shape[1] - 1) / 16 + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * 16u + local_id.x;
    let input_row = workgroup_id_x * 16u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${t.getByIndices(`${t.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * 16u + local_id.x;
    let output_row = workgroup_id_y * 16u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${r.setByIndices(`${r.type.indices}(output_row, output_col)`,`tile[local_id.x][local_id.y]`)}
    }
  }`},{name:`TransposeShared`,shaderCache:{inputDependencies:[`type`]},getRunData:()=>{let t=H.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(s[1]/16),y:Math.ceil(s[0]/16)},programUniforms:[{type:12,data:t},...G(o,s)]}},getShaderSource:l}):(l=e=>{let t=q(`a`,n,o.length),a=J(`output`,n,s.length);return`
  ${e.registerUniform(`output_size`,`u32`).declareVariables(t,a)}

  ${ar(i,r,t,a)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}

    let indices = ${a.offsetToIndices(`global_idx`)};
    let aIndices = perm(indices);

    ${a.setByOffset(`global_idx`,t.getByIndices(`aIndices`))}
  }`},{name:`Transpose`,shaderCache:{hint:`${t}`,inputDependencies:[`rank`]},getRunData:()=>{let t=H.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:[{type:12,data:t},...G(o,s)]}},getShaderSource:l})},lr=(e,t)=>{nr(e.inputs,t.perm),e.compute(cr(e.inputs[0],t.perm))},ur=e=>W({perm:e.perm})}),fr,pr,mr,hr,gr,_r,vr,yr,br,xr,X,Sr,Cr,Z,wr,Q,Tr,Er,Dr,Or,kr,Ar=w(()=>{B(),U(),Y(),ri(),dr(),fr={max:`select(bestValue, candidate, candidate > bestValue)`,min:`select(bestValue, candidate, candidate < bestValue)`,mean:`bestValue + candidate`,sum:`bestValue + candidate`,prod:`bestValue * candidate`,sumSquare:`bestValue + candidate * candidate`,logSumExp:`bestValue + exp(candidate)`,l1:`bestValue + abs(candidate)`,l2:`bestValue + candidate * candidate`,logSum:`bestValue + candidate`},pr={max:`select(bestValue, candidate, candidate > bestValue)`,min:`select(bestValue, candidate, candidate < bestValue)`,mean:`bestValue + candidate`,sum:`bestValue + candidate`,prod:`bestValue * candidate`,sumSquare:`bestValue + candidate`,logSumExp:`bestValue + candidate`,l1:`bestValue + candidate`,l2:`bestValue + candidate`,logSum:`bestValue + candidate`},mr={max:`_A[offset]`,min:`_A[offset]`,mean:`0`,sum:`0`,prod:`1`,sumSquare:`0`,logSumExp:`0`,l1:`0`,l2:`0`,logSum:`0`},hr={max:`bestValue`,min:`bestValue`,sum:`bestValue`,prod:`bestValue`,sumSquare:`bestValue`,logSumExp:`log(bestValue)`,l1:`bestValue`,l2:`sqrt(bestValue)`,logSum:`log(bestValue)`},gr=(e,t)=>{let n=[];for(let r=t-e;r<t;++r)n.push(r);return n},_r=(e,t)=>{let n=[],r=e.length;for(let i=0;i<r;i++)t.indexOf(i)===-1&&n.push(e[i]);return[n,t.map(t=>e[t])]},vr=(e,t)=>{let n=e.length+t.length,r=[],i=0;for(let a=0;a<n;a++)t.indexOf(a)===-1?r.push(e[i++]):r.push(1);return r},yr=(e,t)=>{for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0},br=(e,t)=>{let n=[];if(!yr(e,t)){for(let r=0;r<t;++r)e.indexOf(r)===-1&&n.push(r);e.forEach(e=>n.push(e))}return n},xr=(e,t,n,r,i,a,o)=>{let s=n[0].dims,c=H.size(a),l=H.size(o),u=q(`_A`,n[0].dataType,s),d=J(`output`,i,a),f=64;c===1&&(f=256);let p=`
          var<workgroup> aBestValues : array<f32, ${f}>;
       `;return{name:e,shaderCache:{hint:`${t};${f}`,inputDependencies:[`type`]},getShaderSource:e=>`
        ${e.registerUniform(`reduceSize`,`u32`).declareVariables(u,d)}
        ${p}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${e.mainStart(f)}

          let outputIndex = global_idx / ${f};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${mr[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${f}) {
           let candidate = f32(${u.getByOffset(`offset + k`)});
           bestValue = ${fr[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${f}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${pr[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${d.setByOffset(`outputIndex`,`${r===`mean`?`${d.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${d.type.storage}(${hr[r]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:c},programUniforms:[{type:12,data:l}]})}},X=(e,t,n,r)=>{let i=e.inputs.length===1?n:Pr(e.inputs,n),a=i.axes;a.length===0&&!i.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((e,t)=>t));let o=H.normalizeAxes(a,e.inputs[0].dims.length),s=o,c=e.inputs[0],l=br(s,e.inputs[0].dims.length);l.length>0&&(c=e.compute(cr(e.inputs[0],l),{inputs:[0],outputs:[-1]})[0],s=gr(s.length,c.dims.length));let[u,d]=_r(c.dims,s),f=u;i.keepDims&&(f=vr(u,o)),e.compute(xr(t,i.cacheKey,[c],r,e.inputs[0].dataType,f,d),{inputs:[c]})},Sr=(e,t)=>{X(e,`ReduceMeanShared`,t,`mean`)},Cr=(e,t)=>{X(e,`ReduceL1Shared`,t,`l1`)},Z=(e,t)=>{X(e,`ReduceL2Shared`,t,`l2`)},wr=(e,t)=>{X(e,`ReduceLogSumExpShared`,t,`logSumExp`)},Q=(e,t)=>{X(e,`ReduceMaxShared`,t,`max`)},Tr=(e,t)=>{X(e,`ReduceMinShared`,t,`min`)},Er=(e,t)=>{X(e,`ReduceProdShared`,t,`prod`)},Dr=(e,t)=>{X(e,`ReduceSumShared`,t,`sum`)},Or=(e,t)=>{X(e,`ReduceSumSquareShared`,t,`sumSquare`)},kr=(e,t)=>{X(e,`ReduceLogSumShared`,t,`logSum`)}}),jr,Mr,Nr,Pr,Fr,Ir,Lr,Rr,zr,Br,Vr,Hr,Ur,Wr,Gr,Kr,qr,Jr,Yr,Xr,Zr,Qr,$r,ei,ti,ni,ri=w(()=>{B(),U(),Hn(),Y(),Ar(),jr=e=>{if(!e||e.length===0||e.length>2)throw Error(`Reduce op requires 1 or 2 inputs.`);if(e.length===2&&e[1].dims.length!==1)throw Error(`Invalid axes input dims.`)},Mr=e=>[``,``,`var value = ${e.getByIndices(`input_indices`)};`,``],Nr=(e,t,n,r,i,a,o=!1,s=!1)=>{let c=[],l=n[0].dims,u=l.length,d=H.normalizeAxes(i,u),f=!s&&d.length===0;l.forEach((e,t)=>{f||d.indexOf(t)>=0?o&&c.push(1):c.push(e)});let p=c.length,m=H.size(c);return{name:e,shaderCache:t,getShaderSource:e=>{let t=[],i=q(`_A`,n[0].dataType,u),s=J(`output`,a,p),c=r(i,s,d),m=c[2];for(let e=0,n=0;e<u;e++)f||d.indexOf(e)>=0?(o&&n++,m=`for(var j${e}: u32 = 0; j${e} < ${l[e]}; j${e}++) {
                  ${c[2].includes(`last_index`)?`let last_index = j${e};`:``}
                  ${i.indicesSet(`input_indices`,e,`j${e}`)}
                  ${m}
                }`):(t.push(`${i.indicesSet(`input_indices`,e,s.indicesGet(`output_indices`,n))};`),n++);return`

        ${e.registerUniform(`output_size`,`u32`).declareVariables(i,s)}

        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
          var input_indices: ${i.type.indices};
          let output_indices = ${s.offsetToIndices(`global_idx`)};

          ${t.join(`
`)}
          ${c[0]}       // init ops for reduce max/min
          ${c[1]}
          ${m}
          ${c[3]}
          ${c.length===4?s.setByOffset(`global_idx`,`value`):c.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:c,dataType:a}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...G(l,c)]})}},Pr=(e,t)=>{let n=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(e=>n.push(Number(e))),W({axes:n,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Fr=(e,t,n,r)=>{let i=e.inputs,a=i.length===1?n:Pr(i,n);e.compute(Nr(t,{hint:a.cacheKey,inputDependencies:[`rank`]},[i[0]],a.noopWithEmptyAxes&&a.axes.length===0?Mr:r,a.axes,i[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},Ir=(e,t)=>{jr(e.inputs),Fr(e,`ReduceLogSum`,t,(e,t)=>[`var value = ${t.type.storage}(0);`,``,`value += ${e.getByIndices(`input_indices`)};`,`value = log(value);`])},Lr=(e,t)=>{jr(e.inputs),Fr(e,`ReduceL1`,t,(e,t)=>[`var value = ${t.type.storage}(0);`,``,`value += abs(${e.getByIndices(`input_indices`)});`,``])},Rr=(e,t)=>{jr(e.inputs),Fr(e,`ReduceL2`,t,(e,t)=>[`var t = ${t.type.value}(0); var value = ${t.type.value}(0);`,``,`t = ${e.getByIndices(`input_indices`)}; value += (t * t);`,`value = sqrt(value);`])},zr=(e,t)=>{jr(e.inputs),Fr(e,`ReduceLogSumExp`,t,(e,t)=>[`var value = ${t.type.storage}(0);`,``,`value += exp(${e.getByIndices(`input_indices`)});`,`value = log(value);`])},Br=(e,t)=>{jr(e.inputs),Fr(e,`ReduceMax`,t,(e,t,n)=>{let r=[];for(let t=0;t<e.rank;t++)(n.indexOf(t)>=0||n.length===0)&&r.push(e.indicesSet(`input_indices`,t,0));return[`${r.join(`
`)}`,`var value = ${e.getByIndices(`input_indices`)};`,`value = max(value, ${e.getByIndices(`input_indices`)});`,``]})},Vr=(e,t)=>{jr(e.inputs),Fr(e,`ReduceMean`,t,(t,n,r)=>{let i=1;for(let n=0;n<t.rank;n++)(r.indexOf(n)>=0||r.length===0)&&(i*=e.inputs[0].dims[n]);return[`var sum = f32(0);`,``,`sum += f32(${t.getByIndices(`input_indices`)});`,`let value = ${n.type.value}(sum / ${i});`]})},Hr=(e,t)=>{jr(e.inputs),Fr(e,`ReduceMin`,t,(e,t,n)=>{let r=[];for(let t=0;t<e.rank;t++)(n.indexOf(t)>=0||n.length===0)&&r.push(`input_indices[${t}] = 0;`);return[`${r.join(`
`)}`,`var value = ${e.getByIndices(`input_indices`)};`,`value = min(value, ${e.getByIndices(`input_indices`)});`,``]})},Ur=(e,t)=>{jr(e.inputs),Fr(e,`ReduceProd`,t,(e,t)=>[`var value = ${t.type.storage}(1);`,``,`value *= ${e.getByIndices(`input_indices`)};`,``])},Wr=(e,t)=>{jr(e.inputs),Fr(e,`ReduceSum`,t,(e,t)=>[`var value = ${t.type.storage}(0);`,``,`value += ${e.getByIndices(`input_indices`)};`,``])},Gr=(e,t)=>{jr(e.inputs),Fr(e,`ReduceSumSquare`,t,(e,t)=>[`var t = ${t.type.value}(0); var value = ${t.type.value}(0);`,``,`t = ${e.getByIndices(`input_indices`)}; value += t * t;`,``])},Kr=(e,t,n)=>{if(t.length===0)return n;let r=1,i=1;for(let n=0;n<t.length;n++)t.indexOf(n)===-1?r*=e[n]:i*=e[n];return i<32&&r>1024},qr=(e,t)=>{Kr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Vr(e,t):Sr(e,t)},Jr=(e,t)=>{Kr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Lr(e,t):Cr(e,t)},Yr=(e,t)=>{Kr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Rr(e,t):Z(e,t)},Xr=(e,t)=>{Kr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?zr(e,t):wr(e,t)},Zr=(e,t)=>{Kr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Br(e,t):Q(e,t)},Qr=(e,t)=>{Kr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Hr(e,t):Tr(e,t)},$r=(e,t)=>{Kr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ur(e,t):Er(e,t)},ei=(e,t)=>{Kr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Wr(e,t):Dr(e,t)},ti=(e,t)=>{Kr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Gr(e,t):Or(e,t)},ni=(e,t)=>{Kr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ir(e,t):kr(e,t)}}),ii,ai,oi,si,ci=w(()=>{B(),Hn(),ri(),ii=e=>{if(!e||e.length===0||e.length>2)throw Error(`ArgMinMaxOp op requires 1 or 2 inputs.`);if(e[0].dataType!==1)throw Error(`Invalid input type.`)},ai=(e,t)=>{ii(e.inputs),e.compute(Nr(`ArgMin`,{hint:t.cacheKey,inputDependencies:[`rank`]},[e.inputs[0]],(e,n,r)=>{let i=[];for(let t=0;t<e.rank;t++)(r.indexOf(t)>=0||r.length===0)&&i.push(`input_indices[${t}] = 0;`);return[`${i.join(`
`)}`,`var value = ${e.getByIndices(`input_indices`)};
var best_index : i32 = 0;`,`if (${e.getByIndices(`input_indices`)} ${t.selectLastIndex>0?`<=`:`<`} value) {
         value = ${e.getByIndices(`input_indices`)};
         best_index = i32(last_index);
       }`,``,n.setByOffset(`global_idx`,`best_index`)]},[t.axis],7,t.keepDims),{inputs:[0]})},oi=(e,t)=>{ii(e.inputs),e.compute(Nr(`argMax`,{hint:t.cacheKey,inputDependencies:[`rank`]},[e.inputs[0]],(e,n,r)=>{let i=[];for(let t=0;t<e.rank;t++)(r.indexOf(t)>=0||r.length===0)&&i.push(`input_indices[${t}] = 0;`);return[`${i.join(`
`)}`,`var value = ${e.getByIndices(`input_indices`)};
var best_index : i32 = 0;`,`if (${e.getByIndices(`input_indices`)} ${t.selectLastIndex>0?`>=`:`>`} value) {
         value = ${e.getByIndices(`input_indices`)};
         best_index = i32(last_index);
       }`,``,n.setByOffset(`global_idx`,`best_index`)]},[t.axis],7,t.keepDims),{inputs:[0]})},si=e=>W(e)}),li,ui,di,fi,pi,mi,hi,gi,_i=w(()=>{B(),U(),An(),Y(),li=(e,t)=>{let n=e[0],r=e[1],i=e[2],a=e[3],o=e[4],s=e[5];if(o&&s)throw Error(`Attention cannot have both past and attention_bias`);if(n.dims.length!==3)throw Error(`Input "input" must have 3 dimensions`);let c=n.dims[0],l=n.dims[1],u=n.dims[2];if(i.dims.length!==1)throw Error(`Input "bias" is expected to have 1 dimensions`);if(r.dims.length!==2)throw Error(`Input "weights" is expected to have 2 dimensions`);if(r.dims[0]!==u)throw Error(`Input 1 dimension 0 should have same length as dimension 2 of input 0`);if(i.dims[0]!==r.dims[1])throw Error(`Input "bias" dimension 0 should have same length as dimension 1 of input "weights"`);let d=i.dims[0]/3,f=d,p=f;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw Error(`qkv_hidden_sizes attribute should have 3 elements`);for(let e of t.qkvHiddenSizes)if(e%t.numHeads!==0)throw Error(`qkv_hidden_sizes should be divisible by num_heads`);d=t.qkvHiddenSizes[0],f=t.qkvHiddenSizes[1],p=t.qkvHiddenSizes[2]}let m=l;if(d!==f)throw Error(`qkv_hidden_sizes first element should be same as the second`);if(i.dims[0]!==d+f+p)throw Error(`Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes`);let h=0;if(o){if(f!==p)throw Error(`Input "past" expect k_hidden_size == v_hidden_size`);if(o.dims.length!==5)throw Error(`Input "past" must have 5 dimensions`);if(o.dims[0]!==2)throw Error(`Input "past" first dimension must be 2`);if(o.dims[1]!==c)throw Error(`Input "past" second dimension must be batch_size`);if(o.dims[2]!==t.numHeads)throw Error(`Input "past" third dimension must be num_heads`);if(o.dims[4]!==f/t.numHeads)throw Error(`Input "past" fifth dimension must be k_hidden_size / num_heads`);t.pastPresentShareBuffer||(h=o.dims[3])}let g=m+h;if(a)throw Error(`Mask not supported`);if(o)throw Error(`past is not supported`);if(s){if(s.dims.length!==4)throw Error(`Input "attention_bias" must have 4 dimensions`);if(s.dims[0]!==c||s.dims[1]!==t.numHeads||s.dims[2]!==l||s.dims[3]!==g)throw Error(`Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)`)}return{batchSize:c,sequenceLength:l,pastSequenceLength:h,kvSequenceLength:m,totalSequenceLength:g,maxSequenceLength:-1,inputHiddenSize:u,hiddenSize:d,vHiddenSize:p,headSize:Math.floor(d/t.numHeads),vHeadSize:Math.floor(p/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:0,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},ui=(e,t,n)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset(`0`)});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset(`batchIdx`)}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${n?`let past_sequence_length = uniforms.past_sequence_length`:``};
    let present_sequence_length = total_sequence_length;
    `,di=(e,t,n,r,i,a,o,s)=>{let c=qn(o?1:a),l=64,u=a/c;u<l&&(l=32);let d=Math.ceil(a/c/l),f=[{type:12,data:t},{type:12,data:n},{type:12,data:r},{type:12,data:i},{type:12,data:u},{type:12,data:d}],p=Gn(e.dataType,c),m=Kn(1,c),h=[`type`];return o&&h.push(`type`),s&&h.push(`type`),{name:`AttentionProbsSoftmax`,shaderCache:{hint:`${l};${p};${c}`,inputDependencies:h},getShaderSource:t=>{let n=J(`x`,e.dataType,e.dims,c),r=[n],i=o?q(`seq_lens`,o.dataType,o.dims):void 0;i&&r.push(i);let a=s?q(`total_sequence_length_input`,s.dataType,s.dims):void 0;a&&r.push(a);let u=Kn(e.dataType);return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${t.registerUniforms([{name:`batch_size`,type:`u32`},{name:`num_heads`,type:`u32`},{name:`past_sequence_length`,type:`u32`},{name:`sequence_length`,type:`u32`},{name:`total_sequence_length`,type:`u32`},{name:`elements_per_thread`,type:`u32`}]).declareVariables(...r)}
  ${t.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${ui(i,a,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${o?`u32(past_sequence_length + workgroup_id.y + 1)`:`total_sequence_length`};
    var thread_max_vector = ${m}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${m}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(c){case 1:return`thread_max_vector`;case 2:return`max(thread_max_vector.x, thread_max_vector.y)`;case 4:return`max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))`;default:throw Error(`Unsupported components: ${c}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${l}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${m}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${m}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(c){case 1:return`sum_vector`;case 2:return`sum_vector.x + sum_vector.y`;case 4:return`sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w`;default:throw Error(`Unsupported components: ${c}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${l}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${n.type.value}(${u}(1.0) / ${u}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${m}(x[offset + i]);
        x[offset + i] = ${n.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${o?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${n.type.value}(${u}(0));
        }`:``};
  }`},getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:i,z:t*n},programUniforms:f})}},fi=(e,t,n,r,i,a,o,s,c)=>{let l=o+a.kvSequenceLength,u=[a.batchSize,a.numHeads,a.sequenceLength,l],d=e>1&&r,f=a.kvNumHeads?a.kvNumHeads:a.numHeads,p=d?[a.batchSize,f,l,a.headSize]:void 0,m=a.nReps?a.nReps:1,h=a.scale===0?1/Math.sqrt(a.headSize):a.scale,g=qn(a.headSize),_=a.headSize/g,v={x:Math.ceil(l/12),y:Math.ceil(a.sequenceLength/12),z:a.batchSize*a.numHeads},y=[{type:12,data:a.sequenceLength},{type:12,data:_},{type:12,data:l},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:h},{type:12,data:o},{type:12,data:a.kvSequenceLength},{type:12,data:m}],b=d&&r&&H.size(r.dims)>0,x=[`type`,`type`];b&&x.push(`type`),i&&x.push(`type`),s&&x.push(`type`),c&&x.push(`type`);let S=[{dims:u,dataType:t.dataType,gpuDataType:0}];return d&&S.push({dims:p,dataType:t.dataType,gpuDataType:0}),{name:`AttentionProbs`,shaderCache:{hint:`${g};${i!==void 0};${r!==void 0};${e}`,inputDependencies:x},getRunData:()=>({outputs:S,dispatchGroup:v,programUniforms:y}),getShaderSource:e=>{let a=q(`q`,t.dataType,t.dims,g),o=[a,q(`key`,n.dataType,n.dims,g)];if(b){let e=q(`past_key`,r.dataType,r.dims,g);o.push(e)}i&&o.push(q(`attention_bias`,i.dataType,i.dims));let l=s?q(`seq_lens`,s.dataType,s.dims):void 0;l&&o.push(l);let f=c?q(`total_sequence_length_input`,c.dataType,c.dims):void 0;f&&o.push(f);let h=J(`output`,t.dataType,u),_=[h];d&&_.push(J(`present_key`,t.dataType,p,g));let v=Kn(1,g);return`
  const TILE_SIZE = 12u;

  var<workgroup> tileQ: array<${a.type.storage}, 144>;
  var<workgroup> tileK: array<${a.type.storage}, 144>;
  ${e.registerUniforms([{name:`M`,type:`u32`},{name:`K`,type:`u32`},{name:`N`,type:`u32`},{name:`num_heads`,type:`u32`},{name:`head_size`,type:`u32`},{name:`alpha`,type:`f32`},{name:`past_sequence_length`,type:`u32`},{name:`kv_sequence_length`,type:`u32`},{name:`n_reps`,type:`u32`}]).declareVariables(...o,..._)}
  ${e.mainStart([12,12,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${m===1?`headIdx`:`headIdx / uniforms.n_reps`};
    let kv_num_heads = ${m===1?`uniforms.num_heads`:`uniforms.num_heads / uniforms.n_reps`};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${ui(l,f,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${b&&d?`let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;`:``};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${d?`let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;`:``}
    var value = ${v}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${b&&d?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${d?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:``}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${v}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(g){case 1:return`value`;case 2:return`value.x + value.y`;case 4:return`value.x + value.y + value.z + value.w`;default:throw Error(`Unsupported components: ${g}`)}})()};
        output[outputIdx] = ${h.type.value} (sum * uniforms.alpha) + ${i?`attention_bias[outputIdx]`:`0.0`};
    }
  }`}}},pi=(e,t,n,r,i,a,o=void 0,s=void 0)=>{let c=a+i.kvSequenceLength,l=i.nReps?i.nReps:1,u=i.vHiddenSize*l,d=e>1&&r,f=i.kvNumHeads?i.kvNumHeads:i.numHeads,p=d?[i.batchSize,f,c,i.headSize]:void 0,m=[i.batchSize,i.sequenceLength,u],h={x:Math.ceil(i.vHeadSize/12),y:Math.ceil(i.sequenceLength/12),z:i.batchSize*i.numHeads},g=[{type:12,data:i.sequenceLength},{type:12,data:c},{type:12,data:i.vHeadSize},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:12,data:u},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:l}],_=d&&r&&H.size(r.dims)>0,v=[`type`,`type`];_&&v.push(`type`),o&&v.push(`type`),s&&v.push(`type`);let y=[{dims:m,dataType:t.dataType,gpuDataType:0}];return d&&y.push({dims:p,dataType:t.dataType,gpuDataType:0}),{name:`AttentionScore`,shaderCache:{hint:`${r!==void 0};${e}`,inputDependencies:v},getRunData:()=>({outputs:y,dispatchGroup:h,programUniforms:g}),getShaderSource:e=>{let i=q(`probs`,t.dataType,t.dims),a=[i,q(`v`,n.dataType,n.dims)];_&&a.push(q(`past_value`,r.dataType,r.dims));let c=o?q(`seq_lens`,o.dataType,o.dims):void 0;o&&a.push(c);let u=s?q(`total_sequence_length_input`,s.dataType,s.dims):void 0;s&&a.push(u);let f=[J(`output`,t.dataType,m)];return d&&f.push(J(`present_value`,t.dataType,p)),`
  const TILE_SIZE = 12u;
  var<workgroup> tileQ: array<${i.type.value}, 144>;
  var<workgroup> tileV: array<${i.type.value}, 144>;
  ${e.registerUniforms([{name:`M`,type:`u32`},{name:`K`,type:`u32`},{name:`N`,type:`u32`},{name:`num_heads`,type:`u32`},{name:`head_size`,type:`u32`},{name:`v_hidden_size`,type:`u32`},{name:`past_sequence_length`,type:`u32`},{name:`kv_sequence_length`,type:`u32`},{name:`n_reps`,type:`u32`}]).declareVariables(...a,...f)}
  ${e.mainStart([12,12,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${l===1?`headIdx`:`headIdx / uniforms.n_reps`};
   let kv_num_heads = ${l===1?`uniforms.num_heads`:`uniforms.num_heads / uniforms.n_reps`};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${ui(c,u,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${_&&d?`let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;`:``};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${d?`let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;`:``}
   var value = ${i.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${_&&d?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${d?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:``}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`}}},mi=(e,t,n,r,i,a,o,s,c,l,u=void 0,d=void 0)=>{let f=Math.min(e.outputCount,1+ +!!o+ +!!s),p=f>1?o:void 0,m=f>1?s:void 0,h=f>1?l.pastSequenceLength:0,g=h+l.kvSequenceLength,_=c&&H.size(c.dims)>0?c:void 0,v=[t,n];p&&H.size(p.dims)>0&&v.push(p),_&&v.push(_),u&&v.push(u),d&&v.push(d);let y=e.compute(fi(f,t,n,p,_,l,h,u,d),{inputs:v,outputs:f>1?[-1,1]:[-1]})[0];e.compute(di(y,l.batchSize,l.numHeads,h,l.sequenceLength,g,u,d),{inputs:u&&d?[y,u,d]:[y],outputs:[]});let b=[y,r];m&&H.size(m.dims)>0&&b.push(m),u&&b.push(u),d&&b.push(d),e.compute(pi(f,y,r,m,l,h,u,d),{inputs:b,outputs:f>1?[0,2]:[0]})},hi=(e,t)=>{let n=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],r=t.sequenceLength,i=t.inputHiddenSize,a=t.headSize,o={x:Math.ceil(t.headSize/12),y:Math.ceil(t.sequenceLength/12),z:t.batchSize*t.numHeads},s=[e.inputs[0],e.inputs[1],e.inputs[2]],c=[{type:12,data:r},{type:12,data:i},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}];return e.compute({name:`AttentionPrepare`,shaderCache:{inputDependencies:[`type`,`type`,`type`]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:o,programUniforms:c}),getShaderSource:e=>{let t=J(`output_q`,s[0].dataType,n),r=J(`output_k`,s[0].dataType,n),i=J(`output_v`,s[0].dataType,n),a=q(`input`,s[0].dataType,s[0].dims),o=q(`weight`,s[1].dataType,s[1].dims),c=q(`bias`,s[2].dataType,s[2].dims),l=a.type.storage;return`
  const TILE_SIZE = 12u;
  var<workgroup> tileInput: array<${l}, 144>;
  var<workgroup> tileWeightQ: array<${l}, 144>;
  var<workgroup> tileWeightK: array<${l}, 144>;
  var<workgroup> tileWeightV: array<${l}, 144>;
  ${e.registerUniforms([{name:`M`,type:`u32`},{name:`K`,type:`u32`},{name:`N`,type:`u32`},{name:`num_heads`,type:`u32`},{name:`head_size`,type:`u32`},{name:`hidden_size`,type:`u32`},{name:`ldb`,type:`u32`}]).declareVariables(a,o,c,t,r,i)}
  ${e.mainStart([12,12,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${l}(0);
    var valueK = ${l}(0);
    var valueV = ${l}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`}},{inputs:s,outputs:[-1,-1,-1]})},gi=(e,t)=>{let n=li(e.inputs,t),[r,i,a]=hi(e,n);return mi(e,r,i,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],n)}}),vi,yi,bi,xi,Si=w(()=>{qe(),B(),U(),Hn(),Y(),vi=(e,t)=>{if(!e||e.length!==5)throw Error(`BatchNormalization requires 5 inputs`);let n=(e,t,n)=>{let r=t.length;if(r!==e.length)throw Error(`${n}: num dimensions != ${r}`);t.forEach((t,r)=>{if(t!==e[r])throw Error(`${n}: dim[${r}] do not match`)})};if(e[0].dims.length>1){let r=t.format===`NHWC`?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);n(e[1].dims,r,`Invalid input scale`),n(e[2].dims,r,`Invalid input B`),n(e[3].dims,r,`Invalid input mean`),n(e[4].dims,r,`Invalid input var`)}else n(e[1].dims,[1],`Invalid input scale`),n(e[2].dims,[1],`Invalid input B`),n(e[3].dims,[1],`Invalid input mean`),n(e[4].dims,[1],`Invalid input var`)},yi=(e,t)=>{let{epsilon:n,spatial:r,format:i}=t,a=e[0].dims,o=r?qn(a[a.length-1]):1,s=i===`NHWC`&&a.length>1?o:1,c=H.size(a)/o,l=r,u=l?a.length:a,d=q(`x`,e[0].dataType,e[0].dims,o),f=q(`scale`,e[1].dataType,e[1].dims,s),p=q(`bias`,e[2].dataType,e[2].dims,s),m=q(`inputMean`,e[3].dataType,e[3].dims,s),h=q(`inputVar`,e[4].dataType,e[4].dims,s),g=J(`y`,e[0].dataType,u,o),_=()=>{let e=``;if(r)e=`let cOffset = ${a.length===1?`0u`:i===`NHWC`?`outputIndices[${a.length-1}] / ${o}`:`outputIndices[1]`};`;else if(i===`NCHW`)e=`
            ${g.indicesSet(`outputIndices`,`0`,`0`)}
            let cOffset = ${g.indicesToOffset(`outputIndices`)};`;else{e=`var cIndices = ${f.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let t=1;t<f.rank;t++)e+=`cIndices[${t}] = outputIndices[${t}];`;e+=`let cOffset = ${f.indicesToOffset(`cIndices`)};`}return e};return{name:`BatchNormalization`,shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${o}`,inputDependencies:l?[`rank`,`type`,`type`,`type`,`type`]:void 0},getShaderSource:e=>`
  const epsilon = ${n};
  ${e.registerUniform(`outputSize`,`u32`).declareVariables(d,f,p,m,h,g)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}
    var outputIndices = ${g.offsetToIndices(`global_idx * ${o}`)};
    ${_()}
    let scale = ${f.getByOffset(`cOffset`)};
    let bias = ${p.getByOffset(`cOffset`)};
    let inputMean = ${m.getByOffset(`cOffset`)};
    let inputVar = ${h.getByOffset(`cOffset`)};
    let x = ${d.getByOffset(`global_idx`)};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${g.setByOffset(`global_idx`,`value`)}
  }`,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:l?[{type:12,data:c},...G(a)]:[{type:12,data:c}]})}},bi=e=>W(e),xi=(e,t)=>{let{inputs:n,outputCount:r}=e,i=bi({...t,outputCount:r});if(R.webgpu.validateInputContent&&vi(n,i),t.trainingMode)throw Error(`BatchNormalization trainingMode is not supported yet.`);e.compute(yi(n,i))}}),Ci,wi,Ti,Ei=w(()=>{U(),Y(),Ci=e=>{if(e[0].dims.length!==3)throw Error(`input should have 3 dimensions`);if(![320,640,1280].includes(e[0].dims[2]))throw Error(`number of channels should be 320, 640 or 1280`);if(e[1].dims.length!==1)throw Error(`bias is expected to have 1 dimensions`);if(e[0].dims[2]!==e[1].dims[0])throw Error(`last dimension of input and bias are not the same`)},wi=e=>{let t=e[0].dims,n=e[0].dims[2],r=H.size(t)/4,i=e[0].dataType,a=q(`input`,i,t,4),o=q(`bias`,i,[n],4),s=q(`residual`,i,t,4),c=J(`output`,i,t,4);return{name:`BiasAdd`,getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)}}),getShaderSource:e=>`
  const channels = ${n}u / 4;
  ${e.declareVariables(a,o,s,c)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${a.getByOffset(`global_idx`)}
      + ${o.getByOffset(`global_idx % channels`)} + ${s.getByOffset(`global_idx`)};
    ${c.setByOffset(`global_idx`,`value`)}
  }`}},Ti=e=>{Ci(e.inputs),e.compute(wi(e.inputs))}}),Di,$,Oi,ki,Ai,ji,Mi,Ni,Pi,Fi,Ii,Li,Ri,zi,Bi,Vi,Hi,Ui,Wi,Gi,Ki,qi,Ji,Yi,Xi,Zi,Qi,$i,ea,ta,na,ra,ia,aa,oa,sa,ca,la,ua,da,fa,pa,ma,ha,ga,_a,va=w(()=>{B(),U(),Hn(),Y(),Di=(e,t,n,r,i,a,o)=>{let s=Math.ceil(t/4),c=``;c=typeof i==`string`?`${i}(a)`:i(`a`);let l=q(`inputData`,n,[s],4),u=J(`outputData`,r,[s],4),d=[{name:`vec_size`,type:`u32`}];return o&&d.push(...o),`
      ${e.registerUniforms(d).declareVariables(l,u)}

  ${a??``}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.vec_size`)}

    let a = ${l.getByOffset(`global_idx`)};
    ${u.setByOffset(`global_idx`,c)}
  }`},$=(e,t,n,r,i,a=e.dataType,o,s)=>{let c=[{type:12,data:Math.ceil(H.size(e.dims)/4)}];return o&&c.push(...o),{name:t,shaderCache:{hint:i,inputDependencies:[`type`]},getShaderSource:t=>Di(t,H.size(e.dims),e.dataType,a,n,r,s),getRunData:t=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(H.size(t[0].dims)/64/4)},programUniforms:c})}},Oi=e=>{e.compute($(e.inputs[0],`Abs`,`abs`))},ki=e=>{e.compute($(e.inputs[0],`Acos`,`acos`))},Ai=e=>{e.compute($(e.inputs[0],`Acosh`,`acosh`))},ji=e=>{e.compute($(e.inputs[0],`Asin`,`asin`))},Mi=e=>{e.compute($(e.inputs[0],`Asinh`,`asinh`))},Ni=e=>{e.compute($(e.inputs[0],`Atan`,`atan`))},Pi=e=>{e.compute($(e.inputs[0],`Atanh`,`atanh`))},Fi=e=>W(e),Ii=(e,t)=>{let n;switch(t.to){case 10:n=`vec4<f16>`;break;case 1:n=`vec4<f32>`;break;case 12:n=`vec4<u32>`;break;case 6:n=`vec4<i32>`;break;case 9:n=`vec4<bool>`;break;default:throw RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute($(e.inputs[0],`Cast`,n,void 0,t.cacheKey,t.to))},Li=e=>{let t,n,r=e.length>=2&&e[1].data!==0,i=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,n=i?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,n=i?e[2].getUint16Array()[0]:31743;break;default:throw Error(`Unsupport data type`)}return W({min:t,max:n})},Ri=(e,t)=>{let n=t||Li(e.inputs),r=Kn(e.inputs[0].dataType);e.compute($(e.inputs[0],`Clip`,e=>`clamp(${e}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:e.inputs[0].dataType,data:n.min},{type:e.inputs[0].dataType,data:n.max}],[{name:`min`,type:r},{name:`max`,type:r}]),{inputs:[0]})},zi=e=>{e.compute($(e.inputs[0],`Ceil`,`ceil`))},Bi=e=>{e.compute($(e.inputs[0],`Cos`,`cos`))},Vi=e=>{e.compute($(e.inputs[0],`Cosh`,`cosh`))},Hi=e=>W(e),Ui=(e,t)=>{let n=Kn(e.inputs[0].dataType);e.compute($(e.inputs[0],`Elu`,e=>`elu_vf32(${e})`,`
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Wi=(e=`f32`)=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,Gi=e=>{let t=Kn(e.inputs[0].dataType);e.compute($(e.inputs[0],`Erf`,e=>`erf_vf32(${e})`,Wi(t)))},Ki=e=>{e.compute($(e.inputs[0],`Exp`,`exp`))},qi=e=>{e.compute($(e.inputs[0],`Floor`,`floor`))},Ji=e=>{let t=Kn(e.inputs[0].dataType);e.compute($(e.inputs[0],`Gelu`,e=>`0.5 * ${e} * (1.0 + erf_vf32(${e} * 0.7071067811865475))`,Wi(t)))},Yi=(e,t)=>{let n=Kn(e.inputs[0].dataType);e.compute($(e.inputs[0],`LeakyRelu`,e=>`select(leaky_relu_alpha_ * ${e}, ${e}, ${e} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${t.alpha});`,t.cacheKey))},Xi=e=>{e.compute($(e.inputs[0],`Not`,e=>`!${e}`))},Zi=e=>{e.compute($(e.inputs[0],`Neg`,e=>`-${e}`))},Qi=e=>{e.compute($(e.inputs[0],`Reciprocal`,e=>`1.0/${e}`))},$i=e=>{let t=Kn(e.inputs[0].dataType);e.compute($(e.inputs[0],`Relu`,e=>`select(vec4<${t}>(0.0), ${e}, ${e} > vec4<${t}>(0.0))`))},ea=e=>{e.compute($(e.inputs[0],`Sigmoid`,e=>`(1.0 / (1.0 + exp(-${e})))`))},ta=e=>W(e),na=(e,t)=>{let n=Kn(e.inputs[0].dataType);e.compute($(e.inputs[0],`HardSigmoid`,e=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${e} + vec4<${n}>(${t.beta})))`,void 0,t.cacheKey))},ra=e=>{let t=Kn(e.inputs[0].dataType);e.compute($(e.inputs[0],`HardSwish`,e=>`${e} * max(vec4<${t}>(0.0), min(vec4<${t}>(1.0), vec4<${t}>(${t}(1.0 / 6.0)) * ${e} + vec4<${t}>(0.5)))`))},ia=e=>{e.compute($(e.inputs[0],`Sin`,`sin`))},aa=e=>{e.compute($(e.inputs[0],`Sinh`,`sinh`))},oa=e=>{e.compute($(e.inputs[0],`Sqrt`,`sqrt`))},sa=e=>{e.compute($(e.inputs[0],`Tan`,`tan`))},ca=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,la=e=>{e.compute($(e.inputs[0],`Tanh`,ca))},ua=(e=`f32`)=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${ca(`v`)};
}
`,da=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,fa=e=>{let t=Kn(e.inputs[0].dataType);e.compute($(e.inputs[0],`FastGelu`,da,ua(t),void 0,e.inputs[0].dataType))},pa=(e,t)=>{let n=Kn(e.inputs[0].dataType);return e.compute($(e.inputs[0],`ThresholdedRelu`,e=>`select(vec4<${n}>(0.0), ${e}, ${e} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`,t.cacheKey)),0},ma=e=>{e.compute($(e.inputs[0],`Log`,`log`))},ha=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,ga=e=>`quick_gelu_impl(${e})`,_a=(e,t)=>{let n=Kn(e.inputs[0].dataType);e.compute($(e.inputs[0],`QuickGelu`,ga,ha(n,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),ya,ba,xa,Sa=w(()=>{U(),Y(),va(),ya=e=>{if(e[0].dims.length!==3)throw Error(`input should have 3 dimensions`);if(![2560,5120,10240].includes(e[0].dims[2]))throw Error(`hidden state should be 2560, 5120 or 10240`);if(e[1].dims.length!==1)throw Error(`bias is expected to have 1 dimensions`);if(e[0].dims[2]!==e[1].dims[0])throw Error(`last dimension of input and bias are not the same`)},ba=e=>{let t=e[0].dims.slice();t[2]/=2;let n=q(`input`,e[0].dataType,e[0].dims,4),r=q(`bias`,e[0].dataType,[e[0].dims[2]],4),i=J(`output`,e[0].dataType,t,4),a=H.size(t)/4,o=Gn(e[0].dataType);return{name:`BiasSplitGelu`,getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:t=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${t.declareVariables(n,r,i)}

  ${Wi(o)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${i.setByOffset(`global_idx`,`valueLeft * geluRight`)}
  }`}},xa=e=>{ya(e.inputs),e.compute(ba(e.inputs))}}),Ca,wa,Ta,Ea,Da,Oa,ka,Aa,ja,Ma,Na,Pa,Fa,Ia=w(()=>{B(),U(),Y(),Ca=(e,t,n,r,i,a,o,s,c,l,u,d)=>{let f,p;typeof s==`string`?f=p=(e,t)=>`${s}((${e}),(${t}))`:typeof s==`function`?f=p=s:(f=s.scalar,p=s.vector);let m=J(`outputData`,u,r.length,4),h=q(`aData`,c,t.length,4),g=q(`bData`,l,n.length,4),_;if(i){if(a){let e=H.size(t)===1,r=H.size(n)===1,i=t.length>0&&t[t.length-1]%4==0,a=n.length>0&&n[n.length-1]%4==0;_=e||r?m.setByOffset(`global_idx`,p(e?`${h.type.value}(${h.getByOffset(`0`)}.x)`:h.getByOffset(`global_idx`),r?`${g.type.value}(${g.getByOffset(`0`)}.x)`:g.getByOffset(`global_idx`))):`
            let outputIndices = ${m.offsetToIndices(`global_idx * 4u`)};
            let offsetA = ${h.broadcastedIndicesToOffset(`outputIndices`,m)};
            let offsetB = ${g.broadcastedIndicesToOffset(`outputIndices`,m)};
            ${m.setByOffset(`global_idx`,p(o||i?h.getByOffset(`offsetA / 4u`):`${h.type.value}(${h.getByOffset(`offsetA / 4u`)}[offsetA % 4u])`,o||a?g.getByOffset(`offsetB / 4u`):`${g.type.value}(${g.getByOffset(`offsetB / 4u`)}[offsetB % 4u])`))}
          `}else _=m.setByOffset(`global_idx`,p(h.getByOffset(`global_idx`),g.getByOffset(`global_idx`)))}else{if(!a)throw Error(`no necessary to use scalar implementation for element-wise binary op implementation.`);let e=(e,t,n=``)=>{let r=`aData[indexA${t}][componentA${t}]`,i=`bData[indexB${t}][componentB${t}]`;return`
            let outputIndices${t} = ${m.offsetToIndices(`global_idx * 4u + ${t}u`)};
            let offsetA${t} = ${h.broadcastedIndicesToOffset(`outputIndices${t}`,m)};
            let offsetB${t} = ${g.broadcastedIndicesToOffset(`outputIndices${t}`,m)};
            let indexA${t} = offsetA${t} / 4u;
            let indexB${t} = offsetB${t} / 4u;
            let componentA${t} = offsetA${t} % 4u;
            let componentB${t} = offsetB${t} % 4u;
            ${e}[${t}] = ${n}(${f(r,i)});
          `};_=u===9?`
            var data = vec4<u32>(0);
            ${e(`data`,0,`u32`)}
            ${e(`data`,1,`u32`)}
            ${e(`data`,2,`u32`)}
            ${e(`data`,3,`u32`)}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:`
            ${e(`outputData[global_idx]`,0)}
            ${e(`outputData[global_idx]`,1)}
            ${e(`outputData[global_idx]`,2)}
            ${e(`outputData[global_idx]`,3)}
          `}return`
        ${e.registerUniform(`vec_size`,`u32`).declareVariables(h,g,m)}

        ${d??``}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.vec_size`)}
        ${_}
      }`},wa=(e,t,n,r,i,a,o=n.dataType)=>{let s=n.dims.map(Number),c=r.dims.map(Number),l=!H.areEqual(s,c),u=s,d=H.size(s),f=!1,p=!1,m=[l];if(l){let e=sn.calcShape(s,c,!1);if(!e)throw Error(`Can't perform binary op on the given tensors`);u=e.slice(),d=H.size(u);let t=H.size(s)===1,n=H.size(c)===1,r=s.length>0&&s[s.length-1]%4==0,i=c.length>0&&c[c.length-1]%4==0;m.push(t),m.push(n),m.push(r),m.push(i);let a=1;for(let e=1;e<u.length;e++){let t=s[s.length-e];if(t===c[c.length-e])a*=t;else break}a%4==0?(p=!0,f=!0):(t||n||r||i)&&(f=!0)}else f=!0;return m.push(f),{name:e,shaderCache:{hint:t+m.map(e=>e.toString()).join(`_`),inputDependencies:[`rank`,`rank`]},getShaderSource:e=>Ca(e,s,c,u,f,l,p,i,n.dataType,r.dataType,o,a),getRunData:()=>({outputs:[{dims:u,dataType:o}],dispatchGroup:{x:Math.ceil(d/64/4)},programUniforms:[{type:12,data:Math.ceil(H.size(u)/4)},...G(s,c,u)]})}},Ta=(e,t,n,r,i,a)=>{e.compute(wa(t,i??``,e.inputs[0],e.inputs[1],n,r,a))},Ea=e=>{Ta(e,`Add`,(e,t)=>`${e}+${t}`)},Da=e=>{Ta(e,`Div`,(e,t)=>`${e}/${t}`)},Oa=e=>{Ta(e,`Equal`,{scalar:(e,t)=>`u32(${e}==${t})`,vector:(e,t)=>`vec4<u32>(${e}==${t})`},void 0,void 0,9)},ka=e=>{Ta(e,`Mul`,(e,t)=>`${e}*${t}`)},Aa=e=>{let t=q(`input`,e.inputs[0].dataType,e.inputs[0].dims).type.value;Ta(e,`Pow`,{scalar:(e,t)=>`pow_custom(${e},${t})`,vector:(e,t)=>`pow_vector_custom(${e},${t})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t===`i32`?`round`:``}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},ja=e=>{Ta(e,`Sub`,(e,t)=>`${e}-${t}`)},Ma=e=>{Ta(e,`Greater`,{scalar:(e,t)=>`u32(${e}>${t})`,vector:(e,t)=>`vec4<u32>(${e}>${t})`},void 0,void 0,9)},Na=e=>{Ta(e,`Less`,{scalar:(e,t)=>`u32(${e}<${t})`,vector:(e,t)=>`vec4<u32>(${e}<${t})`},void 0,void 0,9)},Pa=e=>{Ta(e,`GreaterOrEqual`,{scalar:(e,t)=>`u32(${e}>=${t})`,vector:(e,t)=>`vec4<u32>(${e}>=${t})`},void 0,void 0,9)},Fa=e=>{Ta(e,`LessOrEqual`,{scalar:(e,t)=>`u32(${e}<=${t})`,vector:(e,t)=>`vec4<u32>(${e}<=${t})`},void 0,void 0,9)}}),La,Ra,za,Ba,Va=w(()=>{B(),U(),Hn(),Y(),La=(e,t)=>{if(!e||e.length<1)throw Error(`too few inputs`);let n=e[0],r=n.dataType,i=n.dims.length;e.forEach((e,a)=>{if(a!==0){if(e.dataType!==r)throw Error(`input tensors should be one type`);if(e.dims.length!==i)throw Error(`input tensors should have the same shape`);e.dims.forEach((e,r)=>{if(r!==t&&e!==n.dims[r])throw Error(`non concat dimensions must match`)})}})},Ra=(e,t,n,r,i=0)=>{let a=e.reduce((e,t)=>e+H.size(t.dims),0),o=Array(e.length),s=Array(e.length),c=Array(e.length),l=0,u=i,d=[],f=[],p=[{type:12,data:a}];for(let n=0;n<e.length;++n)o[n]=l,s[n]=u,l+=H.size(e[n].dims),u+=e[n].dims[t],f.push(e[n].dims.length),c[n]=q(`input${n}`,r,f[n]),d.push(`rank`),p.push({type:12,data:o[n]}),p.push({type:12,data:s[n]});for(let t=0;t<e.length;++t)p.push(...G(e[t].dims));p.push(...G(n));let m=J(`output`,r,n.length),h=c.map((n,r)=>{let i=`
        let inputOffset = ${`global_idx - uniforms.inputOffset${r}`};
        var outputIndices = ${n.offsetToIndices(`inputOffset`)};
        ${m.indicesGet(`outputIndices`,t)} += uniforms.outputAxisOffset${r};
        ${m.setByIndices(`outputIndices`,n.getByOffset(`inputOffset`))}`;return e.length===1?i:r===0?`if (inputIndex == 0u) {${i}}`:r===e.length-1?`else {${i}}`:`else if (inputIndex == ${r}u) {${i}}`}).join(`
`);return{name:`Concat`,shaderCache:{hint:`${t}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:n,dataType:r}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:p}),getShaderSource:t=>`

  ${(()=>{t.registerUniform(`outputSize`,`u32`);for(let n=0;n<e.length;n++)t.registerUniform(`inputOffset${n}`,`u32`),t.registerUniform(`outputAxisOffset${n}`,`u32`);return t.declareVariables(...c,m)})()}

  fn calculateInputIndex(global_idx: u32) -> u32 {
    ${c.slice(1).map((e,t)=>`if (global_idx < uniforms.inputOffset${t+1}) {
      return ${t}u;
    }`).join(`
`)}
    return ${e.length-1}u;
  }

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}

    let inputIndex = calculateInputIndex(global_idx);
    ${h}
  }`}},za=(e,t)=>{let n=e.inputs,r=n[0].dims,i=H.normalizeAxis(t.axis,r.length);La(n,i);let a=r.slice();a[i]=n.reduce((e,t)=>e+(t.dims.length>i?t.dims[i]:0),0);let o=n.filter(e=>H.size(e.dims)>0);if(o.length===0){e.output(0,a);return}let s=e.deviceLimits.maxStorageBuffersPerShaderStage-1,c=0;for(let t=0;t<o.length;t+=s){let r=o.slice(t,t+s);e.compute(Ra(r,i,a,n[0].dataType,c),{inputs:r,outputs:[0]}),c+=r.reduce((e,t)=>e+t.dims[i],0)}},Ba=e=>W({axis:e.axis})}),Ha,Ua,Wa,Ga,Ka=w(()=>{B(),U(),Ha=(e,t,n=`f32`)=>{switch(e.activation){case`Relu`:return`value = max(value, ${t}(0.0));`;case`Sigmoid`:return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case`Clip`:return`value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;case`HardSigmoid`:return`value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case`LeakyRelu`:return`value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case`Tanh`:return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case``:return``;default:throw Error(`Unsupported activation ${e.activation}`)}},Ua=(e,t)=>{e.activation===`Clip`?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation===`HardSigmoid`?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation===`LeakyRelu`&&t.push({type:1,data:e.alpha})},Wa=(e,t)=>{e.activation===`Clip`?t.push({name:`clip_max`,type:`f32`},{name:`clip_min`,type:`f32`}):e.activation===`HardSigmoid`?t.push({name:`alpha`,type:`f32`},{name:`beta`,type:`f32`}):e.activation===`LeakyRelu`&&t.push({name:`alpha`,type:`f32`})},Ga=e=>{let t=e?.activation||``;if(t===`HardSigmoid`){let[n,r]=e?.activation_params||[.2,.5];return{activation:t,alpha:n,beta:r}}if(t===`Clip`){let[n,r]=e?.activation_params||[un,dn];return{activation:t,clipMax:r,clipMin:n}}if(t===`LeakyRelu`){let[n]=e?.activation_params||[.01];return{activation:t,alpha:n}}return{activation:t}}}),qa,Ja,Ya=w(()=>{qa=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw Error(`${e}-component is not supported.`)}},Ja=e=>`
      ${e?`value = value + getBiasByOutputCoords(coords);`:``}
      `}),Xa,Za=w(()=>{Xa=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),Qa,$a,eo=w(()=>{B(),U(),Y(),Ka(),Qa=(e,t,n,r,i)=>{let a=r-n;return`
      ${Array.from({length:n}).map((n,o)=>`
      if (${K(t.shape,o,t.rank)} != 1) {
        ${t.indicesSet(e,o,K(i,o+a,r))}
      } else {
        ${t.indicesSet(e,o,0)}
      }`).join(``)}
`},$a=(e,t,n,r,i=!1,a)=>{let o=e[0].dims,s=e[1].dims,c=o[o.length-2],l=s[s.length-1],u=o[o.length-1],d=qn(l),f=qn(u),p=qn(c),m=H.size(n)/d/p,h=e.length>2,g=r?r.slice(0,-2):n.slice(0,-2),_=[H.size(g),c,l],v=[{type:12,data:m},{type:12,data:c},{type:12,data:l},{type:12,data:u}];return Ua(t,v),v.push(...G(g,o,s)),h&&v.push(...G(e[2].dims)),v.push(...G(_)),{name:`MatMulNaive`,shaderCache:{hint:`${t.activation};${d};${f};${p};${i}`,inputDependencies:h?[`rank`,`rank`,`rank`]:[`rank`,`rank`]},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:v}),getShaderSource:r=>{let a=$n(`batch_dims`,e[0].dataType,g.length),c=q(`a`,e[0].dataType,o.length,f),l=q(`b`,e[1].dataType,s.length,d),u=J(`output`,e[0].dataType,_.length,d),m=Gn(u.type.tensor),v=Ha(t,u.type.value,m),y=[c,l],b=``;if(h){let t=i?d:1;y.push(q(`bias`,e[2].dataType,e[2].dims.length,t)),b=`${i?`value += bias[col / ${t}];`:`value += ${u.type.value}(bias[row + i]);`}`}let x=[{name:`output_size`,type:`u32`},{name:`M`,type:`u32`},{name:`N`,type:`u32`},{name:`K`,type:`u32`}];Wa(t,x);let S=()=>{let e=`var a_data: ${c.type.value};`;for(let t=0;t<f;t++)e+=`
              let b_data${t} = b[(b_offset + (k + ${t}) * uniforms.N + col) / ${d}];`;for(let t=0;t<p;t++){e+=`a_data = a[(a_offset + (row + ${t}) * uniforms.K + k) / ${f}];`;for(let n=0;n<f;n++)e+=`
            values[${t}] = fma(${l.type.value}(a_data${f===1?``:`[${n}]`}), b_data${n}, values[${t}]);
`}return e};return`
  ${r.registerUniforms(x).registerInternalVariables(a).declareVariables(...y,u)}
  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
    let col = (global_idx % (uniforms.N / ${d})) * ${d};
    var index1 = global_idx / (uniforms.N / ${d});
    let stride1 = uniforms.M / ${p};
    let row = (index1 % stride1) * ${p};
    let batch = index1 / stride1;

    ${n.length===2?``:`let batch_indices = ${a.offsetToIndices(`batch`)};`}

    var a_indices: ${c.type.indices};
    ${Qa(`a_indices`,c,c.rank-2,a.rank,`batch_indices`)}
    ${c.indicesSet(`a_indices`,c.rank-2,0)}
    ${c.indicesSet(`a_indices`,c.rank-1,0)}
    let a_offset = ${c.indicesToOffset(`a_indices`)};

    var b_indices: ${l.type.indices};
    ${Qa(`b_indices`,l,l.rank-2,a.rank,`batch_indices`)}
    ${l.indicesSet(`b_indices`,l.rank-2,0)}
    ${l.indicesSet(`b_indices`,l.rank-1,0)}
    let b_offset = ${l.indicesToOffset(`b_indices`)};
    var values: array<${u.type.value}, ${p}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${f}) {
      ${S()}
    }
    for (var i = 0u; i < ${p}u; i++) {
      var value = values[i];
      ${b}
      ${v}
      let cur_indices = ${u.type.indices}(batch, row + i, col);
      let offset = ${u.indicesToOffset(`cur_indices`)};
      ${u.setByOffset(`offset / ${d}`,`value`)};
    }
  }
  `}}}}),to,no,ro,io,ao,oo,so,co,lo=w(()=>{B(),U(),Y(),Ka(),eo(),Ya(),to=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?`, batchIndices`:``});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?`, batchIndices`:``});
        `,no=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?``:`let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];`}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?``:`acc[i] = BCached3 * ACached3[i] + acc[i];`}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?``:`acc[i] = BCached3 * ACached.w + acc[i];`}
        }`,ro=(e,t,n=`f32`,r,i=!1,a=32,o=!1,s=32)=>{let c=t[1]*e[1],l=t[0]*e[0],u=i?c:a,d=i?a:c,f=u/t[0],p=a/t[1];if((!i||f!==4||e[1]!==4)&&(i||f!==3&&f!==4)||u%t[0]!==0||a%t[1]!==0||e[0]!==4)throw Error(`If transposeA ${i} is true, innerElementSize ${f} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${f} must be 3 or 4.
  tileAWidth ${u} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${f}<${n}>, ${u/f}>, ${d}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${l/e[0]}>, ${a}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${f};
const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${o?`0`:`i32(globalId.z)`};
  ${r?`let batchIndices = ${r.offsetToIndices(`u32(batch)`)};`:``}
  let globalRowStart = i32(workgroupId.y) * ${c};

  let num_tiles = ${o?`${Math.ceil(s/a)}`:`(uniforms.dim_inner - 1) / tileInner + 1`};
  var kStart = ${o?`i32(globalId.z) * ${s}`:`0`};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${p};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${to(i,r)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${p}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${r?`, batchIndices`:``});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${f===3?``:`let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];`}

          ${no(i,f)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},io=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?`, batchIndices`:``});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?`, batchIndices`:``});
            `,ao=e=>e?`let ACached = mm_Asub[k][tileRow + innerRow];`:`let ACached = mm_Asub[tileRow + innerRow][k];`,oo=(e,t,n=`f32`,r,i=!1,a=32,o=!1,s=32,c=!1)=>{let l=e[1]*t[1],u=e[0]*t[0],d=i?l:a,f=i?a:l;if(f%t[1]!==0||d%t[0]!==0||a%t[1]!==0)throw Error(`tileAHight ${f} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${d} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let p=f/t[1],m=d/t[0],h=a/t[1],g=c?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${u};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${f}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${d}; inputCol = inputCol + ${t[0]}) {
          ${io(i,r)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${u}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${r?`, batchIndices`:``});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${n}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${i?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${l};

let tileRowA = i32(localId.y) * ${p};
let tileColA = i32(localId.x) * ${m};
let tileRowB = i32(localId.y) * ${h};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${p}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${m}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${io(i,r)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${r?`, batchIndices`:``});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${n}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${ao(i)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${n}, ${d}>, ${f}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${u}>, ${a}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${o?`0`:`i32(globalId.z)`};
    ${r?`let batchIndices = ${r.offsetToIndices(`u32(batch)`)};`:``}
    let num_tiles = ${o?`${Math.ceil(s/a)}`:`(uniforms.dim_inner - 1) / tileInner + 1`};
    var kStart = ${o?`i32(globalId.z) * ${s}`:`0`};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${g}
  }
`},so=(e,t,n,r,i=!1)=>{let[a,o,s,c]=r,l=Gn(r[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${qa(e,l)} {
      var value = ${qa(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${o.type.indices};
        ${Qa(`aIndices`,o,o.rank-2,a.rank,`batchIndices`)}
        ${o.indicesSet(`aIndices`,o.rank-2,`u32(row)`)}
        ${o.indicesSet(`aIndices`,o.rank-1,`u32(colIn)`)}
        value = ${o.getByIndices(`aIndices`)};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${qa(e,l)} {
      var value = ${qa(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${s.type.indices};
        ${Qa(`bIndices`,s,s.rank-2,a.rank,`batchIndices`)}
        ${s.indicesSet(`bIndices`,s.rank-2,`u32(row)`)}
        ${s.indicesSet(`bIndices`,s.rank-1,`u32(colIn)`)}
        value = ${s.getByIndices(`bIndices`)};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${qa(e,l)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${i?`bias[colIn]`:`${qa(e,l)}(bias[row])`};`:``}
        ${n}
        ${c.setByIndices(`vec3<u32>(coords)`,`value`)}
      }
    }
    `},co=(e,t,n,r,i=!1,a)=>{let o=e[0].dims,s=e[1].dims,c=o.slice(0,-2),l=s.slice(0,-2),u=r?r.slice(0,-2):n.slice(0,-2),d=H.size(u),f=o[o.length-2],p=o[o.length-1],m=s[s.length-1],h=p%4==0&&m%4==0,g=f<=8?[4,1,1]:[4,4,1],_=[8,8,1],v=[Math.ceil(m/_[0]/g[0]),Math.ceil(f/_[1]/g[1]),Math.ceil(d/_[2]/g[2])],y=h?4:1,b=[...c,f,p/y],x=b.length,S=[...l,p,m/y],C=S.length,w=[d,f,m/y],T=[{type:6,data:f},{type:6,data:m},{type:6,data:p}];Ua(t,T),T.push(...G(u,b,S));let E=[`rank`,`rank`],D=e.length>2;return D&&(T.push(...G(e[2].dims)),E.push(`rank`)),T.push(...G(w)),{name:`MatMul`,shaderCache:{hint:`${g};${t.activation};${h};${i}`,inputDependencies:E},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:T}),getShaderSource:n=>{let r=u.length,a=$n(`batchDims`,e[0].dataType,r,1),o=Gn(e[0].dataType),s=q(`a`,e[0].dataType,x,y),c=q(`b`,e[1].dataType,C,y),l=J(`result`,e[0].dataType,w.length,y),d=[s,c];if(D){let t=i?y:1;d.push(q(`bias`,e[2].dataType,e[2].dims.length,t))}let f=[{name:`dim_a_outer`,type:`i32`},{name:`dim_b_outer`,type:`i32`},{name:`dim_inner`,type:`i32`}];Wa(t,f);let p=Gn(l.type.tensor),m=Ha(t,l.type.value,p),v=so(y,D,m,[a,s,c,l],i);return`
  ${n.registerUniforms(f).registerInternalVariables(a).declareVariables(...d,l)}
  ${v}
  ${h?ro(g,_,o,a):oo(g,_,o,a)}
                   `}}}}),uo,fo,po=w(()=>{B(),an(),Y(),Ka(),Ya(),Za(),lo(),uo=(e,t,n,r,i=!1,a,o=4,s=4,c=4,l=`f32`)=>{let u=e=>{switch(e){case 1:return`resData = x[xIndex];`;case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return`resData = x[xIndex / 4];`;default:throw Error(`innerElementSize ${e} is not supported.`)}},d=e=>{switch(e){case 1:return`return w[row * i32(uniforms.w_shape[3]) + colIn];`;case 4:return`return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];`;default:throw Error(`innerElementSize ${e} is not supported.`)}},f=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,p=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,m=e?`i32(uniforms.x_shape[1])`:`i32(uniforms.x_shape[2])`,h=e?`i32(uniforms.x_shape[2])`:`i32(uniforms.x_shape[3])`,g=e?`row`:`col`,_=e?`col`:`row`,v=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?`i32(uniforms.result_shape[2])`:`i32(uniforms.result_shape[3])`};
    let outRow = ${g} / outWidth;
    let outCol = ${g} % outWidth;

    let WRow = ${_} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${_} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${_} % inChannels;
    var resData = ${qa(o,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${h}) {
      ${f}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${u(o)}
    }
    return resData;`,y=e?t&&r?`
    let col = colIn * ${o};
    ${v}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${v}
    }
    return ${qa(o,l)}(0.0);`:r&&n?`
    let col = colIn * ${o};
    ${v}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${v}
    }
    return ${qa(o,l)}(0.0);`,b=e?r&&n?d(s):`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${d(s)}
    }
    return ${qa(s,l)}(0.0);`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${d(s)}
    }
    return ${qa(s,l)}(0.0);`,x=qa(c,l),S=qa(e?o:s,l),C=qa(e?s:o,l),w=Ha(a,x,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${S} {
      ${e?y:b}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e?b:y}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${x}) {
      let col = colIn * ${c};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?`i32(uniforms.result_shape[2])`:`i32(uniforms.result_shape[3])`};
      ${p}
      ${Ja(i)}
      ${w}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},fo=(e,t,n,r,i,a,o,s,c)=>{let l=t.format===`NHWC`,u=l?e[0].dims[3]:e[0].dims[1],d=n[0],f=l?n[2]:n[3],p=l?n[1]:n[2],m=l?n[3]:n[1],h=l&&(u%4==0||u%3==0)&&m%4==0,g=l?m:f*p,_=l?f*p:m,v=[8,8,1],y=r<=8?[4,1,1]:[4,4,1],b=[Math.ceil(g/v[0]/y[0]),Math.ceil(_/v[1]/y[1]),Math.ceil(d/v[2]/y[2])];V(`verbose`,()=>`[conv2d_mm_webgpu] dispatch = ${b}`);let x=h?l&&u%4!=0?3:4:1,S=v[1]*y[1],C=v[0]*y[0],w=Math.max(v[0]*x,v[1]),T=r%S===0,E=i%C===0,D=a%w===0,O=h?[x,4,4]:[1,1,1],k=[{type:6,data:r},{type:6,data:i},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Ua(t,k),k.push(...G(e[0].dims,e[1].dims));let A=[`rank`,`rank`];return o&&(k.push(...G(e[2].dims)),A.push(`rank`)),k.push(...G(n)),{name:`Conv2DMatMul`,shaderCache:{hint:`${t.cacheKey};${x};${h};${T};${E};${D};${S};${C};${w}`,inputDependencies:A},getRunData:()=>({outputs:[{dims:c?c(n):n,dataType:e[0].dataType}],dispatchGroup:{x:b[0],y:b[1],z:b[2]},programUniforms:k}),getShaderSource:r=>{let i=[{name:`dim_a_outer`,type:`i32`},{name:`dim_b_outer`,type:`i32`},{name:`dim_inner`,type:`i32`},{name:`pad`,type:`i32`,length:2},{name:`stride`,type:`i32`,length:2},{name:`dilation`,type:`i32`,length:2}];Wa(t,i);let a=h?4:1,c=Gn(e[0].dataType),u=`
      fn setOutputAtIndex(flatIndex : i32, value : ${h?`vec4<${c}>`:c}) {
        result[flatIndex] = ${h?`vec4<${c}>`:c}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${h?`vec4<${c}>`:c}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${h?`/ 4`:``}, value);
      }`,d=[q(`x`,e[0].dataType,e[0].dims.length,x===3?1:x),q(`w`,e[1].dataType,e[1].dims.length,a)],f=J(`result`,e[0].dataType,n.length,a);if(o){let t=q(`bias`,e[2].dataType,e[2].dims.length,a);d.push(t),u+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${h?`vec4<${c}>`:c} {
          return bias[coords.${l?`w`:`y`}${h?`/ 4`:``}];
        }`}return`
        ${Xa(`uniforms.result_strides`)}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${r.registerUniforms(i).declareVariables(...d,f)}
        ${u}
        ${uo(l,T,E,D,o,t,O[0],O[1],O[2],c)}
        ${h?ro(y,v,c,void 0,!l,w):oo(y,v,c,void 0,!l,w,!1,void 0,s)}`}}}}),mo,ho,go,_o,vo,yo,bo,xo,So=w(()=>{B(),an(),U(),Y(),Ka(),Ya(),mo=e=>{let t=1;for(let n=0;n<e.length;n++)t*=e[n];return t},ho=e=>typeof e==`number`?[e,e,e]:e,go=(e,t)=>t<=1?e:e+(e-1)*(t-1),_o=(e,t,n,r=1)=>{let i=go(t,r);return Math.floor((e[0]*(n-1)-n+i)/2)},vo=(e,t,n,r,i)=>{i??=_o(e,t[0],r[0]);let a=[0,0,0,n];for(let n=0;n<3;n++)e[n]+2*i>=t[n]&&(a[n]=Math.trunc((e[n]-t[n]+2*i)/r[n]+1));return a},yo=(e,t,n,r,i,a,o,s,c,l)=>{let u,d,f,p;if(e===`VALID`&&(e=0),typeof e==`number`){u={top:e,bottom:e,left:e,right:e,front:e,back:e};let m=vo([t,n,r,1],[s,c,l],1,[i,a,o],e);d=m[0],f=m[1],p=m[2]}else if(Array.isArray(e)){if(!e.every((e,t,n)=>e===n[0]))throw Error(`Unsupported padding parameter: ${e}`);u={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let m=vo([t,n,r,1],[s,c,l],1,[i,a,o],e[0]);d=m[0],f=m[1],p=m[2]}else if(e===`SAME_UPPER`){d=Math.ceil(t/i),f=Math.ceil(n/a),p=Math.ceil(r/o);let e=(d-1)*i+s-t,m=(f-1)*a+c-n,h=(p-1)*o+l-r,g=Math.floor(e/2),_=e-g,v=Math.floor(m/2),y=m-v,b=Math.floor(h/2);u={top:v,bottom:y,left:b,right:h-b,front:g,back:_}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:u,outDepth:d,outHeight:f,outWidth:p}},bo=(e,t,n,r,i,a=!1,o=`channelsLast`)=>{let s,c,l,u,d;if(o===`channelsLast`)[s,c,l,u,d]=e;else if(o===`channelsFirst`)[s,d,c,l,u]=e;else throw Error(`Unknown dataFormat ${o}`);let[f,,p,m,h]=t,[g,_,v]=ho(n),[y,b,x]=ho(r),S=go(p,y),C=go(m,b),w=go(h,x),{padInfo:T,outDepth:E,outHeight:D,outWidth:O}=yo(i,c,l,u,g,_,v,S,C,w),k=a?f*d:f,A=[0,0,0,0,0];return o===`channelsFirst`?A=[s,k,E,D,O]:o===`channelsLast`&&(A=[s,E,D,O,k]),{batchSize:s,dataFormat:o,inDepth:c,inHeight:l,inWidth:u,inChannels:d,outDepth:E,outHeight:D,outWidth:O,outChannels:k,padInfo:T,strideDepth:g,strideHeight:_,strideWidth:v,filterDepth:p,filterHeight:m,filterWidth:h,effectiveFilterDepth:S,effectiveFilterHeight:C,effectiveFilterWidth:w,dilationDepth:y,dilationHeight:b,dilationWidth:x,inShape:e,outShape:A,filterShape:t}},xo=(e,t,n,r,i,a)=>{let o=a===`channelsLast`;o?e[0].dims[3]:e[0].dims[1];let s=[64,1,1],c={x:n.map((e,t)=>t)},l=[Math.ceil(mo(c.x.map(e=>n[e]))/s[0]),1,1];V(`verbose`,()=>`[conv3d_naive_webgpu] dispatch = ${l}`);let u=[{type:12,data:H.size(n)},{type:12,data:r},{type:12,data:i},{type:12,data:t.strides},{type:12,data:t.dilations}];Ua(t,u),u.push(...G(e[0].dims,e[1].dims));let d=[`rank`,`rank`],f=e.length===3;return f&&(u.push(...G(e[2].dims)),d.push(`rank`)),u.push(...G(n)),{name:`Conv3DNaive`,shaderCache:{hint:`${t.cacheKey};${o};1;${f}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:l[0],y:l[1],z:l[2]},programUniforms:u}),getShaderSource:a=>{let s=[{name:`output_size`,type:`u32`},{name:`filter_dims`,type:`u32`,length:r.length},{name:`pads`,type:`u32`,length:i.length},{name:`strides`,type:`u32`,length:t.strides.length},{name:`dilations`,type:`u32`,length:t.dilations.length}];Wa(t,s);let c=Gn(e[0].dataType),l=q(`x`,e[0].dataType,e[0].dims.length,1),u=q(`W`,e[1].dataType,e[1].dims.length,1),d=[l,u],p=J(`result`,e[0].dataType,n.length,1),m=``;if(f){let t=q(`bias`,e[2].dataType,e[2].dims.length,1);d.push(t),m+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${c} {
          return bias[${o?K(`coords`,4,5):K(`coords`,1,5)}];
        }`}let h=qa(1,c),g=Ha(t,h,c);return`
            ${m}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> ${c} {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${l.getByIndices(`aIndices`)};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> ${c} {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${u.getByIndices(`aIndices`)};
            }
          ${a.registerUniforms(s).declareVariables(...d,p)}
          ${a.mainStart()}
          ${a.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
              let coords = ${p.offsetToIndices(`global_idx`)};
              let batch = ${K(`coords`,0,l.rank)};
              let d2 = ${o?K(`coords`,l.rank-1,l.rank):K(`coords`,1,l.rank)};
              let xFRCCorner = vec3<u32>(${o?K(`coords`,1,l.rank):K(`coords`,2,l.rank)},
              ${o?K(`coords`,2,l.rank):K(`coords`,3,l.rank)},
              ${o?K(`coords`,3,l.rank):K(`coords`,4,l.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${o?K(`uniforms.x_shape`,1,l.rank):K(`uniforms.x_shape`,2,l.rank)};
              let xShapeZ = ${o?K(`uniforms.x_shape`,2,l.rank):K(`uniforms.x_shape`,3,l.rank)};
              let xShapeW = ${o?K(`uniforms.x_shape`,3,l.rank):K(`uniforms.x_shape`,4,l.rank)};
              let xShapeU = ${o?K(`uniforms.x_shape`,4,l.rank):K(`uniforms.x_shape`,1,l.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = ${c}(0);
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${o?`let xValues = vec4<${c}>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<${c}>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<${c}>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${o?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${o?`let xValues = vec2<${c}>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<${c}>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<${c}>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${o?`let xValues = vec3<${c}>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<${c}>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<${c}>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${f?`value = value + getBiasByOutputCoords(coords)`:``};
              ${g}
              result[global_idx] = ${c}(value);
          }`}}}}),Co,wo,To=w(()=>{B(),U(),Y(),Ka(),Co=(e,t,n,r)=>{let i=e.length>2,a=i?`value += b[output_channel];`:``,o=e[0].dims,s=e[1].dims,c=t.format===`NHWC`,l=c?n[3]:n[1],u=l/t.group,d=c&&u>=4?qn(l):1,f=H.size(n)/d,p=[{type:12,data:f},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:u}];Ua(t,p),p.push(...G(o,[s[0],s[1],s[2],s[3]/d]));let m=i?[`rank`,`rank`,`rank`]:[`rank`,`rank`];return p.push(...G([n[0],n[1],n[2],n[3]/d])),{name:`GroupedConv`,shaderCache:{hint:`${t.cacheKey}_${d}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:p}),getShaderSource:r=>{let l=J(`output`,e[0].dataType,n.length,d),u=Gn(l.type.tensor),f=Ha(t,l.type.value,u),p=q(`x`,e[0].dataType,o.length),m=q(`w`,e[1].dataType,s.length,d),h=[p,m];i&&h.push(q(`b`,e[2].dataType,e[2].dims,d));let g=[{name:`output_size`,type:`u32`},{name:`dilations`,type:`u32`,length:t.dilations.length},{name:`strides`,type:`u32`,length:2},{name:`pads`,type:`u32`,length:2},{name:`output_channels_per_group`,type:`u32`}];Wa(t,g);let _=c?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${p.get(`batch`,`xHeight`,`xWidth`,`input_channel`)};
            let wVal = ${m.get(`wHeight`,`wWidth`,`wInChannel`,`output_channel`)};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${p.get(`batch`,`input_channel`,`xHeight`,`xWidth`)};
            let wVal = ${m.get(`output_channel`,`wInChannel`,`wHeight`,`wWidth`)};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${r.registerUniforms(g).declareVariables(...h,l)}

  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}

    let outputIndices = ${l.offsetToIndices(`global_idx`)};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${c?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${c?1:2}], outputIndices[${c?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${d} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${c?2:1}];

    var value: ${l.type.value} = ${l.type.value}(0);
    ${_}
    ${a}
    ${f}
    ${l.setByOffset(`global_idx`,`value`)}
  }`}}},wo=(e,t,n,r)=>{let i=e.length>2,a=qn(n[3]),o=qn(n[2]),s=H.size(n)/a/o,c=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],l=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],u=[n[0],n[1],n[2],n[3]/a],d=[{type:12,data:s},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Ua(t,d),d.push(...G(c,l,u));let f=(o-1)*t.strides[1]+l[1];return{name:`GroupedConv-Vectorize`,shaderCache:{hint:`${t.cacheKey};${a};${o};${f};${l[0]};${l[1]}`,inputDependencies:i?[`rank`,`rank`,`type`]:[`rank`,`rank`]},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}),getShaderSource:n=>{let r=J(`output`,e[0].dataType,u.length,a),s=Gn(r.type.tensor),d=Ha(t,r.type.value,s),p=q(`x`,e[0].dataType,c.length,a),m=q(`w`,e[1].dataType,l.length,a),h=[p,m];i&&h.push(q(`b`,e[2].dataType,e[2].dims,a));let g=i?`value += b[output_channel];`:``,_=[{name:`output_size`,type:`u32`},{name:`strides`,type:`i32`,length:2},{name:`pads`,type:`i32`,length:2}];return Wa(t,_),`
  ${n.registerUniforms(_).declareVariables(...h,r)}
  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${o}u;
    let col = (index1 % width1) * ${o}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${p.type.value}, ${f}>;
    var values: array<${r.type.value}, ${o}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${f}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${p.get(`batch`,`u32(x_height)`,`u32(x_width)`,`input_channel`)};
          } else {
            x_vals[i] = ${p.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${m.get(`w_height`,`w_width`,`0`,`output_channel`)};
          for (var i = 0u; i < ${o}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${o}u; i++) {
      var value = values[i];
      ${g}
      ${d}
      ${r.set(`batch`,`row`,`col + i`,`output_channel`,`value`)};
    }
  }`}}}}),Eo,Do,Oo,ko,Ao,jo,Mo,No,Po,Fo=w(()=>{U(),po(),So(),lo(),To(),Ka(),eo(),dr(),Eo=(e,t,n,r,i,a)=>{let o=e[0],s=e.slice(a?1:2,a?3:4),c=s.length,l=t[0],u=t.slice(2).map((e,t)=>e+(e-1)*(n[t]-1)),d=s.map((e,t)=>e+r[t]+r[t+c]).map((e,t)=>Math.floor((e-u[t]+i[t])/i[t]));return d.splice(0,0,o),d.splice(a?3:1,0,l),d},Do=[2,3,1,0],Oo=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw Error(`Conv requires 2 or 3 inputs`);if(e[0].dims.length>5)throw Error(`greater than 5D is not supported`);if(e[0].dims.length!==e[1].dims.length)throw Error(`filter does not have same dimension as input`);if(e[0].dims[t.format===`NHWC`?e[0].dims.length-1:1]!==e[1].dims[1]*t.group)throw Error(`FILTER_IN_CHANNEL should be equal to DATA_CHANNEL`);if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw Error(`invalid bias`);let n=e[0].dims.length-2;if(t.dilations.length!==n)throw Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw Error(`strides should be ${n}D`);if(t.pads.length!==n*2)throw Error(`pads should be ${n*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw Error(`invalid kernel shape`)},ko=(e,t)=>{let n=e.kernelShape.slice();n.length<t[1].dims.length-2&&n.push(...Array(t[1].dims.length-2-n.length).fill(0));for(let e=2;e<t[1].dims.length;++e)n[e-2]===0&&(n[e-2]=t[1].dims[e]);let r=e.pads.slice();cn.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,r,e.format===`NHWC`,e.autoPad);let i=Object.assign({},e);return Object.assign(i,{kernelShape:n,pads:r}),i},Ao=e=>{let t=Ga(e),n=e.format;return{autoPad:[`NOTSET`,`VALID`,`SAME_UPPER`,`SAME_LOWER`][e.auto_pad],format:n,dilations:e.dilations,group:e.group,kernelShape:e.kernel_shape,pads:e.pads,strides:e.strides,wIsConst:e.w_is_const(),...t,cacheKey:`${e.format};${t.activation};`}},jo=(e,t,n,r)=>{let i=n.format===`NHWC`,a=Eo(t[0].dims,t[1].dims,n.dilations,n.pads,n.strides,i);if(n.group!==1){let o=[t[0]];if(i){let r=e.kernelCustomData.wT??e.compute(cr(t[1],Do),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=r),o.push(r)}else o.push(t[1]);t.length===3&&o.push(t[2]),!e.adapterInfo.isArchitecture(`ampere`)&&i&&t[1].dims[0]===n.group&&t[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?e.compute(wo(o,n,a,r),{inputs:o}):e.compute(Co(o,n,a,r),{inputs:o});return}let o=t.length===3,s=t[0].dims[i?1:2],c=t[0].dims[i?2:3],l=t[0].dims[i?3:1],u=t[1].dims[2],d=t[1].dims[3],f=a[i?1:2],p=a[i?2:3],m=a[i?3:1],h=i&&u===s&&d===c&&n.pads[0]===0&&n.pads[1]===0;if(h||u===1&&d===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let u=a[0],d,g,_,v=[];if(i){let r=e.kernelCustomData.wT??e.compute(cr(t[1],Do),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=r),h){let e=s*c*l;d=t[0].reshape([1,u,e]),g=r.reshape([1,e,m]),_=[1,u,m]}else d=t[0].reshape([u,s*c,l]),g=r.reshape([1,l,m]),_=[u,f*p,m];v.push(d),v.push(g)}else d=t[0].reshape([u,l,s*c]),g=t[1].reshape([1,m,l]),_=[u,m,f*p],v.push(g),v.push(d);o&&v.push(t[2]);let y=_[2],b=v[0].dims[v[0].dims.length-1];y<8&&b<8?e.compute($a(v,n,a,_,i,r),{inputs:v}):e.compute(co(v,n,a,_,i,r),{inputs:v});return}let g=e.kernelCustomData.wT??e.compute(cr(t[1],Do),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=g);let _=[t[0],g];o&&_.push(t[2]);let v=i?f*p:m,y=i?m:f*p,b=u*d*l;e.compute(fo(_,n,a,v,y,b,o,!0,r),{inputs:_})},Mo=(e,t)=>{let n=t.format===`NHWC`,r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let i=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),o=[1].concat(t.dilations),s=[1].concat(t.kernelShape),c=ko({...t,pads:i,strides:a,dilations:o,kernelShape:s},r);jo(e,r,c,e=>n?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])},No=(e,t,n)=>{let r=n.format===`NHWC`?`channelsLast`:`channelsFirst`,i=ko(n,t),a=n.autoPad===`NOTSET`?n.pads:n.autoPad,o=bo(t[0].dims,t[1].dims,n.strides,n.dilations,a,!1,r);e.compute(xo(t,i,o.outShape,[o.filterDepth,o.filterHeight,o.filterWidth],[o.padInfo.front,o.padInfo.top,o.padInfo.left],r))},Po=(e,t)=>{if(Oo(e.inputs,t),e.inputs[0].dims.length===3)Mo(e,t);else if(e.inputs[0].dims.length===5)No(e,e.inputs,t);else{let n=ko(t,e.inputs);jo(e,e.inputs,n)}}}),Io,Lo=w(()=>{B(),an(),U(),Y(),Io=(e,t,n)=>{let r=e.length>2,i=t.outputShape,a=t.format===`NHWC`,o=t.group,s=e[1].dims,c=s[2]/o,l=s[3],u=a?qn(c):1,d=a&&l===1&&c>=4,f=d?Math.floor(c/4)*4:Math.floor(c/u)*u,p=c-f,m=a?qn(l):1,h=a?l===1?u:m:1,g=H.size(i)/m,_=[Math.ceil(g/64),1,1];V(`verbose`,()=>`[conv2d_backprop_webgpu] dispatch = ${_}`);let v=[`rank`,`rank`],y=[t.strides[0],t.strides[1]],b=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],x=[t.dilations[0],t.dilations[1]],S=[b[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),b[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],C=[S[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),S[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],w=[{type:12,data:g},{type:12,data:y},{type:12,data:b},{type:12,data:x},{type:12,data:S},{type:6,data:C},{type:12,data:f},{type:12,data:c},{type:12,data:l},...G(e[0].dims,e[1].dims)];return r&&(w.push(...G(e[2].dims)),v.push(`rank`)),w.push(...G(i)),{name:`ConvTranspose2D`,shaderCache:{hint:`${t.cacheKey};${u}${h}${m}${d}${p}`,inputDependencies:v},getRunData:()=>({dispatchGroup:{x:_[0],y:_[1],z:_[2]},outputs:[{dims:n?n(i):i,dataType:e[0].dataType}],programUniforms:w}),getShaderSource:t=>{let n=[{name:`output_size`,type:`u32`},{name:`strides`,type:`u32`,length:y.length},{name:`filter_dims`,type:`u32`,length:b.length},{name:`dilations`,type:`u32`,length:b.length},{name:`effective_filter_dims`,type:`u32`,length:S.length},{name:`pads`,type:`i32`,length:C.length},{name:`input_channels_per_group_int`,type:`u32`},{name:`input_channels_per_group`,type:`u32`},{name:`output_channels_per_group`,type:`u32`}],o=Gn(e[0].dataType),s=a?1:2,c=a?2:3,l=a?3:1,f=q(`W`,e[1].dataType,e[1].dims.length,h),g=q(`Dy`,e[0].dataType,e[0].dims.length,u),_=[g,f];r&&_.push(q(`bias`,e[2].dataType,[i[l]].length,m));let v=J(`result`,e[0].dataType,i.length,m),x=`
            let outputIndices = ${v.offsetToIndices(`global_idx * ${m}`)};
            let batch = ${v.indicesGet(`outputIndices`,0)};
            let d1 = ${v.indicesGet(`outputIndices`,l)};
            let r = ${v.indicesGet(`outputIndices`,s)};
            let c = ${v.indicesGet(`outputIndices`,c)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${v.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${o}(dyRCorner) + ${o}(wR)) / ${o}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${o}(uniforms.Dy_shape[${s}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${o}(dyCCorner) + ${o}(wC)) / ${o}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${o}(uniforms.Dy_shape[${c}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${d?`
                var x_offset = ${g.indicesToOffset(`${g.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${u};
                var w_offset = ${f.indicesToOffset(`${f.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${h};
                  `:``}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${d?4:u}) {
                  ${(()=>{let e=``;if(d)u===4?e+=`
        let xValue = ${g.getByOffset(`x_offset`)};
        let wValue = ${f.getByOffset(`w_offset`)};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:u===2?e+=`
          dotProd = dotProd + dot(vec4<${o}>(${g.getByOffset(`x_offset`)}, ${g.getByOffset(`x_offset + 1u`)}), vec4<${o}>(${f.getByOffset(`w_offset`)}, ${f.getByOffset(`w_offset + 1u`)}));
          x_offset += 2u;
          w_offset += 2u;`:u===1&&(e+=`
          dotProd = dotProd + dot(vec4<${o}>(${g.getByOffset(`x_offset`)}, ${g.getByOffset(`x_offset + 1u`)}, ${g.getByOffset(`x_offset + 2u`)}, ${g.getByOffset(`x_offset + 3u`)}), vec4<${o}>(${f.getByOffset(`w_offset`)}, ${f.getByOffset(`w_offset + 1u`)}, ${f.getByOffset(`w_offset + 2u`)}, ${f.getByOffset(`w_offset + 3u`)}));
          x_offset += 4u;
          w_offset += 4u;`);else if(e+=`
                  let xValue = ${a?g.getByOffset(`${g.indicesToOffset(`${g.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${u}`):g.get(`batch`,`inputChannel`,`idyR`,`idyC`)};
        `,u===1)e+=`
          let w_offset = ${f.indicesToOffset(`${f.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${f.getByOffset(`w_offset / ${h}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let t=0;t<u;t++)e+=`
            let wValue${t} = ${f.getByOffset(`${f.indicesToOffset(`${f.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${t}, wOutChannel)`)} / ${h}`)};
            dotProd = dotProd + xValue[${t}] * wValue${t};`;return e})()}
                  inputChannel = inputChannel + ${d?4:u};
                }
                ${(()=>{if(p===0)return``;if(!d)throw Error(`packInputAs4 ${d} is not true.`);let e=``;if(u===1){e+=`dotProd = dotProd`;for(let t=0;t<p;t++)e+=`
            + ${g.getByOffset(`x_offset + ${t}`)} * ${f.getByOffset(`w_offset + ${t}`)}`;e+=`;`}else if(u===2){if(p!==2)throw Error(`Invalid inputChannelsRemainder ${p}.`);e+=`
          let xValue = ${g.getByOffset(`x_offset`)};
          let wValue = ${f.getByOffset(`w_offset`)};
          dotProd = dotProd + dot(xValue, wValue);`}return e})()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${r?` + bias[d1 / ${m}]`:``};
            ${v.setByOffset(`global_idx`,`value`)};
          `;return`
    ${t.registerUniforms(n).declareVariables(..._,v)}
      ${t.mainStart()}
      ${t.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)};
    ${x}}`}}}}),Ro,zo,Bo,Vo,Ho,Uo,Wo,Go,Ko,qo=w(()=>{Lo(),Ka(),dr(),Ro=(e,t,n,r,i,a)=>(e-1)*t+n+(r-1)*i+1-a,zo=(e,t,n,r,i)=>{let a=Math.floor(e/2);t===`SAME_UPPER`?(n[r]=a,n[i]=e-a):t===`SAME_LOWER`&&(n[r]=e-a,n[i]=a)},Bo=(e,t,n,r,i,a,o,s,c,l)=>{let u=e.length-2,d=l.length===0;c.length<u&&c.push(...Array(u-c.length).fill(0));let f=e[0],p=t[s?3:1]*i;for(let i=0,f=e.length-u-+!!s;i<u;++i,++f){let s=e[f],p=d?s*o[i]:l[i],m=Ro(s,o[i],a[i],t[f],n[i],p);zo(m,r,a,i,i+u),d&&l.push(o[i]*(s-1)+c[i]+(t[f]-1)*n[i]+1-a[i]-a[i+u])}l.splice(0,0,f),l.splice(s?3:1,0,p)},Vo=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((e,t)=>e*t,1)===0){n.length=0;for(let e=2;e<t[1].dims.length;++e)n.push(t[1].dims[e])}let r=e.format===`NHWC`;n.splice(0,0,t[1].dims[0]),n.splice(r?3:1,0,t[1].dims[1]);let i=e.pads.slice(),a=e.outputShape.slice(),o=e.outputPadding.slice(),s=t[0].dims,c=e.dilations.slice();if(c.reduce((e,t)=>e+t,0)===0){let e=t[0].dims.length-2;c=Array(e).fill(1)}let l=e.strides.slice();if(l.reduce((e,t)=>e+t,0)===0){let e=t[0].dims.length-2;l=Array(e).fill(1)}Bo(s,n,c,e.autoPad,e.group,i,l,r,o,a);let u=Object.assign({},e);return Object.assign(u,{kernelShape:n,pads:i,outputPadding:o,outputShape:a,dilations:c,strides:l}),u},Ho=e=>{let t=Ga(e),n=e.format,r=[`NOTSET`,`VALID`,`SAME_UPPER`,`SAME_LOWER`][typeof e.autoPad>`u`?0:e.autoPad],i=e.dilations,a=e.group??1,o=e.kernelShape,s=e.pads,c=e.strides,l=e.wIsConst();return{autoPad:r,format:n,dilations:i,group:a,kernelShape:o,outputPadding:e.outputPadding,outputShape:e.outputShape,pads:s,strides:c,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},Uo=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw Error(`Conv requires 2 or 3 inputs`);if(e[0].dims.length!==4&&e[0].dims.length!==3)throw Error(`currently only support 2-dimensional conv`);if(e[0].dims.length!==e[1].dims.length)throw Error(`filter does not have same dimension as input`);if(e[0].dims[t.format===`NHWC`?e[0].dims.length-1:1]!==e[1].dims[0])throw Error(`FILTER_IN_CHANNEL should be equal to DATA_CHANNEL`);let n=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==n))throw Error(`invalid bias`);let r=e[0].dims.length-2;if(t.dilations.reduce((e,t)=>e+t,0)>0&&t.dilations.length!==r)throw Error(`dilations should be ${r}D`);if(t.strides.reduce((e,t)=>e+t,0)>0&&t.strides.length!==r)throw Error(`strides should be ${r}D`);if(t.pads.reduce((e,t)=>e+t,0)>0&&t.pads.length!==r*2)throw Error(`pads should be ${r*2}D`);if(t.outputPadding.length!==r&&t.outputPadding.length!==0)throw Error(`output_padding should be ${r}D`);if(t.kernelShape.reduce((e,t)=>e+t,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw Error(`invalid kernel shape`);if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw Error(`invalid output shape`)},Wo=(e,t,n,r)=>{let i=e.kernelCustomData.wT??e.compute(cr(t[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i);let a=[t[0],i];t.length===3&&a.push(t[2]),e.compute(Io(a,n,r),{inputs:a})},Go=(e,t)=>{let n=t.format===`NHWC`,r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let i=t.kernelShape;(i.length===0||i[0]===0)&&(i=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let o=t.strides;(o.length===0||o[0]===0)&&(o=[1]);let s=t.pads;s.length===0&&(s=[0,0]),s=[0,s[0],0,s[1]],o=[1].concat(o),a=[1].concat(a),i=[1].concat(i);let c=t.outputPadding;c=[0].concat(c);let l=Vo({...t,pads:s,strides:o,dilations:a,kernelShape:i,outputPadding:c},r);Wo(e,r,l,e=>n?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])},Ko=(e,t)=>{if(Uo(e.inputs,t),e.inputs[0].dims.length===3)Go(e,t);else{let n=Vo(t,e.inputs);Wo(e,e.inputs,n)}}}),Jo,Yo,Xo,Zo=w(()=>{B(),U(),Hn(),Y(),Jo=(e,t,n,r)=>{let i=H.size(t),a=t.length,o=q(`input`,e,a),s=J(`output`,e,a),c=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),l=H.normalizeAxis(c,a);return{name:`CumSum`,shaderCache:{hint:r.cacheKey,inputDependencies:[`rank`]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},{type:12,data:l},...G(t,t)]}),getShaderSource:e=>{let t=` i32(${o.indicesGet(`inputIndices`,`uniforms.axis`)}) `,n=K(`uniforms.input_shape`,`uniforms.axis`,a),i=r.reverse?t+(r.exclusive?` + 1`:``):`0`,c=r.reverse?n:t+(r.exclusive?``:` + 1`);return`
                ${e.registerUniform(`outputSize`,`u32`).registerUniform(`axis`,`u32`).declareVariables(o,s)}
                ${e.mainStart()}
                  ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}
                  var inputIndices = ${s.offsetToIndices(`global_idx`)};
                  var sum = ${s.type.value}(0);
                  let first : i32 = ${i};
                  let last : i32 = ${c};
                  for (var i : i32 = first; i < last; i++) {
                    ${o.indicesSet(`inputIndices`,`uniforms.axis`,`u32(i)`)};
                    sum = sum + ${o.getByIndices(`inputIndices`)};
                  }
                  ${s.setByOffset(`global_idx`,`sum`)};
                }`}}},Yo=(e,t)=>{let n=e.inputs[0].dims,r=e.inputs[0].dataType,i=e.inputs[1];e.compute(Jo(r,n,i,t),{inputs:[0]})},Xo=e=>{let t=e.exclusive===1,n=e.reverse===1;return W({exclusive:t,reverse:n})}}),Qo,$o,es,ts,ns,rs=w(()=>{B(),U(),Hn(),Y(),Qo=e=>{if(!e||e.length!==1)throw Error(`DepthToSpace requires 1 input.`);if(e[0].dims.length!==4)throw Error(`DepthToSpace requires 4D input.`)},$o=(e,t,n,r)=>{let i=[];i.push(`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let r=0;r<t;++r)i.push(n.indicesSet(`a`,e[r],`i[${r}]`));return i.push(`return a;}`),i.join(`
`)},es=(e,t)=>{let n,r,i,a,o,s,c=t.format===`NHWC`,l=t.blocksize,u=t.mode===`DCR`;c?([n,r,i,a]=e.dims,o=u?[n,r,i,l,l,a/l**2]:[n,r,i,a/l**2,l,l],s=u?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,r,i,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],o=u?[n,l,l,a/l**2,r,i]:[n,a/l**2,l,l,r,i],s=u?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let d=e.reshape(o),f=d.dims.length,p=e.dataType,m=q(`a`,p,f),h=J(`output`,p,f);return{name:`DepthToSpace`,shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:[`rank`]},getRunData:e=>{let t=c?[n,r*l,i*l,a/l**2]:[n,a/l**2,r*l,i*l],o=H.size(t),u=d.dims,f=H.sortBasedOnPerm(u,s);return{outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},...G(u,f)]}},getShaderSource:e=>`
  ${e.registerUniform(`output_size`,`u32`).declareVariables(m,h)}

  ${$o(s,f,m,h)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}

    let indices = ${h.offsetToIndices(`global_idx`)};
    let aIndices = perm(indices);

    ${h.setByOffset(`global_idx`,m.getByIndices(`aIndices`))}
  }`}},ts=(e,t)=>{Qo(e.inputs),e.compute(es(e.inputs[0],t))},ns=e=>W({blocksize:e.blocksize,mode:e.mode,format:e.format})}),is,as,os,ss,cs,ls,us,ds,fs,ps,ms,hs,gs,_s,vs,ys,bs,xs=w(()=>{B(),U(),Hn(),Y(),is=256,as=512,os=2*Math.PI,ss=e=>{let t=[],n=e;for(let e of[4,2,3,5])for(;n%e===0;)t.push(e),n/=e;return n===1?t:void 0},cs=e=>{let t=e.toPrecision(9);return/[.eE]/.test(t)?t:`${t}.0`},ls=(e,t,n,r,i)=>{let a=n/e,o=as-r,s=e=>`smem[${o}u + base + ${e*t}u]`,c=`  for (var t = local_idx; t < ${a}u; t += ${is}u) {
`;c+=`    let twiddleIndex = t % ${t}u;
    let angleUnit = f32(twiddleIndex);
`,c+=`    var leg: array<vec2<f32>, 5>;
`;for(let n=0;n<e;n++){let o=`${r}u + t + ${n*a}u`;if(n===0)c+=`    leg[0] = smem[${o}];
`;else{let r=i*os*n/(e*t);c+=`    { let a = ${cs(r)} * angleUnit; leg[${n}] = cmul(smem[${o}], vec2<f32>(cos(a), sin(a))); }
`}}if(c+=`    let base = (t / ${t}u) * ${t*e}u + twiddleIndex;
`,e===2)c+=`    ${s(0)} = leg[0] + leg[1];
    ${s(1)} = leg[0] - leg[1];
`;else if(e===4){let e=i<0?`vec2<f32>(oddDiff.y, -oddDiff.x)`:`vec2<f32>(-oddDiff.y, oddDiff.x)`;c+=`    let evenSum = leg[0] + leg[2]; let evenDiff = leg[0] - leg[2];
`,c+=`    let oddSum = leg[1] + leg[3]; let oddDiff = leg[1] - leg[3];
`,c+=`    let oddRot = ${e};
`,c+=`    ${s(0)} = evenSum + oddSum;
    ${s(1)} = evenDiff + oddRot;
`,c+=`    ${s(2)} = evenSum - oddSum;
    ${s(3)} = evenDiff - oddRot;
`}else for(let t=0;t<e;t++){let n=[`leg[0]`];for(let r=1;r<e;r++){let a=i*os*(r*t)/e,o=cs(Math.cos(a)),s=cs(Math.sin(a));n.push(`vec2<f32>(leg[${r}].x*${o} - leg[${r}].y*${s}, leg[${r}].x*${s} + leg[${r}].y*${o})`)}c+=`    ${s(t)} = ${n.join(` + `)};
`}return`${c}  }
  workgroupBarrier();
`},us=(e,t,n)=>{let r=``,i=1,a=0;for(let o of e)r+=ls(o,i,t,a,n),i*=o,a=as-a;return{code:r,resultOffset:a}},ds=(e,t,n,r,i)=>{let a=e.dims,o=a.length,s=a[o-1],c=a[t],l=n&&r?(c-1)*2:c;i!==void 0&&(l=i);let u=n&&r?1:2,d=r&&!n?Math.floor(l/2)+1:l,f=a.slice();f[t]=d,f[o-1]=u;let p=1;for(let e=t+1;e<o-1;e++)p*=a[e];let m=H.size(a)/s/c;return{dataType:e.dataType,outputDims:f,length:l,signalLength:c,inner:p,batch:m,inputComponents:s,outputComponents:u,outputLength:d,inverse:n,onesided:r}},fs=(e,t)=>[t,e.length,e.inputComponents,e.outputComponents,e.inverse,e.onesided].join(`;`),ps=e=>[{type:12,data:e.batch},{type:12,data:e.signalLength},{type:12,data:e.inner},{type:12,data:e.outputLength}],ms=(e,t,n)=>e.registerUniform(`batch`,`u32`).registerUniform(`signalLength`,`u32`).registerUniform(`inner`,`u32`).registerUniform(`outputLength`,`u32`).declareVariables(t,n),hs=e=>{let{dataType:t,length:n,inputComponents:r,outputComponents:i,inverse:a,onesided:o}=e,s=Kn(t),c=a?1:-1,l=a?1/n:1,u=ss(n);return{name:`DFT`,shaderCache:{hint:fs(e,`fft`),inputDependencies:[`type`]},getShaderSource:e=>{let d=q(`x`,t,[1]),f=J(`y`,t,[1]),p=e=>{let t=`inBase + (${e}) * uniforms.inner * ${r}u`;return`vec2<f32>(${`f32(${d.getByOffset(t)})`}, ${r===2?`f32(${d.getByOffset(`${t} + 1u`)})`:`0.0`})`},m;if(a&&o){let e=Math.floor(n/2)+1,t=n%2==0?`select(provided, provided - 1u, provided == ${e}u)`:`provided`;m=`
    let provided = min(uniforms.signalLength, ${e}u);
    for (var i = local_idx; i < ${n}u; i += ${is}u) {
      if (i < provided) { smem[i] = ${p(`i`)}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();
    for (var k = local_idx + 1u; k < ${t}; k += ${is}u) {
      let h = smem[k];
      smem[${n}u - k] = vec2<f32>(h.x, -h.y);
    }
    workgroupBarrier();`}else m=`
    let loadCount = min(uniforms.signalLength, ${n}u);
    for (var i = local_idx; i < ${n}u; i += ${is}u) {
      if (i < loadCount) { smem[i] = ${p(`i`)}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();`;let{code:h,resultOffset:g}=us(u,n,c),_=l===1?`smem[${g}u + i]`:`smem[${g}u + i] * ${cs(l)}`,v=i===2?f.setByOffset(`off + 1u`,`${s}(v.y)`):``;return`
  ${ms(e,d,f)}
  var<workgroup> smem: array<vec2<f32>, ${2*as}>;
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${e.mainStart(is)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${r}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${i}u;
    ${m}
${h}    for (var i = local_idx; i < uniforms.outputLength; i += ${is}u) {
      let v = ${_};
      let off = outBase + i * uniforms.inner * ${i}u;
      ${f.setByOffset(`off`,`${s}(v.x)`)}
      ${v}
    }
  }`},getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:ps(e),dispatchGroup:{x:e.batch}})}},gs=e=>{let{dataType:t,length:n,inputComponents:r,outputComponents:i,inverse:a,onesided:o}=e,s=Kn(t),c=a?1:-1,l=a?1/n:1;return{name:`DFT`,shaderCache:{hint:fs(e,`direct`),inputDependencies:[`type`]},getShaderSource:e=>{let u=q(`x`,t,[1]),d=J(`y`,t,[1]),f=e=>{let t=`inBase + (${e}) * uniforms.inner * ${r}u`;return`vec2<f32>(${`f32(${u.getByOffset(t)})`}, ${r===2?`f32(${u.getByOffset(`${t} + 1u`)})`:`0.0`})`},p=a&&o?`fn spectrum(inBase: u32, k: u32) -> vec2<f32> {
    let provided = min(uniforms.signalLength, ${Math.floor(n/2)+1}u);
    if (k < provided) { return ${f(`k`)}; }
    let m = ${n}u - k;
    if (m < provided) {
      let h = ${f(`m`)};
      return vec2<f32>(h.x, -h.y);
    }
    return vec2<f32>(0.0, 0.0);
  }`:`fn spectrum(inBase: u32, n: u32) -> vec2<f32> {
    if (n < uniforms.signalLength) { return ${f(`n`)}; }
    return vec2<f32>(0.0, 0.0);
  }`,m=`
      let angle = ${cs(c*os)} * f32(knMod) / ${cs(n)};
      acc += cmul(spectrum(inBase, n), vec2<f32>(cos(angle), sin(angle)));
      knMod += k;
      if (knMod >= ${n}u) { knMod -= ${n}u; }`,h=i===2?d.setByOffset(`off + 1u`,`${s}(v.y)`):``,g=l===1?`acc`:`acc * ${cs(l)}`;return`
  ${ms(e,u,d)}
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${p}
  ${e.mainStart(is)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${r}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${i}u;
    for (var k = local_idx; k < uniforms.outputLength; k += ${is}u) {
      var acc = vec2<f32>(0.0, 0.0);
      var knMod = 0u;
      for (var n = 0u; n < ${n}u; n++) {${m}
      }
      let v = ${g};
      let off = outBase + k * uniforms.inner * ${i}u;
      ${d.setByOffset(`off`,`${s}(v.x)`)}
      ${h}
    }
  }`},getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:ps(e),dispatchGroup:{x:e.batch}})}},_s=e=>{if(!e||e.dataType===0)return;if(H.size(e.dims)!==1)throw Error(`DFT optional scalar inputs must have exactly 1 element.`);if(e.dataType===6)return e.getInt32Array()[0];let t=Number(e.getBigInt64Array()[0]);if(!Number.isSafeInteger(t))throw Error(`DFT optional scalar inputs are out of JavaScript safe integer range.`);return t},vs=e=>{if(!e||e.length<1)throw Error(`DFT requires at least 1 input.`);let t=e[0].dims;if(t.length<2)throw Error(`DFT input must have at least 2 dimensions.`);let n=t[t.length-1];if(n!==1&&n!==2)throw Error(`DFT input's innermost dimension must be 1 (real) or 2 (complex).`)},ys=(e,t)=>{vs(e.inputs);let n=e.inputs[0],r=n.dims.length,i=t.inverse!==0,a=t.onesided!==0,o=_s(e.inputs[1]);if(o!==void 0&&o<=0)throw Error(`dft_length must be greater than zero.`);let s=H.normalizeAxis(_s(e.inputs[2])??t.axis,r);if(s===r-1)throw Error(`DFT axis must refer to a signal dimension, not the innermost (real/imaginary) dimension.`);if(i&&a&&n.dims[r-1]!==2)throw Error(`Inverse one-sided DFT (IRFFT) requires complex-valued input (innermost dimension 2).`);let c=ds(n,s,i,a,o);if(c.length<=0)throw Error(`Invalid DFT length: ${c.length}`);let l=c.length<=as&&ss(c.length)!==void 0?hs(c):gs(c);e.compute(l,{inputs:[0]})},bs=e=>W({axis:e.axis??1,inverse:e.inverse??0,onesided:e.onesided??0})}),Ss,Cs,ws,Ts,Es,Ds,Os,ks,As,js,Ms,Ns=w(()=>{B(),U(),Hn(),Y(),Ss=`[a-zA-Z]|\\.\\.\\.`,Cs=`(`+Ss+`)+`,ws=`^`+Cs+`$`,Ts=`(`+Cs+`,)*`+Cs,Es=`^`+Ts+`$`,Ds=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let n=this.symbolToIndices.get(e);n===void 0?n=[t]:n.push(t),this.symbolToIndices.set(e,n)}},Os=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=[],this.outputDims=[];let[n,r]=t.includes(`->`)?t.split(`->`,2):[t,``];if(!n.match(RegExp(Es)))throw Error(`Invalid LHS term`);if(n.split(`,`).forEach((t,n)=>{let r=e[n].dims.slice();if(!t.match(RegExp(ws)))throw Error(`Invalid LHS term`);let i=this.processTerm(t,!0,r,n);this.lhs.push(i)}),r===``)r+=[...this.symbolToInfo.entries()].filter(([e,t])=>t.count===1||e===`...`).map(([e])=>e).join(``);else if(!r.match(RegExp(Cs)))throw Error(`Invalid RHS`);r.match(RegExp(Ss,`g`))?.forEach(e=>{if(e===`...`)this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let t=this.symbolToInfo.get(e);if(t===void 0)throw Error(`Invalid RHS symbol`);this.outputDims.push(t.dimValue)}}),this.rhs=this.processTerm(r,!1,this.outputDims)}addSymbol(e,t,n){let r=this.symbolToInfo.get(e);if(r!==void 0){if(r.dimValue!==t&&r.count!==1)throw Error(`Dimension mismatch`);r.count++,r.inputIndices.push(n)}else r={count:1,dimValue:t,inputIndices:[n]};this.symbolToInfo.set(e,r)}processTerm(e,t,n,r=-1){let i=n.length,a=!1,o=[],s=0;if(!e.match(RegExp(ws))&&!t&&e!==``)throw Error(`Invalid LHS term`);let c=e.match(RegExp(Ss,`g`)),l=new Ds(r);return c?.forEach((e,u)=>{if(e===`...`){if(a)throw Error(`Only one ellipsis is allowed per input term`);a=!0;let e=i-c.length+1;if(e<0)throw Error(`Ellipsis out of bounds`);if(o=n.slice(s,s+e),this.hasEllipsis){if(this.ellipsisDims.length!==o.length||this.ellipsisDims.toString()!==o.toString())throw Error(`Ellipsis dimensions mismatch`)}else if(t)this.hasEllipsis=!0,this.ellipsisDims=o;else throw Error(`Ellipsis must be specified in the LHS`);for(let e=0;e<o.length;e++){let t=String.fromCharCode(48+e);l.addSymbol(t,u+e),this.addSymbol(t,n[s++],r)}}else l.addSymbol(e,u+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(e,n[s++],r)}),l}},ks=e=>e+`_max`,As=(e,t,n,r)=>{let i=e.map(e=>e.length).map((e,n)=>q(`input${n}`,t,e)),a=H.size(r),o=J(`output`,t,r.length),s=[...n.symbolToInfo.keys()].filter(e=>!n.rhs.symbolToIndices.has(e));return{name:`Einsum`,shaderCache:{hint:n.equation,inputDependencies:e.map(()=>`rank`)},getRunData:()=>{let i=s.filter(e=>n.symbolToInfo.has(e)).map(e=>({type:12,data:n.symbolToInfo.get(e)?.dimValue||0}));i.push({type:12,data:a});let o=e.map((e,t)=>[...G(e)]).reduce((e,t)=>e.concat(t),i);return o.push(...G(r)),{outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:o}},getShaderSource:e=>{let t=[],r=[],a=[],c=[],l=[],u=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((e,s)=>{if(n.rhs.symbolToIndices.has(s)){let r=n.rhs.symbolToIndices.get(s)?.[0];r!==void 0&&n.lhs.forEach((n,a)=>{if(e.inputIndices.includes(a)){let e=n.symbolToIndices.get(s);if(e===void 0)throw Error(`Invalid symbol error`);e.forEach(e=>{t.push(`${i[a].indicesSet(`input${a}Indices`,e,o.indicesGet(`outputIndices`,r))}`)})}})}else n.lhs.forEach((t,n)=>{if(e.inputIndices.includes(n)){let e=t.symbolToIndices.get(s);if(e===void 0)throw Error(`Invalid symbol error`);e.forEach(e=>{r.push(`${i[n].indicesSet(`input${n}Indices`,e,`${s}`)}`)}),l.push(`prod *= ${i[n].getByIndices(`input${n}Indices`)};`)}}),a.push(`for(var ${s}: u32 = 0; ${s} < uniforms.${ks(s)}; ${s}++) {`),c.push(`}`)});let d=u?[...t,`let sum = ${i.map((e,t)=>e.getByIndices(`input${t}Indices`)).join(` * `)};`]:[...t,`var sum = 0.0;`,...a,...r,`var prod = 1.0;`,...l,`sum += prod;`,...c];return`
            ${e.registerUniforms(s.map(e=>({name:`${ks(e)}`,type:`u32`}))).registerUniform(`outputSize`,`u32`).declareVariables(...i,o)}

            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}
            var outputIndices = ${o.offsetToIndices(`global_idx`)};
            ${i.map((e,t)=>`var input${t}Indices: ${i[t].type.indices};`).join(`
`)}
            ${d.join(`
`)};
            ${o.setByOffset(`global_idx`,`sum`)};
          }`}}},js=(e,t)=>{let n=new Os(e.inputs,t.equation),r=n.outputDims,i=e.inputs.map((e,t)=>e.dims);e.compute(As(i,e.inputs[0].dataType,n,r))},Ms=e=>{let t=e.equation.replace(/\s+/g,``);return W({equation:t})}}),Ps,Fs,Is,Ls,Rs,zs=w(()=>{B(),U(),Y(),Ps=e=>{if(!e||e.length!==2)throw Error(`Expand requires 2 input.`);let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=n.length<t.length?0:n.length-t.length,i=t.length<n.length?0:t.length-n.length;for(;r<n.length&&i<t.length;++r,++i)if(n[r]!==t[i]&&n[r]!==1&&t[i]!==1)throw Error(`Expand requires shape to be broadcastable to input`)},Fs=(e,t)=>{let n=e.length-t.length,r=[];for(let t=0;t<n;++t)r.push(e[t]);for(let i=0;i<t.length;++i)r.push(t[i]===1?e[i+n]:t[i]);return r},Is=(e,t)=>e.length>t.length?Fs(e,t):Fs(t,e),Ls=e=>{let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=Is(t,n),i=e[0].dataType,a=i===9||H.size(t)===1,o=i===9||t.length>0&&t[t.length-1]%4==0?4:1,s=a||r.length>0&&r[r.length-1]%4==0?4:1,c=Math.ceil(H.size(r)/s),l=e=>{let n=q(`input`,i,t.length,o),a=J(`output`,i,r.length,s),c;if(i===9){let e=(e,t,r=``)=>`
          let outputIndices${t} = ${a.offsetToIndices(`outputOffset + ${t}u`)};
          let offset${t} = ${n.broadcastedIndicesToOffset(`outputIndices${t}`,a)};
          let index${t} = offset${t} / 4u;
          let component${t} = offset${t} % 4u;
          ${e}[${t}] = ${r}(${n.getByOffset(`index${t}`)}[component${t}]);
        `;c=`
        let outputOffset = global_idx * ${s};
        var data = vec4<u32>(0);
        ${e(`data`,0,`u32`)}
        ${e(`data`,1,`u32`)}
        ${e(`data`,2,`u32`)}
        ${e(`data`,3,`u32`)}
        ${a.setByOffset(`global_idx`,`data`)}
      }`}else c=`
        let outputIndices = ${a.offsetToIndices(`global_idx * ${s}`)};
        let inputOffset = ${n.broadcastedIndicesToOffset(`outputIndices`,a)};
        let data = ${a.type.value}(${n.getByOffset(`inputOffset / ${o}`)});
        ${a.setByOffset(`global_idx`,`data`)}
      }`;return`
    ${e.registerUniform(`vec_size`,`u32`).declareVariables(n,a)}
    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.vec_size`)}
    ${c}`},u=[{type:12,data:c},...G(t,r)];return{name:`Expand`,shaderCache:{hint:`${r.length};${o}${s}`,inputDependencies:[`rank`]},getShaderSource:l,getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:u})}},Rs=e=>{Ps(e.inputs),e.compute(Ls(e.inputs),{inputs:[0]})}}),Bs,Vs,Hs=w(()=>{B(),U(),Y(),va(),Bs=e=>{let t=e[0].dataType,n=H.size(e[0].dims),r=H.size(e[1].dims),i=r%4==0;return{name:`FastGeluWithBias`,shaderCache:{hint:`${i}`,inputDependencies:[`type`,`type`]},getShaderSource:e=>{let n=q(`x`,t,[1],4),r=q(`bias`,t,[1],4),a=J(`y`,t,[1],4),o=[{name:`output_vec_size`,type:`u32`},{name:`bias_size`,type:`u32`}],s=e=>`
      let bias${e}_offset: u32 = (global_idx * 4 + ${e}) % uniforms.bias_size;
      let bias${e} = ${r.getByOffset(`bias${e}_offset / 4`)}[bias${e}_offset % 4];`,c=i?`
      let bias = ${r.getByOffset(`global_idx % (uniforms.bias_size / 4)`)};`:`${s(0)}${s(1)}${s(2)}${s(3)}
      let bias = ${n.type.value}(bias0, bias1, bias2, bias3);`;return`${e.registerUniforms(o).declareVariables(n,r,a)}

    ${ua(Kn(t))}

    ${e.mainStart(Un)}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_vec_size`)}

      let x = ${n.getByOffset(`global_idx`)};
      ${c}
      let x_in = x + bias;
      ${a.setByOffset(`global_idx`,da(`x_in`))}
    }`},getRunData:e=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:r}],dispatchGroup:{x:Math.ceil(n/Un/4)}})}},Vs=e=>{e.inputs.length<2||H.size(e.inputs[1].dims)===0?fa(e):e.compute(Bs(e.inputs))}}),Us,Ws,Gs,Ks,qs=w(()=>{B(),U(),Hn(),Y(),Us=e=>{if(!e||e.length!==2)throw Error(`Gather requires 2 inputs.`)},Ws=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n.length,a=H.normalizeAxis(t.axis,i),o=n.slice(0);o.splice(a,1,...r);let s=n[a],c=e[0].dataType===9?4:1,l=Math.ceil(H.size(o)/c),u=[{type:12,data:l},{type:6,data:s},{type:12,data:a},...G(e[0].dims,e[1].dims,o)];return{name:`Gather`,shaderCache:{hint:t.cacheKey,inputDependencies:[`rank`,`rank`]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u}),getShaderSource:t=>{let n=q(`data`,e[0].dataType,e[0].dims.length,c),s=q(`inputIndices`,e[1].dataType,e[1].dims.length),l=J(`output`,e[0].dataType,o.length,c),u=e=>{let t=r.length,c=`var indicesIndices${e}  = ${s.type.indices}(0);`;for(let n=0;n<t;n++)c+=`${t>1?`indicesIndices${e}[${n}]`:`indicesIndices${e}`} = ${o.length>1?`outputIndices${e}[uniforms.axis + ${n}]`:`outputIndices${e}`};`;c+=`
          var idx${e} = ${s.getByIndices(`indicesIndices${e}`)};
          if (idx${e} < 0) {
            idx${e} = idx${e} + uniforms.axisDimLimit;
          }
          var dataIndices${e} : ${n.type.indices};
        `;for(let n=0,r=0;n<i;n++)n===a?(c+=`${i>1?`dataIndices${e}[${n}]`:`dataIndices${e}`} = u32(idx${e});`,r+=t):(c+=`${i>1?`dataIndices${e}[${n}]`:`dataIndices${e}`} = ${o.length>1?`outputIndices${e}[${r}]`:`outputIndices${e}`};`,r++);return c},d;if(e[0].dataType===9){let e=(e,t,r=``)=>`
          let outputIndices${t} = ${l.offsetToIndices(`outputOffset + ${t}u`)};
          ${u(t)};
          let offset${t} = ${n.indicesToOffset(`dataIndices${t}`)};
          let index${t} = offset${t} / 4u;
          let component${t} = offset${t} % 4u;
          ${e}[${t}] = ${r}(${n.getByOffset(`index${t}`)}[component${t}]);
        `;d=`
        let outputOffset = global_idx * ${c};
        var value = vec4<u32>(0);
        ${e(`value`,0,`u32`)}
        ${e(`value`,1,`u32`)}
        ${e(`value`,2,`u32`)}
        ${e(`value`,3,`u32`)}
        ${l.setByOffset(`global_idx`,`value`)}
      `}else d=`
      let outputIndices = ${l.offsetToIndices(`global_idx`)};
      ${u(``)};
      let value = ${n.getByIndices(`dataIndices`)};
      ${l.setByOffset(`global_idx`,`value`)};
      `;return`
      ${t.registerUniform(`outputSize`,`u32`).registerUniform(`axisDimLimit`,`i32`).registerUniform(`axis`,`u32`).declareVariables(n,s,l)}
      ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}
        ${d}
      }`}}},Gs=e=>W({axis:e.axis}),Ks=(e,t)=>{let n=e.inputs;Us(n),e.compute(Ws(e.inputs,t))}}),Js,Ys,Xs,Zs=w(()=>{B(),U(),Y(),Js=(e,t,n,r,i,a,o,s,c)=>{let l=[{type:12,data:a},{type:12,data:r},{type:12,data:i},{type:12,data:n},{type:12,data:o},{type:12,data:s},{type:12,data:c}],u=[a];return l.push(...G(t.dims,u)),e.compute({name:`computeSliceOffsets`,shaderCache:{hint:`${i.length}_${n.length}`,inputDependencies:[`rank`]},getRunData:()=>({outputs:[{dims:u,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l}),getShaderSource:e=>{let r=[q(`indices_data`,t.dataType,t.dims.length),J(`input_slice_offsets_data`,12,1,1)],a=[{name:`output_size`,type:`u32`},{name:`batch_dims`,type:`u32`},{name:`input_dims`,type:`u32`,length:i.length},{name:`sizes_from_slice_dims_data`,type:`u32`,length:n.length},{name:`num_slices_per_batch`,type:`u32`},{name:`input_batch_stride`,type:`u32`},{name:`num_slice_dims`,type:`u32`}];return`
  ${e.registerUniforms(a).declareVariables(...r)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${i.length===1?`index += i32(uniforms.input_dims);`:`index += i32(uniforms.input_dims[input_dim_idx]);`}
      }
      ${n.length===1?`relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);`:`relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);`}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`}},{inputs:[t],outputs:[-1]})[0]},Ys=(e,t)=>{let n=e.inputs,r=n[0].dims,i=n[0].dataType,a=n[1].dims,o=a[a.length-1],s=H.sizeToDimension(a,a.length-1),c=H.sizeFromDimension(r,t.batchDims+o),l=H.sizeToDimension(r,t.batchDims),u=H.sizeFromDimension(r,t.batchDims),d=s/l,f=Array(o),p=c;for(let e=0;e<o;++e)f[o-1-e]=p,p*=r[t.batchDims+o-1-e];let m=Js(e,n[1],f,t.batchDims,r,s,d,u,o),h=t.batchDims+o;if(h>r.length)throw Error(`last dimension of indices must not be larger than rank of input tensor`);let g=a.slice(0,-1).concat(r.slice(h)),_=H.size(g),v=[{type:12,data:_},{type:12,data:c},...G(n[0].dims,m.dims,g)];e.compute({name:`GatherND`,shaderCache:{hint:t.cacheKey,inputDependencies:[`rank`,`rank`]},getRunData:()=>({outputs:[{dims:g,dataType:i}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:v}),getShaderSource:e=>{let t=q(`data`,n[0].dataType,n[0].dims.length),r=q(`slice_offsets`,12,m.dims.length),i=J(`output`,n[0].dataType,g.length);return`
          ${e.registerUniform(`output_size`,`u32`).registerUniform(`slice_size`,`u32`).declareVariables(t,r,i)}
            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`}},{inputs:[n[0],m]})},Xs=e=>({batchDims:e.batch_dims,cacheKey:``})}),Qs,$s,ec,tc,nc=w(()=>{B(),U(),Hn(),Y(),Qs=(e,t)=>{if(e.length<3||e.length>4)throw Error(`GatherBlockQuantized requires 3 or 4 inputs.`);let n=H.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,i=e[0],a=e[2],o=e.length===4?e[3]:void 0;if(a.dims.length!==i.dims.length||!i.dims.map((e,t)=>t===n?Math.ceil(e/r)===a.dims[t]:e===a.dims[t]).reduce((e,t)=>e&&t,!0))throw Error(`Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.`);if(o){if(o.dataType!==i.dataType)throw Error(`Zero point must have the same data type as the input tensor.`);if(o.dims.length!==a.dims.length||!o.dims.map((e,t)=>e===a.dims[t]).reduce((e,t)=>e&&t,!0))throw Error(`Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.`)}},$s=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n.length,a=H.normalizeAxis(t.gatherAxis,i),o=H.normalizeAxis(t.quantizeAxis,i),s=n.slice(0);s.splice(a,1,...r);let c=H.size(s),l=e[2].dataType,u=e[0].dataType===22,d=[{type:12,data:c},{type:12,data:o},{type:12,data:a},{type:12,data:t.blockSize},...G(...e.map((e,t)=>e.dims),s)];return{name:`GatherBlockQuantized`,shaderCache:{hint:`${t.cacheKey};${e.filter((e,t)=>t!==1).map(e=>e.dims.join(`_`)).join(`;`)}`,inputDependencies:Array.from({length:e.length},(e,t)=>`rank`)},getRunData:()=>({outputs:[{dims:s,dataType:l}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:d}),getShaderSource:t=>{let i=q(`data`,e[0].dataType,e[0].dims.length),o=q(`inputIndices`,e[1].dataType,e[1].dims.length),c=q(`scales`,e[2].dataType,e[2].dims.length),d=e.length>3?q(`zeroPoint`,e[3].dataType,e[3].dims.length):void 0,f=J(`output`,l,s.length),p=[i,o,c];return d&&p.push(d),`
        ${t.registerUniforms([{name:`output_size`,type:`u32`},{name:`quantize_axis`,type:`u32`},{name:`gather_axis`,type:`u32`},{name:`block_size`,type:`u32`}]).declareVariables(...p,f)}
        ${t.mainStart()}
        let output_indices = ${f.offsetToIndices(`global_idx`)};
        var indices_indices = ${o.type.indices}(0);
        ${r.length>1?`
          for (var i: u32 = 0; i < ${r.length}; i++) {
            let index = ${f.indicesGet(`output_indices`,`uniforms.gather_axis + i`)};
            ${o.indicesSet(`indices_indices`,`i`,`index`)};
          }`:`indices_indices = ${f.indicesGet(`output_indices`,`uniforms.gather_axis`)};`};
        var data_indices = ${i.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${f.indicesGet(`output_indices`,`i`)};
          ${i.indicesSet(`data_indices`,`i`,`index`)};
        }
        var index_from_indices = ${o.getByIndices(`indices_indices`)};
        if (index_from_indices < 0) {
          index_from_indices += ${n[a]};
        }
        ${i.indicesSet(`data_indices`,`uniforms.gather_axis`,`u32(index_from_indices)`)};
        for (var i = uniforms.gather_axis + 1; i < ${s.length}; i++) {
          let index = ${f.indicesGet(`output_indices`,`i + ${r.length} - 1`)};
          ${i.indicesSet(`data_indices`,`i`,`index`)};
        }
        let data_offset = ${i.indicesToOffset(`data_indices`)};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${i.getByOffset(`data_offset / 8`)};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${u?`unpack4xI8`:`unpack4xU8`}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${c.indicesGet(`data_indices`,`uniforms.quantize_axis`)} / uniforms.block_size;
        ${c.indicesSet(`scale_indices`,`uniforms.quantize_axis`,`quantize_axis_index`)};
        var scale = ${c.getByIndices(`scale_indices`)};
        ${d?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${d.indicesToOffset(`zero_point_indices`)};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${d.getByOffset(`zero_point_offset / 8`)};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${u?`unpack4xI8`:`unpack4xU8`}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:`var zero_point = 0`};
        let dequantized_data = ${Kn(l)}(quantized_data - zero_point) * scale;
        ${f.setByOffset(`global_idx`,`dequantized_data`)};
    }`}}},ec=(e,t)=>{let n=e.inputs;Qs(n,t),e.compute($s(e.inputs,t))},tc=e=>W({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),rc,ic,ac,oc,sc=w(()=>{B(),U(),Hn(),Y(),rc=e=>{if(!e||e.length!==2)throw Error(`GatherElements requires 2 inputs.`);if(e[0].dims.length<1)throw Error(`GatherElements requires that the data input be rank >= 1.`);if(e[0].dims.length!==e[1].dims.length)throw Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},ic=(e,t)=>{let n=e[0].dims,r=e[0].dataType,i=n.length,a=e[1].dims,o=e[1].dataType,s=H.normalizeAxis(t.axis,i),c=n[s],l=a.slice(0),u=H.size(l),d=q(`input`,r,i),f=q(`indicesInput`,o,a.length),p=J(`output`,r,l.length),m=[{type:12,data:u},{type:6,data:c},{type:12,data:s}];return m.push(...G(n,a,l)),{name:`GatherElements`,shaderCache:{inputDependencies:[`rank`,`rank`]},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:m}),getShaderSource:e=>`
      ${e.registerUniform(`outputSize`,`u32`).registerUniform(`axisDimLimit`,`i32`).registerUniform(`axis`,`u32`).declareVariables(d,f,p)}
      ${e.mainStart()}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}

      let outputIndices = ${p.offsetToIndices(`global_idx`)};

      var idx = ${f.getByOffset(`global_idx`)};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${d.type.indices}(outputIndices);
      ${d.indicesSet(`inputIndices`,`uniforms.axis`,`u32(idx)`)};
      let value = ${d.getByIndices(`inputIndices`)};

      ${p.setByOffset(`global_idx`,`value`)};
  }`}},ac=e=>W({axis:e.axis}),oc=(e,t)=>{let n=e.inputs;rc(n),e.compute(ic(e.inputs,t))}}),cc,lc,uc,dc,fc=w(()=>{B(),U(),Y(),cc=e=>{if(!e)throw Error(`Input is missing`);if(e.length<2||e.length>3)throw Error(`Invaid input number.`);if(e.length===3&&e[2].dims.length>2)throw Error(`Invalid input shape of C`);if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw Error(`Input types are mismatched`)},lc=(e,t)=>{let n=e[0].dims.slice(),r=e[1].dims.slice(),[i,a,o]=ln.getShapeOfGemmResult(n,t.transA,r,t.transB,e.length===3?e[2].dims:void 0),s=[i,a];if(!s)throw Error(`Can't use gemm on the given tensors`);let c=Math.ceil(a/16),l=Math.ceil(i/16);H.size(s);let u=[{type:12,data:c},{type:12,data:i},{type:12,data:a},{type:12,data:o},{type:1,data:t.alpha},{type:1,data:t.beta}],d=[`type`,`type`];return e.length===3&&(u.push(...G(e[2].dims)),d.push(`rank`)),u.push(...G(s)),{name:`GemmShared`,shaderCache:{hint:`${t.cacheKey}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:c*l},programUniforms:u}),getShaderSource:n=>{let r=q(`a`,e[0].dataType,e[0].dims),i=q(`b`,e[1].dataType,e[1].dims),a=null,o=[r,i];e.length===3&&(a=q(`c`,e[2].dataType,e[2].dims.length),o.push(a));let c=J(`output`,e[0].dataType,s.length);o.push(c);let l=[{name:`num_tile_n`,type:`u32`},{name:`M`,type:`u32`},{name:`N`,type:`u32`},{name:`K`,type:`u32`},{name:`alpha`,type:`f32`},{name:`beta`,type:`f32`}],u=``,d=``;t.transA&&t.transB?(d=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${r.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${i.type.value}(0);
      }
      `,u=`value += tile_a[k][local_id.y] * tile_b[local_id.x][k];`):t.transA&&!t.transB?(d=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${r.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${i.type.value}(0);
      }
      `,u=`value += tile_a[k][local_id.y] * tile_b[k][local_id.x];`):!t.transA&&t.transB?(d=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${r.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${i.type.value}(0);
      }
      `,u=`value += tile_a[local_id.y][k] * tile_b[local_id.x][k];`):!t.transA&&!t.transB&&(d=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${r.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${i.type.value}(0);
      }
      `,u=`value += tile_a[local_id.y][k] * tile_b[k][local_id.x];`);let f=t.alpha===1?``:`value *= uniforms.alpha;`;return`
  ${n.registerUniforms(l).declareVariables(...o)}
  var<workgroup> tile_a: array<array<${r.type.storage}, 16>, 16>;
  var<workgroup> tile_b: array<array<${i.type.storage}, 16>, 16>;
  ${n.mainStart([16,16,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * 16;
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * 16;
    let num_tiles = (uniforms.K - 1) / 16 + 1;
    var k_start = 0u;
    var value = ${c.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${d}
      k_start = k_start + 16;
      workgroupBarrier();

      for (var k: u32 = 0u; k < 16; k++) {
        ${u}
      }
      workgroupBarrier();
    }

    ${f}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${a==null?``:`let cOffset = ${a.broadcastedIndicesToOffset(`vec2(m, n)`,c)}; value += ${c.type.value}(uniforms.beta) * ${a.getByOffset(`cOffset`)};`}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`}}},uc=e=>({transA:e.transA,transB:e.transB,alpha:e.alpha,beta:e.beta,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}),dc=(e,t)=>{cc(e.inputs),e.compute(lc(e.inputs,t))}}),pc,mc,hc,gc,_c,vc,yc,bc,xc,Sc,Cc,wc,Tc,Ec,Dc=w(()=>{B(),U(),Hn(),Y(),[pc,mc,hc,gc]=[0,1,2,3],_c=e=>{if(e[0].dims.length!==4)throw Error(`only 4-D tensor is supported.`);if(e[0].dims.length!==e[1].dims.length)throw Error(`input dimensions must be equal to grid dimensions`);if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw Error(`grid batch size must match input batch size`)},vc=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,yc=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,bc=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,xc=e=>`
  ${e.paddingMode===`reflection`?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:``}
`,Sc=(e,t,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${pc}] = batch;
     indices[${mc}] = channel;`+(()=>{switch(n.paddingMode){case`zeros`:return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${hc}] = u32(r);
            indices[${gc}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case`border`:return`
          indices[${hc}] = u32(clamp(r, 0, H - 1));
          indices[${gc}] = u32(clamp(c, 0, W - 1));
        `;case`reflection`:return`
          indices[${hc}] = gs_reflect(r, border[1], border[3]);
          indices[${gc}] = gs_reflect(c, border[0], border[2]);
        `;default:throw Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices(`indices`)};
  }
`,Cc=(e,t,n)=>(()=>{switch(n.mode){case`nearest`:return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${pc}], indices[${mc}], border);
        `;case`bilinear`:return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${pc}], indices[${mc}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${pc}], indices[${mc}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${pc}], indices[${mc}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${pc}], indices[${mc}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case`bicubic`:return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${pc}], indices[${mc}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw Error(`mode ${n.mode} is not supported`)}})()+`${e.setByOffset(`global_idx`,`result`)}`,wc=(e,t)=>{let n=q(`x`,e[0].dataType,e[0].dims.length),r=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],i=q(`grid`,e[1].dataType,r.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format===`NHWC`&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[pc,mc,hc,gc]=[0,3,1,2]);let o=J(`output`,e[0].dataType,a.length),s=n.type.value,c=[{type:12,data:H.size(a)},...G(e[0].dims,r,a)];return{name:`GridSample`,shaderCache:{hint:`${t.cacheKey}`,inputDependencies:[`type`,`type`]},getRunData:e=>{let t=H.size(a);return{outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:c}},getShaderSource:e=>`
  ${e.registerUniform(`output_size`,`u32`).declareVariables(n,i,o)}
  ${vc}
  ${yc(s)}
  ${bc(t)}
  ${xc(t)}
  ${Sc(n,s,t)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
      let H_in = i32(uniforms.x_shape[${hc}]);
      let W_in = i32(uniforms.x_shape[${gc}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${o.offsetToIndices(`global_idx`)};
      var grid_indices = vec3<u32>(indices[${pc}], indices[${hc}], indices[${gc}]);
      let nxy = ${i.getByIndices(`grid_indices`)};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Cc(o,s,t)}
  }`}},Tc=(e,t)=>{_c(e.inputs),e.compute(wc(e.inputs,t))},Ec=e=>W({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Oc,kc,Ac,jc,Mc,Nc,Pc,Fc=w(()=>{B(),U(),Hn(),An(),_i(),Y(),dr(),Oc=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,kc=(e,t)=>{let n=e[0],r=Oc(e,1),i=Oc(e,2),a=Oc(e,3),o=Oc(e,4),s=Oc(e,5),c=Oc(e,6),l=Oc(e,7);if(n.dims.length!==3&&n.dims.length!==5)throw Error(`Input query is expected to have 3 or 5 dimensions`);let u=n.dims[0],d=n.dims[1],f=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],p=d,m=0,h=0,g=Math.floor(f/t.numHeads);if(c&&l&&H.size(c.dims)&&H.size(l.dims)){if(c.dims.length!==4)throw Error(`Input "past_key" is expected to have 4 dimensions`);if(c.dims[0]!==u||c.dims[1]!==t.numHeads||c.dims[3]!==g)throw Error(`Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)`);if(l.dims[0]!==u||l.dims[1]!==t.numHeads||l.dims[3]!==g)throw Error(`Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)`);if(c.dims[2]!==l.dims[2])throw Error(`Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)`);if(l.dims.length!==4)throw Error(`Input "past_value" is expected to have 4 dimensions`);m=c.dims[2],h=c.dims[2]}else if(c&&H.size(c.dims)||l&&H.size(l.dims))throw Error(`Input "past_key" and "past_value" shall be both present or both absent`);let _;if(r&&H.size(r.dims)>0){if(n.dims.length!==3)throw Error(`Input "query" is expected to have 3 dimensions when key is given`);if(r.dims.length<3||r.dims.length>5)throw Error(`Input "key" is expected to have 3, 4, or 5 dimensions`);if(n.dims[0]!==r.dims[0])throw Error(`Input "query" and "key" shall have same dim 0 (batch size)`);if(r.dims.length===3){if(r.dims[2]!==n.dims[2])throw Error(`Input "query" and "key" shall have same dim 2 (hidden_size)`);_=2,p=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==g)throw Error(`Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv`);if(i)throw Error(`Expect "value" be none when "key" has packed kv format.`);_=5,p=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==g)throw Error(`Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key`);_=0,p=r.dims[2]}}else{if(n.dims.length!==5)throw Error(`Input "query" is expected to have 5 dimensions when key is empty`);if(n.dims[2]!==t.numHeads||n.dims[3]!==3)throw Error(`Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv`);_=3}if(a&&H.size(a.dims)>0){if(a.dims.length!==1)throw Error(`Input "bias" is expected to have 1 dimension`);if(r&&r.dims.length===5&&r.dims[3]===2)throw Error(`bias is not allowed for packed kv.`)}let v=m+p,y=0;if(o&&H.size(o.dims)>0){y=8;let e=o.dims;throw e.length===1?e[0]===u?y=1:e[0]===3*u+2&&(y=3):e.length===2&&e[0]===u&&e[1]===v&&(y=5),Error(y===8?`Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)`:`Mask not supported`)}let b=!1,x=f;if(i&&H.size(i.dims)>0){if(i.dims.length!==3&&i.dims.length!==4)throw Error(`Input "value" is expected to have 3 or 4 dimensions`);if(n.dims[0]!==i.dims[0])throw Error(`Input "query" and "value" shall have same dim 0 (batch_size)`);if(i.dims.length===3){if(p!==i.dims[1])throw Error(`Input "key" and "value" shall have the same dim 1 (kv_sequence_length)`);x=i.dims[2]}else{if(p!==i.dims[2])throw Error(`Input "key" and "value" shall have the same dim 2 (kv_sequence_length)`);x=i.dims[1]*i.dims[3],b=!0}}if(o&&H.size(o.dims)>0)throw Error(`Key padding mask is not supported`);if(s&&H.size(s.dims)>0){if(s.dims.length!==4)throw Error(`Input "attention_bias" is expected to have 4 dimensions`);if(s.dims[0]!==u||s.dims[1]!==t.numHeads||s.dims[2]!==d||s.dims[3]!==v)throw Error(`Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)`)}return{batchSize:u,sequenceLength:d,pastSequenceLength:m,kvSequenceLength:p,totalSequenceLength:v,maxSequenceLength:h,inputHiddenSize:0,hiddenSize:f,vHiddenSize:x,headSize:g,vHeadSize:Math.floor(x/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:y,scale:t.scale,broadcastResPosBias:!1,passPastInKv:b,qkvFormat:_}},Ac=e=>W({...e}),jc=W({perm:[0,2,1,3]}),Mc=(e,t,n,r,i,a,o)=>{let s=[r,i,a],c=H.size(s),l=[{type:12,data:c},{type:12,data:o},{type:12,data:a}];return e.compute({name:`MultiHeadAttentionAddBias`,shaderCache:{inputDependencies:[`type`,`type`]},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:l}),getShaderSource:e=>{let r=J(`qkv_with_bias`,t.dataType,s),i=q(`qkv`,t.dataType,s),a=q(`bias`,n.dataType,s);return`
  ${e.registerUniforms([{name:`output_size`,type:`u32`},{name:`bias_offset`,type:`u32`},{name:`hidden_size`,type:`u32`}]).declareVariables(i,a,r)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`}},{inputs:[t,n],outputs:[-1]})[0]},Nc=(e,t,n,r,i,a,o,s)=>{let c=a;if(o&&H.size(o.dims)>0){if(r===1)throw Error(`AddBiasReshape is not implemented. Please export your model with packed QKV or KV`);return c=Mc(e,a,o,t,r,n*i,s),c=c.reshape([t,r,n,i]),n===1||r===1?c:e.compute(cr(c,jc.perm),{inputs:[c],outputs:[-1]})[0]}return a.dims.length===3&&(c=a.reshape([t,r,n,i])),n===1||r===1?c:e.compute(cr(c,jc.perm),{inputs:[c],outputs:[-1]})[0]},Pc=(e,t)=>{let n=kc(e.inputs,t),r=e.inputs[0],i=Oc(e.inputs,1),a=Oc(e.inputs,2),o=Oc(e.inputs,3),s=Oc(e.inputs,4),c=Oc(e.inputs,5),l=Oc(e.inputs,6),u=Oc(e.inputs,7);if(r.dims.length===5)throw Error(`Packed QKV is not implemented`);if(i?.dims.length===5)throw Error(`Packed KV is not implemented`);let d=i&&a&&i.dims.length===4&&a.dims.length===4,f=Nc(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,r,o,0);if(d)return mi(e,f,i,a,s,void 0,l,u,c,n);if(!i||!a)throw Error(`key and value must be provided`);let p=Nc(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,i,o,n.hiddenSize),m=Nc(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,a,o,2*n.hiddenSize);mi(e,f,p,m,s,void 0,l,u,c,n)}}),Ic,Lc,Rc,zc,Bc,Vc,Hc,Uc=w(()=>{B(),U(),Hn(),Y(),Ic=e=>{if(!e||e.length<1)throw Error(`too few inputs`)},Lc=(e,t)=>{let n=[],r=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(e=>n.push(Number(e))),r=n.length),W({numOutputs:r,axis:t.axis,splitSizes:n})},Rc=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${K(`uniforms.size_in_split_axis`,`i`,e)}) {
        return i;
    }
    }
    return ${e}u;
}`,zc=e=>{let t=e.length,n=[];for(let r=0;r<t;++r){let i=e[r].setByIndices(`indices`,`input[global_idx]`);t===1?n.push(i):r===0?n.push(`if (output_number == ${r}u) { ${i} }`):r===t-1?n.push(`else { ${i} }`):n.push(`else if (output_number == ${r}) { ${i} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},Bc=(e,t)=>{let n=e[0].dims,r=H.size(n),i=e[0].dataType,a=H.normalizeAxis(t.axis,n.length),o=Array(t.numOutputs),s=q(`input`,i,n.length),c=Array(t.numOutputs),l=[],u=[],d=0,f=[{type:12,data:r}];for(let r=0;r<t.numOutputs;r++){d+=t.splitSizes[r],c[r]=d;let s=n.slice();s[a]=t.splitSizes[r],u.push(s),o[r]=J(`output${r}`,i,s.length),l.push({dims:u[r],dataType:e[0].dataType})}return f.push({type:12,data:c},...G(n,...u)),{name:`Split`,shaderCache:{hint:t.cacheKey,inputDependencies:[`rank`]},getShaderSource:e=>`
  ${e.registerUniform(`input_size`,`u32`).registerUniform(`size_in_split_axis`,`u32`,c.length).declareVariables(s,...o)}
  ${Rc(c.length)}
  ${zc(o)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.input_size`)}

    var indices = ${s.offsetToIndices(`global_idx`)};
    var index = ${s.indicesGet(`indices`,a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${K(`uniforms.size_in_split_axis`,`output_number - 1u`,c.length)};
      ${s.indicesSet(`indices`,a,`index`)};
    }
    writeBufferData(output_number, indices, global_idx);
  }`,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:f})}},Vc=(e,t)=>{Ic(e.inputs);let n=e.inputs.length===1?t:Lc(e.inputs,t);e.compute(Bc(e.inputs,n),{inputs:[0]})},Hc=e=>{let t=e.axis,n=e.splitSizes,r=e.numOutputs<0?n.length:e.numOutputs;if(r!==n.length)throw Error(`numOutputs and splitSizes length must be equal`);return W({axis:t,numOutputs:r,splitSizes:n})}}),Wc,Gc,Kc,qc=w(()=>{B(),U(),Hn(),Y(),Wc=(e,t)=>{let[n,r,i,a]=e,{numHeads:o,rotaryEmbeddingDim:s}=t;if(n.dims.length!==3&&n.dims.length!==4)throw Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!H.areEqual(r.dims,[])&&!H.areEqual(r.dims,[1])&&r.dims.length!==2)throw Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(i.dims.length!==2)throw Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(a.dims.length!==2)throw Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!H.areEqual(i.dims,a.dims))throw Error(`Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape`);if(s>0&&o===0)throw Error(`num_heads must be provided if rotary_embedding_dim is specified`);let c=n.dims[0],l=n.dims[n.dims.length-2],u=i.dims[0],d=H.sizeFromDimension(n.dims,1)/l,f=s===0?i.dims[1]*2:d/o;if(s>f)throw Error(`rotary_embedding_dim must be less than or equal to head_size`);if(r.dims.length===2){if(c!==r.dims[0])throw Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(l!==r.dims[1])throw Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(l>u)throw Error(`Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported`);if(f/2!==i.dims[1]&&s/2!==i.dims[1])throw Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${i.dims[1]}`)},Gc=(e,t)=>{let{interleaved:n,numHeads:r,rotaryEmbeddingDim:i,scale:a}=t,o=e[0].dims[0],s=H.sizeFromDimension(e[0].dims,1),c=e[0].dims[e[0].dims.length-2],l=s/c,u=e[2].dims[1],d=i===0?u*2:l/r,f=[o,c,l/d,d-u],p=H.computeStrides(f),m=[{type:1,data:a},{type:12,data:f},{type:12,data:p},...e[0].dims.length===3?Array({type:12,data:[s,l,d,1]}):[],...e[0].dims.length===4?Array({type:12,data:[s,d,c*d,1]}):[],...G(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)];return{name:`RotaryEmbedding`,shaderCache:{hint:W({interleaved:n}).cacheKey,inputDependencies:[`rank`,`rank`,`rank`,`rank`]},getShaderSource:t=>{let r=q(`input`,e[0].dataType,e[0].dims.length),i=q(`position_ids`,e[1].dataType,e[1].dims.length),a=q(`cos_cache`,e[2].dataType,e[2].dims.length),o=q(`sin_cache`,e[3].dataType,e[3].dims.length),s=J(`output`,e[0].dataType,e[0].dims.length);return t.registerUniforms([{name:`scale`,type:`f32`},{name:`global_shape`,type:`u32`,length:f.length},{name:`global_strides`,type:`u32`,length:p.length},{name:`input_output_strides`,type:`u32`,length:p.length}]),`
        ${t.declareVariables(r,i,a,o,s)}

        ${t.mainStart(Un)}
          let half_rotary_emb_dim = uniforms.${a.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${t.guardAgainstOutOfBoundsWorkgroupSizes(`size`)}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${i.broadcastedIndicesToOffset(`bsnh.xy`,J(``,i.type.tensor,2))};
            let position_id =
                u32(${i.getByOffset(`position_ids_idx`)}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${r.getByOffset(`i`)} * ${a.get(`position_id`,`bsnh[3]`)} -
                ${r.getByOffset(`j`)} * ${o.get(`position_id`,`bsnh[3]`)};
            ${s.setByOffset(`i`,`re`)}
            let im = ${r.getByOffset(`i`)} * ${o.get(`position_id`,`bsnh[3]`)} +
                ${r.getByOffset(`j`)} * ${a.get(`position_id`,`bsnh[3]`)};
            ${s.setByOffset(`j`,`im`)}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${s.setByOffset(`k`,r.getByOffset(`k`))}
          }
        }`},getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(H.size(f)/Un)},programUniforms:m})}},Kc=(e,t)=>{Wc(e.inputs,t),e.compute(Gc(e.inputs,t))}}),Jc,Yc,Xc,Zc,Qc,$c=w(()=>{Hn(),B(),_i(),Fc(),Uc(),dr(),qc(),Y(),Jc=(e,t)=>{if(t.doRotary&&e.length<=7)throw Error(`cos_cache and sin_cache inputs are required if do_rotary is specified`);let n=e[0],r=e[1],i=e[2],a=e[3],o=e[4];if(t.doRotary!==0&&e.length<=7)throw Error(`cos_cast and sin_cache are expected if do_rotary attribute is non-zero`);if(t.localWindowSize!==-1)throw Error(`Local attention is not supported`);if(t.softcap!==0)throw Error(`Softcap is not supported`);if(t.rotaryInterleaved!==0)throw Error(`Rotary interleaved is not supported`);if(t.smoothSoftmax)throw Error(`Smooth softmax is not supported`);if(n.dims.length!==3&&n.dims.length!==5)throw Error(`Input query is expected to have 3 or 5 dimensions`);let s=n.dims[0],c=n.dims[1],l=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],u=c,d=0,f=!r||r.dims.length===0,p=Math.floor(f?l/(t.numHeads+2*t.kvNumHeads):l/t.numHeads);f&&(l=p*t.numHeads);let m=a&&a.dims.length!==0,h=o&&o.dims.length!==0;if(m&&a.dims.length===4&&a.dims[0]===s&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===p)throw Error(`BSNH pastKey/pastValue is not supported`);if(m&&h){if(a.dims.length!==4)throw Error(`Input "past_key" is expected to have 4 dimensions`);if(o.dims.length!==4)throw Error(`Input "past_value" is expected to have 4 dimensions`);d=a.dims[2]}else if(m||h)throw Error(`Input "past_key" and "past_value" shall be both present or both absent`);let g=1;if(r&&r.dims.length>0){if(n.dims.length!==3)throw Error(`Input "query" is expected to have 3 dimensions when key is given`);if(r.dims.length<3||r.dims.length>5)throw Error(`Input "key" is expected to have 3, 4, or 5 dimensions`);if(n.dims[0]!==r.dims[0])throw Error(`Input "query" and "key" shall have same dim 0 (batch size)`);if(r.dims.length===3){if(n.dims[2]%r.dims[2]!==0)throw Error(`Dimension 2 of "query" should be a multiple of "key"`);u=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==p)throw Error(`Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv`);if(i)throw Error(`Expect "value" be none when "key" has packed kv format.`);u=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==p)throw Error(`Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key`);u=r.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw Error(`Input "query" is expected to have 3 or 5 dimensions when key is empty`);if(n.dims.length===5&&(n.dims[2]!==t.numHeads||n.dims[3]!==3))throw Error(`Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv`);g=3}let _=!1,v=t.kvNumHeads?p*t.kvNumHeads:l;if(i&&i.dims.length>0){if(i.dims.length!==3&&i.dims.length!==4)throw Error(`Input "value" is expected to have 3 or 4 dimensions`);if(n.dims[0]!==i.dims[0])throw Error(`Input "query" and "value" shall have same dim 0 (batch_size)`);if(i.dims.length===3){if(u!==i.dims[1])throw Error(`Input "key" and "value" shall have the same dim 1 (kv_sequence_length)`);v=i.dims[2]}else{if(u!==i.dims[2])throw Error(`Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)`);v=i.dims[1]*i.dims[3],_=!0}}let y=e.length>4?e[5]:void 0;if(y){if(y.dims.length===0)throw Error(`seqlens_k must be at least 1D, got scalar.`);let e=y.dims.reduce((e,t)=>e*t,1);if(e!==s)throw Error(`seqlens_k must have batch_size (${s}) elements, got ${e}.`);for(let e=0;e<y.dims.length;e++)if(y.dims[e]!==1&&y.dims[e]!==s)throw Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${s}), got dims[${e}] = ${y.dims[e]}.`)}return{batchSize:s,sequenceLength:c,pastSequenceLength:d,kvSequenceLength:u,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:l,vHiddenSize:v,headSize:p,vHeadSize:Math.floor(v/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:0,scale:t.scale,broadcastResPosBias:!1,passPastInKv:_,qkvFormat:g}},Yc=W({perm:[0,2,1,3]}),Xc=(e,t,n)=>{let r=t,i=n.kvNumHeads;return t.dims.length===3&&n.kvSequenceLength!==0&&(r=t.reshape([n.batchSize,n.kvSequenceLength,i,n.headSize]),r=e.compute(cr(r,Yc.perm),{inputs:[r],outputs:[-1]})[0]),r},Zc=(e,t,n,r)=>{let i=[`type`,`type`],a=[e*t],o=e*t,s=[{type:12,data:o},{type:12,data:t},{type:12,data:e}];return{name:`GeneratePositionIds`,shaderCache:{hint:`${e};${t}`,inputDependencies:i},getRunData:()=>({outputs:[{dims:a,dataType:7}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:s}),getShaderSource:e=>{let t=q(`seq_lens`,n.dataType,n.dims),i=q(`total_seq_lens`,r.dataType,r.dims),o=J(`pos_ids`,7,a);return`
  ${e.registerUniforms([{name:`output_size`,type:`u32`},{name:`sequence_length`,type:`u32`},{name:`batch_size`,type:`u32`}]).declareVariables(t,i,o)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
    let total_sequence_length = u32(${i.getByOffset(`0`)});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${t.getByOffset(`batch_idx`)};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${o.setByOffset(`global_idx`,`pos_id`)}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${o.setByOffset(`global_idx`,`pos_id`)}
    } else if (global_idx < uniforms.batch_size) {
      ${o.setByOffset(`global_idx`,`seqlen`)}
    };
  }
  `}}},Qc=(e,t)=>{if(e.inputs.length>14&&e.inputs[14]||e.inputs.length>15&&e.inputs[15])throw Error(`GroupQueryAttention (JSEP): q_norm_weight / k_norm_weight inputs are not supported. The per-head Q/K RMS normalization prologue is implemented only on the CUDA and native WebGPU EPs.`);let n=Jc(e.inputs,t);if(e.inputs[0].dims.length===5)throw Error(`Packed QKV is not implemented`);if(e.inputs[1]?.dims.length===5)throw Error(`Packed KV is not implemented`);let r=e.inputs[0],i=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,o=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,s=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,c=e.inputs.length>4?e.inputs[5]:void 0,l=e.inputs.length>5?e.inputs[6]:void 0,u=n.kvNumHeads?n.kvNumHeads:n.numHeads,d=W({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,u*n.headSize,u*n.headSize]}),[f,p,m]=!i&&!a?e.compute(Bc([r],d),{inputs:[r],outputs:[-1,-1,-1]}):[r,i,a],h,g;if(t.doRotary){let r=e.compute(Zc(n.batchSize,n.sequenceLength,c,l),{inputs:[c,l],outputs:[-1]})[0],i=e.inputs[7],a=e.inputs[8],o=W({interleaved:t.rotaryInterleaved!==0,numHeads:n.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),s=[f,r,i,a],u=[-1];h=e.compute(Gc(s,o),{inputs:s,outputs:u})[0],s.splice(0,1,p);let d=W({interleaved:t.rotaryInterleaved!==0,numHeads:n.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});g=e.compute(Gc(s,d),{inputs:s,outputs:u})[0]}let _=Nc(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t.doRotary?h:f,void 0,0),v=Xc(e,t.doRotary?g:p,n),y=Xc(e,m,n);mi(e,_,v,y,void 0,void 0,o,s,void 0,n,c,l)}}),el,tl,nl,rl,il=w(()=>{B(),U(),dr(),Y(),el=(e,t,n,r,i,a,o,s)=>{let c=qn(a),l=c===1?`f32`:`vec${c}f`,u=c===1?`vec2f`:`mat2x${c}f`,d=i*o,f=64;d===1&&(f=256);let p=[i,o,a/c],m=[i,o,2],h=[`rank`,`type`,`type`],g=[];return g.push(...G(p,m)),e.compute({name:`InstanceNormComputeChannelScaleShift`,shaderCache:{hint:`${c};${s};${f}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:d},programUniforms:g}),getShaderSource:e=>{let i=q(`x`,t.dataType,3,c),a=[i,q(`scale`,n.dataType,n.dims),q(`bias`,r.dataType,r.dims),J(`output`,1,3,2)];return`
  var<workgroup> workgroup_shared : array<${u}, ${f}>;
  const workgroup_size = ${f}u;
  ${e.declareVariables(...a)}
  ${e.mainStart(f)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${i.get(`batch`,`channel`,`h`)});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${u}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${Xn(`workgroup_shared[0][0]`,c)} / f32(hight * ${c});
      let squared_sum_final = ${Xn(`workgroup_shared[0][1]`,c)} / f32(hight * ${c});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${s}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`}},{inputs:[t,n,r],outputs:[-1]})[0]},tl=(e,t,n)=>{let r=t[0].dims,i=r,a=r[0],o=r[1],s=H.sizeFromDimension(r,2),c=qn(s),l=H.size(i)/c,u=el(e,t[0],t[1],t[2],a,s,o,n.epsilon),d=[a,o,s/c],f=[a,o];e.compute({name:`InstanceNormalization`,shaderCache:{hint:`${c}`,inputDependencies:[`type`,`none`]},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:[{type:12,data:l},...G(d,f,d)]}),getShaderSource:e=>{let n=q(`x`,t[0].dataType,d.length,c),r=q(`scale_shift`,1,f.length,2),i=J(`output`,t[0].dataType,d.length,c),a=[n,r,i];return`
  ${e.registerUniform(`output_size`,`u32`).declareVariables(...a)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
      let outputIndices = ${i.offsetToIndices(`global_idx`)};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${r.getByIndices(`vec2<u32>(batch, channel)`)};
      let value = ${n.getByOffset(`global_idx`)} * ${i.type.value}(scale_shift.x) + ${i.type.value}(scale_shift.y);
      ${i.setByOffset(`global_idx`,`value`)};
  }`}},{inputs:[t[0],u]})},nl=(e,t,n)=>{let r=t[0].dims,i=r,a=r[0],o=r[r.length-1],s=H.sizeFromDimension(r,1)/o,c=qn(o),l=H.size(i)/c,u=[{type:12,data:s},{type:12,data:Math.floor(o/c)}],d=[`type`,`type`],f=!1,p=[0,r.length-1];for(let e=0;e<r.length-2;e++)f||=r[e+1]!==1,p.push(e+1);f&&=r[r.length-1]!==1;let m=f?e.compute(cr(e.inputs[0],p),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:r.length},(e,t)=>r[p[t]])),h=el(e,m,t[1],t[2],a,s,o,n.epsilon);e.compute({name:`InstanceNormalizationNHWC`,shaderCache:{hint:`${c}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u}),getShaderSource:e=>{let n=Gn(t[0].dataType),r=c===1?`vec2f`:`mat${c}x2f`,a=e=>{let t=e===0?`x`:`y`,r=c===1?`f32`:`vec${c}f`;switch(c){case 1:return`${n}(${r}(scale.${t}))`;case 2:return`vec2<${n}>(${r}(scale[0].${t}, scale[1].${t}))`;case 4:return`vec4<${n}>(${r}(scale[0].${t}, scale[1].${t}, scale[2].${t}, scale[3].${t}))`;default:throw Error(`Not supported compoents ${c}`)}},o=q(`input`,t[0].dataType,t[0].dims,c),s=J(`output`,t[0].dataType,i,c);return`
  @group(0) @binding(0) var<storage, read> input : array<${o.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${r}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${s.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${e.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${a(0)}, ${a(1)});
  }`}},{inputs:[t[0],h]})},rl=(e,t)=>{t.format===`NHWC`?nl(e,e.inputs,t):tl(e,e.inputs,t)}}),al,ol,sl,cl=w(()=>{B(),U(),Y(),al=e=>{if(!e||e.length<2)throw Error(`layerNorm requires at least 2 inputs.`)},ol=(e,t,n)=>{let r=t.simplified,i=e[0].dims,a=e[1],o=!r&&e[2],s=i,c=H.normalizeAxis(t.axis,i.length),l=H.sizeToDimension(i,c),u=H.sizeFromDimension(i,c),d=H.size(a.dims),f=o?H.size(o.dims):0;if(d!==u||o&&f!==u)throw Error(`Size of X.shape()[axis:] == ${u}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${d} and bias size of ${f}`);let p=[];for(let e=0;e<i.length;++e)e<c?p.push(i[e]):p.push(1);let m=qn(u),h=[`type`,`type`],g=[{type:12,data:l},{type:1,data:u},{type:12,data:Math.floor(u/m)},{type:1,data:t.epsilon}];o&&h.push(`type`);let _=n>1,v=n>2,y=t=>{let n=Gn(e[0].dataType),i=[q(`x`,e[0].dataType,e[0].dims,m),q(`scale`,a.dataType,a.dims,m)];return o&&i.push(q(`bias`,o.dataType,o.dims,m)),i.push(J(`output`,e[0].dataType,s,m)),_&&i.push(J(`mean_data_output`,1,p)),v&&i.push(J(`inv_std_output`,1,p)),`
  ${t.registerUniforms([{name:`norm_count`,type:`u32`},{name:`norm_size`,type:`f32`},{name:`norm_size_vectorized`,type:`u32`},{name:`epsilon`,type:`f32`}]).declareVariables(...i)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.norm_count`)}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Jn(`f32`,m)};
    var mean_square_vector = ${Jn(`f32`,m)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Yn(n,m,`x[h + offset]`)};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Xn(`mean_vector`,m)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Xn(`mean_square_vector`,m)} / uniforms.norm_size ${r?``:`- mean * mean`} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Yn(n,m,`x[j + offset]`)};
      let f32scale = ${Yn(n,m,`scale[j]`)};
      output[j + offset] = ${i[0].type.value}((f32input ${r?``:`- mean`}) * inv_std_dev * f32scale
        ${o?`+ ${Yn(n,m,`bias[j]`)}`:``}
      );
    }

    ${_?`mean_data_output[global_idx] = mean`:``};
    ${v?`inv_std_output[global_idx] = inv_std_dev`:``};
  }`},b=[{dims:s,dataType:e[0].dataType}];return _&&b.push({dims:p,dataType:1}),v&&b.push({dims:p,dataType:1}),{name:`LayerNormalization`,shaderCache:{hint:`${m};${n};${r}`,inputDependencies:h},getRunData:()=>({outputs:b,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:g}),getShaderSource:y}},sl=(e,t)=>{al(e.inputs),e.compute(ol(e.inputs,t,e.outputCount))}}),ll,ul,dl=w(()=>{U(),eo(),lo(),ll=e=>{if(!e||e.length!==2)throw Error(`MatMul requires 2 inputs.`);if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw Error(`shared dimension does not match.`)},ul=e=>{ll(e.inputs);let t=sn.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw Error(`Can't use matmul on the given tensors`);let n=t[t.length-1],r=e.inputs[0].dims[e.inputs[0].dims.length-1];if(n<8&&r<8)e.compute($a(e.inputs,{activation:``},t));else{let i=t[t.length-2],a=H.size(e.inputs[0].dims.slice(0,-2)),o=H.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&i===1&&o===1){let i=e.inputs[0].reshape([1,a,r]),o=e.inputs[1].reshape([1,r,n]),s=[1,a,n],c=[i,o];e.compute(co(c,{activation:``},t,s),{inputs:c})}else e.compute(co(e.inputs,{activation:``},t))}}}),fl,pl,ml,hl,gl,_l=w(()=>{B(),U(),Hn(),Y(),fl=(e,t)=>{if(e.length<3||e.length>4)throw Error(`MatMulNBits requires 3 or 4 inputs`);let n=e[0],r=n.dims.length;if(n.dims[r-1]!==t.k)throw Error(`The last dim of input shape does not match the k value`);let i=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,o=e[1];if(!H.areEqual(o.dims,[t.n,i,a]))throw Error(`The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize`);let s=e[2].dims;if(H.size(s)!==t.n*i)throw Error(`scales input size error.`);if(e.length===4){let n=e[3].dims,r=t.n*(t.bits===8?i:Math.floor((i*t.bits+7)/8));if(H.size(n)!==r)throw Error(`zeroPoints input size error.`)}},pl=(e,t)=>{let n=e[0].dims,r=n.length,i=n[r-2],a=t.k,o=t.n,s=n.slice(0,r-2),c=H.size(s),l=e[1].dims[2]/4,u=e[0].dataType,d=qn(t.k),f=qn(l),p=qn(o),m=s.concat([i,o]),h=i>1&&o/p%2==0?2:1,g=H.size(m)/p/h,_=[],v=[c,i,a/d],y=H.convertShape(e[1].dims).slice();y.splice(-1,1,l/f),_.push(...G(v)),_.push(...G(y)),_.push(...G(e[2].dims)),e.length===4&&_.push(...G(H.convertShape(e[3].dims)));let b=[c,i,o/p];return _.push(...G(b)),{name:`MatMulNBits`,shaderCache:{hint:`${t.blockSize};${t.bits};${d};${f};${p};${h};64`,inputDependencies:Array(e.length).fill(`rank`)},getRunData:()=>({outputs:[{dims:m,dataType:u}],dispatchGroup:{x:g},programUniforms:_}),getShaderSource:n=>{let r=v.length,i=q(`a`,e[0].dataType,r,d),a=q(`b`,12,y.length,f),o=q(`scales`,e[2].dataType,e[2].dims.length),s=[i,a,o],c=e.length===4?q(`zero_points`,12,e[3].dims.length):void 0;c&&s.push(c);let u=b.length,m=J(`output`,e[0].dataType,u,p),g=Gn(e[0].dataType),_=(()=>{switch(d){case 1:return`array<${g}, 8>`;case 2:return`mat4x2<${g}>`;case 4:return`mat2x4<${g}>`;default:throw Error(`${d}-component is not supported.`)}})(),x=Math.floor(32/t.bits),S=Math.floor(x/8),C=()=>{let e=``;for(let n=0;n<S;n++){let r=n*t.bits*4,a=r+t.bits;e+=`
          // reuse a data (pass ${n})
            var input_offset${n>0?n:``} = ${n===0?i.indicesToOffset(`${i.type.indices}(batch, row, word_offset)`):`input_offset`};
            var a_data${n>0?n:``}: ${_};
            for (var j${n>0?n:``}: u32 = 0; j${n>0?n:``} < ${8/d}; j${n>0?n:``}++) {
              a_data${n>0?n:``}[j${n>0?n:``}] = ${i.getByOffset(`input_offset${n>0?n:``}`)};
              input_offset${n>0?n:``}++;
            }
          `;for(let i=0;i<p*h;i++)e+=`
            b_value = ${f===1?`b${i}_data`:`b${i}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${n*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${r}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${a}u) & b_mask);`}
            b_quantized_values = ${_}(${Array.from({length:4},(e,t)=>`${g}(b_value_lower[${t}]), ${g}(b_value_upper[${t}])`).join(`, `)});
            b_dequantized_values = ${d===1?`${_}(${Array.from({length:8},(e,t)=>`(b_quantized_values[${t}] - ${c?`zero_point${i}`:`zero_point`}) * scale${i}`).join(`, `)});`:`(b_quantized_values - ${_}(${Array(8).fill(`${c?`zero_point${i}`:`zero_point`}`).join(`,`)})) * scale${i};`};
            workgroup_shared[local_id.x * ${h} + ${Math.floor(i/p)}]${p>1?`[${i%p}]`:``} += ${Array.from({length:8/d},(e,t)=>`${d===1?`a_data${n>0?n:``}[${t}] * b_dequantized_values[${t}]`:`dot(a_data${n>0?n:``}[${t}], b_dequantized_values[${t}])`}`).join(` + `)};
          `}return e},w=()=>{let e=`
            var col_index = col * ${p};
            ${c?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${2**(t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${g}(${(2**(t.bits-1)).toFixed(1)});`}
            `;for(let n=0;n<p*h;n++)e+=`
            let scale${n} = ${o.getByOffset(`col_index * nBlocksPerCol + block`)};
            ${c?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${c.getByOffset(`zero_point_word_index`)} >> zero_point_bits_offset;
            let zero_point${n} = ${g}((zero_point_word) & ${t.bits===2?`0x3u`:`0xFu`});`:``}
            col_index += 1;`;return e},T=()=>{let e=`col_index = col * ${p};`;for(let t=0;t<p*h;t++)e+=`
            let b${t}_data = ${a.getByIndices(`${a.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return e+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?`0x03030303u`:`0x0F0F0F0Fu`};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${_};
            var b_dequantized_values: ${_};`,e};return`
        var<workgroup> workgroup_shared: array<${m.type.value}, ${h*64}>;
        ${n.declareVariables(...s,m)}
        ${n.mainStart([64,1,1])}
          let output_indices = ${m.offsetToIndices(`(global_idx / 64) * ${h}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += 64) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/d};
            ${w()}
            for (var word: u32 = 0; word < ${l}; word += ${f}) {
              ${T()}
              for (var i: u32 = 0; i < ${f}; i++) {
                ${C()}
                word_offset += ${x/d};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${h}) {
            var output_value: ${m.type.value} = ${m.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < 64u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${h};
            }
            ${m.setByIndices(`${m.type.indices}(batch, row, col + local_id.x)`,`output_value`)};
          }
        }`}}},ml=(e,t)=>{let n=e[0].dims,r=n.length,i=n[r-2],a=t.k,o=t.n,s=n.slice(0,r-2),c=H.size(s),l=e[1].dims[2]/4,u=e[0].dataType,d=qn(t.k),f=qn(l),p=s.concat([i,o]),m=o%8==0?8:o%4==0?4:1,h=128/m,g=Math.floor(32/t.bits),_=h*f*g,v=_/d,y=_/t.blockSize,b=H.size(p)/m,x=[],S=[c,i,a/d],C=H.convertShape(e[1].dims).slice();C.splice(-1,1,l/f),x.push(...G(S)),x.push(...G(C)),x.push(...G(e[2].dims)),e.length===4&&x.push(...G(H.convertShape(e[3].dims)));let w=[c,i,o];return x.push(...G(w)),{name:`BlockwiseMatMulNBits32`,shaderCache:{hint:`${t.blockSize};${d};${f};${h};${m}`,inputDependencies:Array(e.length).fill(`rank`)},getRunData:()=>({outputs:[{dims:p,dataType:u}],dispatchGroup:{x:b},programUniforms:x}),getShaderSource:n=>{let r=S.length,i=q(`a`,e[0].dataType,r,d),a=q(`b`,12,C.length,f),o=q(`scales`,e[2].dataType,e[2].dims.length),s=[i,a,o],c=e.length===4?q(`zero_points`,12,e[3].dims.length):void 0;c&&s.push(c);let l=w.length,u=J(`output`,e[0].dataType,l),p=Gn(e[0].dataType),_=()=>{switch(d){case 1:return`
          let a_data0 = vec4<${p}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${p}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${p}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${p}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw Error(`${d}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${i.type.value}, ${v}>;
        var<workgroup> inter_results: array<array<${u.type.value}, ${h}>, ${m}>;
        ${n.declareVariables(...s,u)}
        ${n.mainStart([h,m,1])}
          let output_indices = ${u.offsetToIndices(`workgroup_index * ${m}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${y} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${v};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${v}; a_offset += 128)
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${i.getByIndices(`${i.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${i.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${y} + local_id.x;
            ${c?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            let zero_point_word = ${c.getByOffset(`zero_point_word_index`)} >> zero_point_bits_offset;
            let zero_point = ${p}((zero_point_word) & ${t.bits===2?`0x3u`:`0xFu`});`:`
            // The default zero point is ${2**(t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${p}(${(2**(t.bits-1)).toFixed(1)});`}
            let scale = ${o.getByOffset(`b_row * n_blocks_per_col + block`)};
            let b_data = ${a.getByIndices(`${a.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/d};
            for (var i: u32 = 0; i < ${f}; i++) {
              let b_value = ${f===1?`b_data`:`b_data[i]`};
              ${(()=>{let e=Math.floor(g/8),n=``;for(let r=0;r<e;r++){let e=r*t.bits*4,i=e+t.bits;n+=`
              ${_()}
              {${t.bits===2?`
                let half_word = b_value >> ${r*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${e}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${i}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${p}>(${Array.from({length:4},(e,t)=>`${p}(b_value_lower[${t}]), ${p}(b_value_upper[${t}])`).join(`, `)});
                let b_dequantized_values = (b_quantized_values - mat2x4<${p}>(${Array(8).fill(`zero_point`).join(`,`)})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(e,t)=>`${`dot(a_data${t}, b_dequantized_values[${t}])`}`).join(` + `)};
              }
              word_offset += ${8/d};`}return n})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${m}) {
            var output_value: ${u.type.value} = ${u.type.value}(0);
            for (var b = 0u; b < ${h}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${u.setByIndices(`${u.type.indices}(batch, row, col + local_idx)`,`output_value`)}
            }
          }
        }`}}},hl=(e,t)=>{fl(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor(`intel`)&&e.adapterInfo.isArchitecture(`gen-12lp`)?e.compute(ml(e.inputs,t)):e.compute(pl(e.inputs,t))},gl=e=>W(e)}),vl,yl,bl,xl,Sl,Cl,wl,Tl,El,Dl=w(()=>{B(),U(),Y(),vl=e=>{if(!e||e.length<1)throw Error(`Too few inputs`);if(e[0].dataType!==1&&e[0].dataType!==10)throw Error(`Input type must be float or float16.`);if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw Error(`The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].`)}},yl=(e,t,n)=>{let r=``;for(let i=t-1;i>=0;--i)r+=`
            k = i32(${e.indicesGet(`indices`,i)}) - ${K(`uniforms.pads`,i,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${K(`uniforms.x_shape`,i,t)})) {
              break;
            }
            offset += k * i32(${K(`uniforms.x_strides`,i,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${r}
            value = x[offset];
          }
      `},bl=(e,t,n)=>{let r=``;for(let i=t-1;i>=0;--i)r+=`
                k = i32(${e.indicesGet(`indices`,i)}) - ${K(`uniforms.pads`,i,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${K(`uniforms.x_shape`,i,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${K(`uniforms.x_shape`,i,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${K(`uniforms.x_strides`,i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},xl=(e,t,n)=>{let r=``;for(let i=t-1;i>=0;--i)r+=`
                k = i32(${e.indicesGet(`indices`,i)}) - ${K(`uniforms.pads`,i,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${K(`uniforms.x_shape`,i,t)})) {
                  k = i32(${K(`uniforms.x_shape`,i,t)}) - 1;
                }
                offset += k * i32(${K(`uniforms.x_strides`,i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Sl=(e,t,n)=>{let r=``;for(let i=t-1;i>=0;--i)r+=`
                k = i32(${e.indicesGet(`indices`,i)}) - ${K(`uniforms.pads`,i,n)};
                if (k < 0)  {
                  k += i32(${K(`uniforms.x_shape`,i,t)}]);
                }
                if (k >= i32(${K(`uniforms.x_shape`,i,t)})) {
                  k -= i32(${K(`uniforms.x_shape`,i,t)});
                }
                offset += k * i32(${K(`uniforms.x_strides`,i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Cl=(e,t,n)=>{switch(n.mode){case 0:return yl(e,t,n.pads.length);case 1:return bl(e,t,n.pads.length);case 2:return xl(e,t,n.pads.length);case 3:return Sl(e,t,n.pads.length);default:throw Error(`Invalid mode`)}},wl=(e,t)=>{let n=H.padShape(e[0].dims.slice(),t.pads),r=e[0].dims,i=[{type:12,data:H.size(n)},{type:6,data:t.pads}],a=e.length>=3&&e[2].data;return t.mode===0&&i.push({type:a?e[2].dataType:1,data:t.value}),i.push(...G(e[0].dims,n)),{name:`Pad`,shaderCache:{hint:`${t.mode}${a}`,inputDependencies:[`rank`]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(H.size(n)/64)},programUniforms:i}),getShaderSource:i=>{let o=J(`output`,e[0].dataType,n.length),s=q(`x`,e[0].dataType,r.length),c=s.type.value,l=Cl(o,r.length,t),u=[{name:`output_size`,type:`u32`},{name:`pads`,type:`i32`,length:t.pads.length}];return t.mode===0&&u.push({name:`constant_value`,type:a?c:`f32`}),`
            ${i.registerUniforms(u).declareVariables(s,o)}
            ${i.mainStart()}
            ${i.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}

            let indices = ${o.offsetToIndices(`global_idx`)};

            var value = ${c}(0);
            ${l}
            output[global_idx] = value;
        }`}}},Tl=(e,t)=>{if(e.length>1){let n=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,i=e[0].dims.length,a=new Int32Array(2*i).fill(0);if(e.length>=4){let t=e[3].getBigInt64Array();for(let e=0;e<t.length;e++)a[Number(t[e])]=Number(n[e]),a[Number(t[e])+i]=Number(n[e+t.length])}else n.forEach((e,t)=>a[Number(t)]=Number(e));let o=[];return a.forEach(e=>o.push(e)),{mode:t.mode,value:r,pads:o}}return t},El=(e,t)=>{vl(e.inputs);let n=Tl(e.inputs,t);e.compute(wl(e.inputs,n),{inputs:[0]})}}),Ol,kl,Al,jl,Ml,Nl,Pl,Fl,Il,Ll,Rl,zl,Bl,Vl,Hl,Ul,Wl,Gl,Kl,ql=w(()=>{qe(),B(),U(),Y(),Ol=e=>{if(R.webgpu.validateInputContent&&(!e||e.length!==1))throw Error(`Pool ops requires 1 input.`)},kl=(e,t,n)=>{let r=t.format===`NHWC`,i=e.dims.slice();r&&i.splice(1,0,i.pop());let a=Object.hasOwnProperty.call(t,`dilations`),o=t.kernelShape.slice(),s=t.strides.slice(),c=a?t.dilations.slice():[],l=t.pads.slice();cn.adjustPoolAttributes(n,i,o,s,c,l);let u=cn.computePoolOutputShape(n,i,s,c,o,l,t.autoPad,t.ceilMode),d=Object.assign({},t);a?Object.assign(d,{kernelShape:o,strides:s,pads:l,dilations:c,cacheKey:t.cacheKey}):Object.assign(d,{kernelShape:o,strides:s,pads:l,cacheKey:t.cacheKey});let f=u.slice();return f.push(f.splice(1,1)[0]),[d,r?f:u]},Al=(e,t)=>{let n=t.format===`NHWC`,r=H.size(e),i=H.size(t.kernelShape),a=[{type:12,data:r},{type:12,data:i}],o=[{name:`outputSize`,type:`u32`},{name:`kernelSize`,type:`u32`}];if(t.kernelShape.length<=2){let e=t.kernelShape[t.kernelShape.length-1],n=t.strides[t.strides.length-1],r=t.pads[t.pads.length/2-1],i=t.pads[t.pads.length-1],s=!!(r+i);a.push({type:12,data:e},{type:12,data:n},{type:12,data:r},{type:12,data:i}),o.push({name:`kw`,type:`u32`},{name:`sw`,type:`u32`},{name:`pwStart`,type:`u32`},{name:`pwEnd`,type:`u32`});let c=!1;if(t.kernelShape.length===2){let e=t.kernelShape[t.kernelShape.length-2],n=t.strides[t.strides.length-2],r=t.pads[t.pads.length/2-2],i=t.pads[t.pads.length-2];c=!!(r+i),a.push({type:12,data:e},{type:12,data:n},{type:12,data:r},{type:12,data:i}),o.push({name:`kh`,type:`u32`},{name:`sh`,type:`u32`},{name:`phStart`,type:`u32`},{name:`phEnd`,type:`u32`})}return[a,o,!0,s,c]}{if(n)throw Error(`Pooling with kernelShape.length > 2 is not supported for NHWC format.`);let e=H.computeStrides(t.kernelShape);return a.push({type:12,data:e},{type:12,data:t.pads},{type:12,data:t.strides}),o.push({name:`kernelStrides`,type:`u32`,length:e.length},{name:`pads`,type:`u32`,length:t.pads.length},{name:`strides`,type:`u32`,length:t.strides.length}),[a,o,!!t.pads.reduce((e,t)=>e+t),!1,!1]}},jl=(e,t,n,r,i,a,o,s,c,l,u,d)=>{let f=i.format===`NHWC`,p=t.type.value,m=J(`output`,t.type.tensor,r);if(i.kernelShape.length<=2){let r=``,l=``,h=``,g=n-(f?2:1);if(r=u?`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${g}] < 0 || xIndices[${g}]
                      >= uniforms.x_shape[${g}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset(`xIndices`)}];
                  ${a}
                }`:`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset(`xIndices`)}];
                  ${a}
                }`,i.kernelShape.length===2){let e=n-(f?3:2);l=d?`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${e}] = indices[${e}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${e}] < 0 || xIndices[${e}] >= uniforms.x_shape[${e}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${e}] = indices[${e}] * uniforms.sh - uniforms.phStart + j;
                `,h=`
              }
            `}return`
            ${e.registerUniforms(c).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}

              let indices = ${m.offsetToIndices(`global_idx`)};
              var xIndices = ${m.offsetToIndices(`global_idx`)};

              var value = ${p}(${s});
              var pad = 0;
              ${l}
              ${r}
              ${h}
              ${o}

              output[global_idx] = value;
            }`}{if(f)throw Error(`Pooling with kernelShape.length > 2 is not supported for NHWC format.`);let r=i.kernelShape.length,u=i.pads.length,d=``;return d=l?`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset(`xIndices`)}];
                ${a}
              }`:`
              }
              let x_val = x[${t.indicesToOffset(`xIndices`)}];
              ${a}
            `,`
            ${e.registerUniforms(c).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}
              let indices = ${m.offsetToIndices(`global_idx`)};
              var xIndices = ${m.offsetToIndices(`global_idx`)};

              var offsets: array<u32, ${r}>;

              var value = ${p}(${s});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${r-1}u; j++) {
                  offsets[j] = offset / ${K(`uniforms.kernelStrides`,`j`,r)};
                  offset -= offsets[j] * ${K(`uniforms.kernelStrides`,`j`,r)};
                }
                offsets[${r-1}] = offset;

                isPad = false;
                for (var j = ${n-r}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${K(`uniforms.strides`,`j - ${n-r}u`,r)}
                    + offsets[j - ${n-r}u] - ${K(`uniforms.pads`,`j - 2u`,u)};
                  ${d}
              }
              ${o}

              output[global_idx] = value;
            }`}},Ml=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Nl=e=>`${Ml(e)};${e.countIncludePad}`,Pl=e=>`${Ml(e)};${e.storageOrder};${e.dilations}`,Fl=e=>({format:e.format,autoPad:[`NOTSET`,`VALID`,`SAME_UPPER`,`SAME_LOWER`][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Il=(e,t,n,r)=>{let[i,a]=kl(t,r,n),o=q(`x`,t.dataType,t.dims.length),s=o.type.value,c=``;i.countIncludePad?c+=`value /= ${s}(uniforms.kernelSize);`:c+=`value /= ${s}(i32(uniforms.kernelSize) - pad);`;let[l,u,d,f,p]=Al(a,i);return l.push(...G(t.dims,a)),{name:e,shaderCache:{hint:`${r.cacheKey};${d};${f};${p}`,inputDependencies:[`rank`]},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(H.size(a)/64)},programUniforms:l}),getShaderSource:e=>jl(e,o,t.dims.length,a.length,i,`value += x_val;`,c,0,u,d,f,p)}},Ll=e=>{let t=e.count_include_pad!==0,n=Fl(e);if(n.ceilMode!==0)throw Error(`ceil_mode output-shape is computed, but ceil_mode kernel execution (padding/divisor) is not yet implemented in the WebGPU AveragePool kernel`);let r={countIncludePad:t,...n,cacheKey:``};return{...r,cacheKey:Nl(r)}},Rl=(e,t)=>{Ol(e.inputs),e.compute(Il(`AveragePool`,e.inputs[0],!1,t))},zl={autoPad:``,ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Bl=e=>{let t=e.format;return{format:t,...zl,cacheKey:t}},Vl=(e,t)=>{Ol(e.inputs),e.compute(Il(`GlobalAveragePool`,e.inputs[0],!0,t))},Hl=(e,t,n,r)=>{let[i,a]=kl(t,r,n),o=q(`x`,t.dataType,t.dims.length),s=[`rank`],[c,l,u,d,f]=Al(a,i);return c.push(...G(t.dims,a)),{name:e,shaderCache:{hint:`${r.cacheKey};${u};${d};${f}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(H.size(a)/64)},programUniforms:c}),getShaderSource:e=>jl(e,o,t.dims.length,a.length,i,`
      value = max(x_val, value);
    `,``,t.dataType===10?-65504:-1e5,l,u,d,f)}},Ul=(e,t)=>{Ol(e.inputs),e.compute(Hl(`MaxPool`,e.inputs[0],!1,t))},Wl=e=>{let t=e.storage_order,n=e.dilations,r=Fl(e);if(t!==0)throw Error(`column major storage order is not yet supported for MaxPool`);if(r.ceilMode!==0)throw Error(`ceil_mode output-shape is computed, but ceil_mode kernel execution (padding) is not yet implemented in the WebGPU MaxPool kernel`);let i={storageOrder:t,dilations:n,...r,cacheKey:``};return{...i,cacheKey:Pl(i)}},Gl=e=>{let t=e.format;return{format:t,...zl,cacheKey:t}},Kl=(e,t)=>{Ol(e.inputs),e.compute(Hl(`GlobalMaxPool`,e.inputs[0],!0,t))}}),Jl,Yl,Xl,Zl,Ql=w(()=>{B(),U(),Hn(),Y(),Jl=(e,t)=>{if(e.length<2||e.length>3)throw Error(`DequantizeLinear requires 2 or 3 inputs.`);if(e.length===3&&e[1].dims===e[2].dims)throw Error(`x-scale and x-zero-point must have the same shape.`);if(e.length===3&&e[0].dataType!==e[2].dataType)throw Error(`x and x-zero-point must have the same data type.`);if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw Error(`scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.`);if(e.length>2){if(e[0].dataType!==e[2].dataType)throw Error(`x and x-zero-point must have the same data type.`);if(e[1].dims.length!==e[2].dims.length)throw Error(`scale and zero-point inputs must have the same rank.`);if(!e[1].dims.map((t,n)=>t===e[2].dims[n]).reduce((e,t)=>e&&t,!0))throw Error(`scale and zero-point inputs must have the same shape.`)}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw Error(`blockSize must be set only for block quantization.`);if(!e[1].dims.map((n,r)=>r===t.axis||n===e[0].dims[r]).reduce((e,t)=>e&&t,!0))throw Error(`For block qunatization, scale input shape to match the input shape except for the axis`);if(e[1].dims.length!==e[0].dims.length)throw Error(`For block qunatization the scale input rank must be the same as the x rank.`);let n=e[0].dims[t.axis],r=e[1].dims[t.axis];if(t.blockSize<Math.ceil(n/r)||t.blockSize>Math.ceil(n/(r-1)-1))throw Error(`blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].`)}},Yl=(e,t)=>{let n=H.normalizeAxis(t.axis,e[0].dims.length),r=e[0].dataType,i=r===3,a=e[0].dims,o=e[1].dataType,s=H.size(a),c=r===3||r===2,l=c?[Math.ceil(H.size(e[0].dims)/4)]:e[0].dims,u=e[1].dims,d=e.length>2?e[2]:void 0,f=d?c?[Math.ceil(H.size(d.dims)/4)]:d.dims:void 0,p=u.length===0||u.length===1&&u[0]===1,m=p===!1&&u.length===1,h=qn(s),g=p&&(!c||h===4),_=g?h:1,v=g&&!c?h:1,y=q(`input`,c?12:r,l.length,v),b=q(`scale`,o,u.length),x=d?q(`zero_point`,c?12:r,f.length):void 0,S=J(`output`,o,a.length,_),C=[y,b];x&&C.push(x);let w=[l,u];d&&w.push(f);let T=[{type:12,data:s/_},{type:12,data:n},{type:12,data:t.blockSize},...G(...w,a)];return{name:`DequantizeLinear`,shaderCache:{hint:t.cacheKey,inputDependencies:x?[`rank`,`rank`,`rank`]:[`rank`,`rank`]},getShaderSource:e=>`
      ${e.registerUniforms([{name:`output_size`,type:`u32`},{name:`axis`,type:`u32`},{name:`block_size`,type:`u32`}]).declareVariables(...C,S)}
      ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
          let output_indices = ${S.offsetToIndices(`global_idx`)};

          // Set input x
          ${c?`
            let input = ${y.getByOffset(`global_idx / 4`)};
            let x_vec = ${i?`unpack4xI8(input)`:`unpack4xU8(input)`};
            let x_value = ${_===1?`x_vec[global_idx % 4]`:`x_vec`};`:`let x_value = ${y.getByOffset(`global_idx`)};`};

          // Set scale input
          ${p?`let scale_value= ${b.getByOffset(`0`)}`:m?`
            let scale_index = ${S.indicesGet(`output_indices`,`uniforms.axis`)};
            let scale_value= ${b.getByOffset(`scale_index`)};`:`
            var scale_indices: ${b.type.indices} = output_indices;
            let index = ${b.indicesGet(`scale_indices`,`uniforms.axis`)} / uniforms.block_size;
            ${b.indicesSet(`scale_indices`,`uniforms.axis`,`index`)};
            let scale_value= ${b.getByIndices(`scale_indices`)};`};

          // Set zero-point input
          ${x?p?c?`
                let zero_point_input = ${x.getByOffset(`0`)};
                let zero_point_vec =  ${i?`unpack4xI8(zero_point_input)`:`unpack4xU8(zero_point_input)`};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${x.getByOffset(`0`)}`:m?c?`
                let zero_point_index = ${S.indicesGet(`output_indices`,`uniforms.axis`)};
                let zero_point_input = ${x.getByOffset(`zero_point_index / 4`)};
                let zero_point_vec =  ${i?`unpack4xI8(zero_point_input)`:`unpack4xU8(zero_point_input)`};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${S.indicesGet(`output_indices`,`uniforms.axis`)};
                let zero_point_value = ${x.getByOffset(`zero_point_index`)};`:c?`
                let zero_point_offset = ${b.indicesToOffset(`scale_indices`)};
                let zero_point_input = ${x.getByOffset(`zero_point_offset / 4`)};
                let zero_point_vec = ${i?`unpack4xI8(zero_point_input)`:`unpack4xU8(zero_point_input)`};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${x.getByIndices(`scale_indices`)};`:`let zero_point_value = ${c?i?`i32`:`u32`:y.type.value}(0);`};
      // Compute and write output
      ${S.setByOffset(`global_idx`,`${S.type.value}(x_value - zero_point_value) * scale_value`)};
      }`,getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/_/64),y:1,z:1},programUniforms:T})}},Xl=(e,t)=>{Jl(e.inputs,t),e.compute(Yl(e.inputs,t))},Zl=e=>W({axis:e.axis,blockSize:e.blockSize})}),$l,eu,tu,nu=w(()=>{qe(),B(),Y(),$l=(e,t,n)=>{if(e===t||e<t&&n<0||e>t&&n>0)throw Error(`Range these inputs' contents are invalid.`)},eu=(e,t,n,r)=>{let i=Math.abs(Math.ceil((t-e)/n)),a=[i],o=i,s=[{type:12,data:o},{type:r,data:e},{type:r,data:n},...G(a)];return{name:`Range`,shaderCache:{hint:`${r}`},getShaderSource:e=>{let t=J(`output`,r,a.length),n=t.type.value,i=[{name:`outputSize`,type:`u32`},{name:`start`,type:n},{name:`delta`,type:n}];return`
        ${e.registerUniforms(i).declareVariables(t)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}
        output[global_idx] = uniforms.start + ${n}(global_idx) * uniforms.delta;
      }`},getRunData:()=>({outputs:[{dims:a,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:s})}},tu=e=>{let t=0,n=0,r=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],n=e.inputs[1].getInt32Array()[0],r=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],n=e.inputs[1].getFloat32Array()[0],r=e.inputs[2].getFloat32Array()[0]),R.webgpu.validateInputContent&&$l(t,n,r),e.compute(eu(t,n,r,e.inputs[0].dataType),{inputs:[]})}}),ru,iu,au,ou,su=w(()=>{B(),U(),Hn(),Y(),ru=(e,t,n,r)=>{if(e!==`none`&&r!==`i32`&&r!==`u32`&&r!==`f32`)throw Error(`Input ${r} is not supported with reduction ${e}.`);let i=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,a=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case`none`:return`${t}=${n};`;case`add`:return r===`i32`||r===`u32`?`atomicAdd(&${t}, bitcast<${r}>(${n}));`:`
              ${i}bitcast<${r}>(oldValue) + (${n})${a}`;case`max`:return r===`i32`||r===`u32`?`atomicMax(&${t}, bitcast<${r}>(${n}));`:`
                ${i}max(bitcast<f32>(oldValue), (${n}))${a}`;case`min`:return r===`i32`||r===`u32`?`atomicMin(&${t}, bitcast<${r}>(${n}));`:`${i}min(bitcast<${r}>(oldValue), (${n}))${a}`;case`mul`:return`${i}(bitcast<${r}>(oldValue) * (${n}))${a}`;default:throw Error(`Reduction ${e} is not supported.`)}},iu=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n,a=Math.ceil(H.sizeToDimension(r,r.length-1)/1),o=r[r.length-1],s=H.sizeFromDimension(n,o),c=[{type:12,data:a},{type:12,data:o},{type:12,data:s},...G(e[1].dims,e[2].dims,i)];return{name:`ScatterND`,shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:[`rank`,`rank`]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}),getShaderSource:n=>{let r=q(`indices`,e[1].dataType,e[1].dims.length),a=q(`updates`,e[2].dataType,e[2].dims.length,1),o=t.reduction!==`none`&&t.reduction!==``?Qn(`output`,e[0].dataType,i.length):J(`output`,e[0].dataType,i.length,1);return`
      ${n.registerUniform(`output_size`,`u32`).registerUniform(`last_index_dimension`,`u32`).registerUniform(`num_updates_elements`,`u32`).declareVariables(r,a,o)}
      ${n.mainStart()}
        ${n.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${ru(t.reduction,`output[data_offset + i]`,`value`,o.type.value)}
  }

      }`}}},au=e=>W({reduction:e.reduction}),ou=(e,t)=>{e.compute(iu(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),cu,lu,uu,du,fu,pu,mu,hu,gu,_u,vu,yu,bu,xu,Su,Cu,wu,Tu,Eu,Du,Ou=w(()=>{B(),U(),Hn(),Y(),cu=(e,t)=>{if(e.every(e=>e>0||(()=>{throw Error(`Resize requires scales input values to be positive`)})),e.length>0){if(t.mode===`linear`){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode===`cubic`&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw Error(`Resize requires scales input size to be 2 or 4 for cubic mode`)}},lu=(e,t,n)=>{t.every(e=>e>=0&&e<n||(()=>{throw Error(`Resize requires axes input values to be positive and less than rank`)}));let r=Array(n).fill(1);return t.forEach((t,n)=>r[t]=e[n]),r},uu=(e,t,n,r,i,a)=>{let[o,s,c]=n>10?[1,2,3]:[-1,e.length>1?1:-1,-1],l=e[0].dims.length;if(o>0&&e.length>o&&e[o].dims.length>0)e[o].getFloat32Array().forEach(e=>a.push(e));else if(t.coordinateTransformMode===`tf_crop_and_resize`)throw Error(`Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize`);if(s>0&&e.length>s&&e[s].dims.length===1&&e[s].dims[0]>0){if(e[s].getFloat32Array().forEach(e=>r.push(e)),r.length!==0&&r.length!==l&&n>=18&&r.length!==t.axes.length)throw Error(`Resize requires scales input size to be same as input rank or axes size for opset 18 and up`);cu(r,t),t.axes.length>0&&lu(r,t.axes,l).forEach((e,t)=>r[t]=e)}if(c>0&&e.length>c&&e[c].dims.length===1&&e[c].dims[0]>0&&(e[c].getBigInt64Array().forEach(e=>i.push(Number(e))),i.length!==0&&i.length!==l&&n>=18&&i.length!==t.axes.length))throw Error(`Resize requires sizes input size to be same as input rank or axes size for opset 18 and up`);if(t.axes.length>0){if(r.length!==0&&r.length!==t.axes.length)throw Error(`Resize requires "scales" input size to be of axes rank when axes attributes is specified`);if(i.length!==0&&i.length!==t.axes.length)throw Error(`Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified`)}if(typeof r<`u`&&typeof i<`u`&&r.length>0&&i.length>l)throw Error(`Resize requires only of scales or sizes to be specified`)},du=(e,t,n,r)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${r}(big / (${n}));
  let fract = ${r}(big % (${n})) / ${r}(${n});
  return whole + fract;
`,fu=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case`asymmetric`:return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${du(`xResized`,`lengthOriginal`,`lengthResized`,t)}
          }
        `;case`pytorch_half_pixel`:return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case`tf_half_pixel_for_nn`:return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case`align_corners`:return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${du(`xResized`,`lengthOriginal - 1`,`lengthResized - 1`,t)}
                  }`;case`tf_crop_and_resize`:return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case`half_pixel_symmetric`:return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case`half_pixel`:return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw Error(`Coordinate transform mode ${e} is not supported`)}})()+`}`,pu=(e,t,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(e){case`round_prefer_ceil`:return`if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }`;case`floor`:return`return floor(xOriginal);`;case`ceil`:return`return ceil(xOriginal);`;case`round_prefer_floor`:return`if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }`;default:if(t<11)return`if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }`;throw Error(`Nearest mode ${e} is not supported`)}})()+`}`,mu=(e,t,n)=>{let r=Array(n).fill(0).concat(Array(n).fill(1)),i=e.length===0?r:e.slice();return t.length>0?(t.forEach((e,a)=>{r[e]=i[a],r[a+n]=i[t.length+a]}),r):i},hu=(e,t,n,r)=>{let i=[];if(n.length>0){if(r.length>0){if(e.forEach(e=>i.push(e)),Math.max(...r)>e.length)throw Error(`axes is out of bound`);r.forEach((e,t)=>i[e]=n[t])}else n.forEach(e=>i.push(e))}else{if(t.length===0)throw Error(`Resize requires either scales or sizes.`);i=e.map((e,n)=>Math.round(e*t[n]))}return i},gu=(e,t,n)=>{let r=(()=>{switch(n.keepAspectRatioPolicy){case`not_larger`:return n.axes.length>0?Math.min(...n.axes.map(e=>t[e]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case`not_smaller`:return n.axes.length>0?Math.max(...n.axes.map(e=>t[e]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let i=e.slice();return n.axes.length>0?(n.axes.forEach(e=>t[e]=r),n.axes.forEach(n=>i[n]=Math.round(e[n]*t[n]))):(t.fill(r,0,t.length),i.forEach((e,n)=>i[n]=Math.round(e*t[n]))),i},_u=(e,t,n,r,i)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${n.length}> {
      var original_indices: array<${e.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet(`output_indices`,`i`)};
        var scale = ${K(`uniforms.scales`,`i`,r)};
        var roi_low = ${K(`uniforms.roi`,`i`,i)};
        var roi_hi = ${K(`uniforms.roi`,`i + ${t.length}`,i)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${K(`uniforms.input_shape`,`i`,t.length)};
          var output_shape_i = ${K(`uniforms.output_shape`,`i`,n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,vu=(e,t,n,r,i,a,o)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet(`output_indices`,`i`)};
        var input_index: u32;
        var scale = ${K(`uniforms.scales`,`i`,i)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${K(`uniforms.roi`,`i`,a)};
          var roi_hi = ${K(`uniforms.roi`,`i + ${n.length}`,a)};
          var input_shape_i = ${K(`uniforms.input_shape`,`i`,n.length)};
          var output_shape_i = ${K(`uniforms.output_shape`,`i`,r.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${o} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet(`input_indices`,`i`,`input_index`)}
      }
      return input_indices;
    }`,yu=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet(`input_indices`,`i`)};
        if (input_index < 0 || input_index >= ${K(`uniforms.input_shape`,`i`,t.length)}) {
          return false;
        }
      }
      return true;
    }`,bu=(e,t,n,r)=>e.rank>r?`
    ${e.indicesSet(`input_indices`,t,`channel`)};
    ${e.indicesSet(`input_indices`,n,`batch`)};
`:``,xu=(e,t,n,r,i)=>{let[a,o,s,c]=n.length===2?[-1,0,1,-1]:[0,2,3,1],l=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${l} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet(`input_indices`,o,`max(0, min(row, ${n[o]} - 1))`)};
      ${e.indicesSet(`input_indices`,s,`max(0, min(col, ${n[s]} - 1))`)};
      ${bu(e,c,a,2)}
      return ${e.getByIndices(`input_indices`)};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${l} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${l} = originalIndices[${o}];
      var col:${l} = originalIndices[${s}];
      ${r?`if (row < 0 || row > (${n[o]} - 1) || col < 0 || col > (${n[s]} - 1)) {
        return ${i};
      }`:``};
      row = max(0, min(row, ${n[o]} - 1));
      col = max(0, min(col, ${n[s]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length>2?`u32(originalIndices[${c}])`:`0`};
      var batch: u32 =  ${n.length>2?`u32(originalIndices[${a}])`:`0`};
      var x11: ${l} = getInputValue(batch, channel, row1, col1);
      var x12: ${l} = getInputValue(batch, channel, row1, col2);
      var x21: ${l} = getInputValue(batch, channel, row2, col1);
      var x22: ${l} = getInputValue(batch, channel, row2, col2);
      var dx1: ${l} = abs(row - ${l}(row1));
      var dx2: ${l} = abs(${l}(row2) - row);
      var dy1: ${l} = abs(col - ${l}(col1));
      var dy2: ${l} = abs(${l}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Su=(e,t,n,r,i,a,o,s,c,l)=>{let[u,d]=n.length===2?[0,1]:[2,3],f=e.type.value,p=o=>{let d=o===u?`row`:`col`;return`
      fn ${d}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${f} {
        var output_index = ${t.indicesGet(`output_indices`,o)};
        var originalIdx: ${f} = getOriginalCoordinateFromResizedCoordinate(output_index, ${i[o]},
        ${r[o]}, ${n[o]}, ${a[o]}, ${a[o]} + ${n.length});
        var fractOriginalIdx: ${f} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${s} && (originalIdx < 0 || originalIdx > (${n[o]} - 1))) {
          return ${c};
        }
        var data: array<${f}, 4> = array<${f}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${d}: ${f} = originalIdx + ${f}(i);
          if (${d} < 0 || ${d} >= ${n[o]}) {
            ${l?`coefs[i + 1] = 0.0;
                        continue;`:s?`return ${c};`:`${d} = max(0, min(${d}, ${n[o]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet(`input_indices_copy`,o,`u32(${d})`)};
          data[i + 1] = ${o===u?e.getByIndices(`input_indices_copy`):`rowCubicInterpolation(input_indices_copy, output_indices)`};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${p(u)};
    ${p(d)};
  fn getCubicInterpolationCoefs(s: ${f}) -> array<${f}, 4> {
    var absS = abs(s);
    var coeffs: array<${f}, 4> = array<${f}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${f} = 1.0 - absS;
    var twoMinusAbsS: ${f} = 2.0 - absS;
    var onePlusAbsS: ${f} = 1.0 + absS;
    coeffs[0] = ((${o} * onePlusAbsS - 5 * ${o}) * onePlusAbsS + 8 * ${o}) * onePlusAbsS - 4 * ${o};
    coeffs[1] = ((${o} + 2) * absS - (${o} + 3)) * absS * absS + 1;
    coeffs[2] = ((${o} + 2) * oneMinusAbsS - (${o} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${o} * twoMinusAbsS - 5 * ${o}) * twoMinusAbsS + 8 * ${o}) * twoMinusAbsS - 4 * ${o};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${f}, 4>, coefs: array<${f}, 4>) -> ${f} {
    var coefsSum: ${f} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${f} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Cu=(e,t,n,r,i)=>{let[a,o,s,c,l]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],u=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${u} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet(`input_indices`,o,`max(0, min(depth, ${n[o]} - 1))`)};
      ${e.indicesSet(`input_indices`,s,`max(0, min(height, ${n[s]} - 1))`)};
      ${e.indicesSet(`input_indices`,c,`max(0, min(width, ${n[c]} - 1))`)};
      ${bu(e,l,a,3)}
      return ${e.getByIndices(`input_indices`)};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${u} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${u} = originalIndices[${o}];
      var height:${u} = originalIndices[${s}];
      var width:${u} = originalIndices[${c}];
      ${r?`if (depth < 0 || depth > (${n[o]} - 1) || height < 0 || height > (${n[s]} - 1) || width < 0 || (width > ${n[c]} - 1)) {
      return ${i};
        }`:``};

    depth = max(0, min(depth, ${n[o]} - 1));
      height = max(0, min(height, ${n[s]} - 1));
      width = max(0, min(width, ${n[c]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length>3?`u32(originalIndices[${l}])`:`0`};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${a}])`:`0`};

      var x111: ${u} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${u} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${u} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${u} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${u} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${u} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${u} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${u} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${u} = abs(depth - ${u}(depth1));
      var dx2: ${u} = abs(${u}(depth2) - depth);
      var dy1: ${u} = abs(height - ${u}(height1));
      var dy2: ${u} = abs(${u}(height2) - height);
      var dz1: ${u} = abs(width - ${u}(width1));
      var dz2: ${u} = abs(${u}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},wu=(e,t,n,r,i,a)=>{let o=e.dims,s=mu(a,t.axes,o.length),c=hu(o,r,i,t.axes),l=r.slice();r.length===0&&(l=o.map((e,t)=>e===0?1:c[t]/e),t.keepAspectRatioPolicy!==`stretch`&&(c=gu(o,l,t)));let u=J(`output`,e.dataType,c.length),d=q(`input`,e.dataType,o.length),f=H.size(c),p=o.length===c.length&&o.every((e,t)=>e===c[t]),m=t.coordinateTransformMode===`tf_crop_and_resize`,h=t.extrapolationValue,g=d.type.value;return{name:`Resize`,shaderCache:{hint:`${t.cacheKey}|${n}|${l.length>0?t.mode===`cubic`?l:l.length:``}|${i.length>0?i:``}|${s.length>0?s:``}|${p}|${t.mode===`nearest`?o.length:o}`,inputDependencies:[`rank`]},getShaderSource:e=>`
      ${p?``:`
      ${fu(t.coordinateTransformMode,g)};
      ${(()=>{switch(t.mode){case`nearest`:return`
              ${yu(d,o)};
              ${pu(t.nearestMode,n,g)};
              ${vu(d,u,o,c,l.length,s.length,m)};
              `;case`linear`:return`
              ${_u(u,o,c,l.length,s.length)};
              ${(()=>{if(o.length===2||o.length===4)return`${xu(d,u,o,m,h)}`;if(o.length===3||o.length===5)return`${Cu(d,u,o,m,h)}`;throw Error(`Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.`)})()};
            `;case`cubic`:return`
            ${(()=>{if(o.length===2||o.length===4)return`${Su(d,u,o,c,l,s,t.cubicCoeffA,m,t.extrapolationValue,t.excludeOutside)}`;throw Error(`Cubic mode only supports input dims 2 and 4 are supported in linear mode.`)})()};
            `;default:throw Error(`Invalid resize mode`)}})()};
      `}
      ${e.registerUniform(`output_size`,`u32`).registerUniform(`scales`,`f32`,l.length).registerUniform(`roi`,`f32`,s.length).declareVariables(d,u)}
      ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
        ${p?`output[global_idx] = input[global_idx];`:`
        let output_indices = ${u.offsetToIndices(`global_idx`)};
        var input_indices: ${d.type.indices};
        ${(()=>{switch(t.mode){case`nearest`:return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${d.getByIndices(`input_indices`)};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case`linear`:return`output[global_idx] = ${o.length===2||o.length===4?`bilinearInterpolation`:`trilinearInterpolation`}(output_indices);`;case`cubic`:return`output[global_idx] = bicubicInterpolation(output_indices);`;default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`,getRunData:()=>({outputs:[{dims:c,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},{type:1,data:l},{type:1,data:s},...G(o,c)]})}},Tu=e=>{let t=e.customDataBuffer;return new Uint32Array(t.buffer,t.byteOffset,1)[0]},Eu=(e,t)=>{let n=[],r=[],i=[],a=Tu(e);if(t.antialias!==0)throw Error(`Only default value (0) for Antialias attribute is supported`);uu(e.inputs,t,a,n,r,i),e.compute(wu(e.inputs[0],t,a,n,r,i),{inputs:[0]})},Du=e=>{let t=e.antialias,n=e.axes,r=e.coordinateTransformMode,i=e.cubicCoeffA,a=e.excludeOutside!==0,o=e.extrapolationValue,s=e.keepAspectRatioPolicy,c=e.mode,l=e.nearestMode===``?`simple`:e.nearestMode;return W({antialias:t,axes:n,coordinateTransformMode:r,cubicCoeffA:i,excludeOutside:a,extrapolationValue:o,keepAspectRatioPolicy:s,mode:c,nearestMode:l})}}),ku,Au,ju,Mu=w(()=>{B(),U(),Y(),ku=e=>{if(!e||e.length<3)throw Error(`layerNorm requires at least 3 inputs.`);let t=e[0],n=e[1],r=e[2];if(t.dataType!==n.dataType||t.dataType!==r.dataType)throw Error(`All inputs must have the same data type`);if(t.dims.length!==3&&t.dims.length!==2)throw Error(`Input must be 2D or 3D`);if(n.dims.length!==3&&n.dims.length!==2)throw Error(`Skip must be 2D or 3D`);let i=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(n.dims[n.dims.length-1]!==i)throw Error(`Skip must have the same hidden size as input`);if(n.dims[n.dims.length-2]!==a)throw Error(`Skip must have the same sequence length as input`);if(r.dims.length!==1)throw Error(`Gamma must be 1D`);if(r.dims[r.dims.length-1]!==i)throw Error(`Gamma must have the same hidden size as input`);if(e.length>3){let t=e[3];if(t.dims.length!==1)throw Error(`Beta must be 1D`);if(t.dims[t.dims.length-1]!==i)throw Error(`Beta must have the same hidden size as input`)}if(e.length>4){let t=e[4];if(t.dims.length!==1)throw Error(`Bias must be 1D`);if(t.dims[t.dims.length-1]!==i)throw Error(`Bias must have the same hidden size as input`)}},Au=(e,t,n,r)=>{let i=t.simplified,a=e[0].dims,o=H.size(a),s=a,c=o,l=a.slice(-1)[0],u=r?a.slice(0,-1).concat(1):[],d=!i&&e.length>3,f=e.length>4,p=r&&n>1,m=r&&n>2,h=n>3,g=qn(l),_=[{type:12,data:c},{type:12,data:g},{type:12,data:l},{type:1,data:t.epsilon}],v=t=>{let n=[{name:`output_size`,type:`u32`},{name:`components`,type:`u32`},{name:`hidden_size`,type:`u32`},{name:`epsilon`,type:`f32`}],r=[q(`x`,e[0].dataType,e[0].dims,g),q(`skip`,e[1].dataType,e[1].dims,g),q(`gamma`,e[2].dataType,e[2].dims,g)];d&&r.push(q(`beta`,e[3].dataType,e[3].dims,g)),f&&r.push(q(`bias`,e[4].dataType,e[4].dims,g)),r.push(J(`output`,e[0].dataType,s,g)),p&&r.push(J(`mean_output`,1,u)),m&&r.push(J(`inv_std_output`,1,u)),h&&r.push(J(`input_skip_bias_sum`,e[0].dataType,s,g));let a=Gn(e[0].dataType),o=Gn(1,g);return`

      ${t.registerUniforms(n).declareVariables(...r)}
      var<workgroup> sum_shared : array<${o}, 64>;
      var<workgroup> sum_squared_shared : array<${o}, 64>;

      ${t.mainStart([64,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / 64;

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / 64;
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == 63) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${f?`bias[offset1d + i]`:a+`(0.0)`};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${h?`input_skip_bias_sum[offset + i] = value;`:``}
          output[offset + i] = value;
          let f32_value = ${Yn(a,g,`value`)};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = 64;
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${Xn(`sum`,g)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Xn(`square_sum`,g)} / f32(uniforms.hidden_size) ${i?``:`- mean * mean`} + uniforms.epsilon);
        ${p?`mean_output[global_idx] = mean;`:``}
        ${m?`inv_std_output[global_idx] = inv_std_dev;`:``}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${i?``:`- ${a}(mean)`}) *
            ${a}(inv_std_dev) * gamma[offset1d + i]
            ${d?`+ beta[offset1d + i]`:``};
        }
      }`},y=[{dims:s,dataType:e[0].dataType}];return n>1&&y.push({dims:u,dataType:1}),n>2&&y.push({dims:u,dataType:1}),n>3&&y.push({dims:a,dataType:e[0].dataType}),{name:`SkipLayerNormalization`,shaderCache:{hint:`${g};${p};${m};${h}`,inputDependencies:e.map((e,t)=>`type`)},getShaderSource:v,getRunData:()=>({outputs:y,dispatchGroup:{x:Math.ceil(c/l)},programUniforms:_})}},ju=(e,t)=>{ku(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(Au(e.inputs,t,e.outputCount,!1),{outputs:n})}}),Nu,Pu,Fu,Iu,Lu,Ru,zu,Bu,Vu=w(()=>{B(),U(),Hn(),Y(),Nu=(e,t)=>{if(!e||e.length<1)throw Error(`too few inputs`);if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw Error(`axes, starts and ends must have the same length`)}else if(t.starts.length!==t.ends.length)throw Error(`starts and ends must have the same length`);e.slice(1).forEach((t,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw Error(`Input ${n} must be an array of int32 or int64`)})},Pu=(e,t)=>{let n=[];if(e.length>t){if(e[t].dataType===7)e[t].getBigInt64Array().forEach(e=>n.push(Number(e)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(e=>n.push(Number(e)));else throw Error(`Input ${t} must be an array of int32 or int64`)}return n},Fu=(e,t)=>{if(e.length>1){let t=Pu(e,1),n=Pu(e,2),r=Pu(e,3);return r.length===0&&(r=[...Array(e[0].dims.length).keys()]),W({starts:t,ends:n,axes:r})}return t},Iu=(e,t,n,r,i)=>{let a=e;return e<0&&(a+=n[r[t]]),i[t]<0?Math.max(0,Math.min(a,n[r[t]]-1)):Math.max(0,Math.min(a,n[r[t]]))},Lu=(e,t,n)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${n.length-1}; i >= 0; i--) {
            let input_shape_i = ${K(`uniforms.input_shape`,`i`,n.length)};
            let steps_i = ${K(`uniforms.steps`,`i`,n.length)};
            let signs_i = ${K(`uniforms.signs`,`i`,n.length)};
            let starts_i = ${K(`uniforms.starts`,`i`,n.length)};
            var output_index = ${t.indicesGet(`output_indices`,`i`)};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet(`input_indices`,`i`,`input_index`)};
          }
          return input_indices;
      }`,Ru=(e,t)=>{let n=e[0].dims,r=H.size(n),i=t.axes.length>0?H.normalizeAxes(t.axes,n.length):[...Array(n.length).keys()],a=Pu(e,4);a.forEach(e=>e!==0||(()=>{throw Error(`step cannot be 0`)})),a.length===0&&(a=Array(i.length).fill(1));let o=t.starts.map((e,t)=>Iu(e,t,n,i,a)),s=t.ends.map((e,t)=>Iu(e,t,n,i,a));if(i.length!==o.length||i.length!==s.length)throw Error(`start, ends and axes should have the same number of elements`);if(i.length!==n.length)for(let e=0;e<n.length;++e)i.includes(e)||(o.splice(e,0,0),s.splice(e,0,n[e]),a.splice(e,0,1));let c=a.map(e=>Math.sign(e));a.forEach((e,t,n)=>{if(e<0){let r=(s[t]-o[t])/e,i=o[t],c=i+r*a[t];o[t]=c,s[t]=i,n[t]=-e}});let l=n.slice(0);i.forEach((e,t)=>{l[e]=Math.ceil((s[e]-o[e])/a[e])});let u={dims:l,dataType:e[0].dataType},d=J(`output`,e[0].dataType,l.length),f=q(`input`,e[0].dataType,e[0].dims.length),p=H.size(l),m=[{name:`outputSize`,type:`u32`},{name:`starts`,type:`u32`,length:o.length},{name:`signs`,type:`i32`,length:c.length},{name:`steps`,type:`u32`,length:a.length}],h=[{type:12,data:p},{type:12,data:o},{type:6,data:c},{type:12,data:a},...G(e[0].dims,l)];return{name:`Slice`,shaderCache:{hint:`${c.length}_${o.length}_${a.length}`,inputDependencies:[`rank`]},getShaderSource:e=>`
      ${e.registerUniforms(m).declareVariables(f,d)}
        ${Lu(f,d,n)}
        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}
          let output_indices = ${d.offsetToIndices(`global_idx`)};
          let input_indices = calculateInputIndices(output_indices);
          ${d.setByOffset(`global_idx`,f.getByIndices(`input_indices`))}
      }`,getRunData:()=>({outputs:[u],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:h})}},zu=(e,t)=>{Nu(e.inputs,t);let n=Fu(e.inputs,t);e.compute(Ru(e.inputs,n),{inputs:[0]})},Bu=e=>{let t=e.starts,n=e.ends,r=e.axes;return W({starts:t,ends:n,axes:r})}}),Hu,Uu,Wu,Gu,Ku=w(()=>{B(),U(),Hn(),dr(),Y(),Hu=e=>{if(!e||e.length!==1)throw Error(`Softmax op requires 1 input.`)},Uu=(e,t)=>{let n=e.inputs[0],r=n.dims,i=H.size(r),a=r.length,o=H.normalizeAxis(t.axis,a),s=o<r.length-1,c,l=[];s?(l=Array.from({length:a},(e,t)=>t),l[o]=a-1,l[a-1]=o,c=e.compute(cr(n,l),{inputs:[n],outputs:[-1]})[0]):c=n;let u=c.dims,d=u[a-1],f=i/d,p=qn(d),m=d/p,h=64;f===1&&(h=256);let g=(e,t)=>t===4?`max(max(${e}.x, ${e}.y), max(${e}.z, ${e}.w))`:t===2?`max(${e}.x, ${e}.y)`:t===3?`max(max(${e}.x, ${e}.y), ${e}.z)`:e,_=q(`x`,c.dataType,c.dims,p),v=J(`result`,c.dataType,c.dims,p),y=_.type.value,b=Gn(c.dataType)===`f32`?`var threadMax = ${y}(-3.4028234663852886e+38f);`:`var threadMax = ${y}(-65504.0h);`,x=e.compute({name:`Softmax`,shaderCache:{hint:`${p};${h}`,inputDependencies:[`type`]},getRunData:()=>({outputs:[{dims:u,dataType:c.dataType}],dispatchGroup:{x:f},programUniforms:[{type:6,data:m}]}),getShaderSource:e=>`
      var<workgroup> rowMaxShared : ${y};
      var<workgroup> rowSumShared : ${y};
      var<workgroup> threadShared : array<${y}, ${h}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${y} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${y}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${e.registerUniform(`packedCols`,`i32`).declareVariables(_,v)}
      ${e.mainStart(h)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${h};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${b}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${y}(${g(`threadShared[0]`,p)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${y}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${y}(${Xn(`threadShared[0]`,p)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${y}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`},{inputs:[c],outputs:[s?-1:0]})[0];s&&e.compute(cr(x,l),{inputs:[x]})},Wu=(e,t)=>{Hu(e.inputs),Uu(e,t)},Gu=e=>W({axis:e.axis})}),qu,Ju,Yu,Xu,Zu,Qu=w(()=>{B(),U(),Y(),qu=e=>Array.from(e.getBigInt64Array(),Number),Ju=e=>{if(!e||e.length!==2)throw Error(`Tile requires 2 inputs.`);if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw Error(`Tile only support float, float16, int32, and uint32 data types`);if(e[1].dataType!==7)throw Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw Error("Tile `repeats` input should be 1-D");if(qu(e[1]).length!==e[0].dims.length)throw Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Yu=(e,t)=>{let n=[];for(let r=0;r<e.length;++r)n.push(e[r]*t[r]);return n},Xu=(e,t)=>{let n=e[0].dims,r=t??qu(e[1]),i=Yu(n,r),a=H.size(i),o=e[0].dataType,s=q(`input`,o,n.length),c=J(`output`,o,i.length);return{name:`Tile`,shaderCache:{hint:`${r}`,inputDependencies:[`rank`]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...G(e[0].dims,i)]}),getShaderSource:e=>`
      const inputShape = ${s.indices(...n)};
      ${e.registerUniform(`output_size`,`u32`).declareVariables(s,c)}
      ${e.mainStart()}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
      let output_indices = ${c.offsetToIndices(`global_idx`)};
      var input_indices: ${s.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${s.indicesGet(`uniforms.input_shape`,`i`)};
        let input_dim_value = ${c.indicesGet(`output_indices`,`i`)}  % input_dim_i;

        ${s.indicesSet(`input_indices`,`i`,`input_dim_value`)}
      }
      ${c.setByOffset(`global_idx`,s.getByIndices(`input_indices`))}
    }`}},Zu=e=>{Ju(e.inputs),e.compute(Xu(e.inputs),{inputs:[0]})}}),$u,ed,td,nd=w(()=>{B(),U(),Y(),$u=(e,t,n,r,i)=>{let a=J(`output_data`,i,n.length,4),o=q(`a_data`,t[1].dataType,t[1].dims.length,4),s=q(`b_data`,t[2].dataType,t[2].dims.length,4),c=q(`c_data`,t[0].dataType,t[0].dims.length,4),l,u=(e,t,n)=>`select(${t}, ${e}, ${n})`;if(!r)l=a.setByOffset(`global_idx`,u(o.getByOffset(`global_idx`),s.getByOffset(`global_idx`),c.getByOffset(`global_idx`)));else{let e=(e,t,n=``)=>{let r=`a_data[index_a${t}][component_a${t}]`,i=`b_data[index_b${t}][component_b${t}]`,l=`bool(c_data[index_c${t}] & (0xffu << (component_c${t} * 8)))`;return`
            let output_indices${t} = ${a.offsetToIndices(`global_idx * 4u + ${t}u`)};
            let offset_a${t} = ${o.broadcastedIndicesToOffset(`output_indices${t}`,a)};
            let offset_b${t} = ${s.broadcastedIndicesToOffset(`output_indices${t}`,a)};
            let offset_c${t} = ${c.broadcastedIndicesToOffset(`output_indices${t}`,a)};
            let index_a${t} = offset_a${t} / 4u;
            let index_b${t} = offset_b${t} / 4u;
            let index_c${t} = offset_c${t} / 4u;
            let component_a${t} = offset_a${t} % 4u;
            let component_b${t} = offset_b${t} % 4u;
            let component_c${t} = offset_c${t} % 4u;
            ${e}[${t}] = ${n}(${u(r,i,l)});
          `};l=i===9?`
            var data = vec4<u32>(0);
            ${e(`data`,0,`u32`)}
            ${e(`data`,1,`u32`)}
            ${e(`data`,2,`u32`)}
            ${e(`data`,3,`u32`)}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:`
            ${e(`output_data[global_idx]`,0)}
            ${e(`output_data[global_idx]`,1)}
            ${e(`output_data[global_idx]`,2)}
            ${e(`output_data[global_idx]`,3)}
          `}return`
        ${e.registerUniform(`vec_size`,`u32`).declareVariables(c,o,s,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.vec_size`)}
        ${l}
      }`},ed=e=>{let t=e[1].dims,n=e[2].dims,r=e[0].dims,i=e[1].dataType,a=!(H.areEqual(t,n)&&H.areEqual(n,r)),o=t,s=H.size(t);if(a){let e=sn.calcShape(sn.calcShape(t,n,!1),r,!1);if(!e)throw Error(`Can't perform where op on the given tensors`);o=e,s=H.size(o)}let c=Math.ceil(s/4);return{name:`Where`,shaderCache:{inputDependencies:[`rank`,`rank`,`rank`]},getShaderSource:t=>$u(t,e,o,a,i),getRunData:()=>({outputs:[{dims:o,dataType:i}],dispatchGroup:{x:Math.ceil(s/64/4)},programUniforms:[{type:12,data:c},...G(r,t,n,o)]})}},td=e=>{e.compute(ed(e.inputs))}}),rd,id=w(()=>{ci(),_i(),Si(),Ei(),Sa(),Ia(),Va(),Fo(),qo(),Zo(),rs(),xs(),Ns(),zs(),Hs(),qs(),Zs(),nc(),sc(),fc(),Dc(),$c(),il(),cl(),dl(),_l(),Fc(),Dl(),ql(),Ql(),nu(),su(),ri(),Ou(),qc(),Mu(),Vu(),Ku(),Uc(),Qu(),dr(),va(),nd(),rd=new Map([[`Abs`,[Oi]],[`Acos`,[ki]],[`Acosh`,[Ai]],[`Add`,[Ea]],[`ArgMax`,[oi,si]],[`ArgMin`,[ai,si]],[`Asin`,[ji]],[`Asinh`,[Mi]],[`Atan`,[Ni]],[`Atanh`,[Pi]],[`Attention`,[gi]],[`AveragePool`,[Rl,Ll]],[`BatchNormalization`,[xi]],[`BiasAdd`,[Ti]],[`BiasSplitGelu`,[xa]],[`Cast`,[Ii,Fi]],[`Ceil`,[zi]],[`Clip`,[Ri]],[`Concat`,[za,Ba]],[`Conv`,[Po,Ao]],[`ConvTranspose`,[Ko,Ho]],[`Cos`,[Bi]],[`Cosh`,[Vi]],[`CumSum`,[Yo,Xo]],[`DepthToSpace`,[ts,ns]],[`DequantizeLinear`,[Xl,Zl]],[`DFT`,[ys,bs]],[`Div`,[Da]],[`Einsum`,[js,Ms]],[`Elu`,[Ui,Hi]],[`Equal`,[Oa]],[`Erf`,[Gi]],[`Exp`,[Ki]],[`Expand`,[Rs]],[`FastGelu`,[Vs]],[`Floor`,[qi]],[`FusedConv`,[Po,Ao]],[`Gather`,[Ks,Gs]],[`GatherElements`,[oc,ac]],[`GatherBlockQuantized`,[ec,tc]],[`GatherND`,[Ys,Xs]],[`Gelu`,[Ji]],[`Gemm`,[dc,uc]],[`GlobalAveragePool`,[Vl,Bl]],[`GlobalMaxPool`,[Kl,Gl]],[`Greater`,[Ma]],[`GreaterOrEqual`,[Pa]],[`GridSample`,[Tc,Ec]],[`GroupQueryAttention`,[Qc]],[`HardSigmoid`,[na,ta]],[`HardSwish`,[ra]],[`InstanceNormalization`,[rl]],[`LayerNormalization`,[sl]],[`LeakyRelu`,[Yi,Hi]],[`Less`,[Na]],[`LessOrEqual`,[Fa]],[`Log`,[ma]],[`MatMul`,[ul]],[`MatMulNBits`,[hl,gl]],[`MaxPool`,[Ul,Wl]],[`Mul`,[ka]],[`MultiHeadAttention`,[Pc,Ac]],[`Neg`,[Zi]],[`Not`,[Xi]],[`Pad`,[El]],[`Pow`,[Aa]],[`QuickGelu`,[_a,Hi]],[`Range`,[tu]],[`Reciprocal`,[Qi]],[`ReduceMin`,[Qr]],[`ReduceMean`,[qr]],[`ReduceMax`,[Zr]],[`ReduceSum`,[ei]],[`ReduceProd`,[$r]],[`ReduceL1`,[Jr]],[`ReduceL2`,[Yr]],[`ReduceLogSum`,[ni]],[`ReduceLogSumExp`,[Xr]],[`ReduceSumSquare`,[ti]],[`Relu`,[$i]],[`Resize`,[Eu,Du]],[`RotaryEmbedding`,[Kc]],[`ScatterND`,[ou,au]],[`Sigmoid`,[ea]],[`Sin`,[ia]],[`Sinh`,[aa]],[`Slice`,[zu,Bu]],[`SkipLayerNormalization`,[ju]],[`Split`,[Vc,Hc]],[`Sqrt`,[oa]],[`Softmax`,[Wu,Gu]],[`Sub`,[ja]],[`Tan`,[sa]],[`Tanh`,[la]],[`ThresholdedRelu`,[pa,Hi]],[`Tile`,[Zu]],[`Transpose`,[lr,ur]],[`Where`,[td]]])}),ad,od=w(()=>{qe(),an(),Y(),ad=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,n,r,i){se(e.programInfo.name);let a=this.backend.device,o=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let s=[];for(let e of t)s.push({binding:s.length,resource:{buffer:e.buffer}});for(let e of n)s.push({binding:s.length,resource:{buffer:e.buffer}});i&&s.push({binding:s.length,resource:i});let c=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:s,label:e.programInfo.name});if(this.backend.sessionStatus===`capturing`){let t={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:c,dispatchGroup:r};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(t)}o.setPipeline(e.computePipeline),o.setBindGroup(0,c),o.dispatchWorkgroups(...r),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType===`at-passes`)&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),ce(e.programInfo.name)}dispose(){}build(e,t){se(e.name);let n=this.backend.device,r=[];[{feature:`shader-f16`,extension:`f16`},{feature:`subgroups`,extension:`subgroups`}].forEach(e=>{n.features.has(e.feature)&&r.push(`enable ${e.extension};`)});let i=tr(t,this.backend.device.limits),a=e.getShaderSource(i),o=`${r.join(`
`)}
${i.additionalImplementations}
${a}`,s=n.createShaderModule({code:o,label:e.name});V(`verbose`,()=>`[WebGPU] ${e.name} shader code: ${o}`);let c=n.createComputePipeline({compute:{module:s,entryPoint:`main`},layout:`auto`,label:e.name});return ce(e.name),{programInfo:e,computePipeline:c,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e==`number`?e:e.x,n=typeof e==`number`?1:e.y||1,r=typeof e==`number`?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=i&&n<=i&&r<=i)return[t,n,r];let a=t*n*r,o=Math.ceil(Math.sqrt(a));if(o>i){if(o=Math.ceil(Math.cbrt(a)),o>i)throw Error(`Total dispatch size exceeds WebGPU maximum.`);return[o,o,o]}return[o,o,1]}}}),sd={};T(sd,{WebGpuBackend:()=>dd});var cd,ld,ud,dd,fd=w(()=>{qe(),B(),an(),pn(),Bn(),id(),od(),cd=(e,t)=>{if(t.length!==e.length)throw Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let n=[];for(let r=0;r<e.length;++r){let i=e[r].dataType;switch(t[r]){case`none`:n.push(``);break;case`type`:n.push(`${i}`);break;case`rank`:{let t=e[r].dims.length;n.push(`${i};${t}`);break}case`dims`:{let t=e[r].dims.join(`,`);n.push(`${i};${t}`);break}default:throw Error(`unsupported input dependency: ${t[r]}`)}}return n.join(`|`)},ld=(e,t,n)=>{let r=e.name;return e.shaderCache?.hint&&(r+=`[`+e.shaderCache.hint+`]`),r+=`:`+n+`:${cd(t,e.shaderCache?.inputDependencies??Array(t.length).fill(`dims`))}`,r},ud=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},dd=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus=`default`,this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw Error(`currentKernelCustomData(): currentKernelId is null. (should not happen)`);let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let n=[],r={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},i=e=>t.features.has(e)&&n.push(e)&&!0;i(`chromium-experimental-timestamp-query-inside-passes`)||i(`timestamp-query`),i(`shader-f16`),i(`subgroups`),this.device=await t.requestDevice(r);let a=t,o=t.info??(typeof a.requestAdapterInfo==`function`?await a.requestAdapterInfo():void 0);this.adapterInfo=new ud(o),this.gpuDataManager=zn(this),this.programManager=new ad(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,nn(e.logLevel,!!e.debug),this.device.onuncapturederror=e=>{e.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${e.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<`u`&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&this.env?.webgpu&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||=this.device.createCommandEncoder(),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType===`at-passes`&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&=(this.computePassEncoder.end(),null)}flush(){if(!this.commandEncoder)return;se(),this.endComputePass();let e;this.queryType!==`none`&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!==`none`&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),n=this.pendingQueries.get(e);for(let e=0;e<t.length/2;e++){let r=n[e],i=r.kernelId,a=this.kernels.get(i),o=a.kernelType,s=a.kernelName,c=r.programName,l=r.inputTensorViews,u=r.outputTensorViews,d=t[e*2],f=t[e*2+1];typeof this.queryTimeBase>`u`&&(this.queryTimeBase=d);let p=Number(d-this.queryTimeBase),m=Number(f-this.queryTimeBase);if(!Number.isSafeInteger(p)||!Number.isSafeInteger(m))throw RangeError(`incorrect timestamp range`);if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:l.map(e=>({dims:e.dims,dataType:Ut(e.dataType)})),outputsMetadata:u.map(e=>({dims:e.dims,dataType:Ut(e.dataType)})),kernelId:i,kernelType:o,kernelName:s,programName:c,startTime:p,endTime:m});else{let e=``;l.forEach((t,n)=>{e+=`input[${n}]: [${t.dims}] | ${Ut(t.dataType)}, `});let t=``;u.forEach((e,n)=>{t+=`output[${n}]: [${e.dims}] | ${Ut(e.dataType)}, `}),console.log(`[profiling] kernel "${i}|${o}|${s}|${c}" ${e}${t}start time: ${p} ns, execution time: ${m-p} ns`)}ae(`GPU`,`${c}::${d}::${f}`)}e.unmap(),this.pendingQueries.delete(e)}),ce()}run(e,t,n,r,i,a){se(e.name);let o=[];for(let e=0;e<t.length;++e){let n=t[e].data;if(n===0)continue;let r=this.gpuDataManager.get(n);if(!r)throw Error(`no GPU data for input: ${n}`);o.push(r)}let{outputs:s,dispatchGroup:c,programUniforms:l}=e.getRunData(t),u=n.length===0?s.map((e,t)=>t):n;if(u.length!==s.length)throw Error(`Output size ${u.length} must be equal to ${s.length}.`);let d=[],f=[];for(let e=0;e<s.length;++e){if(!Number.isInteger(u[e])||u[e]<-3||u[e]>=a)throw Error(`Invalid output index: ${u[e]}`);if(u[e]===-3)continue;let t=u[e]===-1,n=u[e]===-2,o=t||n?i(s[e].dataType,s[e].dims):r(u[e],s[e].dataType,s[e].dims);if(d.push(o),o.data===0)continue;let c=this.gpuDataManager.get(o.data);if(!c)throw Error(`no GPU data for output: ${o.data}`);if(t&&this.temporaryData.push(c),n){let e=this.kernelPersistentData.get(this.currentKernelId);e||(e=[],this.kernelPersistentData.set(this.currentKernelId,e)),e.push(c)}f.push(c)}if(o.length!==t.length||f.length!==d.length){if(f.length===0)return ce(e.name),d;throw Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let p;if(l){let e=0,t=[];l.forEach(n=>{let r=typeof n.data==`number`?[n.data]:n.data;if(r.length===0)return;let i=n.type===10?2:4,a,o;n.type===10?(o=r.length>4?16:r.length>2?8:r.length*i,a=r.length>4?16:i*r.length):(o=r.length<=2?r.length*i:16,a=16),e=Math.ceil(e/o)*o,t.push(e);let s=n.type===10?8:4;e+=r.length>4?Math.ceil(r.length/s)*a:r.length*i}),e=Math.ceil(e/16)*16;let n=new ArrayBuffer(e);l.forEach((e,r)=>{let i=t[r],a=typeof e.data==`number`?[e.data]:e.data;if(e.type===6)new Int32Array(n,i,a.length).set(a);else if(e.type===12)new Uint32Array(n,i,a.length).set(a);else if(e.type===10)new Uint16Array(n,i,a.length).set(a);else if(e.type===1)new Float32Array(n,i,a.length).set(a);else throw Error(`Unsupported uniform type: ${Ut(e.type)}`)});let r=this.gpuDataManager.create(e,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(r.buffer,0,n,0,e),this.gpuDataManager.release(r.id),p={offset:0,size:e,buffer:r.buffer}}let m=this.programManager.normalizeDispatchGroupSize(c),h=m[1]===1&&m[2]===1,g=ld(e,t,h),_=this.programManager.getArtifact(g);if(_||(_=this.programManager.build(e,m),this.programManager.setArtifact(g,_),V(`info`,()=>`[artifact] key: ${g}, programName: ${e.name}`)),l&&_.uniformVariablesInfo){if(l.length!==_.uniformVariablesInfo.length)throw Error(`Uniform variables count mismatch: expect ${_.uniformVariablesInfo.length}, got ${l.length} in program "${_.programInfo.name}".`);for(let e=0;e<l.length;e++){let t=l[e],n=t.type,r=typeof t.data==`number`?1:t.data.length,[i,a]=_.uniformVariablesInfo[e];if(n!==i||r!==a)throw Error(`Uniform variable ${e} mismatch: expect type ${i} with size ${a}, got type ${n} with size ${r} in program "${_.programInfo.name}".`)}}if(V(`info`,()=>`[ProgramManager] run "${e.name}" (key=${g}) with ${m[0]}x${m[1]}x${m[2]}`),this.queryType!==`none`||this.sessionStatus===`capturing`){let e={kernelId:this.currentKernelId,programName:_.programInfo.name,inputTensorViews:t,outputTensorViews:d};this.pendingKernels.push(e),this.sessionStatus===`capturing`&&this.capturedPendingKernels.get(this.currentSessionId).push(e)}return this.programManager.run(_,o,f,m,p),ce(e.name),d}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,n,r){let i=rd.get(e);if(!i)throw Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:r,kernelEntry:i[0],attributes:[i[1],n]};this.kernels.set(t,a)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let e of t)this.gpuDataManager.release(e.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,n){let r=this.kernels.get(e);if(!r)throw Error(`kernel not created: ${e}`);let i=r.kernelType,a=r.kernelName,o=r.kernelEntry,s=r.attributes;if(this.currentKernelId!==null)throw Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,s[0]&&=(s[1]=s[0](s[1]),void 0),V(`info`,()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let c=this.env.debug;this.temporaryData=[];try{return c&&this.device.pushErrorScope(`validation`),o(t,s[1]),0}catch(e){return n.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${e}`)),1}finally{c&&n.push(this.device.popErrorScope().then(e=>e?`GPU validation error for kernel "[${i}] ${a}": ${e.message}`:null));for(let e of this.temporaryData)this.gpuDataManager.release(e.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,n,r){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let a=i.get(t),o=this.gpuDataManager.registerExternalBuffer(n,r,a);return i.set(t,[o,n]),o}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(e=>this.gpuDataManager.unregisterExternalBuffer(e[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,n){return async()=>{let r=await Ln(this,e,t);return fn(r.buffer,n)}}writeTimestamp(e){this.queryType===`inside-passes`&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType=`none`,(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>`u`?this.env.wasm.trace:this.env.trace))&&(this.device.features.has(`chromium-experimental-timestamp-query-inside-passes`)?this.queryType=`inside-passes`:this.device.features.has(`timestamp-query`)&&(this.queryType=`at-passes`),this.queryType!==`none`&&typeof this.querySet>`u`&&(this.querySet=this.device.createQuerySet({type:`timestamp`,count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){V(`info`,`captureBegin`),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus=`capturing`}captureEnd(){V(`info`,`captureEnd`),this.flush(),this.sessionStatus=`default`}replay(){V(`info`,`replay`),this.sessionStatus=`replaying`;let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),n=e.length;this.pendingKernels=[];for(let r=0;r<n;r++){let n=this.getComputePassEncoder(),i=e[r];this.writeTimestamp(this.pendingDispatchNumber*2),n.setPipeline(i.computePipeline),n.setBindGroup(0,i.bindGroup),n.dispatchWorkgroups(...i.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!==`none`&&this.pendingKernels.push(t[r]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType===`at-passes`)&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus=`default`}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),pd={};T(pd,{init:()=>gd});var md,hd,gd,_d=w(()=>{B(),an(),U(),kn(),md=class e{constructor(e,t,n,r){this.module=e,this.dataType=t,this.data=n,this.dims=r}getFloat32Array(){if(this.dataType!==1)throw Error(`Invalid data type`);let e=H.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw Error(`Invalid data type`);let e=H.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw Error(`Invalid data type`);let e=H.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw Error(`Invalid data type`);let e=H.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(t){if(H.size(t)!==H.size(this.dims))throw Error(`Invalid new shape`);return new e(this.module,this.dataType,this.data,t)}},hd=class{constructor(e,t,n){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo,this.deviceLimits=t.device.limits;let r=e.PTR_SIZE,i=n/e.PTR_SIZE,a=r===4?`i32`:`i64`;this.opKernelContext=Number(e.getValue(r*i++,a));let o=Number(e.getValue(r*i++,a));this.outputCount=Number(e.getValue(r*i++,a)),this.customDataOffset=Number(e.getValue(r*i++,`*`)),this.customDataSize=Number(e.getValue(r*i++,a));let s=[];for(let t=0;t<o;t++){let t=Number(e.getValue(r*i++,a)),n=Number(e.getValue(r*i++,`*`)),o=Number(e.getValue(r*i++,a)),c=[];for(let t=0;t<o;t++)c.push(Number(e.getValue(r*i++,a)));s.push(new md(e,t,n,c))}this.inputs=s}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let n=t?.inputs?.map(e=>typeof e==`number`?this.inputs[e]:e)??this.inputs,r=t?.outputs??[];return this.backend.run(e,n,r,(e,t,n)=>new md(this.module,t,this.output(e,n),n),(e,t)=>{let n=Wt(e,t);if(!n)throw Error(`Unsupported data type: ${e}`);let r=n>0?this.backend.gpuDataManager.create(n).id:0;return new md(this.module,e,r,t)},this.outputCount)}output(e,t){let n=this.module.stackSave();try{let n=this.module.PTR_SIZE,r=n===4?`i32`:`i64`,i=this.module.stackAlloc((1+t.length)*n);this.module.setValue(i,t.length,r);for(let e=0;e<t.length;e++)this.module.setValue(i+n*(e+1),t[e],r);return this.module._JsepOutput(this.opKernelContext,e,i)}catch(n){throw Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${n}`)}finally{this.module.stackRestore(n)}}},gd=async(e,t,n,r)=>{let i=t.jsepInit;if(!i)throw Error(`Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.`);if(e===`webgpu`){let e=(fd(),D(sd)).WebGpuBackend,a=new e;await a.initialize(n,r),i(`webgpu`,[a,e=>a.alloc(Number(e)),e=>a.free(e),(e,n,r,i=!1)=>{if(i)V(`verbose`,()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(e)}, dst=${Number(n)}, size=${Number(r)}`),a.memcpy(Number(e),Number(n));else{V(`verbose`,()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(e)}, gpuDataId=${Number(n)}, size=${Number(r)}`);let i=t.HEAPU8.subarray(Number(e>>>0),Number(e>>>0)+Number(r));a.upload(Number(n),i)}},async(e,n,r)=>{V(`verbose`,()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${e}, dataOffset=${n}, size=${r}`),await a.download(Number(e),()=>t.HEAPU8.subarray(Number(n)>>>0,Number(n+r)>>>0))},(e,n,r)=>a.createKernel(e,Number(n),r,t.UTF8ToString(t._JsepGetNodeName(Number(n)))),e=>a.releaseKernel(e),(e,n,r,i)=>{V(`verbose`,()=>`[WebGPU] jsepRun: sessionHandle=${r}, kernel=${e}, contextDataOffset=${n}`);let o=new hd(t,a,Number(n));return a.computeKernel(Number(e),o,i)},()=>a.captureBegin(),()=>a.captureEnd(),()=>a.replay()])}else{let e=new On(n);i(`webnn`,[e,()=>e.reserveTensorId(),t=>e.releaseTensorId(t),async(t,n,r,i,a)=>e.ensureTensor(t,n,r,i,a),(t,n)=>{e.uploadTensor(t,n)},async(t,n)=>e.downloadTensor(t,n),(t,n)=>e.registerMLContext(t,n),!!n.trace])}}}),vd,yd,bd,xd,Sd,Cd,wd,Td,Ed,Dd,Od,kd,Ad,jd,Md,Nd,Pd,Fd,Id=w(()=>{qe(),Pt(),Vt(),B(),Ot(),Mt(),Zt(),vd=(e,t)=>{z()._OrtInit(e,t)!==0&&jt(`Can't initialize onnxruntime.`)},yd=async e=>{vd(e.wasm.numThreads,Kt(e.logLevel))},bd=async(e,t)=>{z().asyncInit?.();let n=e.webgpu.adapter;if(t===`webgpu`){if(typeof navigator>`u`||!navigator.gpu)throw Error(`WebGPU is not supported in current environment`);if(n){if(typeof n.limits!=`object`||typeof n.features!=`object`||typeof n.requestDevice!=`function`)throw Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let t=e.webgpu.powerPreference;if(t!==void 0&&t!==`low-power`&&t!==`high-performance`)throw Error(`Invalid powerPreference setting: "${t}"`);let r=e.webgpu.forceFallbackAdapter;if(r!==void 0&&typeof r!=`boolean`)throw Error(`Invalid forceFallbackAdapter setting: "${r}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:t,forceFallbackAdapter:r}),!n)throw Error(`Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.`)}}if(t===`webnn`&&(typeof navigator>`u`||!navigator.ml))throw Error(`WebNN is not supported in current environment`);{let r=(_d(),D(pd)).init;t===`webgpu`&&await r(`webgpu`,z(),e,n),t===`webnn`&&await r(`webnn`,z(),e)}},xd=new Map,Sd=e=>{let t=z(),n=t.stackSave();try{let n=t.PTR_SIZE,r=t.stackAlloc(2*n);t._OrtGetInputOutputCount(e,r,r+n)!==0&&jt(`Can't get session input/output count.`);let i=n===4?`i32`:`i64`;return[Number(t.getValue(r,i)),Number(t.getValue(r+n,i))]}finally{t.stackRestore(n)}},Cd=(e,t)=>{let n=z(),r=n.stackSave(),i=0;try{let r=n.PTR_SIZE,a=n.stackAlloc(2*r);n._OrtGetInputOutputMetadata(e,t,a,a+r)!==0&&jt(`Can't get session input/output metadata.`);let o=Number(n.getValue(a,`*`));i=Number(n.getValue(a+r,`*`));let s=n.HEAP32[i/4];if(s===0)return[o,0];let c=n.HEAPU32[i/4+1],l=[];for(let e=0;e<c;e++){let t=Number(n.getValue(i+8+e*r,`*`));l.push(t===0?Number(n.getValue(i+8+(e+c)*r,`*`)):n.UTF8ToString(t))}return[o,s,l]}finally{n.stackRestore(r),i!==0&&n._OrtFree(i)}},wd=e=>{let t=z(),n=t._malloc(e.byteLength);if(n===0)throw Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,n),[n,e.byteLength]},Td=async(e,t)=>{let n,r,i=z();Array.isArray(e)?[n,r]=e:e.buffer===i.HEAPU8.buffer?[n,r]=[e.byteOffset,e.byteLength]:[n,r]=wd(e);let a=0,o=0,s=0,c=[],l=[],u=[];try{if([o,c]=await Bt(t),t?.externalData&&i.mountExternalData){let e=[];for(let n of t.externalData){let t=typeof n==`string`?n:n.path,r=typeof n==`string`?n:n.data;e.push(Xt(r).then(e=>{i.mountExternalData(t,e)}))}await Promise.all(e)}for(let e of t?.executionProviders??[])if((typeof e==`string`?e:e.name)===`webnn`){if(i.shouldTransferToMLTensor=!1,typeof e!=`string`){let t=e,n=t?.context,r=t?.gpuDevice,a=t?.deviceType,o=t?.powerPreference;i.currentContext=n||(r?await i.webnnCreateMLContext(r):await i.webnnCreateMLContext({deviceType:a,powerPreference:o}))}else i.currentContext=await i.webnnCreateMLContext();break}a=await i._OrtCreateSession(n,r,o),i.webgpuOnCreateSession?.(a),a===0&&jt(`Can't create a session.`),i.jsepOnCreateSession?.(),i.currentContext&&(i.webnnRegisterMLContext(a,i.currentContext),i.currentContext=void 0,i.shouldTransferToMLTensor=!0);let[e,d]=Sd(a),f=!!t?.enableGraphCapture,p=[],m=[],h=[],g=[],_=[];for(let t=0;t<e;t++){let[e,n,r]=Cd(a,t);e===0&&jt(`Can't get an input name.`),l.push(e);let o=i.UTF8ToString(e);p.push(o),h.push(n===0?{name:o,isTensor:!1}:{name:o,isTensor:!0,type:Ut(n),shape:r})}for(let n=0;n<d;n++){let[r,o,s]=Cd(a,n+e);r===0&&jt(`Can't get an output name.`),u.push(r);let c=i.UTF8ToString(r);m.push(c),g.push(o===0?{name:c,isTensor:!1}:{name:c,isTensor:!0,type:Ut(o),shape:s});{if(f&&t?.preferredOutputLocation===void 0){_.push(`gpu-buffer`);continue}let e=typeof t?.preferredOutputLocation==`string`?t.preferredOutputLocation:t?.preferredOutputLocation?.[c]??`cpu`,n=i.webnnIsGraphOutput;if(e===`cpu`&&n&&n(a,c)){_.push(`ml-tensor-cpu-output`);continue}if(e!==`cpu`&&e!==`cpu-pinned`&&e!==`gpu-buffer`&&e!==`ml-tensor`)throw Error(`Not supported preferred output location: ${e}.`);if(f&&e!==`gpu-buffer`)throw Error(`Not supported preferred output location: ${e}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);_.push(e)}}let v=null;return _.some(e=>e===`gpu-buffer`||e===`ml-tensor`||e===`ml-tensor-cpu-output`)&&(s=i._OrtCreateBinding(a),s===0&&jt(`Can't create IO binding.`),v={handle:s,outputPreferredLocations:_,outputPreferredLocationsEncoded:_.map(e=>e===`ml-tensor-cpu-output`?`ml-tensor`:e).map(e=>Yt(e))}),xd.set(a,[a,l,u,v,f,!1]),[a,p,m,h,g]}catch(e){throw l.forEach(e=>i._OrtFree(e)),u.forEach(e=>i._OrtFree(e)),s!==0&&i._OrtReleaseBinding(s)!==0&&jt(`Can't release IO binding.`),a!==0&&i._OrtReleaseSession(a)!==0&&jt(`Can't release session.`),e}finally{i._free(n),o!==0&&i._OrtReleaseSessionOptions(o)!==0&&jt(`Can't release session options.`),c.forEach(e=>i._free(e)),i.unmountExternalData?.()}},Ed=e=>{let t=z(),n=xd.get(e);if(!n)throw Error(`cannot release session. invalid session id: ${e}`);let[r,i,a,o,s]=n;o&&(s&&t._OrtClearBoundOutputs(o.handle)!==0&&jt(`Can't clear bound outputs.`),t._OrtReleaseBinding(o.handle)!==0&&jt(`Can't release IO binding.`)),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),i.forEach(e=>t._OrtFree(e)),a.forEach(e=>t._OrtFree(e)),t._OrtReleaseSession(r)!==0&&jt(`Can't release session.`),xd.delete(e)},Dd=new Map,Od=1,kd=new Map,Ad=e=>{let t=z(),n=t._malloc(e.byteLength);if(n===0)throw Error(`Can't create a LoRA adapter. failed to allocate a buffer of size ${e.byteLength}.`);try{t.HEAPU8.set(e,n);let r=t._OrtCreateLoraAdapter(n,e.byteLength);r===0&&jt(`Can't create a LoRA adapter.`);let i=Od++;return Dd.set(i,r),i}finally{t._free(n)}},jd=e=>{let t=z(),n=Dd.get(e);if(n===void 0)throw Error(`cannot release LoRA adapter. invalid adapter id: ${e}`);if(kd.has(e))throw Error(`cannot release LoRA adapter. the adapter is used by a run in progress. adapter id: ${e}`);t._OrtReleaseLoraAdapter(n)!==0&&jt(`Can't release LoRA adapter.`),Dd.delete(e)},Md=async(e,t,n,r,i,a,o=!1)=>{if(!e){t.push(0);return}let s=z(),c=s.PTR_SIZE,l=e[0],u=e[1],d=e[3],f=d,p,m;if(l===`string`&&(d===`gpu-buffer`||d===`ml-tensor`))throw Error(`String tensor is not supported on GPU.`);if(o&&d!==`gpu-buffer`)throw Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if(d===`gpu-buffer`){let t=e[2].gpuBuffer;m=Wt(Ht(l),u);{let e=s.jsepRegisterBuffer;if(!e)throw Error(`Tensor location "gpu-buffer" is not supported without using WebGPU.`);p=e(r,a,t,m)}}else if(d===`ml-tensor`){let t=e[2].mlTensor;m=Wt(Ht(l),u);let n=s.webnnRegisterMLTensor;if(!n)throw Error(`Tensor location "ml-tensor" is not supported without using WebNN.`);p=n(r,t,Ht(l),u)}else{let t=e[2];if(Array.isArray(t)){m=c*t.length,p=s._malloc(m),n.push(p);for(let e=0;e<t.length;e++){if(typeof t[e]!=`string`)throw TypeError(`tensor data at index ${e} is not a string`);s.setValue(p+e*c,kt(t[e],n),`*`)}}else{let e=s.webnnIsGraphInput,a=s.webnnIsGraphOutput;if(l!==`string`&&e&&a){let o=s.UTF8ToString(i);if(e(r,o)||a(r,o)){let e=Ht(l);m=Wt(e,u),f=`ml-tensor`;let n=s.webnnCreateTemporaryTensor,i=s.webnnUploadTensor;if(!n||!i)throw Error(`Tensor location "ml-tensor" is not supported without using WebNN.`);let a=await n(r,e,u);i(a,new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),p=a}else m=t.byteLength,p=s._malloc(m),n.push(p),s.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,m),p)}else m=t.byteLength,p=s._malloc(m),n.push(p),s.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,m),p)}}let h=s.stackSave(),g=s.stackAlloc(4*u.length);try{u.forEach((e,t)=>s.setValue(g+t*c,e,c===4?`i32`:`i64`));let e=s._OrtCreateTensor(Ht(l),p,m,g,u.length,Yt(f));e===0&&jt(`Can't create tensor for input/output. session=${r}, index=${a}.`),t.push(e)}finally{s.stackRestore(h)}},Nd=async(e,t,n,r,i,a,o=[])=>{let s=z(),c=s.PTR_SIZE,l=xd.get(e);if(!l)throw Error(`cannot run inference. invalid session id: ${e}`);let u=l[0],d=l[1],f=l[2],p=l[3],m=l[4],h=l[5],g=[];if(o.length>0){if(p)throw Error(`LoRA adapters are not supported for a session that uses IO binding, e.g. when an output is preferred to be on GPU, or when the WebNN execution provider produces an output.`);for(let e of o){let t=Dd.get(e);if(t===void 0)throw Error(`cannot run inference. invalid LoRA adapter id: ${e}`);g.push(t)}}let _=t.length,v=r.length,y=0,b=[],x=[],S=[],C=[],w=[],T=s.stackSave(),E=s.stackAlloc(_*c),D=s.stackAlloc(_*c),O=s.stackAlloc(v*c),k=s.stackAlloc(v*c);try{for(let e of o)kd.set(e,(kd.get(e)??0)+1);[y,b]=Nt(a,g),le(`wasm prepareInputOutputTensor`);for(let r=0;r<_;r++)await Md(n[r],x,C,e,d[t[r]],t[r],m);for(let t=0;t<v;t++)await Md(i[t],S,C,e,f[r[t]],_+r[t],m);ue(`wasm prepareInputOutputTensor`);for(let e=0;e<_;e++)s.setValue(E+e*c,x[e],`*`),s.setValue(D+e*c,d[t[e]],`*`);for(let e=0;e<v;e++)s.setValue(O+e*c,S[e],`*`),s.setValue(k+e*c,f[r[e]],`*`);if(p&&!h){let{handle:n,outputPreferredLocations:a,outputPreferredLocationsEncoded:o}=p;if(d.length!==_)throw Error(`input count from feeds (${_}) is expected to be always equal to model's input count (${d.length}).`);le(`wasm bindInputsOutputs`);for(let r=0;r<_;r++){let i=t[r];await s._OrtBindInput(n,d[i],x[r])!==0&&jt(`Can't bind input[${r}] for session=${e}.`)}for(let t=0;t<v;t++){let c=r[t];i[t]?.[3]?(w.push(S[t]),s._OrtBindOutput(n,f[c],S[t],0)!==0&&jt(`Can't bind pre-allocated output[${t}] for session=${e}.`)):s._OrtBindOutput(n,f[c],0,o[c])!==0&&jt(`Can't bind output[${t}] to ${a[t]} for session=${e}.`)}ue(`wasm bindInputsOutputs`),xd.set(e,[u,d,f,p,m,!0])}s.jsepOnRunStart?.(u),s.webnnOnRunStart?.(u);let l;l=p?await s._OrtRunWithBinding(u,p.handle,v,O,y):await s._OrtRun(u,D,E,_,k,v,O,y),l!==0&&jt(`failed to call OrtRun().`);let T=[],A=[];le(`wasm ProcessOutputTensor`);for(let t=0;t<v;t++){let n=Number(s.getValue(O+t*c,`*`));if(n===S[t]||w.includes(S[t])){T.push(i[t]),n!==S[t]&&s._OrtReleaseTensor(n)!==0&&jt(`Can't release tensor.`);continue}let a=s.stackSave(),o=s.stackAlloc(4*c),l=!1,u,d=0;try{s._OrtGetTensorData(n,o,o+c,o+2*c,o+3*c)!==0&&jt(`Can't access output tensor data on index ${t}.`);let i=c===4?`i32`:`i64`,a=Number(s.getValue(o,i));d=s.getValue(o+c,`*`);let f=s.getValue(o+c*2,`*`),m=Number(s.getValue(o+c*3,i)),h=[];for(let e=0;e<m;e++)h.push(Number(s.getValue(f+e*c,i)));s._OrtFree(f)!==0&&jt(`Can't free memory for tensor dims.`);let g=h.reduce((e,t)=>e*t,1);u=Ut(a);let _=p?.outputPreferredLocations[r[t]];if(u===`string`){if(_===`gpu-buffer`||_===`ml-tensor`)throw Error(`String tensor is not supported on GPU.`);let e=[];for(let t=0;t<g;t++){let n=s.getValue(d+t*c,`*`),r=s.getValue(d+(t+1)*c,`*`),i=t===g-1?void 0:r-n;e.push(s.UTF8ToString(n,i))}T.push([u,h,e,`cpu`])}else if(_===`gpu-buffer`&&g>0){let e=s.jsepGetBuffer;if(!e)throw Error(`preferredLocation "gpu-buffer" is not supported without using WebGPU.`);let t=e(d),r=Wt(a,g);if(r===void 0||!qt(u))throw Error(`Unsupported data type: ${u}`);l=!0,T.push([u,h,{gpuBuffer:t,download:s.jsepCreateDownloader(t,r,u),dispose:()=>{s._OrtReleaseTensor(n)!==0&&jt(`Can't release tensor.`)}},`gpu-buffer`])}else if(_===`ml-tensor`&&g>0){let t=s.webnnEnsureTensor,r=s.webnnIsGraphInputOutputTypeSupported;if(!t||!r)throw Error(`preferredLocation "ml-tensor" is not supported without using WebNN.`);if(Wt(a,g)===void 0||!Jt(u))throw Error(`Unsupported data type: ${u}`);if(!r(e,u,!1))throw Error(`preferredLocation "ml-tensor" for ${u} output is not supported by current WebNN Context.`);let i=await t(e,d,a,h,!1);l=!0,T.push([u,h,{mlTensor:i,download:s.webnnCreateMLTensorDownloader(d,u),dispose:()=>{s.webnnReleaseTensorId(d),s._OrtReleaseTensor(n)}},`ml-tensor`])}else if(_===`ml-tensor-cpu-output`&&g>0){let e=s.webnnCreateMLTensorDownloader(d,u)(),t=T.length;l=!0,A.push((async()=>{let r=[t,await e];return s.webnnReleaseTensorId(d),s._OrtReleaseTensor(n),r})()),T.push([u,h,[],`cpu`])}else{let e=new(Gt(u))(g);new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(s.HEAPU8.subarray(d,d+e.byteLength)),T.push([u,h,e,`cpu`])}}finally{s.stackRestore(a),u===`string`&&d&&s._free(d),l||s._OrtReleaseTensor(n)}}p&&!m&&(s._OrtClearBoundOutputs(p.handle)!==0&&jt(`Can't clear bound outputs.`),xd.set(e,[u,d,f,p,m,!1]));for(let[e,t]of await Promise.all(A))T[e][2]=t;return ue(`wasm ProcessOutputTensor`),T}finally{s.webnnOnRunEnd?.(u),s.stackRestore(T),x.forEach(e=>s._OrtReleaseTensor(e)),S.forEach(e=>s._OrtReleaseTensor(e)),C.forEach(e=>s._free(e)),y!==0&&s._OrtReleaseRunOptions(y),b.forEach(e=>s._free(e));for(let e of o){let t=kd.get(e)-1;t===0?kd.delete(e):kd.set(e,t)}}},Pd=e=>{let t=z(),n=xd.get(e);if(!n)throw Error(`invalid session id`);let r=n[0],i=t._OrtEndProfiling(r);i===0&&jt(`Can't get an profile file name.`),t._OrtFree(i)},Fd=e=>{let t=[];for(let n of e){let e=n[2];!Array.isArray(e)&&`buffer`in e&&t.push(e.buffer)}return t}}),Ld,Rd,zd,Bd,Vd,Hd,Ud,Wd,Gd,Kd,qd,Jd,Yd,Xd,Zd,Qd,$d,ef,tf,nf,rf=w(()=>{qe(),Id(),Ot(),yt(),Zt(),Ld=()=>!!R.wasm.proxy&&typeof document<`u`,zd=!1,Bd=!1,Vd=!1,Wd=new Map,Gd=(e,t)=>{let n=Wd.get(e);n?n.push(t):Wd.set(e,[t])},Kd=()=>{if(zd||!Bd||Vd||!Rd)throw Error(`worker not ready`)},qd=e=>{switch(e.data.type){case`init-wasm`:zd=!1,e.data.err?(Vd=!0,Ud[1](e.data.err)):(Bd=!0,Ud[0]()),Hd&&=(URL.revokeObjectURL(Hd),void 0);break;case`init-ep`:case`copy-from`:case`create`:case`release`:case`run`:case`end-profiling`:{let t=Wd.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},Jd=async()=>{if(!Bd){if(zd)throw Error(`multiple calls to 'initWasm()' detected.`);if(Vd)throw Error(`previous call to 'initWasm()' failed.`);if(zd=!0,Ld())return new Promise((e,t)=>{Rd?.terminate(),gt().then(([n,r])=>{try{Rd=r,Rd.onerror=e=>t(e),Rd.onmessage=qd,Ud=[e,t];let i={type:`init-wasm`,in:R};!i.in.wasm.wasmPaths&&(n||ot)&&(i.in.wasm.wasmPaths={wasm:new URL(new URL(`ort-wasm-simd-threaded.jsep-Dt5UNR3U.wasm`,import.meta.url).href,``+import.meta.url).href}),Rd.postMessage(i),Hd=n}catch(e){t(e)}},t)});try{await Dt(R.wasm),await yd(R),Bd=!0}catch(e){throw Vd=!0,e}finally{zd=!1}}},Yd=async e=>{if(Ld())return Kd(),new Promise((t,n)=>{Gd(`init-ep`,[t,n]);let r={type:`init-ep`,in:{epName:e,env:R}};Rd.postMessage(r)});await bd(R,e)},Xd=async e=>Ld()?(Kd(),new Promise((t,n)=>{Gd(`copy-from`,[t,n]);let r={type:`copy-from`,in:{buffer:e}};Rd.postMessage(r,[e.buffer])})):wd(e),Zd=async(e,t)=>{if(Ld()){if(t?.preferredOutputLocation)throw Error(`session option "preferredOutputLocation" is not supported for proxy.`);return Kd(),new Promise((n,r)=>{Gd(`create`,[n,r]);let i={type:`create`,in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),Rd.postMessage(i,a)})}return Td(e,t)},Qd=async e=>{if(Ld())return Kd(),new Promise((t,n)=>{Gd(`release`,[t,n]);let r={type:`release`,in:e};Rd.postMessage(r)});Ed(e)},$d=async e=>{if(Ld())throw Error(`LoRA adapter is not supported for proxy.`);let t=typeof e==`string`?await Xt(e):e;return Ad(t)},ef=async e=>{if(Ld())throw Error(`LoRA adapter is not supported for proxy.`);jd(e)},tf=async(e,t,n,r,i,a,o)=>{if(Ld()){if(o.length>0)throw Error(`LoRA adapter is not supported for proxy.`);if(n.some(e=>e[3]!==`cpu`))throw Error(`input tensor on GPU is not supported for proxy.`);if(i.some(e=>e))throw Error(`pre-allocated output tensor is not supported for proxy.`);return Kd(),new Promise((i,o)=>{Gd(`run`,[i,o]);let s=n,c={type:`run`,in:{sessionId:e,inputIndices:t,inputs:s,outputIndices:r,options:a}};Rd.postMessage(c,Fd(s))})}return Nd(e,t,n,r,i,a,o)},nf=async e=>{if(Ld())return Kd(),new Promise((t,n)=>{Gd(`end-profiling`,[t,n]);let r={type:`end-profiling`,in:e};Rd.postMessage(r)});Pd(e)}}),af,of=w(()=>{qe(),rf(),af=class{async loadAdapter(e){se(),this.adapterId=await $d(e),ce()}async dispose(){return ef(this.adapterId)}}}),sf,cf,lf,uf=w(()=>{qe(),of(),rf(),B(),Je(),Zt(),sf=(e,t)=>{switch(e.location){case`cpu`:return[e.type,e.dims,e.data,`cpu`];case`gpu-buffer`:return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},`gpu-buffer`];case`ml-tensor`:return[e.type,e.dims,{mlTensor:e.mlTensor},`ml-tensor`];default:throw Error(`invalid data location: ${e.location} for ${t()}`)}},cf=e=>{switch(e[3]){case`cpu`:return new Pe(e[0],e[2],e[1]);case`gpu-buffer`:{let t=e[0];if(!qt(t))throw Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:n,download:r,dispose:i}=e[2];return Pe.fromGpuBuffer(n,{dataType:t,dims:e[1],download:r,dispose:i})}case`ml-tensor`:{let t=e[0];if(!Jt(t))throw Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:n,download:r,dispose:i}=e[2];return Pe.fromMLTensor(n,{dataType:t,dims:e[1],download:r,dispose:i})}default:throw Error(`invalid data location: ${e[3]}`)}},lf=class{async fetchModelAndCopyToWasmMemory(e){return Xd(await Xt(e))}async loadModel(e,t){se();let n;n=typeof e==`string`?await this.fetchModelAndCopyToWasmMemory(e):e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Zd(n,t),ce()}async dispose(){return Qd(this.sessionId)}async run(e,t,n,r=[]){se();let i=r.map(e=>{if(!(e instanceof af))throw Error(`LoRA adapter was not created by the WebAssembly backend.`);return e.adapterId}),a=[],o=[];Object.entries(e).forEach(e=>{let t=e[0],n=e[1],r=this.inputNames.indexOf(t);if(r===-1)throw Error(`invalid input '${t}'`);a.push(n),o.push(r)});let s=[],c=[];Object.entries(t).forEach(e=>{let t=e[0],n=e[1],r=this.outputNames.indexOf(t);if(r===-1)throw Error(`invalid output '${t}'`);s.push(n),c.push(r)});let l=a.map((e,t)=>sf(e,()=>`input "${this.inputNames[o[t]]}"`)),u=s.map((e,t)=>e?sf(e,()=>`output "${this.outputNames[c[t]]}"`):null),d=await tf(this.sessionId,o,l,c,u,n,i),f={};for(let e=0;e<d.length;e++)f[this.outputNames[c[e]]]=s[e]??cf(d[e]);return ce(),f}startProfiling(){}endProfiling(){nf(this.sessionId)}}}),df,ff=w(()=>{df=e=>{if(e?.epContextDataRead)throw Error(`session option "epContextDataRead" is not supported by ONNX Runtime Web`)}}),pf={};T(pf,{OnnxruntimeWebAssemblyBackend:()=>hf,initializeFlags:()=>mf,wasmBackend:()=>gf});var mf,hf,gf,_f=w(()=>{qe(),of(),rf(),uf(),ff(),mf=()=>{(typeof R.wasm.initTimeout!=`number`||R.wasm.initTimeout<0)&&(R.wasm.initTimeout=0);let e=R.wasm.simd;if(typeof e!=`boolean`&&e!==void 0&&e!==`fixed`&&e!==`relaxed`&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),R.wasm.simd=!1),typeof R.wasm.proxy!=`boolean`&&(R.wasm.proxy=!1),typeof R.wasm.trace!=`boolean`&&(R.wasm.trace=!1),typeof R.wasm.numThreads!=`number`||!Number.isInteger(R.wasm.numThreads)||R.wasm.numThreads<=0){if(typeof self<`u`&&!self.crossOriginIsolated)R.wasm.numThreads=1;else{let e=typeof navigator>`u`?C(`node:os`).cpus().length:navigator.hardwareConcurrency;R.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}}},hf=class{async init(e){mf(),await Jd(),await Yd(e)}async createInferenceSessionHandler(e,t){df(t);let n=new lf;return await n.loadModel(e,t),n}async createLoraAdapterHandler(e){let t=new af;return await t.loadAdapter(e),t}},gf=new hf});qe(),qe(),qe();var vf=`1.31.1`,yf=Ke;{let e=(_f(),D(pf)).wasmBackend;j(`webgpu`,e,5),j(`webnn`,e,5),j(`cpu`,e,10),j(`wasm`,e,10)}Object.defineProperty(R.versions,"web",{value:vf,enumerable:!0});var bf={SAMPLE_RATE:44100,FFT_SIZE:4096,HOP_SIZE:1024,TRAINING_SAMPLES:343980,MODEL_SPEC_BINS:2048,MODEL_SPEC_FRAMES:336,SEGMENT_OVERLAP:.25,TRACKS:[`drums`,`bass`,`other`,`vocals`],DEFAULT_MODEL_URL:`https://huggingface.co/timcsy/demucs-web-onnx/resolve/main/htdemucs_embedded.onnx`},xf=new Map,Sf=new Map,Cf=new Map;function wf(e){if(xf.has(e))return xf.get(e);let t=new Float32Array(e/2),n=new Float32Array(e/2);for(let r=0;r<e/2;r++){let i=-2*Math.PI*r/e;t[r]=Math.cos(i),n[r]=Math.sin(i)}let r={real:t,imag:n};return xf.set(e,r),r}function Tf(e){if(Sf.has(e))return Sf.get(e);let t=new Float32Array(e/2),n=new Float32Array(e/2);for(let r=0;r<e/2;r++){let i=2*Math.PI*r/e;t[r]=Math.cos(i),n[r]=Math.sin(i)}let r={real:t,imag:n};return Sf.set(e,r),r}function Ef(e){if(Cf.has(e))return Cf.get(e);let t=new Float32Array(e);for(let n=0;n<e;n++)t[n]=.5*(1-Math.cos(2*Math.PI*n/e));return Cf.set(e,t),t}function Df(e,t){let n=0;for(let r=0;r<t;r++)n=n<<1|e&1,e>>=1;return n}function Of(e,t,n,r){let i=Math.log2(r)|0,a=wf(r);for(let a=0;a<r;a++){let r=Df(a,i);e[a]=n[r],t[a]=0}for(let n=2;n<=r;n*=2){let i=n/2,o=r/n;for(let s=0;s<r;s+=n)for(let n=0;n<i;n++){let r=n*o,c=a.real[r],l=a.imag[r],u=s+n,d=s+n+i,f=e[u],p=t[u],m=e[d]*c-t[d]*l,h=e[d]*l+t[d]*c;e[u]=f+m,t[u]=p+h,e[d]=f-m,t[d]=p-h}}}function kf(e,t,n,r,i){let a=Math.log2(i)|0,o=Tf(i);for(let o=0;o<i;o++){let i=Df(o,a);e[o]=n[i],t[o]=r[i]}for(let n=2;n<=i;n*=2){let r=n/2,a=i/n;for(let s=0;s<i;s+=n)for(let n=0;n<r;n++){let i=n*a,c=o.real[i],l=o.imag[i],u=s+n,d=s+n+r,f=e[u],p=t[u],m=e[d]*c-t[d]*l,h=e[d]*l+t[d]*c;e[u]=f+m,t[u]=p+h,e[d]=f-m,t[d]=p-h}}for(let n=0;n<i;n++)e[n]/=i,t[n]/=i}function Af(e,t,n){let r=Math.floor((e.length-t)/n)+1,i=t/2+1,a=Ef(t),o=1/Math.sqrt(t),s=new Float32Array(r*i),c=new Float32Array(r*i),l=new Float32Array(t),u=new Float32Array(t),d=new Float32Array(t);for(let f=0;f<r;f++){let r=f*n;for(let n=0;n<t;n++)d[n]=e[r+n]*a[n];Of(l,u,d,t);let p=f*i;for(let e=0;e<i;e++)s[p+e]=l[e]*o,c[p+e]=u[e]*o}return{real:s,imag:c,numFrames:r,numBins:i}}function jf(e,t,n,r,i,a,o){let s=o||(n-1)*a+i,c=new Float32Array(s),l=new Float32Array(s),u=Ef(i),d=Math.sqrt(i),f=new Float32Array(i),p=new Float32Array(i),m=new Float32Array(i),h=new Float32Array(i);for(let o=0;o<n;o++){f.fill(0),p.fill(0);for(let n=0;n<r;n++)f[n]=e[o*r+n],p[n]=t[o*r+n];for(let e=1;e<r-1;e++)f[i-e]=f[e],p[i-e]=-p[e];kf(m,h,f,p,i);let n=o*a;for(let e=0;e<i&&n+e<s;e++)c[n+e]+=m[e]*u[e]*d,l[n+e]+=u[e]*u[e]}for(let e=0;e<s;e++)l[e]>1e-8&&(c[e]/=l[e]);return c}function Mf(e,t,n){let r=e.length,i=new Float32Array(t+r+n);for(let n=0;n<t;n++){let a=Math.min(t-n,r-1);i[n]=e[a]}i.set(e,t);for(let a=0;a<n;a++){let n=Math.max(0,r-2-a);i[t+r+a]=e[n]}return i}var{SAMPLE_RATE:Nf,FFT_SIZE:Pf,HOP_SIZE:Ff,TRAINING_SAMPLES:If,MODEL_SPEC_BINS:Lf,MODEL_SPEC_FRAMES:Rf,SEGMENT_OVERLAP:zf,TRACKS:Bf}=bf;function Vf(e){let t=Lf,n=Rf,r=[];for(let i=0;i<4;i++){let a={leftReal:new Float32Array(t*n),leftImag:new Float32Array(t*n),rightReal:new Float32Array(t*n),rightImag:new Float32Array(t*n)};for(let r=0;r<n;r++)for(let o=0;o<t;o++){let s=i*4*t*n,c=o*n+r;a.leftReal[c]=e[s+0*t*n+o*n+r],a.leftImag[c]=e[s+1*t*n+o*n+r],a.rightReal[c]=e[s+2*t*n+o*n+r],a.rightImag[c]=e[s+3*t*n+o*n+r]}r.push(a)}return r}function Hf(e,t){let n=Lf,r=Rf,i=Ff,a=n+1,o=r+4,s=(e,t)=>{let i=new Float32Array(o*a),s=new Float32Array(o*a);for(let o=0;o<r;o++)for(let c=0;c<n;c++){let n=c*r+o,l=(o+2)*a+c;i[l]=e[n],s[l]=t[n]}return{real:i,imag:s}},c=s(e.leftReal,e.leftImag),l=s(e.rightReal,e.rightImag),u=Pf/2,d=Math.floor(i/2)*3,f=(o-1)*i+Pf,p=jf(c.real,c.imag,o,a,Pf,i,f),m=jf(l.real,l.imag,o,a,Pf,i,f),h=u+d,g=p.subarray(h,h+t),_=m.subarray(h,h+t);return{left:new Float32Array(g),right:new Float32Array(_)}}function Uf(e,t){let n=If,r=new Float32Array(n),i=new Float32Array(n),a=Math.min(e.length,n);r.set(e.subarray(0,a)),i.set(t.subarray(0,a));let o=Math.ceil(n/Ff),s=Math.floor(Ff/2)*3,c=s+o*Ff-n,l=Mf(r,s,c),u=Mf(i,s,c),d=Pf/2,f=Mf(l,d,d),p=Mf(u,d,d),m=Af(f,Pf,Ff),h=Af(p,Pf,Ff),g=Lf,_=Rf,v=new Float32Array(4*g*_);for(let e=0;e<_;e++){let t=e+2;for(let n=0;n<g;n++){let r=t*m.numBins+n;v[0*g*_+n*_+e]=m.real[r],v[1*g*_+n*_+e]=m.imag[r],v[2*g*_+n*_+e]=h.real[r],v[3*g*_+n*_+e]=h.imag[r]}}let y=new Float32Array(2*n);return y.set(r,0),y.set(i,n),{waveform:y,magSpec:v,numBins:g,numFrames:_,originalLength:e.length}}var Wf=class{constructor(e={}){this.ort=e.ort||null,this.session=null,this.modelPath=e.modelPath||`./htdemucs_embedded.onnx`,this.sessionOptions=e.sessionOptions||{},this.onProgress=e.onProgress||(()=>{}),this.onLog=e.onLog||(()=>{}),this.onDownloadProgress=e.onDownloadProgress||(()=>{})}async loadModel(e){if(!this.ort)throw Error(`ONNX Runtime not provided. Pass ort in constructor options.`);this.onLog(`model`,`Loading model...`);let t;if(e instanceof ArrayBuffer)t=e;else{let n=await fetch(e||this.modelPath),r=n.headers.get(`Content-Length`);if(r&&n.body){let e=parseInt(r,10),i=n.body.getReader(),a=[],o=0;for(;;){let{done:t,value:n}=await i.read();if(t)break;a.push(n),o+=n.length,this.onDownloadProgress(o,e)}let s=new Uint8Array(o),c=0;for(let e of a)s.set(e,c),c+=e.length;t=s.buffer}else t=await n.arrayBuffer()}let n={executionProviders:[`webgpu`,`wasm`],graphOptimizationLevel:`basic`};return this.session=await this.ort.InferenceSession.create(t,{...n,...this.sessionOptions}),this.onLog(`model`,`Model loaded successfully`),this.session}async separate(e,t){if(!this.session)throw Error(`Model not loaded. Call loadModel() first.`);let n=e.length,r=Math.floor(If*(1-zf)),i=Math.ceil((n-If)/r)+1,a=Bf.map(()=>({left:new Float32Array(n),right:new Float32Array(n)})),o=new Float32Array(n),s=0;for(let c=0;c<n;c+=r){let l=Math.min(c+If,n)-c,u=new Float32Array(If),d=new Float32Array(If);for(let n=0;n<l;n++)u[n]=e[c+n],d[n]=t[c+n];let f=Uf(u,d),p=new this.ort.Tensor(`float32`,f.waveform,[1,2,If]),m=new this.ort.Tensor(`float32`,f.magSpec,[1,4,Lf,Rf]),h={};h[this.session.inputNames[0]]=p,this.session.inputNames.length>1&&(h[this.session.inputNames[1]]=m);let g=await this.session.run(h),_=null,v=null,y=null;for(let e of this.session.outputNames){let t=g[e];t.dims.length===4&&t.dims[2]===2?(_=t.data,v=t.dims):t.dims.length===5&&t.dims[2]===4&&(y=t.data)}if(!_)throw Error(`Could not find time-domain output tensor`);let b=null;if(y){let e=Vf(y);b=[];for(let t=0;t<4;t++){let n=Hf(e[t],If),r=v[2],i=v[3],a=new Float32Array(i),o=new Float32Array(i);for(let e=0;e<i;e++)a[e]=_[t*r*i+0*i+e],o[e]=_[t*r*i+1*i+e];let s={left:new Float32Array(i),right:new Float32Array(i)};for(let e=0;e<i;e++)s.left[e]=a[e]+(n.left[e]||0),s.right[e]=o[e]+(n.right[e]||0);b.push(s)}}let x=v[1],S=v[2],C=v[3],w=new Float32Array(l);for(let e=0;e<l;e++){let t=Math.min(e/(r*.5),1),n=Math.min((l-e)/(r*.5),1);w[e]=Math.min(t,n)}for(let e=0;e<x;e++)for(let t=0;t<l&&c+t<n;t++){let n,r;if(b)n=b[e].left[t],r=b[e].right[t];else{let i=e*S*C+0*C+t,a=e*S*C+1*C+t;n=_[i],r=_[a]}a[e].left[c+t]+=n*w[t],a[e].right[c+t]+=r*w[t]}for(let e=0;e<l&&c+e<n;e++)o[c+e]+=w[e];s++,this.onProgress({progress:s/i,currentSegment:s,totalSegments:i})}for(let e=0;e<Bf.length;e++)for(let t=0;t<n;t++)o[t]>0&&(a[e].left[t]/=o[t],a[e].right[t]/=o[t]);return{drums:a[0],bass:a[1],other:a[2],vocals:a[3]}}},Gf=`https://cdn.jsdelivr.net/npm/onnxruntime-web@1.21.0/dist/`;R.wasm.wasmPaths=Gf,R.wasm.numThreads=Math.min(4,navigator.hardwareConcurrency||2);var Kf=`demucs-onnx-model-cache-v1`,qf=bf.DEFAULT_MODEL_URL||`https://huggingface.co/timcsy/demucs-web-onnx/resolve/main/htdemucs_embedded.onnx`,Jf=null,Yf=!1;async function Xf(){let e=!!navigator.gpu,t=`Not Available (Falling back to WASM Multi-threading)`;if(e)try{let e=await navigator.gpu.requestAdapter();e&&(t=e.info?.description||`Hardware WebGPU Accelerated`)}catch{}return{hasWebGPU:e,adapterName:t,threads:navigator.hardwareConcurrency||4}}async function Zf({onDownloadProgress:e=()=>{},onStatus:t=()=>{}}){if(Jf&&Yf)return t(`Model is already loaded in memory.`),Jf;t(`Checking local model cache in browser storage...`);let n=null;try{if(`caches`in window){let e=await(await caches.open(Kf)).match(qf);e&&(t(`Found model in browser cache! Loading instantly into memory...`),n=await e.arrayBuffer())}}catch(e){console.warn(`Cache API lookup failed:`,e)}if(!n){t(`Downloading Meta HTDemucs AI Model (~172 MB)... (This happens only once)`);let r=await fetch(qf);if(!r.ok)throw Error(`Failed to download model from Hugging Face: HTTP ${r.status} ${r.statusText}`);let i=r.headers.get(`Content-Length`),a=i?parseInt(i,10):180355072,o=r.body.getReader(),s=[],c=0;for(;;){let{done:t,value:n}=await o.read();if(t)break;s.push(n),c+=n.length,e(c,a)}let l=new Uint8Array(c),u=0;for(let e of s)l.set(e,u),u+=e.length;n=l.buffer;try{if(`caches`in window){let e=await caches.open(Kf),t=new Headers({"Content-Type":`application/octet-stream`,"Content-Length":String(n.byteLength)});await e.put(qf,new Response(n.slice(0),{headers:t})),console.log(`[Cache] Stored Demucs ONNX model in browser cache for future instant offline runs.`)}}catch(e){console.warn(`Failed to store model in browser cache:`,e)}}return t(`Initializing ONNX Inference Session with WebGPU / WASM...`),Jf=new Wf({ort:v,sessionOptions:{executionProviders:navigator.gpu?[`webgpu`,`wasm`]:[`wasm`],graphOptimizationLevel:`all`},onLog:(e,n)=>{console.log(`[Demucs:${e}]`,n),t(`[${e}] ${n}`)}}),await Jf.loadModel(n),Yf=!0,t(`Demucs AI Model ready for separation!`),Jf}async function Qf(e,t,{onProgress:n=()=>{},onStatus:r=()=>{}}){if(!Jf||!Yf)throw Error(`Demucs model is not loaded. Call loadDemucsModel first.`);r(`Processing audio with Meta HTDemucs AI (${(e.length/44100).toFixed(1)}s total)...`),Jf.onProgress=e=>{n(e),r(`Separating audio stems: ${(e*100).toFixed(1)}% complete...`)};let i=await Jf.separate(e,t);r(`Assembling clean Background Music and Vocal stems...`);let a=m([i.drums,i.bass,i.other],e.length);return{vocals:i.vocals,no_vocals:a,drums:i.drums,bass:i.bass,other:i.other}}var $f=document.getElementById(`dropZone`),ep=document.getElementById(`fileInput`),tp=document.getElementById(`uploadTitle`),np=document.getElementById(`uploadDesc`),rp=document.getElementById(`btnLoadDemo`),ip=document.getElementById(`optDemucs`),ap=document.getElementById(`optDsp`),op=document.getElementById(`btnProcess`),sp=document.getElementById(`deviceBadge`),cp=document.getElementById(`progressBox`),lp=document.getElementById(`progressTitle`),up=document.getElementById(`progressPct`),dp=document.getElementById(`progressBar`),fp=document.getElementById(`progressStatus`),pp=document.getElementById(`studioWorkspace`),mp=document.getElementById(`btnPlayMaster`),hp=document.getElementById(`timelineSlider`),gp=document.getElementById(`currentTimeLabel`),_p=document.getElementById(`totalTimeLabel`),vp=document.getElementById(`canvasVisualizer`),yp=document.getElementById(`btnDlVocals`),bp=document.getElementById(`btnDlBgm`),xp=document.getElementById(`btnDlDrums`),Sp=document.getElementById(`btnDlBass`),Cp=document.getElementById(`btnDlOther`),wp=document.getElementById(`btnDlZip`),Tp=document.getElementById(`btnReset`),Ep=document.getElementById(`openGuideBtn`),Dp=document.getElementById(`closeGuideBtn`),Op=document.getElementById(`guideModal`),kp=null,Ap=null,jp=`demucs`,Mp=null,Np={},Pp=null,Fp={},Ip=!1,Lp=0,Rp=0,zp=null,Bp=null;async function Vp(){try{let e=await Xf();e.hasWebGPU?(sp.textContent=`⚡ WebGPU Hardware Accelerated (${e.threads} cores)`,sp.className=`badge green`):(sp.textContent=`⚡ WASM Multi-Threaded (${e.threads} cores)`,sp.className=`badge purple`)}catch{sp.textContent=`⚡ WebAssembly Enabled`}}Vp(),ip.addEventListener(`click`,()=>{jp=`demucs`,ip.classList.add(`selected`),ap.classList.remove(`selected`),ip.querySelector(`input`).checked=!0}),ap.addEventListener(`click`,()=>{jp=`dsp`,ap.classList.add(`selected`),ip.classList.remove(`selected`),ap.querySelector(`input`).checked=!0}),$f.addEventListener(`dragover`,e=>{e.preventDefault(),$f.classList.add(`drag-over`)}),$f.addEventListener(`dragleave`,()=>$f.classList.remove(`drag-over`)),$f.addEventListener(`drop`,e=>{e.preventDefault(),$f.classList.remove(`drag-over`),e.dataTransfer.files&&e.dataTransfer.files[0]&&Hp(e.dataTransfer.files[0])}),ep.addEventListener(`change`,e=>{e.target.files&&e.target.files[0]&&Hp(e.target.files[0])});function Hp(e){kp=e,tp.textContent=`Selected: ${e.name}`,np.textContent=`File size: ${(e.size/1048576).toFixed(2)} MB &bull; Ready to separate`,op.disabled=!1,op.innerHTML=`<span>🚀 Separate Audio with ${jp===`demucs`?`Meta Demucs AI`:`Instant DSP`}</span>`}rp.addEventListener(`click`,e=>{e.stopPropagation(),tp.textContent=`Demo Track Selected: Synthwave Pop (Vocals & BGM)`,np.textContent=`Synthetic 44.1kHz demo song with lead vocal melody and background drums/bass.`;let t=44100,n=t*12,r=new Float32Array(n),i=new Float32Array(n);for(let e=0;e<n;e++){let n=e/t,a=Math.sin(2*Math.PI*60*Math.exp(-n%.5*15))*Math.exp(-n%.5*10)*.4,o=Math.sin(2*Math.PI*220*n)*.15+Math.sin(2*Math.PI*330*n)*.1,s=Math.sin(2*Math.PI*261.6*n)*.15+Math.sin(2*Math.PI*392*n)*.1,c=Math.floor(n*2)%4==0?440:Math.floor(n*2)%4==1?493.88:Math.floor(n*2)%4==2?523.25:392,l=(Math.sin(2*Math.PI*c*n)+.3*Math.sin(2*Math.PI*c*2*n))*.35;r[e]=a+o+l,i[e]=a+s+l}let a=h(r,i,t);kp=new File([a],`Demo_Synthwave_Vocals_and_BGM.wav`,{type:`audio/wav`}),op.disabled=!1,op.innerHTML=`<span>🚀 Separate Demo Audio with ${jp===`demucs`?`Meta Demucs AI`:`Instant DSP`}</span>`}),op.addEventListener(`click`,async()=>{if(kp){op.disabled=!0,cp.style.display=`block`,pp.style.display=`none`,Qp(),Up(0,`Decoding input file audio stream...`);try{Ap=await f(kp,e=>Up(5,e)),jp===`dsp`?(Up(40,`Running Center Channel DSP Vocal Extractor...`),await new Promise(e=>setTimeout(e,200)),Mp=p(Ap.left,Ap.right,44100),Up(90,`Encoding stem WAV buffers...`)):(Up(10,`Checking / Loading Meta HTDemucs AI Model (~172MB)...`),await Zf({onDownloadProgress:(e,t)=>{let n=Math.min(45,10+Math.round(e/t*35));Up(n,`Downloading Neural Weights: ${(e/1048576).toFixed(1)}MB / ${(t/1048576).toFixed(1)}MB (${n}%)`)},onStatus:e=>Up(null,e)}),Up(50,`Demucs AI Engine is separating stems...`),Mp=await Qf(Ap.left,Ap.right,{onProgress:e=>{Up(Math.min(95,50+Math.round(e*45)),`Neural Inference: ${(e*100).toFixed(1)}% complete`)},onStatus:e=>Up(null,e)})),Up(96,`Creating high-fidelity 16-bit WAV audio files...`),Np={vocals:h(Mp.vocals.left,Mp.vocals.right,44100),no_vocals:h(Mp.no_vocals.left,Mp.no_vocals.right,44100),drums:h(Mp.drums.left,Mp.drums.right,44100),bass:h(Mp.bass.left,Mp.bass.right,44100),other:h(Mp.other.left,Mp.other.right,44100)},Up(100,`Audio Separation Complete! Initializing Studio Mixer...`),await new Promise(e=>setTimeout(e,400)),cp.style.display=`none`,Wp()}catch(e){console.error(`Separation error:`,e),fp.textContent=`❌ Error: ${e.message}`,lp.textContent=`Processing Failed`,op.disabled=!1}}});function Up(e,t){e!==null&&(up.textContent=`${e}%`,dp.style.width=`${e}%`),t&&(fp.textContent=t)}async function Wp(){pp.style.display=`block`,pp.scrollIntoView({behavior:`smooth`}),document.querySelectorAll(`.demucs-only`).forEach(e=>e.style.display=jp===`demucs`?`flex`:`none`);let e=Ap.duration;_p.textContent=tm(e),gp.textContent=`0:00`,hp.value=0,hp.max=e,!Pp||Pp.state===`closed`?Pp=new(window.AudioContext||window.webkitAudioContext):Pp.state===`suspended`&&await Pp.resume(),Bp=Pp.createAnalyser(),Bp.fftSize=256,Bp.connect(Pp.destination);let t=[`vocals`,`no_vocals`,`drums`,`bass`,`other`];Fp={};for(let e of t){let t=document.getElementById(`vol_${e}`);Fp[e]={volume:t?parseFloat(t.value):1,isMuted:!1,isSolo:!1,gainNode:null,source:null,audioBuffer:await Kp(Mp[e])}}yp.onclick=()=>g(Np.vocals,`${Gp()}_VOCALS_ONLY.wav`),bp.onclick=()=>g(Np.no_vocals,`${Gp()}_BACKGROUND_MUSIC_ONLY.wav`),xp.onclick=()=>g(Np.drums,`${Gp()}_DRUMS.wav`),Sp.onclick=()=>g(Np.bass,`${Gp()}_BASS.wav`),Cp.onclick=()=>g(Np.other,`${Gp()}_INSTRUMENTS.wav`),wp.onclick=()=>_(Np,Gp()),qp(),em()}function Gp(){return kp.name.replace(/\.[^/.]+$/,``).replace(/[^a-zA-Z0-9_\-]/g,`_`)}async function Kp(e){let t=e.left.length,n=Pp.createBuffer(2,t,44100);return n.copyToChannel(e.left,0),n.copyToChannel(e.right,1),n}function qp(){for(let e of[`vocals`,`no_vocals`,`drums`,`bass`,`other`]){let t=document.getElementById(`vol_${e}`);t&&(t.oninput=t=>{let n=parseFloat(t.target.value);Fp[e].volume=n,Yp(e)});let n=document.querySelector(`.btn-mute[data-stem="${e}"]`);n&&(n.onclick=()=>{Fp[e].isMuted=!Fp[e].isMuted,n.classList.toggle(`active`,Fp[e].isMuted),Jp()});let r=document.querySelector(`.btn-solo[data-stem="${e}"]`);r&&(r.onclick=()=>{Fp[e].isSolo=!Fp[e].isSolo,r.classList.toggle(`active`,Fp[e].isSolo),Jp()})}}function Jp(){let e=Object.values(Fp).some(e=>e.isSolo);for(let t of Object.keys(Fp))Yp(t,e)}function Yp(e,t=null){t===null&&(t=Object.values(Fp).some(e=>e.isSolo));let n=Fp[e];n&&n.gainNode&&(n.isMuted?n.gainNode.gain.setValueAtTime(0,Pp.currentTime):t?n.gainNode.gain.setValueAtTime(n.isSolo?n.volume:0,Pp.currentTime):n.gainNode.gain.setValueAtTime(n.volume,Pp.currentTime))}mp.addEventListener(`click`,()=>{Ip?Zp():Xp(Rp)}),hp.addEventListener(`input`,e=>{let t=parseFloat(e.target.value);gp.textContent=tm(t),Ip?(Qp(!1),Xp(t)):Rp=t});function Xp(e=0){Pp.state===`suspended`&&Pp.resume(),Qp(!1),Lp=Pp.currentTime-e,Rp=e,Ip=!0,mp.innerHTML=`⏸`;let t=Object.values(Fp).some(e=>e.isSolo);for(let[n,r]of Object.entries(Fp))r.source=Pp.createBufferSource(),r.source.buffer=r.audioBuffer,r.gainNode=Pp.createGain(),Yp(n,t),r.source.connect(r.gainNode),r.gainNode.connect(Bp),r.source.start(0,e);$p()}function Zp(){Ip&&(Rp=Pp.currentTime-Lp,Qp(!1))}function Qp(e=!0){Ip=!1,mp.innerHTML=`▶`,zp&&=(cancelAnimationFrame(zp),null);for(let e of Object.values(Fp)){if(e.source){try{e.source.stop()}catch{}try{e.source.disconnect()}catch{}e.source=null}if(e.gainNode){try{e.gainNode.disconnect()}catch{}e.gainNode=null}}e&&(Rp=0,hp.value=0,gp.textContent=`0:00`)}function $p(){if(!Ip)return;let e=Pp.currentTime-Lp;e>=Ap.duration?Qp(!0):(hp.value=e,gp.textContent=tm(e),em(),zp=requestAnimationFrame($p))}function em(){let e=vp,t=e.getContext(`2d`),n=e.width=e.clientWidth*window.devicePixelRatio,r=e.height=e.clientHeight*window.devicePixelRatio;if(!Bp||!Ip){t.clearRect(0,0,n,r),t.strokeStyle=`rgba(56, 189, 248, 0.2)`,t.lineWidth=2,t.beginPath(),t.moveTo(0,r/2),t.lineTo(n,r/2),t.stroke();return}let i=Bp.frequencyBinCount,a=new Uint8Array(i);Bp.getByteTimeDomainData(a),t.clearRect(0,0,n,r),t.lineWidth=3;let o=t.createLinearGradient(0,0,n,0);o.addColorStop(0,`#38bdf8`),o.addColorStop(.5,`#a855f7`),o.addColorStop(1,`#f43f5e`),t.strokeStyle=o,t.beginPath();let s=n/i,c=0;for(let e=0;e<i;e++){let n=a[e]/128*r/2;e===0?t.moveTo(c,n):t.lineTo(c,n),c+=s}t.lineTo(n,r/2),t.stroke()}function tm(e){let t=Math.floor(e/60),n=Math.floor(e%60);return`${t}:${n<10?`0`:``}${n}`}Tp.addEventListener(`click`,()=>{Qp(!0),pp.style.display=`none`,kp=null,Ap=null,Mp=null,Np={},tp.textContent=`Drop your Audio or Video file here`,np.textContent=`Click to browse or drag and drop any file`,op.disabled=!0,op.innerHTML=`<span>🚀 Select Audio or Video to Start</span>`}),Ep.addEventListener(`click`,()=>Op.style.display=`flex`),Dp.addEventListener(`click`,()=>Op.style.display=`none`),Op.addEventListener(`click`,e=>{e.target===Op&&(Op.style.display=`none`)});