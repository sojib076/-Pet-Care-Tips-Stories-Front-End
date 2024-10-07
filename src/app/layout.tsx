
import "./globals.css";
import Providers from "./lib/Providers";
import { Fredoka } from 'next/font/google';


const fredoka = Fredoka({
  subsets: ['latin'],         // Specify the character subsets you need
  weight: ['400', '700'],     // Specify the font weights you intend to use
  display: 'swap',            // Ensures text is visible while the font loads
});




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body className={`antialiased ${fredoka.className}`}>
        <Providers>
          <div className="">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
