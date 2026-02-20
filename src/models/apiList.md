# DevTinder APIS

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter

- POST /request/send/intrested/:userId
- POST /request/send/IGNORED/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:rejectId

## userRouter

- GET /user/connections
- GET /user/requests/received
- GET /user/feed -gets you the profiles of other users on platform

status: ignore, intrested, accepted, rejected
