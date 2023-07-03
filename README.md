Social website to rate & review poutines

## Getting Started
- Add environment variables in `.env.development`
- `npm i`
- `npm run dev`

## Todo
- [X] Database pooling
- [ ] Test compatibility with various mobile browsers
- [X] "Add to watch list"/"poutines to try" feature & page
- [X] Edit profile (name, profile photo, bio, soft-delete account)
- [ ] Follow user feature
- [X] About us/contact page
- [ ] Create isLoggedIn and isAdmin BE middleware
- [ ] Add backend validation (Joi)
- [ ] Refetch data without refreshing when logging in, creating account, adding a review, etc.
- [X] Cache the current user
- [X] Skeleton screens instead of spinner
- [X] Add filtering in restaurants index page
- [X] Email verification for email signup
- [X] Email based password change
- [ ] Upvote / downvote / report review

Reviews:
- [X] Multi-photo upload
- [ ] Add takeout/dine-in pill select in review form
- [X] Fries 
- [X] Sauce 
- [X] Cheese 
- [ ] Poutine name + Price of poutine
Inspiration for rating criteria http://www.routedelapoutine.com/

Restaurants
- [ ] Add isPermanentlyClosed boolean to restaurants and adapt UI for restaurants that are shut forever
- [X] Better looking category tag pills in restaurant card and show page
- [X] Add isApproved boolean to restaurants - A user can create & review a new restaurant but it will only be visible by him until admin approves it
