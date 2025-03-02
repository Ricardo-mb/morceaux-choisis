
import { memo } from "react";
import { ApolloWrapper, ThemeProvider } from "@/providers";
import { Navbar, Footer } from "@/components/layout";
import "../styles/globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MemoizedNavbar = memo(Navbar);
const MemoizedFooter = memo(Footer);
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>
        <html lang='en' suppressHydrationWarning>
          <body>
            <ApolloWrapper>
              <ThemeProvider
                attribute='class'
                defaultTheme='system'
                enableSystem
                disableTransitionOnChange
              >
                <div className='flex min-h-screen flex-col'>
                  <MemoizedNavbar />
                  <ToastContainer 
                    position="top-right" 
                    autoClose={5000} 
                    hideProgressBar={false} 
                    newestOnTop={false} 
                    closeOnClick rtl={false} 
                    pauseOnFocusLoss 
                    draggable 
                    pauseOnHover 
                    theme="colored" 
                    />
                  <main className='flex-1'>{children}</main>
                  <MemoizedFooter />
                </div>
              </ThemeProvider>
            </ApolloWrapper>
          </body>
        </html>
      </AuthProvider>
    </>
  );
}
