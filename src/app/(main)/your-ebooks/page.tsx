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
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const OwnEbooksScreen = () => {
  return (
    <Box sx={{ width: "100%", px: 8, py: 3 }}>
      <Box className="content-center items-center mb-4">
        <Typography className="text-slate-800 pb-4">
          Your E-book List
        </Typography>
        <Divider
          sx={{
            width: "3rem",
            borderWidth: "2.5px",
            borderColor: "#00AFEF",
          }}
        />
      </Box>
      <Grid container sx={{ marginBottom: "2rem" }}>
        <Grid lg={3} xs={12} sx={{ marginRight: "2rem", marginBottom: "2rem" }}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="grouped-native-select">
              စာအုပ်ကဏ္ဍအမျိုးအစား
            </InputLabel>
            <Select
              native
              defaultValue=""
              id="grouped-native-select"
              label="Grouping"
            >
              <option aria-label="None" value="" />
              <optgroup label="ကလေးစာပေ">
                <option value={1}>ပုံပြင်နှင့်ကဗျာစာအုပ်များ</option>
                <option value={2}>သုတရဖွယ်စာအုပ်များ</option>
              </optgroup>
              <optgroup label="ကျန်းမာရေးစာအုပ်များ">
                <option value={3}>အထွေထွေကျန်းမာရေး</option>
                <option value={4}>
                  ကိုယ်ဝန်ဆောင်နှင့်အမျိုးသမီးကျန်းမာရေး
                </option>
              </optgroup>
            </Select>
          </FormControl>
        </Grid>
        <Grid lg={3} xs={12} sx={{ marginRight: "2rem", marginBottom: "2rem" }}>
          <TextField
            id="standard-basic"
            label="နာမည်ဖြင့် ရှာရန်"
            variant="standard"
            fullWidth
            // value={keyword}
            // onChange={handleTextChange}
          />
        </Grid>
        <Grid lg={3} xs={12}>
          <Button
            // onClick={handleSearch}
            variant="contained"
            sx={{
              backgroundColor: "#00AFEF",
              color: "#ffffff",
              marginTop: "1rem",
            }}
          >
            ရှာမည်
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} sm={6} md={3} sx={{ marginBottom: 3 }}>
          <Link href={`/ebooks-detail`}>
            <div className="grid place-items-center pb-2">
              <img
                src="/images/book01.jpg"
                className="h-auto md:w-40 sm:max-w-full"
              />
            </div>
            <p className="truncate text-slate-900 text-sm leading-7 mb-4">
              မိမိစိတ် ကို ထိန်းချုပ်ခြင်း မိမိစိတ်ကိုထိန်းချုပ်ခြင်း
            </p>
            <div>
              <Button
                variant="contained"
                tabIndex={-1}
                startIcon={<AutoStoriesIcon />}
                sx={{
                  backgroundColor: "#373435",
                  width: "100%",
                  color: "#ffffff",
                  marginBottom: "1rem",
                }}
              >
                စာအုပ် ဖတ်မည်
              </Button>
            </div>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OwnEbooksScreen;
