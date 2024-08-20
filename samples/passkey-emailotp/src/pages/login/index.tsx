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

'use client';

import { Card, Center, Flex, Image } from "@mantine/core";
import { useState } from "react";
import  EmailConfirmation  from "../../components/common/EmailConfirmation";
import { AddPasskey } from "../../components/common/AddPasskey";
import { Footer } from "../../components/common/Footer";
import LoginPromptPassword from "./LoginPromptPassword";
import { useNavigate } from "react-router-dom";
import LoginPrompt from "./LoginPrompt";

export enum LoginViewEnum {
  EmailConfirmation = "email-confirmation",
  LoginPrompt = "login-prompt",
  AddPasskey = "add-passkey",
}



export default function LoginPage() {

  const [view, setView] = useState<LoginViewEnum>(LoginViewEnum.LoginPrompt);
  const router = useNavigate();
  const [email, setEmail] = useState("");
  function renderView(view: LoginViewEnum) {

    if (view === LoginViewEnum.LoginPrompt) {
      return <LoginPrompt onComplete={onLoginPromptComplete} />
    } else if (view === LoginViewEnum.EmailConfirmation) {
      return <EmailConfirmation email={email} onComplete={onEmailConfirmationComplete} />
    } else if (view === LoginViewEnum.AddPasskey) {
      return <AddPasskey email={email} onComplete={onAddPasskeyComplete} />
    }
  }

  function onLoginPromptComplete(email: string, fallback?: string) {
    if (fallback && fallback=== "email") {
      // send email and switch view
      setEmail(email);
      setView(LoginViewEnum.EmailConfirmation);
    } else {
      // route to management
      router("/manage");
    }

  }
  function onEmailConfirmationComplete(email: string, success: boolean) {
    if (success) {
      setEmail(email);
      setView(LoginViewEnum.AddPasskey);
    } else {
      setView(LoginViewEnum.LoginPrompt);
    }
  }
  function onAddPasskeyComplete(success: boolean) {
    if (success) {
      router("/manage");
    } else {
      // user skip passkey creation
      router("/manage");
    }
  }

  return (
    <Center h="100vh" w="100%">
        <Card shadow="sm" w={{ base: 356,  md: 480, lg: 550 }} mih={420} p="sm">
          <Flex justify="center" align="center" direction="column" w="100%">

            <Image
              h={48}
              w={192}
              src="/assets/logo.svg"
              alt="LoginID Inc."
              mb="md"
            />
            {renderView(view)}
            <Footer /> 
          </Flex>
        </Card>
    </Center>

  );

}