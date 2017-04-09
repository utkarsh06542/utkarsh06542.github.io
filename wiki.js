// Code for running Hamburger 
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "div1") {
        x.className += " responsive";
    } else {
        x.className = "div1";
    }
}

function wikifirst(para){
document.getElementById("div2").innerHTML ="<center>Loading ...</center>";
document.getElementById("div3").innerHTML ="<div class=\"spinner\"><div class=\"rect1\"></div><div class=\"rect2\"></div><div class=\"rect3\"></div><div class=\"rect4\"></div><div class=\"rect5\"></div></div>";
var myObj="";
var urltext=" ";
var title=para;
var passvalue=" ";
if(para=="button"){title=document.getElementById("title").value;passvalue=title;}
var title1=title.split(" ");
var title2="";
for(var i=0;i<title1.length;i++){
var temp=title1[i].charAt(0).toUpperCase() + title1[i].slice(1);
title2 += temp;
if(i != (title1.length -1)){title2 += " ";}
}
if(para=="button"){title=title2;passvalue=title;}
var lang=document.getElementById("mySelect").value;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	myObj =JSON.parse((this.responseText).slice(5,-1));
	if(myObj.parse){var object=myObj.parse.langlinks;
	for(var i=0;i<object.length;i++){
		if(object[i].lang==lang){
		urltext=object[i].url;
		
		break;
		}
	}
	if(urltext!=" "){var ind=urltext.indexOf(".org")+10;
	passvalue=urltext.slice(ind);}
	}
	wiki(title,passvalue,lang);
}
else if(this.readyState == 4 && this.status != 200){
document.getElementById("div3").innerHTML = "<center><h3>No Internet Connection</h3></center>";
}
};
var url="https://en.wikipedia.org/w/api.php?origin=*&action=parse&format=json&prop=langlinks&page="+title+"&callback=?";
xmlhttp.open("GET", url, true);
xmlhttp.setRequestHeader('Content-Type', 'text/plain');
xmlhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
xmlhttp.send();
}


