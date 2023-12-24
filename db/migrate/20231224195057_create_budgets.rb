class CreateBudgets < ActiveRecord::Migration[5.2]
  def change
    create_table :budgets do |t|
      t.string :description
      t.float  :value
      t.date   :main_date

      t.timestamps
    end
  end
end
