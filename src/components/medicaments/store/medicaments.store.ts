import { reactive } from 'vue';

import { getMedicaments } from '../api/medicaments.api';
import { Medicament } from '../model/Medicament';

const state = reactive({
  items: [] as Medicament[],
  loading: false,
  page: 0,
  size: 20,
  totalPages: 0,
  totalElements: 0,
});

async function loadMedicaments(page = state.page) {
  state.loading = true;

  try {
    const data = await getMedicaments(page);

    state.items = data._embedded.medicaments.map(
      (d: any) => new Medicament(d.reference, d.nom, d.imageURL)
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

export function useMedicamentsStore() {
  return {
    state,
    loadMedicaments,
    prevPage,
    nextPage,
  };
}
