(function(){var a;a={};this.Cryptobox=a;a.json=null;this.p=function(b){return typeof console!=="undefined"&&console!==null?console.log(b):void 0};a.measure=function(d,f){var e,c,b;e=Date.now();b=f();c=Date.now();p(""+d+" "+(c-e)+"ms");return b};a.decrypt=function(h,e,i,g,f,d){var b,c;c=CryptoJS.PBKDF2(h,CryptoJS.enc.Base64.parse(e),{keySize:f/32,iterations:g});b=CryptoJS.AES.decrypt(i,c,{mode:CryptoJS.mode.CBC,iv:CryptoJS.enc.Base64.parse(d),padding:CryptoJS.pad.Pkcs7});return b.toString(CryptoJS.enc.Utf8)};a.open=function(c,d){var b;b=function(e,f){return setTimeout(function(){var g;try{g=a.measure("decrypt",function(){return JSON.parse(a.decrypt(c,e.pbkdf2.salt,e.ciphertext,e.pbkdf2.iterations,e.aes.keylen,e.aes.iv))});return f(g,null)}catch(h){return f(null,"Incorrect password! "+h)}},10)};if(a.json){return b(a.json,d)}else{return cryptobox.dropbox.read(function(e,f){if(e){d(null,"Can't read file 'cryptobox.json ("+e+")'");return}return b($.parseJSON(f),d)})}};a.addBr=function(b){if(b){return b.replace(/\n/g,"<br />")}return""};a.render=function(c,b){return a.measure("render "+c,function(){return Handlebars.templates[c](b)})}}).call(this);(function(){var a;a={};chrome.extension.getBackgroundPage().json=null;chrome.extension.onRequest.addListener(function(f,e,c){var b,d;b=document.getElementsByTagName("body")[0];d=document.createElement("textarea");b.appendChild(d);d.value=f.text;d.select();document.execCommand("copy",false,null);b.removeChild(d);return c({})});chrome.tabs.onUpdated.addListener(function(b,d,c){var e;if(d.status==="complete"&&b in a){e={type:"fillForm",cfg:a[b]};chrome.tabs.sendMessage(b,e,function(){});return delete a[b]}})}).call(this);