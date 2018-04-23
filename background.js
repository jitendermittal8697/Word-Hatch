var code = "<div id=\"popup\" class=\"w3-modal\" >"+ 
" <div class=\"w3-modal-content w3-card-4 w3-animate-zoom\">"+
  "<header class=\"w3-container w3-blue\"> "+
   "<span onclick=\"selectmeaning()\" "+
   "class=\"w3-button w3-blue w3-xlarge w3-display-topright\">&times;</span>"+
   "<h2 id=\"header\"></h2>"+
 " </header>"+
  "<div class=\"w3-bar w3-border-bottom\">"+
  " <button class=\"tablink w3-bar-item w3-button\" id=\"button\" onclick=\"openpopup(event, 'Meaning')\">Meaning</button>"+
   "<button class=\"tablink w3-bar-item w3-button\" onclick=\"openpopup(event, 'Antonym')\">Antonym</button>"+
   "<button class=\"tablink w3-bar-item w3-button\" onclick=\"openpopup(event, 'Synonym')\">Synonym</button>"+
  " </div>"+
 " <div id=\"Meaning\" class=\"w3-container city\" style=\"display:block\">"+
   "<h1>Meaning</h1>"+
   "<p id=\"meancontent\"></p>"+
  "</div>"+
  "<div id=\"Synonym\" class=\"w3-container city\" style=\"display:none\">"+
   "<h1>Synonym</h1>"+
   "<p id=\"synocontent\"></p>"+
  "</div>"+
  "<div id=\"Antonym\" class=\"w3-container city\" style=\"display:none\">"+
   "<h1>Antonym</h1>"+
   "<p id=\"antocontent\"></p>"+
  "</div>"+
  "<div class=\"w3-container w3-light-grey w3-padding\">"+
   "<button class=\"w3-button w3-right w3-white w3-border\" "+
   "onclick=\"selectmeaning()\">Close</button>"+
 " </div>"+
 "</div>"+
"</div>";

var openpopup = "function openpopup(evt, cityName) "+
				"{"+
					 " var i, x, tablinks;"+
					  "x = document.getElementsByClassName(\"city\");"+
					  "for (i = 0; i < x.length; i++) "+
					  "{"+
							"x[i].style.display = \"none\";"+
					  "}"+
					  "tablinks = document.getElementsByClassName(\"tablink\");"+
					  "for (i = 0; i < x.length; i++) "+
					  "{"+
							"tablinks[i].classList.remove(\"w3-light-grey\");"+
					  "}"+
					  "document.getElementById(cityName).style.display = \"block\";"+
					  "evt.currentTarget.classList.add(\"w3-light-grey\");"+
				"}";
var selectmeaning = "function selectmeaning()"+
"{"+
	"document.getElementById(\"Meaning\").style.display = \"block\";"+
	"document.getElementById(\"Synonym\").style.display = \"none\";"+
	"document.getElementById(\"Antonym\").style.display = \"none\";"+
	"document.getElementById(\"popup\").style.display = \"none\";"+
	"tablinks = document.getElementsByClassName(\"tablink\");"+
	"x = document.getElementsByClassName(\"city\");"+
	  
	"for (i = 0; i < x.length; i++) "+
	"{"+
		"tablinks[i].classList.remove(\"w3-light-grey\");"+
	"}"+
	"document.getElementById(\"button\").classList.add(\"w3-light-grey\");"+
