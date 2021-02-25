<template>
  <q-page class="bg-withe window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <div class="col"></div>
        <div class="col-6">
          <div class="row">
            <h5 class="text-h5 text-grey q-my-md">About</h5>
          </div>
          <div class="row">
            <h6 class="text-h6 text-grey  q-my-md">Sobre nosaltres</h6>
          </div>
          <p class="text-grey q-my-md">
            Esta aplicació ha sigut desenvolupada conjuntament als mòduls de
            "Desenvolupament d'interfícies" i "Accés a dades" pels alumnes de 2n de DAM
            a l'IES Jaume II "El Just" de Tavernes de la Valldigna durant el mes de febrer
            del curs 2020/21.
          </p>
          <p class="text-grey q-my-md">
            Per al frontend s'ha utilitzat Quasar, Vue, Vuex, Vue i18n i Axios. Mentre que per
            al backend hem fet ús de NodeJS, Express, JWT i MySQL.
          </p>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>
