import MainNavigation from "./MainNavigation";

const Layout = (props) => {
    return ( 
        <div>
            <MainNavigation />
            <main style={{width:"90%", maxWidth:"50rem",margin:"3rem auto"}}>{props.children}</main>
        </div>
     );
}
 
export default Layout;