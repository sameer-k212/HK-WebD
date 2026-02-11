
## 📚 Additional Resources

- [React Official Documentation](https://react.dev/reference/react)
- [Recoil Documentation](https://recoiljs.org/)
- [100xDevs Course Materials](https://projects.100xdevs.com/)


# **Complete Web Development Guide 🚀**

> Comprehensive full-stack web development concepts from backend to frontend, covering Express.js, MongoDB, React, and modern web technologies.

## 📚 **Table of Contents**

- [1. HTTP Server with Express](#1-http-server-with-express)
- [2. Arrow Functions & Array Methods](#2-arrow-functions--array-methods)
- [3. HTTP Requests](#3-http-requests)
- [4. Middleware & CORS](#4-middleware--cors)
- [5. Input Validation with Zod](#5-input-validation-with-zod)
- [6. Fetch & Axios](#6-fetch--axios)
- [7. Basic Authentication](#7-basic-authentication)
- [8. JWT Authentication](#8-jwt-authentication)
- [9. Databases & MongoDB](#9-databases--mongodb)
- [10. Hashing & Security](#10-hashing--security)
- [11. MongoDB with Authentication](#11-mongodb-with-authentication)
- [12. MongoDB with JWT](#12-mongodb-with-jwt)
- [13. Connecting Frontend to Backend](#13-connecting-frontend-to-backend)
- [14. DOM Manipulation](#14-dom-manipulation)
- [15. React Introduction](#15-react-introduction)
- [16. React Basics](#16-react-basics)
- [17. React Todo App](#17-react-todo-app)
- [18. React Hooks](#18-react-hooks)
- [19. React Router](#19-react-router)
- [20. State Management](#20-state-management)
- [21. Custom Hooks](#21-custom-hooks)
- [22. Recoil Advanced](#22-recoil-advanced)
- [23. React Advanced Patterns](#23-react-advanced-patterns)
- [24. Interview Preparation](#24-interview-preparation)

---

## **1. HTTP Server with Express**

### **What is REST API?**

A REST API (Representational State Transfer Application Programming Interface) is a set of rules and conventions for building and interacting with web services using standard HTTP methods.

### **Creating HTTP Server**

```javascript
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());

// GET Route
app.get('/', function(req, res) {
    res.send("Hello World. <b>First Code...</b>");
});

// JSON Response
app.get('/route-handler', function(req, res) {
    res.json({
        name: "Sameer",
        age: "21"
    });
});

// POST Route
app.post("/conversations", function(req, res) {
    console.log(req.headers);
    console.log(req.body);
    res.send({
        msg: "2 + 2 = 4"
    });
});

const port = 3000;
app.listen(port, function() {
    console.log('Server is running on ' + port);
});
```

**Key Concepts:**
- Express.js framework
- HTTP methods (GET, POST, PUT, DELETE)
- Request and Response objects
- Body parsing with middleware

---

## **2. Arrow Functions & Array Methods**

### **Arrow Functions**

```javascript
// Traditional Function
function sum(a, b) {
    return a + b;
}

// Arrow Function
const sum = (a, b) => {
    return a + b;
}

// Implicit Return
const sum = (a, b) => a + b;

// Usage in Express
app.get('/', (req, res) => {
    res.send('Hello');
});
```

### **Map Method**

```javascript
// Transform array elements
const input = [1, 2, 3, 4, 5];

// Using map
const doubled = input.map(function(i) {
    return i * 2;
});
console.log(doubled); // [2, 4, 6, 8, 10]

// With arrow function
const doubled = input.map(i => i * 2);
```

### **Filter Method**

```javascript
// Filter even numbers
const arr = [1, 2, 3, 4, 5];

const evenNumbers = arr.filter(function(n) {
    return n % 2 === 0;
});
console.log(evenNumbers); // [2, 4]

// Filter strings starting with 'S'
const stringArr = ["Sameer", "Sumit", "Kajal", "Pinki", "Sagar"];
const filtered = stringArr.filter(str => str.startsWith('S'));
console.log(filtered); // ["Sameer", "Sumit", "Sagar"]
```

---

## **3. HTTP Requests**

### **HTTP Methods**

- **GET**: Retrieve data from server
- **POST**: Send data to server
- **PUT**: Update existing data
- **DELETE**: Remove data

### **Status Codes**

- **2xx**: Success (200 OK, 201 Created)
- **3xx**: Redirection (301 Moved Permanently)
- **4xx**: Client Error (400 Bad Request, 404 Not Found, 403 Forbidden)
- **5xx**: Server Error (500 Internal Server Error)

---

## **4. Middleware & CORS**

### **What is Middleware?**

Middleware functions have access to request (`req`), response (`res`), and `next` function in the request-response cycle.

**Middleware can:**
- Modify request/response objects
- End request-response cycle
- Call next middleware function

### **Common Middleware**

```javascript
const express = require('express');
const app = express();

// express.json() - Parse JSON bodies
app.use(express.json());

// Custom Middleware
app.use((req, res, next) => {
    console.log('Request received:', req.method, req.url);
    next();
});

// Route-specific Middleware
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

app.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Protected route' });
});
```

### **CORS (Cross-Origin Resource Sharing)**

```javascript
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

// Custom CORS configuration
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
}));
```

---

## **5. Input Validation with Zod**

### **What is Zod?**

Zod is a TypeScript-first schema declaration and validation library for runtime data validation.

### **Basic Usage**

```javascript
const zod = require('zod');

// Define schema
const userSchema = zod.object({
    username: zod.string().min(3).max(20),
    email: zod.string().email(),
    age: zod.number().min(18).max(100),
    password: zod.string().min(8)
});

// Validate data
app.post('/signup', (req, res) => {
    const result = userSchema.safeParse(req.body);
    
    if (!result.success) {
        return res.status(400).json({
            error: result.error.issues
        });
    }
    
    // Data is valid
    res.json({ message: 'User created successfully' });
});
```

### **Advanced Validation**

```javascript
// Array validation
const arraySchema = zod.array(zod.string());

// Optional fields
const schema = zod.object({
    name: zod.string(),
    age: zod.number().optional()
});

// Custom validation
const passwordSchema = zod.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[0-9]/, "Must contain number");
```

---

## **6. Fetch & Axios**

### **Fetch API**

```javascript
// GET Request
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

// POST Request
fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'John',
        email: 'john@example.com'
    })
})
.then(response => response.json())
.then(data => console.log(data));
```

### **Axios**

```javascript
const axios = require('axios');

// GET Request
axios.get('https://api.example.com/data')
    .then(response => console.log(response.data))
    .catch(error => console.error('Error:', error));

// POST Request
axios.post('https://api.example.com/users', {
    name: 'John',
    email: 'john@example.com'
})
.then(response => console.log(response.data))
.catch(error => console.error('Error:', error));

// With async/await
async function fetchData() {
    try {
        const response = await axios.get('https://api.example.com/data');
        console.log(response.data);
    } catch (error) {
        console.error('Error:', error);
    }
}
```

**Fetch vs Axios:**
- Axios automatically parses JSON
- Axios has better error handling
- Fetch is built-in (no installation needed)
- Axios supports request/response interceptors

---

## **7. Basic Authentication**

### **Token-Based Authentication**

```javascript
const express = require('express');
const app = express();

app.use(express.json());

const users = []; // Store users in memory

// Generate random token
function generateToken() {
    const options = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = "";
    for (let i = 0; i < 32; i++) {
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

// Signup
app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password });
    res.send({ message: "You have signed up" });
});

// Signin
app.post("/signin", (req, res) => {
    const { username, password } = req.body;
    
    const foundUser = users.find(u => 
        u.username === username && u.password === password
    );
    
    if (foundUser) {
        const token = generateToken();
        foundUser.token = token;
        res.json({ token });
    } else {
        res.status(403).send({ message: "Invalid credentials" });
    }
});

// Protected Route
app.get("/me", (req, res) => {
    const token = req.headers.token;
    const foundUser = users.find(u => u.token === token);
    
    if (foundUser) {
        res.json({
            username: foundUser.username
        });
    } else {
        res.json({ message: "Token Invalid" });
    }
});

app.listen(3000);
```

**Authentication Flow:**
1. User signs up with credentials
2. User signs in and receives token
3. Token is sent in headers for protected routes
4. Server validates token and returns user data

---

## **8. JWT Authentication**

### **What is JWT?**

JSON Web Tokens (JWT) are compact, self-contained tokens for securely transmitting information between parties.

**JWT Structure:**
- **Header**: Algorithm and token type
- **Payload**: Claims (user data)
- **Signature**: Verify token integrity

### **Tokens vs JWTs**

| Feature | Tokens | JWTs |
|---------|--------|------|
| Storage | Database required | Self-contained |
| Stateful | Yes | No (Stateless) |
| Database Query | Every request | Not needed |
| Size | Small | Larger |

### **JWT Implementation**

```javascript
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';

// Generate JWT
app.post('/signin', (req, res) => {
    const { username, password } = req.body;
    
    const user = users.find(u => 
        u.username === username && u.password === password
    );
    
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

// Protected route with middleware
app.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});
```

**JWT Benefits:**
- Stateless (no database lookup needed)
- Self-contained (all data in token)
- Scalable
- Cross-domain authentication

---

## **9. Databases & MongoDB**

### **What are Databases?**

Organized collections of data for efficient storage, retrieval, and management.

### **Types of Databases**

1. **Relational (SQL)**: MySQL, PostgreSQL
2. **NoSQL**: MongoDB, Cassandra
3. **Graph**: Neo4j
4. **Vector**: Pinecone (for ML)

### **MongoDB Basics**

```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp');

// Define Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Create Model
const User = mongoose.model('User', userSchema);

// CRUD Operations

// Create
const newUser = new User({
    username: 'john',
    email: 'john@example.com',
    password: 'hashed_password'
});
await newUser.save();

// Read
const users = await User.find();
const user = await User.findOne({ username: 'john' });
const userById = await User.findById(userId);

// Update
await User.updateOne(
    { username: 'john' },
    { $set: { email: 'newemail@example.com' } }
);

// Delete
await User.deleteOne({ username: 'john' });
```

### **MongoDB Setup**

1. Sign up at https://cloud.mongodb.com/
2. Create free M0 cluster
3. Create database user
4. Get connection string
5. Install MongoDB Compass (GUI)

---

## **10. Hashing & Security**

### **Password Hashing**

Hashing converts passwords into irreversible ciphertext for security.

### **Salting**

Adding random string (salt) to password before hashing to prevent rainbow table attacks.

### **Bcrypt Implementation**

```javascript
const bcrypt = require('bcrypt');

// Hash password
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    
    // Generate salt and hash
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const user = new User({
        username,
        password: hashedPassword
    });
    
    await user.save();
    res.json({ message: 'User created' });
});

// Verify password
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

**Security Best Practices:**
- Never store plain text passwords
- Use bcrypt with salt rounds (10-12)
- Validate input before hashing
- Use HTTPS for transmission
- Implement rate limiting

---

## **11. MongoDB with Authentication**

### **Complete Auth System**

```javascript
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        const token = jwt.sign({ username }, 'secret-key');
        res.json({ token });
    } else {
        res.status(403).json({ message: 'Invalid credentials' });
    }
});

app.listen(3000);
```

---

## **12. MongoDB with JWT**

### **Project Structure**

```
project/
├── config/
│   └── config.js
├── db/
│   └── index.js
├── middleware/
│   ├── admin.js
│   └── user.js
├── routes/
│   ├── admin.js
│   └── user.js
└── index.js
```

### **Database Connection**

```javascript
// db/index.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
```

### **Middleware**

```javascript
// middleware/user.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config/config');

function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = userMiddleware;
```

---

## **13. Connecting Frontend to Backend**

### **Backend Setup**

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from backend' });
});

app.listen(3000);
```

### **Frontend (HTML + JavaScript)**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Frontend</title>
</head>
<body>
    <button id="fetchBtn">Fetch Data</button>
    <div id="result"></div>

    <script>
        document.getElementById('fetchBtn').addEventListener('click', async () => {
            const response = await fetch('http://localhost:3000/api/data');
            const data = await response.json();
            document.getElementById('result').textContent = data.message;
        });
    </script>
</body>
</html>
```

---

## **14. DOM Manipulation**

### **Basic DOM Operations**

```javascript
// Select elements
const element = document.getElementById('myId');
const elements = document.querySelectorAll('.myClass');

// Modify content
element.textContent = 'New text';
element.innerHTML = '<strong>Bold text</strong>';

// Modify styles
element.style.color = 'red';
element.style.display = 'none';

// Add/Remove classes
element.classList.add('active');
element.classList.remove('inactive');
element.classList.toggle('visible');

// Create and append elements
const newDiv = document.createElement('div');
newDiv.textContent = 'New element';
document.body.appendChild(newDiv);

// Event listeners
element.addEventListener('click', () => {
    console.log('Clicked!');
});
```

### **Todo App with DOM**

```javascript
let todos = [];

function addTodo() {
    const input = document.getElementById('todoInput');
    todos.push({
        id: Date.now(),
        text: input.value,
        completed: false
    });
    input.value = '';
    render();
}

function render() {
    const container = document.getElementById('todoList');
    container.innerHTML = '';
    
    todos.forEach(todo => {
        const div = document.createElement('div');
        div.innerHTML = `
            <span>${todo.text}</span>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        container.appendChild(div);
    });
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    render();
}
```

---

## **15. React Introduction**

### **Why React?**

- Component-based architecture
- Virtual DOM for performance
- Reusable components
- Large ecosystem
- Declarative UI

### **React vs Vanilla JS**

**Vanilla JS:**
```javascript
// Manual DOM manipulation
document.getElementById('count').textContent = count;
```

**React:**
```javascript
// Declarative state management
const [count, setCount] = useState(0);
return <div>{count}</div>;
```

### **Setting Up React**

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

---

## **16. React Basics**

### **Components**

```javascript
// Functional Component
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

// Using Component
function App() {
    return (
        <div>
            <Welcome name="John" />
            <Welcome name="Jane" />
        </div>
    );
}
```

### **useState Hook**

```javascript
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}
```

### **Props**

```javascript
function UserCard({ name, age, email }) {
    return (
        <div className="card">
            <h2>{name}</h2>
            <p>Age: {age}</p>
            <p>Email: {email}</p>
        </div>
    );
}

// Usage
<UserCard name="John" age={30} email="john@example.com" />
```

### **Conditional Rendering**

```javascript
function Greeting({ isLoggedIn }) {
    return (
        <div>
            {isLoggedIn ? (
                <h1>Welcome back!</h1>
            ) : (
                <h1>Please sign in</h1>
            )}
        </div>
    );
}
```

### **Lists and Keys**

```javascript
function TodoList({ todos }) {
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>{todo.text}</li>
            ))}
        </ul>
    );
}
```

---

## **17. React Todo App**

### **Backend**

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let todos = [];

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const todo = {
        id: Date.now(),
        text: req.body.text,
        completed: false
    };
    todos.push(todo);
    res.json(todo);
});

app.listen(3000);
```

### **Frontend**

```javascript
// CreateTodo.jsx
function CreateTodo() {
    const [text, setText] = useState('');
    
    const addTodo = async () => {
        await fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        setText('');
    };
    
    return (
        <div>
            <input 
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>
        </div>
    );
}

// Todos.jsx
function Todos() {
    const [todos, setTodos] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:3000/todos')
            .then(res => res.json())
            .then(data => setTodos(data));
    }, []);
    
    return (
        <div>
            {todos.map(todo => (
                <div key={todo.id}>{todo.text}</div>
            ))}
        </div>
    );
}
```

---

## **18. React Hooks**

### **useEffect Hook**

```javascript
import { useState, useEffect } from 'react';

function DataFetcher() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Runs after component mounts
        fetch('https://api.example.com/data')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            });
        
        // Cleanup function
        return () => {
            console.log('Component unmounting');
        };
    }, []); // Empty dependency array = run once
    
    if (loading) return <div>Loading...</div>;
    return <div>{JSON.stringify(data)}</div>;
}
```

### **useEffect Dependency Array**

```javascript
// Run once on mount
useEffect(() => {
    console.log('Mounted');
}, []);

// Run on every render
useEffect(() => {
    console.log('Rendered');
});

// Run when count changes
useEffect(() => {
    console.log('Count changed:', count);
}, [count]);

// Multiple dependencies
useEffect(() => {
    console.log('Count or name changed');
}, [count, name]);
```

### **Cleanup in useEffect**

```javascript
useEffect(() => {
    const timer = setInterval(() => {
        console.log('Tick');
    }, 1000);
    
    // Cleanup
    return () => {
        clearInterval(timer);
    };
}, []);
```

---

## **19. React Router**

### **Installation**

```bash
npm install react-router-dom
```

### **Basic Routing**

```javascript
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </nav>
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    );
}
```

### **useNavigate Hook**

```javascript
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    
    const handleLogin = () => {
        // After successful login
        navigate('/dashboard');
    };
    
    return <button onClick={handleLogin}>Login</button>;
}
```

### **Dynamic Routes**

```javascript
<Routes>
    <Route path="/user/:id" element={<UserProfile />} />
</Routes>

// In UserProfile component
import { useParams } from 'react-router-dom';

function UserProfile() {
    const { id } = useParams();
    return <div>User ID: {id}</div>;
}
```

### **Lazy Loading**

```javascript
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./components/Dashboard'));
const Landing = lazy(() => import('./components/Landing'));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
```

---

## **20. State Management**

### **Prop Drilling Problem**

```javascript
// Problem: Passing props through multiple levels
function App() {
    const [user, setUser] = useState({ name: 'John' });
    return <Parent user={user} />;
}

function Parent({ user }) {
    return <Child user={user} />;
}

function Child({ user }) {
    return <GrandChild user={user} />;
}

function GrandChild({ user }) {
    return <div>{user.name}</div>;
}
```

### **Context API Solution**

```javascript
import { createContext, useContext, useState } from 'react';

// Create Context
const UserContext = createContext();

// Provider Component
function App() {
    const [user, setUser] = useState({ name: 'John' });
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Parent />
        </UserContext.Provider>
    );
}

// Consumer Component
function GrandChild() {
    const { user } = useContext(UserContext);
    return <div>{user.name}</div>;
}
```

### **Recoil State Management**

```javascript
// Install: npm install recoil

// atoms/count.jsx
import { atom } from 'recoil';

export const countState = atom({
    key: 'countState',
    default: 0
});

// App.jsx
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { countState } from './atoms/count';

function App() {
    return (
        <RecoilRoot>
            <Counter />
            <Display />
        </RecoilRoot>
    );
}

function Counter() {
    const [count, setCount] = useRecoilState(countState);
    return (
        <button onClick={() => setCount(count + 1)}>
            Count: {count}
        </button>
    );
}

function Display() {
    const count = useRecoilValue(countState);
    return <div>Current count: {count}</div>;
}
```

---

## **21. Custom Hooks**

### **useCounter Hook**

```javascript
function useCounter(initialValue = 0) {
    const [count, setCount] = useState(initialValue);
    
    const increment = () => setCount(c => c + 1);
    const decrement = () => setCount(c => c - 1);
    const reset = () => setCount(initialValue);
    
    return { count, increment, decrement, reset };
}

// Usage
function Counter() {
    const { count, increment, decrement, reset } = useCounter(0);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}
```

### **useFetch Hook**

```javascript
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [url]);
    
    return { data, loading, error };
}

// Usage
function DataDisplay() {
    const { data, loading, error } = useFetch('https://api.example.com/data');
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return <div>{JSON.stringify(data)}</div>;
}
```

### **useDebounce Hook**

```javascript
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        
        return () => clearTimeout(timer);
    }, [value, delay]);
    
    return debouncedValue;
}

// Usage
function SearchInput() {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);
    
    useEffect(() => {
        if (debouncedSearch) {
            // API call with debounced value
            console.log('Searching for:', debouncedSearch);
        }
    }, [debouncedSearch]);
    
    return (
        <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
        />
    );
}
```

### **usePrevious Hook**

```javascript
function usePrevious(value) {
    const ref = useRef();
    
    useEffect(() => {
        ref.current = value;
    }, [value]);
    
    return ref.current;
}

// Usage
function Counter() {
    const [count, setCount] = useState(0);
    const prevCount = usePrevious(count);
    
    return (
        <div>
            <p>Current: {count}</p>
            <p>Previous: {prevCount}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}
```

---

## **22. Recoil Advanced**

### **Selectors**

```javascript
import { selector } from 'recoil';
import { countState } from './atoms/count';

export const doubleCountState = selector({
    key: 'doubleCountState',
    get: ({ get }) => {
        const count = get(countState);
        return count * 2;
    }
});

// Usage
function Display() {
    const doubleCount = useRecoilValue(doubleCountState);
    return <div>Double: {doubleCount}</div>;
}
```

### **atomFamily**

```javascript
import { atomFamily } from 'recoil';

export const todoState = atomFamily({
    key: 'todoState',
    default: (id) => ({
        id,
        text: '',
        completed: false
    })
});

// Usage
function Todo({ id }) {
    const [todo, setTodo] = useRecoilState(todoState(id));
    
    return (
        <div>
            <input 
                value={todo.text}
                onChange={(e) => setTodo({ ...todo, text: e.target.value })}
            />
        </div>
    );
}
```

### **React.memo for Performance**

```javascript
import { memo } from 'react';

const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
    console.log('Rendering ExpensiveComponent');
    return <div>{data}</div>;
});

// Component only re-renders when props change
```

---

## **23. React Advanced Patterns**

### **Error Boundaries**

```javascript
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    
    componentDidCatch(error, errorInfo) {
        console.log('Error:', error, errorInfo);
    }
    
    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

// Usage
<ErrorBoundary>
    <MyComponent />
</ErrorBoundary>
```

### **Children Props Pattern**

```javascript
function Card({ children }) {
    return (
        <div className="card">
            {children}
        </div>
    );
}

// Usage
<Card>
    <h2>Title</h2>
    <p>Content</p>
    <button>Action</button>
</Card>
```

### **Render Props Pattern**

```javascript
function DataProvider({ render }) {
    const [data, setData] = useState(null);
    
    useEffect(() => {
        fetchData().then(setData);
    }, []);
    
    return render(data);
}

// Usage
<DataProvider 
    render={(data) => (
        <div>{data ? data.name : 'Loading...'}</div>
    )}
/>
```

---

## **24. Interview Preparation for Infosys L3 Specialist Programmer**

### **Backend Interview Questions**

#### **Q1: Explain Middleware in Express.js**

**Answer:** Middleware functions have access to request, response, and next function. They can:
- Execute code
- Modify req/res objects
- End request-response cycle
- Call next middleware

```javascript
// Example
app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});
```

#### **Q2: What is CORS and why is it needed?**

**Answer:** CORS (Cross-Origin Resource Sharing) allows servers to specify which origins can access resources. Needed when frontend and backend are on different domains.

```javascript
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
```

#### **Q3: Difference between Authentication and Authorization**

**Answer:**
- **Authentication**: Verifying identity (who you are)
- **Authorization**: Verifying permissions (what you can do)

#### **Q4: JWT vs Session-based Authentication**

| Feature | JWT | Session |
|---------|-----|---------|
| Storage | Client-side | Server-side |
| Stateless | Yes | No |
| Scalability | Better | Limited |
| Security | Token can be stolen | More secure |

#### **Q5: Explain MongoDB Schema Design**

**Answer:** Schema defines structure of documents in collection.

```javascript
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    age: { type: Number, min: 18 },
    createdAt: { type: Date, default: Date.now }
});
```

#### **Q6: What is bcrypt and why use it?**

**Answer:** Bcrypt is a password hashing function that:
- Adds salt automatically
- Computationally expensive (prevents brute force)
- One-way encryption

```javascript
const hashedPassword = await bcrypt.hash(password, 10);
const isValid = await bcrypt.compare(password, hashedPassword);
```

#### **Q7: Explain Input Validation with Zod**

**Answer:** Zod provides runtime type checking and validation.

```javascript
const schema = zod.object({
    email: zod.string().email(),
    age: zod.number().min(18)
});

const result = schema.safeParse(data);
if (!result.success) {
    // Handle validation errors
}
```

---

### **Frontend/React Interview Questions**

#### **Q8: What is Virtual DOM?**

**Answer:** Virtual DOM is a lightweight copy of actual DOM. React:
1. Creates Virtual DOM
2. Compares with previous version (diffing)
3. Updates only changed parts in real DOM

**Benefits:**
- Faster updates
- Better performance
- Batch updates

#### **Q9: Explain useState Hook**

**Answer:** useState manages component state.

```javascript
const [count, setCount] = useState(0);
// count: current state
// setCount: function to update state
// 0: initial value
```

**Key Points:**
- State updates trigger re-render
- State updates are asynchronous
- Use functional updates for dependent state

```javascript
setCount(prevCount => prevCount + 1);
```

#### **Q10: Explain useEffect Hook**

**Answer:** useEffect handles side effects (API calls, subscriptions, timers).

```javascript
useEffect(() => {
    // Effect code
    return () => {
        // Cleanup
    };
}, [dependencies]);
```

**Dependency Array:**
- `[]`: Run once on mount
- `[dep]`: Run when dep changes
- No array: Run on every render

#### **Q11: What is Prop Drilling and how to solve it?**

**Answer:** Prop drilling is passing props through multiple levels.

**Solutions:**
1. **Context API**
```javascript
const UserContext = createContext();
<UserContext.Provider value={user}>
    <Child />
</UserContext.Provider>
```

2. **State Management (Recoil/Redux)**
```javascript
const [user] = useRecoilState(userState);
```

#### **Q12: Explain React Component Lifecycle**

**Answer:**

**Functional Components (Hooks):**
```javascript
useEffect(() => {
    // componentDidMount
    return () => {
        // componentWillUnmount
    };
}, []);

useEffect(() => {
    // componentDidUpdate
}, [dependency]);
```

**Class Components:**
- componentDidMount
- componentDidUpdate
- componentWillUnmount

#### **Q13: What is React Router?**

**Answer:** React Router enables client-side routing.

```javascript
<BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
    </Routes>
</BrowserRouter>
```

**Key Hooks:**
- `useNavigate()`: Programmatic navigation
- `useParams()`: Access URL parameters
- `useLocation()`: Access current location

#### **Q14: Explain Custom Hooks**

**Answer:** Custom hooks extract reusable logic.

```javascript
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(setData)
            .finally(() => setLoading(false));
    }, [url]);
    
    return { data, loading };
}
```

**Benefits:**
- Code reusability
- Separation of concerns
- Cleaner components

#### **Q15: What is Lazy Loading in React?**

**Answer:** Lazy loading loads components only when needed.

```javascript
const Dashboard = lazy(() => import('./Dashboard'));

