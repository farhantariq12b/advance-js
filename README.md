## Prerequisites

Before running the project, make sure you have the following software installed on your machine:

- Node.js v16: You can use NVM (Node Version Manager) to install Node.js v16.

## Installation

### Installing Node.js v16 using NVM

1. Install NVM (Node Version Manager) by following the instructions at [NVM repository](https://github.com/nvm-sh/nvm#installation). Choose the installation method that is suitable for your operating system.

2. Once NVM is installed, open a new terminal window or restart your terminal.

3. Install Node.js v16 by running the following command:

   ```bash
   nvm install 16
   ```

4. Verify that Node.js v16 is installed by running the following command:

   ```bash
   node --version
   ```

   You should see the version number of Node.js v16.

### Installation

1. Install project dependencies by navigating to the project directory in your terminal and running the following command:

   ```bash
   npm install
   ```

### Question 1

1. To run question one perform the following steps
  - To host json Run `npm run server:q1`
  - Run `npm run q1`

Time Taken => 45 minutes

### Question 2

1. To run question two perform the following steps
  - Run `npm run q2`
  - Your server will be started and you can query to check

Time Taken => 45 minutes

### Question 3

1. To run question three perform the following steps
  - Run `npm run q3`

Time Taken => 30 minutes

### Question 4

Migrating of any library is a significant task that requires careful planning and execution.

1. Risk Assessment
  - We should analyze the compatibility of existing code with V4. There can be documentation avaialble from where we can confirm the compatibility to upgrade.
  - Check the impact on performance.
  - Check the availabilty of compatible plugins for v4
2. Effort Required
  - We should Analyze the size and complexity of the codebase and database schema to estimate the overall effort required for the migration.
  - In effort estimations account testing, debugging and migrations.
3. List of Development Tasks
  - Review the current codebase to be compatible with V4.
  - Update Sequelize and related dependencies to the latest versions.
  - Check code that are deprecated or removed features in V4.
  - Test and fix any potential issues with the updated code.
  - Write migration script to update the database schema if necessary.
  - Ensure that all unit and integration tests pass successfully with V4.

4. Rollout and deployment strategy
  - deploy the latest updated code to a staging environment first and perform testing

5. monitoring and error tracking
  - setup alerts for critical issues
  - use some tools to track performance like express-status-monitor

Time Taken => 15 minutes

### Question 5

Part 1 => Answer: 

To build a Cordova-powered hybrid mobile app capable of self-updating its content without going through the app stores' approval process,  we can follow the following steps.

1. Setup Server for content management.

  - Set up a backend server to manage the content of the mobile app.
  - The backend should have an API to deliver content to the mobile app and a way to notify the app when new content is available.

2. Versioning:

  - Implement versioning for the content hosted on the backend. Each update should have a unique version number or identifier.

3. App Self-Updating Mechanism:

  - Within the Cordova app, implement a self-updating mechanism that checks for new content updates periodically or on app launch. The app should call the backend API to check for a new version of the content based on the installed version. If a new version is available, download the updated content files from the backend.

3. Handling Content Updates:

  - When new content is downloaded, replace the old content files in the app's storage with the updated ones.

4. Offline Support:

  - Store the latest content version locally on the device so that the app can continue to display content even in offline mode.

5. Security Considerations:

  - Add authorization to prevent unauthorized access.

6. User Notifications:

  - Notify users when new content is available and provide an option to update the content manually if desired.


Part 2 => Answer:

To handle files(images and videos) approach, There are multiple approach to handle this.
1. Directly upload to some storage provider and use the link.
2. Handle it by sending the files in the chunk. Once backend receive it will store the file and keep appending the new data. Once it's finished then upload it to some storage provide and remove the file from the server.
To keep in mind the connectivity, we will add retriers method to refetch the data if chunk is not received correctly. Once received correctly then append. This way we can ensure the file is uploaded even for weak/poor connection.

Time Taken => 5 minutes

Part 3 => Answer:

To automate the process of building and signing .ipa/.apk files for iOS

1. Version Control
  - for version controlling we can use version control libraries like git etc.

2. CI/CD system
  - Automate deployment process so every time a new feature is merged in develop branch then deploy it.

3. Dockerize

4. singing profile
  - Creat necesssary certificate require for app signing.

5. Artificate storage
  - use cloud storage like aws s3 to store .ipa/apk file

6. Test automation

7. Notification and alerts
  - Alert when a build is passed or failed