import './Header.css'
import {Link} from "react-router-dom";
import { userContext } from '../../App';
import { useContext } from 'react';


const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    return (
        <div>
            <nav>
                <ul>
                    <li><Link className="link" to="/shop">Shop</Link></li>
                    <li><Link className="link" to="/review">Review</Link></li>
                    <li><Link className="link" to="/manage">Manage</Link></li>
                    {
                       loggedInUser.isSignIn ? <li onClick={() => setLoggedInUser({})}> <Link className="link">Signout</Link> </li> :  <li><Link className="link" to="/login">Login</Link></li> 
                    }
                </ul>
                {/* {
                     && <button className="boton" >Sign Out</button>
                } */}
            </nav>
        </div>
    );
};

export default Header; 