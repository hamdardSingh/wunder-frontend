# WunderFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Technologies used

 - Angular
 - ngrx/store
 - RxJs

## Areas for Improvement

#### Angular
  - Utilize lazy loading modules/components to decrease the main bundle size.
  - Implement the OnPush change detection strategy for enhanced performance.
  - Leverage Angular Signals to optimize rendering updates.

#### SCSS

There are several areas for improvement to align with the brand identity. Currently, only the main colors have been defined.
 
 - Define the complete color palette to adhere to brand guidelines.
 - Implement Mixins to reduce redundant code.
 - Consider optimization for mobile devices.

### Problem Faced

Storing the state in the local storage because I have never used that feature of ngRx before. And copying API endpoint links from the PDF file ;)

### Project Structure

I followed the standard Angular project structure. Here are some key points:

- The API service file is located in the main `src/app` directory.
- Form state management is handled in the `src/app/form/state` directory.
- I utilized a proxy configuration file at `src/proxy.conf.json`.
