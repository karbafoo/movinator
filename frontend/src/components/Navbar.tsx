import {NavLink} from 'react-router-dom';
const Navbar = () => {
    return (
        <div
            style={{
                width: '100%',
                backgroundColor: 'black',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                height: 64,
            }}
        >
            <NavLink to={'/'} style={{flex: 1, margin: 0, padding: '0 1rem'}}>
                <h2>Movinator</h2>
            </NavLink>
            <NavLink
                to={'/lists'}
                style={{padding: '0 1rem', cursor: 'pointer'}}
            >
                MY LISTS
            </NavLink>
        </div>
    );
};

export default Navbar;
