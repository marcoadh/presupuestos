class CreateExpenses < ActiveRecord::Migration[5.2]
  def change
    create_table :expenses do |t|
      t.string :description
      t.float  :value, default: 0
      t.belongs_to :budget, foreign_key: true

      t.timestamps
    end
  end
end
