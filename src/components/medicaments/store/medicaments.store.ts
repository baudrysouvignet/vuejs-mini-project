import { reactive } from 'vue';

import { getMedicaments, patchMedicamentStock, deleteMedicament, updateMedicament, createMedicament } from '../api/medicaments.api';
import { Medicament } from '../model/Medicament';

const state = reactive({
  items: [] as Medicament[],
  loading: false,
  page: 0,
  size: 20,
  totalPages: 0,
  totalElements: 0,
});

async function loadMedicaments(page = state.page, loadingIndicator = true) {
  if (loadingIndicator) {
    state.loading = true;
  }
  

  try {
    const data = await getMedicaments(page);
    console.log(data);
    state.items = data._embedded.medicaments.map(
      (d: any) => new Medicament(d.reference, d.nom, d.imageURL, d.quantiteParUnite, d.unitesEnStock, d.prixUnitaire, d.unitesCommandees, d.niveauDeReappro, d.indisponible, d.fournisseur, d._links.categorie.href)
    );

    state.page = data.page.number;
    state.size = data.page.size;
    state.totalPages = data.page.totalPages;
    state.totalElements = data.page.totalElements;
  } finally {
    state.loading = false;
  }
}

function nextPage() {
  if (state.page < state.totalPages - 1) {
    return loadMedicaments(state.page + 1);
  }
}

function prevPage() {
  if (state.page > 0) {
    return loadMedicaments(state.page - 1);
  }
}

function getMedicamentByReference(reference) {
  return state.items.find(m => m.reference === reference) || null;
}


async function changeUnitesEnStock(reference: string, newValue: number) {
  const medicament = state.items.find(m => m.reference == reference);

  if (medicament) {
    let old = medicament.unitesEnStock
    medicament.unitesEnStock = newValue;
    try {
      await patchMedicamentStock(reference, newValue);
    } catch (e) {
      medicament.unitesEnStock = old;
      throw e;
    }
  }
}

async function deleteOneMedicament(reference) {
  const index = state.items.findIndex(m => m.reference === reference);
  if (index === -1) return;

  const old = state.items[index];

  state.items.splice(index, 1);
  state.totalElements = Math.max(0, state.totalElements - 1);

  try {
    await deleteMedicament(reference);
    await loadMedicaments(state.page, false)
  } catch (e) {
    state.items.splice(index, 0, old);
    state.totalElements += 1;
    throw e;
  }
}

async function createOrUpdateMedicament(medicament) {
  if (medicament.reference) {
    await updateMedicament(medicament);
    return;
  }
  await createMedicament(medicament);
}


export function useMedicamentsStore() {
  return {
    state,
    loadMedicaments,
    prevPage,
    nextPage,
    changeUnitesEnStock,
    deleteOneMedicament,
    getMedicamentByReference,
    createOrUpdateMedicament
  };
}
