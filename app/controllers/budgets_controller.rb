class BudgetsController < ApplicationController
  before_action :set_budget, only: %i[ edit update destroy ]

  def index
    @search = params[:search].to_s.strip
    @budgets = current_user.budgets
    @budgets = @budgets.where('description LIKE :s ', s: "%#{@search}%") unless @search.blank?

    respond_to do |format|
      if request.xhr?
        format.html { render partial: 'list', locals: { budgets: @budgets, search: @search } }
      else
        format.html
      end
    end
  end

  def new
    @budget = Budget.new
    @budget.incomes.build
    @budget.expenses.build

    respond_to do |format|
      format.html { render partial: 'form', locals: { budget: @budget } }
    end
  end

  def create
    @budget = Budget.new(budget_params.merge(user_id: current_user.id))
    respond_to do |format|
      if @budget.save
        format.html { redirect_to budgets_path, notice: 'El presupuesto fue creado exitosamente.' }
      else
        ap "xxxx"
        ap @budget.errors
        ap "xxxx"
        format.json { render json: @budget.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
    respond_to do |format|
      format.html { render partial: 'form', locals: { budget: @budget } }
    end
  end

  def update
    respond_to do |format|
      if @budget.update(budget_params)
        format.html { redirect_to budgets_path, notice: 'El presupuesto fue actualizado exitosamente.' }
      else
        format.json { render json: @budget.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @budget.destroy

    respond_to do |format|
      format.html { redirect_to budgets_url, notice: 'El presupuesto fue eliminado exitosamente.' }
      format.json { head :no_content }
    end
  end

  private

    def set_budget
      @budget = Budget.find(params[:id])
    end

    def budget_params
      params.require(:budget).permit(
        :description,
        :value,
        incomes_attributes: [:id, :description, :value, :_destroy],
        expenses_attributes: [:id, :description, :value, :_destroy]
      )
    end
end