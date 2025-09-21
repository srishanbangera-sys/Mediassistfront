import * as sdk from "microsoft-cognitiveservices-speech-sdk";

export function speakText(text, key, region) {
    const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
    speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural"; // Choose voice

    const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    synthesizer.speakTextAsync(
        text,
        result => {
            if (result) console.log("Speech synthesis finished");
            synthesizer.close();
        },
        error => {
            console.error(error);
            synthesizer.close();
        }
    );
}
export function startRecognition(callback, key, region) {
    const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
    speechConfig.speechRecognitionLanguage = "en-US";
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    recognizer.recognizeOnceAsync(result => {
        if (result && result.text) {
            callback(result.text);
        }
    });
}