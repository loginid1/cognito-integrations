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

import { FormEvent, useEffect, useState } from "react";
import { Button, Text, Group, PinInput, Chip, rem, Flex } from "@mantine/core";
import { LoginidService } from "@/services/loginid";

import { IconMail } from '@tabler/icons-react';


export interface EmailConfirmationProps {
  email: string,
  onComplete: (email: string, success: boolean) => void;
}

export default function EmailConfirmation(props: EmailConfirmationProps) {
  const [error, setError] = useState("");
  const [email, setEmail] = useState(props.email);
  const [code, setCode] = useState("");

  useEffect(() => {
  }, []);


  const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await LoginidService.client.completeEmailOTP(code);
      if(user) {
        props.onComplete(email, true);
      } else {
        setError("Invalid code!");
      }
    } catch (e: any) {
      setError(e.message || e.msg || e);
    }
  };

  const handleCancel = async () => {
    props.onComplete(email, false);
  }

  return (
    <form onSubmit={handlerSubmit} style={{width:'100%',justifyItems:'center'}}>

      <Flex align="center" direction="column">


        <Chip icon={<IconMail style={{ width: rem(16), height: rem(16) }} />}
          color="blue.7"
          variant="filled" m="md" defaultChecked>{props.email}</Chip>
        <Text mb="md" fw="bold" ta="center">
          Please check your email for a verification code
        </Text>
        {error && <Text c="red.5">{error}</Text>}
        <Group justify="center">
          <PinInput
            ta="center"
            onChange={(value) => setCode(value)}
            type="number"
            oneTimeCode
            placeholder=" "
            length={6}
            value={code}
            mb="sm"
            gap="xs"
            size="md"
            autoFocus
          />
        </Group>
        <Button type="submit" size="md" fullWidth>
          Confirm
        </Button>
      </Flex>
    </form>
  );
};

