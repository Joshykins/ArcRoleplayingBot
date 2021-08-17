import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navigation.scss';

//@ts-ignore
import logo from 'url:../../images/logo.png';
//@ts-ignore
import discordLogo from 'url:../../images/discord-logo.png';
import { Button } from '../button/Button';

interface NavLinksProps {
  useMobileOpened?: boolean,
  menuOpened?: boolean,
  linkSelected?: () => void
}
const NavLinks: React.FunctionComponent<NavLinksProps> = ({menuOpened = false, useMobileOpened = false, linkSelected}) => {
  
  return (
    <div className={`links ${useMobileOpened ? menuOpened ? " " : " close" : ""}`} >
        <NavLink
          to="/"
          activeClassName="active"
          onClick={linkSelected ? linkSelected : null}
          exact
        >Home
        </NavLink>
        <NavLink
          to="/about"
          activeClassName="active"
          onClick={linkSelected ? linkSelected : null}
        >
          How It works
        </NavLink>
        <NavLink
          to="/faq"
          activeClassName="active"
          onClick={linkSelected ? linkSelected : null}
        >
          FAQs
        </NavLink>
        <NavLink
          to="/serverDirectory"
          activeClassName="active"
          onClick={linkSelected ? linkSelected : null}
        >
          Public Servers
        </NavLink>
      </div>
  );
}

const Navigation: React.FunctionComponent = () => {
  const [menuActive, setMenuActive] = React.useState<boolean>();
  return (
    <>
      <div className="nav navMobile tileShadow">
        <div className="logo">
            <img src={logo} />
        </div>
        <NavLinks 
          useMobileOpened={true}
          menuOpened={menuActive}
          linkSelected={()=>{setMenuActive(false)}}
        />
        <div className={`navButton${menuActive ? " active" : ""}`}
          onClick={()=>{
            setMenuActive(!menuActive);
          }}
        >
        <div className="login">
          <Button><img src={discordLogo} width={23} style={{verticalAlign: "middle"}}/> &nbsp;Sign In</Button>
        </div>
        </div>
      </div>
      <div className="nav navDesktop tileShadow tileBg">
        <div className="logo">
          <img src={logo} />
        </div>
        <NavLinks/> 
        <div className="login">
          <Button><img src={discordLogo} width={23} style={{verticalAlign: "middle"}}/> &nbsp;Sign In</Button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
