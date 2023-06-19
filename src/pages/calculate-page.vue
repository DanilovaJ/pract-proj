<template>
  <div class="page">
    <div class="block">
      <div class="text">Раздел счета</div>
      <div class="error">{{ error }}</div>
      <div class="flex">
        <input v-model="name" type="text" placeholder="Название продукта" />
        <input v-model="price" type="number" placeholder="Цена продукта" />
        <button class="button" @click="addProduct">Добавить</button>
      </div>
      <div v-for="product in $store.state.products" :key="product[0]">
        <div class="flex">
          <span
            >Название: {{ product[1].name }}, Цена: {{ product[1].price }}</span
          >
          <select @change="changePayer($event, product[0])">
            <option value="" default>Кто оплачивал?</option>
            <option
              v-for="person in $store.state.persons"
              :key="person[0]"
              :value="person[0]"
            >
              {{ person[1].name }}
            </option>
          </select>
          <button class="button" @click="deleteProduct(product[0])">x</button>
        </div>
        <div v-for="person in $store.state.persons" :key="person[0]">
          <div class="flex">
            <span>{{ person[1].name }}</span>
            <input
              @change="togglePerson(product[0], person[0])"
              type="checkbox"
            />
          </div>
        </div>
      </div>
      <button class="button" @click="checkValue">Дальше</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      price: 0,
      error: "",
    };
  },
  methods: {
    addProduct() {
      if (!this.name) {
        this.error = "Введи название продукта ";
        return;
      }
      if (this.price <= 0) {
        this.error = "Введи настоящую цену продукта ";
        return;
      }
      this.error = "";
      const id = Date.now();
      this.$store.state.products.set(id, {
        id: id,
        name: this.name,
        price: this.price,
        persons: new Set(),
      });
      this.name = "";
      this.price = 0;
    },
    togglePerson(productId, personId) {
      const product = this.$store.state.products.get(productId);
      if (product.persons.has(personId)) {
        product.persons.delete(personId);
      } else {
        product.persons.add(personId);
      }
      this.$store.state.products.set(productId, product);
    },
    deleteProduct(id) {
      this.$store.state.products.delete(id);
    },
    changePayer(event, productId) {
      const product = this.$store.state.products.get(productId);
      product.payer = event.target.value;
      this.$store.state.products.set(productId, product);
    },
    checkValue() {
      this.$store.state.products.forEach((product) => {
        if (!product.payer) {
          this.error = "Выбери оплатившего за продукт " + product.name;
          return;
        }
        if (!product.persons.size) {
          this.error = "Выбери, кто ел " + product.name;
          return;
        }
        this.error = "";
        this.$router.push("results");
      });
    },
  },
};
</script>
<style></style>
