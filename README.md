# Social Website to Rate & Review Poutines

## Getting Started
- Add environment variables in `.env.development`
- Run `npm i` to install dependencies
- Run `npm run dev` to start the development server

## Todo
- [X] Implement database pooling
- [ ] Test compatibility with various mobile browsers
- [X] Add "Add to Watch List"/"Poutines to Try" feature & page
- [X] Implement edit profile functionality (name, profile photo, bio, soft-delete account)
- [ ] Implement follow user feature
- [X] Create About Us/Contact page
- [ ] Create `isLoggedIn` and `isAdmin` backend middleware
- [ ] Add backend validation using Joi
- [ ] Refetch data without page refresh for actions like login, account creation, adding a review, etc.
- [X] Cache the current user
- [X] Use skeleton screens instead of spinner
- [X] Add filtering options on restaurant index page
- [X] Implement email verification for email signup
- [X] Implement email-based password change
- [ ] Add upvote, downvote, and report review features

### Reviews
- [X] Support multi-photo upload
- [ ] Add takeout/dine-in pill selector in review form
- [X] Rate fries
- [X] Rate sauce
- [X] Rate cheese
- [ ] Include poutine name and price in reviews  
Inspiration for rating criteria: [Route de la Poutine](http://www.routedelapoutine.com/)

### Restaurants
- [ ] Add `isPermanentlyClosed` boolean for restaurants and adapt UI for restaurants that are closed permanently
- [X] Improve design of category tag pills in restaurant card and show page
- [X] Add `isApproved` boolean to restaurants — Users can create & review a new restaurant, but it will only be visible to them until an admin approves it
