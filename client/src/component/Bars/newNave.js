import * as React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import './nav.css'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import MenuItem from '@mui/material/MenuItem';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link, useNavigate, useParams, } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { CategorySubCategoryForSide } from '../Homesections/Category_sub';
import SearchForm from './search/form';
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black   , 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
    let dispatch = useDispatch()
    const { user, trader,cart } = useSelector((state) => ({ ...state }))
    const { search } = useSelector((state) => ({ ...state }))
    const { text } = search

    const handleChange = (e) => {

        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: e.target.value }
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/shop?${text}`)
    }
    const navigate = useNavigate()

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const [count, setCount] = React.useState(1);
    const [invisible, setInvisible] = React.useState(false);

    const handleBadgeVisibility = () => {
        setInvisible(!invisible);
    };
    const handleUSerClick = () => {
        if (typeof window !== "undefined") {

            dispatch({
                type: "SET_SIDE",
                payload: true,
            })

        }
    }
    return (
        <AppBar elevation={0} color="transparent" position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AppsOutlinedIcon style={{ cursor: 'pointer' }} onClick={() => navigate('/')} sx={{ display: { xs: 'none', md: 'flex' } }} />
                    <Typography
                      
                        noWrap
                        
                        onClick={() => navigate('/')}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'sans-serif',
                            cursor:'pointer',
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Home
                    </Typography>
                    <ShoppingBagOutlinedIcon style={{cursor:'pointer'}} onClick={() => navigate('/shop')} sx={{ display: { xs: 'none', md: 'flex' } }} />
                    <Typography
                    onClick={()=>navigate('/shop')}
                        
                        noWrap
                        component="a"
                       
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'sans-serif',
                            
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Shop
                    </Typography>
                    <Badge
                        sx={{
                            cursor: 'pointer', display: { xs: 'none', md: 'flex' }
                        }}
                        className={cart.length > 0?"text-success mr-1": "text-muttedmr-1 mr-1"} anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }} color="error" badgeContent={cart.length} >
                        <ShoppingCartOutlinedIcon sx={{ display: { xs: 'none', md: 'flex' } }} />

                  
                    <Typography
                       
                        
                        noWrap
                        component="a"
                        onClick={() => navigate('/cart')}
                        sx={{
                         
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'sans-serif',
                            
                           
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Cart
                        </Typography>  </Badge>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                        style={{maxWidth:'250px'}}
                            sx={{  display: { xs: 'flex', md: 'none' } }}
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                        
                        >
                            <CategorySubCategoryForSide/>
                        </Menu>
                    </Box>
                    
                    <HomeOutlinedIcon onClick={() => navigate('/')} sx={{ display: { xs: 'flex', md: 'none',cursor:'pointer' }, mr: 1 }} />

                
                    <ShoppingBagOutlinedIcon onClick={()=>navigate('/shop')} sx={{ cursor:'pointer',display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Badge
                        sx={{
                            cursor: 'pointer', display: { xs: 'flex', md: 'none' }
                        }}
                        className={cart.length > 0 ? "text-success mr-1" : "text-muttedmr-1 mr-1"} anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }} color="error" badgeContent={cart.length} >
                        <ShoppingCartOutlinedIcon onClick={() => navigate('/cart')}  sx={{ display: { xs: 'flex', md: 'none' } }} />


                        <Typography


                            noWrap
                            component="a"
                           
                            sx={{

                                display: { xs: 'flex', md: 'none' },
                                fontFamily: 'sans-serif',


                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                        
                        </Typography>  </Badge>
                    <span className=" p-1 w-100 ml-1" >

                        <SearchForm className='w-100 ' />
                    </span>
{/*                              
                    <Search className='w-75'>
                        <SearchIconWrapper onClick={handleSubmit} >
                            <SearchIcon onClick={handleSubmit} />
                        </SearchIconWrapper>
                        <StyledInputBase
                        dir='auto'
                   
            onChange={handleChange}
            value={text} 
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search> */}

                    <Box sx={{ flexGrow: 0 }} className='ms-auto' onClick={handleUSerClick}>
                        <Tooltip title="Click to Open" onClick={handleUSerClick} >
                            <IconButton onClick={handleUSerClick}>
                                {user && user.picture.length > 0 &&             
                                    (<Avatar onClick={handleUSerClick} sizes={50} alt="A" src={`${user.picture[0].url}`} />)
                                            }    

                                {user && user.picture.length < 1 &&
                                    (<Avatar onClick={handleUSerClick} sizes={50} alt="A" src={`${user.img}`} />)
                                }  
                                    {!user&&(<Avatar onClick={handleUSerClick} src={"/broken-image.jpg"} />)}
                                 

                       </IconButton>
                        </Tooltip>
                      
                    </Box>
                         
               
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
