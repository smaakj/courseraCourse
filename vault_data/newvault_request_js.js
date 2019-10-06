LPRequest={};
(function(f){var h={},l=function(){for(var e in h)clearTimeout(h[e]);h={}};Topics.get(Topics.REFRESH_DATA).subscribe(l);Topics.get(Topics.CLEAR_DATA).subscribe(l);f.getNewRequestID=function(){var e=0;return function(){return++e}}();f.makeRequest=function(){var e=function(d,b){return function(){for(var c=0,a=d.length;c<a;++c)d[c].unlock();b&&b.apply(window,arguments)}},g=function(d,b){return function(){for(var c=0,a=d.length;c<a;++c)d[c].lockForUpdate();b.apply(window,arguments)}},l=function(d,b){var c=
function(a){try{Topics.get(Topics.REQUEST_SUCCESS).publish(d),b&&(clearTimeout(b),delete h[d.requestID]),a&&Topics.get(Topics.SUCCESS).publish(a)}catch(k){LPPlatform.logException(k)}};return d&&d.success?function(){var a=arguments,b=d.successMessage;0<a.length&&"string"===typeof a[0]&&(b="undefined"===typeof b?a[0]:b,a=Array.prototype.slice.call(a,1));try{d.success.apply(window,a)}catch(m){LPPlatform.logException(m)}c(b)}:c},p=function(d,b){var c=function(a,c){try{b&&(clearTimeout(b),delete h[d.requestID]);
if("object"===typeof c)if(c&&"undefined"!==typeof c.__raven_xhr){var e=c.__raven_xhr;a=e.status_code&&429==e.status_code?"throttled":Strings.Vault.UNEXPECTED_ERROR}else console.log("Unable to read error response object."),a=c;Topics.get(Topics.REQUEST_ERROR).publish(d);switch(a){case "throttled":if(c&&"undefined"!==typeof c.__raven_xhr){var f=c.__raven_xhr.url,g=Strings.translateString("Too many requests were made in a short time. Please try again later.");a="Request to "+f+" was throttled.";-1<f.indexOf("deliver_and_add.php")||
-1<f.indexOf("show.php")?Topics.get(Topics.ERROR).publish(g):console.log(a);LPPlatform.logException(a)}else console.log("Request to unknown url was throttled.");return;case "notoken":a=Strings.translateString("No token was provided. Request could not be completed.");break;case "session_expired":a=Strings.translateString("ErrorSessionMsg");break;case "not_allowed":a=Strings.translateString("Your Shared Folder action failed. Please check your permissions before trying again");break;case "invalidxml":a=
Strings.translateString("Invalid XML response.");break;case "invalidjson":a=Strings.translateString("Invalid JSON response.");break;case "offline":a=Strings.translateString("This request cannot be completed because you are currently offline.");break;case "1_to_1_restricted_for_free":LPVault.closeShareDialog();a=LPVault.openRestrictedSharingDialog();break;case "policy":a=Strings.translateString("Sorry, this operation is not allowed by a policy.");break;case "shouldverifyemail":dialogs.verifyEmail.open({email:bg.get("g_username")});
a=null;break;case void 0:a=Strings.Vault.UNEXPECTED_ERROR}Topics.get(Topics.ERROR).publish(a)}catch(n){LPPlatform.logException(n)}};if(d&&d.error)if(d.shouldverifyemail)dialogs.verifyEmail.open({email:bg.get("g_username")});else return function(a){c(a);d.error()};else return c},q=function(d){return function(b){Topics.get(Topics.REQUEST_STATUS).publish(b,d)}};return function(d,b){if(b.confirm){var c=b.confirm;delete b.confirm;c.handler=function(){f.makeRequest(d,b)};Topics.get(Topics.CONFIRM).publish(c)}else{b.requestID=
f.getNewRequestID();c=null;LPTools.getOption(b,"showTimeWarning",!0)&&(c=setTimeout(function(){k(Strings.translateString("Sorry, this request is taking longer than normal."))},3E4),h[b.requestID]=c);if(b.items&&LPTools.getOption(b,"lockItems",!1)){var a=b.items;a instanceof Array||(a=[a]);d=g(a,d);b.success=e(a,b.success);b.error=e(a,b.error);b.confirm&&(b.confirm.closeHandler=e(a))}a=l(b,c);var k=p(b,c);b.params?c=[{params:b.params,requestArgs:b.requestArgs,success:a,error:k,status:b.status?q(b):
null}]:(c=LPTools.getOption(b,"parameters",[]),c instanceof Array||(c=[c]),c.push(a),c.push(k));Topics.get(Topics.REQUEST_START).publish(b);try{d.apply(window,c)}catch(m){LPPlatform.logException(m),k(Strings.Vault.UNEXPECTED_ERROR)}}}}();f.makeDataRequest=function(e,g){f.makeRequest(e,$.extend(!0,g,{dialogRequest:!1}))};f.makeUpdateRequest=function(e,g){f.makeRequest(e,$.extend(!0,g,{requestSuccessOptions:{incrementAccountsVersion:!0}}))};f.makeLockItemUpdateRequest=function(e,f){this.makeUpdateRequest(e,
$.extend(f,{lockItems:!0}))}})(LPRequest);
//# sourceMappingURL=newvault_request_js.js.map