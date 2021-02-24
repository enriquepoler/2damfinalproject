<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        {{ missatge }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        :label="label"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  data () {
    return {
      missatge: 'La pàgina no existeix',
      label: 'Torna a l\'inici'
    }
  }
}
</script>
