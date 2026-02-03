// Children Props - Advanced Pattern for Reusable Components

// Basic Card component using children
function Card({ children, title, color = "white" }) {
    return (
        <div style={{
            background: color,
            borderRadius: 10,
            border: "1px solid #ccc",
            padding: "20px",
            margin: "10px",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
            minWidth: "200px"
        }}>
            {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
            {children}
        </div>
    );
}

// Modal component using children
function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                maxWidth: '500px',
                width: '90%'
            }}>
                <button 
                    onClick={onClose}
                    style={{ float: 'right', background: 'none', border: 'none', fontSize: '20px' }}
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
}

// Layout component using children
function Layout({ children, sidebar }) {
    return (
        <div style={{ display: 'flex', minHeight: '400px' }}>
            <div style={{
                width: '200px',
                backgroundColor: '#f5f5f5',
                padding: '20px',
                borderRight: '1px solid #ddd'
            }}>
                {sidebar}
            </div>
            <div style={{ flex: 1, padding: '20px' }}>
                {children}
            </div>
        </div>
    );
}

// Button component with children
function Button({ children, variant = 'primary', onClick, ...props }) {
    const styles = {
        primary: { backgroundColor: '#007bff', color: 'white' },
        secondary: { backgroundColor: '#6c757d', color: 'white' },
        success: { backgroundColor: '#28a745', color: 'white' }
    };

    return (
        <button
            onClick={onClick}
            style={{
                ...styles[variant],
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                margin: '5px',
                ...props.style
            }}
            {...props}
        >
            {children}
        </button>
    );
}

function App() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Children Props Examples</h2>

            {/* Basic Cards with different content */}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Card title="Input Card" color="#e3f2fd">
                    <div>
                        <label>What do you want to post?</label>
                        <br /><br />
                        <input type="text" placeholder="Type here..." />
                    </div>
                </Card>

                <Card title="Content Card" color="#f3e5f5">
                    <p>This is some content inside the card.</p>
                    <ul>
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>
                </Card>

                <Card title="Form Card" color="#e8f5e8">
                    <form>
                        <div>
                            <label>Name:</label><br />
                            <input type="text" />
                        </div>
                        <br />
                        <div>
                            <label>Message:</label><br />
                            <textarea rows="3"></textarea>
                        </div>
                    </form>
                </Card>
            </div>

            {/* Button Examples */}
            <div style={{ margin: '20px 0' }}>
                <h3>Button Examples:</h3>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                    Open Modal
                </Button>
                <Button variant="secondary">
                    Secondary Button
                </Button>
                <Button variant="success">
                    Success Button
                </Button>
            </div>

            {/* Layout Example */}
            <Layout 
                sidebar={
                    <div>
                        <h4>Sidebar</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                }
            >
                <h3>Main Content Area</h3>
                <p>This is the main content area. The sidebar and main content are both passed as children to the Layout component.</p>
            </Layout>

            {/* Modal Example */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h3>Modal Title</h3>
                <p>This is modal content passed as children!</p>
                <Button onClick={() => setIsModalOpen(false)}>
                    Close Modal
                </Button>
            </Modal>

            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f5f5f5' }}>
                <h3>Children Props Benefits:</h3>
                <ul>
                    <li><strong>Reusability:</strong> Same component, different content</li>
                    <li><strong>Flexibility:</strong> Can pass any JSX as children</li>
                    <li><strong>Composition:</strong> Build complex UIs from simple components</li>
                    <li><strong>Separation of Concerns:</strong> Layout vs Content</li>
                </ul>
            </div>
        </div>
    );
}

export default App;