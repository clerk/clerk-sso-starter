import React from "react";
import "./App.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const frontendApi = process.env.REACT_APP_CLERK_FRONTEND_API;

function Hello() {
  const { firstName } = useUser();
  const [instruments, setInstruments] = React.useState([]);

  React.useEffect(() => {
    async function loadInstruments() {
      try {
        const [jazzRes, rockRes] = await Promise.all([
          fetch("http://localhost:4000/api", {
            // Use HTTP Authorization header to remove `credentials: "include"`
            // and reduce the required CORS configuration on the backend
            credentials: "include",
          }).then((res) => res.json()),
          fetch("http://localhost:4001/api", {
            // Use HTTP Authorization header to remove `credentials: "include"`
            // and reduce the required CORS configuration on the backend
            credentials: "include",
          }).then((res) => res.json()),
        ]);

        setInstruments([jazzRes.instrument, rockRes.instrument]);
      } catch (err) {
        alert(`Boom: ${err.message || err}`);
      }
    }

    loadInstruments();
  }, []);

  console.log("Instruments", instruments);

  return (
    <div className="App-header">
      <UserButton />
      <div>Hello, {firstName}!</div>
      {instruments.length > 0 && <div>Play {instruments.join(" & ")}</div>}
    </div>
  );
}

function App() {
  return (
    <ClerkProvider frontendApi={frontendApi} authVersion={2}>
      <div className="App">
        <h1>Jazz 🎺</h1>
        <SignedIn>
          <Hello />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </div>
    </ClerkProvider>
  );
}

export default App;
