[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=13352865)

## Project Description
1. Register and Login
   - For new users: go to register tab and input profile information. Then navigate to Login tab and use login credentials to access your account.
   - If you do not want to make a new user, please use username: Parthdsi and password: Parthdesai1@ to sign in, although we encourage account creation!
   - Existing Users: Go to Login tab and use login credentials to access your account.
2. Overhead Bar
   - Use overhead tabs to navigate to various pages within the system.
3. Logout
   - Logout of your account by selecting Logout in the top right corner of the system.
4. Profile
   - Edit your profile information in by making changes in textfields and selecting Save Changes. Do not edit the username.
   - Add, edit, and delete social media -> Add social media information such as platform (e.g. instagram), username, url, and visibility (what other users can view these)
   - Add hobbies and interests -> add hobby from existing hobbies within database in the dropdown. If you don't find a hobby, add a new hobby in the below textfield and select Add Hobby. Save Interests to maintain all changes.
5. People
   - Discover other users registered in the system
   - Scroll through and view other users' profile information
   - Can filter based on a certain one or multiple hobbies or interests
   - User can Like another user using a Like button for each user
   - The View Likes button brings the user to a list of other system users that have liked them
   - Return to the main People page by clicking on Back to People button


# MSci 342 - Project template

## This repo contains a template project for starting your development. It is based on the sample assignment solution from MSci 245.

## To run this app: 
- The app starts automatically in dev mode when you open this project in Codespaces. You can stop it by pressing Ctrl+C in the Codespaces terminal, where the app is running. To restart, use the following command from the main project directory:

```
yarn dev
``` 

- make sure you modify `config.js` to point to your MySQL database. The MySQL server name is

```
ec2-3-137-65-169.us-east-2.compute.amazonaws.com
```

  The database name is the same as your UW username.
  The password is "MSCI342".


## Development Tips:
- Use CodeSpaces for this project.
- In VSCode terminal on CodeSpaces start a new branch:
```
git checkout -b your-branch-name
```
- As you code, push daily changes to your GitHub repo's `your-branch-name` branch:
```
git add .
git commit -m "done feature xyz"
git push origin your-branch-name
```

For this project, you will be required to develop a full-stack React/NodeJS application with a MySQL database. To develop the MySQL database, follow the same process as in MSci 245:

1.	Open MySQL Workbench on your local machine and connect to 

```
ec2-3-137-65-169.us-east-2.compute.amazonaws.com
```

with your UW username and password 'MSCI342'.

2.	Once you are connected, open a Query window and select your database: 

```
USE YourUserName;
```

where YourUserName is the same as in Step 1.

3.	List all the tables visible to you.

```
SHOW TABLES;
```

Tip: Click on the icon highlighted in the figure below to only run the query with the cursor.


![image](/img/screen1.png)

4.	You will see the list of tables that are currently in your database.

5.	Create new tables required for your project task.

6.  Write the React/NodeJS code required for your project task.
 
7.	After you finish your development task, make sure that the app renders in the browser and functions according to the specifications.

8.	Push changes to the GitHub:

```
git add .
git commit -m "meaningful message indicating what changes were made"
git push origin your-branch-name
```

9.	In your GitHub repo, create new pull request. Ensure that other team members review and approve the changes. After that, merge `your-branch-name` branch with the `main` branch.



