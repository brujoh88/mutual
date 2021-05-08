<template>
  <div>
    <!-- Using value -->
    <b-button v-b-modal="'my-modal'" variant="success"
      >Agreguar Afiliado +</b-button
    >

    <!-- The modal -->
    <b-modal id="my-modal" centered title="Nuevo Afiliado" v-model="show"
      ><div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="showForm">
          <b-form-group id="input-group-0" label="Legajo:" label-for="input-0">
            <b-form-input
              id="input-0"
              v-model="form.legajo"
              placeholder="Ingrese el legajo aqui"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.nombre"
              placeholder="Ingrese el nombre aqui"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Apellido:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.apellido"
              placeholder="Ingrese el apellido aqui"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="DNI:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.dni"
              placeholder="Ingrese el DNI aqui"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Saldo Asignado:"
            label-for="input-4"
          >
            <b-form-input
              id="input-4"
              v-model="form.saldoAsignado"
              placeholder="Ingrese el salgo a asignar"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="success" class="mr-3"
            >Guardar</b-button
          >
          <b-button type="reset" variant="warning">Resetear</b-button>
        </b-form>
      </div>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="danger"
            size="sm"
            class="float-right"
            @click="show = false"
          >
            Cerrar
          </b-button>
        </div>
      </template></b-modal
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        legajo: '',
        nombre: '',
        apellido: '',
        dni: '',
        saldoAsignado: '',
      },
      showForm: true,
      show: false,
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      fetch('http://localhost:3000/afiliado', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          legajo: this.form.legajo,
          nombre: this.form.nombre,
          apellido: this.form.apellido,
          dni: this.form.dni,
          saldoAsignado: this.form.saldoAsignado,
        }),
      })
        .then((response) => response.json())
        .then((element) => {
          console.log(element)
        })
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.legajo = ''
      this.form.nombre = ''
      this.form.apellido = ''
      this.form.dni = ''
      this.form.saldoAsignado = ''
      // Trick to reset/clear native browser form validation state
      this.showForm = false
      this.$nextTick(() => {
        this.showForm = true
      })
    },
  },
}
</script>

<style></style>
