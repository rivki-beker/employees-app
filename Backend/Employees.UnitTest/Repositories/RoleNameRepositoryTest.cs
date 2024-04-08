using Employees.Core.Entities;
using Employees.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.UnitTest.Repositories
{
    public class RoleNameRepositoryTest : IRoleNameRepository
    {
        private readonly DataContextTest _context;

        public RoleNameRepositoryTest(DataContextTest context)
        {
            _context = context;
        }

        public async Task<RoleName> AddAsync(RoleName roleName)
        {
            _context.RoleNames.Add(roleName);
            return roleName;
        }

        public async Task DeleteAsync(int id)
        {
            RoleName roleName = GetByIdAsync(id).Result;
            _context.RoleNames.Remove(roleName);
        }

        public async Task<IEnumerable<RoleName>> GetAllAsync()
        {
            return _context.RoleNames;
        }

        public async Task<RoleName> GetByIdAsync(int id)
        {
            return _context.RoleNames.Find(e => e.Id == id);
        }

        public async Task<RoleName> UpdateAsync(int id, RoleName roleName)
        {
            RoleName currentRoleName = GetByIdAsync(id).Result;
            currentRoleName.Name = roleName.Name;

            return currentRoleName;
        }
    }
}
