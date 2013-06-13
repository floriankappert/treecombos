/*
Script: treecombos.js
  Jquery ul li trees to comboboxes

License:
  MIT

Version:
  0.1

Copyright:
  Copyright (c) 2011 [Carlos Bolaños](http://wocp.net).

Dependencies:
  - Jquery

Options:
  - tree: ($() object) ul li tree to convert
  - destination: ($() object) div to inject selects
  - mode: mootools inject where option, default bottom (TODO)

Notes:
  TODO

*/function TreeCombos(e){var t={tree:null,destination:null,level:0,mode:"bottom",select_text:"Bitte wählen"};this._current_level=null;this._select=null;this._next=null;this.options=$.extend(t,e)}TreeCombos.prototype._onchange=function(e){this.update()};TreeCombos.prototype.create=function(){this._current_level=this.options.tree.children("li");if(this._select==null){this._select=$(document.createElement("select"));this._select.addClass("level"+this.options.level);this._select.change($.proxy(this,"_onchange"));this.options.destination.append(this._select)}else this._select.html("");var e=this._select,t=$(document.createElement("option")).attr("value","").html(this.options.select_text);this._select.append(t);this._current_level.each(function(t,n){var r=$(document.createElement("option"));r.attr("value",$(n).attr("id").substr(4));r.html($($(n).children("a")[0]).html());e.append(r)});this.destroyChilds(!0)};TreeCombos.prototype.destroyChilds=function(e){this._next&&this._next.destroyChilds(!1);e||this._select.remove();this._next=null};TreeCombos.prototype.update=function(){var e=$("#IIDD"+this._select.attr("value")+" > ul"),t=e.children("li").length;if(t<1){this.destroyChilds(!0);$("#iiddhref").attr("style","display: inline-block;");$("#iiddhref").attr("href",$("#IIDD"+this._select.attr("value")).children(":first").attr("href"))}else{this._next==null?this._next=new TreeCombos({tree:e,destination:this.options.destination,level:this.options.level+1,mode:this.options.mode}):this._next.options.tree=e;this._next.create()}};TreeCombos.prototype.select=function(e){var t=$($(e)[0]),n=[];n.unshift(t.attr("id").substr(4));var r=$(t.parents("li"));while(r.length>0){n.unshift(r.attr("id").substr(4));r=$(r.parents("li"))}var i=this;for(var s=0;s<n.length;s++){i._select.attr("value",n[s]);i.update();i=i._next}i&&i._next&&i.destroyChilds(!0);return n};