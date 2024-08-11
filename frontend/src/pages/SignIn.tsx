import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (values: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5298/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Sign-in failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      message.success("Sign-in successful!");
      navigate("/"); // Redirect to home page
    } catch (error) {
      message.error("Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-6 w-full bg-white font-bold text-[#105cd7] shadow-md flex justify-center p-4 rounded-lg">
        <h1 className="text-[24px]">Library Management System</h1>
      </div>
      <div className=" bg-white font-bold text-[#105cd7] shadow-md flex flex-col justify-center p-8 rounded-lg">
        <h1 className="font-bold text-xl mb-5">Welcome Back, Sign In</h1>
        <Form layout="vertical" onFinish={handleSignIn} className="w-[500px]">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password />
          </Form.Item>
          <div>
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 mb-2">
              Sign Up
            </a>
          </div>
          <Button className="w-full text-xl font-bold mt-4 p-5" type="primary" htmlType="submit" loading={loading}>
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;