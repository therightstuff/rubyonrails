Rails.application.routes.draw do
  get 'employees/index'

  resources :employees do
    resources :payslips
  end
  
  root 'employees#index'
end
