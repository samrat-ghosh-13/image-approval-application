# Experience

The challenge was quite exciting because of the following reasons
- Using redux toolkit for the first time, I was aware of flux pattern and used the same in Vue with Vuex. Previously worked with context API.
- Using styled components for the first time, previously worked with CSS, SCSS. Really liked the CSS in JS solution, my new favorite.
- Using unsplash to fetch fantastic images.

## Tech Stack

- React
- Redux
- Styled Components
- Cypress
- GitHub Actions for running the test cases post commit on "main" branch

## Testing

- You can check the status of the test cases by going to the GitHub Actions tab at https://github.com/samrat-ghosh-13/image-approval-application/actions

## Deployment

#### The project is deployed using vercel and can be found at the following urls: 
- http://image-approval-application.vercel.app/
- Deployment logs: https://github.com/samrat-ghosh-13/image-approval-application/deployments

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

use yarn test to do unit testing of the components and the reducers using cypress.io

### `yarn test:e2e`

use yarn test:e2e to do end to end testing using cypress.io

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Lighthouse reports

Web vitals of the application in Desktop and mobile after having 13 approved images: 

Desktop -

![lighthouse_desktop](https://user-images.githubusercontent.com/22419506/134580577-a7aab341-1f0f-46a0-820e-e23efe38ba7e.png)

Mobile - 

![lighthouse_mobile](https://user-images.githubusercontent.com/22419506/134629726-7bf086e5-ee10-4ae7-9ed7-598eef16e078.png)

The performance in mobile is taking a hit because of unused JS files from the production build, that can be improved by using caching for the images from unsplash and by requesting the images of the correct sizes. 

## What can be improved? 

- using color variables
- using margin, spacing variables
- using constants to store the static texts, that can support multiple languages




