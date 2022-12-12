<script setup lang="ts">
import { ref, computed } from "vue";
const a = ref(1);
const b = ref(2);
const c = computed(() => {
  return a.value + b.value;
});
</script>
