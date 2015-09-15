﻿//-----------------------------------------------------
//
// Author: Daeren Torn
// Site: 666.io
//
//-----------------------------------------------------

"use strict";

//-----------------------------------------------------

var rBot = require("./../index");

//-----------------------------------------------------

var objBot = new rBot(process.env.TELEGRAM_BOT_TOKEN);
var objSrvOptions   = {
    "certDir":  "/www/site",

    "key":       "/3_site.xx.key",
    "cert":      "/2_site.xx.crt",
    "ca":       [
        "/AddTrustExternalCARoot.crt",
        "/COMODORSAAddTrustCA.crt",
        "/COMODORSADomainValidationSecureServerCA.crt"
    ],

    "http":     false, //_ nginx + nodejs = <3
    "host":     "site.xx"
};

//------------------]>

objBot.api
    .setWebhook({"url": "site.xx/myBot"})

    .then(JSON.parse)
    .then(response => {
        if(!response.ok)
            throw new Error("Oops...problems with webhook...");

        objBot
            .server(objSrvOptions, cbMsg)
            .command("start", cbCmdStart);
    }, console.error);

//------------------]>

function cbMsg(data) {
    console.log("\ncbMsg");
    console.log(data);

    this.id = data.message.chat.id;
    this.data.message = "Hell Word!";
    this.send();
}

function cbCmdStart(data, params) {
    console.log("\ncbCmdStart");
    console.log(data);

    this.id = data.message.chat.id;
    this.data.message = params;
    this.send();
}