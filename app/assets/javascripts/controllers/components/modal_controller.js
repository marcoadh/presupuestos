(function () {
  this.App || (this.App = {})

  App.Stimulus.register('modal', class extends Stimulus.Controller {
    static targets = ['content']

    get modal() {
      return $(this.element)
    }

    render(data) {
      $.ajax({
        type: 'GET',
        url: data.source,
      }).done((html) => {
        this.contentTarget.innerHTML = html
      })
    }

    open() {
      this.modal.modal('show')
    }

    close() {
      this.contentTarget.innerHTML = ''
      this.modal.modal('hide')
    }
  })

}).call(this);
