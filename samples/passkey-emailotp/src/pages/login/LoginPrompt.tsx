/*
 *   Copyright (c) 2024 LoginID Inc
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */



import { FormEvent, useEffect, useRef, useState } from "react";
import { Button, Input, UnstyledButton, Text, Title, Flex, Group } from "@mantine/core";
import { LoginidService } from "@/services/loginid";
import {Link, useNavigate} from "react-router-dom";
import { ISignInFallbackCallback  } from "@loginid/cognito-web-sdk";



export interface LoginPromptProps {
  onComplete: (email: string, fallback?: string) => void;
}

export default function LoginPrompt(props: LoginPromptProps) {
  const [error, setError] = useState("");
  const [abortController, setAbortController] = useState(new AbortController());
  const count = useRef(0);
  const [email, setEmail] = useState("");

  const router = useNavigate();
  useEffect(() => {

    handleAutoFill();
    // this is important to unlock webauthn credential used by auto-fill when existing the page
    return () => {
      abortController.abort();
    };

  }, []);


  async function handleAutoFill() {
    try {
      const result = await LoginidService.client.signInWithPasskeyAutofill({ abortController: abortController });
      return router("/manage");

    } catch (e: any) {
      const msg = e.message || e.msg || e;
      console.log(msg);
    }
  }


  const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setError("");

      const fallback: ISignInFallbackCallback = {
        onFallback: async (username: string, _options: string[]) => {
          await LoginidService.client.initializeEmailOTP(username);
          return props.onComplete(username, "email");
        }
      };
      await LoginidService.client.signInPasskey(email, { abortController, fallback });
      return props.onComplete(email, "");

    } catch (e: any) {
      setError(e.message || e.msg);
    }
  };

  return (
    <form onSubmit={handlerSubmit} style={{ width: '100%', justifyItems: 'center' }}>
      <Flex align="center" direction="column">

        <Title order={4} mt="lg" mb="sm">Sign In</Title>
        {error && <Text c="red.4" lineClamp={64} >{error}</Text>}
        <Input
          onChange={(e) => setEmail(e.target.value)}
          mb="lg"
          placeholder="Email"
          type="email"
          value={email}
          autoComplete="username webauthn"
          w="100%"
        />
        <Button type="submit" size="md" mb="sm" fullWidth>
          Login
        </Button>
        <UnstyledButton
        >
          <Group>
            Don&apos;t have an account? <Link to="/signup" style={{ textDecoration: "none" }}><Text c="blue.5" >Sign up</Text></Link>
          </Group>
        </UnstyledButton>
      </Flex>
    </form>
  );
};

