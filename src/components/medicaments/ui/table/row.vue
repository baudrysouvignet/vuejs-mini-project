<script setup>
import { ref } from 'vue';

const props = defineProps(['reference', 'nom', 'imageURL', 'quantiteParUnite', "unitesEnStock"]);

const emit = defineEmits(['change-stock', 'delete']);

function onDelete() {
  emit('delete',props.reference);
}

function onStockChange(event) {
  emit('change-stock', props.reference, Number(event.target.value));
}

const stockInput = ref(null);

function removeStock() {
  const input = stockInput.value;
  input.value = Math.max(0, Number(input.value) - 1);
  input.dispatchEvent(new Event('change'));
}

function addStock() {
  const input = stockInput.value;
  input.value = Math.max(0, Number(input.value) + 1);
  input.dispatchEvent(new Event('change'));
}
</script>
<template>
  <tr>
    <td>{{ reference }}</td>
    <td>{{ nom }} <br> <span class="subtitle">{{ quantiteParUnite }}</span></td>
    <td>
      <div class="quantitySteper">
        <button @click="removeStock" class="btn btn-secondary btn-icon"><span class="material-symbols-outlined">remove</span></button>
        <input ref="stockInput" type="number" :value=unitesEnStock step="1" min="0" @change="onStockChange">
        <button @click="addStock" class="btn btn-secondary btn-icon"><span class="material-symbols-outlined">add</span></button>
      </div>
    </td>
    <td>
      <img :src="imageURL" alt="" width="50" />
    </td>
    <td>
      <div class="action-container">
        <button class="btn btn-secondary btn-icon btn-info"><span class="material-symbols-outlined">edit</span></button>
        <button @click="onDelete" class="btn btn-secondary btn-icon btn-error"><span class="material-symbols-outlined">delete</span></button>
      </div>
    </td>
  </tr>
</template>
