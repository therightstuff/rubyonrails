# README

A very simple employee payslip manager. My first experiment with Ruby on Rails, the Ruby backend was a pleasure
to work with but using erb for a single page frontend proved to have a steep learning curve that I simply
didn't have time for and so, after much wasted effort, I reverted to jQuery for a quick and untidy finish. And
by untidy, I mean there are a lot of things lacking that I'm not proud of.

I do believe that erb is a fantastic templating engine, if I'd had more time to dedicate to this sample I would
have loved to put together a readable tutorial based on what I've learned (as opposed to the mostly useless ones
I was able to find)

* Ruby version 2.3.1
    * This did cause an issue with the mysql2 package, eventually resolved with gem 'mysql2', '~> 0.4.4'

* Database creation
    * Database and users created directly in MySql

* Database initialization
    * Migrations run manually

* How to run the test suite
    * Tests not written due to a lack of time but seems really simple to implement
	* Code tested manually

# Usage

Employees will be loaded on page load.

Click "New Employee" to create a new employee record, record will not save if data invalid (proper error handling not implemented).

On successful creation the employees list will be reloaded.

Click "Payslips" to display a list of the employee's payslips.

To create a new payslip, click "New Employee Payslip" and fill in the Pay Period. The Pay Period must be unique for this user or
the payslip will not be created.
