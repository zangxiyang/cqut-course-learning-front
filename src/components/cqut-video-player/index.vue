<template>
  <div id="cqut-player" ref="player">
    <video src="https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4"
           class="w-full"
           height="800"/>
  </div>
</template>

<script setup lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import Artplayer from 'artplayer';


const component = defineComponent({
  name: 'CqutVideoPlayer'
});

const player = ref<HTMLElement>(null);
onMounted(()=>{
  new Artplayer({
    container: player.value,
    url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4'
  })
})


</script>


<style scoped>
#cqut-player{
  height: 800px;
  border-radius: 6px;
}
video{
  z-index: 99999;
}
</style>
