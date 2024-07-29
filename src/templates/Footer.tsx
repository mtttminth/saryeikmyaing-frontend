import { Box, Grid, Typography, Divider, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

const UserFooter = () => {
  return (
    <Grid
      className="footer-container"
      sx={{ px: 8, pt: 5, pb: 3, backgroundColor: "#373435" }}
    >
      <div className="flex justify-between">
        <Box className="content-center items-center mb-8">
          <Typography className="text-white pb-4">Contact Us</Typography>
          <Divider
            sx={{ width: "3rem", borderWidth: "2.5px", borderColor: "#00AFEF" }}
          />
        </Box>
        <div>
          <IconButton color="primary" aria-label="add to shopping cart">
            <FacebookIcon />
          </IconButton>
          <IconButton color="primary" aria-label="add to shopping cart">
            <YouTubeIcon />
          </IconButton>
        </div>
      </div>
      <p className="text-sm text-white pb-6">
        <span style={{ color: "#00AFEF" }}>Address </span> - No.253/255 ,
        Pansoedan Rd , Between Bogyoke Rd & Anawrahta Rd , ( Infront Of Innwa
        BookShop ) Kyauktada Township , Yangon, Myanmar
      </p>
      <p className="text-sm text-white pb-6">
        <span style={{ color: "#00AFEF" }}>Phone </span> - 09 762 226020
      </p>
      <p className="text-sm text-white pb-6">
        <span style={{ color: "#00AFEF" }}>Email </span> -
        saryeikmyaing@gmail.com
      </p>
      <Divider sx={{ borderColor: "#555555", marginBottom: 3 }} />
      <div className="text-center">
        <p className="text-sm">
          @2024 Sar Yeik Myaing Book Store. All Right Reserve
        </p>
      </div>
    </Grid>
  );
};

export default UserFooter;
