"use client";


import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

function formatLabel(segment: string) {
    return segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
}

export default function Breadcrumbs(
    { breadcrumbs } : { breadcrumbs?: { label: string; url: string }[]; } = {}
) {
    let breadcrumbItems = [];
    if (breadcrumbs && breadcrumbs.length > 0) {
        breadcrumbItems = breadcrumbs;
    } else {
        const pathname = usePathname();
        const items = pathname.split("/").filter((item) => item !== "");

        if (items.length === 0) {
            return null;
        }

        breadcrumbItems = items.map((item, index) => {
            const url = "/" + items.slice(0, index + 1).join("/");
            return {
                label: formatLabel(item),
                url,
            };
        });
    }
    const last = breadcrumbItems.length - 1;


    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbItems.map((breadcrumb, index) => (
                    <React.Fragment key={breadcrumb.url}>
                        <BreadcrumbItem>
                            {index < last ? (
                                <BreadcrumbLink asChild>
                                    <Link href={breadcrumb.url}>{breadcrumb.label}</Link>
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                        {index < last && <BreadcrumbSeparator />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}