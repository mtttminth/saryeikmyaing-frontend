import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Typography, Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { Category } from "@/types/categories";
type AllBooksDrawerProps = {
  categories: Category[];
  handleDrawerToggle: () => void;
};

const AllBooksDrawer: React.FC<AllBooksDrawerProps> = ({
  handleDrawerToggle,
  categories,
}) => {
  const pathname = usePathname();
  return (
    <Box className="user-side">
      {categories.map((category) => (
        <React.Fragment key={category.id}>
          <Box
            sx={{
              p: 1.5,
              flexGrow: 1,
              display: "flex",
              backgroundColor: "#D9D9D9",
              color: "#000000",
            }}
          >
            <Typography>{category.name}</Typography>
          </Box>
          {category.subcategories?.map((subcategory) => (
            <Link
              href={{
                pathname: `/books/${subcategory.id}`,
                query: { name: subcategory.name }, // the data
              }}
              key={subcategory.id}
            >
              <Box
                sx={{ p: 1.5, flexGrow: 1, display: "flex", color: "#000000" }}
                onClick={handleDrawerToggle}
              >
                <Typography sx={{ fontSize: "0.8rem" }}>
                  {subcategory.name}
                </Typography>
              </Box>
              <Divider sx={{ mx: 1, backgroundColor: "#D9D9D9 !important" }} />
            </Link>
          ))}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default AllBooksDrawer;
