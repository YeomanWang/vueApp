<script setup lang="ts">
  import { toRefs } from 'vue';
  import { useCounterStore } from '../stores/counter';
    const store = useCounterStore();
    // const count = store.count;
    // const doubleCount = store.doubleCount;
    const { count, doubleCount } = toRefs(store)

</script>
<template>
  <div>{{count}}</div> <div>{{doubleCount}}</div>
</template>