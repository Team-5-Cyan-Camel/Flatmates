# Flatmates

A flat management system to allow flatmates to communicate and manage tasks/chores between each other.

# Set Up

1. First, clone this repository to a known location
2. Get or make an appropriate .env file to set up the connection to the database. Place the .env file inside the backend folder.
   <b>Note:</b> if you would like the organization’s file, please contact [In.early.springs@gmail.com](In.early.springs@gmail.com)
3. In both frontend and backend folders, run `npm install`, followed by `npm start` to start both the frontend and backend.
   <b>Note:</b> We recommend starting the backend first, however it should not cause any issues.
4. If the user wants to use the backend hosted on heroku instead, do not run `npm install` and `npm start` on the backend folder. Instead, replace the `"proxy": "http://localhost:3001"` in `package.json` with `"proxy": "https://softeng750-flatmates-backend.herokuapp.com"`. Then just normally run `npm install` and `npm start` in the frontend folder.

## Functionality

1. Allow the creation of new accounts
2. Allow sign in
3. Allow creating a room
4. Allow joining an existing room
5. Allow all users of a room to be seen
6. Allow users to update their details
7. Allow the host to kick members
8. Allow the host to rotate tasks
9. Allow the host to delete rosters
10. Allow the host to delete task
11. Allow the host to delete the room
12. Allow room members to leave the room
13. Allow users to assign task to each other
14. Allow members to chat with each other

## GPL v3.0 License

This codebase is licensed under the General Public License 3.0  
![image](https://user-images.githubusercontent.com/51986824/112704167-77579d00-8efe-11eb-8874-8736ac7146f9.png)
