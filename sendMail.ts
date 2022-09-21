import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { google } from "googleapis";

import fs from "fs";
import { promisify } from "util";

type theservice = {
  service:string;
}

// interface Services extends theservice {}
// import readfile from promisify'fs.readFile'
const readFile = promisify(fs.readFile);

const Client_ID: string =
  "409424743001-kd4ftt0qcf8ajh5hfulkqr71dumf5u11.apps.googleusercontent.com";

const Client_Secret: string = "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";

const refresh_Token: string =
  "1//04FZqzkNfjO5TCgYIARAAGAQSNwF-L9Ir-rg6Vvcc39WuF1-YqTxEtIHVOMGv6J9boIihlYHdcqNeIBBoydcprdNso0OK6AZYRcA";

const redirect_URL: string = "https://developers.google.com/oauthplayground";

const oAuthPass = new google.auth.OAuth2(
  Client_ID,
  Client_Secret,
  redirect_URL
);

oAuthPass.setCredentials({ refresh_token: refresh_Token });

const emailCheck = async (email: any, user: any) => {
  try {
    const createToken = await oAuthPass.getAccessToken();
    const dataToken = await crypto.randomBytes(34).toString("hex");
    const token = await jwt.sign({ dataToken }, "Secret", { expiresIn: "3d" });

    const transport = nodemailer.createTransport({
      service: string:"gmail",
      auth: {
        type: "OAuth2",
        user: "distress065@gmail.com",
        clientId: Client_ID,
        clientSecret: Client_Secret,
        refresh_token: refresh_Token,
        accessToken: createToken.token,
      },
    });

    const mailOptions = {
      from: "Auth Message ✉️ <distress065@gmail.com>",
      to: email,
      subject: "Account Verification",
      html: `
         <h4>Thanks For Signing Up With myCompany  Click <a
         href="https:localhost:3000"
         >Link </a> to Verify Account.</h4>
         `,
    };

    const result = transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};

export default emailCheck;
