const defaultAttributeScore = [15, 14, 13, 12, 10, 8];

class Player {
    //constructor creates an instance of an object
    constructor(characterName = 'Naruto'){
        this.name = characterName;
        this.attributes = {
            strength: 0,
            dexterity: 0,
            constution: 0,
            intelliegence: 0,
            wisdom: 0,
            charisma: 0
        };
        let shuffledResult = shuffleArray(defaultAttributeScore);
        for (const [key, value] of Object.entries(this.attributes)){
            let attributeValue = shuffledResult.pop();
            this.attributes[key] = attributeValue;
        }
    }

    rollAttributes() {
        for (const key in this.attributes){
            let results = diceRoller(4, 6); //rolls a six sided die four times
            results.sort(function(a,b) {return a - b}); //numberic sort (puts nmbers in order of value)
            results.shift(); //removes first element (lowest value) from array aka removes lowest dice roll
            let sum = sumArrayElements(results); //return total number from three rolls
            this.attributes[key] = sum; //assign the sum of dice rolls to player attributes
        }
    }

    printPlayer(){
        console.log(`Name: ${this.name}`);
        for (const [key, value] of Object.entries(this.attributes)){
            console.log(`${key.slice(0, 3).toUpperCase()}: ${value}`);
        }
    }
}

const player01 = new Player();
player01.printPlayer();
const player02 = new Player('Son Goku');
player02.rollAttributes();
player02.printPlayer();

// Fisher-Yates algorithm for randomly sorting an array
// from: htttps://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
// adapted to JS and reconfigured to reutrn a new (non-mutated) array
function shuffleArray(targetArray){
    let shuffled = Array.from(targetArray);
    for (let i = shuffled.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled;
}

function diceRoller(times, sides){
    let results = [];
    for (let i = 0; i < times; i++){
        results.push(Math.floor(Math.random() * sides + 1));
    }

    return results;
}

function sumArrayElements(array){
    return array.reduce((total, currentNumber) => total + currentNumber);
}
