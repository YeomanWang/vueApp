<template>
  <div class="header">
    <div v-for="item in headers">
      <span
        ><RouterLink :to="{ name: item.label }">{{ item.label }}</RouterLink>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      handleBack() {
        message.info('[onBack]')
      },
      headers: [
        {
          label: 'dashboard',
          key: '1',
        },
        {
          label: 'personal',
          key: '2',
        },
        {
          label: 'others',
          key: '3',
        },
      ],
    }
  },
})
</script>

<style scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