<Suspense fallback={<Loading />}>
    <Dashboard />
</Suspense>
```

**Benefits:**
- Smaller initial bundle
- Faster initial load
- Better performance

---

### **Full Stack Interview Questions**

#### **Q16: Explain REST API**

**Answer:** REST (Representational State Transfer) uses HTTP methods:

- **GET**: Retrieve data
- **POST**: Create data
- **PUT**: Update data
- **DELETE**: Remove data

```javascript
app.get('/users', (req, res) => {});
app.post('/users', (req, res) => {});
app.put('/users/:id', (req, res) => {});
app.delete('/users/:id', (req, res) => {});
```

#### **Q17: How to connect Frontend to Backend?**

**Answer:**

**Backend:**
```javascript
const cors = require('cors');
app.use(cors());

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello' });
});
```

**Frontend:**
```javascript
useEffect(() => {
    fetch('http://localhost:3000/api/data')
        .then(res => res.json())
        .then(data => setData(data));
}, []);
```

#### **Q18: Explain Error Handling in Full Stack**

**Answer:**

**Backend:**
```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
```

**Frontend:**
```javascript
try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed');
    const data = await response.json();
} catch (error) {
    setError(error.message);
}
```

#### **Q19: What is Environment Variables?**

**Answer:** Store sensitive data outside code.

```javascript
// .env file
DATABASE_URL=mongodb://localhost:27017/myapp
JWT_SECRET=mysecretkey

