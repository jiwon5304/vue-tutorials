<template>
  <div>
    <h1>Hello World</h1>
    <form>
      <input type="text" v-model="authenticate.email" placeholder="email" />
      <br>
      <input type="password" v-model="authenticate.password" placeholder="password" />
      <br>
      <button type="button" @click="handleSubmit">로그인</button>
    </form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      authenticate: {
        email: "user1@ktown4u.com",
        password: "qwer1234"
      }
    }
  },
  computed: {
    isAuthenticated: function () {
      return this.$store.getters.isAuthenticated
    }
  },
  mounted () {
    console.log(this.isAuthenticated)
  },
  methods: {
    async handleSubmit () {
      const resp = await this.$store.dispatch('LOGIN', { ...this.authenticate })
      if (resp.status === 200) {
        this.$router.push({ name: 'listpage' })
      }
    }
  }
}
</script>
