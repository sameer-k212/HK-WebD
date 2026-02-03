# Important React Concepts from 100xDevs

This folder contains essential React concepts and patterns extracted from the 100xDevs Cohort 3.0 curriculum and added to your HK-WebD learning repository.

## 📁 Folder Structure

### 26_CustomHooks/
Custom React hooks for reusable stateful logic:

- **useCounter.jsx** - Counter logic with increment, decrement, reset
- **useFetch.jsx** - Data fetching with loading and error states
- **useDebounce.jsx** - Debounced search implementation
- **usePrevious.jsx** - Track previous values of state/props

### 27_RecoilAdvanced/
Advanced Recoil state management concepts:

- **atomFamily.jsx** - Dynamic atom creation based on parameters
- **reactMemo.jsx** - Performance optimization with React.memo

### 28_ReactAdvancedPatterns/
Advanced React patterns and components:

- **errorBoundary.jsx** - Error handling in React components
- **childrenProps.jsx** - Composition patterns with children props

## 🎯 Key Concepts Covered

### Custom Hooks
- **Purpose**: Extract and reuse stateful logic across components
- **Benefits**: Code reusability, separation of concerns, cleaner components
- **Examples**: useCounter, useFetch, useDebounce, usePrevious

### Recoil Advanced
- **AtomFamily**: Create atoms dynamically based on parameters
- **React.memo**: Prevent unnecessary re-renders for performance optimization
- **Selectors**: Derived state and computed values

### React Patterns
- **Error Boundaries**: Catch and handle JavaScript errors in component tree
- **Children Props**: Composition pattern for flexible, reusable components
- **Performance**: Memoization and optimization techniques

## 🚀 How to Use

1. **Custom Hooks**: Copy the hook logic into your project and import where needed
2. **Recoil**: Install recoil (`npm install recoil`) and wrap your app with RecoilRoot
3. **Patterns**: Use as reference for implementing similar patterns in your projects

## 💡 Learning Outcomes

After studying these concepts, you'll understand:

- How to create and use custom hooks
- Advanced state management with Recoil
- Performance optimization techniques
- Error handling strategies
- Component composition patterns
- React best practices and patterns

## 🔗 Related Concepts in Your HK-WebD Folder

- **16_IntroductionToReact/** - Basic React concepts
- **17_ReactBasic/** - React fundamentals
- **18_React-Todo/** - Full-stack React application
- **19_Hooks-useEffect/** - useEffect hook deep dive
- **20-22_React-Router/** - Client-side routing
- **23_PropDrilling/** - Props drilling problem
- **24_Context/** - Context API for state management
- **25_Recoil/** - Basic Recoil state management

## 📚 Additional Resources

- [React Official Documentation](https://react.dev/)
- [Recoil Documentation](https://recoiljs.org/)
- [100xDevs Course Materials](https://app.100xdevs.com/)

## 🎓 Practice Suggestions

1. **Custom Hooks**: Create your own hooks for common patterns in your projects
2. **Performance**: Use React DevTools Profiler to identify performance bottlenecks
3. **Error Boundaries**: Implement error boundaries in your production applications
4. **Composition**: Practice using children props for flexible component design

---

*These concepts represent advanced React patterns that are essential for building scalable, maintainable React applications.*