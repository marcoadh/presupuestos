(function () {
  this.App || (this.App = {})

  App.Stimulus.register('form', class extends Stimulus.Controller {
    replace(event) {
      event.preventDefault()
      event.stopPropagation()

      const [, , xhr] = event.detail
      this.element.outerHTML = xhr.response
    }
  })

}).call(this);
