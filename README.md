# PH University (server)

[Requirement Analysis](https://www.notion.so/Requirement-Analysis-14d4fd4a57a180b3845aee8c12b70cca?pvs=21)

[Data Model](https://www.notion.so/Data-Model-14d4fd4a57a180c4b3fdc480477fc32e?pvs=21)

[ER Diagram](https://www.notion.so/ER-Diagram-14d4fd4a57a180cfa99dd54864c6a92f?pvs=21)

[API Endpoints](https://www.notion.so/API-Endpoints-14d4fd4a57a180f0bd96c63d6b91cc3d?pvs=21)

## Requirement Analysis

### Functional Requirements

1. **Authentication**
   1. **Student**
      1. Students can securely log in and log out
      2. Students can change their passwords
   2. **Faculty**
      1. Faculty can securely log in and log out
      2. Faculty can change their passwords
   3. **Admin**
      1. Admin can securely log in and log out
      2. Admin can change their password
2. **Profile Management**
   1. **Student**
      1. Students can view and update their profiles
      2. Students can modify specific profile fields
   2. **Faculty**
      1. Faculty can view and update their profiles
      2. Faculty can modify specific profile fields
   3. **Admin**
      1. Admin can view and update their profile
      2. Admin can modify specific profile fields
3. **Academic Process**
   1. **Student**
      1. Students can enroll in courses offered for a specific semester
      2. Students can view their class schedule
      3. Students can view their grades
      4. Students can access the notice board and events
   2. **Faculty**
      1. Faculty can manage student grades
      2. Faculty can access students' personal and academic information
   3. **Admin**
      1. Admin can manage multiple processes:
         1. Semester
         2. Course
         3. Offered course
         4. Section
         5. Room
         6. Building
4. **User Management**
   1. **Admin**
      1. Admin can manage multiple accounts
      2. Admin can block/unblock users
      3. Admin can change user passwords

## Data Model

## User

- \_id
- id (generated)
- role
- status
- password
- changePassword
- isDeleted

## Student

- \_id
- id (generated)
- image
- name
- email
- gender
- dateOfBirth
- contactNo
- emergencyContactNo
- presentAddress
- permanentAddress
- guardian
- localGuardian
- academicDepartment
- admissionSemester
- isDeleted
- timestamp

## Faculty

- \_id
- id (generated)
- image
- designation
- name
- email
- gender
- dateOfBirth
- contactNo
- emergencyContactNo
- presentAddress
- permanentAddress
- academicDepartment
- academicFaculty
- isDeleted
- timestamp

## Admin

- \_id
- id (generated)
- image
- name
- email
- gender
- dateOfBirth
- contactNo
- emergencyContactNo
- presentAddress
- permanentAddress
- managementDepartment
- isDeleted
- timestamp

## Academic Semester

- name
- year
- code
- startMonth
- endMonth

## Academic Faculty

- name
- timestamp

## Academic Department

- name
- academicFaculty
- timestamp

## ER Diagram

[https://viewer.diagrams.net/?border=0&tags=%7B%7D&lightbox=1&highlight=0000ff&edit=\_blank&layers=1&nav=1#G1NmD_j-J6y3Es9eOHcKjT5jm1BO-3QqM2](https://viewer.diagrams.net/?border=0&tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1#G1NmD_j-J6y3Es9eOHcKjT5jm1BO-3QqM2)

## API Endpoints

### User

- users/create-user (POST)
- users/create-faculty (POST)
- users/create-admin (POST)

### Student

- students (GET)
- students/:id (GET)
- students/:id (PATCH)
- students/:id (DELETE)
- students/my-profile

### Faculty

- faculties (GET)
- faculties/:id (GET)
- faculties/:id (PATCH)
- faculties/:id (DELETE)
- faculties/my-profile

### Admin

- admins (GET)
- admins/:id (GET)
- admins/:id (PATCH)
- admins/:id (DELETE)
- admins/my-profile

### Auth

- auth/login
- auth/refresh-token
- auth/change-password
- auth/forget-password
- auth/reset-password
