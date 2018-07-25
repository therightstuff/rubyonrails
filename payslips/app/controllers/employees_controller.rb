class EmployeesController < ApplicationController

    def index
        @employees = Employee.all
        respond_to do |format|
            format.html  # index.html.erb
            format.json  { render :json => @employees }
        end
    end
    
    def show
        @employee = Employee.find(params[:id])
        render :json => @employee
    end
    
    def new
        @employee = Employee.new
    end

# edit

    def create
        @employee = Employee.new(employee_params)
 
        if @employee.save
            render :json => @employee
        else
            render 'edit'
        end
    end

    def update
        @employee = Employee.find(params[:id])
 
        if @employee.update(employee_params)
            render :json => @employee
        else
            render 'edit'
        end
    end

    def destroy
        @employee = Employee.find(params[:id])
        @employee.destroy       
    end

    private
        def employee_params
            params.require(:employee).permit(:first_name, :last_name, :annual_salary, :pension_contribution, :payment_start_date)
        end
end
