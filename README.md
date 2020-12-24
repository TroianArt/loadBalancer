# loadBalancer

# load balancer NodeJS + Express + MongoDB + AngularJS

task is to solve the servers: raising the number by a power

1.Technologies: node.js (express, mongoose, express-session, https),
AngularJS (controller, ng-repeat, $ http, $ interval), MongoDB
Task: elevation to the degree
2.Actions to run:
  -unzip "node_modules"
  -need to change the connection string "mongodb: // localhost: 27017 / DB_task_balancer"
  -start in node.js: loadBalancer.js, node1.js, node2.js, node3.js
  -go to https://127.0.0.1:8000/
3.Completed items: (all)
  -limited labor intensity (degree! = 0,1, number! = 0, degree <100, number <1000)
  -performs the percentage of the task (0%, if in the queue)
  -there is a table of tasks (those that have already been completed (progress = 100% and is the result), and those that have not yet been completed (progress=0% and result=0)),
   the current task is displayed, you can cancel the current task (which has already started
   run, or not yet, you can run a new task)
  -login and registration, check whether the user is new, https
4.Load Balancer custom on node.js.
5. Additional tasks:
  -administrator panel, which shows the servers and the current task that they run
  -clients can buy VIP, and then will be able to throw more than 10 tasks
  -if the task has not yet started, then progress = 0%.
  -the page does not need to be updated, the angular will update
  -authorization through a session
