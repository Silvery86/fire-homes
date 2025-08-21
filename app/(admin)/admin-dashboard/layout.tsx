import Breadcrumbs from "@/components/breadcrmbs";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="max-w-screen mx-auto px-4 py-10">
            <div>
            <Breadcrumbs />
            {children}
            </div>                  
        </div>
    );
}