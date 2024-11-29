import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./componets/ui/Header";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TransactionPage from "./pages/TransactionPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import { Toaster } from "react-hot-toast";

function App() {
  const { data } = useQuery(GET_AUTHENTICATED_USER);
  const authenticatedUser = data?.authUser;
  return (
    <>
      {authenticatedUser && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            authenticatedUser ? (
              <HomePage profilePicture={authenticatedUser?.profilePicture} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={!authenticatedUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authenticatedUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/transaction/:id"
          element={
            authenticatedUser ? <TransactionPage /> : <Navigate to="/" />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}
export default App;
