<template>
  <div class="home">
    <div class="container center-align">
      <h5>Редактирование профиля компании:</h5>
      <div class="inputs-wrapper">
        <div class="input-field">
          <input id="bank" name="bank" type="text" v-model="bik" @keyup="fetchBanks" />
          <label for="bank">БИК</label>
        </div>
        <div class="input-field">
          <input id="bankName" type="text" v-model="bankName" />
          <label for="bankName">Наименование банка</label>
        </div>
        <div class="input-field">
          <input id="korr" type="text" v-model="korr" />
          <label for="korr">Корреспондентский счет</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventEmitter } from "@/main";
import axios from "axios";
import M from 'materialize-css'

export default {
  name: "Home",
  data: () => ({
    loading: true,
    bik : '',
    bank: [],
    korr: '',
    bankName: ''
  }),
  watch: {

  },
  methods: {
    fetchBanks() {
      let remote_url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/bank';
      let data = {
        'query' : `${this.bik}`
      };
      let token = '5d7f541af5b3cc8e369890f92a07574ecc68861a';
      let config = {
        headers: {'Authorization': 'Token ' + token}
      };
      axios.post(remote_url, data, config).then(response => {
        this.bank = response.data.suggestions[0];
        this.bankName = this.bank.value;
        this.korr = this.bank.data.correspondent_account;
      }).catch(error => {
        console.log(error);
      });
    },
    addBot() {
      eventEmitter.$emit("showCreateModal");
    },
    editBot(bot) {
      eventEmitter.$emit("showEditModal", bot);
    },
    async deleteBot(id) {
      await this.$store.dispatch("deleteBot", id);
      await this.updateData();
    },
    async updateData() {
      this.loading = true;
      this.bots = await this.$store.dispatch("fetchBots");
      this.loading = false;
    }
  },
  async mounted() {
    await this.updateData();
  },
  updated() {
    M.updateTextFields();
  }
};

</script>
