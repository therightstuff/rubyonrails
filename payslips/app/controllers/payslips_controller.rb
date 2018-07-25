class PayslipsController < ApplicationController

    def index
        @employee = Employee.find(params[:employee_id])
        @payslips = @employee.payslips

        render :json => @payslips
    end

    def create
        @article = Article.find(params[:article_id])
        @comment = @article.comments.create(comment_params)
        redirect_to article_path(@article)
      end

    def create
        @employee = Employee.find(params[:employee_id])

        @payslip = @employee.payslips.create(payslip_params)
        # round down gross income
        @payslip.gross_income = (@employee.annual_salary / 12).floor

        if (@employee.annual_salary <= 18200)
            @payslip.income_tax = 0
        else
            if (@employee.annual_salary <= 37000)
                @payslip.income_tax = ((@employee.annual_salary - 18200) * 0.19).ceil
            else
                if (@employee.annual_salary <= 80000)
                    @payslip.income_tax = 3572 + ((@employee.annual_salary - 37000) * 0.325).ceil
                else
                    if (@employee.annual_salary <= 180000)
                        @payslip.income_tax = 17547 + ((@employee.annual_salary - 80000) * 0.37).ceil
                    else
                        @payslip.income_tax = 54547 + ((@employee.annual_salary - 180000) * 0.45).ceil
                    end
                end
            end
        end
        @payslip.income_tax = (@payslip.income_tax.to_f / 12).ceil;
        @payslip.net_income = @payslip.gross_income - @payslip.income_tax
        @payslip.pension = (@payslip.gross_income * (@employee.pension_contribution.to_f / 100)).floor

        if @payslip.save
            render :json => @payslip
        else
            render 'edit'
        end
    end

    def destroy
        @employee = Employee.find(params[:employee_id])
        @payslip = @employee.payslips.find(params[:id])
        @payslip.destroy
    end

    private
        def payslip_params
            params.require(:payslip).permit(:name, :pay_period)
        end
end
