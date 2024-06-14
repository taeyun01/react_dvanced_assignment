import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/config/configStore";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </Provider>
);
