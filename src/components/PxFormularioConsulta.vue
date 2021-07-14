<template>
  <b-card bg-variant="light" header="Consulta - Resumen">
    <b-form @submit="onSubmit">
      <b-form-group id="input-group-1" label="Mes" label-for="input-1">
        <b-form-select
          id="input-1"
          v-model="form.mes"
          :state="validationMes"
          :options="options"
          required
        ></b-form-select>
        <b-form-invalid-feedback :state="validationMes">
          Ingresar el mes
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validationMes">
          Muy bien!
        </b-form-valid-feedback>
      </b-form-group>
      <b-form-group id="input-group-2" label="Año" label-for="input-2">
        <b-form-input
          id="input-2"
          placeholder="Eliga el año"
          v-model="form.anio"
          :state="validationAnio"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="validationAnio">
          Ingresar el año (2021 en adelante)
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validationAnio">
          Muy bien!
        </b-form-valid-feedback>
      </b-form-group>
      <b-form-group>
        <b-form-input
          readonly
          placeholder="Haz Click en consultar"
          v-show="!habilitarGuardar"
        ></b-form-input>
      </b-form-group>

      <b-button
        variant="success"
        class="mr-3"
        :disabled="habilitarGuardar"
        @click="onSubmit"
        >Consultar</b-button
      >
    </b-form>
    <slot></slot>
  </b-card>
</template>

<script>
export default {
  name: 'FomrularioConsulta',
  data() {
    return {
      form: {
        mes: new Date().getMonth(),
        anio: new Date().getFullYear(),
      },
      options: [
        { value: null, text: 'Eliga un mes' },
        { value: 0, text: 'Enero' },
        { value: 1, text: 'Febrero' },
        { value: 2, text: 'Marzo' },
        { value: 3, text: 'Abril' },
        { value: 4, text: 'Mayo' },
        { value: 5, text: 'Junio' },
        { value: 6, text: 'Julio' },
        { value: 7, text: 'Agosto' },
        { value: 8, text: 'Septiembre' },
        { value: 9, text: 'Octubre' },
        { value: 10, text: 'Noviembre' },
        { value: 11, text: 'Diciembre' },
      ],
    }
  },
  methods: {
    onSubmit() {
      console.log('Mes: ', this.form.mes, 'Año: ', this.form.anio)
    },
  },
  computed: {
    validationMes() {
      return this.form.mes != null
    },
    validationAnio() {
      return /^[0-9]+$/.test(this.form.anio) && this.form.anio >= 2021
    },
    habilitarGuardar() {
      return (
        !(this.form.mes != null) &&
        /^[0-9]+$/.test(this.form.anio) &&
        this.form.anio >= 2021
      )
    },
  },
}
</script>

<style></style>
