"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import LoginImage from "@/assests/Images/Login.png";

export function HRLoginForm({ className, ...props }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const generatedEmailPreview = username.trim()
    ? `${username.trim().toLowerCase()}@resumesync.email.com`
    : "username@resumesync.email.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
      const endpoint = isRegister ? "/hr/register" : "/hr/login";

      const res = await fetch(`${apiUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Request failed");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role);
        window.dispatchEvent(new Event("userUpdated"));
      }

      if (isRegister) {
        setSuccessMessage(
          `HR account created. Your email: ${data.user.generatedemail}`
        );
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">
                  {isRegister ? "Create HR Account" : "HR Login"}
                </h1>
                <p className="text-muted-foreground text-balance text-sm">
                  {isRegister
                    ? "Register as an HR user to manage resumes"
                    : "Sign in to your HR account"}
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="hr-username">Username</FieldLabel>
                <Input
                  id="hr-username"
                  type="text"
                  placeholder="yourname"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <FieldDescription>
                  Generated email: {generatedEmailPreview}
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="hr-password">Password</FieldLabel>
                <Input
                  id="hr-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>

              {isRegister && (
                <Field>
                  <FieldLabel htmlFor="hr-confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="hr-confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Field>
              )}

              {error && (
                <FieldDescription className="text-red-500 text-sm">
                  {error}
                </FieldDescription>
              )}

              {successMessage && (
                <FieldDescription className="text-green-600 text-sm">
                  {successMessage}
                </FieldDescription>
              )}

              <Field>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading
                    ? isRegister
                      ? "Creating account..."
                      : "Logging in..."
                    : isRegister
                      ? "Create HR Account"
                      : "Login"}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                {isRegister ? (
                  <>
                    Already have an HR account?{" "}
                    <button
                      type="button"
                      className="underline underline-offset-2"
                      onClick={() => {
                        setIsRegister(false);
                        setError("");
                        setConfirmPassword("");
                      }}
                    >
                      Sign in
                    </button>
                  </>
                ) : (
                  <>
                    Need an HR account?{" "}
                    <button
                      type="button"
                      className="underline underline-offset-2"
                      onClick={() => {
                        setIsRegister(true);
                        setError("");
                      }}
                    >
                      Register
                    </button>
                  </>
                )}
              </FieldDescription>

              <FieldDescription className="text-center">
                <Link href="/login" className="underline underline-offset-2">
                  Back to user login
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src={LoginImage}
              alt="HR login"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
