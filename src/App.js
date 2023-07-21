import logo from "./logo.svg";
import "./App.css";
import ChatBot from "./components/ChartBot/ChatBot";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { Button, Checkbox, Form, Input, message, Menu, Avatar } from "antd";
import jwt_decode from "jwt-decode";
import { Icon } from "@iconify/react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function App() {
  const [chatbotstatus, setChatbotStatus] = useState(false);

  const onFinish = (values) => {
    const username = values.username;
    const password = values.password;
    if (password === "EtPefa6uHn92cvB") {
      emailidVerification(username);
    } else {
      message.error("Invalid Credentials");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const emailidVerification = (email) => {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "AIzaSyCeySsUPu30lQw3sHUZ3ugMDuTyehZy3q0");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      event_type: "usercheck",
      email_id: email,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://chatbot-gcp-v2-5zs2afac.an.gateway.dev/chatbot",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        var data = JSON.parse(result);
        if (data.access) {
          localStorage.setItem("token", true);
          setChatbotStatus(true);
          window.location.href = "/";
        } else {
          setChatbotStatus(false);
          message.error("Invalid Credentials");
          localStorage.setItem("token", false);
        }
      })
      .catch((error) => {
        setChatbotStatus(false);
        localStorage.setItem("token", false);
        message.error("Invalid Credentials");
      });
  };

  return (
    <div className={localStorage.getItem("token") ? "App" : "App-bg-color"}>
      {!localStorage.getItem("token") && (
        <div className="login-container">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="login-form"
          >
            <h1>Login</h1>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item className="login-button-wrap">
              <Button type="primary" htmlType="submit" className="login-button">
                Submit
              </Button>
            </Form.Item>

            <div className="mar-top-1">
              <GoogleOAuthProvider clientId="360561241958-l4ggbpckahv3vvigf1bpc9b9hfqd7326.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    var token = credentialResponse.credential;
                    var decoded = jwt_decode(token);
                    var decodedHeader = jwt_decode(token, { header: true });
                    const email = decoded.email;
                    emailidVerification(email);
                  }}
                  onError={() => {
                    message.error("Invalid Credentials");
                    localStorage.setItem("token", false);
                    setChatbotStatus(false);
                  }}
                />
              </GoogleOAuthProvider>
            </div>
          </Form>
        </div>
      )}

      {localStorage.getItem("token") && (
        <>
          <ChatBot />
        </>
      )}
    </div>
  );
}

export default App;
