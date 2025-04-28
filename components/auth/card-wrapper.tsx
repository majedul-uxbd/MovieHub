"use client";

import {
    Card,
    CardHeader,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import { Header } from "@/components/auth/login-header";
import { Social } from "@/components/auth/login-social";
import { BackButton } from "@/components/auth/login-back-button";
import { usePathname } from "next/navigation";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}: CardWrapperProps) => {
    const pathname = usePathname();
    const cardClassName =
        pathname === "/login"
            ? "w-[450px] shadow-md mt-10"
            : "w-[450px] md:w-[700px] shadow-md mt-10";

    return (
        <Card className={cardClassName}>
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 mb-6 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2  text-muted-foreground">
                    Or continue with
                </span>
            </div> */}
            {/* {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )} */}
            <CardFooter className="flex flex-row items-center justify-center">
                <BackButton
                    label={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter>
        </Card>
    );
};
