# STRAVA APP GRETRAINING

#### Description:
I have build an app using the Strava API to display workouts and get insights in weekly intensity scores.
The back-end is build in python using a flask server. And the front-end is build with React js.

My main project folder exists of 2 folders. One is the flask-server folder(the back-end) and the other is the client folder(the front-end).

# flask-server folder

this folder contains the app.py file. I am using this file to make request to the Strava Api with the necessary information that comes in via a Post request from the front-end.
the first route: "/accestoken" is for getting the first accesToken when the user visits the website for the first time,
but this is a shortlived token. So when the accestoken expires a new request is made from the front-end to the "/refreshtoken" route in app.py.

the "/listactivities" route is for requesting the athletes activities.

The "/getauthathlete" route is for getting data about the authenticated user

# client folder

This folder contains the front-end that I made with React js.

In the src folder are a lot of files. The components folder contains all the components, the css folder contains all the css files that are used by the components.

The base of the app starts with the index.js file that is inside the src folder. Here you can see I wrapped the App with a StateProvider component,
this allows all the components to use data from other components, the code that allows this are inside the reducer.js and Stateprovider.js files.

Now we will take a look inside the components folder. We will begin with the App component. Inside this component are all the available routes defined, depending on the current route, certain components will get rendered.

Every route has the Permissions component, this components job is to make sure the accestoken is still valid and will make a request for a new token as the old one expires.

The NavBar component renders the top navigation bar, the user can use this component to navigate between routes.

The MyActivities component renders the latest activities of the user. Each activity is a Activity component.

The Activity component shows some data about the athlete and about the workout, there is also a interactive map of the workout( if the workout has one) using leaflet.
If the user clicks on a individual activity, the user will be redirected to the "/activity/:id" route that renders the ActivityDetails component with more details about the workout and again the interactive map

If the user clicks on the weekly intensity char button inside the Navigation bar the user will be redirect to the "/mysufferscores" route where the MySufferScores component will be rendered. This chart will show the weekly intensities numbers.

It took a while to figure out how the Strava API worked, same goes for the weekly intensity chart and the interactive map using leaflet.

