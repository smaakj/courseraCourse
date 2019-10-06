var __extends=this&&this.__extends||function(){var c=function(b,a){c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d])};return c(b,a)};return function(b,a){function d(){this.constructor=b}c(b,a);b.prototype=null===a?Object.create(a):(d.prototype=a.prototype,new d)}}(),Migration=function(){return function(){}}(),Migrator=function(){function c(b){this.migrations=[];this.progress=0;this.hasLinkedAccount=
!!c.migrationBackground.getLinkedUsername();this.migrations=b.sort(function(a,d){if(a.version<d.version)return-1;if(a.version>d.version)return 1;throw Error("Duplicate migrations!");})}c.executeMigrations=function(b){var a=this,d=[];if(!c.migrationsRunning)if("loading"==document.readyState)document.addEventListener("DOMContentLoaded",function(){c.executeMigrations()});else{c.formfillMigrationBackground.isEnabled()&&d.push(new FormfillAndNotesMigration);var e=new c(d);this.migrationBackground.getLinkedBlobVersion(function(d){var g=
a.migrationBackground.getBlobVersion();null!==g&&(e.hasPendingMigrations(g)||null!==d&&e.hasPendingMigrations(d))&&(c.setMigrationInProgress(),b&&e.setProgressCallback(b),null!==d&&e.hasPendingMigrations(d)?e.migrateLinked(d,function(){e.hasPendingMigrations(g)?e.migrate(g,function(){c.setMigrationFinished()}):c.setMigrationFinished()}):e.migrate(g,function(){c.setMigrationFinished()}))})}};Object.defineProperty(c,"migrationBackground",{get:function(){return c.getBg().MigrationBackground},enumerable:!0,
configurable:!0});c.getBg=function(){return"undefined"!==typeof bg?bg:getBG()};c.setMigrationInProgress=function(){c.migrationsRunning=!0;this.migrationBackground.publishState(!0)};c.setMigrationFinished=function(){c.migrationsRunning=!1;this.migrationBackground.publishState(!1);location.reload()};Object.defineProperty(c,"formfillMigrationBackground",{get:function(){return c.getBg().FormfillMigrationBackground},enumerable:!0,configurable:!0});c.prototype.setProgressCallback=function(b){this.progressCallback=
b};c.prototype.hasPendingMigrations=function(b){for(var a=0,d=this.migrations;a<d.length;a++)if(b<d[a].version)return!0;return!1};c.prototype.migrateLinked=function(b,a){var d=this;if(this.hasLinkedAccount){this.updateProgress();for(var e=function(e){if(b<e.version)return e.migrateLinked(function(){d.progress+=100;d.migrateLinked(e.version,a)},function(a,b){d.updateProgress(Math.floor(a/Math.max(b,1)*100))}),{value:void 0}},g=0,f=this.migrations;g<f.length;g++){var h=e(f[g]);if("object"===typeof h)return h.value}c.migrationBackground.saveLinkedBlobVersion(b,
function(){a&&a(b)})}else a(b)};c.prototype.migrate=function(b,a){var d=this;this.updateProgress();for(var e=function(e){if(b<e.version)return e.migrate(function(){d.progress+=100;d.migrate(e.version,a)},function(a,b){d.updateProgress(Math.floor(a/Math.max(b,1)*100))}),{value:void 0}},g=0,f=this.migrations;g<f.length;g++){var h=e(f[g]);if("object"===typeof h)return h.value}c.migrationBackground.saveBlobVersion(b,function(){a&&a(b)})};c.prototype.updateProgress=function(b){void 0===b&&(b=0);this.progressCallback&&
this.progressCallback(this.progress+Math.min(b,100),100*this.migrations.length*(this.hasLinkedAccount?2:1))};c.migrationsRunning=!1;return c}(),ObservableState=function(){function c(){this.stateSubscribers=[];this.temporarySubscribers=[];this._wasMigration=this.isRunning=!1}c.prototype.subscribeToState=function(b){b&&-1===this.stateSubscribers.indexOf(b)&&(this.stateSubscribers.push(b),this.isRunning&&b(this.isRunning))};c.prototype.subscribeToStateOnce=function(b){b&&-1===this.stateSubscribers.indexOf(b)&&
this.temporarySubscribers.push(b)};c.prototype.wasMigration=function(b){b(this._wasMigration)};c.prototype.publishState=function(b){this.isRunning&&!b&&(this._wasMigration=!0);this.isRunning=b;for(var a=0,d=this.stateSubscribers;a<d.length;a++)(0,d[a])(b);a=this.temporarySubscribers;this.temporarySubscribers=[];for(d=0;d<a.length;d++)(0,a[d])(b)};c.prototype.setStateWasMigration=function(b){this._wasMigration=b};return c}(),MigrationBackgroundBase=function(c){function b(){var a=c.call(this)||this;
a.targetBlobVersion=20170404140712;a._shouldStartMigration=!1;a.init();return a}__extends(b,c);b.prototype.init=function(){var a=this;"undefined"!==typeof Topics&&Topics.get(Topics.BLOB_UPDATED).subscribeFirst(function(){a.getServerBlobVersion(function(d){g_blob_version={version:d};a.alertForMigration()})})};Object.defineProperty(b.prototype,"apiUrl",{get:function(){var a="/lmiapi";"string"===typeof base_url&&(a=base_url.replace(/\/$/,"")+a);return a},enumerable:!0,configurable:!0});b.prototype.setOmarFlagsTrue=
function(){LPContentScriptFeatures&&(LPContentScriptFeatures.omaria=!0,LPContentScriptFeatures.ziggy=!0,LPContentScriptFeatures.better_generate_password_enabled=!0)};b.prototype.getShouldStartMigration=function(a){a&&a(this._shouldStartMigration)};b.prototype.setShouldStartMigration=function(a){this._shouldStartMigration=a};b.prototype.getBlobVersion=function(){return"undefined"!==typeof g_blob_version&&"undefined"!==typeof g_blob_version.version?Number(g_blob_version.version):0};b.prototype.setBlobVersion=
function(a){g_blob_version={version:a}};b.prototype.hasFormFills=function(){return"undefined"!==typeof g_formfills&&0<g_formfills.length};b.prototype.hasBeenMigrated=function(){return this.getBlobVersion()>=this.targetBlobVersion};b.prototype.getLinkedUsername=function(){for(var a=0,d=g_shares;a<d.length;a++){var b=d[a];if("undefined"!=typeof b.associative&&1==b.associative)return b.decsharename}return null};b.prototype.saveBlobVersion=function(a,d){this.setBlobVersion(a);this.setOmarFlagsTrue();
this.saveVersionRequest(this.apiUrl+"/users/me/blobversion",a,d)};b.prototype.saveLinkedBlobVersion=function(a,d){this.setBlobVersion(a);this.setOmarFlagsTrue();this.saveVersionRequest(this.apiUrl+"/users/me/blobversion/linked",a,d)};b.prototype.saveProperBlobVersion=function(a,d){this.getLinkedUsername()&&this.saveLinkedBlobVersion(a,d);this.saveBlobVersion(a,d)};b.prototype.shouldShowMigrationNotification=function(){return LPContentScriptFeatures.migration_opt_in&&!LPContentScriptFeatures.omaria&&
!this.hasBeenMigrated()};b.prototype.alertForMigration=function(){this.shouldShowMigrationNotification()&&(this.hasFormFills()?this.showMigrationAlert():(this.setMigrationState(!0),this.saveProperBlobVersion(this.targetBlobVersion,function(){openvault(!0,!1,!1,function(){setTimeout(function(){location.reload()},500)})})))};b.prototype.postponeMigration=function(a){var d=this;setTimeout(function(){d.alertForMigration()},a)};b.prototype.sendSegmentEvent=function(a,d){sendLpImprove(a,d)};b.prototype.setMigrationState=
function(a){this.setStateWasMigration(a)};return b}(ObservableState),MigrationBackgroundWeb=function(c){function b(){return null!==c&&c.apply(this,arguments)||this}__extends(b,c);b.prototype.getLinkedBlobVersion=function(a){this.getLinkedUsername()?$.get(this.apiUrl+"/users/me/blobversion/linked",function(d){a(d.version)}):a(null)};b.prototype.getServerBlobVersion=function(a){$.get(this.apiUrl+"/users/me/blobversion",function(d){a(d.version)})};b.prototype.saveVersionRequest=function(a,d,b){this.getToken(function(e){$.ajax({url:a,
method:"POST",dataType:"json",contentType:"application/json",data:JSON.stringify({version:d}),headers:{"x-csrf-token":e},success:function(){g_blob_version.version=d;b&&b()}})})};b.prototype.getToken=function(a){$.post(this.apiUrl+"/csrf",function(d){a(d)})};b.prototype.showMigrationAlert=function(){};return b}(MigrationBackgroundBase),MigrationBackgroundExtension=function(c){function b(){return null!==c&&c.apply(this,arguments)||this}__extends(b,c);b.prototype.getLinkedBlobVersion=function(a){this.getLinkedUsername()?
LP.lpMakeRequestReallyReal(this.apiUrl+"/users/me/blobversion/linked","",function(d){4===d.readyState&&200===d.status?(d=JSON.parse(d.responseText),a(d.version)):4===d.readyState&&lpmakerequesterror("invalidresponse",{url:d.responseURL},!1)},void 0,{method:"GET"}):a(null)};b.prototype.getServerBlobVersion=function(a){var d=this;this._serverReqCallback=a;LP.lpMakeRequestReallyReal(this.apiUrl+"/users/me/blobversion","",function(b){4===b.readyState&&200===b.status?(b=JSON.parse(b.responseText),a(b.version)):
4===b.readyState&&setTimeout(d._serverReqCallback,1E3)},void 0,{method:"GET"})};b.prototype.saveVersionRequest=function(a,b,e){this.getToken(function(d){LP.lpMakeRequestReallyReal(a,JSON.stringify({version:b}),function(a){4===a.readyState&&200===a.status?(g_blob_version.version=b,e&&e()):4===a.readyState&&lpmakerequesterror("invalidresponse",{url:a.responseURL},!1)},void 0,{"x-csrf-token":d,"Content-Type":"application/json"})})};b.prototype.getToken=function(a){LP.lpMakeRequestReallyReal(this.apiUrl+
"/csrf","",function(b){4===b.readyState&&200===b.status?a(JSON.parse(b.responseText)):4===b.readyState&&lpmakerequesterror("invalidresponse",{url:b.responseURL},!1)})};b.prototype.showMigrationAlert=function(){g_badgedata={cmd:"migration"};"undefined"!==typeof drawIconAtRotation&&drawIconAtRotation()};return b}(MigrationBackgroundBase),FormfillStore=function(){function c(){}c.prototype.getLinkedFormfills=function(){this.useShareKey=!0;return this.decrypt(this.linkedEncryptedFormfills)};c.prototype.getFormfills=
function(){this.useShareKey=!1;return this.decrypt(this.encryptedFormfills)};c.prototype.decrypt=function(b){for(var a=[],d=0;d<b.length;d++){var e=b[d],c=new FormFillType,f;for(f in e)if(e.hasOwnProperty(f)){var h=void 0;c[f]=e[f];if("custom_fields"===f){c[f]=[];for(var k in e[f]){c[f][k]=this.objectAssign({},e[f][k]);var m=c[f][k],n;for(n in m)m[n]&&(h=this.decryptString(m[n],!0))&&(m[n]=h)}}else c[f]&&(h=this.decryptString(c[f],!0))&&(c[f]=h)}c.decprofilename||(c.decprofilename=c.profilename);
a.push(c)}return a};c.prototype.objectAssign=function(b,a){for(var d=1;d<arguments.length;d++){var c=arguments[d];if(null!=c)for(var g in c)Object.prototype.hasOwnProperty.call(c,g)&&(b[g]=c[g])}return b};return c}(),FormFillType=function(){function c(){this.monthNames=" January February March April May June July August September October November December".split(" ")}c.prototype.hasSocialSecurityNumber=function(){return!!this.ssn};c.prototype.hasAddressData=function(){return!!(this.title||this.firstname||
this.middlename||this.lastname||this.username||this.gender||this.birthday||this.company||this.address1||this.address2||this.address3||this.city||this.county||this.timezone||this.email||this.phone||this.mobilephone||this.evephone||this.fax||this.faxphone||this.eve3lcc||this.mobile3lcc||!this.hasSocialSecurityNumber()&&!this.hasPaymentCardData()&&!this.hasBankNoteData()&&this.notes)};c.prototype.hasPaymentCardData=function(){return!!(this.ccname||this.ccnum||this.ccstart||this.ccexp||this.cccsc||this.ccissuenum)};
c.prototype.hasBankNoteData=function(){return!!(this.bankname||this.bankroutingnum||this.bankacctnum)};c.prototype.hasCustomFields=function(){return!!this.custom_fields.length};c.prototype.getSerializedPhone=function(){return this.phone?JSON.stringify({num:this.phone,ext:this.phoneext,cc3l:this.phone3lcc}):""};c.prototype.getSerializedEveningPhone=function(){return this.evephone?JSON.stringify({num:this.evephone,ext:this.eveext,cc3l:this.evephone3lcc||this.eve3lcc}):""};c.prototype.getSerializedMobilePhone=
function(){return this.mobilephone?JSON.stringify({num:this.mobilephone,ext:this.mobileext,cc3l:this.mobilephone3lcc||this.mobile3lcc}):""};c.prototype.getSerializedFax=function(){return this.fax||this.faxphone?JSON.stringify({num:this.fax||this.faxphone,ext:this.faxext,cc3l:this.fax3lcc}):""};c.prototype.getBirthdayLastpassFormat=function(){var b=/([^-]*)-([^-]*)-([^-]*)/g.exec(this.birthday);return b&&3<=b.length?this.monthNames[Number(b[2])]+","+b[3]+","+b[1]:",,"};c.prototype.getCreditCardStartLastpassFormat=
function(){var b=/([^-]*)-([^-]*)/g.exec(this.ccstart);return b&&2<=b.length?this.monthNames[Number(b[2])]+","+b[1]:","};c.prototype.getCreditCardExpireLastpassFormat=function(){var b=/([^-]*)-([^-]*)/g.exec(this.ccexp);return b&&2<=b.length?this.monthNames[Number(b[2])]+","+b[1]:","};return c}(),NoteType=function(){return function(){}}(),FormfillAndNotesMigration=function(c){function b(){var a=null!==c&&c.apply(this,arguments)||this;a.fieldMaxLength=50;a.migrationQueue=[];a.successCallback=function(){};
a.progress=-1;a.startSegmentEventSent=!1;a.noteAdditionHandler=function(){a.executeNextMigration()};return a}__extends(b,c);Object.defineProperty(b.prototype,"version",{get:function(){return 20170404140712},enumerable:!0,configurable:!0});b.prototype.migrateLinked=function(a,b){this.successCallback=a;this.progressCallback=b;this.sendStartSegmentEventOnce();a=this.formfillMigrationBackground.getLinkedFormfills();this.migrateFormfills(a);this.attachMigrationQueueExecutor()};b.prototype.migrate=function(a,
b){this.successCallback=a;this.progressCallback=b;this.sendStartSegmentEventOnce();a=this.formfillMigrationBackground.getFormfills();this.migrateFormfills(a);this.attachMigrationQueueExecutor()};b.prototype.sendStartSegmentEventOnce=function(){this.startSegmentEventSent||(this.migrationBackground.sendSegmentEvent("migration::formfill::started"),this.startSegmentEventSent=!0)};b.prototype.migrateFormfills=function(a){for(var b=this,c=function(a){a.hasSocialSecurityNumber()&&g.migrationQueue.push(function(){b.saveSocialSecurityNumberNote(a)});
a.hasAddressData()&&g.migrationQueue.push(function(){b.saveAddressNote(a)});a.hasPaymentCardData()&&g.migrationQueue.push(function(){b.savePaymentCardNote(a)});a.hasBankNoteData()&&g.migrationQueue.push(function(){b.saveBankAccountNote(a)});a.hasCustomFields()&&g.migrationQueue.push(function(){b.saveCustomFields(a)})},g=this,f=0;f<a.length;f++)c(a[f])};b.prototype.saveSocialSecurityNumberNote=function(a){var b={group:a.group,name:a.decprofilename,notetype:this.getNoteTypes().SSN,pwprotect:a.pwprotect,
fav:"0",language:a.profilelanguage,extra:{Name:a.firstname+" "+a.middlename+" "+a.lastname,Number:a.ssn,Notes:a.notes?""+a.notes:""}};this.saveNote(b,a.ffid)};b.prototype.saveAddressNote=function(a){var b={group:a.group,name:a.decprofilename,notetype:this.getNoteTypes().ADDRESS,pwprotect:a.pwprotect,fav:"0",language:a.profilelanguage,extra:{Title:a.title,"First Name":a.firstname,"Middle Name":a.middlename,"Last Name":a.lastname,Username:a.username,Gender:a.gender,Birthday:a.getBirthdayLastpassFormat(),
Company:a.company,"Address 1":a.address1,"Address 2":a.address2,"Address 3":a.address3,"City / Town":a.city,County:a.county,State:a.state,"Zip / Postal Code":a.zip,Country:a.country,Timezone:a.timezone,"Email Address":a.email,Phone:a.getSerializedPhone(),"Evening Phone":a.getSerializedEveningPhone(),"Mobile Phone":a.getSerializedMobilePhone(),Fax:a.getSerializedFax(),Notes:a.notes?a.notes:""}};this.saveNote(b,a.ffid)};b.prototype.savePaymentCardNote=function(a){var b={group:a.group,name:a.decprofilename,
notetype:this.getNoteTypes().CREDIT,pwprotect:a.pwprotect,fav:"0",language:a.profilelanguage,extra:{"Name on Card":a.ccname,Type:"",Number:a.ccnum,"Security Code":a.cccsc,"Start Date":a.getCreditCardStartLastpassFormat(),"Expiration Date":a.getCreditCardExpireLastpassFormat(),Notes:(a.notes?a.notes+"\n":"")+(a.ccissuenum?"Issue number: "+a.ccissuenum:"")}};this.saveNote(b,a.ffid)};b.prototype.saveBankAccountNote=function(a){var b={group:a.group,name:a.decprofilename,notetype:this.getNoteTypes().BANK,
pwprotect:a.pwprotect,fav:"0",language:a.profilelanguage,extra:{"Bank Name":a.bankname,"Account Type":"","Routing Number":a.bankroutingnum,"Account Number":a.bankacctnum,"SWIFT Code":"","IBAN Number":"",Pin:"","Branch Address":"","Branch Phone":"",Notes:a.notes}};this.saveNote(b,a.ffid)};b.prototype.saveCustomFields=function(a){for(var b=this,c=this.escape("Formfill "+a.decprofilename),g=[],f=[],h="",k={},m=0,n=a.custom_fields;m<n.length;m++){var p=n[m],l=this.escape(p.text);l.length>this.fieldMaxLength&&
(l=l.substring(0,this.fieldMaxLength));l||(l="empty");-1!==p.text.indexOf("\n")||-1!==p.value.indexOf("\n")?h+=p.text+":"+p.value+"\n":-1===f.indexOf(l)&&(g.push({text:l,type:"text",options:null}),k[l]=p.value,f.push(l))}""!==h&&(g.push({text:"Notes",type:"textarea",options:null}),k.Notes=h);this.formfillMigrationBackground.createCustomNoteType(c,g,function(d){d={group:a.group,name:a.decprofilename,notetype:"Custom_"+d,pwprotect:a.pwprotect,fav:"0",language:a.profilelanguage,extra:k,template:JSON.stringify({id:d,
title:c,fields:g})};b.saveNote(d,a.ffid)})};b.prototype.escape=function(a){return a.replace(/&/g,"").replace(/</g,"").replace(/>/g,"").replace(/\(/g,"").replace(/\)/g,"").replace(/;/g,"").replace(/:/g,"").replace(/~/g,"").replace(/`/g,"").replace(/"/g,"").replace(/'/g,"")};b.prototype.saveNote=function(a,b){"undefined"!==typeof Note?this.saveInForeground(a,b):this.saveInBackground(a,b)};b.prototype.saveInForeground=function(a,b){var d=a.group;d||(d=Strings.Consts.NONE_GROUP);var c=LPProxy.getGroupByName(d);
!c&&d&&(c=LPProxy.getExistingGroupParent(d),c=new DummyGroup(d,c?c.getSharedGroup():null));d=new Note;d.add=this.getNotePatchedAddFunction(b);d.addFromDialog(a,c,{source:"vault"})};b.prototype.saveInBackground=function(a,b){var d=this;void 0===b&&(b="0");this.formfillMigrationBackground.saveNote(a,function(a){a&&"0"!==b&&d.saveIdentityInfo(a.aid,b);d.noteAdditionHandler()},b)};b.prototype.saveIdentityInfo=function(a,b){for(var d=0,c=LPProxy.getIdentities();d<c.length;d++){var f=c[d];f&&f.ffids&&f.ffids.split(",").includes(b)&&
(f.aids=f.aids?f.aids+","+a:a,LPRequest.makeUpdateRequest(LPProxy.saveIdentity,{params:{identity:f},success:function(){}}))}};b.prototype.getNotePatchedAddFunction=function(a){return function(b,c){(function(d,e){LPRequest.makeUpdateRequest(LPProxy.addNote,{parameters:[d,b,c],success:function(c){d.update(c,b,e);LPProxy.addItem(d);Topics.get(Topics.NOTE_ADDED).publish(d,b);var f=bg.get("g_identities");if(f)for(var g=0;g<f.length;g++){var h=f[g];h&&h.ffids&&h.ffids.split(",").includes(a)&&(h.aids=h.aids?
h.aids+","+c.aid:c.aid,LPRequest.makeUpdateRequest(LPProxy.saveIdentity,{params:{identity:h},success:function(){}}))}}})})(this,this._data.attacharraychanges)}};b.prototype.getNoteTypes=function(){return{ADDRESS:"Address",BANK:"Bank Account",CREDIT:"Credit Card",GENERIC:"Generic",SSN:"Social Security"}};b.prototype.attachMigrationQueueExecutor=function(){Topics.get(Topics.NOTE_ADDED).subscribe(this.noteAdditionHandler);this.progressMax=this.migrationQueue.length;this.executeNextMigration()};b.prototype.executeNextMigration=
function(){this.progress+=1;this.progressCallback&&this.progressCallback(this.progress,this.progressMax);this.migrationQueue.length?this.migrationQueue.pop()():(Topics.get(Topics.NOTE_ADDED).unsubscribe(this.noteAdditionHandler),this.migrationBackground.sendSegmentEvent("migration::formfill::completed"),this.successCallback())};b.prototype.getBg=function(){return"undefined"!==typeof bg?bg:getBG()};Object.defineProperty(b.prototype,"formfillMigrationBackground",{get:function(){return this.getBg().FormfillMigrationBackground},
enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"migrationBackground",{get:function(){return this.getBg().MigrationBackground},enumerable:!0,configurable:!0});return b}(Migration),FormfillMigrationBackgroundWeb=function(c){function b(){var a=c.call(this)||this;a.apiUrl="/lmiapi";"string"===typeof base_url&&(a.apiUrl=base_url.replace(/\/$/,"")+a.apiUrl);return a}__extends(b,c);b.prototype.isEnabled=function(){return LPContentScriptFeatures.migration_opt_in};b.prototype.createCustomNoteType=
function(a,b,c){var d=this;this.getToken(function(e){$.ajax({url:d.apiUrl+"/note-templates",type:"POST",dataType:"json",contentType:"application/json",headers:{"X-CSRF-TOKEN":e},data:JSON.stringify({title:a,method:"web",fields:b}),success:function(a){c(a.id)}})})};b.prototype.saveNote=function(a,b,c){throw Error("Migrate in the foreground!");};Object.defineProperty(b.prototype,"linkedEncryptedFormfills",{get:function(){return g_formfills.filter(function(a){return!!a.sharefolderid})},enumerable:!0,
configurable:!0});Object.defineProperty(b.prototype,"encryptedFormfills",{get:function(){return g_formfills.filter(function(a){return!a.sharefolderid})},enumerable:!0,configurable:!0});b.prototype.decryptString=function(a,b){var d=void 0;this.useShareKey&&(d=this.getShareKey());return lpmdec(a,b,d)};b.prototype.getToken=function(a){$.post(this.apiUrl+"/csrf",function(b){a(b)})};b.prototype.getShareKey=function(){for(var a=0,b=g_shares;a<b.length;a++){var c=b[a];if("undefined"!==typeof c.associative&&
1==c.associative)return c.key}};return b}(FormfillStore),FormfillMigrationBackgroundExtension=function(c){function b(){return null!==c&&c.apply(this,arguments)||this}__extends(b,c);Object.defineProperty(b.prototype,"apiUrl",{get:function(){var a="/lmiapi";"string"===typeof base_url&&(a=base_url.replace(/\/$/,"")+a);return a},enumerable:!0,configurable:!0});b.prototype.isEnabled=function(){return LPContentScriptFeatures.migration_opt_in};b.prototype.createCustomNoteType=function(a,b,c){var d=this;
this.getToken(function(e){LP.lpMakeRequestReallyReal(d.apiUrl+"/note-templates",JSON.stringify({title:a,method:"web",fields:b}),function(a){4===a.readyState&&200===a.status?c(JSON.parse(a.responseText).id):4===a.readyState&&lpmakerequesterror("invalidresponse",{url:a.responseURL},!1)},void 0,{"x-csrf-token":e,"Content-Type":"application/json"})})};b.prototype.saveNote=function(a,b,c){c={action:"",aid:"0",basic_auth:"0",captcha_id:"",custom_js:"",extra:"",fields:[],group:"",fiid:"",getpw:!1,individualshare:!1,
last_touch:"0",method:"",newvalues:[],realm_data:"",sharedfromuid:"",submit_id:"",urid:"0",fav:"0",username:"",password:"",sn:1,url:"http://sn"};var d=this.localKey;a.encname=lpmenc(a.name,!0,d);var e="NoteType:"+a.notetype+"\nLanguage:"+(a.language?a.language:"en-US"),h;for(h in a.extra)e+="\n"+h+":"+a.extra[h];a.extra=lpmenc(e,!0,d);for(var k in c)"undefined"===typeof a[k]&&(a[k]=c[k]);a.group&&(a.sharedfolderid=this.getShareId());this.saveSite(a,b)};Object.defineProperty(b.prototype,"linkedEncryptedFormfills",
{get:function(){return g_formfills.filter(function(a){return!!a.sharefolderid})},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"encryptedFormfills",{get:function(){return g_formfills.filter(function(a){return!a.sharefolderid})},enumerable:!0,configurable:!0});b.prototype.decryptString=function(a,b){var d=void 0;this.useShareKey&&(d=this.getShareKey());return lpmdec(a,b,d)};b.prototype.saveSite=function(a,b){var d=this,c=this.createPostData(a);saveSite(this.serializePostData(c),
a,b,function(){setTimeout(function(){d.saveSite(a,b)},3E4)})};b.prototype.createPostData=function(a){var b={extjs:1,localupdate:1,ajax:1,source:"vault"};b.aid=a.aid;b.name=lpenc(a.name,this.localKey);b.extra=crypto_btoa(a.extra);a.pwprotect&&(b.pwprotect="on");"1"===a.fav&&(b.fav="on");a.sharedfolderid&&(b.sharedfolderid=a.sharedfolderid,b.grouping="");b.url=AES.url2hex(a.url);b.username="";b.password="";a.template&&(b.template=a.template);b.hexName=AES.url2hex(a.name);b.notetype=a.notetype;return b};
b.prototype.serializePostData=function(a){var b=[],c;for(c in a)b.push(encodeURIComponent(c)+"="+encodeURIComponent(a[c]));return b.join("&").replace(/%20/g,"+")};Object.defineProperty(b.prototype,"localKey",{get:function(){return this.useShareKey?this.getShareKey():g_local_key},enumerable:!0,configurable:!0});b.prototype.getToken=function(a){LP.lpMakeRequestReallyReal(this.apiUrl+"/csrf","",function(b){4===b.readyState&&200===b.status?a(JSON.parse(b.responseText)):4===b.readyState&&lpmakerequesterror("invalidresponse",
{url:b.responseURL},!1)})};b.prototype.getShareKey=function(){for(var a=0,b=g_shares;a<b.length;a++){var c=b[a];if("undefined"!==typeof c.associative&&1==c.associative)return c.key}return""};b.prototype.getShareId=function(){for(var a=0,b=g_shares;a<b.length;a++){var c=b[a];if("undefined"!==typeof c.associative&&1==c.associative)return c.id}return""};return b}(FormfillStore);
//# sourceMappingURL=newvault_migrations_js.js.map