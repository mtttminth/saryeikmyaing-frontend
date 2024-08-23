"use client";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Button,
  IconButton,
  TablePagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { rowsPerPageOptions } from "@/consts/common";
import { fetchBooksByTag } from "@/store/thunks/bookThunk";
import { updateParams } from "@/store/slices/bookSlice";

type PageParams = {
  id: string;
};

const BookByTagScreen = ({ params }: { params: PageParams }) => {
  const { loading, bookListByTag, booksByTag, bookParam } = useSelector(
    (state: RootState) => state.book
  );
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);
  const dispatch = useDispatch<AppDispatch>();
  const id = parseInt(params.id);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  useEffect(() => {
    dispatch(
      fetchBooksByTag({
        id,
        params: bookParam,
      })
    );
  }, [bookParam]);

  useEffect(() => {
    updatePage();
  }, [page, perPage]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const updatePage = () => {
    dispatch(updateParams({ page, perPage }));
  };

  return (
    <Box sx={{ width: "100%", px: 8, py: 3 }}>
      <Box className="content-center items-center mb-8">
        <Typography className="text-slate-800 pb-4">{name}</Typography>
        <Divider
          sx={{ width: "3rem", borderWidth: "2.5px", borderColor: "#00AFEF" }}
        />
      </Box>
      <Grid container>
        {loading
          ? Array.from(new Array(4)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                    m: 5,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <Skeleton variant="rectangular" width={210} height={140} />
                  <Skeleton variant="text" width="80%" sx={{ my: 1 }} />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={40}
                    sx={{ mt: 2 }}
                  />
                </Box>
              </Grid>
            ))
          : booksByTag.map((book) => (
              <Grid xs={12} sm={6} md={3} sx={{ mb: 3, p: 1 }} key={book.id}>
                <Link href={`#`}>
                  <div className="grid place-items-center pb-2 relative">
                    <img
                      src={book.image_url}
                      alt={book.name}
                      className="h-auto md:w-40 sm:max-w-full"
                    />
                    {book.is_preorder === 1 && (
                      <img
                        src="/images/preOrder.png"
                        alt="Pre Order Now"
                        className="absolute top-0 left-12"
                        style={{ width: "60px", height: "60px" }}
                      />
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="truncate text-slate-900 text-sm leading-7">
                      {book.name}
                    </p>
                    <IconButton aria-label="fingerprint" color="secondary">
                      <FavoriteBorderIcon />
                    </IconButton>
                  </div>
                  {book.discounted_price != null ? (
                    <p className="text-sm text-cyan-500 leading-10">
                      <span className="text-xs text-red-500 pr-2 line-through">
                        {book.price} MMK
                      </span>
                      {book.discounted_price} MMK
                    </p>
                  ) : (
                    <p className="text-sm text-cyan-500 leading-10">
                      {book.price} MMK
                    </p>
                  )}
                  <div>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<AddShoppingCartIcon />}
                      sx={{
                        backgroundColor: "#373435",
                        color: "#FFFFFF",
                        width: "100%",
                      }}
                    >
                      ဈေးခြင်းထဲထည့်မယ်
                    </Button>
                  </div>
                </Link>
              </Grid>
            ))}
      </Grid>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={bookListByTag.meta?.total || 0}
        rowsPerPage={perPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default BookByTagScreen;
