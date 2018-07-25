var employees, payslips;

function editEmployee(id){
    // technically i should  GET employees/:id here for demonstration purposes
    var formHtml = '<h2>' +
        (id ?
            'Employee: ' + employees[id].first_name + ' ' + employees[id].last_name :
            'New Employee'
        ) + '</h2>';
    formHtml += '<table>' +
        (id ? '<tr><td>ID</td><td>' + id + '</td></tr>' : '') +
        '<tr><td>First Name</td><td><input id="employee_first_name" value="' + (id ? employees[id].first_name : '') + '" />' + '</td></tr>' +
        '<tr><td>Last Name</td><td><input id="employee_last_name" value="' + (id ? employees[id].last_name : '') + '" />' + '</td></tr>' +
        '<tr><td>Annual Salary</td><td><input id="employee_annual_salary" value="' + (id ? employees[id].annual_salary : '') + '" />' + '</td></tr>' +
        '<tr><td>Pension Contribution</td><td><input id="employee_pension_contribution" value="' + (id ? employees[id].pension_contribution : '') + '" />' + '</td></tr>' +
        '<tr><td>Payment Start Date</td><td><input id="employee_payment_start_date" value="' + (id ? employees[id].payment_start_date : '') + '" />' + '</td></tr>' +
        '<tr><td><button onclick="saveEmployee(' + (id ? id : '') + ')">Save</button></td><td></td></tr></table>';
    $('#employee-details').html(formHtml);
    $('#payslip-details').empty();
}

function saveEmployee(id){
    var details = {
        first_name: $('#employee_first_name').val(),
        last_name: $('#employee_last_name').val(),
        annual_salary: $('#employee_annual_salary').val(),
        pension_contribution: $('#employee_pension_contribution').val(),
        payment_start_date: $('#employee_payment_start_date').val()
    };
    if (id) {
        details.id = id;
    }
    $.ajax({
        cache: false,
        url: (id ? 'employees/' + id : 'employees'),
        method: (id ? 'PUT' : 'POST'),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        traditional: false,
        data: JSON.stringify(details),
        success: function (data, textStatus, jqXHR) {
            loadEmployees();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.status + ' ' + textStatus + ' response: ' + jqXHR.responseText);
        }
    });    
}

function deleteEmployee(id){
    $.ajax({
        cache: false,
        url: 'employees/' + id,
        method: 'DELETE',
        success: function (data, textStatus, jqXHR) {
            loadEmployees();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.status + ' ' + textStatus + ' response: ' + jqXHR.responseText);
        }
    });    
}

function showPayslips(id){
    $('#employee-details').empty();
    $('#payslip-details').empty();
    $.ajax({
        cache: false,
        url: 'employees/' + id + '/payslips',
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            payslips = {};
            for (var i in data){
                payslips[data[i].id] = data[i];
            }
            var payslipsHtml = '<table>' +
                '<tr>' +
                    '<th>ID</th>' +
                    '<th>Name</th>' +
                    '<th>Pay Period</th>' +
                    '<th>Gross Income</th>' +
                    '<th>Income Tax</th>' +
                    '<th>Net Income</th>' +
                    '<th>Pension</th>' +
                    '<th></th>' +
                '</tr>';

            for (var i in payslips){
                var payslip = payslips[i];
                payslipsHtml +=
                    '<tr>' +
                        '<th>' + payslip.id + '</th>' +
                        '<th>' + payslip.name + '</th>' +
                        '<th>' + payslip.pay_period + '</th>' +
                        '<th>' + payslip.gross_income + '</th>' +
                        '<th>' + payslip.income_tax + '</th>' +
                        '<th>' + payslip.net_income + '</th>' +
                        '<th>' + payslip.pension + '</th>' +
                        '<th>' +
                            '<button onclick="deletePayslip(' + payslip.id + ')">Delete</button>' +
                        '</th>' +
                    '</tr>';
            }
            payslipsHtml += '</table>' +
                '<button onclick="createPayslip(' + id + ')">New Employee Payslip</button>';
            $('#payslip-details').html(payslipsHtml);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.status + ' ' + textStatus + ' response: ' + jqXHR.responseText);
        }
    });
}

function createPayslip(id){
    var formHtml = '<h2>New Employee Payslip</h2>';
    formHtml += '<table>' +
        '<tr><td>Name</td><td id="payslip_name">' + employees[id].first_name + ' ' + employees[id].last_name + '</td></tr>' +
        // generate automatically for current month
        '<tr><td>Pay Period</td><td><input id="payslip_pay_period" value="" /></td></tr>' +
        '<tr><td><button onclick="savePayslip(' + id + ')">Save</button></td><td></td></tr></table>';
    $('#payslip-details').html(formHtml);
}

function savePayslip(id){
    var details = {
        name: $('#payslip_name').text(),
        pay_period: $('#payslip_pay_period').val()
    };
    $.ajax({
        cache: false,
        url: 'employees/' + id + '/payslips',
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        traditional: false,
        data: JSON.stringify(details),
        success: function (data, textStatus, jqXHR) {
            showPayslips(id);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.status + ' ' + textStatus + ' response: ' + jqXHR.responseText);
        }
    });
}

function deletePayslip(id){
    var employee_id = payslips[id].employee_id;

    $.ajax({
        cache: false,
        url: 'employees/' + employee_id + '/payslips/' + id,
        method: 'DELETE',
        success: function (data, textStatus, jqXHR) {
            showPayslips(employee_id);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.status + ' ' + textStatus + ' response: ' + jqXHR.responseText);
        }
    });    
}

function loadEmployees(){
    $('#employee-details').empty();
    $('#payslip-details').empty();
    $.ajax({
        cache: false,
        url: 'employees',
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            employees = {};
            for (var i in data){
                employees[data[i].id] = data[i];
            }
            var employeesHtml = '<table>' +
                '<tr>' +
                    '<th>ID</th>' +
                    '<th>First Name</th>' +
                    '<th>Last Name</th>' +
                    '<th>Annual Salary</th>' +
                    '<th>Pension Contribution</th>' +
                    '<th>Payment Start Date</th>' +
                    '<th></th>' +
                '</tr>';

            for (var i in employees){
                var employee = employees[i];
                employeesHtml +=
                    '<tr>' +
                        '<th>' + employee.id + '</th>' +
                        '<th>' + employee.first_name + '</th>' +
                        '<th>' + employee.last_name + '</th>' +
                        '<th>' + employee.annual_salary + '</th>' +
                        '<th>' + employee.pension_contribution + '</th>' +
                        '<th>' + employee.payment_start_date + '</th>' +
                        '<th>' +
                            '<button onclick="showPayslips(' + employee.id + ')">Payslips</button>' +
                            '<button onclick="editEmployee(' + employee.id + ')">Edit</button>' +
                            '<button onclick="deleteEmployee(' + employee.id + ')">Delete</button>' +
                        '</th>' +
                    '</tr>';
            }
            employeesHtml += '</table>' +
                '<button onclick="editEmployee()">New Employee</button>';
            $('#my-employees').html(employeesHtml);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.status + ' ' + textStatus + ' response: ' + jqXHR.responseText);
        }
    });
}

$(function() {
    loadEmployees();
});