"}";
$("body").append(code);
$("body").append('<script>'+openpopup+'</script>');
$("body").append('<script>'+selectmeaning+'</script>');
$(document).mouseup( function(e)
	{
        var selection;
        if (window.getSelection) 
		{
			selection = window.getSelection();
        } 
		else if (document.selection) 
		{
			selection = document.selection.createRange();
        }
        if(selection.toString() !== '') 
		{
			var sel = selection.toString();
			var str = sel.trim();
			var abc = str.replace(/[^a-zA-Z ]/g, "");
			document.getElementById('header').innerHTML=abc;
			var selection = window.getSelection ? window.getSelection() : document.selection ? document.selection : null;
			if(!!selection) selection.empty ? selection.empty() : selection.removeAllRanges();
			var src = "https://www.dictionaryapi.com/api/v1/references/thesaurus/xml/"+abc+"?key=91859f8f-807f-47e1-b41d-593375234bd2"; // NOTE: replace test_only with your own KEY 
			jQuery.get( src, function( response ) { 
			var obj = xmlToJson(response);
			process(obj);	
			});
			document.getElementById('popup').style.display='block';	
		}		
		if (e.target.id === 'popup') {
           selectmeaning1();
        }
    });
function process(result) 
{ 
	outputsyn = ""; 
	outputant = ""; 
	outputmea = ""; 
	for(var entry in result.entry_list)
	{
		for(var key1 in result.entry_list[entry])
		{
			if(typeof result.entry_list[entry][key1]=== "object")
			{
				if(result.entry_list[entry][key1].hasOwnProperty('syn'))
				{	
					if(typeof result.entry_list[entry][key1]['syn']==="object")
					{
						if(typeof result.entry_list[entry][key1]['syn'].hasOwnProperty('#text'))
						{
							outputsyn +=result.entry_list[entry][key1]['syn']['#text']+"&nbsp;&nbsp;";
						}
					}
					else
					{
						outputsyn +=result.entry_list[entry][key1].syn+"&nbsp;&nbsp;";
					}
				}
				if(result.entry_list[entry][key1].hasOwnProperty('mc'))
				{
					if(typeof result.entry_list[entry][key1]['mc']==="object")
					{
						if(typeof result.entry_list[entry][key1]['mc'].hasOwnProperty('#text'))
						{
							outputmea +=result.entry_list[entry][key1]['mc']['#text']+"&nbsp;&nbsp;<br>";
						}
					}
					else
					{
						outputmea +=result.entry_list[entry][key1].mc+"&nbsp;&nbsp;<br>";
					}
				}
				if(result.entry_list[entry][key1].hasOwnProperty('ant'))
				{
					if(typeof result.entry_list[entry][key1]['ant']==="object")
					{
						if(typeof result.entry_list[entry][key1]['ant'].hasOwnProperty('#text'))
						{
							outputant +=result.entry_list[entry][key1]['ant']['#text']+"&nbsp;&nbsp;";
						}
					}
					else
					{
						outputant +=result.entry_list[entry][key1].ant+"&nbsp;&nbsp;";
					}
				}
			}
			for(var sens in result.entry_list[entry][key1])
			{
				if(typeof result.entry_list[entry][key1][sens]=== "object")
				{
					if(result.entry_list[entry][key1][sens].hasOwnProperty('syn'))
					{
						if(typeof result.entry_list[entry][key1][sens]['syn']==="object")
						{
							if(result.entry_list[entry][key1][sens]['syn'].hasOwnProperty('#text'))
							{
								outputsyn +=result.entry_list[entry][key1][sens]['syn']['#text']+"&nbsp;&nbsp;";
							}
						}
						else
						{
							outputsyn +=result.entry_list[entry][key1][sens].syn+"&nbsp;&nbsp;";
						}
					}
					if(result.entry_list[entry][key1][sens].hasOwnProperty('mc'))
					{
						if(typeof result.entry_list[entry][key1][sens]['mc']==="object")
						{
							if(result.entry_list[entry][key1][sens]['mc'].hasOwnProperty('#text'))
							{
								outputmea +=result.entry_list[entry][key1][sens]['mc']['#text']+"&nbsp;&nbsp;<br>";
							}
						}
						else
						{
							outputmea +=result.entry_list[entry][key1][sens].mc+"&nbsp;&nbsp;<br>";
						}
					}
					if(result.entry_list[entry][key1][sens].hasOwnProperty('ant'))
					{
						if(typeof result.entry_list[entry][key1][sens]['ant']==="object")
						{
							if(result.entry_list[entry][key1][sens]['ant'].hasOwnProperty('#text'))
							{
								outputant +=result.entry_list[entry][key1][sens]['ant']['#text']+"&nbsp;&nbsp;";
							}
						}
						else
						{
							outputant +=result.entry_list[entry][key1][sens].ant+"&nbsp;&nbsp;";
						}
					}
				}
				for(var key2 in result.entry_list[entry][key1][sens])
				{
					if(typeof result.entry_list[entry][key1][sens][key2]=== "object")
					{
						if(result.entry_list[entry][key1][sens][key2].hasOwnProperty('syn'))
						{
							if(typeof result.entry_list[entry][key1][sens][key2]['syn']==="object")
							{
								if(typeof result.entry_list[entry][key1][sens][key2]['syn'].hasOwnProperty('#text'))
								{
									outputsyn +=result.entry_list[entry][key1][sens][key2]['syn']['#text']+"&nbsp;&nbsp;";
								}
							}
							else
							{
								outputsyn +=result.entry_list[entry][key1][sens][key2].syn+"&nbsp;&nbsp;";
							}
						}
						if(result.entry_list[entry][key1][sens][key2].hasOwnProperty('mc'))
						{
							if(typeof result.entry_list[entry][key1][sens][key2]['mc']==="object")
							{
								if(typeof result.entry_list[entry][key1][sens][key2]['mc'].hasOwnProperty('#text'))
								{
									outputmea +=result.entry_list[entry][key1][sens][key2]['mc']['#text']+"&nbsp;&nbsp;<br>";
								}
							}
							else
							{
								outputmea +=result.entry_list[entry][key1][sens][key2].mc+"&nbsp;&nbsp;<br>";
							}
						}
						if(result.entry_list[entry][key1][sens][key2].hasOwnProperty('ant')&&typeof result.entry_list[entry][key1][sens][key2]['ant']!=="object")
						{
							if(typeof result.entry_list[entry][key1][sens][key2]['ant']==="object")
							{
								if(typeof result.entry_list[entry][key1][sens][key2]['ant'].hasOwnProperty('#text'))
								{
									outputant +=result.entry_list[entry][key1][sens][key2]['ant']['#text']+"&nbsp;&nbsp;";
								}
							}
							else
							{
								outputant +=result.entry_list[entry][key1][sens][key2].ant+"&nbsp;&nbsp;";
							}
						}
					}
				}
			}
		}
	} 
	document.getElementById("synocontent").innerHTML = outputsyn; 
	document.getElementById("antocontent").innerHTML = outputant; 
	document.getElementById("meancontent").innerHTML = outputmea; 
	
}
function xmlToJson(xml) 
{
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) // element
	{ 
		// do attributes
		if (xml.attributes.length > 0) 
		{
			obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) 
			{
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	}
	else if (xml.nodeType == 3)// text
	{ 
		obj = xml.nodeValue;
	}

	// do children
	// If just one text node inside
	if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) 
	{
		obj = xml.childNodes[0].nodeValue;
	}
	else if (xml.hasChildNodes()) 
	{
		for(var i = 0; i < xml.childNodes.length; i++)
		{
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined")
			{
				obj[nodeName] = xmlToJson(item);
			} 
			else 
			{
				if (typeof(obj[nodeName].push) == "undefined") 
				{
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
}
function selectmeaning1()
{
	document.getElementById("Meaning").style.display = "block";
	document.getElementById("Synonym").style.display = "none";
	document.getElementById("Antonym").style.display = "none";
	document.getElementById("popup").style.display = "none";
	tablinks = document.getElementsByClassName("tablink");
	x = document.getElementsByClassName("city");
	  
	for (i = 0; i < x.length; i++) 
	{
		tablinks[i].classList.remove("w3-light-grey");
	}
	document.getElementById("button").classList.add("w3-light-grey");
}