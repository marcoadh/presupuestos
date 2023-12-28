class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :budgets

  validates :full_name, presence: true

  def custom_name(amount = 1)
    full_name.split.take(amount).join(" ")
  end
end
