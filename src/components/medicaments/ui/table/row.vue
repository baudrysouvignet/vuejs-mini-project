<script setup>
defineProps(['reference', 'nom', 'imageURL']);
</script>
<template>
  <tr>
    <td>{{ reference }}</td>
    <td>{{ nom }}</td>
    <td>
      <img :src="imageURL" alt="" width="50" />
    </td>
  </tr>
</template>
