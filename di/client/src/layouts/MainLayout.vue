<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Sistema de qualificacions
        </q-toolbar-title>

        <div> {{ dataActual }} </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      elevated
      bordered
      side="left"
      content-class="bg-grey-1"
    >
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Login',
    caption: 'Entra al sistema',
    icon: 'login',
    link: '/',
    color: 'primary'
  },
  {
    title: 'About',
    caption: 'Informació sobre l\'aplicació',
    icon: 'contact_support',
    link: '#/about',
    color: 'primary'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  computed: {
    dataActual () {
      const timeStamp = new Date(Date.now())
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return timeStamp.toLocaleDateString('ca-ES', options)
    }
  }
}
</script>
