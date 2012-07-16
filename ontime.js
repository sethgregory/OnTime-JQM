/**
 * MBTA OnTime - Javascript Library
 *
 * Author  : Seth Gregory (20564261)
 * Version : 1.0
 * Revised : 2011/05/08
 *
 */
 


// A global map for platform keys <-> station names
var stationNames = {
    "RALEN": "Alewife",
    "RDAVN": "Davis",
    "RDAVS": "Davis",
    "RPORN": "Porter",
    "RPORS": "Porter",
    "RHARN": "Harvard",
    "RHARS": "Harvard",
    "RCENN": "Central",
    "RCENS": "Central",
    "RKENN": "Kendall",
    "RKENS": "Kendall",
    "RMGHN": "Charles MGH",
    "RMGHS": "Charles MGH",
    "RPRKN": "Park Street",
    "RPRKS": "Park Street",
    "RDTCN": "Downtown Crossing",
    "RDTCS": "Downtown Crossing",
    "RSOUN": "South Station",
    "RSOUS": "South Station",
    "RBRON": "Broadway",
    "RBROS": "Broadway",
    "RANDN": "Andrew",
    "RANDS": "Andrew",
    "RJFKN": "JFK",
    "RJFKS": "JFK",
    "RSAVN": "Savin Hill",
    "RSAVS": "Savin Hill",
    "RFIEN": "Fields Corner",
    "RFIES": "Fields Corner",
    "RSHAN": "Shawmut",
    "RSHAS": "Shawmut",
    "RASHS": "Ashmont",
    "RNQUN": "North Quincy",
    "RNQUS": "North Quincy",
    "RWOLN": "Wollaston",
    "RWOLS": "Wollaston",
    "RQUCN": "Quincy Center",
    "RQUCS": "Quincy Center",
    "RQUAN": "Quincy Adams",
    "RQUAS": "Quincy Adams",
    "RBRAS": "Braintree",
    "OOAKN": "Oak Grove",
    "OMALN": "Malden",
    "OMALS": "Malden",
    "OWELN": "Wellington",
    "OWELS": "Wellington",
    "OSULN": "Sullivan Square",
    "OSULS": "Sullivan Square",
    "OCOMN": "Community College",
    "OCOMS": "Community College",
    "ONSTN": "North Station",
    "ONSTS": "North Station",
    "OHAYN": "Haymarket",
    "OHAYS": "Haymarket",
    "OSTNN": "State",
    "OSTSS": "State",
    "ODTNN": "Downtown Crossing",
    "ODTSS": "Downtown Crossing",
    "OCHNN": "Chinatown",
    "OCHSS": "Chinatown",
    "ONEMN": "Tufts Medical Center",
    "ONEMS": "Tufts Medical Center",
    "OBACN": "Back Bay",
    "OBACS": "Back Bay",
    "OMASN": "Mass Ave",
    "OMASS": "Mass Ave",
    "ORUGN": "Ruggles",
    "ORUGS": "Ruggles",
    "OROXN": "Roxbury Crossing",
    "OROXS": "Roxbury Crossing",
    "OJACN": "Jackson Square",
    "OJACS": "Jackson Square",
    "OSTON": "Stony Brook",
    "OSTOS": "Stony Brook",
    "OGREN": "Green Street",
    "OGRES": "Green Street",
    "OFORS": "Forest Hills",
    "BWONE": "Wonderland",
    "BREVE": "Revere Beach",
    "BREVW": "Revere Beach",
    "BBEAE": "Beachmont",
    "BBEAW": "Beachmont",
    "BSUFE": "Suffolk Downs",
    "BSUFW": "Suffolk Downs",
    "BORHE": "Orient Heights",
    "BORHW": "Orient Heights",
    "BWOOE": "Wood Island",
    "BWOOW": "Wood Island",
    "BAIRE": "Airport",
    "BAIRW": "Airport",
    "BMAVE": "Maverick",
    "BMAVW": "Maverick",
    "BAQUE": "Aquarium",
    "BAQUW": "Aquarium",
    "BSTAE": "State",
    "BSTAW": "State",
    "BGOVE": "Government Center",
    "BGOVW": "Government Center",
    "BBOWE": "Bowdoin",
    "BBOWW": "Bowdoin"
};

