using Employees.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.UnitTest
{
    public class DataContextTest
    {
        public List<Employee> Employees { get; set; }
        public List<Role> Roles { get; set; }
        public List<RoleName> RoleNames { get; set; }
    }
}
