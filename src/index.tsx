import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import News from "./pages/News";
import NewsList from "./pages/NewsList";
import NewsDetail from "./pages/NewsDetail";
import reportWebVitals from "./reportWebVitals";
import Navigation from "./components/Navigation";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Navigation />
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/list" element={<NewsList />} />
          <Route path="/details" element={<NewsDetail />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
