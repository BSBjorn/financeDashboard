# Vue 3 + Vite Personal Finance Dashboard

My personal finance dashboard for overview and tracking of my finances.

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) and disable Vetur

## Installation and development

Run `Yarn install` and then `yarn run dev` to develop.

## Supabase client

Create a database in Supabase and add in .env the following variables

```
SUPABASE_URL = "https://********.supabase.co"
SUPABASE_KEY = "someSecretKey"
```

## Transactions source

The dashboard needs JSON file in `/src/api/transactions.json` to with the format like this:

```
[
  {
    "Dato": "02.01.2024",
    "Kategori": "Personforsikringer",
    "Underkategori": "Annet",
    "Tekst": "Til: SPAREBANK 1 FORSIKRING...",
    "Beløp": "-500,00"
  },
  {
    "Dato": "02.01.2024",
    "Kategori": "Øvrige utgifter",
    "Underkategori": "Overførsler",
    "Tekst": "Til Brukskonto",
    "Beløp": "-1000,00"
  },
  {
    "Dato": "02.01.2024",
    "Kategori": "Dagligvarer",
    "Underkategori": "Dagligvareforretning",
    "Tekst": "KIWI 376 KJ@PMA",
    "Beløp": "-184,50"
  }
]
```

# Todos and improvements planned

## Auth and database

Use Supabase to set up authentication and database for managing the transactions

## Import and categorisation

Create a backend service (Python ?) to format and import the data to the database

## Deployment

Should be deployed to a webhost for access across devices

## Other planned improvements

- Month switch to change date ranges and comparisons
- Pages for different views.
