<script setup>
import { onMounted } from 'vue';
import { useMedicamentsStore } from '../../store/medicaments.store';
import Row from './row.vue';

const store = useMedicamentsStore();
onMounted(() => {
  store.loadMedicaments();
});


function handleChangeStock(reference, value) {
  store.changeUnitesEnStock(reference, value);
}

function handleDelete(reference) {
  store.deleteOneMedicament(reference);
}


</script>
<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Reference</th>
          <th>Nom</th>
          <th>Quantite</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="store.state.loading">
          <td colspan="5" class="loading">Chargement</td>
        </tr>
        <Row
          v-else
          v-for="m in  store.state.items"
          :key="m.reference"
          :reference="m.reference"
          :nom="m.nom"
          :imageURL="m.imageURL"
          :quantiteParUnite ="m.quantiteParUnite"
          :unitesEnStock = m.unitesEnStock
          @change-stock="handleChangeStock"
          @delete="handleDelete"
        />
      </tbody>
    </table>
  </div>
  <div
    class="pagination"
  >
    <button
      class="btn-secondary"
      @click="store.prevPage"
      :disabled="store.state.loading || store.state.page === 0"
    >
      <span class="material-symbols-outlined">keyboard_arrow_left</span>
    </button>

    <span>
      Page {{ store.state.page + 1 }} / {{ store.state.totalPages }} ({{
        store.state.totalElements
      }}
      elements)
    </span>

    <button
      class="btn-secondary"
      @click="store.nextPage"
      :disabled="
        store.state.loading || store.state.page >= store.state.totalPages - 1
      "
    >
      <span class="material-symbols-outlined">keyboard_arrow_right</span>
    </button>
  </div>
</template>

<style>
@import './table.css';
</style>