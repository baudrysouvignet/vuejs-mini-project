<script setup>
import { reactive, onMounted } from 'vue';
import { useMedicamentsStore } from '../../store/medicaments.store';
import Row from './row.vue';

const store = useMedicamentsStore();
onMounted(() => {
  store.loadMedicaments();
});
</script>
<template>
  <div v-if="store.state.loading">Chargement...</div>

  <div v-else>
    <table>
      <thead>
        <tr>
          <th>Reference</th>
          <th>Nom</th>
          <th>Image</th>
        </tr>
      </thead>

      <tbody>
        <Row
          v-for="m in store.state.items"
          :key="m.reference"
          :reference="m.reference"
          :nom="m.nom"
          :imageURL="m.imageURL"
        />
      </tbody>
    </table>
  </div>
  <div
    style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px"
  >
    <button
      @click="store.prevPage"
      :disabled="store.state.loading || store.state.page === 0"
    >
      Page précedente
    </button>

    <span>
      Page {{ store.state.page + 1 }} / {{ store.state.totalPages }} ({{
        store.state.totalElements
      }}
      elements)
    </span>

    <button
      @click="store.nextPage"
      :disabled="
        store.state.loading || store.state.page >= store.state.totalPages - 1
      "
    >
      Page suivante
    </button>
  </div>
</template>
