using Employees.Core.Entities;
using Employees.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.UnitTest.Repositories
{
    public class EmployeeRepositoryTest:IEmployeeRepository
    {
        private readonly DataContextTest _context;

        public EmployeeRepositoryTest(DataContextTest context)
        {
            _context = context;
        }

        public async Task<Employee> AddAsync(Employee employee)
        {
            _context.Employees.Add(employee);
            return employee;
        }

        public async Task DeleteAsync(int id)
        {
            Employee employee = GetByIdAsync(id).Result;
            _context.Employees.Remove(employee);
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return _context.Employees;
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            return _context.Employees.Find(e => e.Id == id);
        }

        public async Task<Employee> UpdateAsync(int id, Employee employee)
        {
            Employee currentEmployee = GetByIdAsync(id).Result;
            currentEmployee.FirstName = employee.FirstName;
            currentEmployee.LastName = employee.LastName;
            currentEmployee.StartDate = employee.StartDate;
            currentEmployee.BirthDate = employee.BirthDate;
            currentEmployee.IsMale = employee.IsMale;
            currentEmployee.Roles = employee.Roles;
            currentEmployee.IsActive = employee.IsActive;

            return currentEmployee;
        }
    }
}
