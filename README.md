# Template API con NodeJS

## Prerequisitos

### Git

Se deberá tener el cliente de Git instalado en su equipo y actualizado a su última versión pudiendo instalarlo desde [este enlace](https://git-scm.com/downloads).

Se recuerda a los usuarios de plataforma Windows que durante la instalación deben aceptar las opciones default, a fin de instalar las extensiones para itegración con Windows Explorer al igual que el soporte para LFS.

Una vez instalado se recomienda verificar que la versión en nuestro sistema corresponde a la publicada en la página de Git desde donde realizamos la instalación mediante el siguiente comando:

```bash
git --version
```

En caso de ya disponer de Git instalado y de requerirse actualización, se recomienda seguir los pasos de [esta guía publicada por Atlassian](https://confluence.atlassian.com/crucible/installing-and-upgrading-git-679608571.html)

### NodeJS

Es requisito para poder ejecutar el ejemplo que acompaña a este repositorio el instalar la última versión de NodeJS desde [este enlace](https://nodejs.org/en/download/)

En caso de contar con NodeJS instalado, se recomienda verificar la versión mediante el siguiente comando:

```bash
node --version
```

y en caso de que no se corresponda con la versión disponible en la página oficial, actualizarlo con el instalador correspondiente a cada plataforma.

### npm

El Node Package Manager se distribuye con NodeJS y el propio instalador se encargará de su actualización, para el caso particular de Windows existe un package que se encarga de todas las verificaciones llamado npm-windows-upgrade el cual se instala y ejecuta con el siguiente comando, encargándose también de la actualización de NodeJS en caso se ser necesario:

```bash
npm install -g npm-windows-upgrade
npm-windows-upgrade
```

### Docker

No es necesario el contar con Docker instalado para poder ejecutar el ejemplo que acompaña a este repositorio, debiendo contar con instancias completas de SQL Server y MongoDB en su máquina local.

#### SQL Server

En caso de contar con Docker, puede ejecutar una instancia de SQL Server for Linux mediante el siguiente comando:

```bash
docker run --name SQLServer1 -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=AdminPassword$" -e "MSSQL_PID=Developer" -p 14331:1433 -d --restart=always microsoft/mssql-server-linux
```

Esta instancia de Microsoft SQL Server estará escuchando el puerto 14331 a fin de no colisionar con el eventual puerto default de una instancia preexistente y utilizando las credenciales especificadas en el comando anterior.

#### MongoDB

Puede ejecutar una instancia local de MongoDB mediante el siguiente comando:

```bash
docker run --name MongoDB -e MONGO_INITDB_ROOT_USERNAME=sa -e MONGO_INITDB_ROOT_PASSWORD=AdminPassword$ --restart=always -d -p 27018:27017 mongo mongod --auth
```

pudiendo luego acceder al CLI de MongoDB con los siguientes comandos:

```bash
docker exec -i -t MongoDB bash
mongo --host localhost -u sa -p AdminPassword$ --authenticationDatabase admin
```

Esta instancia de MongoDB estará escuchando el puerto 27018 a fin de no colisionar con el eventual puerto default de una instancia preexistente y utilizando las credenciales especificadas en el comando anterior.

### SQLServer y MongoDB

En caso de no contar con Docker para crear y ejecutar los contenedores arriba descriptos, se requiere acceso a dos instancias respectivas, cuya configuración deberá ser reflejada en el archivo de configuración [.env](.env)

Se recuerda que la existencia de este archivo .env es a fines puramente didácticos y en ningún caso de aplicación real debe versionarse dicho archivo, configurándose los secretos mediante métodos seguros.

### Scripts para las bases de datos

En la carpeta [../scripts](scripts) de este repositorio se encuentran los archivos necesarios para crear las tablas/colecciones necesarias en ambas bases de datos, los cuales deben ser ejecutados mediante su programa preferido o la linea de comando de ambos productos.

### Visual Studio Code

La instalación para plataformas Windows, Mac y Linux se realiza desde [este enlace](https://code.visualstudio.com/download) y no es necesario instalar ninguna extensión adicional para el trabajo básico con el mismo.

### Postman

Se recomienda la instalación y utilización de Postman para la ejecución de las pruebas ya que se provee un archivo json ([Postman.json](Postman.json)) a fin de poder probar todos los métodos de este ejemplo, pero lo mismos pueden ser ejecutados con su programa preferido o utilizando curl desde la linea de comando.

Postman puede ser descargado desde [este enlace](https://www.getpostman.com/apps).

## Ejecución

Luego de haber clonado en su maquina local y desde un bash, command promp o terminal y estando en la carpeta raíz del repositorio, ejecute el siguiente comando a fin de instalar todos los paquetes necesarios:

```bash
npm install
```

Para ejecutar el ejemplo se han incluido varios scripts de ejecución en el archivo [package.json](package.json)

```bash
npm run (prod|dev|debug|test|test-requests|coverage|eslint)
```

## Versionado

Utilizamos [SemVer](https://semver.org/lang/es/) para el versionado de nuestros proyectos. Para conocer las versiones disponibles, consulte [los tags en este repositorio](#) o el archivo [CHANGELOG.md](CHANGELOG.md).

## Autores

-   **Sandro Franchi** - _Desarrollo de sample y presentación_ - [@sfranchi](https://github.com/sfranchi)

Puede ver también la lista de [contribuidores](#) que han participado en este repositorio.

## Mantenedores

-   **Sandro Franchi** - [@sfranchi](https://github.com/sfranchi)

## Licencia

Este proyecto está sujeto a la licencia MIT - consulte el archivo [LICENSE.md](LICENSE.md) para más detalles.

## Reconocimientos

-   En general: A todos quienes con su feedback y aportes (issues y pull requests) colaboran para que recursos como éste sean de mayor utilidad.
