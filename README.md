# Buyogo Assignment

## Deployment

[Vercel Deployment Link](https://buyogo-assignment-rust.vercel.app/)

## **Features**

### 1. **Login User**

- Users can log in using their email and password.
- Both fields have validation in place, and error messages are displayed if the input is invalid.

### 2. **Signup User**

- Users can create an account in a **two-step** signup process.
- Navigation between the two steps is possible, and all form states persist as the user moves back and forth.
- Input validation and error messages are implemented for both steps.
- The **Organization Name** field includes a searchable dropdown where users can search and select from a list of organizations fetched from an API.

### 3. **Home Page**

- Once logged in, users are redirected to the home page where their personal details are displayed (except for sensitive information like the password).

### 4. **Route Guard**

- **Login** and **Signup** routes are accessible only to users who are **logged out**.
- The **Home Page** is accessible only to users who are **logged in**.
- The route guard ensures secure navigation based on the user’s authentication status.

## Run Locally

To run locally follow these 3 simple steps:

1. Clone this repository
2. run `npm install`
3. run `ng serve`
