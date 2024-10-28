import SignUp from "./SignUp";
const App = () => {
  return (
    <div className="container-fluid">
      <h1 className="text-center text-primary">Authenticator & Authorizer</h1>
      <hr />
      {<SignUp />}
      <br />
    </div>
  );
};

export default App;
