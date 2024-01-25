import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Publication from "./components/GetPublications";

// Set up Apollo Client
const client = new ApolloClient({
    uri: "https://hashnode-api.onrender.com",
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Publication />
            </div>
        </ApolloProvider>
    );
}

export default App;
