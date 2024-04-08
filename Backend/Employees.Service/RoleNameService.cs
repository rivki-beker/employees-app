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
    public class RoleNameService : IRoleNameService
    {
        private readonly IRoleNameRepository _roleNameRepository;

        public RoleNameService(IRoleNameRepository roleNameRepository)
        {
            _roleNameRepository = roleNameRepository;
        }

        public async Task<RoleName> AddAsync(RoleName roleName)
        {
            return await _roleNameRepository.AddAsync(roleName);
        }

        public async Task DeleteAsync(int id)
        {
            await _roleNameRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<RoleName>> GetAllAsync()
        {
            return await _roleNameRepository.GetAllAsync();
        }

        public async Task<RoleName> GetByIdAsync(int id)
        {
            return await _roleNameRepository.GetByIdAsync(id);
        }

        public async Task<RoleName> UpdateAsync(int id, RoleName roleName)
        {
            return await _roleNameRepository.UpdateAsync(id, roleName);
        }
    }
}
