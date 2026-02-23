# **Node.js & Express.js Guide 🚀**

> Complete Node.js and Express.js concepts with definitions and examples

## 📚 **Table of Contents**

- [1. HTTP Server with Express](#1-http-server-with-express)
- [2. Arrow Functions & Array Methods](#2-arrow-functions--array-methods)
- [3. HTTP Requests](#3-http-requests)
- [4. Middleware & CORS](#4-middleware--cors)
- [5. Input Validation with Zod](#5-input-validation-with-zod)
- [6. Fetch & Axios](#6-fetch--axios)
- [7. Basic Authentication](#7-basic-authentication)
- [8. JWT Authentication](#8-jwt-authentication)

---

## **1. HTTP Server with Express**

### **Topic: Express.js**
**Definition:** Fast, unopinionated, minimalist web framework for Node.js used to build web applications and APIs.

**Example:**
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

---

### **Topic: HTTP Methods**
**Definition:** Request methods indicating the desired action to be performed (GET, POST, PUT, DELETE).

**Example:**
```javascript
// GET - Retrieve data
app.get('/users', (req, res) => {
    res.json({ users: [] });
});

// POST - Create data
app.post('/users', (req, res) => {
    res.json({ message: 'User created' });
});

// PUT - Update data
app.put('/users/:id', (req, res) => {
    res.json({ message: 'User updated' });
});

// DELETE - Remove data
app.delete('/users/:id', (req, res) => {
    res.json({ message: 'User deleted' });
});
```

---

### **Topic: Status Codes**
**Definition:** Three-digit codes indicating the result of an HTTP request.

**Example:**
```javascript
app.get('/success', (req, res) => {
    res.status(200).json({ message: 'OK' });
});

app.get('/notfound', (req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

app.post('/error', (req, res) => {
    res.status(500).json({ error: 'Internal Server Error' });
});
```

---

## **2. Arrow Functions & Array Methods**

### **Topic: Arrow Function**
**Definition:** Concise syntax for writing function expressions using => notation.

**Example:**
```javascript
// Traditional function
function sum(a, b) {
    return a + b;
}

// Arrow function
const sum = (a, b) => a + b;

// Usage in Express
app.get('/', (req, res) => {
    res.send('Hello');
});
```

---

### **Topic: map()**
**Definition:** Creates a new array by applying a function to each element of the original array.

**Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

---

### **Topic: filter()**
**Definition:** Creates a new array with elements that pass a test function.

**Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]
```

---

## **3. HTTP Requests**

### **Topic: Request Object (req)**
**Definition:** Object containing information about the HTTP request including headers, body, params, and query.

**Example:**
```javascript
app.post('/user', (req, res) => {
    console.log(req.body);      // Request body
    console.log(req.headers);   // Request headers
    console.log(req.params);    // URL parameters
    console.log(req.query);     // Query parameters
    res.send('Data received');
});
```

---

### **Topic: Response Object (res)**
**Definition:** Object used to send back the desired HTTP response.

**Example:**
```javascript
app.get('/data', (req, res) => {
    res.send('Text response');           // Send text
    res.json({ name: 'John' });          // Send JSON
    res.status(404).send('Not Found');   // Send with status
});
```

---

## **4. Middleware & CORS**

### **Topic: Middleware**
**Definition:** Functions that have access to request, response, and next function in the request-response cycle.

**Detailed Explanation:**
Middleware functions execute in sequence between receiving a request and sending a response. They can:
- Execute any code
- Modify request and response objects
- End the request-response cycle
- Call the next middleware in the stack

Middleware is essential for:
- Authentication/Authorization
- Logging requests
- Parsing request bodies
- Error handling
- CORS handling

**Example:**
```javascript
// Custom middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Pass control to next middleware
};

app.use(logger);

// Built-in middleware
app.use(express.json()); // Parse JSON bodies

// Route-specific middleware
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

app.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Protected data' });
});
```

---

### **Topic: CORS (Cross-Origin Resource Sharing)**
**Definition:** Mechanism allowing restricted resources on a web page to be requested from another domain.

**Detailed Explanation:**
CORS is a security feature implemented by browsers to prevent malicious websites from accessing resources from different origins. Without CORS:
- Frontend (localhost:3000) cannot access Backend (localhost:5000)
- Browser blocks the request for security

Why CORS is needed:
- Modern apps have separate frontend and backend servers
- APIs need to be accessible from different domains
- Mobile apps need to access web APIs

CORS Headers:
- `Access-Control-Allow-Origin`: Which origins can access
- `Access-Control-Allow-Methods`: Which HTTP methods allowed
- `Access-Control-Allow-Headers`: Which headers allowed
- `Access-Control-Allow-Credentials`: Allow cookies/auth

**Example:**
```javascript
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

// Custom CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Multiple origins
const allowedOrigins = ['http://localhost:3000', 'https://myapp.com'];
app.use(cors({
    origin: function(origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
```

---

## **5. Input Validation with Zod**

### **Topic: Zod**
**Definition:** TypeScript-first schema declaration and validation library for runtime data validation.

**Example:**
```javascript
const zod = require('zod');

// Define schema
const userSchema = zod.object({
    username: zod.string().min(3).max(20),
    email: zod.string().email(),
    age: zod.number().min(18)
});

// Validate data
app.post('/signup', (req, res) => {
    const result = userSchema.safeParse(req.body);
    
    if (!result.success) {
        return res.status(400).json({ error: result.error.issues });
    }
    
    res.json({ message: 'Valid data' });
});
```

---

## **6. Fetch & Axios**

### **Topic: Fetch API**
**Definition:** Built-in browser API for making HTTP requests, returns promises.

**Example:**
```javascript
// GET request
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

// POST request
fetch('https://api.example.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'John', email: 'john@example.com' })
})
.then(response => response.json())
.then(data => console.log(data));
```

---

### **Topic: Axios**
**Definition:** Promise-based HTTP client for browser and Node.js with automatic JSON transformation.

**Example:**
```javascript
const axios = require('axios');

// GET request
axios.get('https://api.example.com/data')
    .then(response => console.log(response.data))
    .catch(error => console.error('Error:', error));

// POST request
axios.post('https://api.example.com/users', {
    name: 'John',
    email: 'john@example.com'
})
.then(response => console.log(response.data));
```

---

## **7. Basic Authentication**

### **Topic: Token-Based Authentication**
**Definition:** Authentication method where server generates a token upon successful login, client sends token in subsequent requests.

**Example:**
```javascript
const express = require('express');
const app = express();
app.use(express.json());

const users = [];

// Generate random token
function generateToken() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < 32; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

// Signup
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password });
    res.json({ message: 'User created' });
});

// Signin
app.post('/signin', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        const token = generateToken();
        user.token = token;
        res.json({ token });
    } else {
        res.status(403).json({ message: 'Invalid credentials' });
    }
});

// Protected route
app.get('/me', (req, res) => {
    const token = req.headers.token;
    const user = users.find(u => u.token === token);
    
    if (user) {
        res.json({ username: user.username });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

app.listen(3000);
```

---

## **8. JWT Authentication**

### **Topic: JWT (JSON Web Token)**
**Definition:** Compact, self-contained token for securely transmitting information between parties as a JSON object.

**Detailed Explanation:**
JWT Structure (3 parts separated by dots):
1. **Header**: Algorithm and token type
   ```json
   {"alg": "HS256", "typ": "JWT"}
   ```

2. **Payload**: Claims (user data)
   ```json
   {"username": "john", "role": "admin", "exp": 1516239022}
   ```

3. **Signature**: Verify token integrity
   ```
   HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
   ```

Why JWT?
- **Stateless**: No database lookup needed
- **Self-contained**: All data in token
- **Scalable**: Works across multiple servers
- **Secure**: Signed and optionally encrypted

JWT vs Session:
| Feature | JWT | Session |
|---------|-----|----------|
| Storage | Client-side | Server-side |
| Stateless | Yes | No |
| Scalability | High | Limited |
| Database Query | Not needed | Every request |

**Example:**
```javascript
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';

// Generate JWT
app.post('/signin', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(403).json({ message: 'Invalid credentials' });
    }
});

// Verify JWT
app.get('/me', (req, res) => {
    const token = req.headers.authorization;
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ username: decoded.username });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

// JWT Middleware
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Protected route
app.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});
```

---

**Happy Coding! 🚀**
