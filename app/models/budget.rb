class Budget < ApplicationRecord
  has_many :movements

  validates :description, presence: true
  validates :value, presence: true
end