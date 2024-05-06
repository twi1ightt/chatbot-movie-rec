"use client";

import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  Session: Session | null;
};

export function SessionProvider({ children, Session }: Props) {
  return <Provider>{children}</Provider>;
}
