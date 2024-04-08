using Employees.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Core.Services
{
    public interface IRoleNameService
    {
        Task<IEnumerable<RoleName>> GetAllAsync();
        Task<RoleName> GetByIdAsync(int id);
        Task<RoleName> AddAsync(RoleName roleName);
        Task<RoleName> UpdateAsync(int id, RoleName roleName);
        Task DeleteAsync(int id);
    }
}
