<template>
  <div>
    <h1>Jogo da Matemática</h1>
    <h1>Some os seguintes números: {{ num1 }} + {{ num2 }}</h1>
    <button @click="startListening">Falar resposta</button>
    <button @click="newNumber">Novo número</button>
    <p v-if="correctAnswer !== null">
      Sua resposta está {{ correctAnswer ? "correta" : "incorreta" }}!
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const num1 = ref(Math.floor(Math.random() * 10));
const num2 = ref(Math.floor(Math.random() * 10));
const correctAnswer = ref(null);

function newNumber() {
  num1.value = Math.floor(Math.random() * 10);
  num2.value = Math.floor(Math.random() * 10);
  correctAnswer.value = null;
}

let units = [
  "zero",
  "um",
  "dois",
  "três",
  "quatro",
  "cinco",
  "seis",
  "sete",
  "oito",
  "nove",
];
let teens = [
  "dez",
  "onze",
  "doze",
  "treze",
  "quatorze",
  "quinze",
  "dezesseis",
  "dezessete",
  "dezoito",
  "dezenove",
];
let tens = [
  "",
  "",
  "vinte",
  "trinta",
  "quarenta",
  "cinquenta",
  "sessenta",
  "setenta",
  "oitenta",
  "noventa",
];
let hashmap = {};

for (let i = 0; i < 100; i++) {
  if (i < 10) {
    hashmap[units[i]] = i;
  } else if (i < 20) {
    hashmap[teens[i - 10]] = i;
  } else {
    let ten = Math.floor(i / 10);
    let unit = i % 10;
    let key = tens[ten];
    if (unit > 0) {
      key += " e " + units[unit];
    }
    hashmap[key] = i;
  }
}

const startListening = () => {
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.lang = "pt-BR";
  recognition.onresult = (event) => {
    console.log("o que o navegador entendeu", event.results[0][0].transcript);
    console.log(
      "o que estou comparando",
      hashmap[event.results[0][0].transcript]
    );
    const browserAnswer = event.results[0][0].transcript;
    console.log("é numero", Number.isInteger(parseInt(browserAnswer)));
    const userAnswer = Number.isInteger(parseInt(browserAnswer))
      ? parseInt(browserAnswer)
      : parseInt(hashmap[event.results[0][0].transcript]);
    correctAnswer.value = userAnswer === num1.value + num2.value;
  };
  recognition.start();
};
</script>
