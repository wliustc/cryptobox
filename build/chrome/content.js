(function(){var a;a={};this.Cryptobox=a;a.json=null;this.p=function(b){return typeof console!=="undefined"&&console!==null?console.log(b):void 0};a.measure=function(d,f){var e,c,b;e=Date.now();b=f();c=Date.now();p(""+d+" "+(c-e)+"ms");return b};a.decrypt=function(h,e,i,g,f,d){var b,c;c=CryptoJS.PBKDF2(h,CryptoJS.enc.Base64.parse(e),{keySize:f/32,iterations:g});b=CryptoJS.AES.decrypt(i,c,{mode:CryptoJS.mode.CBC,iv:CryptoJS.enc.Base64.parse(d),padding:CryptoJS.pad.Pkcs7});return b.toString(CryptoJS.enc.Utf8)};a.open=function(c,d){var b;b=function(e,f){return setTimeout(function(){var g;try{g=a.measure("decrypt",function(){return JSON.parse(a.decrypt(c,e.pbkdf2.salt,e.ciphertext,e.pbkdf2.iterations,e.aes.keylen,e.aes.iv))});return f(g,null)}catch(h){return f(null,"<%= @text[:incorrect_password] %> "+h)}},10)};if(a.json){return b(a.json,d)}else{return cryptobox.dropbox.read(function(e,f){if(e){d(null,"Can't read file 'cryptobox.json ("+e+")'");return}return b($.parseJSON(f),d)})}};a.addBr=function(b){if(b){return b.replace(/\n/g,"<br />")}return""};a.render=function(c,b){return a.measure("render "+c,function(){return Handlebars.templates[c](b)})}}).call(this);(function(){Cryptobox.Form={};Cryptobox.Form.withToken=function(b){var a,d,c;if(b.action==="__token__"){return true}c=b.fields;for(a in c){d=c[a];if(d==="__token__"){return true}}return false};Cryptobox.Form.login=function(f,a,b){var e,i,g,h,d,c;if(a.broken){return}if(b!==void 0){if(a.action==="__token__"){a.action=b.form.action}d=a.fields;for(i in d){g=d[i];if(g==="__token__"){a.fields[i]=b.form.fields[i]}}}h=null;if(f){h=window.open(a.action,a.name);if(!h){return}}else{h=window;document.close();document.open()}e="<html><head></head><body><%= @text[:wait_for_login] %><form id='formid' method='"+a.method+"' action='"+a.action+"'>";c=a.fields;for(i in c){g=c[i];e+="<input type='hidden' name='"+i+"' value='"+a.fields[i]+"' />"}e+="</form><script type='text/javascript'>document.getElementById('formid').submit()</s";e+="cript></body></html>";h.document.write(e);return h};Cryptobox.Form.fill=function(d){var h,c,g,f,b,e,a;e=document.querySelectorAll("input[type=text], input[type=password]");a=[];for(f=0,b=e.length;f<b;f++){c=e[f];g=null;for(h in d.fields){if(h===c.attributes.name.value){g=d.fields[h]}}if(g){a.push(c.value=g)}else{a.push(void 0)}}return a};Cryptobox.Form.sitename=function(a){return a.replace(/[^/]+\/\/([^/]+).+/,"$1").replace(/^www./,"")};Cryptobox.Form.toJson=function(){var m,f,e,k,b,a,c,n,i,h,l,d,j,g;m=document.URL;c=document.title;n="";j=document.forms;for(i=0,l=j.length;i<l;i++){e=j[i];k="";g=e.elements;for(h=0,d=g.length;h<d;h++){f=g[h];if(f.name===""){continue}if(k===""){k='\t\t\t"'+f.name+'": "'+f.value+'"'}else{k+=',\n\t\t\t"'+f.name+'": "'+f.value+'"'}}a=e.method;if(a!=="get"){a=post}b='\t\t"action": "'+e.action+'",\n\t\t"method": "'+a+'",\n\t\t"fields":\n\t\t{\n'+k+"\n\t\t}";if(n===""){n+="[\n"}else{n+=",\n"}n+='{\n\t"name": "'+c+'",\n\t"address": "'+m+'",\n\t"form":\n\t{\n'+b+"\n\t}\n}\n"}if(n){n+="]"}return n}}).call(this);(function(){chrome.extension.onMessage.addListener(function(c,b,a){if(c.type==="fillForm"){Cryptobox.Form.fill(c.data.form);return a({})}else{if(c.type==="getFormJson"){return a(Cryptobox.Form.toJson())}else{return a({})}}});window.addEventListener("keyup",(function(a){if(a.ctrlKey&&a.keyCode){return a.keyCode===220}}),false)}).call(this);