class Employee < ApplicationRecord
    has_many :payslips, dependent: :destroy

    validates :first_name, presence: true, length: { minimum: 1 }
    validates :pension_contribution, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 50 }
end
