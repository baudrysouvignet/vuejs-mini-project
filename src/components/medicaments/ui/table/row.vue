<script setup>
defineProps(['reference', 'nom', 'imageURL', 'quantiteParUnite']);
</script>
<template>
  <tr>
    <td>{{ reference }}</td>
    <td>{{ nom }} <br> <span class="subtitle">{{ quantiteParUnite }}</span></td>
    <td>
      <img :src="imageURL" alt="" width="50" />
    </td>
  </tr>
</template>