// Station Name Arrays
var OrangeStations = ["Oak Grove", "Malden", "Wellington", "Sullivan Square", "Community College", "North Station", "Haymarket", "State", "Downtown Crossing", "Chinatown", "Tufts Medical Center", "Back Bay", "Mass Ave", "Ruggles", "Roxbury Crossing", "Jackson Square", "Stony Brook", "Green Street", "Forest Hills"];
var BlueStations = ["Wonderland", "Revere Beach", "Beachmont", "Suffolk Downs", "Orient Heights", "Wood Island", "Airport", "Maverick", "Aquarium", "State", "Government Center", "Bowdoin"];
var RedStations = ["Alewife", "Davis", "Porter", "Harvard", "Central", "Kendall", "Charles MGH", "Park Street", "Downtown Crossing", "South Station", "Broadway", "Andrew", "JFK", "Savin Hill", "Fields Corner", "Shawmut", "Ashmont", "North Quincy", "Wollaston", "Quincy Center", "Quincy Adams", "Braintree"];

/*
 * On page ready, try to determine state
 */
$(document).ready( function() {
    //localStorage.clear();
    
    if(localStorage.selectedStationIndex != undefined) {
    	selectStation(localStorage.selectedStationIndex);
    }
    
    if(localStorage.selectedLine != undefined){
        selectLine(localStorage.selectedLine);
    } else {
        for(var i=0; i<23; i++) {
            $('#station'+i).hide();
        }
        $('#station0 a').html("No line selected.");
        $('#station0').show();
    }
});

/*
 * Function fires when selecting a line from the main menu
 */
function selectLine(linecolor) {
    localStorage.selectedLine = linecolor;

	// Set some things that we know based on just the line
	if(linecolor == "Blue") {
		localStorage.direction1 = "Eastbound";
		localStorage.terminus1 = "to Wonderland";
		localStirage.direction2 = "Westbound";
		localStorage.terminus2 = "to Bowdoin";
	} else {
		localStorage.direction1 = "Northbound";
		localStorage.direction2 = "Southbound";
		if(linecolor == "Orange") {
			localStorage.terminus1 = "to Oak Grove";
			localStorage.terminus2 = "to Forest Hills";
		} 
		else if (linecolor == "Red") {
			localStorage.terminus1 = "to Alewife";
			localStorage.terminus2 = "to Ashmont"; // placeholder
		}
	}

	// Write out the header
    $('#lineheader').html(linecolor + " Line");

    var i=0;
    var stationArray = eval(linecolor+'Stations');

    // Populate names of stations
    while(i<stationArray.length) {
        $('#station'+i+' a').html(stationArray[i]);
        $('#station'+i).show();
        i++;
    }

    // Hide additional items not in use
    while(i<23) {
        $('#station'+i).hide();
        i++;
    }

}

/*
 * Function fires when selecting a station from the station list
 */
function selectStation(stationIndex) {
    localStorage.selectedStationIndex = stationIndex;
    
    var stationArray = eval(localStorage.selectedLine+'Stations');
    localStorage.selectedStation = stationArray[stationIndex];
    $('#stationheader').html(localStorage.selectedStation);
    getPredictionData(localStorage.selectedLine);
}

/*
 * Query the realtime prediction data
 */
function getPredictionData(line) {
    var callback = "processPredictions";
    var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D'http%3A%2F%2Fdeveloper.mbta.com%2FData%2F" + line + ".json'&format=json&diagnostics=true&callback="+callback;
    //var url = "http://localhost/yql-"+line;
    var script = document.createElement('script');
    script.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(script);
}

/*
 * Process the returned prediction data
 */
