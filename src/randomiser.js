const randomiser = function (whosPlaying){
    if (whosPlaying.length >= 2) {
        let deltaArray = [];
        let peopleBeenPickedArray = [];
        let arrayAllexceptCurrent = [];
        let pairsArrayFinalLoop = [];
        let pairsArrayFinal = [];
        for (i=0; i < whosPlaying.length; i++) {
            let whoPresents = whosPlaying[i];
            whoPresents = whoPresents.toString().split(" ");
            arrayAllexceptCurrent = whosPlaying.filter(x => whoPresents.indexOf(x) === -1);
            arrayAllexceptCurrent = arrayAllexceptCurrent.toString().split(",");
            deltaArray = arrayAllexceptCurrent.filter(x => peopleBeenPickedArray.indexOf(x) === -1);
            deltaArray = deltaArray.toString().split(",");
            if (deltaArray == "") {
                return (randomiser(whosPlaying))
            }
            let whoToPresentNumber = Math.floor((Math.random()*deltaArray.length))
            let whoToPresent = deltaArray[whoToPresentNumber]
            peopleBeenPickedArray = peopleBeenPickedArray.concat(whoToPresent)
            pairsArrayFinalLoop = whoPresents.concat(whoToPresent)
            pairsArrayFinal = pairsArrayFinal.concat(pairsArrayFinalLoop)
        }
        return(pairsArrayFinal)
    } else {
        console.log("only 1 person is in the draw, the game makes no sense")
    }
}

module.exports = randomiser;