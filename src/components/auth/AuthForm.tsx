"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const formSchemaBase = {
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
};

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  ...formSchemaBase,
});

const loginSchema = z.object(formSchemaBase);

type AuthFormProps = {
  mode: "login" | "signup";
  onSubmit: (data: any) => Promise<boolean>;
};

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const isLogin = mode === "login";
  const schema = isLogin ? loginSchema : signupSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      ...(isLogin ? {} : { name: "" }),
    },
  });
  
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function handleFormSubmit(values: z.infer<typeof schema>) {
    setIsLoading(true);
    const success = await onSubmit(values);
    if (!success) {
        toast({
            title: "Authentication Failed",
            description: isLogin ? "Invalid email or password." : "Could not create account.",
            variant: "destructive",
        })
    }
    setIsLoading(false);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">{isLogin ? "Welcome Back" : "Create an Account"}</CardTitle>
        <CardDescription>
          {isLogin ? "Log in to continue to GrocerEase." : "Get started with fresh groceries delivered to you."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            {!isLogin && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin" />}
              {isLoading ? "Processing..." : (isLogin ? "Log In" : "Sign Up")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
