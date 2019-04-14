# Changelog

Los cambios más relevantes en este proyecto se detallan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2018-09-30

### Added

- Tests en MongoDB y SQL Server para casos de updates de registros inexistentes
- Validación de parámetros inválidos (np numéricos) en math-functions.js
- Tests de validación de parámetros inválidos en math-functions.tests.js

### Changed

- Rename de archivos de configuración para Postman
- Incorporación de "option strict"s faltantes
- En scripts se cambió el uso global de nodemon por su versión desde devDependencies en ejemplo 04 y ejemplo principal
- Reemplazo de algunos var por const
- Actualización de presentación Powerpoint
- En math-functions.tests.js se utilizan testcases para permitir el test de baterías de datos y simplificar el testing, usando it.each( y tablas de valores
- Actualización de readme

### Removed

- Se elimina package.json y package-lock.json del ejemplo 03
- Se eliminan un par de funciones que no estaban en uso, parte de un sample anterior en el que éste se basó.

## [1.0.0] - 2018-09-25

- Repositorio creado y contenido inicial es publicado
