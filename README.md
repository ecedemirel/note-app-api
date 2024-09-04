# Guide

## SQL Server

### Setup SQL Server
```
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=<PASSWORD>' -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2022-latest
```

### Create Database
```
CREATE DATABASE Note;
```

### Create Table
```
CREATE TABLE Note (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Text NVARCHAR(255),
    Date DATETIME,
    BackgroundColor NVARCHAR(7)
);
```
