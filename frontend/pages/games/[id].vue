<script setup>
import gameService from "@/services/gameService";

let gameComponent = reactive({});
onMounted(() => {
  const gameName = useRoute().params.id;
  gameComponent = gameService.getGame(gameName);
});
</script>
<template>
  <div>
    <component :is="gameComponent"></component>
  </div>
</template>
