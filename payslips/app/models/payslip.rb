class Payslip < ApplicationRecord
  belongs_to :employee

  validates :pay_period, presence: true, uniqueness: {
    scope: :employee,
    message: "one pay period per employee"
  }
end
