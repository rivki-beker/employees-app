using AutoMapper;
using Employees.API.Models;
using Employees.Core.Entities;

namespace Employees.API.Mapping
{
    public class PostMappingProfile : Profile
    {
        public PostMappingProfile()
        {
            CreateMap<EmployeePostModel, Employee>();
            CreateMap<RolePostModel, Role>();
            CreateMap<RoleNamePostModel, RoleName>();
        }
    }
}
