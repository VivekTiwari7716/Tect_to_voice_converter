let speech = new SpeechSynthesisUtterance(); // for requesting speech from the window.

let voices = []; // for storing available languages.

let voiceselect = document.getElementById("voiceSelect");

window.speechSynthesis.onvoiceschanged = () => { 

    voices = window.speechSynthesis.getVoices(); // getvoices will give all available languages.

    speech.voice = voices[0];                

    voices.forEach((voice, i) => {              
        voiceselect.options[i] = new Option(voice.name, i); // new option will inside the voices with name.
    });
};

voiceselect.addEventListener("change", () => { //addEventListener for some events . like 'change'
    speech.voice = voices[voiceselect.value];
});

document.getElementById("listenButton").addEventListener("click", () => {
    speech.text = document.getElementById("textToSpeech").value; // stores in speech.text
    window.speechSynthesis.speak(speech);
});

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------*/


let recognition = new webkitSpeechRecognition() || new SpeechRecognition(); // for speech recognition.

recognition.continuous = false;
recognition.interimResults = true;

document.getElementById("startButton").addEventListener("click", () => {
    recognition.start();
});

document.getElementById("stopButton").addEventListener("click", () => {
    recognition.stop();
});

recognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript; // conactenete event result.
        }
    }
    document.getElementById("output").value = transcript;
};
