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
    public class RoleNameRepository : IRoleNameRepository
    {
        private readonly DataContext _context;
        public RoleNameRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<RoleName> AddAsync(RoleName roleName)
        {
            _context.RoleNames.Add(roleName);
            await _context.SaveChangesAsync();
            return roleName;
        }

        public async Task DeleteAsync(int id)
        {
            RoleName roleName = GetByIdAsync(id).Result;
            _context.RoleNames.Remove(roleName);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<RoleName>> GetAllAsync()
        {
            return await _context.RoleNames.ToListAsync();
        }

        public async Task<RoleName> GetByIdAsync(int id)
        {
            return await _context.RoleNames.FirstAsync(r => r.Id == id);
        }

        public async Task<RoleName> UpdateAsync(int id, RoleName roleName)
        {
            RoleName currentRoleName = GetByIdAsync(id).Result;
            currentRoleName.Name = roleName.Name;

            await _context.SaveChangesAsync();
            return currentRoleName;
        }
    }
}
