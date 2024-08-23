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
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
const EbookDetailScreen = () => {
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;
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
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <div style={{ height: "750px", width: "100%" }}>
            <div
              style={{
                alignItems: "center",
                backgroundColor: "#eeeeee",
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                display: "flex",
                padding: "4px",
              }}
            >
              <Toolbar />
            </div>
            <Viewer
              fileUrl="/images/FTHWebDesign.pdf"
              plugins={[toolbarPluginInstance]}
            />
          </div>
        </Worker>
      </Box>
    </Box>
  );
};

export default EbookDetailScreen;
