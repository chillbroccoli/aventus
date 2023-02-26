import httpProxy from "http-proxy";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();
// somehow with turbo build, cannot resolve env variable, only for next app, workaround till found solution
const url = process.env["API_URL"] || "http://localhost:4000";

export default async function requestHandler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise(() => {
    proxy.web(req, res, {
      target: url,
      autoRewrite: false,
      selfHandleResponse: false,
      changeOrigin: true,
    });
  });
}
