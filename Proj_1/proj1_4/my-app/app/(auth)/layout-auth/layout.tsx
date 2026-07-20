

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        {children}
        <h2>Quang cao</h2>
    </>
    
  );
}
