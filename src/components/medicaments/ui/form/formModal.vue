<script setup>

import Modal from '../modal/sideModal.vue'
import Form from '../form/form.vue'
import { useMedicamentsStore } from '../../store/medicaments.store';


const store = useMedicamentsStore();

const props = defineProps({
  isOpen: Boolean,
  medicament: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(["close"])

function close() {
  emit("close")
}

function onSubmit(medicament) {
  store.createOrUpdateMedicament(medicament);
  close()
}

</script>

<template>

  <Modal
    :isOpen="isOpen"
    @close="close"
    title="Gérer un médicament"
  >
    <Form :medicament="medicament" @submit="onSubmit" @cancel="close"></Form>
  </Modal>

</template>
