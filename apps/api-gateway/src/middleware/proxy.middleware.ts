import { createProxyMiddleware } from "http-proxy-middleware";

export const AuthProxy = createProxyMiddleware({
  target: "http://localhost:5002",
  changeOrigin: true,
  pathRewrite: { "^/api/v1/auth": "" },
  cookieDomainRewrite: "",
});
