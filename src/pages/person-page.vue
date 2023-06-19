<template>
  <div>добавление людей</div>
  <div v-if="emptyName">Введи имя</div>
  <div v-if="fewPers">Добавь не меньше 2х человек</div>
  <input v-model="name" />
  <button @click="addPerson">Добавить</button>
  <div v-for="person in $store.state.persons" :key="person[0]">
    <p>{{ person[1].name }}</p>
    <button @click="deletePerson(person[0])">x</button>
  </div>
  <a href="#/calculating">Дальше</a>
  <button @click="checkPerson">Дальше</button>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      emptyName: false,
      fewPers: false,
    };
  },
  methods: {
    addPerson() {
      if (this.name) {
        const id = Date.now();
        this.$store.state.persons.set(id, {
          id: id,
          name: this.name,
          debts: new Map(),
        });
        console.log(id);
        this.name = "";
        this.emptyName = false;
      } else {
        this.emptyName = true;
      }
      if (this.$store.state.persons.size >= 2) {
        this.fewPers = false;
        return;
      }
    },
    deletePerson(id) {
      console.log(id);
      this.$store.state.persons.delete(id);
    },
    checkPerson() {
      if (this.$store.state.persons.size < 2) {
        this.fewPers = true;
        return;
      }
      this.$router.push("calculating");
    },
  },
};
</script>
<style></style>
