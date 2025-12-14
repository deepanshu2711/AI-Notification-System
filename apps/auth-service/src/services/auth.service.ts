import axios from "axios";

export const getToken = async ({
  code,
  clientId,
}: {
  code: string;
  clientId: string;
}) => {
  const response = await axios.post(`http://localhost:5005/api/auth/token`, {
    code,
    clientId,
    clientSecret: process.env.CLIENT_SECRET,
  });

  const { accessToken, refreshToken } = response.data.data;
  return { accessToken, refreshToken };
};
