using Employees.Core.Entities;
using Employees.Core.Repositories;
using Employees.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<Employee> AddAsync(Employee employee)
        {
            return await _employeeRepository.AddAsync(employee);
        }

        public async Task DeleteAsync(int id)
        {
            await _employeeRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _employeeRepository.GetAllAsync();
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _employeeRepository.GetByIdAsync(id);
        }

        public async Task<Employee> UpdateAsync(int id, Employee employee)
        {
            return await _employeeRepository.UpdateAsync(id, employee);
        }

        public string CheckValidity(Employee employee)
        {
            var roleNameIds = new HashSet<int>();
            foreach (var role in employee.Roles)
            {
                if (!roleNameIds.Add(role.RoleNameId))
                    return "Duplicate role names found in roles list.";

                if (role.StartDate < employee.StartDate)
                    return "Start date of the roles must be later than or equal to the start date work.";
            }
            return "Ok";
        }
    }
}
