<script setup>
import Table from './ui/table/table.vue';
</script>

<template>
  <div class="container medicaments">
    <div>
      <h1>Medicaments</h1>
      <p class="subtitle">
        Accédez aux données en temps réel concernant les médicaments en stock,
        contrôlez leur disponibilité et optimisez leur gestion.
      </p>
    </div>
    <Table></Table>
  </div>
</template>

<style>
@import './page.css';
</style>