// Usage
require('dotenv').config();
const dbUrl = process.env.DATABASE_URL;
```

#### **Q20: Explain API Security Best Practices**

**Answer:**
1. **Use HTTPS**
2. **Validate Input** (Zod)
3. **Hash Passwords** (bcrypt)
4. **Use JWT** for authentication
5. **Rate Limiting**
6. **CORS Configuration**
7. **Environment Variables**
8. **SQL Injection Prevention**

```javascript
// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);
```

---

### **Coding Problems**

#### **Problem 1: Implement Authentication System**

```javascript
// Complete auth with signup, signin, protected routes
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/auth');

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.json({ message: 'User created' });
});

app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(403).json({ error: 'Invalid' });
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(403).json({ error: 'Invalid' });
    
    const token = jwt.sign({ username }, 'secret');
    res.json({ token });
});

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

app.get('/protected', auth, (req, res) => {
    res.json({ message: 'Protected data', user: req.user });
});

app.listen(3000);
```

#### **Problem 2: Build Todo App with React**

```javascript
// Frontend
function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    
    useEffect(() => {
        fetch('http://localhost:3000/todos')
            .then(res => res.json())
            .then(setTodos);
    }, []);
    
    const addTodo = async () => {
        const response = await fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input })
        });
        const newTodo = await response.json();
        setTodos([...todos, newTodo]);
        setInput('');
    };
    
    return (
        <div>
            <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>{todo.text}</li>
                ))}
            </ul>
        </div>
    );
}
```

#### **Problem 3: Implement Custom Hook**

```javascript
// useFetch with refetch capability
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const result = await response.json();
            setData(result);
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [url]);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    return { data, loading, error, refetch: fetchData };
}
```

---

### **System Design Questions**

#### **Q21: Design a Todo Application**

**Architecture:**
```
Frontend (React)
    ↓
