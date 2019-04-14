-- Create a new database called 'node_sample'
-- Connect to the 'master' database to run this snippet
USE master
GO

-- Create the new database if needed
IF DB_ID('node_sample') IS NULL
  CREATE DATABASE node_sample
GO

USE node_sample
GO

-- Create the user to access the node_sample database
DROP USER IF EXISTS [user]
DROP LOGIN [user]
GO

CREATE LOGIN [user] WITH PASSWORD = 'UserPassword$'
CREATE USER [user] FOR LOGIN [user]
EXEC sp_addrolemember N'db_owner', N'user'
GO

-- Create the cities table
IF OBJECT_ID('cities', 'U') IS NOT NULL
  DROP table cities;
CREATE TABLE cities
(
    Id INT IDENTITY(1,1),
    ZipCode [NVARCHAR](10) NOT NULL,
    CityName [NVARCHAR](50) NOT NULL,
    PRIMARY KEY (Id)
)
GO

-- Create the unique index for zipcodes
IF OBJECT_ID('idx_zipCode', 'U') IS NOT NULL
  DROP INDEX cities.idx_zipCode
CREATE UNIQUE INDEX idx_zipCode ON cities (ZipCode)
GO
