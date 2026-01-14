import { useState } from "react";
import { Box, Input, Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    setError("");

    if (isLogin) {
      // LOGIN
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError("Invalid username or password");
        return;
      }

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      // store username for UI
      if (data.username) localStorage.setItem("username", data.username);

      navigate("/");
    } else {
      // REGISTER
      const res = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      setIsLogin(true);
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="100px" p="6" borderWidth="1px" borderRadius="lg">
      <Heading mb="4">{isLogin ? "Login" : "Register"}</Heading>

      <Input
        placeholder="Username"
        mb="3"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {!isLogin && (
        <Input
          placeholder="Email"
          mb="3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}

      <Input
        placeholder="Password"
        type="password"
        mb="3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <Text color="red.500" mb="3">{error}</Text>}

      <Button width="100%" colorScheme="yellow" onClick={submit}>
        {isLogin ? "Login" : "Create Account"}
      </Button>

      <Text mt="4" textAlign="center" cursor="pointer" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need an account? Register" : "Already have an account? Login"}
      </Text>
    </Box>
  );
};

export default Login;

