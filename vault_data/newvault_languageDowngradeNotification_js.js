var LanguageDowngradeNotification=function(){function e(b){b.preventDefault();f()}function f(){a.classList.remove("show");document.body.classList.remove("languageDowngradeNotificationIsVisible");bg.setLanguageNotificationDismissal(function(){bg.sendLpImprove("language_downgrade_notification_dismiss",{source:"web"})})}function g(b){b.preventDefault();var c=bg.get("g_language")||"en-US",a=document.querySelector("#languageDowngradeNotificationLanguageSelector").value;bg.saveUserLanguage(a,function(){bg.switchLanguage(a);
bg.sendLpImprove("language_downgrade_notification_update",{previous_language:c,selected_language:a,source:"web"});document.querySelector(".languageDowngradeNotification__step--main").classList.remove("show");document.querySelector(".languageDowngradeNotification__step--success").classList.add("show")},function(){dialogs.alert.open({title:"Error",text:["An unexpected error occurred when changing your language.","Please try again later"]});throw Error("Error while saving user language preference");
})}var a=document.querySelector("#languageDowngradeNotification"),d={"en-US":"English","de-DE":"Deutsch","es-ES":"Espa\u00f1ol","fr-FR":"Fran\u00e7ais","it-IT":"Italiano","nl-NL":"Nederlands","pt-BR":"Portugu\u00eas"};return{show:function(){a=document.querySelector("#languageDowngradeNotification");$(a).load("/newvault/languageDowngradeNotification.html",function(){a.classList.add("show");document.querySelector(".languageDowngradeNotification__step--main").classList.add("show");document.body.classList.add("languageDowngradeNotificationIsVisible");
var b=document.querySelector("#languageDowngradeNotificationLanguageSelector");for(c in d)b.options.add(new Option(d[c],c));b=document.querySelector("#languageDowngradeNotificationClose");var c=document.querySelector("#languageDowngradeNotificationForm");b.addEventListener("click",e);c.addEventListener("submit",g);bg.sendLpImprove("language_downgrade_notification_seen",{source:"web"})})}}}();
//# sourceMappingURL=newvault_languageDowngradeNotification_js.js.map