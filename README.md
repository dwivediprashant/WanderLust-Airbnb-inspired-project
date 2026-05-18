# WanderLust

WanderLust is an Airbnb-inspired rental listing platform built with Node.js, Express, MongoDB, and EJS. It lets users browse stays, create listings, upload listing images, leave reviews, and manage their own content with login-based access control.

## Live Link

- https://wanderlust-airbnb-inspired-project-qs8g.onrender.com/list

## Feature Map

| Feature                           | Tools / Files Used                                                                                                                                                                           |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Browse all listings               | `routes/list.js`, `controllers/list.js`, `models/list.js`, `views/listing/list.ejs`                                                                                                          |
| View listing details              | `controllers/list.js`, `models/list.js`, `views/listing/show.ejs`                                                                                                                            |
| Register, log in, and log out     | `routes/user.js`, `controllers/user.js`, `middlewares/checkLogin.js`, `models/user.js`, `middlewares/isLogin.js`, `express-session`, `bcrypt`                                                |
| Create new listings               | `routes/list.js`, `controllers/list.js`, `middlewares/isLogin.js`, `middlewares/validateList.js`, `joiValidations/listSchema.js`, `middlewares/cloudinaryUpload.js`, `multer`, `cloudinary`  |
| Edit and delete your own listings | `routes/list.js`, `controllers/list.js`, `middlewares/isOwner.js`, `middlewares/validateList.js`, `joiValidations/listSchema.js`                                                             |
| Add and remove reviews            | `routes/review.js`, `controllers/review.js`, `middlewares/isLogin.js`, `middlewares/isReviewOwner.js`, `middlewares/validateReview.js`, `joiValidations/reviewSchema.js`, `models/review.js` |
| Filter listings by category       | `routes/list.js`, `controllers/list.js`, `models/list.js`                                                                                                                                    |
| Show flash messages               | `express-session`, `connect-flash`, `app.js`, `views/includes/flash.ejs`                                                                                                                     |
| Persist user sessions             | `connect-mongo`, `express-session`, `app.js`, `cloudConfig.js`                                                                                                                               |
| Display error pages               | `utils/ExpressError.js`, `app.js`, `views/errorlog/error.ejs`                                                                                                                                |

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Templating:** EJS, EJS-Mate
- **Authentication:** Express Session, Connect-Mongo, Bcrypt
- **Validation:** Joi
- **File Uploads:** Multer, Cloudinary
- **Utilities:** Connect-Flash, Method-Override, Dotenv
- **Frontend:** HTML, CSS, JavaScript

## Folder Structure

```bash
WanderLust/
├── app.js                 # Main Express application entry point
├── cloudConfig.js         # Cloudinary configuration
├── controllers/           # Request handlers for listings, reviews, and users
├── init/                  # Seed/init scripts and sample data (`data.js`, `index.js`)
├── joiValidations/        # Joi schemas for validating listing and review data
├── middlewares/           # Auth, ownership, validation, and upload middlewares
├── models/                # Mongoose models for listings, reviews, and users (`list.js`, `review.js`, `user.js`)
├── public/                # Static assets served by Express
│   ├── css/               # Stylesheets such as `style.css` and `rating.css`
│   ├── js/                # Client-side JavaScript files like `map.js` and `script.js`
│   └── assets/            # Images and other static resources
├── routes/                # Route definitions for listings, reviews, and users
├── utils/                 # Utility classes such as custom error handlers
└── views/                 # EJS templates for pages and shared layout parts
    ├── errorlog/          # Error page templates
    ├── includes/          # Reusable partials like navbar, footer, and flash messages
    ├── layouts/           # Base layout templates
    ├── listing/          # Listing pages: index, show, create, edit
    └── users/            # Login and registration pages
```

## Project Structure Notes

- `app.js` wires together the server, database connection, sessions, flash messages, and routes.
- `controllers/` contains the business logic for list, review, and user actions.
- `routes/` maps URLs to controller functions and applies middleware.
- `models/` defines the MongoDB data structures used by the app.
- `middlewares/` contains authentication, authorization, validation, and upload logic.
- `views/` holds all EJS pages and shared UI components.
- `public/` stores static files like stylesheets and browser scripts.

## Setup and Run

### Prerequisites

- Node.js installed
- MongoDB connection string
- Cloudinary credentials

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root and add the required values:

```env
ATLAS_DB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

## Notes

- The app uses `express-session` with a MongoDB store to keep user sessions persistent.
- Image uploads are handled through `multer` and stored in Cloudinary.
- Listing and review inputs are validated using Joi schemas before saving.