Backend (Express)
    ↓
Database (MongoDB)
```

**Components:**
1. **Frontend:**
   - CreateTodo component
   - TodoList component
   - TodoItem component

2. **Backend:**
   - GET /todos
   - POST /todos
   - PUT /todos/:id
   - DELETE /todos/:id

3. **Database:**
   - todos collection
   - Schema: { id, text, completed, userId }

#### **Q22: Design Authentication Flow**

**Flow:**
1. User signs up → Hash password → Store in DB
2. User signs in → Verify password → Generate JWT
3. User accesses protected route → Verify JWT → Return data

**Security:**
- HTTPS
- Password hashing (bcrypt)
- JWT with expiration
- Refresh tokens
- Rate limiting

---

### **Best Practices**

#### **Backend Best Practices**

1. **Error Handling**
```javascript
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});
```

2. **Input Validation**
```javascript
const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8)
});
```

3. **Environment Variables**
```javascript
require('dotenv').config();
const PORT = process.env.PORT || 3000;
```

4. **Logging**
```javascript
const morgan = require('morgan');
app.use(morgan('combined'));
```

#### **Frontend Best Practices**

1. **Component Structure**
```
src/
├── components/
├── hooks/
├── utils/
├── pages/
└── App.jsx
```

2. **State Management**
- Use Context for global state
- Use Recoil for complex state
- Keep state close to where it's used

3. **Performance**
- Use React.memo for expensive components
- Lazy load routes
- Debounce search inputs
- Use useCallback for functions

4. **Error Handling**
```javascript
<ErrorBoundary>
    <App />
