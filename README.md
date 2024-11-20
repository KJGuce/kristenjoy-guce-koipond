# KoiPond

## Overview

KoiPond is a community-focused app designed to foster connection, generosity, and collaboration. Inspired by the concept of 'koinonia'—a Greek word symbolizing fellowship, unity, and shared purpose—the app embodies the spirit of coming together to uplift one another. The pond reflects the app’s mission to create a thriving ecosystem of support. In KoiPond, two key features drive this community: Alms, where users can offer or request resources, and Acts, where individuals can discover and participate in volunteer opportunities. Through these acts of generosity and mutual care, KoiPond empowers communities to grow stronger together.

### Problem Space

Communities often have underutilized resources and people willing to volunteer, but lack a platform to share and discover these opportunities. KoiPond simplifies the process of resource sharing, making it easier to offer, find, and contribute to community needs.

### User Profile

1. **Individuals seeking or offering resources**:

   - Community members in need of specific resources.
   - People with extra items to donate or share.
   - Individuals willing to volunteer their skills for community causes.

2. **Organizations or groups**:
   - Non-profits and community organizers looking for volunteers.
   - Local businesses offering surplus goods or services.

### Features

- As a user, I want to be able to post a resource or opportunity that I’m offering or in need of.

- As a user, I want to be able to search for resources or opportunities by category (e.g., "Food", "Clothing", "Housing Help", "Skills").

- As a user, I want to be able to filter available resources or opportunities by location.

- As a user, I want to be able to view available resources and opportunities in a list or map view.

- As a user, I want to be able to create an account to manage my posted resources and needs.

- As a user, I want to be able to login to my account to manage my posted resources and needs.

- As a logged-in user, I want to be able to send a message to another user regarding a resource or opportunity.

- As a logged-in user, I want to be able to see my message history with other users.

- As a logged-in user, I want to be able to update or edit my posted resources or opportunities.

- As a logged-in user, I want to be able to receive notifications for new messages or updates to posted resources/opportunities.

## Implementation

### Tech Stack

- **Frontend**: React Native
  - React Navigation
  - React Native Paper
  - Axios
- **Backend**: Node.js, Express
- **Database**: SQL, knex
- **Authentication**: JWT

### APIs

- No external APIs will be used for the first sprint

### Sitemap

- **Login Screen**: Brief introduction and options to sign up or log in.
- **Signup Screen**: Brief introduction and options to sign up or log in.
- **Dashboard**: A list of available Alms (resources) and Acts (volunteer opportunities).
- **AlmsList**: Gallery/list of all available Alms (resources)
- **ActsList**: Gallery/list of all available Acts (volunteer opportunities)
- **Alms Details**: Gallery/list of all available Alms (resources)
- **Acts Details**: Gallery/list of all available Acts (volunteer opportunities)
- **Add an Alm**: Form for users to create an alm or post an act.
- **Add an Act**: Form for users to create an alm or post an act.

### Mockups

#### Home Page

![](Homepage.png)

#### Register Page

![](Signup.png)

#### Login Page

![](Login.png)

#### Alms (Resources) Page

![](AlmsList.png)

#### Alms Detail Page

![](AlmsDetails.png)

#### Acts (Opportunities) Page

![](ActsList.png)

#### Acts Detail Page

![](ActsDetails.png)

#### Add an Alm Page

![](AddAlm.png)

#### Add an Act Page

![](AddAct.png)

### Data

![](schema.png)

### Database Tables

1. **Users**: Stores user information like name, contact info, location, etc.
2. **Resources**: Stores the details of resources or volunteer opportunities posted.
3. **Opportunities**: Stores the details of volunteer opportunities posted.

### Endpoints

## POST /users/register

- Register a new user account.

Parameters:
• email: User’s email.
• password: User’s provided password.
• first_name: User’s first name.
• last_name: User’s last name.
• role: User’s role, either “volunteer” or “seeker”

Response:

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.C7jmAPbC3sghlqpxvYqcbgK8wDJbWVZZMLD3EBbD9c"
}
```

## POST /users/login

- Login a user

Parameters:
• email: User’s email.
• password: User’s provided password.

Response:

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.C7jmAPbC3sghlqpxvYqcbgK8wDJbWVZZMLD3EBbD9c"
}
```

## GET /opportunities

- Get all available volunteer opportunities, with an optional “joined” status if the user is logged in.

Parameters:
• token (optional): JWT used to check if the user is a volunteer and has joined any opportunities.
• location (optional): User-provided location to filter opportunities by proximity.

Response:

```
{

        "opportunity_id": 1,
        "title": "Food Drive Assistance",
        "description": "Help sort and distribute food for families in need.",
        "location": "New York, NY",
        "start_date": "2024-12-01T09:00:00Z",
        "end_date": "2024-12-02T17:00:00Z",
        "status": "open",
        "joined": true

}
```

## POST /opportunities

- Create a new volunteer opportunity (Logged-in users only).

Parameters:

    •	token: JWT of the logged-in user.
    •	title: Opportunity title.
    •	description: Opportunity description.
    •	location: Opportunity location.
    •	start_date: Start date and time.
    •	end_date: End date and time.

Response:

```
{

   "opportunity_id": 1,
    "title": "Food Drive Assistance",
    "description": "Help sort and distribute food for families in need.",
    "location": "New York, NY",
    "start_date": "2024-12-01T09:00:00Z",
    "end_date": "2024-12-02T17:00:00Z",
    "status": "open"

}
```

## PUT /opportunities/:id

    •	Update a specific volunteer opportunity (Logged-in users only).

Parameters:
• token: JWT of the logged-in user.
• id: The unique ID of the opportunity to be updated.
• title (optional): Updated opportunity title.
• description (optional): Updated opportunity description.
• location (optional): Updated location.
• start_date (optional): Updated start date and time.
• end_date (optional): Updated end date and time.

