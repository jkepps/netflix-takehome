# Netflix L5 SPOT Take Home Challenge

### Steps to run the app

1. Copy `.env.example` to `.env`
1. Set the YELP_API_KEY in .env
1. Run `npm install` to install the project dependencies
1. Run `npm run server` from the root of the project
1. Run `npm run dev` from the root of the project
1. Navigate to the given localhost port (Default is typically http://localhost:5173)

### Steps to run the tests

1. Run `npm run test` from the root of the project

### Project Description

I took a literal approach to the project outline in order to pair down the scope and keep the feature set limited and specific. As such, I focused primarily on the front-end aspect of the project, and built an extremely simple Express server. It simply acts as a pass through for the Yelp API for the sake of side stepping the CORS issues that arise from trying to hit a 3rd party API from a browser context. Additionally, I hard coded the search term "boba shops" at the hook level in the request to the Yelp API, knowing it would be very straightforward to implement a text field that would allow the user to submit their own search term should that be desired in the future.

I spent a decent amount of time thinking about the design and usability of the interface, opting for simplicity and a clean aesthetic that presented only what was specifically asked for in order to keep the view from becoming too cluttered. I made sure to allocate time for a minimal test suite that covered the main functionality of the app, but ideally I would prefer slightly more test coverage than what I was able to accomplish here due to the time constraint.

#### Notable Areas For Improvements

Given the simplistic nature of the data being pulled and the type of state management required by the scope of the project, I chose not to utilize a more sophisticated state management pattern, and instead utilized the `useState` hook from React. I felt this was adequate for the scope of the project, but does come with some noticeable drawbacks, namely the inability to share state efficiently and concisely across the component tree. An improvement that could be made if the app were going to be built out more would be to introduce a shared state tool such as Redux or React Contexts.

Another improvement that could be made is a cache layer for the data that is being fetched. This would ensure that duplicate requests for data would not require additional network calls which would improve performance and keep the app feeling fast.

Sophisticated error handling and logging are also areas that I deemed to be out of scope for the project, but would need to be incorporated for a production application.
