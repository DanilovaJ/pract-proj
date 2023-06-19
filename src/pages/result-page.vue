<template>
  <div>результаты</div>
  <div v-for="person in $store.state.persons" :key="person[0]">
    <div v-for="debt in person[1].debts" :key="debt[0]">
      {{ person[1].name }} должен/должна
      {{ $store.state.persons.get(+debt[1].to).name }}
      {{ debt[1].value }} тугриков
    </div>
  </div>
</template>
<script>
export default {
  beforeCreate() {
    this.$store.state.products.forEach((product) => {
      product.persons.forEach((person) => {
        if (product.payer != person) {
          const storePerson = this.$store.state.persons.get(person);
          const debt = storePerson.debts.get(product.payer);
          if (debt) {
            debt.value += +product.price / +product.persons.size;
            storePerson.debts.set(product.payer, debt);
          } else {
            storePerson.debts.set(product.payer, {
              to: product.payer,
              value: +product.price / +product.persons.size,
            });
          }
          this.$store.state.persons.set(person, storePerson);
        }
      });
    });
    this.$store.state.persons.forEach((person) => {
      person.debts.forEach((debt) => {
        const toPerson = this.$store.state.persons.get(+debt.to);
        const adjacentDebt = toPerson.debts.get(person.id);
        if (adjacentDebt && adjacentDebt.value < debt.value) {
          const updatedDebt = {
            ...debt,
            value: debt.value - adjacentDebt.value,
          };
          person.debts.set(toPerson.to, updatedDebt);
          toPerson.debts.delete(person.id);
          this.$store.state.persons.set(toPerson.id, toPerson);
        }
        if (adjacentDebt && adjacentDebt.value > debt.value) {
          const updatedDebt = {
            ...adjacentDebt,
            value: adjacentDebt.value - debt.value,
          };
          person.debts.delete(toPerson.to);
          toPerson.debts.set(person.id, updatedDebt);
          this.$store.state.persons.set(toPerson.id, toPerson);
        }
        if (adjacentDebt && adjacentDebt.value == debt.value) {
          person.debts.delete(toPerson.id);
          toPerson.debts.delete(person.id);
          this.$store.state.persons.set(toPerson.id, toPerson);
        }
        this.$store.state.persons.set(person.id, person);
      });
    });
  },
};
</script>
<style></style>
