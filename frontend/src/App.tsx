import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "@/providers/app-provider";
import { Toaster } from "@/components/ui/toaster";
import Landing from "@/pages/landing";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Dashboard from "@/pages/dashboard";
import Teamwork from "@/pages/teamwork";
import QuantumQuest from "@/pages/quantum-quest";
import Docs from "@/pages/Docs";
import QuizPage from "@/pages/QuizPage";
import NotFound from "@/pages/not-found";
import AdminDashboard from "@admin/pages/admin-dashboard";

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = !!localStorage.getItem('auth-token');
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <AppProvider>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teamwork" 
            element={
              <ProtectedRoute>
                <Teamwork />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/quantum-quest" 
            element={
              <ProtectedRoute>
                <QuantumQuest />
              </ProtectedRoute>
            } 
          />
          <Route path="/docs" element={<Docs />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;