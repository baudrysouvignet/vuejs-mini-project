<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { Medicament } from "../..//model/Medicament";
import { getCategories } from '../../../categories/api/categories.api.ts';

const categories = ref([]);

onMounted(async () => {
  const data = await getCategories();
  categories.value = data._embedded.categories;
});
const props = defineProps({
  medicament: Object
});

const emit = defineEmits(["submit", "cancel"]);

let form = reactive(new Medicament());
watch(
  () => props.medicament,
  (med) => {
    if (med) {
      form = reactive(med.clone());
    } else {
      form = reactive(new Medicament());
    }
  },
  { immediate: true }
);

function submit() {
if (props.medicament) {
    props.medicament.apply(form);
    emit("submit", props.medicament);
  } else {
    emit("submit", form);
  }
  
}
</script>

<template>
  <form @submit.prevent="submit" class="form-content">

    <h2>Informations générale</h2>

    <div class="input checkbox">
            <input type="checkbox" v-model="form.indisponible" />
            <label>indisponible</label>
        </div>
    <div class="input-content">
        <div v-if="form.reference" class="input f1">
            <label>Reference</label>
            <input class="form-control read-only" v-model="form.reference" type="number" placeholder="12" readonly/>
        </div>
        
        <div class="input f2">
            <label>Nom</label>
            <input class="form-control" v-model="form.nom" placeholder="Nom"/>
        </div>
    </div>

    <select class="form-control" v-model.number="form.categorie">
        <option disabled :value="null">--Choose an option--</option>

        <option v-for="cat in categories" :key="cat.code" :value="cat.code">
            {{ cat.libelle }} ({{ cat.code }})
        </option>
    </select>


    <input class="form-control" v-model="form.imageURL" placeholder="imageURL"/>

    <div class="separator"></div>

    <h2>Gestion du stock</h2>
    <div class="input-content">
        <div class="input f1">
            <label>Unité en stock</label>
            <input class="form-control" v-model.number="form.unitesEnStock" type="number" placeholder="Unite en stock" />
        </div>
        <div class="input f1">
            <label>Unité en commande</label>
            <input class="form-control" v-model.number="form.unitesCommandees" type="number"  placeholder="Unite en commande"/>
        </div>
        <div class="input f1">
            <label>Niveau de réaprvisionnemnet</label>
            <input class="form-control" v-model.number="form.unitesCommandees" type="number"  placeholder="Unite en commande"/>
        </div>
        
    </div>

    <div class="input-content">
        <div class="input f1">
            <label>Quantite par unité</label>
            <input class="form-control" v-model="form.quantiteParUnite" placeholder="Boîte de 8 comprimés"/>
        </div>
        
        <div class="input f1">
            <label>Prix unitaire (€)</label>
            <input class="form-control" v-model.number="form.prixUnitaire" step="0.01" type="number" placeholder="Prix unitaire"/>
        </div>
    </div>    

    <div class="selection">
        <button class="btn btn-primary" type="submit">Sauvegarder</button>
        <button class="btn btn-seconsary" type="button" @click="$emit('cancel')">Annuler</button>
    </div>
  </form>
</template>

<style>
@import './form.css';
</style>