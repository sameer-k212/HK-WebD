// Import React to use its features like components, state, and lifecycle methods.
import React from "react";

// Create a class component named ErrorBoundary that extends React.Component.
class ErrorBoundary extends React.Component {
    
    // Constructor initializes component's state to track if there's an error.
    constructor(props) {
        super(props); // Call the parent class constructor
        this.state = { hasError: false }; // Initialize state with hasError set to false
    }

    // Lifecycle method triggered on error, updates state to render fallback UI.
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    // Lifecycle method for side effects when an error occurs, logs error details.
    componentDidCatch(error, info) {
        console.error("Error caught:", error, info);
    }

    // Render method to display fallback UI if there's an error, else render children.
    render() {
        // If there's an error, display a fallback UI with a red background.
        if (this.state.hasError) {
            // Return JSX with a red background and error message.
            return (
                // Create a div element with JSX
                <div>
                    <h2>Something went wrong.</h2>
                </div>
            );
        }

        // Otherwise, render the child components.
        return this.props.children;
    }
}

// Import the ErrorBoundary component for error handling in the App component.
// Create a function component named App that will be rendered in the root element
const App = () => {
    // Return the JSX that will be rendered in the browser
    return (
        // Create a div element with JSX
        <div>
            {/* Wrap Card1 in ErrorBoundary to catch any potential rendering errors. */}
            <ErrorBoundary>
                <Card1 /> {/* Renders Card1 component. */}
            </ErrorBoundary>

            {/* Similarly, wrap Card2 to ensure any errors are caught. */}
            <ErrorBoundary>
                <Card2 /> {/* Renders Card2 component. */}
            </ErrorBoundary>

            {/* Card3 is not wrapped in ErrorBoundary, so errors will not be caught by the boundary. */}
            <Card3 /> {/* Renders Card3 component. */}
        </div>
    );
};

// Create a function component named Card1 that will be rendered in the App component
function Card1() {
    // Throw an error to simulate a rendering error in the component.
    throw new Error("Error While Rendering Card 1");

    // Return the JSX that will be rendered in the browser
    return (
        // Renders the content of Card1 (though this code is unreachable due to the thrown error).
        <div>
            <h2>Card 1</h2>
        </div>
    );
}

// Create a function component named Card2 that will be rendered in the App component
function Card2() {
    // Return the JSX that will be rendered in the browser
    return (
        // Renders the content of Card2 with styling and padding, no errors thrown here.
        <div>
            <h2>Card 2</h2>
        </div>
    );
}

// Create a function component named Card3 that will be rendered in the App component
function Card3() {
    // Return the JSX that will be rendered in the browser
    return (
        // Renders the content of Card3 with styling similar to Card2.
        <div>
            <h2>Card 3</h2> 
        </div>
    );
}

// Exporting the main App component for use in the application.
export default App;