import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import User from "./components/GetUserData";

// Set up Apollo Client
const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <User />
            </div>
        </ApolloProvider>
    );
}

export default App;
