<script setup>
  defineProps(['isOpen', 'title']);
  defineEmits(['close']);
</script>

<template>
    <Teleport to="body">
      <div v-if="isOpen" class="modal" @click.self="$emit('close')">
        <div class="modal-content">
          <div class="modal-header">
            <span>{{ title }}</span>
            <button @click="$emit('close')" class="btn btn-icon"><span class="material-symbols-outlined">close</span></button>
          </div>
          <div class="modal-body">
            <slot></slot> 
          </div>
        </div>
      </div>
    </Teleport>
</template>
  
<style>
@import './sideModal.css';
</style>