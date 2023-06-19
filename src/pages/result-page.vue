<template>
  <div class="page">
    <div class="block">
      <div class="text">Результаты</div>
      <div v-for="person in $store.state.persons" :key="person[0]">
        <div v-for="debt in person[1]?.debts" :key="debt[0]">
          {{ person[1].name }} должен/должна
          {{ $store.state.persons.get(+debt[1].to).name }}
          {{ debt[1].value }} тугриков
        </div>
      </div>
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
          const debt = storePerson.debts.get(+product.payer);
          if (debt) {
            debt.value += +product.price / +product.persons.size;
            storePerson.debts.set(+product.payer, debt);
          } else {
            storePerson.debts.set(+product.payer, {
              to: +product.payer,
              value: +product.price / +product.persons.size,
            });
          }
          this.$store.state.persons.set(person, storePerson);
        }
      });
    });
    this.$store.state.persons.forEach((person) => {
      person.debts.forEach((debt) => {
        const person2 = this.$store.state.persons.get(debt.to);
        const sameDebt = person2.debts.get(person.id);
        if (sameDebt) {
          if (debt.value === sameDebt.value) {
            person.debts.delete(person2.id);
            person2.debts.delete(person.id);
          } else if (debt.value > sameDebt.value) {
            debt.value -= sameDebt.value;
            person.debts.set(person2.id, debt);
            person2.debts.delete(person.id);
          } else {
            sameDebt.value -= debt.value;
            person2.debts.set(person.id, sameDebt);
            person.debts.delete(person2.id);
          }
        }
        this.$store.state.persons.set(person.id, person);
      });
    });
  },
};
</script>
<style></style>