function wiki(para,passvalue,lang){
document.getElementById("div2").innerHTML ="<center>Loading ...</center>";
document.getElementById("div3").innerHTML ="<div class=\"spinner\"><div class=\"rect1\"></div><div class=\"rect2\"></div><div class=\"rect3\"></div><div class=\"rect4\"></div><div class=\"rect5\"></div></div>";
var myObj="";
var txt="";
var title=para;

//error message content

var errormess={"hi":"&#2340;&#2381;&#2352;&#2369;&#2335;&#2367;: &#2311;&#2360; &#2349;&#2366;&#2359;&#2366; &#2350;&#2375;&#2306; &#2342;&#2367;&#2319; &#2327;&#2319; &#2357;&#2367;&#2359;&#2351; &#2346;&#2352; &#2357;&#2367;&#2325;&#2367;&#2346;&#2368;&#2337;&#2367;&#2351;&#2366; &#2325;&#2379; &#2325;&#2379;&#2312; &#2349;&#2368; &#2346;&#2381;&#2352;&#2366;&#2360;&#2306;&#2327;&#2367;&#2325; &#2354;&#2375;&#2326; &#2344;&#2361;&#2368;&#2306; &#2350;&#2367;&#2354;&#2366;&#2404;",
"en":"Error : Wikipedia could not find any relevant article on the given topic in this language.",
"fr":"Erreur: Wikipedia n'a pas trouv&eacute; d'article pertinent sur un sujet donn&eacute; dans cette langue.",
"es":"Error: Wikipedia no encontr&oacute; ning&uacute;n art&iacute;culo relevante sobre un tema dado en este idioma.",
"ja":"&#12456;&#12521;&#12540;&#65306;&#12454;&#12451;&#12461;&#12506;&#12487;&#12451;&#12450;&#12399;&#12371;&#12398;&#35328;&#35486;&#12391;&#12399;&#29305;&#23450;&#12398;&#12488;&#12500;&#12483;&#12463;&#12395;&#38306;&#12377;&#12427;&#38306;&#36899;&#35352;&#20107;&#12434;&#35211;&#12388;&#12369;&#12427;&#12371;&#12392;&#12364;&#12391;&#12365;&#12414;&#12379;&#12435;&#12391;&#12375;&#12383;",
"zh-min-nan":"&#37679;&#35492;&#65306;&#32173;&#22522;&#30334;&#31185;&#25214;&#19981;&#21040;&#20219;&#20309;&#26377;&#38364;&#35442;&#35486;&#35328;&#30340;&#30456;&#38364;&#25991;&#31456;&#12290;",
"arz":"&#1582;&#1591;&#1571;: &#1578;&#1593;&#1584;&#1585; &#1593;&#1604;&#1609; &#1608;&#1610;&#1603;&#1610;&#1576;&#1610;&#1583;&#1610;&#1575; &#1575;&#1604;&#1593;&#1579;&#1608;&#1585; &#1593;&#1604;&#1609; &#1571;&#1610; &#1605;&#1602;&#1575;&#1604;&#1577; &#1584;&#1575;&#1578; &#1589;&#1604;&#1577; &#1581;&#1608;&#1604; &#1605;&#1608;&#1590;&#1608;&#1593; &#1605;&#1593;&#1610;&#1606; &#1576;&#1607;&#1584;&#1607; &#1575;&#1604;&#1604;&#1594;&#1577;.",
"de":"Fehler: Wikipedia konnte in dieser Sprache keinen relevanten Artikel zum Thema finden.",
"ru":"&#1054;&#1096;&#1080;&#1073;&#1082;&#1072;: &#1042;&#1080;&#1082;&#1080;&#1087;&#1077;&#1076;&#1080;&#1103; &#1085;&#1077; &#1089;&#1084;&#1086;&#1075;&#1083;&#1072; &#1085;&#1072;&#1081;&#1090;&#1080; &#1089;&#1086;&#1086;&#1090;&#1074;&#1077;&#1090;&#1089;&#1090;&#1074;&#1091;&#1102;&#1097;&#1091;&#1102; &#1089;&#1090;&#1072;&#1090;&#1100;&#1102; &#1087;&#1086; &#1076;&#1072;&#1085;&#1085;&#1086;&#1084;&#1091; &#1074;&#1086;&#1087;&#1088;&#1086;&#1089;&#1091; &#1085;&#1072; &#1101;&#1090;&#1086;&#1084; &#1103;&#1079;&#1099;&#1082;&#1077;.",
"sv":"Fel: Wikipedia kunde inte hitta n&aring;gon relevant artikel om givet &auml;mne p&aring; detta spr&aring;k."};

if(passvalue!=" "){title=passvalue;}
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myObj =JSON.parse((this.responseText).slice(5,-1));
if(txt=myObj.error){document.getElementById("div2").innerHTML = "<center>Error !</center>";	
      document.getElementById("div3").innerHTML = "<center><div style=\"margin-top:calc((100vh - 100px) / 2);font-size:20px;\">"+errormess[lang]+" !<br>Please try to search something else .</div></center>";}
else{ txt=myObj.parse.text["*"];
	document.getElementById("div2").innerHTML = "<center>"+ myObj.parse.title + "</center>";	

 document.getElementById("div3").innerHTML ="<br>"+ txt;

//if page has to redirect ot other link

var redirect=document.getElementById("div3").getElementsByClassName("redirectMsg");
for(i=0;i<redirect.length;i++){
   var temp2=redirect[0].getElementsByTagName("a")[0].getAttribute("title");
  document.getElementById("div3").innerHTML +="<div class=\"spinner\"><div class=\"rect1\"></div><div class=\"rect2\"></div><div class=\"rect3\"></div><div class=\"rect4\"></div><div class=\"rect5\"></div></div>";
   wiki(temp2,temp2,lang);
 }
   
//to remove images, links, tables, edit tags and references
	
var image=document.getElementById("div3").getElementsByTagName("img");
var table=document.getElementById("div3").getElementsByTagName("table");
var references=document.getElementById("div3").getElementsByClassName("references");
var hatnotes=document.getElementById("div3").getElementsByClassName("hatnote");
var links=document.getElementById("div3").getElementsByTagName("a");
var edit=document.getElementById("div3").getElementsByClassName("mw-editsection");
var bracketref=document.getElementById("div3").getElementsByClassName("reference");
for (i = 0; i < image.length; i++) {
    image[i].style.display = "none";
}
for (i = 0; i <table.length; i++) {
    table[i].style.display = "none";
}
for (i = 0; i <references.length; i++) {
    references[i].style.display = "none";
}
for (i = 0; i <hatnotes.length; i++) {
    hatnotes[i].style.display = "none";
}
for (i = 0; i <links.length; i++) {
  var url1=links[i].getAttribute("title");
  var url2="javascript:wiki(\""+url1+"\",\""+url1+"\",\""+lang+"\");";
  links[i].setAttribute("href",url2);
}
for (i = 0; i < edit.length; i++) {
   edit[i].style.display = "none";
}
for (i = 0; i < bracketref.length; i++) {
   bracketref[i].style.display = "none";
}
}
}
};
var url="https://"+lang+".wikipedia.org/w/api.php?origin=*&action=parse&format=json&prop=text&page="+title+"&callback=?";
xmlhttp.open("GET", url, true);
xmlhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
xmlhttp.send();
}

