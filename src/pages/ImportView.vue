<script setup>
import { supabase } from "../lib/supabaseClient.ts";
import {
  VueCsvToggleHeaders,
  VueCsvMap,
  VueCsvInput,
  VueCsvErrors,
  VueCsvImport,
} from "vue-csv-import";

import { ref } from "vue";
const csv = ref(null);
const progress = ref(0);
const progressMax = ref(0);

const err = ref(null);
function process() {
  const rows = csv.value;
  //chunk the rows into smaller arrays
  const chunkedRows = chunk(rows, 50);
  progressMax.value = chunkedRows.length;
  chunkedRows.forEach((chunk) => {
    let formatedRows = chunk.map((row) => {
      const [day, month, year] = row.date.split(".");
      return {
        date: new Date(`${year}-${month}-${day}`).toISOString(),
        category: row.category,
        subcategory: row.subcategory,
        amount: parseInt(row.amount),
        description: row.description,
      };
    });
    uploadToSupabase(formatedRows);
    //console.log(formatedRows);
  });
}

async function uploadToSupabase(rows) {
  const { error } = await supabase.from("transactions").insert(rows);
  if (error) {
    console.error(error);
    err.value = error.message;
  }
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
    <div v-if="err">
      {{ err }}
    </div>
    <div v-if="csv"">{{ progress }}%</div>
    <div>
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
    <button @click.prevent="process()">Proess</button>
  </div>
</template>
