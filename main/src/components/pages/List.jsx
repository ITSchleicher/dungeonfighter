const token = sessionStorage.getItem('jwt_token');

if (token) {
    console.log('Retrieved token from session storage:', token);
} else {
    console.log('No token found in session storage.');
}

export default function List() {
        return (
            <div className = "list">
                <h1>Characters</h1>
                <p>
                    Person
                </p>
            </div>
        );
    }