'use client';
import { useEffect } from "react";
import { useState } from "react";
import { Accordion, Text, Container } from "@mantine/core";
import Passkey from "./Passkey";
import { PasskeyCollection } from "@loginid/cognito-web-sdk";
import { LoginidService } from "@/services/loginid";

function Passkeys() {

  const [passkeyID, setPasskeyID] = useState<string | null>(null);
  const [tempPasskeyID, setTempPasskeyID] = useState<string | null>(null);
  const [error, setError] = useState("");

  const [passkeys, setPasskeys] = useState<PasskeyCollection>([]);

  useEffect(() => {
    listPasskey();
  }, []);

  async function listPasskey() {
    try {
      const collection = await LoginidService.client.listPasskeys();
      setPasskeys(collection);
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <Container w="100%" >

      {error && <Text c="red.4">{error}</Text>}

      <Accordion
        value={passkeyID}
        mb="sm"
        chevronPosition="right"
        variant="contained"
      >
        {passkeys.map((passkey, index) => (
          <Passkey
            key={passkey.name + index}
            id={passkey.id}
            name={passkey.name}
          />
        ))}
      </Accordion>


    </Container>
  );
};

export default Passkeys;
