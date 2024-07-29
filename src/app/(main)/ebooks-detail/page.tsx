"use client";
import {
  Box,
  Typography,
  Divider,
  Grid,
  FormControl,
  Select,
  InputLabel,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import "@/styles/main.scss";

const EbookDetailScreen = () => {
  return (
    <Box sx={{ width: "100%", px: 8, py: 3 }}>
      <Box className="content-center items-center mb-4">
        <Typography className="text-slate-800 pb-4">
          မိမိစိတ်ကိုထိန်းချုပ်ခြင်
        </Typography>
        <Divider
          sx={{
            width: "3rem",
            borderWidth: "2.5px",
            borderColor: "#00AFEF",
          }}
        />
      </Box>
    </Box>
  );
};

export default EbookDetailScreen;