</ErrorBoundary>
```

---

### **Quick Reference**

#### **Express.js Cheat Sheet**

```javascript
// Setup
const express = require('express');
const app = express();
app.use(express.json());

// Routes
app.get('/path', (req, res) => {});
app.post('/path', (req, res) => {});
app.put('/path/:id', (req, res) => {});
app.delete('/path/:id', (req, res) => {});

// Middleware
app.use(middleware);
app.use('/path', middleware);

// Error handling
app.use((err, req, res, next) => {});

// Start server
app.listen(3000);
```

#### **React Hooks Cheat Sheet**

```javascript
// useState
const [state, setState] = useState(initialValue);

// useEffect
useEffect(() => {
    // effect
    return () => {}; // cleanup
}, [dependencies]);

// useContext
const value = useContext(MyContext);

// useRef
const ref = useRef(initialValue);

// useCallback
const memoizedCallback = useCallback(() => {}, [deps]);

// useMemo
const memoizedValue = useMemo(() => computeExpensiveValue(), [deps]);
```

#### **MongoDB Cheat Sheet**

```javascript
// Connect
mongoose.connect('mongodb://localhost:27017/db');

// Schema
const schema = new mongoose.Schema({
    field: { type: String, required: true }
});

// Model
const Model = mongoose.model('Model', schema);

