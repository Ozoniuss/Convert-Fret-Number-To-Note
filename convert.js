var lowerSharps = ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"]
var lowerFlats = ["E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb"]
var higherSharps = ["e", "f", "f#", "g", "g#", "a", "a#", "b", "c", "c#", "d", "d#"]
var highersFlats = ["e", "f", "gb", "g", "ab", "a", "bb", "b", "c", "cb", "d", "eb"]

//first row of page
let header = document.getElementsByClassName("n")[0]

//find the tuning
let tuning = header.getElementsByClassName("C8nsu") //notes of the tuning
let tuning_length = tuning.length //length of the tuning

//position of string has label y, the distance between strings is always the same
let string_distance = tuning[1].getAttribute("y") - tuning[0].getAttribute("y") //should be 12
let standard_tuning_compentation = [findOffset("e"), findOffset("B"), findOffset("G"), findOffset("D"), findOffset("A"), findOffset("E"), findOffset("B")]

let notes = document.getElementsByClassName("Chqgw")
//console.log(findOffset(tuning[5].textContent))
for(let note of notes){
    let string = note.getAttribute("y") / string_distance //find the string which contains the note
    console.log(tuning[string].textContent)
    let value = parseInt(note.textContent) // value of the note
    let compensation = standard_tuning_compentation[string] // offset of the string, starting from E

    if(value > 12){
        let note_index = (value + compensation) % 12 //find the name of the note
        note.textContent = higherSharps[note_index]
    }
    if(value < 12){
        let note_index = (value + compensation) % 12 //find the name of the note
        note.textContent = lowerSharps[note_index]
    }


}

console.log(string_distance)

function findOffset(stringNote){
    let offset = higherSharps.findIndex(e => e === stringNote)
    if (offset != -1){
        return offset
    }

    offset = lowerSharps.findIndex(e => e === stringNote)
    if (offset != -1){
        return offset
    }

    return null
} 