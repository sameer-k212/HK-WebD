# **React Guide 🚀**

> Complete React concepts with definitions and examples

## 📚 **Table of Contents**

- [1. React Basics](#1-react-basics)
- [2. Components](#2-components)
- [3. JSX](#3-jsx)
- [4. Props](#4-props)
- [5. State (useState)](#5-state-usestate)
- [6. useEffect Hook](#6-useeffect-hook)
- [7. React Router](#7-react-router)
- [8. Context API](#8-context-api)
- [9. Recoil](#9-recoil)
- [10. Custom Hooks](#10-custom-hooks)

---

## **1. React Basics**

### **Topic: React**
**Definition:** JavaScript library for building user interfaces using component-based architecture.

**Example:**
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
    return <h1>Hello React!</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

---

### **Topic: Virtual DOM**
**Definition:** Lightweight copy of actual DOM that React uses to optimize updates by comparing changes.

**Example:**
```javascript
// React updates only changed parts
function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>Count: {count}</p> {/* Only this updates when count changes */}
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}
```

---

## **2. Components**

### **Topic: Functional Component**
**Definition:** JavaScript function that returns JSX, the modern way to create React components.

**Example:**
```javascript
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

// Usage
<Welcome name="John" />
```

---

### **Topic: Component Composition**
**Definition:** Building complex UIs by combining multiple smaller components.

**Example:**
```javascript
function Header() {
    return <header><h1>My App</h1></header>;
}

function Content() {
    return <main><p>Welcome to my app</p></main>;
}

function Footer() {
    return <footer><p>© 2024</p></footer>;
}

function App() {
    return (
        <div>
            <Header />
            <Content />
            <Footer />
        </div>
    );
}
```

---

## **3. JSX**

### **Topic: JSX (JavaScript XML)**
**Definition:** Syntax extension allowing you to write HTML-like code in JavaScript.

**Example:**
```javascript
function App() {
    const name = "John";
    const isLoggedIn = true;
    
    return (
        <div>
            <h1>Hello, {name}</h1>
            {isLoggedIn ? <p>Welcome back!</p> : <p>Please login</p>}
        </div>
    );
}
```

---

### **Topic: JSX Expressions**
**Definition:** JavaScript expressions embedded in JSX using curly braces {}.

**Example:**
```javascript
function App() {
    const user = { name: 'John', age: 25 };
    const numbers = [1, 2, 3, 4, 5];
    
    return (
        <div>
            <h1>{user.name}</h1>
            <p>Age: {user.age}</p>
            <p>Sum: {numbers.reduce((a, b) => a + b, 0)}</p>
        </div>
    );
}
```

---

## **4. Props**

### **Topic: Props (Properties)**
**Definition:** Read-only data passed from parent component to child component.

**Example:**
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
function App() {
    return (
        <UserCard 
            name="John" 
            age={30} 
            email="john@example.com" 
        />
    );
}
```

---

### **Topic: Children Props**
**Definition:** Special prop containing content between component opening and closing tags.

**Example:**
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
    <p>Content goes here</p>
    <button>Click me</button>
</Card>
```

---

## **5. State (useState)**

### **Topic: useState Hook**
**Definition:** Hook that allows functional components to manage state.

**Example:**
```javascript
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    );
}
```

---

### **Topic: State with Objects**
**Definition:** Managing complex state using objects with useState.

**Example:**
```javascript
function UserForm() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        age: 0
    });
    
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    
    return (
        <form>
            <input name="name" value={user.name} onChange={handleChange} />
            <input name="email" value={user.email} onChange={handleChange} />
            <input name="age" value={user.age} onChange={handleChange} />
        </form>
    );
}
```

---

## **6. useEffect Hook**

### **Topic: useEffect**
**Definition:** Hook for performing side effects in functional components (API calls, subscriptions, timers).

**Example:**
```javascript
import { useState, useEffect } from 'react';

function DataFetcher() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch('https://api.example.com/data')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            });
    }, []); // Empty array = run once on mount
    
    if (loading) return <div>Loading...</div>;
    return <div>{JSON.stringify(data)}</div>;
}
```

---

### **Topic: useEffect Dependency Array**
**Definition:** Array controlling when useEffect runs based on value changes.

**Example:**
```javascript
function SearchComponent() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    
    // Run when query changes
    useEffect(() => {
        if (query) {
            fetch(`https://api.example.com/search?q=${query}`)
                .then(res => res.json())
                .then(data => setResults(data));
        }
    }, [query]); // Runs when query changes
    
    return (
        <div>
            <input value={query} onChange={(e) => setQuery(e.target.value)} />
            <ul>
                {results.map(item => <li key={item.id}>{item.name}</li>)}
            </ul>
        </div>
    );
}
```

---

### **Topic: useEffect Cleanup**
**Definition:** Function returned from useEffect to clean up side effects (timers, subscriptions).

**Example:**
```javascript
function Timer() {
    const [seconds, setSeconds] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
        
        // Cleanup function
        return () => {
            clearInterval(interval);
        };
    }, []);
    
    return <div>Seconds: {seconds}</div>;
}
```

---

## **7. React Router**

### **Topic: React Router**
**Definition:** Library for handling routing and navigation in React applications.

**Example:**
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

---

### **Topic: useNavigate**
**Definition:** Hook for programmatic navigation in React Router.

**Example:**
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

---

### **Topic: Dynamic Routes**
**Definition:** Routes with parameters that change based on URL.

**Example:**
```javascript
import { useParams } from 'react-router-dom';

// Route definition
<Route path="/user/:id" element={<UserProfile />} />

// Component
function UserProfile() {
    const { id } = useParams();
    return <div>User ID: {id}</div>;
}

// Usage: /user/123 will show "User ID: 123"
```

---

## **8. Context API**

### **Topic: Context API**
**Definition:** React feature for sharing data across component tree without prop drilling.

**Example:**
```javascript
import { createContext, useContext, useState } from 'react';

// Create Context
const UserContext = createContext();

// Provider Component
function App() {
    const [user, setUser] = useState({ name: 'John', age: 30 });
    
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

---

### **Topic: Prop Drilling**
**Definition:** Passing props through multiple component levels to reach deeply nested components.

**Example:**
```javascript
// Problem: Prop Drilling
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

// Solution: Use Context API (shown above)
```

---

## **9. Recoil**

### **Topic: Recoil**
**Definition:** State management library for React providing shared state across components.

**Example:**
```javascript
import { RecoilRoot, atom, useRecoilState, useRecoilValue } from 'recoil';

// Define atom (state)
const countState = atom({
    key: 'countState',
    default: 0
});

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
    return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

function Display() {
    const count = useRecoilValue(countState);
    return <div>Current count: {count}</div>;
}
```

---

### **Topic: Recoil Selector**
**Definition:** Derived state computed from atoms or other selectors.

**Example:**
```javascript
import { selector } from 'recoil';

const doubleCountState = selector({
    key: 'doubleCountState',
    get: ({ get }) => {
        const count = get(countState);
        return count * 2;
    }
});

function Display() {
    const doubleCount = useRecoilValue(doubleCountState);
    return <div>Double: {doubleCount}</div>;
}
```

---

## **10. Custom Hooks**

### **Topic: Custom Hook**
**Definition:** Reusable function extracting component logic, must start with "use".

**Example:**
```javascript
// Custom Hook
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

---

### **Topic: useFetch Custom Hook**
**Definition:** Custom hook for fetching data from APIs.

**Example:**
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

---

### **Topic: useDebounce Custom Hook**
**Definition:** Custom hook that delays updating a value until after a pause in changes.

**Example:**
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

---

**Happy Coding! 🚀**
