# API with Nodejs - Express - Sqlite3 - Sequelize

route to update, delete or get a user by its ID 
/api/user/{userid} (GET, PUT, DELETE)

Route to post a new user
/api/user (POST)
body has to be
{
    "name": string,
    "lastname": string,
    "birthday": "YYYY/MM/DD", (different format will throw error)
    "dni": number
}

You can update, delete or get users by calling

GET /api/user 
If no query parameter is send, then all it will respond with all users

DELETE /api/user 
Will respond with a message and a usersDeleted field showing how many users where deleted

PUT /api/user 
If no body or valid fields in body are received, it will throw an error

Valid query parameters are:
birthdayBeetweenRange=date1,date2 (Users who's birthday are beetween two dates)
birthdayBeforeAfterDate=date (Users who's birthday are before or after the date)
stringSearch=string (Users that contain the given string either in name or lastname)

Example of GET /api/user with combined parameters
/api/user?birthdayBeetweenRange=1990-02-25,1992-02-25&stringSearch=tom
