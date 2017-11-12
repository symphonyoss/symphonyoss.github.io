var msg = require("./contents.js");
require("./catalogue.css");

var $ = require("jquery");

$(function(){
    $("<div id='message'>")
        .text(msg+"!")
        .appendTo("body");
});

var div = document.createElement("div");
div.id = "message";
var txtNode = document.createTextNode(msg);
div.appendChild(txtNode);
document.body.appendChild(div);
