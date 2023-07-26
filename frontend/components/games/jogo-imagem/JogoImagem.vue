<template>
  <div>
    <h1>Jogo da Imagem</h1>
    <img width="200" :src="currentImage.url" alt="Imagem do jogo" />
    <button @click="startListening">Falar resposta</button>
    <p v-if="correctAnswer !== null">
      Sua resposta está {{ correctAnswer ? "correta" : "incorreta" }}!
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";

let images = [
  {
    id: 0,
    url: "https://cdn.awsli.com.br/2500x2500/598/598977/produto/192135498/2edb7bf9d9.jpg",
    keyword: "chapeu",
  },
  {
    id: 1,
    url: "https://www.patasdacasa.com.br/sites/patasdacasa/files/styles/webp/public/noticias/2020/02/7-sinais-que-mostram-que-seu-cachorro-e-muito-inteligente.jpg.webp?itok=jv6PGs93",
    keyword: "cachorro",
  },
  // adicione mais imagens conforme necessário
];

function normalizeString(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^a-z0-9]/gi, ""); // remove caracteres não alfanuméricos
}

const correctAnswer = ref(null);
const currentImageIndex = ref(0);
let currentImage = ref(images[currentImageIndex.value]);

const startListening = () => {
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.lang = "pt-BR";
  recognition.onresult = (event) => {
    const userAnswer = normalizeString(event.results[0][0].transcript);
    correctAnswer.value =
      userAnswer.toLowerCase() === currentImage.value.keyword.toLowerCase();
    if (correctAnswer.value) {
      setTimeout(() => {
        currentImage.value = images[currentImageIndex.value + 1];
        correctAnswer.value = null;
      }, 500);
    }
    if (!correctAnswer.value) {
      currentImage = ref(images[Math.floor(Math.random() * images.length)]);
      correctAnswer.value = null;
    }
  };
  recognition.start();
};
</script>
