// Required since the document is not entirely loaded at start. Definitely there
// are better ways.
document.addEventListener("scroll", ConvertNotes)

const note = "Cw81bf" // class where tuning can be taken from
const tuningNotesClass = "D38xz" // class representing the actual values from the tuning
const noteValues = "h81p9 h8e1" // class representing the numbers

var lowerSharps = ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"]
var lowerFlats = ["E", "F", "G♭", "G", "A♭", "A", "B♭", "B", "C", "D♭", "D", "E♭"]
var higherSharps = ["e", "f", "f#", "g", "g#", "a", "a#", "b", "c", "c#", "d", "d#"]
var highersFlats = ["e", "f", "g♭", "g", "a♭", "a", "b♭", "b", "c", "c♭", "d", "e♭"]

function ConvertNotes() {
    //first row of page
    let header = document.getElementsByClassName(note)[0]

    //find the tuning
    let tuning = header.getElementsByClassName(tuningNotesClass) //notes of the tuning
    let tuningLength = tuning.length //length of the tuning

    console.log(tuningLength)
    console.log(tuning[0])

    //position of string has label y, the distance between strings is always the same
    let stringDistance = tuning[1].getAttribute("y") - tuning[0].getAttribute("y") //should be 12
    let tuningCompentation = []

    for (let i = 0; i < tuning.length; i++) {
        tuningCompentation.push(findOffset(tuning[i].textContent))
    }

    console.log(tuningCompentation)

    let notes = document.getElementsByClassName(noteValues)
    console.log(notes)
    for (let note of notes) {
        let string = note.getAttribute("y") / stringDistance //find the string which contains the note

        let value = parseInt(note.textContent) // value of the note
        let compensation = tuningCompentation[string] // offset of the string 

        if (value >= 12) {
            let note_index = (value + compensation) % 12 //find the name of the note
            note.textContent = higherSharps[note_index]
        }
        if (value < 12) {
            let note_index = (value + compensation) % 12 //find the name of the note
            note.textContent = lowerSharps[note_index]
        }


    }
}
function findOffset(stringNote) {
    let offset = higherSharps.findIndex(e => e === stringNote)
    if (offset != -1) {
        return offset
    }

    offset = lowerSharps.findIndex(e => e === stringNote)
    if (offset != -1) {
        return offset
    }

    return null
}

ConvertNotes()