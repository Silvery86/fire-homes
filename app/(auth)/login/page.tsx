"use client";

import ContinueWithGoogleButton from "@/components/continue-with-google-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { Eye, EyeOff } from "lucide-react";


const formSchema = z.object({
    email: z.string().email("Please enter a valid email."),
    password: z.string().min(8, "Password must be at least 8 characters."),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
    const auth = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "", password: "" },
        mode: "onChange",         // validate as the user types
        reValidateMode: "onChange",
        criteriaMode: "firstError" // show first error per field (change to "all" if needed)
    });

    const { handleSubmit, control, formState: { isSubmitting } } = form;

    async function onSubmit(values: FormValues) {
        try {
            await auth.signInWithEmail(values.email, values.password);

        } catch (err: any) {
            const code = err?.code ?? "";
            if (code === "auth/invalid-email") {
                form.setError("email", { type: "server", message: "Invalid email address." });
            } else if (code === "auth/user-not-found") {
                form.setError("email", { type: "server", message: "No account found for this email." });
            } else if (code === "auth/wrong-password" || code === "auth/invalid-credential") {
                form.setError("password", { type: "server", message: "Incorrect password." });
            } else if (code === "auth/too-many-requests") {
                form.setError("password", { type: "server", message: "Too many attempts. Try again later." });
            } else if (code === "auth/network-request-failed") {
                form.setError("root", { type: "server", message: "Network error. Check your connection and try again." });
            } else {
                form.setError("root", { type: "server", message: "Login failed. Please try again." });
                console.error(err);
            }
        }
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>Enter your email and password to access your account.</CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                            {/* Email */}
                            <FormField
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="you@example.com"
                                                autoComplete="email"
                                                aria-invalid={!!form.formState.errors.email}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password */}
                            <FormField
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    autoComplete="current-password"
                                                    aria-invalid={!!form.formState.errors.password}
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute inset-y-0 right-2 text-sm"
                                                    onClick={() => setShowPassword((v) => !v)}
                                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Signing in..." : "Sign in"}
                            </Button>
                        </form>
                    </Form>

                    <div className="my-6 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">or</span>
                        </div>
                    </div>

                    <ContinueWithGoogleButton />
                </CardContent>

                <CardFooter className="flex justify-center">
                    <Button variant="link" className="px-0">Don’t have an account? Sign up</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
