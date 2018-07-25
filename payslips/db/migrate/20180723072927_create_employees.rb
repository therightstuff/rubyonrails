class CreateEmployees < ActiveRecord::Migration[5.2]
  def change
    create_table :employees do |t|
      t.string :first_name
      t.string :last_name
      t.integer :annual_salary
      t.integer :pension_contribution
      t.date :payment_start_date

      t.timestamps
    end
  end
end
