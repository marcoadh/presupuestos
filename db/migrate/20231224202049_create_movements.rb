class CreateMovements < ActiveRecord::Migration[5.2]
  def change
    create_table :movements do |t|
      t.string :description
      t.float  :value
      t.integer :kind
      t.belongs_to :budget, foreign_key: true

      t.timestamps
    end
  end
end
