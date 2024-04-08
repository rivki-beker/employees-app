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
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _context;
        public RoleRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Role> AddAsync(Role role)
        {
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();
            return role;
        }

        public async Task DeleteAsync(int id)
        {
            Role role = GetByIdAsync(id).Result;
            _context.Roles.Remove(role);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await _context.Roles.Include(r => r.RoleName).ToListAsync();
        }

        public async Task<Role> GetByIdAsync(int id)
        {
            return await _context.Roles.Include(r => r.RoleName).FirstAsync(r => r.Id == id);
        }

        public async Task<Role> UpdateAsync(int id, Role role)
        {
            Role currentRole= GetByIdAsync(id).Result;
            currentRole.RoleNameId = role.RoleNameId;
            currentRole.RoleName = role.RoleName;
            currentRole.IsManager = role.IsManager;
            currentRole.StartDate = role.StartDate;
            currentRole.EmployeeId = role.EmployeeId;
            currentRole.Employee = role.Employee;

            await _context.SaveChangesAsync();
            return currentRole;
        }
    }
}
