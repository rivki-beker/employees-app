using Employees.Core.Entities;
using Employees.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Data.Repositories
{
    public class EmployeeRepository:IEmployeeRepository
    {
        private readonly DataContext _context;
        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Employee> AddAsync(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task DeleteAsync(int id)
        {
            Employee employee = GetByIdAsync(id).Result;
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _context.Employees.Include(e => e.Roles).ToListAsync();
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _context.Employees.Include(e => e.Roles).FirstAsync(e => e.Id == id);
        }

        public async Task<Employee> UpdateAsync(int id, Employee employee)
        {
            Employee currentEmployee = GetByIdAsync(id).Result;
            currentEmployee.FirstName = employee.FirstName;
            currentEmployee.LastName = employee.LastName;
            currentEmployee.Identity = employee.Identity;
            currentEmployee.StartDate = employee.StartDate;
            currentEmployee.BirthDate = employee.BirthDate;
            currentEmployee.IsMale = employee.IsMale;
            currentEmployee.Roles = employee.Roles;
            currentEmployee.IsActive = employee.IsActive;

            await _context.SaveChangesAsync();
            return currentEmployee;
        }
    }
}
