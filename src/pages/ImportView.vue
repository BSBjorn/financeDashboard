<template>
  <div>
    <h1 class="text-2xl font-thin mb-8">Import transactions</h1>
    <p class="text-sm mb-4">
      Upload a CSV file with the following columns: Dato, Kategori,
      Underkategori, Beløp, Tekst
    </p>
    <div class="bg-gray-100 p-4 rounded-lg flex flex-col gap-4 max-w-96">
      <vue-csv-import
        v-model="csv"
        :fields="{
          date: { required: true, label: 'Dato' },
          category: { required: true, label: 'Kategori' },
          subcategory: { required: true, label: 'Underkategori' },
          amount: { required: true, label: 'Beløp' },
          description: { required: true, label: 'Tekst' },
        }"
      >
        <vue-csv-toggle-headers></vue-csv-toggle-headers>
        <vue-csv-errors></vue-csv-errors>
        <vue-csv-input></vue-csv-input>
        <vue-csv-map></vue-csv-map>
      </vue-csv-import>
    </div>
    <button
      class="p-2 px-3 bg-sky-500 rounded text-white mt-4"
      @click.prevent="process()"
    >
      Upload
    </button>
    <p v-if="progress">Progress</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../lib/supabaseClient.ts";
import {
  VueCsvToggleHeaders,
  VueCsvMap,
  VueCsvInput,
  VueCsvErrors,
  VueCsvImport,
  VueCsvSubmit,
} from "vue-csv-import";
let csv = ref(null);
let progress = ref(false);
async function process() {
  progress.value = true;
  const rows = csv.value;
  //chunk the rows into smaller arrays
  const chunkedRows = chunk(rows, 50);
  chunkedRows.forEach((chunk) => {
    let formatedRows = chunk.map((row) => {
      const [day, month, year] = row.date.split(".");
      return {
        date: new Date(`${year}-${month}-${day}`).toISOString(),
        category: row.category.trimEnd(),
        subcategory: row.subcategory.trimEnd(),
        amount: row.amount.replace(".", "").replace(",", "."),
        description: row.description,
      };
    });
    uploadToSupabase(formatedRows);
  });
  csv.value = null;
  progress.value = false;
}

async function uploadToSupabase(rows) {
  const { error } = await supabase.from("transactions").insert(rows);
  if (error) {
    console.error(error);
  }
}

function chunk(array, size) {
  if (!array) return [];
  const chunkedArray = [];
  let index = 0;
  while (index < array.length) {
    chunkedArray.push(array.slice(index, index + size));
    index += size;
  }
  return chunkedArray;
}
</script>
