var ships;
var factions;
var shipSelection;
var factionSelection;
var shipId = 0;

function getUrl(url){
	var req = new XMLHttpRequest();
	req.open("GET",url,true);
	return req;
}

function loadURL(url){
	var req = getUrl(url);
	req.send();
	return new Promise(function(resolve, reject) {
		req.onreadystatechange = function() {
			if(req.readyState === 4)
			{
				if(req.status === 200)
				{
					resolve(JSON.parse(req.response));
				}else{
					reject();
				}
			}
		};
	});
}

function dataLoaded(json){
	ships = json.ships;
    factions = json.factions;
    populateDropdowns();
}

function populateDropdowns(){
    shipSelection = document.getElementById("ship");
    ships.forEach(function(ship){
        var option = new Option(ship.name, JSON.stringify(ship));
        shipSelection.add(option);;
    });
    factionSelection = document.getElementById("faction");
    Object.keys(factions).forEach(function(faction){
        var option = new Option(faction, factions[faction]);
        factionSelection.add(option);
    });
}

function remove(id){
	document.getElementById("ship-"+id).remove();
}

function addShip(){
	document.getElementById("ships").innerHTML += getShipTable(shipSelection.value, factionSelection.value, shipId);
	shipId++;
}

function getShipTable(shipToParse, faction, id){
	var ship = JSON.parse(shipToParse);
	var display = `<div class="icon shipFaction">${faction}</div>
                <div class="fancy">${ship.name}</div>
                <div class="ship">${ship.icon}</div>`

	return `<div id="ship-${id}" class="box">
	<span class="removeButton no-print" onclick="remove(${id})">Remove</span>
	<table>
    <tr class="top-flap">
        <td class="model-height" style="width:${ship.height}mm; max-width:${ship.height}mm;"></td>
        <td class="model-width render-flap cut-top cut-left cut-right" style="width:${ship.width}mm; max-width:${ship.width}mm;"></td>
        <td colspan="3"></td>
    </tr>
    <tr class="top model-height-height" style="height:${ship.height}mm; max-height:${ship.height}mm;">
        <td class="model-height flap-left cut-left cut-right cut-top" style="width:${ship.height}mm; border-top-left-radius:${ship.height}mm; max-width:${ship.height}mm;"></td>
        <td class="model-width render cut-left cut-right" style="width:${ship.width}mm; max-width:${ship.width}mm;">
            <div class="upsideDown content">
                ${display}
            </div>
        </td>
        <td class="model-height flap-right cut-left cut-right cut-top" style="width:${ship.height}mm; border-top-right-radius:${ship.height}mm; max-width:${ship.height}mm;"></td>
        <td  colspan="2"></td>
    </tr>
    <tr class="main model-length"  style="height:${ship.length}mm; max-height:${ship.length}mm;">
        <td class="model-height render cut-left" style="width:${ship.height}mm; max-width:${ship.height}mm;">
            <div class="leftSide">
            	${display}
            </div>
        </td>
        <td class="model-width render" style="width:${ship.width}mm; max-width:${ship.width}mm;">
            ${display}
        </td>
        <td class="model-height render" style="width:${ship.height}mm; max-width:${ship.height}mm;">
            <div class="rightSide">
            ${display}
            </div>
        </td>
        <td class="model-width render cut-top" style="width:${ship.width}mm; max-width:${ship.width}mm;">
            ${display}
        </td>
        <td class="side-flap render cut-top cut-bottom cut-right"></td>
        <td></td>
    </tr>
    <tr class="model-height-height" style="height:${ship.height}mm;">
        <td class="model-height render cut-left cut-bottom cut-right" style="width:${ship.height}mm; max-width:${ship.height}mm;">
        </td>
        <td class="model-width render cut-left cut-bottom cut-right" style="width:${ship.width}mm; max-width:${ship.width}mm;">
        </td>
        <td class="model-height render cut-left cut-bottom cut-right" style="width:${ship.height}mm; max-width:${ship.height}mm;">
        </td>
        <td class="model-width render cut-left cut-bottom cut-right" style="width:${ship.width}mm; max-width:${ship.width}mm;">
        </td>
        <td></td>
    </tr>
</table>
</div>`;
}

function initialize(){
	var upgradeLoadPromise = loadURL("data.json");
	upgradeLoadPromise.then(dataLoaded);
	upgradeLoadPromise.catch(function(){alert("data load failed");});
}