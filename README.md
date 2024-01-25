# ITSOFT-back-front
**More detailed information you can find in backend/readme.md.**
* Run back-end with front-end using docker-compose:
```
docker-compose up --build
```
### Set environment variables:
**list of environment variables which should be set:**<br>
```
DB_NAME
DB_USER
DB_PASSWORD
DB_HOST
DB_PORT
DJANGO_SECRET_KEY
DEBUG
```
**Windows:**
```
//CMD:
set SOME_VARIABLE=some_value

//Powershell:
$Env:Foo = 'An example'
```
**Linux:**
```
export SOME_VARIABLE=some_value
```
