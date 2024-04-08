using Employees.Core.Entities;
using Employees.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.UnitTest.Repositories
{
    public class RoleRepositoryTest : IRoleRepository
    {
        private readonly DataContextTest _context;

        public RoleRepositoryTest(DataContextTest context)
        {
            _context = context;
        }

        public async Task<Role> AddAsync(Role role)
        {
            _context.Roles.Add(role);
            return role;
        }

        public async Task DeleteAsync(int id)
        {
            Role role = GetByIdAsync(id).Result;
            _context.Roles.Remove(role);
        }

        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return _context.Roles;
        }

        public async Task<Role> GetByIdAsync(int id)
        {
            return _context.Roles.Find(e => e.Id == id);
        }

        public async Task<Role> UpdateAsync(int id, Role role)
        {
            Role currentRole = GetByIdAsync(id).Result;
            currentRole.RoleName = role.RoleName;
            currentRole.IsManager = role.IsManager;
            currentRole.StartDate = role.StartDate;

            return currentRole;
        }
    }
}
