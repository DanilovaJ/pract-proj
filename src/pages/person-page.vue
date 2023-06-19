<template>
  <div class="page">
    <div class="block">
      <div class="text">Добавление людей</div>
      <div class="error" v-if="emptyName">Введи имя</div>
      <div class="error" v-if="fewPers">Добавь не меньше 2х человек</div>
      <div class="flex">
        <input v-model="name" />
        <button class="button" @click="addPerson">Добавить</button>
      </div>
      <div v-for="person in $store.state.persons" :key="person[0]">
        <div class="flex">
          <span>{{ person[1].name }}</span>
          <button class="button" @click="deletePerson(person[0])">x</button>
        </div>
      </div>
      <div>
        <button class="button" @click="checkPerson">Дальше</button>
      </div>
    </div>
  </div>
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
        this.$store.state.persons.set(+id, {
          id: +id,
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
