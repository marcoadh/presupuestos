(function () {
  this.App || (this.App = {})

  App.Stimulus.register('form', class extends Stimulus.Controller {
    onSearch(event) {
      if (event.target.value.trim() == '') {
        if (event.target.form.dataset.remote) {
          Rails.fire(event.target.form, 'submit')
        } else {
          event.target.form.submit()
        }
      }
    }
  })

}).call(this);
