class CreatePayslips < ActiveRecord::Migration[5.2]
  def change
    create_table :payslips do |t|
      t.references :employee, foreign_key: true
      t.string :name
      t.string :pay_period
      t.integer :gross_income
      t.integer :income_tax
      t.integer :net_income
      t.integer :pension

      t.timestamps
    end
  end
end
