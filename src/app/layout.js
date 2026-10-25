
import "./globals.css";

export const metadata = {
  title: "School Management SaaS",
  description: "School Management Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="m-0 min-h-screen">
        {children}
      </body>
    </html>
  );
}
