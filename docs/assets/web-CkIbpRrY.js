import{a as o,A as n}from"./index-Bh0wWb75.js";class a extends o{constructor(){super({name:"AdMob",platforms:["web"]})}async initialize(){console.log("initialize")}async targetSettings(){console.log("targetSettings")}async requestTrackingAuthorization(){console.log("requestTrackingAuthorization")}async trackingAuthorizationStatus(){return{status:"authorized"}}async requestConsentInfo(e){return console.log("requestConsentInfo",e),{status:n.REQUIRED,isConsentFormAvailable:!0}}async showConsentForm(){return console.log("showConsentForm"),{status:n.REQUIRED}}async resetConsentInfo(){console.log("resetConsentInfo")}async setApplicationMuted(e){console.log("setApplicationMuted",e)}async setApplicationVolume(e){console.log("setApplicationVolume",e)}async showBanner(e){console.log("showBanner",e)}async hideBanner(){console.log("hideBanner")}async resumeBanner(){console.log("resumeBanner")}async removeBanner(){console.log("removeBanner")}async prepareInterstitial(e){return console.log("prepareInterstitial",e),{adUnitId:e.adId}}async showInterstitial(){console.log("showInterstitial")}async prepareRewardVideoAd(e){return console.log(e),{adUnitId:e.adId}}async showRewardVideoAd(){return{type:"",amount:0}}}export{a as AdMobWeb};