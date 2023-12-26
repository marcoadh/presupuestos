class CreateBudgets < ActiveRecord::Migration[5.2]
  def change
    create_table :budgets do |t|
      t.string :description
      t.float  :value, default: 0
      t.date   :main_date
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
