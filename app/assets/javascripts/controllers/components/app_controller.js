(function () {
  this.App || (this.App = {})

  App.Stimulus.register('app', class extends Stimulus.Controller {
    static targets = ['modal']

    get modal() {
      return this.application.getControllerForElementAndIdentifier(this.modalTarget, 'modal')
    }

    launchModal(event) {
      event.preventDefault()
      this.modal.render(this.getData(event))
      this.modal.open()
    }

    getData(event) {
      let source = event.currentTarget.dataset.source
      if (!event.currentTarget.dataset.source) {
        source = event.currentTarget.getAttribute('href')
      }
      return { source: source }
    }
  })

}).call(this);
