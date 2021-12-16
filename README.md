# SMSSchedulerServer (Testing Purpose)
## Send and Check the Delivery Status

SMSSchedulerServer send and update the SMS status based on the latest sending status.
## Installation
- git clone https://github.com/yoesoff/SMSSchedulerServer.git
- yarn install
- Setup DB connection at config/config.json
- npx sequelize-cli db:create
- npx sequelize-cli db:migrate 
- npx sequelize-cli db:seed:all
- ✨yarn start✨
- *You can populate the data from migration seeder or from sql file in this project

## APIS
- /users CRUD
- /schedules CRUD
- /scheduleusers?status=waiting|pending|DELIVRD|UNDELIV|UNKNOWN CRUD
- ?limit=2&page=2 pagination support for all endpoints
- /scheduleusers?status=DELIVRD&startDate=2021-12-04%2009%3A45%3A40&endDate=2021-12-06%2009%3A45%3A40  (Date range only available for /scheduleusers )
- PostMan import link https://www.getpostman.com/collections/1eff7dd3512deef48a25 

## Cron
Cron job runs inside the application, for the configuration can be seen at app.js.
- Send the SMS based on the schedules.
- Check the status of sent SMS.
- Update the status of the SMS sent by cron


This text you see here is *actually- written in Markdown! To get a feel
for Markdown's syntax, type some text into the left window and
watch the results in the right.

## Tech
This project uses a number of open source projects to work properly:

- expressjs
- express-generator		
- mysql
- sequelize
- sequelize-cli
- faker			
- axios
- node-schedule


