import httpProxy from "http-proxy";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default async function requestHandler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise(() => {
    proxy.web(req, res, {
      target: process.env["NEXT_PUBLIC_API_HOST"],
      autoRewrite: false,
      selfHandleResponse: false,
      changeOrigin: true,
    });
  });
}
