(function () {
  this.App || (this.App = {})

  App.Stimulus.register('budgets', class extends Stimulus.Controller {
    static targets = ['listContainer', 'formContainer', 'incomeList', 'expenseList', 'templateIncome', 'templateExpense', 'budgetValue']

    get ingresos() {
      return this.incomeListTarget.querySelectorAll('.form-income:not(.d-none)')
    }

    get egresos() {
      return this.expenseListTarget.querySelectorAll('.form-expense:not(.d-none)')
    }

    get totalIngresos() {
      let total = 0
      this.ingresos.forEach($ingreso => total += parseFloat($ingreso.querySelector('.income_value').value))
      return total
    }

    get totalEgresos() {
      let total = 0
      this.egresos.forEach($egreso => total += parseFloat($egreso.querySelector('.expense_value').value))
      return total
    }

    get porcentaje() {
      let porcentaje = 0;
      if (this.totalEgresos > 0) {
        porcentaje = this.totalEgresos / this.totalIngresos;
      }
      return porcentaje;
    }

    renderForm(event) {
      const [, , xhr] = event.detail
      this.formContainerTarget.innerHTML = xhr.response
    }

    renderList(event) {
      const [, , xhr] = event.detail
      this.listContainerTarget.innerHTML = xhr.response
    }

    cancelForm(event) {
      event.preventDefault()
      event.target.closest('.card').remove()
    }

    addItem(event) {
      event.preventDefault()

      let data = event.currentTarget.dataset
      let content = this[data.templateTarget].innerHTML.replace(/TEMPLATE_RECORD/g, new Date().valueOf())
      this[data.listTarget].insertAdjacentHTML('beforeend', content)
    }

    removeItem(event) {
      event.preventDefault()

      let dataModel = JSON.parse(event.currentTarget.dataset.model)

      console.log(dataModel);

      if (this[dataModel.name].length == 1) {
        alert(`Al menos debe haber un registo en ${dataModel.name}.`)
        return
      }

      event.target.closest(dataModel.class).classList.add('d-none')
      event.target.closest(dataModel.class).querySelector(dataModel.class_attributes.description).required = false
      event.target.closest(dataModel.class).querySelector(dataModel.class_attributes.value).required = false
      event.target.closest('div').querySelector('input[name*="_destroy"]').value = 1
    }

    initialConfigForm() {
      this.loadAvailableBudget()
    }

    loadAvailableBudget() {
      let presupuestoDisponible = this.totalIngresos - this.totalEgresos

      const $presupuesto = document.getElementById('presupuesto'),
        $ingresos = document.getElementById('ingresos'),
        $egresos = document.getElementById('egresos'),
        $porcentaje = document.getElementById('porcentaje');

      this.budgetValueTarget.value = presupuestoDisponible
      $presupuesto.innerHTML = this.formatoMoneda(presupuestoDisponible);
      $ingresos.innerHTML = this.formatoMoneda(this.totalIngresos);
      $egresos.innerHTML = this.formatoMoneda(this.totalEgresos);
      $porcentaje.innerHTML = this.formatoPorcentaje(this.porcentaje);
    }

    formatoMoneda(x) {
      return x.toLocaleString('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 });
    }

    formatoPorcentaje(x) {
      return x.toLocaleString('es-PE', { style: 'percent', minimumFractionDigits: 2 });
    }
  })

}).call(this);
