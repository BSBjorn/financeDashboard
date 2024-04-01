<script setup>
import {
  VueCsvToggleHeaders,
  VueCsvSubmit,
  VueCsvMap,
  VueCsvInput,
  VueCsvErrors,
  VueCsvImport,
} from "vue-csv-import";

import { ref } from "vue";
const csv = ref(null);

function process() {
  const rows = csv.value;
  //chunk the rows into smaller arrays
  const chunkedRows = chunk(rows, 50);
  console.log(chunkedRows);
}

async function uploadToSupabase(rows) {
  const { error } = await supabase.from("transactions").insert([
    { id: 1, name: "Nepal" },
    { id: 1, name: "Vietnam" },
  ]);
}

function chunk(array, size) {
  const chunkedArray = [];
  let index = 0;
  while (index < array.length) {
    chunkedArray.push(array.slice(index, index + size));
    index += size;
  }
  return chunkedArray;
}
</script>

<template>
  <div>
    <h1>Import transactions</h1>
    <div>
      <vue-csv-import
        v-model="csv"
        :fields="{
          date: { required: true, label: 'Dato' },
          category: { required: true, label: 'Kategori' },
          subcategory: { required: true, label: 'Underkategori' },
          amount: { required: true, label: 'Beløp' },
          description: { required: true, label: 'Beskrivelse' },
        }"
      >
        <vue-csv-toggle-headers></vue-csv-toggle-headers>
        <vue-csv-errors></vue-csv-errors>
        <vue-csv-input></vue-csv-input>
        <vue-csv-map></vue-csv-map>
      </vue-csv-import>
    </div>
    <button @click.prevent="process()">Proess</button>
  </div>
</template>
