export const templates = {
	class: `@startuml
class User {
-String username
-String email
+login()
+logout()
}

class Post {
-String title
-String content
-Date createdAt
+publish()
}

User "1" -- "many" Post : creates
@enduml`,
	sequence: `@startuml
actor User
participant "Web App" as A
participant "API Server" as B
database "Database" as C

User -> A: Login Request
A -> B: Authenticate
B -> C: Query User
C --> B: Return User Data
B --> A: Authentication Response
A --> User: Login Result
@enduml`,
	activity: `@startuml
start
:User opens application;
if (Is logged in?) then (yes)
:Show dashboard;
else (no)
:Show login form;
:User enters credentials;
if (Credentials valid?) then (yes)
  :Authenticate user;
  :Show dashboard;
else (no)
  :Show error message;
  stop
endif
endif
:User interacts with app;
stop
@enduml`,
}
