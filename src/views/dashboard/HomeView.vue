<script setup lang="ts">
import { onMounted } from 'vue'
import SideBar from './SideBar.vue'
import type { MenuOption } from 'naive-ui'
const menuOptions: MenuOption[] = [
  {
    label: '王一一的照片',
    key: 'photos',
  },

  {
    label: '杂七杂八',
    key: 'test',
  },
  {
    label: '王一一的视频',
    key: 'video',
  },
]
onMounted(() => {})

</script>

<template>
  <div class="content">
    <aside>
      <SideBar :menuOptions="menuOptions" @select-option="handleSelectOption" />
    </aside>
<<<<<<< HEAD
    <main style="width:100%; overflow-y: auto; padding: 2rem;">
=======
    <main style="width:100%; overflow-y: auto;">
>>>>>>> f9b8c84 (feat(yeoman): add login register page)
      <RouterView />
    </main>
  </div>
</template>
<style>
.content {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
