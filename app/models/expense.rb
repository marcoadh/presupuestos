class Expense < ApplicationRecord
  belongs_to :budget

  validates :description, presence: true
  validates :value, presence: true
end