function processPredictions(data) {
    if(data.query.results == null) {
        // No valid arrival results returned from web service
        alert("Sorry, no valid results returned.");
    } else {
        // Everything is cool, let's process our data!
        var arrivalResults = data.query.results.json.json;
        
        // Line : Red
        // Trip : 945
        // PlatformKey : RALEN
        // InformationType : Arrived
        // Time : 5/7/2011 4:07:34 PM
        // TimeRemaining : -00:03:36
        // Revenue : Revenue
        // Route : 0

		var stationArrivalsNE = new Array();
		var stationArrivalsSW = new Array();
        var outputString1 = "";
        var outputString2 = "";
		var index1 = 0;
		var index2 = 0;
		
        for(var i in arrivalResults) {

            var platformKey = arrivalResults[i].PlatformKey;
            var platformName = eval('stationNames.' + platformKey);

            // If this is the station we care about
            if(localStorage.selectedStation == platformName && arrivalResults[i].Revenue == "Revenue") {
                //outputString += arrivalResults[i].PlatformKey + ": " + arrivalResults[i].InformationType + " @ " + arrivalResults[i].TimeRemaining + "<br/>";

				var timeRemainingInSeconds = getTimeInSeconds(arrivalResults[i].TimeRemaining);
				//alert(timeRemainingInSeconds);
				
                if(platformKey.substring(4) == "N" || platformKey.substring(4) == "E") {
                    stationArrivalsNE[index1++] = {"InformationType": arrivalResults[i].InformationType,
                        "TimeRemaining": timeRemainingInSeconds,
                        "Route": arrivalResults[i].Route };
                }
                
                else if(platformKey.substring(4) == "S" || platformKey.substring(4) == "W") {
                    stationArrivalsSW[index2++] = {"InformationType": arrivalResults[i].InformationType,
                        "TimeRemaining": timeRemainingInSeconds,
                        "Route": arrivalResults[i].Route };
                }

            }
        }

		// Sort our arrivals using a custom comparator
		stationArrivalsNE.sort(sortByArrivalTime);
		stationArrivalsSW.sort(sortByArrivalTime);

		// Except for the very next arrival, create a string containing other future arrivals
        for(var j in stationArrivalsNE) {
        	if(j!=0) outputString1 += createTimeString(stationArrivalsNE[j].TimeRemaining) + "<br/>";
        }
        
        for(var j in stationArrivalsSW) {
        	if(j!=0) outputString2 += createTimeString(stationArrivalsSW[j].TimeRemaining) + "<br/>";
        }
        
        // Fill in the blanks
        if(stationArrivalsNE.length == 0) {
        	$('#nextprediction1').html("none");
        	$('#status1').html("on track");
        } else { 
        	$('#nextprediction1').html(createTimeString(stationArrivalsNE[0].TimeRemaining));
        	$('#status1').html("("+stationArrivalsNE[0].InformationType+")");
        }
        
        $('#direction1').html(localStorage.direction1);
        $('#terminus1').html(localStorage.terminus1);
        $('#upcoming1').html(outputString1);
        
        if(stationArrivalsSW.length == 0){
        	$('#nextprediction2').html("none");
        } else { 
        	$('#nextprediction2').html(createTimeString(stationArrivalsSW[0].TimeRemaining));
        	$('#status2').html("("+stationArrivalsSW[0].InformationType+")");        
        }
        
        $('#direction2').html(localStorage.direction2);
        $('#terminus2').html(localStorage.terminus2);	
        $('#upcoming2').html(outputString2);
    }
}

/*
 * My custom comparator function
 */
function sortByArrivalTime(a, b) {
	return (a.TimeRemaining - b.TimeRemaining);
}

/*
 * Function to parse a HH:MM:SS into an integer number of seconds
 */
function getTimeInSeconds(timeString) {
	var isNegative;
	if(timeString.substring(0,1)=="-"){
		//alert(timeString);
		isNegative=true;
		timeString = timeString.substring(1);
		//alert(timeString);
	}
	
	var timePieces = timeString.split(":");
	var seconds = (parseInt(timePieces[0]) * 3600) + (parseInt(timePieces[1]) * 60) + (parseInt(timePieces[2]));
	if(isNegative) return (seconds * -1);
	else return seconds;
}

/*
 * Returns a pretty time string based off an integer # of seconds
 */
function createTimeString(timeInSeconds) {
	var hours = parseInt(timeInSeconds / 3600);
	timeInSeconds -= hours * 3600;
	var minutes = parseInt(timeInSeconds / 60);
	timeInSeconds -= minutes * 60;
	
	var timeString = "";
	
	if(timeInSeconds < 0) timeString = "now";
	else {
		if(hours>0) timeString += hours+"h ";
		if(minutes>0) timeString += minutes+"m ";
		timeString += timeInSeconds + "s";
	}
	
	return timeString;
}