Response :

```

  {
    "opportunity_id": 1,
    "title": "Updated Food Drive Assistance",
    "description": "Help sort and distribute food for families in need. Updated details.",
    "location": "Updated New York, NY",
    "start_date": "2024-12-02T10:00:00Z",
    "end_date": "2024-12-03T16:00:00Z"
}
```

## DELETE /opportunities/:id

    •	Delete a specific volunteer opportunity (Logged-in users only).

Parameters:
• token: JWT of the logged-in user.
• id: The unique ID of the opportunity to be deleted.

Response:

```

{
    "message": "Opportunity successfully deleted."
}
```

## GET /resources

- Get all available resources, with an optional “requested” status if the user is logged in.

Parameters:

    •	token (optional): JWT used to check if the user has requested any resources.
    •	location (optional): User-provided location to filter resources by proximity.

Response:

```
{

   "resource_id": 1,
   "name": "Winter Clothing",
   "description": "Warm coats, gloves, and hats for those in need.",
   "quantity": 10,
   "location": "New York, NY",
   "requested": true

}
```

## POST /resources

- Create a new resource (Logged-in users only).

Parameters:

    •	token: JWT of the logged-in user.
    •	name: Resource name.
    •	description: Resource description.
    •	quantity: Amount of the resource available.
    •	location: Location of the resource.

Response:

```
{

    "resource_id": 1,
    "name": "Winter Clothing",
    "description": "Warm coats, gloves, and hats for those in need.",
    "quantity": 10,
    "location": "New York, NY"

}
```

## PUT /resources/:id

    •	Update a specific resource (Logged-in users only).

Parameters:
• token: JWT of the logged-in user.
• id: The unique ID of the resource to be updated.
• name (optional): Updated resource name.
• description (optional): Updated resource description.
• quantity (optional): Updated quantity.
• location (optional): Updated location.

Response:

```

{
    "resource_id": 1,
    "name": "Updated Winter Clothing",
    "description": "Warm coats, gloves, and hats for those in need. Updated details.",
    "quantity": 8,
    "location": "Updated New York, NY"
}
```

## DELETE /resources/:id

    •	Delete a specific resource (Logged-in users only).

Parameters:
• token: JWT of the logged-in user.
• id: The unique ID of the resource to be deleted.

Response:

```
{
    "message": "Resource successfully deleted."
}
```

### Roadmap

#### **Day 1-2: Project Setup**

- **Front End:**
  - Set up the React Native environment (using Expo or CLI).
  - Initialize project structure with organized folders for components, screens, and assets.
- **Back End:**
  - Configure the Node.js server with Express.
  - Set up the SQL database schema using MySQL Workbench:
    - Tables: `Users`, `Resources`, `Opportunities`.
  - Create basic API endpoints:
    - `GET /resources`
    - `GET /opportunities`
    - `POST /resources`
    - `POST /opportunities`
    - `PUT /resources`
    - `PUT /opportunities`
    - `DELETE /resources`
    - `DELETE /opportunities`
- Test the back-end endpoints using **Postman** to ensure they function correctly.

---

#### **Day 3-5: Core Features and Basic Styling**

- **Home Page:**
  - Build a simple Home Page UI with navigation links to Resources and Opportunities screens.
- **Post/Get Resources:**
  - **Front End:**
    - Develop screens and forms to:
      - View all resources.
      - Add a new resource (fields: title, description, location, quantity).
  - **Back End:**
    - Finalize and test `/resources` endpoints.
- **Post/Get Opportunities:**
  - **Front End:**
    - Develop screens and forms to:
      - View all volunteer opportunities.
      - Add a new opportunity (fields: title, description, location, dates).
  - **Back End:**
    - Finalize and test `/volunteer-opportunities` endpoints.

---

#### **Day 6-7: Final Styling And Additional Features (time permitting)**

- **Search and Filter:**
  - Add basic filters for resources (e.g., by location or type).
  - Add search functionality for opportunities (e.g., by title or date).
- **Finalize Styling:**
  - Apply minimal UI/UX improvements:
    - Create clear navigation.
    - Add basic form validation for input fields.

---

#### **Day 8-9: User Authentication**

- Implement **JWT-based authentication** for user login and registration.
  - **Back End:**
    - Create endpoints:
      - `POST /users/register`
      - `POST /users/login`
    - Secure routes such as `POST /resources` and `POST /volunteer-opportunities` to require tokens.
  - **Front End:**
    - Add forms for user registration and login.
    - Display user-specific features (e.g., "My Resources" or "My Opportunities").
- Test authentication flows to ensure proper security and functionality.

---

#### **Day 10-11: Testing, Bug Fixes, Code Clean**

- Perform end-to-end testing of the app to ensure:
  - Resources and Opportunities can be created, viewed, and retrieved as expected.
  - Secure routes reject unauthorized users appropriately.
- Fix any UI bugs and resolve back-end issues.
- Deployment (time permitting)

---

#### **Demo Day**

## **Deliverables**

1. Core features:
   - Home Page navigation.
   - Post/Get/Put/Delete Resources functionality.
   - Post/Get/Put/Delete Opportunities functionality.
2. Basic UI/UX design.
3. Fully tested and debugged proof of concept.

## Nice-to-haves

- **Advanced Filters, Sort, and Search**: Allow users to view top volunteer or resource suggestions based on additional profile inputs (skillset, preferences, location, etc)
- **Real-Time-Communication and Notifications**: Robust notifactions and real-time messaging whenever a new resource/opportunity is posted that matches the user.
- **Community Events Listing**: Add calendar functionality for community events.
