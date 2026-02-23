# **MongoDB Guide 🚀**

> Complete MongoDB concepts with definitions and examples

## 📚 **Table of Contents**

- [1. MongoDB Basics](#1-mongodb-basics)
- [2. Mongoose](#2-mongoose)
- [3. CRUD Operations](#3-crud-operations)
- [4. MongoDB with Authentication](#4-mongodb-with-authentication)
- [5. MongoDB with JWT](#5-mongodb-with-jwt)
- [6. Hashing & Security](#6-hashing--security)

---

## **1. MongoDB Basics**

### **Topic: MongoDB**
**Definition:** NoSQL document-oriented database that stores data in flexible, JSON-like documents.

**Example:**
```javascript
// Document structure
{
    _id: ObjectId("507f1f77bcf86cd799439011"),
    username: "john_doe",
    email: "john@example.com",
    age: 25,
    createdAt: ISODate("2024-01-01T00:00:00Z")
}
```

---

### **Topic: Database**
**Definition:** Container for collections, each database has its own set of files on the file system.

**Example:**
```javascript
// Connect to database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myapp');
```

---

### **Topic: Collection**
**Definition:** Group of MongoDB documents, equivalent to a table in relational databases.

**Example:**
```javascript
// Collections: users, products, orders
// Each collection contains multiple documents
```

---

## **2. Mongoose**

### **Topic: Mongoose**
**Definition:** ODM (Object Data Modeling) library for MongoDB and Node.js providing schema-based solution.

**Detailed Explanation:**
Mongoose provides:
- **Schema Definition**: Structure for documents
- **Validation**: Built-in and custom validators
- **Type Casting**: Automatic type conversion
- **Middleware**: Pre/post hooks for operations
- **Query Building**: Chainable query methods
- **Population**: Reference other documents

Why Mongoose?
- Enforces structure on MongoDB (which is schema-less)
- Provides validation before saving
- Simplifies complex queries
- Adds relationships between collections
- Better error handling

**Example:**
```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp');
```

---

### **Topic: Schema**
**Definition:** Structure defining the shape of documents within a collection.

**Example:**
```javascript
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, min: 18 },
    createdAt: { type: Date, default: Date.now }
});
```

---

### **Topic: Model**
**Definition:** Constructor compiled from Schema definition, used to create and read documents.

**Example:**
```javascript
const User = mongoose.model('User', userSchema);

// Now you can use User to interact with database
const newUser = new User({
    username: 'john',
    email: 'john@example.com',
    password: 'hashed_password'
});
```

---

## **3. CRUD Operations**

### **Topic: Create (Insert)**
**Definition:** Adding new documents to a collection.

**Example:**
```javascript
// Create single document
const user = new User({
    username: 'john',
    email: 'john@example.com',
    password: 'password123'
});
await user.save();

// Create multiple documents
await User.insertMany([
    { username: 'alice', email: 'alice@example.com', password: 'pass1' },
    { username: 'bob', email: 'bob@example.com', password: 'pass2' }
]);
```

---

### **Topic: Read (Find)**
**Definition:** Retrieving documents from a collection based on query criteria.

**Example:**
```javascript
// Find all documents
const users = await User.find();

// Find with condition
const user = await User.findOne({ username: 'john' });

// Find by ID
const userById = await User.findById('507f1f77bcf86cd799439011');

// Find with multiple conditions
const adults = await User.find({ age: { $gte: 18 } });
```

---

### **Topic: Update**
**Definition:** Modifying existing documents in a collection.

**Example:**
```javascript
// Update one document
await User.updateOne(
    { username: 'john' },
    { $set: { email: 'newemail@example.com' } }
);

// Update multiple documents
await User.updateMany(
    { age: { $lt: 18 } },
    { $set: { status: 'minor' } }
);

// Find and update
const updatedUser = await User.findOneAndUpdate(
    { username: 'john' },
    { $set: { age: 26 } },
    { new: true } // Return updated document
);
```

---

### **Topic: Delete**
**Definition:** Removing documents from a collection.

**Example:**
```javascript
// Delete one document
await User.deleteOne({ username: 'john' });

// Delete multiple documents
await User.deleteMany({ age: { $lt: 18 } });

// Find and delete
const deletedUser = await User.findOneAndDelete({ username: 'john' });
```

---

## **4. MongoDB with Authentication**

### **Topic: User Authentication with MongoDB**
**Definition:** Storing and verifying user credentials using MongoDB as the database.

**Example:**
```javascript
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/authapp');

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Signup
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({ username, password: hashedPassword });
    await user.save();
    
    res.json({ message: 'User created successfully' });
});

// Signin
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) {
        return res.status(403).json({ message: 'Invalid credentials' });
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    
    if (isValid) {
        res.json({ message: 'Login successful' });
    } else {
        res.status(403).json({ message: 'Invalid credentials' });
    }
});

app.listen(3000);
```

---

## **5. MongoDB with JWT**

### **Topic: JWT Authentication with MongoDB**
**Definition:** Combining MongoDB for data storage with JWT for stateless authentication.

**Example:**
```javascript
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';

// Signin with JWT
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) {
        return res.status(403).json({ message: 'Invalid credentials' });
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    
    if (isValid) {
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(403).json({ message: 'Invalid credentials' });
    }
});

// Protected route
app.get('/me', async (req, res) => {
    const token = req.headers.authorization;
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ username: decoded.username });
        res.json({ username: user.username });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});
```

---

## **6. Hashing & Security**

### **Topic: Hashing**
**Definition:** Converting passwords into irreversible ciphertext for secure storage.

**Detailed Explanation:**
Hashing is a one-way function that:
- Converts plain text to fixed-length string
- Cannot be reversed (decrypted)
- Same input always produces same output
- Small change in input = completely different output

Why Hash Passwords?
- **Security**: Even if database is compromised, passwords are safe
- **Privacy**: Admins cannot see user passwords
- **Compliance**: Required by security standards

Hashing vs Encryption:
| Feature | Hashing | Encryption |
|---------|---------|------------|
| Reversible | No | Yes |
| Key Required | No | Yes |
| Use Case | Passwords | Sensitive data |
| Output Length | Fixed | Variable |

Common Algorithms:
- **bcrypt**: Best for passwords (slow by design)
- **SHA-256**: Fast, not recommended for passwords
- **Argon2**: Modern, very secure

**Example:**
```javascript
const bcrypt = require('bcrypt');

// Hash password
const password = 'myPassword123';
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
console.log(hashedPassword); // $2b$10$...
```

---

### **Topic: Salting**
**Definition:** Adding random string (salt) to password before hashing to prevent rainbow table attacks.

**Example:**
```javascript
// bcrypt automatically handles salting
const password = 'myPassword123';
const hash1 = await bcrypt.hash(password, 10);
const hash2 = await bcrypt.hash(password, 10);

console.log(hash1); // Different hash
console.log(hash2); // Different hash (due to different salts)
```

---

### **Topic: Password Verification**
**Definition:** Comparing plain text password with hashed password to verify credentials.

**Example:**
```javascript
// Signup - Hash password
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({ username, password: hashedPassword });
    await user.save();
    
    res.json({ message: 'User created' });
});

// Signin - Verify password
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) {
        return res.status(403).json({ message: 'User not found' });
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    
    if (isValid) {
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(403).json({ message: 'Invalid password' });
    }
});
```

---

### **Topic: MongoDB Schema Validation**
**Definition:** Enforcing data structure and constraints at the schema level.

**Example:**
```javascript
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [20, 'Username cannot exceed 20 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    age: {
        type: Number,
        min: [18, 'Must be at least 18 years old'],
        max: [100, 'Age cannot exceed 100']
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
```

---

### **Topic: MongoDB Indexes**
**Definition:** Data structures that improve query performance by allowing faster document lookups.

**Example:**
```javascript
// Create index on username field
userSchema.index({ username: 1 }); // 1 for ascending, -1 for descending

// Compound index
userSchema.index({ username: 1, email: 1 });

// Unique index
userSchema.index({ email: 1 }, { unique: true });
```

---

**Happy Coding! 🚀**
