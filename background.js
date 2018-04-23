var code = "<div id=\"popup\" class=\"container\" style=\"display:none\">"+
            "<div class=\"modal fade\" id=\"myModal\">"+
              "  <div class=\"modal-dialog modal-dialog-centered\">"+
                  "  <div class=\"modal-content\">"+
                       " <!-- Modal Header -->"+
                       " <div class=\"modal-header\">"+
                         "   <h4 id=\"header\" class=\"modal-title\">Modal Heading</h4>"+
                          "  <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>"+
                       " </div>"+
                       " <!-- Modal body -->"+
                        "<div class=\"modal-body\">"+
                           " <ul class=\"nav nav-pills nav-justified\" role=\"tablist\">"+
                              "  <li class=\"nav-item\">"+
                                "    <a class=\"nav-link active\" data-toggle=\"pill\" href=\"#Meaning\">Meaning</a>"+
                               " </li>"+
                               " <li class=\"nav-item\">"+
                                "    <a class=\"nav-link\" data-toggle=\"pill\" href=\"#Antonym\">Antonym</a>"+
                               " </li>"+
                               " <li class=\"nav-item\">"+
                                "    <a class=\"nav-link\" data-toggle=\"pill\" href=\"#Synonym\">Synonym</a>"+
                               " </li>"+
                           " </ul>"+
                           " <div class=\"tab-content\">"+
                              "  <div id=\"Meaning\" class=\"container tab-pane active\">"+
								"<br>"+
								"<p id=\"meancontent\"></p>"+
                               " </div>"+
                                "<div id=\"Antonym\" class=\"container tab-pane fade\">"+
								"<br>"+
								"<p id=\"synocontent\"></p>"+
                               " </div>"+
                                "<div id=\"Synonym\" class=\"container tab-pane fade\">"+
								"<br>"+
								"<p id=\"antocontent\"></p>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                        "<!-- Modal footer -->"+
                        "<div class=\"modal-footer\">"+
                          "  <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>"+
                        "</div>"+
                    "</div>"+
                "</div>"+
            "</div>"+
        "</div>";
$("body").append(code);
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
		var src = "https://www.dictionaryapi.com/api/v1/references/thesaurus/xml/"+abc+"?key=91859f8f-807f-47e1-b41d-593375234bd2"; // NOTE: replace test_only with your own KEY 
		jQuery.get( src, function( response ) { 
		var obj = xmlToJson(response);
		process(obj);	
		});
		document.getElementById('popup').style.display='block';	
		$('#myModal').modal({
			show: true
		}); 
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