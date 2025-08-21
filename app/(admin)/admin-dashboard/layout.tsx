import Breadcrumbs from "@/components/breadcrmbs";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="max-w-screen mx-auto px-4 py-10">
            <div className="max-w-7xl mx-auto">
            <Breadcrumbs />
            <div className="flex flex-col items-start justify-start">
                {children}
            </div>           
            </div>                  
        </div>
    );
}