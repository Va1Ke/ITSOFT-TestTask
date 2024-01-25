# Limit Order Book
ITSOFT api part of test task "Limit Order Book".
##Api
* Install requirements:
```
pip install -r requirements.txt
```
* Update requirements:
```
pip freeze > requirements.txt
```
* Run local:
```
python manage.py runserver
```
* Run docker-compose:
```
docker-compose up --build
```
* Make migrations:
```
python manage.py makemigrations
python manage.py migrate
```
* Run tests:
```
pytest
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
if running with docker: 
DB_HOST should be set as name of container with db<br>

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

### Endpoints:
* List of main endpoints you can find in Swagger:
```
http://127.0.0.1:8000/limit-order-book/api/schema/docs/    # Swagger docs
http://127.0.0.1:8000/limit-order-book/register
http://127.0.0.1:8000/limit-order-book/api/token/
http://127.0.0.1:8000/limit-order-book/api/token/refresh/
http://127.0.0.1:8000/limit-order-book/api/token/verify/
http://127.0.0.1:8000/limit-order-book/api/stock/
http://127.0.0.1:8000/limit-order-book/api/order/
http://127.0.0.1:8000/limit-order-book/api/transaction/
```
