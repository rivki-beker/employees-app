# See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Employees.API/Employees.API.csproj", "Employees.API/"]
COPY ["Employees.Core/Employees.Core.csproj", "Employees.Core/"]
COPY ["Employees.Data/Employees.Data.csproj", "Employees.Data/"]
COPY ["Employees.Service/Employees.Service.csproj", "Employees.Service/"]
RUN dotnet restore "Employees.API/Employees.API.csproj"
COPY . .
WORKDIR "/src/Employees.API"
RUN dotnet build "Employees.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Employees.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Set environment variable for production
ENV MyDatabaseConnection "Server=bvxrqklv4vzmj0h7sn6n-mysql.services.clever-cloud.com;Port=3306;Database=bvxrqklv4vzmj0h7sn6n;Uid=uvybcmvlyprmzaa1;Pwd=n2wKwkejUWl61fQ6z6km;"

ENTRYPOINT ["dotnet", "Employees.API.dll"]