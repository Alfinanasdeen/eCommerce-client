import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/userRedux";
import { mobile } from "../responsive.js";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;

  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const StyledLink = styled(RouterLink)`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;
const CredentialBox = styled.div`
  margin: 20px 0;
  padding: 10px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
`;
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    setIsFetching(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/login`,
        {
          email,
          password,
        }
      );
      console.log("Login successful:", response.data);

      localStorage.setItem("token", response.data.token);

      dispatch(loginSuccess(response.data.user));

      console.log("User type:", response.data.user.userType);

      if (response.data.user.userType === "Admin") {
        console.log("Navigating to Admin Page");
        navigate("/admin");
      } else {
        console.log("Navigating to User Home");
        navigate("/");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data.message);
      setError(err.response?.data.message || "Login failed!");
      dispatch(loginFailure());
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <CredentialBox>
          If you want to enter as an admin, register as admin by using secret
          key as &apos;Admin_secret_key&apos; .
        </CredentialBox>
        <Form onSubmit={handleClick}>
          <Input
            placeholder="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>{error}</Error>}
          <StyledLink to="/register">CREATE A NEW ACCOUNT</StyledLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
