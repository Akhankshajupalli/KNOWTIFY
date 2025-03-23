
import { useAuth } from "../layouts/authcontext";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
`;

const Message = styled.h1`
  font-size: 28px;
  color: #333;
`;

const Dashboard = () => {
  const { state } = useAuth();

  return (
    <Container>
      {/* ✅ Show welcome message with username */}
      <Message>
        Welcome to your KnowTify dashboard, {state?.user?.username || "User"}!
      </Message>
    </Container>
  );
};

export default Dashboard;
