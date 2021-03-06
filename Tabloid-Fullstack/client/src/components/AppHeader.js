import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap';
import { UserProfileContext } from '../providers/UserProfileProvider';
import { SubscriptionContext } from '../providers/SubscriptionProvider';
import './AppHeader.css';

const AppHeader = () => {
  const { getCurrentUser, logout, isAdmin } = useContext(UserProfileContext);
  const { hasSubs, setHasSubs, checkIfSubs } = useContext(SubscriptionContext);
  const user = getCurrentUser();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logoutAndReturn = () => {
    return logout().then(() => {
      toast.dark('You are now logged out');
      history.push('/login');
    });
  };

  checkIfSubs();

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={Link} to="/">
          <img
            id="header-logo"
            src="/quill.png"
            width="30"
            height="30"
            className="mr-1"
            alt="Quill Logo"
          />
          Tabloid
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {user ? (
              <>
                <NavItem>
                  <NavLink to="/newpost" tag={Link}>
                    <div className="create-new-post">New Post</div>
                  </NavLink>
                </NavItem>
                {hasSubs && (
                  <>
                    <NavItem>
                      <NavLink to="/subscriptions" tag={Link}>
                        Subscriptions
                      </NavLink>
                    </NavItem>
                  </>
                )}
                <NavItem>
                  <NavLink to="/explore" tag={Link}>
                    Explore
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/myposts" tag={Link}>
                    My Posts
                  </NavLink>
                </NavItem>
                {isAdmin() && (
                  <>
                    <NavItem>
                      <NavLink to="/categories" tag={Link}>
                        Categories
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink to="/tags" tag={Link}>
                        Tags
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink to="/users" tag={Link}>
                        Users
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink to="/UnapprovedPosts" tag={Link}>
                        Unapproved Posts
                      </NavLink>
                    </NavItem>
                  </>
                )}
                <NavItem>
                  <NavLink className="pointer" onClick={logoutAndReturn}>
                    Logout
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink to="/login" tag={Link}>
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/register" tag={Link}>
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
          {user ? (
            <NavbarText className="d-sm-none d-md-block">
              Welcome {user.displayName}
            </NavbarText>
          ) : null}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default AppHeader;
