import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";
import { openSnackbar } from "../redux/reducers/snackbarSlice";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.secondary};
`;

const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.secondary + 90};
`;

const TextButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  cursor: pointer;
  align-self: flex-end;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Signup = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserSignUp(formData);
      dispatch(loginSuccess(response.data));
      dispatch(openSnackbar({ message: "Signup successful!", severity: "success" }));
    } catch (error) {
      dispatch(openSnackbar({ message: error.message, severity: "error" }));
    }
  };

  return (
    <Container>
      <div>
        <Title>Welcome to Airbnb</Title>
        <Span>Please signup with your details here</Span>
      </div>
      <div style={{display: "flex", gap: "20px", flexDirection:"column"}}></div>

        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
        />
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
    />
        <TextInput
        label="Password"
        placeholder="Enter your password"
        password
        />
      
       <Button text="Sign Up"/>
      
    </Container>
  );
};

export default Signup;