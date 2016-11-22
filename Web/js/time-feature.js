// Array with times
var bestTimes = {};
//Parameter variables
var BEST_TIMES_NAME = "BestTimesLisk";
var BEST_TIMES_MAX = 10;
var NUMBER_OF_DECIMALS = 0;

// Checks if local storage is available
function checkLocalStorage(){
    return typeof(Storage) !== "undefined";
}

// Get all times stored
function recoverAllTimes(){
    if(checkLocalStorage()){
        var localStr = localStorage.getItem(BEST_TIMES_NAME);
        if(localStr == null) return {};
        else return JSON.parse(localStr);
    }
    else{
        return {};
    }
}

// Orders a dictionary by keys
function orderDict (dict){
    var keys = Object.keys(dict);
    var timeKeys = [];
    for(key in keys){
        timeKeys.push( parseFloat(keys[key]) );
    }
    timeKeys = timeKeys.sort();
    
    var outDict = {};
    for(var key in timeKeys){
        outDict[timeKeys[key]] = timeKeys[key];
    }
    
    return outDict;
}
//  Order keys of an object
function orderedKeys(dict){
    var keys = Object.keys(dict);
    var timeKeys = [];
    for(key in keys){
        timeKeys.push( parseFloat(keys[key]) );
    }
    return timeKeys.sort(function(a,b){
        return b - a;
    });
}

// Add a time for the top
function addTime( time ) {
    if(checkLocalStorage()){
        bestTimes[time] = time;
        bestTimes = orderDict(bestTimes);
        
        var keysOrderedByTime = orderedKeys(bestTimes);
        while(Object.keys(bestTimes).length > BEST_TIMES_MAX){
            delete bestTimes[ bestTimes[keysOrderedByTime[keysOrderedByTime.length-1]] ];
        }
        
        localStorage.setItem(BEST_TIMES_NAME, JSON.stringify(bestTimes) );
    }
    //Redisplay times
    displayTimes();
}

// Display times in screen
function displayTimes(){
    if(Object.keys(bestTimes).length == 0){
        $('#best-times').empty();
        $('#best-times').append('<p>There is no score yet.</p>');
    }
    else{
        var listKeys = orderedKeys(bestTimes);
        $('#best-times').empty();
        for(var i = 0, total = Object.keys(listKeys).length; i < total; i++){
            var strNumber = parseFloat(listKeys[ Object.keys(listKeys)[i] ]).toFixed(NUMBER_OF_DECIMALS);
            $('#best-times').append('<p><span class="glyphicon glyphicon glyphicon-time"></span> '+ (i+1) + '. ' + strNumber +'</p>');
        }
        var timesTable = $('#best-times p');
        if(timesTable[0] !== undefined){
            $(timesTable[0]).addClass('gold-time');
        }
        if(timesTable[1] !== undefined){
            $(timesTable[1]).addClass('silver-time');
        }
        if(timesTable[2] !== undefined){
            $(timesTable[2]).addClass('bronze-time');
        }  
    }
}

//Reset times
function resetTimes(){
    if(checkLocalStorage()){
        bestTimes = {};
        localStorage.removeItem(BEST_TIMES_NAME);
        displayTimes();
    }
}

$(document).ready(function(){
    bestTimes = recoverAllTimes();
    displayTimes();
});