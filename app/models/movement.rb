class Movement < ApplicationRecord
  belongs_to :budget

  validates :description, presence: true
  validates :value, presence: true

  enum kind: { income: 1, expenses: 2 }
end