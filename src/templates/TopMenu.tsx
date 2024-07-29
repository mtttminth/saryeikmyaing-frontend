import {
  Box,
  Grid,
  Badge,
  Paper,
  IconButton,
  InputBase,
  Button,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const TopMenu = () => {
  return (
    <>
      <Grid
        container
        sx={{
          px: 2,
          py: 4,
          backgroundColor: "#AFEAFF",
          justifyContent: "center",
        }}
      >
        <Image
          src="/images/saryeikmyaingLogo.png"
          width={260}
          height={120}
          priority
          alt="Logo"
          className="logo"
        />
      </Grid>
      <Grid
        container
        sx={{ backgroundColor: "#AFEAFF", justifyContent: "center" }}
      >
        <Grid sx={{ pb: 2, pr: 2 }}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
              height: 38,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="စာအုပ်ရှာဖွေရန်........"
              inputProps={{ "aria-label": "စာအုပ်ရှာဖွေရန်........" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid sx={{ pb: 2 }}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            endIcon={<PersonIcon />}
            sx={{ backgroundColor: "#00AFEF", color: "#FFFFFF" }}
          >
            Sign In
          </Button>
        </Grid>
        <Grid>
          <Badge badgeContent={4} color="primary">
            <ShoppingCartIcon color="action" sx={{width: "2rem", height: "2rem", ml: 2}}/>
          </Badge>
        </Grid>
      </Grid>
    </>
  );
};

export default TopMenu;
