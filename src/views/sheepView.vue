<script setup lang="ts">
  import { toRefs } from 'vue';
  import { useCounterStore } from '../stores/counter';
    const store = useCounterStore();
    // const count = store.count;
    // const doubleCount = store.doubleCount;
    const { count, doubleCount } = toRefs(store)
    // 使用 actions 修改状态
    const increment = store.increment;
    const decrement = store.decrement;
    const incrementAsync = store.incrementAsync;

    const handleAdd = () => {
      increment();
      console.log(store.count);
    }

    const handleDe = () => {
      decrement();
      console.log(store.count);
    }

    const handleAsyncAdd = () => {
      incrementAsync()
      console.log(store.count);
    }
</script>
<template>
  <div>{{count}}</div> <div>{{doubleCount}}</div>
  <button @click="handleAdd"> add </button>
  <button @click="handleDe"> decrease </button>
  <button @click="handleAsyncAdd"> AsyncAdd </button>
</template>