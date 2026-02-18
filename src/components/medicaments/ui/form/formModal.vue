<script setup>

import Modal from '../modal/sideModal.vue'
import Form from '../form/form.vue'

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
  console.log("Submitted medicament:", medicament)
  close()
}

</script>

<template>

  <Modal
    :isOpen="isOpen"
    @close="close"
    title="Créer un médicament"
  >
    <Form :medicament="medicament" @submit="onSubmit" @cancel="close"></Form>
  </Modal>

</template>