// CRUD
await Model.create(data);
await Model.find();
await Model.findOne({ field: value });
await Model.findById(id);
await Model.updateOne({ field: value }, { $set: { field: newValue } });
await Model.deleteOne({ field: value });
```

---

## **Resources**

### **Documentation**
- [Express.js](https://expressjs.com/)
- [React](https://react.dev/)
- [MongoDB](https://www.mongodb.com/docs/)
- [Mongoose](https://mongoosejs.com/)
- [Recoil](https://recoiljs.org/)
- [React Router](https://reactrouter.com/)

### **Learning Platforms**
- [100xDevs](https://app.100xdevs.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [freeCodeCamp](https://www.freecodecamp.org/)

### **Practice**
- Build full-stack projects
- Contribute to open source
- Solve coding challenges
- Create portfolio projects

---

**Good Luck with Your Infosys L3 Specialist Programmer Interview! 🚀**

**Key Topics to Focus:**
1. Express.js & REST APIs
2. MongoDB & Mongoose
3. Authentication (JWT, bcrypt)
4. React Hooks (useState, useEffect)
5. State Management (Context, Recoil)
6. React Router
7. Custom Hooks
8. Error Handling
9. Security Best Practices
10. Full Stack Integration


---

## **📖 Detailed Definitions & Concepts**

### **Backend Development Concepts**

#### **1. HTTP & Web Fundamentals**
- **HTTP (Hypertext Transfer Protocol)**: Protocol for transmitting data over the web.
- **HTTPS**: Secure version of HTTP using SSL/TLS encryption.
- **Request**: Message sent from client to server.
- **Response**: Message sent from server to client.
- **Status Codes**: Three-digit codes indicating request outcome (200, 404, 500, etc.).
- **Headers**: Metadata sent with requests and responses.
- **Body**: Main content of request or response.
- **Query Parameters**: Key-value pairs in URL after ? symbol.
- **URL Parameters**: Dynamic segments in URL path.
- **REST (Representational State Transfer)**: Architectural style for designing networked applications.
- **API (Application Programming Interface)**: Set of rules for building and interacting with software.
- **Endpoint**: Specific URL where API can be accessed.
- **Route**: Path that maps to specific handler function.
- **HTTP Methods**: GET (retrieve), POST (create), PUT (update), DELETE (remove), PATCH (partial update).
- **Idempotent**: Operation that produces same result regardless of how many times executed.
- **CRUD**: Create, Read, Update, Delete operations.

#### **2. Express.js**
- **Express**: Fast, unopinionated web framework for Node.js.
- **app**: Express application instance.
- **app.listen()**: Starts server listening on specified port.
- **app.get()**: Defines route handler for GET requests.
- **app.post()**: Defines route handler for POST requests.
- **app.put()**: Defines route handler for PUT requests.
- **app.delete()**: Defines route handler for DELETE requests.
- **app.use()**: Mounts middleware function or router.
- **req (Request Object)**: Contains information about HTTP request.
- **req.body**: Contains data sent in request body.
- **req.params**: Contains route parameters.
- **req.query**: Contains query string parameters.
- **req.headers**: Contains request headers.
- **res (Response Object)**: Used to send response to client.
- **res.send()**: Sends response of various types.
- **res.json()**: Sends JSON response.
- **res.status()**: Sets HTTP status code.
- **res.redirect()**: Redirects to different URL.
- **next()**: Function to pass control to next middleware.
- **Router**: Mini-application for organizing routes.
- **Static Files**: Files served directly without processing (CSS, images, JS).

#### **3. Middleware**
- **Middleware**: Functions with access to req, res, and next in request-response cycle.
- **Application-level Middleware**: Bound to app instance using app.use().
- **Router-level Middleware**: Bound to router instance.
- **Error-handling Middleware**: Special middleware with four parameters (err, req, res, next).
- **Built-in Middleware**: Middleware provided by Express (express.json(), express.static()).
- **Third-party Middleware**: Middleware from npm packages (cors, morgan, helmet).
- **express.json()**: Parses incoming JSON payloads.
- **express.urlencoded()**: Parses URL-encoded payloads.
- **body-parser**: Middleware for parsing request bodies (now built into Express).
- **Middleware Chain**: Series of middleware functions executed in order.
- **next()**: Passes control to next middleware in chain.
- **Middleware Order**: Order matters - middleware executes in order defined.

#### **4. CORS (Cross-Origin Resource Sharing)**
- **CORS**: Mechanism allowing restricted resources to be requested from another domain.
- **Origin**: Combination of protocol, domain, and port.
- **Same-Origin Policy**: Security measure restricting how documents/scripts from one origin interact with resources from another.
- **Preflight Request**: OPTIONS request sent before actual request to check if CORS is allowed.
- **Access-Control-Allow-Origin**: Header specifying which origins can access resource.
- **Access-Control-Allow-Methods**: Header specifying allowed HTTP methods.
- **Access-Control-Allow-Headers**: Header specifying allowed request headers.
- **Access-Control-Allow-Credentials**: Header indicating if credentials can be included.
- **cors Package**: Express middleware for enabling CORS.
- **CORS Configuration**: Options for customizing CORS behavior (origin, methods, credentials).

#### **5. Authentication & Authorization**
- **Authentication**: Process of verifying identity of user.
- **Authorization**: Process of verifying what user has access to.
- **Credentials**: Information used to authenticate (username, password).
- **Token**: String representing authentication state.
- **Session**: Server-side storage of user state.
- **Stateless**: Server doesn't store client state between requests.
- **Stateful**: Server maintains client state between requests.
- **Bearer Token**: Token sent in Authorization header.
- **Basic Authentication**: Simple authentication using username and password in header.
- **Token-based Authentication**: Authentication using tokens instead of sessions.
- **Session-based Authentication**: Authentication using server-side sessions.

#### **6. JWT (JSON Web Tokens)**
- **JWT**: Compact, self-contained way to securely transmit information as JSON object.
- **Header**: Contains token type and hashing algorithm.
- **Payload**: Contains claims (user data, expiration, etc.).
- **Signature**: Verifies token hasn't been tampered with.
- **Claims**: Statements about entity (user) and additional data.
- **iss (Issuer)**: Who issued the token.
- **sub (Subject)**: Who the token is about.
- **aud (Audience)**: Who the token is intended for.
- **exp (Expiration)**: When token expires.
- **iat (Issued At)**: When token was issued.
- **jwt.sign()**: Creates and signs new JWT.
- **jwt.verify()**: Verifies and decodes JWT.
- **jwt.decode()**: Decodes JWT without verification.
- **Secret Key**: Key used to sign and verify tokens.
- **Token Expiration**: Time after which token is no longer valid.
- **Refresh Token**: Long-lived token used to obtain new access tokens.
- **Access Token**: Short-lived token used to access protected resources.

#### **7. Security**
- **Hashing**: One-way function converting data into fixed-size string.
- **Encryption**: Two-way process of encoding data.
- **Salt**: Random data added to input before hashing.
- **bcrypt**: Password hashing function with built-in salt.
- **Salt Rounds**: Number of iterations for bcrypt algorithm.
- **Rainbow Table**: Precomputed table for reversing cryptographic hash functions.
- **Hash Collision**: When two inputs produce same hash output.
- **Password Policy**: Rules for creating strong passwords.
- **Rate Limiting**: Limiting number of requests from client.
- **Brute Force Attack**: Trying many passwords until correct one found.
- **SQL Injection**: Attack inserting malicious SQL code.
- **XSS (Cross-Site Scripting)**: Attack injecting malicious scripts.
- **CSRF (Cross-Site Request Forgery)**: Attack forcing user to execute unwanted actions.
- **Input Validation**: Checking user input before processing.
- **Sanitization**: Cleaning user input to remove dangerous characters.
- **HTTPS**: Encrypted HTTP connection.
- **SSL/TLS**: Protocols for secure communication.
- **Environment Variables**: Configuration values stored outside code.
- **.env File**: File storing environment variables.
- **dotenv**: Package for loading environment variables from .env file.

#### **8. Input Validation**
- **Validation**: Checking if data meets requirements.
- **Schema**: Definition of data structure and rules.
- **Zod**: TypeScript-first schema validation library.
- **zod.object()**: Defines object schema.
- **zod.string()**: Defines string schema.
- **zod.number()**: Defines number schema.
- **zod.boolean()**: Defines boolean schema.
- **zod.array()**: Defines array schema.
- **zod.enum()**: Defines enum schema.
- **zod.optional()**: Makes field optional.
- **zod.nullable()**: Allows null value.
- **zod.min()**: Sets minimum value/length.
- **zod.max()**: Sets maximum value/length.
- **zod.email()**: Validates email format.
- **zod.url()**: Validates URL format.
- **zod.regex()**: Validates against regular expression.
- **safeParse()**: Parses data and returns result object.
- **parse()**: Parses data and throws error if invalid.
- **Validation Errors**: Errors returned when validation fails.
- **Error Messages**: Custom messages for validation failures.

#### **9. Databases**
- **Database**: Organized collection of structured data.
- **DBMS (Database Management System)**: Software for managing databases.
- **SQL (Structured Query Language)**: Language for managing relational databases.
- **NoSQL**: Non-relational databases with flexible schemas.
- **Relational Database**: Database using tables with relationships (MySQL, PostgreSQL).
- **Document Database**: Database storing data as documents (MongoDB).
- **Key-Value Store**: Database storing data as key-value pairs (Redis).
- **Graph Database**: Database storing data as nodes and edges (Neo4j).
- **Schema**: Structure defining organization of data.
- **Collection**: Group of documents in MongoDB (like table in SQL).
- **Document**: Record in MongoDB (like row in SQL).
- **Field**: Key-value pair in document (like column in SQL).
- **Primary Key**: Unique identifier for record.
- **Foreign Key**: Field referencing primary key in another table.
- **Index**: Data structure improving query performance.
- **Query**: Request for data from database.
- **CRUD Operations**: Create, Read, Update, Delete operations.

#### **10. MongoDB**
- **MongoDB**: NoSQL document database.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Schema**: Mongoose schema defining document structure.
- **Model**: Mongoose model representing collection.
- **Document**: Instance of Mongoose model.
- **mongoose.connect()**: Connects to MongoDB database.
- **mongoose.Schema()**: Creates new schema.
- **mongoose.model()**: Creates model from schema.
- **Schema Types**: String, Number, Date, Boolean, ObjectId, Array, etc.
- **Schema Options**: required, unique, default, min, max, enum, etc.
- **Validators**: Functions checking if value is valid.
- **save()**: Saves document to database.
- **find()**: Retrieves all documents matching query.
- **findOne()**: Retrieves first document matching query.
- **findById()**: Retrieves document by ID.
- **updateOne()**: Updates first document matching query.
- **updateMany()**: Updates all documents matching query.
- **deleteOne()**: Deletes first document matching query.
- **deleteMany()**: Deletes all documents matching query.
- **$set**: Update operator setting field value.
- **$inc**: Update operator incrementing field value.
- **$push**: Update operator adding element to array.
- **$pull**: Update operator removing element from array.
- **Populate**: Replacing references with actual documents.
- **Virtual**: Field not stored in database but computed.
- **Middleware (Hooks)**: Functions executed at specific stages (pre, post).
- **Connection String**: URL for connecting to MongoDB.
- **MongoDB Atlas**: Cloud-hosted MongoDB service.
- **MongoDB Compass**: GUI for MongoDB.

---

### **Frontend Development Concepts**

#### **11. React Fundamentals**
- **React**: JavaScript library for building user interfaces.
- **Component**: Reusable piece of UI.
- **JSX (JavaScript XML)**: Syntax extension allowing HTML-like code in JavaScript.
- **Virtual DOM**: Lightweight copy of actual DOM for efficient updates.
- **Reconciliation**: Process of updating DOM to match Virtual DOM.
- **Diffing Algorithm**: Algorithm comparing Virtual DOM trees.
- **Props**: Data passed from parent to child component.
- **State**: Data managed within component.
- **Unidirectional Data Flow**: Data flows from parent to child.
- **Component Lifecycle**: Series of phases component goes through.
- **Mounting**: Component being created and inserted into DOM.
- **Updating**: Component being re-rendered due to state/props changes.
- **Unmounting**: Component being removed from DOM.
- **Functional Component**: Component defined as function.
- **Class Component**: Component defined as ES6 class.
- **Pure Component**: Component that only re-renders when props/state change.
- **Controlled Component**: Form element whose value is controlled by React state.
- **Uncontrolled Component**: Form element that maintains its own state.
- **Fragment**: Wrapper component that doesn't add extra DOM nodes.
- **Key**: Special attribute helping React identify which items changed.
- **Children Props**: Special prop containing content between component tags.
- **Composition**: Building complex UIs from smaller components.
- **Conditional Rendering**: Rendering different content based on conditions.
- **Lists**: Rendering multiple similar components from array.

#### **12. React Hooks**
- **Hooks**: Functions letting you use state and lifecycle in functional components.
- **useState**: Hook for adding state to functional components.
- **State Variable**: Variable holding component state.
- **State Setter**: Function to update state variable.
- **Initial State**: Starting value for state variable.
- **Lazy Initial State**: Function computing initial state only once.
- **useEffect**: Hook for side effects in functional components.
- **Side Effect**: Operation affecting something outside component scope.
- **Effect Function**: Function containing side effect code.
- **Cleanup Function**: Function cleaning up side effects.
- **Dependency Array**: Array specifying when effect should run.
- **Empty Dependency Array**: Effect runs only on mount.
- **No Dependency Array**: Effect runs on every render.
- **useContext**: Hook for consuming context values.
- **useRef**: Hook for creating mutable reference persisting across renders.
- **Ref**: Object with current property holding mutable value.
- **useCallback**: Hook for memoizing callback functions.
- **useMemo**: Hook for memoizing computed values.
- **useReducer**: Hook for complex state logic using reducer function.
- **useLayoutEffect**: Hook similar to useEffect but fires synchronously after DOM mutations.
- **useImperativeHandle**: Hook for customizing instance value exposed to parent.
- **useDebugValue**: Hook for displaying label in React DevTools.
- **Custom Hooks**: User-defined hooks extracting reusable logic.
- **Rules of Hooks**: Hooks must be called at top level and only in React functions.

#### **13. React Router**
- **React Router**: Library for routing in React applications.
- **Routing**: Mapping URLs to components.
- **Client-Side Routing**: Routing handled by JavaScript without page reload.
- **BrowserRouter**: Router using HTML5 history API.
- **HashRouter**: Router using URL hash.
- **Routes**: Container for Route components.
- **Route**: Component rendering UI when path matches.
- **Link**: Component for navigation without page reload.
- **NavLink**: Link with active state styling.
- **Navigate**: Component for programmatic navigation.
- **useNavigate**: Hook for programmatic navigation.
- **useParams**: Hook for accessing URL parameters.
- **useLocation**: Hook for accessing current location object.
- **useSearchParams**: Hook for reading and writing query parameters.
- **Outlet**: Component rendering child routes.
- **Layout Route**: Route wrapping other routes with common layout.
- **Index Route**: Default child route.
- **Dynamic Routes**: Routes with parameters.
- **Nested Routes**: Routes within other routes.
- **Protected Routes**: Routes requiring authentication.
- **Lazy Loading**: Loading components only when needed.
- **Code Splitting**: Breaking code into smaller chunks loaded on demand.
- **Suspense**: Component for handling loading states of lazy components.

#### **14. State Management**
- **State Management**: Managing and sharing state across application.
- **Local State**: State managed within single component.
- **Global State**: State shared across multiple components.
- **Prop Drilling**: Passing props through multiple levels of components.
- **Context API**: React's built-in solution for sharing state.
- **Context**: Object holding data accessible to component tree.
- **Provider**: Component providing context value to children.
- **Consumer**: Component consuming context value.
- **useContext**: Hook for consuming context.
- **createContext**: Function creating new context.
- **Context Value**: Data stored in context.
- **Context Update**: Changing context value triggers re-render of consumers.

#### **15. Recoil**
- **Recoil**: State management library for React.
- **Atom**: Unit of state that components can subscribe to.
- **Selector**: Pure function deriving state from atoms or other selectors.
- **RecoilRoot**: Component wrapping app to provide Recoil state.
- **useRecoilState**: Hook for reading and writing atom value.
- **useRecoilValue**: Hook for reading atom value.
- **useSetRecoilState**: Hook for writing atom value.
- **useResetRecoilState**: Hook for resetting atom to default value.
- **atomFamily**: Function creating atoms dynamically based on parameters.
- **selectorFamily**: Function creating selectors dynamically based on parameters.
- **Atom Key**: Unique identifier for atom.
- **Default Value**: Initial value of atom.
- **Atom Effects**: Side effects attached to atoms.
- **Snapshot**: Immutable snapshot of Recoil state.
- **useRecoilCallback**: Hook for reading/writing Recoil state in callback.
- **Loadable**: Object representing async state (loading, hasValue, hasError).
- **useRecoilValueLoadable**: Hook for reading atom with loading state.
- **Suspense Integration**: Recoil works with React Suspense for async data.

#### **16. Performance Optimization**
- **Memoization**: Caching results of expensive computations.
- **React.memo**: HOC preventing unnecessary re-renders of functional components.
- **useMemo**: Hook memoizing computed values.
- **useCallback**: Hook memoizing callback functions.
- **PureComponent**: Class component with shallow prop/state comparison.
- **shouldComponentUpdate**: Lifecycle method controlling re-renders.
- **Code Splitting**: Breaking code into smaller chunks.
- **Lazy Loading**: Loading components/resources only when needed.
- **Dynamic Import**: Importing modules dynamically using import().
- **React.lazy**: Function for lazy loading components.
- **Suspense**: Component handling loading states.
- **Virtualization**: Rendering only visible items in long lists.
- **Debouncing**: Delaying function execution until pause in events.
- **Throttling**: Limiting function execution frequency.
- **Bundle Size**: Total size of JavaScript files.
- **Tree Shaking**: Removing unused code from bundle.
- **Minification**: Reducing code size by removing whitespace.
- **Compression**: Reducing file size using gzip/brotli.
- **Caching**: Storing resources for faster subsequent loads.
- **Service Worker**: Script running in background for offline functionality.

#### **17. Advanced React Patterns**
- **Higher-Order Component (HOC)**: Function taking component and returning enhanced component.
- **Render Props**: Technique for sharing code using prop whose value is function.
- **Children Props**: Pattern using children prop for composition.
- **Compound Components**: Components working together to form complete UI.
- **Controlled vs Uncontrolled**: Components with state managed by React vs DOM.
- **Error Boundaries**: Components catching JavaScript errors in child component tree.
- **Portal**: Rendering children into DOM node outside parent hierarchy.
- **Forwarding Refs**: Passing refs through components to children.
- **Context Module Pattern**: Organizing context with custom hooks.
- **State Reducer Pattern**: Giving users control over internal state changes.
- **Props Getter Pattern**: Providing props through getter functions.

#### **18. HTTP Requests in React**
- **Fetch API**: Browser API for making HTTP requests.
- **fetch()**: Function making HTTP request and returning promise.
- **Response Object**: Object representing response to request.
- **response.json()**: Method parsing response body as JSON.
- **response.ok**: Boolean indicating if response was successful.
- **response.status**: HTTP status code of response.
- **Axios**: Promise-based HTTP client for browser and Node.js.
- **axios.get()**: Makes GET request.
- **axios.post()**: Makes POST request.
- **axios.put()**: Makes PUT request.
- **axios.delete()**: Makes DELETE request.
- **Request Config**: Object configuring request (headers, params, data).
- **Interceptors**: Functions running before request/response.
- **Base URL**: Default URL prepended to relative URLs.
- **Timeout**: Maximum time to wait for response.
- **Request Headers**: Metadata sent with request.
- **Response Headers**: Metadata received with response.
- **CORS**: Cross-Origin Resource Sharing for cross-domain requests.

#### **19. Forms in React**
- **Controlled Input**: Input whose value is controlled by React state.
- **Uncontrolled Input**: Input managing its own state.
- **onChange**: Event handler for input changes.
- **onSubmit**: Event handler for form submission.
- **event.preventDefault()**: Prevents default form submission.
- **Form Validation**: Checking if form data is valid.
- **Form State**: State holding form field values.
- **Form Errors**: State holding validation errors.
- **Form Libraries**: Libraries simplifying form management (Formik, React Hook Form).
- **Field-level Validation**: Validating individual fields.
- **Form-level Validation**: Validating entire form.
- **Async Validation**: Validation requiring server request.
- **Touched Fields**: Fields user has interacted with.
- **Dirty Fields**: Fields with values different from initial.

#### **20. Testing**
- **Unit Testing**: Testing individual components in isolation.
- **Integration Testing**: Testing how components work together.
- **End-to-End Testing**: Testing complete user flows.
- **Jest**: JavaScript testing framework.
- **React Testing Library**: Library for testing React components.
- **Test Suite**: Collection of related tests.
- **Test Case**: Individual test.
- **Assertion**: Statement checking if condition is true.
- **Mock**: Fake implementation replacing real one in tests.
- **Spy**: Function recording how it was called.
- **Stub**: Function with predetermined behavior.
- **Snapshot Testing**: Comparing component output to saved snapshot.
- **Coverage**: Percentage of code covered by tests.
- **Test Runner**: Tool executing tests.
- **Matcher**: Function checking if value meets condition.

#### **21. Build Tools**
- **Webpack**: Module bundler for JavaScript applications.
- **Babel**: JavaScript compiler transpiling modern JS to older versions.
- **Vite**: Fast build tool and dev server.
- **Create React App**: Tool creating React projects with zero configuration.
- **npm (Node Package Manager)**: Package manager for JavaScript.
- **package.json**: File containing project metadata and dependencies.
- **package-lock.json**: File locking dependency versions.
- **node_modules**: Directory containing installed packages.
- **Dependencies**: Packages required for application to run.
- **DevDependencies**: Packages required only for development.
- **Scripts**: Commands defined in package.json.
- **Build**: Process creating production-ready code.
- **Development Server**: Server for local development with hot reload.
- **Hot Module Replacement (HMR)**: Updating modules without full reload.
- **Source Maps**: Files mapping compiled code to source code.
- **Environment Variables**: Configuration values for different environments.
- **Production Build**: Optimized build for deployment.
- **Development Build**: Build with debugging features.

#### **22. Deployment**
- **Deployment**: Process of making application available to users.
- **Build Process**: Creating optimized production files.
- **Static Hosting**: Hosting static files (HTML, CSS, JS).
- **CDN (Content Delivery Network)**: Network of servers delivering content.
- **Vercel**: Platform for deploying frontend applications.
- **Netlify**: Platform for deploying web applications.
- **GitHub Pages**: Free hosting for static sites from GitHub.
- **Environment Variables**: Configuration for different environments.
- **CI/CD (Continuous Integration/Continuous Deployment)**: Automated build and deployment.
- **Domain**: Human-readable address for website.
- **DNS (Domain Name System)**: System translating domains to IP addresses.
- **SSL Certificate**: Certificate enabling HTTPS.

---

**This comprehensive definitions section covers all web development concepts from backend to frontend!** 🚀📚


