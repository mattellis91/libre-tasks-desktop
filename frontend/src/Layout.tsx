import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { ModalProvider } from "./components/providers/modal-provider";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-[#121212] font-sans antialiased ">
      <Toaster />
      <ModalProvider />
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <div className='relative flex min-h-screen flex-col'>
          {/* <SiteHeader /> */}
          <div className="flex-1">{children}</div>
        </div>
        {/* <TailwindIndicator /> */}
      </ThemeProvider>
    </div>
  );
}
