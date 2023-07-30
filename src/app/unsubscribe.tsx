import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const UnsubscribePage: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string | string[] | undefined>(router.query.email);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (email) {
      axios.post('https://35ctur3dz9.execute-api.ap-southeast-1.amazonaws.com/prod', { email })
        .then(res => {
          setStatus("Successfully unsubscribed!");
        })
        .catch(err => {
          setStatus("Failed to unsubscribe.");
          console.log(err);
        });
    }
  }, [email]);

  return (
    <div>
      <h1>Unsubscribe</h1>
      <p>{status}</p>
    </div>
  );
};

export default UnsubscribePage;
