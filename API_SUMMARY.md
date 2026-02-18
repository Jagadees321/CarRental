# KlechiKodi – API summary

## 1. Database (run `backend/sql/schema.sql` in MySQL)

- **users**: userid, username, email, password, phonenumber, adhaarNo, drivinglic, **Role** (customer | owner), createdAt  
- **cars**: carid, brand, model, year, registration_no, **userid** (owner), per_day_price, status, createAt  
- **booking**: bookingid, userid, carid, pickup_location, drop_location, start_date, end_date, status, total_amount, createAt  
- **payment**: paymentid, bookingid, userid, amount, payment_method, transaction_id, status, paid_at, createdAt  

## 2. Auth

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | username, email, password, phonenumber?, **Role** (customer \| owner) | Register; returns insertId |
| POST | /api/auth/login | email, password | Returns { message, **user** } with userid, username, email, Role |

## 3. Cars

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/car/ | All cars |
| GET | /api/car/owner/:userid | Cars by owner |
| GET | /api/car/:id | Car by id |
| POST | /api/car/ | Add car (body: brand, model, year, registration_no, userid, per_day_price, status?) |
| PUT | /api/car/:id | Update car |
| DELETE | /api/car/:id | Delete car |

## 4. Booking

| Method | Endpoint | Body/Query | Description |
|--------|----------|------------|-------------|
| POST | /api/booking/addbooking | userid, carid, pickup_location, drop_location, start_date, end_date, status, total_amount | Create booking |
| GET | /api/booking/getbookingbyuserid/:userid | - | Bookings by customer |
| GET | /api/booking/getbookingbycarid/:carid | - | Bookings for a car (owner view) |
| GET | /api/booking/getbookingbybookingid/:bookingid | - | Single booking |
| GET | /api/booking/getallbookings | - | All bookings |
| PUT | /api/booking/updatebookingstatus | bookingid, status | Update status |
| POST | /api/booking/gettotalamount | carid, startdate, enddate | Returns totalAmount, per_day_price, days |
| GET | /api/booking/checkavailability/:carid | ?startdate=&enddate= | Returns { available: true/false } |
| GET | /api/booking/unavailabledates/:carid | - | Returns [{ start_date, end_date, status }] for that car |

## 5. Payment (dummy)

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | /api/payment/dummy | bookingid, userid, amount, payment_method? | Dummy payment: creates and marks completed |
| POST | /api/payment/create | bookingid, userid, amount, payment_method, transaction_id?, status? | Create payment record |
| PUT | /api/payment/updatestatus | paymentid, status, transaction_id? | Update status |
| GET | /api/payment/byuserid/:userid | - | Payments by user |
| GET | /api/payment/bybookingid/:bookingid | - | Payment for booking |
| GET | /api/payment/getall | - | All payments |

## 6. Roles

- **customer**: Browse cars, check availability, book, dummy pay, see own bookings.
- **owner**: Add/edit cars, see own cars, see bookings and unavailable dates per car.
