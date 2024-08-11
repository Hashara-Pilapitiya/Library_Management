import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

const SignUp: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Sign-up user
    const handleSignUp = async (values: { username: string; password: string }) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error("Sign-up failed");
            }

            message.success("Sign-up successful! Please sign in.");
            navigate("/signin");
        } catch (error) {
            message.error("Sign-up failed. Please try again.");
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
                <h1 className="font-bold text-xl mb-5">Sign up to LMS</h1>
                <Form layout="vertical" onFinish={handleSignUp} className="w-[500px]">
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

            {/* Allow user to sign in if they already have an account */}
            <div>
            Already have an account?{" "}
            <a href="/signin" className="text-blue-500 mb-2">
              Sign In
            </a>
            </div>
            <Button type="primary" htmlType="submit" loading={loading} className="w-full text-xl font-bold mt-4 p-5">
                Sign Up
            </Button>
        </Form>
      </div>
    </div>
       
    );
};

export default SignUp;