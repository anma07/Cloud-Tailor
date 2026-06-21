## Tables
### Role 
- id
- name

### User
- id
- Username
- Email Address
- Password
- Role_id
- Phone
- Address

### Order
- id
- Customer_id
- Design_id
- Measurements
- Status / Courier Tracking
- Price
- Reviews and Ratings
- Payment Status
- Date Created
- Expected Delivery

### Design
- id
- Name
- Category
- Example images
- Description
- Base Price
- Order Count

### Review
- id
- Design_id
- Customer_id
- Order_id
- Rating
- Comment
- Date Created

## Relationships
User.role_id      → Role.id

Order.customer_id → User.id

Order.tailor_id   → User.id

Order.design_id   → Design.id

Review.order_id   → Order.id

Review.customer_id → User.id