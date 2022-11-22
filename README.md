# Cloud File Sharing App


## Problem Statement
document inventories. Documents of many different types exist within the view of an enterprise, all which serve different purposes, teams, and departments. They may cover day-to-day operational documents, historical records, contracts or legal documents. Considerable financial and physical resources may be required to handle these documents. Since the paper-based solution in antiquated and costly, enterprises need a different, modern and cost-saving solution for managing documents.

## Solution
A technological approach to handle this issue is a cloud-based Document Management System (DMS). A DMS is a electronic document management system which can store, manage, and track documents. It also includes features like security, authentication, availability, consistency, and is available on the web for worldwide access. The documents get stored in an encrypted fashion in a containerized database. A backend application, also deployed as a container will act as an API-Gateway between the internet and the database where the files are stored. Our solution will combine these applications (front-end, back-end, and cloud) to provide a unified DMS which provides all the features mentioned above.

## Architecture Diagram
![image](https://user-images.githubusercontent.com/97869121/203249376-f6433042-a7b3-4a8b-bf6d-f79ccc1ee968.png)

## Operations
1. Login: The user can securely login to its account. <br/>
2. Register - A user can sign-up with a new account. <br/>
3. Share File - A user can share the file to other users using their designated username. <br/>
4. Delete File - The user can delete the file from the list. The file is deleted from the database without any recovery.<br/>
5. Upload File - The user is given the choice to upload the file of a specific type - PDF, text, image etc.<br/>
6. Logout - Close and exit session.<br/>

## Implementation Platform and Environment
1. Landing web-page: This is a front-end UI application that the users will interact with. It will use authentication and will bind the user interaction with the backend API and services.
2. AWS EC2: The cloud service required to create and run our virtual machine instance.
3. Docker: Containerisation application installed on the Linux AMI to provide the cloud functionalities for this application.
4. Kubernetes: The orchestrator to manage deployment and scaling of the application containers.
5. App: This is the gateway between the front-end and the database. It will route all traffic to and from the user. It contains backend APIs that the UI will interact with and communicate with the database.
6. MongoDb: This is a no-sql database that will store the user information and the documents in an encrypted format. It will be also deployed as a container with a persistent store.


## Implementation Technologies Used
1. Backend: Node.js / Go
2. Frontend: Javascript + HTML / CSS
3. Container: Docker
4. Deployment: Kubernetes
5. Database: MongoDB
6. Server instance: AWS EC2





