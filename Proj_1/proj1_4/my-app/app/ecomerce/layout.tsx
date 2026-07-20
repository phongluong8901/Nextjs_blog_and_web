import Filter from "@/app/ecomerce/components/filter/page"
import Search from "@/app/ecomerce/components/@search/page"

export default function Layout({
  children,
  ...rest
}: Readonly<{
  children: React.ReactNode;
}>) {

  // console.log("log-rest: ",rest)
  return (
    
    <div style={{display:'flex'}}>
      <Filter />
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Search />
        {children}
      </div>
        
    </div>
    
  );
}
