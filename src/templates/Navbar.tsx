"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { DRAWER_WIDTH, USER_MENU_ITEM } from "@/consts/SideMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExpandMore } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { ButtonBase, Menu, MenuItem, Typography } from "@mui/material";
import MobileDrawer from "./Drawer";
import AllBooksDrawer from "./AllBooksDrawer";
import { Icon } from "@iconify/react";
import { fetchCategoriesWithSubcategories } from "@/store/thunks/categoryThunk";
import { fetchAuthors } from "@/store/thunks/authorThunk";

interface Props {
  window?: () => Window;
}

const UserNavBar = (props: Props) => {
  const { window } = props;
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, categories } = useSelector(
    (state: RootState) => state.category
  );
  const { authors } = useSelector((state: RootState) => state.author);

  const pathname = usePathname();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleBookDrawerToggle = () => {
    setBookOpen((prevState) => !prevState);
  };
  const toggleDrawer = (newOpen: boolean) => () => {
    setBookOpen(newOpen);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    dispatch(fetchCategoriesWithSubcategories());
    dispatch(fetchAuthors());
  }, [dispatch]);

  const drawer = <MobileDrawer handleDrawerToggle={handleDrawerToggle} />;
  const allBooksDrawer = (
    <AllBooksDrawer
      categories={categories}
      handleDrawerToggle={handleBookDrawerToggle}
    />
  );

  const container = window ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="relative">
        <Toolbar sx={{ backgroundColor: "white", color: "#000000" }}>
          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              width: "100%",
              justifyContent: "left",
              gap: 5,
              alignItems: "center",
              px: 5,
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleBookDrawerToggle}
            >
              <Icon
                icon="subway:menu"
                width={20}
                style={{ marginRight: "10px" }}
              />
              <Typography className="text-slate-800">စာအုပ်အားလုံး</Typography>
            </IconButton>
            {USER_MENU_ITEM.map((item, index) =>
              item.type == "item-tree" ? (
                <Box sx={{ flexGrow: 0 }} key={index}>
                  <ButtonBase onClick={handleOpenUserMenu} className="nav-menu">
                    <ListItemText primary={item.label} />
                    <Box>
                      <ExpandMore style={{ fontSize: 23 }} />
                    </Box>
                  </ButtonBase>
                  <Menu
                    sx={{ mt: "45px" }}
                    anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {authors.map((author) => (
                      <Link href={`/booksbyauthor/${author.id}`}>
                        <MenuItem key={author.id} onClick={handleCloseUserMenu}>
                          {author.name}
                        </MenuItem>
                      </Link>
                    ))}
                  </Menu>
                </Box>
              ) : (
                <Link
                  href={`/${item.href}`}
                  key={index}
                  className={
                    pathname == `/${item.href}`
                      ? "user-nav-active nav-menu"
                      : "nav-menu"
                  }
                >
                  {item.label}
                </Link>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Drawer
        container={container}
        variant="temporary"
        open={bookOpen}
        onClose={handleBookDrawerToggle}
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
          },
        }}
      >
        {allBooksDrawer}
      </Drawer>
    </Box>
  );
};

export default UserNavBar;
