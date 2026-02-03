// Import the useEffect and useState hooks from the react module
import { useState, useEffect } from 'react';

// Import the useDebounce custom hook from the hooks folder
import useDebounce from "./hooks/useDebounce";

// Create a function component named App that serves as the main application component
function App() {
    // Create a state variable named inputValue and a function named setInputValue that updates the state variable when called
    const [inputValue, setInputValue] = useState("");

    // call the useDebounce custom hook with the inputValue state variable and a delay of 200 milliseconds
    const useDebouncedValue = useDebounce(inputValue, 200);

    // Create a function named change that takes an event object as an argument and updates the inputValue state variable with the value of the input element
    function change(e) {
        // Update the inputValue state variable with the value of the input element
        setInputValue(e.target.value);
    }

    // Create a side effect that logs the string "Exensive Oprations" to the console when the useDebouncedValue state variable changes
    useEffect(() => {
        // expensive operation
        // fetch
        console.log("Exensive Oprations");
    }, [useDebouncedValue]);

    // Return the JSX for the component
    return (
        <div>
            {/* Create an input element with a type of text and an onChange event handler that calls the debounceFn function */}
            <input type="text" onChange={change} />
        </div>
    );
}

// Export the App component as the default export from this module
export default App;