<script setup>
import { ref } from 'vue';

import Table from './ui/table/table.vue';
import Modal from './ui/modal/sideModal.vue';
import Form from './ui/form/form.vue';


const modalOpen = ref(false);

function onClickAddMedicament() {
  modalOpen.value = true
}
</script>

<template>
  <main class="container medicaments">
    <div class="panel">
      <div class="description">
        <h1>Medicaments</h1>
        <p class="subtitle">
          Accédez aux données en temps réel concernant les médicaments en stock,
          contrôlez leur disponibilité et optimisez leur gestion.
        </p>
      </div>
      <button class="btn-primary" @click="onClickAddMedicament"><span class="material-symbols-outlined">add</span>Ajouter un medicament</button>
    </div>
    <Table></Table>

    <Modal :isOpen="modalOpen" @close="modalOpen = false" title="Créer un médicament">
      <Form></Form>
    </Modal>
  </main>
</template>

<style>
@import './page.css';
</style>
